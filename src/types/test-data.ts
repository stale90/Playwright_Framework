
// Custom Type for sheet : loginData
export type LoginCred = {
    run: string;
    testname:string;
    summary:string;
    username: string;
    password: string;
    scenario: string; 
    message: string;
}

// Custom Type for sheet : guestmakepayment
export type MakePayment = {
    customerID: string;
    postalCode: string;
    expected: string;
    run: string;
}