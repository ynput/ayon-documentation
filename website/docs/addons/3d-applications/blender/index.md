---
title: Blender addon
sidebar_label: Overview
description: "The AYON integration for Blender: the AYON menu, the products Blender can create, publish and load, the validators and extractors it provides, render setup, templated workfile building and its requirements."
addon: blender
addon_repo: ayon-blender
addon_version: 1.1.11
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-blender/tree/1.1.11
  - https://github.com/ynput/ayon-blender/releases
  - https://help.ayon.app/en/help/articles/2501380-working-with-blender-in-ayon
  - https://help.ayon.app/en/help/articles/6836825-configure-blender-addon
---

# Blender addon

<AddonInfo />

The Blender addon connects [Blender](https://www.blender.org/) to AYON. Inside Blender it adds an AYON menu that opens the pipeline tools, and it provides the plugins that create, publish and load products from Blender scenes. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.9.9 or newer |
| Applications addon | Defines the Blender executables that the AYON Launcher starts |

Blender 5.0, 5.1 and 5.2 and newer are supported. A few options depend on the Blender version: compositing output of a render is only supported up to Blender 4, and background images in a playblast need Blender 5.2 or newer.

## AYON menu

The addon adds an **AYON** menu to Blender's top bar.

| Entry | What it does |
|---|---|
| **Work Files...** | Opens the Workfiles tool. |
| **Create...** | Opens the Creator, to create publish instances. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Library...** | Opens the Library Loader, for products of library projects. |
| **Set Frame Range** | Sets the scene's frame range from the current task. |
| **Set Resolution** | Sets the scene's resolution from the current task. |
| **Set Unit Scale** | Applies the unit scale configured in the addon settings. |
| **Create Render Setup** | Creates a render setup in the compositor, based on the project settings. |
| **Version Up Workfile** | Saves the workfile as the next version. |
| **Templated Workfile** | A submenu for the templated workfile build: *Create First Workfile from Template*, *Build Workfile from Template*, *Open Template*, *Create Placeholder* and *Update Placeholder*. |

## Products Blender can create

Each creator makes one kind of publish instance in the scene.

| Creator | Product base type | What it publishes |
|---|---|---|
| Action | `action` | An action, for example of a character rig |
| Animation | `animation` | Animation of a character rig |
| Blender Scene | `blendScene` | A generic `.blend` export of selected data blocks |
| Camera | `camera` | A single baked camera |
| Layout | `layout` | A layout of character rigs |
| Look | `look` | The look of a character |
| Model | `model` | Static polygonal geometry |
| Point Cache | `pointcache` | Geometry as a point cache |
| Render | `render` | Renders, from the Compositor *File Output* node |
| Review | `review` | A viewport render for review |
| Rig | `rig` | A rig with controls to drive motion |
| USD | `usd` | A USD export |
| Workfile | `workfile` | The workfile itself, created automatically |

A *legacy convertor* finds products created by earlier versions of the addon and converts them.

## Publishing

### Extractors

The extractors decide which representations a product is published as. Most of them are optional and can be turned on or off per studio and project.

| Product base type | Published as |
|---|---|
| `action` | `.blend` |
| `animation` | Alembic (`.abc`), `.blend`, FBX |
| `blendScene` | `.blend` |
| `camera` | `.blend`, Alembic, FBX |
| `layout` | `.blend`, JSON |
| `look` | `.blend` |
| `model` | Alembic, `.blend`, FBX, USD |
| `pointcache` | Alembic |
| `render` | Rendered images, rendered locally during the publish, or on the render farm through the Deadline addon |
| `review` | Viewport playblast and thumbnail |
| `rig` | `.blend`, FBX |
| `usd` | USD |

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Absolute Data Block Paths | That no external data uses an absolute file path | Workfile |
| Validate Instance is not Empty | That the instance contains something to publish | Model, point cache, rig, camera, layout, Blender scene |
| Validate Object Mode | That objects are in object mode | Model, rig, layout |
| Validate Frame Range | That the scene's frame range matches the AYON context | Animation, camera, point cache, render, review |
| Validate Resolution | That the scene's resolution matches the AYON context. New in 1.1.11 | Render, review |
| Mesh Has UVs | That geometry has a UV set | Model |
| Mesh UVs named map1 | That the UV set is named `map1` | Model |
| Mesh No Negative Scale | That no object has a negative scale | Model |
| Transform Zero | That transforms are zero | Model |
| No Colons in names | That names contain no `:` | Model, rig |
| No Animation | That meshes carry no animation data | Blender scene, model, rig |
| Zero Keyframe | That a camera has a keyframe at frame 0 | Camera |
| No Action | That the objects have an action with animation data | Action |
| No Material | That the objects have a material assigned | Look |
| Validate No Linked Object | That no object is linked from another file | Look |
| Validate Render Camera Is Set | That a renderable camera exists | Render |
| Validate Render Inputs | That every image slot of the Compositor *File Output* node is connected | Render |
| Validate Scene Output | That the scene's render output file path is not empty | Render |
| Validate Output Paths | That the output paths of the File Output node are valid | Render |
| Validate Render No Compositing | That *Post Processing > Compositing* is enabled in the render settings, because the render workflow relies on the compositor nodes | Render |
| Validate Existing Frames | That all files of the representations exist on disk | Local render without rendering |
| Validate Renderlayer Active | That the view layers are in the state the render instances expect | Render |

### Other publish plugins

- **Increment Workfile Version** saves the workfile as the next version after a publish, for the product base types and the farm renders it covers.
- **Save current file** saves the scene before extraction.
- **Collectors** gather the current file, the frame range, the review data, the render and its colorspace data, and the files a scene depends on.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Append Blend | Camera, model, animation, layout, rig | `.blend` |
| Link Blend Hierarchy | The same types and workfiles, linked | `.blend` |
| Append Blend (Blender scene) | `blendScene` | `.blend` |
| Link Blend (Flat) | `blendScene`, as flat objects | `.blend` |
| Append Workfile | Workfile, unmanaged | `.blend` |
| Link Action | Action | `.blend` |
| Load Look | Look, as a material data block | `.blend` |
| Load Cache | Any product | `.abc`, `.usd`, `.usda`, `.usdc`, `.usdz`, `.obj` |
| Load FBX | Any product | `.fbx` |
| Load Camera (ABC) | Camera | `.abc` |
| Load Camera (FBX) | Camera | `.fbx` |
| Load Layout | Layout, for example published from Unreal | `.json` |
| Load Audio | Audio | `.wav` |
| Load in Compositor | Render, image, plate | Images |
| Load to Shader Editor | Render, texture, image, plate | Images |

Loaded products are tracked, so they can be updated or replaced from the Scene Inventory.

## Workfiles and templated workfile build

A workfile template can be applied to new workfiles. Profiles select the template by task, folder and other filters. A template can be applied when Blender is launched without an existing workfile, to every new empty scene, or on demand from the menu, and it can save the first workfile version automatically. Placeholders in the template can be created, updated, or kept after the build.

## Scene setup

The addon can apply the project's values when Blender starts: the resolution, the frame range and frame rate, and the unit scale. Handles can be included or excluded from the default playback and render range, per task type or task name.

## Render setup

**Create Render Setup** builds the compositor setup for rendering, from the render settings of the project: the default render folder, the AOV separator, the image format, multilayer EXR, the renderer, the AOVs to create and custom passes. Only the view layers selected when creating the instance are used, and the active state of a file output node is carried over to its view layer nodes.

## Color management

When enabled, Blender follows the studio's global color management through the OCIO files configured in the core addon. File rules map file patterns to colorspaces. Published renders carry their colorspace data.

## Launch hooks

| Hook | What it does |
|---|---|
| Add Python script to launch arguments | Starts Blender with the AYON startup script |
| Install PySide | Installs a Qt binding into Blender's Python when none is available |
| Blender console (Windows only) | Starts Blender in its own console window, so that its output is visible |

## Related

- [Blender settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
