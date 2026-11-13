---
title: Fusion addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Fusion addon with their default values: color management, local Fusion profile, hooks, Saver creators and local rendering."
addon: fusion
addon_repo: ayon-fusion
addon_version: 0.4.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-fusion/tree/0.4.3/server
  - https://help.ayon.app/en/articles/9576605-fusion-addon-settings
---

# Fusion addon settings

<AddonInfo />

The settings of the [Fusion addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The addon has no settings for its validators: which validators are optional is fixed (see the [validator table](index.md#validators)).

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch of AYON's color management in Fusion. |
| File Rules > Activate Host Rules | Off | Turn on the file rules of this host. |
| File Rules > Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Local Fusion profile settings

| Setting | Default | Description |
|---|---|---|
| Local Fusion profile directory | `~/.openpype/hosts/fusion/profiles` | Folder that holds the Fusion profile used for AYON launches. It may be left empty. |
| Copy profile on first launch | Off | On the first launch, copy the contents of the existing Fusion profile into that folder. |
| Resync profile on each launch | Off | Copy the profile again on every launch, even when the folder already exists. |

## Hooks

| Setting | Default | Description |
|---|---|---|
| Set AYON Fusion MasterPrefs | **Set AYON master prefs (override)** (`set`) | How the AYON MasterPrefs file is applied. It sets the `Config:` path map to include `$(AYON_FUSION_ROOT)/deploy/ayon` and forces Python 3. The options are `set` (override), `append` (AYON preference is strongest), `prepend` (AYON preference is weakest) and `do-not-set`. When the AYON preferences are weaker than other MasterPrefs or are not set, the administrator must make sure the path map still points to AYON. |
| Install PySide2 > Enabled | On | Install a Qt binding into the Python of Fusion when none is found. |
| Launch AYON Menu on Fusion Start > Enabled | Off | Open the AYON window when Fusion starts. Supported for Fusion 18 and newer. |

## Creator plugins

### Create Saver

Creator for the `render` product base type (image sequence).

| Setting | Default | Description |
|---|---|---|
| Temporary rendering path template | `{workdir}/renders/fusion/{product[name]}/{product[name]}.{frame}.{ext}` | Where the Saver writes its files while rendering. |
| Default variants | `Main`, `Mask` | The variants offered by default. |
| Instance attributes | `reviewable`, `farm_rendering` | **Reviewable** makes new instances reviewable by default. **Farm rendering** adds **Farm rendering** to the render targets of the creator. |
| Output Image Format | `exr` | One of `exr`, `tga`, `tif`, `png`, `jpg` and `dpx`. |
| Default Render Target | `local` | `local` (local machine rendering), `frames` (use existing frames) or `farm` (farm rendering). |
| Default frame range source | `current_context` | `current_context`, `render_range` (from render in/out), `comp_range` (from composition timeline) or `custom_range`. |
| Product type items | None | Optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. |

### Create Image Saver

Creator for the `image` product base type (single image). It has the same settings as Create Saver, except that **Default frame range source** is replaced by:

| Setting | Default | Description |
|---|---|---|
| Default rendered frame | 0 | The frame that new image instances render. |

Its **Temporary rendering path template** default is `{workdir}/renders/fusion/{product[name]}/{product[name]}.{ext}`, without a frame number.

## Publish plugins

### Render Local

| Setting | Default | Description |
|---|---|---|
| Suppress Fusion dialogs | On | Suppress the Fusion *Render Completed* and *Render Failed* dialogs. |
