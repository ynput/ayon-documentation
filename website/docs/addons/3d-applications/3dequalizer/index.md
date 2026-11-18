---
title: 3DEqualizer addon
sidebar_label: Overview
description: "The AYON integration for 3DEqualizer: the AYON menu, the match move and lens distortion products it publishes for Maya and Nuke, the loaders for plates and models, launch hooks and requirements."
addon: equalizer
addon_repo: ayon-equalizer
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-equalizer/tree/0.2.2
  - https://github.com/ynput/ayon-equalizer/releases
  - https://help.ayon.app/en/articles/4884565-working-with-3dequalizer-in-ayon
  - https://help.ayon.app/en/articles/0829992-configure-3dequalizer-addon
---

# 3DEqualizer addon

<AddonInfo />

The 3DEqualizer addon (addon name `equalizer`) connects 3DEqualizer (3DE) to AYON. It adds an AYON menu to 3DE, loads plates and models into a 3DE project, and publishes tracking results as export scripts for Maya and Nuke and as a Nuke lens distortion node. 3DE projects use the `.3de` extension. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | Newer than 1.3.0 |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the 3DEqualizer executables that the AYON Launcher starts |
| Qt binding | PySide2 or PySide6 available in 3DE's Python |

A launch hook (**Install Qt Binding**) checks for a Qt binding in 3DE's Python and installs one when it is missing: PySide2 for 3DE Python 3.10 and older, PySide6 for newer versions. The location of 3DE comes from the `TDE4_ROOT` environment variable, or is deduced from the executable path in the applications settings. The installation can fail when 3DE is in a protected location, such as a network drive or a folder without write access. The Qt binding then has to be installed manually.

## AYON menu

The addon puts a script for each tool into the **AYON** menu of the 3DE main window. It registers them through the `PYTHON_CUSTOM_SCRIPTS_3DE4` environment variable, so a startup script that replaces that variable removes the menu.

| Entry | What it does |
|---|---|
| **Create ...** | Opens the Publisher on its create tab. |
| **Load ...** | Opens the Loader. |
| **Publish ...** | Opens the Publisher on its publish tab. |
| **Manage ...** | Opens the Scene Inventory. |
| **Work files ...** | Opens the Workfiles tool. |

## Products 3DEqualizer can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Match Move | `matchmove` | Export scripts of the tracked cameras and models |
| Lens Distortion | `lensDistortion` | A lens distortion node for Nuke, for the current camera |

The Match Move creator has two instance options.

| Option | Values | Default |
|---|---|---|
| **Camera(s) to publish** | **All Cameras**, **Current Camera**, **Reference Cameras**, **Sequence Cameras**, or one enabled camera by name | **Current Camera** |
| **Model(s) to publish** | **No 3D Models At All**, **All 3D Models**, or one model by name | **No 3D Models At All** |

## Publishing

### Extractors

The extractors run the export scripts that ship with 3DE, so the output follows the installed 3DE version.

| Extractor | Product base type | Published as | Optional |
|---|---|---|---|
| Extract Maya Script | `matchmove` | A MEL script (`.mel`) with 3DE 7, a Python script (`.py`) with 3DE 8 | Yes |
| Extract Nuke Script | `matchmove` | A Nuke script (`.nk`) | Yes |
| Extract Lens Distortion Nuke node | `lensDistortion` | A Nuke script with the lens distortion node (`.nk`) | No |

The Maya script extractor has these options in the Publisher.

| Option | Default | Description |
|---|---|---|
| **Hide Reference Frame** | Off | Hides the reference frames in the export. |
| **Export UV Textures** | Off | Includes UV textures. |
| **Overscan Width %** | 100 | Overscan width in percent (1 to 1000). |
| **Overscan Height %** | 100 | Overscan height in percent (1 to 1000). |
| **Units** | `mm` | One of `mm`, `cm`, `m`, `in`, `ft`, `yd`. |
| **Export Point Sets** | On | Includes point sets. |
| **Export 2.5D Points** | On | Includes 2.5D points. |

The lens distortion extractor has the option **FOV Mode**: `legacy` (default) or `new (v8+)`.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Camera Point Group | That the project has a point group of type camera | `matchmove` |
| Validate Instance has Camera data | That camera data was collected for the instance | `matchmove` |

### Collectors

Collectors gather the 3DE installation directory and version, the camera data of the selected cameras (name, enabled state, calculation range, playback range, FOV, FPS and path) and the current project file, which is published as the workfile.

## Loading

| Loader | Loads | Formats | What it does |
|---|---|---|---|
| Load sequence | `imagesequence`, `review`, `render`, `plate`, `image`, `online` | Image formats | Creates a new sequence camera, sets the sequence path, the frame range (including handles), the frame offset and the frame rate. |
| Load model | `model` | `.obj` | Imports the model into the selected point group. Exactly one point group has to be selected. New in 0.2.2. |

Both loaders can update and switch versions. Loaded products are tracked in the Scene Inventory. The addon stores the tracking data, and the publish instances, in the project notes of the 3DE project, in a block delimited by `AYON_CONTEXT::` and `::AYON_CONTEXT_END`. Editing that block can break version management.

## Launch hooks

| Hook | What it does |
|---|---|
| Install Qt Binding | Installs PySide2 or PySide6 into 3DE's Python when missing. |
| Add last workfile to launch arguments | Starts 3DE with the workfile to open (`-open <path>`): an explicit workfile path, or the last workfile when the launcher is set to start it. |

## Related

- [3DEqualizer settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
