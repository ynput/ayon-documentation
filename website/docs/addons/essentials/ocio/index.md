---
title: OCIO configs addon
sidebar_label: OCIO configs
description: "The OCIO configs addon (ayon_ocio): it ships the built-in OpenColorIO configs (ACES 2.0, ACES 1.3 and others) with AYON and exposes their location through the BUILTIN_OCIO_ROOT environment variable."
addon: ayon_ocio
addon_repo: ayon-ocio
addon_version: 1.2.2

addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-ocio/tree/1.2.2
  - https://github.com/ynput/ayon-ocio/releases
  - https://help.ayon.app/en/help/articles/1279384-colorspace-settings
---

# OCIO configs addon

<AddonInfo />

The OCIO configs addon (`ayon_ocio`, package title "OCIO Distribution") distributes a set of ready-made [OpenColorIO](https://opencolorio.org/) configs with AYON. It does not add menus, products or tools. Its only job is to make the configs available on every workstation that runs the AYON launcher, and to tell the rest of AYON where they are.

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.3.0 or newer |

The addon can be set to a different version per project (`project_can_override_addon_version` is enabled in `package.py`; this was added in 1.2.2).

## What it provides

| Item | Description |
|---|---|
| Built-in configs | The configs are bundled into the addon's client code, in a folder named `OpenColorIOConfigs`. They are not downloaded by the launcher at run time. |
| `BUILTIN_OCIO_ROOT` | A global environment variable set by the addon. It holds the path to the `OpenColorIOConfigs` folder of the installed addon version. |

The addon package is built by `create_package.py`, which downloads a configs archive (`OpenColorIO-Configs-1.0.2.zip`) and three ACES studio configs from the OpenColorIO-Config-ACES project, verifies their checksums and copies them into the client folder.

## Configs in the package

| Folder | Config file | Source |
|---|---|---|
| `aces_2.0` | `studio-config-v3.0.0_aces-v2.0_ocio-v2.4.ocio` | ACES studio config 3.0.0 (ACES 2.0, OCIO 2.4) |
| `aces_1.3` | `studio-config-v1.0.0_aces-v1.3_ocio-v2.1.ocio` | ACES studio config 1.0.0 (ACES 1.3, OCIO 2.1) |
| `aces_1.3` | `studio-config-v1.0.0_aces-v1.3_ocio-v2.0.ocio` | ACES studio config 1.0.0 (ACES 1.3, OCIO 2.0) |

The `OpenColorIO-Configs-1.0.2.zip` archive is also unpacked into the same folder. The AYON core addon refers to `aces_1.2/config.ocio` and `nuke-default/config.ocio` inside `BUILTIN_OCIO_ROOT`, which come from that archive. ACES 1.3 and 2.0 were added in 1.2.0.

## How the configs are used

The AYON core addon lists the built-in configs as `{BUILTIN_OCIO_ROOT}/...` paths in its color management settings. Because the path uses the environment variable, it resolves to the configs of whichever addon version a workstation has installed. Core publishing also converts a colorspace path that lies inside `BUILTIN_OCIO_ROOT` back into a `{BUILTIN_OCIO_ROOT}/...` template, so published data does not store a machine-specific path.

## Used by other addons

The core addon does not declare this addon as required, but its default color management settings use `{BUILTIN_OCIO_ROOT}/...` paths. Without the addon the variable is not set and those paths cannot be solved. See [dependencies that are not declared](../core/index.md#dependencies-that-are-not-declared).

## Related

The choice of config for a project or application is made in the color management settings of the AYON core addon.
