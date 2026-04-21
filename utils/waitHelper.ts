import { Page, Locator } from "@playwright/test";


export class WaitHelper {

  static async waitForVisible(selector: Locator) {
    await selector.waitFor({ state: "visible" });
  }

  static async waitForHidden(selector: Locator) {
    await selector.waitFor({ state: "hidden" });
  }

  static async waitForAttachment(selector: Locator) {
    await selector.waitFor({ state: "attached" });
  }

  static async waitForUrlNavigation(page: Page) {
    await page.waitForLoadState("networkidle");
  }

  static async staticWait(ms: number) {
    await new Promise((res) => setTimeout(res, ms));
  }
}
