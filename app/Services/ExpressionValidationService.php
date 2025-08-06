<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class ExpressionValidationService
{
    /**
     * Validate expression data from request
     *
     * @param Request $request
     * @return array
     * @throws ValidationException
     */
    public function validateExpressionData(Request $request): array
    {
        return $request->validate([
            'expression' => 'required|string|max:255',
            'right_answer' => 'nullable|string|max:255',
            'false_answer_one' => 'nullable|string|max:255',
            'false_answer_two' => 'nullable|string|max:255',
            'expression_language' => 'required|string|in:en,es,hu',
            'answer_language' => 'required|string|in:en,es,hu',
            'example_usage' => 'nullable|string|max:255',
        ]);
    }

    /**
     * Get validated expression data for creation
     *
     * @param Request $request
     * @param int $userId
     * @return array
     */
    public function getValidatedExpressionData(Request $request, int $userId): array
    {
        $validatedData = $this->validateExpressionData($request);
        
        return array_merge($validatedData, [
            'user_id' => $userId,
            'is_validated' => false,
        ]);
    }
} 