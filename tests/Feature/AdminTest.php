<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_is_admin_when_email_matches_config()
    {
        // Set the admin email in config
        config(['auth.admin_email' => 'admin@example.com']);

        // Create a user with the admin email
        $adminUser = User::factory()->create([
            'email' => 'admin@example.com',
        ]);

        // Assert that the user is recognized as admin
        $this->assertTrue($adminUser->isAdmin());
    }

    public function test_user_is_not_admin_when_email_does_not_match_config()
    {
        // Set the admin email in config
        config(['auth.admin_email' => 'admin@example.com']);

        // Create a user with a different email
        $regularUser = User::factory()->create([
            'email' => 'user@example.com',
        ]);

        // Assert that the user is not recognized as admin
        $this->assertFalse($regularUser->isAdmin());
    }

    public function test_admin_functionality_works_with_environment_variable()
    {
        // Set the admin email via environment variable
        config(['auth.admin_email' => env('ADMIN_EMAIL', 'admin@example.com')]);

        // Create a user with the admin email
        $adminUser = User::factory()->create([
            'email' => 'admin@example.com',
        ]);

        // Assert that the user is recognized as admin
        $this->assertTrue($adminUser->isAdmin());
    }

    public function test_admin_middleware_blocks_non_admin_users()
    {
        // Set the admin email in config
        config(['auth.admin_email' => 'admin@example.com']);

        // Create a regular user
        $regularUser = User::factory()->create([
            'email' => 'user@example.com',
        ]);

        // Act as the regular user
        $this->actingAs($regularUser);

        // Try to access admin route
        $response = $this->get('/admin/unvalidated-expressions');

        // Should be redirected (not admin)
        $response->assertRedirect('/');
    }

    public function test_admin_middleware_allows_admin_users()
    {
        // Set the admin email in config
        config(['auth.admin_email' => 'admin@example.com']);

        // Create an admin user
        $adminUser = User::factory()->create([
            'email' => 'admin@example.com',
        ]);

        // Act as the admin user
        $this->actingAs($adminUser);

        // Try to access admin route
        $response = $this->get('/admin/unvalidated-expressions');

        // Should not be redirected (is admin)
        $response->assertStatus(200);
    }
} 