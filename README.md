# Age Calculator - Project

This repository contains an Age Calculator web app with unit, functional, visual, accessibility, and API test suites built with TypeScript, Playwright, and Jest.

The web app accepts a date input in `YYYY/MM/DD` format and returns the corresponding age with custom messages.

<img width="444" height="458" alt="image" src="https://github.com/user-attachments/assets/f5e61fcc-dd25-408a-bc36-7ecba471c735" />

**Prerequisite dependencies**
- Install nvm for macOS/Windows using the instructions below:
https://www.nvmnode.com/guide/installation.html
- Verify nvm installation is successful. It should return an nvm version (for example, `0.39.*`):
```bash
nvm -v
``` 

## Project Setup

1. Clone the Git repository (or download the zip) and change into the project folder:
```bash
git clone https://github.com/tonarendar/age-calculator.git
cd age-calculator
```

2. Install node using nvm:
```bash
nvm install
nvm use
```

3. Verify node version = v24.x.x:
```bash
node -v
```

4. Install project dependencies (this may take a while):

```bash
npm install
npx playwright install
```

5. Build and start the application:
```bash
npm run build
npm run start
```
The application will be hosted at http://localhost:3000.

6. Execute tests and code quality checks:
## Execute Unit Tests
```bash
npm run test:unit
```
## Execute Functional Tests
```bash
npm run test:functional
```
## Execute Visual Tests
```bash
npm run test:visual
```
## Execute Accessibility Tests
```bash
npm run test:accessibility
```
## Run Code Quality Checks
```bash
npm run lint
npm run typecheck
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
│   │   └── calculateAgeApi.spec.ts              # API endpoint validation and response assertions
│   ├── accessibility/
│   │   └── calculateAgeAccessibility.spec.ts    # Accessibility checks for critical/serious violations
│   ├── functional/
│   │   ├── calculateAgeBussinessCritical.spec.ts # Tests covering Business-critical and positive user journey
│   │   ├── calculateAgeErrorJourney.spec.ts      # Tests covering error-state and negative journeys
│   │   ├── homePageSecurity.spec.ts               # Tests covering security scenarios and vulnerability validation
│   │   └── pages/
│   │       ├── HomePage.ts           # Page Object Model for home page interactions
│   ├── unit/
│   │   ├── ageCalculator.test.ts     # Unit tests for age calculation utilities
│   │   └── validator.test.ts         # Unit tests for input validator utilities
│   └── visual/
│       ├── calculateAgeVisualTest.spec.ts            # Visual regression test definitions
│       └── calculateAgeVisualTest.spec.ts-snapshots/ # Baseline snapshots for visual comparisons
├── jest.config.cjs                  # Jest configuration for unit test execution
├── package.json                     # Project metadata, dependencies, and npm scripts
├── playwright.config.ts             # Playwright projects, reporters, and runtime config
├── README.md                        # Main project documentation and usage guide
├── tsconfig.jest.json               # TypeScript compiler settings specific to Jest tests
├── tsconfig.json                    # Base TypeScript compiler configuration
```

## Extensions
TODO: 
