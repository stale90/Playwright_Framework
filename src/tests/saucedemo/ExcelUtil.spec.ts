import test from "@playwright/test";
import ExcelJS from "exceljs";
import * as path from "path";
import { Utility } from "../../reusable/utility";
import { Logger } from "../../config/logger";

async function writeExcel(title:string,status:string){
   // let reportDir = path.resolve("report");
    //let filePath = path.join(reportDir, "results.xlsx");
    const temp = process.env.CURRENT_EXCEL_REPORT_DIR || path.resolve('ExcelReport');
    let reportDir = path.resolve(temp);
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

test.describe.skip("test", () => {
for (let i = 1; i < 10; i++) {
  test.only(`test ${i}`, async ({ page }) => {
    console.log("Test function inside ");
    
    if (i==3 || i==7){
    throw new Error();
    }
    
});
}
});

test.only('random number mobile', async ({ page }) => {
  Logger.info("10 Digit: " + Utility.getRandom10DigitMobileNumber());
  Logger.info("6 digit : " + Utility.getRandom6DigitNumber());
  Logger.info("5 digit : " + Utility.getRandom5DigitNumber());
  Logger.info("7 digit : " + Utility.getRandom7DigitNumber());

});