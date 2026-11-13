---
title: AYON launcher development
sidebar_label: AYON Launcher
description: "Developing the AYON launcher: its command line with arguments, commands and addon commands, running it from sources, building it per platform and uploading the installer to the server, the shim, the environment variables and developer mode."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page is about developing the AYON launcher itself: its command line, running it from sources, building it and uploading the installer to the server, the shim and the environment variables. Using the launcher is described in [Launcher](../../pipeline/launcher.md).

## Command line

The launcher takes the same command line whether it runs from a build or from sources:

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
# Build
ayon_console.exe [arguments] [command] [options]
# Sources
./tools/manage.ps1 run [arguments] [command] [options]
# Addon command
ayon_console.exe [arguments] addon <addon name> <command> [options]
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
# Build
ayon [arguments] [command] [options]
# Sources
./tools/make.sh run [arguments] [command] [options]
# Addon command
ayon [arguments] addon <addon name> <command> [options]
```

</TabItem>
</Tabs>

- [**Arguments**](../../pipeline/launcher-administration.md#arguments), such as `--use-dev` or `--bundle`, are read by the launcher in `start.py` and removed before the rest is passed on.
- [**Commands**](../../pipeline/launcher-administration.md#commands), such as `tray` or `publish`, come from the command line of the Core addon, which the launcher starts after the bootstrap.
- [**Addon commands**](../../pipeline/launcher-administration.md#addon-commands) are reached with `addon <addon name> <command>`. An addon adds them in its `cli()` method, see [Command line](../addon-development/client.md#command-line).

`--help` lists the commands, `<command> --help` the options of a command, and `addon <addon name> --help` the commands of an addon. The full lists are in [Launcher administration](../../pipeline/launcher-administration.md).

:::caution Addon commands

An addon's commands are reached with `addon <addon name> <command>`. Launcher arguments, such as `--bundle` or `--debug`, come before it.

:::

## Run from sources

The environment and the runtime dependencies are set up once, and again after each update of the repository.

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
cd <ayon-launcher-repo-clone>

# Create or update the virtual environment (.venv) from the lock file
./tools/manage.ps1 create-env

# Install the Qt binding: PySide6, or PySide2 with --use-pyside2
./tools/manage.ps1 install-runtime-dependencies

# Run the launcher; the arguments are passed through to start.py
./tools/manage.ps1 run <args>
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
cd <ayon-launcher-repo-clone>

# Create or update the virtual environment (.venv) from the lock file
./tools/make.sh create-env

# Install the Qt binding: PySide6, or PySide2 with --use-pyside2
./tools/make.sh install-runtime-dependencies

# Run the launcher; the arguments are passed through to start.py
./tools/make.sh run <args>
```

</TabItem>
</Tabs>

Both scripts run `uv run python start.py <args>`.

## Helper scripts

The repository has one helper script per platform: `./tools/manage.ps1` on Windows (PowerShell 7 or newer) and `./tools/make.sh` on Linux and macOS. Both accept the same targets. Run the script without arguments to print the list.

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

## Build and upload

:::info

The launcher only needs to be built to change its code. Ready-made builds for every platform are on the [releases page](https://github.com/ynput/ayon-launcher/releases).

:::

After the environment is set up as in [Run from sources](#run-from-sources), two commands build the installer and upload it to the server:

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
# Build the launcher and create the installer
./tools/manage.ps1 build-make-installer

# Upload the installer to the server
./tools/manage.ps1 upload --server $env:AYON_SERVER_URL --api-key $env:AYON_API_KEY --force
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
# Build the launcher and create the installer
./tools/make.sh build-make-installer

# Upload the installer to the server
./tools/make.sh upload --server $AYON_SERVER_URL --api-key $AYON_API_KEY --force
```

</TabItem>
</Tabs>

### Build steps per platform

Each platform needs a few tools besides the common ones in [Requirements](../requirements.md):

<Cards variant="compact">
<Card icon="desktop_windows" title="Windows" href="/docs/developer/launcher/build-windows">
PowerShell 7, the Visual Studio C++ build tools and Inno Setup 6.
</Card>
<Card icon="laptop_mac" title="macOS" href="/docs/developer/launcher/build-macos">
Xcode tools and create-dmg, then signing and notarization.
</Card>
<Card icon="terminal" title="Linux" href="/docs/developer/launcher/build-linux">
Docker builds for Ubuntu, Debian and Rocky Linux.
</Card>
</Cards>

### Output and options

- **Output:** the installer and its `.json` metadata file are in `build/installer/`: an `.exe` made with Inno Setup on Windows, a `.dmg` on macOS and a `.tar.gz` on Linux. The application itself is in `build/output/`, or `build/AYON {version}.app` on macOS. Docker builds write to `build_<variant>/`.
- **Shim:** the build also compiles the [shim](#the-shim) with Rust.
- **Qt binding:** PySide6 by default. `--use-pyside2` with `install-runtime-dependencies` or `docker-build` uses PySide2.
- **Upload:** creates the installer entry on the server from the `.json` file and uploads the installer. `--force` replaces an installer of the same version whose details differ. `--username` and `--password` can replace the API key, and `--help` lists the other options.

### Platforms and hardware

Each official launcher release is a standalone executable that comes with its own dependencies:

| Platform | Installer |
| -- | -- |
| Windows | `AYON-<version>-win-setup.exe` |
| macOS | `AYON-<version>-macos.dmg`, for Apple silicon (`arm64`) since 1.5.0. Earlier releases were for Intel (`x86_64`) |
| Linux | `AYON-<version>-linux-<distribution>.tar.gz`, for Ubuntu 20.04, Debian 11, Rocky Linux 8 and Rocky Linux 9 |

Linux builds are made in Docker, one per distribution: Rocky Linux is the choice for RHEL-compatible systems. The launcher follows the [VFX Reference Platform](https://vfxplatform.com/), and has no minimum hardware requirements: a computer that can run a DCC or render can run it.

## The shim

The AYON shim is a small executable that knows where to find the "real" AYON launcher executable. It is used to:

1. Handle the custom URI scheme `ayon-launcher://`, which runs web actions.
2. Provide a stable path for shortcuts and automation (for example a Deadline plugin), so you don't need to update the path when the AYON launcher is updated.

The shim is installed together with the AYON launcher, or on its first run. It goes to the application data directory of your OS, or to `{AYON_LAUNCHER_LOCAL_DIR}/shim/` if the `AYON_LAUNCHER_LOCAL_DIR` environment variable is set.

:::caution

On macOS the shim is installed to `/Applications/AYON.app`. To use it in automation that waits for the AYON launcher to finish, use the full path `/Applications/AYON.app/Contents/MacOS/ayon`.

:::

## Environment variables

AYON launcher provides the following environment variables for its subprocesses, useful in scripting and other applications. These variables are set during startup.

| Environment Variable | Description |
|--|--|
| **AYON_VERSION** | Current desktop application version, e.g., `1.0.0`. |
| **AYON_BUNDLE_NAME** | Name of the bundle in use. |
| **AYON_STUDIO_BUNDLE_NAME** | Name of the studio bundle in use: the production, staging or dev bundle, or the one set with `--bundle`. |
| **AYON_PROJECT_NAME** | Project name set with `--project`. |
| **AYON_IN_LOGIN_MODE** | `1` when the user logged in through the login dialog, rather than with environment variables. |
| **AYON_LOG_LEVEL** | Logging level for AYON logger. |
| **AYON_DEBUG** | Debug flag enabled when set to '1'. |
| **AYON_USE_STAGING** | Use staging settings when set to '1'. |
| **AYON_USE_DEV** | Use dev mode settings when set to '1'. |
| **AYON_HEADLESS_MODE** | Headless mode flag enabled when set to '1'. |
| **AYON_EXECUTABLE** | Path to the executable used for AYON subprocesses. Points to the **python** executable in the virtual environment when run from sources. If run from frozen code, it points to `ayon` or `ayon_console` on Windows, and to `ayon` on Linux and macOS. |
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

### Variables read by the launcher

| Environment Variable | Description |
|--|--|
| **AYON_AUTO_UPDATE** | `skip` starts without distributing updates; `block` stops with an error when updates are needed. |

## Developer mode

[Developer mode](../developer-mode.md) runs addon code from local repositories instead of the distributed addons. It is enabled and configured on the AYON server. The launcher starts in it with `--use-dev`, which uses the dev bundle of the logged-in user, or with `--use-dev --bundle <dev bundle name>`. The same can be set with the environment variables `AYON_USE_DEV=1` and `AYON_STUDIO_BUNDLE_NAME`.

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