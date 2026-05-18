
// Custom DataType for sheet : loginData
export interface LoginType {
    run: string;
    test_id: string;
    test_desc: string;
    username: string;
    password: string;
    scenario: string; 
    comment: string;
}

// Custom DataType for sheet : guestmakepayment
export interface GuestMakePaymentType {
    customerID: string;
    postalCode: string;
    expected: string;
    run: string;
}

