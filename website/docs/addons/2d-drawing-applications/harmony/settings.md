---
title: Harmony addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Harmony addon with their default values: color management, cache conflict resolution, loader, creator and publish plugins."
addon: harmony
addon_repo: ayon-harmony
addon_version: 0.5.4
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-harmony/tree/0.5.4/server/settings
---

# Harmony addon settings

<AddonInfo />

The settings of the [Harmony addon](index.md) are in **Studio settings > Harmony**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The names of render layer and render pass products also depend on the product name profiles of the core addon (`ayon+settings://core/tools/creator/product_name_profiles`); see [Auto-Detect Create Render Layers and Passes](#auto-detect-create-render-layers-and-passes).

## OCIO config

<SettingLocation uri="ayon+settings://harmony/imageio" scope="Studio, with project overrides" />

Whether AYON's color management applies in Harmony, and file rules that assign a colorspace to files by name. The OCIO config itself is set in the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, OCIO config -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

Master switch for AYON's global color management in this host.

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Turns on the rules below for this host.

</Setting>
<Setting name="Rules" default="Empty list">

Rules that assign a colorspace to files.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Cache conflict resolution

<SettingLocation uri="ayon+settings://harmony/cache_default" scope="Studio, with project overrides" />

What happens when a local copy of the scene is newer than or as new as the stored file. By default the artist is asked in a dialog.

<!-- screenshot: settings editor, Cache conflict resolution -->

<Settings>
<Setting name="Force cache conflict source" default="Disabled">

Does not show the dialog; always uses the source chosen below.

</Setting>
<Setting name="Conflict source" default="From Server">

**From Server** unpacks the stored file again, **Use Local** keeps the local copy. Also the preselected answer of the dialog.

</Setting>
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://harmony/load" scope="Studio, with project overrides" />

Naming and placement of loaded content, and switches for each loader. Each loader has an **Enabled** switch, on by default.

<!-- screenshot: settings editor, Loader plugins -->

<Settings>
<Setting name="Override container name" default="Empty">

Optional name template for the containers of backdrop loaders (templates and Photoshop layers). Keys come from the loader context, for example `{project[name]}`, `{folder[name]}` or `{product[name]}`, as in `{folder[name]}-{product[name]}`.

</Setting>
<Setting name="Parent Backdrop Matching" default="Disabled">

Places loaded content in an existing backdrop that matches its folder hierarchy (case-insensitive). If none matches, a new parent backdrop named after the most direct folder is created.

</Setting>
<Setting name="Image or Sequence Loader" default="Enabled">

<Settings>
<Setting name="Expose only current frame" default="Disabled">

Only the current frame is exposed, and the other frames are set empty.

</Setting>
</Settings>

</Setting>
<Setting name="Template Loader" default="Enabled" />
<Setting name="Load Photoshop Layers" default="Enabled" />
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://harmony/create" scope="Studio, with project overrides" />

Most creators share **Enabled**, **Active by default** (the instance is active when created) and **Default Variants**. Farm or local rendering is chosen per instance with the **Render target** attribute of the Render creator.

<!-- screenshot: settings editor, Creator plugins -->

<Settings>
<Setting name="Workfile" default="Enabled, active by default, variant Main" />
<Setting name="Review" default="Disabled, active by default, variant Main" />
</Settings>

### Render and Render on Farm

<SettingLocation uri="ayon+settings://harmony/create/CreateRender" />

**Render** (`CreateRender`) and **Render on Farm** (`CreateFarmRender`) have the same fields and defaults.

<Settings prefix="render">
<Setting name="Enabled" default="Enabled" />
<Setting name="Active by default" default="Enabled" />
<Setting name="Default Variants" default="Main" />
<Setting name="Auto connect to Composite node" default="Disabled">

Connects a newly created `Write` node to the composite node found by the pattern below.

</Setting>
<Setting name="Regex pattern for Composite node name" default="Composite">

Pattern used to find that composite node. The first match is used.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types the plugin can create, each with a **Product type** and a **Label**.

</Setting>
</Settings>

### RenderLayer

<SettingLocation uri="ayon+settings://harmony/create/CreateRenderLayer" />

<Settings prefix="renderlayer">
<Setting name="Enabled" default="Enabled" />
<Setting name="Active by default" default="Enabled" />
<Setting name="Review by default" default="Disabled">

New render layers are marked for review.

</Setting>
<Setting name="Default beauty pass" default="beauty">

Name of the pass for all visible layers of the group.

</Setting>
<Setting name="Default variant" default="Main" />
<Setting name="Default variants" default="Empty list" />
<Setting name="Product type items" default="Empty list">

Optional product types, as for Render.

</Setting>
</Settings>

### RenderPass

<SettingLocation uri="ayon+settings://harmony/create/CreateRenderPass" />

<Settings prefix="renderpass">
<Setting name="Enabled" default="Enabled" />
<Setting name="Active by default" default="Enabled" />
<Setting name="Review by default" default="Disabled">

New render passes are marked for review.

</Setting>
<Setting name="Default variant" default="Empty" />
<Setting name="Default variants" default="Empty list" />
<Setting name="Rename Read Nodes" default="Enabled">

Uses the product name as the name of the `Read` node and keeps the original layer name in the `Write` node.

</Setting>
<Setting name="RenderPass name template" default="L{layer_index}_{variant}">

Template of the pass name.

</Setting>
<Setting name="Layer index Offset" default="10">

Step between layer indexes. At least 1.

</Setting>
<Setting name="Layer index Padding" default="3">

Number of digits of the layer index.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types, as for Render.

</Setting>
</Settings>

### Auto-Detect Create Render Layers and Passes

<SettingLocation uri="ayon+settings://harmony/create/AutoDetectRendeLayersPasses" />

Creates render layers and passes from the scene: the color group name becomes the variant of a render layer and the Harmony layer name the variant of a render pass. Groups are renamed in the order they are used; with the defaults they become `G010`, `G020` and so on. When it is enabled, **RenderLayer** and **RenderPass** must be enabled too. For the full naming, the product name profiles of the core addon should use `{product[type]}{Task[name]}_{Renderlayer}_{Renderpass}` for host `harmony` and the product types `renderLayer` and `renderPass`.

<Settings prefix="auto-detect">
<Setting name="Enabled" default="Enabled" />
<Setting name="Render layer variant template" default="G{group_index}">

Calculates the variant of a render layer.

</Setting>
<Setting name="Group index Offset" default="10">

Step between group indexes. At least 1.

</Setting>
<Setting name="Group index Padding" default="3">

Number of digits of the group index.

</Setting>
<Setting name="Layer name template">

<Settings>
<Setting name="Enabled" default="Disabled">

Renames the color groups before creating render layers.

</Setting>
<Setting name="Layer name template" default="G{group_index}_L{layer_index}_{variant}">

Template used to parse the variant out of already renamed layers. Keys: `{group_index}`, `{layer_index}` and `{variant}`.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://harmony/publish" scope="Studio, with project overrides" />

Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Collect Palettes">

<Settings>
<Setting name="Allowed tasks" default=".*">

Regex patterns for the task names where palettes are collected. `.*` means all tasks.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Audio" default="Enabled, optional, active">

Checks that the scene contains an audio track.

</Setting>
<Setting name="Validate Scene Settings" default="Enabled, optional, active">

Checks that the frame start, frame end and resolution match the shot. The fields below are lists of regex patterns that limit the checks.

<Settings>
<Setting name="Skip Frame check for Folder Paths with name containing" default="Empty list">

Folders whose name matches skip the frame range check.

</Setting>
<Setting name="Skip Resolution Check for Tasks" default="Empty list">

Tasks whose name matches skip the resolution check.

</Setting>
<Setting name="Skip Timeline Check for Tasks" default="Empty list">

Tasks whose name matches skip the frame range and handles check.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Instance" default="Enabled, not optional, active">

Checks that the folder of the instance is the current folder.

</Setting>
<Setting name="Validate Palette Location" default="Disabled, optional, active">

Checks that the palettes are stored inside the workfile.

</Setting>
<Setting name="Extract Convert To EXR" default="Disabled">

Converts the PNG renders to EXR. It does not work on macOS, because it uses the OpenImageIO tool. It has only the **Enabled** switch, and these fields:

<Settings>
<Setting name="Replace original PNG files" default="Enabled">

Removes the PNG files after the conversion.

</Setting>
<Setting name="Auto Trim" default="Enabled">

Trims during conversion.

</Setting>
<Setting name="EXR Compression" default="ZIP">

**ZIP**, **ZIPS**, **DWAA**, **DWAB**, **PIZ**, **RLE**, **PXR24**, **B44**, **B44A** or **None**.

</Setting>
<Setting name="Create multichannel EXR" default="Disabled">

Merges render passes into one EXR file per render layer.

</Setting>
<Setting name="Keep render passes" default="Disabled">

Keeps the passes when multichannel EXR is on.

</Setting>
<Setting name="User overrides" default="Empty list">

Which of these the artist can change in the Publisher: **Create EXR**, **Create multichannel EXR** and **Keep render passes**.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Harmony addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
