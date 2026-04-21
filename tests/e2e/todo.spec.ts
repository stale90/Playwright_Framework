import { test , expect } from '@playwright/test'

test('Todo List Application test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Prepare Playwright');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Clear Interview');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Keep Learning');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'Prepare Playwright' }).getByLabel('Toggle Todo').check();
  await page.getByRole('listitem').filter({ hasText: 'Prepare Playwright' }).getByLabel('Toggle Todo').uncheck();
});