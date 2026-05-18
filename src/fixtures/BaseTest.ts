import { test } from '@playwright/test';
import { ExcelJSUtility } from '../reusable/ExcelJSUtility';
import { ExcelReportData, TestCase } from '../types/custom-type';
import path from 'path';
import fs from 'fs/promises';
import { ExcelWriter } from '../reusable/ExcelQueue';


// Before All Hook - to create/reset initialise report or global variables once
test.beforeAll(async () => {
  
});

test.afterAll(async () => {
  // write report row
});


// Before Each - to setup test pre conditions Login etc.
test.beforeEach(async () => {

});

// After Each - to append the test result and capture a screenshot on failure.
test.afterEach(async ({}, testInfo) => {

  let status = "UNKNOWN";
  console.log("Test Status : " + testInfo.status);
  if (testInfo.status === "passed") status = "PASS";
  if (testInfo.status === "failed") status = "FAIL";
  if (testInfo.status === "skipped") status = "SKIP";
  ExcelReportData.testStatus = status;
 
  await ExcelJSUtility.writeExcelTestReport(
    ExcelReportData.testId,
    ExcelReportData.testDesc,
    ExcelReportData.applicationId,
    ExcelReportData.testStatus);
  
  // const rowData = {
  //   TestID: testID,
  //   TestSummary: testSummary,
  //   ApplicationID: applicationId,
  //   TestStatus: status,
  // };
  // console.log(rowData);
      
  
  // Find from 'Annotations' 
  //for (const annotation of testInfo.annotations) {
  //   testID = annotation.type;
  //   testSummary = annotation.description;
  // }
  // const annotation = testInfo.annotations.find(a => a.type === 'applicationId');
  // const appId = annotation?.description || '';

});

// After All Hooks - for any final cleanup.

