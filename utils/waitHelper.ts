import { Page, Locator } from "@playwright/test";


export class WaitHelper {

  static async waitForVisible(element: Locator) {
    await element.waitFor({ state: "visible" });
  }

  static async waitForHidden(element: Locator) {
    await element.waitFor({ state: "hidden" });
  }

  static async waitForAttachment(element: Locator) {
    await element.waitFor({ state: "attached" });
  }

  static async waitForUrlNavigation(page: Page) {
    await page.waitForLoadState("domcontentloaded");
  }

  static async staticWait(ms: number) {
    await new Promise((res) => setTimeout(res, ms));
  }

}
