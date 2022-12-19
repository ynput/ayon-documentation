---
id: artist_install
title: Installation 
sidebar_label: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@th

## Installation

AYON comes in packages for Windows (10 or Server), Mac OS X (Mojave or higher), and Linux distribution (Centos, Ubuntu), and you can install them on your machine the same way as you are used to. 

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

For installation on Windows, download and run the executable file `ayon-3.0.0.exe`.
During the installation process, you can change the destination location path of the application, 

![Windows installation](assets/install_01.png)

and create an icon on the desktop.

![Windows create icon](assets/install_02.png)

</TabItem>


<TabItem value='linux'>

For installation on your Linux distribution, download and unzip `ayon-3.0.0.zip`. A new folder `ayon-3.0.0` will be created.
Inside this folder find and run `ayon_gui`,

![Linux launch](assets/install_03.png)

</TabItem>


<TabItem value='mac'>

For installation on Mac OS X, download and run dmg image file `ayon-3.0.0.dmg`. 

Drag the AYON icon into the Application folder.

![Mac installation](assets/install_04.png)

After the installation, you can find AYON among the other Applications. 

</TabItem>
</Tabs>
:::

## Run AYON

To run AYON click on the icon or find executable file (e.g. `C:\Program Files (x86)\ayon\ayon_gui.exe`) in the application location. 
On the very first run of AYON the user will be asked for AYON Mongo URL. 
This piece of information will be provided by the administrator or project manager who set up the studio.

![Mongo example](assets/install_05.png)

Once the Mongo URL address is entered, press `Start`, and AYON will be initiated. 
AYON will also remember the connection for the next launch, so it is a one-time process. 

:::note
If the launch was successful, the artist should see a turquoise AYON logo in their
tray menu. Keep in mind that on Windows this icon might be hidden by default, in which case, the artist can simply drag the icon down to the tray.

![Systray](assets/artist_systray.png)
:::