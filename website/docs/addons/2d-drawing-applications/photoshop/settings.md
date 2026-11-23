---
title: Photoshop addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Photoshop addon with their default values: extension install, default workfile extension, color management, creator plugins, publish plugins and the workfile builder."
addon: photoshop
addon_repo: ayon-photoshop
addon_version: 0.4.8
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-photoshop/tree/0.4.8/server/settings
---

# Photoshop addon settings

<AddonInfo />

The settings of the [Photoshop addon](index.md) are in **Studio settings > Photoshop**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The **Product name template** of the products is set in the core addon, not here, and so is the OCIO config; see [Color management on launch](../../../pipeline/color-management-on-launch.md).

## General

<SettingLocation uri="ayon+settings://photoshop" scope="Studio, with project overrides" />

How the AYON extension is installed when Photoshop starts from the launcher, and the format of new workfiles.

<!-- screenshot: settings editor, General -->

<Settings>
<Setting name="Install AYON Extension" default="Enabled">

A pre-launch hook installs the AYON extension into the user's Adobe CEP extensions folder (`Adobe/CEP/extensions/io.ynput.PS.panel` in the user's application data) and replaces it when its version differs from the bundled one.

</Setting>
<Setting name="Default workfile extension" default="psd">

The extension used first when saving workfiles: **psd** or **psb**.

</Setting>
</Settings>

## OCIO config

<SettingLocation uri="ayon+settings://photoshop/imageio" scope="Studio, with project overrides" />

Whether Photoshop follows the global color management, how Photoshop color profile names map to OCIO colorspaces, and file rules that assign a colorspace to files by name.

<!-- screenshot: settings editor, OCIO config -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

Photoshop follows the global color management, using the OCIO config set in the core addon.

</Setting>
<Setting name="Remapping colorspace names">

<Settings>
<Setting name="Rules" default="Empty list">

Rules that map the application's color profile name to an OCIO colorspace.

<Settings>
<Setting name="Application native colorspace name" />
<Setting name="OCIO colorspace name" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Turns on the rules below for this host.

</Setting>
<Setting name="Rules" default="Empty list">

Rules that assign a colorspace to files. Rule names must be unique.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://photoshop/create" scope="Studio, with project overrides" />

The creators share **Enabled** (the creator is available or, for automatic creators, creates its instance), **Active by default** (new instances are selected for publishing) and a default variant. Create Image makes instances from layers; the other three create one instance each, automatically.

<!-- screenshot: settings editor, Creator plugins -->

<Settings>
<Setting name="Create Image" default="Enabled, active by default">

<Settings>
<Setting name="Review by default" default="Disabled">

New instances have a review of their own.

</Setting>
<Setting name="Default Variants" default="Main">

The variants offered by default.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types that the creator can make, each with a **Product type** name and a **Label**.

</Setting>
</Settings>

</Setting>
<Setting name="Create Flatten Image" default="Disabled, active by default">

Creates an instance of the flattened image.

<Settings>
<Setting name="Review by default" default="Disabled">

The instance is marked for review.

</Setting>
<Setting name="Default Variants" default="Empty">

The variant used for the instance (a single value).

</Setting>
</Settings>

</Setting>
<Setting name="Create Review" default="Enabled, active by default">

<Settings>
<Setting name="Default Variants" default="Empty">

The variant used for the instance (a single value).

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types, as for Create Image.

</Setting>
</Settings>

</Setting>
<Setting name="Create Workfile" default="Enabled, active by default">

<Settings>
<Setting name="Default Variants" default="Main">

The variant used for the instance (a single value).

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://photoshop/publish" scope="Studio, with project overrides" />

Plugins with the full set of switches have **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher). The plugins are listed below by kind, in the order of the settings editor.

<!-- screenshot: settings editor, Publish plugins -->

### Collectors

<Settings>
<Setting name="Collect Color Coded Instances" default="Enabled">

Creates instances from color-marked layers. Only for remote publishing.

<Settings>
<Setting name="Create flatten image" default="No">

**No**, **Flatten with images** (a flattened image and an image per marked layer) or **Flatten only** (only the flattened image).

</Setting>
<Setting name="Product name template for flatten image" default="Empty">

Template for the name of the flattened image. A flattened image is not created when it is empty.

</Setting>
<Setting name="Color code mappings" default="Empty list">

<Settings>
<Setting name="Color codes for layers">

**Red**, **Orange**, **Yellow**, **Green**, **Blue**, **Violet** or **Gray**.

</Setting>
<Setting name="Layer name regex">

Regex patterns that the layer name must match.

</Setting>
<Setting name="Resulting product base type" />
<Setting name="Product name template" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Collect Review" default="Enabled">

Adds the review family to instances marked for review.

</Setting>
<Setting name="Collect Version" default="Disabled">

Gives images and reviews the version of the next published workfile.

</Setting>
</Settings>

### Validators

Validate Instance Folder and the extension-version check have no settings.

<Settings>
<Setting name="Validate naming of products and layers">

It has no switches.

<Settings>
<Setting name="Regex pattern of invalid characters" default="[ \\/+\*\?\(\)\[\]\{\}:,;]">

Characters that are not allowed in layer and product names.

</Setting>
<Setting name="Replacement character" default="_">

Used by the **Repair** action.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Smart Object Links" default="Enabled, optional, active">

Fails on Smart Object layers with broken or missing links.

</Setting>
<Setting name="Validate Document Settings" default="Disabled, optional, active">

Compares the document with the expected values below.

<Settings>
<Setting name="Expected DPI" default="72" />
<Setting name="Expected Color Mode" default="RGB">

**RGB**, **CMYK**, **Grayscale**, **Lab**, **Bitmap**, **Duotone**, **Indexed Color** or **Multichannel**.

</Setting>
<Setting name="Expected Bit Depth" default="8 bits">

**8 bits**, **16 bits** or **32 bits**.

</Setting>
</Settings>

</Setting>
</Settings>

### Extractors

<Settings>
<Setting name="Extract Image" default="Enabled, not optional, active">

Extracts the files of image instances.

<Settings>
<Setting name="Extract Formats" default="png, jpg">

Formats written for every image: **png**, **jpg**, **tga**, **tif** and **exr**.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Sources for Review">

It has no switches.

<Settings>
<Setting name="Make an image sequence instead of flatten image" default="Disabled">

Builds the review from an image sequence of all images, instead of one flattened image.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Layers" default="Disabled, not optional, active">

Exports the layers of the instance to a Photoshop file.

<Settings>
<Setting name="Merge Layersets" default="Disabled">

Merges all layersets within the instance set.

</Setting>
<Setting name="Export extension" default="psd">

**psd** or **psb**.

</Setting>
</Settings>

</Setting>
</Settings>

## Workfile Builder

<SettingLocation uri="ayon+settings://photoshop/workfile_builder" scope="Studio, with project overrides" />

A workfile template chosen by task type, used to build new workfiles.

<!-- screenshot: settings editor, Workfile Builder -->

<Settings prefix="workfile-builder">
<Setting name="Create first workfile" default="Disabled">

Saves the first workfile with the built template when no workfile exists.

</Setting>
<Setting name="Template profiles" default="Empty list">

<Settings>
<Setting name="Task types">

Task types that use the template.

</Setting>
<Setting name="Template path">

Path of the template, with one entry per platform: **Windows**, **Linux** and **MacOS**.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Photoshop addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
