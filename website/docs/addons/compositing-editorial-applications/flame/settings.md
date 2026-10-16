---
title: Flame addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Flame addon with their default values: project bookmarks, color management, hooks, creator, collector, extractor and loader plugins, and the custom menu."
addon: flame
addon_repo: ayon-flame
addon_version: 1.4.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-flame/tree/1.4.5/server/settings
  - https://help.ayon.app/en/articles/8354392-autodesk-flame-addon-settings
---

# Flame addon settings

<AddonInfo />

The settings of the [Flame addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Project bookmarks

After Flame launches, the addon writes bookmarks into the Flame project so that its project folders appear in the Media Hub.

| Setting | Default | Description |
|---|---|---|
| Enable Bookmarks | On | Create the bookmarks. |
| Flame Projects' Location > Variants | One variant | Where Flame projects are stored, for each Flame installation. A variant has a **Name** (matched against the Flame application variant, empty by default), a **Label** (`Default`) and **Path to Projects Folder** for **Windows** (empty), **Linux** and **MacOS** (both `/opt/Autodesk/project`). The first existing folder of the current platform is used. |
| Bookmark Paths | One item | Bookmarks to create. An item has a **Name**, a **Label Template** and a **Path Template**. The template fields are `root` and `project` only. The default item is **Project Root**, with label `{project[name]}` and path `{root[work]}/{project[name]}`. |

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Flame follows the color management of AYON. |
| Remapping colorspace names > Rules | None | Map a colorspace name of the application (**Application native colorspace name**) to an OCIO name (**OCIO colorspace name**). |
| File Rules > Activate Host Rules | Off | Turn on the file rules of this host. |
| File Rules > Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |
| Project > SyncColor Policy (name or path) | `ACES 1.1` | The SynColor preset used when a new Flame project is created (Flame before 2026). |
| Project > OCIO default config | `/opt/Autodesk/colour_mgmt/configs/legacy_configs/syncolor_aces1.1_config/config.ocio` | The OCIO config used when a new project is created (Flame 2026 and later). Used only when no global OCIO environment variable is set. |
| Project > Image Depth | `16-bit fp` | Frame depth of the new project. |
| Project > Field Dominance | `PROGRESSIVE` | Field dominance of the new project. |
| Profile names mapping | Two items | Map Flame colorspace profile names (**Flame name**) to OCIO names (**OCIO name**). The first default item maps `ACEScg` to `ACES - ACEScg`. |

## Hooks

| Setting | Default | Description |
|---|---|---|
| Install OpenTimelineIO to Flame > Enable | On | Install OpenTimelineIO into the Python environment of Flame before launch. Turn it off when the library is already installed. |

## Create plugins

### Create Shot Clip

Default values of the attributes shown in the **Create Publishable Clip** creator.

| Setting | Default | Description |
|---|---|---|
| Shot parent hierarchy | `{folder}/{sequence}` | Template of the parent folders of the shot. |
| Use Shot Name | On | Use the shot name of the clip. |
| Rename clips | Off | Rename the timeline clips. |
| Clip name template | `{sequence}{shot}` | Template of the clip name. |
| Accept segment order | On | Number shots by their order in the sequence. |
| Count sequence from | 10 | First shot number. |
| Stepping number | 10 | Increment between shot numbers. |
| {folder} | `shots` | Value of the `{folder}` keyword. |
| {episode} | `ep01` | Value of the `{episode}` keyword. |
| {sequence} | `a` | Value of the `{sequence}` keyword. |
| {track} | `{_track_}` | Value of the `{track}` keyword. |
| {shot} | `####` | Value of the `{shot}` keyword. |
| Enable Vertical Sync | Off | Publish several plate variants per shot from several tracks, where one hero track drives the shot. |
| Include audio | Off | Also publish audio. |
| Source resolution | Off | Use the resolution of the source media. |
| Workfiles Start Frame | 1001 | First frame of the workfile. |
| Handle start (head) | 5 | Maximum trim at the head of the clip. |
| Handle end (tail) | 5 | Maximum trim at the tail of the clip. |
| Enable handles including | Off | Include the handles in the workfile start frame. |
| Enable retimed handles | On | Recalculate the handles with the speed of a retimed clip. |
| Enable retimed shot frameranges | On | Recalculate the shot frame range for retimed clips. |
| Exposed Overrides | All of the attributes above | Which of the attributes the artist can change when publishing. |
| Plate product types | None | Optional list of product types for plate products. |

### Collect Shot Clip instances

| Setting | Default | Description |
|---|---|---|
| Collect only instances from selected clips. | Off | Restrict the collection of instances to the clips selected in the active sequence. |

### Create Batch Render

Presets applied to the Write File node that the **Batch Render** creator creates. In Flame 2026 and later a preset attribute that the node does not support is logged as a warning.

| Setting | Default | Description |
|---|---|---|
| Node name | `RenderFlame` | Name of the Write File node. |
| Media path | Empty | Output folder of the node. |
| Frame padding | 4 | Frame padding of the output files. |
| Compress mode | `DWAA` | Compression of the output. |
| Include setup | On | Save the batch setup next to the render. |
| Include setup path | `<batch name>_flame_v<iteration###>` | Name pattern of the saved setup. |
| Create clip | Off | Also create a clip of the output. |
| Shot name | `<batch name>` | Shot name pattern. |
| Media path pattern | `renders/flame/<name>/v<iteration###>/<batch name><name>_v<iteration###>` | File path pattern of the output. |

## Publish plugins

### Collect Shot instances

| Setting | Default | Description |
|---|---|---|
| XML presets attributes parsable from segment comments | `width` (number), `height` (number), `pixelRatio` (float), `resizeType` (string), `resizeFilter` (string) | Attributes that can be written in a segment comment and passed to the XML export preset. Each has an **Attribute name** and an **Attribute type**. |
| Add tasks | One item: `compositing`, type `Compositing`, **Create batch group** on | Tasks added to every published shot folder. Each has a **Task name**, a **Task type** and **Create batch group**, which controls whether [Integrate Batch Groups](index.md#extractors-and-integrators) creates a batch group for the task. |

### Validators

| Validator | Enabled | Optional | Active |
|---|---|---|---|
| Validate Product Attributes | Off | On | Off |
| Validate Segments (shown as Validate Timeline Segments when publishing) | Off | On | Off |

### Extract Product Resources

The export presets use Flame XML presets. Each preset has an **XML preset directory**: when it is empty, the shared or installed preset folders of Flame are used.

**Missing media link export presets** (for clips whose media link is missing):

| Setting | Default | Description |
|---|---|---|
| Output extension | `exr` | Extension of the published representation. |
| Output color (imageio) | `ACES - ACEScg` | Colorspace stored in the representation. |
| Export clip type | `File Sequence` | Type of the XML preset. |
| XML preset directory | Empty | Folder of the XML preset. |
| XML preset file (with ext) | `OpenEXR (16-bit fp DWAA).xml` | The XML preset file. |
| Distribute parsed comment attributes to XML preset | On | Pass the attributes parsed from clip comments to the preset. This can change the resolution of the exported media. |
| Add range to representation name | On | Add frame range attributes to the representation data. |

**Thumbnail generator preset:**

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Generate a thumbnail. |
| Output extension | `jpg` | Extension of the thumbnail. |
| Output color (imageio) | `Output - sRGB` | Colorspace stored in the representation. |
| Export clip type | `File Sequence` | Type of the XML preset. |
| XML preset directory | Empty | Folder of the XML preset. |
| XML preset file (with ext) | `Jpeg (8-bit).xml` | The XML preset file. |

**Additional representations export:**

| Setting | Default | Description |
|---|---|---|
| Publish clip's original media | Off | Publish the original media of the clip as a representation. |
| Additional representations export presets mapping | One item, `exr16fpdwaa`, not enabled | Presets that export further representations. |

An item of the mapping has the fields of the missing media preset above, plus these.

| Setting | Default | Description |
|---|---|---|
| Is enabled | Off in the default item | Use the preset. |
| Name | `exr16fpdwaa` | Identifies the preset and is the representation name. It can be part of the output file name through the `outputName` anatomy token. |
| Activate by search pattern | `.*` | The preset is used when the media path of the clip matches this regular expression. |
| Representation tags | None | Tags added to the representation, for example to mark it reviewable. |
| Load to batch group reel | On | Load the representation into the batch group reel after publishing (used with Integrate Batch Groups). |
| Use loader name | `LoadClipBatch` | The loader used for that. |

### Integrate Batch Groups

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Create a batch group for each task of a published shot and load the clip into it. |

## Loader plugins

| Loader | Setting | Default | Description |
|---|---|---|---|
| Load Clip (**Load as clip**) | Enabled | On | Make the loader available. |
| | Product types | None | Product types it can load. When empty, the loader handles `render2d`, `source`, `plate`, `render` and `review`. |
| | Reel group name | `AYON_Reels` | Reel group that receives the clips. |
| | Reel name | `Loaded` | Reel that receives the clips. |
| | Clip name template | `{folder[name]}_{product[name]}<_{output}>` | Name of the loaded clip. |
| | Layer name template | `{folder[name]}_{product[name]}<_{output}>` | Name of a renamed layer. |
| | Layer rename patters | `rgb`, `rgba` | Layer names that are renamed with the layer template. |
| Load as clip to current batch | Enabled | On | Make the loader available. |
| | Product types | None | As above. |
| | Reel name | `AYON_LoadedReel` | Reel of the batch that receives the clips. |
| | Clip name template | `{batch}_{folder[name]}_{product[name]}<_{output}>` | Name of the loaded clip. |
| | Layer name template | `{folder[name]}_{product[name]}<_{output}>` | Name of a renamed layer. |
| | Layer rename patters | `rgb`, `rgba` | Layer names that are renamed with the layer template. |

## Custom menu

Adds a script menu to the AYON menus of Flame.

| Setting | Default | Description |
|---|---|---|
| enabled | Off | Show the menu. |
| Menu name | `Custom Tools` | Name of the menu. |
| Definition | One action | The items of the menu. An item is an **Action** or a **Menu** with its own title and actions. |

An **Action** has a **Title**, a **Flame Context** (`ALL`, `FlameMenuUniversal`, `FlameMenuTimeline` or `FlameMenuBatch`), a **Source Type** (`python` or `file`), the **Python** code or the **Filepath** of a script. A file script must define a function named like the file. The default action is **AYON Flame Docs**, for all contexts, which opens a documentation page in the web browser.
