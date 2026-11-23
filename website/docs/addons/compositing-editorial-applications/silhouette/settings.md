---
title: Silhouette addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Silhouette addon with their default values: AYON menu and shortcuts, session defaults, color management, loaders, creators, publish plugins and the templated workfile build."
addon: silhouette
addon_repo: ayon-silhouette
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-silhouette/tree/0.2.2/server/settings
---

# Silhouette addon settings

<AddonInfo />

The settings of the [Silhouette addon](index.md) are in **Studio settings > Silhouette**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The OCIO config that color management uses is set in the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

## AYON menu

<SettingLocation uri="ayon+settings://silhouette/ayon_menu" scope="Studio, with project overrides" />

Customizes the AYON menu in Silhouette: which context entries it shows and the keyboard shortcuts of the AYON tools.

<!-- screenshot: settings editor, AYON Menu -->

<Settings>
<Setting name="Set Frame Range" default="Enabled">

Shows the menu entry that sets the frame range and frame rate of the active session from the current task.

</Setting>
<Setting name="Set Resolution" default="Enabled">

Shows the menu entry that sets the resolution of the active session from the current task.

</Setting>
<Setting name="Shortcuts">

Keyboard shortcuts for the AYON tools, as text such as `ctrl+alt+c`. An empty value assigns no shortcut.

<Settings>
<Setting name="Create..." default="ctrl+alt+c" />
<Setting name="Publish..." default="ctrl+alt+p" />
<Setting name="Load..." default="ctrl+alt+l" />
<Setting name="Manage..." default="ctrl+alt+m" />
<Setting name="Workfiles..." default="Empty" />
<Setting name="Build Workfile..." default="ctrl+alt+b" />
<Setting name="Version Up Workfile" default="alt+shift+s" />
</Settings>

</Setting>
</Settings>

## Session default settings

<SettingLocation uri="ayon+settings://silhouette/session" scope="Studio, with project overrides" />

Defaults applied to the Silhouette session of a workfile.

<!-- screenshot: settings editor, Session Default Settings -->

<Settings>
<Setting name="Bit Depth" default="8 Bit">

Default bit depth of the workfile session: **8 Bit**, **Float 16** or **Float 32**.

</Setting>
</Settings>

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://silhouette/imageio" scope="Studio, with project overrides" />

Whether color management applies in Silhouette, and file rules that assign a colorspace to files by name.

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

Turns on color management for Silhouette.

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Overrides the global file rules with the rules below.

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

## Load

<SettingLocation uri="ayon+settings://silhouette/load/SourceLoader" scope="Studio, with project overrides" />

The **Load Source** loader. Silhouette aligns loaded sources with the start frame of the session, so matching the session to the source can help.

<!-- screenshot: settings editor, Load -->

<Settings prefix="load-source">
<Setting name="Set Session Frame Range on Load" default="Disabled">

When loading a source, sets the start frame and duration of the session to the frame range of the source, handles included. The loader also offers this as an option at load time.

</Setting>
<Setting name="Set Session Frame Range on Update" default="Disabled">

When updating a source, forces the start frame and duration of the session to the frame range of the loaded source.

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://silhouette/create" scope="Studio, with project overrides" />

One entry for each creator: **Matte Shapes** (`CreateMatteShapes`), **Render** (`CreateRender`) and **Track Points** (`CreateTrackPoints`). Each has the same fields and defaults.

<!-- screenshot: settings editor, Create -->

<Settings prefix="creator">
<Setting name="Enabled" default="Enabled">

Makes the creator available.

</Setting>
<Setting name="Default Variants" default="Main">

The variants offered by default.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types the creator can make, each with a **Product type** name and a **Label** shown in the UI.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://silhouette/publish" scope="Studio, with project overrides" />

The extractors of shapes and trackers share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher). Each enabled extractor adds its format as a representation of the published product.

<!-- screenshot: settings editor, Publish -->

<Settings>
<Setting name="Extract Nuke 9+ .nk Shapes" default="Enabled, not optional, active" />
<Setting name="Extract Nuke 6.2+ .nk Shapes" default="Disabled, not optional, active" />
<Setting name="Extract Silhouette .fxs Shapes." default="Enabled, not optional, active" />
<Setting name="Extract Shake 4.x .ssf Shapes" default="Disabled, not optional, active" />
<Setting name="Extract Fusion .settings Shapes" default="Disabled, not optional, active" />
<Setting name="Extract After Effects .txt Trackers" default="Enabled, not optional, active" />
<Setting name="Extract Nuke 5 .nk Trackers" default="Enabled, not optional, active" />
<Setting name="Extract Workfile">

It has no switches.

<Settings>
<Setting name="Add project.sfx representation" default="Disabled">

Adds the `project.sfx` file as a separate `sfx_project` representation.

</Setting>
</Settings>

</Setting>
</Settings>

## Templated workfile build

<SettingLocation uri="ayon+settings://silhouette/templated_workfile_build" scope="Studio, with project overrides" />

Profiles for a workfile template that uses placeholders; see [Template builder](../../../pipeline/template-builder.md). A profile applies when its filters match the current task.

<!-- screenshot: settings editor, Templated Workfile Build -->

<Settings prefix="templated-workfile-build">
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Task types">

Task types the profile applies to. Empty matches all.

</Setting>
<Setting name="Task names">

Task names the profile applies to. Empty matches all.

</Setting>
<Setting name="Path to template">

The template project.

</Setting>
<Setting name="Keep placeholders" default="Disabled">

Keeps the placeholders after the build.

</Setting>
<Setting name="Create first version" default="Enabled">

Saves the first version of the built workfile.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Silhouette addon](index.md)
- [Template builder](../../../pipeline/template-builder.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
