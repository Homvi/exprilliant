<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Database\Seeders\ProductionExpressionSeeder;

class SeedExpressions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expressions:seed {--force : Force the operation to run in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Safely seed expressions from JSON file to production database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        if (app()->environment('production') && !$this->option('force')) {
            $this->error('This command cannot be run in production without the --force flag.');
            return 1;
        }

        $this->info('🌱 Starting safe expression seeding...');

        try {
            $seeder = new ProductionExpressionSeeder();
            $seeder->setCommand($this);
            $seeder->run();

            $this->info('✅ Expression seeding completed successfully!');
            return 0;
        } catch (\Exception $e) {
            $this->error('❌ Error during seeding: ' . $e->getMessage());
            return 1;
        }
    }
}
