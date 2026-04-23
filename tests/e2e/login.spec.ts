import {test , expect } from '@playwright/test'
import { LoginCred, readexcel_logincredential } from '../../utils/excelReader';
import { LoginPage } from '../../pages/LoginPage';
import { Logger } from '../../utils/logger';
import { CONFIG } from '../../config/config';



const testData : LoginCred [] = readexcel_logincredential('logincredential');

test.describe('Run Test from Test Data Excel', () => {

    for (const data of testData) {
        if (data.run !== 'yes') continue;

        test(`Login App for user - ${data.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await page.goto(CONFIG.saucedemo_baseUrl);
            await loginPage.login(data.username, data.password);
            if (data.username == 'locked_out_user') {
                await expect(page).toHaveURL('https://www.saucedemo.com/')
            }
            else
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        });
    }

});