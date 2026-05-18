import { test } from "../../fixtures/fixtures";
import { CONFIG } from "../../config/config";
import { TestCase } from "../../types/custom-type";
import { Helper } from "../../reusable/helper";
import { LoginPageStatic } from "../../pages/saucedemo/LoginPageStatic";

  const Test1_testNames: TestCase[] = [
    { testId: "Play-402", testDesc: "verify login with valid credentials on SauceDemo", }
  ];
  test.describe("Login Module @regression", () => {
    const Test1_title: string = "Login Module - @smoke";
    test(`${Test1_title}`, async ({ page }) => {
      Helper.addTestCases(Test1_testNames);
      const login = new LoginPageStatic(page);
      await test.step(`Open Test URL`, async () => { Helper.openURL(page, CONFIG.SAUCEDEMO_BASE_URL); });
      await test.step(`Verify Login Page Content.`, async () => { await login.verifyLoginPageContent(); });
      await test.step(`Login into Application`, async () => { await login.login("standard_user", "secret_sauce"); });
    });
  });