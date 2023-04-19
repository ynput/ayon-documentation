---
title: Getting started with AYON
sidebar_label: Getting started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Installation

AYON comes in packages for Windows (10 or Server), Mac OS X (Mojave or higher), and Linux distribution (Centos, Ubuntu).

Your studio administrator should provide you with an installation file. If you are testing or working by yourself, you can also grab installation files from the releases; https://github.com/ynput/OpenPype/releases

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

![Windows installation](assets/install_01.png)

and create an icon on the desktop.

![Windows create icon](assets/install_02.png)

</TabItem>


<TabItem value='linux'>

For installation on your Linux distribution, download and unzip `AYON-#.#.#.zip`. A new folder `AYON-#.#.#` will be created.
Inside this folder find and run `ayon_gui`,

![Linux launch](assets/install_03.png)

</TabItem>


<TabItem value='mac'>

For installation on Mac OS X, download and run dmg image file `AYON-#.#.#.dmg`.

Drag the OpenPype icon into the Application folder.

![Mac installation](assets/install_04.png)

After the installation, you can find AYON among the other Applications.

</TabItem>
</Tabs>
:::


## Working in the studio

In studio environment you should have AYON already installed and deployed,  so you can start using it without much setup. Your admin has probably put AYON icon on your desktop or even had your computer set up so AYON will start automatically.

If this is not the case, please contact your administrator to consult on how to launch AYON in your studio.

## Working from home

If you are working from home though, you'll need to install it yourself. You should, however, receive the AYON installer files from your studio
administrator, because AYON versions and executables might not be compatible between studios.  

Installing AYON is possible by using the Installer or by unzipping downloaded ZIP archive to any drive location.

:::tip Using the AYON Installer
See the [Installation section](artist_install.md) for more information on how to use the AYON Installer
:::

You can run AYON by desktop "P" icon (if it exists after installing) or by directly executing **ayon_gui.exe** located in the AYON installation folder. This executable being suitable **for artists**, or alternatively by **ayon_console.exe** which is more suitable for **TDs/Admin** for debugging and error reporting. The later runs with a console window where all the necessary info will appear during user's work session.

:::tip Is AYON running?
AYON runs in the operating system's tray. If you see a green AYON icon in the tray you can easily tell AYON is currently running. Keep in mind that on Windows this icon might be hidden by default, in which case, the artist can simply drag the icon down to the tray.

![Systray](assets/artist_systray.png)
:::

## First Launch

When you first start AYON, you will be asked to fill in some basic information.

![login](assets/artist_login.png)

### AYON Server URL

You should have been supplied with AYON server url from your studio administrator. The URL looks something like; `https://ayon.dev/`.

The `Username` and `Password` should also come from your studio administrator.

### AYON Version Repository

Sometimes your Studio might also ask you to fill in the path to its version repository. This is a location where AYON will search for the latest versions, check if it's up to date and where updates are installed from automatically.

This path is usually taken from the database directly, so you shouldn't need it.

## Updates

If you're connected to your Studio, AYON will check for, and install updates automatically every time you run it. That's why during the first start it can go through a quick update installation process, even though you might have just installed it.

## Advanced Usage

For more advanced use of AYON commands please visit [Admin section](admin_ayon_commands.md).
