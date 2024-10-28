<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('expressions', function (Blueprint $table) {
            $table->string('right_answer')->nullable()->change();
            $table->string('false_answer_one')->nullable()->change();
            $table->string('false_answer_two')->nullable()->change();
            $table->string('expression_language')->nullable()->change();
            $table->string('answer_language')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('expressions', function (Blueprint $table) {
            $table->string('right_answer')->nullable(false)->change();
            $table->string('false_answer_one')->nullable(false)->change();
            $table->string('false_answer_two')->nullable(false)->change();
            $table->string('expression_language')->nullable(false)->change();
            $table->string('answer_language')->nullable(false)->change();
        });
    }
};
