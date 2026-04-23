import * as XLSX from 'xlsx';
import path from 'path';
import { CONFIG } from '../config/config';

const filePath = CONFIG.testDataLocation;


// Read one sheet with Custom object Type - guestmakepayment
export type MakePayment = {
    customerID: string;
    postalCode: string;
    expected: string;
    run: string;
}
export function readexcel_guestmakepayment(sheetName: string): MakePayment[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: MakePayment[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}

// Read one sheet with Custom object Type - loginData
export type LoginCred = {
    run: string;
    testname:string;
    summary:string;
    username: string;
    password: string;
    scenario: string;
    message: string;
}
export function excel_loginData(sheetName: string): LoginCred[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: LoginCred[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}
