---
id: addon_cinema4d_artist
title: Cinema4D Artist Docs
sidebar_label: Cinema4D
description: AYON Cinema4D Addon's documentations for artists.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Cinema4d_Badge}
</ReactMarkdown>


## Working with AYON in Cinema4D

The AYON Cinema4D integration addon allows you to manage your Cinema4D workfiles, load versioned content and manage it all nicely directly within the AYON ecosystem and easily produce predictable caches back out for easy loading into other integrations in the AYON ecosystem.

## Addon Features

### AYON Menu

Once you launch **Cinema4D** via AYON Launcher, you will be introduced to AYON Menu present in the menu header which is also a clear indication of running **Cinema4D** in AYON context.

AYON Menu provides access to AYON global tools as well as some workfile actions and pipeline tools.

<div class="row markdown">
<div class="col">

- **AYON Global Tools**
  - [Work Files](artist_tools_workfiles.md)
  - [Create](artist_tools_creator.md)
  - [Load](artist_tools_loader.md)
  - [Manage (Inventory)](artist_tools_inventory.md)
  - [Publish](artist_tools_publisher.md)
  - [Library Loader](artist_tools_library_loader.md)
- **Workfile actions**
  - Build Workfile
  - Reset Frame Range
  - Reset Scene Resolution
  - Reset Colorspace
- **Pipeline Tools**
  - Experimental Tools

</div>
<div class="col">

![](assets/cinema4d/artist/AYON_menu.png)

</div>
</div>

### AYON Global Tools

These are the standard AYON core tools in tandem with the Integrations.

### Workfile Actions

They are used to set scene data.

TODO: Add more info about the available workfile actions.

### Pipeline Tools

This section is dedicated to Pipeline tools. 
It can contain AYON tools built specifically for cinema4D or generic AYON experimental tools.

## Publishing Products
### Publish workflow

TODO: Add info about using the creator and how it affects the scene.

### Available Products to publish

TODO: Add a list of available products.

## Loading Products
### Loading workflow

TODO: Explain how the loaders add products to the scene.

### Available Loaders

TODO: Add a list of available loaders.

## FAQ

TODO: Add an questions, other wise feel free to remove the FAQ section.