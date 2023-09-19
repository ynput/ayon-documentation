---
id: admin_launcher_distribute
title: Launcher - Distribution
sidebar_label: Launcher distribution
---

To enable your artists to use the AYON pipeline, you need to distribute the desktop application with frozen executables to them. For that we have [AYON launcher](https://github.com/ynput/ayon-launcher). The application requires connection to AYON server, make sure you have set up one.

## AYON Launcher - Desktop Application

The desktop application, AYON launcher, is the base application that should be installed locally on the artist's workstation. It is self-contained (frozen) software that includes all the required dependencies to run itself.

The AYON launcher contains the logic for connecting to the AYON server and distribution of addons, dependency packages and different versions of AYON launcher. Distribution is based on bundles that are set on server.

### Install

You can install AYON launcher on individual workstations the same way as any other software. When you create your build, you will end up with an installation package for the platform that was used for the build.

- Windows: `AYON-1.0.0-win-setup.exe`
- Linux: `AYON-1.0.0-linux.tar.gz`
- Mac: `AYON-1.0.0-Installer.dmg`
 
:::info Future Plan
The AYON launcher will be downloadable from the server. The python dependencies will be reduced to a minimum, all other dependencies will be installed from the server based on enabled addons. This already happens, but it is not possible to add binary dependent python module.
:::

At this moment we don't have installers available to download. Please take a look at [AYON launcher README](https://github.com/ynput/ayon-launcher/blob/develop/README.md) for more details how to create binaries to distribute.

## Distribution

Installed AYON launcher is entrypoint to addons and dependency packages. Based on server bundle can download additional integrations called "addons". Each addon on the server may also have a codebase to be used in the desktop application. Addons in the desktop application can add features such as DCC integrations, integration for services, enhanced publish plugins, helper tools, etc.

Each addon may require python dependency that is not available in AYON launcher, to supply the dependency a dependency package must be created. Dependency package contains additional python dependencies required by addon, the package can be created for specific bundle using [AYON Dependencies tool](https://github.com/ynput/ayon-dependencies-tool).

This distribution is automated and happens when the AYON launcher is starting. When an artist is running the `tray`, it is periodically checked for new updates. Addons distribution requires downloading, validating, and extracting to the user's machine to be able to use them.

Addons are distributed to local data on the machine, locations are:
- Windows: `%LOCALAPPDATA%\Ynput\AYON\addons`
- Linux: `~/.local/share/Ynput/AYON/addons`
- Mac: `~/Library/Application Support/Ynput/AYON/addons`

## Staging vs. Production

:::warning
This feature is **not yet available** in the desktop application. Only production addon versions will be used now.
:::

You can have different versions of AYON addons you want to try from production versions. That can be used to avoid disruption of your production. Set staging versions of addons on the AYON server.

You can run AYON with the `--use-staging` argument to use staging versions of addons.

:::note
Running a staging version is identified by an orange AYON icon.
:::


## AYON Versioning

AYON version control for addons and desktop applications is based on semantic versioning ([click here for more details](https://semver.org/)).

:::note
The version of the AYON Desktop Application is indicated by the variable `__version__` in the file `./openpype/version.py`.
:::

For example, AYON will consider the versions in this order: `1.0.0-nightly` < `1.0.0-nightly.1` < `1.0.0-rc.1` < `1.0.0` < `1.0.1-nightly.1` < `1.0.1` < `1.1.0` < `1.2.0` < `2.0.0`.

For studios customizing the source code of AYON, a practical approach could be to build by adding a name and a number after the PATCH and not to deploy 1.0.0 from the original AYON repository. For example, your builds will be: `1.0.0-yourstudio.1` < `1.0.0-yourstudio.2` < `1.0.1-yourstudio.1`.
