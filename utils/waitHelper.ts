import { Page, Locator, Expect } from '@playwright/test';
import { expect } from '@playwright/test';

export class WaitHelper {
  // ========== ELEMENT WAITS (Locator-based) ==========

  /** Wait for element to be visible (your original) */
  static async waitForVisible(element: Locator, timeout = 10000): Promise<void> {
    await element.waitFor({ state: 'visible', timeout });
  }

  /** Wait for element to be hidden */
  static async waitForHidden(element: Locator, timeout = 5000): Promise<void> {
    await element.waitFor({ state: 'hidden', timeout });
  }

  /** Wait for element to exist in DOM */
  static async waitForExist(element: Locator, timeout = 10000): Promise<void> {
    await element.waitFor({ state: 'attached', timeout });
  }

  /** Wait for element to be detached from DOM */
  static async waitForDetached(element: Locator, timeout = 5000): Promise<void> {
    await element.waitFor({ state: 'detached', timeout });
  }

  /** Wait for element to be enabled (clickable) */
  static async waitForEnabled(element: Locator, timeout = 10000): Promise<void> {
    await expect(element).toBeEnabled({ timeout });
  }

  /** Wait for element to be disabled */
  static async waitForDisabled(element: Locator, timeout = 5000): Promise<void> {
    await expect(element).toBeDisabled({ timeout });
  }

  /** Wait for text content to match */
  static async waitForText(element: Locator, text: string | RegExp, timeout = 10000): Promise<void> {
    await expect(element).toHaveText(text, { timeout });
  }

  /** Wait for exact text match */
  static async waitForExactText(element: Locator, text: string, timeout = 10000): Promise<void> {
    await expect(element).toHaveText(text, { useInnerText: true, timeout });
  }

  /** Wait for element count */
  static async waitForCount(element: Locator, count: number, timeout = 10000): Promise<void> {
    await expect(element).toHaveCount(count, { timeout });
  }

  /** Wait for element to contain specific text */
  static async waitForContainText(element: Locator, text: string, timeout = 10000): Promise<void> {
    await expect(element).toContainText(text, { timeout });
  }

  // ========== PAGE/URL WAITS ==========

  /** Wait for navigation complete */
  static async waitForNavigation(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /** Wait for URL to match */
  static async waitForURL(page: Page, url: string | RegExp, timeout = 10000): Promise<void> {
    await expect(page).toHaveURL(url, { timeout });
  }

  /** Wait for specific page load state */
  static async waitForLoadState(page: Page, state: 'load' | 'domcontentloaded' | 'networkidle', timeout = 30000): Promise<void> {
    await page.waitForLoadState(state, { timeout });
  }

  // ========== NETWORK WAITS ==========

  /** Wait for specific request */
  static async waitForRequest(page: Page, urlOrPredicate: string | RegExp | ((route: any) => boolean), timeout = 10000): Promise<void> {
    await page.waitForRequest(urlOrPredicate, { timeout });
  }

  /** Wait for specific response */
  static async waitForResponse(page: Page, urlOrPredicate: string | RegExp | ((response: any) => boolean), timeout = 10000): Promise<void> {
    await page.waitForResponse(urlOrPredicate, { timeout });
  }

  /** Wait for response with status */
  static async waitForResponseStatus(page: Page, url: string | RegExp, status: number, timeout = 10000): Promise<void> {
    await page.waitForResponse(resp =>
      resp.url().includes(url as string) && resp.status() === status,
      { timeout }
    );
  }

  // ========== DYNAMIC CONTENT ==========

  /** Wait for multiple elements to load */
  static async waitForAllVisible(locators: Locator[], timeout = 15000): Promise<void> {
    await Promise.all(locators.map(loc => this.waitForVisible(loc, timeout)));
  }

  /** Wait for spinner/loader to disappear */
  static async waitForLoaderGone(page: Page, loaderSelector: string, timeout = 10000): Promise<void> {
    const loader = page.locator(loaderSelector);
    await expect(loader).toBeHidden({ timeout });
  }

  /** Wait for toast/notification to appear then disappear */
  static async waitForToast(page: Page, toastSelector: string, timeout = 10000): Promise<void> {
    const toast = page.locator(toastSelector);
    // Phase 1: Wait for visible
    await expect(toast).toBeVisible({ timeout });
    // Phase 2: Wait for hidden (separate timeout)
    await expect(toast).toBeHidden({ timeout: timeout * 2 });
  }

  // ========== ATTRIBUTE/STATE WAITS ==========

  /** Wait for specific attribute value */
  static async waitForAttribute(element: Locator, attr: string, value: string, timeout = 10000): Promise<void> {
    await expect(element).toHaveAttribute(attr, value, { timeout });
  }

  /** Wait for class presence */
  static async waitForClass(element: Locator, className: string, timeout = 10000): Promise<void> {
    await expect(element).toHaveClass(new RegExp(className), { timeout });
  }

  /** Wait for input value */
  static async waitForValue(element: Locator, value: string, timeout = 10000): Promise<void> {
    await expect(element).toHaveValue(value, { timeout });
  }

  // ========== FRAME/IFRAME ==========

  /** Wait for iframe to load */
  static async waitForFrame(page: Page, frameSelector: string, timeout = 10000): Promise<void> {
    const frame = page.frameLocator(frameSelector).frameLocator('body');
    await frame.locator('body').waitFor({ state: 'visible', timeout });
  }

  // ========== TABLE/DATA WAITS ==========

  /** Wait for table row count */
  static async waitForTableRows(table: Locator, rowCount: number, timeout = 10000): Promise<void> {
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(rowCount, { timeout });
  }

  /** Wait for specific table cell text */
  static async waitForTableCell(table: Locator, row: number, col: number, text: string, timeout = 10000): Promise<void> {
    const cell = table.locator(`tbody tr:nth-child(${row}) td:nth-child(${col})`);
    await expect(cell).toContainText(text, { timeout });
  }

  // ========== MODAL/DIALOG ==========

  /** Wait for modal to open */
  static async waitForModal(page: Page, modalSelector: string, timeout = 10000): Promise<void> {
    const modal = page.locator(modalSelector);
    await expect(modal).toBeVisible({ timeout });
  }

  /** Wait for modal to close */
  static async waitForModalClose(page: Page, modalSelector: string, timeout = 5000): Promise<void> {
    const modal = page.locator(modalSelector);
    await expect(modal).toBeHidden({ timeout });
  }

  // ========== CUSTOM/ADVANCED ==========

  /** Wait for custom condition */
  static async waitForFunction(page: Page, script: string, timeout = 10000): Promise<void> {
    await page.waitForFunction(script, undefined, { timeout });
  }

  /** Wait for network idle (no requests for 500ms) */
  static async waitForNetworkIdle(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /** Wait for animation to complete */
  static async waitForNoAnimation(element: Locator, timeout = 5000): Promise<void> {
    await element.evaluate(el =>
      window.getComputedStyle(el).transitionDuration === '0s' ||
      window.getComputedStyle(el).animationDuration === '0s'
    );
  }

  /** Wait for page title */
  static async waitForTitle(page: Page, title: string | RegExp, timeout = 10000): Promise<void> {
    await expect(page).toHaveTitle(title, { timeout });
  }

  /** Wait for console message */
  static async waitForConsole(page: Page, type: 'error' | 'warning' | 'info', timeout = 5000): Promise<void> {
    const consolePromise = page.waitForEvent('console', {
      predicate: (msg) => msg.type() === type,
      timeout
    });

    await consolePromise;
  }

  static async waitForDownload(page: Page, downloadPathContains: string, timeout = 30000): Promise<void> {
    // Enable downloads in context (REQUIRED!)
    const downloadPromise = page.waitForEvent('download', {
      predicate: (download) => download.suggestedFilename().includes(downloadPathContains),
      timeout
    });

    // User triggers download
    // await page.click('#download-btn');

    const download = await downloadPromise;

    if (await download.failure()) {
      throw new Error(`Download failed: ${await download.failure()}`);
    }
  }
}