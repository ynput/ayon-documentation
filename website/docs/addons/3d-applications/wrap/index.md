---
title: Wrap addon
sidebar_label: Overview
description: "The AYON integration for Faceform Wrap: template workfiles with placeholders that load AYON products, and semi-manual publishing of Wrap workfiles through the Tray Publisher. The addon has not been released yet."
addon: wrap
addon_repo: ayon-wrap
addon_version: 0.0.3-dev.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-wrap
  - https://help.ayon.app/en/articles/1462992-working-with-wrap-in-ayon
  - https://help.ayon.app/en/articles/0840796-wrap-addon-settings
---

# Wrap addon

<AddonInfo />

The Wrap addon connects Faceform Wrap, a topology transfer tool, to AYON. Wrap has no Python API, so the integration runs outside the application: it opens template workfiles, fills them with products from AYON before Wrap starts, and publishes saved Wrap workfiles through the Tray Publisher. Its settings are described on the [settings page](settings.md).

:::note Unreleased
The addon has not been released yet. The current development version is `0.0.3-dev.1`.
:::

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.3.0 or newer |
| Applications addon | 0.2.0 or newer; defines the Wrap executables that the AYON Launcher starts |
| Tray Publisher addon | Hosts the Wrap creator and publish plugins |
| Wrap | A command line executable `WrapCmd` next to the Wrap executable, used to compute nodes during publishing |

The addon has no external dependencies. It handles `.wrap` workfiles.

## Launching Wrap

Launching Wrap through the AYON Launcher runs these hooks in order.

| Order | Hook | What it does |
|---|---|---|
| 10 | Multiple templates | When a [multiple templates profile](settings.md#multiple-templates-per-task) matches the task, shows a Workfiles dialog where the artist picks a template workfile. Launch fails when the chosen file does not exist. |
| 20 | Launch arguments | Starts Wrap through an AYON Python script, with the workfile path as argument. |
| 25 | Replace placeholders | Resolves the placeholders of the workfile, see [placeholders](#load-placeholders). |

Before Wrap opens, the Scene Inventory is shown with the products that the placeholders loaded. Wrap starts when that window is closed.

Template workfiles for a task come from the [workfile builder settings](settings.md#workfile-builder), which the core workfile logic applies. Only the first workfile version is created from a template.

## Load placeholders

A Read node is controlled by AYON when its **File name** parameter starts with `AYON.`. The value has the format `AYON.<folder>.<product>.<version>.<extension>`.

| Part | Meaning |
|---|---|
| `AYON` | Fixed prefix that marks the placeholder. |
| `<folder>` | `{currentFolder}` for the folder of the launch context. |
| `<product>` | The product name, for example `modelMain`. |
| `<version>` | `{latest}`, `{hero}`, or an integer version number. |
| `<extension>` | The name of the representation to load, for example `abc`. |

For example, `AYON.{currentFolder}.modelMain.{latest}.abc` loads the latest `abc` representation of `modelMain` from the current folder. Each placeholder is replaced by the path of the representation when the workfile is opened, and the loaded items are recorded in the workfile in an `AYON_NODE_METADATA` entry, which AYON needs and must stay in the file. Items that were already resolved are updated on later launches. When a placeholder cannot be resolved, for example because the product or representation is missing, a warning is logged and the node keeps its value.

Write nodes named with the `AYON_` prefix have a version in their output path updated to the version of the workfile: a `{version}` token, or an existing `v###` pattern.

## Products Wrap can create

Publishing is semi-manual: the artist saves the Wrap workfile and creates instances from it in the Tray Publisher with the **Wrap** creator. The creator reads the workfile and makes one instance for each write node whose name starts with `AYON_`, plus one workfile instance.

A write node name has the form `AYON_<productName>_<extension>`, for example `AYON_modelMain_abc`. The name must have exactly three parts separated by `_`, and the product name must start with a product type listed below, which decides the product type of the instance.

| Creator | Product type | Used for |
|---|---|---|
| Wrap model | `model` | Product names starting with `model` |
| Wrap dataTransform | `dataTransform` | Product names starting with `dataTransform` |
| Wrap dataPD | `dataPD` | Product names starting with `dataPD` |
| Wrap render | `render` | Product names starting with `render` |
| Wrap image | `image` | Product names starting with `image` |
| Wrap workfile | `workfile` | The workfile itself, created for each workfile |

## Publishing

| Plugin | What it does |
|---|---|
| Collect Wrap Unique Products | Instances that share a product name, for example writers with different output extensions, are merged into the first one as extra representations. |
| Collect Executable Path | Finds the installed Wrap executable from the applications settings. |
| Collect Wrap Workfile | Adds the workfile as a representation of the workfile instance. |
| Extract Compute Nodes | Sets the timeline of the workfile to the frame range of the folder and sets the output path of each `AYON_` node. It then computes the workfile with `WrapCmd compute` and publishes the files written by each node as representations. |
| Increment Workfile (optional) | Saves a copy of the workfile with the next version number after a successful publish. |

All write nodes of the workfile are computed whenever the workfile is published, because Wrap cannot compute a single node. A `{version}` token in the **File name** of a write node keeps the output of each run in its own folder. When the output path starts with `$PROJECT_DIR`, the files are written beside the workfile, otherwise to a temporary folder.

## Loading

The addon has one loader, **Load file**, for the product types `image`, `plate`, `render`, `prerender`, `review` and `model`. It cannot load a product by itself: loading is done by the placeholders. It handles the Scene Inventory, where the artist can change the version of a loaded item.

## Related

- [Wrap settings](settings.md)
- [Tray Publisher](../../essentials/traypublisher/index.md)
