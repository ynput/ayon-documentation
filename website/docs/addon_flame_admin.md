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

## Publish plugins

### Collect Timeline Instances

The plugin collects timeline instances from the current timeline and publishes them to the AYON Server. It supports mapping attributes and presets for distributing sets of tasks to the final published Shot hierarchies.

:::warning Add Task

This feature is currently under this plugin, but we plan to separate it in the future. It is marked as experimental and not production-ready.

:::

* **XML Presets Attributes Parsable from Segment Comments** - This option allows you to define which comment tokens should be temporarily assigned to a timeline item. This helps the integration get the correct values for the Shot folder attributes. It does not affect any existing comments in the timeline segments.

*  **Add Tasks** - Any tasks added to this option will be distributed into the final hierarchy of published Shot folders. Task presets also support assigning Batchgroup creation (experimental feature).

### Extract Product Resources

Plugin is responsible for extracting resources from the selected timeline instances and publishing them to the AYON Server. Plugin supports adding custom presets for transcoding resources on-the-fly via linking native Flame XML presets.

* **Publish clip's original media**
* **Export presets mapping**

#### Export presets

Preset's properties are divided into sections related to the output file, linking XML presets, transcoding representation settings, and after-publish loading settings.

:::info Preset properties
Thumbnail preset is hardcoded into plugin and is always added to the set of exports. It could be overridden by adding custom preset with the same name **thumbnail**.
:::

*   **Name** - Used to identify the preset. It can also be part of the output file name via the `outputName` anatomy template token. It serves as a unique representation name.
*   **Is active** - If the preset is active, it will be used during the export process.
*   **Activate by search pattern** - If the clip's media resource path matches the input regex pattern, the preset will be used.
*   **Output extension** - The output file extension for the published representation.
*   **Output color (imageio)** - Specifies the colorspace data to be stored in the representation. This is used downstream in the publishing process or by loading plugins.
*   **Export clip type** - The type of XML preset to be used for export.
*   **XML preset directory** - The absolute directory path where the XML preset is stored. If left empty, built-in directories are used, either shared or installed presets folder.
*   **XML preset file (with ext)** - The name of the XML preset file with its extension.
*   **Distribute parsed comment attributes to XML preset** - If enabled, previously collected clip comment attributes will be distributed to the XML preset. This can affect the resulting resolution of the exported media.
*   **Add range to representation name** - Adds frame range-related attributes to the publishing representation data for downstream use in the publishing process.
*   **Representation tags** - Adds tags to the representation data for downstream use in the publishing process. For example, marking the representation as reviewable.
*   **Load to batch group reel** - If enabled, the representation will be loaded to the batch group reel after publishing (connected to IntegrateBatchGroup).
*   **Use loader name** - Defines which loader plugin should be used for loading the representation after publishing (connected to IntegrateBatchGroup).