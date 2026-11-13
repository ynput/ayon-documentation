---
title: AYON frontend end-to-end tests
sidebar_label: Frontend E2E tests
description: "Playwright tests of the AYON web app (ayon-frontend): the unit and chromium projects, configuring the test server and admin user, running all tests or one spec, where specs and page objects live, the shared @ynput/ayon-e2e package, and recording steps with the code generator."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/package.json
  - https://github.com/ynput/ayon-frontend/blob/develop/playwright.config.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/tests/AGENTS.md
  - https://github.com/ynput/ayon-frontend/blob/develop/e2e/AGENTS.md
---

The frontend is tested with [Playwright](https://playwright.dev). It is already set up in `playwright.config.ts`.

| Project | Folder | What it tests |
| --- | --- | --- |
| `unit` | `tests/unit` | Pure logic. No browser, no server. |
| `chromium` | `tests/e2e` | The app against a real AYON server, signed in as an admin. |

:::caution Test data
The e2e tests write to the server. Use a server that can be filled with test data, for example a local docker server.
:::

## Configuration

The test settings go in `.env.test.local` in the repository root (gitignored):

```shell
TEST_BACKEND_URL=http://localhost:5000
TEST_USER_NAME=admin
TEST_USER_PASSWORD=...
```

- The user must be an admin. Without these values, `NAME` and `PASSWORD` from `.env.local` are used.
- Playwright builds the frontend and serves it on port 3100, proxied to `TEST_BACKEND_URL`.
- `TEST_SERVER_URL` points the tests at an already running frontend. Nothing is built or started then.

## Running

| Script | What it does |
| --- | --- |
| `yarn test` | All tests. |
| `yarn test:unit` | Unit tests only. |
| `yarn test:e2e` | E2e tests only (`chromium` project). |
| `yarn test-ui` | Playwright UI mode. |
| `yarn test-report` | Opens the last HTML report. |
| `yarn test-codegen` | Playwright code generator on `http://localhost:3100`, signed in with the saved admin session. |

By default tests run on 2 workers and retry once (twice on CI). A test that passes on retry is reported as flaky.

One area or spec, without retries and with one worker:

```shell
npx playwright test --project=chromium --no-deps --workers=1 --retries=0 tests/e2e/<area>
```

`--no-deps` skips the sign-in setup. It works once `playwright/.auth/admin.json` exists from an earlier run.

## Writing tests

- Specs are TypeScript files in `tests/e2e/<area>/`, named `*.spec.ts`.
- Locators and multi-step flows go into page objects in `tests/e2e/pages/`.
- Fixtures, the REST client and UI helpers come from the `@ynput/ayon-e2e` package in `e2e/`. Addon test suites use the same package.
- Each test gets its own project from the `projectName` fixture. Setup goes through the API, the tested behaviour through the UI.
- Names come from `uniqueName()`, so parallel tests and runs do not collide. The global teardown removes leftovers of a run.

`yarn test-codegen` records clicks and typing as Playwright code. The recorded steps are a starting point for a spec, then moved into page objects.

## Rules and gotchas

The full rules are kept next to the code:

- [tests/AGENTS.md](https://github.com/ynput/ayon-frontend/blob/develop/tests/AGENTS.md): when to add a test, what lives where, gotchas of the frontend suite.
- [e2e/AGENTS.md](https://github.com/ynput/ayon-frontend/blob/develop/e2e/AGENTS.md): the `@ynput/ayon-e2e` package, its fixtures and helpers, the servers Playwright starts, and the rules every suite follows.
