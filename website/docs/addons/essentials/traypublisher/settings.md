---
title: TrayPublisher addon settings
sidebar_label: Settings
description: "Project settings of the TrayPublisher addon (traypublisher): color management, simple creators, editorial creators, CSV ingest, texture and batch movie creators, and publish plugin settings."
addon: traypublisher
addon_repo: ayon-traypublisher
addon_version: 0.4.8
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-traypublisher/tree/0.4.8
---

# TrayPublisher addon settings

<AddonInfo />

The settings of the [TrayPublisher addon](index.md) are in **Studio settings > TrayPublisher**, with overrides in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. What the creators and publish plugins do is described on the [overview page](index.md); how editorial publishing fits in the pipeline is described in [Editorial publishing](../../../pipeline/editorial-publishing.md). Product names are built from the product name profiles of the core addon; see [Naming conventions](../../../pipeline/naming-conventions.md). Settings saved by older versions of the addon are converted when a new version is used; see [settings](../../../ayon/how-ayon-works/settings.md).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://traypublisher/imageio" scope="Studio, with project overrides" />

Color management of the Tray Publisher host, and file rules that assign a colorspace to files by name. The global rules and the OCIO config are set in the [core addon](../core/settings.md#color-management-imageio).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Turns color management on for the Tray Publisher.

</Setting>
<Setting name="File Rules">

Host file rules. When activated, they are used instead of the global file rules of the core addon.

<Settings>
<Setting name="Activate Host Rules" default="Disabled" />
<Setting name="Rules" default="Empty list">

Each rule has a unique name.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension">

Extension the file must have for the rule to apply.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Simple create plugins

<SettingLocation uri="ayon+settings://traypublisher/simple_creators" scope="Studio, with project overrides" />

Each item of this list becomes one creator in the Publisher, so creators can be changed, removed or added without code. The default list has 12 items: Workfile, Model, Pointcache, Plate, Render, Camera, Image, VDB Volumes, Matchmove, Rig, Simple UE texture and Audio. Their default variants, extensions and options are listed in [Simple creators](index.md#simple-creators).

<!-- screenshot: settings editor, Simple Create Plugins -->

<Settings prefix="simple-creators">
<Setting name="Simple Create Plugins" default="12 items">

Fields of one item. A new item starts with the defaults below.

<Settings>
<Setting name="Product base type">

Product base type the creator makes, for example `plate`.

</Setting>
<Setting name="Identifier">

Creator identifier, which must be unique. When empty, the product base type is used.

</Setting>
<Setting name="Label">

Name of the creator in the Publisher.

</Setting>
<Setting name="Icon">

Icon of the creator, for example `fa.file` or `mdi.camera-image`.

</Setting>
<Setting name="Default Variants" default="Empty list">

Variants offered for the product name.

</Setting>
<Setting name="Description">

Short description shown in the Publisher.

</Setting>
<Setting name="Detailed Description">

Longer description shown in the Publisher.

</Setting>
<Setting name="Allow sequences" default="Disabled">

Accept image sequences as well as single files.

</Setting>
<Setting name="Allow multiple items" default="Disabled">

Accept several files or sequences in one instance.

</Setting>
<Setting name="Allow version control" default="Disabled">

Add **Use next version** and a version number to the instance, so a specific version can be published.

</Setting>
<Setting name="Extensions" default="Empty list">

Accepted file extensions. An empty list accepts any file.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types the creator can make, in addition to its product base type.

<Settings>
<Setting name="Product type">

Product type name.

</Setting>
<Setting name="Label">

Label of the product type in the Publisher. When empty, the creator label followed by the product type in parentheses is used.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Editorial creators

<SettingLocation uri="ayon+settings://traypublisher/editorial_creators" scope="Studio, with project overrides" />

The two editorial creators read an edit file, create a shot for each clip and products for each shot. **Editorial simple creator** trims the clips from the media files; **Editorial advanced creator** finds the files of each product in a media folder. Both share the shot settings: clip name tokens, shot renaming, the shot hierarchy and the tasks added to each shot. How the creators work is described in [Editorial workflows](index.md#editorial-workflows).

<!-- screenshot: settings editor, Editorial Creators -->

### Editorial simple creator

<SettingLocation uri="ayon+settings://traypublisher/editorial_creators/editorial_simple" scope="Studio, with project overrides" />

<Settings prefix="editorial-simple">
<Setting name="Enabled" default="Enabled">

Makes the creator available in the Publisher.

</Setting>
<Setting name="Default Variants" default="Main" />
<Setting name="Clip Name Tokenizer" default="_sequence_, _shot_">

Tokens extracted from clip names with regular expressions. Each token name is enclosed in underscores, such as `_shot_`, and can be used in **Shot rename template** and in the values of **Folder path template tokens**. The defaults are `_sequence_` = `(sc\d{3})` and `_shot_` = `(sh\d{3})`, which match clip names such as `sc010_sh020`.

<Settings>
<Setting name="Token name" />
<Setting name="Token regex">

Regular expression searched in the name of the selected folder followed by the clip name; the last match is the token value. The creation fails when a token finds no match.

</Setting>
</Settings>

</Setting>
<Setting name="Shot Rename">

Renames the shots found in the edit file with a template.

<Settings>
<Setting name="Enabled" default="Enabled" />
<Setting name="Shot rename template" default="`{project[code]}_{_sequence_}_{_shot_}`">

Accepts the [template keys](../../../pipeline/naming-conventions.md#token-reference) of Anatomy and the tokens of **Clip Name Tokenizer**.

</Setting>
</Settings>

</Setting>
<Setting name="Shot Hierarchy">

Builds the folder path of each shot from a template.

<Settings>
<Setting name="Enabled" default="Enabled" />
<Setting name="Folder path template" default="`{project}/{folder}/{sequence}`">

Each token in the path is one folder of the hierarchy, defined in **Folder path template tokens**.

</Setting>
<Setting name="Folder path template tokens" default="project, folder, sequence">

The defaults are `project` = `{project[name]}` (type **Project**), `folder` = `shots` (type **Folder**) and `sequence` = `{_sequence_}` (type **Sequence**), which place shots in `<project>/shots/<sequence>`.

<Settings>
<Setting name="Token name">

Unique name, used in **Folder path template**.

</Setting>
<Setting name="Token value">

Text, Anatomy template keys and clip name tokens.

</Setting>
<Setting name="Folder Type" default="Project">

**Project**, **Folder**, **Episode** or **Sequence**.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Add tasks to shot" default="Empty list">

Tasks added to each created shot.

<Settings>
<Setting name="Task name" />
<Setting name="Task type">

One of the task types of the project.

</Setting>
</Settings>

</Setting>
<Setting name="Product Base Type Presets" default="review, plate, audio">

The products created for each clip. The defaults are `review` with variant `Reference`, review on, output **MP4**; `plate` with no variant, review off, output **MOV**; and `audio` with no variant, review off, output **WAV**.

<Settings>
<Setting name="Product base type" />
<Setting name="Variant">

When empty, the variant chosen in the creator is used.

</Setting>
<Setting name="Review" default="Enabled">

Make the product reviewable.

</Setting>
<Setting name="Output File Type" default="MP4">

Format of the trimmed file: **MP4**, **MOV** or **WAV**.

</Setting>
<Setting name="Default task">

Task the product is published to. Must be one of **Add tasks to shot**.

</Setting>
</Settings>

</Setting>
</Settings>

### Editorial advanced creator

<SettingLocation uri="ayon+settings://traypublisher/editorial_creators/editorial_advanced" scope="Studio, with project overrides" />

The same shot settings as [Editorial simple creator](#editorial-simple-creator), with other default tokens, and product presets that find files in the media folder.

<Settings prefix="editorial-advanced">
<Setting name="Enabled" default="Enabled">

Makes the creator available in the Publisher.

</Setting>
<Setting name="Default Variants" default="Main" />
<Setting name="Clip Name Tokenizer" default="_sequence_, _shot_">

Same fields as in the simple creator. The defaults are `_sequence_` = `(\d{4})(?=_\d{4})` and `_shot_` = `(\d{4})(?!_\d{4})`, which match clip names such as `0010_0020`.

</Setting>
<Setting name="Shot Rename">

Same fields and defaults as in the simple creator: enabled, template `{project[code]}_{_sequence_}_{_shot_}`.

</Setting>
<Setting name="Shot Hierarchy">

Same fields and defaults as in the simple creator: enabled, template `{project}/{folder}/{sequence}` with the tokens `project`, `folder` and `sequence`.

</Setting>
<Setting name="Add tasks to shot" default="Empty list">

Same fields as in the simple creator.

</Setting>
<Setting name="Product base type presets" default="One item: plate, Reference">

The products created for each clip. A product base type and variant pair can appear once.

<Settings>
<Setting name="Default Enabled" default="Enabled">

Whether the product is enabled in the creator.

</Setting>
<Setting name="Product base type" default="Plate">

**Image**, **Plate**, **Render**, **Audio**, **Model**, **Camera** or **Workfile**.

</Setting>
<Setting name="Variant">

Variant of the product. The default item uses `Reference`.

</Setting>
<Setting name="Default task">

Task the product is published to. Must be one of **Add tasks to shot**.

</Setting>
<Setting name="Versioning type" default="Incremental">

- **Incremental:** the next version of the product.
- **From files:** the version found in the file name, if any.
- **Locked:** the number in **Locked version**.

</Setting>
<Setting name="Locked version" default="1">

Version used by the **Locked** versioning type.

</Setting>
<Setting name="Representations" default="Empty list">

File filters that select the files of the product in the media folder, one item per representation. The default item is **Name** `Reference`, **Content type** **Video**, extensions `mov` and `mp4`, pattern `.*` and the tag `review`.

<Settings>
<Setting name="Name" />
<Setting name="Content type" default="Video">

**Thumbnail**, **Single Image**, **Sequence of images**, **Video**, **Audio**, **Geometry** or **Workfile**.

</Setting>
<Setting name="Filter by extensions" default="Empty list">

Only files with these extensions are published. Written as `.ext`, `ext`, `EXT` or `.EXT`.

</Setting>
<Setting name="Filter by patterns" default="Empty list">

Regular expressions searched in the file names.

</Setting>
<Setting name="Tags" default="Empty list">

Tags added to the representation. The `review` tag creates the review from the transcoded representation instead of the original.

</Setting>
<Setting name="Custom tags" default="Empty list">

Extra tags, which output definitions of Extract Review in the core addon can filter on.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://traypublisher/create" scope="Studio, with project overrides" />

Settings of the creators that are not built from **Simple Create Plugins**.

<!-- screenshot: settings editor, Create -->

### Batch Movie Creator

<SettingLocation uri="ayon+settings://traypublisher/create/BatchMovieCreator" scope="Studio, with project overrides" />

Publishes several movie files at once. The folder of each file is found from its file name, such as `folder.mov`, `folder_v001.mov` or `my_folder_to_publish.mov`.

<Settings prefix="batch-movie">
<Setting name="Default variants" default="Main" />
<Setting name="Default tasks" default="Compositing">

Task names tried in order; the first one that exists on the matched folder is used. Matching ignores case.

</Setting>
<Setting name="Extensions" default=".mov">

Accepted file extensions.

</Setting>
<Setting name="Product types" default="Empty list">

Product types offered in the creator. When empty, only `render` is offered.

</Setting>
</Settings>

### PSD Workfile + Image Creator

<SettingLocation uri="ayon+settings://traypublisher/create/PSDWorkfileCreator" scope="Studio, with project overrides" />

Publishes a `.psd` file both as a workfile and as an image.

<Settings prefix="psd-workfile">
<Setting name="Enabled" default="Disabled">

Makes the creator available in the Publisher.

</Setting>
<Setting name="Default variants" default="Main" />
<Setting name="Workfile product types" default="Empty list">

Product types offered for the workfile product. When empty, only `workfile` is offered.

</Setting>
<Setting name="Image  product types" default="Empty list">

Product types offered for the image product. When empty, only `image` is offered. The title has two spaces in the settings editor.

</Setting>
</Settings>

### Ingest CSV

<SettingLocation uri="ayon+settings://traypublisher/create/IngestCSV" scope="Studio, with project overrides" />

Presets that describe how CSV files are read for [CSV ingest](index.md#csv-ingest), in the Publisher and with the headless `ingestcsv` command, whose `--preset` option picks a preset by name.

<Settings prefix="ingest-csv">
<Setting name="Enabled" default="Enabled">

Makes the CSV Ingest creator available.

</Setting>
<Setting name="Presets" default="One preset: Default">

Fields of one preset:

<Settings>
<Setting name="Name" default="Default">

Name of the preset.

</Setting>
<Setting name="Prevalidation">

How each problem found before the instances are created is handled: **Raise Error** stops the creation, **Ignore and report** continues and reports the problem.

<Settings>
<Setting name="Existing Versions" default="Raise Error" />
<Setting name="Wrong Framerange" default="Raise Error" />
<Setting name="Folder Does Not Exist" default="Raise Error" />
<Setting name="Folder Name Duplicity" default="Raise Error" />
<Setting name="Missing Frame Range Values" default="Raise Error" />
</Settings>

</Setting>
<Setting name="Columns config">

The columns a CSV file can have.

<Settings>
<Setting name="CSV delimiter" default="," />
<Setting name="Columns" default="22 columns">

Each column name is unique. The default columns are listed [below](#default-csv-columns).

<Settings>
<Setting name="Name">

Column header in the CSV file.

</Setting>
<Setting name="Type" default="Text">

**Text**, **Number**, **Decimal** or **Boolean**.

</Setting>
<Setting name="Default">

Value used when the cell is empty.

</Setting>
<Setting name="Required Column" default="Disabled">

The column must exist in the CSV file.

</Setting>
<Setting name="Validation Regex Pattern" default="`^(.*)$`">

Regular expression each value must match.

</Setting>
<Setting name="Processing Type" default="Processing Data">

- **Processing Data:** a value the ingest itself uses, such as a path or a frame range.
- **Passing Data:** a value passed on to the published data, set in **Passing Data**.

</Setting>
<Setting name="Passing Data">

Used with **Passing Data** processing; **Name** is then required.

<Settings>
<Setting name="Name">

Key the value is stored under.

</Setting>
<Setting name="Passing Data Type" default="Version Data">

Where the value is stored: **Representation Data**, **Instance Data** or **Version Data**.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Representations config">

How files are turned into representations.

<Settings>
<Setting name="Tags delimiter" default=";">

Separator of the tags in the **Representation Tags** column.

</Setting>
<Setting name="Default tags" default="review">

Tags added to the created representations.

</Setting>
<Setting name="Representations" default="preview, exr, edit, review, nuke">

Representation names and the extensions that map to them; each name is unique and each extension starts with a dot. The defaults are `preview` (`.mp4`, `.mov`), `exr` (`.exr`), `edit` (`.mov`), `review` (`.mov`) and `nuke` (`.nk`).

<Settings>
<Setting name="Name" />
<Setting name="Extensions" default="Empty list" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Folder creation config">

Creates folders and tasks that do not exist yet.

<Settings>
<Setting name="Enabled folder creation" default="Disabled" />
<Setting name="Default Folder Type" default="Folder">

Folder type of new folders, one of the folder types of the project.

</Setting>
<Setting name="Folder Type Regexes" default="(sh.*) Shot, (seq.*) Sequence">

Folder types chosen by folder name. Each item has a **Folder Regex** and a **Folder Type** (default **Folder**). The defaults give `Shot` to names matching `(sh.*)` and `Sequence` to names matching `(seq.*)`.

</Setting>
<Setting name="Default Task Type" default="Generic">

Task type of new tasks, one of the task types of the project.

</Setting>
<Setting name="Task Type Regexes" default="Empty list">

Task types chosen by task name. Each item has a **Task Regex** and a **Task Type** (default **Generic**).

</Setting>
</Settings>

</Setting>
<Setting name="List config">

Creates entity lists of the published products.

<Settings>
<Setting name="Enabled" default="Disabled" />
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Task Types" default="Empty list">

Task types of the current context the profile applies to.

</Setting>
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="List Name" default="`{csv_basename}-{yy}{mm}{dd}`">

Anatomy template of the list name. The keys `{csv_basename}` and `{csv_parent_dir}` are also available.

</Setting>
<Setting name="List type" default="Generic">

**Generic** or **Review Session**.

</Setting>
<Setting name="List folders" default="Empty list">

Folders of the list, from top to bottom. When a folder already exists, its settings are not changed.

<Settings>
<Setting name="Folder label">

Label of the folder. Accepts Anatomy template keys and `{csv_basename}`, `{csv_parent_dir}`.

</Setting>
<Setting name="Scope" default="Scope folder to all views">

**Scope folder to all views**, or **Scope to the list type** to show the folder only in the view of the created list's type.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

#### Default CSV columns

The columns of the `Default` preset, in order. All use the **Processing Data** type and have an empty default unless noted.

- **File Path**: Text, required, pattern `^([a-zA-Z\:\ 0-9#\-\._\\/]*)$`
- **Folder Path**: Text, required, pattern `^([a-zA-Z0-9_\/]*)$`
- **Folder Name**: Text, pattern `^([a-zA-Z0-9_]*)$`
- **Task Name**: Text, required
- **Product Base Type**: Text
- **Product Type**: Text
- **Variant**: Text
- **Version**: Number, pattern `^(\d{1,3})$`
- **Version Comment**: Text
- **Version Thumbnail**: Text, pattern as **File Path**
- **Frame Start**: Number, required, pattern `^(\d{1,8})$`
- **Frame End**: Number, required, pattern `^(\d{1,8})$`
- **Handle Start**: Number, required, pattern `^(\d+)$`
- **Handle End**: Number, required, pattern `^(\d+)$`
- **FPS**: Decimal, required, pattern `^[0-9]*\.[0-9]+$|^[0-9]+$`
- **Slate Exists**: Boolean, default `True`, pattern `(True|False)`
- **Representation**: Text
- **Representation Colorspace**: Text
- **Representation Tags**: Text
- **Shot Height**: Number, pattern `^(\d*)$`
- **Shot Width**: Number, pattern `^(\d*)$`
- **Shot Pixel Aspect**: Decimal, pattern `^(\d*.?\d*)$`

Columns without a pattern use `^(.*)$`.

### Texture

<SettingLocation uri="ayon+settings://traypublisher/create/TextureCreator" scope="Studio, with project overrides" />

Publishes texture files or UDIM sequences.

<Settings prefix="texture">
<Setting name="Enabled" default="Enabled">

Makes the creator available in the Publisher.

</Setting>
<Setting name="Default variants" default="Main" />
<Setting name="Extensions" default=".mov, .mp4, .mxf, .m4v, .mpg, .exr, .dpx, .tif, .png, .jpg, .tga, .tx">

File extensions allowed as textures.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types the creator can make, each with a **Product type** and a **Label**, as in [Simple create plugins](#simple-create-plugins).

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://traypublisher/publish" scope="Studio, with project overrides" />

Settings of the publish plugins. Most have the same three fields:

- **Enabled:** the plugin runs.
- **Optional:** artists can turn the plugin off in the Publisher.
- **Active:** the plugin is on by default when it is optional.

What each plugin does is described in [Publishing](index.md#publishing).

<!-- screenshot: settings editor, Publish Plugins -->

<Settings prefix="publish">
<Setting name="Collect CSV Ingest Prevalidation Report" default="Enabled, optional, active" />
<Setting name="Collect Original Sequence Frame Data" default="Enabled, optional, active" />
<Setting name="Validate Frame Range" default="Enabled, optional, active" />
<Setting name="Validate Existing Version" default="Enabled, optional, active" />
<Setting name="Extract Editorial Package Conversion">

Converts the media of an [editorial package](../../../pipeline/editorial-publishing.md#editorial-packages) with ffmpeg while it is extracted. This plugin has none of the three shared fields.

<Settings>
<Setting name="Conversion enabled" default="Disabled">

Convert the resource files.

</Setting>
<Setting name="Output Definitions">

<Settings>
<Setting name="Output extension" default="mp4">

Extension of the converted files.

</Setting>
<Setting name="FFmpeg arguments">

<Settings>
<Setting name="Video filters" default="Empty list" />
<Setting name="Audio filters" default="Empty list" />
<Setting name="Input arguments" default="-apply_trc gamma22">

Arguments placed before the input file.

</Setting>
<Setting name="Output arguments" default="-pix_fmt yuv420p, -crf 18, -g 1">

Arguments placed before the output file.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [TrayPublisher addon overview](index.md)
- [Editorial publishing](../../../pipeline/editorial-publishing.md)
- [Core addon settings](../core/settings.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
