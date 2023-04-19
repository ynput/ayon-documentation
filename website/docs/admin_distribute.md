---
id: admin_distribute
title: Distribute
sidebar_label: Distribute
---

To enable your artists to use the AYON pipeline, you need to distribute the desktop application with frozen executables to them.

## AYON Desktop Application

The AYON desktop application is the base application that should be installed locally on the artist's workstation. It is self-contained (frozen) software that includes all the required dependencies to run. At the moment, the desktop application is what OpenPype uses as the main application.

The desktop application contains the logic for connecting to the AYON server with the login UI. The distribution is manual.

:::info
**Future Plan:** The desktop application will be downloadable from the server, and updates will happen automatically. The dependencies will be reduced to a minimum, and the missing dependencies will be installed from the server based on enabled addons.
:::

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
The version of the AYON Desktop Application is indicated by the variable `__version__` in the file `.\openpype\version.py`.
:::

For example, AYON will consider the versions in this order: `1.0.0-nightly` < `1.0.0-nightly.1` < `1.0.0-rc.1` < `1.0.0` < `1.0.1-nightly.1` < `1.0.1` < `1.1.0` < `1.2.0` < `2.0.0`.

For studios customizing the source code of AYON, a practical approach could be to build by adding a name and a number after the PATCH and not to deploy 1.0.0 from the original AYON repository. For example, your builds will be: `1.0.0-yourstudio.1` < `1.0.0-yourstudio.2` < `1.0.1-yourstudio.1`.
