<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('expressions', function (Blueprint $table) {
            $table->id();
            $table->string('expression');
            $table->string('right_answer');
            $table->string('false_answer_one');
            $table->string('false_answer_two');
            $table->string('language'); // 'spanish' or 'english'
            $table->string('created_by');
            $table->timestamps();
            $table->boolean('is_validated')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expressions');
    }
};
