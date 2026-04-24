import { defineConfig, devices } from "@playwright/test";
import { Utility } from "./utils/utility";
import { CONFIG } from "./config/config";


const reportPaths = Utility.getReportFolder();
const htmlReportFolder = reportPaths[0];
const allureReportFolder = reportPaths[1];

/*
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig ({

  /* Test Directory folder */
  testDir: CONFIG.testDir,

  /* Timeout set to 60 seconds */
  timeout: CONFIG.timeout,

  /* Set Workers to 2 so that Internet slow issue can be handled */
  workers: CONFIG.workers,

  /* Run tests in files in parallel */
  fullyParallel: CONFIG.fullyParallel,

  /* Retries tests once after first fail */
  retries: CONFIG.retries,

  use: {
    actionTimeout: CONFIG.actionTimeout,
    navigationTimeout:CONFIG.navigationTimeout,
    baseURL: CONFIG.playwright_baseUrl,
    headless: CONFIG.headless,
    screenshot:'on-first-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  expect:{
    timeout: CONFIG.expectTimeout,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Browser configuration set in Prjocet config */
  projects: CONFIG.projects,

  reporter:[
            [ "html", { outputFolder: htmlReportFolder} ],
            [ "allure-playwright", {resultsDir: allureReportFolder}]
          ],
          
});
