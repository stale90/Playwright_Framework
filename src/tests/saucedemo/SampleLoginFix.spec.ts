import { test } from "../../reusable/fixtures";
import { LoginPage } from "../../pages/saucedemo/LoginPage";
import { excel_loginData } from "../../data/TestData";
import { LoginCred } from "../../types/data-type";


test.skip(
  "Verify New Tab @smoke",
  {
    annotation: [
      {
        type: "Play-300",
        description: "verify login page elements on SauceDemo",
      },
      {
        type: "Play-301",
        description: "verify login with valid credentials on SauceDemo",
      },
    ],
  },
  async ({ QApage , context } ) => {
    const page = QApage;
    const [newTab] = await Promise.all( [context.waitForEvent('page'), page.locator('#opentab').click()]);
    await newTab.waitForURL('**/practice**');
    await page.bringToFront();
    await newTab.close();

  },
);


test(
  "Verify SauceDemo Login Flow @smoke",
  {
    annotation: [
      {
        type: "Play-300",
        description: "verify login page elements on SauceDemo",
      },
      {
        type: "Play-301",
        description: "verify login with valid credentials on SauceDemo",
      },
    ],
  },
  async ({ QApage }) => {
    const page = QApage;
    let username = "standard_user";
    let password = "secret_sauce";
    const login = new LoginPage(page);
    await login.verifyLoginPageContent();
    await login.login(username, password);
  },
);

test(
  "Verify SauceDemo Login flow Errors - @regression",
  {
    annotation: [
      {
        type: "Play-302",
        description: "verify Error messages with invalid credentials.",
      },
    ],
  },
  async ({ QApage }) => {
    const page = QApage;
    let username = "locked_out_user";
    let password = "secret_sauce";
    const login = new LoginPage(page);
    await login.invalidLogin(username, password);
  },
);


const testData: LoginCred[] = excel_loginData("loginData");

test.describe("Run Login Test from TestData Excel File - @excel", () => {
  for (const data of testData) {
    if (data.run !== "yes") continue;
    test(
      `Login Application for scenario - ${data.scenario}`,
      {
        annotation: [
          { type: `${data.testname}`, description: `${data.summary}` },
        ],
      },
      async ({ QApage }, testInfo) => {
        const page = QApage;
        const login = new LoginPage(page);
        await login.loginScenarios(data.username, data.password, data.scenario);
      },
    );
  }
});