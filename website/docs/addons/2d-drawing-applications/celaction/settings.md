---
title: CelAction addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON CelAction addon with their default values: color management, workfile submission overrides and the Collect Render Path publish plugin."
addon: celaction
addon_repo: ayon-celaction
addon_version: 0.2.5
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-celaction/tree/0.2.5/server
---

# CelAction addon settings

<AddonInfo />

The settings of the [CelAction addon](index.md) are in **Studio settings > CelAction**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The OCIO config that color management uses is set in the core addon; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://celaction/imageio" scope="Studio, with project overrides" />

Whether AYON's color management applies in CelAction, and file rules that assign a colorspace to files by name.

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

## Workfile

<SettingLocation uri="ayon+settings://celaction/workfile" scope="Studio, with project overrides" />

Which values of the CelAction scene the submit command passes on to the publish, instead of the values of the folder.

<!-- screenshot: settings editor, Workfile -->

<Settings>
<Setting name="Submission workfile overrides" default="Pass chunk size, Pass frame range, Pass resolution">

The options are **Pass chunk size**, **Pass frame range** and **Pass resolution**. A value that is not listed is not passed, and the folder's value is used instead.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://celaction/publish" scope="Studio, with project overrides" />

### Collect Render Path

<SettingLocation uri="ayon+settings://celaction/publish/CollectRenderPath" />

Where the rendered images and the metadata job file of a farm render go.

<!-- screenshot: settings editor, Collect Render Path -->

<Settings prefix="collect-render-path">
<Setting name="Output render file extension" default="png">

Extension of the rendered image files.

</Setting>
<Setting name="Anatomy template key: render files" default="render">

Name of the `publish` anatomy template used for the rendered files.

</Setting>
<Setting name="Anatomy template key: metadata job file" default="render">

Name of the `publish` anatomy template used for the folder of the AYON metadata JSON file of farm submissions.

</Setting>
</Settings>

## Related

- [CelAction addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Farm](../../../pipeline/farm.md)
