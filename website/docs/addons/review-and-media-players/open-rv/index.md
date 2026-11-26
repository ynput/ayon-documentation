---
title: Open RV addon
sidebar_label: Overview
description: "The AYON integration for Open RV: launching Open RV from AYON, the AYON menu, loaders, the Open in RV actions, workfile publishing, requirements and command line commands."
addon: openrv
addon_repo: ayon-openrv
addon_version: 1.2.4
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-openrv/tree/1.2.4
  - https://github.com/ynput/ayon-openrv/releases
  - https://help.ayon.app/en/help/articles/5906891-working-with-openrv-in-ayon
  - https://help.ayon.app/en/help/articles/6197405-openrv-addon-settings
---

# Open RV addon

<AddonInfo />

The Open RV addon connects [Open RV](https://github.com/AcademySoftwareFoundation/OpenRV), an open-source image and sequence viewer, to AYON. It works in two ways. As an application integration, Open RV is started by the AYON Launcher with an AYON menu, the AYON tools and a `workfile` product. As a media player, published media and RV sessions are opened in Open RV from the Loader in other applications, from the tray Loader or from the AYON web interface. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | 0.2.0 or newer. Defines the `openrv` application group and its executables, which the AYON Launcher starts |

The addon starts whatever executable is configured for the `openrv` application group. Since 1.2.4 this can also be OpenUTV: the launch hook looks for the RV package manager as `utvpkg` or `rvpkg` next to the executable and prefers `utvpkg`.

## Launching Open RV from AYON

When Open RV is launched through the AYON Launcher, the addon:

- creates a temporary RV support folder, writes the two packages `ayon_menus` and `ayon_scripteditor` into it, installs and opts them in with the package manager, and appends the folder to `RV_SUPPORT_PATH`;
- sets `AYON_LOG_NO_COLORS` to `True` unless it is already set;
- passes the representations to load on startup to Open RV, when the launch was started to open a representation;
- uses the workfile extension `.rv`.

## AYON menu

The `ayon_menus` package adds an **AYON** menu to Open RV.

| Entry | What it does |
|---|---|
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the session. |
| **Library...** | Opens the Library Loader, for products of library projects. |
| **Work Files...** | Opens the Workfiles tool. |

When the review desktop addon is enabled in the project settings, its panels are added to the menu as further entries with the shortcuts Ctrl+Shift+1, 2 and so on. The panels that were visible in the last session are reopened on startup when they are still available.

The `ayon_scripteditor` package adds **Tools > Script Editor**, a Python console window for the session.

## Publishing

Open RV has one creator: **Workfile**, an automatic creator with the `workfile` product base type. It publishes the RV session as a versioned `.rv` file.

| Plugin | Type | What it does |
|---|---|---|
| Collect Current File | Collector | Adds the current session file to the publish context. |
| OpenRV Session Workfile | Collector | Adds the current file as the representation of the `workfile` instance. |
| Extract Save Scene | Extractor | Saves the session before extraction. |
| Validate Workfile | Validator | Fails when there is no current file to publish. |
| Increment Workfile | Integrator, optional | Saves the workfile as the next version after publishing. |

## Loading

### Inside Open RV

| Loader | Loads | Formats |
|---|---|---|
| Load Frames | Any product, as an image sequence or still image | Image extensions known to the core addon |
| Load MOV | Any product, as a video | `mov`, `mp4` |
| Open RV session (loader action) | An RV session, from a representation named `rv` | `.rv` |

The media loaders add the files as sources under a switch group labeled `<folder path> > <product name>`. Updating a loaded product adds the new version as another media representation of the same group and activates it. When the representation has colorspace data and an OCIO configuration is active, the colorspace is applied to the source. Loaded products are tracked and can be updated, switched or removed from the Scene Inventory.

**Open RV session** opens the published `.rv` file as the current session and clears the session file name, so that the published file is not overwritten by accident.

### From other applications and the tray

These loaders are offered in the Loader of other hosts and of the tray, and are shown with a play icon.

| Loader | What it does |
|---|---|
| Open in RV | Sends the representation to a running Open RV. When none is connected, it starts the latest available `openrv` variant with the `-network` argument and then sends the representation. |
| Open in Existing RV | Sends the representation to a running Open RV. It fails when no connected Open RV is found. |

Both work for representations with image or video extensions. They talk to Open RV over its network port, using the connection name, port and timeout from the [network settings](settings.md#network-settings). Open RV must run with its network mode enabled, which the `-network` flag in the arguments of the application variant provides.

## Web action

The addon adds the action **Open in RV** (category Desktop tools) for a single selected version in the AYON web interface.

- It opens the version's RV workfile representation, which is a representation named `rv` of a `workfile` product, when there is one. Otherwise it opens a media representation (image or video extension). When there are several media representations, a form asks which one.
- A form asks for the Open RV variant when more than one is configured in the Applications settings for the bundle.
- The action starts the AYON Launcher, which starts Open RV with the context of the version.

## Command line

The addon adds an `openrv` group to the launcher's `addon` command.

| Command | What it does |
|---|---|
| `openrv open-workfile` | Opens a published RV workfile representation. Options: `--project`, `--representation`, `--app` (optional variant, for example `openrv/2025`). |
| `openrv open-representation` | Opens an RV workfile or a media representation. Same options. |

Without `--app`, the latest available `openrv` variant is used. A published workfile opened this way has its session file name cleared after start.

## Related

- [Open RV settings](settings.md)
