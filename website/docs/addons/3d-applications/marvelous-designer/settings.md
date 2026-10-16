---
title: Marvelous Designer addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Marvelous Designer addon with their default values: prelaunch directories, creator plugins, extractors and the point cache loader scale."
addon: marvelous_designer
addon_repo: ayon-marvelous-designer
addon_version: 1.1.4
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-marvelous-designer/tree/1.1.4/server
  - https://help.ayon.app/en/articles/2112433-marvelous-designer-configuration
---

# Marvelous Designer addon settings

<AddonInfo />

The settings of the [Marvelous Designer addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Prelaunch settings

Used by the launch hooks that prepare Marvelous Designer. Each setting holds the path for one operating system only.

| Setting | Default | Description |
|---|---|---|
| Qt Binding Directory | `/Users/Public/Documents/MarvelousDesigner/Configuration/python311/Lib/site-packages` | The `site-packages` directory of Marvelous Designer's Python, where PySide6 is installed. |
| Plugins Directory | `/Users/Public/Documents/MarvelousDesigner/Configuration/Plugins` | The directory that holds `pluginSettings.json`. The AYON plugin entry is added to it. |

## Create

One entry for each of the creators Create Model, Create Point Cache and Create Zfab. The Workfile creator has no settings. Each entry has the same setting.

| Setting | Default | Description |
|---|---|---|
| Product type items | None | Optional list of product types the creator can create. Each item has a **Product type** (the name) and a **Label** (how the UI shows it). |

## Publishers

The extractors share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

| Extractor | Enabled | Optional | Active |
|---|---|---|---|
| Extract Point Cache | On | On | On |
| Extract OBJ | On | On | On |
| Extract FBX | On | On | On |

## Loaders

| Setting | Default | Description |
|---|---|---|
| Load Point Cache: Scale | 1.0 | Scale factor applied when loading point cache data (`.abc`, `.fbx` and `.obj`). |
