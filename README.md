# Age Calculator - Project

This repository contains an Age Calculator web app with unit/e2e/API/ test suite built with TypeScript, Playwright, and Jest.

The web app accepts a data input YYYY/MM/DD,returns corresponding age with custom message.

<img width="444" height="458" alt="image" src="https://github.com/user-attachments/assets/f5e61fcc-dd25-408a-bc36-7ecba471c735" />

**Pre-Requsite dependencies**
1. Install nvm for mac/windows using instruction 
https://www.nvmnode.com/guide/installation.html

## Project Setup

2. Clone the git repository OR Download the zip and cd into the project folder
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

6. Build and Start Application
```bash
npm run build
npm run start
```
Application will be hosted on http://localhost:3000 

7. To execute varoius Test Types:
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
## Run Code Quality
```bash
npm run lint
```

## Project Structure

```text
age-calculator/
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
│   │   ├── calculateAgeBussinessCritical.spec.ts # Tests covering Business-critical and positive user journey
│   │   ├── calculateAgeErrorJourney.spec.ts      # Tests covering Error-state and negative journey
│   │   ├── homePageSecurity.spec.ts              # Tests covering security scenarios and vulnerability validation
│   │   └── pages/
│   │       ├── HomePage.ts           # Page Object Model for home page interactions
│   ├── unit/
│   │   ├── ageCalculator.test.ts     # Unit tests for age calculation utilities
│   │   └── validator.test.ts         # Unit tests for input validator utilities
│   └── visual/
│       ├── visualTest.spec.ts            # Visual regression test definitions
│       └── visualTest.spec.ts-snapshots/ # Baseline snapshots for visual comparisons
├── jest.config.cjs                  # Jest configuration for unit test execution
├── package.json                     # Project metadata, dependencies, and npm scripts
├── playwright.config.ts             # Playwright projects, reporters, and runtime config
├── README.md                        # Main project documentation and usage guide
├── tsconfig.jest.json               # TypeScript compiler settings specific to Jest tests
├── tsconfig.json                    # Base TypeScript compiler configuration
```

## Extensions
TODO: 
