---
title: Mocha Pro addon
sidebar_label: Overview
description: "The AYON integration for the Mocha Pro standalone application: the AYON menu, the products it can create and publish (tracking points, shapes, workfiles), its loaders and its requirements."
addon: mocha
addon_repo: ayon-mocha
addon_version: 1.1.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-mocha/tree/1.1.0
  - https://github.com/ynput/ayon-mocha/releases
  - https://help.ayon.app/en/articles/0309485-working-with-mocha-pro-in-ayon
  - https://help.ayon.app/en/articles/3864909-mocha-pro-addon-settings
---

# Mocha Pro addon

<AddonInfo />

The Mocha Pro addon connects the standalone [Mocha Pro](https://borisfx.com/products/mocha-pro/) application to AYON. It adds an AYON menu inside Mocha Pro, manages `.mocha` workfiles, loads clips into the project, and publishes tracking data and shape data through Mocha's own exporters. Its settings are described on the [settings page](settings.md).

The addon supports the standalone application only, not the plugin versions of Mocha Pro inside other applications. The addon's exporter lists cover Mocha Pro 2024.5 and Mocha Pro 2025.

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.13.0 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Mocha Pro executable (host `mochapro`) that the AYON Launcher starts |

The project can override the addon version.

## Where AYON stores its data

Mocha Pro has no place for custom metadata, so the addon stores the AYON context, the publish instances and the loaded containers as JSON in the project notes of the Mocha project, between the markers `AYON_CONTEXT::` and `::AYON_CONTEXT_END`. The notes field is therefore not available for other uses.

## AYON menu

The addon adds an **AYON** menu to the Mocha Pro main window. The label can be changed with the `AYON_MENU_LABEL` environment variable.

| Entry | What it does |
|---|---|
| Current context (disabled entry) | Shows the folder path and task name of the current context. |
| **Create...** | Opens the Publisher on the Create tab. |
| **Load...** | Opens the Loader for the current context. |
| **Publish...** | Opens the Publisher on the Publish tab. |
| **Manage...** | Opens the Scene Inventory, which lists loaded clips. |
| **Library...** | Opens the Library Loader. |
| **Work Files...** | Opens the Workfiles tool. |
| **Reset Frame Range and FPS** | Sets the project length, first frame offset and frame rate from the current task's `frameStart`, `frameEnd` and `fps`. |
| **Experimental Tools...** | Opens the experimental tools dialog. |

## Products Mocha Pro can create

| Creator | Product type | What it publishes |
|---|---|---|
| Shape Data | `matteshapes` | Shapes of the chosen layers, written by one or more Mocha shape exporters |
| Track Points | `trackpoints` | Tracking data of the chosen layers, written by one or more Mocha tracking exporters |
| Workfile | `workfile` | The `.mocha` workfile itself; created automatically with the variant `Main` |

Shape Data and Track Points offer these options in the Publisher:

| Option | Description |
|---|---|
| **Layers** | The project layers to export. |
| **Exporter format** | One or more exporters. Several can be selected; their outputs are published in the same version. The default selection comes from the [settings](settings.md#create-tracking-points). |
| **Layer mode** | **Selected layers** or **All layers**. |

Track Points adds the exporter options **Frame time** (number, default 0), **Invert** and **Remove lens distortion** (both off by default). The UI notes that not all options apply to all exporters.

## Publishing

The collectors read the Mocha project, the paths of the Mocha executable, its Python and its `mochaexport.py` script (Windows, macOS and Linux layouts), and the instances. Each selected exporter becomes one representation, named after the exporter. If an exporter writes several single files, the addon adds them as resources and publishes a manifest file as the representation. An exporter that writes both several sequences and single files is rejected. Workfile instances publish the current `.mocha` file.

| Extractor | Product type | What it does |
|---|---|---|
| Export Tracking Points | `trackpoints` | Runs the selected tracking exporters on the layer. |
| Export Shapes | `matteshapes` | Runs the selected shape exporters. |

| Validator | Product types | What it checks |
|---|---|---|
| Validate Exporters and Layers | `matteshapes`, `trackpoints` | Fails when no layer is set or no exporter is selected. |
| Validate Trackpoint Layers | `trackpoints` | Fails when no layer is set, or when the exporter list is empty. |

The exporters are mapped per Mocha version (2024.5 and 2025) from a display name to the Mocha exporter ID. Tracking formats include After Effects, Nuke, Flame, Fusion, Silhouette, Alembic and HitFilm outputs; shape formats include After Effects, Nuke, Flame, Fusion, Premiere and Silhouette outputs.

## Loading

Both loaders accept any product type and representation, for image extensions.

| Loader | What it does |
|---|---|
| **Load Trackable Clip** | Re-links the project's default trackable clip to the published files and sets its frame size. A Mocha project has one trackable clip, so each load replaces the source of that clip. |
| **Load Clip** | Loads the files as a separate (detached) clip. |

Loaded clips are registered as containers, so the Scene Inventory can update, switch and remove them.

## Related

- [Mocha Pro addon settings](settings.md)
