---
title: xStudio addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON xStudio addon: the enable switch and the xStudio executable paths for each platform. The addon has not been released yet."
addon: xstudio
addon_repo: ayon-xstudio
addon_version: 0.0.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-xstudio
---

# xStudio addon settings

<AddonInfo />

The settings of the [xStudio addon](index.md), with the default values on the default branch. The addon has not been released yet, so they may change. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the addon on or off. |

## xStudio paths

Paths of the xStudio executable, as a list for each platform. The addon uses the first path of the list for the current platform that exists on the machine. When none exists, the **Open in xStudio** action is not offered.

| Setting | Default | Description |
|---|---|---|
| Windows | `C:\Program Files\xSTUDIO.exe` | Candidate paths on Windows. |
| Linux | Empty | Candidate paths on Linux. |
| MacOS | `/Applications/xSTUDIO.app/Contents/MacOS/xstudio.bin` | Candidate paths on macOS. |
