---
title: Premiere Pro addon
sidebar_label: Overview
description: "The AYON integration for Adobe Premiere Pro: the AYON extension panel, the workfile product it creates, publishing, loading footage and After Effects compositions, and its requirements."
addon: premiere
addon_repo: ayon-premiere
addon_version: 0.2.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-premiere/tree/0.2.3
  - https://github.com/ynput/ayon-premiere/releases
  - https://help.ayon.app/en/articles/3607676-working-with-premiere-in-ayon
  - https://help.ayon.app/en/articles/1663762-premiere-addon-settings
---

# Premiere Pro addon

<AddonInfo />

The Premiere Pro addon connects Adobe Premiere Pro to AYON. It adds an **AYON** panel (an Adobe CEP extension) to Premiere Pro that opens the pipeline tools, publishes the project file (`.prproj`) as a workfile, and loads published footage, image sequences and After Effects compositions into the project as managed bins. The addon has one setting, described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Premiere Pro executable that the AYON Launcher starts (the application group is `premiere`) |

The AYON extension must be installed in Premiere Pro on each machine. It is shipped inside the addon as `extension.zxp`, with the extension bundle id `io.ynput.PPRO.panel` (bundle version 1.1.10 in addon 0.2.3). The manifest targets Premiere Pro (CEP host `PPRO`) 11.0 or newer. The extension can be installed by a pre-launch hook (see [Launch hooks](#launch-hooks)) or with an extension installer tool.

## How the integration works

When Premiere Pro is started from the AYON Launcher, a pre-launch hook starts a Python process with the AYON tools next to it. The panel in Premiere Pro talks to that process over a local WebSocket connection (default `ws://localhost:8096/ws/`, set through the `WEBSOCKET_URL` environment variable). The panel buttons call the AYON tools, and AYON calls back into Premiere Pro to open, save, import and replace items.

AYON stores its own data, such as created instances and loaded containers, inside the project file. It keeps it in the description field of a clip in a bin named `AYON Metadata - DO NOT DELETE`. Deleting that bin loses the information about loaded items.

## AYON panel

The panel is the extension named **AYON**, available in Premiere Pro under *Window > Extensions*.

| Button | What it does |
|---|---|
| **Workfiles...** | Opens the Workfiles tool. Premiere Pro workfiles use the `.prproj` extension. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists the loaded items. |
| **Experimental Tools...** | Opens the experimental tools menu. |

Buttons for setting the resolution and frame range and for templated workfile build (placeholders, build from template) are not available in the panel.

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Workfile | `workfile` | The current `.prproj` file |

The workfile creator is an automatic creator: the instance is created without artist action and is re-created if removed. It can be disabled for a publish in the Publisher. If the folder or task of the session changes, the instance follows the new context.

## Publishing

| Plugin | Type | What it does |
|---|---|---|
| Current File | Collector | Adds the path of the current project file to the publish context. It runs early, before other collectors. |
| Collect Premiere Workfile Instance | Collector | Adds a `prproj` representation to the `workfile` instance, from the current project file. |
| Increment Workfile | Integrator | Optional. After the publish, saves the project as the next workfile version. It does nothing when any plugin of the publish failed. |

The addon has no validators and no render extractors: only the workfile is published.

## Loading

| Loader | Loads | Formats | Result |
|---|---|---|---|
| Load file | Any product base type | Image and video extensions known to the AYON core addon | A new bin named after the folder and product, with the imported files. Multi-file representations are imported as an image sequence. |
| Load AfterEffects Compositions | `workfile` products | `.aep` | One bin for each composition chosen in the **Available compositions** option. The compositions listed come from the data that the After Effects addon stores in the published workfile. |

The extension filter of the Load file loader covers image and video extensions only.

Loaded items are tracked as containers, so they can be updated to another version or switched to another folder or product from the Scene Inventory, and removed. When an image sequence is updated, its original trims are stored and restored (added in 0.2.3).

## Launch hooks

| Hook | Order | What it does |
|---|---|---|
| Install AYON extension (`InstallAyonExtensionToPremiere`) | 1 | When the **Install AYON Extension** setting is on, extracts the extension into the user's CEP extensions folder (`Adobe/CEP/extensions/io.ynput.PPRO.panel` under the user data directory). When an extension is already installed there, it compares the bundle versions and replaces it only when they differ. Failures are logged as warnings and do not stop the launch. |
| Premiere prelaunch (`PremierePrelaunchHook`) | 20 | Wraps the Premiere Pro executable in the AYON launch script, adds the workfile to open (an explicit workfile path, or the last workfile when starting it is requested and it exists), and tells the integration whether to show the Workfiles tool on launch. On Windows it opens a console window when the AYON console executable is used, and otherwise hides the output. |

Both hooks apply to local launches only.

## Related

- [Premiere Pro settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
