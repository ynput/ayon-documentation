---
title: Blender addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Blender addon with their default values: unit scale, startup, handles, hooks, color management, render settings, creator, loader and publish plugins, and the templated workfile build."
addon: blender
addon_repo: ayon-blender
addon_version: 1.1.11
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-blender/tree/1.1.11/server/settings
---

# Blender addon settings

<AddonInfo />

The settings of the [Blender addon](index.md) are in **Studio settings > Blender**, and can be overridden per project in **Project settings > Blender**. The editor marks overridden values; see [Settings](../../../ayon/how-ayon-works/settings.md). Pasting a location below into the URI bar of the web app opens that setting. The defaults are the values the addon ships with.

Some behavior that people look for here is set elsewhere: the OCIO config and the global color management in the [core addon settings](../../essentials/core/settings.md), the frame range, handles, frame rate and resolution in the folder and task attributes, and the farm submission in the Deadline addon.

## Unit scale

<SettingLocation uri="ayon+settings://blender/unit_scale_settings" scope="Studio, with project overrides" />

The preferred world scale of the scene, mostly useful when importing from other applications. The settings editor shows this group as **Set Unit Scale**. See [Scene setup](index.md#scene-setup).

<!-- screenshot: settings editor, Set Unit Scale -->

<Settings prefix="unit-scale">
<Setting name="Enabled" default="Enabled">

Apply the unit scale when the scene is set up from the context.

</Setting>
<Setting name="Apply on Opening Existing Files" default="Disabled">

Also apply it when an existing file is opened.

</Setting>
<Setting name="Base File Unit Scale" default="1.0">

The unit scale, typically in tenths, such as 0.1, 0.01 or 100.

</Setting>
</Settings>

## Startup

<SettingLocation uri="ayon+settings://blender/set_resolution_startup" scope="Studio, with project overrides" />

<SettingLocation uri="ayon+settings://blender/set_frames_startup" scope="Studio, with project overrides" />

Two switches at the top level of the settings that apply the values of the context when Blender starts.

<!-- screenshot: settings editor, Set Resolution on Startup and Set Start/End Frames and FPS on Startup -->

<Settings>
<Setting name="Set Resolution on Startup" default="Enabled">

Set the resolution of the scene from the context.

</Setting>
<Setting name="Set Start/End Frames and FPS on Startup" default="Enabled">

Set the frame range and frame rate of the scene from the context.

</Setting>
</Settings>

## Handles

<SettingLocation uri="ayon+settings://blender/include_handles" scope="Studio, with project overrides" />

Whether the frame handles extend the default playback and render range. Handles can be left out here while they stay set in the folder and task attributes. The settings editor shows this group as **Include/Exclude Handles in default playback & render range**.

<!-- screenshot: settings editor, Include/Exclude Handles in default playback & render range -->

<Settings prefix="handles">
<Setting name="Include handles by default" default="Disabled">

Extend the frame range by the handles when no profile matches.

</Setting>
<Setting name="Include/exclude handles by profiles" default="Empty list">

Profiles that override the default for some tasks. Empty filters match everything.

<Settings>
<Setting name="Task Types" default="Empty list" />
<Setting name="Task Names" default="Empty list" />
<Setting name="Include handles" default="Enabled">

Whether the matching tasks include the handles.

</Setting>
</Settings>

</Setting>
</Settings>

## Hooks

<SettingLocation uri="ayon+settings://blender/hooks" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Hooks -->

<Settings>
<Setting name="Execute PySide hook" default="Enabled">

When no Qt binding is found at launch, install PySide into the Python of Blender. This may need administrator rights. See [Launch hooks](index.md#launch-hooks).

</Setting>
</Settings>

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://blender/imageio" scope="Studio, with project overrides" />

Whether Blender follows the global color management of the core addon, with file rules. How these settings are applied at launch is described in [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="color-management">
<Setting name="Enable Color Management" default="Enabled">

Blender follows the global color management, using the OCIO config of the core addon.

</Setting>
<Setting name="File Rules">

Rules that assign a colorspace to files by their path. See [File rules](../../../pipeline/color-management-on-launch.md#file-rules).

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Turns on the rules below for Blender.

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

## Render settings

<SettingLocation uri="ayon+settings://blender/RenderSettings" scope="Studio, with project overrides" />

The render output that **Create Render Setup** and the **Render** creator build. See [Render setup](index.md#render-setup).

<!-- screenshot: settings editor, Render Settings -->

<Settings prefix="render-settings">
<Setting name="Default Render Image Folder" default="renders/blender">

Folder for rendered images, relative to the folder of the workfile, with a subfolder named after the workfile. It is a staging folder, not the location of the published images.

</Setting>
<Setting name="AOV Separator Character" default="_ (underscore)">

Separator between the file name and the AOV name: **- (dash)**, **_ (underscore)** or **. (dot)**.

</Setting>
<Setting name="Image Format" default="OpenEXR">

Output format set when a render instance is created: **OpenEXR**, **BMP**, **Iris**, **PNG**, **JPEG**, **JPEG 2000**, **Targa** or **TIFF**.

</Setting>
<Setting name="Multilayer (EXR)" default="Enabled">

Write all AOVs into one multilayer EXR. Only has an effect with the OpenEXR format.

</Setting>
<Setting name="Renderer" default="Cycles">

Render engine set for the render, also used for farm submission: **Cycles** or **Eevee**.

</Setting>
<Setting name="Enable Compositing" default="Enabled">

Output a composite AOV besides the beauty output. Only supported up to Blender 4, because the *Composite* node was removed in Blender 5.

</Setting>
<Setting name="AOVs to create" default="Combined">

The Blender passes turned on for the render. The options are **Combined**, **Z**, **Mist**, **Normal**, **Position**, **Vector**, **UV**, **Denoising Data**, **Object Index**, **Material Index**, **Sample Count**, **Diffuse Light/Direct**, **Diffuse Indirect**, **Diffuse Color**, **Specular (Glossy) Light/Direct**, **Specular (Glossy) Indirect**, **Specular (Glossy) Color**, **Transmission Light/Direct**, **Transmission Indirect**, **Transmission Color**, **Volume Light/Direct**, **Volume Indirect**, **Emission**, **Environment**, **Shadow/Shadow Catcher**, **Ambient Occlusion**, **Bloom**, **Transparent**, **Cryptomatte Object**, **Cryptomatte Material**, **Cryptomatte Asset** and **Cryptomatte Accurate Mode**. The editor marks the passes that only Cycles or only Eevee supports.

</Setting>
<Setting name="Custom Passes" default="Empty list">

Additional AOVs besides the standard Blender passes.

<Settings>
<Setting name="Attribute name">

Name of the attribute written to the pass.

</Setting>
<Setting name="Type" default="Color">

**Color** or **Value**.

</Setting>
</Settings>

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://blender/create" scope="Studio, with project overrides" />

Every creator has the same three fields:

- **Enabled:** the creator is available in the Publisher.
- **Default Variants:** the variants offered when creating. Letters, digits and `_` only.
- **Product type items:** optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. Empty by default, so each creator makes its own product type.

<!-- screenshot: settings editor, Creator Plugins -->

<Settings prefix="create">
<Setting name="Create Action" default="Enabled, Main" />
<Setting name="Create Animation" default="Enabled, Main" />
<Setting name="Create BlendScene" default="Enabled, Main" />
<Setting name="Create Camera" default="Enabled, Main" />
<Setting name="Create Layout" default="Enabled, Main" />
<Setting name="Create Look" default="Enabled, no default variants" />
<Setting name="Create Model" default="Enabled, Main" />
<Setting name="Create Point Cache" default="Enabled, Main" />
<Setting name="Create Render" default="Enabled, Main" />
<Setting name="Create Review" default="Enabled, Main" />
<Setting name="Create Rig" default="Enabled, Main" />
<Setting name="Create USD" default="Enabled, Main" />
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://blender/load" scope="Studio, with project overrides" />

Options of the loaders. See [Loading](index.md#loading).

<!-- screenshot: settings editor, Loader Plugins -->

<Settings prefix="load">
<Setting name="Alembic Camera Loader">

<Settings>
<Setting name="Always Add Cache Reader (Alembic)" default="Disabled">

Always add a cache reader when importing Alembic files.

</Setting>
<Setting name="Add namespace on load" default="Enabled">

Prefix the loaded objects and data with a namespace.

</Setting>
</Settings>

</Setting>
<Setting name="Link Blend (Flat)">

<Settings>
<Setting name="Instances Collection" default="Disabled">

Create instances of the collections, instead of adding them directly to the scene.

</Setting>
<Setting name="Instance Object Data" default="Disabled">

Create instances of object data that no object references.

</Setting>
</Settings>

</Setting>
<Setting name="Reference Loader">

<Settings>
<Setting name="Create Animation Instance on Load" default="Enabled">

Create an animation instance when a rig is loaded.

</Setting>
</Settings>

</Setting>
<Setting name="Cache Model Loader">

<Settings>
<Setting name="Always Add Cache Reader (Alembic)" default="Disabled">

Always add a cache reader when importing Alembic files.

</Setting>
<Setting name="Add namespace on load" default="Enabled">

Prefix the loaded objects and data with a namespace.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://blender/publish" scope="Studio, with project overrides" />

Most plugins share three switches: **Enabled** (the plugin runs), **Optional** (the artist can turn it off in the Publisher) and **Active** (it is turned on by default in the Publisher). The defaults below list them in that order. Plugins that are not listed have no settings. What each plugin does is described in [Publishing](index.md#publishing).

<!-- screenshot: settings editor, Publish Plugins -->

### General validators

<Settings prefix="publish">
<Setting name="Validate Absolute Data Block Paths" default="Enabled, optional, active">

Checks for external data with absolute file paths.

</Setting>
<Setting name="Validate No Animation" default="Enabled, optional, active">

Checks that objects have no animation data.

</Setting>
<Setting name="Validate Camera Zero Keyframe" default="Disabled, optional, active">

Checks for a keyframe on frame zero, mostly used when the camera is loaded in Unreal Engine.

</Setting>
<Setting name="Validate File Saved" default="Enabled, not optional, active">

The enable switch is labelled **ValidateFileSaved**. The addon has no plugin with this name any more: the unsaved workfile check is done by the core addon, so this setting has no effect.

</Setting>
<Setting name="Validate Instance is not Empty" default="Enabled, not optional, active">

Checks for empty instances that would publish no data.

</Setting>
</Settings>

### Model validators

<Settings prefix="publish">
<Setting name="Validate Mesh Has Uvs" default="Enabled, optional, active">

Checks that geometry has a UV set.

</Setting>
<Setting name="Validate Mesh No Negative Scale" default="Enabled, not optional, active">

Checks for objects scaled with negative values.

</Setting>
<Setting name="Validate Model Mesh Has UV map named map1" default="Disabled, optional, active">

Checks for a UV set named `map1`, as in Maya.

</Setting>
<Setting name="Validate Transform Zero" default="Disabled, optional, active">

Checks that all object transforms are zero.

</Setting>
<Setting name="Validate No Colons In Name" default="Disabled, optional, active">

Checks for names containing `:`, mostly an issue when exporting to Unreal Engine.

</Setting>
</Settings>

### Render validators

<Settings prefix="publish">
<Setting name="Validate Render Camera Is Set" default="Enabled, not optional, active">

Checks for a renderable camera.

</Setting>
<Setting name="Validate Render Output for Deadline" default="Enabled, not optional, active">

The addon has no plugin with this name, so this setting has no effect.

</Setting>
<Setting name="Validate Frame Range" default="Enabled, optional, active">

Checks that the frame range of the scene matches the context.

</Setting>
<Setting name="Validate Resolution Setting" default="Enabled, optional, active">

Stored under the key `ValidateResolutionSetting`, while the plugin is `ValidateResolution`, so these values are not applied: the resolution validator always runs, optional and active.

</Setting>
</Settings>

### Extractors

<Settings prefix="publish">
<Setting name="Extract Blend" default="Enabled, optional, active">

<Settings>
<Setting name="Families" default="model, camera, rig, layout, blendScene">

Product types published as `.blend`.

</Setting>
<Setting name="Compress" default="Disabled">

Compress the `.blend` file.

</Setting>
<Setting name="Pack Textures" default="Enabled">

Pack the textures into the `.blend`, so that they are published with it. This can make the file much larger and slow down some renderers.

</Setting>
</Settings>

</Setting>
<Setting name="Extract FBX" default="Disabled, optional, active" />
<Setting name="Extract ABC">

The Alembic extractor of point caches. It has no **Enabled**, **Optional** or **Active** switch.

<Settings>
<Setting name="Alembic Mesh Subdiv Schema" default="Disabled">

Export meshes with the Alembic subdivision schema. Creases are exported and normals are not, which usually gives smaller files.

</Setting>
<Setting name="Evaluation Mode" default="Render">

**Render** or **Viewport**: which visibility and modifier settings of the objects are used.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Model ABC" default="Enabled, optional, active" />
<Setting name="Extract Animation ABC">

The Alembic extractor of animation. It has no **Enabled**, **Optional** or **Active** switch.

<Settings>
<Setting name="Alembic Mesh Subdiv Schema" default="Disabled">

Same as in **Extract ABC**.

</Setting>
<Setting name="Evaluation Mode" default="Render">

**Render** or **Viewport**.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Blend Animation" default="Enabled, optional, active">

<Settings>
<Setting name="Compress" default="Disabled" />
</Settings>

</Setting>
<Setting name="Extract Blend (Action)" default="Enabled, not optional, active">

<Settings>
<Setting name="Compress" default="Disabled" />
</Settings>

</Setting>
<Setting name="Extract Animation FBX" default="Disabled, optional, active" />
<Setting name="Extract Camera" default="Enabled, optional, active">

The camera FBX extractor.

</Setting>
<Setting name="Extract Camera as ABC" default="Enabled, optional, active" />
<Setting name="Extract Layout (JSON)" default="Enabled, optional, not active" />
<Setting name="Extract Thumbnail" default="Enabled, optional, active">

<Settings>
<Setting name="Presets" default="Presets for model and rig">

A JSON object with one capture preset per product type, with `image_settings` and `display_options` (shading and overlays). Product types without a preset use the defaults of the capture.

</Setting>
<Setting name="Compress" default="Disabled" />
<Setting name="Background Images" default="Disabled">

Include background images in the capture. Only for Blender 5.2 or newer.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Playblast" default="Enabled, optional, active">

<Settings>
<Setting name="Presets" default="One default preset">

A JSON object whose `default` preset is used for the playblast, with `image_settings` (PNG, RGB, 8 bit by default) and `display_options` (material shading, no overlays by default).

</Setting>
<Setting name="Compress" default="Disabled" />
<Setting name="Background Images" default="Disabled">

Include background images in the capture. Only for Blender 5.2 or newer.

</Setting>
</Settings>

</Setting>
<Setting name="Extract USD">

The default USD export options. It has no **Enabled**, **Optional** or **Active** switch.

<Settings>
<Setting name="Convert Orientation" default="Disabled" />
<Setting name="Animation" default="Disabled" />
<Setting name="Hair" default="Disabled" />
<Setting name="UV Maps" default="Enabled" />
<Setting name="Normals" default="Enabled" />
<Setting name="Materials" default="Enabled" />
<Setting name="Mesh Colors" default="Enabled" />
<Setting name="Generate Preview Surface" default="Enabled" />
<Setting name="Generate MaterialX Network" default="Disabled" />
<Setting name="Instancing" default="Enabled" />
<Setting name="Exposed Overrides" default="Empty list">

The options that artists can change per instance in the Publisher: **Convert Orientation**, **Export Animation**, **Export Hair**, **Export UV Maps**, **Export Normals**, **Export Materials**, **Export Mesh Colors**, **Generate Preview Surface**, **Generate MaterialX Network** or **Use Instancing**.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Model USD" default="Enabled, optional, active" />
</Settings>

## Templated workfile build

<SettingLocation uri="ayon+settings://blender/templated_workfile_build" scope="Studio, with project overrides" />

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
<Setting name="Apply on Blender launch" default="Enabled">

Apply the template when Blender starts and no workfile exists yet.

</Setting>
<Setting name="Save first workfile version" default="Enabled">

Save the first workfile version after the build.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Blender addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Templated workfile builder](../../../pipeline/template-builder.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
