---
title: Nuke addon
sidebar_label: Overview
description: "The AYON integration for Nuke: the AYON menu, the write, node and 3D products Nuke can create, publish and load, render targets, review and slate extraction, validators, templated workfile building and its requirements."
addon: nuke
addon_repo: ayon-nuke
addon_version: 0.4.19
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-nuke/tree/0.4.19
  - https://github.com/ynput/ayon-nuke/releases
  - https://help.ayon.app/en/articles/4670584-working-with-nuke-in-ayon
  - https://help.ayon.app/en/articles/2833967-nuke-addon-settings
---

# Nuke addon

<AddonInfo />

The Nuke addon connects [Nuke](https://www.foundry.com/products/nuke-family/nuke) to AYON. Inside Nuke it adds an AYON menu that opens the pipeline tools and applies project settings to the script, and it provides the plugins that create, publish and load products from Nuke scripts: renders, prerenders and images through managed write nodes, plus nodes, gizmos, cameras, models and shapes. It also supports Nuke Assist, with a reduced menu. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.9.9 or newer |
| Deadline addon | 0.7.0 or newer, when it is used for farm rendering (compatible addon, not required) |
| Applications addon | Defines the Nuke executables that the AYON Launcher starts |

Nuke 14.0 and newer is supported, and only with the commercial Nuke license, because the other licenses lack the full Python API. Compatibility with Nuke 13 and older was removed in 0.4.17. The slate generation option needs the Slater addon.

## AYON menu

The addon adds an **AYON** menu to Nuke's menu bar. The first entry shows the current context. In Nuke Assist, the **Create...**, **Publish...** and **Context** entries and the template placeholder entries are not shown.

| Entry | What it does |
|---|---|
| **Version Up Workfile** | Saves the script as the next version. Only shown when the core addon's AYON menu setting for version up is on. |
| **Work Files...** | Opens the Workfiles tool. |
| **Create...** | Opens the Publisher on its create tab. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Load...** | Opens the Loader. |
| **Manage...** | Opens the Scene Inventory. |
| **Set Resolution** | Applies the resolution of the current context to the script. |
| **Set Frame Range** | Applies the frame range of the current context, with handles, to the script. |
| **Set Colorspace** | Applies the colorspace settings of the project to the script. |
| **Apply All Settings** | Applies resolution, frame range and colorspace. |
| **Build Workfile** | Builds the workfile with the deprecated workfile builder profiles. |
| **Template Builder** | A submenu: **Build Workfile from template**, and outside Nuke Assist **Open template**, **Create Place Holder** and **Update Place Holder**. |
| **Push to Project** | Copies the workfile and its linked resources into another project, folder and task context. |
| **Experimental tools...** | Opens the experimental tools dialog. |
| **Reload Pipeline** | Only shown when `NUKE_DEBUG` is set. |

Shortcuts for **Create...**, **Publish...**, **Load...**, **Manage...**, **Build Workfile** and **Version Up Workfile** come from the [General settings](settings.md#general). A second menu, named by the **Scripts Menu Definition** settings, holds custom commands, and a **Gizmo Menu** can add toolbar menus for gizmos.

## Products Nuke can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Render (write) | `render` | A managed group with a write node, rendered locally, from existing frames or on the farm |
| Prerender (write) | `prerender` | The same kind of group, for intermediate renders |
| Image (write) | `image` | A still image from a write node |
| Source (read) | `source` | A selected Read node, with its source |
| Nukenodes (backdrop) | `nukenodes` | A backdrop and the nodes on it, as `.nk` |
| Gizmo (group) | `gizmo` | A Group node as a gizmo, as `.nk` |
| Camera (3d) | `camera` | A Camera node |
| Model (3d) | `model` | A Scene node with geometry |
| Silhouette Shapes | `matteshapes` | Roto or RotoPaint shapes as `.fxs` for Boris FX Silhouette |
| Workfile | `workfile` | The script itself, created automatically |

A *legacy convertor* converts products created by older versions.

### Write creators

The three write creators build a group that holds the write node and optional preceding nodes from the settings, such as a Reformat node. Their behavior depends on these settings:

| Attribute | Meaning |
|---|---|
| **Render target** | **Local machine rendering**, **Use existing frames**, and with the *Farm rendering* instance attribute also **Use existing frames - farm** and **Farm rendering**. |
| **Review** | Mark the output as reviewable. Shown by the *Reviewable* or *Conditional Reviewable* instance attributes. |
| **Slate Generation** | Prepend a slate frame. Shown by the *Slate Generation* instance attribute. |
| **Active frame** | Image creator only. The frame to render. |
| Render On Farm button | With the *Render On Farm* attribute, adds a button on the node that submits only that write node to the farm, without the publish logic. |
| Range limit | With *Use range limit*, the write node renders only the frame range of the parent group. |

The temporary rendering path comes from a template, and the write node's knobs from the **Plugin required** profiles of the color management settings.

## Publishing

### Collectors

| Collector | What it collects |
|---|---|
| Collect Writes | The write nodes of render, prerender and image instances, with their frame data and colorspace. |
| Collect Source Reads | The Read nodes of `source` instances. |
| Collect Backdrop, Collect Gizmo (group), Collect Model | The nodes of backdrop, gizmo and model instances. |
| Collect Slate Node | Whether a slate node is connected to the render tree. |
| Collect Sync Workfile Version | Sets the instance version to the workfile version for the configured product base types. |
| Collect Nuke Instance Data, Collect Context data, Collect Framerate, Collect Workfile | Context and frame rate data. |
| Collect Render On Farm, Setup Render On Farm | Prepares the single-node farm submission. |

### Extractors

| Plugin | Applies to | What it does |
|---|---|---|
| Render Local | `render`, `prerender`, `image` with a local target | Renders the write node in the current Nuke session. |
| Output Directory | Instances with an output path | Creates the output folder. Optional. |
| Extract Review Intermediates | `review` | Writes intermediate videos or sequences from configured baking streams. |
| Extract Review Data | `review` | Tags the rendered output as a reviewable representation. Off by default. |
| Extract Slate Frame | `slate` | Writes a movie and a thumbnail with baked-in LUTs, filling slate fields from templates. |
| Extract Camera | `camera` | Exports Alembic or FBX, per the **Extract Camera Format** setting. |
| Extract Model | `model` | Exports Alembic. |
| Extract Backdrop, Extract Gizmo (group) | `nukenodes`, `gizmo` | Export `.nk` files. |
| Extract Silhouette Shapes | `matteshapes` | Exports `.fxs`. Optional. |
| Extract Render On Farm | `render_on_farm` | Copies the workfile to a timestamped copy for the farm. |
| Script Save | All | Saves the script before extraction. |
| Output Node Create, Output Node Remove | `workfile` | Adds an Output node for each output write node during extraction and removes it after. |
| Increment Script Version | `workfile` | Saves the next workfile version after the publish. Optional. |
| Update path in Write node, Post Version-Up | `render`, `prerender`, `image` | Updates the version in the write node path to the new workfile version. Optional. |

### Validators

The settings decide which validators are enabled and whether they are optional or active; the defaults are in [Publish plugins](settings.md#validators). Validate Exposed Knobs, Validate Proxy Mode, Validate Rendered Frames and Validate Nuke Write Node are not optional by default.

| Validator | Checks | Applies to |
|---|---|---|
| Validate Folder context | That the instance's folder, task and related values match the current context. Repairable. | All instances |
| Validate Knobs | That knobs match values defined in the plugin settings, per product base type. Repairable. | Context |
| Validate Exposed Knobs | That the knobs listed in **Write Node Exposed Knobs** exist on the group. Repairable. | `render`, `prerender`, `image` |
| Validate write node | That the write node's knobs match the required nodes settings. Repairable. | `render` |
| Validate Write resolution | That the Reformat node in the group exists and outputs `root.format`. Repairable. | `render` |
| Validate rendered frame | That the frames exist when the target is **Use existing frames**. Repair actions switch to local or farm rendering. | `render`, `prerender`, `still` |
| Validate Proxy Mode | That Nuke's proxy mode is off. Repairable. | Context |
| Validate script attributes | That the script's fps, frame range, resolution and handles match the folder or task. Repairable. | `workfile` |
| Validate Backdrop | That the backdrop is not empty and has one outgoing connection. | `nukenodes` |
| Validate Gizmo (group) | That the group has one Output node and at least one connected Input node. | `gizmo` |

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Clip | `source`, `plate`, `render`, `prerender`, `review` as a Read node, with options for frame range, start frame, retime and node type | Image and video |
| Load Image | Still images of `render2d`, `source`, `plate`, `render`, `prerender`, `review`, `image`, `workfile` | Image |
| Load Alembic Camera, Load FBX Camera | `camera` | `.abc`, `.fbx` |
| Load USD Camera | Any product | `.usd`, `.usda`, `.usdc` |
| Load Geo | `model`, `pointcache`, `animation`, `fbx`, `usd` | `.abc`, `.fbx`, `.obj`, `.usd`, `.usda` |
| Load GeoImport, Load GeoReference | Any product | `.abc`, `.usd`, `.usda`, `.usdc` |
| Import Nuke Nodes | Any product, as nodes on a backdrop | `.nk` |
| Load Gizmo, Load Gizmo - Input Process | `gizmo`, `lensDistortion`. The input process variant connects it to the active viewer. | `.nk` |
| Load Precomp | `workfile`, `nukenodes`, as a linked group | `.nk` |
| Load Effects - nodes, Load Effects - Input Process | `effect`, for example effects published from Hiero | `.json` |
| Load OcioLook [nodes] | `ociolook` | `.json` |
| Run matchmove script | `matchmove` | `.py` |
| Set frame range, Set frame range (with handles) | `animation`, `camera`, `write`, `yeticache`, `pointcache`: sets the script's frame range from the version | Any |

Loaded products are tracked, and the Scene Inventory adds the actions **Lock versions**, **Unlock versions**, **Repair Old Loaders** and **Select Containers**. When a script opens or is saved, the addon checks the loaded containers for newer versions and shows a popup.

## Workfiles

- **Workfile callbacks** apply the context's resolution, frame range and colorspace when a script is created or opened. See [settings](settings.md#workfile-callbacks).
- **Templated workfile build** builds a script from a template file selected by task type and task name. It can run when Nuke launches, on every new script, or from the menu. Placeholders in the template are of three kinds: **Nuke create**, **Nuke load** and **Run Python Script**.
- A **Workfile Builder** with builder profiles is deprecated in favor of the templated build, but its menu entry and settings remain.
- **Directory mapping** can rewrite file paths with a filename filter.

## Color management

When enabled, the addon sets the script's color management from the global settings and the **Color Management (imageio)** settings: viewer and monitor output profiles, baking target colorspace, node knob profiles, file rules and regex rules that assign a colorspace to Read nodes.

## Launch hooks

| Hook | What it does |
|---|---|
| Prelaunch Nuke Assist | Sets the `NUKEASSIST` environment variable for the `nukeassist` application group. |

The addon also sets `NUKE_PATH` to its startup folder, so that the menus load.

## Related

- [Nuke settings](settings.md)
- [Hiero addon](../hiero/index.md)
