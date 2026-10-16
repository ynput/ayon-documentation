---
title: Mocha Pro addon settings
sidebar_label: Settings
description: "The settings of the Mocha Pro addon: creator plugin settings for tracking points and shapes, default exporters per Mocha version and product type items."
addon: mocha
addon_repo: ayon-mocha
addon_version: 1.1.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-mocha/tree/1.1.0
  - https://help.ayon.app/en/articles/3864909-mocha-pro-addon-settings
---

# Mocha Pro addon settings

<AddonInfo />

The settings of the [Mocha Pro addon](index.md) configure the creators that appear in the Publisher. All of them sit under **Creator Plugins** (`ayon+settings://mocha/create`). See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Create Tracking Points

Settings key: `create/CreateTrackingPoints`.

| Setting | Default | Description |
|---|---|---|
| **Enabled** | On | Whether users can create `trackpoints` products. |
| **Mocha Pro 2024** > **Default exporters** | Empty list | Tracking exporters pre-selected in the Publisher when Mocha Pro 2024.5 is running. |
| **Mocha Pro 2025** > **Default exporters** | Empty list | Tracking exporters pre-selected when Mocha Pro 2025 is running. |
| **Product Type Items** | Empty list | Optional list of product types the creator can create. Each item has a **Product Type** and a **Label** (shown in the UI). |

## Create Shapes

Settings key: `create/CreateShapeData`.

| Setting | Default | Description |
|---|---|---|
| **Enabled** | On | Whether users can create `matteshapes` products. |
| **Mocha Pro 2024** > **Default exporters** | Empty list | Shape exporters pre-selected when Mocha Pro 2024.5 is running. |
| **Mocha Pro 2025** > **Default exporters** | Empty list | Shape exporters pre-selected when Mocha Pro 2025 is running. |
| **Product Type Items** | Empty list | Optional list of product types the creator can create, as above. |

Each default exporter list offers the exporters of its Mocha version. If the running Mocha version has no matching group, the creator reads the Mocha Pro 2024 list.
