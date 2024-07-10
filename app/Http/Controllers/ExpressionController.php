<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expression;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExpressionController extends Controller
{
    public function getRandomExpressions(Request $request)
    {
        $mode = $request->query('mode');

        if (!$mode || !str_contains($mode, '-')) {
            return response()->json(['error' => 'Invalid mode'], 400);
        }

        [$expressionLanguage, $answerLanguage] = explode('-', $mode);

        $expressions = Expression::where('expression_language', $expressionLanguage)
            ->where('answer_language', $answerLanguage)
            ->where('is_validated', true)
            ->inRandomOrder()
            ->limit(5)
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
        $request->validate([
            'expression' => 'required|string|max:255',
            'right_answer' => 'required|string|max:255',
            'false_answer_one' => 'required|string|max:255',
            'false_answer_two' => 'required|string|max:255',
            'expression_language' => 'required|string|in:en,es,hu',
            'answer_language' => 'required|string|in:en,es,hu',
        ]);

        Expression::create([
            'expression' => $request->expression,
            'right_answer' => $request->right_answer,
            'false_answer_one' => $request->false_answer_one,
            'false_answer_two' => $request->false_answer_two,
            'expression_language' => $request->expression_language,
            'answer_language' => $request->answer_language,
            'user_id' => Auth::id(),
            'is_validated' => false,
        ]);

        return redirect()->back()->with('message', 'Expression submitted successfully!');
    }
    // Display unvalidated expressions
    public function adminIndex()
    {
        $expressions = Expression::with('user')->where('is_validated', false)->get();
        return inertia('Admin/UnvalidatedExpressions', ['expressions' => $expressions]);
    }

    // Validate expression
    public function validateExpression(Expression $expression)
    {
        $expression->update(['is_validated' => true]);
        return redirect()->route('admin.expressions')->with('message', 'Expression validated successfully!');
    }

    // Delete expression
    public function destroy(Expression $expression)
    {
        $expression->delete();
        return redirect()->route('admin.expressions')->with('message', 'Expression deleted successfully!');
    }
}
