---
title: Premiere Pro addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Premiere Pro addon with their default values: the automatic installation of the AYON extension."
addon: premiere
addon_repo: ayon-premiere
addon_version: 0.2.3
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-premiere/tree/0.2.3/server
  - https://help.ayon.app/en/articles/1663762-premiere-addon-settings
---

# Premiere Pro addon settings

<AddonInfo />

The settings of the [Premiere Pro addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The addon has a single setting.

## Extension installation

| Setting | Default | Description |
|---|---|---|
| Install AYON Extension | On | Runs a pre-launch hook that installs the AYON extension into Premiere Pro when Premiere Pro is started from the AYON Launcher. The hook extracts `extension.zxp` into the CEP extensions folder of the user (`Adobe/CEP/extensions/io.ynput.PPRO.panel` below the user data directory). If the extension is already there with the same bundle version, nothing changes; if the version differs, the old copy is removed and the shipped one is installed. |
