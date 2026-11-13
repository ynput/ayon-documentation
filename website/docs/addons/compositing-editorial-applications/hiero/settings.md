---
title: Hiero addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Hiero addon with their default values: path mappings, color management, the Create Shot Clip creator, loaders, clip effects collection and the scripts menu."
addon: hiero
addon_repo: ayon-hiero
addon_version: 0.6.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-hiero/tree/0.6.5/server/settings
  - https://help.ayon.app/en/articles/3397387-configure-hiero-addon
---

# Hiero addon settings

<AddonInfo />

The settings of the [Hiero addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Path mappings

Cross-platform path mappings added to the Hiero project.

| Setting | Default | Description |
|---|---|---|
| Remap Anatomy Root By Default | Off | Also add the anatomy root paths as mappings. |
| Platform paths | None | A list of mappings. Each has **Platform paths** with a **Windows**, **Linux** and **MacOS** path. |

## Color management (imageio)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch of the section. |
| File Rules: Activate Host Rules | Off | Use the file rules of this host. |
| File Rules: Rules | None | Each rule has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |
| Assign colorspace to clips via rules: Inputs | One rule: regex `[^-a-zA-Z0-9](plateRef).*(?=mp4)`, colorspace `sRGB` | Each rule has a **Regex expression** and a **Colorspace**. Used by **Apply Colorspace Clips**. |

### Workfile

The color management values of the Hiero project, used by **Apply Colorspace Project**.

| Setting | Default |
|---|---|
| OpenColorIO Config | `aces_1.2` |
| Working Space | `role_scene_linear` |
| Viewer | `ACES/sRGB` |
| Thumbnails | `ACES/sRGB` |
| Monitor Out | `ACES/sRGB` |
| 8-bit Files | `role_matte_paint` |
| 16-bit Files | `role_texture_paint` |
| Log Files | `role_compositing_log` |
| Floating Point Files | `role_scene_linear` |

## Creator plugins

### Create Shot Clip

Default values for the options of the **Create Publishable Clip** creator.

| Setting | Default | Description |
|---|---|---|
| Shot parent hierarchy | `{folder}/{sequence}` | Template of the parent hierarchy of the shot folder. |
| Rename clips | On | Rename the clips sequentially. |
| Clip name template | `{track}{sequence}{shot}` | Template of the shot name. |
| Count sequence from | 10 | First number of the sequence. |
| Stepping number | 10 | Increment of the number for each shot. |
| {folder} | `shots` | Value of the `{folder}` token. |
| {episode} | `ep01` | Value of the `{episode}` token. |
| {sequence} | `sq01` | Value of the `{sequence}` token. |
| {track} | `{_track_}` | Value of the `{track}` token. `{_track_}` is the original Hiero track name. |
| {shot} | `sh###` | Value of the `{shot}` token. Hashes set the number of digits. |
| Plate Product types | None | Optional list of product types offered for plates. When empty, only `plate` is offered. |
| Enable Vertical Sync | Off | Synchronize attributes of clips on several tracks. |
| Workfiles Start Frame | 1001 | Start frame of the workfile. |
| Handle start (head) | 10 | Handle at the start of the clip. |
| Handle end (tail) | 10 | Handle at the end of the clip. |

### Collect Shot Clip instances

| Setting | Default | Description |
|---|---|---|
| Collect only instances from selected clips. | Off | Restrict the collection to the selected clips of the active sequence. When no clip is selected, every instance is collected. |

## Loader plugins

**Load Clip**

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Make the loader available. |
| Clip name template | `{folder[name]}_{product[name]}_{representation}` | Template of the name of the loaded clip. |

## Publish plugins

**Collect Clip Effects** decides which effects are collected, and how they are grouped. Both lists are empty by default.

| Setting | Default | Description |
|---|---|---|
| Effect Categories | None | A list of categories. Each has a **Name** and a list of **Effect Classes** that belong to it. |
| Effect Tracks | None | A list of track groups. Each has a **Name** and a list of **Track Names**. |

## Scripts menu definition

Defines a custom menu in Hiero's menu bar.

| Setting | Default | Description |
|---|---|---|
| Menu name | `Custom Tools` | Title of the menu. |
| Definition | One action | A list of items. Each has a **Type**: `action`, `menu` (a sub-menu with a **Title** and a list of items) or `separator`. |

An action has a **Title**, a **Tooltip**, a **Source Type** (`python` or `file`), the **Python** code or the **Filepath**. The default definition is one action titled **AYON Hiero Docs**, which opens the AYON Hiero documentation page in a web browser.
