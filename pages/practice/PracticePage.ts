import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage';


export class PracticePage extends BasePage {

  readonly page: Page;
   // ✅ ALL Elements from https://www.letskodeit.com/practice
  readonly ddl_CarSelect: Locator;
  readonly ddl_MultipleSelect: Locator;
  readonly inp_AutoSuggest: Locator;
  
  readonly radio_BMW: Locator;
  readonly radio_Benz: Locator;
  readonly radio_Honda: Locator;
  
  readonly chk_BMW: Locator;
  readonly chk_Benz: Locator;
  readonly chk_Honda: Locator;
  
  readonly btn_OpenWindow: Locator;
  readonly btn_OpenTab: Locator;
  readonly btn_Alert: Locator;
  readonly btn_MouseHover: Locator;
  
  readonly btn_Disabled: Locator;
  readonly btn_ElementDisplayed: Locator;
  
  readonly tbl_WebTable: Locator;
  readonly tbl_WebTable_Author: Locator;
  readonly tbl_WebTable_Course: Locator;
  readonly tbl_WebTable_Price: Locator;
  
  readonly iframe_Example: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.ddl_CarSelect = page.locator('#carselect');
    this.ddl_MultipleSelect = page.locator('#multiple-select-example');
    this.inp_AutoSuggest = page.locator('#autosuggest');
    
    // Radio buttons
    this.radio_BMW = page.locator('input[type="radio"][value="bmw"]');
    this.radio_Benz = page.locator('input[type="radio"][value="benz"]');
    this.radio_Honda = page.locator('input[type="radio"][value="honda"]');
    
    // Checkboxes
    this.chk_BMW = page.locator('#check-bmw');
    this.chk_Benz = page.locator('#check-benz');
    this.chk_Honda = page.locator('#check-honda');
    
    // Buttons
    this.btn_OpenWindow = page.locator('#openwindow');
    this.btn_OpenTab = page.locator('#opentab');
    this.btn_Alert = page.locator('#alertbtn');
    this.btn_MouseHover = page.locator('#mousehover');
    this.btn_Disabled = page.locator('#disabled-button');
    this.btn_ElementDisplayed = page.locator('#element-displayed');
    
    // Web Table
    this.tbl_WebTable = page.locator('.example table');
    this.tbl_WebTable_Author = page.locator('.example table th:nth-child(1)');
    this.tbl_WebTable_Course = page.locator('.example table th:nth-child(2)');
    this.tbl_WebTable_Price = page.locator('.example table th:nth-child(3)');
    
    // iFrame
    this.iframe_Example = page.locator('#iframeexample');
  }

  
}