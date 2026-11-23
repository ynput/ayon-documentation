---
title: DJV player addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON DJV player addon: the enable switch and the DJV executable paths for each platform."
addon: djv
addon_repo: ayon-djv
addon_version: 1.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-djv/tree/1.2.0/server
---

# DJV player addon settings

<AddonInfo />

The settings of the [DJV player addon](index.md) are in **Studio settings > DJV**; the enable switch can also be overridden in **Project settings > DJV**. Pasting a location below into the URI bar of the web app opens that setting. DJV itself is not shipped with the addon: it has to be installed on each machine at one of the paths listed here.

## General

<SettingLocation uri="ayon+settings://djv/enabled" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Enabled -->

<Settings>
<Setting name="Enabled" default="Enabled">

Turns the addon on or off.

</Setting>
</Settings>

## DJV paths

<SettingLocation uri="ayon+settings://djv/djv_path" scope="Studio only" />

Paths of the DJV executable, as a list for each platform. The addon uses the first path of the list for the current platform that exists on the machine. When none exists, the **Open in DJV** action is not offered. See [Executable lookup](index.md#executable-lookup).

<!-- screenshot: settings editor, DJV paths -->

<Settings>
<Setting name="Windows" default="C:\Program Files\DJV2\bin\djv.exe">

Candidate paths on Windows.

</Setting>
<Setting name="Linux" default="Empty list">

Candidate paths on Linux.

</Setting>
<Setting name="MacOS" default="/Applications/DJV2.app/Contents/MacOS/DJV2">

Candidate paths on macOS.

</Setting>
</Settings>

## Related

- [DJV player addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
