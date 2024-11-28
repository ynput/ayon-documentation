---
id: addon_3dequalizer_artist
title: 3DEqualizer Artist Docs
sidebar_label: 3DEqualizer
description: AYON 3DEqualizer Addon's documentations for artists.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Equalizer_Badge}
</ReactMarkdown>

## Overview

The 3DEqualizer (3DE) Addon lets you manage your 3DE projects, load plates as cameras, and publish scripts for Nuke and Maya with a Lens Distortion node for Nuke.

## AYON global tools

- [Work Files](artist_tools_workfiles.md)
- [Create](artist_tools_creator.md)
- [Load](artist_tools_loader.md)
- [Manage (Inventory)](artist_tools_inventory.md)
- [Publish](artist_tools_publisher.md)
- [Library Loader](artist_tools_library_loader.md)

## Addon Features

### Loading Plates

You can load image data into 3DE by using the [Loader](artist_tools_loader.md) tool. Go to the `AYON` menu in 3DE, select `Load`, and pick the image sequence you want to use. This will create a new sequence camera, set the path for the image sequence, and set the correct frame range. From that moment, the loaded sequence is version tracked. You can follow the used versions in the [Manage tool](artist_tools_inventory.md).

:::note
AYON uses **Project Notes** to store some of its information for version tracking. If you want to use them, please do not modify the content of the `AYON_CONTEXT:: ... ::AYON_CONTEXT` block, as it will probably break the version management of loaded image sequences.
:::

### Publishing Matchmove Scripts

Once you track your camera in 3DE, you can export and publish it as a version for Maya and/or Nuke. Go to the `AYON` menu in 3DE and click on [Publish](artist_tools_publisher.md). You can create a `Match Move` publishing instance and set various settings:

- **Camera(s) to Publish**: Select which camera mode to publish. Options include *All Cameras*, *Current Camera* (active), *Reference Cameras* (for all reference cameras), and *Sequence Cameras*.
- **Model Export**: Choose to export *All 3D Models* or no models.
- **Script Type**: Decide if you want to publish the script for Maya, Nuke, or both.

Additional options (availability may vary depending on your 3DE version):

- **Hide Reference Frame**
- **Export UV Textures**
- **Overscan Width Percent**
- **Overscan Height Percent**
- **Units** (options: "mm", "cm", "m", "in", "ft", "yd")
- **Export Point Sets**
- **Export 2.5D Points**

For more details, refer to the options in the 3DE export scripts.

:::info
AYON uses built-in export scripts in 3DE for exporting, mostly with default options. In 3DE v7, scripts for Maya will be exported as **MEL**, and in v8 as **Python**.
:::

### Publishing Lens Distortion for Nuke

Similar to Matchmove scripts, you can export and publish a Lens Distortion node for Nuke using [LDPK](https://www.3dequalizer.com/?site=tech_docs&id=110216_01).

:::info
Lens Distortion data will be published for the current (active) camera.
:::

You can also select the FOV mode, including the new one available in 3DE v8.
