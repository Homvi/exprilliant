<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use App\Services\ExpressionValidationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ExpressionController extends Controller
{
    protected ExpressionValidationService $validationService;

    public function __construct(ExpressionValidationService $validationService)
    {
        $this->validationService = $validationService;
    }

    public function index(): Response
    {
        $expressions = Expression::all();

        return Inertia::render('Expressions', ['expressions' => $expressions]);
    }

    public function getRandomExpressions(Request $request): JsonResponse
    {
        $mode = $request->query('mode');
        $numberOfRequestedExpressions = $request->query('numberOfExpressions');

        if (! $mode || ! str_contains((string) $mode, '-')) {
            return response()->json(['error' => 'Invalid mode'], 400);
        }

        $modeString = (string) $mode;
        [$expressionLanguage, $answerLanguage] = explode('-', $modeString);

        $expressions = Expression::where('expression_language', $expressionLanguage)
            ->where('answer_language', $answerLanguage)
            ->where('is_validated', true)
            ->inRandomOrder()
            ->limit((int) $numberOfRequestedExpressions)
            ->get();

        return response()->json($expressions);
    }

    // Display the form
    public function create(): Response
    {
        return Inertia::render('RequestNewExpression');
    }

    public function store(Request $request): RedirectResponse
    {
        $userId = Auth::id();
        if ($userId === null) {
            return redirect()->back()->with('error', 'User not authenticated');
        }

        $expressionData = $this->validationService->getValidatedExpressionData($request, (int) $userId);

        Expression::create($expressionData);

        return redirect()->back()->with('message', 'Expression submitted successfully!');
    }

    // Display unvalidated expressions
    public function adminIndex(Request $request): Response
    {
        $expressionLanguage = $request->query('exp');
        $answerLanguage = $request->query('ans');

        $query = Expression::with('user')->where('is_validated', false);

        if (! empty($expressionLanguage)) {
            $query->where('expression_language', $expressionLanguage);
        }

        if (! empty($answerLanguage)) {
            $query->where('answer_language', $answerLanguage);
        }

        $expressions = $query->orderByDesc('created_at')->get();

        // Collect available languages and language pairs among unvalidated expressions
        $unvalidated = Expression::where('is_validated', false);
        $expLangs = (clone $unvalidated)->distinct()->pluck('expression_language')->filter();
        $ansLangs = (clone $unvalidated)->distinct()->pluck('answer_language')->filter();
        $languages = $expLangs->merge($ansLangs)->unique()->values();

        $pairs = (clone $unvalidated)
            ->select('expression_language', 'answer_language')
            ->distinct()
            ->get()
            ->map(fn ($e) => $e->expression_language.'-'.$e->answer_language)
            ->values();

        return Inertia::render('Admin/UnvalidatedExpressions', [
            'expressions' => $expressions,
            'filters' => [
                'exp' => $expressionLanguage,
                'ans' => $answerLanguage,
            ],
            'languages' => $languages,
            'pairs' => $pairs,
        ]);
    }

    // Validate expression
    public function validateExpression(Request $request, Expression $expression): RedirectResponse
    {
        $expression->update(['is_validated' => true]);

        return redirect()
            ->route('admin.expressions.index', $request->query())
            ->with('message', 'Expression validated successfully!');
    }

    // Delete expression
    public function destroy(Request $request, Expression $expression): RedirectResponse
    {
        $expression->delete();

        return redirect()
            ->route('admin.expressions.index', $request->query())
            ->with('message', 'Expression deleted successfully!');
    }
}
