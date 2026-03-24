import { Locator, Page } from '@playwright/test';

export class HomePage {

    //1.Identify variables - private and readonly
    // using encapsulation - wrapping of data into variabels that is only accessile inside the class

    private readonly page: Page;
    private readonly pageHeader: Locator;
    private readonly dateInput: Locator;
    private readonly submitButton: Locator;
    private readonly clearButton: Locator;
    private readonly resultText: Locator;


    //2.Constructor
    //The constructor is the setup method that runs automatically when you create a new Page Object .
    // its job is to receive the Playwright page, store it, and define all the locators.
    //  so every method in the class can use them."

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByRole('heading', { name: 'Birthdate Age Calculator' });
        this.dateInput = page.getByRole('textbox', { name: 'Date of Birth' });
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.clearButton = page.getByRole('button', { name: 'Clear' });
        this.resultText = page.getByTestId('result');
    }

    //3. Action methods

    async visit() {
        await this.page.goto('');
    }

    async fillDateOfBirth(dateOfBirth: string) {
        await this.dateInput.fill(dateOfBirth);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async clickClear() {
        await this.clearButton.click();
    }

    getPageHeader(): Locator {
        return this.pageHeader;
    }

    getDateInput(): Locator {
        return this.dateInput;
    }

    getResultText(): Locator {
        return this.resultText;
    }
}