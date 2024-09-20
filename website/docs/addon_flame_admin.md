---
id: addon_flame_admin
title: Autodesk Flame
sidebar_label: Flame
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Flame_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Addon name
This addon integration is still at the **beta** stage. If you have any questions or need help, please contact us.
:::

## Introduction

Autodesk Flame is a high-end visual effects and finishing software used in the post-production industry. The AYON Flame integration allows you to seamlessly connect your AYON Server with Flame and automate publishing and loading of your project data.

Current version of the integration also supports following features:

*   **Editorial:**
    *   Publishing of clips.
    *   Vertical publishing of clips.
    *   Folder hierarchy publishing.
    *   Publishing resources with on-the-fly transcoding using presets connected to Flame's native XML presets.
*   **Loading:**
    *   Loading clips into Flame's Media Panel as Reels clips with conversion to OpenClip.
    *   Loading clips into Flame's Media Panel as Batch clips with conversion to OpenClip.


## Configuring Ayon

Before opening any task in AYON wrapped Flame, the following needs to be configured:

###

### Application addon Flame variant settings



:::info Usage of wiretap

AYON integration uses the wiretap server to pre-create Flame project attributes that match the currently selected context attributes. This ensures all required attributes are present in the Flame project before opening it in Flame.

:::



*   Ensure that the Flame executable is correctly filled in for the corresponding variant.
*   Set the required environment variables for Wiretap connection:
    *   **FLAME\_WIRETAP\_HOSTNAME** can be left empty if the Wiretap server is running on the same machine as Flame.
    *   **FLAME\_WIRETAP\_VOLUME** is usually set to _stonefs_ by default, but your setup might be different. Check your local volume names using the command:
    `/opt/Autodesk/io/<YOUR FLAME VERSION>/bin/vic -v stonefs`


*   Optionally, you can add your custom Flame scripts to the **FLAME\_SCRIPT\_DIRS** environment variable.



:::warning variant related environment variables

Make sure your variant-related environment variables point to the correct paths. Otherwise, the integration might not work as expected.

:::

*   Following are variant-related environment variables:
    *   **AYON\_FLAME\_PYTHON\_EXEC** - Flame Python executable
    *   **AYON\_FLAME\_PYTHONPATH** - Flame Python path
    *   **AYON\_WIRETAP\_TOOLS** - Path to Wiretap tools used for communication with the Wiretap server

### Flame project settings
![Ayon user login shared](assets/shotgrid/ay_user_login_shared.png)
