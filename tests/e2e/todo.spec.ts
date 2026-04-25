import { test , expect } from '@playwright/test'
import * as allure from 'allure-js-commons';

test('Todo List Application test', async ({ page }) => {
 await allure.epic("TODO");
 await allure.feature("Task Operations");
 await allure.story("Add Task");
 await allure.severity("Normal");
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

test('Todo List Application test 1', async ({ page }) => {
 await allure.epic("NOTTODO");
 await allure.feature("Task Operations");
 await allure.story("Remove Task");
 await allure.severity("Critical");
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