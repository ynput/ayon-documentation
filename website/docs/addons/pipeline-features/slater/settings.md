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
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7077398-using-slater-addon
---

# Slater addon settings

<AddonInfo />

The settings of the [Slater addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Fonts

A list of fonts the slate renderer can use. Each entry has these fields.

| Setting | Default | Description |
|---|---|---|
| Font name | Empty | Name used to refer to the font. |
| Font path | Empty for Windows, Linux and MacOS | Path to the font file per platform. It can be rootless, for example `{root[work]}`. |

The list is empty by default.

## Slate working space

How the image drawn by the Slate Editor's Qt renderer is interpreted before it is converted to the output colorspace. It should name the colorspace of the OCIO config that represents the usual sRGB look of that image.

| Setting | Default | Description |
|---|---|---|
| Type | Use Colorspace | Transcoding type: **Use Colorspace** or **Use Display&View**. |
| Colorspace | `color_picking` | Colorspace used when the type is **Use Colorspace**. |
| Display&View: Display | `default` | Display used when the type is **Use Display&View**. |
| Display&View: View | `sRGB` | View used when the type is **Use Display&View**. |

## Extract Slates

Settings of the publish plugin **Generate slates** (`ExtractGeneratedSlates`).

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Whether the plugin runs. |
| Profiles | One profile | List of profiles, described below. |

The plugin is always optional in the Publisher. It only touches representations tagged `slate-frame`.

### Profile

A profile selects the publishes it applies to and lists the slates to generate for them. Empty lists match everything.

| Setting | Default | Description |
|---|---|---|
| Host names | `traypublisher` | Host names the profile applies to. |
| Product types | Empty | Product base types the profile applies to. |
| Product names | Empty | Product names the profile applies to. |
| Slates | One slate | List of slate definitions, described below. |

Slate names must be unique within a profile and must not be empty or contain any of the characters space, `< > : " / \ | ? *`. A profile can contain only one slate whose flow is **Replace Source Representation**.

The default profile applies to the host `traypublisher` and contains one slate with an empty families filter.

### Slate definition

| Setting | Default | Description |
|---|---|---|
| Slate name | `mainSlate` (in the default profile) | Name of the slate. Used in the generated file name and in representation names. |
| Slate template | `ayon_default` | Template stored on the AYON server, chosen from the uploaded template files. |
| Representation Flow | Replace Source Representation | What happens to the source representation: **Replace Source Representation**, **Append new with Slate name as Suffix** or **Append new with Name Template**. |
| Representation name template | `{representation[name]}_{slateName}` | Name of the new representation. Shown only for **Append new with Name Template**, which requires it to be non-empty. Keys: `{representation[name]}`, `{representation[ext]}`, `{representation[outputName]}`, `{slateName}`, `{slateTemplateName}`. |
| Additional Input filtering: Families | Empty | The slate is generated only when one of these families is among the instance families (case-insensitive). Empty means always. |
| Studio logo (path) | Empty for Windows, Linux and MacOS | Logo image path per platform, passed to the template as the studio logo. |
