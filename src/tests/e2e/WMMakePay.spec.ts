import { test, expect } from '@playwright/test';
import { guestmakepayment_data } from '../../data/TestData'; 
import { GuestMakePayment } from '../../pages/GuestMakePayment';
import { GuestMakePaymentType } from "../../types/data-type";


const testData : GuestMakePaymentType [] = guestmakepayment_data('guestmakepayment');

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