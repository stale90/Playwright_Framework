import {test , expect } from '@playwright/test'
import { BASE_URL,USERNAME,PASSWORD } from '../../utils/EnvConfig';
import { LoginCred, readexcel_logincredential } from '../../utils/excelReader';
import { LoginPage } from '../../pages/LoginPage';


test('Login Test Case', async ({page}) => {
    const loginPage = new LoginPage(page);

    await page.goto(BASE_URL.SAUCEDEMO);
    await loginPage.login(USERNAME,PASSWORD);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

});

const testData : LoginCred [] = readexcel_logincredential('logincredential');

test.describe('Run Test from Test Data Excel', () => {

    for (const data of testData) {
        if (data.run !== 'yes') continue;

        test(`Login App for user - ${data.username}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await page.goto(BASE_URL.SAUCEDEMO);
            await loginPage.login(data.username, data.password);
            if (data.username == 'locked_out_user') {
                await expect(page).toHaveURL('https://www.saucedemo.com/')
            }
            else
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        });
    }

});