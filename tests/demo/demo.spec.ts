import { test, expect } from '@playwright/test'


test('My First Test', async ({ page }) => {

  console.log("Test1 Method Executeed");
  page.goto('https://www.w3schools.com/');
  await page.waitForLoadState('networkidle');

});


test('My Second Test', async ({ page }) => {

  console.log("Test2 Method Executed");
  page.goto('https://www.letskodeit.com/practice');
  await page.waitForLoadState('networkidle');

});


test('My Third Test', async ({ page }) => {

  console.log('Test3 Method Executed');
  page.goto('https://www.ixigo.com/');
  await page.waitForLoadState('networkidle');

});

test('My Fourth Test', async ({ page }) => {

  console.log('Test4 Method Executed');
  page.goto('https://playwright.dev/');
  await page.waitForLoadState('networkidle');

});

test('My Five Test', async ({ page }) => {

  console.log('Test5 Method Executed');
  page.goto('demo.playwright.dev/todomvc');
  await page.waitForLoadState('networkidle');

});