import test from "@playwright/test";
import { TestCase } from "../types/custom-type";
import { Logger } from "../utils/logger";

export class Helper {
  /**
   * Converts TestCase[] → Annotation array for test.info().annotations.push()
   * Usage: addAnnotations(testCases)
   */
  static addTestCases(testCases: TestCase[]) {
    try {
      const annotations = testCases.map((tc) => ({
        type: tc.testId, // "Play-300"
        description: tc.testDesc, // "verify login page elements..."
      }));

      test.info().annotations.push(...annotations);
    } catch (error) {
      Logger.error("Exception occured while adding Testcases in report");
    }
  }
}
