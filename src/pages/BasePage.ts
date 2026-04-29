import { test, Page, Locator, expect, TestInfo } from '@playwright/test'
import * as allure from "allure-js-commons";

export class BasePage {

    readonly page: Page;

    // Class Constructor
    constructor(page: Page) {
        this.page = page;
    }
    
  // Take screenshot using Allure report
    async addScreenshot(desc: string): Promise<void> {
    await test.step(`📸 Screenshot: ${desc}`, async () => {
      const screenshot = await this.page.screenshot();
      allure.attachment(`${desc}`, screenshot, "image/png");
    });
  }

    // **Page fuction methods**
    // Navigation to Url
    async navigateTo(url: string): Promise<void> {
        await test.step(`Navigate to Test URL : ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    // Verify Current URL with expected Url
    async verifyCurrentUrl(expectedUrl: string | RegExp, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify current URL "${desc}"`, async () => {
            await expect(this.page).toHaveURL(expectedUrl);
            result = true;
        });
        return result;
    }

     // Get Locator from string at run time
    private getLocatorByString(selector: string | Locator): Locator {
        return typeof selector === 'string' ? this.page.locator(selector) : selector;
    }

    // **Expect Assertions Methods**
    // Verify Element for Containing Text
    async verifyTextPartial(element: Locator, expectedText: string, desc: string): Promise<void> {
        await test.step(`Verify Text of "${desc}" as : "${expectedText}" `, async () => {
            await expect(element).toContainText(expectedText);
        });
    }

    // Verify Element for Having Full Text
    async verifyTextFull(element: Locator, expectedText: string, desc: string): Promise<void> {
        await test.step(`Verify Text of "${desc}" as : "${expectedText}" `, async () => {
            await expect(element).toHaveText(expectedText);
        },{ box: true });
    
    }

    // Verify Element Attribute for Some Value/Text
    async verifyAttributeValue(element: Locator, attributeName: string, attributeValue: string, desc: string): Promise<void> {
        await test.step(`Verify Element's attribute "${attributeName}"  for value : "${attributeValue}" `, async () => {
            await expect(element).toHaveAttribute(attributeName, attributeValue);
        });
    }

    // **Methods to perform Actions on Element**
    // Input value in TextBox
    async fill(element: Locator, value: string, desc: string): Promise<void> {
        await test.step(`Input Text into "${desc}" as : "${value}"`, async () => {
            await expect(element).toBeVisible();
            await element.fill(value);
        });
    }

     // Input value vis type where each char has keyup down, input char and key up sequence
    async typeInput(element: Locator, value: string, desc: string): Promise<void> {
        await test.step(`Type into "${desc}" : "${value}"`, async () => {
            await expect(element).toBeVisible();
            await element.type(value);
        });
    }

    // Input empty string '' in TextBox
    async clearInput(element: Locator, desc: string): Promise<void> {
        await test.step(`Clear "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.fill('');
        });
    }

    // Click on Element like Button,Link etc.
    async click(element: Locator, desc: string): Promise<void> {
        await test.step(`Click on "${desc}" `, async () => {
            await expect(element).toBeEnabled({ timeout: 10000 });
            await element.click();
        });
    }

    // Double Click on Element like Button,Link etc.
    async doubleClick(element: Locator, desc: string): Promise<void> {
        await test.step(`Double click on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.dblclick();
        });
    }

    // Right Click on Element like Button,Link etc.
    async rightClick(element: Locator, desc: string): Promise<void> {
        await test.step(`Right click on "${desc}"`, async () => {
            await expect(element).toBeEnabled({ timeout: 10000 });
            await element.click({ button: 'right' });
        });
    }

    // Check a Checkbox Element.
    async checkCheckbox(element: Locator, desc: string): Promise<void> {
        await test.step(`Check "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.check();
        });
    }

    // Uncheck a Checkbox Element.
    async uncheckCheckbox(element: Locator, desc: string): Promise<void> {
        await test.step(`Uncheck "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.uncheck();
        });
    }

    // Select a Radio Button Element.
    async selectRadio(element: Locator, desc: string): Promise<void> {
        await test.step(`Select radio "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.check();
        });
    }

    // Select DropDown value by 'Value'.
    async selectDropdown(element: Locator, value: string | string[], desc: string): Promise<void> {
        await test.step(`Select "${value}" from "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.selectOption(value);
        });
    }

    // Select DropDown value by 'Label' attribute.
    async selectByLabel(dropdown: Locator, label: string, desc: string): Promise<void> {
        await test.step(`Select by label "${label}" in "${desc}"`, async () => {
            await dropdown.selectOption({ label });
        });
    }

    // Upload file
    async uploadFile(element: Locator, filePath: string, desc: string): Promise<void> {
        await test.step(`Upload file "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.setInputFiles(filePath);
        });
    }

    // Perform Hover on Web Element.
    async hover(element: Locator, desc: string): Promise<void> {
        await test.step(`Hover over "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.hover();
        });
    }

    // Perform focus on Web Element.
    async focus(element: Locator, desc: string): Promise<void> {
        await test.step(`Focus on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.focus();
        });
    }

    // Perform Scroll into View if Needed on Web Element.
    async scrollIntoView(element: Locator, desc: string): Promise<void> {
        await test.step(`Scroll "${desc}" into view`, async () => {
            await element.scrollIntoViewIfNeeded();
        });
    }

    // Perform DRAG & DROP on Web Element
    async dragAndDrop(from: Locator, to: Locator, desc: string): Promise<void> {
        await test.step(`Drag & drop "${desc}"`, async () => {
            await from.dragTo(to);
        });
    }

    // VERIFICATION METHODS (Return Boolean)
    // Verify If Element is Enabled and return True
    async isVisible(element: Locator, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" is visible`, async () => {
            await expect(element).toBeVisible({ timeout: 5000 });
            result = true;
        });
        return result;
    }

    // Verify If Element is Enabled and return True
    async isEnabled(element: Locator, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" is enabled`, async () => {
            await expect(element).toBeEnabled();
            result = true;
        });
        return result;
    }

    // Verify If Element hasText and return True
    async hasText(element: Locator, expectedText: string, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" has text "${expectedText}"`, async () => {
            await expect(element).toContainText(expectedText);
            result = true;
        });
        return result;
    }

    // Verify If Element has certain Attribute with expected value
    async verifyAttribute(element: Locator, attr: string, value: string, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" attribute "${attr}" = "${value}"`, async () => {
            await expect(element).toHaveAttribute(attr, value);
            result = true;
        });
        return result;
    }

    // Verify If Element has 'Placeholder' attribute with expected value
    async verifyPlaceholder(element: Locator, expected: string, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" placeholder "${expected}"`, async () => {
            await expect(element).toHaveAttribute('placeholder', expected);
            result = true;
        });
        return result;
    }

    // Verify If Element Exists and return True if Yes.
    async elementExists(element: Locator, desc: string): Promise<boolean> {
        let exists = false;
        await test.step(`Verify Element "${desc}" exists`, async () => {
            exists = await element.count() > 0;
        });
        return exists;
    }

    // Get Element count from Locator.
    async getElementCount(element: Locator, desc: string): Promise<number> {
        let count = 0;
        await test.step(`Get count of "${desc}"`, async () => {
            count = await element.count();
        });
        return count;
    }

    // Get TEXT Content of Element
    async getText(element: Locator, desc: string): Promise<string> {
        let text = '';
        await test.step(`Get text of "${desc}"`, async () => {
            text = await element.textContent() || '';
        });
        return text;
    }

    // Get Value of specific Attribute of Element
    async getAttributeValue(element: Locator, attr: string, desc: string): Promise<string | null> {
        let attrValue: string | null = null;
        await test.step(`Get "${attr}" attribute of "${desc}"`, async () => {
            attrValue = await element.getAttribute(attr);
        });
        return attrValue;
    }

    // WAIT For Element till Visible state
    async waitForVisible(element: Locator, desc: string, timeout: number = 10000): Promise<void> {
        await test.step(`Wait for "${desc}" to be visible`, async () => {
            await element.waitFor({ state: 'visible', timeout });
        });
    }

    // WAIT For Element till Hidden state
    async waitForHidden(element: Locator, desc: string, timeout: number = 10000): Promise<void> {
        await test.step(`Wait for "${desc}" to be hidden`, async () => {
            await element.waitFor({ state: 'hidden', timeout });
        });
    }

    // Press key from Keyboard
    async pressKey(element: Locator, key: string, desc: string): Promise<void> {
        await test.step(`Press "${key}" on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.press(key);
        });
    }

    // Get Table row count
    async getTableRowCount(table: Locator, desc: string): Promise<number> {
        let rowCount = 0;
        await test.step(`Get row count of table "${desc}"`, async () => {
            rowCount = await table.locator('tbody tr').count();
        });
        return rowCount;
    }
    // Get Cell Text of mentoined Row and Rolumn in Table
    async getTableCellText(table: Locator, row: number, col: number, desc: string): Promise<string> {
        const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${col})`);
        await test.step(`Get table cell [${row},${col}] text from "${desc}"`, async () => {
            await expect(cell).toBeVisible();
        });
        return await cell.textContent() || '';
    }

    // Identify Locator from String at run time and Perform Click Operation
    async clickDynamic(selector: string | Locator, desc: string): Promise<void> {
        await test.step(`Click on "${desc}" `, async () => {
            const locator = this.getLocatorByString(selector);
            await expect(locator).toBeEnabled({ timeout: 10000 });
            await locator.click();
        });
    }

    /* Take screenshot and attach to the step
    async addScreenshot(desc: string): Promise<void> {
    await test.step(`📸 Screenshot: ${desc}`, async () => {
      const screenshot = await this.page.screenshot({ fullPage: true });

      await this.testInfo.attach(`${desc}.png`, {
        body: screenshot,
        contentType: 'image/png'
      });
    });
  } */

}