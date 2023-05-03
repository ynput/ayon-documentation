---
id: admin_desktop_distribute
title: Desktop App - Distribution
sidebar_label: Desktop distribution
---

To enable your artists to use the AYON pipeline, you need to distribute the desktop application with frozen executables to them. At this moment OpenPype v3 application is used for that purpose. The installation contains executables for both OpenPype v3 and AYON (That will change on release). The application requires connection to AYON server, make sure you have set up one.

## AYON Desktop Application

The AYON desktop application is the base application that should be installed locally on the artist's workstation. It is self-contained (frozen) software that includes all the required dependencies to run. At the moment, the desktop application is what OpenPype uses as the main application.

The desktop application contains the logic for connecting to the AYON server with the login UI.

### Install

You can install desktop application on individual workstations the same way as any other software. When you create your build, you will end up with an installation package for the platform that was used for the build.

- Windows: `OpenPype-3.0.0.msi`
- Linux: `OpenPype-3.0.0.zip`
- Mac: `OpenPype-3.0.0.dmg`
 
:::info Future Plan
The desktop application will be downloadable from the server, and updates will happen automatically. The dependencies will be reduced to a minimum, and the missing dependencies will be installed from the server based on enabled addons.
:::

Prepared builds can be found on https://github.com/ynput/OpenPype/releases for all major platforms.

### Currently built on OS versions
- Windows 10
- Ubuntu 20.04
- Centos 7.6
- MacOS Mohave (10.14.6)

In case your studio requires build for different OS version, or any specific build, please take a look at
[Requirements](dev_requirements.md) and [Build](dev_build.md) for more details how to create binaries to distribute.

## AYON Addons

The secondary distribution consists of addons. Each addon on the server may also have a codebase to be used in the desktop application. Addons in the desktop application can add features such as DCC integrations, integration for services, enhanced publish plugins, helper tools, etc.

This distribution is automated and happens when the desktop application is starting. When an artist is running the `tray`, it is periodically checked for new updates. Addons distribution requires downloading, validating, and extracting to the user's machine to be able to use them.

Addons are distributed to local data on the machine, locations are:
- Windows: `%LOCALAPPDATA%\ynput\ayon\addons`
- Linux: `~/.local/share/ynput/ayon/addons`
- Mac: `~/Library/Application Support/ynput/ayon/addons`

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
