import { test, expect } from '@playwright/test';

// Reuse timeouts from other specs
const navigationTimeout = 60000;
const expectationTimeout = 30000;

test.describe('Admin UnvalidatedExpressions pair filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('selecting a pair updates the list and URL query', async ({ page }) => {
    // Login as admin
    await page.goto('/login', { timeout: navigationTimeout });
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button:has-text("Log in")');
    await page.waitForURL('/', { timeout: expectationTimeout });

    // Go to admin page
    await page.goto('/admin/unvalidated-expressions', { timeout: navigationTimeout });
    await expect(page).toHaveURL(/admin\/unvalidated-expressions/, { timeout: expectationTimeout });

    // If no pairs exist, bail early to avoid false failure
    const pairChips = page.locator('button:has-text("-")');
    const pairCount = await pairChips.count();
    test.skip(pairCount === 0, 'No pairs available in this dataset to test.');

    // Click first pair chip
    const firstPair = pairChips.first();
    const firstPairText = await firstPair.textContent();
    await firstPair.click();

    // Expect URL updated with exp & ans
    if (firstPairText) {
      const [exp, ans] = firstPairText.split('-').map((s) => s.trim());
      await expect(page).toHaveURL(new RegExp(`exp=${exp}.*ans=${ans}|ans=${ans}.*exp=${exp}`), { timeout: expectationTimeout });
    }

    // Expect some card(s) visible after filter
    const cards = page.locator('[aria-label="Validate"]').first();
    await expect(cards).toBeVisible({ timeout: expectationTimeout });
  });
});


