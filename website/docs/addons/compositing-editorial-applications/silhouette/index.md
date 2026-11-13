---
title: Silhouette addon
sidebar_label: Overview
description: "The AYON integration for Silhouette: the AYON menu, the matte shapes, track points and render products it creates, their export formats, loading sources, shapes and trackers, templated workfile build and requirements."
addon: silhouette
addon_repo: ayon-silhouette
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-silhouette/tree/0.2.2
  - https://github.com/ynput/ayon-silhouette/releases
  - https://help.ayon.app/en/articles/9127304-working-with-silhouette-in-ayon
  - https://help.ayon.app/en/articles/5294823-silhouette-addon-settings
---

# Silhouette addon

<AddonInfo />

The Silhouette addon connects Boris FX Silhouette to AYON. It adds an AYON menu to Silhouette, publishes roto matte shapes, tracker points and renders from the node graph, in several interchange formats, publishes the project as a workfile, and loads sources, shapes and trackers into a Silhouette project. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Silhouette executable that the AYON Launcher starts (the application group is `silhouette`) |
| Silhouette | 2023.5 or newer, because the integration is loaded through the `SFX_SCRIPT_IMPORTS` environment variable |

Silhouette 2024.5.0 to 2024.5.3 crash because of a Qt bug when loading custom fonts. Version 2024.5.4 or newer is recommended.

## How the integration works

The addon adds its startup folder to `SFX_SCRIPT_IMPORTS`, so Silhouette runs the AYON startup code on launch. The AYON tools then run inside Silhouette. On startup, when no project with sessions is open, the addon creates a default project with a session labeled `Main` and applies the settings of the current task to it.

Silhouette workfiles use the `.sfx` extension, which is a folder, not a file. The addon also accepts `.zip`. Publishing a workfile zips the folder.

AYON stores its data in properties of the objects it describes. The workfile instance is stored on the project (property `AYON_workfile`), publish instances on the node that is published, and loaded sources on the source item.

## AYON menu

The addon adds a menu to the top menu bar of Silhouette. Several entries can be switched off or given keyboard shortcuts in the [settings](settings.md#ayon-menu).

| Entry | What it does |
|---|---|
| **Current Context** | Shows the folder and task of the session. |
| **Version Up Workfile** | Saves the workfile as the next version. Shown only when the core addon enables its version-up menu option. |
| **Work Files...** | Opens the Workfiles tool. |
| **Create...** | Opens the Creator. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory. |
| **Library...** | Opens the Library Loader. |
| **Set Frame Range** | Sets the frame range and frame rate of the active session from the current task. Can be disabled in settings. |
| **Set Resolution** | Sets the resolution of the active session from the current task. Can be disabled in settings. |
| **Template Builder** | A submenu with *Build Workfile from template*, *Open template*, *Create Place Holder* and *Update Place Holder*. |
| **Experimental Tools...** | Opens the experimental tools dialog. |

## Products it can create

| Creator | Product base type | Node | What it publishes |
|---|---|---|---|
| Matte Shapes | `matteshapes` | Roto node | The shapes of a Roto node. The option **Export shapes** limits the export to chosen shapes; with no selection, all shapes and layers are exported. |
| Track Points | `trackpoints` | Tracker node or Roto node | The trackers of a node. The option **Export trackers** limits the export to chosen trackers; with no selection, all trackers are exported. |
| Render | `render` | Output node | The rendered output of an Output node. The node's path is preset to `$(AYON_WORKDIR)/renders/silhouette/<product name>/<product name>`. The instance has frame range attributes. |
| Workfile | `workfile` | The project | The Silhouette project. An automatic creator, created when the project has none. |

With the **Use selection** option, a Matte Shapes or Track Points instance is added to the selected node when it is of a supported type, instead of a new node. A node can hold more than one publish instance, for example both matte shapes and track points from one Roto node. The default variants of each creator and whether it is available are set in the [settings](settings.md#creator-plugins).

## Publishing

### Extractors

| Extractor | Product base type | Output | Default |
|---|---|---|---|
| Extract Nuke 9+ Shapes | `matteshapes` | `nk` (Silhouette's *Nuke 9+ Shapes* export) | On |
| Extract Nuke 6.2+ Shapes | `matteshapes` | `nk62` (*Nuke 6.2+ Shapes*) | Off |
| Extract Silhouette Shapes | `matteshapes` | `fxs` (*Silhouette Shapes*) | On |
| Extract Shake Shapes | `matteshapes` | `ssf` (*Shake 4.x SSF*) | Off |
| Extract Fusion Shapes | `matteshapes` | `setting` (*Fusion Shapes*) | Off |
| Extract After Effects .txt | `trackpoints` | `txt` (*After Effects* export) | On |
| Extract Nuke 5 Trackers | `trackpoints` | `nk` (*Nuke 5* export). Up to four trackers are merged into one Nuke Tracker node. | On |
| Render Output | `render` | The files rendered by Silhouette's renderer, for the frame range including handles. The publish fails when the render is canceled, makes no output or leaves files missing. | Always |
| Extract Workfile | `workfile` | `sfx_zip`, the zipped project folder. Optionally the `project.sfx` file as `sfx_project`. | Always |

The shape and tracker extractors are optional plugins. They run Silhouette's own export modules on the selected shapes or trackers and close the confirmation dialogs that these modules show.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Missing Shapes | That the node has at least one shape | `matteshapes` |
| Missing Trackers | That the node has at least one tracker | `trackpoints` |

### Other publish plugins

- **Save current file** saves the project before extraction when it has unsaved changes, and fails when the file name changed since collection.
- **Increment current file** is optional and saves the workfile as the next version after the publish.
- **Collectors** gather the active project and session, the current file, the instance node and frame range data, and the frame range of the workfile instance.

## Loading

| Loader | Loads | Formats | What it does |
|---|---|---|---|
| Load Source | Any product | Image and video extensions | Adds the media to the project's sources. It is not placed in the node graph. Image sequences are loaded as a frame range. For `.exr` and `.sxr` files, the option **Load All Parts** loads every subimage as its own source, for example stereo views. The option **Set Session Frame Range on Load** sets the session's start frame and duration from the version. Removing the source from the project also removes its nodes. |
| Load Shapes | `matteshapes` | `fxs` | Imports the shapes into a Roto node. |
| Load Trackers | `trackpoints` | `txt` (the *After Effects Corner-Pin* import) | Imports the trackers into a node that supports trackers. |
| Set frame range | `animation`, `camera`, `pointcache`, `vdbcache`, `usd`, `render`, `plate`, `mayaScene`, `review` | Any | Sets the session's start frame, duration and frame rate from the version, without handles. |
| Set frame range (with handles) | Same | Any | The same, including the handles. |

Load Shapes and Load Trackers have the option **Use selection**. With a selection that supports the imported type, the data is imported into the selected node; otherwise a new node is created. Updating a loaded shape or tracker recreates its child objects, so manual changes to them are lost. The loaded items are tracked, so they can be updated or removed from the Scene Inventory.

## Templated workfile build

The addon supports the templated workfile builder of the core addon. A profile selects a template project by task type and task name. The builder offers a placeholder type for loading products (*Silhouette load*) and one for creating instances (*Silhouette create*). Create placeholders do not work yet; a real publish instance can serve as the placeholder instead. A load placeholder can load several products; only the last loaded one stays connected in the node graph.

## Color management

When enabled, the integration follows the studio's color management through the OCIO files of the core addon, with optional file rules that map file patterns to colorspaces. See the [settings](settings.md#color-management-imageio).

## Related

- [Silhouette settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
