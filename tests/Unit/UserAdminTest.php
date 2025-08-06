<?php

namespace Tests\Unit;

use App\Models\User;
use Tests\TestCase;

class UserAdminTest extends TestCase
{
    public function test_user_is_admin_when_email_matches_config()
    {
        // Set the admin email in config
        config(['auth.admin_email' => 'admin@example.com']);

        // Create a user instance without saving to database
        $adminUser = new User;
        $adminUser->email = 'admin@example.com';

        // Assert that the user is recognized as admin
        $this->assertTrue($adminUser->isAdmin());
    }

    public function test_user_is_not_admin_when_email_does_not_match_config()
    {
        // Set the admin email in config
        config(['auth.admin_email' => 'admin@example.com']);

        // Create a user instance without saving to database
        $regularUser = new User;
        $regularUser->email = 'user@example.com';

        // Assert that the user is not recognized as admin
        $this->assertFalse($regularUser->isAdmin());
    }

    public function test_admin_functionality_works_with_environment_variable()
    {
        // Set the admin email via environment variable
        config(['auth.admin_email' => env('ADMIN_EMAIL', 'admin@example.com')]);

        // Create a user instance without saving to database
        $adminUser = new User;
        $adminUser->email = 'admin@example.com';

        // Assert that the user is recognized as admin
        $this->assertTrue($adminUser->isAdmin());
    }

    public function test_admin_email_configuration_is_secure()
    {
        // Test that the config value is properly set from environment
        $expectedEmail = 'secure-admin@example.com';
        config(['auth.admin_email' => $expectedEmail]);

        $adminUser = new User;
        $adminUser->email = $expectedEmail;

        $this->assertTrue($adminUser->isAdmin());
        $this->assertEquals($expectedEmail, config('auth.admin_email'));
    }
}
