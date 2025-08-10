<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use App\Services\ExpressionValidationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpressionController extends Controller
{
    protected $validationService;

    public function __construct(ExpressionValidationService $validationService)
    {
        $this->validationService = $validationService;
    }

    public function index()
    {
        $expressions = Expression::all();

        return inertia('Expressions', ['expressions' => $expressions]);
    }

    public function getRandomExpressions(Request $request)
    {
        $mode = $request->query('mode');
        $numberOfRequestedExpressions = $request->query('numberOfExpressions');

        if (! $mode || ! str_contains($mode, '-')) {
            return response()->json(['error' => 'Invalid mode'], 400);
        }

        [$expressionLanguage, $answerLanguage] = explode('-', $mode);

        $expressions = Expression::where('expression_language', $expressionLanguage)
            ->where('answer_language', $answerLanguage)
            ->where('is_validated', true)
            ->inRandomOrder()
            ->limit($numberOfRequestedExpressions)
            ->get();

        return response()->json($expressions);
    }

    // Display the form
    public function create()
    {
        return inertia('RequestNewExpression');
    }

    public function store(Request $request)
    {
        $expressionData = $this->validationService->getValidatedExpressionData($request, Auth::id());

        Expression::create($expressionData);

        return redirect()->back()->with('message', 'Expression submitted successfully!');
    }

    // Display unvalidated expressions
    public function adminIndex(Request $request)
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

        return inertia('Admin/UnvalidatedExpressions', [
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
    public function validateExpression(Expression $expression)
    {
        $expression->update(['is_validated' => true]);

        return redirect()->route('admin.expressions.index')->with('message', 'Expression validated successfully!');
    }

    // Delete expression
    public function destroy(Expression $expression)
    {
        $expression->delete();

        return redirect()->route('admin.expressions.index')->with('message', 'Expression deleted successfully!');
    }
}
