---
title: Royal Render addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Royal Render addon with their default values: enabling the addon, Royal Render root paths and review generation."
addon: royalrender
addon_repo: ayon-royalrender
addon_version: 0.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-royalrender/tree/0.4.1/server
  - https://help.ayon.app/en/articles/6879829-configure-royal-render-addon
---

# Royal Render addon settings

<AddonInfo />

The settings of the [Royal Render addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Enable addon

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the addon on or off. It can be switched per project. |

## Royal Render Root Paths

A list of named RR roots. The default list has one entry named `default` with empty paths.

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Name that the selection refers to. |
| Windows | Empty | RR root path on Windows. |
| Linux | Empty | RR root path on Linux. |
| MacOS | Empty | RR root path on macOS. |

## Selected Royal Render Paths

| Setting | Default | Description |
|---|---|---|
| Selected Royal Render Paths | `default` | Names of the root paths a project uses. For each instance, the first one whose path for the current operating system exists is used. |

## Publish plugins

### Collect Sequences from the Job

| Setting | Default | Description |
|---|---|---|
| Generate reviews from sequences | On | Generate reviews from the file sequences collected from the job. |
