import test from "@playwright/test";
import ExcelJS from "exceljs";
import * as path from "path";

async function writeExcel(title:string,status:string){
    let reportDir = path.resolve("report");
    let filePath = path.join(reportDir, "results.xlsx");
    let sheetName = "Sheet1";
    const workbook = new ExcelJS.Workbook();
    let worksheet;
   
    try {
        // 1. Load the existing file
        await workbook.xlsx.readFile(filePath);
        worksheet = workbook.getWorksheet(sheetName);
    } catch (error) {
        // If file doesn't exist, create it and add headers
        worksheet = workbook.addWorksheet(sheetName);
        worksheet.addRow(['TestName', 'Status']);
    }
     if (!worksheet) {
        worksheet = workbook.addWorksheet(sheetName);
        worksheet.addRow(['TestName', 'Status']);
  }
    worksheet.addRow([title,status]);
    await workbook.xlsx.writeFile(filePath);
}

test.describe("test", () => {
for (let i = 1; i < 10; i++) {
  test.only(`test ${i}`, async ({ page }) => {
    console.log("Test function inside ");
    
    if (i==3 || i==7){
    throw new Error();
    }
    
});
}
});


test.afterEach(async ({}, testInfo) => {
  let status:string='UNKNOWN';
  console.log("Test Status : " +testInfo.status);
  if (testInfo.status==='passed')
    status="PASS";
  if (testInfo.status==='failed')
    status="FAIL";
  if (testInfo.status==='skipped')
    status="SKIP";
    writeExcel(testInfo.title, status);
  //ExcelTestReport.addResult(testId, testSummary, status);
  //await ExcelTestReport.appendRow1(testId, testSummary, status);
});

