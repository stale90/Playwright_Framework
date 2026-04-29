import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/saucedemo/LoginPage"; 
import { CONFIG } from "../../src/config/config";
import { excel_loginData } from "../../src/utils/excelReader";
import { LoginCred } from "../../src/types/test-data";
import { TestCase } from "../../src/types/annotations";


//--------------------------------
 

var title_test1: string = "Verify SauceDemo Login Flow @smoke";
var type_test1: string[] = ["T1", "T2"];
var desc_test1: string[] = [
  "Play-300 : verify login page elements on SauceDemo",
  "Play-301 : verify login with valid credentials on SauceDemo",
];

test(
  `${title_test1}`,
  {
    annotation: [
      { type: type_test1[0], description: desc_test1[0] },
      { type: type_test1[1], description: desc_test1[1] },
    ],
  },
  async ({ page }) => {
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
  },
);

//--------------------------------

let title_test2: string = "Verify SauceDemo Login flow Errors - @regression";
const testNames: TestCase[] = [
  { testId: "Play-300", testDesc: "verify login page elements on SauceDemo"},
  { testId: "Play-302", testDesc: "verify login with valid credentials on SauceDemo"}
];

test( 
  `${title_test2}`,
  {
   annotation: [
      { type: testNames[0].testId, description: testNames[0].testDesc },
      { type: testNames[1].testId, description: testNames[1].testDesc },
    ],
  },
  async ({ page }) => {
    let username = "locked_out_user";
    let password = "secret_sauce";
    const login = new LoginPage(page);
    await test.step(`Open Test URL`, async () => {
      await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
    });
    await test.step(`Verify Login Error scenarios`, async () => {
      await login.invalidLogin(username, password);
    });
  },
);

const testData: LoginCred[] = excel_loginData("loginData");

test.describe("Run Login Test from TestData Excel File - @excel", () => {
  for (const data of testData) {
    if (data.run !== "yes") continue;
    test(
      `Verify various Login scenarios - ${data.scenario}`,
      {
        annotation: [
          { type: `${data.testname}`, description: `${data.summary}` },
        ],
      },
      async ({ page }, testInfo) => {
        const login = new LoginPage(page);
        await test.step(`Open Test URL`, async () => {
          await login.navigateTo(CONFIG.SAUCEDEMO_BASE_URL);
        });
        await test.step(`Verify Login scenario : ${data.scenario}`, async () => {
          await login.loginScenarios(
            data.username,
            data.password,
            data.scenario,
          );
        });
      },
    );
  }
});
