---
title: TVPaint addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON TVPaint addon with their default values: color management, creators, publish plugins, loaders and the workfile builder."
addon: tvpaint
addon_repo: ayon-tvpaint
addon_version: 0.4.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-tvpaint/tree/0.4.3/server
  - https://help.ayon.app/en/articles/8770967-tvpaint-addon-settings
---

# TVPaint addon settings

<AddonInfo />

The settings of the [TVPaint addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Color management (ImageIO)

Settings location: `ayon+settings://tvpaint/imageio`.

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch for AYON's global color management in this host. |
| File Rules > Activate Host Rules | Off | Turns on the file rules of this host. |
| File Rules > Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## General

| Setting | Default | Description |
|---|---|---|
| Stop timer on application exit | Off | Stops the running timer of the AYON server when TVPaint closes. |

## Create plugins

Settings location: `ayon+settings://tvpaint/create`.

| Setting | Default | Description |
|---|---|---|
| Force to use current context | On | Product names of new instances are built from the current folder and task of the session. |

| Creator | Enabled | Active by default | Default variant | Default variants |
|---|---|---|---|---|
| Create Workfile | On | Not applicable | `Main` | None |
| Create Review | On | On | `Main` | None |
| Create Render Scene | On | Off | `Main` | None |
| Create Render Layer | No switch | Not applicable | `Main` | None |
| Create Render Pass | No switch | Not applicable | `Main` | None |
| Auto-Detect Create Render | Off | Not applicable | Not applicable | Not applicable |

### Create Render Scene

| Setting | Default | Description |
|---|---|---|
| Review by default | On | The instance is marked for review. |
| Default beauty pass | `beauty` | Name of the beauty pass. |
| Product type | Empty | Customizes the product type for UI purposes. May also affect the final product name. |

### Create Render Layer

| Setting | Default | Description |
|---|---|---|
| Review by default | Off | New render layers are marked for review. |
| Default beauty pass | `beauty` | Name of the beauty pass. |
| Product type items | None | Optional list of product types the creator can create, each with a **Product type** and a **Label**. |

### Create Render Pass

| Setting | Default | Description |
|---|---|---|
| Review by default | Off | New render passes are marked for review. |
| Render pass name template | `{variant}` | Template of the pass name. Keys: `{layer_index}`, `{variant}`. |
| Layer name template > Enabled | Off | Renames the TVPaint layer with the template when a pass is created. |
| Layer name template > Layer name template | `G{group_index}_L{layer_index}_{variant}` | Keys: `{group_index}`, `{layer_index}`, `{variant}`. |
| Group index Offset | 10 | Step between group indexes. |
| Group index Padding | 3 | Number of digits of the group index. |
| Layer index Offset | 10 | Step between layer indexes. |
| Layer index Padding | 3 | Number of digits of the layer index. |
| Product type items | None | Optional list of product types, as above. |

### Auto-Detect Create Render

Creates render layers and passes from the scene: the color group name is the variant of a render layer and the TVPaint layer name is the variant of a render pass.

| Setting | Default | Description |
|---|---|---|
| Allow group rename | On | Allows renaming the color groups by their order in the scene. |
| Group name template | `G{group_index}` | Template for the renamed groups. With the default offset and padding it produces `G010`, `G020` and so on. |
| Group index Offset | 10 | Step between group indexes. |
| Group index Padding | 3 | Number of digits of the group index. |

## Publish plugins

Settings location: `ayon+settings://tvpaint/publish`. Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Collect Render Instances | Ignore Render Pass opacity | On | Render passes are rendered without the opacity of their layers. |
| Extract Sequence | Review BG color | White (`255, 255, 255`, alpha 1.0) | Background color for the review of the whole scene and for thumbnails. |

| Validator | Enabled | Optional | Active |
|---|---|---|---|
| Validate Project Settings (Validate Scene Settings) | On | On | On |
| Validate MarkIn/Out | On | On | On |
| Validate Scene Start Frame | Off | On | On |
| Validate Folder Name (Validate Folder Paths) | On | On | On |

### Extract Convert To EXR

Converts the PNG renders to EXR. Does not work on macOS, because it uses the OpenImageIO tool.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Run the conversion. |
| Replace original PNG files | On | Remove the PNG files after the conversion. |
| Auto Trim | On | Trim during conversion. |
| EXR Compression | `ZIP` | Compression of the EXR files. |
| Create multichannel EXR | Off | Merges render passes into one EXR file per render layer. |
| Keep render passes | Off | Keeps the passes when multichannel EXR is on. |
| User overrides | None | Which of these the artist can change in the Publisher: **Create EXR**, **Create multichannel EXR**, **Keep render passes**. |

## Load plugins

Settings location: `ayon+settings://tvpaint/load`.

| Loader | Stretch | TimeStretch | Preload |
|---|---|---|---|
| Load Image | On | On | On |
| Import Image | On | On | On |

The values are the defaults of the options **Stretch to project size**, **Stretch to timeline length** and **Preload loaded image/s** that the artist can change when loading.

## Workfile builder

Settings location: `ayon+settings://tvpaint/workfile_builder`.

| Setting | Default | Description |
|---|---|---|
| Create first workfile | Off | Creates a workfile when the task has none. |
| Custom templates | None | List of templates, each with **Task types** and a **path** per operating system. |

## Product names

Product names are not set in this addon. The templates are profiles in the core addon settings, `ayon+settings://core/tools/creator/product_name_profiles`. The review and workfile products are created automatically, so a template for them does not need the variant key.
