import test, { Page } from "@playwright/test";
import { TestCase } from "../types/custom-type";
import { Logger } from "../config/logger";

export class Helper {

//Add Testcases into report as Annotations.
static addTestCases(testCases: TestCase[]) {
    try {
      const annotations = testCases.map((tc) => ({
        type: tc.testId, 
        description: tc.testDesc, 
      }));
      test.info().annotations.push(...annotations);
    } catch (error) {
      Logger.exception("Exception occured while adding Testcases in report", error);
      }
  }

  // Navigate to Web URL
  static async openURL(page: Page, url: string): Promise<void> {
    try {
      await test.step(`Navigate to: ${url}`, async () => {
      await page.goto(url);
      });
    } catch (error) {
       Logger.exception('Exception occured while Opening URL.', error);
    }


  }
}
