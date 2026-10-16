---
title: CelAction addon
sidebar_label: Overview
description: "The AYON integration for CelAction2D: how the application is launched with a workfile and farm submission settings, the publish plugins that collect a workfile and a farm render, and its requirements."
addon: celaction
addon_repo: ayon-celaction
addon_version: 0.2.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-celaction/tree/0.2.5
  - https://github.com/ynput/ayon-celaction/releases
  - https://help.ayon.app/en/articles/7553962-celaction-addon-settings
---

# CelAction addon

<AddonInfo />

The CelAction addon connects CelAction2D, a 2D animation application, to AYON. It has no menu or tools inside the application. It starts CelAction with the right workfile and registry values, and it provides the publish plugins that collect a workfile and a render instance when a scene is submitted for rendering. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer (required) |
| Applications addon | 0.2.0 or newer (compatible); defines the CelAction executables that the AYON Launcher starts |

The launch hook runs on Windows only, and only for local launches.

## Workfiles

| Item | Value |
|---|---|
| Host name | `celaction` |
| Workfile extension | `.scn` |
| Template | If the workfile of the task does not exist yet, a bundled template scene (`celaction_template_scene.scn`) is copied to the workfile path. The workfile is then registered on the AYON server (needs AYON core 1.5.0 or newer). |

The addon sets the environment variable `LOGLEVEL` to `DEBUG` for the application when it is not set already.

## Launch hook

The hook **CelactionPrelaunchHook** prepares CelAction for local launches, before the application starts.

| What it does | Detail |
|---|---|
| Opens the workfile | Adds the workfile path to the launch arguments. A `workfile_path` given in the launch context takes precedence over the last workfile of the task. |
| Output size | Writes the resolution of the folder (`resolutionWidth` and `resolutionHeight`) to the CelAction user settings in the Windows registry, as the custom size of the submit dialog. |
| Submit dialog | Sets CelAction's own submit command to the AYON Launcher running the addon's `publish_cli.py` script, with the scene path and, depending on the [workfile settings](settings.md#workfile), the chunk size, frame range and resolution. The submit dialog is set to save the scene first. |
| Dialogs | Preselects the answers of the overwrite scene and scene saved message dialogs, so that they do not appear. |

## Publishing

Rendering is submitted from CelAction. CelAction's submit command starts the AYON Launcher, which opens the Publisher for the scene with the host `celaction` and the `local` target. The following plugins run.

| Plugin | Type | What it does |
|---|---|---|
| Collect Celaction Cli Kwargs | Collector | Reads `--chunk`, `--frameStart`, `--frameEnd`, `--resolutionWidth`, `--resolutionHeight` and `--currentFile` from the command line and stores them in the publish context. Missing arguments are logged. |
| Collect Celaction Instances | Collector | Creates two instances, a `workfile` and a `render`. Both take frame range, handles, frame rate and resolution from the folder, overridden by the values passed from CelAction. The `workfile` instance has one `scn` representation. The `render` instance is marked for the farm (`render.farm`). Product names come from the product name settings of the project. |
| Collect Render Path | Collector | Resolves the output directory and file path of the rendered images from the `publish` anatomy template named in the settings, with a frame-number placeholder, and creates the directory. It also resolves the folder for the metadata job file when that template exists. |
| Version Up Scene | Integrator, optional | Copies the workfile to the next version and registers it on the AYON server. Applies to the `workfile` product. Optional and active by default. |

The render instance is submitted to the render farm by the Deadline addon (page planned) plugin **Submit CelAction to Deadline**, which uses the Deadline `CelAction` plugin. The AYON CelAction addon itself does not submit jobs.

## Related

- [CelAction settings](settings.md)
