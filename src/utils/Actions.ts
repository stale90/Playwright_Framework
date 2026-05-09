import { Page, Locator, test as baseTest, expect } from '@playwright/test';
import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

export class Actions {
  // **Page utility methods**
  
  // Navigation to URL
  static async navigateTo(page: Page, url: string): Promise<void> {
    await test.step(`Navigate to: ${url}`, async () => {
      await page.goto(url, { waitUntil: 'networkidle' });
    });
  }

  // Verify Current URL
  static async verifyCurrentUrl(page: Page, expectedUrl: string | RegExp, desc: string): Promise<boolean> {
    let result = false;
    await test.step(`Verify URL "${desc}"`, async () => {
      await expect(page).toHaveURL(expectedUrl);
      result = true;
    });
    return result;
  }

  // **Screenshot with Allure**
  static async addScreenshot(page: Page, desc: string): Promise<void> {
    await test.step(`📸 Screenshot: ${desc}`, async () => {
      const screenshot = await page.screenshot({ fullPage: true });
      const testInfo = baseTest.info();
      await testInfo.attach(`${desc}.png`, {
        body: screenshot,
        contentType: 'image/png'
      });
    });
  }

  // **Locator helper**
  private static getLocator(page: Page, selector: string | Locator): Locator {
    return typeof selector === 'string' ? page.locator(selector) : selector;
  }

  // **Assertions**
  static async verifyTextPartial(page: Page, element: Locator, expectedText: string, desc: string): Promise<void> {
    await test.step(`Verify "${desc}" contains: "${expectedText}"`, async () => {
      await expect(element).toContainText(expectedText);
    });
  }

  static async verifyTextFull(page: Page, element: Locator, expectedText: string, desc: string): Promise<void> {
    await test.step(`Verify "${desc}" exact text: "${expectedText}"`, async () => {
      await expect(element).toHaveText(expectedText);
    });
  }

  static async verifyAttributeValue(
    page: Page, 
    element: Locator, 
    attributeName: string, 
    attributeValue: string, 
    desc: string
  ): Promise<void> {
    await test.step(`Verify "${desc}" attribute "${attributeName}": "${attributeValue}"`, async () => {
      await expect(element).toHaveAttribute(attributeName, attributeValue);
    });
  }

  // **Actions**
  static async fill(page: Page, element: Locator, value: string, desc: string): Promise<void> {
    await test.step(`Fill "${desc}": "${value}"`, async () => {
      await expect(element).toBeVisible();
      await element.fill(value);
    });
  }

  static async typeInput(page: Page, element: Locator, value: string, desc: string): Promise<void> {
    await test.step(`Type into "${desc}": "${value}"`, async () => {
      await expect(element).toBeVisible();
      await element.type(value);
    });
  }

  static async clearInput(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Clear "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.fill('');
    });
  }

  static async click(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Click "${desc}"`, async () => {
      await expect(element).toBeEnabled({ timeout: 10000 });
      await element.click({ force: true });
    });
  }

  static async doubleClick(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Double-click "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.dblclick();
    });
  }

  static async rightClick(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Right-click "${desc}"`, async () => {
      await expect(element).toBeEnabled({ timeout: 10000 });
      await element.click({ button: 'right' });
    });
  }

  static async checkCheckbox(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Check "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.check({ force: true });
    });
  }

  static async uncheckCheckbox(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Uncheck "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.uncheck({ force: true });
    });
  }

  static async selectDropdown(
    page: Page, 
    element: Locator, 
    value: string | string[] | Record<string, any>, 
    desc: string
  ): Promise<void> {
    await test.step(`Select "${value}" in "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.selectOption(value);
    });
  }

  static async uploadFile(page: Page, element: Locator, filePath: string, desc: string): Promise<void> {
    await test.step(`Upload "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.setInputFiles(filePath);
    });
  }

  static async hover(page: Page, element: Locator, desc: string): Promise<void> {
    await test.step(`Hover "${desc}"`, async () => {
      await expect(element).toBeVisible();
      await element.hover();
    });
  }

  // **Verification (Return Boolean)**
  static async isVisible(page: Page, element: Locator, desc: string): Promise<boolean> {
    try {
      await expect(element).toBeVisible({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  static async isEnabled(page: Page, element: Locator, desc: string): Promise<boolean> {
    try {
      await expect(element).toBeEnabled();
      return true;
    } catch {
      return false;
    }
  }

  static async hasText(page: Page, element: Locator, expectedText: string, desc: string): Promise<boolean> {
    try {
      await expect(element).toContainText(expectedText);
      return true;
    } catch {
      return false;
    }
  }

  static async getText(page: Page, element: Locator, desc: string): Promise<string> {
    return await element.textContent() || '';
  }

  static async getAttributeValue(
    page: Page, 
    element: Locator, 
    attr: string, 
    desc: string
  ): Promise<string | null> {
    return await element.getAttribute(attr);
  }

  // **Wait methods**
  static async waitForVisible(page: Page, element: Locator, desc: string, timeout: number = 10000): Promise<void> {
    await test.step(`Wait visible "${desc}"`, async () => {
      await element.waitFor({ state: 'visible', timeout });
    });
  }

  static async waitForHidden(page: Page, element: Locator, desc: string, timeout: number = 10000): Promise<void> {
    await test.step(`Wait hidden "${desc}"`, async () => {
      await element.waitFor({ state: 'hidden', timeout });
    });
  }

  // **Dynamic click**
  static async clickDynamic(page: Page, selector: string | Locator, desc: string): Promise<void> {
    const locator = typeof selector === 'string' ? page.locator(selector) : selector;
    await test.step(`Dynamic click "${desc}"`, async () => {
      await expect(locator).toBeEnabled({ timeout: 10000 });
      await locator.click();
    });
  }

  // **Table helpers**
  static async getTableRowCount(page: Page, table: Locator, desc: string): Promise<number> {
    return await table.locator('tbody tr').count();
  }

  static async getTableCellText(
    page: Page, 
    table: Locator, 
    row: number, 
    col: number, 
    desc: string
  ): Promise<string> {
    const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${col})`);
    await expect(cell).toBeVisible();
    return await cell.textContent() || '';
  }
}