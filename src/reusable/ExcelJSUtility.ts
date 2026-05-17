import ExcelJS from "exceljs";
//import fs from 'fs';
import * as fs from "node:fs/promises";
import * as path from "path";

export class ExcelJSUtility {
  private static reportDir = path.resolve("report");
  private static filePath = path.join(this.reportDir, "test-results.xlsx");
  private static sheetName = "Results";

  static async writeExcel(testID:string|undefined,testSummary:string|undefined,status:string){
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
          worksheet.addRow(['TestID', 'TestSummary', 'Status']);
      }
       if (!worksheet) {
          worksheet = workbook.addWorksheet(sheetName);
          worksheet.addRow(['TestID', 'TestSummary', 'Status']);
    }
      worksheet.addRow([testID,testSummary,status]);
      await workbook.xlsx.writeFile(filePath);
  }
  
  static async initReport(): Promise<void> {
    await fs.mkdir(this.reportDir, { recursive: true });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(this.sheetName);

    worksheet.columns = [
      { header: "TestID", key: "TestID", width: 20 },
      { header: "TestSummary", key: "TestSummary", width: 50 },
      { header: "TestStatus", key: "TestStatus", width: 15 },
    ];

    await workbook.xlsx.writeFile(this.filePath);
  }

  static async readWorkbook(filePath: string): Promise<ExcelJS.Workbook> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    return workbook;
  }

  static async createWorkbook(): Promise<ExcelJS.Workbook> {
    return new ExcelJS.Workbook();
  }

  static async getWorksheet(
    workbook: ExcelJS.Workbook,
    sheetName: string,
  ): Promise<ExcelJS.Worksheet> {
    return workbook.getWorksheet(sheetName) || workbook.addWorksheet(sheetName);
  }

  static async readSheetData(
    filePath: string,
    sheetName: string,
  ): Promise<any[]> {
    const workbook = await this.readWorkbook(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) return [];

    const data: any[] = [];
    let headers: string[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        headers = row.values as string[];
      } else {
        const rowData: any = {};
        row.eachCell((cell, colNumber) => {
          rowData[headers[colNumber]] = cell.value;
        });
        data.push(rowData);
      }
    });

    return data;
  }

  static async writeSheetData(
    filePath: string,
    sheetName: string,
    data: any[],
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    if (data.length > 0) {
      worksheet.addRows(data);
    }

    await workbook.xlsx.writeFile(filePath);
  }

  static async appendRow(
    filePath: string,
    sheetName: string,
    rowData: object,
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();

    if (await this.fileExists(filePath)) {
      await workbook.xlsx.readFile(filePath);
    }

    let worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) worksheet = workbook.addWorksheet(sheetName);

    worksheet.addRow(rowData);
    await workbook.xlsx.writeFile(filePath);
  }

  static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
  static async clearWorksheet(
    filePath: string,
    sheetName: string,
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    if (await this.fileExists(filePath)) {
      await workbook.xlsx.readFile(filePath);
    }

    let worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) worksheet = workbook.addWorksheet(sheetName);

    worksheet.spliceRows(1, worksheet.rowCount);
    await workbook.xlsx.writeFile(filePath);
  }

  static async createHeaders(
    filePath: string,
    sheetName: string,
    headers: string[],
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(sheetName);

    worksheet.addRow(headers);
    await workbook.xlsx.writeFile(filePath);
  }

  static async getCellValue(
    filePath: string,
    sheetName: string,
    row: number,
    col: number,
  ): Promise<any> {
    const workbook = await this.readWorkbook(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    return worksheet?.getRow(row).getCell(col).value;
  }

  static async updateCellValue(
    filePath: string,
    sheetName: string,
    row: number,
    col: number,
    value: any,
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) throw new Error(`Sheet ${sheetName} not found`);

    worksheet.getRow(row).getCell(col).value = value;
    await workbook.xlsx.writeFile(filePath);
  }

  static async deleteSheet(filePath: string, sheetName: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    if (await this.fileExists(filePath)) {
      await workbook.xlsx.readFile(filePath);
    }

    workbook.removeWorksheet(sheetName);
    await workbook.xlsx.writeFile(filePath);
  }

  static async appendResult(
    testID: string,
    testSummary: string,
    testStatus: string,
  ): Promise<void> {
    await fs.mkdir(this.reportDir, { recursive: true });

    const workbook = new ExcelJS.Workbook();

    try {
      await workbook.xlsx.readFile(this.filePath);
    } catch {
      const ws = workbook.addWorksheet(this.sheetName);
      ws.columns = [
        { header: "TestID", key: "TestID", width: 20 },
        { header: "TestSummary", key: "TestSummary", width: 50 },
        { header: "TestStatus", key: "TestStatus", width: 15 },
      ];
    }

    let worksheet = workbook.getWorksheet(this.sheetName);
    if (!worksheet) {
      worksheet = workbook.addWorksheet(this.sheetName);
      worksheet.columns = [
        { header: "TestID", key: "TestID", width: 20 },
        { header: "TestSummary", key: "TestSummary", width: 50 },
        { header: "TestStatus", key: "TestStatus", width: 15 },
      ];
    }

    worksheet.addRow({
      TestID: testID,
      TestSummary: testSummary,
      TestStatus: testStatus,
    });
    await workbook.xlsx.writeFile(this.filePath);
  }
}
