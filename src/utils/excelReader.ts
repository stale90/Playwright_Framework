import * as XLSX from 'xlsx';
import path from 'path';
import { CONFIG } from '../config/config';
import { MakePayment, LoginCred } from '../types/test-data';

const filePath = CONFIG.testDataLocation;

export function readexcel_guestmakepayment(sheetName: string): MakePayment[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: MakePayment[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}

export function excel_loginData(sheetName: string): LoginCred[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: LoginCred[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}
