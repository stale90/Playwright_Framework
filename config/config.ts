import { devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();


export const CONFIG = {

  // .env file properties
  ORANGE_BASE_URL: process.env.ORANGE_BASE_URL!,

  SAUCEDEMO_BASE_URL: process.env.SAUCEDEMO_BASE_URL!,

  playwright_baseUrl: process.env.PLAYWRIGHT_BASE_URL!,
  
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

  deviceName: process.env.PROJECT_DEVICE_NAME || "Desktop Chrome",

  projects: [
   {
      name: process.env.PROJECT_BROWSER_NAME || "chromium",
      use: { ...devices[process.env.PROJECT_DEVICE_NAME || "Desktop Chrome"] },
    },
  ],

};

 const BROWSERS = [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Pixel5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'iPhone12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  
  ];