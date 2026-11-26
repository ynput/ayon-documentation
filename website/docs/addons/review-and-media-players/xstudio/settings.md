---
title: xStudio addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON xStudio addon: the enable switch and the xStudio executable paths for each platform. The addon has not been released yet."
addon: xstudio
addon_repo: ayon-xstudio
addon_version: 0.0.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-xstudio
---

# xStudio addon settings

<AddonInfo />

The addon has not been released yet: this page documents version 0.0.1 on its default branch, and the settings may change. The settings of the [xStudio addon](index.md) are in **Studio settings > xStudio**; the enable switch can also be overridden in **Project settings > xStudio**. Pasting a location below into the URI bar of the web app opens that setting. xStudio itself is not shipped with the addon: it has to be installed on each machine at one of the paths listed here.

## General

<SettingLocation uri="ayon+settings://xstudio/enabled" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Enabled -->

<Settings>
<Setting name="Enabled" default="Enabled">

Turns the addon on or off.

</Setting>
</Settings>

## xStudio paths

<SettingLocation uri="ayon+settings://xstudio/xstudio_path" scope="Studio only" />

Paths of the xStudio executable, as a list for each platform. The addon uses the first path of the list for the current platform that exists on the machine. When none exists, the **Open in xStudio** action is not offered. See [Executable lookup](index.md#executable-lookup).

<!-- screenshot: settings editor, xStudio paths -->

<Settings>
<Setting name="Windows" default="C:\Program Files\xSTUDIO.exe">

Candidate paths on Windows.

</Setting>
<Setting name="Linux" default="Empty list">

Candidate paths on Linux.

</Setting>
<Setting name="MacOS" default="/Applications/xSTUDIO.app/Contents/MacOS/xstudio.bin">

Candidate paths on macOS.

</Setting>
</Settings>

## Related

- [xStudio addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
