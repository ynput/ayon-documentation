---
title: 3ds Max addon
sidebar_label: Overview
description: "The AYON integration for Autodesk 3ds Max: the AYON menu, the products 3ds Max can create, publish and load, validators, render targets, tyFlow and Redshift support, templated workfile building and requirements."
addon: max
addon_repo: ayon-3dsmax
addon_version: 0.5.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-3dsmax/tree/0.5.3
  - https://github.com/ynput/ayon-3dsmax/releases
  - https://help.ayon.app/en/articles/6074628-working-with-3ds-max-in-ayon
  - https://help.ayon.app/en/articles/3959010-3ds-max-addon-settings
---

# 3ds Max addon

<AddonInfo />

The 3ds Max addon connects Autodesk 3ds Max to AYON. Inside 3ds Max it adds an AYON menu that opens the pipeline tools, and it provides the plugins that create, publish and load products from 3ds Max scenes, including tyFlow caches, Redshift proxies and renders. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.9.9 or newer |
| Applications addon | Defines the 3ds Max executables that the AYON Launcher starts |

The addon runs in 3ds Max through `pymxs`. Rendering on a farm is submitted by the Deadline addon, not by this addon. tyFlow, Redshift and Ornatrix are third-party plugins of 3ds Max: the products and loaders that depend on them need the plugin to be installed.

## AYON menu

The addon adds an **AYON** menu to the 3ds Max menu bar, before the Help menu. The first entry, disabled, shows the current context.

| Entry | What it does |
|---|---|
| **Version Up Workfile** | Saves the workfile as the next version. Only shown when the core addon setting for it is enabled. |
| **Work Files...** | Opens the Workfiles tool. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher, where instances are created and published. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Library...** | Opens the Library Loader, for products of library projects. |
| **Set Resolution** | Sets the scene's render resolution from the current task. |
| **Set Frame Range** | Sets the timeline's frame range and frame rate from the current task. |
| **Set Colorspace** | Sets the OCIO configuration from the current task. |
| **Set Unit Scale** | Applies the unit scale configured in the addon settings. |
| **Template Builder** | A submenu for the templated workfile build: *Create First Workfile from Template*, *Build Workfile from Template*, *Update Workfile from Template*, *Open Template*, *Create Placeholders* and *Update Placeholders*. |

The menu has no separate **Create...** entry in this version.

## Products 3ds Max can create

Each creator makes one kind of publish instance from the selected nodes.

| Creator | Product base type | What it publishes |
|---|---|---|
| Camera | `camera` | A single camera, with or without animation |
| Material Library | `matlib` | A material library |
| Max Scene | `maxScene` | The selected objects as a native `.max` scene |
| Model | `model` | Geometry |
| Point Cache | `pointcache` | Animated geometry as an Alembic cache |
| Point Cloud | `pointcloud` | tyFlow particles as a PRT point cloud |
| Redshift Proxy | `redshiftproxy` | Objects converted to a Redshift proxy |
| Render | `maxrender` | A render of the scene, locally or on a farm |
| Render Preset | `renderpreset` | A render settings preset |
| Review | `review` | A preview animation of a camera |
| TyFlow | `tyflow` | A tyFlow cache (`.tyc`) and spline cache |
| Workfile | `workfile` | The workfile itself, created automatically |

A *legacy convertor* finds products created by earlier versions of the addon and converts them.

The **Render** creator has a **Render target** attribute: *Local machine rendering*, *Use existing frames (local)* or *Farm Rendering*, and a **Multiple Cameras Submission** option. Render instances support passes for V-Ray, Redshift and the 3ds Max standard renderers; Arnold only supports the beauty pass because of limits of the `pymxs` API.

The **Review** creator exposes the width, height, percent of output, image format, visual style, viewport preset, anti-aliasing and texture options as instance attributes. Their defaults come from the **Create Review** settings.

## Publishing

### Extractors

| Product base type | Published as |
|---|---|
| `camera` | Alembic (`.abc`), FBX, raw `.max` scene |
| `maxScene` | Raw `.max` scene |
| `matlib` | `.mat` material library |
| `model` | Alembic, OBJ, FBX, USD, raw `.max` scene |
| `pointcache` | Alembic |
| `pointcloud` | PRT (`.prt`), through tyFlow operators |
| `redshiftproxy` | Redshift proxy (`.rs`) |
| `maxrender` | Rendered images, rendered locally during the publish, or submitted to a render farm by the Deadline addon |
| `renderpreset` | Render preset (`.rps`) |
| `review` | Preview animation, and image sequences when *Keep Image Sequences* is on, plus a thumbnail |
| `tyflow` | TyCache (`.tyc`) and spline cache |

The model and camera extractors are optional, so the artist can choose the formats in the Publisher.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Instance in same Context | That the instance's folder and task match the current context | All instances |
| Container Contents | That the instance has members | Camera, model, Max scene, review, point cache, point cloud, Redshift proxy |
| Camera Contents | That the instance holds only cameras (and camera targets) | Camera, review |
| Model Contents | That the instance holds no cameras, lights or shapes | Model |
| Validate Mesh Has UVs | That meshes have texture vertices | Model |
| Validate Model Name | That the name matches a configurable regex | Model |
| Validate No Animation | That the model has no animation | Model |
| Validate Camera Attributes | That focal length, near and far range and near and far clip match the configured values. A configured value of 0 skips that check. | Camera |
| Validate Frame Range | That the instance's frame range matches the folder's | Camera, render, point cache, point cloud, review, Redshift proxy |
| Validate Frame Range (TyCache) | The same check for tyFlow caches | TyCache, TySpline |
| Validate Resolution Setting | That the render resolution matches the folder's | Render |
| Validate Review Resolution Setting | The same check for the review | Review |
| Renderable Camera | That a renderable camera exists | Render |
| No Render Active Viewport | That *Render active viewport* is on in the render settings. Not optional, with a repair action | Render |
| Validate Extended Viewport | That at least one viewport is a regular (not extended) viewport | Review |
| Validate Generic Render Setting | That the render output folder, image extension and render element file names match the project settings. Repairable | Render, render preset |
| Validate Arnold Render Setting, Validate Vray Render Setting | The same, for the Arnold and V-Ray renderers | Render, render preset |
| Validate Existing Frames | That all files of the representations exist on disk | Local render without rendering |
| Redshift Renderer | That Redshift is the current renderer | Redshift proxy |
| Validate Point Cloud | That tyFlow exports PRT, the partition values are default and the configured channel attributes exist | Point cloud |
| TyFlow Data, TyFlow Data (TyCache) | That the tyFlow operators are set up correctly | Point cloud, TyCache, TySpline |
| Material Library Is Saved | That the material library is saved | Material library |
| No Material Library | That no material library is present | Material library |
| Validate Workfile is saved | That the workfile has been saved | Workfile |
| Validate Loaded Plugins | That the 3ds Max plugins configured per product type are loaded | Configurable |
| Attributes | That properties of scene nodes match a configured dictionary | Context |

### Other publish plugins

- **Increment Workfile Version** saves the workfile as the next version after a publish of a render or workfile.
- **Save current file** and **Save Scene files for cameras** save the scene before the render extraction.
- **Collectors** gather the current file, instance members, frame range, render layers, local render instances, review data, tyFlow channel attributes and the workfile. **Collect Render** can sync the render version with the workfile version.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Alembic | Camera, animation, point cache | `.abc` |
| Load Alembic with Ornatrix | Camera, animation, point cache | `.abc` |
| Load Camera (Fbx) | Camera | `.fbx` |
| Load Max Scene | Camera, Max scene, model | `.max` |
| Load Model with Alembic | Model | `.abc` |
| Load Model (Fbx) | Model | `.fbx` |
| Load Model (Obj) | Model | `.obj` |
| Load Model (USD) | Model | `.usd`, `.usda`, `.usdc` |
| Load Point Cloud | Any product | `.prt` |
| Load TyCache | TyCache | `.tyc` |
| Load TySpline Cache | TySpline | `.tyc` |
| Load Redshift Proxy | Redshift proxy | `.rs` |
| Load VDB | VDB cache | `.vdb` |
| Load Material Library | Material library | `.mat` |
| Load Render Preset | Render preset | `.rps` |
| Load Image | Render, image, plate, texture | Images, into the Slate Material Editor |

Loaded products are tracked in containers, so they can be updated or switched from the Scene Inventory.

## Workfiles and templated workfile build

Profiles select a workfile template by task type, task name, folder type and folder path. The template can be applied when 3ds Max starts with no workfile yet, to every new empty scene, or on demand from the **Template Builder** menu, and it can save the first workfile version. Placeholders in the template can be kept after the build. The placeholder types are *Max load*, *Run Python Script* and *Set Context Settings*. The options to apply on launch and on every new scene were added in 0.5.0.

## Scene setup

| Feature | Behavior |
|---|---|
| Unit scale | When enabled, opening a workfile checks the scene's metric unit against the configured one and shows a **Fix** dialog if they differ. When disabled, the display unit is set to Generic. |
| Auto key | The default frame for auto keys is set from the **Auto Key Default Frame** setting. |
| Workspace | When project creation is enabled, a `workspace.mxp` with the configured content is created in the work directory at launch. |

## Color management

When enabled, 3ds Max follows the studio's global color management through the OCIO files of the core addon. File rules map file patterns to colorspaces. **Set Colorspace** in the menu applies the configuration of the task.

## Launch hooks

| Hook | What it does |
|---|---|
| PreCopyMxp | Creates `workspace.mxp` in the work directory when the project creation setting is on. |
| SetPath | Starts 3ds Max with the work directory as its current directory. |

## Related

- [3ds Max settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
