import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../utils/EnvConfig';
import { GuestMakePayment } from '../../src/pages/GuestMakePayment';


test('test', async ({ page }) => {
  await page.goto('https://www.wm.com/');
  await page.getByRole('link', { name: 'Make a Payment' }).click();
  await page.getByRole('textbox', { name: 'Customer ID' }).click();
  await page.getByRole('textbox', { name: 'Customer ID' }).fill('1111-11111-111111');
  await page.getByRole('textbox', { name: 'Billing Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Billing Postal Code' }).fill('77880');
  await page.getByTestId('VerifyCustomer - SubmitButton').click();
  await expect(page.locator('.status-message')).toContainText('Please enter a valid Customer ID');

});


test.only('Guest payment using POM', async ({ page }) => {
  console.log('POM Implementation');
  const guestMakePayment = new GuestMakePayment(page);
  await page.goto(BASE_URL.WM);
  await guestMakePayment.gotoGuestPaymentPage();
  await guestMakePayment.enterCustomerDetails('1111222233334444', '99875');
  await guestMakePayment.submitPaymentVerification();
  await guestMakePayment.verifyErrorMessage();

});
