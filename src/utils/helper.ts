import test from "@playwright/test";
import { TestCase } from "../types/annotations";

export class Helper {
  /**
   * Converts TestCase[] → Annotation array for test.info().annotations.push()
   * Usage: addAnnotations(testCases)
   */
  static addAnnotations(testCases: TestCase[]) {
    const annotations = testCases.map((tc) => ({
      type: tc.testId, // "Play-300"
      description: tc.testDesc, // "verify login page elements..."
    }));

    test.info().annotations.push(...annotations);
  }
}
