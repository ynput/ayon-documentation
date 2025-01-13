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

Once you launch **Cinema4D** via AYON Launcher, an AYON Menu will be present in the menu header which is a clear indication of running **Cinema4D** in AYON context.

This AYON Menu provides access to AYON's tools for workfiles, loading and managing content and publishing (exporting) from your Cinema4D workfile.

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

- Reset Frame Range: Set the Cinema4D timeline frame range and FPS as defined on the current task in AYON.
- Reset Scene Resolution: Set the render resolution as defined on the current task in AYON.
- Reset Colorspace: Set the OCIO conifg as defined on the current task in AYON.

### Pipeline Tools

This section is dedicated to Pipeline tools. 
It can contain AYON tools built specifically for cinema4D or generic AYON experimental tools.

## Publishing Products
### Publish workflow

Using the Creator you can define reusable _instances_ in the scene that define
what to export. They also store the attributes and settings used to export. 
This way you don't need to define each time what to publish, but once set up 
you can consistently generate published products from your workfile for all 
outputs at once.

### Available Products to publish

- Camera: Camera cached to alembic.
- Pointcache: Alembic export.
- Workfile: A publish of your workfile.

## Loading Products
### Loading workflow

Using the loader you can load available publishes in AYON into Cinema4D. The
loaded containers will be _managed_. This means that AYON will remain aware
of the loaded content and allows you to update their versions easily.

For example, you can load an Alembic pointcache product, continue your work
on it - including making them editable (_Cinema4D shortcut 'C'_) - and update the
loaded versions via the inventory.

### Available Loaders

You can current load:
- Cameras
- Pointcaches (Alembic)
- XRef

## FAQ

- Unable to see the AYON menu when launching Cinema4D? See [Cinema4D admin section](addon_cinema4d_admin.md).
- Having issues with the Redshift Render View having odd scaling?  See [Cinema4D admin section](addon_cinema4d_admin.md).