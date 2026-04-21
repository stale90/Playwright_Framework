import {test} from '@playwright/test'
import { LoginOrange } from '../../pages/loginOrange';
import { CONFIG } from '../../config/config';
import { Logger } from '../../utils/logger';


test('Login Orange Test Case', async ({page}) => {
    let username = 'Admin'
    let password = 'admin123'
    const loginOrange = new LoginOrange(page);
    Logger.info("Open Orange Login page");
    await loginOrange.navigation(CONFIG.orange_baseUrl);
    Logger.info(CONFIG.myMessage);
    Logger.info('Enter the credentials');
    await loginOrange.login(username,password);
});
