---
title: DaVinci Resolve addon
sidebar_label: Overview
description: "The AYON integration for DaVinci Resolve: the AYON menu, editorial products it creates (shots, plates, audio, editorial packages, workfiles), publishing, loading media and timelines, launch hooks and requirements."
addon: resolve
addon_repo: ayon-resolve
addon_version: 0.6.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-resolve/tree/0.6.5
  - https://github.com/ynput/ayon-resolve/releases
  - https://help.ayon.app/en/articles/9472845-working-with-resolve-studio-in-ayon
  - https://help.ayon.app/en/articles/3786946-configure-resolve-studio-to-work-with-ayon
  - https://help.ayon.app/en/articles/9682094-resolve-addon-settings
---

# DaVinci Resolve addon

<AddonInfo />

The Resolve addon connects [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve) to AYON. It runs the AYON tools in a separate Python process next to Resolve and adds a small AYON menu window. It is mainly an editorial integration: it turns marked timeline clips into shots, plates and audio products that are published together with an OpenTimelineIO (OTIO) description of the timeline, publishes whole timelines as editorial packages, publishes the Resolve project (`.drp`) as a workfile, and loads published media and timelines into Resolve. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Resolve executable that the AYON Launcher starts (the application group is `resolve`) |
| Python interpreter for Resolve | A separate Python installation that the `RESOLVE_PYTHON3_HOME` environment variable of the Resolve application points to. It needs PySide2 (PySide6 on macOS) and OpenTimelineIO installed. |
| External scripting | Resolve's *External scripting using* preference must allow local scripting |

Python 3.9 or 3.10 is the recommended range for Resolve 18 and 19, and OpenTimelineIO 0.17.0 is the tested version. The addon supports up to Resolve 19. Since 0.5.0 it works with the free and the Studio editions of Resolve.

Starting with Resolve 21, the free edition no longer supports external Python scripting. The addon has a pre-launch check for this, see [Launch hooks](#launch-hooks).

## How the integration works

The launcher starts Resolve with environment variables that point it to AYON's startup script (`AYON_RESOLVE_STARTUP_SCRIPT`), to Resolve's scripting API (`RESOLVE_SCRIPT_API`, `RESOLVE_SCRIPT_LIB`) and to the configured Python home. The startup script runs after Resolve launches, installs the AYON host, optionally opens the last workfile and optionally shows the AYON menu. Resolve project files (`.drp`) are the workfile format.

AYON stores its data inside the Resolve project in several places:

| Data | Where it is stored |
|---|---|
| Publishable clips (shots, plates, audio) | A marker named `AYONData` on the timeline item. The marker holds the sub-products of the clip. |
| Loaded clips (containers) | An AYON tag on the timeline item. |
| Editorial package instances and loaded timelines | The `VFX Notes` metadata of the timeline's media pool item. Its content should not be changed. |
| Workfile instance | The project setting `colorVersion10Name`, as JSON. |

During creation, the addon uses clip colors as state: timeline clips colored `Chocolate` are the ones selected for creation, and clips that were converted to publishable clips are colored `Pink`.

## AYON menu

The menu is a small always-on-top window with these buttons.

| Button | What it does |
|---|---|
| **Save current file** | Saves the current project to its workfile path. When the project has no workfile yet, it opens the Workfiles tool instead. |
| **Workfiles ...** | Opens the Workfiles tool. |
| **Create ...** | Opens the Publisher on its create tab. |
| **Load ...** | Opens the Loader. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Manage...** | Opens the Scene Inventory. |
| **Library...** | Opens the Library Loader. |

The window shows on start when the **Launch AYON menu on start of Resolve** setting is on. The addon also copies a utility script named `AYON__Menu.py` into Resolve's scripts folder, which starts the menu.

## Products it can create

| Creator | Product base type | What it creates |
|---|---|---|
| Create Publishable Clip | `editorial` (creates the three products below) | Converts the selected timeline clips into publishable clips. For each clip it creates an Editorial Shot, and the plate and audio instances chosen in the creator options. |
| Editorial Shot | `shot` | The shot folder with its frame range, handles, fps and resolution. It has no representation of its own. Created by Create Publishable Clip. |
| Editorial Plate | `plate` | The clip as a plate, optionally with a reviewable made from a track or from the clip's own media. Created by Create Publishable Clip. |
| Editorial Audio | `audio` | The audio of the clip, optionally used for the review. Created by Create Publishable Clip. |
| Editorial Package | `editorial_pkg` | The timeline selected in the Media Pool, with an OTIO file and a rendered reference video. It has the option **Make intermediate media reviewable**. |
| Workfile | `workfile` | The Resolve project. An automatic creator, created when the project has no workfile instance. |

### Create Publishable Clip options

Option defaults come from the [Create Shot Clip settings](settings.md#create-shot-clip). The creator dialog has these groups.

| Group | Options |
|---|---|
| Selection | **Use only clips with Chocolate clip color** (on by default). |
| Shot Template Keywords | The values of the keys `{folder}`, `{episode}`, `{sequence}`, `{track}` and `{shot}`. In `{shot}`, the `#` characters set the number of digits of a running number. |
| Shot Hierarchy and Rename Settings | **Shot Parent Hierarchy**, **Rename Shots/Clips**, **Rename Template**, **Count Sequence from** and **Stepping Number**. The templates can use the tokens `{_sequence_}` (timeline name), `{_track_}` (track name), `{_clip_}` (clip name), `{_trackIndex_}` and `{_clipIndex_}`. |
| Vertical Synchronization of Attributes | **Enable Vertical Sync** and **Hero Track**. With vertical sync, clips stacked above the hero track clip share its shot name and attributes. Clips on other tracks can be shorter than the hero clip, not longer. |
| Clip Publish Settings | **Product Variant**, **Reviewable Source** (none, the clip's media, or a track), **Include audio**, **Source resolution** (take the resolution from the source clip instead of the timeline) and the product type chosen for plates and audio. |
| Shot Attributes | **Workfiles Start Frame**, **Handle Start (head)** and **Handle End (tail)**. |

After creation, the plate and audio instances have their own attributes: **Linked to** (the track), **Review** and, for plates, **Reviewable Source**. The shot instance has **Set shot resolution from plate**, and fps, frame range, handles and resolution attributes.

## Publishing

### Collectors

| Plugin | Applies to | What it does |
|---|---|---|
| Collect Project and Current Timeline | Context | Collects the current Resolve project and timeline. |
| Collect Shots | `shot` | Reads the OTIO clip of the timeline item and the `AYONData` marker. Limits the handles to the handles that exist in the media. Takes resolution and pixel aspect from the timeline, or from the clip when **Source resolution** is used, and shares them with the plates and audio of the same shot. |
| Collect Plate | `plate` | Marks the instance for the OTIO based collection in the core addon (ranges, review track, product resources). Resolves the reviewable source, the track or the clip's media. Takes shared shot data from its parent shot and fails when the shot instance is missing or disabled. |
| Collect Shot Audio | `audio` | Same for audio: reads the OTIO clip, takes the shared shot data and the source range. |
| Collect Editorial Package Instances | `editorial_pkg` | Reads the timeline's frame rate and range. Increases the version of a package that was loaded from AYON, so that versions follow the original chain. Adds the review flag. |
| Collect Workfile | `workfile` | Marks the workfile for the OTIO timeline export in the core addon. |

### Extractors and integrators

| Plugin | Applies to | What it does |
|---|---|---|
| Extract Product Resources | `plate` clips and `editorial_pkg` | Renders intermediate files with Resolve's render queue. It selects a [profile](settings.md#extract-product-resources) by task type, task name and product base type, and fails when no profile matches or when the profile has no output definition. A profile can render several outputs for one product. |
| Extract Editorial Package | `editorial_pkg` | Exports the timeline as an OTIO file next to the rendered intermediate file. The OTIO file can use rootless paths. |
| Extract Workfile | `workfile` | Exports the project to a `.drp` file and publishes it as the `drp` representation. |
| Version-up Workfile | Context | Optional, on by default. Saves the workfile as the next version after a successful publish. Skipped when any plugin failed. |

The addon has no validators.

## Loading

| Loader | Loads | Formats | What it does |
|---|---|---|---|
| Load media | `render2d`, `source`, `plate`, `render`, `review`, `audio`, `image` | Image, video and audio extensions (`.wav`, `.aif`, `.aiff`, `.mp3`, `.flac`, `.aac`, `.m4a`, `.ac3`) | Imports the files as a Media Pool item in a bin built from a template, sets the metadata and input colorspace, colors the item by version state, and optionally adds it to the current timeline. Options: **Load to timeline** and **Re-use existing**. |
| Load as clip | `render2d`, `source`, `plate`, `render`, `review` | Image and video extensions | Places the clip on a timeline at its original timing. Options: **Include handles**, **Where to load clips** (current or new timeline) and **How to load clips** (original timing or sequentially). |
| Load as Timeline | `editorial_pkg` | `.otio` | Imports a published editorial package as a timeline, with its source clips, in a bin named after the folder, product and version. The timeline is prepared for publishing again. |

Load media and Load as clip both color the loaded clip: the latest version and older versions get different colors. The colors, the bin path and the metadata of Load media are set in the [Load Media settings](settings.md#load-media).

The Scene Inventory has the action **Remove Unused Selected Media** for items loaded with Load media. It removes items that no timeline uses.

## Workfiles and project database

Workfiles are `.drp` files exported from the Resolve project. When a workfile is opened, it is imported as a project into Resolve's project database. If a more recent exported file exists than the project in the database, a dialog asks whether to re-import it. The [Project Database Override](settings.md#project-database-override) settings choose another database (disk or PostgreSQL) and optionally a folder per project. When the requested database is not found, a warning is shown and no workfile is opened.

The setting **Rename project to match AYON project** controls what happens when the workfile is incremented: the loaded database project is renamed to the new name, or, with the setting off, exported as the new project while the old project is imported again, to keep AYON workfiles and the database in sync. While the last workfile is opened at launch, a splash screen is shown.

The addon can set the frame rate and resolution of the Resolve project from the current task (setting **Set FPS and Resolution from current task**). This works for workfiles opened through the Workfiles tool or at startup, and Resolve limits it. For example, the frame rate may not be editable when timelines already exist, and the vertical resolution cannot be set automatically.

## Color management

When enabled, Resolve follows the studio's color management through the OCIO configuration of the core addon. The addon settings add a table that maps Resolve's native colorspace names to OCIO names and file rules that map file patterns to colorspaces. Load media sets the input colorspace of imported items from the colorspace of the representation, using the remapping table.

## Launch hooks

| Hook | Order | What it does |
|---|---|---|
| Resolve version check (`PreLaunchResolveCheckVersion`) | 10 | When **Check Resolve license version compatibility on start** is on, reads the version and edition from the `ReadMe.html` that ships with Resolve and cancels the launch of a free edition of Resolve 21 or newer. It does nothing when the version cannot be read. |
| Open last workfile (`PreLaunchResolveLastWorkfile`) | 10 | Passes the workfile to open (an explicit path, or the last workfile when the launcher asks to start it and it exists) to the startup script in `AYON_RESOLVE_OPEN_ON_LAUNCH`. |
| Resolve setup (`PreLaunchResolveSetup`) | default | Sets `RESOLVE_SCRIPT_API`, `RESOLVE_SCRIPT_LIB`, `PYTHONHOME`, `PYTHONPATH` and `PATH` from the platform's default Resolve paths and from `RESOLVE_PYTHON3_HOME`. Fails when that folder does not exist. Sets `RESOLVE_UTILITY_SCRIPTS_DIR` (Resolve's Fusion Scripts/Comp folder), empties that folder and copies the AYON utility scripts and the startup script library into it. |
| Startup script (`PreLaunchResolveStartup`) | 11 | Sets `AYON_RESOLVE_STARTUP_SCRIPT`. |
| Workfile loading splash (`PreWorkfileLoadingSplash`) | 12 | When a workfile will be opened, shows a splash screen until the startup script has opened it. |

All hooks apply to local launches only.

## Related

- [DaVinci Resolve settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
