
// Custom DataType for sheet : loginData
export interface LoginCred {
    run: string;
    testname: string;
    summary: string;
    username: string;
    password: string;
    scenario: string; 
    message: string;
}

// Custom DataType for sheet : guestmakepayment
export interface MakePayment {
    customerID: string;
    postalCode: string;
    expected: string;
    run: string;
}

