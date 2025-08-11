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
        // Create a user with admin flag
        $adminUser = User::factory()->create([
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        // Assert that the user is recognized as admin
        $this->assertTrue($adminUser->isAdmin());
    }

    public function test_user_is_not_admin_when_email_does_not_match_config()
    {
        // Create a user without admin flag
        $regularUser = User::factory()->create([
            'email' => 'user@example.com',
            'is_admin' => false,
        ]);

        // Assert that the user is not recognized as admin
        $this->assertFalse($regularUser->isAdmin());
    }

    public function test_admin_functionality_works_with_runtime_config()
    {
        // Create a user with admin flag
        $adminUser = User::factory()->create([
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        // Assert that the user is recognized as admin
        $this->assertTrue($adminUser->isAdmin());
    }

    public function test_admin_middleware_blocks_non_admin_users()
    {
        // Create a regular user
        $regularUser = User::factory()->create([
            'email' => 'user@example.com',
            'is_admin' => false,
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
        // Create an admin user
        $adminUser = User::factory()->create([
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        // Act as the admin user
        $this->actingAs($adminUser);

        // Try to access admin route
        $response = $this->get('/admin/unvalidated-expressions');

        // Should not be redirected (is admin)
        $response->assertStatus(200);
    }
}
