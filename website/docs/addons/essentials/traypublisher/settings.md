---
title: TrayPublisher addon settings
sidebar_label: Settings
description: "Project settings of the TrayPublisher addon (traypublisher): color management, simple creators, editorial creators, CSV ingest, texture and batch movie creators, and publish plugin settings."
addon: traypublisher
addon_repo: ayon-traypublisher
addon_version: 0.4.8
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-traypublisher/tree/0.4.8
  - https://help.ayon.app/en/help/articles/6447370-introduction-tray-publisher
---

# TrayPublisher addon settings

<AddonInfo />

This page lists the addon project settings by area. What the creators and plugins do is described on the [overview page](index.md). See also settings and scopes (planned): [settings](../../../ayon/backend/settings/index.md).

Top-level groups: **Color Management (ImageIO)**, **Simple Create Plugins**, **Editorial Creators**, **Create** and **Publish Plugins**.

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| **Enable Color Management** | On | Turns host color management on for the Tray Publisher. |
| **File Rules** > **Activate Host Rules** | Off | Apply the rules below (host-level file rules). |
| **File Rules** > **Rules** | Empty list | Each rule has **Rule name**, **Regex pattern**, **Colorspace name** and **File extension**. |

## Simple create plugins

**Simple Create Plugins** is a list. Each item defines one creator in the Publisher. The defaults are 12 items (Workfile, Model, Pointcache, Plate, Render, Camera, Image, VDB Volumes, Matchmove, Rig, Simple UE texture, Audio); their variants and extensions are listed on the [overview page](index.md#simple-creators).

| Setting (per item) | Default for a new item | Description |
|---|---|---|
| **Product base type** | Empty | Product base type the creator makes. |
| **Identifier** | Empty | Creator identifier. When empty, the product base type is used. |
| **Label** | Empty | Name shown in the Publisher. |
| **Icon** | Empty | Icon name (for example `fa.file`). |
| **Default Variants** | Empty list | Variants offered for the product name. |
| **Description** | Empty | Short description shown in the Publisher. |
| **Detailed Description** | Empty | Longer description shown in the Publisher. |
| **Allow sequences** | Off | Accept image sequences. |
| **Allow multiple items** | Off | Accept several files or sequences in one instance. |
| **Allow version control** | Off | Offer the version control option. |
| **Extensions** | Empty list | Accepted file extensions. The defaults for Matchmove and Simple UE texture are empty, which accepts any file. |
| **Product type items** | Empty list | Optional list of product types the creator can make; each item has **Product type** and **Label**. |

## Editorial creators

Two groups, **Editorial simple creator** and **Editorial advanced creator**, share most settings.

| Setting | Default | Description |
|---|---|---|
| **Enabled** | On | Makes the creator available. |
| **Default Variants** | `Main` | Variants offered for the editorial product. |
| **Clip Name Tokenizer** | Two tokens (below) | List of **Token name** and **Token regex**. Tokens are regular expressions applied to clip names; each token name is enclosed in underscores and can be used in the rename template and the folder path tokens. |
| **Shot Rename** > **Enabled** | On | Rename discovered shots with the template. |
| **Shot Rename** > **Shot rename template** | `{project[code]}_{_sequence_}_{_shot_}` | Template that accepts Anatomy keys and tokens from the tokenizer. |
| **Shot Hierarchy** > **Enabled** | On | Build the folder path of each shot from the template. |
| **Shot Hierarchy** > **Folder path template** | `{project}/{folder}/{sequence}` | Each token in the path is one folder of the hierarchy. |
| **Shot Hierarchy** > **Folder path template tokens** | Three tokens (below) | List of **Token name**, **Token value** and **Folder Type**. The value accepts text, Anatomy keys and tokenizer tokens. |
| **Add tasks to shot** | Empty list | Tasks (**Task name**, **Task type**) added to each created shot. |

| Default list | Simple creator | Advanced creator |
|---|---|---|
| **Clip Name Tokenizer** | `_sequence_` = `(sc\d{3})`, `_shot_` = `(sh\d{3})` | `_sequence_` = `(\d{4})(?=_\d{4})`, `_shot_` = `(\d{4})(?!_\d{4})` |
| **Folder path template tokens** | `project` = `{project[name]}` (type `Project`), `folder` = `shots` (type `Folder`), `sequence` = `{_sequence_}` (type `Sequence`) | same |

### Product base type presets (simple creator)

The simple creator has a **Product Base Type Presets** list. Each item has **Product base type**, **Variant**, **Review**, **Output File Type** and **Default task** (must be one of the tasks in **Add tasks to shot**).

| Product base type | Variant | Review | Output file type |
|---|---|---|---|
| `review` | `Reference` | On | `.mp4` |
| `plate` | Empty | Off | `.mov` |
| `audio` | Empty | Off | `.wav` |

### Product base type presets (advanced creator)

The advanced creator has a **Product base type presets** list. Each item has the settings below. The default list has one item.

| Setting | Default | Description |
|---|---|---|
| **Default Enabled** | On | Whether the product is enabled by default. |
| **Product base type** | `plate` | Product base type to create. |
| **Variant** | `Reference` | Variant of the product. |
| **Default task** | Empty | Task used when publishing; must be one of **Add tasks to shot**. |
| **Versioning type** | `incremental` | `incremental` raises the version by 1, `from file` takes the version from the file name when one is found, `locked` uses the **Locked version** number. |
| **Locked version** | 1 | Version used by locked versioning. |
| **Representations** | One item (below) | List of file filters that select the representations. |

Default **Representations** item: **Name** `Reference`, **Content type** `video`, **Filter by extensions** `mov`, `mp4`, **Filter by patterns** `.*`, **Tags** `review`, **Custom tags** empty. Extensions are accepted as `.ext`, `ext`, `EXT` or `.EXT`. The `review` tag creates the review from the transcoded representation instead of the original; custom tags can be used to filter in Extract Review output presets.

## Create plugins

### Batch Movie Creator

| Setting | Default | Description |
|---|---|---|
| **Default variants** | `Main` | Variants offered. |
| **Default tasks** | `Compositing` | Tasks offered. |
| **Extensions** | `.mov` | Accepted file extensions. |
| **Product types** | Empty list | Product types the creator may make. |

### PSD Workfile + Image Creator

| Setting | Default | Description |
|---|---|---|
| **Enabled** | Off | Makes the creator available. |
| **Default variants** | `Main` | Variants offered. |
| **Workfile product types** | Empty list | Product types for the workfile instance. |
| **Image  product types** | Empty list | Product types for the image instance. |

### Texture

| Setting | Default | Description |
|---|---|---|
| **Enabled** | On | Makes the creator available. |
| **Default variants** | `Main` | Variants offered. |
| **Extensions** | `.mov`, `.mp4`, `.mxf`, `.m4v`, `.mpg`, `.exr`, `.dpx`, `.tif`, `.png`, `.jpg`, `.tga`, `.tx` | File extensions allowed as textures. |
| **Product type items** | Empty list | Optional product types the creator can make (**Product type**, **Label**). |

### Ingest CSV

| Setting | Default | Description |
|---|---|---|
| **Enabled** | On | Makes the CSV Ingest creator available. |
| **Presets** | One preset, `Default` | List of presets; each describes how one kind of CSV file is read. |

Each preset has these parts:

| Part | Default | Description |
|---|---|---|
| **Name** | `Default` | Preset name. |
| **Prevalidation** | All five modes `error` | Five problems checked before creation: **Existing Versions**, **Wrong Framerange**, **Folder Does Not Exist**, **Folder Name Duplicity**, **Missing Frame Range Values**. Each can be **Raise Error** (`error`) or **Ignore and report** (`ignore`). |
| **Columns config** > **CSV delimiter** | `,` | Column separator. |
| **Columns config** > **Columns** | 22 columns (below) | The columns the CSV can have. |
| **Representations config** > **Tags delimiter** | `;` | Separator for tags in a column. |
| **Representations config** > **Default tags** | `review` | Tags added to created representations. |
| **Representations config** > **Representations** | `preview` (`.mp4`, `.mov`), `exr` (`.exr`), `edit` (`.mov`), `review` (`.mov`), `nuke` (`.nk`) | Representation names and the extensions that map to them. |
| **Folder creation config** | Disabled | See below. |
| **List config** | Disabled, no profiles | See below. |

Each column item has **Name**, **Type** (`Text`, `Number`, `Decimal` or `Boolean`), **Default**, **Required Column**, **Validation Regex Pattern**, **Processing Type** (`Processing Data` or `Passing Data`) and **Passing Data** (a **Name** and a **Passing Data Type**: `Representation Data`, `Instance Data` or `Version Data`).

Default columns (required ones marked): **File Path** (required), **Folder Path** (required), **Folder Name**, **Task Name** (required), **Product Base Type**, **Product Type**, **Variant**, **Version**, **Version Comment**, **Version Thumbnail**, **Frame Start** (required), **Frame End** (required), **Handle Start** (required), **Handle End** (required), **FPS** (required, decimal), **Slate Exists** (boolean, default `True`), **Representation**, **Representation Colorspace**, **Representation Tags**, **Shot Height**, **Shot Width**, **Shot Pixel Aspect** (decimal). All use the `Processing Data` type.

**Folder creation config**

| Setting | Default | Description |
|---|---|---|
| **Enabled folder creation** | Off | Create missing folders and tasks. |
| **Default Folder Type** | `Folder` | Folder type for new folders. |
| **Folder Type Regexes** | `(sh.*)` gives `Shot`, `(seq.*)` gives `Sequence` | Pairs of **Folder Regex** and **Folder Type**; the type is chosen by folder name. |
| **Default Task Type** | `Generic` | Task type for new tasks. |
| **Task Type Regexes** | Empty list | Pairs of **Task Regex** and **Task Type**. |

**List config**

| Setting | Default | Description |
|---|---|---|
| **Enabled** | Off | Create entity lists for the published products. |
| **Profiles** | Empty list | Each profile filters on **Task Types**, **Task names**, **Product base types** and **Product names**, and sets **List Name** (default `{csv_basename}-{yy}{mm}{dd}`; keys `{csv_basename}` and `{csv_parent_dir}` are available), **List type** (`Generic` or `Review Session`) and **List folders**. Each list folder has a **Folder label** (template keys allowed) and a **Scope** (`Scope folder to all views` or `Scope to the list type`). |

## Publish plugins

| Plugin | Enabled | Optional | Active | Notes |
|---|---|---|---|---|
| Collect CSV Ingest Prevalidation Report | On | On | On | |
| Collect Original Sequence Frame Data | On | On | On | |
| Validate Frame Range | On | On | On | |
| Validate Existing Version | On | On | On | |

**Extract Editorial Package Conversion** controls ffmpeg conversion of the media of an editorial package.

| Setting | Default | Description |
|---|---|---|
| **Conversion enabled** | Off | Convert resource files while extracting. |
| **Output Definitions** > **Output extension** | `mp4` | Extension of the converted files. |
| **FFmpeg arguments** > **Video filters** | Empty list | ffmpeg video filters. |
| **FFmpeg arguments** > **Audio filters** | Empty list | ffmpeg audio filters. |
| **FFmpeg arguments** > **Input arguments** | `-apply_trc gamma22` | Arguments placed before the input. |
| **FFmpeg arguments** > **Output arguments** | `-pix_fmt yuv420p`, `-crf 18`, `-g 1` | Arguments placed before the output. |
