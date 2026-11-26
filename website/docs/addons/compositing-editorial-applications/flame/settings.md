---
title: Flame addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Flame addon with their default values: project bookmarks, color management, hooks, creator, collector, extractor and loader plugins, and the custom menu."
addon: flame
addon_repo: ayon-flame
addon_version: 1.4.7
addon_scope: pipeline
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-flame/tree/1.4.7/server/settings
---

# Flame addon settings

<AddonInfo />

The settings of the [Flame addon](index.md) are in **Studio settings > Flame**, and can be overridden per project in **Project settings > Flame**. Pasting a location below into the URI bar of the web app opens that setting. How settings and their overrides work is described in [Settings](../../../ayon/how-ayon-works/settings.md).

## Project bookmarks

<SettingLocation uri="ayon+settings://flame/bookmarks" scope="Studio, with project overrides" />

After Flame launches, the addon writes bookmarks into the Flame project, so that the project folders of AYON appear in the Media Hub.

<!-- screenshot: settings editor, Project Bookmarks -->

<Settings prefix="bookmarks">
<Setting name="Enable Bookmarks" default="Enabled">

Create the bookmarks.

</Setting>
<Setting name="Flame Projects' Location">

Where Flame projects are stored, needed to save the bookmarks.

<Settings>
<Setting name="Variants" default="One variant">

One entry for each Flame installation. Names must be unique. The first existing folder of the current platform is used. The default variant has an empty name, the label `Default`, no Windows path, and `/opt/Autodesk/project` for Linux and MacOS.

<Settings>
<Setting name="Name">

Matched against the variant of the Flame application.

</Setting>
<Setting name="Label" />
<Setting name="Path to Projects Folder">

Lists of folders for **Windows**, **Linux** and **MacOS**.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Bookmark Paths" default="One bookmark">

The bookmarks to create. Names and labels must be unique. The template fields are `root` and `project` only. The default bookmark is **Project Root**, with the label `{project[name]}` and the path `{root[work]}/{project[name]}`.

<Settings>
<Setting name="Name" />
<Setting name="Label Template">

Label of the bookmark in the Media Hub. Required.

</Setting>
<Setting name="Path Template">

Folder of the bookmark. Required.

</Setting>
</Settings>

</Setting>
</Settings>

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://flame/imageio" scope="Studio, with project overrides" />

How Flame follows the color management of AYON, and the color settings of new Flame projects. See [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Flame follows the color management of AYON.

</Setting>
<Setting name="Remapping colorspace names">

Maps SynColor colorspace names of Flame to OCIO names, in Flame before 2026.

<Settings>
<Setting name="Rules" default="Two rules">

The defaults map `ACEScg` to `ACES - ACEScg` and `Rec.709 video` to `Output - Rec.709`.

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
<Setting name="Project">

Color settings of a new Flame project.

<Settings>
<Setting name="SyncColor Policy (name or path)" default="ACES 1.1">

SynColor preset used when a new project is created, in Flame before 2026.

</Setting>
<Setting name="OCIO default config" default="/opt/Autodesk/colour_mgmt/configs/legacy_configs/syncolor_aces1.1_config/config.ocio">

OCIO config used when a new project is created, in Flame 2026 and later. Used only when no global OCIO environment variable is set.

</Setting>
<Setting name="Image Depth" default="16-bit fp">

Frame depth of the new project.

</Setting>
<Setting name="Field Dominance" default="PROGRESSIVE">

Field dominance of the new project.

</Setting>
</Settings>

</Setting>
</Settings>

## Hooks

<SettingLocation uri="ayon+settings://flame/hooks" scope="Studio, with project overrides" />

Launch hooks that prepare Flame before it starts.

<!-- screenshot: settings editor, Hooks -->

<Settings prefix="hooks">
<Setting name="Install OpenTimelineIO to Flame">

<Settings>
<Setting name="Enable" default="Enabled">

Install OpenTimelineIO into the Python environment of Flame before launch. Disable it when the library is already installed.

</Setting>
</Settings>

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://flame/create" scope="Studio, with project overrides" />

Defaults of the creators that mark timeline segments as shots and that create Batch renders.

<!-- screenshot: settings editor, Create plugins -->

### Create Shot Clip

<SettingLocation uri="ayon+settings://flame/create/CreateShotClip" />

Default values of the attributes of the **Create Publishable Clip** creator. How shots are created from a timeline is described in [Editorial publishing](../../../pipeline/editorial-publishing.md).

<Settings prefix="create-shot-clip">
<Setting name="Shot parent hierarchy" default="{folder}/{sequence}">

Template of the parent folders of the shot.

</Setting>
<Setting name="Use Shot Name" default="Enabled">

Use the shot name of the segment.

</Setting>
<Setting name="Rename clips" default="Disabled">

Rename the timeline segments with the clip name template.

</Setting>
<Setting name="Clip name template" default="{sequence}{shot}">

Template of the clip name.

</Setting>
<Setting name="Accept segment order" default="Enabled">

Number the shots by the order of the segments in the sequence.

</Setting>
<Setting name="Count sequence from" default="10">

First shot number.

</Setting>
<Setting name="Stepping number" default="10">

Increment between shot numbers.

</Setting>
<Setting name="{folder}" id="create-shot-clip-folder" default="shots">

Value of the `{folder}` keyword.

</Setting>
<Setting name="{episode}" id="create-shot-clip-episode" default="ep01">

Value of the `{episode}` keyword.

</Setting>
<Setting name="{sequence}" id="create-shot-clip-sequence" default="a">

Value of the `{sequence}` keyword.

</Setting>
<Setting name="{track}" id="create-shot-clip-track" default="{_track_}">

Value of the `{track}` keyword. `{_track_}` is the name of the timeline track.

</Setting>
<Setting name="{shot}" id="create-shot-clip-shot" default="####">

Value of the `{shot}` keyword. The `#` characters set the padding of the shot number.

</Setting>
<Setting name="Enable Vertical Sync" default="Disabled">

Publish several plate variants per shot from several tracks, where one hero track drives the shot.

</Setting>
<Setting name="Include audio" default="Disabled">

Also publish audio.

</Setting>
<Setting name="Source resolution" default="Disabled">

Use the resolution of the source media.

</Setting>
<Setting name="Workfiles Start Frame" default="1001">

First frame of the workfile.

</Setting>
<Setting name="Handle start (head)" default="5">

Maximum trim at the head of the clip.

</Setting>
<Setting name="Handle end (tail)" default="5">

Maximum trim at the tail of the clip.

</Setting>
<Setting name="Enable handles including" default="Disabled">

Include the handles in the workfile start frame.

</Setting>
<Setting name="Enable retimed handles" default="Enabled">

Recalculate the handles with the speed of a retimed clip.

</Setting>
<Setting name="Enable retimed shot frameranges" default="Enabled">

Recalculate the shot frame range for retimed clips.

</Setting>
<Setting name="Exposed Overrides" default="All attributes">

Which of the attributes above the artist can change when publishing. The options are the labels of the attributes above (**Rename Clips** for **Rename clips**).

</Setting>
<Setting name="Plate product types" default="Empty list">

Product types offered for plate products.

</Setting>
</Settings>

### Collect Shot Clip instances

<SettingLocation uri="ayon+settings://flame/create/CollectShotClip" />

<Settings prefix="collect-shot-clip">
<Setting name="Collect only instances from selected clips." default="Disabled">

Restrict the collection of instances to the clips selected in the active sequence.

</Setting>
</Settings>

### Create Batch Render

<SettingLocation uri="ayon+settings://flame/create/CreateBatchRender" />

Presets applied to the Write File node that the **Batch Render** creator creates. In Flame 2026 and later, a preset attribute that the node does not support is logged as a warning.

<Settings prefix="create-batch-render">
<Setting name="Node name" default="RenderFlame">

Name of the Write File node.

</Setting>
<Setting name="Media path" default="Empty">

Output folder of the node.

</Setting>
<Setting name="Frame padding" default="4">

Frame padding of the output files.

</Setting>
<Setting name="Compress mode" default="DWAA">

Compression of the output.

</Setting>
<Setting name="Include setup" default="Enabled">

Save the Batch setup next to the render.

</Setting>
<Setting name="Include setup path" default="<batch name>_flame_v<iteration###>">

Name pattern of the saved setup.

</Setting>
<Setting name="Create clip" default="Disabled">

Also create a clip of the output.

</Setting>
<Setting name="Shot name" default="<batch name>">

Shot name pattern.

</Setting>
<Setting name="Media path pattern" default="renders/flame/<name>/v<iteration###>/<batch name><name>_v<iteration###>">

File path pattern of the output.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://flame/publish" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Publish plugins -->

### Collect Shot instances

<SettingLocation uri="ayon+settings://flame/publish/CollectShot" />

What the collector of shot instances reads from segment comments, and which tasks it adds to each published shot.

<Settings prefix="collect-shot">
<Setting name="XML presets attributes parsable from segment comments" default="Five attributes">

Attributes that can be written in a segment comment and passed to the XML export preset. The defaults are `width` (number), `height` (number), `pixelRatio` (float), `resizeType` (string) and `resizeFilter` (string).

<Settings>
<Setting name="Attribute name" />
<Setting name="Attribute type">

**number**, **float** or **string**.

</Setting>
</Settings>

</Setting>
<Setting name="Add tasks" default="One task">

Tasks added to every published shot folder. The default is the task `compositing` of type `Compositing`, with **Create batch group** enabled.

<Settings>
<Setting name="Task name" />
<Setting name="Task type">

One of the task types of the project.

</Setting>
<Setting name="Create batch group" default="Enabled">

Let [Integrate Batch Groups](#integrate-batch-groups) create a batch group for the task.

</Setting>
</Settings>

</Setting>
</Settings>

### Validators

Each validator has **Enabled** (the plugin runs), **Optional** (the artist can turn it off in the Publisher) and **Active** (it is on by default in the Publisher).

<Settings prefix="validators">
<Setting name="Validate Product Attributes" default="Disabled, optional, not active" />
<Setting name="Validate Segments" default="Disabled, optional, not active">

Shown as **Validate Timeline Segments** when publishing.

</Setting>
<Setting name="Validate Batch Render Custom Staging Dir" default="Enabled, optional, active">

Checks that the Write File node of a batch render renders into the custom staging folder. A repair action sets the output folder of the node.

</Setting>
</Settings>

### Extract Batch Render

<SettingLocation uri="ayon+settings://flame/publish/ExtractBatchRender" />

<Settings prefix="extract-batch-render">
<Setting name="Representation tags" default="Empty list">

Tags added to the representations of the batch render, for example to mark them reviewable.

</Setting>
</Settings>

### Extract Product Resources

<SettingLocation uri="ayon+settings://flame/publish/ExtractProductResources" />

The representations exported from each published segment, with Flame XML export presets. When **XML preset directory** is empty, the shared or installed preset folders of Flame are used.

<Settings prefix="extract-product-resources">
<Setting name="Missing media link export presets">

The export used for clips whose media link is missing.

<Settings>
<Setting name="Output extension" default="exr">

Extension of the published representation.

</Setting>
<Setting name="Output color (imageio)" default="ACES - ACEScg">

Colorspace stored in the representation, for later publish plugins and loaders.

</Setting>
<Setting name="Export clip type" default="File Sequence">

Type of the XML preset: **Movie**, **File Sequence** or **Sequence Publish**.

</Setting>
<Setting name="XML preset directory" default="Empty">

Absolute folder of the XML preset.

</Setting>
<Setting name="XML preset file (with ext)" default="OpenEXR (16-bit fp DWAA).xml" />
<Setting name="Distribute parsed comment attributes to XML preset" default="Enabled">

Pass the attributes parsed from clip comments to the preset. This can change the resolution of the exported media.

</Setting>
<Setting name="Add range to representation name" default="Enabled">

Add frame range attributes to the representation data.

</Setting>
</Settings>

</Setting>
<Setting name="Thumbnail generator preset">

The export of the thumbnail.

<Settings>
<Setting name="Enabled" default="Enabled">

Generate a thumbnail.

</Setting>
<Setting name="Output extension" default="jpg" />
<Setting name="Output color (imageio)" default="Output - sRGB" />
<Setting name="Export clip type" default="File Sequence">

**Movie**, **File Sequence** or **Sequence Publish**.

</Setting>
<Setting name="XML preset directory" default="Empty" />
<Setting name="XML preset file (with ext)" default="Jpeg (8-bit).xml" />
</Settings>

</Setting>
<Setting name="Additional representations export">

Further representations exported from each segment.

<Settings>
<Setting name="Publish clip's original media" default="Disabled">

Publish the original media of the clip as a representation.

</Setting>
<Setting name="Additional representations export presets mapping" default="One preset, disabled">

The presets. The default preset `exr16fpdwaa` is disabled and uses the values of the missing media preset above.

<Settings>
<Setting name="Is enabled" default="Enabled">

Use the preset.

</Setting>
<Setting name="Name">

Identifies the preset and is the representation name. It can be part of the output file name through the `outputName` anatomy token.

</Setting>
<Setting name="Activate by search pattern" default=".*">

The preset is used when the media path of the clip matches this regular expression.

</Setting>
<Setting name="Output extension" default="exr" />
<Setting name="Output color (imageio)" default="ACES - ACEScg" />
<Setting name="Export clip type" default="File Sequence">

**Movie**, **File Sequence** or **Sequence Publish**.

</Setting>
<Setting name="XML preset directory" default="Empty" />
<Setting name="XML preset file (with ext)" default="OpenEXR (16-bit fp DWAA).xml" />
<Setting name="Distribute parsed comment attributes to XML preset" default="Enabled" />
<Setting name="Add range to representation name" default="Enabled" />
<Setting name="Representation tags" default="Empty list">

Tags added to the representation, for example to mark it reviewable.

</Setting>
<Setting name="Load to batch group reel" default="Enabled">

Load the representation into the batch group reel after publishing, with [Integrate Batch Groups](#integrate-batch-groups).

</Setting>
<Setting name="Use loader name" default="LoadClipBatch">

The loader used for that.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

### Integrate Batch Groups

<SettingLocation uri="ayon+settings://flame/publish/IntegrateBatchGroup" />

<Settings prefix="integrate-batch-group">
<Setting name="IntegrateBatchGroup" default="Disabled">

<Settings>
<Setting name="Enabled" default="Disabled">

Create a batch group for each task of a published shot and load the clip into it. See [Extractors and integrators](index.md#extractors-and-integrators).

</Setting>
</Settings>

</Setting>
</Settings>

### Increment Batch Render Custom Staging Dir

<SettingLocation uri="ayon+settings://flame/publish/IncrementBatchRenderNextStagingDir" />

<Settings prefix="increment-batch-render">
<Setting name="Increment Batch Render Custom Staging Dir" default="Enabled, optional, active">

After publishing, points the Write File node of a batch render to the custom staging folder of the next version.

</Setting>
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://flame/load" scope="Studio, with project overrides" />

Where the loaders put loaded clips and how they name them. Templates in angle brackets, such as `<_{output}>`, are left out when their key has no value.

<!-- screenshot: settings editor, Loader plugins -->

<Settings>
<Setting name="Load Clip" default="Enabled">

Shown as **Load as clip**: loads a representation as a clip into a reel of the Media Panel.

<Settings>
<Setting name="Enabled" default="Enabled">

Make the loader available.

</Setting>
<Setting name="Product types" default="Empty list">

Not used in version 1.4.5: the loader is offered for the product base types `render2d`, `source`, `plate`, `render` and `review`.

</Setting>
<Setting name="Reel group name" default="AYON_Reels">

Reel group that receives the clips.

</Setting>
<Setting name="Reel name" default="Loaded">

Reel that receives the clips.

</Setting>
<Setting name="Clip name template" default="{folder[name]}_{product[name]}<_{output}>">

Name of the loaded clip.

</Setting>
<Setting name="Layer name template" default="{folder[name]}_{product[name]}<_{output}>">

Name given to the layers that match the rename patterns.

</Setting>
<Setting name="Layer rename patters" default="rgb, rgba">

Layer names that are renamed with the layer name template.

</Setting>
</Settings>

</Setting>
<Setting name="Load as clip to current batch" default="Enabled">

Loads a representation as a clip into the current Batch.

<Settings>
<Setting name="Enabled" default="Enabled">

Make the loader available.

</Setting>
<Setting name="Product types" default="Empty list">

Not used in version 1.4.5, as for **Load Clip**.

</Setting>
<Setting name="Reel name" default="AYON_LoadedReel">

Reel of the Batch that receives the clips.

</Setting>
<Setting name="Clip name template" default="{batch}_{folder[name]}_{product[name]}<_{output}>">

Name of the loaded clip.

</Setting>
<Setting name="Layer name template" default="{folder[name]}_{product[name]}<_{output}>">

Name given to the layers that match the rename patterns.

</Setting>
<Setting name="Layer rename patters" default="rgb, rgba">

Layer names that are renamed with the layer name template.

</Setting>
</Settings>

</Setting>
</Settings>

## Custom menu

<SettingLocation uri="ayon+settings://flame/custom_menu" scope="Studio, with project overrides" />

A script menu added to the AYON menus of Flame.

<!-- screenshot: settings editor, Custom Menu -->

<Settings prefix="custom-menu">
<Setting name="Menu name" default="Custom Tools">

Name of the menu.

</Setting>
<Setting name="enabled" default="Disabled">

Show the menu.

</Setting>
<Setting name="Definition" default="One action">

The items of the menu. The default is one action, **AYON Flame Docs**, for all contexts, which opens the Flame documentation in a web browser.

<Settings>
<Setting name="Type" default="Action">

**Action** or **Menu**.

</Setting>
<Setting name="Action">

<Settings>
<Setting name="Title" />
<Setting name="Flame Context" default="FlameMenuUniversal">

Where the action appears: **ALL**, **FlameMenuUniversal**, **FlameMenuTimeline** or **FlameMenuBatch**.

</Setting>
<Setting name="Source Type" default="Python file (set filepath as command)">

**Python** (the code in **Python**) or **Python file (set filepath as command)** (the script in **Filepath**). A script file must define a function named like the file.

</Setting>
<Setting name="Python" />
<Setting name="Filepath" />
</Settings>

</Setting>
<Setting name="Menu">

A sub-menu with a **Title** and a list of **Items**, each an action with the fields above.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Flame addon](index.md)
- [Editorial publishing](../../../pipeline/editorial-publishing.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
