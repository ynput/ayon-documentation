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
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/7585314-advanced-burnins
---

# Premium burnins addon settings

<AddonInfo />

The settings of the [Premium burnins addon](index.md) are project settings with studio defaults, all under **Publish**; the settings path is `premium_burnins/publish/PremiumExtractBurnin`. See also [settings and scopes (planned)](../../../ayon/backend/settings/index.md).

## Premium Extract Burnin

| Setting | Default | Description |
|---|---|---|
| **Enabled** | On | Turns the extractor on or off. |
| **Profiles** | One profile (see below) | List of profiles. The profile that best matches the instance is used. |

## Profile

Each profile has filters and a list of burnin definitions. An empty filter list matches everything.

| Setting | Default | Description |
|---|---|---|
| **Host names** | Empty | Host names (applications) the profile applies to. |
| **Product types** | Empty | Product types the profile applies to (matched against the base product type). |
| **Product names** | Empty | Product names the profile applies to. |
| **Task types** | Empty | Task types the profile applies to. |
| **Task names** | Empty | Task names the profile applies to. |
| **Burnins** | One definition named `Burnin` | List of burnin definitions. Names must be unique within the profile. Each definition produces one output representation. |

The default profile has all filters empty, so it matches every `review` instance that has a representation tagged `burnin`.

## Burnin definition

| Setting | Default | Description |
|---|---|---|
| **Name** | `Burnin` | Suffix added to the output file names and, with several definitions, to the representation name. |
| **Default Style Options** | See below | Style used by items that inherit. |
| **Top** | See below | Bar at the top of the frame. |
| **Bottom** | See below | Bar at the bottom of the frame. |

### Default Style Options

| Setting | Default | Description |
|---|---|---|
| **Alignment** | Center | One of Top-Left, Top-Center, Top-Right, Center-Left, Center, Center-Right, Bottom-Left, Bottom-Center, Bottom-Right. |
| **Margins** | 0.0 | Margin ratio, 0 to 1. |
| **Background color enabled** | On | Draw the background color behind the bars. |
| **Background color** | `#0000009B` (black, semi-transparent) | RGBA color. The alpha channel sets the opacity. |
| **Font color** | `#ffffffff` | RGBA color of the text. |
| **Font size** | 0.9 | Font size as a ratio of the bar height. |
| **Font filepath** | Empty | Font file, with separate paths for Windows, Linux and MacOS. |

### Top and Bottom bars

| Setting | Default | Description |
|---|---|---|
| **Height** | 0.1 | Bar height as a ratio of the video height, 0 to 1. For a 1080 px high video, 0.1 gives 108 px. |
| **Items** | Three items per bar | Ordered list of items. |

Default top items: a text `{yy}-{mm}-{dd}`, a spacer, and a text `{anatomy[version]}`. Default bottom items: texts `{username}`, `{folder[name]}` and `{frame_start}-{current_frame}-{frame_end}`. Every default item has stretch 1.

### Item

| Setting | Default | Description |
|---|---|---|
| **Type** | Text | Text, Image or Spacer. Only the group for the selected type is used. |

#### Text item

| Setting | Default | Description |
|---|---|---|
| **Text** | Empty | Text with template variables in braces (see [template variables](index.md#template-variables)). |
| **Stretch** | 1 | Relative width, 1 to 999999. |
| **Style option** | All inherit | For Alignment, Margins, Font color, Font size and Font filepath, choose **Inherit** or **Override**. Override values: Alignment override (Center), Margins override (0.0), Font color override (`#ffffffff`), Font size override (1.0), Font filepath override (empty). |

#### Image item

| Setting | Default | Description |
|---|---|---|
| **Path to image** | Empty | Image path with separate Windows, Linux and MacOS values. |
| **Stretch** | 1 | Relative width. |
| **Style option** | All inherit | Alignment and Margins, each **Inherit** or **Override** (Alignment override Center, Margins override 0.0). |

#### Spacer item

| Setting | Default | Description |
|---|---|---|
| **Stretch** | 1 | Relative width of the empty space. |
