---
id: addon_mochapro_artist
title: Mocha Pro Artist Docs
sidebar_label: Mocha Pro
description: AYON Mocha Pro Addon's documentations for artists.
toc_max_heading_level: 5
---

## Overview

The Mocha Pro Addon for AYON provide features to manage you Mocha Pro workfiles, load clips and
publish tracking data and shape data.

:::note
This addon supports only Mocha Pro - the standalone application, not the plugin versions for DCCs.
:::

:::note
AYON is using project notes to store it's metadata information as there is no other place. Please
be aware that it might be unusable for anything else.
:::

:::info
If you feel that AYON tools are lagging in Mocha - it takes some time to show content of the
Workfile tool, Publisher, etc. - you can help things by running `regedit` tool on Windows and
createing `Python.VentilateInterval_msec` under `Computer\HKEY_CURRENT_USER\Software\BorisFX\Mocha Pro 2024.5`. Setting this integer value there lower than default 300 - for example 30 - can help. For more information see [Mocha Pro documentation](https://borisfx.com/documentation/mocha/12.0.0/python-guide/#_optimizing_threaded_python_in_mocha).

:::


## AYON global tools

- [Work Files](artist_tools_workfiles.md)
- [Create](artist_tools_creator.md)
- [Load](artist_tools_loader.md)
- [Manage (Inventory)](artist_tools_inventory.md)
- [Publish](artist_tools_publisher.md)
- [Library Loader](artist_tools_library_loader.md)

### Addon Features

### Loading Clips

You can load any published image or sequence data into Mocha using two types of loaders in the
[Loader](artist_tools_loader.md) tool:

- **Load Trackable Clip**: This loader is used to load and manage default trackable clip in Mocha.
    Mocha project can have only one trackable clip so this loader will re-link sources for this clip
    whenever used - there will always be just a one clip and any loading will just replace it's source.
- **Load Clip**: This will load data as *detached clip* that can be used in Mocha.


### Publishing

#### Publishing Tracking Points

You can publish your tracks using *Track points* creator. There you can set what layers should be used (selected or all), what exporters to use and various exporter options. You can set as many exporter as you want, their output will be published within one version. In AYON settings, you can select preferred
exporters that will be pre-selected whenever you create *Track points* product.

#### Publish Shape Data

Publishing of shape data is very similar to Track points. Just select your layers, and exporters.
