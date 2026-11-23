---
title: TVPaint addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON TVPaint addon with their default values: color management, creators, publish plugins, loaders and the workfile builder."
addon: tvpaint
addon_repo: ayon-tvpaint
addon_version: 0.4.3
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-tvpaint/tree/0.4.3/server
---

# TVPaint addon settings

<AddonInfo />

The settings of the [TVPaint addon](index.md) are in **Studio settings > TVPaint**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. Product names are not set in this addon: the templates are profiles in the core addon settings, `ayon+settings://core/tools/creator/product_name_profiles`. The review and workfile products are created automatically, so a template for them does not need the variant key.

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://tvpaint/imageio" scope="Studio, with project overrides" />

Whether AYON's color management applies in TVPaint, and file rules that assign a colorspace to files by name. The OCIO config itself is set in the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

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

## General

<SettingLocation uri="ayon+settings://tvpaint/stop_timer_on_application_exit" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Stop timer on application exit -->

<Settings>
<Setting name="Stop timer on application exit" default="Disabled">

Stops the running timer of the AYON server when TVPaint closes.

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://tvpaint/create" scope="Studio, with project overrides" />

The creators of workfile, review, render scene, render layer and render pass instances. Most of them share **Enabled**, **Active by default** (new instances are selected for publishing), **Default variant** and **Default variants** (the variants offered besides the default one).

<!-- screenshot: settings editor, Create plugins -->

<Settings>
<Setting name="Force to use current context" default="Enabled">

Product names of new instances are built from the current folder and task of the session.

</Setting>
</Settings>

### Create Workfile

<SettingLocation uri="ayon+settings://tvpaint/create/create_workfile" />

<Settings prefix="create-workfile">
<Setting name="Enabled" default="Enabled" />
<Setting name="Default variant" default="Main" />
<Setting name="Default variants" default="Empty list" />
</Settings>

### Create Review

<SettingLocation uri="ayon+settings://tvpaint/create/create_review" />

<Settings prefix="create-review">
<Setting name="Enabled" default="Enabled" />
<Setting name="Active by default" default="Enabled" />
<Setting name="Default variant" default="Main" />
<Setting name="Default variants" default="Empty list" />
</Settings>

### Create Render Scene

<SettingLocation uri="ayon+settings://tvpaint/create/create_render_scene" />

<Settings prefix="create-render-scene">
<Setting name="Enabled" default="Enabled" />
<Setting name="Active by default" default="Disabled" />
<Setting name="Review by default" default="Enabled">

The instance is marked for review.

</Setting>
<Setting name="Default beauty pass" default="beauty">

Name of the beauty pass.

</Setting>
<Setting name="Default variant" default="Main" />
<Setting name="Default variants" default="Empty list" />
<Setting name="Product type" default="Empty">

Customizes the product type for UI purposes. It may also affect the final product name.

</Setting>
</Settings>

### Create Render Layer

<SettingLocation uri="ayon+settings://tvpaint/create/create_render_layer" />

It has no **Enabled** switch.

<Settings prefix="create-render-layer">
<Setting name="Review by default" default="Disabled">

New render layers are marked for review.

</Setting>
<Setting name="Default beauty pass" default="beauty">

Name of the beauty pass.

</Setting>
<Setting name="Default variant" default="Main" />
<Setting name="Default variants" default="Empty list" />
<Setting name="Product type items" default="Empty list">

Optional product types the creator can create, each with a **Product type** and a **Label**.

</Setting>
</Settings>

### Create Render Pass

<SettingLocation uri="ayon+settings://tvpaint/create/create_render_pass" />

It has no **Enabled** switch.

<Settings prefix="create-render-pass">
<Setting name="Review by default" default="Disabled">

New render passes are marked for review.

</Setting>
<Setting name="Default variant" default="Main" />
<Setting name="Default variants" default="Empty list" />
<Setting name="Render pass name template" default="{variant}">

Template of the pass name. Keys: `{layer_index}` and `{variant}`.

</Setting>
<Setting name="Layer name template">

Renames the TVPaint layer with a template when a pass is created.

<Settings>
<Setting name="Enabled" default="Disabled" />
<Setting name="Layer name template" default="G{group_index}_L{layer_index}_{variant}">

Keys: `{group_index}`, `{layer_index}` and `{variant}`.

</Setting>
</Settings>

</Setting>
<Setting name="Group index Offset" default="10">

Step between group indexes. At least 1.

</Setting>
<Setting name="Group index Padding" default="3">

Number of digits of the group index.

</Setting>
<Setting name="Layer index Offset" default="10">

Step between layer indexes. At least 1.

</Setting>
<Setting name="Layer index Padding" default="3">

Number of digits of the layer index.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types, as for Create Render Layer.

</Setting>
</Settings>

### Auto-Detect Create Render

<SettingLocation uri="ayon+settings://tvpaint/create/auto_detect_render" />

Creates render layers and passes from the scene: the color group name is the variant of a render layer and the TVPaint layer name is the variant of a render pass.

<Settings prefix="auto-detect-create-render">
<Setting name="Enabled" default="Disabled" />
<Setting name="Allow group rename" default="Enabled">

Allows renaming the color groups by their order in the scene.

</Setting>
<Setting name="Group name template" default="G{group_index}">

Template for the renamed groups. With the default offset and padding it produces `G010`, `G020` and so on.

</Setting>
<Setting name="Group index Offset" default="10">

Step between group indexes. At least 1.

</Setting>
<Setting name="Group index Padding" default="3">

Number of digits of the group index.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://tvpaint/publish" scope="Studio, with project overrides" />

Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Collect Render Instances">

<Settings>
<Setting name="Ignore Render Pass opacity" default="Enabled">

Render passes are rendered without the opacity of their layers.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Sequence">

<Settings>
<Setting name="Review BG color" default="255, 255, 255, 1.0 (white)">

Background color for the review of the whole scene and for thumbnails.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Project Settings" default="Enabled, optional, active">

Checks the scene settings against the project (the plugin is labelled Validate Scene Settings in the Publisher).

</Setting>
<Setting name="Validate MarkIn/Out" default="Enabled, optional, active" />
<Setting name="Validate Scene Start Frame" default="Disabled, optional, active" />
<Setting name="Validate Folder Name" default="Enabled, optional, active">

Labelled Validate Folder Paths in the Publisher.

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

## Load plugins

<SettingLocation uri="ayon+settings://tvpaint/load" scope="Studio, with project overrides" />

The defaults of the options **Stretch to project size**, **Stretch to timeline length** and **Preload loaded image/s** that the artist can change when loading. **Load Image** and **Import Image** have the same fields, under **Defaults**.

<!-- screenshot: settings editor, Load plugins -->

<Settings>
<Setting name="Load Image">

<Settings>
<Setting name="Stretch" default="Enabled" />
<Setting name="TimeStretch" default="Enabled" />
<Setting name="Preload" default="Enabled" />
</Settings>

</Setting>
<Setting name="Import Image">

<Settings>
<Setting name="Stretch" default="Enabled" />
<Setting name="TimeStretch" default="Enabled" />
<Setting name="Preload" default="Enabled" />
</Settings>

</Setting>
</Settings>

## Workfile builder

<SettingLocation uri="ayon+settings://tvpaint/workfile_builder" scope="Studio, with project overrides" />

A workfile template chosen by task type, used to build new workfiles.

<!-- screenshot: settings editor, Workfile Builder -->

<Settings prefix="workfile-builder">
<Setting name="Create first workfile" default="Disabled">

Creates a workfile when the task has none.

</Setting>
<Setting name="Custom Templates" default="Empty list">

<Settings>
<Setting name="Task types">

Task types that use the template.

</Setting>
<Setting name="Path">

Path of the template, with one entry per platform: **Windows**, **Linux** and **MacOS**.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [TVPaint addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
