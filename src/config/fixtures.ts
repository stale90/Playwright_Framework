import { test as base,TestInfo } from "@playwright/test";
import { Logger } from "./logger";
import { FrameworkFixtures } from "../types/custom-type";
import { BrowserManager } from "./browser";

export const test = base.extend<FrameworkFixtures>({
  // Generic page (beforeEach + afterEach)
  page: async ({}, use, testInfo: TestInfo) => {
    // Get browser from project.name!
    const projectName = testInfo.project?.name || "chromium-desktop";

    const browserType = projectName.includes("firefox") ? "firefox" : 
                        projectName.includes("webkit") || projectName.includes("iPhone") ? "webkit": "chromium";

    const { page, context, browser } = await BrowserManager.getPage(browserType);
    await use(page);

    // Auto-cleanup afterEach
    Logger.trace("🔄 Page cleanup");
    await context.close();
  },
});

export { expect } from "@playwright/test";