import * as XLSX from 'xlsx';
import path from 'path';
import { CONFIG } from '../config/config';
import { GuestMakePaymentType, LoginType } from '../types/data-type';

const filePath = CONFIG.testDataLocation;

export function guestmakepayment_data(sheetName: string): GuestMakePaymentType[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: GuestMakePaymentType[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}

export function login_data(sheetName: string): LoginType[] {
    const fullPath = path.resolve(filePath);
    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheetName];
    const data: LoginType[] = XLSX.utils.sheet_to_json(sheet);
    return data;
}

