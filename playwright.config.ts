import { defineConfig, devices } from '@playwright/test';
import { release } from 'os';

export default defineConfig({
  testDir: './tests',
  //grep:/refactor/,
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    testIdAttribute:'data-testid'
  },
  projects: (() => {
    const projects = [
      {
        name: 'api-tests',
        testDir: './tests/api-tests',
        use: {
          baseURL: 'http://localhost:3000',
          extraHTTPHeaders:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      },
      { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
      { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    ];
    // WebKit isn't supported on macOS 13 (Darwin 22.x) in some Playwright versions
    if (!(process.platform === 'darwin' && release().startsWith('22'))) {
      projects.push({ name: 'webkit', use: { ...devices['Desktop Safari'] } });
    }
    return projects;
  })(),
});
