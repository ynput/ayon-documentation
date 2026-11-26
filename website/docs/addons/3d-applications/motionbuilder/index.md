---
title: Motionbuilder addon
sidebar_label: Overview
description: "The AYON integration for Autodesk MotionBuilder: the AYON menu, the animation and workfile products, the FBX publish and load plugins, launch hooks and requirements."
addon: motionbuilder
addon_repo: ayon-motionbuilder
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-motionbuilder/tree/0.2.1
  - https://github.com/ynput/ayon-motionbuilder/releases
  - https://help.ayon.app/en/articles/7411907-working-with-motionbuilder-in-ayon
  - https://help.ayon.app/en/articles/8914380-configure-motionbuilder-addon
---

# Motionbuilder addon

<AddonInfo />

The Motionbuilder addon connects Autodesk MotionBuilder to AYON. It adds an AYON menu to the application, an FBX-based workfile host, and the plugins that create, publish and load animation. Its few settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | newer than 0.3.2 |
| Applications addon | Defines the MotionBuilder executables that the AYON Launcher starts (application group `motionbuilder`) |

The addon was developed with MotionBuilder 2024 and 2025.

## AYON menu

The addon adds an **AYON** menu to the MotionBuilder menu bar, placed before **Help**.

| Entry | What it does |
|---|---|
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Library...** | Opens the Library Loader, for products of library projects. |
| **Work Files...** | Opens the Workfiles tool. |

The menu has no entry for the Creator; products are created from the Publisher.

## Workfiles

The workfile host saves and opens scenes through MotionBuilder's own file functions, and its only workfile extension is `.fbx`. The scene stores the AYON context in a scene property named `AyonContext`.

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Animation | `animation` | Animated data as an FBX file |
| Workfile | `workfile` | The workfile itself. It is an auto-creator, so the instance is made by AYON rather than by the artist. |

The Animation creator has three options, available when creating and later on the instance:

| Option | What it controls |
|---|---|
| Embed Media | Embeds media into the exported FBX. |
| Save Selected Models Only | Exports only the models selected when the instance is created. Their names are stored on the instance and they are connected to the instance node. |
| Keep Transform Hierarchy | Keeps the transform hierarchy of the selected models. It applies only together with Save Selected Models Only. |

The creator also supports a list of additional product types it can create, configured in the [settings](settings.md).

## Publishing

### Extractors

| Plugin | Product base type | Published as |
|---|---|---|
| Extract Animation | `animation` | A `.fbx` file named after the instance, saved with the options of the instance (embed media, selected models only, keep transform hierarchy). The previous selection is restored afterwards. |

The workfile product is published through the generic workfile plugins of the core addon; the addon adds no extractor for it.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Workfile is saved | That the scene has a file name, meaning it has been saved | Workfile |

### Other publish plugins

- **Collect Current File** gathers the path of the open scene. Since 0.2.1 it runs early in the collection stage.
- **Collect Workfile** gathers the workfile instance.
- **Save current file** saves the workfile as the next version during a publish of a `workfile` instance. It uses the core addon's `save_next_version`, and falls back to the older `version_up` when the core addon is too old.

Core addon plugins such as Validate Version can include MotionBuilder by adding the host name `motionbuilder` to their host filters.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Point Cache Loader | `model`, `animation`, `rig`, `camera` | `.fbx` |

The loader appends the FBX into the scene under a unique namespace and creates a container node that tracks the loaded objects. The Scene Inventory can update a loaded product to another version, which merges the new file into the same namespace. Removing a loaded product deletes the container, the objects in its namespace and the namespace itself.

## Launch hooks

| Hook | What it does |
|---|---|
| Inject Python Path | Copies the AYON `PYTHONPATH` into the variable `MOTIONBUILDER_PYTHON_STARTUP`, because MotionBuilder can drop `PYTHONPATH`. Local launches only. |
| Force Startup Script | Adds the addon's startup script to the launch arguments, with `-suspendMessages`. Local launches only. |

## Related

- [Motionbuilder settings](settings.md)
