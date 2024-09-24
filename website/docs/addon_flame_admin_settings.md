---
id: addon_flame_admin_settings
title: Flame Admin Settings
sidebar_label: Settings
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