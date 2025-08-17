import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const homePage: string = '/';
const chooseGameMode: string = '/choose-game-mode';

// Define a timeout for navigation and expectations
const navigationTimeout = 60000; // 60 seconds
const expectationTimeout = 30000; // 30 seconds

test('has title', async ({ page }) => {
  await page.goto(homePage, { timeout: navigationTimeout });

  // Expect a title "to contain" a substring with a timeout.
  await expect(page).toHaveTitle(/Welcome/, { timeout: expectationTimeout });
});

test('get started button works', async ({ page }) => {
  await page.goto(homePage, { timeout: navigationTimeout });

  // Click the get started link with a timeout.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'I want to learn...' })).toBeVisible({ timeout: expectationTimeout });
});

test('Can choose game mode', async ({ page }) => {
  await page.goto(chooseGameMode, { timeout: navigationTimeout });

  // choose spanish expressions
  await page.click('a[href="/game"]');

  // Expects page to have a heading with the name of Installation.
  await page.waitForSelector('h2', { state: 'visible', timeout: expectationTimeout });
});

test('Can choose 5 answers', async ({ page }) => {
  await page.goto(chooseGameMode, { timeout: navigationTimeout });

  // choose spanish expressions
  await page.click('a[href="/game"]');

  // Optional: You can adjust or remove this wait if the click is reliable
  await page.waitForTimeout(5000);

  // Click on answers with appropriate timeouts
  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(1)', { timeout: navigationTimeout });
  await page.waitForTimeout(6000); // You may want to adjust this

  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(1)', { timeout: navigationTimeout });
  await page.waitForTimeout(6000); // Adjust if necessary

  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(3)', { timeout: navigationTimeout });
  await page.waitForTimeout(6000); // Adjust if necessary

  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(2)', { timeout: navigationTimeout });
  await page.waitForTimeout(6000); // Adjust if necessary

  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(1)', { timeout: navigationTimeout });

  await expect(page.getByRole('link', { name: 'Go to main page' })).toBeVisible({ timeout: expectationTimeout });
});
