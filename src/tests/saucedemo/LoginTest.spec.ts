import "../../fixtures/BaseTest";
import { test } from "@playwright/test";
import { LoginPage } from "../../pages/saucedemo/LoginPage";
import { CONFIG } from "../../config/config";
import { LoginType } from "../../types/data-type";
import { ExcelReportData, TestCase } from "../../types/custom-type";
import { Helper } from "../../reusable/helper";
import { Utility } from "../../reusable/utility";
import { Logger } from "../../config/logger";


//----------------------------------


const Test3_title: string = "Run Login Test from TestData Excel File - @excel";
const testData = Utility.readFromExcelSheet<LoginType>(
  CONFIG.testDataLocation,
  "login",
);

test.describe.skip(`${Test3_title}`, () => {
  for (const data of testData) {
    if (data.run !== "yes") continue;

    test(`${data.test_desc}`, async ({ page }) => {
      ExcelReportData.testId = data.test_id;
      ExcelReportData.testDesc = data.test_desc;
      Helper.addAnnotation(data.test_id, data.test_desc);
      
      const login = new LoginPage(page);

      await test.step(`Open Test URL`, async () => {
        await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
      });

      await test.step(`Verify Login scenario : ${data.scenario}`, async () => {
        await login.loginScenarios(data.username, data.password, data.scenario);
      });
      ExcelReportData.applicationId = "POFDFLJSDD"+data.test_id;

    });
  }
});

//----------------------------------

const Test1_testNames: TestCase[] = [
  {
    testId: "Play-402",
    testDesc: "verify login with valid credentials on SauceDemo",
  },
];
const Test1_title: string = "Verify Login flow - @regression";

test.skip(`${Test1_title}`, async ({ page }) => {
  Helper.addTestCases(Test1_testNames);
  let username = "standard_user";
  let password = "secret_sauce";

  const login = new LoginPage(page);
  await test.step(`Open Test URL`, async () => {
    await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
  });
  await test.step(`Verify Login Page Content.`, async () => {
    await login.verifyLoginPageContent();
  });
  await test.step(`Login into Application`, async () => {
    await login.login(username, password);
  });
});

//--------------------------------

const Test2_testNames: TestCase[] = [
  { testId: "Play-300", testDesc: "verify login page elements on SauceDemo" },
  { testId: "Play-302", testDesc: "verify login with invalid credentials" },
];
const Test2_title: string = "Verify SauceDemo Login flow Errors - @regression";
test.skip(`${Test2_title}`, async ({ page }) => {
  Helper.addTestCases(Test2_testNames);
  let username = "locked_out_user";
  let password = "secret_sauce";

  const login = new LoginPage(page);
  await test.step(`Open Test URL`, async () => {
    await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
  });

  await test.step(`Verify Login Error scenarios`, async () => {
    await login.invalidLogin(username, password);
  });
});

//---------------------------



//------------------------------
