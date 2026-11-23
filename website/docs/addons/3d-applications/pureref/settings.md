---
title: PureRef addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON PureRef addon with their default values: the options of the Extract Image publish plugin."
addon: pureref
addon_repo: ayon-pureref
addon_version: 0.1.0
addon_scope: pipeline-server
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-pureref/tree/0.1.0/server
---

# PureRef addon settings

<AddonInfo />

The settings of the [PureRef addon](index.md) are in **Studio settings > PureRef**, and can be overridden per project in **Project settings > PureRef**. Pasting a location below into the URI bar of the web app opens that setting. How studio values, project overrides and addon versions combine is described in [Settings](../../../ayon/how-ayon-works/settings.md). The addon has one settings group, **Publish**. The creators and the other publish plugins have no settings.

## Publish: Extract Image

<SettingLocation uri="ayon+settings://pureref/publish/ExtractImage" scope="Studio, with project overrides" />

Defaults of the Extract Image plugin, which exports the board of the workfile as the image of an `image` product (see [Publishing](index.md#publishing)). The Publisher shows the resolution and the three on/off options per instance, starting from these values; the image extension is used as set here.

<!-- screenshot: settings editor, Extract Image -->

<Settings>
<Setting name="Image extension" default="png">

File format of the exported image: **bmp**, **jpg** or **png**.

</Setting>
<Setting name="Resolution width" default="1920">

Width of the exported image in pixels.

</Setting>
<Setting name="Resolution height" default="1080">

Height of the exported image in pixels.

</Setting>
<Setting name="Canvas background" default="Disabled">

Include the canvas background of PureRef in the exported image.

</Setting>
<Setting name="Image borders" default="Disabled">

Include the image borders in the exported image.

</Setting>
<Setting name="Include children" default="Disabled">

Include child items in the exported image.

</Setting>
</Settings>

:::caution
In version 0.1.0 the values of **Canvas background**, **Image borders** and **Include children** do not reach the export command, which always runs with the three options off.
:::

## Related

- [PureRef addon](index.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
