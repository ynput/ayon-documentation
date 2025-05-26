---
id: artist_getting_started
title: Getting started with AYON
sidebar_label: Getting started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Intro

AYON Launcher is your starting point for working within the AYON studio platform.

## Working in the Studio

Make sure AYON is installed and set up in your studio environment for immediate use. Your admin likely placed the AYON icon on your desktop or set your system to launch AYON on startup.

![AYON Launcher Icon](assets/ayon_launcher_icon.png)

If not, contact your administrator for help with deploying AYON in your studio.

## Working Remotely

If you're working remotely, like from home, you'll need to install the AYON Launcher yourself. You can download the AYON Launcher Installer from the AYON webUI.

:::tip
Check the [Installation section](#installation) for details on downloading and installing the AYON Launcher yourself.
:::

## Installation

**AYON Launcher** and its installation files are available for all major operating systems: **Windows** 10 (Server, WIN 11 and newer), **macOS** (Mojave or later), and **Linux** distributions (Rocky Linux, Ubuntu, and formerly CentOS).

Once logged into `AYON Server`, you'll find a `Download Launcher` button at the top right of the webUI. This provides a binary for the operating system you're using to access the server. Alternatively, clicking `Download Launcher` in the user menu redirects you to the `Downloads Tab`, where you can choose a specific binary version.

| Download Launcher Buttons |
|--|
| ![A screenshot of the AYON main menu with the "Download Launcher" menu expanded](assets/ayon_download_installer.png) |

| Downloads Tab |
|--|
| ![](assets/launcher/artist/launchers_download_tab.png) |

:::info
You can also get AYON installation files directly from Github [ayon-launcher releases](https://github.com/ynput/ayon-launcher/releases). However, it's best to use the version specified by your administrator to avoid compatibility issues.
:::

:::important User Permissions
To install **AYON** on your machine you will need **admin user account rights** to do so.
:::

:::note pick your platform
<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux', value: 'linux'},
        {label: 'Mac OS X', value: 'mac'},
    ]}>

<TabItem value='win'>

For installation on Windows, download and run the installation file `AYON-#.#.#.exe`.
During the installation process, you can change the destination location path of the application,

![A screenshot of a Windows installation dialog where the person can choose where to install AYON](assets/ayon_install_windows_01.png)

and create an icon on the desktop.

![A screenshot of a Windows installation dialog where the person can choose to install AYON add the AYON shortcut to their desktop](assets/ayon_install_windows_02.png)

</TabItem>

<TabItem value='linux'>

For installation on your Linux distribution, download and unzip `AYON-#.#.#.zip`. A new folder `AYON-#.#.#` will be created.
Inside this folder find and run `ayon`.

![A screenshot of the list of the contents of the AYON Linux zip](assets/ayon_install_linux.png)

</TabItem>

<TabItem value='mac'>

For installation on Mac OS X, download and run dmg image file `AYON-#.#.#.dmg`.

Drag the `AYON` icon into the Application folder.

![A screenshot of the Mac Installation dialog with the Applications and AYON install logo](assets/ayon_install_macos.png)

After the installation, you can find AYON among the other Applications.

</TabItem>
</Tabs>
:::


## Run AYON Launcher

On Windows, You can run AYON by desktop "AYON" green triangle icon (if it exists after installing) or by directly executing **ayon.exe** located in the AYON installation folder. This executable being suitable **for artists**, or alternatively by **ayon_console.exe** which is more suitable for **TDs/Admin** for debugging and error reporting. The later runs with a console window where all the necessary info will appear during user's work session.

For Linux and Mac OS, execute **ayon** located in the AYON installation folder.

:::tip Is AYON running?
AYON runs in the operating system's tray. If you see a green AYON icon in the tray you can easily tell AYON is currently running. Keep in mind that on Windows this icon might be hidden by default, in which case, the artist can simply drag the icon down to the tray.
:::

![A screenshot of the Windows System Tray showing the AYON icon](assets/artist_systray.png)

:::tip Linux / missing AYON icon
Some Linux distributions do not ship with tray icons by defaults, mostly GNOME based, to get the icon, install the following extension: [Appindicator Support for GNOME Shell](https://extensions.gnome.org/extension/615/appindicator-support/)
:::

## First Launch

Upon launching AYON, you'll be prompted to enter your credentials to login to the AYON server and its URL.

![A screenshot of the AYON login dialog](assets/launcher/artist/login_window.png)

### AYON Login Details

Your Studio should provide you with the AYON `url`, `username` and `password` to fill in the dialog.

:::info
The server URL should start with `https://` or `http://`.
:::

:::tip Example
URL: `https://mystudio.ayon.app/`
username: `johndoe`
password: `v3ry53cur3p455w0rd`
:::


## Updates

**AYON** updates automatically, based on your studio server every time you start AYON Launcher on your machine. Upon initial launch, the software may perform a fresh installation to ensure compatibility with the latest version of Studio, even if you recently installed it.

## Launcher Usage

For more information about usage of **AYON Launcher** app, like learning about the tray menu actions and running with console, staging, or develop mode, please check the next sections launcher [Basic Usage](ayon_launcher_artist_basic.md) and [Advanced Usage](ayon_launcher_artist_advanced.md).
For further information, please visit [Admin section](ayon_launcher_admin.md).
