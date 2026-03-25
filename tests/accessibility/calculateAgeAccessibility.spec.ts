import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { HomePage } from "../functional/pages/HomePage";

/**
 * @description Accessibility test suite for the Age Calculator.
 * Runs automated axe-core scans against WCAG 2.0 Level A/AA rules to ensure
 * no critical or serious violations are present on the home page in both its
 * default state and after an invalid-input error state is triggered.
 */
test.describe("Accessibility checks", () => {
  test("homepage should have no critical or serious accessibility violations", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    // Run axe-core accessibility scan with WCAG 2.0 A and AA rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // Filter violations to only include critical and serious issues
    const severeViolations = accessibilityScanResults.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );

    expect(severeViolations).toEqual([]);
  });

  test("error state should have no critical or serious accessibility violations", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await homePage.fillDateOfBirth("03/20/90");
    await homePage.clickSubmit();

    // Run axe-core accessibility scan with WCAG 2.0 A and AA rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    // Filter violations to only include critical and serious issues
    const severeViolations = accessibilityScanResults.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );

    expect(severeViolations).toEqual([]);
  });
});
