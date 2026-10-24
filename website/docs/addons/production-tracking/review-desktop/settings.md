---
title: Review Desktop addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Review Desktop addon with their default values: the application variant filter and the default representation of the Open Review Session action."
addon: review_desktop
addon_repo: ayon-review-desktop
addon_version: 0.0.5
addon_scope: pipeline
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-10-15
---

# Review Desktop addon settings

<AddonInfo />

The settings of the [Review Desktop addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The addon has one settings group, **Actions**, which controls the **Open session on desktop app** action.

## Actions

| Setting | Default | Description |
|---|---|---|
| App Variant Regex | `^openrv/.*$` | Regular expression matched against application variants written as `<app>/<variant>`. Only matching variants are offered by the action. The application name at the start of the expression (here `openrv`) decides which application's variants are read from the Applications addon. When nothing matches, all variants of that application are offered. An empty value falls back to `openrv/.*`. |

## Open Review Session

| Setting | Default | Description |
|---|---|---|
| Enabled | on | Shows the **Open session on desktop app** action on lists. Turning it off removes the action. |
| Default Representation | `^exr$` | List of regular expressions matched against representation names. For each version, the first representation that matches any of the patterns is preselected in the action's representation step. The order of the patterns does not rank them. |
