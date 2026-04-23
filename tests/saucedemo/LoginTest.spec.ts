import { test } from "@playwright/test";
import { LoginPage } from "../../pages/saucedemo/LoginPage";
import { CONFIG } from "../../config/config";
import { LoginCred, excel_loginData } from "../../utils/excelReader";


test("Verify SauceDemo Login Flow",
    {
    annotation: [
                { type: 'Play-300', description: 'verify login page elements on SauceDemo'},
                { type: 'Play-301', description: 'verify login with valid credentials on SauceDemo'},
                ]
    },
    async ({ page }) => {
    let username = 'standard_user';
    let password = 'secret_sauce';
    const login = new LoginPage(page);
    await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
    await login.verifyLoginPageContent();
    await login.login(username,password);
});


test("Verify SauceDemo Login flow Errors",
    {
    annotation: [
                { type: 'Play-302', description: 'verify Error messages with invalid credentials.'},
                ]
    },
    async ({ page }) => {
    let username = 'locked_out_user';
    let password = 'secret_sauce';
    const login = new LoginPage(page);
    await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
    await login.invalidLogin(username,password);
});


const testData: LoginCred[] = excel_loginData('logincredential');

test.describe('Run Login Test from TestData Excel File', () => {

    for (const data of testData) {
        if (data.run !== 'yes')
            continue;
        test(`Login Application for scenario - ${data.scenario}`, {
            annotation: [{ type: `${data.testname}`, description: `${data.summary}` }]
        },
            async ({ page }) => {
                const login = new LoginPage(page);
                await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
                await login.loginScenarios(data.username, data.password, data.scenario);
            });
    }
});