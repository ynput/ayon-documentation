---
title: 3ds Max addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON 3ds Max addon with their default values: unit scale, auto key, workspace, color management, templated workfile build, render, review and point cloud settings, creator and publish plugins."
addon: max
addon_repo: ayon-3dsmax
addon_version: 0.5.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-3dsmax/tree/0.5.3/server/settings
  - https://help.ayon.app/en/articles/3959010-3ds-max-addon-settings
---

# 3ds Max addon settings

<AddonInfo />

The settings of the [3ds Max addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Validators and extractors share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## Set Unit Scale

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Check the scene's unit scale when a workfile is opened and offer to fix it. When off, the display unit is set to Generic. |
| Scene Unit Scale | `Centimeters` | The metric unit to enforce. The choices are millimeters, centimeters, meters and kilometers. |

## Auto Key Default Value

| Setting | Default | Description |
|---|---|---|
| Auto Key Default Frame | 0 | The frame at which a key is created when Auto Key is used. |

## Max Workspace

| Setting | Default | Description |
|---|---|---|
| Enable Project Creation | Off | Create a `workspace.mxp` in the work directory at launch. |
| Max mxp Workspace | A standard 3ds Max directory list (`[Directories]` section) | The content written to `workspace.mxp`. |

## Color Management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | 3ds Max follows the global color management, using the OCIO files of the core addon. |
| Activate Host Rules | Off | Turn on the file rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Templated Workfile Build

A list of **Profiles**, empty by default. A profile applies when it matches its filters.

| Setting | Default | Description |
|---|---|---|
| Task types, Task names, Folder Types, Folder paths | | Filters that select when the profile applies. |
| Path to template | | The template workfile. |
| Keep placeholders | Off | Keep the placeholders after the build. |
| Apply to New Scene | Off | Apply the template to every new empty scene. |
| Apply on 3dsmax launch | Off | Apply the template when 3ds Max starts and no workfile exists yet. |
| Save first workfile version | On | Save the first workfile version automatically. |

## Render Settings

| Setting | Default | Description |
|---|---|---|
| Default render image folder | `{work}/renders/3dsmax/{productName}` | Folder template for rendered images. |
| AOV Separator character | `underscore` | Separator in AOV file names. |
| Output Image Format | `exr` | Output format of renders. |
| V-Ray Render Settings: Separate Render Channels | On | Write render channels as separate files. |
| Redshift Render Settings: Separate AOV Files | On | Write AOVs as separate files. |

## Create Review

Defaults for the attributes of the **Review** creator.

| Setting | Default | Description |
|---|---|---|
| Review Width | 1920 | Width of the preview animation. |
| Review Height | 1080 | Height of the preview animation. |
| Percent of Output | 100.0 | Scale of the output. |
| Keep Image Sequences | Off | Keep the image sequence besides the video. |
| Image Format Options | `png` | Image format of the frames. |
| Preference | `Realistic` | Visual style of the viewport. |
| Preview Preset | `Quality` | Viewport preset. |
| Anti-aliasing Quality | `None` | Anti-aliasing of the preview. |
| Viewport Texture | On | Show textures in the viewport. |

## Point Cloud

| Setting | Default | Description |
|---|---|---|
| Channel Attribute | 11 items: Age, Radius, Position, Rotation, Scale, Velocity, Color, TextureCoordinate, MaterialID, custFloats, custVecs | The tyFlow channels that can be exported in a point cloud. Each item has a **Name** and an **Attribute** (for example `Age` and `age`). |

## Create plugins

One entry for each creator: Camera, Max Scene, Model, Point Cache, Point Cloud, Redshift Proxy, Render, Render Preset, TyFlow and Material Library.

| Setting | Default | Description |
|---|---|---|
| Product type items | None | Optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. |
| Remove material library when remove instance (Material Library only) | On | Remove the material library from the scene when its instance is removed. |

## Publish plugins

### Collect Render

| Setting | Default | Description |
|---|---|---|
| Sync render version with workfile | Off | Use the workfile version as the render version. |
| Sync current workfile name to instance data | On | Include the workfile name in the render folder. When off, the validator skips the check that the folder contains the workfile name. |

### Validators

| Validator | Enabled | Optional | Active | Other settings |
|---|---|---|---|---|
| Validate Instance In Context | On | On | On | |
| Validate Frame Range | On | On | On | |
| Validate Frame Range (TyCache) | Off | On | On | |
| Validate Attributes | Off | | | **Attributes**: a dictionary (default `{}`) of node properties and the values they must have. |
| Validate Camera Attributes | On | On | Off | **Focal Length** (45.0), **Near Range** (0.0), **Far Range** (1000.0), **Near Clip** (1.0), **Far Clip** (1000.0). A value of 0 skips that check. |
| Validate No Animation | On | On | Off | |
| Validate Loaded Plugin | Off | On | | **Family Plugins Mapping**: a list where each item has **Families** and **Plugins** that must be loaded. |
| Validate Mesh Has UVs | On | On | Off | |
| Validate Model Name | On | On | Off | **Validation regex** (`(.*)_(?P<subset>.*)_(GEO)`). |
| Validate No Active Viewport | On | Off | On | |
| Validate Render Passes | On | Off | On | See the note below. |

### Extractors

| Extractor | Enabled | Optional | Active |
|---|---|---|---|
| Extract OBJ | On | On | Off |
| Extract FBX | On | On | Off |
| Extract Geometry (USD) | On | On | Off |
| Extract Geometry (Alembic) | On | On | On |
| Extract Max Scene (Raw) | On | On | On |

### Settings that do not match a plugin

Plugin settings are matched to plugins by class name:

- **Validate Render Passes** (`ValidateRenderPasses`) has no plugin with that name in the addon, so the setting has no effect.
- **Extract Geometry (Alembic)** is stored under the key `ExtractModel`, while the plugin class is `ExtractModelAlembic`, so these settings are not applied to it. The plugin is optional and active by default.
- **Extract FBX** is stored under `ExtractModelFbx`, which is also the class of the model FBX extractor. The camera FBX extractor (`ExtractCameraFbx`) and the Alembic extractors for cameras and point caches have no settings of their own.
