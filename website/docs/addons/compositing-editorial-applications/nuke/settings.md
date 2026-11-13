---
title: Nuke addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Nuke addon with their default values: general shortcuts, workfile callbacks, color management, directory mapping, menus, creator, publish and loader plugins, and workfile building."
addon: nuke
addon_repo: ayon-nuke
addon_version: 0.4.19
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-nuke/tree/0.4.19/server/settings
  - https://help.ayon.app/en/articles/2833967-nuke-addon-settings
---

# Nuke addon settings

<AddonInfo />

The settings of the [Nuke addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The settings model is large: lists of profiles are described by the structure of one entry, and the knob structure that several of them share is described once in [Knob definitions](#knob-definitions).

## General

| Setting | Default | Description |
|---|---|---|
| Menu Shortcuts: **Create...** | `ctrl+alt+c` | Keyboard shortcut of the menu entry. |
| Menu Shortcuts: **Publish...** | `ctrl+alt+p` | Keyboard shortcut of the menu entry. |
| Menu Shortcuts: **Load...** | `ctrl+alt+l` | Keyboard shortcut of the menu entry. |
| Menu Shortcuts: **Manage...** | `ctrl+alt+m` | Keyboard shortcut of the menu entry. |
| Menu Shortcuts: **Build Workfile...** | `ctrl+alt+b` | Keyboard shortcut of the menu entry. |
| Menu Shortcuts: **Version Up Workfile** | `alt+shift+s` | Keyboard shortcut of the menu entry. |

## Workfile callbacks

Two groups with the same three switches. **On Script Create** applies to a new workfile, **On Script Open** to a loaded workfile.

| Setting | Default | Description |
|---|---|---|
| Resolution from Context | On | Set the script resolution from the context. |
| Frame Range from Context | On | Set the script frame range from the context. |
| Colorspace from Context | On | Set the script colorspace from the context. |

## Color management (imageio)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch of the section. |
| File Rules: activate_host_rules | Off | Use the file rules of this host. |
| File Rules: Rules | None | Each rule has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. Rule names must be unique. |
| Viewer: Display | `ACES` | Display used when a new viewer node is created. Anatomy context tokens are allowed, and a fallback can follow a `;` separator, for example `{project[code]} ; ACES`. |
| Viewer: View | `sRGB` | View used for the viewer node. Same token and fallback rules. |
| Monitor OUT: Display | `ACES` | Display of the monitor output of new viewer nodes, for external monitors. |
| Monitor OUT: View | `Rec.709` | View of the monitor output. |
| Assign colorspace to read nodes via rules: Inputs | One rule: regex `(beauty).*(?=.exr)`, colorspace `linear` | Each rule has a **Regex expression** and a **Colorspace**. |

### Baking target colorspace

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Enable the baking target. |
| Target baking type | `colorspace` | **Use Colorspace** (`colorspace`) or **Use Display & View** (`display_view`). |
| Colorspace | `Output - Rec.709` | Colorspace name. Anatomy context tokens are allowed. |
| Display & View | Empty | **Display** and **View**, with the token and fallback rules of the viewer settings. |

### Workfile

Color management values of the Nuke script root.

| Setting | Default | Description |
|---|---|---|
| Color Management Workflow | `OCIO` | `Nuke` or `OCIO`. Used only when global color management is disabled, so that no global OCIO environment variable is set. |
| Native OpenColorIO Config | `aces_1.2` | One of the OCIO configs shipped with Nuke, such as `nuke-default`, `aces_1.1`, `aces_1.2`, `studio-config-v1.0.0_aces-v1.3_ocio-v2.1` and `cg-config-v1.0.0_aces-v1.3_ocio-v2.1`. Used under the same condition, and only when the workflow is `OCIO`. |
| Working Space | `role_scene_linear` | Working space of the script. |
| Thumbnails | `ACES/sRGB` | Thumbnail transform. |
| Monitor Out | `ACES/sRGB` | Monitor output transform. |
| 8-bit Files | `role_matte_paint` | Default transform for 8-bit files. |
| 16-bit Files | `role_texture_paint` | Default transform for 16-bit files. |
| Log Files | `role_compositing_log` | Default transform for log files. |
| Float Files | `role_scene_linear` | Default transform for float files. |

### Nodes

Knob values applied to the nodes that creators build.

| Setting | Default | Description |
|---|---|---|
| Plugin required | Three entries (see below) | A list of node definitions applied to the write nodes of the creators. |
| Plugin's node overrides | None | Same structure, plus **Product names**: overrides the required knobs for matching products. |

One entry has **Used in plugins** (a list of creators: `CreateWriteRender`, `CreateWritePrerender`, `CreateWriteImage`, `CreateCamera`, `CreateGizmo`, `CreateModel`, `CreateBackdrop`, `CreateSource`), a **Nuke Node Class** (`Write`, `Read`, `Group`, `Camera4`, `Camera2`, `Scene`, `BackdropNode` or `custom_class`), an optional **Custom Node Class**, and a list of **Knobs**. Knob names must be unique within an entry.

The default entries are all for the `Write` class:

| Used in plugin | Default knobs |
|---|---|
| `CreateWriteRender` | `file_type` `exr`, `datatype` `16 bit half`, `compression` `Zip (1 scanline)`, `autocrop` on, `tile_color` 186, 35, 35, `channels` `rgb`, `colorspace` `scene_linear`, `create_directories` on |
| `CreateWritePrerender` | The same, with `tile_color` 171, 171, 10 |
| `CreateWriteImage` | `file_type` `tiff`, `datatype` `16 bit`, `compression` `Deflate`, `tile_color` 56, 162, 7, `channels` `rgb`, `colorspace` `texture_paint`, `create_directories` on |

### Knob definitions

Knob lists appear in several settings. Each knob has a **Type**, a **Name** and the value field of that type.

| Type | Value field |
|---|---|
| `text` | **Value**, a string. |
| `formatable` | **Template** (a string formatted with context data) and **To Knob type** (`Text` by default; also number, decimal number and 2D vector). |
| `color_gui` | **RGB Uint8**, default 0, 0, 255. |
| `boolean` | **Value**, default off. |
| `number` | **Value**, an integer, default 0. |
| `decimal_number` | **Value**, a float, default 0.0. |
| `vector_2d` | **X** and **Y**, default 1.0. |
| `vector_3d` | **X**, **Y** and **Z**, default 1.0. |
| `color` | **RGBA Float**, default 0.0, 0.0, 1.0, 1.0. |
| `box` | **X**, **Y**, **R** and **T**, default 1.0. |
| `expression` | **Expression**, a string. |

## Nuke directory mapping

| Setting | Default | Description |
|---|---|---|
| enabled | Off | Rewrite file paths with the mapping. |
| Dirmap Paths: Source Paths | None | List of source paths. |
| Dirmap Paths: Destination Paths | None | List of destination paths. |

## Scripts menu definition

Defines a custom menu in the Nuke menu bar.

| Setting | Default | Description |
|---|---|---|
| Menu Name | `Custom Tools` | Title of the menu. |
| Definition | Three actions | A list of items. Each has a **Type**, a **Command**, a **Source Type**, a **Title** and a **Tooltip**. |

The default actions are **Ayon Nuke Docs** (opens the Nuke user documentation in a web browser), **Set Frame Start (Read Node)** (sets the start frame of read nodes) and **Set non publish output for Write Node** (sets up write nodes for non-publish output). Each has the source type `python`.

## Gizmo menu

A list of toolbar menus for gizmos. The default is one entry.

| Setting | Default | Description |
|---|---|---|
| Toolbar Menu Name | `AYON Gizmo` | Name of the toolbar menu. |
| Toolbar Icon Path | Empty (per platform) | Icon of the menu. Empty uses the AYON icon. |
| Gizmo Menu Options | `gizmo_definition` | **Add a Gizmo Directory Path** (`gizmo_source_dir`) or **Add Gizmos by Definitions** (`gizmo_definition`). |
| Gizmo Directory Path | Empty lists per platform | Folders with gizmos. |
| Gizmo Definition | One menu parent with one item | Each entry has a **Gizmo Menu Parent** (empty uses the toolbar menu name) and a **Gizmo List**. Each item has a **Label**, a **Type of usage**, a **Python command**, an **Icon Path** and a **Hotkey**. |

The default item has the label **Gizmo Note**, type `python`, and creates a sticky note that explains how to add menus.

## Creator plugins

### Write creators

**Render (write)** (`CreateWriteRender`), **Prerender (write)** (`CreateWritePrerender`) and **Image (write)** (`CreateWriteImage`) share the same structure.

| Setting | Description |
|---|---|
| Enabled | Enable the creator. |
| Order | Position in the list of creators. Default 100. |
| Product type items | Optional list of product types the creator can create. Each has a **Product type** and a **Label**. |
| Temporary rendering path template | Template of the path the node renders to. |
| Default variants | Variants offered in the Publisher. |
| Instance attributes | Features of the instance: **Reviewable**, **Farm rendering**, **Use range limit**, **Render On Farm**, **Slate Generation**, **Conditional Reviewable**. **Reviewable** and **Conditional Reviewable** cannot be selected together. Slate generation needs the Slater addon. |
| Conditional Reviewable Profiles: Task types | Task types for which the review toggle is shown. Empty shows it for all. |
| Render target | Default render target: **Local machine rendering** (`local`), **Use existing frames** (`frames`), **Use existing frames - farm** (`frames_farm`) or **Farm rendering** (`farm`). The farm options apply only when **Farm rendering** is an instance attribute. |
| Write Node Exposed Knobs | Names of write node knobs that are exposed on the group. |
| Preceding nodes | A list of nodes added before the write node. Each has a unique **Node name**, a **Node class**, an **Incoming dependency** (the name of another preceding node that comes before it) and a list of **Knobs**. |

| Setting | Render | Prerender | Image |
|---|---|---|---|
| Temporary rendering path template | `{work}/renders/nuke/{product[name]}/{product[name]}.{frame}.{ext}` | Same as Render | `{work}/renders/nuke/{product[name]}/{product[name]}.{ext}` |
| Default variants | `Main`, `Mask` | `Key01`, `Bg01`, `Fg01`, `Branch01`, `Part01` | `StillFrame`, `MPFrame`, `LayoutFrame` |
| Instance attributes | Reviewable, Farm rendering | Farm rendering, Use range limit | Use range limit |
| Render target | `local` | `local` | `local` |
| Write Node Exposed Knobs | None | None | None |
| Preceding nodes | `Reformat01` (class `Reformat`, knobs `resize` `none` and `black_outside` on) | None | `FrameHold01` (class `FrameHold`, knob `first_frame` as expression `parent.first`) |

### Other creators

| Creator | Enabled | Order | Notes |
|---|---|---|---|
| Nukenodes (backdrop) (`CreateBackdrop`) | On | 100 | Has **Product type items**. |
| Camera (3d) (`CreateCamera`) | On | 100 | Has **Product type items**. |
| Gizmo (group) (`CreateGizmo`) | On | 100 | Has **Product type items**. |
| Shapes (Silhouette .fxs) (`CreateSilhouetteShapes`) | On | 100 | Exports the `.fxs` format used by Boris FX Silhouette. |
| Model (3d) (`CreateModel`) | On | 100 | Has **Product type items**. |
| Source (read) (`CreateSource`) | On | 100 | Has **Product type items**. |

**Create Workfile** has one setting, **Mandatory workfile** (default off): the user cannot disable the workfile in the Publisher. It requires core addon 1.4.1 or newer.

## Publish plugins

### Collectors

| Plugin | Setting | Default |
|---|---|---|
| Collect Sync Workfile Version | Product base types | `nukenodes`, `camera`, `gizmo`, `source`, `render`, `write`. The enum offers `nukenodes`, `model`, `camera`, `gizmo`, `source`, `render`, `prerender` and `image`. |

### Validators

| Validator | Enabled | Optional | Active |
|---|---|---|---|
| Validate Correct Folder Name | On | On | On |
| Validate Output Resolution | On | On | On |
| Validate Exposed Knobs | On | Off | On |
| Validate Proxy Mode | On | Off | On |
| Validate Rendered Frames | On | Off | On |
| Validate Nuke Write Node | On | Off | On |
| Validate Gizmo | On | On | On |
| Validate Backdrop | On | On | On |
| Validate workfile attributes | On | On | On |

**Validate Knobs** is off by default. Its **Knobs** setting is a JSON object keyed by product base type, whose values are the knob values to require. The default is `{"render": {"review": true}}`.

### Extractors

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Extract Review Data | Enabled | Off | Adds a raw reviewable representation from the output of a write node, for output that is already ready for review. |
| Extract Camera Format | Camera export format | `abc` | **Alembic** (`abc`) or **FBX** (`fbx`). |
| Extract Slate Frame | Viewer lut raw | Off | Do not apply the viewer LUT to the slate. |
| Extract Slate Frame | Key value mapping | See below | Templates for slate fields. |

Key value mapping has three entries, each with an enabled switch and a template: `f_submission_note` (on, `{comment}`), `f_submitting_for` (on, `{intent[value]}`) and `f_vfx_scope_of_work` (off, empty).

### Extract Review Intermediates

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Enable the plugin. |
| Viewer lut raw | Off | Do not apply the viewer LUT. |
| Baking streams | One stream, `baking` | A list of output definitions. |

One baking stream has the following settings. The default stream `baking` uses the defaults in the table.

| Setting | Default | Description |
|---|---|---|
| Output name | `baking` | Name of the output. |
| Publish | Off | Publish the output as its own product. |
| Filter | Empty lists | **Task types**, **Sync workfile versions for product base types** (`render`, `prerender`, `image`) and **Product names**. Empty lists match everything. |
| Input read node RAW switch | Off | Set the input read node to raw. |
| Write Knobs | `mov`, knobs `mov64_codec` `ap4h` and `mov64_write_timecode` on | **File type** and **Additional Knobs** of the output write node. |
| Bake viewer process | On | Bake the viewer process into the output. |
| Target baking colorspace override | Disabled | Overrides the [baking target](#baking-target-colorspace): **Enabled**, **Target baking type**, **Colorspace**, **Display & View**. |
| Bake viewer input process node (LUT) | On | Bake the viewer input process node. |
| Reformat Nodes | Disabled | **Enabled** and a list of **Reposition knobs**, each with a **Node class** and **Node knobs**. They are applied in order. The default list has one `Reformat` entry (type `to format`, format `HD_1080`, filter `Lanczos6`, `black_outside` on, `pbb` off). |
| Custom tags | None | Tags added to the representation. |
| Handle missing frames | `0` | **Fail on missing** (`0`), **Generate blank frame** (`1`), **Use checkerboard** (`2`) or **Use closest existing** (`3`). |

### Integrators

| Plugin | Enabled | Optional | Active | Description |
|---|---|---|---|---|
| Increment Workfile Version | On | On | On | Saves the next workfile version when the plugins before it have no errors. |
| Increment path in Write node | Off | On | On | Updates the version in the write node path with the workfile version, to have versioned intermediate `renders` folders. It depends on the core addon's custom staging directory profiles. |

## Loader plugins

These loaders have only an **Enabled** switch, on by default: Load AlembicCamera, Load AlembicModel, Load FbxCamera, Load GeoImport, Load GeoReference, Load LinkAsGroup, Load Effects, Load Effects Input Process, Load Gizmo, Load Gizmo Input Process, Load Ocio Look Nodes, Load Matchmove, Set Frame Range, Set Frame Range With Handles and Load USD Camera.

| Loader | Setting | Default | Description |
|---|---|---|---|
| Load Backdrop Nodes | Enabled | On | Enable the loader. |
| Load Backdrop Nodes | Remove existing AYON backdrops when removing container | Off | Also remove the backdrop when the container is removed. |
| Load Clip | Enabled | On | Enable the loader. |
| Load Clip | Include representations | None | Restrict the loader to these representation names. Empty allows all. |
| Load Clip | Read node name template | `{class_name}_{ext}` | Template of the Read node name. |
| Load Clip | Loader option defaults | See below | Defaults of the loader options. |
| Load Image | Enabled | On | Enable the loader. |
| Load Image | Include representations | None | Restrict the loader to these representation names. Empty allows all. |
| Load Image | Read node name template | `{class_name}_{ext}` | Template of the Read node name. |

Loader option defaults of Load Clip:

| Setting | Default | Description |
|---|---|---|
| Set frame range to version frame range | On | Set the node frame range to the frame range of the version. |
| Start at workfile's start frame | Off | Start the clip at the first frame of the script. |
| Add retime | On | Add a retime. |
| Read Node Type | `auto` | **Auto-detect** (`auto`), **Read** or **DeepRead**. |

## Workfile builder

Deprecated; replaced by the templated workfile build.

| Setting | Default | Description |
|---|---|---|
| Create first workfile | Off | Create the first workfile version. |
| Custom templates | None | A list of entries with **Task types** and a platform **path**. |
| Run Builder at first workfile | Off | Run the builder when the first workfile is created. |
| Builder profiles | None | See below. |

One builder profile has **Task types** and **Task names**, and two lists, **Current context** and **Linked folders**. An item of these lists has **Product name** filters, **Product base types**, **Representations** and **Loader plugins**.

## Templated workfile build

A list of profiles, empty by default. One profile has the following settings.

| Setting | Default | Description |
|---|---|---|
| Task types | None | Task types the profile applies to. |
| Task names | None | Task names the profile applies to. |
| Path to template | Empty | Path of the template file. |
| Keep placeholders | Off | Keep the placeholders after the build. |
| Apply to New Scene | Off | Build when a new scene is created. |
| Apply on Nuke launch | On | Build when Nuke launches. |
| Save first workfile version | On | Save the first version of the workfile after the build. |
