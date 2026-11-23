---
title: Premiere Pro addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Premiere Pro addon with their default values: the automatic installation of the AYON extension."
addon: premiere
addon_repo: ayon-premiere
addon_version: 0.2.3
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-premiere/tree/0.2.3/server
---

# Premiere Pro addon settings

<AddonInfo />

The settings of the [Premiere Pro addon](index.md) are in **Studio settings > Premiere**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The addon has a single setting.

## Extension installation

<SettingLocation uri="ayon+settings://premiere/auto_install_extension" scope="Studio, with project overrides" />

Whether the AYON extension is installed when Premiere Pro starts from the AYON Launcher. Turn it off when the studio deploys the extension another way.

<!-- screenshot: settings editor, Install AYON Extension -->

<Settings>
<Setting name="Install AYON Extension" default="Enabled">

Runs a pre-launch hook that extracts `extension.zxp` into the CEP extensions folder of the user (`Adobe/CEP/extensions/io.ynput.PPRO.panel` below the user data directory). If the extension is already there with the same bundle version, nothing changes; if the version differs, the old copy is removed and the shipped one is installed.

</Setting>
</Settings>

## Related

- [Premiere Pro addon](index.md)
