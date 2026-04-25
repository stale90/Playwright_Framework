import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {

    readonly page: Page;
    readonly lbl_PageHeading: Locator;
    readonly txt_Username: Locator;
    readonly txt_Password: Locator;
    readonly btn_Login: Locator;
    readonly lbl_FooterHeading1: Locator;
    readonly lbl_FooterHeading2: Locator;
    readonly lbl_StandardUser: Locator;
    readonly lbl_SecretSauce: Locator;
    readonly msg_Error: Locator;
    readonly btn_ErrButton: Locator;
    readonly msg_PassErr: Locator;
    readonly lbl_BurgerIcon: Locator;
    readonly msg1:string = "Epic sadface: Username is required";
    readonly msg2:string = "Epic sadface: Password is required";
    readonly msg3:string = "Epic sadface: Sorry, this user has been locked out.";

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.lbl_PageHeading = page.getByText('Swag Labs');
        this.txt_Username = page.locator('[data-test="username"]');
        this.txt_Password = page.locator('#password');     // //input[@id="password"]
        this.btn_Login = page.locator('[data-test="login-button"]');  //  #login-button
        this.lbl_FooterHeading2 = page.locator('//h4[contains(text(), "Password")]');
        this.lbl_FooterHeading1 = page.locator('//h4[ contains( text() , "Accepted")]');
        this.lbl_StandardUser = page.locator('//div[contains(text(), "standard_user")]');
        this.lbl_SecretSauce = page.locator('//div[contains(text(), "secret_sauce")]');
        this.msg_Error = page.locator('[data-test="error"]');
        this.btn_ErrButton = page.locator('//button[@class="error-button"]');
        this.msg_PassErr = page.locator('//h3[contains(text(),"Password")]'); 
        this.lbl_BurgerIcon = page.locator('//div[@class="bm-burger-button"]');

    }

    // Verify all Elements on WebPage
    async verifyLoginPageContent() {
        await this.verifyTextFull(this.lbl_PageHeading, "Swag Labs", "Page Heading");
        await this.verifyAttributeValue(this.txt_Username, "placeholder", "Username", "UserName TextBox");
        await this.verifyAttributeValue(this.txt_Password, "placeholder", "Password", "Password TextBox");
        await this.verifyTextFull(this.btn_Login, "Login", "Button Button");
        await this.verifyTextFull(this.lbl_FooterHeading1, "Accepted usernames are:", "Login Cred - Username heading");
        await this.verifyTextFull(this.lbl_FooterHeading2, "Password for all users:", "Login Cred - Password heading");
    }

    // Verify Login into Application
    async login(username: string, password: string) {
        await this.fill(this.txt_Username, username, "Username Textbox");
        await this.fill(this.txt_Password, password, "Password Textbox");
        await this.click(this.btn_Login, "Login Button");
        await this.verifyCurrentUrl("https://www.saucedemo.com/inventory.html", "Dashboard URL");
        await this.isVisible(this.lbl_BurgerIcon, "Hamberger Icon");
    }

    //
    async invalidLogin(username: string, password: string) {
        //Verify username empty error
        await this.fill(this.txt_Password, password, "Password Textbox");
        await this.click(this.btn_Login, "Login Button");
        await this.verifyTextFull(this.msg_Error, `${this.msg1}`, "Empty UserName Error");

        //Verify password empty error
        await this.fill(this.txt_Username, username, "Username Textbox");
        await this.clearInput(this.txt_Password,"Password Textbox");
        await this.click(this.btn_Login, "Login Button");
        await this.verifyTextFull(this.msg_Error, `${this.msg2}`, "Empty Password Error");

        //Verify Invalid Credentials
        await this.fill(this.txt_Password, password, "Password Textbox");
        await this.click(this.btn_Login, "Login Button");
        await this.verifyTextFull(this.msg_Error, `${this.msg3}`, "Invalid Cred Error");
    }

    // Verify Login into Application
    async loginScenarios(username: string, password: string, scenario: string) {
        switch(scenario.toLowerCase()){

            case "valid_credential" :
                await this.fill(this.txt_Username, username, "Username Textbox");
                await this.fill(this.txt_Password, password, "Password Textbox");
                await this.click(this.btn_Login, "Login Button");
                await this.verifyCurrentUrl("https://www.saucedemo.com/inventory.html", "Dashboard URL");
                break;

            case "username_missing":
                await this.fill(this.txt_Password, password, "Password Textbox");
                await this.click(this.btn_Login, "Login Button");
                await this.verifyTextFull(this.msg_Error, `${this.msg1}`, "Empty UserName Error");
                break;

            case "password_missing":
                await this.fill(this.txt_Username, username, "Username Textbox");    
                await this.click(this.btn_Login, "Login Button");
                await this.verifyTextFull(this.msg_Error, `${this.msg2}`, "Empty Password Error");
                break;

            case "invalid_credential":
                await this.fill(this.txt_Username, username, "Username Textbox");
                await this.fill(this.txt_Password, password, "Password Textbox");    
                await this.click(this.btn_Login, "Login Button");
                await this.verifyTextFull(this.msg_Error, `${this.msg3}`, "Invalid Cred Error");
                break;

            default:
                console.log(`Unknown scenario: ${scenario}`);
                throw new Error(`Invalid scenario: ${scenario}`);
        }
    }

}



