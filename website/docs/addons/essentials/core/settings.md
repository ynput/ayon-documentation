---
title: Core addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON core addon with their default values: general studio settings, tools (creator, workfiles, loader, publish), version start, color management and the publish plugins."
addon: core
addon_repo: ayon-core
addon_version: 1.10.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-core/tree/1.10.1/server/settings
  - https://help.ayon.app/en/help/articles/3005275-core-addon-settings
  - https://help.ayon.app/en/help/articles/1279384-colorspace-settings
---

# Core addon settings

<AddonInfo />

The settings of the [core addon](index.md), with the default values the addon ships with. They are studio settings that projects can override. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The model is large, so this page groups it by area. Most lists are **profile lists**: each profile has filters (such as **Host names**, **Task types**, **Task names**, **Product base types**, **Product names**) and values. The first profile that matches the context is used, and an empty filter matches everything. A profile without filters acts as the default.

Plugins that can be switched share three options: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default).

## General

| Setting | Default | Description |
|---|---|---|
| Studio name | Empty | Full name of the studio. Can be used as a variable in some places. |
| Studio code | Empty | Short code of the studio. |
| Global environment variables | `{"STUDIO_SW": ...}` | JSON object of variables applied to AYON processes. The default sets `STUDIO_SW` per platform (`P:/REPO_SW` on Windows, `/mnt/REPO_SW` on Linux and macOS) as an example. |
| Update check interval (minutes) | 5 | How often the launcher checks for updates. |
| Disk mapping | Empty | Per platform (**Windows**, **Linux**, **MacOS**) a list of **Source** and **Destination** paths. The source is made available under the destination, for example a share under a drive letter. Applied when the launcher starts. |
| Additional Project Plugin Paths | Empty | Per platform, folders with custom create, publish and load plugins registered for the project. Environment variables can be used. Paths that do not exist are skipped. |
| Project folder structure | A JSON tree | The folders created on disk by the **Create project folders** action. The default has `prod`, `resources` (footage, audio, art_dept), `editorial`, `assets` and `shots` under the project root. |
| Project environments | `{}` | Variables set when launching applications in the project. |
| Filter farm environment | Empty | Profile list for farm publish jobs. Filters: **Host names**, **Task types**, **Task names**, **Folder paths**. Values: **Skip environment variables** (removed from the job) and **Replace values in environment** (items with **Environment variable**, **Pattern** and **Replacement**; an empty result removes the variable). |
| Version start | No profiles | Profile list that sets the number of the first version of products and workfiles. Filters: **Host names**, **Task types**, **Task names**, **Product base types**, **Product names**. Value: **Version Start** (default 1). Without a matching profile, versions start at 1. |
| Default reviewable layers | `Beauty` | Ordered layer names used to find the reviewable channel. The first match is used. An empty list uses the default sorting. |

## Tools

### AYON Menu and General

| Setting | Default | Description |
|---|---|---|
| Version Up Workfile | Off | Adds **Version Up Workfile** to the AYON menu. |
| Use task type sorting | On | Sorts tasks in the UIs by the order of task types in the anatomy. |

### Creator

| Setting | Default | Description |
|---|---|---|
| Create Smart Select | See below | Pairs of **Product type** and **Task names**. No code of the core addon applies it in this version. |
| Use legacy product names for renders | On | Keeps the legacy naming of render products. While on, templates for renders in the product name profiles are ignored. |
| Product name profiles | See below | Templates that build product names. Filters: **Product base types**, **Product types**, **Host names**, **Task types**, **Task names**. Value: **Template**. |
| Filter creator profiles | Empty | Limit the creators shown in the Publisher. Filters: **Host names**, **Task types**, **Task names**. Value: **Allowed Creator Labels**, labels copied from the Publisher, regular expressions supported. |

Default smart select: `Render` for tasks `light` and `render`; `Model` for `model`; `Layout` for `layout`; `Look` for `look`; `Rig` for `rigging` and `rig`.

Default product name profiles:

| Filters | Template |
|---|---|
| None (default) | `{product[type]}{variant}` |
| `workfile` | `{product[type]}{Task[name]}` |
| `render` | `{product[type]}{Task[name]}{Variant}<_{Aov}>` |
| `renderLayer`, `renderPass` in `tvpaint` | `{product[type]}{Task[name]}_{Renderlayer}_{Renderpass}` |
| `review`, `workfile` in `aftereffects`, `tvpaint` | `{product[type]}{Task[name]}` |
| `render` in `aftereffects` | `{product[type]}{Task[name]}{Composition}{Variant}` |
| `staticMesh` in `maya` | `S_{folder[name]}{variant}` |
| `skeletalMesh` in `maya` | `SK_{folder[name]}{variant}` |
| `hda` in `houdini` | `{folder[name]}_{variant}` |
| `textureSet` in `substancedesigner` | `T_{folder[name]}{variant}` |

Keys written with a capital first letter, such as `{Task[name]}`, capitalize the first letter of the value; a fully capitalized key capitalizes every letter.

### Workfiles

| Setting | Default | Description |
|---|---|---|
| Workfile template profiles | `default` template; `unreal` template for the `unreal` host | Chooses the workfile template by **Task types** and **Host names**. Value: **Workfile template**. |
| Open last workfile on launch | One profile without filters: enabled, last published workfile not used | Filters: **Host names**, **Task types**, **Task names**. Values: **Enabled**, **Use last published workfile**. |
| Open workfile tool on launch | One profile without filters: disabled | Opens the Workfiles tool when the application starts. Filters: **Host names**, **Task types**, **Task names**. Value: **Enabled**. |
| Extra work folders | Empty | Folders created in the work directory. Filters: **Host names**, **Task types**, **Task names**. Value: **Folders**. |
| Workfile lock profiles | Empty | Locking of workfiles per **Host names**. Value: **Enabled**. |

### Loader

| Setting | Default | Description |
|---|---|---|
| Use legacy loader | Off | Uses the legacy Loader UI. |
| Product type filtering | Empty | Profiles by **Host names** and **Task types**. **Filter type** (`is_allow_list` by default) and **Product types** limit the product types the Loader shows. |

### Publish tool

| Setting | Default | Description |
|---|---|---|
| Template name profiles | See below | Selects the anatomy publish template. Filters: **Product base types**, **Host names**, **Task types**, **Task names**. Value: **Template name**. |
| Hero template name profiles | One profile | Selects the anatomy template for hero versions, same filters. |
| Custom Staging Dir Profiles | Empty | Defines a custom staging folder. **Is active** (on), filters **Host names**, **Task types**, **Task names**, **Product base types**, **Product names**, values **Custom Staging Folder Persistent** (off) and **Template name**. The template must have a `folder` key. |
| Validate plugins discovery | Off | Strict mode of plugin discovery, with **Ignored paths (regex)**. |
| Publish comment minimum required characters | 0 | Minimum comment length before the Publisher continues. |

Default template name profiles: `default` for everything; `render` for product base types `review`, `render`, `prerender`; `simpleUnrealTexture` for `image` and `textures` in `substancedesigner`; `maya2unreal` for `staticMesh` and `skeletalMesh` in `maya`; `online` for `online` in `traypublisher`; `tycache` for `tycache` in `max`; `unrealuasset` for `uasset` and `umap` in `unreal`. The default hero profile uses `simpleUnrealTextureHero` for `image` and `textures` in `substancedesigner`.

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | Off | Applies the global color management to all hosts. A host can override it in its own ImageIO settings. |
| OCIO config profiles | One profile without filters | Profile list. Filters: **Host names**, **Task types**, **Task names**, **Application names** (full name `group/variant`). See below. |
| Activate global file rules | Off | Uses the global rules for all hosts. A host with its own activated rules uses those instead. |
| Rules | One example rule | Each rule has **Rule name**, **Regex pattern** (at publish time matched against the name of the first file), **Colorspace name** and **File extension**. A rule applies when both pattern and extension match; the last matching rule wins. The example rule assigns `ACES - ACEScg` to `exr` files that match `.*(beauty).*`. |

An OCIO config profile has a **Profile type**.

| Profile type | Fields |
|---|---|
| AYON built-in OCIO config | **Built-in OCIO config**: ACES 2.0 Studio (OCIO v2.4), ACES 1.3 Studio (OCIO v2.1), ACES 1.3 Studio (OCIO v2), ACES 1.2 or Nuke default. Needs the `ayon_ocio` addon. The default profile uses ACES 1.2. |
| Path to OCIO config | **OCIO config path**. Anatomy keys are supported. |
| Published product | **Product name** of a product in the folder (regular expressions allowed, an exact match is preferred) whose latest version has an `ocioconfig` representation, and a **fallback** (a built-in config or a path) for when none is found. An empty product name is an error. |
| Disable OCIO management | OCIO management is turned off for matching contexts. |

When no profile matches, color management is disabled for the context.

## Publish plugins

### Collectors

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Collect Anatomy Instance Data | Follow workfile version | Off | Publishes with the version of the workfile instead of the next free version. Only for hosts in **Collect Version from Workfile**. |
| Collect Folder Audio | Enabled | Off | Collects the last published audio of the folder. |
| Collect Folder Audio | Name of audio variant | `audioMain` | Variant of the audio product. |
| Collect Version from Workfile | Host names | `aftereffects`, `blender`, `celaction`, `fusion`, `harmony`, `hiero`, `houdini`, `maya`, `nuke`, `photoshop`, `resolve`, `tvpaint`, `substancepainter` | Hosts that read the version from the workfile name. |
| Collect Version from Workfile | Skip for host if headless publish | Empty | Hosts for which this is skipped when publishing without UI. |
| Collect comment per instance | Enabled, Families | Off, empty | Per-instance comment attribute for the listed families. |
| Collect Status | Enabled | Off | Sets the version status. |
| Collect Status | Status profiles | Empty | Filters: **Product base types**, **Host names**, **Task types**, **Task names**. Values: **Default status** and **Artist can change** (on). |
| Collect Frames to Fix | Enabled, Show 'Rewrite latest version' toggle | On, On | Frames-to-fix field for Nuke render instances. |
| Collect Version Tags | Enabled | Off | Lets the artist pick version tags. |
| Collect Explicit Resolution | Enabled | On | Resolution choice attribute. |
| Collect Explicit Resolution | Product base types | `shot` | Product base types that get the attribute. |
| Collect Explicit Resolution | Resolution choices | Empty | Items with **Width** (1920), **Height** (1080) and **Pixel aspect** (1.0). |
| Collect Hierarchy | Edit shot attributes on update | On | Updates attributes of existing shot folders. |
| Collect Hierarchy | Skip shot attributes on update | Empty | Attributes that are not updated. |
| Collect Version to List | Enabled | Off | Adds versions to lists. |
| Collect Version to List | Profiles | Empty | Filters: **Host names**, **Task Types**, **Task names**, **Product base types**, **Product names**. Values: **List Name** (`{folder[name]}`), **List type** (`Generic` or `Review Session`) and **List folders**, a list of **Folder label** and **Scope** (all views or the list type). |

### USD contributions

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Collect USD Layer Contributions | Enabled | On | Prepares department layer contributions. |
| Collect USD Layer Contributions | Department Layer Orders | See below | Items with **Name**, **Scope** (`asset`, `shot`) and **Order**. A higher order is a stronger layer. |
| Collect USD Layer Contributions | Profiles | See below | Default contribution attributes per context. |
| Collect Predefined USD Contributions | Enabled | Off | Adds configurable contributions to a `usdAsset` or `usdShot`. |
| Collect Predefined USD Contributions | Profiles | Empty | Filters: **Task Types**, **Product names**. Each has a list of **Contributions**. |
| Extract USD Asset Contribution | Contribution path | Filepath | How layer paths are written: Filepath, AYON Entity URI (explicit version), as latest version or as latest approved. Entity URI options need the AYON USD Resolver. |
| Extract USD Layer Contribution | Always set default prim to folder name | Off | Overrides the default prim of older published layers with the AYON standard. |

Default department layers, asset scope: `model` 100, `assembly` 150, `groom` 175, `look` 200, `rig` 300. Shot scope: `layout` 200, `animation` 300, `simulation` 400, `fx` 500, `lighting` 600.

A USD layer contribution profile has filters **Product base types**, **Task Types** and **Task names**, and the defaults **Contribution Enabled (default)**, **Contribution Department Layer**, **Target Product** (`usdAsset` or `usdShot`), **Apply as variant**, **Variant Set name** (`{layer}`), **Variant Name** (`{variant}`) and **Set as default variant selection** (`if_not_set`). The default profiles contribute `model`, `look`, `groom` and `rig` products to `usdAsset` as variants of the layer of the same name, and `usd` products to `usdShot` in the `assembly` layer, not as a variant.

A predefined contribution has **Layer Identifier**, **Order**, **Load** (sublayer, reference or reference inside a variant; with a **Target Prim Path** or **Variant set name**, **Variant name** and default selection policy), **Add only if version exists** and a **Layer method**: a **Source Path** (path or AYON entity URI), or a product found in the first parent folder of a given type, with **Parent folder type**, **Product name**, **Version** (`latest`), **Representation name** (`usd`) and **Load as AYON Entity URI**.

### Validators

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Validate Editorial Asset Name | Enabled, Optional, Active | On, Off, On | Listed in the settings. The core addon contains no plugin with this name. |
| Validate Version | Plugin enable state profiles | One profile | Per **Host names**: **Enabled**, **Optional**, **Active**. Default: enabled, not optional, active for `aftereffects`, `blender`, `houdini`, `maya`, `nuke`, `photoshop`, `substancepainter`, `silhouette`. The plugin is disabled for hosts without a profile. |
| Validate Outdated Containers | Plugin enable state profiles | One profile | Same structure. Default: enabled, optional, active for `maya`, `houdini`, `nuke`, `harmony`, `photoshop`, `aftereffects`, `fusion`, `silhouette`. |
| Validate Intent | Enabled | Off | Requires an intent for the publish. |
| Validate Intent | Profiles | Empty | Filters: **Host names**, **Task types**, **Task names**. Value: **Validate**. |

### Extract Thumbnail and Thumbnail from source

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Extract Thumbnail | Enabled | On | Creates thumbnails. |
| Extract Thumbnail | Profiles | One profile without filters | Filters: **Product base types**, **Host names**, **Task types**, **Task names**, **Product names**. See below. |
| Extract Thumbnail from source | Enabled | On | Creates a thumbnail from the file in the instance data `thumbnailSource`. |
| Extract Thumbnail from source | Target size | Resize to 300 x 170 | **Type** `Image source` or `Resize` with **Width** and **Height**. Both must be above 0, otherwise the source resolution is used. |
| Extract Thumbnail from source | Background color | `[0, 0, 0, 0.0]` | RGBA color. |
| Override Integrate Thumbnail Representations | Enabled, Integrate profiles | On, empty | Marks whether thumbnail representations are integrated, per filter profile with **Integrate Thumbnail Representation**. |

A thumbnail profile has **Integrate Thumbnail Representation** (on), **Target size** (default `Image source`), **Background color**, **Duration split** (0.5), **OIIOtool defaults** (**Type** `Use Colorspace` with colorspace `color_picking`, or `Use Display&View` with display `default` and view `sRGB`) and **ffmpeg_args** with **FFmpeg input arguments** (default `-apply_trc gamma22`) and **FFmpeg output arguments**.

### OIIO and OTIO

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Extract OIIO Transcode | Enabled, Profiles | On, empty | Converts representations with `oiiotool`. Profile filters: **Product base types**, **Host names**, **Task types**, **Task names**, **Product names**, **Representation names** (regex). Values: **Delete Original Representation** (on) and **Output Definitions**. |
| Extract OIIO Post Process | Enabled, Profiles | On, empty | Runs `oiiotool` with custom arguments. Filters add **Representation extensions**. Output definitions have **Input arguments** and **Output arguments**. |
| Extract OTIO review | Representation name | `review_png` | Name of the generated representation. |
| Extract OTIO review | Output extension, Default width, Default height | `png`, 1280, 720 | Output of the OTIO review extractor. |

An OIIO transcode output has **Name**, **Extension** (empty keeps the original), **Transcoding type** (`Use Colorspace` or `Use Display&View`), **Target Colorspace**, **Target Display** and **Target View** (empty uses the scene values), **OIIOtool arguments**, **Tags** (add `review` to create the review from the transcoded file) and **Custom Tags**. A post process output has **Name**, **Extension**, **Input arguments**, **Output arguments**, **Tags** and **Custom Tags**.

### Extract Review

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Creates review media from representations tagged `review`. |
| Profiles | Two profiles | Filters: **Product base types**, **Host names**, **Task Types**. Value: **Output Definitions**. |

Default profiles: one without filters and one for `substancepainter`. Each has two outputs.

| Output | Default |
|---|---|
| `png` (`png`) | Tags `ftrackreview`, `kitsureview`, `webreview`. Filter families `render`, `review`, `ftrack`; used only if the input has one image frame. Size 1920 x 1080. |
| `h264` (`mp4`) | Tags `burnin`, `ftrackreview`, `kitsureview`, `webreview`. Same families; used only if the input is a video or sequence. Source size (0 x 0). Input argument `-apply_trc gamma22`; output arguments `-pix_fmt yuv420p`, `-crf 18`, `-c:a aac`, `-b:a 192k`, `-g 1`, `-movflags faststart` and BT.709 color range, space, primaries and transfer flags. |

The `substancepainter` profile differs in **Handle missing frames**: `Use only rendered`, where the default profile uses `Use closest existing`.

An output definition has these fields.

| Field | Default | Description |
|---|---|---|
| Name | Per output | Unique output name, used in the representation name. |
| Output extension | Per output | Extension of the file. |
| Tags | Per output | Tags of the representation, for example `webreview`, `burnin`, `delete`, `no-handles`, `ftrackreview`, `kitsureview`. |
| Link to a burnin by name | Empty | Names of burnin definitions to apply. Empty uses all matching burnins. |
| FFmpeg arguments | See above | **Video filters**, **Audio filters**, **Input arguments**, **Output arguments**. |
| Additional output filtering | See above | **Families**, **Product names** (regex), **Custom Tags** and **Frame count** (`Always`, `Only if input has 1 image frame`, `Only if input is video or sequence of frames`). |
| Overscan crop | Empty | Crop of the input overscan. |
| Overscan color | `[0, 0, 0, 0.0]` | Color used when the input and output aspect ratios differ. |
| Output width, Output height | Per output | Both above 0 to resize, otherwise the source resolution is used. |
| Scale pixel aspect | On | Rescales inputs whose pixel aspect is not 1. |
| Background color | `[0, 0, 0, 0.0]` | Used for inputs with transparency. |
| Letter Box | Off | **Ratio** (0.0), **Fill Color**, **Line Thickness** (0) and **Line Color** (`[255, 0, 0, 1.0]` in the default outputs). |
| Handle missing frames | `Use closest existing` | `Use closest existing`, `Generate blank frame`, `Use previous version` or `Use only rendered`. |

### Extract Burnin

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Burns text into review outputs tagged `burnin`. |
| Font size | 42 | Size of the text. |
| Font color | `[255, 255, 255, 1.0]` | RGBA. |
| Background color | `[0, 0, 0, 0.5]` | RGBA of the text box. |
| X Offset, Y Offset | 0, 0 | Distance from the frame edge. |
| Padding around text | 5 | Padding of the text box. |
| Font file path | Empty | A font file per platform. The default font is used when empty. |
| Profiles | Two profiles | Filters: **Product base types**, **Host names**, **Task types**, **Task names**, **Product names**. Value: **Burnins**. |

A burnin has a **Name** (output definitions link to it), text for six positions (**Top Left**, **Top Centered**, **Top Right**, **Bottom Left**, **Bottom Centered**, **Bottom Right**) and **Additional filtering** by **Families** and **Tags**. Text supports template keys such as `{folder[name]}`, `{anatomy[version]}`, `{username}`, `{yy}-{mm}-{dd}`, `{frame_start}` and `{current_frame}`.

The default profile (no filters) has the burnin `burnin`: top left `{yy}-{mm}-{dd}`, top right `{anatomy[version]}`, bottom left `{username}`, bottom centered `{folder[name]}`, bottom right `{frame_start}-{current_frame}-{frame_end}`. A second profile for `review` products in `maya`, `houdini` and `max` has the burnin `focal_length_burnin`, which adds `{focalLength:.2f} mm` at top centered.

### Integrators and clean up

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Integrate Product Group | Product group profiles | One profile without filters, empty template | Filters: **Product base types**, **Host names**, **Task types**, **Task names**. Value: **Template**. |
| Integrate Hero Version | Enabled, Optional, Active | On, On, On | Keeps an unversioned copy of the latest publish. Needs a `hero` template in the anatomy. |
| Integrate Hero Version | Families | `model`, `rig`, `look`, `pointcache`, `animation`, `setdress`, `layout`, `mayaScene`, `simpleUnrealTexture` | Families that get a hero version. |
| Integrate Hero Version | Use Hardlinks | Off | Tries a hardlink before copying. On Windows, a hardlink in use can block deleting the other links. |
| Attach Reviewables | Enabled | On | Adds an **Attach Reviewables** attribute to review and render instances. |
| Clean up farm rendered files | Remove rendered files | Off | Removes rendered files and metadata JSON on publish. Files in a persistent staging directory are never removed. |
| Clean Up | Patterns (regex) | Empty | Extra files to delete after a successful publish. |
| Clean Up | Remove Temp renders | Off | Deletes the original render files after they were published. |
| Clean Up Farm | Enabled | Off | Deletes staging folders after a farm publish, unless marked persistent. Applies to jobs submitted from Maya. |
