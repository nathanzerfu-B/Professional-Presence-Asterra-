# Professional Presence — Asterra Manufacturing Group

Corporate digital presence web platform engineered with TypeScript, React, Vite, and an automated end-to-end browser test suite built with Playwright.

---

## Overview

This repository implements **Package 3 (Professional Presence)** for Asterra Manufacturing Group S.C., a diversified heavy manufacturing conglomerate. The application provides an enterprise corporate portal featuring four manufacturing division consoles, project case studies with technical telemetry, career opportunity listings, an executive leadership directory, and an interactive corporate inquiry dispatch system.

---

## Technology

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS & Custom Design System Tokens
- **Routing**: React Router DOM v6
- **Test Automation**: Playwright (Browser Automation & E2E Testing)
- **Unit & Component Testing**: Vitest
- **Icons**: Lucide React

---

## Testing

The application features comprehensive automated testing with an emphasis on reliable end-to-end user workflows:

### 1. Playwright Browser Automation (Page Object Model)
The end-to-end suite is architected using the **Page Object Model (POM)** pattern to ensure test modularity, maintainability, and clean separation of concerns.

- **Currently verified: 16 automated tests** across 5 spec suites:
  - `tests/e2e/specs/navigation.spec.ts`: Validates responsive site navigation, header shrink-on-scroll physics, active link states, and mobile hamburger drawer transitions.
  - `tests/e2e/specs/corporate-inquiry.spec.ts`: Tests corporate RFP inquiry form validation, required field guards, category routing, and successful dispatch confirmation.
  - `tests/e2e/specs/directory-filters.spec.ts`: Verifies real-time multi-attribute filtering, search queries, and empty-state displays across the corporate directory.
  - `tests/e2e/specs/division-console.spec.ts`: Tests division switching tabs, specification tables, and technical telemetry rendering.
  - `tests/e2e/specs/case-studies.spec.ts`: Validates case study modal dialogs, metric badges, and client detail navigation.

- **Page Object Models**:
  - `CorporateInquiry.pom.ts`: Encapsulates inquiry form inputs, division selection, and submission assertions.
  - `DirectoryFilters.pom.ts`: Abstracts search bar inputs, dropdown filters, and result count verifications.
  - `DivisionConsole.pom.ts`: Controls division tab switching and specification verification.
  - `ProjectCaseStudy.pom.ts`: Manages project card interactions and detail assertions.
  - `SiteNavigation.pom.ts`: Drives navigation links across desktop and mobile viewports.

### 2. Component & Unit Testing (Vitest)
- Validates data model transformations, filtering logic, and isolated UI component rendering.

---

## My Contribution

- **Role**: Frontend & QA Automation Contributor.
- **Contributions**:
  - Architected and implemented the automated **Playwright E2E test suite** using the Page Object Model (POM) pattern in TypeScript.
  - Authored test specifications covering core user journeys: corporate inquiries, division navigation, and directory search filtering.
  - Implemented responsive UI components and verified layout integrity across mobile, tablet, and desktop viewports.

---

## Architecture

The project follows a modular, feature-oriented structure with clear separation between application logic and test automation:

```
Professional-Presence-Asterra-/
├── e2e/                             # Playwright test automation
│   ├── models/                      # Page Object Model (POM) classes
│   │   ├── CorporateInquiry.pom.ts
│   │   ├── DirectoryFilters.pom.ts
│   │   ├── DivisionConsole.pom.ts
│   │   ├── ProjectCaseStudy.pom.ts
│   │   └── SiteNavigation.pom.ts
│   └── specs/                       # Automated test suites
│       ├── case-studies.spec.ts
│       ├── corporate-inquiry.spec.ts
│       ├── directory-filters.spec.ts
│       ├── division-console.spec.ts
│       └── navigation.spec.ts
├── src/                             # Application source code
│   ├── components/                  # Reusable UI components & navigation
│   ├── data/                        # Structured corporate data models
│   ├── pages/                       # Route pages (Home, Divisions, Projects, Contact)
│   ├── App.tsx                      # Root router configuration
│   └── main.tsx                     # Entry point
├── playwright.config.ts             # Playwright test runner configuration
├── vite.config.ts                   # Vite build configuration
└── package.json
```

---

## Setup & Running Locally

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

### 1. Installation
```bash
git clone https://github.com/nathanzerfu-B/Professional-Presence-Asterra-.git
cd Professional-Presence-Asterra-
npm install
```

### 2. Run Application Locally
```bash
npm run dev
```
The application will start on `http://localhost:5173`.

### 3. Run Automated Tests
```bash
# Run Vitest component tests
npm run test

# Run Playwright automated browser tests
npx playwright test

# Run Playwright tests with UI Mode
npx playwright test --ui

# View Playwright HTML test report
npx playwright show-report
```
