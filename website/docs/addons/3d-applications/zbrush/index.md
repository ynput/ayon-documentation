---
title: Zbrush addon
sidebar_label: Overview
description: "The AYON integration for Zbrush: the AYON menu, the workfile and model products Zbrush can create and publish, the model loader, workfile metadata and its requirements."
addon: zbrush
addon_repo: ayon-zbrush
addon_version: 0.4.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-zbrush/tree/0.4.2
  - https://github.com/ynput/ayon-zbrush/releases
  - https://help.ayon.app/en/articles/2471745-working-with-zbrush-in-ayon
  - https://help.ayon.app/en/articles/9376182-zbrush-addon-settings
---

# Zbrush addon

<AddonInfo />

The Zbrush addon connects [Zbrush](https://www.maxon.net/en/zbrush) to AYON. It adds an AYON palette to the Zbrush interface that opens the pipeline tools, keeps the AYON data of a workfile beside it, and provides the plugins that publish models and workfiles and load models. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Zbrush executables that the AYON Launcher starts |

The workfile extension is `.zpr`. On Windows the AYON tools open in their own console window.

## How the integration works

Zbrush is controlled through ZScript. At launch the addon starts Zbrush with a startup script and writes the ZScript of the AYON menu. The menu buttons start the AYON tools in a separate process, and the addon runs ZScript in Zbrush for operations such as importing and exporting meshes. The addon sets the environment variable `ZBRUSH_EXE`.

## AYON menu

The addon adds an **AYON** palette to Zbrush, with two sub-palettes.

| Entry | What it does |
|---|---|
| **AYON:Tools:Load...** | Opens the Loader. |
| **AYON:Tools:Publish...** | Opens the Publisher, which also holds the Creator. |
| **AYON:Tools:Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **AYON:Project:Work Files...** | Opens the Workfiles tool. |

## Workfile metadata

Zbrush has no place in its `.zpr` files for AYON data. The addon stores it in a `.zbrushmetadata` folder in the work directory, as JSON files.

| Data | Holds |
|---|---|
| `containers` | The products loaded into the workfile. |
| `create-context` | The creator context data. |
| `instances` | The publish instances. |
| `context` | The project, folder path and task of the workfile. |

Before the first save the data is temporary. When the workfile is saved or versioned up through the Workfiles tool, the data is kept in a subfolder named after the workfile, and copied to the new name when the version increases. Opening and saving workfiles through Zbrush's own file functions does not update this data.

## Products Zbrush can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Model | `model` | The active tool, exported as a mesh |
| Workfile | `workfile` | The workfile itself, created automatically |

The Model creator has two attributes.

| Attribute | Default | Description |
|---|---|---|
| Subdivision Level | 0 | A value of 1 or more exports at that level. 0 uses the current subdivision level of the tool. A negative value counts down from the highest level, so -1 is the highest. |
| Export Format Options | `obj` | One of `abc`, `fbx` and `obj`. |

## Publishing

| Plugin | Applies to | What it does |
|---|---|---|
| Extract Model | `model` | Exports the active tool to the chosen format at the chosen subdivision level. The representation has the name of the format. |
| Collect Current File, Collect Workfile | `workfile` | Collect the current workfile as the representation of the workfile instance. |
| Save current file | `workfile` | Saves the workfile as the next version while publishing. |

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Edit Mode | That the **Transform > Edit** mode of Zbrush is on, because models cannot be exported otherwise. The repair action turns it on. The validator is optional. | Model |

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Mesh Loader | `model` | `.abc`, `.fbx`, `.obj`, `.ma` |

The loader imports the file with Zbrush's **Tool > Import**, so the mesh becomes a subtool. Updating and switching a version import the new file and update the container data. Removing a loaded item removes its container data and tries to remove the subtool.

## Timers

The optional setting [Stop timer on application exit](settings.md) stops the running time tracker through the Timers Manager when Zbrush closes.

## Related

- [Zbrush settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
