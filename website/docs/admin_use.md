---
id: admin_use
title: Install and Run 
sidebar_label: Install & Run
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Install

You can install AYON on individual workstations the same way as any other software. 
When you create you build, you will end up with an installation package for the platform that was used for the build.

- Windows: `ayon-3.0.0.msi`
- Linux: `ayon-3.0.0.zip`
- Mac: `ayon-3.0.0.dmg`

After ayon is installed, it will ask the user for further installation if it detects a newer version in the studio update location.

## Run AYON

To use AYON on a workstation simply run the executable that was installed.
On the first run the user will be prompted to for AYON Mongo URL. 
This piece of information needs to be provided to the artist by the admin setting up AYON in the studio.

Once artist enters the Mongo URL address, AYON will remember the connection for the next launch, so it is a one time process.From that moment ayon will do it's best to always keep up to date with the latest studio updates. 

If the launch was successful, the artist should see a green AYON logo in their tray menu. Keep in mind that on Windows this icon might be hidden by default, in which case, the artist can simply drag the icon down to the tray.

You can use following command line arguments:

`--use-version` - to specify version you want to run explicitly, like:
```shell
ayon_console --use-version=3.0.1
```

`--use-staging` - to specify you prefer staging version. In that case it will be used
(if found) instead of production one.

:::tip List available versions
To list all available versions, use:

```shell
ayon_console --list-versions
```

You can add `--use-staging` to list staging versions.
:::

If you want to validate integrity of some available version, you can use:

```shell
ayon_console --validate-version=3.3.0
```

This will go through the version and validate file content against sha 256 hashes
stored in `checksums` file.

:::tip Headless mode
Add `--headless` to run ayon without graphical UI (useful on server or on automated tasks, etc.)
:::

`--verbose` `<level>` - change log verbose level of AYON loggers.

Level value can be integer in range `0-50` or one of enum strings `"notset" (0)`, `"debug" (10)`, `"info" (20)`, `"warning" (30)`, `"error" (40)`, `"ciritcal" (50)`. Value is stored to `ayon_LOG_LEVEL` environment variable for next processes.

```shell
ayon_console --verbose debug
```

`--debug` - set debug flag affects logging

Enable debug flag for ayon process. Change value of environment variable `ayon_DEBUG` to `"1"`. At this moment affects only ayon loggers. Argument `--verbose` or environment variable `ayon_LOG_LEVEL` are used in preference to affect log level.

```shell
ayon_console --debug
```

### Details
When you run AYON from executable, few check are made: 

#### Check for mongoDB database connection
MongoDB connection string is in format:
```shell
mongodb[+srv]://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]
```
More on that in [MongoDB documentation](https://docs.mongodb.com/manual/reference/connection-string/).

Example connection strings are `mongodb://local-unprotected-server:2707` or
`mongodb+srv://user:superpassword:some.mongodb-hosted-on.net:27072`.

When you start AYON first time, Igniter UI will show up and ask you for this string. It will then save it in secure way to your systems keyring - on Windows it is **Credential Manager**, on MacOS it will use its
**Keychain**, on Linux it can be **GNOME Keyring** or other software, depending on your distribution.

This can be also set beforehand with environment variable `AYON_MONGO`. If set it takes precedence over the one set in keyring.

:::tip Minimal permissions for DB user
- `readWrite` role to `ayon` and `avalon` databases
- `find` permission on `ayon`, `avalon` and `local`
  
#### Check for ayon version path
When connection to MongoDB is made, AYON will get various settings from there - one among them is directory location where ayon versions are stored. If this directory exists ayon tries to find the latest version there and if succeed it will copy it to user system and use it.

This path can be set is ayon settings, but also with environment variable `AYON_PATH` or with
`AYONPath` in json file located application directory depending on your system.

- Windows: `%LOCALAPPDATA%\ynput\ayon`
- Linux: `~/.local/share/ynput/ayon`
- Mac: `~/Library/Application Support/ynput/ayon`

### Runtime provided environment variables
ayon is providing following environment variables for its subprocesses that can be used in various places, like scripting, etc.

- `AYON_ROOT` - this will point to currently running code. 
- `AYON_VERSION` - string of current version - like `3.0.0-foo+bar`
- `AYON_REPOS_ROOT` - this is path where all components can be find (like Avalon Core and ayon)
- `AYON_DATABASE_NAME` - database name in MongoDB used by AYON
- `AYON_EXECUTABLE` - path to executable used to run AYON - when run from sources it will point
to **python** stored in virtual environment. If run from frozen code, it will point to either `ayon_gui` or
  `ayon_console`.