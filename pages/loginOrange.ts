import { Page } from "@playwright/test";
import { BasePage } from "./Base.page";
import { WaitHelper } from "../utils/waitHelper";

export class LoginOrange extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await WaitHelper.waitForVisible(
      this.page.getByRole("heading", { name: "Login" }),
    );

    await this.page.getByRole('heading', { name: 'Login' }).click();
    await this.page.getByRole('textbox', { name: 'Username' }).click();
    await this.page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await this.page.getByRole('textbox', { name: 'Password' }).click();
    await this.page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await this.page.getByRole('button', { name: 'Login' }).click();
    await WaitHelper.waitForUrlNavigation(this.page);
    // await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

  }
}
