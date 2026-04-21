import { defineConfig, devices } from "@playwright/test";
import { Utility } from "./utils/utility";
import { CONFIG } from "./config/config";
import path from "path";

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
    baseURL: CONFIG.playwright_baseUrl,
    headless: CONFIG.headless,
    screenshot:'on-first-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  /* Browser configuration set in Prjocet config */
  projects: CONFIG.projects,

  reporter:[
            [ "html", { outputFolder: `html-report/${Utility.getReportFolder()}`,} ],
            [ "allure-playwright", {resultsDir: path.resolve(`allure-results/${Utility.getReportFolder()}`,),}]
          ],

  // reporter:[
  //             [ "html", { outputFolder: `html-report/${Utility.getCurrentDate()}/html_${Utility.getDateTimeFilename()}`,} ],
  //             [ "allure-playwright", {resultsDir: path.resolve(`allure-results/${Utility.getCurrentDate()}/html_${Utility.getDateTimeFilename()}`,),}]
  //          ],

});
