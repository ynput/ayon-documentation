---
title: SpeedTree addon
sidebar_label: Overview
description: "The AYON integration for SpeedTree: the floating AYON tools window, the model and workfile products, FBX and XML publishing, workfile loading, launch hooks and requirements."
addon: speedtree
addon_repo: ayon-speedtree
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-speedtree/tree/0.2.1
  - https://github.com/ynput/ayon-speedtree/releases
  - https://help.ayon.app/en/articles/1430359-working-with-speedtree-in-ayon
  - https://help.ayon.app/en/articles/9963950-configure-speedtree-addon
---

# SpeedTree addon

<AddonInfo />

The SpeedTree addon connects SpeedTree to AYON. SpeedTree has no menu API for AYON, so the addon starts SpeedTree through a launcher script that talks to it over the SpeedTree Pipeline SDK Python bindings, and shows the AYON tools in a separate floating window. It publishes models as FBX plus XML, and loads published workfiles. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the SpeedTree executables that the AYON Launcher starts (application group `speedtree`) |
| SpeedTree Pipeline SDK | Its Python bindings folder must be set in the [settings](settings.md) |

## AYON tools window

The tools are shown in a floating window with three buttons. The window cannot be closed with the standard close icon.

| Button | What it opens |
|---|---|
| **Load...** | The Loader. |
| **Publish...** | The Publisher, where products are also created. |
| **Workfile...** | The Workfiles tool. |

The window has no buttons for Create and Scene Inventory.

## Workfiles

The workfile host uses `.spm` as its only workfile extension. When SpeedTree is launched without a workfile, the addon copies a template `.spm` file to a temporary directory and opens it. The template is the **Custom Template Path** setting if the file exists, otherwise `tree_templates/Games/Blank.spm` next to the SpeedTree installation. When the launch asks for the last workfile and it exists, or a specific workfile path is given, that file is opened instead. Work that stays in the temporary copy is lost unless it is saved through the Workfiles tool.

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Model | `model` | The current scene as FBX and XML |
| Workfile | `workfile` | The workfile itself. It is an auto-creator, so the instance is made by AYON rather than by the artist. |

## Publishing

### Extractors

| Plugin | Product base type | Published as |
|---|---|---|
| Extract Model | `model` | `.fbx` and `.xml` files named after the instance |

The extractor saves the scene, reloads the saved file through the SpeedTree SDK and exports it with fixed options: FBX cache compatible, MCX cache format, Maya Y-up axis, smooth bones, with 3D geometry and bones, and wind animation at 30 fps. These options are not configurable in the settings.

### Other publish plugins

- **Collect Current File** gathers the path of the open scene.
- **Collect Workfile** gathers the workfile instance.
- **Save current file** saves the workfile as the next version during a publish of a `workfile` instance.

The addon provides no validators.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Workfile | `workfile` | `.spm` |

The loader saves the published file as a new version of the current task's workfile and makes it the open scene. Other product types cannot be loaded, because of limits of the SpeedTree API.

## Launch hooks

| Hook | What it does |
|---|---|
| Startup script (order 10) | Keeps the SpeedTree executable path in `SPTREE_EXE` and launches the addon's launch script through the AYON launcher, with the executable path as argument. Local launches only. |
| Copy SDK Python binding | Copies the SDK Python bindings folder from the **Pipeline SDK directory** setting into the addon and adds it to `PYTHONPATH`. It syncs the folder with the Perforce addon first, when that addon is available. Local launches only. |
| Create temp spm file (order 12) | Chooses the workfile to open, as described under Workfiles, and stores it in `CURRENT_SPM`. Local launches only. |
| Launch server no window (order 1000) | On Windows, starts the process in a new console, which makes the AYON tools start faster. Local launches only. |

## Related

- [SpeedTree settings](settings.md)
