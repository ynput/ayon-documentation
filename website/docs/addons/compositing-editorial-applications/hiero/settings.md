---
title: Hiero addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Hiero addon with their default values: path mappings, color management, the Create Shot Clip creator, loaders, clip effects collection and the scripts menu."
addon: hiero
addon_repo: ayon-hiero
addon_version: 0.6.5
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-hiero/tree/0.6.5/server/settings
---

# Hiero addon settings

<AddonInfo />

The settings of the [Hiero addon](index.md) are in **Studio settings > Hiero**, and can be overridden per project in **Project settings > Hiero**. Pasting a location below into the URI bar of the web app opens that setting. How settings and their overrides work is described in [Settings](../../../ayon/how-ayon-works/settings.md).

## Path mappings

<SettingLocation uri="ayon+settings://hiero/path_mapping" scope="Studio, with project overrides" />

Cross-platform path mappings that the addon adds to the path remapping of Hiero when a project opens, so that a project made on one platform finds its media on another. Mappings that AYON added before are replaced; mappings added by hand are kept.

<!-- screenshot: settings editor, Path Mappings -->

<Settings>
<Setting name="Remap Anatomy Root By Default" default="Disabled">

Also add the root paths of the project anatomy as mappings.

</Setting>
<Setting name="Platform paths" default="Empty list">

The mappings. Each has **Platform paths** with a **Windows**, a **Linux** and a **MacOS** path. Entries with all paths empty are skipped.

</Setting>
</Settings>

## Color management (imageio)

<SettingLocation uri="ayon+settings://hiero/imageio" scope="Studio, with project overrides" />

How Hiero follows the color management of AYON: the colorspaces of the Hiero project and the rules that assign a colorspace to clips. See [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (imageio) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Master switch of the section.

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
<Setting name="Workfile">

The color management values of the Hiero project, applied by **Apply Colorspace Project**.

<Settings>
<Setting name="OpenColorIO Config" default="aces_1.2">

**nuke-default**, **spi-vfx**, **spi-anim**, **aces_0.1.1**, **aces_0.7.1**, **aces_1.0.1**, **aces_1.0.3**, **aces_1.1**, **aces_1.2**, **aces_1.3** or **custom**.

</Setting>
<Setting name="Working Space" default="role_scene_linear" />
<Setting name="Viewer" default="ACES/sRGB" />
<Setting name="Thumbnails" default="ACES/sRGB" />
<Setting name="Monitor Out" default="ACES/sRGB" />
<Setting name="8-bit Files" default="role_matte_paint" />
<Setting name="16-bit Files" default="role_texture_paint" />
<Setting name="Log Files" default="role_compositing_log" />
<Setting name="Floating Point Files" default="role_scene_linear" />
</Settings>

</Setting>
<Setting name="Assign colorspace to clips via rules">

Rules used by **Apply Colorspace Clips**: a clip whose path matches a regex gets the colorspace of the rule.

<Settings>
<Setting name="Inputs" default="One rule">

The default rule has the regex `[^-a-zA-Z0-9](plateRef).*(?=mp4)` and the colorspace `sRGB`.

<Settings>
<Setting name="Regex expression" />
<Setting name="Colorspace" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://hiero/create" scope="Studio, with project overrides" />

Defaults of the creator that marks timeline clips as shots, and of the collection of its instances.

<!-- screenshot: settings editor, Creator Plugins -->

### Create Shot Clip

<SettingLocation uri="ayon+settings://hiero/create/CreateShotClip" />

Default values of the options of the **Create Publishable Clip** creator; the artist can change them when creating. How shots are created from a timeline is described in [Editorial publishing](../../../pipeline/editorial-publishing.md).

<Settings prefix="create-shot-clip">
<Setting name="Shot parent hierarchy" default="{folder}/{sequence}">

Template of the parent folders of the shot folder.

</Setting>
<Setting name="Rename clips" default="Enabled">

Rename the clips sequentially with the clip name template.

</Setting>
<Setting name="Clip name template" default="{track}{sequence}{shot}">

Template of the shot name.

</Setting>
<Setting name="Count sequence from" default="10">

First number of the running number.

</Setting>
<Setting name="Stepping number" default="10">

Increment of the number for each shot.

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

Value of the `{track}` keyword. `{_track_}` is the name of the Hiero track.

</Setting>
<Setting name="{shot}" id="create-shot-clip-shot" default="sh###">

Value of the `{shot}` keyword. The `#` characters set the padding of the running number.

</Setting>
<Setting name="Plate Product types" default="Empty list">

Product types offered for plate products. When empty, only `plate` is offered.

</Setting>
<Setting name="Enable Vertical Sync" default="Disabled">

Synchronize the attributes of clips on several tracks with the clip of the hero track.

</Setting>
<Setting name="Workfiles Start Frame" default="1001">

Start frame of the shot.

</Setting>
<Setting name="Handle start (head)" default="10">

Handle at the start of the clip.

</Setting>
<Setting name="Handle end (tail)" default="10">

Handle at the end of the clip.

</Setting>
</Settings>

### Collect Shot Clip instances

<SettingLocation uri="ayon+settings://hiero/create/CollectShotClip" />

<Settings prefix="collect-shot-clip">
<Setting name="Collect only instances from selected clips." default="Disabled">

Restrict the collection of instances to the clips selected in the active sequence. When no clip is selected, every instance is collected.

</Setting>
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://hiero/load" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Loader plugins -->

<Settings>
<Setting name="Load Clip" default="Enabled">

Loads a representation as a clip into the media bin of the project.

<Settings>
<Setting name="Enabled" default="Enabled">

Make the loader available.

</Setting>
<Setting name="Clip name template" default="{folder[name]}_{product[name]}_{representation}">

Template of the name of the loaded clip.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://hiero/publish" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Collect Clip Effects">

Which soft effects above a clip are collected, and how they are grouped into products.

<Settings>
<Setting name="Effect Categories" default="Empty list">

Groups effects by their class: effects of the classes of a category are published together under the category name. Names must be unique.

<Settings>
<Setting name="Name" />
<Setting name="Effect Classes" default="Empty list">

Effect node classes that belong to the category.

</Setting>
</Settings>

</Setting>
<Setting name="Effect Tracks" default="Empty list">

Groups effects by the track they are on.

<Settings>
<Setting name="Name" />
<Setting name="Track Names" default="Empty list">

Names of the effect tracks that belong to the group.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Scripts menu definition

<SettingLocation uri="ayon+settings://hiero/scriptsmenu" scope="Studio, with project overrides" />

A custom menu in the menu bar of Hiero.

<!-- screenshot: settings editor, Scripts Menu Definition -->

<Settings prefix="scriptsmenu">
<Setting name="Menu name" default="Custom Tools">

Title of the menu.

</Setting>
<Setting name="Definition" default="One action">

The items of the menu. The default is one action, **AYON Hiero Docs**, which opens the Hiero documentation in a web browser.

<Settings>
<Setting name="Type" default="Action">

**Action**, **Menu** or **Separator**.

</Setting>
<Setting name="Action">

<Settings>
<Setting name="Title" />
<Setting name="Tooltip" />
<Setting name="Source Type" default="Python file (set filepath as command)">

**Python** (the code in **Python**) or **Python file (set filepath as command)** (the script in **Filepath**).

</Setting>
<Setting name="Python" />
<Setting name="Filepath" />
</Settings>

</Setting>
<Setting name="Menu">

A sub-menu with a **Title** and a list of **Items**. Each item is an **Action**, with the fields above, or a **Separator**.

</Setting>
</Settings>

</Setting>
</Settings>

## Filters

<SettingLocation uri="ayon+settings://hiero/filters" scope="Studio, with project overrides" />

<Settings prefix="filters">
<Setting name="Filters" id="filters-list" default="Empty list">

A list of named filters, each with a **Name** and an **Active** switch (enabled by default). The Hiero addon does not read this setting in version 0.6.5.

</Setting>
</Settings>

## Related

- [Hiero addon](index.md)
- [Editorial publishing](../../../pipeline/editorial-publishing.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
