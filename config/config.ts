import { devices } from "@playwright/test";
import dotenv from "dotenv";
import { createProjects, ProjectConfig } from "./project";

dotenv.config();


export const CONFIG = {

  // .env file properties
  ORANGE_BASE_URL: process.env.ORANGE_BASE_URL!,

  SAUCEDEMO_BASE_URL: process.env.SAUCEDEMO_BASE_URL!,

  playwright_baseUrl: process.env.PLAYWRIGHT_BASE_URL!,

  allure_base_path: process.env.ALLURE_RESULTS_BASE_FOLDER || "allure-results",

  html_base_path: process.env.HTML_REPORTS_BASE_FOLDER || "html-report",
  
  myMessage: process.env.MY_MESSAGE || "We Will Keep Walking",

  testDir: process.env.TESTDIR_LOCATION || "./tests",

  testDataLocation: process.env.TEST_DATA_EXCEL_LOCATION || "./test-data/TestData.xlsx",

  timeout: parseInt(process.env.TIMEOUT_GLOBAL || "30000"),

  actionTimeout: parseInt(process.env.TIMEOUT_ACTION || "2000"),

  navigationTimeout: parseInt(process.env.TIMEOUT_NAVIGATION || "10000"),
  
  expectTimeout: parseInt(process.env.TIMEOUT_EXPECT || "5000"),

  workers: parseInt(process.env.WORKERS || "2"),

  fullyParallel: process.env.FULLY_PARALLEL_FLAG?.toLowerCase() === 'true',

  retries: parseInt(process.env.RETRIES_ON_FAILURE || "1"),

  headless: process.env.HEADLESS_FLAG?.toLowerCase() === 'true',

  browserName: process.env.PROJECT_BROWSER_NAME || "chromium",

  projects : createProjects((process.env.PROJECT_BROWSER_NAME || 'chromium').split('|')) as ProjectConfig[],

  // projects: [
  //  {
  //     name: process.env.PROJECT_BROWSER_NAME || "chromium",
  //     use: { ...devices[process.env.PROJECT_DEVICE_NAME || "Desktop Chrome"] },
  //   },
  // ],

};

