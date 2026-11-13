---
title: SpeedTree addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SpeedTree addon with their default values: the Pipeline SDK directory, the custom workfile template and the Model creator."
addon: speedtree
addon_repo: ayon-speedtree
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-speedtree/tree/0.2.1/server
  - https://help.ayon.app/en/articles/9963950-configure-speedtree-addon
---

# SpeedTree addon settings

<AddonInfo />

The settings of the [SpeedTree addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Pipeline SDK directory | `/path/to/bindings/python/python3.9` | The folder of the SpeedTree Pipeline SDK Python bindings, used by the integration. The default is a placeholder and must be replaced. |
| Custom Template Path | Empty | An `.spm` file used as the new project when SpeedTree is launched without a workfile. When empty, or when the file does not exist, the `Blank.spm` of the SpeedTree installation (`tree_templates/Games`) is used. |

The launch hook adds the **Pipeline SDK directory** to Python's site directories and imports `speedtree.SpeedTree` from it, so the folder must be the one that contains the `speedtree` package, that is `bindings/python/python3.9` of the SDK.

## Create plugins

### Create Model

| Setting | Default | Description |
|---|---|---|
| Product type items | Empty list | Optional list of product types that the Model creator can create. Each item has a **Product type** (the product type name) and a **Label** (the name shown in the UI; default empty). |
