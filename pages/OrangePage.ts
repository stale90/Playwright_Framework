import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage';

class OrangeHRMLoginPage extends BasePage {
    readonly page: Page;
    
    // Logo and Branding
    readonly img_OrangeHRMLogo: Locator;
    readonly lbl_OrangeHRM: Locator;
    
    // Login Form Elements
    readonly lbl_LoginHeading: Locator;
    readonly lbl_UsernameLabel: Locator;
    readonly lbl_PasswordLabel: Locator;
    readonly lbl_UsernameText: Locator;
    readonly lbl_PasswordText: Locator;
    readonly txt_Username: Locator;
    readonly txt_Password: Locator;
    readonly lnk_ForgotPassword: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        
        // Logo
        this.img_OrangeHRMLogo = page.getByRole('img', { name: 'orangehrm-logo' });
        
        // Branding & Links
        this.lnk_ForgotPassword = page.getByText('Forgot your password?');
        this.lbl_OrangeHRM = page.getByText('OrangeHRM OS');
        
        // Login Heading
        this.lbl_LoginHeading = page.getByRole('heading', { name: 'Login' });
        
        // Labels & Sample Text
        this.lbl_UsernameLabel = page.getByText('Username', { exact: true });
        this.lbl_PasswordLabel = page.getByText('Password', { exact: true });
        this.lbl_UsernameText = page.getByText('Username : Admin');
        this.lbl_PasswordText = page.getByText('Password : admin123');
        
        // Input Fields
        this.txt_Username = page.getByRole('textbox', { name: 'Username' });
        this.txt_Password = page.getByRole('textbox', { name: 'Password' });
    }

    async verifyLoginPageContent() {
        // Verify Logo
        await this.isVisible(this.img_OrangeHRMLogo, "OrangeHRM Logo");
        
        // Verify Branding Elements
        await this.isVisible(this.lnk_ForgotPassword, "Forgot Password Link");
        await this.isVisible(this.lbl_OrangeHRM, "OrangeHRM OS Text");
        await this.isVisible(this.lbl_LoginHeading, "Login Heading");
        
        // Verify Labels
        await this.isVisible(this.lbl_UsernameLabel, "Username Label");
        await this.isVisible(this.lbl_PasswordLabel, "Password Label");
        await this.isVisible(this.lbl_UsernameText, "Username Sample Text");
        await this.isVisible(this.lbl_PasswordText, "Password Sample Text");
        
        // Verify Input Fields
        await this.isVisible(this.txt_Username, "Username Textbox");
        await this.isVisible(this.txt_Password, "Password Textbox");
    }

    async performLogin(username: string = "Admin", password: string = "admin123") {
        await this.fill(this.txt_Username, username, "Username Textbox");
        await this.fill(this.txt_Password, password, "Password Textbox");
        // Login button locator would be added based on actual selector
        // await this.click(this.btn_Login, "Login Button");
    }

    async clickLogo() {
        await this.click(this.img_OrangeHRMLogo, "OrangeHRM Logo");
    }

    async clickForgotPassword() {
        await this.click(this.lnk_ForgotPassword, "Forgot Password Link");
    }
}