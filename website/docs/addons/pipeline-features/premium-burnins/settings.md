---
title: Premium burnins addon settings
sidebar_label: Settings
description: "Settings of the Premium burnins addon: the Premium Extract Burnin plugin, its profiles, burnin definitions, default style options and the top and bottom bar items."
addon: premium_burnins
addon_repo: ayon-premium-burnins
addon_version: 0.2.4
addon_scope: pipeline
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-18
---

# Premium burnins addon settings

<AddonInfo />

The settings of the [Premium burnins addon](index.md) are in **Studio settings > Premium burnins**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The core addon has its own **Extract Burnin** plugin, `ayon+settings://core/publish/ExtractBurnin`; disable it where this addon is used, otherwise both process the same representations (see [Relation to the core burnin extractor](index.md#relation-to-the-core-burnin-extractor)).

## Premium Extract Burnin

<SettingLocation uri="ayon+settings://premium_burnins/publish/PremiumExtractBurnin" scope="Studio, with project overrides" />

Burnins rendered onto the review representations tagged `burnin`: a top and a bottom bar with text, images and spacers, with control over opacity and size. When and on what the plugin runs is described in [Publish plugin](index.md#publish-plugin).

<!-- screenshot: settings editor, Premium Extract Burnin -->

<Settings>
<Setting name="Enabled" default="Enabled">

Turns the extractor on or off.

</Setting>
<Setting name="Profiles" default="One profile">

The profile that best matches the instance is used, with the profile filtering of the core addon. The default profile has empty filters, so it matches every `review` instance that has a representation tagged `burnin`.

<Settings>
<Setting name="Host names" default="Empty list">

Hosts (applications) the profile applies to. An empty filter matches everything, as for the other filters.

</Setting>
<Setting name="Product types" default="Empty list">

Matched against the product base type of the instance, or its product type when it has none.

</Setting>
<Setting name="Product names" default="Empty list">

Product names the profile applies to; regex is supported.

</Setting>
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Burnins" default="One definition, Burnin">

The burnin definitions of the profile, described in [Burnin definition](#burnin-definition). Each produces one output representation; names are unique in the profile.

</Setting>
</Settings>

</Setting>
</Settings>

## Burnin definition

<Settings prefix="burnin-definition">
<Setting name="Name" default="Burnin">

Suffix added to the output file names and, when the profile has several definitions, to the representation name.

</Setting>
<Setting name="Default Style Options">

Style used by the items that inherit it, described in [Default Style Options](#default-style-options).

</Setting>
<Setting name="Top">

Bar at the top of the frame, described in [Top and Bottom bars](#top-and-bottom-bars).

</Setting>
<Setting name="Bottom">

Bar at the bottom of the frame.

</Setting>
</Settings>

### Default Style Options

<Settings prefix="default-style-options">
<Setting name="Alignment" default="Center">

**Top-Left**, **Top-Center**, **Top-Right**, **Center-Left**, **Center**, **Center-Right**, **Bottom-Left**, **Bottom-Center** or **Bottom-Right**.

</Setting>
<Setting name="Margins" default="0.0">

Margin ratio of the elements drawn in the items, 0 to 1.

</Setting>
<Setting name="Background color enabled" default="Enabled">

Draw the background color behind the bars.

</Setting>
<Setting name="Background color" default="#0000009B">

RGBA color of the bars; the default is semi-transparent black. The alpha channel sets the opacity.

</Setting>
<Setting name="Font color" default="#ffffffff">

RGBA color of the text.

</Setting>
<Setting name="Font size" default="0.9">

Font size as a ratio of the bar height, 0 to 1.

</Setting>
<Setting name="Font filepath" default="Empty">

Absolute path to a font file on shared storage, with separate paths for Windows, Linux and macOS.

</Setting>
</Settings>

### Top and Bottom bars

<Settings prefix="bar">
<Setting name="Height" default="0.1">

Bar height as a ratio of the video height, 0 to 1. For a 1080 px high video, 0.1 gives 108 px.

</Setting>
<Setting name="Items" default="Three items per bar">

Ordered list of items, drawn from left to right. The default top items are a text `{yy}-{mm}-{dd}`, a spacer and a text `{anatomy[version]}`. The default bottom items are the texts `{username}`, `{folder[name]}` and `{frame_start}-{current_frame}-{frame_end}`. Every default item has stretch 1.

</Setting>
</Settings>

### Item

Each item has a **Type**, and only the group of fields of that type is used. Every type has a **Stretch**, from 1 to 999999: the width of an item is its stretch divided by the sum of the stretch values of all items in the bar, so items with stretch 1, 2 and 1 take one quarter, one half and one quarter of the width.

<Settings prefix="item">
<Setting name="Type" default="Text">

**Text**, **Image** or **Spacer**.

</Setting>
<Setting name="Text">

Used with the **Text** type.

<Settings>
<Setting name="Text" default="Empty">

Text with template variables in braces, see [Template variables](index.md#template-variables).

</Setting>
<Setting name="Stretch" default="1" />
<Setting name="Style option" default="All Inherit">

For each of **Alignment**, **Margins**, **Font color**, **Font size** and **Font filepath**, **Inherit** takes the value of the [Default Style Options](#default-style-options) and **Override** uses the matching override field: **Alignment override** (default **Center**), **Margins override** (0.0), **Font color override** (`#ffffffff`), **Font size override** (1.0) and **Font filepath override** (empty).

</Setting>
</Settings>

</Setting>
<Setting name="Image">

Used with the **Image** type. The image is scaled down when it is larger than the bar; its alpha channel is kept.

<Settings>
<Setting name="Path to image" default="Empty">

Image file, with separate Windows, Linux and macOS paths.

</Setting>
<Setting name="Stretch" default="1" />
<Setting name="Style option" default="All Inherit">

**Alignment** and **Margins**, each **Inherit** or **Override**, with **Alignment override** (default **Center**) and **Margins override** (0.0).

</Setting>
</Settings>

</Setting>
<Setting name="Spacer">

Used with the **Spacer** type: empty space.

<Settings>
<Setting name="Stretch" default="1" />
</Settings>

</Setting>
</Settings>

## Related

- [Premium burnins addon](index.md)
- [Template variables](index.md#template-variables)
