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
verified: 2026-11-18
---

# BatchIngest addon settings

<AddonInfo />

The settings of the [BatchIngest addon](index.md) are in **Studio settings > BatchIngest**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. How the rules group dropped files into products is described in [How files become products](index.md#how-files-become-products).

## Presets

<SettingLocation uri="ayon+settings://batchingest/presets" scope="Studio, with project overrides" />

Named rule sets offered in the **Preset** field of the **Batch Ingest** creator of the Tray Publisher. Each preset holds its own representation and product rules, so different kinds of deliveries can use different presets. The default list has one preset named `default`.

<!-- screenshot: settings editor, Presets -->

<Settings>
<Setting name="Presets" id="presets-list" default="One preset, default">

<Settings>
<Setting name="Name" default="default">

Unique name offered in the creator.

</Setting>
<Setting name="Representations" default="15 definitions">

The kinds of files the preset knows, described in [Representations](#representations).

</Setting>
<Setting name="Products" default="6 definitions">

The products files can be published as, described in [Products](#products).

</Setting>
<Setting name="Ignored path patterns" default="(^|/)\.">

Regexes searched in the file path relative to the dropped folder. Matching files and folders are skipped. The default skips hidden files and folders, whose names start with a dot, such as `.DS_Store`.

</Setting>
</Settings>

</Setting>
</Settings>

## Representations

Each representation definition describes one kind of file. A file takes the first definition, top to bottom, that matches both its extension and its file pattern, so specific patterns belong above general ones. Names are unique in a preset.

<Settings prefix="representations">
<Setting name="Name">

Representation name given to matching files.

</Setting>
<Setting name="Extensions" default="Empty list">

Extensions with a leading dot, such as `.exr`; they are stored in lower case. An empty list accepts any extension.

</Setting>
<Setting name="File pattern" default="Empty">

Regex searched in the path relative to the dropped folder, to tell files of one extension apart, for example by folder (`(^|/)edit/`) or by file suffix (`_h264burnin`). Text matched inside the file name is not part of the product name. Empty matches all files.

</Setting>
<Setting name="Reviewable" default="Disabled">

Marks the representation as reviewable when published.

</Setting>
</Settings>

The default preset has these definitions, none of them with a file pattern:

- `exr`: `.exr`
- `dpx`: `.dpx`
- `tiff`: `.tif`, `.tiff`
- `jpg`: `.jpg`, `.jpeg`
- `review`: `.mov`, `.mp4`, reviewable
- `video`: `.mxf`, `.avi`, `.wmv`
- `abc`: `.abc`
- `fbx`: `.fbx`
- `nk`: `.nk`
- `ma`: `.ma`
- `mb`: `.mb`
- `hip`: `.hip`
- `sfx`: `.sfx`
- `mocha`: `.mocha`
- `psd`: `.psd`

## Products

Product definitions are checked from the top. The first one that matches and accepts all files of a group is used. Names are unique in a preset.

<Settings prefix="products">
<Setting name="Name">

Name of the definition.

</Setting>
<Setting name="Product base type">

Product base type of the created instance.

</Setting>
<Setting name="File pattern" default="Empty">

Regex searched in the path relative to the dropped folder. Empty matches all files.

</Setting>
<Setting name="Representations" default="Empty list">

Accepted representations. An empty list accepts any file.

<Settings>
<Setting name="Representation">

Name of a representation of the preset.

</Setting>
<Setting name="Required" default="Disabled">

Warn when the product has no such representation.

</Setting>
</Settings>

</Setting>
</Settings>

The default preset has these definitions. Each has the product base type of its name, and none of their representations is required:

- `model`: file pattern `(^|/)fbx/`, accepts `fbx`
- `reference`: accepts `review`, `video`
- `render`: accepts `exr`, `dpx`, `tiff`, `jpg`, `review`
- `pointcache`: accepts `abc`
- `camera`: accepts `abc`, `fbx`
- `workfile`: accepts `nk`, `ma`, `mb`, `hip`, `sfx`, `mocha`, `psd`

## Related

- [BatchIngest addon](index.md)
- [How files become products](index.md#how-files-become-products)
