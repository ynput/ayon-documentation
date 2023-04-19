---
id: admin_use
title: Install and Run 
sidebar_label: Install & Run
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Desktop application is what artists use to access pipeline integrations. At this moment OpenPype v3 application is used for that purpose. The installation contains executables for both OpenPype v3 and AYON. That will change before first official release. The application requires connection to AYON server, make sure you have set up one.

## Install

You can install OpenPype desktop application on individual workstations the same way as any other software. When you create your build, you will end up with an installation package for the platform that was used for the build.

- Windows: `OpenPype-3.0.0.msi`
- Linux: `OpenPype-3.0.0.zip`
- Mac: `OpenPype-3.0.0.dmg`

## Run AYON

To use AYON on a workstation simply run the executable `ayon` that was installed.

:::info
Make sure the AYON executable is used and not OpenPype's.
:::

On the first run the user will be prompted for AYON Server URL and credentials. This piece of information needs to be provided to the artist by the admin setting up AYON in the studio.

Once artist logs in, an api token is received which will AYON remember for the next launch, until token expire. From that moment AYON will do it's best to always keep up to date with the latest updates. 

If the launch was successful, the artist should see a green AYON logo in their tray menu.

:::tip
<Tabs
  groupId="platforms"
  defaultValue="win"
  values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux', value: 'linux'}
  ]}>
<TabItem value="win">
On Windows this icon might be hidden by default, in which case, the artist can simply drag the icon down to the tray.
</TabItem>
<TabItem value="linux">
Linux distributions usually don't have system tray available, and additional extensions have to be installed.
</TabItem>
</Tabs>
:::


You can use following command line arguments:

`--use-staging` - to specify you prefer staging version. In that case it will be used instead of production one.
:::warning
Staging feature is **not yet available**. Only production addon versions will be used now.
:::

:::tip Headless mode
Add `--headless` to run AYON without graphical UI (useful on server or on automated tasks, etc.)
:::

`--verbose` `<level>` - change log verbose level of AYON loggers.

Level value can be integer in range `0-50` or one of enum strings `"notset" (0)`, `"debug" (10)`, `"info" (20)`, `"warning" (30)`, `"error" (40)`, `"critical" (50)`. Value is stored to `AYON_LOG_LEVEL` environment variable for next processes.

```shell
ayon --verbose debug
```

`--debug` - set debug flag affects logging

Enable debug flag for AYON process. Change value of environment variable `AYON_DEBUG` to `"1"`. At this moment affects only AYON loggers. Argument `--verbose` or environment variable `AYON_LOG_LEVEL` are used in preference to affect log level.

```shell
ayon --debug
```

### Details
When you run AYON from executable, few check are made:

#### Check for AYON server url
Server url should start with `https://` or `http://` .

When you start AYON first time, Login UI will show up to ask you for server url and credentials. It will then save it in secure way to your systems keyring - on Windows it is **Credential Manager**, on MacOS it will use its **Keychain**, on Linux it can be **GNOME Keyring** or other software, depending on your distribution.

This can be also set beforehand with environment variable `AYON_SERVER_URL`. If set it takes precedence over the one set in keyring.

#### Check for AYON addons updates
When connection to server is made, AYON will get various information from server - one among them is updates of addons. If addons are missing or outdated the right versions are downloaded, validated and extractor to artist workstation.

### Runtime provided environment variables
AYON is providing following environment variables for its subprocesses that can be used in various places, like scripting, etc.

:::note
Some of OpenPype environment variables don't have AYON variant yet. They will be replaced and removed over time. 
:::

- `USE_AYON_SERVER` - AYON mode is enabled.
- `AYON_VERSION` - String of current desktop application version - like `3.0.0`.
- `AYON_ROOT` - Path to root of desktop application.
- `OPENPYPE_EXECUTABLE` - Path to executable used to run AYON subprocesses - points to **python** executable in virtual environment when run from sources. If run from frozen code, it will point to either `ayon` or `ayon_console`.
- `OPENPYPE_HEADLESS_MODE` - Headless mode is enabled (`"1"`).
- `OPENPYPE_USE_STAGING` - Staging mode is enabled (`"1"`).
- `OPENPYPE_LOG_LEVEL` - Logging level for AYON logger.
- `OPENPYPE_VERSION` - Variable leading to same value as `AYON_VERSION`.
- `OPENPYPE_ROOT` - Variable leading to same path as `AYON_ROOT`.
- `OPENPYPE_REPOS_ROOT` - Variable leading to same path as `AYON_ROOT`.
