
// Custom DataType for sheet : loginData
export interface LoginType {
    run: string;
    testname: string;
    summary: string;
    username: string;
    password: string;
    scenario: string; 
    message: string;
}

// Custom DataType for sheet : guestmakepayment
export interface GuestMakePaymentType {
    customerID: string;
    postalCode: string;
    expected: string;
    run: string;
}

