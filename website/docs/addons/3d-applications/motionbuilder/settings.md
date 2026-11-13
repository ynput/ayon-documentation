---
title: Motionbuilder addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Motionbuilder addon, which has one area: the product type items of the Animation creator."
addon: motionbuilder
addon_repo: ayon-motionbuilder
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-motionbuilder/tree/0.2.1/server/settings
  - https://help.ayon.app/en/articles/8914380-configure-motionbuilder-addon
---

# Motionbuilder addon settings

<AddonInfo />

The settings of the [Motionbuilder addon](index.md). The addon has a single settings area. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The addon has no validator or extractor settings. Behaviour such as validators is controlled by the settings of the core addon.

## Create plugins

### Create animation

| Setting | Default | Description |
|---|---|---|
| Product type items | Empty list | Optional list of product types that the Animation creator can create. Each item has a **Product type** (the product type name) and a **Label** (the name shown in the UI; default empty). |

The core creator base class reads this list to offer additional product types besides the creator's own product base type, `animation`.
