import { Page, Locator , expect } from "@playwright/test";

export class LoginPage {

    // local page object
    readonly page : Page;

    // Locators of WebPage
    readonly $username: Locator;
    readonly $password: Locator;
    readonly $loginButton: Locator;

    // Initialize all locators
    constructor(page: Page) {
        this.page = page;
        this.$username = page.locator('[data-test="username"]');
        this.$password = page.locator('[data-test="password"]');
        this.$loginButton = page.locator('[data-test="login-button"]');

    }
   
    async login (username : string , password : string ){

        await this.$username.fill(username);
        await this.$password.fill(password);
        await this.$loginButton.click();
    }
}