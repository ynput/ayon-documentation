---
title: After Effects addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON After Effects addon with their default values: extension install, panel, color management, render creator, publish plugins, workfile builder, templated workfile build and scripts."
addon: aftereffects
addon_repo: ayon-aftereffects
addon_version: 0.3.8
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-aftereffects/tree/0.3.8/server/settings
---

# After Effects addon settings

<AddonInfo />

The settings of the [After Effects addon](index.md) are in **Studio settings > AfterEffects**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The OCIO config files that color management uses are set in the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

## General

<SettingLocation uri="ayon+settings://aftereffects" scope="Studio, with project overrides" />

How the AYON extension is installed and opened when After Effects starts from the launcher.

<!-- screenshot: settings editor, General -->

<Settings>
<Setting name="Install AYON Extension" default="Enabled">

A pre-launch hook installs the AYON extension into the user's Adobe CEP extensions folder (`Adobe/CEP/extensions/io.ynput.AE.panel` in the user's application data) and replaces it when its version differs from the bundled one. Failures are logged and do not stop the launch.

</Setting>
<Setting name="Auto-open AYON Panel" default="Enabled">

Opens the AYON panel on every After Effects launch.

</Setting>
</Settings>

## OCIO config

<SettingLocation uri="ayon+settings://aftereffects/imageio" scope="Studio, with project overrides" />

Whether After Effects follows the global color management, and file rules that assign a colorspace to files by name.

<!-- screenshot: settings editor, OCIO config -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

After Effects follows the global color management, using the OCIO config set in the core addon.

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the rules below for this host.

</Setting>
<Setting name="Rules" default="Empty list">

Rules that assign a colorspace to files. Rule names must be unique.

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

## Creator plugins

<SettingLocation uri="ayon+settings://aftereffects/create/RenderCreator" scope="Studio, with project overrides" />

The **Create Render** creator, which makes render instances from compositions.

<!-- screenshot: settings editor, Creator plugins -->

<Settings prefix="create-render">
<Setting name="Review" default="Enabled">

New render instances have the Review option on.

</Setting>
<Setting name="Default Variants" default="Main">

The variants offered by default.

</Setting>
<Setting name="Force resolution and duration values from Task" default="Enabled">

When a render instance is created, sets the frame range, frame rate and resolution of the composition from the task.

</Setting>
<Setting name="Rename composition to product name" default="Enabled">

Renames the composition to the product name when the instance is created or its product name changes, for example on a variant change.

</Setting>
<Setting name="Sync created products with render queue" default="Disabled">

Mirrors the After Effects render queue into the created products. Compositions queued directly in After Effects get a render instance with the default variant, and instances whose composition left the queue are removed. The sync runs when the Publisher is opened or refreshed.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types that the creator can make.

<Settings>
<Setting name="Product type">

Product type name.

</Setting>
<Setting name="Label">

Label shown in the UI for the product type.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://aftereffects/publish" scope="Studio, with project overrides" />

The validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher). The other plugins of the addon (for example Validate Footage Items, Validate Rendered Files, Validate Instance in Context, Increment Workfile) have no settings of their own.

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Collect Review" default="Enabled">

Adds the review family to instances that have Review on. It has only the **Enabled** switch.

</Setting>
<Setting name="Validate Scene Settings" default="Enabled, optional, active">

Compares the composition with the task or folder attributes.

<Settings>
<Setting name="Skip Resolution Check for Tasks" default=".*">

Regex patterns of task names that skip the resolution check. The default pattern matches every task, so the resolution is not checked.

</Setting>
<Setting name="Skip Timeline Check for Tasks" default=".*">

Regex patterns of task names that skip the check of frame rate, frame range and handles. The default matches every task, so with the defaults only the duration (frame count including handles) is checked.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Footage Location" default="Disabled, optional, active">

Fails when footage is stored outside of the project roots.

</Setting>
</Settings>

## Workfile Builder

<SettingLocation uri="ayon+settings://aftereffects/workfile_builder" scope="Studio, with project overrides" />

A simpler workfile template, chosen by task type.

<!-- screenshot: settings editor, Workfile Builder -->

<Settings prefix="workfile-builder">
<Setting name="Create first workfile" default="Disabled">

Saves the first workfile with the built template when no workfile exists.

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

## Templated Workfile Build Settings

<SettingLocation uri="ayon+settings://aftereffects/templated_workfile_build" scope="Studio, with project overrides" />

Profiles for a workfile template that uses placeholders; see [Template builder](../../../pipeline/template-builder.md). A profile applies when its filters match the current task.

<!-- screenshot: settings editor, Templated Workfile Build Settings -->

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

The template workfile.

</Setting>
<Setting name="Keep placeholders" default="Disabled">

Keeps the placeholders after the build.

</Setting>
<Setting name="Create first version" default="Enabled">

Saves the first workfile version automatically.

</Setting>
</Settings>

</Setting>
</Settings>

## Scripts

<SettingLocation uri="ayon+settings://aftereffects/scripts" scope="Studio, with project overrides" />

Scripts to run in After Effects, automatically when a workfile is opened or by hand from the panel.

<!-- screenshot: settings editor, Scripts -->

<Settings>
<Setting name="Script list" default="Empty list">

<Settings>
<Setting name="Script name">

The name shown in the **Run Scripts...** window.

</Setting>
<Setting name="Auto" default="Enabled">

Automatic scripts run when a workfile is opened. Manual scripts are run from the panel.

</Setting>
<Setting name="Path to script">

Path of a `.js` or `.jsx` file. It can use template keys of the current context, the project roots and environment variables.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [After Effects addon](index.md)
- [Template builder](../../../pipeline/template-builder.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
