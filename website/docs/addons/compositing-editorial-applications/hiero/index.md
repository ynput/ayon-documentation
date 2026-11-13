---
title: Hiero addon
sidebar_label: Overview
description: "The AYON integration for Hiero and Nuke Studio: the AYON menu, editorial publishing of shots, plates, audio, effects and editorial packages from a timeline, loaders and requirements."
addon: hiero
addon_repo: ayon-hiero
addon_version: 0.6.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-hiero/tree/0.6.5
  - https://github.com/ynput/ayon-hiero/releases
  - https://help.ayon.app/en/articles/0417137-working-with-hiero-in-ayon
  - https://help.ayon.app/en/articles/3397387-configure-hiero-addon
---

# Hiero addon

<AddonInfo />

The Hiero addon connects [Hiero](https://www.foundry.com/products/nuke-family/hiero) to AYON. Everything on this page also applies to Nuke Studio, which uses the same host name in AYON. Inside Hiero it adds an AYON menu, and it provides the plugins that turn timeline clips into publishable shots, plates, audio and effects, and that load published products into the timeline. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | Newer than 1.0.10 |
| Applications addon | Defines the Hiero executables that the AYON Launcher starts |

Hiero and Nuke Studio 11.0 and newer are supported. The **Editorial Package** creator is only available in Hiero 16.0 or newer, because it relies on the quick export feature of that version. The workfile extension is `.hrox`.

## AYON menu

The addon adds an **AYON** menu to Hiero's menu bar. Its first entry shows the current context and is not clickable.

| Entry | What it does |
|---|---|
| **Work Files...** | Opens the Workfiles tool. |
| **Create Default Tags** | Recreates the AYON tags in the project's tags bin and resets them to their default values. |
| **Create...** | Opens the Publisher on its create tab. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Load...** | Opens the Loader. |
| **Manage...** | Opens the Scene Inventory. |
| **Library...** | Opens the Library Loader. |
| **Reload pipeline** | Only shown in dev mode. Reloads the integration. |
| **Apply Colorspace Project** | Writes the workfile colorspace settings of the project into the Hiero project's color management settings. |
| **Apply Colorspace Clips** | Sets the media color transform of the clips in the active timeline whose source path matches a rule of **Assign colorspace to clips via rules**. |
| **Experimental tools...** | Opens the experimental tools dialog. |

A second menu, named by the **Scripts Menu Definition** settings (**Custom Tools** by default), holds the custom actions and sub-menus that a studio defines.

## Products Hiero can create

Instances are stored as AYON tags on the timeline clips or on the project.

| Creator | Product base type | What it creates |
|---|---|---|
| Create Publishable Clip | `editorial` | Tags the selected clips and creates the shot, plate and audio instances for them. |
| Editorial Shot | `shot` | The shot of a clip. Created by **Create Publishable Clip**. |
| Editorial Plate | `plate` | A plate from a clip, with optional review media and effects. Created by **Create Publishable Clip**. |
| Editorial Audio | `audio` | Audio of a clip. Created by **Create Publishable Clip**. |
| Editorial Package | `editorial_pkg` | An intermediate render of the timeline with an OpenTimelineIO file. Hiero 16.0 or newer. |
| Workfile | `workfile` | The Hiero project, created automatically. |

### Create Publishable Clip

The creator has options for the shot hierarchy and naming, for vertical sync, for publishing and for the shot attributes. Their default values come from the [settings](settings.md#creator-plugins).

| Group | Options |
|---|---|
| Selection | **Use only selected clip(s).** |
| Shot hierarchy and rename | **Shot Parent Hierarchy**, **Rename clips**, **Clip Name Template**, **Count sequence from**, **Stepping number**. |
| Shot template keywords | `{folder}`, `{episode}`, `{sequence}`, `{track}` and `{shot}`. In the track and shot values, `{_track_}` and `{_shot_}` give the original Hiero names. Hashes in `{shot}` become the padded number. |
| Vertical sync | **Enable Vertical Sync** and **Hero track**. Clips on the other tracks that sit above a clip of the hero track share its shot, so that one shot can publish several plates. Clips can be shorter than the hero clip, not longer. |
| Publish | **Product Variant**, **Plate Product Type**, **Reviewable Source**, **Review track regex pattern**, **Include audio**, **Source resolution**. |
| Shot attributes | **Workfiles Start Frame**, **Handle start (head)**, **Handle end (tail)**. |

**Reviewable Source** is one of: none, **[ Clip's media ]**, **[ Review track regex pattern ]**, or a named track. The regex pattern matches track names, so that vertically aligned clips can have several review tracks.

Each created plate instance has its own attributes: **Review**, **Reviewable Source**, and **Publish clip effects** with the values **Ignore Effects**, **Publish Effects** and **Publish Only Effects**. The last one publishes the effects without integrating a new plate version. Shot instances have **Set shot resolution from plate**.

## Publishing

### Collectors

| Collector | What it collects |
|---|---|
| Collect Current File | The path of the current project. |
| Collect OTIO Timeline | The OpenTimelineIO representation of the timeline. |
| Collect Shots, Collect Plate, Collect Audio | Instances for the `shot`, `plate` and `audio` products. |
| Collect Tag Tasks | Tasks from the tags of the clips, for shots. |
| Collect Comments | Comments from tags of the clips and their sources. |
| Collect Frames | Frames defined by tags, for the `frame` product. |
| Collect Clip Effects Instances | The soft effects of a clip, as `effect` products. Not for audio clips. |
| Collect Editorial Package Instances | `editorial_pkg` instances. |
| Collect Workfile | Metadata for the workfile instance. |

### Extractors and validators

| Plugin | Applies to | What it does |
|---|---|---|
| Export Clip Effects | `effect` | Exports the effects of a clip as JSON, which can be used to recreate them in Nuke. |
| Extract Editorial Package | `editorial_pkg` | Renders the intermediate media of the package. |
| Extract Frames | `frame` | Writes frames of the source media with OpenImageIO. |
| Extract Thumbnail | `plate`, `take` | Writes a thumbnail of the clip. |
| Extract Workfile | `workfile` | Publishes the Hiero project and a thumbnail of the sequence window. |
| Version-up Workfile | Context | Optional. Saves the workfile as the next version after the publish. |
| Validate Collected Timeline Clip | `shot`, `audio`, `plate`, `take` | Checks that the instance is linked to a clip of the active timeline. Fails when a clip was copied from another sequence. Its repair action relinks the instance. |

The media representations of plates, such as review videos, are produced by plugins of the core addon.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load as clip | Images and videos of any product, matched by file extension | Image and video extensions |
| Load as Timeline | `editorial_pkg` | `.otio` |
| Load Effects | `effect` | `.json` |

**Load as clip** names the new clip from a template. See [settings](settings.md#loader-plugins).

## Other features

| Feature | Description |
|---|---|
| Path mapping | At startup and when the project changes, the addon can add cross-platform path mappings to the Hiero project. They come from the **Path Mappings** settings and can include the project's anatomy roots. |
| Color management | The project and clip color settings can be applied from AYON settings. See **Apply Colorspace Project** and **Apply Colorspace Clips** above. |
| Persistent context data | Publisher context data is stored in the Hiero project and restored when it is reopened. |
| Legacy data | Instances and containers stored in legacy `openpypeData` tags are read, and converted to AYON data when something is written. |

## Related

- [Hiero settings](settings.md)
- [Nuke addon](../nuke/index.md)
