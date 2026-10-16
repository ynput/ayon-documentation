---
title: 3rd party binaries addon settings
sidebar_label: Settings
description: "Settings of the 3rd party binaries addon (ayon_third_party): download or custom paths and launch arguments for ffmpeg and OpenImageIO."
addon: ayon_third_party
addon_repo: ayon-third-party
addon_version: 1.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-third-party/tree/1.4.1
---

# 3rd party binaries addon settings

<AddonInfo />

The addon has two settings groups, one per tool set. Both have the same shape. How they are applied is described on the [overview page](index.md). See also settings and scopes (planned): [settings](../../../ayon/backend/settings/index.md).

## FFmpeg

| Setting | Default | Description |
|---|---|---|
| **Download ffmpeg from server** | On | Use the ffmpeg build stored in the addon package. When off, one of the custom options below must be used. |
| **Custom root** | Empty lists | Per platform (**Windows**, **Linux**, **MacOS**): a list of folders where ffmpeg binaries are found. Used only when download is off. Environment variables can be written as `{VARIABLE}`. |
| **Custom arguments** | Empty lists | Command lines used to launch each tool, tried before the custom roots. Used only when download is off. |

**Custom arguments** has one list per tool: **Tool 'ffmpeg'** and **Tool 'ffprobe'**. Each list item has an **Arguments** list of strings, which is the command with its leading arguments (for example an executable path, or a wrapper command and the executable). An item is used when running it with `-version` succeeds.

## OpenImageIO

| Setting | Default | Description |
|---|---|---|
| **Download OpenImageIO from server** | On | Use the OpenImageIO build stored in the addon package. When off, one of the custom options below must be used. |
| **Custom root** | Empty lists | Per platform (**Windows**, **Linux**, **MacOS**): a list of folders where OpenImageIO binaries are found. Used only when download is off. |
| **Custom arguments** | Empty lists | Command lines used to launch each tool, tried before the custom roots. Used only when download is off. |

**Custom arguments** has one list per tool, with the same **Arguments** item as above. An item is used when running it with `--help` succeeds.

| Tool | Title in the settings UI |
|---|---|
| `oiiotool` | **\*Tool 'oiiotool'** |
| `maketx` | **\*Tool 'maketx'** |
| `iv` | **Tool 'iv'** |
| `iinfo` | **Tool 'iinfo'** |
| `igrep` | **Tool 'igrep'** |
| `idiff` | **Tool 'idiff'** |
| `iconvert` | **Tool 'iconvert'** |

The asterisk in the titles of `oiiotool` and `maketx` is part of the title.
