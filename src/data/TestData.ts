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


/**
 * Generic Excel reader - Works for ANY sheet + ANY type!
 * @param sheetName - Excel sheet name
 * @returns T[] - Typed array (LoginType[], GuestMakePaymentType[], etc.)
 */
export function readFromExcelSheet<T>(sheetName: string): T[] {
  try {
    const fullPath = path.resolve(filePath);
    
    // Read workbook once
    const workbook = XLSX.readFile(fullPath);
    
    // Validate sheet exists
    if (!workbook.Sheets[sheetName]) {
      throw new Error(`Sheet "${sheetName}" not found, Please recheck Sheet name.`);
    }
    
    const sheet = workbook.Sheets[sheetName];
    
    // ✅ Generic sheet_to_json<T> - XLSX supports it natively!
    const data: T[] = XLSX.utils.sheet_to_json<T>(sheet, { 
      defval: '',  // Handle empty cells
      raw: false   // Formatted strings
    });
    
    return data;
  } catch (error) {
    console.error(`❌ Excel read failed for sheet: ${sheetName}`, error);
    return [];  // Empty typed array on error
  }
}

