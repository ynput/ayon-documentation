---
title: PureRef addon
sidebar_label: Overview
description: "The AYON integration for PureRef: how PureRef is launched, the AYON tools window, the image and workfile products it can create and publish, the loaders and its requirements."
addon: pureref
addon_repo: ayon-pureref
addon_version: 0.1.0
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-pureref/tree/0.1.0
  - https://github.com/ynput/ayon-applications/tree/1.4.6
---

# PureRef addon

<AddonInfo />

The PureRef addon connects [PureRef](https://www.pureref.com), a reference image board application, to AYON. It launches PureRef from the AYON Launcher together with a small AYON process that opens the pipeline tools, keeps the AYON data of a PureRef file beside it, and provides the plugins that publish the board as an image or as a workfile and load images and boards into PureRef. Its settings are described on the [settings page](settings.md). The addon is at an early version (0.1.0): it is not listed in the AYON Market and is installed from its GitHub repository.

## Requirements

| Requirement | Version |
|---|---|
| AYON server | No minimum declared |
| Required addons | None. The AYON core addon and the Applications addon are used at runtime. |
| Applications addon | Defines the PureRef application group. The default variant is `2.1.3` with the executable `C:\Program Files\PureRef\PureRef.exe` on Windows; no macOS or Linux executable is set by default. |

The workfile extension is `.pur`. The addon has a server part (settings) and a client part, and runs no services.

## How the integration works

The addon works through the PureRef command line and a local WebSocket connection.

1. Launch hooks replace the PureRef command with an AYON process that runs `launch_script.py`. The hooks set the environment variable `PUREREF_EXE` to the PureRef executable.
2. The AYON process starts a WebSocket server on a free port and starts PureRef. It waits for PureRef to connect. `WEBSOCKET_URL` defaults to `ws://localhost:6010` when it is not set, and the process sets it to the port it uses.
3. After the connection, the process shows the **Ayon tools** window. The connection also offers routes for the Workfiles, Loader and Publisher tools.
4. Operations such as opening, saving and exporting run the PureRef executable with command line commands such as `load`, `save`, `exportScene` and `exit`.

### Launch hooks

| Hook | Order | What it does |
|---|---|---|
| `PureRefStartupScript` | 10 | Stores the executable in `PUREREF_EXE` and wraps the launch in the AYON process described above. |
| `ConfigurePureRefSettings` | 11 | Adds PureRef settings arguments to the launch: `OpenFilesIn=CurrentWindow`, `Unsaved_Scene_Behavior=Discard`, `Always_On_Top=true` and `PeriodicSave=true`. |
| `SetCurrentPurerefWorkfile` | 12 | Passes the last workfile to PureRef and sets `CURRENT_PUR` to it. When the last workfile is not used or does not exist, an empty `untitled.pur` in the temporary folder of the project is used. |
| `LaunchServerNoWindow` | 1000 | Windows only. Starts the process in a new console window. |

All hooks apply to local launches of the `pureref` application group. The addon also sets `AYON_LOG_NO_COLORS=1` when it is not set and removes `QT_AUTO_SCREEN_SCALE_FACTOR` from the environment.

## AYON tools window

The window **Ayon tools** stays on top while PureRef runs. It has three buttons.

| Button | Opens |
|---|---|
| **Load...** | The Loader. |
| **Publish...** | The Publisher, which also holds the Creator. |
| **Workfile...** | The Workfiles tool. |

## Workfile metadata

A `.pur` file has no place for AYON data. The addon stores it as JSON files in a `.pureref_metadata` folder in the work directory (`AYON_WORKDIR`).

| Data | Holds |
|---|---|
| `context` | The project, folder path and task of the session. |
| `create_context` | The creator context data, such as publish attribute states. |
| `instances` | The publish instances of the workfile. |
| `containers` | The items loaded into the workfile. |

The last three are kept in a subfolder named after the workfile, and are copied to the new name when the workfile is saved under a new name through AYON. When PureRef closes, the data of the `untitled` workfile is removed. The addon cannot detect unsaved changes in PureRef, so the workfile is always reported as having none.

## Products PureRef can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Image | `image` | The board rendered to an image |
| Workfile | `workfile` | The `.pur` file itself, created automatically |

The Image creator has one attribute, **Review** (default on), which marks the published image as reviewable.

## Publishing

| Plugin | Applies to | What it does |
|---|---|---|
| Collect Current File | Context | Collects the path of the current workfile. Logs an error when the scene is not saved. |
| Collect Workfile | `workfile` | Adds the `.pur` file as the representation of the workfile instance. |
| Extract Image | `image` | Loads the workfile in PureRef, exports the board with the `exportScene` command and adds a representation named after the extension. |
| Save current file | `workfile` | Saves the workfile as the next version while publishing. |

When **Review** is on, the image instance gets the `review` family and its representation the `review` tag, with the frame range 1001 to 1001 and the frame rate of the context.

The Extract Image plugin adds these options to the Publisher, with their defaults from the [settings](settings.md).

| Option | Description |
|---|---|
| Resolution width, Resolution height | Size of the exported image in pixels. |
| Canvas background | Canvas background option of the export. |
| Image borders | Image borders option of the export. |
| Include children | Include children option of the export. |

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Workfile is saved | That the current file is not `untitled.pur`, which is the unsaved board. | `workfile` |

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Image | `render2d`, `source`, `plate`, `render`, `prerender`, `review`, `image` | The image extensions known to AYON core |
| Load Workfile | `workfile` | `.pur` |

Load Image opens the image file in PureRef, so it is added to the current board, and records a container for it. Load Workfile opens the `.pur` file in PureRef as the current workfile. The loaders define no update or remove actions.

## Related

- [PureRef settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
