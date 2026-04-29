import { Page, Locator , expect } from "@playwright/test";

export class GuestMakePayment {

    readonly page : Page;
    // Locators as class properties
    readonly $makePaymentLink: Locator;
    readonly $customerIdInput: Locator;
    readonly $billingPostalCodeInput: Locator;
    readonly $verifyCustomerSubmit: Locator;
    readonly $errorStatusMsg : Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize all locators
    this.$makePaymentLink = page.getByRole('link', { name: 'Make a Payment' });
    this.$customerIdInput = page.getByRole('textbox', { name: 'Customer ID' });
    this.$billingPostalCodeInput = page.getByRole('textbox', { name: 'Billing Postal Code' });
    this.$verifyCustomerSubmit = page.getByTestId('VerifyCustomer - SubmitButton');
    this.$errorStatusMsg = page.locator('.status-message');

  }

// Page actions as methods
  async gotoGuestPaymentPage() {
    await this.$makePaymentLink.click();
    await expect(this.$customerIdInput).toBeVisible();
  }

  // Enter Billing details
  async enterCustomerDetails (customerId : string , postalCode : string ){

    await this.$customerIdInput.click();
    await this.$customerIdInput.fill(customerId);
    await this.$billingPostalCodeInput.click();
    await this.$billingPostalCodeInput.fill(postalCode);

  }

   async submitPaymentVerification() {
    await this.$verifyCustomerSubmit.click();
  }

  async verifyErrorMessage() {
    await expect(this.$errorStatusMsg).toBeVisible();
    await expect(this.$errorStatusMsg).toContainText('Please enter a valid Customer ID');
  }
}