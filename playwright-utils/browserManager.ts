import { chromium, firefox, webkit, Browser, Page } from "@playwright/test";

export class BrowserManager {
  static async getPage(browserType: string): Promise<Page> {
    let browser: Browser;

    switch (browserType) {
      case "firefox":
        browser = await firefox.launch({ headless: false });
        break;

      case "webkit":
        browser = await webkit.launch({ headless: false });
        break;

      default:
        browser = await chromium.launch({ headless: false });
        break;
    }
    const context = await browser.newContext();
    return await context.newPage();
  }
}
