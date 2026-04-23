import { test, Page, Locator, expect } from '@playwright/test'
import { WaitHelper } from '../utils/waitHelper';

export class BasePage {

    readonly page: Page;

    // Class Constructor
    constructor(page: Page) {
        this.page = page;
    }

    // Method 1 :  Navigation to Url
    async navigateTo(url: string): Promise<void> {
        await test.step(`Navigate to URL : ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    // Method 2 : Verify Element for Containing Text
    async verifyTextPartial(element: Locator, expectedText: string, desc: string): Promise<void> {
        await test.step(`Verify Text of "${desc}" as : "${expectedText}" `, async () => {
            await expect(element).toContainText(expectedText);
        });
    }

    // Method 3 : Verify Element for Having Full Text
    async verifyTextFull(element: Locator, expectedText: string, desc: string): Promise<void> {
        await test.step(`Verify Text of "${desc}" as : "${expectedText}" `, async () => {
            await expect(element).toHaveText(expectedText);
        });
    }

    // Method 4 : Verify Element Attribute for Some Value/Text
    async verifyAttributeValue(element: Locator, attributeName: string, attributeValue: string, desc: string): Promise<void> {
        await test.step(`Verify Element's attribute "${attributeName}"  for value : "${attributeValue}" `, async () => {
            await expect(element).toHaveAttribute(attributeName, attributeValue);
        });
    }

    // Method 5 : Input value in TextBox
    async fill(element: Locator, value: string, desc: string): Promise<void> {
        await test.step(`Input Text into "${desc}" as : "${value}"`, async () => {
            await expect(element).toBeVisible();
            await element.fill(value);
        });
    }

    async typeInput(element: Locator, value: string, desc: string): Promise<void> {
        await test.step(`Type into "${desc}" : "${value}"`, async () => {
            await expect(element).toBeVisible();
            await element.type(value);
        });
    }

    async clearInput(element: Locator, desc: string): Promise<void> {
        await test.step(`Clear "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.fill('');
        });
    }

    // Method 6 : Click on Element like Button,Link etc.
    async click(element: Locator, desc: string): Promise<void> {
        await test.step(`Click on "${desc}" `, async () => {
            await expect(element).toBeEnabled({ timeout: 10000 });
            await element.click();
        });
    }

    async doubleClick(element: Locator, desc: string): Promise<void> {
        await test.step(`Double click on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.dblclick();
        });
    }

    async rightClick(element: Locator, desc: string): Promise<void> {
        await test.step(`Right click on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.click({ button: 'right' });
        });
    }

    // 3. CHECKBOX & RADIO
    async checkCheckbox(element: Locator, desc: string): Promise<void> {
        await test.step(`Check "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.check();
        });
    }

    async uncheckCheckbox(element: Locator, desc: string): Promise<void> {
        await test.step(`Uncheck "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.uncheck();
        });
    }

    async selectRadio(element: Locator, desc: string): Promise<void> {
        await test.step(`Select radio "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.check();
        });
    }

    // 4. DROPDOWN ACTIONS
    async selectDropdown(element: Locator, value: string | string[], desc: string): Promise<void> {
        await test.step(`Select "${value}" from "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.selectOption(value);
        });
    }

    async selectByLabel(dropdown: Locator, label: string, desc: string): Promise<void> {
        await test.step(`Select by label "${label}" in "${desc}"`, async () => {
            await dropdown.selectOption({ label });
        });
    }

    // 5. FILE UPLOAD
    async uploadFile(element: Locator, filePath: string, desc: string): Promise<void> {
        await test.step(`Upload file "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.setInputFiles(filePath);
        });
    }

    // 6. HOVER & FOCUS
    async hover(element: Locator, desc: string): Promise<void> {
        await test.step(`Hover over "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.hover();
        });
    }

    async focus(element: Locator, desc: string): Promise<void> {
        await test.step(`Focus on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.focus();
        });
    }

    // 7. SCROLL ACTIONS
    async scrollIntoView(element: Locator, desc: string): Promise<void> {
        await test.step(`Scroll "${desc}" into view`, async () => {
            await element.scrollIntoViewIfNeeded();
        });
    }

    // 8. DRAG & DROP
    async dragAndDrop(from: Locator, to: Locator, desc: string): Promise<void> {
        await test.step(`Drag & drop "${desc}"`, async () => {
            await from.dragTo(to);
        });
    }

    // 9. VERIFICATION METHODS (Return Boolean)
    async isVisible(element: Locator, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" is visible`, async () => {
            await expect(element).toBeVisible({ timeout: 5000 });
            result = true;
        });
        return result;
    }

    async isEnabled(element: Locator, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" is enabled`, async () => {
            await expect(element).toBeEnabled();
            result = true;
        });
        return result;
    }

    async hasText(element: Locator, expectedText: string, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" has text "${expectedText}"`, async () => {
            await expect(element).toContainText(expectedText);
            result = true;
        });
        return result;
    }

    // 10. ATTRIBUTE VERIFICATION
    async verifyAttribute(element: Locator, attr: string, value: string, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" attribute "${attr}" = "${value}"`, async () => {
            await expect(element).toHaveAttribute(attr, value);
            result = true;
        });
        return result;
    }


    async verifyPlaceholder(element: Locator, expected: string, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify "${desc}" placeholder "${expected}"`, async () => {
            await expect(element).toHaveAttribute('placeholder', expected);
            result = true;
        });
        return result;
    }

    // 11. COUNT & PRESENCE
    async elementExists(element: Locator, desc: string): Promise<boolean> {
        let exists = false;
        await test.step(`Verify Element "${desc}" exists`, async () => {
            exists = await element.count() > 0;
        });
        return exists;
    }

    async getElementCount(element: Locator, desc: string): Promise<number> {
        let count = 0;
        await test.step(`Get count of "${desc}"`, async () => {
            count = await element.count();
        });
        return count;
    }

    // 12. TEXT EXTRACTION
    async getText(element: Locator, desc: string): Promise<string> {
        let text = '';
        await test.step(`Get text of "${desc}"`, async () => {
            text = await element.textContent() || '';
        });
        return text;
    }


    async getAttribute(element: Locator, attr: string, desc: string): Promise<string | null> {
        let attrValue: string | null = null;
        await test.step(`Get "${attr}" attribute of "${desc}"`, async () => {
            attrValue = await element.getAttribute(attr);
        });
        return attrValue;
    }

    // 13. WAIT ACTIONS
    async waitForVisible(element: Locator, desc: string, timeout: number = 10000): Promise<void> {
        await test.step(`Wait for "${desc}" to be visible`, async () => {
            await element.waitFor({ state: 'visible', timeout });
        });
    }

    async waitForHidden(element: Locator, desc: string, timeout: number = 10000): Promise<void> {
        await test.step(`Wait for "${desc}" to be hidden`, async () => {
            await element.waitFor({ state: 'hidden', timeout });
        });
    }

    // 14. KEYBOARD ACTIONS
    async pressKey(element: Locator, key: string, desc: string): Promise<void> {
        await test.step(`Press "${key}" on "${desc}"`, async () => {
            await expect(element).toBeVisible();
            await element.press(key);
        });
    }

    // 15. URL & NAVIGATION
    async verifyCurrentUrl(expectedUrl: string | RegExp, desc: string): Promise<boolean> {
        let result = false;
        await test.step(`Verify current URL "${desc}"`, async () => {
            await expect(this.page).toHaveURL(expectedUrl);
            result = true;
        });
        return result;
    }

    // 16. TABLE OPERATIONS
    async getTableRowCount(table: Locator, desc: string): Promise<number> {
        let rowCount = 0;
        await test.step(`Get row count of table "${desc}"`, async () => {
            rowCount = await table.locator('tbody tr').count();
        });
        return rowCount;
    }

    async getTableCellText(table: Locator, row: number, col: number, desc: string): Promise<string> {
        const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${col})`);
        await test.step(`Get table cell [${row},${col}] text from "${desc}"`, async () => {
            await expect(cell).toBeVisible();
        });
        return await cell.textContent() || '';
    }

    async clickDynamic(selector: string | Locator, desc: string): Promise<void> {
        await test.step(`Click on "${desc}" `, async () => {
            const locator = this.getLocator(selector);
            await expect(locator).toBeEnabled({ timeout: 10000 });
            await locator.click();
        });
    }

    private getLocator(selector: string | Locator): Locator {
        return typeof selector === 'string' ? this.page.locator(selector) : selector;
    }
}