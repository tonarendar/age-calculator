import { test, expect } from "@playwright/test";
import { HomePage } from "../functional/pages/HomePage";

test.describe("Age Calculator - Visual Regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.getPageHeader()).toHaveText(
      "Birthdate Age Calculator",
    );
  });

  test("UI Home page", { tag: "@visual" }, async ({ page }) => {
    await expect(page).toHaveScreenshot("age-calculator-default.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("UI Success message", { tag: "@visual" }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.fillDateOfBirth("1990/05/20");
    await homePage.clickSubmit();
    await expect(homePage.getResultText()).toContainText("You are");

    await expect(page).toHaveScreenshot("age-calculator-success-result.png", {
      fullPage: true,
      animations: "disabled",
    });
  });

  test("UI Invalid format error", { tag: "@visual" }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.fillDateOfBirth("03/20/90");
    await homePage.clickSubmit();
    await expect(homePage.getResultText()).toContainText(
      "Error: Please enter date in YYYY/MM/DD format",
    );

    await expect(page).toHaveScreenshot(
      "age-calculator-invalid-format-error.png",
      {
        fullPage: true,
        animations: "disabled",
      },
    );
  });

  test("UI Clear state", { tag: "@visual" }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.fillDateOfBirth("1990/05/20");
    await homePage.clickSubmit();
    await homePage.clickClear();
    await expect(homePage.getDateInput()).toHaveValue("");
    await expect(homePage.getResultText()).toHaveText("");

    await expect(page).toHaveScreenshot("age-calculator-cleared-state.png", {
      fullPage: true,
      animations: "disabled",
    });
  });
});

test.describe("Age Calculator - Style and Role Checks", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const homePage = new HomePage(page);
    await homePage.visit();
  });

  test(
    "Checks expected roles are present",
    { tag: "@layout" },
    async ({ page }) => {
      const heading = page.getByRole("heading", {
        name: "Birthdate Age Calculator",
      });
      const input = page.getByRole("textbox", { name: "Date of Birth" });
      const submitButton = page.getByRole("button", { name: "Submit" });
      const clearButton = page.getByRole("button", { name: "Clear" });
      const result = page.getByTestId("result");

      await expect(heading).toBeVisible();
      await expect(input).toBeVisible();
      await expect(submitButton).toBeVisible();
      await expect(clearButton).toBeVisible();
      await expect(result).toBeVisible();
    },
  );

  test(
    "Checks button text color and gradient background",
    { tag: "@layout" },
    async ({ page }) => {
      const submitButton = page.getByRole("button", { name: "Submit" });

      await expect(submitButton).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(submitButton).toHaveCSS(
        "background-image",
        /linear-gradient/,
      );
    },
  );

  test(
    "Checks result text colors for default and error state",
    { tag: "@layout" },
    async ({ page }) => {
      const homePage = new HomePage(page);

      await expect(homePage.getResultText()).toHaveCSS(
        "color",
        "rgb(51, 51, 51)",
      );

      await homePage.fillDateOfBirth("03/20/90");
      await homePage.clickSubmit();
      await expect(homePage.getResultText()).toContainText(
        "Error: Please enter date in YYYY/MM/DD format",
      );
      await expect(homePage.getResultText()).toHaveCSS(
        "color",
        "rgb(231, 76, 60)",
      );
      //await expect(homePage.getResultText()).toHaveCSS('color', 'rgb(180, 35, 24)');
    },
  );
});
