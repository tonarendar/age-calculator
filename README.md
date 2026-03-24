# Age Calculator - Project

This repository contains an Age Calculator web app and an end-to-end/API/unit test suite built with TypeScript, Playwright, and Jest.

## Setup
**Pre-Requsite dependencies**

1. Install nvm for mac/windows using below instruction 
https://www.nvmnode.com/guide/installation.html

2. Clone the git repository
```bash
git clone https://github.com/tonarendar/age-calculator.git
cd age-calculator
```

3. Install node using nvm
```bash
nvm install
nvm use
```

4. Verfy node version = v24.x.x
```bash
node -v
```

5. Install Project dependencies - (NOTE:This will take a while to successfully complete the package installation)

```bash
npm install
npx playwright install
```

6. Build and Start Application**
```bash
npm run build
npm run start
```
Application will be hosted on http://localhost:3000 

7. To execute varoius Test Types
## Execute Unit Test
```bash
npm run test:unit
```
## Execute Functional Test
```bash
npm run test:functional
```
## Execute Visual Test
```bash
npm run test:visual
```
## Execute Accessibility Test
```bash
npm run test:accessibility
```

## Project Structure

```text
age-calculator/
├── jest.config.cjs                  # Jest configuration for unit test execution
├── package.json                     # Project metadata, dependencies, and npm scripts
├── playwright.config.ts             # Playwright projects, reporters, and runtime config
├── pomREADME.md                     # Notes/documentation for Page Object Model approach
├── README.md                        # Main project documentation and usage guide
├── tsconfig.jest.json               # TypeScript compiler settings specific to Jest tests
├── tsconfig.json                    # Base TypeScript compiler configuration
├── public/
│   ├── index.html                   # Static HTML entry page for the app
│   └── index.js                     # Client-side script used by the web UI
├── src/
│   ├── app.ts                       # Application entry/server bootstrap logic
│   └── utils/
│       ├── ageCalculator.ts         # Core age calculation business logic
│       └── validator.ts             # Input validation helpers for dates/requests
├── tests/
│   ├── api-tests/
│   │   └── api.spec.ts              # API endpoint validation and response assertions
│   ├── functional/
│   │   ├── calculateAgeBussinessCritical.spec.ts # Business-critical age paths
│   │   ├── calculateAgeErrorJourney.spec.ts      # Error-state and negative journey tests
│   │   ├── device.spec.ts                        # Device/viewport behavior checks
│   │   └── pages/
│   │       ├── HomePage.ts           # Page Object Model for home page interactions
│   │       └── LoginPage.ts          # Page Object Model for login page interactions
│   ├── unit/
│   │   ├── ageCalculator.test.ts     # Unit tests for age calculation utilities
│   │   └── validator.test.ts         # Unit tests for input validator utilities
│   └── visual/
│       ├── visualTest.spec.ts        # Visual regression test definitions
│       └── visualTest.spec.ts-snapshots/ # Baseline snapshots for visual comparisons
├── playwright-report/
│   ├── index.html                    # Generated Playwright HTML report entry point
│   └── data/                         # Report assets/data consumed by the HTML report
├── test-results/
│   └── a11y-Accessibility-checks--fb08c-us-accessibility-violations-chromium/ # Stored artifacts for a specific failed/past run
```

## Extensions
TODO: 
