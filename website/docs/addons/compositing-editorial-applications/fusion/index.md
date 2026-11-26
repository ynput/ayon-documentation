---
title: Fusion addon
sidebar_label: Overview
description: "The AYON integration for Blackmagic Fusion: the AYON menu, the Saver based render and image products, publishing, the validators it provides, loading and its requirements."
addon: fusion
addon_repo: ayon-fusion
addon_version: 0.4.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-fusion/tree/0.4.3
  - https://github.com/ynput/ayon-fusion/releases
  - https://help.ayon.app/en/articles/9576605-fusion-addon-settings
---

# Fusion addon

<AddonInfo />

The Fusion addon connects Blackmagic Fusion to AYON. It adds an AYON window to Fusion with the pipeline tools, turns Saver tools into `render` and `image` publish instances, renders them locally, from existing frames or on a farm, and loads images, meshes, USD files and workfiles into a composition. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Fusion executables that the AYON Launcher starts |

The addon supports the Fusion versions 9, 16, 17, 18, 19, 20 and 21. Fusion 21 is supported since 0.4.2, when it was a beta version. When the version cannot be read from the application name, version 19 is used. The workfile extension is `.comp`. Farm rendering needs a farm addon such as Deadline. The addon has no services.

## AYON menu

The addon adds an AYON window to Fusion. It shows the current context and these buttons. The launch hook **Launch AYON Menu on Fusion Start** can open it when Fusion starts (Fusion 18 and newer, off by default).

| Button | What it does |
|---|---|
| **Workfiles...** | Opens the Workfiles tool. |
| **Create...** | Opens the Creator. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory. |
| **Library...** | Opens the Library Loader. |
| **Set Frame Range** | Sets the composition's frame range from the current task. |
| **Set Resolution** | Sets the composition's resolution from the current task. |
| **Duplicate with input connections** | Duplicates the selected tools together with their input connections. |

## Products Fusion can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Render (saver) | `render` | An image sequence from a Saver tool. |
| Image (saver) | `image` | A single image from a Saver tool. |
| Workfile | `workfile` | The composition itself, created automatically. |

The two Saver creators share these instance options.

| Option | Values |
|---|---|
| Render target | **Local machine rendering**, **Use existing frames**, and **Farm rendering** when `farm_rendering` is among the creator's instance attributes. |
| Review | Whether a reviewable is made. On by default when `reviewable` is among the instance attributes. |
| Output Image Format | `exr`, `tga`, `tif`, `png`, `jpg` or `dpx`. |
| Frame range source (Render) | **Current context**, **From render in/out**, **From composition timeline** or **Custom frame range**. |
| Frame (Image) | The frame to render. The default is set in the settings. |

## Publishing

### Plugins

| Plugin | What it does |
|---|---|
| Collect Current Comp, Collect Comp Frame Ranges | Collect the current composition and its global and render frame ranges. |
| Collect Instances Data, Collect Fusion Render | Collect the Saver instances and prepare them for the chosen render target. Farm instances are marked to be skipped by the integration. |
| Collect Workfile | Collects the composition file as the workfile representation. |
| Collect Inputs | Collects the loaded containers that feed a render or image. |
| Save current file | Saves the composition before extraction. |
| Render Local | Renders the Savers of the instance in the current Fusion session. All other Savers are set to pass-through during the render and restored afterwards. |
| Increment workfile version | Saves the workfile as the next version after the publish. Optional. |

### Validators

The validators apply to `render` and `image` instances unless noted. Validators marked optional can be switched off in the Publisher.

| Validator | Checks | Optional | Repair or action |
|---|---|---|---|
| Validate Comp Saved | That the composition has been saved to a file that exists. A modified composition only gives a warning. | No | |
| Validate Create Folder Checked | That the Saver's *Create Folder During Render* option (`CreateDir`) is on. | No | Repair, select |
| Validate Expected Frames Exists | That every expected file exists, for instances that publish existing frames. | No | Repair (switches the render target to local), select |
| Validate Filename Has Extension | That the Saver's output path has a file extension. | No | Select |
| Validate Image Frame | That an `image` instance covers a single frame. | No | |
| Validate Frame Range | That the instance's frame range, with handles, is inside the composition's global range. | No | |
| Instance in same Context | That the instance publishes to the folder and task of the current context. | Yes | Repair, select |
| Validate Saver Has Input | That the Saver has an incoming connection. | No | Select |
| Validate Saver Passthrough | That the Saver's pass-through state matches the instance's publish state. | No | Select |
| Validate Folder Resolution | That the resolution of the Saver's input matches the resolution of the folder or task. | Yes | Select |
| Validate Unique Products | That no two instances publish the same product name in the same folder. | No | Select |
| Validate Background Depth 32 bit | That all Background tools in the composition are set to float32 depth. Checked once per publish. | Yes | Repair, select |

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load sequence | Product base types `imagesequence`, `review`, `render`, `plate`, `image`, `online` | Image and video extensions |
| Load alembic mesh | `pointcache`, `model` | `.abc` |
| Load FBX mesh | Any product | Mesh and animation formats such as `.fbx`, `.obj`, `.dae`, `.3ds` and `.dxf` |
| Load USD | Any product | `.usd`, `.usda`, `.usdz` |
| Load Workfile | `workfile` | `.comp` |
| Set frame range | `animation`, `camera`, `imagesequence`, `render`, `yeticache`, `pointcache` | Sets the composition's range from the version, without handles. |
| Set frame range (with handles) | The same | Sets the range including handles. |

The Scene Inventory offers two inventory actions on loaded containers: **Select Containers** and **Set Tool Color**.

## Launch hooks

| Hook | What it does |
|---|---|
| Fusion prelaunch | Prepares the AYON environment for Fusion, for local, farm render and farm publish launches. |
| Fusion profile hook | Prepares the local Fusion profile directory, optionally copies an existing Fusion profile, and sets the MasterPrefs variable so that Fusion finds the AYON scripts and uses Python 3. |
| Install PySide2 | Installs a Qt binding into the Python of Fusion when none is found. |
| Launch AYON Menu on Fusion Start | Opens the AYON window at startup. Off by default. |

## Related

- [Fusion settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
