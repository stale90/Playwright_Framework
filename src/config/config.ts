import { devices } from "@playwright/test";
import dotenv from "dotenv";
import { ProjectConfig } from "../types/custom-type";
import { Utility } from "../reusable/utility";

dotenv.config();


// function to get unique Report folder locations
  export function getReportPaths(): Map<string,string> {
    const paths = new Map<string, string>();
    let date = Utility.getCurrentDate();
    let timeStamp = Utility.getDateTimeFilename();
    let htmlReportPath = `${CONFIG.html_base_path}/${date}/html_${timeStamp}`;
    let allureReportPath = `${CONFIG.allure_base_path}/${date}/${timeStamp}`;
    paths.set("html", `${htmlReportPath}`)
    paths.set("allure", `${allureReportPath}`)
    return paths;
  }


// Create Project Configuration for playwright.config , Multiple Browser Support
export function createProjectsBrowserConfig(browserNames: string[]): ProjectConfig[] {
  const deviceRecord: Record<string, string> = {
    chromium: "Desktop Chrome",
    firefox: "Desktop Firefox",
    webkit: "Desktop Safari",
    pixel5: "Pixel 5",
    iPhone12: "iPhone 12",
    edge: "Desktop Edge",
  };

  return browserNames.map((browserName) => {
    const projectName = browserName || "chromium";
    const deviceName = deviceRecord[browserName] || "Desktop Chrome";

    return {
      name: projectName,
      use: {
        ...devices[deviceName as keyof typeof devices],
      },
    } as ProjectConfig;
  });
}

// .env file properties
export const CONFIG = {

  OUTPUR_DIR: 'test-results',

  ORANGE_BASE_URL: process.env.ORANGE_BASE_URL!,

  SAUCEDEMO_BASE_URL: process.env.SAUCEDEMO_BASE_URL!,

  playwright_baseUrl: process.env.PLAYWRIGHT_BASE_URL!,

  allure_base_path: process.env.ALLURE_RESULTS_BASE_FOLDER || "allure-results",

  html_base_path: process.env.HTML_REPORTS_BASE_FOLDER || "html-report",

  myMessage: process.env.MY_MESSAGE || "We Will Keep Walking",

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

  projects: createProjectsBrowserConfig((process.env.PROJECT_BROWSER_NAME || 'chromium').split('|')) as ProjectConfig[],

};
