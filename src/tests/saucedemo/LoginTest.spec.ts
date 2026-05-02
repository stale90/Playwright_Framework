import { test } from "@playwright/test";
import { LoginPage } from "../../pages/saucedemo/LoginPage";
import { CONFIG } from "../../config/config";
import { login_data } from "../../data/TestData";
import { LoginType } from "../../types/data-type";
import { TestCase } from "../../types/annotations-type";
import { Helper } from "../../reusable/helper";

//--------------------------------

const Test1_testNames: TestCase[] = [
  {
    testId: "Play-402",
    testDesc: "verify login with valid credentials on SauceDemo",
  },
];
const Test1_title: string = "Verify Login flow - @regression";

test(`${Test1_title}`, async ({ page }) => {
  Helper.addAnnotations(Test1_testNames);
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
test(`${Test2_title}`, async ({ page }) => {
  Helper.addAnnotations(Test2_testNames);
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

const Test3_title: string = "Run Login Test from TestData Excel File - @excel";
const testData: LoginType[] = login_data("login");

test.describe(`${Test3_title}`, () => {
  for (const data of testData) {
    if (data.run !== "yes") continue;
    const Test3_testNames: TestCase[] = [
      { testId: data.testname, testDesc: data.summary },
    ];
    test(`Verify various Login scenarios - ${data.scenario}`, async ({
      page,
    }) => {
      Helper.addAnnotations(Test3_testNames);
      const login = new LoginPage(page);
      await test.step(`Open Test URL`, async () => {
        await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
      });
      await test.step(`Verify Login scenario : ${data.scenario}`, async () => {
        await login.loginScenarios(data.username, data.password, data.scenario);
      });
    });
  }
});

//------------------------------
