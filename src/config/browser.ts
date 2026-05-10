import { chromium, firefox, webkit, Browser, BrowserContext, Page, BrowserType } from '@playwright/test';
import { BrowserConfig } from '../types/custom-type';

export class BrowserManager {
  private static browserCache: Map<string, Browser> = new Map();

  /**
   * Get Page for browser type with cleanup
   */
  static async getPage(
    browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium',
    config: BrowserConfig = {}
  ): Promise<{ page: Page; context: BrowserContext; browser: Browser }> {
    const launchConfig = {
      headless: config.headless ?? false,
      slowMo: config.slowMo ?? 0,
    };

    let browser: Browser;

    // Reuse cached browser
    if (this.browserCache.has(browserType)) {
      browser = this.browserCache.get(browserType)!;
    } else {
      const browserLaunch: Record<string, BrowserType<Browser>> = {
        chromium,
        firefox,
        webkit
      };

      browser = await browserLaunch[browserType].launch(launchConfig);
      this.browserCache.set(browserType, browser);
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    return { page, context, browser };
  }

  /**
   * Cleanup all browsers
   */

  static async closeAll(): Promise<void> {
    for (const [_, browser] of this.browserCache) {
      await browser.close();
    }
    this.browserCache.clear();
  }
}