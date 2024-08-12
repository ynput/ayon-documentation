---
id: server_testing
title: Testing AYON Server
sidebar_label: Testing
---

# Frontend E2E tests

:::note Work In Progress
Frontend E2E testing strategy is still under debate, current tests and their implementation details may change significantly in the near future.
:::

## Introduction
End-to-end testing is a crucial part of the software development lifecycle, ensuring applications work as expected. We've embarked on the process of implementing E2E tests for AYON Server, our ultimate goal being the complete test coverage and consistent positive results across the multiple supported browsers.

## Setting up and running tests
For the frontend E2E tests we're using [Playwright](https://playwright.dev) which proves to be useful and easy to use toolset for developers and even less technical users. In order to run tests locally you will need to install playwright and follow the installation instructions (defaults are safe choices):
```
yarn create playwright
```

You'll also need to update your local ENV file by adding the following required variables (URLS & ports may vary for each setup):
```
LOCAL_SERVER_URL=http://localhost:3000
TEST_SERVER_URL=https://localhost:5000
NAME=admin #authentication user
PASSWORD=pass #authentication password
```

Once installed you can run the existing tests either using the console - ```yarn test``` - or the test UI if you prefer so - ```yarn test-ui```

## How to add new tests
In order to add new tests of update existing ones we recommend following the existing files structure found in the ```tests``` folder.

### Spec files
Tests are grouped by entity type, i.e. project level tests are written in the projects.spec.js, folders level tests in the folders.spec.js file and so on.

### Fixture files
Most tests will need parent entities to be created - i.e. a folder can't exist outside a project. To ease test creation, we're using *fixtures* helpers. These allow you to easily create and destroy required entities with one-line calls, so you can focus on the task at hand.


### Test Isolation
Current configuration runs the tests in parallel, which might cause issues if specs are not properly written. In order to avoid any race issues, we recommend to follow a safe entity naming strategy, i.e. prefix entity names with unique identifiers (see existing tests for examples).

### Tests cleanup
Testing entities that depend on others will require the creation of parent entities. Make sure that they are properly destroyed after testing is done to avoid pollution of future test runs. For example, when testing folders or tasks, the easiest cleanup method would be to delete the parent project, which will, in turn, delete all the related records.

## Generate tests on the fly
As mentioned previously We chose [Playwright](https://playwright.dev) for its versatility and ease of use.

One powerful tool that comes with it is code generation mode, which can translate a point and click interaction to actual spec statements, be it selecting specific UI elements, or making assertions.

In order to use the code generation tool run ```yarn test-codegen``` which will run playwright in codegeneration mode. Once started, just interact with the embedded browser window while keeping an eye on the secondary window. All interactions will be recorded in the secondary window, you can quickly generate the basis of your test, which can be then copied over to the actual spec file - see the example below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/O-uS5wKKB30?si=9ikavCUIMXzhNmjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>