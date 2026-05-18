import { Browser, BrowserContext, Page } from "@playwright/test";

export const ExcelReportData = {
  testId:'',
  testDesc:'',
  applicationId: '',
  testStatus: '',
};


export interface ProjectConfig {
  name: string;
  use: any;
}

export interface TestCase {
  testId: string;
  testDesc: string;
}

export type FrameworkFixtures = {
  page: Page;
  context: BrowserContext;
  browser: Browser;
};

export interface BrowserConfig {
  headless?: boolean;
  slowMo?: number;
}
