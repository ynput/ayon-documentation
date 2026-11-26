---
title: 3rd party binaries addon
sidebar_label: Overview
description: "The 3rd party binaries addon (ayon_third_party): it distributes ffmpeg and OpenImageIO command-line tools from the AYON server to workstations, or points AYON at tools installed by the studio."
addon: ayon_third_party
addon_repo: ayon-third-party
addon_version: 1.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-third-party/tree/1.4.1
  - https://github.com/ynput/ayon-third-party/releases
  - https://help.ayon.app/en/help/articles/2308428-launcher-admin-notes
---

# 3rd party binaries addon

<AddonInfo />

The 3rd party binaries addon (`ayon_third_party`, package title "3rd Party Distribution") supplies the external executables that AYON core needs for image and video processing: [ffmpeg](https://ffmpeg.org/) and [OpenImageIO](https://openimageio.readthedocs.io/). The binaries are stored in the addon package on the AYON server and downloaded to each workstation when needed. Alternatively, the addon can be told to use executables that the studio installs itself. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.1.6 or newer |

The addon version can be set per project (`project_can_override_addon_version` is enabled in `package.py`; added in 1.4.0).

## Tools it supplies

| Group | Tools |
|---|---|
| ffmpeg | `ffmpeg`, `ffprobe` |
| OpenImageIO | `oiiotool`, `maketx`, `iv`, `iinfo`, `igrep`, `idiff`, `iconvert` |

Other code asks the addon for a command through two functions: `get_ffmpeg_arguments(tool_name)` (default tool `ffmpeg`) and `get_oiio_arguments(tool_name)` (default tool `oiiotool`). Each returns the command as a list of arguments, or nothing when no working executable was found. The result is cached per tool for the session.

## Bundled versions

The addon package is built by `create_package.py`, which downloads the archives from `distribute.ynput.io`, verifies their checksums and places them in the server part of the addon. In 1.4.1 the package contains:

| Tool set | Version | Platforms in the package |
|---|---|---|
| ffmpeg | 7.1 | Windows, Linux, macOS (Intel build) |
| OpenImageIO | 3.0.6.1 | Windows, Linux (built on Rocky 8), macOS (x86_64 build) |

`oiiotool` is not supplied for macOS.

## How the executables are resolved

For each tool group the **Download from server** setting selects the mode.

| Mode | Behavior |
|---|---|
| Download from server (default) | The tool is taken from the addon package. The workstation asks the server for the file list of the addon version (`files_info`), downloads the archive for its platform if it has not been downloaded yet, verifies it and extracts it into the addon resources directory under a folder named after the tool, platform and the first 8 characters of the checksum. A marker file records when extraction finished. The resulting path is checked by running the tool (`-version` for ffmpeg, `--help` for OpenImageIO); if that fails, no command is returned. |
| Custom (download disabled) | Tries the **Custom arguments** entries for the tool in order and uses the first that runs. If none works, it searches the **Custom root** folders of the current platform, in order, for an executable with the tool's name and uses the first that runs. Environment variables can be used in a root as `{VARIABLE}`. If nothing works, no command is returned. |

Several processes can start at once: the addon waits for another process that is already downloading or extracting the same archive instead of downloading it twice.

## Download on launch

The addon runs in the AYON tray. When the tray starts and ffmpeg or OpenImageIO is set to download but is not yet extracted, a download window opens and fetches the missing archives. Tools that are requested earlier by other code, for example before the tray started, are downloaded on demand.

## Used by other addons

The core addon does not declare this addon as required, but the helpers that give the FFmpeg and OpenImageIO command lines import it first. See [dependencies that are not declared](../core/index.md#dependencies-that-are-not-declared). The Batch Delivery addon declares it as required.

## Related

- [Settings](settings.md)
