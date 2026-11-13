---
title: 3DEqualizer addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON 3DEqualizer addon with their default values: the heartbeat interval and the creator plugins."
addon: equalizer
addon_repo: ayon-equalizer
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-equalizer/tree/0.2.2/server
  - https://help.ayon.app/en/articles/0829992-configure-3dequalizer-addon
---

# 3DEqualizer addon settings

<AddonInfo />

The settings of the [3DEqualizer addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Heartbeat Interval | 100 | Interval in milliseconds at which control is passed to the Qt UI. 100 means 10 times per second. The recommended range is 50 to 100 (20 to 10 times per second). The value is exported as the `AYON_TDE4_HEARTBEAT_INTERVAL` environment variable when 3DE starts. |

## Creator plugins

### Create Match Move data

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turn the creator on or off. |
| Default Variants | `CameraTrack`, `ObjectTrack`, `PointTrack`, `Stabilize`, `SurveyTrack`, `UserTrack` | Variants offered for the `matchmove` product. |
| Product type items | None | Optional list of product types the creator can create. Each item has a **Product type** (the name) and a **Label** (how the UI shows it). |

### Create Lens Distortion data

| Setting | Default | Description |
|---|---|---|
| Product type items | None | Optional list of product types the creator can create, with the same structure as above. |

The addon has no publish plugin settings. The options of the Maya script extractor (hide reference frame, export UV textures, overscan and units) are set per instance in the Publisher and start with the built-in defaults.
