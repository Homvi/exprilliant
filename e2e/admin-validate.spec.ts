import { test, expect } from '@playwright/test';

const navigationTimeout = 60000;
const expectationTimeout = 30000;

test.describe('Admin validate flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('validate first unvalidated expression', async ({ page }) => {
    // Login as admin
    await page.goto('/login', { timeout: navigationTimeout });
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Go to admin page
    await page.goto('/admin/unvalidated-expressions', { timeout: navigationTimeout });
    await expect(page).toHaveURL(/admin\/unvalidated-expressions/, { timeout: expectationTimeout });

    // If there are no cards, skip
    const validateButtons = page.getByRole('button', { name: 'Validate' });
    const count = await validateButtons.count();
    test.skip(count === 0, 'No unvalidated expressions to validate.');

    // Click first Validate
    await validateButtons.first().click();

    // Confirm in modal
    const confirm = page.getByRole('button', { name: 'Validate' }).last();
    await expect(confirm).toBeVisible({ timeout: expectationTimeout });
    await confirm.click();

    // Expect success: either a toast or fewer validate buttons
    await expect(async () => {
      const afterCount = await page.getByRole('button', { name: 'Validate' }).count();
      expect(afterCount).toBeLessThan(count);
    }).toPass();
  });
});


