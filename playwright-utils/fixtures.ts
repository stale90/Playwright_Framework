import { test as base, Page } from "@playwright/test";
import { CONFIG } from "../config/config";
import { LoginPage } from "../pages/saucedemo/LoginPage";

type MyFixtures = {
  QApage : Page;
};

// Page with QA Url navigation
export const test = base.extend<MyFixtures>({
  QApage: async ({ page }, use: (arg0: Page) => Promise<void>) => {
    const login = new LoginPage(page);
    await page.goto(CONFIG.SAUCEDEMO_BASE_URL);
    login.addScreenshot("Before MyFixture Screenshot");
    await use(page);
    login.addScreenshot("After MyFixture Screenshot");
  },
});
