---
title: Harmony addon
sidebar_label: Overview
description: "The AYON integration for Toon Boom Harmony: the AYON menu, workfile handling, the products Harmony can create, publish and load, its validators and extractors, and its requirements."
addon: harmony
addon_repo: ayon-harmony
addon_version: 0.5.4
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-harmony/tree/0.5.4
  - https://github.com/ynput/ayon-harmony/releases
  - https://help.ayon.app/en/articles/3580393-working-with-harmony-in-ayon
  - https://help.ayon.app/en/articles/5752971-harmony-addon-settings
---

# Harmony addon

<AddonInfo />

The Harmony addon connects [Toon Boom Harmony](https://www.toonboom.com/) to AYON. Inside Harmony it adds an AYON menu that opens the pipeline tools, and it provides the plugins that create, publish and load products from Harmony scenes. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.5.0 or newer |
| Applications addon | Defines the Harmony executables that the AYON Launcher starts |

The addon bundles the OpenHarmony library and exposes its path to Harmony through the environment variable `LIB_OPENHARMONY_PATH`. Harmony is started through a launch script run by the AYON Launcher, which communicates with Harmony over a local connection.

## AYON menu

The addon adds an **AYON** menu to Harmony's menu bar when a scene is opened.

| Entry | What it does |
|---|---|
| **Version Up Workfile** | Saves the workfile as the next version. Shown only when the core setting for the version-up entry in the AYON menu is enabled (`version_up_current_workfile`). |
| **Workfiles...** | Opens the Workfiles tool. |
| **Create...** | Opens the Creator, to create publish instances. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Set Scene Settings...** | Sets frame rate, frame range, handles and resolution of the scene from the current folder and task. |
| **Experimental Tools...** | Opens the experimental tools. |

## Workfiles

| Item | Behavior |
|---|---|
| Workfile format | A zip archive (`.zip`) of the Harmony scene folder. |
| Local copy | The scene is unpacked to a local folder in `~/.ayon/harmony` and edited there. Saving packs it again and moves the zip to the work folder. |
| Newer local copy | When a local copy exists that is newer than or as new as the stored file, a dialog asks whether to use the local copy or to unpack from the server again. The [cache conflict settings](settings.md#cache-conflict-resolution) can skip the dialog. |
| New scene | Harmony cannot hold an unsaved scene, so a temporary workfile is used. On opening it, a dialog offers to open the Workfiles tool to save it. |
| Outdated containers | When the scene holds outdated loaded products, `Read` nodes are colored and a dialog offers to open **Manage**. |
| Published workfiles | The Workfiles tool can copy and open a published workfile at launch. |

## Products Harmony can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Render | `render` | A `Write` node that renders the connected nodes, set to PNG with alpha. Each render has a **Render target** (local machine or farm) and a **Review** switch. |
| Render Layer | `render` | A group of Harmony layers that share a color group, rendered as one sequence. |
| Render Pass | `render` | A part of a render layer, made of marked layers of that color group. It needs a render layer. |
| Render Layer/Passes | `render` | Creates render layer and render pass instances from the color groups and layers of the scene, optionally renaming the groups first. |
| Template | `harmony.template` | A backdrop around selected nodes, published as a template with the connected nodes and their dependencies. |
| Workfile | `workfile` | The workfile itself, created automatically. |
| Review | `review` | A movie of the `Top/Display` node, created automatically. Disabled by default. |

Palettes have no creator. At publish time the palettes in the scene are collected as `harmony.palette` products, for the tasks the settings allow. A *legacy convertor* finds products created by earlier versions of the addon and converts them.

## Publishing

### Extractors

| Product base type | Published as |
|---|---|
| `render` (local) | Image sequence rendered by a batch run of Harmony over the frame range of the scene, tagged for review. Optionally converted to EXR. |
| `render` (farm) | Not extracted locally. The render is submitted to the render farm. |
| `review` | `.mov` exported from the `Top/Display` node with the openH264 codec. Local only. |
| `harmony.template` | `tpl` representation, a zip of the exported template. |
| `workfile` | `tpl` representation, a zip of the complete scene folder without the rendered frames. The archive is tested for corruption. |
| `harmony.palette` | `plt` palette file with a swatch thumbnail. |

**Extract Save Scene** saves the scene before extraction. **Extract Sequence EXR** converts the PNG renders to EXR when it is enabled in the settings. It uses the OpenImageIO tool and does not work on macOS.

A farm render is submitted by the **Submit to Deadline** plugin of the Deadline addon (page planned), for the `render.farm` family.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Audio | That the scene has a sound column | `render` |
| Validate Scene Settings | That frame rate, frame range, handles and resolution of the scene match the folder, and that the scene file exists. Has a repair action. | `workfile` |
| Validate Instance | That the folder stored in the instance is the current folder. Has a repair action. | All instances |
| Validate Palette Location | That a palette is stored at scene level, not at environment or job level | `harmony.palette` |
| Validate Top Display | That a `Top/Display` node exists | `review` |

### Other publish plugins

- **Increment Workfile** saves the workfile as the next version after a successful publish and marks the previous local folder for deletion. It is optional.
- **Collectors** gather the current file, scene data (frame rate, frame range, resolution, audio path), instances from node metadata, render instances, palettes and the audio file of farm renders.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Image or Sequence | `shot`, `render`, `image`, `plate`, `reference`, `review` | `.png`, `.jpg`, `.jpeg` |
| Load Photoshop Layers | `image` | `.psd` |
| Load Template | `harmony.template`, as a backdrop container | `.zip` |
| Import Template | `workfile`, imported into the scene | `.tpl` |
| Import Workfile | `workfile`, imported into the scene | `.zip` |
| Link Palette | `palette`, `harmony.palette` | `.plt` |
| Import Palette | `palette`, `harmony.palette`, copied into the scene directory | `.plt` |
| Import Audio | `shot`, `audio` | `.wav` |
| BackgroundLoader | `background` | `.json` |

Images and image sequences are loaded as `Read` nodes. Their containers can be updated, switched and removed from the Scene Inventory. Templates and workfiles are imported into the scene, so a newer version has to be loaded again. A linked palette is added to the top of the palette list, so it acts as an override.

## Launch hook

The **HarmonyPrelaunchHook** runs for local launches. It starts Harmony through the AYON Launcher with the launch script. It adds the workfile path (the given one, or the last workfile when starting the last workfile is requested and it exists), tells the launch script whether to show the Workfiles tool at launch and, when the core setting is on, enables the version-up menu entry. On Windows it opens a console window when the AYON console executable is used.

## Related

- [Harmony settings](settings.md)
