---
id: addon_flame_admin_get_started
title: Flame Admin Get Started
sidebar_label: Get Started
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Flame_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Before opening any task in AYON wrapped Flame, the following needs to be configured:

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
