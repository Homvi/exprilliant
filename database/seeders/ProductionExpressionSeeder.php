<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductionExpressionSeeder extends Seeder
{
    /**
     * Run the database seeds safely for production.
     */
    public function run(): void
    {
        // Use the first registered user (you)
        $user = User::first();

        if (! $user) {
            $this->command->error('No users found in the database. Please ensure you exist in the database.');
            return;
        }

        $this->command->info('Using existing user: ' . $user->name . ' (ID: ' . $user->id . ')');

        // Load and decode the JSON file
        $jsonFilePath = database_path('data/expressions.json');
        $expressions = json_decode(File::get($jsonFilePath), true);

        $inserted = 0;
        $skipped = 0;

        foreach ($expressions as $expressionData) {
            // Check if expression already exists (by expression text and language)
            $exists = DB::table('expressions')
                ->where('expression', $expressionData['expression'])
                ->where('expression_language', $expressionData['expression_language'])
                ->exists();

            if (!$exists) {
                // Prepare the expression data
                $expressionData['user_id'] = $user->id;
                $expressionData['created_at'] = now();
                $expressionData['updated_at'] = $expressionData['updated_at'] ?? null;

                // Insert the expression
                DB::table('expressions')->insert($expressionData);
                $inserted++;
            } else {
                $skipped++;
            }
        }

        $this->command->info("Production seeding completed:");
        $this->command->info("- {$inserted} new expressions inserted");
        $this->command->info("- {$skipped} existing expressions skipped");
    }
}
