---
title: PureRef addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON PureRef addon with their default values: the options of the Extract Image publish plugin."
addon: pureref
addon_repo: ayon-pureref
addon_version: 0.1.0
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-pureref/tree/0.1.0/server
---

# PureRef addon settings

<AddonInfo />

The settings of the [PureRef addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The addon has one settings area, **Publish**.

## Publish: Extract Image

Defaults of the Extract Image plugin, which publishes `image` products. The Publisher shows the resolution and the three on/off options per instance, starting from these values.

| Setting | Default | Description |
|---|---|---|
| Image extension | `png` | File format of the exported image: `bmp`, `jpg` or `png`. |
| Resolution width | 1920 | Width of the exported image in pixels. |
| Resolution height | 1080 | Height of the exported image in pixels. |
| Canvas background | Off | Default of the **Canvas background** option. |
| Image borders | Off | Default of the **Image borders** option. |
| Include children | Off | Default of the **Include children** option. |

The other publish plugins and the creators have no settings.
