---
title: BatchIngest addon
sidebar_label: Overview
description: "The AYON BatchIngest addon: the Batch Ingest creator of the Tray Publisher that groups files from dropped folders into products using presets, its review window, the collector it adds and its requirements."
addon: batchingest
addon_repo: ayon-batch-ingest
addon_version: 0.3.0
addon_scope: pipeline
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/8591610-batch-ingest
---

# BatchIngest addon

<AddonInfo />

The BatchIngest addon adds a **Batch Ingest** creator to the AYON Tray Publisher. A user drops one or more folders onto it; the addon scans them, groups the files into products and representations according to a named preset from the settings, and shows the result in a window where each product can be edited and enabled. Enabled products are added to the Tray Publisher as instances and are published with its regular **Publish** button. Its settings are described on the [settings page](settings.md).

The addon does not publish files itself, and it has no menu entry, tray action or command line of its own. Publishing through Deadline is not implemented.

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| Required addons | `core` newer than 0.3.2, `traypublisher` 0.4.8 or newer |

## What the addon provides

| Part | Type | Where it runs | What it does |
|---|---|---|---|
| **Batch Ingest** (`ayon.batchingest.global`) | Tray Publisher creator, order 5 | Tray Publisher (`traypublisher` host) | Takes a preset and dropped folders, opens the Batch Ingest window and creates one instance per enabled product. It does not create an instance on its own; its product type `batch_ingest_session` is not stored on any instance. |
| Collect Batch Ingest Representations | Publish collector, order `CollectorOrder + 0.49` | `traypublisher` host | Builds the representations of the instances that the creator made, from the files that the rows point to. |

## Creator

The creator offers these attributes before the window opens.

| Attribute | Description |
|---|---|
| **Preset** | One of the presets from the settings. When none exists, the creator reports that no presets are configured. |
| **Media source folders** | One or more folders, dropped into the field. Only existing folders are accepted; a dropped file is refused. |

The created instances take their product type and base type from the **Product base type** of the matched product definition, and their name from the row.

## How files become products

Rules come from the selected preset (see [settings](settings.md)).

1. Files and folders whose path relative to the dropped folder matches an **Ignored path patterns** regex are skipped.
2. Each remaining file takes the first representation definition, top to bottom, whose extensions and file pattern match. The definition gives the representation name and the **Reviewable** flag. Files that match no definition are counted as unmatched.
3. Files of one dropped folder that share a base name and a version (for example `beauty_v003.1001.exr` and `preview/beauty_v003.mov`) are grouped, also across subfolders. A frame sequence is one representation. Text that a representation file pattern matches in the file name is not part of the product name, so `shot_v001.mp4` and `shot_v001_h264burnin.mp4` land in the same product.
4. For each group, the product definitions are checked from the top. The first product whose file pattern matches and whose accepted representations cover all files of the group is used. A product with no listed representations accepts any file.
5. A version in the file name (such as `_v003`) is used as the version of the product. Without one, the next free version is used.

A product that has no enabled file of a representation marked **Required** gets a warning in the window and can still be added.

## Batch Ingest window

The window opens in front of the Tray Publisher, which cannot be used until the window is closed. It lists the products that were found, each with its representations below. All products start disabled; with more than 20 products the tree starts collapsed.

| Element | Content |
|---|---|
| Summary | Counts of products, representations, enabled products and files that no rule matched (hover shows the list), and the number of products with problems. |
| Product row | **Product Base Type**, **Folder**, **Task**, **Version** and **Comment**, with an editable name cell. |
| Representation row | **Name**, **File**, **Frames** and **Reviewable**, with an editable name cell. |
| Directory to ingest | Another folder can be dropped on this field or on the tree; it replaces the content. |
| **Expand all** / **Collapse all** | Expands or collapses every product. |
| **Add to Publisher** | Adds the enabled products to the Tray Publisher as instances. |

Editing, copying, pasting and enabling apply to all selected rows of the same level and column; products and representations are never mixed. Cells can be copied and pasted with the keyboard shortcuts or with the right-click menu, and the checkbox or the space key toggles all selected rows of a level.

### Row checks

| Marker | Meaning |
|---|---|
| Red icon | An enabled product or representation cannot be added. The reasons: missing folder or task (a task is not required for `plate` products), whitespace in a name, no enabled representation, duplicate representation name, or two products with the same folder, name and version. These problems must be fixed before **Add to Publisher**. A folder or task that is missing on the server shows only a warning. |
| Yellow warning icon | The product lacks a required representation. |

## Publishing

For each representation the collector sets the name from the row and the extension from the file, and marks the representation as a preview. A star in the file path stands for the frame number and is resolved to the files found; the collector raises an error when no file matches. When **Reviewable** is on, the instance gets the `review` family and the representation the `review` tag; for `mp4` and `mov` files it also gets the `webreview` and `passing` tags. The first file becomes the source of the product.

Version 0.3.0 replaces the settings `pattern_to_product_type` and `extensions_to_product_type` with presets. The addon converts saved settings of the earlier layouts, but not the `reviewable` flag of old pattern rules.

## Related

- [BatchIngest addon settings](settings.md)
