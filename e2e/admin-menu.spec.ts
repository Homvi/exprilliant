import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

// Since we have baseURL configured in playwright.config.ts,
// we can use relative URLs in our tests
const homePage: string = '/';

// Define a timeout for navigation and expectations
const navigationTimeout = 60000; // 60 seconds
const expectationTimeout = 30000; // 30 seconds

test.describe('Admin Menu E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing authentication state
    await page.context().clearCookies();
  });

  test('admin menu items are visible for admin users', async ({ page }) => {
    // First, we need to create and authenticate as an admin user
    // This would typically be done through:
    // 1. Database seeding before tests
    // 2. API calls to create users
    // 3. Direct database manipulation
    
    // For now, let's assume we have an admin user created via database seeding
    // You would need to run: php artisan db:seed --class=AdminUserSeeder
    
    // Navigate to login page
    await page.goto('/login', { timeout: navigationTimeout });
    
    // Login as admin user (you'd need to create this user first)
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    
    // Wait for redirect to home page
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Check if the burger menu exists
    const burgerMenu = page.locator('[role="menubar"]');
    await expect(burgerMenu).toBeVisible({ timeout: expectationTimeout });

    // Click on the burger menu to open it
    await burgerMenu.click();

    // Check if the "Validate expressions" menu item is present for admin users
    const validateExpressionsMenuItem = page.getByRole('menuitem', { name: 'Validate expressions' });
    await expect(validateExpressionsMenuItem).toBeVisible({ timeout: expectationTimeout });
  });

  test('admin menu items are hidden for non-admin users', async ({ page }) => {
    // Login as a regular user
    await page.goto('/login', { timeout: navigationTimeout });
    
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Check if the burger menu exists
    const burgerMenu = page.locator('[role="menubar"]');
    await expect(burgerMenu).toBeVisible({ timeout: expectationTimeout });

    // Click on the burger menu to open it
    await burgerMenu.click();

    // For non-admin users, the "Validate expressions" menu item should not be visible
    const validateExpressionsMenuItem = page.getByRole('menuitem', { name: 'Validate expressions' });
    await expect(validateExpressionsMenuItem).not.toBeVisible({ timeout: expectationTimeout });
  });

  test('admin menu items are hidden for unauthenticated users', async ({ page }) => {
    await page.goto('/', { timeout: navigationTimeout });

    // Check if the burger menu exists
    const burgerMenu = page.locator('[role="menubar"]');
    await expect(burgerMenu).toBeVisible({ timeout: expectationTimeout });

    // Click on the burger menu to open it
    await burgerMenu.click();

    // For unauthenticated users, the "Validate expressions" menu item should not be visible
    const validateExpressionsMenuItem = page.getByRole('menuitem', { name: 'Validate expressions' });
    await expect(validateExpressionsMenuItem).not.toBeVisible({ timeout: expectationTimeout });
  });

  test('admin can access admin routes', async ({ page }) => {
    // Login as admin user
    await page.goto('/login', { timeout: navigationTimeout });
    
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Try to access the admin route directly
    await page.goto('/admin/unvalidated-expressions', { timeout: navigationTimeout });

    // Should be able to access the admin page
    await expect(page).toHaveURL(/.*admin\/unvalidated-expressions/, { timeout: expectationTimeout });
    await expect(page).toHaveTitle(/Admin|Unvalidated|Expressions/, { timeout: expectationTimeout });
  });

  test('non-admin cannot access admin routes', async ({ page }) => {
    // Login as regular user
    await page.goto('/login', { timeout: navigationTimeout });
    
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Try to access the admin route directly
    await page.goto('/admin/unvalidated-expressions', { timeout: navigationTimeout });

    // Should be redirected to home page
    await expect(page).toHaveURL('/', { timeout: expectationTimeout });
  });

  test('unauthenticated user cannot access admin routes', async ({ page }) => {
    // Try to access the admin route directly without logging in
    await page.goto('/admin/unvalidated-expressions', { timeout: navigationTimeout });

    // Should be redirected to login page
    await expect(page).toHaveURL(/.*login.*/, { timeout: expectationTimeout });
  });

  test('mobile admin menu works correctly', async ({ page }) => {
    // Login as admin user
    await page.goto('/login', { timeout: navigationTimeout });
    
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if the mobile menu button exists
    const mobileMenuButton = page.locator('.btn.btn-ghost.btn-circle');
    await expect(mobileMenuButton).toBeVisible({ timeout: expectationTimeout });

    // Click on the mobile menu button to open it
    await mobileMenuButton.click();

    // Check if the mobile menu dropdown is visible
    const mobileMenuDropdown = page.locator('.dropdown-content');
    await expect(mobileMenuDropdown).toBeVisible({ timeout: expectationTimeout });

    // Check for admin menu items in mobile view
    const validateExpressionsMenuItem = page.getByRole('link', { name: 'Validate expressions' });
    await expect(validateExpressionsMenuItem).toBeVisible({ timeout: expectationTimeout });
  });
});
