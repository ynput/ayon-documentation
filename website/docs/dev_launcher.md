---
id: dev_launcher
title: AYON Launcher
sidebar_label: AYON Launcher
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';

## Introduction

For the most recent documentation, please refer to the readme in the [AYON launcher repository](https://github.com/ynput/ayon-launcher/blob/main/README.md).

The desktop application launcher for the AYON pipeline is essential for interacting with integrated applications. It serves as the main entry point for artists to publish and load data with AYON. Although the AYON launcher is a standalone desktop application, it requires a connection to an AYON server instance to function.

The primary purpose of the application is to distribute updates based on the current server state and to initiate the core add-on logic.

### Building AYON Desktop Application

We aim to closely follow the [**VFX Reference Platform**](https://vfxplatform.com/).

AYON is written in Python 3, with some elements still running in Python 2 until all DCCs are fully updated. For a list of those not yet updated, visit the [VFX Python3 tracker](https://vfxpy.com/).

We use [CX_Freeze](https://cx-freeze.readthedocs.io/en/latest) to freeze the Python code and its dependencies, and [Poetry](https://python-poetry.org/) for virtual environment management.

Comprehensive build steps are provided:

<DocCardList />

The build process outputs an installer with a metadata file that can be distributed to workstations.

### Upload Installer to Server

Create installer information from a JSON file on the server and upload the installer file for user download.

The upload command has more options; use `--help` to explore them. For example, you can use a username and password instead of an API key.

<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

Run 
```bash
cd <ayon-launcher-repo-clone>
./tools/manage.ps1 upload --server <your server> --api-key <your api key>
```

</TabItem>

<TabItem value='linuxmac'>

Run 

```bash
cd <ayon-launcher-repo-clone>
./tools/make.sh upload --server <your server> --api-key <your api key>
```

</TabItem>
</Tabs>

### Running AYON Desktop Application

AYON can be executed either from live sources (this repository) or from "frozen code"—executables built using the steps described above.

<Tabs
    defaultValue='source'
    values={[
        {label: 'From sources', value: 'source'},
        {label: 'From frozen code', value: 'frozen'},
    ]}>

<TabItem value='source'>

Run AYON directly from sources by activating the virtual environment:

```bash
cd <ayon-launcher-repo-clone>
poetry run python start.py &args
```

</TabItem>

<TabItem value='frozen'>

First, build AYON. This will produce executables: `ayon.exe` and `ayon_console.exe` on Windows, `ayon` on Linux, and `AYON {version}.app` for macOS. For more info, check [AYON Executables](ayon_launcher_artist_advanced.md#ayon-executables).

</TabItem>
</Tabs>

## Startup

Once the AYON launcher is installed and launched, there are several ways to influence what happens next. By default, it will prompt for server login (if not already logged in), then start distributing updates, and eventually initiate the main logic.

:::tip

The main logic now uses command line handling from the `core` add-on. If a path to a Python script is provided, it will execute the script as the main logic instead.

```bash
cd <ayon-launcher-installation-location>
ayon /foo/bar/baz.py arg1 arg2
```
:::

### Executable Arguments

:::caution

AYON Launcher comes with [Global Executable Arguments](ayon_launcher_artist_advanced.md#global-executable-arguments). These cannot be used in any CLI handling. i.e. you can't reuse them when implementing a [CLI Interface](dev_addon_creation.md#cli-interface) for your addon.
:::

### Environment Variables

AYON launcher provides the following environment variables for its subprocesses, useful in scripting and other applications. These variables are set during startup.

| Environment Variable | Description |
|--|--|
| **AYON_VERSION** | Current desktop application version, e.g., `1.0.0`. |
| **AYON_BUNDLE_NAME** | Name of the bundle in use. |
| **AYON_LOG_LEVEL** | Logging level for AYON logger. |
| **AYON_DEBUG** | Debug flag enabled when set to '1'. |
| **AYON_USE_STAGING** | Use staging settings when set to '1'. |
| **AYON_USE_DEV** | Use dev mode settings when set to '1'. |
| **AYON_HEADLESS_MODE** | Headless mode flag enabled when set to '1'. |
| **AYON_EXECUTABLE** | Path to the executable used for AYON subprocesses. Points to the **python** executable in the virtual environment when run from sources. If run from frozen code, it points to either `ayon` or `ayon_console` on Windows. |
| **AYON_ROOT** | Root directory for AYON launcher content. |
| **AYON_LAUNCHER_STORAGE_DIR** | Directory for storing dependency packages, add-ons, and related files. |
| **AYON_LAUNCHER_LOCAL_DIR** | Directory for storing user/machine-specific files. **This MUST NOT be unique for each user/machine.** |
| **AYON_ADDONS_DIR** | Path to AYON add-ons directory—considered deprecated. Use `AYON_LAUNCHER_STORAGE_DIR` instead. |
| **AYON_DEPENDENCIES_DIR** | Path to AYON dependencies directory—considered deprecated. Use `AYON_LAUNCHER_STORAGE_DIR` instead. |
| **AYON_MENU_LABEL** | Label for AYON menu. |
| **PYBLISH_GUI** | Default Pyblish UI for use in Pyblish. |
| **USE_AYON_SERVER** | AYON mode is enabled. A flag for the openpype add-on. |
| **SSL_CERT_FILE** | Use certificates from 'certifi' if 'SSL_CERT_FILE' is not set. |
| **AYON_SITE_ID** | Local site identifier. |
| **AYON_SERVER_URL** | URL for the logged-in AYON Server. |
| **AYON_API_KEY** | API key for the logged-in AYON Server. |
| **AYON_DEFAULT_SETTINGS_VARIANT** | Variant used for settings. |

:::caution

Environment variables set for backward compatibility with the openpype add-on.

| Environment Variable | Description |
|--|--|
| **OPENPYPE_VERSION** | Alias for **AYON_VERSION**. |
| **OPENPYPE_LOG_LEVEL** | Alias for **AYON_LOG_LEVEL**. |
| **OPENPYPE_DEBUG** | Alias for **AYON_DEBUG**. |
| **OPENPYPE_USE_STAGING** | Alias for **AYON_USE_STAGING**. |
| **OPENPYPE_HEADLESS_MODE** | Alias for **AYON_HEADLESS_MODE**. |
| **OPENPYPE_EXECUTABLE** | Alias for **AYON_EXECUTABLE**. |
| **OPENPYPE_ROOT** | Alias for **AYON_ROOT**. |
| **OPENPYPE_REPOS_ROOT** | Alias for **AYON_ROOT**. |
| **AVALON_LABEL** | Alias for **AYON_MENU_LABEL**. |

:::

:::note

Environment variables **AYON_LAUNCHER_STORAGE_DIR** and **AYON_LAUNCHER_LOCAL_DIR** are set to the same folder by default. The path is based on the OS:
- Windows: `%LOCALAPPDATA%\\Ynput\\AYON`
- Linux: `~/.local/share/AYON`
- macOS: `~/Library/Application Support/AYON`

Ensure to set these environment variables before starting the AYON launcher when applying overrides, as they are required for bootstrap.

:::

:::tip

Environment variables **AYON_ADDONS_DIR** and **AYON_DEPENDENCIES_DIR** default to being relative to **AYON_LAUNCHER_STORAGE_DIR**.

- **AYON_ADDONS_DIR** -> `{AYON_LAUNCHER_STORAGE_DIR}/addons`
- **AYON_DEPENDENCIES_DIR** -> `{AYON_LAUNCHER_STORAGE_DIR}/dependency_packages`

Changing their values will alter where add-ons and dependency packages are stored, even if you change **AYON_LAUNCHER_STORAGE_DIR**!

:::

## Developer Mode

[Developer mode](dev_dev_mode.md) lets you skip the standard distribution process of add-ons and use local sources of add-on code instead. This is useful for add-on development. Developer mode must be enabled and configured on the AYON server.

There are two ways to start in developer mode using command line arguments:
1. Start the AYON launcher in dev mode by using the `--use-dev` argument flag. It finds the dev bundle assigned to the logged-in user.
2. Choose a bundle explicitly using the `--bundle` argument, e.g., `--use-dev --bundle <dev bundle name>`.

Both options can be set with the environment variables `AYON_BUNDLE_NAME` and `AYON_USE_DEV` (set to `1` to enable).

Developer mode automatically disregards any production or staging information.
