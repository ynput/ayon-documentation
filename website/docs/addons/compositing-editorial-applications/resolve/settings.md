---
title: DaVinci Resolve addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON DaVinci Resolve addon with their default values: startup behavior, project database override, color management, the Create Shot Clip creator, the Load Media loader and the Extract Product Resources profiles."
addon: resolve
addon_repo: ayon-resolve
addon_version: 0.6.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-resolve/tree/0.6.5/server
  - https://help.ayon.app/en/articles/9682094-resolve-addon-settings
---

# DaVinci Resolve addon settings

<AddonInfo />

The settings of the [DaVinci Resolve addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Check Resolve license version compatibility on start | On | Resolve 21 dropped external Python support in the free edition. When on, the launch is canceled for a free edition of Resolve 21 or newer. |
| Launch AYON menu on start of Resolve | Off | Shows the AYON menu window when Resolve starts. |
| Set FPS and Resolution from current task | Off | Sets the frame rate and resolution of the Resolve project from the current task. Works for workfiles opened through the Workfiles tool or at startup, and is limited by what Resolve allows to change. |
| Rename project to match AYON project | On | When a workfile is incremented, renames the loaded database project to match. When off, the loaded project is exported as the new project and the old project is imported again, so that AYON workfiles and Resolve's database projects stay in sync. |

## Project database override

Selects the Resolve project database that workfiles are imported into. When the requested database is not found, no workfile is opened and a warning is shown.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Use the database below instead of the one that is active in Resolve. |
| Database Type | `Disk` | `Disk` or `PostgreSQL`. |
| Database Name | `Local Database` | Name of the database. |
| Database IP | Empty | IP address of the database server. Not used with the `Disk` type. |
| Use Project Folders in Database | Off | Store the workfiles in database folders named after the AYON project. |

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch for AYON's color management in Resolve. |
| Remapping colorspace names: Rules | None | Maps names between Resolve and OCIO. Each rule has an **Application native colorspace name** and an **OCIO colorspace name**. |
| File Rules: Activate Host Rules | Off | Turn on the file rules of this host. |
| File Rules: Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Creator plugins

### Create Shot Clip

Defaults for the options of the **Create Publishable Clip** creator.

| Setting | Default | Description |
|---|---|---|
| Shot parent hierarchy | `{folder}/{sequence}` | Template for the parent folders of the shot folders. The root is the project. |
| Rename clips | On | Renames the clips sequentially, using the clip name template. |
| Clip name template | `{track}{sequence}{shot}` | Template for the shot name. |
| Count sequence from | 10 | First number of the running number, where `#` is used in a keyword. |
| Stepping number | 10 | Increment between running numbers. |
| {folder} | `shots` | Literal value of the `{folder}` key. |
| {episode} | `ep01` | Literal value of the `{episode}` key. |
| {sequence} | `sq01` | Literal value of the `{sequence}` key. |
| {track} | `{_track_}` | Value of the `{track}` key. `{_track_}` is the name of the timeline track. |
| {shot} | `sh###` | Value of the `{shot}` key. The `#` characters set the padding of the running number. |
| Enable Vertical Sync | Off | Synchronize attributes and shot names of clips stacked above the hero track clip. |
| Workfile Start Frame | 1001 | Start frame stored on the shot folder. |
| Handle start (head) | 10 | Maximum head handle. Limited by the media that is available. |
| Handle end (tail) | 10 | Maximum tail handle. Limited by the media that is available. |
| Plate Product types | None | Optional list of product types offered for plate products. |
| Audio Product types | None | Optional list of product types offered for audio products. |

## Loader plugins

### Load Media

| Setting | Default | Description |
|---|---|---|
| Clip color for last version | `Olive` | Clip color of the latest version. |
| Clip color for old version | `Orange` | Clip color of older versions. |
| Media Pool bin path template | `Loader/{folder[path]}` | Bin of the Media Pool that the items are imported into. |
| Metadata mapping | Four entries, below | Media Pool item metadata that is set on load and update. Each entry has a **Metadata property name**, which must match the Resolve metadata name, and a **Metadata value template**. Names must be unique. |

Default metadata mapping:

| Metadata property name | Metadata value template |
|---|---|
| `Comments` | `{version[attrib][comment]}` |
| `Shot` | `{folder[path]}` |
| `Take` | `{product[name]} {version[name]}` |
| `Clip Name` | `{folder[path]} {product[name]} {version[name]} ({representation[name]})` |

The Load as clip loader has no settings for its clip colors.

## Publish plugins

### Extract Product Resources

A list of profiles. A profile is chosen for each instance by its **Task Types**, **Task Names** and **Product Base Type**. When no profile matches, or the matching profile has no output definition, the publish fails. Profile names must be unique.

| Setting | Default | Description |
|---|---|---|
| Profile Name | Depends on the profile | Name of the profile. When left empty, a default name based on the product base type is assigned on save. No other logic uses it. |
| Task Types, Task Names | Empty (match all) | Filters of the profile. |
| Product Base Type | `plate` or `editorial_pkg` | Which instances the profile applies to. A new profile starts with `editorial_pkg`. |
| Integrate Clip Source | Off | Also integrate the media pool item of the timeline item as an additional representation. |
| Output Definitions | Depends on the profile | The renders to produce, one entry for each representation. The list that is used is the one of the selected product base type. |

Each output definition has the following settings.

| Setting | Applies to | Description |
|---|---|---|
| Export OTIO | `editorial_pkg` | Export an OTIO file together with the rendered file. |
| Use rootless OTIO paths | `editorial_pkg` | Convert the paths in the OTIO file to be rootless. |
| With Handles | `plate` | Render the clip with its handles. |
| Preset Type | Both | `builtin_preset` or the custom preset. |
| Builtin Preset: Format, Preset, Codec | Both | Render format, preset file and codec. The `{ayon_render_presets}` token is the folder of the render presets that ship with the addon. |
| Custom Preset: Format, Preset Path, Codec | Both | The same for a preset file of the studio. Default format `QuickTime`, codec `H.264`. |
| Shared: Name | Both | Name of the representation. |
| Shared: Tags | Both | Tags of the representation. Only partly supports the reviewable workflow. |
| Shared: Custom Tags | Both | Additional tags, for filtering in the Extract Review plugin. |
| Shared: Colorspace | Both | Colorspace that is added to the representation's colorspace data. |

Default profiles:

| Profile | Product base type | Output |
|---|---|---|
| Plate Profile #1 | `plate` | One output: builtin preset format `EXR`, preset `{ayon_render_presets}/clip/EXR_RGB_half_(DWAA).xml`, codec `RGB half (DWAA)`, with handles on, representation name `exr`, no tags. |
| Editorial PKG Profile #1 | `editorial_pkg` | One output: builtin preset format `QuickTime`, preset `{ayon_render_presets}/timeline/QuickTime_H264.xml`, codec `H.264`, OTIO export on with rootless paths on, representation name `mov`, tag `passing`. |
