import { test, expect } from '@playwright/test';

test('sample test', async ({ page }) => {
  await page.goto('');
  await page.getByRole('link', { name: 'Playwright Training' }).click();
  const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
  await page1.getByRole('link', { name: 'What is Playwright?' }).click();
  await page1.getByRole('heading', { name: 'What is Playwright?' }).click();
});


test.only('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('heading', { name: 'Playwright enables reliable' }).click();
  await page.getByText('Full-featured test runner').click();
  await page.getByText('npm init playwright@latest').click();
  await page.getByRole('link', { name: 'Model Context Protocol' }).click();
  await page.goto('https://www.letskodeit.com/practice');
  await page.locator('#radio-btn-example').getByText('BMW').click();
  await page.getByRole('textbox', { name: 'Enter Your Name' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Alert' }).click();
  await page.getByRole('cell', { name: 'Let\'s Kode It' }).first().click();
  await page.getByRole('cell', { name: 'Python Programming Language' }).click();
  await page.getByRole('cell', { name: '30' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Open Window' }).click();
  const page1 = await page1Promise;
});