<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property string $expression
 * @property string $right_answer
 * @property string $false_answer_one
 * @property string $false_answer_two
 * @property string $expression_language
 * @property string $answer_language
 * @property int|null $user_id
 * @property bool $is_validated
 * @property string|null $example_usage
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read User|null $user
 */
class Expression extends Model
{
    use HasFactory;

    protected $fillable = [
        'expression',
        'right_answer',
        'false_answer_one',
        'false_answer_two',
        'expression_language',
        'answer_language',
        'user_id',
        'is_validated',
        'example_usage',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withDefault();
    }
}
