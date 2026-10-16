---
title: Premium burnins addon
sidebar_label: Overview
description: "The Premium burnins addon: a publish plugin that renders configurable top and bottom burnin bars with text, images and spacers onto review videos, its requirements and the template variables it supports."
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

# Premium burnins addon

<AddonInfo />

The Premium burnins addon is a pipeline addon that adds an alternative burnin extractor to the publish process. Burnins are overlays (dates, names, frame counters and similar) drawn onto review videos. Where the burnin extractor of the core addon offers a fixed layout, this addon renders up to two bars, one at the top and one at the bottom of the frame, and each bar is built from a freely ordered list of text, image and spacer items. It has no launcher actions, menus or services; everything it does happens during publishing and is controlled through [settings](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.0.0 or newer |
| AYON server and launcher | No minimum |
| Services | None |

The extractor starts a headless AYON launcher process to run its burnin script, and the script calls `ffmpeg` and `ffprobe`, which the core addon provides.

## Publish plugin

The addon provides one publish plugin.

| Plugin | Label | Runs on | Order |
|---|---|---|---|
| `PremiumExtractBurnin` | Extract burnins (Premium) | Instances of the `review` family | Extractor order + 0.03 |

### When it runs

- It does nothing when the **Profiles** list is empty, or when the instance has no representations.
- It picks the profile that matches the host name, product type (`productBaseType`, falling back to `productType`), product name, task name and task type of the instance, using the profile filtering of the core addon. When no profile matches, or the matching profile has no burnin definitions, the instance is skipped.
- It processes only representations whose `tags` contain `burnin`. Such tags are set by the review output definitions of the publish process, not by this addon.
- If ffmpeg cannot read the representation files directly, they are first converted into a temporary directory. When the need for conversion cannot be determined, the representation is skipped.

### What it produces

For every matching representation the plugin renders one new representation per burnin definition of the profile.

| Aspect | Behavior |
|---|---|
| Output files | The definition **Name** is appended to the source file name. |
| Representation name | When a profile has more than one burnin definition, the name and `outputName` become the previous `outputName` plus `_` plus the definition name. With one definition the names are unchanged. |
| Source representation | Removed from the instance after processing, and its input files are deleted from the staging directory. |
| Tags | The `delete` tag is removed from the new representations. Representations tagged both `delete` and `burnin` are removed from the instance at the end. |
| Frame range | Uses frame start and end including handles, unless the representation has the `no-handles` tag. |
| Slate | The slate frame range starts one frame earlier when the instance has the `slate` family and the representation has the `slate-frame` tag. |

### Burnin layout

Each burnin definition has a **Top** and a **Bottom** bar. A bar has a height given as a ratio of the video height, and an ordered list of items.

| Item type | What it draws |
|---|---|
| Text | A text string with optional template variables. |
| Image | An image file from a multiplatform path. The image is scaled down when it is larger than the bar. |
| Spacer | Empty space. |

Each item has a **Stretch** integer. The width of an item is its stretch divided by the sum of the stretch values of all items in the bar, so items with stretch 1, 2 and 1 take one quarter, one half and one quarter of the width. Text and image items inherit style options (alignment, margins, and for text also font color, font size and font file) from the **Default Style Options** of the definition, or override them per item.

### Template variables

Text items are formatted with the data of the instance. Besides the keys of the anatomy data (for example `{yy}`, `{mm}`, `{dd}`, `{username}`, `{folder[name]}`, `{anatomy[version]}`), the addon adds the following.

| Key | Value |
|---|---|
| `version` | Version number of the publish. |
| `comment` | Publish comment, added only when it is filled. |
| `intent` | Label of the selected publish intent, or empty. |
| `representation` | Name of the processed representation. |
| `camera_name` | Camera name of the representation, when it has one. |
| `frame_start`, `frame_end`, `duration` | Frame range and length (including handles unless `no-handles`). |
| `slate_frame_start`, `slate_frame_end`, `slate_duration` | Same values with the slate frame included. |
| `current_frame` | The frame number of each video frame, evaluated during rendering. |
| `timecode` | Running timecode, evaluated during rendering. |
| `source_timecode` | Timecode read from the source video metadata, when present. |

## Relation to the core burnin extractor

The core addon has its own burnin extractor (**Extract Burnin**). Both extractors operate on representations tagged `burnin`, so a project that uses this addon is expected to enable **Premium Extract Burnin** and disable the core extractor. Otherwise both would process the same representations.

## Related

- [Settings](settings.md)
