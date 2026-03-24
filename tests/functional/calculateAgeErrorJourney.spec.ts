import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
  

// Helper to format date
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

test.describe('Error Journey', { tags: '@error-journey' }, () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.getPageHeader()).toHaveText('Birthdate Age Calculator');
    await expect(homePage.getDateInput()).toBeEmpty();
  });


  test('UI returns error message: Please enter date in YYYY/MM/DD format - for invalid date format input', { tags: '@error-journey' }, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // User Actions
    await homePage.fillDateOfBirth('01/01/2000');
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Please enter date in YYYY/MM/DD format');
  });

  test('UI returns error message: Please enter date in YYYY/MM/DD format - for Non-Date input', { tags: '@error-journey' }, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // User Actions
    await homePage.fillDateOfBirth('some text');
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Please enter date in YYYY/MM/DD format');
  });

    test('UI returns error message: Please enter date in YYYY/MM/DD format - for Empty Date input', { tags: '@error-journey' }, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // User Actions
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Please enter date in YYYY/MM/DD format');
  });


  test('UI returns error message: Invalid date - for Invalid Date: 0000/00/00', { tags: '@error-journey' }, async ({ page }) => {
    const homePage = new HomePage(page);
    // User Actions
    await homePage.fillDateOfBirth('0000/00/00');
    await homePage.clickSubmit();
    
    // Assertions
    await expect(homePage.getResultText()).toContainText('Error: Invalid date');
  });

  test('Verify No console errors on page load', async ({ page }) => {
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