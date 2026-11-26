---
title: Testing the AYON pipeline
sidebar_label: Pipeline testing
description: "Automated tests of the AYON pipeline code: unit tests of addons with pytest following the ayon-core pattern, the pytest-ayon plugin, integration tests that publish in an application with the ayon-pipeline-tests addon, and where the server tests are."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-core/blob/develop/pyproject.toml
  - https://github.com/ynput/ayon-core/blob/develop/tools/manage.sh
  - https://github.com/ynput/ayon-core/blob/develop/tools/manage.ps1
  - https://github.com/ynput/ayon-core/blob/develop/tests/conftest.py
  - https://github.com/ynput/ayon-core/blob/develop/.github/workflows/pr_unittests.yaml
  - https://github.com/ynput/ayon-core/blob/develop/AGENTS.md
  - https://github.com/ynput/pytest-ayon/blob/develop/pytest_ayon/plugin.py
  - https://github.com/ynput/pytest-ayon/blob/develop/pytest_ayon/addons.py
  - https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/addon.py
  - https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/tests/README.md
  - https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/tests/integration/README.md
  - https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/tests/lib/testing_classes.py
  - https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/tests/lib/db_handler.py
  - https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/tests/lib/assert_classes.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/system/dbimport.py
  - https://github.com/ynput/ayon-backend/blob/develop/Makefile
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Testing the AYON pipeline

The pipeline code has two kinds of automated tests:

| Kind | Where | Needs |
|---|---|---|
| [Unit tests](#addon-unit-tests) | `tests/` folder of an addon repository, for example ayon-core | Python and the dev environment of the repository; a running server only for tests marked `server` |
| [Integration tests](#integration-tests) | The [ayon-pipeline-tests](https://github.com/ynput/ayon-pipeline-tests) addon | A running server, the AYON launcher and the tested application |

The server has its own tests, see [Server tests](#server-tests).

## Addon unit tests

The layout and commands below are those of [ayon-core](https://github.com/ynput/ayon-core), the reference for unit tests in an addon repository. The commands run in a clone of ayon-core. Other addons can follow the same layout; a few, such as [ayon-deadline-cloud](https://github.com/ynput/ayon-deadline-cloud), have the same `run-tests` command in their `tools` scripts.

### Layout

- Tests are in `tests/` at the repository root. `tests/client/ayon_core/` mirrors the structure of `client/ayon_core/`.
- `tests/conftest.py` adds `client/` to `sys.path`, so `ayon_core` imports without installing the addon.
- Tests use [pytest](https://docs.pytest.org/). The test dependencies are the `test` extra in the root `pyproject.toml`.

### Run the tests

The `tools/manage.sh` script (Linux, macOS) and `tools/manage.ps1` script (Windows) create the environment with [uv](https://docs.astral.sh/uv/) and run the tests:

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
cd <ayon-core-repo-clone>
.\tools\manage.ps1 create-env
.\tools\manage.ps1 run-tests
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
cd <ayon-core-repo-clone>
./tools/manage.sh create-env
./tools/manage.sh run-tests
```

</TabItem>
</Tabs>

`manage.sh` checks for Python 3.11. `run-tests` installs the `test` extra (`uv sync --extra test`) and runs pytest on `tests/` with `-m "not server and not optional"`. `run-tests --optional` also runs the tests marked `optional`.

A single file or test runs through the same environment:

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
.\tools\manage.ps1 run pytest tests/client/ayon_core/lib/test_path_tools.py -v
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
./tools/manage.sh run pytest tests/client/ayon_core/lib/test_path_tools.py -v
```

</TabItem>
</Tabs>

### Markers

The markers are declared in `[tool.pytest.ini_options]` of `pyproject.toml`:

| Marker | Meaning |
|---|---|
| `unit`, `integration`, `api`, `cli`, `slow` | Kind of test |
| `server` | Needs a running AYON server. Excluded by `run-tests` |
| `optional` | Excluded from the default test run (`addopts` has `-m 'not optional'`) |
| `server_compat(version)` | Tests of a fallback for AYON servers up to the given version |

### CI

The [pr_unittests.yaml](https://github.com/ynput/ayon-core/blob/develop/.github/workflows/pr_unittests.yaml) workflow runs on pull requests and pushes to `develop`. It runs `./tools/manage.sh run-tests --optional` on Linux with Python 3.11 and `QT_QPA_PLATFORM=offscreen`, so tests marked `server` do not run in CI.

### pytest-ayon

[pytest-ayon](https://github.com/ynput/pytest-ayon) is a pytest plugin with fixtures for AYON tests. ayon-core installs it with the `test` extra. pytest loads it automatically (entry point `pytest11`). Its fixtures that talk to a server read `AYON_SERVER_URL` and `AYON_API_KEY` from the environment.

| Fixture | Provides |
|---|---|
| `ayon_connection_env` | The server URL and API key from the environment |
| `ayon_server_session` | A `requests.Session` with the API key header |
| `project` | A temporary project with a folder, a task, a product, a version, representations and links, deleted after the test (`ProjectInfo`) |
| `empty_project` | A temporary project with only the given folder types, task types and statuses |
| `project_root_path`, `addon_version` | The repository root and the addon name and version read from its `package.py` |
| `imprint_test_version`, `build_addon_package`, `installed_addon` | A test version written to `package.py`, the addon package built with `create_package.py`, and that package installed on the server and removed after the test |
| `tmp_path` | A temporary folder shared by the whole session (overrides the pytest fixture) |

## Integration tests

The [ayon-pipeline-tests](https://github.com/ynput/ayon-pipeline-tests) addon runs end-to-end publish tests: it opens a prepared workfile in an application, publishes it, and compares the result with the expected data. Its integration tests cover After Effects, Maya, Nuke and Photoshop, some of them with a Deadline variant, in `client/ayon_pipeline_tests/tests/integration/hosts/`.

### Requirements

- The `pipeline_tests` addon in the bundle used for the run. A [dev bundle](developer-mode.md) points the launcher to local code, so the addon does not have to be uploaded after every change.
- `AYON_SERVER_URL` and `AYON_API_KEY` in the environment of the process. Without them the test project cannot be restored.
- The API key belongs to a service user: the server endpoint that restores the test project (`/api/dbimport`) refuses other users.
- The tested application installed and configured in the Applications addon, which launches it (`ApplicationManager`).

### Run the tests

The addon adds the `runtests` command to the AYON launcher:

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
ayon_console.exe addon pipeline_tests runtests <path>/client/ayon_pipeline_tests/tests/integration
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
ayon addon pipeline_tests runtests <path>/client/ayon_pipeline_tests/tests/integration
```

</TabItem>
</Tabs>

Adding `hosts/<app>` to the path limits the run to one application, for example `.../tests/integration/hosts/maya`.

| Argument | Purpose |
|---|---|
| `-m`, `--mark` | Run only tests with this pytest marker |
| `-p`, `--pyargs` | Run tests from a Python package |
| `--test_data_folder` | Use an already unzipped test data folder |
| `-s`, `--persist` | Keep the test data and published files after the run, for example `--persist True` |
| `-a`, `--app_variant` | Application variant, empty for the latest installed |
| `--app_group` | Application group, empty for the default of the test |
| `--timeout` | Timeout of a test case, in seconds |
| `-so`, `--setup_only` | Only prepare the test data and project, do not launch the application, for example `--setup_only True` |

The command also accepts `--mongo_url` and `--dump_databases`, left from the OpenPype era.

### How a publish test works

A test class extends `PublishTest` from `tests/lib/testing_classes.py`, usually through a per-application base class in the `lib.py` of the application folder. The class attributes set the test:

| Attribute | Purpose |
|---|---|
| `TEST_FILES` | Test data as `(file_id, file_name, md5)`: a folder or zip next to the test file, a local path, or a Google Drive file id |
| `APP_GROUP`, `APP_VARIANT` | Application to launch; command line arguments take precedence |
| `TIMEOUT` | Publish timeout in seconds (default `120`) |
| `PERSIST` | Keep the temporary folder after the run |
| `TEST_DATA_FOLDER` | Use an already unzipped test data folder |

A run goes through these steps:

1. Copy or download the test data into a temporary folder and unzip it.
2. Set the environment variables from `input/env_vars/env_var.json`.
3. Restore the project `test_project` on the server from `input/dumps/dump.test_project.sql`. `DBHandler` in `tests/lib/db_handler.py` deletes the existing project with `ayon_api`, posts the dump to `/api/dbimport` and waits for the import event to finish.
4. Launch the application with the workfile from `input/workfile`, the startup scripts from `input/startup` and the optional arguments from `input/app_args/app_args.json`. The startup script publishes and closes the application.
5. Wait for the application to close. After the timeout, the application is terminated and a warning is logged.
6. Run the assertions of the test class and `test_folder_structure_same`, which compares the published files with the `expected` folder by file presence only.

The restored project stays on the server after the run; the next run replaces it.

### Assertions

`DBAssert.count_compare(label, items, expected)` from `tests/lib/assert_classes.py` compares the number of entities with an expected count. It prints the result and returns an error message, or `None` on success. A test collects the messages and fails when any is set:

```python
versions = list(ayon_api.get_versions(project_name))
failures.append(DBAssert.count_compare("versions", versions, 3))
```

The [integration README](https://github.com/ynput/ayon-pipeline-tests/blob/main/client/ayon_pipeline_tests/tests/integration/README.md) describes how to create the test data for a new test.

## Server tests

The server backend has unit, integration and API tests in [ayon-backend/tests](https://github.com/ynput/ayon-backend/tree/develop/tests) (`make test`, `make test-integration`, `make test-api`). The web app has end-to-end tests, see [Frontend E2E tests](server/testing.md).
