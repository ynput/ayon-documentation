---
id: dev_testing
title: Testing in AYON
sidebar_label: Testing
---

## Introduction

As AYON is growing there also grows need for automatic testing. AYON Server API has its own test suite - [github.com/ynput/ayon-tests](https://github.com/ynput/ayon-tests). For AYON Desktop there are already bunch of tests present in test folder of AYON directory. Apart of unit testing there are also integration tests that mimics real production usage and are able to test whole workflows.

:::note Tests are Work In Progress
We are now in heavy effort to add more integration tests and
enhance the whole experience of writing and executing tests.
:::

### Integration tests

:::warning Integration tests and OpenPype mode
Integration tests currently work only in **OpenPype** mode (MongoDB),
not with **AYON** server.
:::

#### Requirements

Tests are recreating fresh DB for each run, so **mongorestore**, **mongodump** and **mongoimport** command line tools must be installed and in `PATH`.

You can find installers here: <https://www.mongodb.com/docs/database-tools/installation/installation/>

You could check that **mongorestore** is available by running this in shell, it shouldn't fail and you should see version of the utility:

```shell
mongorestore --version
```

If you would like just to experiment with provided integration tests, and have particular DCC installed on your machine, you could run test for this host by:

```shell
 ./.poetry/bin/poetry run python start.py runtests ./tests/integration/hosts/nuke
```

You can modify tests path argument to limit which tests should be run (otherwise `./tests/integration` will run all implemented integration tests).

**runtests** command accepts following arguments:

- `-m <TEXT>` / `--mark <TEXT>`: run tests [marked](https://docs.pytest.org/en/7.1.x/how-to/mark.html) by `<TEXT>`
- `-p <TEXT>` / `--pyargs <TEXT>`: You can use the `--pyargs` option to make test try interpreting arguments as python package names, deriving their file system path and then running the test.
- `--test_data_folder <PATH>`: Unzipped directory path of a test file.
- `-s` / `--persist`: Persist the test database and published files after testing.
- `-a <TEXT>` / `--app_variant <TEXT>`: Specific application (host) variant to be used in tests, like `maya-2024`.
- `--timeout <SECS>`: Timeout value in seconds for tests.
- `-so` / `--setup_only`: Only create database, do not run tests.


Integration tests are setup to start DCC application with prepared work file, run publish process and compare results in database and file system automatically.
This approach is implemented as it should work in any DCC application and should cover most common use cases. Not all hosts allow "real headless" publishing, but all hosts should allow to trigger publishing process programmatically when UI of the host is actually running.

There will be eventually possibility to build work file and publish it programmatically, this would work only in DCCs that support it (Maya, Nuke, Houdini, ...).

It is expected that each test class should work with single work file with supporting resources (as a dump of project DB, all necessary environment variables, expected published files etc.)

There are currently implemented basic publish tests for `Maya`, `Nuke`, `AfterEffects` and `Photoshop`. Additional hosts will be added.

Each `test_` class should contain single test class based on `tests.lib.testing_classes.PublishTest`. This base class handles all necessary functionality for testing in a host application.

#### Publishing tests

Each publishing test consists of following phases:

- preparation
- launch of host application (DCC)
- publish
- comparison of results in DB and file system
- cleanup

##### Preparation

Each publish test case expects zip file with this structure:

- `expected` - published files after work file is published (in same structure as in regular manual publish)
- `input`
  - `dumps` - database dumps (check `tests.lib.db_handler` for implemented functionality)
  - `openpype` - settings
  - `test_db` - skeleton of test project (contains project document, asset document etc.)
  - `env_vars` - `env_var.json` file with a dictionary of all required environment variables
  - `json` - json files with human readable content of databases
  - `startup` - any required initialization scripts (for example Nuke requires one `init.py` file)
  - `workfile` - contains single work file
  
These folders needs to be zipped as zip root. Currently zip files for all prepared tests are stored in AYON GDrive folder.

Each test then goes in steps (by default):

- download test data zip
- create temporary folder and unzip there data zip file
- purge test DB if exists, import dump files from unzipped folder
- sets environment variables from `env_vars` folder
- launches host application and trigger publish process
- waits until publish process finishes, application closes (or timeouts)
- compares results in DB with expected values
- compares published files structure with expected values
- cleans up temporary test DB and folder

##### Launch of application and publish

Integration tests are using same approach as AYON Desktop process regarding launching of host applications (eg. `ApplicationManager().launch`).
Each host application is in charge of triggering of publish process and closing itself. Different hosts handle this differently, Adobe products are handling this via injected "HEADLESS_PUBLISH" environment variable,
Maya and Nuke must contain this in theirs startup files.

Base `PublishTest` class contains configurable timeout in case of publish process is not working, or taking too long.

##### Comparison of results

Each test class requires re-implemented `PublishTest.test_db_asserts` fixture. This method is triggered after publish is finished and should compare current results in DB (each test has its own database which gets filled with dump data first, cleaned up after test finishing) with expected results.

`tests.lib.assert_classes.py` contains prepared method `count_of_types` which makes easier to write assert expression. This method also produces formatted error message.

**Basic use case:**

```python
DBAssert.count_of_types(dbcon, "version", 2)
```

It is expected that DB contains only 2 documents of `type==version`

If zip file contains file structure in `expected` folder, `PublishTest.test_folder_structure_same` implements comparison of expected and published file structure,
eg. if test case published all expected files.

##### Cleanup

By default, each test case pulls data from GDrive, unzips them in temporary folder, runs publish, compares results and then
purges created temporary test database and temporary folder. This could be changed by setting of `PublishTest.PERSIST`. If set to True, DB and published folder are kept intact
until next run of any test.

In case you want to modify test data, use `PublishTest.TEST_DATA_FOLDER` to point test to specific location where test folder is already unzipped.

Both options are mostly useful for debugging during implementation of new test cases.

### Unit tests

Unit tests are in `./tests/unit` folder. THere should be located unit tests for classes, methods of AYON etc. As most classes expect to be triggered in AYON context, best option is to
start these tests in similar fashion as `integration` tests (eg. via `runtests`).

## Content of tests folder

Main tests folder contains hierarchy of folders with tests and supporting lib files. It is intended that tests in each folder of the hierarchy could be run separately.

Main folders in the structure:

- `integration` - end to end tests in host applications, mimicking regular publishing process
- `lib` - helper classes
- `resources` - test data skeletons etc.
- `unit` - unit test covering methods and functions in OP

### `lib` folder

This location should contain library of helpers and miscellaneous classes used for integration or unit tests.

**Content:**

- `assert_classes.py` - helpers for easier use of assert expressions
- `db_handler.py` - class for creation of DB dumps/restore/purge
- `file_hanlder.py` - class for preparation/cleanup of test data
- `testing_classes.py` - base classes for testing of publish in various DCCs

### `integration` folder

There are host specific test in `hosts` sub-folder.