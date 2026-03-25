import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";

/**
 * @description UI Security test suite for the Age Calculator home page.
 * Verifies that malicious inputs (XSS, SQL injection, oversized payloads) are safely
 * rejected by the client-side validation layer and are never reflected back in the DOM.
 * All tests use the HomePage Page Object Model and run against a live local server.
 */
test.describe("UI Security Scenarios", { tag: "@security" }, () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.getPageHeader()).toHaveText(
      "Birthdate Age Calculator",
    );
  });

  test.afterEach(async ({ page }) => {
    // Clear input state between tests
    await page.evaluate(() => localStorage.clear());
    await page.evaluate(() => sessionStorage.clear());
  });

  test("1.UI reject XSS-style input and does not execute scripts on submit", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    let dialogTriggered = false;

    // Register event listener before loading the page to catch any unexpected dialogs
    page.on("dialog", async (dialog) => {
      dialogTriggered = true;
      await dialog.dismiss();
    });

    const xssPayload = "<script>alert(1)</script>";

    // User Actions
    await homePage.fillDateOfBirth(xssPayload);
    await homePage.clickSubmit();

    // Assertion: Raw script tag must NOT appear in DOM
    await expect(homePage.getResultText()).toContainText(
      "Error: Please enter date in YYYY/MM/DD format",
    );
    await expect(homePage.getResultText()).not.toContainText("<script>");

    // Alert dialog should not be triggered
    expect(dialogTriggered).toBe(false);
  });

  test("2.UI reject SQL injection-style input on submit", async ({ page }) => {
    const homePage = new HomePage(page);
    const sqlPayload = "' OR '1'='1; DROP TABLE users; --";

    // User Actions
    await homePage.fillDateOfBirth(sqlPayload);
    await homePage.clickSubmit();

    // Assertion: Should show validation error and not reflect the SQL payload
    await expect(homePage.getResultText()).toContainText(
      "Error: Please enter date in YYYY/MM/DD format",
    );
    await expect(homePage.getResultText()).not.toContainText("' OR '1'='1");
    await expect(homePage.getResultText()).not.toContainText("DROP TABLE");
  });

  test("3.UI reject oversized malicious-looking payload on submit", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const oversizedPayload = `2020/01/01${"A".repeat(10000)}`;

    // User Actions
    await homePage.fillDateOfBirth(oversizedPayload);
    await homePage.clickSubmit();

    // Assertion: Should show validation error and not reflect the oversized input
    await expect(homePage.getResultText()).toContainText(
      "Error: Please enter date in YYYY/MM/DD format",
    );
    await expect(homePage.getResultText()).not.toContainText("A".repeat(10));
  });
});
