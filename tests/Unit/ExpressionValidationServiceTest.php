<?php

namespace Tests\Unit;

use App\Services\ExpressionValidationService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class ExpressionValidationServiceTest extends TestCase
{
    protected ExpressionValidationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new ExpressionValidationService;
    }

    public function test_validates_valid_expression_data()
    {
        $request = new Request([
            'expression' => 'Hello World',
            'right_answer' => 'Hola Mundo',
            'false_answer_one' => 'Bonjour Monde',
            'false_answer_two' => 'Ciao Mondo',
            'expression_language' => 'en',
            'answer_language' => 'es',
            'example_usage' => 'Example usage text',
        ]);

        $result = $this->service->validateExpressionData($request);

        $this->assertIsArray($result);
        $this->assertEquals('Hello World', $result['expression']);
        $this->assertEquals('en', $result['expression_language']);
        $this->assertEquals('es', $result['answer_language']);
    }

    public function test_validates_expression_data_with_nullable_fields()
    {
        $request = new Request([
            'expression' => 'Test Expression',
            'expression_language' => 'en',
            'answer_language' => 'hu',
        ]);

        $result = $this->service->validateExpressionData($request);

        $this->assertIsArray($result);
        $this->assertEquals('Test Expression', $result['expression']);
        $this->assertNull($result['right_answer'] ?? null);
        $this->assertNull($result['false_answer_one'] ?? null);
        $this->assertNull($result['false_answer_two'] ?? null);
    }

    public function test_throws_exception_for_invalid_language()
    {
        $this->expectException(ValidationException::class);

        $request = new Request([
            'expression' => 'Test',
            'expression_language' => 'invalid',
            'answer_language' => 'en',
        ]);

        $this->service->validateExpressionData($request);
    }

    public function test_get_validated_expression_data_includes_user_id_and_validation_status()
    {
        $request = new Request([
            'expression' => 'Test Expression',
            'expression_language' => 'en',
            'answer_language' => 'es',
        ]);

        $result = $this->service->getValidatedExpressionData($request, 123);

        $this->assertEquals('Test Expression', $result['expression']);
        $this->assertEquals(123, $result['user_id']);
        $this->assertFalse($result['is_validated']);
    }
}
