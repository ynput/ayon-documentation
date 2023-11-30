---
title: Getting started with AYON
sidebar_label: Getting started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Installation

AYON comes in packages for Windows (10 or Server), Mac OS X (Mojave or higher), and Linux distribution (Centos, Ubuntu).

In AYON you can download the installer from within the website:
![A screenshot of the AYON main menu with the "Download Launcher" menu expanded](assets/ayon_download_installer.png)

A "Download Launcher" blue button should be present, which provides a binary for the Operating System you are accessing the webistes, alternatively you can download a specific binary from the dropdown in the main menu.

If you are testing or working by yourself, you can also grab installation files from the releases: https://github.com/ynput/ayon-launcher/releases

:::important
To install AYON you will need administrator permissions.
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
Inside this folder find and run `ayon_gui`,

![A screenshot of the list of the contents of the AYON Linux zip](assets/ayon_install_linux.png)

</TabItem>


<TabItem value='mac'>

For installation on Mac OS X, download and run dmg image file `AYON-#.#.#.dmg`.

Drag the OpenPype icon into the Application folder.

![A screenshot of the Mac Installation dialog with the Applications and AYON install logo](assets/ayon_install_macos.png)

After the installation, you can find AYON among the other Applications.

</TabItem>
</Tabs>
:::


## Working in the studio

In studio environment you should have AYON already installed and deployed, so you can start using it without much setup. Your admin has probably put AYON icon on your desktop or even had your computer set up so AYON will start automatically.

If this is not the case, please contact your administrator to consult on how to launch AYON in your studio.

## Working from home

If you are working from home though, you'll need to install it yourself. You should, however, receive the AYON installer files from your studio
administrator, because AYON versions and executables might not be compatible between studios.  

Installing AYON is possible by using the Installer or by unzipping downloaded ZIP archive to any drive location.

:::tip Using the AYON Installer
See the [Installation section](#installation) for more information on how to use the AYON Installer
:::

You can run AYON by desktop "P" icon (if it exists after installing) or by directly executing **ayon_gui.exe** located in the AYON installation folder. This executable being suitable **for artists**, or alternatively by **ayon_console.exe** which is more suitable for **TDs/Admin** for debugging and error reporting. The later runs with a console window where all the necessary info will appear during user's work session.

:::tip Is AYON running?
AYON runs in the operating system's tray. If you see a green AYON icon in the tray you can easily tell AYON is currently running. Keep in mind that on Windows this icon might be hidden by default, in which case, the artist can simply drag the icon down to the tray.

![A screenshot of the Windows System Tray showing the AYON icon](assets/artist_systray.png)
:::

:::tip Icon not showing on Linux
Some Linux distributions do not ship with tray icons by defaults, mostly GNOME based, to get the icon, install the following extension: [Appindicator Support for GNOME Shell](https://extensions.gnome.org/extension/615/appindicator-support/)
:::

## First Launch

When you first start AYON, you will be asked to fill in some basic information.

![A screenshot of the AYON login dialog](assets/artist_login.png)

### AYON Login Details

Your Studio should provide you with the AYON `url`, `username` and `password` to fill in the dialog.

:::tip Example details
URL: `https://ayon.dev/`
username: `johndoe`
password: `v3ry53cur3p455w0rd`
:::

If you want to try AYON and don't have a server, you can set up an account over at [AYON Cloud](https://ayon.cloud/).


## Updates

AYON updates automatically, based on your studio server, every time you launch it; that why on first time launch it might do a new installation, if your Studio is using a more recent version.on process, even though you might have just installed it.

## Advanced Usage

For more advanced use of AYON commands please visit [Admin section](admin_desktop_run.md#commands).
