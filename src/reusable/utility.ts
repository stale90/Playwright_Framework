import * as XLSX from 'xlsx';
import path from 'path';
import { CONFIG } from "../config/config";
import { Logger } from '../config/logger';

export class Utility {

  // function to return current date as  04-16-2026
  static getCurrentDate(): string {
    const now = new Date();
    const current_date = now
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    return current_date;
    //04-16-2026
  }

  // function to return current date as format  04-16-2026-13_04_59
  static getDateTimeStamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timeStampFileName = `${month}-${day}-${year}-${hours}_${minutes}_${seconds}`;
    return timeStampFileName;
    // "2026-04-16-12_54_23"
  }

  // function to get unique Report folder locations
  static getReportPaths(): Map<string,string> {
    const paths = new Map<string, string>();
    let date = Utility.getCurrentDate();
    let timeStamp = Utility.getDateTimeStamp();
    let htmlReportPath = `${CONFIG.html_base_path}/${date}/Html_${timeStamp}`;
    let allureReportPath = `${CONFIG.allure_base_path}/${date}/Allure_${timeStamp}`;
    paths.set("html", `${htmlReportPath}`);
    paths.set("allure", `${allureReportPath}`);
    return paths;
  }

    // function to get unique Report folder locations: Date format
    static getExcelReportPath(): string {
      let date = Utility.getCurrentDate();
      let excelReportPath = `${CONFIG.excel_base_path}/${date}`;
      return excelReportPath;
    }

   // function to get unique name includes timestamp and date
    static getTimeStampFileName(): string {
      let timeStamp = Utility.getDateTimeStamp();
      let excelFileName = `${timeStamp}`;
      return excelFileName;
    }
  
    // 10 digit random number
  static getRandom10DigitMobileNumber(): string {
  const firstDigit = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, or 9
  const remainingDigits = Math.floor(Math.random() * 1_000_000_000)
    .toString()
    .padStart(9, '0');

  return `${firstDigit}${remainingDigits}`;
}

// 6 digit random number
static getRandom6DigitNumber(): string {
  const number = Math.floor(Math.random() * 900000) + 100000;
  return number.toString();
}

// 5 digit random number
static getRandom5DigitNumber(): string {
  const number = Math.floor(Math.random() * 90000) + 10000;
  return number.toString();
}

// 7 digit random number
static getRandom7DigitNumber(): string {
  const number = Math.floor(Math.random() * 9_000_000) + 1_000_000;
  return number.toString();
}

  /**
   * Generic Excel reader - Works for ANY sheet + ANY type!
   * @param sheetName - Excel sheet name
   * @returns T[] - Typed array (LoginType[], GuestMakePaymentType[], etc.)
   */

   static readFromExcelSheet<T>(filePath: string, sheetName: string): T[] {
    try {
      const fullPath = path.resolve(filePath);
      const workbook = XLSX.readFile(fullPath);

      // Validate sheet exists
      if (!workbook.Sheets[sheetName]) {
        throw new Error(`Sheet "${sheetName}" not found, Please recheck Sheet name.`);
      }

      const sheet = workbook.Sheets[sheetName];
      const data: T[] = XLSX.utils.sheet_to_json<T>(sheet, {
        defval: '',  // Handle empty cells
        raw: false   // Formatted strings
      });

      return data;
    } catch (error) {
      Logger.error(`Unknown Error appears while reading Excel sheet: ${sheetName}`);
      return [];  // Empty typed array on error
    }
  }

}
