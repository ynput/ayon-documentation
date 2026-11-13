---
title: BatchIngest addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON BatchIngest addon with their default values: presets with representation rules, product rules and ignored path patterns."
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

# BatchIngest addon settings

<AddonInfo />

The settings of the [BatchIngest addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The addon has one setting, **Presets** (`presets`, URI `ayon+settings://batchingest/presets`). Each preset is a named rule set that the **Batch Ingest** creator offers in its **Preset** field. The default list has one preset named `default`. A preset holds its own representation and product rules, so different kinds of deliveries can use different presets.

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Name offered in the creator. |
| Representations | 15 definitions, see below | The kinds of files the preset knows. |
| Products | 6 definitions, see below | The products files can be published as. |
| Ignored path patterns | `(^\|/)\.` | Regexes searched in the file path relative to the dropped folder. Matching files and folders are skipped. The default skips names that start with a dot. |

## Representations

Each representation definition describes one kind of file. A file takes the first definition, top to bottom, that matches both its extension and its file pattern, so specific patterns belong above general ones.

| Setting | Default | Description |
|---|---|---|
| Name | per definition | Representation name given to matching files. |
| Extensions | per definition | Extensions with a leading dot, such as `.exr`. Empty accepts any extension. |
| File pattern | empty | Regex searched in the path relative to the dropped folder, to tell files of one extension apart, for example by folder (`(^\|/)edit/`) or by file suffix (`_h264burnin`). Empty matches all files. |
| Reviewable | Off | Marks the representation as reviewable when published. |

Default definitions:

| Name | Extensions | Reviewable |
|---|---|---|
| `exr` | `.exr` | Off |
| `dpx` | `.dpx` | Off |
| `tiff` | `.tif`, `.tiff` | Off |
| `jpg` | `.jpg`, `.jpeg` | Off |
| `review` | `.mov`, `.mp4` | On |
| `video` | `.mxf`, `.avi`, `.wmv` | Off |
| `abc` | `.abc` | Off |
| `fbx` | `.fbx` | Off |
| `nk` | `.nk` | Off |
| `ma` | `.ma` | Off |
| `mb` | `.mb` | Off |
| `hip` | `.hip` | Off |
| `sfx` | `.sfx` | Off |
| `mocha` | `.mocha` | Off |
| `psd` | `.psd` | Off |

None of the default definitions has a file pattern.

## Products

Product definitions are checked from the top. The first one that matches and accepts all files of a group is used.

| Setting | Default | Description |
|---|---|---|
| Name | per definition | Name of the definition. |
| Product base type | per definition | Product base type of the created instance. |
| File pattern | empty, except `model` | Regex searched in the path relative to the dropped folder. Empty matches all files. |
| Representations | per definition | Accepted representations. Each has **Representation** (the name of a representation of the preset) and **Required** (warn when the product has none; default Off). An empty list accepts any file. |

Default definitions:

| Name | Product base type | File pattern | Accepted representations |
|---|---|---|---|
| `model` | `model` | `(^\|/)fbx/` | `fbx` |
| `reference` | `reference` | empty | `review`, `video` |
| `render` | `render` | empty | `exr`, `dpx`, `tiff`, `jpg`, `review` |
| `pointcache` | `pointcache` | empty | `abc` |
| `camera` | `camera` | empty | `abc`, `fbx` |
| `workfile` | `workfile` | empty | `nk`, `ma`, `mb`, `hip`, `sfx`, `mocha`, `psd` |

No default representation is required.
