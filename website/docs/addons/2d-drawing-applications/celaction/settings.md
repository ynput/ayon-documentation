---
title: CelAction addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON CelAction addon with their default values: color management, workfile submission overrides and the Collect Render Path publish plugin."
addon: celaction
addon_repo: ayon-celaction
addon_version: 0.2.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-celaction/tree/0.2.5/server
  - https://help.ayon.app/en/articles/7553962-celaction-addon-settings
---

# CelAction addon settings

<AddonInfo />

The settings of the [CelAction addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Color management (ImageIO)

Settings location: `ayon+settings://celaction/imageio`.

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Master switch for AYON's global color management in this host. |
| File Rules > Activate Host Rules | Off | Turns on the file rules of this host. |
| File Rules > Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Workfile

Settings location: `ayon+settings://celaction/workfile`.

| Setting | Default | Description |
|---|---|---|
| Submission workfile overrides | `render_chunk`, `frame_range`, `resolution` | Which values CelAction's submit command passes on to the publish: **Pass chunk size** (`render_chunk`), **Pass frame range** (`frame_range`) and **Pass resolution** (`resolution`). A value that is not listed is not passed, and the folder's value is used instead. |

## Publish plugins

### Collect Render Path

Settings location: `ayon+settings://celaction/publish/CollectRenderPath`. Defines where the rendered images and the metadata job file of a farm render go.

| Setting | Default | Description |
|---|---|---|
| Output render file extension | `png` | Extension of the rendered image files. |
| Anatomy template key: render files | `render` | Name of the `publish` anatomy template used for the rendered files. |
| Anatomy template key: metadata job file | `render` | Name of the `publish` anatomy template used for the folder of the AYON metadata JSON file of farm submissions. |
