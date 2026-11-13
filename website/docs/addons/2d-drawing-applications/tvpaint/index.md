---
title: TVPaint addon
sidebar_label: Overview
description: "The AYON integration for TVPaint Animation: the AYON Tools panel, workfile handling, the products TVPaint can create, publish and load, its validators and extractors, and its requirements."
addon: tvpaint
addon_repo: ayon-tvpaint
addon_version: 0.4.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-tvpaint/tree/0.4.3
  - https://github.com/ynput/ayon-tvpaint/releases
  - https://help.ayon.app/en/articles/8337707-working-with-tvpaint-in-ayon
  - https://help.ayon.app/en/articles/8770967-tvpaint-addon-settings
---

# TVPaint addon

<AddonInfo />

The TVPaint addon connects [TVPaint Animation](https://www.tvpaint.com/) to AYON. Inside TVPaint it adds an **AYON Tools** panel that opens the pipeline tools, and it provides the plugins that create, publish and load products from TVPaint scenes. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.2 or newer (required) |
| Job Queue addon | 1.1.0 or newer (compatible) |
| Applications addon | Defines the TVPaint executables that the AYON Launcher starts |

The addon ships a native TVPaint plugin (`tvpaint_plugin`) that talks to a local server over a JSON-RPC websocket connection. The AYON pipeline tools run in the AYON Launcher process, which controls TVPaint with George scripts. A worker (`worker`) can also run TVPaint commands received as jobs from the Job Queue addon.

## AYON Tools panel

The addon adds a panel named **AYON Tools** to TVPaint. The panel title uses the value of the environment variable `AYON_MENU_LABEL` when it is set.

| Entry | What it does |
|---|---|
| **Workfiles** | Opens the Workfiles tool. |
| **Load** | Opens the Loader. |
| **Scene inventory** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Publish** | Opens the Publisher. Publish instances are created in the Publisher. |
| **Library** | Opens the Library Loader, for products of library projects. |
| **Experimental tools** | Opens the experimental tools dialog. |

## Workfiles

| Item | Behavior |
|---|---|
| Workfile extension | `.tvpp` |
| Metadata | The addon stores the context (project, folder, task), the publish instances and the loaded containers as metadata inside the workfile. After a workfile is opened, the current global context is stored in it again. |
| Context checks | The validators **Validate Workfile Metadata** and **Validate Workfile Project Name** check that the stored metadata exists and belongs to the current project. |

## Launch hooks

Both hooks run for local launches.

| Hook | What it does |
|---|---|
| **TvpaintPrelaunchHook** | Starts TVPaint through the AYON Launcher with the addon's launch script, which installs the TVPaint host, instead of starting the executable directly. |
| **TvpaintGeorgeWritePopup** | Windows only. Sets the TVPaint preference `georgecanwritefiledisplaypopup` to `0` in the `config.ini` of the installed TVPaint versions, so that TVPaint does not show its modal "Write to file" permission popup. Added in 0.4.3. |

When the setting [Stop timer on application exit](settings.md#general) is on, the addon asks the AYON server to stop the running timer when TVPaint closes.

## Products TVPaint can create

The integration does not guess what to publish: instances are created explicitly, except for the automatic ones.

| Creator | Product base type | What it publishes |
|---|---|---|
| Render Layer | `render` | All layers of one TVPaint color group, rendered as one sequence. The variant is used as the name of the color group. |
| Render Pass | `render` | A part of a render layer: selected TVPaint layers that are marked with the color group of that render layer. It needs a render layer. |
| Render Layer/Passes | `render` | Creates render layer and render pass instances from the scene: the color group name becomes the variant of a render layer and the TVPaint layer name the variant of a render pass. It can rename the color groups first. Disabled by default. |
| Scene Render | `render` | The whole scene as one render instance, created automatically. Inactive by default. |
| Review | `review` | A review of the visible layers, created automatically. |
| Workfile | `workfile` | The workfile itself, created automatically. |

A *legacy convertor* finds products created by earlier versions of the addon and converts them. Product name templates for render layers and passes can use the keys `renderlayer` and `renderpass`; the templates are defined in the product name profiles of the core addon.

## Publishing

### Extractors and collectors

| Plugin | What it does |
|---|---|
| Extract Sequence | Renders the visible layers of `render` and `review` instances to a `png` image sequence over the mark in to mark out range of the scene, plus a thumbnail. The scene start frame is set to 0 during rendering and restored afterwards. Review instances are exported with the **Review BG color**; other instances are rendered layer by layer and composited. Instances marked for the farm are skipped. Instances marked for review get the `review` tag. |
| Extract Sequence EXR | Converts the PNG renders to EXR when enabled in the settings. It uses the OpenImageIO tool and does not work on macOS. Instances marked for the farm are skipped. |
| Collect Workfile | Adds the workfile as the representation of the `workfile` instance, named by its extension (`tvpp`). |
| Collect Render Instances | Collects layers and review state of render layer, render pass, scene render and review instances. Render passes can ignore the opacity of their layers (setting **Ignore Render Pass opacity**). |
| Collect Current File, Collect Workfile Data, Collect output frame range | Gather the current file, the scene data (marks, start frame, frame rate, resolution, background color, layers) and the output frame range. |
| Increment Workfile Version | Saves the workfile as the next version after a successful publish. Optional. |

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Folder Paths | That the folder path stored in each instance equals the current context's. Has a repair action. | Context |
| Validate Scene Settings | That frame rate, resolution and pixel aspect of the scene match the attributes of the task. | Context |
| Validate Mark In/Out | That mark in and mark out are enabled and that their duration equals the frame range of the folder plus handles. Has a repair action. | Context |
| Validate Start Frame | That the start frame of the scene is 0. Has a repair action. | Context |
| Validate Layers Visibility | That at least one layer of the instance is visible. | `review`, `render` |
| Validate Missing Layers Names | That the layers of a render pass exist. | Render passes |
| Validate Duplicated Layers Names | That the layer names of a render pass are unique in the whole workfile. | Render passes |
| Validate Layers Group | That the layers of a render pass are in the same color group as when the pass was created. | Render passes |
| Validate Render Layers Group | That no two render layers use the same color group. | Render layers |
| Validate Workfile Metadata | That the workfile contains the metadata required for publishing. The repair action **Use current context** saves the workfile, which stores the metadata. | `workfile` |
| Validate Workfile Project Name | That the project name stored in the workfile is the project of the current session. | Context |

Four of these validators have settings (Validate Scene Settings, Validate Mark In/Out, Validate Start Frame and Validate Folder Paths, see [settings](settings.md#publish-plugins)); the others always run.

## Loading

| Loader | Loads | Behavior |
|---|---|---|
| Load Image | `render`, `image`, `background`, `plate`, `review` | Loads an image or sequence as a new layer and registers a container, so that it can be managed in the Scene Inventory. Options: **Stretch to project size**, **Stretch to timeline length**, **Preload loaded image/s**. |
| Import Image | `render`, `image`, `background`, `plate`, `review` | Loads an image or sequence as a new layer without registering a container. Same options. |
| Import Sound | `audio`, `review`, `plate` | Loads a sound into the TVPaint clip. Video files are accepted without a check that they contain audio. |
| Load Workfile | `workfile` (`.tvpp`) | Loads a published workfile into TVPaint. |

## Related

- [TVPaint settings](settings.md)
