---
id: dev_launcher
title: AYON Launcher - Introduction
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction
For most recent documentation please use readme in [AYON launcher repository](https://github.com/ynput/ayon-launcher/blob/main/README.md).

Desktop application launcher for AYON pipeline. You need AYON launcher to be able to interact with any of the integrated applications. It acts as the main entry point into the pipeline for all artists publishing and loading data with AYON. Even though AYON launcher is a standalone desktop application, it doesn't do anything until it's connected to an AYON server instance.

The main purpose of application is to distribute updates based on current server state and to start main logic of core addon. At this moment core addon is `openpype` (this will change in near future).

### Building AYON Desktop application

We aim to closely follow [**VFX Reference Platform**](https://vfxplatform.com/)

AYON is written in Python 3 with specific elements still running in Python2 until all DCCs are fully updated. To see the list of those, that are not quite there yet, go to [VFX Python3 tracker](https://vfxpy.com/)

[CX_Freeze](https://cx-freeze.readthedocs.io/en/latest) is used to freeze the Python code and all of its dependencies, and [Poetry](https://python-poetry.org/) for virtual environment management.

We provide comprehensive build steps:
* [Windows](dev_launcher_build_windows.md)
* [macOS](dev_launcher_build_macos.md)
* [Linux](dev_launcher_build_linux.md)

Output of the build process is installer with metadata file that can be distributed to workstations.

### Upload installer to server

Create installer information from json file on server and upload the installer file to be downloaded by users.

### Windows
Run `./tools/manage.ps1 upload --server <your server> --api-key <your api key>`

### Linux & macOS
Run `./tools/make.sh upload --server <your server> --api-key <your api key>`

Upload command has more options, use `--help` to investigate them. For example, it is possible to use username & password instead of api key.


### Running AYON Desktop application

AYON can be executed either from live sources (this repository) or from
*"frozen code"* - executables that can be built using steps described above.

### From sources
AYON can be run directly from sources by activating virtual environment:

```sh
poetry run python start.py &args
```

### From frozen code

You need to build AYON first. This will produce executable - `ayon.exe` and `ayon_console.exe` on Windows, `ayon` on Linux and `AYON {version}.app` for macOS.

#### Windows
Executable `ayon_console.exe` creates console with output - useful for debugging, `ayon.exe` does not create console, but does not have any stdout or stderr output.


Startup
-------------
Once AYON launcher is installed and launched there are few ways to affect what will happen next. Default behavior will ask for login to server (if user did not log in yet), then starts the distribution of updates, and eventually the main logic.

Main logic is now using command line handling from `openpype` addon. If a path to a python script is passed, it will start the python script as main logic instead.

### Arguments
There are reserved global arguments that cannot be used in any cli handling:
- `--bundle <BUNDLE NAME>` - Force AYON to use specific bundle instead of the one that is set in the config file. This is useful for testing new bundles before they are released.
- `--verbose <LOG LEVEL>` - Change logging level to one of the following: DEBUG, INFO, WARNING, ERROR, CRITICAL.
- `--debug` - Simplified way how to change verbose to DEBUG. Also sets `AYON_DEBUG` environment variable to `1`.
- `--skip-headers` - Skip headers in the console output.
- `--use-dev` - Use dev bundle and settings, if bundle is not explicitly defined.
- `--use-staging` - Use staging settings, and use staging bundle, if bundle is not explicitly defined. Cannot be combined with staging.
- `--headless` - Tell AYON to run in headless mode. No UIs are shown during bootstrap. Affects `AYON_HEADLESS_MODE` environment variable. Custom logic must handle headless mode on its own.
- `--skip-bootstrap` - Skip bootstrap process. Used for inner logic of distribution.

### Environment variables
Environment variables that are set during startup:
- **AYON_VERSION** - Version of AYON launcher.
- **AYON_BUNDLE_NAME** - Name of bundle that is used.
- **AYON_LOG_LEVEL** - Log level that is used.
- **AYON_DEBUG** - Debug flag enabled when set to '1'.
- **AYON_USE_STAGING** - Use staging settings when set to '1'.
- **AYON_USE_DEV** - Use dev mode settings when set to '1'.
- **AYON_HEADLESS_MODE** - Headless mode flag enabled when set to '1'.
- **AYON_EXECUTABLE** - Path to executable that is used to run AYON.
- **AYON_ROOT** - Root to AYON launcher content.
- **AYON_LAUNCHER_STORAGE_DIR** - Directory where are stored dependency packages, addons and files related to addons.
- **AYON_LAUNCHER_LOCAL_DIR** - Directory where are stored user/machine specific files. This MUST NOT be shared.
- **AYON_ADDONS_DIR** - Path to AYON addons directory - still used but considered as deprecated. Please rather use `AYON_LAUNCHER_STORAGE_DIR` to change location.
- **AYON_DEPENDENCIES_DIR** - Path to AYON dependencies directory - still used but considered as deprecated. Please rather use `AYON_LAUNCHER_STORAGE_DIR` to change location.

- **AYON_MENU_LABEL** - Label for AYON menu -> TODO move to openpype addon.
- **PYBLISH_GUI** - Default pyblish UI that should be used in pyblish -> TODO move to openpype addon.
- **USE_AYON_SERVER** - Flag for openpype addon.

- **SSL_CERT_FILE** - Use certificates from 'certifi' if 'SSL_CERT_FILE' is not set.

Environment variables that are set for backwards compatibility with openpype addon:
- **OPENPYPE_LOG_LEVEL** - Alias to **AYON_LOG_LEVEL**.
- **OPENPYPE_DEBUG** - Alias to **AYON_DEBUG**.
- **OPENPYPE_USE_STAGING** - Alias to **AYON_USE_STAGING**.
- **OPENPYPE_HEADLESS_MODE** - Alias to **AYON_HEADLESS_MODE**.
- **OPENPYPE_EXECUTABLE** - Alias to **AYON_EXECUTABLE**.
- **OPENPYPE_ROOT** - Alias to **AYON_ROOT**.
- **OPENPYPE_REPOS_ROOT** - Alias to **AYON_ROOT**.
- **AVALON_LABEL** - Alias to **AYON_MENU_LABEL**.

:::note
Environment variables **AYON_LAUNCHER_STORAGE_DIR** and **AYON_LAUNCHER_LOCAL_DIR** are by default set to the same folder. Path is based on OS.
- Windows: `%LOCALAPPDATA%\Ynput\AYON`
- Linux: `~/.local/share/AYON`
- macOS: `~/Library/Application Support/AYON`

It is required to set the environment variables before AYON launcher is started as it is required for bootstrap.
:::

:::tip
Environment variables **AYON_ADDONS_DIR** and **AYON_DEPENDENCIES_DIR** by default are relative to **AYON_LAUNCHER_STORAGE_DIR**.

- **AYON_ADDONS_DIR** -> `{AYON_LAUNCHER_STORAGE_DIR}/addons`
- **AYON_DEPENDENCIES_DIR** -> `{AYON_LAUNCHER_STORAGE_DIR}/dependency_packages`

Changing their values will change where addons and dependency packages are stored even if you change **AYON_LAUNCHER_STORAGE_DIR**!
:::

## Developer mode
[Developer mode](dev_dev_mode.md) enables to skip the standard distribution process of addons to use local sources of addon code instead. This is useful for development of addon. Developer mode must be enabled and configured on AYON server.

There are 2 ways to start in developer mode using command line arguments:
1. Start AYON launcher with `--bundle <dev bundle name>`. Dev bundle cannot be set as production or staging.
2. Using argument flag `--use-dev`. With this argument a dev bundle is found for logged user.

Both options can be defined with environment variables `AYON_BUNDLE_NAME` and `AYON_USE_DEV` (value `1` to enable).

Developer mode automatically disregards any production or staging information.
