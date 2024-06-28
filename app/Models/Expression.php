<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expression extends Model
{
    use HasFactory;

    protected $fillable = [
        'expression',
        'right_answer',
        'false_answer_one',
        'false_answer_two',
        'language',
        'created_by',
        'is_validated',
    ];
}
