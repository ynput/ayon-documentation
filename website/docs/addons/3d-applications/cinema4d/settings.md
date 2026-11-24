---
title: Cinema4D addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Cinema4D addon with their default values: color management, creator plugins and publish validators."
addon: cinema4d
addon_repo: ayon-cinema4d
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-cinema4d/tree/0.2.1/server
---

# Cinema4D addon settings

<AddonInfo />

The settings of the [Cinema4D addon](index.md) are in **Studio settings > Cinema4D**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The OCIO config itself is not set here: it comes from the color management settings of the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://cinema4d/imageio" scope="Studio, with project overrides" />

How Cinema 4D follows the AYON color management. **Reset Colorspace** in the AYON menu switches the document to OCIO with the config from the core addon and, when **Workfile color management** is enabled, applies its values to the document and to the Redshift render settings.

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

Master switch for the whole section: Cinema 4D follows the global color management.

</Setting>
<Setting name="File Rules">

Rules that assign a colorspace to files by their path.

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the rules below instead of the global file rules of the core addon.

</Setting>
<Setting name="Rules" default="Empty list">

Each rule has a unique name.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace given to matching files.

</Setting>
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Workfile Color Management">

The OCIO values that **Reset Colorspace** sets in the document. Empty values are skipped.

<Settings>
<Setting name="Enabled" default="Disabled">

Apply the values below.

</Setting>
<Setting name="Default render space" default="ACES">

The role of the working space, for example `scene_linear`. Behaves like the `OCIO_RENDER_SPACE` environment variable.

</Setting>
<Setting name="Default active displays" default="ACES">

Colon-separated list of displays, for example `ACES:P3`. Behaves like the `OCIO_ACTIVE_DISPLAYS` environment variable.

</Setting>
<Setting name="Default active views" default="sRGB">

Colon-separated list of views, for example `sRGB:DCDM`. Behaves like the `OCIO_ACTIVE_VIEWS` environment variable.

</Setting>
<Setting name="Thumbnails" default="sRGB">

Colorspace of the thumbnails in the document.

</Setting>
</Settings>

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://cinema4d/create" scope="Studio, with project overrides" />

Turns creators on or off and limits the product types they offer. Every creator has the same two fields:

- **Enabled** (default: enabled): the creator is available in the Publisher.
- **Product type items** (default: empty list): optional list of product types the creator can create. Each item has a **Product type** (the name) and a **Label** (how the UI shows it).

The Workfile creator has no settings.

<!-- screenshot: settings editor, Create plugins -->

<Settings>
<Setting name="Create Render" default="Enabled" />
<Setting name="Create Camera" default="Enabled" />
<Setting name="Create Pointcache" default="Enabled" />
<Setting name="Create Redshift Proxy" default="Enabled" />
<Setting name="Create Review" default="Enabled" />
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://cinema4d/publish" scope="Studio, with project overrides" />

The validators that can be configured. Each has three switches: **Enabled** (the plugin runs), **Optional** (the artist can turn it off in the Publisher) and **Active** (it is on by default in the Publisher). Validate Render Relative Paths and the other publish plugins have no settings.

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Validate Frame Range" default="Enabled, optional, active">

Checks that the publish frame range matches the frame range of the AYON task.

</Setting>
<Setting name="Validate Resolution." default="Enabled, optional, active">

Checks that the publish resolution matches the resolution of the AYON task. The settings editor shows the label with a trailing period.

</Setting>
</Settings>

## Related

- [Cinema4D addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
