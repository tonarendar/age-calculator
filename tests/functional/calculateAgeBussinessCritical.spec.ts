import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
  

// Helper to format date
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

test.describe('Happy Path scenario', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.getPageHeader()).toHaveText('Birthdate Age Calculator');
    await expect(homePage.getDateInput()).toBeEmpty();
  });

  test('UI displays birthdate placeholder as YYYY/MM/DD', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    await expect(homePage.getDateInput()).toHaveAttribute('placeholder', 'YYYY/MM/DD');
  });

  test('UI displays valid Age, for valid Date: input', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to 18 years ago from today to make the test resilient to time changes
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 18);
    const userDOB = formatDate(pastDate);
    const expectedAge = '18';
    console.log("User DOB:", userDOB);
    
    
    // User Actions
    await homePage.fillDateOfBirth(userDOB);
    await homePage.clickSubmit();
    // Assertions
    await expect(homePage.getDateInput()).toHaveValue(userDOB);
    await expect(homePage.getResultText()).toContainText(`You are ${expectedAge} years old.`);
  });

  test('UI displays Custom message(You are not born yet!) - for Future Date', {tag: '@happy-path'}, async ({ page }) => {
    const homePage = new HomePage(page);
    
    // setting the date to tomorrow's date to trigger the "You are not born yet!" message
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Set to tomorrow's date
    
    // User Actions
    await homePage.fillDateOfBirth(formatDate(futureDate));
    await homePage.clickSubmit();

    // Assertions
    await expect(homePage.getResultText()).toContainText("You are not born yet!");
  });

  test('UI displays Custom message(Are you sure..) - for Current Date', {tag: '@happy-path'}, async ({ page }) => {
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

  test('UI displays Custom message(Wow! you are over 100 - for age greater than 100)', {tag: '@happy-path'}, async ({ page }) => {
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

    test('UI displays Age - for leap year Date: 2024/02/29', {tag: '@happy-path'},async ({ page }) => {
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