import {Page, Locator} from '@playwright/test';

export class LoginPage {


    //1. define variables -  private and readonly
    //2. constructor -
            // A special method that runs automatically when you write new LoginPage(page)
            // Its job is to set up the object — assign properties, initialise locators
            //A class can only have one constructor
            //If you don't write one, TypeScript silently creates an empty one for you
    //3. action methods

//1. define variables - private and readonly
    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly userNameInput: Locator;
    private readonly userPasswordInput: Locator;
    private readonly loginButton: Locator;
 //2. constructor -
    constructor(page: Page){
    //          ↑     ↑
    //     parameter  TypeScript type annotation
        this.page = page; 
        // this refers to the specific object being created right now
        // this.page means "store on THIS object, not just a local variable"
        this.loginLink = page.locator('#login2');
        this.userNameInput = page.locator('#loginusername');
        this.userPasswordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', {name: 'Log in'});
    }


    async clickLoginLink() : Promise<void>{
        await this.loginLink.click();
    }

    async loginFlow(username: string, password: string){
        await this.userNameInput.fill(username);
        await this.userPasswordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginJourney(username: string, password: string) {
        await this.clickLoginLink();
        await this.loginFlow(username,password);
        await this.clickLoginButton();

    }
}
