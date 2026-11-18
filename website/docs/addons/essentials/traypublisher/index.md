---
title: TrayPublisher addon
sidebar_label: Overview
description: "The TrayPublisher addon (traypublisher): the standalone Tray Publisher tool that publishes existing files to AYON without a DCC application, with its creators, editorial and CSV ingest workflows, collectors, extractors and validators."
addon: traypublisher
addon_repo: ayon-traypublisher
addon_version: 0.4.8
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-traypublisher/tree/0.4.8
  - https://github.com/ynput/ayon-traypublisher/releases
  - https://help.ayon.app/en/help/articles/6447370-introduction-tray-publisher
  - https://help.ayon.app/en/help/articles/5385780-working-with-ayon-tray-publisher
---

# TrayPublisher addon

<AddonInfo />

The TrayPublisher addon (`traypublisher`) is a standalone host for the AYON Publisher. It does not connect a DCC application: it publishes files that already exist on disk (renders, plates, models, caches, textures, audio, editorial files) to a project. It can also create the folders (shots) and tasks it publishes into. The host has few validators, which makes it flexible but also means the content of published files is not checked. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |

The addon version can be set per project (`project_can_override_addon_version` is enabled in `package.py`). The addon runs no services. The editorial creators and the editorial package plugins use the OpenTimelineIO library provided by the AYON launcher; `Validate Editorial Package` reports an error when its version is older than 0.16.0.

## Where it appears in AYON

| Entry point | Description |
|---|---|
| Tray menu entry **Publisher** | Opens a **Choose project for Tray Publisher** window. After a project is chosen, the Tray Publisher starts as a separate process for that project. |
| `addon traypublisher launch` | Launcher command that starts the Tray Publisher UI directly. The options `--project` (environment variable `AYON_PROJECT_NAME`), `--folder-path` (`AYON_FOLDER_PATH`) and `--task-name` (`AYON_TASK_NAME`, requires `--folder-path`) pre-select the context. |
| `addon traypublisher ingestcsv` | Headless [CSV ingest](#csv-ingest): creates and publishes the instances described in a CSV file with no UI. |

The `ingestcsv` command takes `--filepath` (required), `--project` (required), `--folder-path` (required), `--preset` (default `Default`), `--task` (optional) and `--ignore-validators`, which leaves out the plugins that only run for the `local` target. When `AYON_USERNAME` is set and the connection uses a service user, that name is used as the publishing user.

## Products it can create

Creators are the plugins that make publish instances. Files are normally added by dropping them into the creator's file field in the Publisher. Which creators appear depends on the project settings.

| Creator | Product base type | What it publishes |
|---|---|---|
| Simple creators (**Simple Create Plugins** in settings) | Set per entry | Files for the product types an admin configures. 12 entries exist by default: `workfile`, `model`, `pointcache`, `plate`, `render`, `camera`, `image`, `vdbcache`, `matchmove`, `rig`, `simpleUnrealTexture` and `audio`. |
| Editorial Simple (`editorial_simple`) | `editorial` | An edit file (`.edl`, `.xml`, `.aaf` or `.fcpxml`) plus media. Creates shots and per-shot products. |
| Editorial Advanced (`editorial_advanced`) | `editorial` | An edit file plus a media source folder. Creates shots and per-shot products with filtering and versioning options. |
| Editorial package (`editorial_pkg`) | `editorial_pkg` | A folder with an `.otio` timeline and the media it references, as one product. |
| Batch Movies (`render_movie_batch`) | `render` | Several movie files at once, each matched to a folder by file name. |
| CSV Ingest (`io.ayon.creators.traypublisher.csv_ingest`) | `csv_ingest_file` | A CSV file that describes many products to publish. |
| Online (`io.ayon.creators.traypublisher.online`) | `online` | A file or sequence, keeping its original file name as the product name. |
| Texture (`io.ayon.creators.traypublisher.texture`) | `texture` | Texture files or UDIM sequences. |
| PSD Workfile + Image (`io.ayon.creators.traypublisher.psd_workfile_image.workfile`) | `workfile` | A `.psd` file published as a workfile and, through a hidden creator, also as an `image` product. Disabled by default. |
| Colorspace Look (`io.ayon.creators.traypublisher.colorspace_look`) | `ociolook` | Color look files (`.cc`, `.cube`, `.3dl`, `.spi1d`, `.spi3d`, `.csp`, `.lut`, `.ccc`, `.cdl`). Available only when an OCIO config can be resolved for the context. |

The extensions accepted by the **Online** creator by default are `.mov`, `.mp4`, `.mxf`, `.m4v`, `.mpg`, `.exr`, `.dpx`, `.tif`, `.png` and `.jpg`. The **Texture** creator accepts the extensions listed in its settings, and offers UDIM handling and a choice of how the variant name is derived (from the file name, or from the part of the file name after the last underscore).

### Simple creators

Each simple creator is built from one **Simple Create Plugins** item, so admins can change, remove or add them. An item sets the label, icon, default variants, accepted extensions, whether sequences and multiple files are allowed, and whether version control is offered. When **Identifier** is empty the product base type is used as the creator identifier. These are the default items; an empty extension filter means any file is accepted.

| Label | Product base type | Default variants | Sequences | Multiple items | Extensions |
|---|---|---|---|---|---|
| Workfile | `workfile` | Main | No | No | `.ma .mb .nk .hrox .hip .hiplc .hipnc .blend .scn .tvpp .comp .zip .prproj .drp .psd .psb .aep .spm` |
| Model | `model` | Main, Proxy, Sculpt | No | Yes | `.ma .mb .obj .abc .fbx .bgeo .bgeogz .bgeosc .usd .blend` |
| Pointcache | `pointcache` | Main | Yes | Yes | `.abc .bgeo .bgeogz .bgeosc` |
| Plate | `plate` | Main, BG, Animatic, Reference, Offline | Yes | Yes | `.exr .sxr .png .dng .dpx .jpg .jpeg .tiff .tif .mov .mp4 .avi` |
| Render | `render` | none | Yes | Yes | same as Plate |
| Camera | `camera` | none | No | Yes | `.abc .ma .hip .blend .fbx .usd` |
| Image | `image` | Reference, Texture, Concept, Background | No | Yes | `.exr .sxr .jpg .jpeg .dng .dpx .bmp .tif .tiff .png .psb .psd` |
| VDB Volumes | `vdbcache` | none | Yes | Yes | `.vdb` |
| Matchmove | `matchmove` | Camera, Object, Mocap | No | Yes | any |
| Rig | `rig` | none | No | No | `.ma .blend .hip .hda` |
| Simple UE texture | `simpleUnrealTexture` | none | No | Yes | any |
| Audio | `audio` | Main | No | No | `.wav` |

### Editorial workflows

The editorial creators read an edit file into an OpenTimelineIO timeline (an `.edl` is read with the frame rate set in the creator, because EDL files carry none), split it into clips and create a shot instance and product instances for each clip, as far as the settings allow.

| Creator | Inputs | Per-clip products |
|---|---|---|
| Editorial Simple | **Edit Decision List** file (`.edl`, `.xml`, `.aaf`, `.fcpxml`) and the media files | Editorial Shot, Editorial Plate, Editorial Audio and Editorial Review. The products, their review flag and output type come from the **Product Base Type Presets** setting. Clips are trimmed from the source media with ffmpeg (`Extract Trim Video/Audio`) to `.mov`, `.mp4` or `.wav`. |
| Editorial Advanced | **Edit Project Files** (same extensions) and a **Media Source Folder** | Editorial Shot, Plate product, Image product, Render product, Audio product, Model product, Camera product and Workfile product. The files of each product are found in the media folder with the **Representations** filters (extensions and regular expression patterns) of its preset, and the version can be incremental, taken from the file name, or locked. |

Both creators build the shot hierarchy from the **Shot Hierarchy** setting, can rename shots from a template that uses tokens extracted from clip names, and can add tasks to each created shot. Since 0.4.6 both also expose the available tasks as a creator attribute.

### CSV ingest

CSV Ingest creates and publishes many products from one `.csv` file. The columns are defined by a preset in the settings; the `Default` preset has 22 columns, including **File Path**, **Folder Path**, **Task Name**, **Product Type**, **Variant**, **Version**, **Frame Start**, **Frame End**, **FPS**, **Representation** and **Representation Colorspace**. A preset can also create missing folders and tasks (**Folder creation config**), define entity lists for the published products (**List config**), and set how each prevalidation problem is handled: **Raise Error** or **Ignore and report**. The `Extract CSV Report` plugin writes a report of the ingest.

## Publishing

### Collectors

| Plugin | Applies to | What it does |
|---|---|---|
| Collect App Name/Label | Context | Collects the host application name and label. |
| Collect source | Context | Collects the source of instances created in the Tray Publisher. |
| Collect Settings Simple Instances | Context | Marks instances made by simple creators with the `simple.instance` family. |
| Collect Simple Instance Representations | `simple.instance` | Builds representations from the files of a simple creator instance. |
| Collect Editorial Instances | `editorial` | Collects data of instances created by the editorial creators. |
| Collect Shot Instances | `shot` | Collects shot instances. |
| Collect Clip Instances | `plate`, `review`, `audio`, `model`, `camera`, `render`, `image`, `workfile` | Collects clip instances and resolves their parent shot. |
| Collect Editorial Workfile | `workfile` | Collects data of editorial workfile instances. |
| Collect Editorial Reviewable | `plate`, `review`, `audio` | Collects the review input chosen by the user. |
| Collect Review Info | `review` | Collects data required by review instances. |
| Collect Video Families | Context | Optional. Adds the `collect.video.framerange` family. |
| Collect Original Video Frame Data | `collect.video.framerange` | Collects the frame data of the original video. |
| Collect Editorial Package | `editorial_pkg` | Collects the path of the `.otio` file and its resources. |
| Collect Movie Batch Files | Batch movie instances | Collects the movie file and creates its representation. |
| Collect Online File | `online` | Collects the file and retains its file name. |
| Collect PSD Workfile + Image Files | `workfile`, `image` | Collects the files for the PSD workfile and image pair. |
| Collect Texture Instance | `texture_creator` | Collects texture representations, with UDIM support. |
| Collect Colorspace Look | `ociolook` | Collects the look from the LUT file. |
| Collect CSV Ingest instances data | `csv_ingest` | Collects the CSV data of the instance. |
| Collect CSV Preset Version List | `csv_ingest` | Collects the preset's version list. |
| Collect CSV Ingest Prevalidation Report | Context | Merges prevalidation report data into the context. Has publish settings. |
| Choose representation colorspace | `render`, `plate`, `reference`, `image`, `online` | Collects the representation colorspaces the user defined explicitly. |
| Collect Original Sequence Frame Data | `plate`, `pointcache`, `vdbcache`, `online`, `render` | Sets the frame start and end from the frame numbers found in the files. Optional. Has publish settings. |
| Collect Missing Frame Data From Folder/Task | same families | Fills frame data that is still missing from the task or folder. |

### Extractors

| Plugin | Applies to | What it does |
|---|---|---|
| Extract Colorspace Look | `ociolook` | Exports the look from the LUT file. |
| Extract CSV file | `csv_ingest_file` | Exports the CSV file as a representation. |
| Extract CSV Report | Context | Writes a report of the CSV ingest, named after its CSV instance. |
| Extract Editorial Package | `editorial_pkg` | Publishes the `.otio` file, copies the media into a `resources` folder of the publish location and rewrites the media paths in the file to rootless published paths. Media can be converted with ffmpeg when conversion is enabled. |
| Extract Trim Video/Audio | `clip`, `trimming` | Trims the clip from the source video with ffmpeg to `.mov`, `.mp4` or `.wav`, using the clip in/out points and handles. |

### Validators

| Validator | Applies to | What it checks |
|---|---|---|
| Validate Filepaths | Instances with source file paths | The file field is filled and every file exists on disk. |
| Validate representation colorspace | `render`, `plate`, `reference`, `image`, `online` | The colorspace of each representation exists in the OCIO config it refers to, and that config contains colorspaces. |
| Validate colorspace look attributes | `ociolook` | The working colorspace is set, and each look item has input colorspace, output colorspace, direction and interpolation. |
| Validate Editorial Package | `editorial_pkg` | The folder has an `.otio` file and contains every media file it references, compared by file name in a flat folder. |
| Validate Existing Version | Instances with a version | The chosen version is higher than the latest published version of the product. Has a repair action that switches the instance back to the next version. Optional. |
| Validate Frame Range | `render`, `plate` | For image sequence representations (`exr`, `dpx`, `jpg`, `jpeg`, `png`, `tiff`, `tga`, `gif`, `svg`, `sxr`) the number of files equals the frame range of the task (or folder) plus handles. Skipped for instances that create new folders. Optional. |
| Validate Existing Online Files | `online` | No product with the same name exists yet in the folder. Optional. |

## Related

- [Settings](settings.md)
