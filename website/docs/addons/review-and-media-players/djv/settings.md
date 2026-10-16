---
title: DJV player addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON DJV player addon: the enable switch and the DJV executable paths for each platform."
addon: djv
addon_repo: ayon-djv
addon_version: 1.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-djv/tree/1.2.0/server
  - https://help.ayon.app/en/help/articles/0533566-djv
---

# DJV player addon settings

<AddonInfo />

The settings of the [DJV player addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the addon on or off. |

## DJV paths

Paths of the DJV executable, as a list for each platform. The addon uses the first path of the list for the current platform that exists on the machine. When none exists, the **Open in DJV** action is not offered.

| Setting | Default | Description |
|---|---|---|
| Windows | `C:\Program Files\DJV2\bin\djv.exe` | Candidate paths on Windows. |
| Linux | Empty | Candidate paths on Linux. |
| MacOS | `/Applications/DJV2.app/Contents/MacOS/DJV2` | Candidate paths on macOS. |
