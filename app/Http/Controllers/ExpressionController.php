<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expression;
use Illuminate\Support\Facades\Validator;

class ExpressionController extends Controller
{
    public function getRandomExpressions(Request $request)
    {
        $mode = $request->query('mode');

        if ($mode === 'es-en') {
            // Fetch Spanish expressions to English
            $expressions = Expression::where('expression_language', 'es')
                ->where('answer_language', 'en')
                ->where('is_validated', true)
                ->inRandomOrder()
                ->limit(5)
                ->get();
        } elseif ($mode === 'en-es') {
            // Fetch English expressions to Spanish
            $expressions = Expression::where('expression_language', 'en')
                ->where('answer_language', 'es')
                ->where('is_validated', true)
                ->inRandomOrder()
                ->limit(5)
                ->get();
        } else {
            return response()->json(['error' => 'Invalid mode'], 400);
        }

        return response()->json($expressions);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'expression' => 'required|string|max:255',
            'right_answer' => 'required|string|max:255',
            'false_answer_one' => 'required|string|max:255',
            'false_answer_two' => 'required|string|max:255',
            'language' => 'required|string|in:spanish,english',
            'created_by' => 'required|string|max:255',
            'is_validated' => 'prohibited', // This line ensures that the is_validated field is not allowed in the request
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $expression = Expression::create([
            'expression' => $request->input('expression'),
            'right_answer' => $request->input('right_answer'),
            'false_answer_one' => $request->input('false_answer_one'),
            'false_answer_two' => $request->input('false_answer_two'),
            'language' => $request->input('language'),
            'created_by' => $request->input('created_by'),
            'is_validated' => false, // Default to false
        ]);

        return response()->json($expression, 201);
    }
}
