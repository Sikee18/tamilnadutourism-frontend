# Testing Guide

This document provides a comprehensive guide to testing the Tourism application. Currently, the testing infrastructure is primarily set up for the Backend Server (NestJS).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Testing (Server)](#backend-testing-server)
    - [Unit Tests](#unit-tests)
    - [E2E Tests](#e2e-tests)
    - [Test Coverage](#test-coverage)
    - [Debugging Tests](#debugging-tests)
- [Frontend & Mobile Testing (Future)](#frontend--mobile-testing-future)
- [Best Practices](#best-practices)

## Prerequisites

Ensure you have the following installed:
-   **Node.js** (v18 or later recommended)
-   **npm** (comes with Node.js)

## Backend Testing (Server)

The backend is built with **NestJS** and uses **Jest** as the testing framework.

### Project Structure

-   **Unit Tests**: Located alongside the source files with the `.spec.ts` extension (e.g., `src/app.controller.spec.ts`). These tests isolate individual components (Services, Controllers).
-   **E2E Tests**: Located in the `test/` directory (e.g., `test/app.e2e-spec.ts`). These tests verify the application works as a whole, interacting with the database and other services.

### Unit Tests

Unit tests are used to test individual classes or functions in isolation. Mocks are commonly used to replace dependencies.

**Run all unit tests:**
```bash
cd server
npm run test
```

**Run unit tests in watch mode (for development):**
```bash
cd server
npm run test:watch
```

**Example Unit Test Structure (`src/example.spec.ts`):**
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleService } from './example.service';

describe('ExampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleService],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
```

### E2E Tests

End-to-End (E2E) tests cover the interaction between modules and external systems (like the database). They use `supertest` to simulate HTTP requests.

**Run E2E tests:**
```bash
cd server
npm run test:e2e
```

**Note:** Ensure your local development database is running before executing E2E tests, or configure a separate test database environment.

### Test Coverage

To generate a coverage report to see which parts of your code are tested:

```bash
cd server
npm run test:cov
```

The report will be generated in the `server/coverage` directory.

### Debugging Tests

To debug tests using the Node.js inspector:

```bash
cd server
npm run test:debug
```

## Frontend & Mobile Testing (Future)

The client applications are structured as `client-web` and `client-mobile`. Once development begins on these, the following frameworks are recommended:

### Client Web (React)
-   **Unit/Integration**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
-   **E2E**: [Playwright](https://playwright.dev/) or [Cypress](https://www.cypress.io/)

### Client Mobile (React Native)
-   **Unit**: [Jest](https://jestjs.io/) + [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
-   **E2E**: [Detox](https://wix.github.io/Detox/) or [Maestro](https://maestro.mobile.dev/)

## Best Practices

1.  **Test Pyramid**: Focus heavily on **Unit Tests** for business logic, followed by **Integration Tests**, and keep **E2E Tests** for critical user journeys (e.g., Authentication, Booking Flow).
2.  **Mocking**: In Unit Tests, mock all external dependencies (Database, Third-party APIs) to ensure tests are fast and deterministic.
3.  **CI/CD**: specific tests should be run automatically on every Pull Request to catch regressions early.
