---
title: Open RV addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Open RV addon with their default values: the enable switch, the network connection used by the Open in RV loaders and color management."
addon: openrv
addon_repo: ayon-openrv
addon_version: 1.2.4
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-openrv/tree/1.2.4/server
  - https://help.ayon.app/en/help/articles/6197405-openrv-addon-settings
---

# Open RV addon settings

<AddonInfo />

The settings of the [Open RV addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The executables of Open RV are not set here: they are defined for the `openrv` application group in the Applications addon.

## General

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the addon on or off. |

## Network settings

The connection used by the **Open in RV** and **Open in Existing RV** loaders to talk to a running Open RV on the local machine.

| Setting | Default | Description |
|---|---|---|
| Connection Name | `ayon-rv-connect` | The name the connection identifies itself with. |
| Connection Port | 45124 | The port of Open RV's network interface. |
| Timeout in Seconds | 20 | How long the connection is retried before it fails. |

## Color management (imageio)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Read by the core addon as the switch that activates color management for this host. |

The settings module also defines a model with **Override global OCIO config** and **Config path**, but it is not part of the addon settings in this version.
