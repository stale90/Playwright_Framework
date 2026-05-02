import { test } from "@playwright/test";
import * as allure from "allure-js-commons";


test("login with valid credentials", async ({ page }) => {
  var screenshot;
  var video;
  await allure.epic("User Authentication");
  await allure.feature("Login");
  await allure.story("Success login");
  await allure.severity("critical");
  await allure.description("Validates successful login with correct credentials");

  await allure.step("Navigate to login page", async () => {
    
    await page.goto("https://www.saucedemo.com/");
    screenshot = await page.screenshot();
    allure.attachment("dashboard-screenshot", screenshot, "image/png");
  });

  await allure.step("Enter credentials", async () => {
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");
  });

  await allure.step("Verify dashboard", async () => {
    await page.waitForURL(/inventory/);
    screenshot = await page.screenshot();
    allure.attachment("dashboard-screenshot", screenshot, "image/png");
  });
});