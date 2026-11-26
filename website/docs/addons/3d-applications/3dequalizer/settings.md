---
title: 3DEqualizer addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON 3DEqualizer addon with their default values: the heartbeat interval and the creator plugins."
addon: equalizer
addon_repo: ayon-equalizer
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-equalizer/tree/0.2.2/server
---

# 3DEqualizer addon settings

<AddonInfo />

The settings of the [3DEqualizer addon](index.md) are in **Studio settings > 3DEqualizer**, and can be overridden per project in **Project settings > 3DEqualizer**. Pasting a location below into the URI bar of the web app opens that setting. How studio values, project overrides and addon versions combine is described in [Settings](../../../ayon/how-ayon-works/settings.md).

The addon has no publish plugin settings. The options of the Maya script extractor (hide reference frame, export UV textures, overscan and units) are set per instance in the Publisher and start with the built-in defaults.

## General

<SettingLocation uri="ayon+settings://equalizer/heartbeat_interval" scope="Studio, with project overrides" />

How often 3DE hands control to the AYON tools, which run in Qt inside 3DE. A lower value makes the AYON windows more responsive and costs more processing time.

<!-- screenshot: settings editor, Heartbeat Interval -->

<Settings>
<Setting name="Heartbeat Interval" default="100">

Interval in milliseconds at which control is passed to the Qt UI: 100 means 10 times per second. The recommended range is 50 to 100 (20 to 10 times per second). The value is passed to 3DE as the `AYON_TDE4_HEARTBEAT_INTERVAL` environment variable when it starts.

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://equalizer/create" scope="Studio, with project overrides" />

The creators of the products described in [Products 3DEqualizer can create](index.md#products-3dequalizer-can-create).

Both creators have a **Product type items** list: product types the creator can make on top of its product base type, each shown as its own entry in the Publisher's create list. See [Product type, variant and product name](../../../pipeline/product-types.md#product-type-variant-and-product-name).

<!-- screenshot: settings editor, Creator plugins -->

<Settings>
<Setting name="Create Match Move data">

Creates `matchmove` products.

<Settings>
<Setting name="Enabled" default="Enabled">

Offer the creator in the Publisher.

</Setting>
<Setting name="Default Variants" default="CameraTrack, ObjectTrack, PointTrack, Stabilize, SurveyTrack, UserTrack">

Variants offered for new instances.

</Setting>
<Setting name="Product type items" default="Empty list">

<Settings>
<Setting name="Product type">

Name of the product type.

</Setting>
<Setting name="Label">

How the Publisher shows the product type.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Create Lens Distortion data">

Creates `lensDistortion` products.

<Settings>
<Setting name="Product type items" default="Empty list">

Same fields as for **Create Match Move data**.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [3DEqualizer addon](index.md)
- [Product types](../../../pipeline/product-types.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
