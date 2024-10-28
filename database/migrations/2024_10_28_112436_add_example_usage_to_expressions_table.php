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
            $table->text('example_usage')->nullable()->after('answer_language');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('expressions', function (Blueprint $table) {
            $table->dropColumn('example_usage');
        });
    }
};
