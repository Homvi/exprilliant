import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const homePage: string = process.env.APP_URL as string;
const chooseGameMode: string = process.env.APP_URL + 'choose-game-mode';

test('has title', async ({ page }) => {
  await page.goto(homePage);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Welcome - Exprilliant');
});

test('get started button works', async ({ page }) => {
  await page.goto(homePage);

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'I want to learn...' })).toBeVisible();
});

test('Can choose game mode', async ({ page }) => {
  await page.goto(chooseGameMode);

  // choose spanish expressions
  await page.click('a[href="/game"]');

  // Expects page to have a heading with the name of Installation.
  await page.waitForSelector('h2', { state: 'visible' });
});

test('Can choose 5 answers', async ({ page }) => {
  await page.goto(chooseGameMode);

  // choose spanish expressions
  await page.click('a[href="/game"]');
  await page.waitForTimeout(5000);
  // click on an answer
  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(1)');
  await page.waitForTimeout(6000);
  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(1)');
  await page.waitForTimeout(6000);
  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(3)');
  await page.waitForTimeout(6000);
  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(2)');
  await page.waitForTimeout(6000);
  await page.click('.flex.flex-col.gap-3 div.cursor-pointer:nth-child(1)');

  await expect(page.getByRole('link', { name: 'Go to main page' })).toBeVisible();
});
