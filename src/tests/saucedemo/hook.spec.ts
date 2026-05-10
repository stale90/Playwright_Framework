import { test } from "../../config/fixtures";
import { CONFIG } from "../../config/config";
import { LoginType } from "../../types/data-type";
import { TestCase } from "../../types/custom-type";
import { Helper } from "../../reusable/helper";
import { Utility } from "../../reusable/utility";
import { LoginPageStatic } from "../../pages/saucedemo/LoginPageStatic";



test.describe("Login Module @regression", () => {

// Test 1
  const Test1_testNames: TestCase[] = [
    {testId: "Play-402", testDesc: "verify login with valid credentials on SauceDemo",}
  ];

  const Test1_title: string = "Login Module - @smoke";

  test(`${Test1_title}`, async ({ page }) => {
    Helper.addTestCases(Test1_testNames);
    let username = "standard_user";
    let password = "secret_sauce";

    const login = new LoginPageStatic(page);
    await test.step(`Open Test URL`, async () => {
      await page.goto(CONFIG.SAUCEDEMO_BASE_URL);
    });
    await test.step(`Verify Login Page Content.`, async () => {
      await login.verifyLoginPageContent();
    });
    await test.step(`Login into Application`, async () => {
      await login.login(username, password);
    });
  });
});
