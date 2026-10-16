---
title: Clockify addon settings
sidebar_label: Settings
description: "Reference of the setting of the AYON Clockify addon: the Clockify workspace name, and where the per-user API key is entered."
addon: clockify
addon_repo: ayon-clockify
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-clockify/tree/0.2.2/server/settings.py
  - https://help.ayon.app/en/articles/0909886-clockify
---

# Clockify addon settings

<AddonInfo />

The settings of the [Clockify addon](index.md). The addon has one setting, available at studio scope only. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Workspace

| Setting | Default | Description |
|---|---|---|
| Workspace name | empty | Name of the Clockify workspace the addon uses. Clockify workspaces are looked up by exact name. While it is empty the addon is disabled. |

## Not a server setting: the API key

The Clockify API key is not stored in AYON settings. Each user enters their own key in the tray (**Clockify** > **Settings**), and it is kept in the AYON secure registry on their machine. The ftrack server action takes it from the `CLOCKIFY_API_KEY` environment variable instead.
