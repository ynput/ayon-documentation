---
title: Slater addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Slater addon with their default values: fonts, slate working space and the Extract Slates profiles."
addon: slater
addon_repo: ayon-slater
addon_version: 1.0.6
addon_scope: pipeline
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-18
---

# Slater addon settings

<AddonInfo />

The settings of the [Slater addon](index.md) are in **Studio settings > Slater**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. Two things a slate needs are not Slater settings:

- the slate templates are created and uploaded with the [Slate Editor](index.md#slate-editor);
- slates are added only to representations tagged `slate-frame`, a tag set in the output definitions of **Extract Review** in the [Core addon settings](../../essentials/core/settings.md).

## Fonts

<SettingLocation uri="ayon+settings://slater/fonts" scope="Studio, with project overrides" />

Fonts the slate renderer looks for in these paths when they are not installed on the system.

<!-- screenshot: settings editor, Fonts -->

<Settings>
<Setting name="Fonts" id="fonts-list" default="Empty list">

<Settings>
<Setting name="Font name" default="Empty">

Name used to refer to the font, such as `Arial`.

</Setting>
<Setting name="Font path" default="Empty">

Path to the font file for Windows, Linux and MacOS. It can be rootless, for example starting with `{root[work]}`.

</Setting>
</Settings>

</Setting>
</Settings>

## Slate working space

<SettingLocation uri="ayon+settings://slater/slate_source_colorspace" scope="Studio, with project overrides" />

How the image drawn by the Qt renderer of the slate is interpreted before it is converted to the output colorspace. It should name the colorspace of the OCIO config that represents the usual sRGB look of that image.

<!-- screenshot: settings editor, Slate working space -->

<Settings>
<Setting name="Type" default="Use Colorspace">

Transcoding type: **Use Colorspace** or **Use Display&View**.

</Setting>
<Setting name="Colorspace" default="color_picking">

Colorspace used with **Use Colorspace**.

</Setting>
<Setting name="Display&View" default="default, sRGB">

**Display** and **View** used with **Use Display&View**.

</Setting>
</Settings>

## Extract Slates

<SettingLocation uri="ayon+settings://slater/publish/ExtractGeneratedSlates" scope="Studio, with project overrides" />

Settings of the publish plugin **Generate slates** (`ExtractGeneratedSlates`), which renders slates and adds them to the representations tagged `slate-frame`. The plugin is always optional in the Publisher. What it produces is described in [Publishing](index.md#publishing).

<!-- screenshot: settings editor, Extract Slates -->

<Settings>
<Setting name="Enabled" default="Enabled">

Whether the plugin runs.

</Setting>
<Setting name="Profiles" default="One profile">

Each profile selects the publishes it applies to and lists the slates to generate for them. Empty lists match everything. The default profile applies to the host `traypublisher` and has one slate, `mainSlate`, with the template `ayon_default`, the **Replace Source Representation** flow and an empty families filter.

<Settings>
<Setting name="Host names" default="traypublisher">

Hosts the profile applies to.

</Setting>
<Setting name="Product types" default="Empty list">

Product base types the profile applies to.

</Setting>
<Setting name="Product names" default="Empty list">

Product names the profile applies to; regex is supported.

</Setting>
<Setting name="Slates" default="One slate, mainSlate">

The slates to generate, described in [Slate definition](#slate-definition). Names must be unique in a profile, must not be empty and must not contain a space or any of `< > : " / \ | ? *`. A profile can have only one slate with the **Replace Source Representation** flow.

</Setting>
</Settings>

</Setting>
</Settings>

### Slate definition

<Settings prefix="slate-definition">
<Setting name="Slate name" default="mainSlate (in the default profile)">

Required name of the slate. Used in the generated file name and in representation names.

</Setting>
<Setting name="Slate template" default="ayon_default">

Template stored on the AYON server, chosen from the template files uploaded with the Slate Editor. The addon ships `ayon_default`.

</Setting>
<Setting name="Representation Flow" default="Replace Source Representation">

What happens to the source representation:

- **Replace Source Representation:** the slated output replaces it.
- **Append new with Slate name as Suffix:** a new representation is added, named from the extension of the source, its output name when it has one, and the slate name, as `exr_clientSlate`; the source is kept.
- **Append new with Name Template:** a new representation is added, named with **Representation name template**; the source is kept.

</Setting>
<Setting name="Representation name template" default="{representation[name]}_{slateName}">

Name of the new representation, shown only for **Append new with Name Template**, which requires it to be filled. For example, the default gives `exr_clientSlate` for the representation `exr` and the slate `clientSlate`. Keys: `{representation[name]}`, `{representation[ext]}`, `{representation[outputName]}`, `{slateName}` and `{slateTemplateName}`.

</Setting>
<Setting name="Additional Input filtering">

<Settings>
<Setting name="Families" default="Empty list">

The slate is generated only when one of these families is among the families of the instance, ignoring case. Empty means always. Publish families depend on the integration code, so this filter is meant for TDs.

</Setting>
</Settings>

</Setting>
<Setting name="Studio logo (path)" default="Empty">

Absolute path of a logo image for Windows, Linux and MacOS, passed to the template as the studio logo.

</Setting>
</Settings>

## Related

- [Slater addon](index.md)
- [Slate Editor](index.md#slate-editor)
- [Core addon settings](../../essentials/core/settings.md)
