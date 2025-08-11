import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.APP_URL;

// Guard: only run if APP_URL is configured to a safe environment
const run = !!baseUrl && /localhost|127\.0\.0\.1|\.local/.test(baseUrl);

(run ? test : test.skip)("Clicking 'Give me more (5)' loads a new set of expressions", async ({ page }) => {
  const chooseGameMode = baseUrl!.replace(/\/$/, '') + '/choose-game-mode';

  await page.goto(chooseGameMode);

  // Start game (assumes LanguageCard link to /game)
  await page.click('a[href="/game"]');

  // Wait for first question to appear
  await page.waitForSelector('div.flex.flex-col.gap-3');

  // Answer 5 questions by clicking first visible choice each time
  for (let i = 0; i < 5; i++) {
    await page.click('div.flex.flex-col.gap-3 > div.cursor-pointer');
    await page.waitForTimeout(1100); // allow transition/next question
  }

  // We are on Score page; capture current expressions by fetching from store via window
  // NOTE: The store isn't directly accessible; instead, fetch visible header sequence during play is hard.
  // For a pragmatic check, we rely on triggering a refetch and asserting network call count changes.

  // Intercept network calls to /random-expressions
  const calls: string[] = [];
  await page.route('**/random-expressions**', (route) => {
    calls.push(route.request().url());
    route.continue();
  });

  // Click Give me more
  await page.getByRole('button', { name: /Give me more \(5\)/ }).click();

  // Expect another request to be made shortly after clicking
  await expect.poll(() => calls.length, { timeout: 4000 }).toBeGreaterThanOrEqual(1);
});


