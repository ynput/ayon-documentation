---
title: Unreal addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Unreal addon with their default values: color management, prelaunch, import, render setup, project setup and creators."
addon: unreal
addon_repo: ayon-unreal
addon_version: 0.4.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-unreal/tree/0.4.0/server
  - https://help.ayon.app/en/articles/8279245-unreal-addon-settings
---

# Unreal addon settings

<AddonInfo />

The settings of the [Unreal addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Unreal follows the color management of AYON. |
| Override global OCIO config | Off | Use an OCIO configuration of this addon instead of the global one. |
| Config path | None | List of paths to the OCIO configuration. |
| Activate Host Rules | Off | Turn on the file rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Prelaunch settings

Settings of the hook that installs the PySide Qt binding into Unreal's Python.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Install PySide2 or PySide6 into Unreal's Python packages. Turn off to skip the hook. |
| Use Offline Package Source | Off | Install PySide from a local folder or URL instead of downloading it. |
| Offline Package Source Path | Empty | Folder or URL holding the PySide package files, for example `.whl` or `.tar.gz`. |
| Install to Launcher Data Path | Off | Install into a dedicated folder in the launcher local data folder (`AYON_LAUNCHER_LOCAL_DIR`) and add it to Unreal's Python path, instead of changing the system, engine or user Python environment. |

## Import settings

| Setting | Default | Description |
|---|---|---|
| Asset directories for loaded assets | `{folder[path]}/{product[name]}_{version[version]}` | Template of the folder that stores loaded assets. |
| Asset name for loaded assets | `{folder[name]}_{product[name]}_{version[version]}_{representation[name]}` | Template of the asset names. |
| Use nanite | On | Import with Nanite enabled. Works only when the interchange pipeline is not used; with interchange, set it in the pipeline asset. |
| Show import dialog | Off | Show Unreal's import dialog. |
| Alembic Conversion Setting Presets | `maya` | Preset that converts loaded Alembic files to the correct UV and transform. |
| Custom Alembic Conversion Setting Presets | See below | Values of the custom preset. |
| Directories for loaded layouts | `{folder[path]}/{product[name]}` | Template of the folder that stores loaded layouts. |
| Layout name for loaded layouts | `{folder[name]}_{product[name]}_{version[version]}` | Template of the layout names. |
| Generate level sequences when loading layouts | On | Create level sequences when a layout is loaded. |
| Enable user override layout representation | Off | Load layouts through a representation type other than the layout JSON. |
| Override layout representation by | `json` | The representation type used when the override is on. |
| Remove loaded assets when deleting layouts | Off | Also remove the assets of a layout when the layout is deleted. |
| Delete assets that are not matched | Off | When running Load Layout on Existing Scene, remove the assets of the current layout that did not match. |

Custom Alembic conversion preset:

| Setting | Default |
|---|---|
| Flip U | Off |
| Flip V | On |
| Rotation X, Y, Z | 90.0, 0.0, 0.0 |
| Scale X, Y, Z | 1.0, -1.0, 1.0 |

## Render setup

| Setting | Default | Description |
|---|---|---|
| Render Queue Path | `/Game/Ayon/renderQueue` | Path of the Render Queue asset used for farm publishing. |
| Render Config Path | `/Game/Ayon/DefaultMovieRenderQueueConfig.DefaultMovieRenderQueueConfig` | Path of the Render Configuration asset used for farm publishing. |
| Pre-roll frames | 0 | Number of frames used as the initial delay of the render. |
| Render format | `exr` | Output format of renders. |

## Project setup

| Setting | Default | Description |
|---|---|---|
| Allow project creation | On | Create a new Unreal project when none exists. Turn off when an external source control such as Perforce provides the project. |
| Use Existing UProject for Project Creation | Empty | Folder that holds an existing `.uproject` to copy as the new project. |
| Force existing project | Off | When on, Unreal does not start unless the project exists. Applies when project creation is off. |
| Dev mode | Off | Generate the Unreal project in the C++ style. |

## Creators

One entry for each creator: Create Camera, Create Layout, Create Render, Create Static Mesh and Create UAsset. The Level creator has no entry. Each entry has the same settings.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Make the creator available. |
| Default Variants | `Main` and `Hero` for Create Camera, `Main` for the others | Variants offered when naming a product. |
| Product Type Items | None | Optional product types that the creator can make, each with a **Product Type** name and a **Label** shown in the UI. |

The addon has no settings for its publish plugins.
