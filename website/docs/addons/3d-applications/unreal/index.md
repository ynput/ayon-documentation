---
title: Unreal addon
sidebar_label: Overview
description: "The AYON integration for Unreal Engine: the AYON tools, the products Unreal can create, publish and load, the validators and extractors it provides, rendering, project preparation and its requirements."
addon: unreal
addon_repo: ayon-unreal
addon_version: 0.4.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-unreal/tree/0.4.0
  - https://github.com/ynput/ayon-unreal/releases
  - https://help.ayon.app/en/articles/0086198-about-unreal-addon
  - https://help.ayon.app/en/articles/2228078-working-with-unreal-in-ayon
  - https://help.ayon.app/en/articles/1738168-setup-unreal-addon
  - https://help.ayon.app/en/articles/8279245-unreal-addon-settings
---

# Unreal addon

<AddonInfo />

The Unreal addon connects [Unreal Engine](https://www.unrealengine.com/) to AYON. It prepares an Unreal project for each task when the engine is launched from the AYON Launcher, adds a set of AYON tools to the editor, and provides the plugins that create, publish and load products from Unreal projects. Its settings are described on the [settings page](settings.md).

The editor side of the integration is the AYON Unreal plugin, which the addon builds or copies into the engine when needed. The addon itself holds the Python code.

## Requirements

| Requirement | Version |
|---|---|
| AYON server | Newer than 1.10.0 |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Unreal Engine executables that the AYON Launcher starts |
| Maya addon (compatible, not required) | 0.2.13 or newer |
| Deadline addon (compatible, not required) | 0.7.0 or newer; needed to render on a farm |

Application variants of Unreal must be named after the engine version in the form `5-0` or `5-1`. A different name stops the launch with an error. The addon looks for the matching plugin folder `integration/UE_<major>.<minor>` and falls back to a compatible version. Engine versions older than 4.26 are refused.

## Launch and project preparation

Launching Unreal through AYON runs these steps.

| Step | What happens |
|---|---|
| Plugin | The environment variable `AYON_BUILT_UNREAL_PLUGIN` points to a compiled plugin that is copied into the engine. Otherwise `AYON_UNREAL_PLUGIN` points to the plugin source. When no usable plugin is found, the addon builds the one it ships with and shows a progress splash screen. |
| Project | The Unreal project is the workfile, with the extension `.uproject`. When the project file does not exist and **Allow project creation** is on, the addon copies the project from **Use Existing UProject for Project Creation** when that folder holds a `.uproject`, or generates a new project. |
| Missing project | When creation is off and **Force existing project** is on, the launch stops with an error. When it is off, Unreal starts without a project argument. |
| Project name | Names longer than 20 characters stop the launch. A name that does not start with a letter gets a `P` prefix. |
| Qt binding | A launch hook installs PySide into Unreal's Python when none is available, see the [prelaunch settings](settings.md#prelaunch-settings). |

The addon sets the environment variables `AYON_UNREAL_ROOT`, `AYON_UNREAL_VERSION`, `AYON_LOG_NO_COLORS` and `UE_PYTHONPATH`.

## AYON tools in Unreal

The addon adds an AYON tools popup to the editor.

| Entry | What it does |
|---|---|
| Context button | Shows the current task and folder and opens the context dialog to change them. |
| **Load...** | Opens the Loader. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the project. |
| **Render...** | Starts rendering of the selected render instance. |
| **Publish...** | Opens the Publisher, which also holds the Creator. |
| **Build sequence hierarchy...** | Builds maps and level sequences from the folder hierarchy of the AYON project. |
| **Console...** | Opens a Python script editor for Unreal. |
| **Experimental tools...** | Opens the experimental tools. |

## Products Unreal can create

Each creator makes a publish instance, stored as an `AyonPublishInstance` asset in the project.

| Creator | Product base type | What it publishes |
|---|---|---|
| Camera | `camera` | A level sequence with a camera cut track |
| Layout | `layout` | The selected actors of a level, as a layout of loaded assets |
| Render | `render` | A level sequence to render, locally or on a farm |
| Static Mesh (FBX) | `staticMesh` | Static meshes as FBX geometry |
| UAsset | `uasset` | A single `.uasset` file |
| Level | `uasset` | A single `.umap` file |

The Layout creator has the pre-create option **Export to Blender**, which makes the layout reference the `.blend` representation of its assets. The Render creator can create a new level sequence with a master level, and has the instance attributes **Render target** (`Local machine rendering` or `Farm rendering`), **Render Preset** and **Generate review**.

## Publishing

### Extractors

| Extractor | Product base type | Published as | Optional |
|---|---|---|---|
| Extract Camera | `camera` | FBX, exported from the level sequence | Yes |
| Extract Fbx (Static Mesh) | `staticMesh` | FBX | No |
| Extract Layout | `layout` | JSON with the transform and the source representation of each actor | Yes |
| Extract UAsset | `uasset`, `umap` | The `.uasset` or `.umap` file, copied from disk. Only one asset per instance | Yes |

A `render` instance has no extractor. With the local render target the instance expects the rendered frames to exist already and collects them from the render output. With the farm target it creates a farm job, and the farm renders and publishes.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Layout Actors Existing in Scene | That the actors of the instance exist in the level. The repair action sets the selected actors as members. | Layout |
| Validate Camera Tracks | That the members are level sequences with a camera cut track. The repair action adds the track. | Camera |
| Validate Frame Range | That the clip in and out of the instance match the frame range of the folder, including handles. The repair action sets the camera cut section range. | Camera |
| Validate Model Content | That all members are static meshes | Static mesh |
| Check no dependencies | That the asset has no hard references to other assets under `/Game/` | UAsset |
| Validate Sequence Frames | That the rendered files form one complete sequence matching the frame range of the folder | Local render |

Check no dependencies and Validate Sequence Frames are optional.

### Other publish plugins

- **Collectors** gather the current project file, the frame range of camera instances, the members of camera, static mesh and UAsset instances, and the rendered files of local renders.
- **Switch Render Targets** marks a render instance as local or farm from its **Render target** attribute.
- **Create Farm Render Instances** prepares the render instances for farm submission.
- **Remove Marked Instances** drops the instances that collectors flagged for removal.

## Loading

| Loader | Loads | Format |
|---|---|---|
| Import Alembic Static Mesh | `model`, `staticMesh` | `.abc` |
| Import FBX Static Mesh | `model`, `staticMesh` | `.fbx` |
| Import Alembic Skeletal Mesh | `pointcache`, `skeletalMesh` | `.abc` |
| Import FBX Skeletal Mesh | `rig`, `skeletalMesh` | `.fbx` |
| Import Alembic Point Cache | `model`, `pointcache` | `.abc` |
| Import Alembic Animation | `animation` | `.abc` |
| Import FBX Animation | `animation` | `.fbx` |
| Load Camera | `camera` | `.fbx` |
| Load Layout | `layout` | `.json` |
| Load Layout on Existing Scene | `layout`, matched to assets already in the project | `.json` |
| Import image texture 2d | `image`, `texture`, `render` | `.png`, `.jpg`, `.tiff`, `.exr` |
| Load UAsset | `uasset` | `.uasset` |
| Load Level | `uasset` | `.umap` |
| Import Yeti | `yeticacheUE` | `.abc` |

Every loaded product gets an `AyonAssetContainer` asset in its folder, which stores the metadata the Scene Inventory uses. The Alembic loaders offer a conversion preset for UV and transform. Load Layout creates level sequences for the layout when **Generate level sequences when loading layouts** is on. The [import settings](settings.md#import-settings) control the target folders and names.

### Scene Inventory actions

| Action | What it does |
|---|---|
| Connect Fbx Animation to Level Sequence | Adds a loaded animation sequence to the level sequence of a layout. |
| Connect Alembic Animation to Level Sequence | The same, for an Alembic animation. |
| Replace all Actors in level to this version | Updates all actors in the current level to the selected version. |
| Replace selected Actors in level to this version | Updates only the selected actors. |
| Delete Unused Assets | Deletes the assets that no level uses. |
| Update Container Path | Updates the container path of assets that move to the content plugin. |

## Rendering

Rendering uses Unreal's Movie Render Queue. The project must hold a render queue asset and a render configuration asset, whose paths are set in the [render setup](settings.md#render-setup). Farm rendering needs the Deadline addon and the AYON Unreal plugin for Deadline.

## Color management

When enabled, Unreal follows the studio color management, with an optional OCIO configuration of its own and file rules that map file patterns to colorspaces.

## Related

- [Unreal settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
