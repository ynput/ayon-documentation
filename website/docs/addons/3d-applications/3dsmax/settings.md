---
title: 3ds Max addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON 3ds Max addon with their default values: unit scale, auto key, workspace, color management, templated workfile build, render, review and point cloud settings, creator and publish plugins."
addon: max
addon_repo: ayon-3dsmax
addon_version: 0.5.4
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-3dsmax/tree/0.5.4/server/settings
---

# 3ds Max addon settings

<AddonInfo />

The settings of the [3ds Max addon](index.md) are in **Studio settings > Max**, and can be overridden per project in **Project settings > Max**. The editor marks overridden values; see [Settings](../../../ayon/how-ayon-works/settings.md). Pasting a location below into the URI bar of the web app opens that setting. The defaults are the values the addon ships with.

Some behavior that people look for here is set in other addons: the OCIO config and the global color management in the [core addon settings](../../essentials/core/settings.md), and the renderer, frame range and resolution that come from the folder and task attributes.

## Set Unit Scale

<SettingLocation uri="ayon+settings://max/unit_scale_settings" scope="Studio, with project overrides" />

The metric unit of the scene. See [Scene setup](index.md#scene-setup).

<!-- screenshot: settings editor, Set Unit Scale -->

<Settings prefix="unit-scale">
<Setting name="Enabled" default="Disabled">

When a workfile is opened, check the scene unit against **Scene Unit Scale** and show a **Fix** dialog when they differ. When disabled, the display unit is set to Generic.

</Setting>
<Setting name="Scene Unit Scale" default="cm">

**mm**, **cm**, **m** or **km**.

</Setting>
</Settings>

## Auto Key Default Value

<SettingLocation uri="ayon+settings://max/auto_key_default" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Auto Key Default Value -->

<Settings>
<Setting name="Auto Key Default Frame" default="0">

The frame at which a key is created when Auto Key is used. It is set with the frame range of the context.

</Setting>
</Settings>

## Max Workspace

<SettingLocation uri="ayon+settings://max/mxp_workspace" scope="Studio, with project overrides" />

A `workspace.mxp` project file written to the work directory at launch, so that 3ds Max saves renders, previews and other files inside the work directory.

<!-- screenshot: settings editor, Max Workspace -->

<Settings>
<Setting name="Enable Project Creation" default="Disabled">

Create `workspace.mxp` in the work directory when 3ds Max starts.

</Setting>
<Setting name="Max mxp Workspace" default="A standard [Directories] list">

The content written to `workspace.mxp`. The default has a `[Directories]` section with relative paths such as `RenderOutput= ./renders/3dsmax` and `Previews=./previews`, and an `[XReferenceDirs]` section.

</Setting>
</Settings>

## Color Management (ImageIO)

<SettingLocation uri="ayon+settings://max/imageio" scope="Studio, with project overrides" />

Whether 3ds Max follows the global color management of the core addon, with file rules. How these settings are applied at launch is described in [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="color-management">
<Setting name="Enable Color Management" default="Enabled">

3ds Max follows the global color management, using the OCIO config of the core addon.

</Setting>
<Setting name="File Rules">

Rules that assign a colorspace to files by their path. See [File rules](../../../pipeline/color-management-on-launch.md#file-rules).

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Turns on the rules below for 3ds Max.

</Setting>
<Setting name="Rules" default="Empty list">

Rule names must be unique.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension">

Extension of the files the rule applies to.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Templated Workfile Build

<SettingLocation uri="ayon+settings://max/templated_workfile_build" scope="Studio, with project overrides" />

Profiles that pick a template workfile for the context. How templates and placeholders work is described in [Templated workfile builder](../../../pipeline/template-builder.md).

<!-- screenshot: settings editor, Templated Workfile Build -->

<Settings prefix="templated-workfile-build">
<Setting name="Profiles" default="Empty list">

The first profile that matches the context is used. Empty filters match everything.

<Settings>
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Folder Types" default="Empty list" />
<Setting name="Folder paths" default="Empty list" />
<Setting name="Path to template">

The template workfile. It can use anatomy keys; see [Template path](../../../pipeline/template-builder.md#template-path).

</Setting>
<Setting name="Keep placeholders" default="Disabled">

Keep the placeholders in the scene after the build.

</Setting>
<Setting name="Apply to New Scene" default="Disabled">

Apply the template to every new empty scene.

</Setting>
<Setting name="Apply on 3dsmax launch" default="Disabled">

Apply the template when 3ds Max starts and no workfile exists yet.

</Setting>
<Setting name="Save first workfile version" default="Enabled">

Save the first workfile version after the build.

</Setting>
</Settings>

</Setting>
</Settings>

## Render Settings

<SettingLocation uri="ayon+settings://max/RenderSettings" scope="Studio, with project overrides" />

The render output that the **Render** creator sets up, and that the render validators check.

<!-- screenshot: settings editor, Render Settings -->

<Settings prefix="render-settings">
<Setting name="Default render image folder" default="`{work}/renders/3dsmax/{productName}`">

Folder template for rendered images.

</Setting>
<Setting name="AOV Separator character" default="_ (underscore)">

Separator between the file name and the AOV name: **- (dash)**, **_ (underscore)** or **. (dot)**.

</Setting>
<Setting name="Output Image Format" default="exr">

**bmp**, **exr**, **tif**, **tiff**, **jpg**, **png**, **tga** or **dds**.

</Setting>
<Setting name="V-Ray Render Settings">

<Settings>
<Setting name="Separate Render Channels" default="Enabled">

Write V-Ray render channels as separate files.

</Setting>
</Settings>

</Setting>
<Setting name="Redshift Render Settings">

<Settings>
<Setting name="Separate AOV Files" default="Enabled">

Write Redshift AOVs as separate files.

</Setting>
</Settings>

</Setting>
</Settings>

## Create Review

<SettingLocation uri="ayon+settings://max/CreateReview" scope="Studio, with project overrides" />

Defaults of the attributes of the **Review** creator, which makes a preview animation of the viewport. Artists can change them per instance in the Publisher.

<!-- screenshot: settings editor, Create Review -->

<Settings prefix="create-review">
<Setting name="Review Width" default="1920" />
<Setting name="Review Height" default="1080" />
<Setting name="Percent of Output" default="100.0">

Scale of the output, in percent of the width and height.

</Setting>
<Setting name="Keep Image Sequences" default="Disabled">

Keep the image sequence besides the video.

</Setting>
<Setting name="Image Format Options" default="png">

Format of the frames: **exr**, **jpg**, **png** or **tga**.

</Setting>
<Setting name="Preference" default="Realistic">

Visual style of the viewport: **Realistic**, **Shaded**, **Facets**, **ConsistentColors**, **Wireframe**, **BoundingBox**, **Ink**, **ColorInk**, **Acrylic**, **Tech**, **Graphite**, **ColorPencil**, **Pastel**, **Clay** or **ModelAssist**.

</Setting>
<Setting name="Preview Preset" default="Quality">

Viewport preset: **Quality**, **Standard**, **Performance**, **DXMode** or **Customize**.

</Setting>
<Setting name="Anti-aliasing Quality" default="None">

**None**, **2X**, **4X** or **8X**.

</Setting>
<Setting name="Viewport Texture" default="Enabled">

Show textures in the viewport.

</Setting>
</Settings>

## Point Cloud

<SettingLocation uri="ayon+settings://max/PointCloud" scope="Studio, with project overrides" />

The tyFlow channels that a point cloud (`.prt`) export can write. The point cloud validator checks the export against this list.

<!-- screenshot: settings editor, Point Cloud -->

<Settings prefix="point-cloud">
<Setting name="Channel Attribute" default="11 channels">

The default list: Age (`age`), Radius (`radius`), Position (`position`), Rotation (`rotation`), Scale (`scale`), Velocity (`velocity`), Color (`color`), TextureCoordinate (`texcoord`), MaterialID (`matid`), custFloats (`custFloats`) and custVecs (`custVecs`).

<Settings>
<Setting name="Name">

Name of the channel.

</Setting>
<Setting name="Attribute">

The tyFlow attribute exported for it.

</Setting>
</Settings>

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://max/create" scope="Studio, with project overrides" />

Every creator has a **Product type items** list: optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. The list is empty by default, so each creator makes its own product type.

<!-- screenshot: settings editor, Create Plugins -->

<Settings prefix="create">
<Setting name="Camera" default="No product type items" />
<Setting name="Max Scene" default="No product type items" />
<Setting name="Model" default="No product type items" />
<Setting name="Point Cache" default="No product type items" />
<Setting name="Point Cloud" default="No product type items" />
<Setting name="Redshift Proxy" default="No product type items" />
<Setting name="Render" default="No product type items" />
<Setting name="Render Preset" default="No product type items" />
<Setting name="TyFlow" default="No product type items" />
<Setting name="Material Library" default="No product type items">

<Settings>
<Setting name="Remove material library when remove instance" default="Enabled">

Remove the material library from the scene when its instance is removed.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://max/publish" scope="Studio, with project overrides" />

Most plugins share three switches: **Enabled** (the plugin runs), **Optional** (the artist can turn it off in the Publisher) and **Active** (it is turned on by default in the Publisher). The defaults below list them in that order. What each plugin does is described in [Publishing](index.md#publishing).

<!-- screenshot: settings editor, Publish Plugins -->

### Collectors

<Settings prefix="publish">
<Setting name="Collect Render">

<Settings>
<Setting name="Sync render version with workfile" default="Disabled">

Use the workfile version as the version of the render.

</Setting>
<Setting name="Sync current workfile name to instance data" default="Enabled">

Include the workfile name in the render folder. When disabled, the render settings validator does not check that the folder contains the workfile name.

</Setting>
</Settings>

</Setting>
</Settings>

### Validators

<Settings prefix="publish">
<Setting name="Validate Instance In Context" default="Enabled, optional, active" />
<Setting name="Validate Frame Range" default="Enabled, optional, active" />
<Setting name="Validate Frame Range (TyCache)" default="Disabled, optional, active" />
<Setting name="Validate Attributes" default="Disabled">

Checks that 3ds Max properties have the given values, with a repair action. It has no **Optional** or **Active** switch; the enable switch is labelled **ValidateAttributes**.

<Settings>
<Setting name="Attributes" default="`{}`">

A JSON object of objects and the properties they must have, for example `{"renderers.current": {"separateAovFiles": true}}`. An empty object skips the check.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Camera Attributes" default="Enabled, optional, not active">

Checks camera attributes. A value of 0 skips the check of that attribute.

<Settings>
<Setting name="Focal Length" default="45.0" />
<Setting name="Near Range" default="0.0" />
<Setting name="Far Range" default="1000.0" />
<Setting name="Near Clip" default="1.0" />
<Setting name="Far Clip" default="1000.0" />
</Settings>

</Setting>
<Setting name="Validate No Animation" default="Enabled, optional, not active" />
<Setting name="Validate Loaded Plugin" default="Disabled, optional">

Checks that the 3ds Max plugins that a product needs are loaded, with a repair action that loads them. It has no **Active** switch.

<Settings>
<Setting name="Family Plugins Mapping" default="Empty list">

<Settings>
<Setting name="Families" default="Empty list">

Product types the mapping applies to; `*` matches all.

</Setting>
<Setting name="Plugins" default="Empty list">

Plugin file names that must be loaded. Environment variables can be used, such as `{3DSMAX_VERSION}`.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Validate Mesh Has UVs" default="Enabled, optional, not active" />
<Setting name="Validate Model Name" default="Enabled, optional, not active">

<Settings>
<Setting name="Validation regex" default="`(.*)_(?P<subset>.*)_(GEO)`">

Regular expression the model names must match. Named groups can be used, such as `(?P<asset>.*)` for the folder name.

</Setting>
</Settings>

</Setting>
<Setting name="Validate No Active Viewport" default="Enabled, not optional, active" />
<Setting name="Validate Render Passes" default="Enabled, not optional, active">

There is no plugin with this name in the addon, so this setting has no effect.

</Setting>
</Settings>

### Extractors

<Settings prefix="publish">
<Setting name="Extract OBJ" default="Enabled, optional, not active" />
<Setting name="Extract FBX" default="Enabled, optional, not active">

Applies to the model FBX extractor only. The camera FBX extractor has no settings.

</Setting>
<Setting name="Extract Geometry (USD)" default="Enabled, optional, not active" />
<Setting name="Extract Geometry (Alembic)" default="Enabled, optional, active">

Stored under the key `ExtractModel`, while the plugin is `ExtractModelAlembic`, so these values are not applied: the plugin always runs, optional and active. The Alembic extractors of cameras and point caches have no settings.

</Setting>
<Setting name="Extract Max Scene (Raw)" default="Enabled, optional, active" />
</Settings>

## Related

- [3ds Max addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Templated workfile builder](../../../pipeline/template-builder.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
