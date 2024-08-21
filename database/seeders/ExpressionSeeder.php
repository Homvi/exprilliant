<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ExpressionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate the expressions table to avoid duplicates
        DB::table('expressions')->truncate();

        // Fetch the first user
        $user = User::first();

        if ($user) {
            // Load and decode the JSON file
            $jsonFilePath = database_path('data/expressions.json');
            $expressions = json_decode(File::get($jsonFilePath), true);

            // Map through the expressions and add the user_id and created_at fields
            $expressions = array_map(function ($expression) use ($user) {
                $expression['user_id'] = $user->id;
                $expression['created_at'] = now();
                $expression['updated_at'] = $expression['updated_at'] ?? null; // Set to null if not present
                return $expression;
            }, $expressions);

            // Insert the expressions into the database
            DB::table('expressions')->insert($expressions);
        }
    }
}
