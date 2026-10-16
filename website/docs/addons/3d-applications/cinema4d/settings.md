---
title: Cinema4D addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Cinema4D addon with their default values: color management, creator plugins and publish validators."
addon: cinema4d
addon_repo: ayon-cinema4d
addon_version: 0.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-cinema4d/tree/0.2.0/server
  - https://help.ayon.app/en/articles/4858866-configure-cinema4d-addon
---

# Cinema4D addon settings

<AddonInfo />

The settings of the [Cinema4D addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Cinema 4D follows the global color management, using the OCIO files set in the core addon. A master switch for the whole section. |

### File rules

| Setting | Default | Description |
|---|---|---|
| Activate Host Rules | Off | Turn on the file rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

### Workfile color management

Sets the OCIO values of the workfile. They are used by **Reset Colorspace** in the AYON menu.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Apply the values below. |
| Default render space | `ACES` | The role of the working space, for example `scene_linear`. Behaves like the `OCIO_RENDER_SPACE` environment variable. |
| Default active displays | `ACES` | Colon-separated list of displays, for example `ACES:P3`. Behaves like `OCIO_ACTIVE_DISPLAYS`. |
| Default active views | `sRGB` | Colon-separated list of views, for example `sRGB:DCDM`. Behaves like `OCIO_ACTIVE_VIEWS`. |
| Thumbnails | `sRGB` | The thumbnail colorspace. |

## Create plugins

One entry for each creator: Create Render, Create Camera, Create Pointcache, Create Redshift Proxy and Create Review. The Workfile creator has no settings. Each entry has the same settings.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turn the creator on or off. |
| Product type items | None | Optional list of product types the creator can create. Each item has a **Product type** (the name) and a **Label** (how the UI shows it). |

## Publish plugins

Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

| Validator | Enabled | Optional | Active | Description |
|---|---|---|---|---|
| Validate Frame Range | On | On | On | The publish frame range matches the AYON task. |
| Validate Resolution | On | On | On | The publish resolution matches the AYON task. |

Validate Render Relative Paths and the other publish plugins have no settings.
