---
title: Slater addon
sidebar_label: Overview
description: "The AYON Slater addon: the Slate Editor desktop tool, the slate templates stored on the AYON server and the publish plugin that adds generated slates to review representations."
addon: slater
addon_repo: ayon-slater
addon_version: 1.0.6
addon_scope: pipeline
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/2723500-slate-editor
  - https://help.ayon.app/en/articles/7077398-using-slater-addon
---

# Slater addon

<AddonInfo />

The Slater addon adds slates to review media. A slate is an image, drawn from a layout, that is placed in front of a review video or image sequence and shows production data such as project, folder, task, version, frame range and timecode. The addon has two parts: the **Slate Editor**, a desktop tool for designing slate layouts that are stored on the AYON server, and a publish plugin, **Generate slates**, that fills a layout with the data of the instance being published and prepends the result to its review representations. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.8.2 or newer |
| AYON launcher | Runs the Slate Editor and the slate generation (the addon has no service) |
| License | Slater is a licensed addon (flags: `licensed`, `power-feature`) |

The addon has no server version requirement.

## Where it appears in AYON

| Place | What it is |
|---|---|
| **Slate Editor** action | An AYON server action in the category **Desktop tools**, offered for a project, a folder or a task. It starts the AYON launcher with the addon command `slater launch` for the selected entity. |
| Launcher command | `addon slater launch` with the options `--project`, `--entity-type` (`project`, `folder` or `task`) and `--entity-id`. The project can also come from `AYON_PROJECT_NAME`. |
| **Generate slates** | A publish plugin (an extractor) that runs in every publish that loads the addon's plugin path. It is optional in the Publisher. |
| Server endpoints | The addon stores slate templates as JSON files on the server and exposes endpoints to list, download, upload and delete them. The editor and the publish plugin use these endpoints. |

## Slate Editor

The Slate Editor is a Qt application that edits a slate layout on a canvas. The entity it was started from provides the preview data.

### Layout items

| Item | Purpose |
|---|---|
| Text | Text field. Text can contain template keys in curly braces. |
| Line | Straight line. |
| Image | Image from a file path. It has an option to apply colorspace conversion. |
| Color bar | A color bar image. |
| Rectangle | Rectangular shape. |

Each item has a position, scale, rotation and z-value. The layout itself has a background color, a grid and a resolution preset of `720p` (1280x720), `1080p` (1920x1080) or `4K UHDTV` (3840x2160).

### File menu

| Entry | What it does |
|---|---|
| **Download Layout...** | Loads a template stored on the AYON server. |
| **Upload Layout...** | Stores the layout on the AYON server as a template. Only uploaded templates can be selected in the settings. |
| **Delete Layout...** | Deletes a template from the AYON server. |
| **Load Layout...** | Loads a layout from a local JSON file or pasted JSON. |
| **Save Layout** / **Save Layout As...** | Saves the layout as a local JSON file. |
| **Save Slate As...** | Renders and saves the slate image. |
| **Quit** | Closes the editor. |

The **Edit** menu has Undo, Redo, Duplicate Selected, Delete Selected and Clear Scene. The **View** menu has Add Resolution, Frame Selected, Frame All and Show Grid.

### Template keys

Text can contain keys such as `{project[name]}`, `{task[name]}`, `{folder[path]}`, `{product[name]}`, `{version}`, `{fps}`, `{frames}`, `{timecode}`, `{studio[name]}` and `{user[name]}`. The editor keeps a list of the supported keys (`data_keys.json`) and suggests them while typing. When the preview is on, keys are replaced with values of the context the editor was started from; a key that cannot be resolved stays as typed. The default template `ayon_default` uses, among others, `{studio[name]}`, `{frames}`, `{timecode}` and `{fps}`.

### Default template

The server addon copies a template named `ayon_default` into its template folder (`/storage/addons/slater/templates`) when it starts, and again after a deletion leaves no template.

## Publishing

The extractor **Generate slates** (`ExtractGeneratedSlates`) runs after the review extractors (order `ExtractorOrder + 0.031`). It processes only representations that carry the tag `slate-frame`; the tag is added through the output definitions of the review extractor in the core addon settings.

| Step | What happens |
|---|---|
| Profile | The best-matching profile for host name, product base type (the product type when none is set) and product name is used (empty lists match everything). |
| Slate selection | Every slate of the profile whose **Families** filter matches the instance families (an empty filter always matches) is generated. |
| Rendering | The layout is filled with the publish data and rendered to an EXR image by a headless launcher process. The studio logo of the slate definition is passed to the layout. |
| Merging | For an image sequence (extensions known as image extensions) the slate is added as a frame before the first frame. For video, it is concatenated in front; source audio is kept when present. |
| Timecode | When the source carries a start timecode (read with ffprobe for video, oiiotool for images), the slate gets that timecode minus one frame and the merged output keeps the timecode. |
| Result | New representations are placed first in the list, and the instance gets the family `slate`. |

The **Representation Flow** of each slate decides what happens to the source representation:

| Flow | Result |
|---|---|
| Replace Source Representation | The slated representation keeps the name of the source and the source is removed. |
| Append new with Slate name as Suffix | A new representation is added. Its name is the representation extension, the output name when set, and the slate name, joined by underscores. |
| Append new with Name Template | A new representation is added, named by the **Representation name template**. |

## Related

- [Slater addon settings](settings.md)
