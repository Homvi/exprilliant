<?php

namespace App\Http\Controllers;

use App\Models\Expression;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChooseGameModeController extends Controller
{
    public function __invoke(Request $request)
    {
        // Get the count of expressions per language pair
        $expressionCounts = Expression::where('is_validated', true)
            ->get()
            ->groupBy(function ($item) {
                return "{$item->expression_language}-{$item->answer_language}";
            })
            ->map->count();

        // Pass the counts to the frontend
        return Inertia::render('ChooseGameMode', [
            'expressionCounts' => $expressionCounts
        ]);
    }
}
