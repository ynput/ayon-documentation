---
title: Fusion addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Fusion addon with their default values: color management, local Fusion profile, hooks, Saver creators and local rendering."
addon: fusion
addon_repo: ayon-fusion
addon_version: 0.4.3
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-fusion/tree/0.4.3/server
---

# Fusion addon settings

<AddonInfo />

The settings of the [Fusion addon](index.md) are in **Studio settings > Fusion**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The addon has no settings for its validators: which validators are optional is fixed (see the [validator table](index.md#validators)).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://fusion/imageio" scope="Studio, with project overrides" />

Whether AYON's color management applies in Fusion, and file rules that assign a colorspace to files by name. The OCIO config itself is set in the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

Master switch of AYON's color management in Fusion.

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the rules below for this host.

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

## Local Fusion profile settings

<SettingLocation uri="ayon+settings://fusion/copy_fusion_settings" scope="Studio, with project overrides" />

A local copy of the Fusion profile that AYON launches use, so the pipeline preferences do not change the artist's own profile.

<!-- screenshot: settings editor, Local Fusion profile settings -->

<Settings>
<Setting name="Local Fusion profile directory" default="~/.openpype/hosts/fusion/profiles">

Folder that holds the Fusion profile used for AYON launches. It may be left empty.

</Setting>
<Setting name="Copy profile on first launch" default="Disabled">

On the first launch, copies the contents of the existing Fusion profile into that folder.

</Setting>
<Setting name="Resync profile on each launch" default="Disabled">

Copies the profile again on every launch, even when the folder already exists.

</Setting>
</Settings>

## Hooks

<SettingLocation uri="ayon+settings://fusion/hooks" scope="Studio, with project overrides" />

Pre-launch hooks that prepare Fusion for AYON.

<!-- screenshot: settings editor, Hooks -->

<Settings>
<Setting name="Set AYON Fusion MasterPrefs" default="Set AYON master prefs (override)">

How the AYON MasterPrefs file is applied. It sets the `Config:` path map to include `$(AYON_FUSION_ROOT)/deploy/ayon` and forces Python 3. Fusion MasterPrefs can be stacked, and the later one wins when two set the same preference. The options are:

- **Set AYON master prefs (override)**
- **Append to existing master prefs (AYON pref is strongest)**
- **Prepend to existing master prefs (AYON pref is weakest)**
- **Do not set (unmanaged)**

When the AYON preferences are weaker than other MasterPrefs or are not set, the administrator must make sure the path map still points to AYON.

</Setting>
<Setting name="Install PySide2" default="Enabled">

With **Enabled** on, installs a Qt binding into the Python of Fusion when none is found.

</Setting>
<Setting name="Launch AYON Menu on Fusion Start" default="Disabled">

With **Enabled** on, opens the AYON menu when Fusion starts. Supported for Fusion 18 and newer.

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://fusion/create" scope="Studio, with project overrides" />

The two Saver creators. They share most fields.

<!-- screenshot: settings editor, Creator plugins -->

### Create Saver

<SettingLocation uri="ayon+settings://fusion/create/CreateSaver" />

Creator for the `render` product type (image sequence).

<Settings prefix="create-saver">
<Setting name="Temporary rendering path template" default="{workdir}/renders/fusion/{product[name]}/{product[name]}.{frame}.{ext}">

Where the Saver writes its files while rendering.

</Setting>
<Setting name="Default variants" default="Main, Mask">

The variants offered by default.

</Setting>
<Setting name="Instance attributes" default="Reviewable, Farm rendering">

**Reviewable** makes new instances reviewable by default. **Farm rendering** adds **Farm rendering** to the render targets of the creator.

</Setting>
<Setting name="Output Image Format" default="exr">

**exr**, **tga**, **png**, **tif**, **jpg** or **dpx**.

</Setting>
<Setting name="Default Render Target" default="Local machine rendering">

**Local machine rendering**, **Use existing frames** or **Farm rendering**.

</Setting>
<Setting name="Default frame range source" default="Current context">

**Current context**, **From render in/out**, **From composition timeline** or **Custom frame range**.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI.

</Setting>
</Settings>

### Create Image Saver

<SettingLocation uri="ayon+settings://fusion/create/CreateImageSaver" />

Creator for the `image` product type (single image). It has the same fields as [Create Saver](#create-saver), with these differences:

<Settings prefix="create-image-saver">
<Setting name="Temporary rendering path template" default="{workdir}/renders/fusion/{product[name]}/{product[name]}.{ext}">

Same as for Create Saver, without a frame number.

</Setting>
<Setting name="Default rendered frame" default="0">

The frame that new image instances render. It replaces **Default frame range source**.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://fusion/publish" scope="Studio, with project overrides" />

### Render Local

<SettingLocation uri="ayon+settings://fusion/publish/FusionRenderLocal" />

The plugin that renders in the current Fusion session.

<!-- screenshot: settings editor, Publish plugins -->

<Settings prefix="render-local">
<Setting name="Suppress Fusion dialogs" default="Enabled">

Suppresses the Fusion *Render Completed* and *Render Failed* dialogs.

</Setting>
</Settings>

## Related

- [Fusion addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
