---
id: ayon_launcher_admin
title: AYON Launcher - Desktop Application
sidebar_label: AYON Launcher
---

## Introduction
The desktop application, AYON launcher, is the entry point for artists to work within the AYON system. It should be installed locally on the artist's workstation. This self-contained (frozen) software includes all the necessary dependencies to run.

The AYON launcher connects to the AYON server and distributes add-ons, dependency packages, and different versions of the launcher. Distribution is based on bundles set on the server.


## Distribution & Installation

The AYON server distributes the AYON launcher. Artists can log in to the AYON web UI to find the download button.

Launcher binaries are named as follows:
- Windows: `AYON-1.0.0-win-setup.exe`
- Linux: `AYON-1.0.0-linux.tar.gz`
- Mac: `AYON-1.0.0-Installer.dmg`

Install the AYON launcher on individual workstations as mentioned in [Artist Getting Started: Installation](artist_getting_started.md#installation).

When the AYON launcher starts, it periodically checks for updates in the current bundle. For example, launching the launcher in production mode fetches updates from your production bundle, including add-ons that require downloading, validating, and extracting to the user's machine.

:::info Updating Pipeline to Latest Release

[Updating Pipeline to Latest Release](admin_server_updating_pipeline.md) automatically detects which add-ons need updates and identifies the platforms you’re using (MacOS, Windows, or Linux).

This is useful if no launcher is available for download on your AYON server.
:::

:::tip Automate Installation on Windows

See [Automating AYON Launcher Installation on User Machines Using the Command Line | Ynput Forums](https://community.ynput.io/t/automating-ayon-launcher-installation-on-user-machines-using-the-command-line/1836)
:::

:::info [Win] Install for All Users

On <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> , when installing for "All Users," it installs to Program Files by default, requiring admin permissions.
:::

## Upload Launcher Binaries to AYON Server

On the [Bundles Tab](admin_server_bundles_and_addons.md#bundles-tab), you can upload a new launcher by clicking the **Upload Launcher** button.

:::tip

To use the launcher in your pipeline, add it to your bundle.
:::

## AYON Launcher Builds

:::info Build AYON Launcher

**Unless you know what you are doing,** building your own AYON Launcher is mainly useful for getting unreleased versions. For more info, see [Building AYON Desktop Application](dev_launcher.md#building-ayon-desktop-application).

You can find all official launcher builds on [ayon-launcher/releases | Github](https://github.com/ynput/ayon-launcher/releases) for direct download.

Remember, you can extend the AYON launcher using a custom add-on. For example, you can extend the AYON [tray menu](ayon_launcher_artist_basic.md#tray-menu) or [launcher actions](ayon_launcher_artist_basic.md#launcher-ui) to add your own actions.
:::

## Run AYON

Running AYON should follow the instructions in [Run AYON Launcher](artist_getting_started.md#run-ayon-launcher).

### Pipeline Modes

AYON pipeline allows working in different modes. The launcher provides arguments to specify the pipeline mode and the bundle to work in. For more information, check:
- [Pipeline Modes](admin_server_bundles_and_addons.md#pipeline-modes)
- [Launch in Different Pipeline Modes](ayon_launcher_artist_advanced.md#launch-in-different-pipeline-modes)
- [How to Use Different Bundles with Different Projects? | Ynput Forums](https://community.ynput.io/t/how-to-use-different-bundles-with-different-projects/1096)

### AYON Launcher Updates

On startup, when connected to the server, AYON retrieves various information, including add-on updates. If add-ons are missing or outdated, the correct versions are downloaded, validated, and extracted to the artist's workstation.

### Runtime Provided Environment Variables

See [Environment Variables](dev_launcher.md#environment-variables) for information about environment variables set during startup.

## Additional Information

### Site ID

After installing the AYON launcher, a unique ID is assigned to the machine, usually a funny name like `military-mouse-of-jest`. The Site ID is used for setting site settings.

For more info about settings categories in AYON, see [Addon Settings Categories](admin_server_bundles_and_addons.md#addon-settings-categories).

:::info Where Site ID is Saved

It's saved in a file called `site_id` located in the path saved in `AYON_LAUNCHER_LOCAL_DIR`. By default, based on OS:
- Windows: `%LOCALAPPDATA%\Ynput\AYON`
- Linux: `~/.local/share/AYON`
- macOS: `~/Library/Application Support/AYON`
:::

:::tip Customize Site ID

Check the FAQ for [How to Set Custom Site ID](#how-to-set-custom-site-id).
:::

### Shims

Shims help register the path to the AYON launcher. Currently, you can point to a single version, which stops working when uninstalled for a new version. The shim finds an existing launcher and executes it without downloading or handling logic.

The AYON launcher has new argument handling. When `init-ayon-launcher` is passed, it stores information about the executable and deploys shims without further action.

The shim is also used for the custom `ayon-launcher://` protocol scheme, which varies by OS. This support enables web actions.

:::note

Shims on Windows and Linux are installed to the resources directory (per user).
:::

## FAQ

### Use Shared Location for AYON Launcher and Add-ons

This is done by leveraging the `AYON_LAUNCHER_STORAGE_DIR` environment variable. For more information, see [Launcher Environment Variables](dev_launcher.md#environment-variables).

Here's a community step-by-step guide:
- [Use Shared Location for AYON Launcher and Add-ons | Ynput Forums](https://community.ynput.io/t/use-shared-location-for-ayon-launcher-and-addons/1175).

### AYON Launcher Versioning Convention

AYON uses semantic versioning for add-ons and desktop applications ([click here for more details](https://semver.org/)).

For studios customizing the AYON source code, it's practical to build by adding a name and number after the PATCH, rather than deploying with the same version from the original AYON repository. For example, `1.0.0` should become `1.0.0+yourstudio.1`.

### How to Set Custom Site ID

Setting a custom site ID can help set site IDs to sensible names, making navigation easier. It also allows controlling machines in your farm with a single site by giving them all the same site ID.

To set a custom site ID, there are two possible solutions:
- Set an environment variable on the machine, e.g., `AYON_SITE_ID=my-cool-machine`.
- Modify the value in the [Site ID](#site-id) file.

:::caution

Be cautious not to do this on machines that are not dedicated farm machines, such as artist machines. Also, ensure these machines have the same operating system.
:::