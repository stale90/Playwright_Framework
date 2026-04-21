import {Page} from '@playwright/test'

export class BasePage{
    constructor(protected page:Page){}

    async navigation(url:string){
        await this.page.goto(url);
    }

}