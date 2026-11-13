---
title: Flame addon
sidebar_label: Overview
description: "The AYON integration for Autodesk Flame: the AYON menus, editorial publishing of clips as shots and plates, batch render and batch workfile publishing, loading clips into reels and batch groups, and its requirements."
addon: flame
addon_repo: ayon-flame
addon_version: 1.4.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-flame/tree/1.4.5
  - https://github.com/ynput/ayon-flame/releases
  - https://help.ayon.app/en/articles/3647766-setup-autodesk-flame-addon
  - https://help.ayon.app/en/articles/5381712-working-with-autodesk-flame-in-ayon
  - https://help.ayon.app/en/articles/8354392-autodesk-flame-addon-settings
---

# Flame addon

<AddonInfo />

The Flame addon connects Autodesk Flame to AYON. It adds AYON menus to several Flame contexts, publishes timeline clips as shots and plates with their folder hierarchy, publishes batch groups and batch renders, and loads published media into the Media Panel as reel or batch clips. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Flame executable and the variant environment variables |

The addon has no services. It launches Flame only locally. The Flame application variant uses these environment variables:

| Variable | Purpose |
|---|---|
| `AYON_FLAME_PYTHON_EXEC` | The Python executable of Flame. Required by the pre-launch hook. |
| `AYON_FLAME_PYTHONPATH` | The Python path of Flame. Required by the pre-launch hook. |
| `AYON_WIRETAP_TOOLS` | The Wiretap tools used to talk to the Wiretap server. |
| `FLAME_WIRETAP_VOLUME` | The Wiretap volume that holds the Flame projects. |
| `FLAME_WIRETAP_HOSTNAME`, `FLAME_WIRETAP_GROUP` | Optional. The Wiretap host and group. |

## Flame project creation

Before Flame starts, the addon creates the Flame project through Wiretap so that it matches the AYON project: name, nickname (the project code), resolution, pixel aspect ratio and frame rate (mapped to the nearest frame rate in a fixed list of rates). With color management enabled, the project also gets the frame depth, field dominance, SynColor policy and OCIO configuration from the [color management settings](settings.md#color-management-imageio). After launch the addon can add bookmarks to the Flame project (see [Project bookmarks](settings.md#project-bookmarks)).

## AYON menus

The addon adds an **AYON** menu to four places in Flame. The first, disabled entry of each menu shows the current project name.

| Flame context | Entries |
|---|---|
| Main menu | **Load...** |
| Timeline | **Create...**, **Publish...**, **Load...** |
| Batch | **Create...**, **Publish...**, **Load...** |
| Media Panel | **Create...**, **Publish...**, **Load...** |

**Create...** and **Publish...** open the Publisher on its create or publish tab. **Load...** opens the Loader. The addon has no Scene Inventory: the version of a loaded clip is changed with Flame's own source versions action.

A custom script menu can be added to these menus from the settings (see [Custom menu](settings.md#custom-menu)).

## Products Flame can create

Which creators are offered depends on the Flame context the Publisher was opened from.

| Creator | Product base type | Context | What it publishes |
|---|---|---|---|
| Create Publishable Clip | `editorial` | Timeline | Marks the selected timeline clips for publishing and creates the shot, plate and audio instances below, with shot hierarchy, clip naming, handles and vertical sync options. |
| Editorial Shot | `shot` | Created by Create Publishable Clip | A shot folder with its frame range and handles. |
| Editorial Plate | `plate` | Created by Create Publishable Clip | A plate from a timeline clip. |
| Editorial Audio | `audio` | Created by Create Publishable Clip | Audio of a timeline clip, when **Include audio** is on. |
| Plate Reel Clip | `plate` | Media Panel | A plate from selected reel clips. |
| Batch | `workfile` | Batch | The current batch group. Its instance data is stored in a Note node of the batch. |
| Batch Render | `render` | Batch | The output of a selected Write File node of the batch. |
| Workfile | `workfile` | Automatic | The Flame workfile, created automatically. |

Create Publishable Clip stores its data as markers on the clips. A clip that was converted to BatchFX or hard committed loses the link to its source media and cannot be published.

## Publishing

### Collectors

| Collector | Applies to | What it collects |
|---|---|---|
| Collect Flame project | Context | The current project data. |
| Collect Timeline OTIO | Context | The current sequence as an OpenTimelineIO timeline. |
| Collect Shots | `shot` | New shots from the marked clips: hierarchy, tasks, handles, retime data and attributes parsed from segment comments. |
| Collect Plate from Timeline | `plate` | Plates of timeline clips. |
| Collect Plate from Reel | `plate` | Plates of Media Panel clips. |
| Collect Shot Audio | `audio` | Audio of timeline clips. |
| Collect Batch instance, Collect Batch Version | `workfile` | The batch group and its version. |
| Collect Render from Batch | `render` | Write File node renders of a batch. |

### Extractors and integrators

| Plugin | Applies to | What it does |
|---|---|---|
| Extract Product Resources | Clips | Transcodes clip media with Flame XML export presets: a representation for clips with a missing media link, an optional thumbnail, optional additional representations, and optionally the clip's original media. See [Extract Product Resources](settings.md#extract-product-resources). |
| Extract OTIO file | `workfile` | Writes the timeline as an `.otio` representation. |
| Extract Batch Workfile | `workfile` | Exports the batch group as a consolidated JSON workfile. |
| Extract Batch Render | `render` | Renders the batch in the foreground, once per publish, and collects the Write File outputs as representations. |
| Integrate Batch Groups | Clips | Creates a batch group per task and loads the published clip into it. Off by default. |
| Iterate Batch After Publish | `workfile` | Saves the batch as a new iteration after publishing. Optional, active by default. |

### Validators

Both validators are off by default.

| Validator | Checks |
|---|---|
| Validate Product Attributes | That the clip of an instance has no attribute problem flagged during collection. The failing clip is reported with its problem. The action **Deactivate publishing** switches the failing instances off. |
| Validate Timeline Segments | That the timeline clips can still be published, that is, that they are not converted to BatchFX or hard committed. The actions **Show Segments with Red Colour** and **Hide Failing Segments** mark the failing segments in the timeline. |

## Loading

Loaders place media in the Media Panel, using OpenClip files. They handle the product base types `render2d`, `source`, `plate`, `render` and `review`; the `product_types` list in the loader settings is empty by default.

| Loader | Loads | Where |
|---|---|---|
| Load as clip | Media products | A reel of a reel group (defaults **AYON_Reels** and **Loaded**). |
| Load as clip to current batch | Media products | A reel of the current batch group (default **AYON_LoadedReel**). |
| Load batch | `workfile` | The batch group of a published batch workfile. |

Clip and layer names come from templates in the loader settings. New versions are added to the OpenClip file of the clip, so Flame's source versions action can switch between them. The Flame Python API cannot place loaded media directly into a timeline.

## Launch hooks

| Hook | What it does |
|---|---|
| Flame prelaunch | Creates the Flame project through Wiretap, adds the launch arguments and opens the file permissions of the project data. |
| Flame postlaunch | Creates the project bookmarks. |
| Install OpenTimelineIO to Flame | Installs OpenTimelineIO into the Python environment of Flame. Can be turned off in the settings. |

## Related

- [Flame settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
