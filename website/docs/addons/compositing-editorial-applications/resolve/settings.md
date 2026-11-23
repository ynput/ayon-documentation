---
title: DaVinci Resolve addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON DaVinci Resolve addon with their default values: startup behavior, project database override, color management, the Create Shot Clip creator, the Load Media loader and the Extract Product Resources profiles."
addon: resolve
addon_repo: ayon-resolve
addon_version: 0.6.5
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-resolve/tree/0.6.5/server
---

# DaVinci Resolve addon settings

<AddonInfo />

The settings of the [DaVinci Resolve addon](index.md) are in **Studio settings > DaVinci Resolve**, and can be overridden per project in **Project settings > DaVinci Resolve**. Pasting a location below into the URI bar of the web app opens that setting. How settings and their overrides work is described in [Settings](../../../ayon/how-ayon-works/settings.md).

## General

<SettingLocation uri="ayon+settings://resolve" scope="Studio, with project overrides" />

What the addon does when Resolve starts and when a workfile is opened or incremented.

<!-- screenshot: settings editor, DaVinci Resolve top-level settings -->

<Settings>
<Setting name="Check Resolve license version compatibility on start" default="Enabled">

Resolve 21 dropped external Python support in the free edition. When enabled, the launch is canceled for a free edition of Resolve 21 or newer.

</Setting>
<Setting name="Launch AYON menu on start of Resolve" default="Disabled">

Show the AYON menu window when Resolve starts.

</Setting>
<Setting name="Set FPS and Resolution from current task" default="Disabled">

Set the frame rate and resolution of the Resolve project from the current task. Works for workfiles opened through the Workfiles tool or at startup, and is limited by what Resolve allows to change.

</Setting>
<Setting name="Rename project to match AYON project" default="Enabled">

When a workfile is incremented, rename the loaded database project to match. When disabled, the loaded project is exported as the new project and the old project is imported again, so that AYON workfiles and the database projects of Resolve stay in sync.

</Setting>
</Settings>

## Project database override

<SettingLocation uri="ayon+settings://resolve/project_db" scope="Studio, with project overrides" />

Selects the Resolve project database that workfiles are imported into, instead of the one that is active in Resolve. When the requested database is not found, no workfile is opened and a warning is shown.

<!-- screenshot: settings editor, Project Database Override -->

<Settings prefix="project-db">
<Setting name="Enabled" default="Disabled">

Use the database below.

</Setting>
<Setting name="Database Type" default="Disk">

**Disk** or **PostgreSQL**.

</Setting>
<Setting name="Database Name" default="Local Database" />
<Setting name="Database IP" default="Empty">

IP address of the database server. Not used with the **Disk** type.

</Setting>
<Setting name="Use Project Folders in Database" default="Disabled">

Store the workfiles in database folders named after the AYON project.

</Setting>
</Settings>

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://resolve/imageio" scope="Studio, with project overrides" />

How Resolve follows the color management of AYON. See [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Master switch for the color management of AYON in Resolve.

</Setting>
<Setting name="Remapping colorspace names">

Maps colorspace names between Resolve and OCIO.

<Settings>
<Setting name="Rules" default="Empty list">

<Settings>
<Setting name="Application native colorspace name" />
<Setting name="OCIO colorspace name" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="File Rules">

Rules that assign a colorspace to files by their path.

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the file rules of this host instead of the global ones.

</Setting>
<Setting name="Rules" default="Empty list">

<Settings>
<Setting name="Rule name">

Unique in the list.

</Setting>
<Setting name="Regex pattern" />
<Setting name="Colorspace name" />
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://resolve/create" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Creator plugins -->

### Create Shot Clip

<SettingLocation uri="ayon+settings://resolve/create/CreateShotClip" />

Default values of the options of the **Create Publishable Clip** creator; the artist can change them when creating. How shots are created from a timeline is described in [Editorial publishing](../../../pipeline/editorial-publishing.md).

<Settings prefix="create-shot-clip">
<Setting name="Shot parent hierarchy" default="{folder}/{sequence}">

Template of the parent folders of the shot folders. The root is the project.

</Setting>
<Setting name="Rename clips" default="Enabled">

Rename the clips sequentially with the clip name template.

</Setting>
<Setting name="Clip name template" default="{track}{sequence}{shot}">

Template of the shot name.

</Setting>
<Setting name="Count sequence from" default="10">

First number of the running number, used where `#` appears in a keyword.

</Setting>
<Setting name="Stepping number" default="10">

Increment between running numbers.

</Setting>
<Setting name="{folder}" id="create-shot-clip-folder" default="shots">

Value of the `{folder}` keyword.

</Setting>
<Setting name="{episode}" id="create-shot-clip-episode" default="ep01">

Value of the `{episode}` keyword.

</Setting>
<Setting name="{sequence}" id="create-shot-clip-sequence" default="sq01">

Value of the `{sequence}` keyword.

</Setting>
<Setting name="{track}" id="create-shot-clip-track" default="{_track_}">

Value of the `{track}` keyword. `{_track_}` is the name of the timeline track.

</Setting>
<Setting name="{shot}" id="create-shot-clip-shot" default="sh###">

Value of the `{shot}` keyword. The `#` characters set the padding of the running number.

</Setting>
<Setting name="Enable Vertical Sync" default="Disabled">

Synchronize the attributes and shot names of clips stacked above the clip of the hero track.

</Setting>
<Setting name="Workfile Start Frame" default="1001">

Start frame stored on the shot folder.

</Setting>
<Setting name="Handle start (head)" default="10">

Maximum head handle, limited by the available media.

</Setting>
<Setting name="Handle end (tail)" default="10">

Maximum tail handle, limited by the available media.

</Setting>
<Setting name="Plate Product types" default="Empty list">

Product types offered for plate products.

</Setting>
<Setting name="Audio Product types" default="Empty list">

Product types offered for audio products.

</Setting>
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://resolve/load" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Loader plugins -->

### Load Media

<SettingLocation uri="ayon+settings://resolve/load/LoadMedia" />

How the **Load Media** loader imports representations into the Media Pool. The **Load as clip** loader has no settings.

<Settings prefix="load-media">
<Setting name="Clip color for last version" default="Olive">

Clip color of the latest version, as Resolve names it.

</Setting>
<Setting name="Clip color for old version" default="Orange">

Clip color of older versions.

</Setting>
<Setting name="Media Pool bin path template" default="Loader/{folder[path]}">

Bin of the Media Pool that the items are imported into.

</Setting>
<Setting name="Metadata mapping" default="Four entries">

Media Pool item metadata set on load and update. Names must be unique.

<Settings>
<Setting name="Metadata property name">

Must match the metadata name in Resolve, such as `Clip Name` or `Shot`.

</Setting>
<Setting name="Metadata value template">

Template filled with the context of the representation.

</Setting>
</Settings>

The default entries:

- `Comments`: `{version[attrib][comment]}`
- `Shot`: `{folder[path]}`
- `Take`: `{product[name]} {version[name]}`
- `Clip Name`: `{folder[path]} {product[name]} {version[name]} ({representation[name]})`

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://resolve/publish" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Publish plugins -->

### Extract Product Resources

<SettingLocation uri="ayon+settings://resolve/publish/ExtractProductResources/profiles" />

The renders made for plate and editorial package products. A profile is chosen for each instance by its **Task Types**, **Task Names** and **Product Base Type**. When no profile matches, or the matching profile has no output definition, the publish fails.

<Settings prefix="extract-product-resources">
<Setting name="Profiles" default="Two profiles">

Profile names must be unique. The defaults are:

- **Plate Profile #1** for `plate`: one output with the built-in preset format **EXR**, preset **EXR RGB half (DWAA)**, codec `RGB half (DWAA)`, **With Handles** enabled, representation name `exr`, no tags.
- **Editorial PKG Profile #1** for `editorial_pkg`: one output with the built-in preset format **QuickTime**, preset **QuickTime H264**, codec `H.264`, **Export OTIO** and **Use rootless OTIO paths** enabled, representation name `mov`, tag **Skip Extract Review**.

<Settings>
<Setting name="Profile Name" default="Empty">

When empty, a name based on the product base type, such as `Plate Profile #2`, is assigned on save. No other logic uses it.

</Setting>
<Setting name="Task Types" default="Empty list">

Empty matches all task types.

</Setting>
<Setting name="Task Names" default="Empty list">

Empty matches all task names.

</Setting>
<Setting name="Product Base Type" default="Editorial Package">

**Editorial Package** (`editorial_pkg`) or **Plate Clip** (`plate`). It also selects which list of output definitions is shown and used.

</Setting>
<Setting name="Integrate Clip Source" default="Disabled">

Also integrate the media pool item of the timeline item as an additional representation.

</Setting>
<Setting name="Output Definitions" default="Empty list">

The renders to produce, one for each representation. Representation names must be unique within the list.

<Settings>
<Setting name="Output Defs (editorial package) / Plate Attributes (plate)" id="extract-product-resources-render">

The render settings.

<Settings>
<Setting name="Export OTIO" default="Enabled">

Editorial package only. Export an OTIO file together with the rendered file.

</Setting>
<Setting name="Use rootless OTIO paths" default="Enabled">

Editorial package only. Make the paths in the OTIO file rootless.

</Setting>
<Setting name="Preset Type" default="Built-in">

**Custom** or **Built-in**.

</Setting>
<Setting name="Builtin Preset">

A render preset that ships with the addon. The `{ayon_render_presets}` token in the preset paths is the folder of these presets.

<Settings>
<Setting name="Format" default="QuickTime (editorial package), EXR (plate)">

**QuickTime** or **EXR**.

</Setting>
<Setting name="Preset" default="QuickTime H264 (editorial package), EXR RGB half (DWAA) (plate)">

For an editorial package: **QuickTime H264**, **QuickTime H265**, **QuickTime Prores422Hq**, **QuickTime ProresLT** or **QuickTime ProresXQ**. For a plate: **EXR RGB half (DWAA)**, **EXR RGB float (ZIP)** or **QuickTime H264**.

</Setting>
<Setting name="Codec" default="H.264 (editorial package), RGB half (DWAA) (plate)" />
</Settings>

</Setting>
<Setting name="Custom Preset">

A render preset file of the studio.

<Settings>
<Setting name="Format" default="QuickTime">

**AVI**, **Cineon**, **DCP**, **DPX**, **EXR**, **GIF**, **IMF**, **JPEG**, **JPEG 2000**, **MJ2**, **MKV**, **MP4**, **MXF OP-Atom**, **MXF OP1A**, **PNG**, **QuickTime**, **TIFF** or **WebP**.

</Setting>
<Setting name="Preset Path" default="Empty">

Path of the preset file, for example on shared storage with the `{root[work]}` token.

</Setting>
<Setting name="Codec" default="H.264" />
</Settings>

</Setting>
<Setting name="With Handles" default="Disabled">

Plate only. Render the clip with its handles.

</Setting>
</Settings>

</Setting>
<Setting name="Shared (editorial package) / Shared Attributes (plate)" id="extract-product-resources-representation">

The representation.

<Settings>
<Setting name="Name" default="Empty">

Name of the representation.

</Setting>
<Setting name="Tags" default="Empty list">

**Extract review processing**, **Delete - as intermediate**, **Skip Extract Review** or **Upload as reviewable**. The reviewable workflow is only partly supported.

</Setting>
<Setting name="Custom Tags" default="Empty list">

Additional tags, for filtering in the Extract Review plugin.

</Setting>
<Setting name="Colorspace" default="Empty">

Colorspace added to the colorspace data of the representation.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [DaVinci Resolve addon](index.md)
- [Editorial publishing](../../../pipeline/editorial-publishing.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
