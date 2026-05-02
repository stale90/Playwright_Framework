import { defineConfig } from "@playwright/test";
import { Utility } from "./src/utils/utility"; 
import { CONFIG } from "./src/config/config";


let reportPaths = Utility.getReportPaths();

/*
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig ({
  
  /* Test Directory folder */
  testDir: './src/tests',
  
  /* disable 'test-results' output folder */
  outputDir: CONFIG.OUTPUR_DIR,

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

  /* Report configuration setting */
  reporter:[
            [ "html", { outputFolder: reportPaths.get('html')} ],
            [ "allure-playwright", { resultsDir: reportPaths.get('allure') }],
          ],
          
});