import * as XLSX from 'xlsx';
import path from 'path';
import { FILE_LOCATION } from './EnvConfig';

const filePath = FILE_LOCATION.EXCEL_TEST_DATA_PATH;


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

// Read one sheet with Custom object Type - logincredential
export type LoginCred = {
    username: string;
    password: string;
    expected: string;
    run: string;
}
export function readexcel_logincredential(sheetName: string): LoginCred[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: LoginCred[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}
