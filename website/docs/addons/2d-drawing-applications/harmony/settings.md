---
title: Harmony addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Harmony addon with their default values: color management, cache conflict resolution, loader, creator and publish plugins."
addon: harmony
addon_repo: ayon-harmony
addon_version: 0.5.4
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-harmony/tree/0.5.4/server/settings
  - https://help.ayon.app/en/articles/5752971-harmony-addon-settings
---

# Harmony addon settings

<AddonInfo />

The settings of the [Harmony addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## OCIO config

Settings location: `ayon+settings://harmony/imageio`.

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch for AYON's global color management in this host. |
| File Rules > Activate Host Rules | Off | Turns on the file rules of this host. |
| File Rules > Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Cache conflict resolution

Applies when a local copy of the scene is newer than or as new as the stored file.

| Setting | Default | Description |
|---|---|---|
| Force cache conflict source | Off | Do not show the dialog; always use the source chosen below. |
| Conflict source | `server` | `server` unpacks the stored file again, `local` keeps the local copy. Also the preselected answer of the dialog. |

## Loader plugins

| Setting | Default | Description |
|---|---|---|
| Override container name | Empty | Optional name template for the containers of backdrop loaders (templates and Photoshop layers). Keys come from the loader context, for example `{project[name]}`, `{folder[name]}`, `{product[name]}`. |
| Parent Backdrop Matching | Off | Places loaded content in an existing backdrop that matches its folder hierarchy (case-insensitive). If none matches, a new parent backdrop named after the most direct folder is created. |

| Loader | Enabled | Other settings |
|---|---|---|
| Image or Sequence Loader | On | **Expose only current frame** (Off): only the current frame is exposed and the other frames are set empty. |
| Template Loader | On | None. |
| Load Photoshop Layers | On | None. |

## Creator plugins

Switches shared by the creators: **Enabled**, **Active by default** (the instance is active when created) and **Default Variants**.

| Creator | Enabled | Active by default | Default variants |
|---|---|---|---|
| Workfile | On | On | `Main` |
| Review | Off | On | `Main` |
| Render | On | On | `Main` |
| Render on Farm | On | On | `Main` |
| RenderLayer | On | On | None (**Default variant**: `Main`) |
| RenderPass | On | On | None (**Default variant**: empty) |
| Auto-Detect Create Render Layers and Passes | On | Not applicable | Not applicable |

### Render and Render on Farm

| Setting | Default | Description |
|---|---|---|
| Auto connect to Composite node | Off | Connects a newly created `Write` node to the composite node found by the pattern below. |
| Regex pattern for Composite node name | `Composite` | Pattern used to find that composite node. The first match is used. |
| Product type items | None | Optional list of product types the plugin can create, each with a **Product type** and a **Label**. |

Farm or local rendering is chosen per instance with the **Render target** attribute of the Render creator.

### RenderLayer

| Setting | Default | Description |
|---|---|---|
| Review by default | Off | New render layers are marked for review. |
| Default beauty pass | `beauty` | Name of the pass for all visible layers of the group. |
| Default variant | `Main` | Default variant name. |
| Product type items | None | Optional list of product types, as above. |

### RenderPass

| Setting | Default | Description |
|---|---|---|
| Review by default | Off | New render passes are marked for review. |
| Rename Read Nodes | On | Uses the product name as the name of the `Read` node and keeps the original layer name in the `Write` node. |
| RenderPass name template | `L{layer_index}_{variant}` | Template of the pass name. |
| Layer index Offset | 10 | Step between layer indexes. |
| Layer index Padding | 3 | Number of digits of the layer index. |
| Product type items | None | Optional list of product types, as above. |

### Auto-Detect Create Render Layers and Passes

Uses the color group name as the variant of a render layer and the Harmony layer name as the variant of a render pass.

| Setting | Default | Description |
|---|---|---|
| Render layer variant template | `G{group_index}` | Calculates the variant of a render layer. |
| Group index Offset | 10 | Step between group indexes. |
| Group index Padding | 3 | Number of digits of the group index. |
| Layer name template > Enabled | Off | Renames the color groups before creating render layers. |
| Layer name template > Layer name template | `G{group_index}_L{layer_index}_{variant}` | Template used to parse the variant out of already renamed layers. Keys: `{group_index}`, `{layer_index}`, `{variant}`. |

## Publish plugins

### Collect Palettes

| Setting | Default | Description |
|---|---|---|
| Allowed tasks | `.*` | Regex patterns for the task names where palettes are collected. `.*` means all tasks. |

### Validators

| Validator | Enabled | Optional | Active |
|---|---|---|---|
| Validate Audio | On | On | On |
| Validate Scene Settings | On | On | On |
| Validate Instance | On | Off | On |
| Validate Palette Location | Off | On | On |

**Validate Scene Settings** has three more settings, all lists of regex patterns, empty by default.

| Setting | Description |
|---|---|
| Skip Frame check for Folder Paths with name containing | Folders whose name matches skip the frame range check. |
| Skip Resolution Check for Tasks | Tasks whose name matches skip the resolution check. |
| Skip Timeline Check for Tasks | Tasks whose name matches skip the frame range and handles check. |

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
