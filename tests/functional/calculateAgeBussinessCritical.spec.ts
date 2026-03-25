import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
  

/**
 * Formats a Date object into a string using the `YYYY/MM/DD` format
 * expected by the Age Calculator UI and API.
 *
 * @param date - The Date object to format.
 * @returns A string in `YYYY/MM/DD` format.
 */
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

/**
 * @description Happy path test suite for the Age Calculator.
 * Covers business-critical scenarios including standard age display, birthday messages,
 * future/past edge cases, leap year handling.
 */
test.describe('Happy Path scenario', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.getPageHeader()).toHaveText('Birthdate Age Calculator');
    await expect(homePage.getDateInput()).toBeEmpty();
  });

  test('1.UI should display birthdate placeholder as YYYY/MM/DD', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getDateInput()).toHaveAttribute('placeholder', 'YYYY/MM/DD');
  });

  test('2.UI should display valid Age for valid Date input', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to 18 years ago from today to make the test resilient to time changes
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 18);
    const expectedAge = '18';    
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(pastDate));
    await homePage.clickSubmit();
    // Assertions
    await expect(homePage.getDateInput()).toHaveValue(formatDate(pastDate));
    await expect(homePage.getResultText()).toContainText(`You are ${expectedAge} years old.`);
  });

  test('3.UI should display age and custom message for users mm/dd matching current date', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to 25 years ago having current month and day from today to make the test resilient to time changes
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 25);
    const expectedAge = '25';
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(pastDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText(`You are ${expectedAge} years old. Happy Birthday!`);
  });

    test('4.UI should display custom message for users date one day before current date', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to 25 years ago having current month and day from today to make the test resilient to time changes
    const oneDayPastDate = new Date();
    oneDayPastDate.setDate(oneDayPastDate.getDate() - 1);
    const expectedAge = '0';
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(oneDayPastDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText(`You are ${expectedAge} years old.`);
  });

  test('5.UI should display custom message (You are not born yet!) for future date', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to tomorrow's dates
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Set to tomorrow's date
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(futureDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText("You are not born yet!");
  });

  test('6.UI should display custom message (Are you sure you are born..) for current date', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Set the date to today's date to trigger the "Are you sure.." message
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(currentDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Are you sure you are born today?');
  });

  test('7.UI should display custom message (Wow! you are over 100) for age greater than 100', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to 101 years ago from today to trigger the "WOW you are over 100!" message
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 101);
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(pastDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('Wow! You are over 100!');
    });

  test('8.UI should display custom message for age equal to 100', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);

    // setting the date to 100 years ago from today to trigger the exact 100 message
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 100);

    // User Actions
    await homePage.fillDateOfBirth(formatDate(pastDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText('You are 100 years old. Congratulations!');
  });

    test('9.UI should display valid Age - for leap year Date: 2024/02/29', {tag: '@happy-path'},async ({ page }) => {
      const homePage = new HomePage(page);
      
      // setting the date to 2024/02/29 to verify leap year handling
      const leapYearDate = new Date('2024/02/29'); 
      const expectedAge = new Date().getFullYear() - 2024; // Calculate expected age based on current year
      
      // User Actions
      await homePage.fillDateOfBirth(formatDate(leapYearDate));
      await homePage.clickSubmit();

      // Assertions
      await expect(homePage.getResultText()).toContainText(`You are ${expectedAge} years old.`);
    });

});