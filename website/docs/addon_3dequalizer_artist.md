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

## AYON global tools

- [Work Files](artist_tools_workfiles)
- [Create](artist_tools_creator)
- [Load](artist_tools_loader)
- [Manage (Inventory)](artist_tools_inventory)
- [Publish](artist_tools_publisher)
- [Library Loader](artist_tools_library_loader)


## Overview

3DEqualizer (3DE) Addon allows you to manage your 3DE projects, load plates as cameras and publishing of scripts for Nuke and Maya with Lens Distortion node for Nuke.

### Loading plates

You can load image data into 3DE by using [Loader]((artist_tools_loader)) tool. Go to ```AYON``` menu in 3DE, select ```Load``` and pick your image sequence you want yo use. This will create new sequence camera, set the path for the image sequence and set correct frame range. From that moment loaded sequence is version tracked, you can follow used versions in [Manage tool](artist_tools_inventory).

:::note
AYON is using **Project Notes** to store some of its infomations for version tracking. If you want to use them, please, do not modify content of ```AYON_CONTEXT:: ... ::AYON_CONTEXT``` block as it will probably break version management of loaded image sequences.
:::

### Publishing Matchmove scripts
 
Once you track your camera in 3DE, you can export it and publish it as version for Maya and/or Nuke. Just go to ```AYON``` menu in 3DE, click on [Publish](artist_tools_publisher). You can create ```Match Move``` publishing instance. There, you can set bunch of settings:

- Select which camera mode to publish with the setting (**Camera(s) to publish**). You can select either *All Cameras*, *Current Camera* (active), *Reference Cameras* (for all reference cameras) and *Sequence Cameras*.

There is also selection for model export - you can either select *All 3D Models* or no models.

You can also decide if you want to publish script for Maya, or Nuke or both.

You can also set some following options (not all might be available in your 3DE version):

- **Hide Reference Frame**
- **Export UV Textures**
- **Overscan Width percent**
- **Overscan Height percent**
- **Units** ("mm", "cm", "m", "in", "ft", "yd")
- **Export Point Sets**
- **Export 2.5D Points**

For more reference see options on 3DE export scripts.


:::note
AYON is using in-built export scripts in 3DE to do export but it is using mostly default options. In 3DE v7 the scripts for Maya will be exported as **MEL** and in v8 as **Python**.
:::

### Publishing Lens Distortion for Nuke

In similar fashion as with Matchmove scripts you can export and publish Lens Distortion node for Nuke. This is using [LDPK](https://www.3dequalizer.com/?site=tech_docs&id=110216_01) in Nuke.

:::note
Lens Distortion data will be published for current (active) camera.
:::

You can select FOV mode (there is new one in 3DE v8).
