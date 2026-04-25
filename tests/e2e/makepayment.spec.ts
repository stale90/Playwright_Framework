import { test, expect } from '@playwright/test';
import { MakePayment, readexcel_guestmakepayment } from '../../utils/excelReader';
import { GuestMakePayment } from '../../pages/GuestMakePayment';


const testData : MakePayment [] = readexcel_guestmakepayment('guestmakepayment');

test.describe('Run Test from Test Data Excel', () => {

  for (const data of testData) {
    test(`Guest payment - ${data.customerID}`, async ({ page }) => {
      const guestMakePayment = new GuestMakePayment(page);
      await page.goto('http://wm.com/');
      await guestMakePayment.gotoGuestPaymentPage();
      await guestMakePayment.enterCustomerDetails(data.customerID, data.postalCode);
      await guestMakePayment.submitPaymentVerification();
      await guestMakePayment.verifyErrorMessage();
    });
  }

});
