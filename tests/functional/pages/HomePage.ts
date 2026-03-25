import { Locator, Page } from "@playwright/test";

export class HomePage {
  //1.Locators:
  private readonly page: Page;
  private readonly pageHeader: Locator;
  private readonly dateInput: Locator;
  private readonly submitButton: Locator;
  private readonly clearButton: Locator;
  private readonly resultText: Locator;

  //2.Constructor: setup method that runs automatically when new Page Object is created.
  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole("heading", {
      name: "Birthdate Age Calculator",
    });
    this.dateInput = page.getByRole("textbox", { name: "Date of Birth" });
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.clearButton = page.getByRole("button", { name: "Clear" });
    this.resultText = page.getByTestId("result");
  }

  //3. Action methods: methods that perform actions on the page.

  async visit() {
    await this.page.goto("");
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
