import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

/**
 * @description Error journey test suite for the Age Calculator.
 * Verifies that invalid, empty, and malformed date inputs are gracefully rejected
 * with the appropriate error messages, and that the page loads without console errors.
 */
test.describe('Error Journey', { tag: '@error-journey' }, () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.getPageHeader()).toHaveText('Birthdate Age Calculator');
    await expect(homePage.getDateInput()).toBeEmpty();
  });


  test('1.UI returns error message: Please enter date in YYYY/MM/DD format - for invalid date format input', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // User Actions
    await homePage.fillDateOfBirth('01/01/2000');
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Please enter date in YYYY/MM/DD format');
  });

  test('2.UI returns error message: Please enter date in YYYY/MM/DD format - for Non-Date input', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // User Actions
    await homePage.fillDateOfBirth('some text');
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Please enter date in YYYY/MM/DD format');
  });

    test('3.UI returns error message: Please enter date in YYYY/MM/DD format - for Empty Date input', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // User Actions
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Please enter date in YYYY/MM/DD format');
  });


  test('4.UI returns error message: Invalid date - for Invalid Date: 0000/00/00', async ({ page }) => {
    const homePage = new HomePage(page);
    // User Actions
    await homePage.fillDateOfBirth('0000/00/00');
    await homePage.clickSubmit();
    
    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Invalid date');
  });

  test('5.Verify No console errors on page load', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Listen for console messages and fail the test if any are error messages appear
    page.on('console', message => {
      if (message.type() === 'error') {
        throw new Error(`Console error: ${message.text()}`);
      }
    });

    await homePage.visit();
    });
});