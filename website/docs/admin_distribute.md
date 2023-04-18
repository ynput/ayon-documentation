---
id: admin_distribute
title: Distribute
sidebar_label: Distribute
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To let your artists use AYON pipeline, you'll need to distribute desktop application with frozen executables to them.

### AYON Desktop application

This is the base application that should be installed locally on artist workstation. It is self-contained (frozen) software that also includes all required dependencies to run. At this moment is desktop application what OpenPype used as main application.

Desktop application contains logic for connection to AYON server with login UI. Distribution is manual.

:::info
**Future plan:** Desktop application will be downloadable from server, and updates should happen automatically. Dependencies will be reduced to minimum, and missing dependencies will be installed from server based on enabled addons.
:::

### AYON Addons

Secondary distribution consist of addons. Each addon on server may also have a codebase to be used in desktop application. Addons in desktop application may add features like DCC integrations, integration for a services, enhanced publish plugins, helper tools etc.

This distribution is automated and happens when desktop application is starting. When artist have running `tray`, it is also periodically checked for new updates. Addons distribution require to be downloaded, validated and extracted to user's machine to be able to use them.

Addons are distributed to local data on machine, locations are:
- Windows: `%LOCALAPPDATA%\ynput\ayon\addons`
- Linux: `~/.local/share/ynput/ayon/addons`
- Mac: `~/Library/Application Support/ynput/ayon/addons`

### Staging vs. Production
:::warning
This feature is **not yet available** in desktop application. Only production addon versions will be used now.
:::

You can have different versions of AYON addons you want to try from production versions. That can be used to avoid disruption of your production. Set staging versions of addons on AYON server.

You can run AYON with `--use-staging` argument to use staging versions of addons.

:::note
Running staging version is identified by orange AYON icon.
:::

### AYON versioning

AYON version control for addons and desktop application is based on semantic versioning ([Look here more details](https://semver.org/)).

:::note
The version of AYON Desktop application is indicated by the variable `__version__` in the file `.\openpype\version.py`.
:::

For example AYON will consider the versions in this order: `1.0.0-nightly` < `1.0.0-nightly.1` < `1.0.0-rc.1` < `1.0.0` < `1.0.1-nightly.1` <`1.0.1` < `1.1.0` < `1.2.0` < `2.0.0`.

For studios customizing the source code of AYON, a practical approach could be to build by adding a name and a number after the PATCH and not to deploy 1.0.0 from original AYON repository. For example, your builds will be: `1.0.0-yourstudio.1` < `1.0.0-yourstudio.2` < `1.0.1-yourstudio.1`.
