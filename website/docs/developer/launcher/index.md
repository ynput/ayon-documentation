---
title: AYON launcher development
sidebar_label: AYON Launcher
description: "Developing the AYON launcher: building the desktop application and its output, uploading the installer to the server, the shim, running it from sources, startup arguments and environment variables, and developer mode."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';

## Introduction

AYON Launcher is a standalone desktop application designed to be the primary gateway for connecting to your AYON Server. It manages the distribution of updates *including addons, dependency packages, and different versions of the launcher itself* according to your bundle configuration. Additionally, AYON Launcher is responsible for initiating the core addon logic, enabling artists to interact with AYON Pipeline.

To function properly, AYON Launcher requires an active connection to an AYON Server instance.

## AYON Launcher Development

### Building AYON Desktop Application

:::info

You won't need to build the launcher yourself unless you are modifying the source code.
You can find all official launcher builds on[ayon-launcher/releases | Github](https://github.com/ynput/ayon-launcher/releases) ready for direct download.
:::

We aim to closely follow the [**VFX Reference Platform**](https://vfxplatform.com/).

We use [cx_Freeze](https://cx-freeze.readthedocs.io/en/latest) to freeze the Python code and its dependencies, and [uv](https://docs.astral.sh/uv/) for virtual environment management. The launcher requires Python 3.11. See [Requirements](../requirements.md) for the full list of tools.

Comprehensive build steps are provided:

<DocCardList />

The build process outputs an installer with a metadata file that can be distributed to workstations. On Windows, the installer is created with Inno Setup. On macOS it is a `.dmg`. On Linux, we recommend the Docker build variants.

#### Commands

The build tooling is a single script per platform: `./tools/manage.ps1` on Windows (PowerShell 7 or newer) and `./tools/make.sh` on Linux and macOS. Both accept the same targets. Run the script without arguments to print the list.

| Target | Description |
| -- | -- |
| `create-env` | Create or update the virtual environment (`.venv`) from the lock file |
| `install-runtime-dependencies` (alias `install-runtime`) | Install runtime dependencies (Qt binding). Use `--use-pyside2` to install PySide2 instead of PySide6 |
| `build` | Build the desktop application |
| `make-installer` | Create the installer |
| `build-make-installer` | Build the desktop application and create the installer |
| `upload` | Upload the installer to the server |
| `run` | Run the desktop application from code |
| `docker-build [variant]` | Build in Docker. Variant is `ubuntu` (default), `debian`, `rocky8` or `rocky9` |

#### Build output

| Platform | Application | Installer and metadata |
| -- | -- | -- |
| Windows | `build/output/` (`ayon.exe`, `ayon_console.exe`) | `build/installer/` (`.exe` and `.json`) |
| macOS | `build/AYON {version}.app` | `build/installer/` (`.dmg` and `.json`) |
| Linux (Docker) | `build_<variant>/output/` | `build_<variant>/installer/` and `build_<variant>/metadata.json` |

The `build` step also compiles the shim, a small Rust executable (see [The shim](#the-shim)), so Rust must be installed.

By default, the Qt binding is PySide6. For Linux builds that need PySide2, add `--use-pyside2` to `docker-build`, or set the `QT_BINDING=pyside2` environment variable for a local build.

### Upload Installer to Server

The `upload` command creates installer information on the server from the JSON file and uploads the installer file for users to download.

The upload command has more options; use `--help` to explore them. For example, you can use `--username` and `--password` instead of an API key.

- On <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span>
    ```bash
    cd <ayon-launcher-repo-clone>
    ./tools/manage.ps1 upload --server <your server> --api-key <your api key>
    ```
- On <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> and <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span>
    ```bash
    cd <ayon-launcher-repo-clone>
    ./tools/make.sh upload --server <your server> --api-key <your api key>
    ```

To use credentials instead of an API key, replace `--api-key <your api key>` with `--username <your admin username> --password <your password>`.

### The shim

The AYON shim is a small executable that knows where to find the "real" AYON launcher executable. It is used to:

1. Handle the custom URI scheme `ayon-launcher://`, which runs web actions.
2. Provide a stable path for shortcuts and automation (for example a Deadline plugin), so you don't need to update the path when the AYON launcher is updated.

The shim is installed together with the AYON launcher, or on its first run. It goes to the application data directory of your OS, or to `{AYON_LAUNCHER_LOCAL_DIR}/shim/` if the `AYON_LAUNCHER_LOCAL_DIR` environment variable is set.

:::caution

On macOS the shim is installed to `/Applications/AYON.app`. To use it in automation that waits for the AYON launcher to finish, use the full path `/Applications/AYON.app/Contents/MacOS/ayon`.

:::

### Running AYON Desktop Application

AYON can be executed either from live sources (this repository) or from "frozen code"—executables built using the steps described above.

<Tabs
    defaultValue='source'
    values={[
        {label: 'From sources', value: 'source'},
        {label: 'From frozen code', value: 'frozen'},
    ]}>

<TabItem value='source'>

Create the environment and install the runtime dependencies first. Ideally, repeat this with each new version.

```bash
cd <ayon-launcher-repo-clone>
./tools/make.sh create-env
./tools/make.sh install-runtime-dependencies
```

On Windows, use `./tools/manage.ps1` instead of `./tools/make.sh`.

Then run AYON from sources. Arguments are passed through:

```bash
./tools/make.sh run <args>
```

On Windows:

```bash
./tools/manage.ps1 run <args>
```

This runs `uv run python start.py <args>`.

</TabItem>

<TabItem value='frozen'>

A build produces these executables: `ayon.exe` and `ayon_console.exe` on Windows, `ayon` on Linux, and `AYON {version}.app` on macOS.

- On <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> : `ayon.exe` and `ayon_console.exe`
    ```bash
    cd <ayon-launcher-installation-location>
    ./ayon.exe
    ```
    Or 
    ```bash
    cd <ayon-launcher-installation-location>
    ./ayon_console.exe
    ```
    > The executable `ayon_console.exe` creates a console with output, which is useful for debugging. `ayon.exe` does not create a console and has no `stdout` or `stderr` output.

- On <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> and <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span> : `ayon`
    ```bash
    cd <ayon-launcher-installation-location>
    ayon
    ```

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

These cannot be used in any CLI handling. i.e. you can't reuse them when implementing a [CLI Interface](../addon-development/creation.md#cli-interface) for your addon.
:::

| <div style={{width: '190px'}}>Argument</div> | Description |
| -- | -- |
| `init-ayon-launcher` | Initializes the launcher by registering the executable path to known AYON launcher locations and installing a shim executable. |
| `--bundle <BUNDLE NAME>` | Forces AYON to use a specific bundle instead of the one set in the bundle settings. This is useful for testing new bundles before release. <br/>See examples here: [How to use different bundles with different projects? \| Ynput Forums](https://community.ynput.io/t/how-to-use-different-bundles-with-different-projects/1096) |
| `--verbose <LOG LEVEL>` | Sets the logging level. Acceptable values: `DEBUG` (10), `INFO` (20), `WARNING` (30), `ERROR` (40), `CRITICAL` (50). You can use either the string or the corresponding integer The value is stored in the `AYON_LOG_LEVEL` environment variable. | 
| `--debug` | A simplified way to set verbose to DEBUG. Also sets the `AYON_DEBUG` environment variable to `1`. |
| `--skip-headers` | Skips headers in the console output. |
| `--use-dev` | Uses the dev bundle and settings if a bundle is not explicitly defined. |
| `--use-staging` | Uses staging settings and the staging bundle if a bundle is not explicitly defined. Cannot be combined with `--use-dev`. |
| `--project-bundle <BUNDLE NAME>` | Sets the project bundle (`AYON_BUNDLE_NAME`) to use. |
| `--project <PROJECT NAME>` | Sets the project name (`AYON_PROJECT_NAME`) for the launcher session. |
| `--headless` | Runs AYON in headless mode, with no UIs shown during bootstrap. Affects the AYON_HEADLESS_MODE environment variable. Custom logic must handle headless mode independently. |
| `--ayon-login` | Displays the login dialog on startup. |
| `--skip-bootstrap` | Skips the bootstrap process, used for internal distribution logic. |


You can access these executable arguments via terminal
<Tabs>

<TabItem value="windows" label=<span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> default>


```bash
cd <ayon-launcher-installation-location>
./ayon.exe <arg>
```
Or 
```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe <arg>
```

</TabItem>

<TabItem value="linux&mac" label=<div><span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> & <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span></div> >


```bash
cd <ayon-launcher-installation-location>
ayon <arg>
```

</TabItem>

</Tabs>


### Environment Variables

AYON launcher provides the following environment variables for its subprocesses, useful in scripting and other applications. These variables are set during startup.

| Environment Variable | Description |
|--|--|
| **AYON_VERSION** | Current desktop application version, e.g., `1.0.0`. |
| **AYON_BUNDLE_NAME** | Name of the bundle in use. |
| **AYON_STUDIO_BUNDLE_NAME** | Name of the production bundle in your studio. |
| **AYON_LOG_LEVEL** | Logging level for AYON logger. |
| **AYON_DEBUG** | Debug flag enabled when set to '1'. |
| **AYON_USE_STAGING** | Use staging settings when set to '1'. |
| **AYON_USE_DEV** | Use dev mode settings when set to '1'. |
| **AYON_HEADLESS_MODE** | Headless mode flag enabled when set to '1'. |
| **AYON_EXECUTABLE** | Path to the executable used for AYON subprocesses. Points to the **python** executable in the virtual environment when run from sources. If run from frozen code, it points to either `ayon` or `ayon_console` on Windows. |
| **AYON_ROOT** | Root directory for AYON launcher content. |
| **AYON_LAUNCHER_STORAGE_DIR** | Directory for storing dependency packages, add-ons, and related files. |
| **AYON_LAUNCHER_LOCAL_DIR** | Directory for storing user/machine-specific files. **This directory should not be shared across machines and users.** |
| **AYON_ADDONS_DIR** | Path to AYON add-ons directory—considered deprecated. Use `AYON_LAUNCHER_STORAGE_DIR` instead. |
| **AYON_DEPENDENCIES_DIR** | Path to AYON dependencies directory—considered deprecated. Use `AYON_LAUNCHER_STORAGE_DIR` instead. |
| **AYON_MENU_LABEL** | Label for AYON menu. |
| **USE_AYON_SERVER** | AYON mode is enabled. A flag for the openpype add-on. |
| **SSL_CERT_FILE** | Use certificates from 'certifi' if 'SSL_CERT_FILE' is not set. |
| **AYON_SITE_ID** | Local site identifier. |
| **AYON_SERVER_URL** | URL for the logged-in AYON Server. |
| **AYON_API_KEY** | API key for the logged-in AYON Server. |
| **AYON_DEFAULT_SETTINGS_VARIANT** | Variant used for settings. |

<!-- | **AYON_USERNAME** | Set it to override system created username. | It can be used only for service API key and is used only for farm publishing. AYON launcher does not use it in any way, and does not set it.
| **AYON_TMPDIR** | Set it to override default system temp directory. It supports `root` and `project` template keys, e.g. `{root[work]}/{project[name]}/temp`. |  ayon-core related, AYON launcher does not use it in any way, and does not set it. -->

:::info

Environment variables **AYON_LAUNCHER_STORAGE_DIR** and **AYON_LAUNCHER_LOCAL_DIR** are set to the same folder by default. The path is based on the OS:
- Windows: `%LOCALAPPDATA%\\Ynput\\AYON`
- Linux: `~/.local/share/AYON`
- macOS: `~/Library/Application Support/AYON`

Ensure to set these environment variables before starting the AYON launcher when applying overrides, as they are required for bootstrap.

:::

:::caution Deprecated Environment Variables

Environment variables **AYON_ADDONS_DIR** and **AYON_DEPENDENCIES_DIR** default to being relative to **AYON_LAUNCHER_STORAGE_DIR**.

- **AYON_ADDONS_DIR** -> `{AYON_LAUNCHER_STORAGE_DIR}/addons`
- **AYON_DEPENDENCIES_DIR** -> `{AYON_LAUNCHER_STORAGE_DIR}/dependency_packages`

Changing their values will alter where addons and dependency packages are stored, even if you change **AYON_LAUNCHER_STORAGE_DIR**!

:::

## Developer Mode

[Developer mode](../developer-mode.md) lets you skip the standard distribution process of add-ons and use local sources of add-on code instead. This is useful for add-on development. Developer mode must be enabled and configured on the AYON server.

There are two ways to start in developer mode using command line arguments:
1. Start the AYON launcher in dev mode by using the `--use-dev` argument flag. It finds the dev bundle assigned to the logged-in user.
2. Choose a bundle explicitly using the `--bundle` argument, e.g., `--use-dev --bundle <dev bundle name>`.

Both options can be set with the environment variables `AYON_BUNDLE_NAME` and `AYON_USE_DEV` (set to `1` to enable).

Developer mode automatically disregards any production or staging information.

:::tip

For a step-by-step guide, Check [Ayon Developer Mode – Guide | Ynput Forums](https://community.ynput.io/t/ayon-developer-mode-guide/993)
:::

## Further Information

For additional information, please refer to the readme in the [AYON launcher repository](https://github.com/ynput/ayon-launcher/blob/develop/README.md).

<!-- 
Just throwing these here for future reference.

- <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span>
- <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span>
- <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span>
- <span style={{color:'#23E0A9'}}>⬤</span> <span style={{color:'#1c2026',backgroundColor:'#23E0A9', borderRadius: '4px', padding: '2px 4px'}}>Production</span>
- <span style={{color:'#ff858b'}}>⬤</span> <span style={{color:'#1c2026', backgroundColor:'#ff858b', borderRadius: '4px', padding: '2px 4px'}}>Staging</span>
- <span style={{color:'#c78fff'}}>⬤</span> <span style={{color:'#1c2026',backgroundColor:'#c78fff', borderRadius: '4px', padding: '2px 4px'}}>Development</span>
- <span style={{color:'#e2e2e3'}}>⬤</span> <span style={{color:'#1c2026',backgroundColor:'#e2e2e3', borderRadius: '4px', padding: '2px 4px'}}>Unarchived</span> -->