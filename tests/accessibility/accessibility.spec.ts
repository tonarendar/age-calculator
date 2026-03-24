import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { HomePage } from '../functional/pages/HomePage';

test.describe('Accessibility checks', () => {
  test('homepage should have no critical or serious accessibility violations', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const severeViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious',
    );

    expect(severeViolations).toEqual([]);
  });

  test('error state should have no critical or serious accessibility violations', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await homePage.fillDateOfBirth('03/20/90');
    await homePage.clickSubmit();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const severeViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.impact === 'critical' || violation.impact === 'serious',
    );

    expect(severeViolations).toEqual([]);
  });
});