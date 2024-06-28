<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expressions', function (Blueprint $table) {
            $table->id();
            $table->string('expression');
            $table->string('right_answer');
            $table->string('false_answer_one');
            $table->string('false_answer_two');
            $table->string('expression_language'); // Language of the expression
            $table->string('answer_language'); // Language of the answer
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
            $table->boolean('is_validated')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expressions');
    }
};
