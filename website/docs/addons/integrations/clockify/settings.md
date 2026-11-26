---
title: Clockify addon settings
sidebar_label: Settings
description: "Reference of the setting of the AYON Clockify addon: the Clockify workspace name, and where the per-user API key is entered."
addon: clockify
addon_repo: ayon-clockify
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-clockify/tree/0.2.2/server/settings.py
---

# Clockify addon settings

<AddonInfo />

The setting of the [Clockify addon](index.md) is in **Studio settings > Clockify**. Pasting the location below into the URI bar of the web app opens it. The Clockify API key is not an addon setting: see [the API key](#not-a-server-setting-the-api-key) below.

## Workspace

<SettingLocation uri="ayon+settings://clockify/workspace_name" scope="Studio only" />

The Clockify workspace the addon tracks time in.

<!-- screenshot: settings editor, Workspace name -->

<Settings>
<Setting name="Workspace name" default="Empty">

Name of the Clockify workspace. Workspaces are looked up by exact name. While it is empty, the addon is disabled on the machines and logs a warning. The value is also passed to processes as the `CLOCKIFY_WORKSPACE` environment variable.

</Setting>
</Settings>

## Not a server setting: the API key

The Clockify API key is not stored in AYON settings. Each user enters their own key in the tray (**Clockify** > **Settings**), and it is kept in the AYON secure registry on their machine. The ftrack server action takes it from the `CLOCKIFY_API_KEY` environment variable instead.

## Related

- [Clockify addon](index.md)
- [Timers Manager addon settings](../timers-manager/settings.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
