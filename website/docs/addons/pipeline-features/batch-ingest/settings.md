---
title: BatchIngest addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON BatchIngest addon with their default values: presets with product and representation rules, ignored path patterns, folder hierarchy from file paths and attributes control."
addon: batchingest
addon_repo: ayon-batch-ingest
addon_version: 0.3.1
addon_scope: pipeline
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-24
---

# BatchIngest addon settings

<AddonInfo />

The settings of the [BatchIngest addon](index.md) are in **Studio settings > BatchIngest**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. How the rules group dropped files into products is described in [How files become products](index.md#how-files-become-products).

## Presets

<SettingLocation uri="ayon+settings://batchingest/presets" scope="Studio, with project overrides" />

Named rule sets offered in the **Preset** field of the **Batch Ingest** creator of the Tray Publisher. Each preset holds its own product rules, so different kinds of deliveries can use different presets. The default list has one preset named `default`.

<!-- screenshot: settings editor, Presets -->

<Settings>
<Setting name="Presets" id="presets-list" default="One preset, default">

<Settings>
<Setting name="Name" default="default">

Unique name offered in the creator.

</Setting>
<Setting name="Products" default="6 definitions">

The products files can be published as, with the representations each accepts, described in [Products](#products).

</Setting>
<Setting name="Ignored path patterns" default="(^|/)\.">

Regexes searched in the file path relative to the dropped folder. Matching files and folders are skipped. The default skips hidden files and folders, whose names start with a dot, such as `.DS_Store`.

</Setting>
<Setting name="Folder hierarchy" default="Disabled">

Finds the folder and task of products from their file paths, described in [Folder hierarchy](#folder-hierarchy).

</Setting>
<Setting name="Attributes control" default="Disabled">

Attributes written to the published data of products, described in [Attributes control](#attributes-control).

</Setting>
</Settings>

</Setting>
</Settings>

## Products

Product definitions are checked from the top. The first one that matches and accepts all files of a group is used. Names are unique in a preset.

<!-- screenshot: settings editor, a product definition with its representations -->

<Settings prefix="products">
<Setting name="Name">

Name of the definition.

</Setting>
<Setting name="Default enabled" default="Disabled">

Products of this definition start enabled in the Batch Ingest window.

</Setting>
<Setting name="Product base type" default="Plate">

Product base type of the created instance, picked from a list of common types.

</Setting>
<Setting name="File pattern" default="Empty">

Regex searched in the path relative to the dropped folder. Empty matches all files.

</Setting>
<Setting name="Default task" default="Empty">

Task given to products of this definition, such as `edit`. Empty leaves the task to be picked by hand.

</Setting>
<Setting name="Variant name" default="Parse from file">

**Parse from file** uses the file name without the version as the variant. **Locked** uses the **Locked variant** below.

</Setting>
<Setting name="Locked variant" default="Empty">

Variant of all products of this definition, shown when **Variant name** is **Locked**.

</Setting>
<Setting name="Versioning type" default="Parse from file">

**Parse from file** uses the version in the file name (such as `_v003`), or the next free version when there is none. **Incremental** always uses the next free version. **Locked** uses the **Locked version** below.

</Setting>
<Setting name="Locked version" default="1">

Version of all products of this definition, shown when **Versioning type** is **Locked**.

</Setting>
<Setting name="Representations" default="Empty list">

Representations the product accepts. A file takes the first one, top to bottom, that matches both its extension and its file pattern, so specific patterns belong above general ones. Names are unique in a product. An empty list accepts any file.

<Settings>
<Setting name="Name">

Representation name given to matching files.

</Setting>
<Setting name="Required" default="Disabled">

Warn when the product has no such representation.

</Setting>
<Setting name="Extensions" default="Empty list">

Extensions with a leading dot, such as `.exr`; they are stored in lower case. An empty list accepts any extension.

</Setting>
<Setting name="File pattern" default="Empty">

Regex searched in the path relative to the dropped folder, to tell files of one extension apart, for example by folder (`(^|/)edit/`) or by file suffix (`_h264burnin`). Text matched inside the file name is not part of the product name. Empty matches all files.

</Setting>
<Setting name="Tags" default="Empty list">

Tags of the published representation. With the `review` tag the representation can be toggled reviewable in the Batch Ingest window and creates a review.

</Setting>
<Setting name="Custom tags" default="Empty list">

Additional tags used to filter representations in the output definitions of Extract Review.

</Setting>
</Settings>

</Setting>
</Settings>

The default preset has these definitions. Each has the product base type of its name, starts disabled, parses its variant and version from the file, and has no default task. None of the representations has a file pattern, tags or the **Required** toggle, unless noted:

- `model`: file pattern `(^|/)fbx/`; `fbx` (`.fbx`)
- `reference`: `review` (`.mov`, `.mp4`, tag `review`), `video` (`.mxf`, `.avi`, `.wmv`)
- `render`: `exr` (`.exr`), `dpx` (`.dpx`), `tiff` (`.tif`, `.tiff`), `jpg` (`.jpg`, `.jpeg`), `review` (`.mov`, `.mp4`, tag `review`)
- `pointcache`: `abc` (`.abc`)
- `camera`: `abc` (`.abc`), `fbx` (`.fbx`)
- `workfile`: `nk` (`.nk`), `ma` (`.ma`), `mb` (`.mb`), `hip` (`.hip`), `sfx` (`.sfx`), `mocha` (`.mocha`), `psd` (`.psd`)

## Folder hierarchy

Builds the folder path of each product from the path of its files, relative to the dropped folder. Tokens capture values from the path, the folder name template names the folder of the product, and the parent path template places it under its parent folders.

<!-- screenshot: settings editor, Folder hierarchy -->

<Settings prefix="folder-hierarchy">
<Setting name="Enabled" default="Disabled">

When disabled, the folder of products has to exist and is picked in the Context selector.

</Setting>
<Setting name="Tokenizer" default="Empty list">

Values captured from the file path. Names are unique.

<Settings>
<Setting name="Token name" default="Empty">

Name used in the templates, such as `shot` for `{shot}`.

</Setting>
<Setting name="Token regex" default="Empty">

Regex searched in the file path relative to the dropped folder, such as `(sh\d+)`. The token is the first group, or the whole match when the regex has no group.

</Setting>
</Settings>

</Setting>
<Setting name="Folder name template">

Name of the folder of a product.

<Settings>
<Setting name="Template" default="Empty">

Folder name built from tokens, such as `{shot}`. When a token is missing, the product gets no folder.

</Setting>
<Setting name="Folder type" default="Shot">

Folder type of the folder of the product.

</Setting>
</Settings>

</Setting>
<Setting name="Folder parent path template" default="Empty">

Parent folders of the folder, separated by `/`, such as `shots/{sequence}`. A `{name}` found in the parents definitions is a folder of its target type; any other part is a folder of the default folder type of **Folder creation**.

For example, with the tokens `sequence` (`(sq\d+)`) and `shot` (`(sh\d+)`), the template `{shot}` and the parent path `shots/{sequence}`, the file `sq010/sh020/plate_v001.exr` goes to the folder `/shots/sq010/sh020`.

</Setting>
<Setting name="Folder parents definitions" default="Empty list">

Named parent folders used in the parent path template. Names are unique.

<Settings>
<Setting name="Name" default="Empty">

Name used in the parent path template, such as `seq` for `{seq}`.

</Setting>
<Setting name="Value" default="Empty">

Folder name; any text, tokens and project keys such as `{project[code]}` can be used.

</Setting>
<Setting name="Target folder type" default="Folder">

Folder type of this parent folder.

</Setting>
</Settings>

</Setting>
<Setting name="Folder creation">

Creates the folders that do not exist when publishing. When disabled, a product whose folder does not exist is marked red and its context has to be picked.

<Settings>
<Setting name="Enabled" default="Disabled">

Turns folder creation on.

</Setting>
<Setting name="Default folder type" default="Folder">

Type of the folders the templates give no type.

</Setting>
</Settings>

</Setting>
<Setting name="Task creation">

Creates the tasks that do not exist when publishing. When disabled, a product whose task does not exist is marked red and its context has to be picked.

<Settings>
<Setting name="Enabled" default="Disabled">

Turns task creation on.

</Setting>
<Setting name="Task type" default="Generic">

Type of a new task.

</Setting>
</Settings>

</Setting>
</Settings>

## Attributes control

Attributes written to the published data of products, as static values or calculated from values read from the source files. The settings are checked when saved: names must be letters, digits and `_`, every `{name}` used must exist, numeric attributes cannot use text values, and attributes cannot use each other in a circle.

<!-- screenshot: settings editor, Attributes control -->

<Settings prefix="attributes-control">
<Setting name="Enabled" default="Disabled">

When disabled, no attribute is added to the products.

</Setting>
<Setting name="Variables" default="Empty list">

Values used in the expressions of the attributes. They are not published.

<Settings>
<Setting name="Name" default="Empty">

Used in expressions as `{name}`. It cannot be the name of an attribute or a source value.

</Setting>
<Setting name="Type" default="Number">

**Number**, **Decimal** or **Text**.

</Setting>
<Setting name="Value" default="Empty">

Value of the variable; a number for the numeric types.

</Setting>
</Settings>

</Setting>
<Setting name="Source values come from" default="Longest source">

Which file of a product the source values are read from when it has several, such as a video and an image sequence of different length: **Longest source**, **Shortest source**, **First source**, **Video, else sequence** or **Sequence, else video**.

</Setting>
<Setting name="Attributes" default="Empty list">

Attributes of the products. Names are unique.

<Settings>
<Setting name="Attribute name" default="Empty">

Name of the attribute, such as `frameEnd`. Other attributes can use it in their expression as `{frameEnd}`. A `folder.attrib` attribute must exist in the AYON attributes. With the `instance.data` scope, names of data Batch Ingest sets itself (such as `folderPath`, `productName`, `variant` or `version`) cannot be used; with the `representation` scope, neither can `name`, `ext`, `files`, `tags`, `custom_tags`, `preview` or `stagingDir`.

</Setting>
<Setting name="Attribute type" default="Number">

**Number** and **Decimal** are calculated with arithmetic (`+ - * / // %` and parentheses). **Text** and **Text parsed from file** are templates, such as `{shot}_{_source-fps_}`; tokens of the folder hierarchy tokenizer can be used in them.

</Setting>
<Setting name="Attribute usage scope" default="instance.data">

Where the value is published, one or more: a key of the instance data (`instance.data`), an attribute of the folder (`folder.attrib`), a key of the representation (`representation`) or a key of the representation data (`representation.data`). An attribute set for the product cannot use one that is only set for each representation.

</Setting>
<Setting name="Value type" default="Static input">

**Static input** uses the **Static value**; **Calculated** uses the **Calculation from source values**.

</Setting>
<Setting name="Static value" default="Empty">

Value of the attribute; a number for the numeric types.

</Setting>
<Setting name="Calculation from source values" default="Empty">

Expression using `{name}` of other attributes, variables, tokens and the source values `{_source-in_}`, `{_source-out_}`, `{_source-duration_}` and `{_source-fps_}`. For example, with `frameStart` 1001 and a source of 150 frames, `{frameStart} + {_source-duration_}` gives 1151. At most 500 characters.

</Setting>
<Setting name="Parsed from file name" default="Empty">

Only for the type **Text parsed from file**: a regex with one capturing group. The first group of the match in the source file name is the value.

</Setting>
<Setting name="Default value" default="Empty">

Used when the calculation cannot be resolved.

</Setting>
<Setting name="Editable in Batch Ingest" default="Disabled">

Adds a column to edit the value in the Batch Ingest window.

</Setting>
<Setting name="Required" default="Disabled">

A product without a value cannot be added.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [BatchIngest addon](index.md)
- [How files become products](index.md#how-files-become-products)
