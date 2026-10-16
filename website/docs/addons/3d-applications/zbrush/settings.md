---
title: Zbrush addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Zbrush addon with their default values: stopping the timer on exit and the creator plugins."
addon: zbrush
addon_repo: ayon-zbrush
addon_version: 0.4.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-zbrush/tree/0.4.2/server/settings
  - https://help.ayon.app/en/articles/9376182-zbrush-addon-settings
---

# Zbrush addon settings

<AddonInfo />

The settings of the [Zbrush addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Stop timer on application exit | Off | Stops the running timer of the Timers Manager when Zbrush closes. Has an effect only when the Timers Manager addon is installed. |

## Create plugins

One entry, **Create Model**.

| Setting | Default | Description |
|---|---|---|
| Product type items | None | Optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. |

The addon has no settings for its publish plugins, so the validator is configured only by its optional state in the Publisher.
