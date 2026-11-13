---
title: Photoshop addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Photoshop addon with their default values: extension install, default workfile extension, color management, creator plugins, publish plugins and the workfile builder."
addon: photoshop
addon_repo: ayon-photoshop
addon_version: 0.4.8
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-photoshop/tree/0.4.8/server/settings
  - https://help.ayon.app/en/articles/0146725-photoshop-addon-settings
---

# Photoshop addon settings

<AddonInfo />

The settings of the [Photoshop addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Creators and extractors share switches such as **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## General

| Setting | Default | Description |
|---|---|---|
| Install AYON Extension | On | A pre-launch hook installs the AYON extension into the user's Adobe CEP extensions folder (`Adobe/CEP/extensions/io.ynput.PS.panel` in the user's application data) and replaces it when its version differs from the bundled one. |
| Default workfile extension | `.psd` | The extension used first when saving workfiles. Either `.psd` or `.psb`. |

## OCIO config

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Photoshop follows the global color management, using the OCIO files set in the core addon. |
| Remapping colorspace names | None | Rules that map the application's color profile name to an OCIO colorspace. Each has an **Application native colorspace name** and an **OCIO colorspace name**. |
| Activate Host Rules (File Rules) | Off | Turn on the file rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Creator plugins

| Creator | Setting | Default | Description |
|---|---|---|---|
| Create Image | Enabled | On | Make the creator available. |
| | Active by default | On | New instances are selected for publishing. |
| | Review by default | Off | New instances have a review of their own. |
| | Default Variants | `Main` | The variants offered by default. |
| | Product type items | None | Optional product types that the creator can make, each with a **Product type** name and a **Label**. |
| Create Flatten Image | Enabled | Off | Create the flatten image instance automatically. |
| | Active by default | On | The instance is selected for publishing. |
| | Review by default | Off | The instance is marked for review. |
| | Default Variants | Empty | The variant used for the instance. |
| Create Review | Enabled | On | Create the review instance automatically. |
| | Active by default | On | The instance is selected for publishing. |
| | Default Variants | Empty | The variant used for the instance. |
| | Product type items | None | Optional product types, as for Create Image. |
| Create Workfile | Enabled | On | Create the workfile instance automatically. |
| | Active by default | On | The instance is selected for publishing. |
| | Default Variants | `Main` | The variant used for the instance. |

The **Product name template** for the products is set in the core addon, not here.

## Publish plugins

### Collectors

| Plugin | Setting | Default | Description |
|---|---|---|---|
| Collect Color Coded Instances | Enabled | On | Creates instances from color-marked layers. Only for remote publishing. |
| | Create flatten image | No | **No**, **Flatten with images** (a flattened image and an image per marked layer) or **Flatten only** (only the flattened image). |
| | Product name template for flatten image | Empty | Template for the name of the flattened image. A flattened image is not created when it is empty. |
| | Color code mappings | None | Each mapping has **Color codes for layers** (red, orange, yellow, green, blue, violet, gray), **Layer name regex**, **Resulting product base type** and **Product name template**. |
| Collect Review | Enabled | On | Add the review family to instances marked for review. |
| Collect Version | Enabled | Off | Give images and reviews the version of the next published workfile. |

### Validators

Validate Instance Folder and the extension-version check have no settings.

| Validator | Setting | Default | Description |
|---|---|---|---|
| Validate naming of products and layers | Regex pattern of invalid characters | `[ \\/+\*\?\(\)\[\]\{\}:,;]` | Characters that are not allowed in layer and product names. |
| | Replacement character | `_` | Used by the **Repair** action. |
| Validate Smart Object Links | Enabled, Optional, Active | On, On, On | Fails on Smart Object layers with broken or missing links. |
| Validate Document Settings | Enabled, Optional, Active | Off, On, On | Compares the document with the expected values below. |
| | Expected DPI | 72 | The resolution. |
| | Expected Color Mode | `RGB` | One of RGB, CMYK, Grayscale, Lab, Bitmap, Duotone, Indexed Color, Multichannel. |
| | Expected Bit Depth | `8` | 8, 16 or 32 bits. |

### Extractors

| Extractor | Setting | Default | Description |
|---|---|---|---|
| Extract Image | Enabled, Optional, Active | On, Off, On | Extract the files of image instances. |
| | Extract Formats | `png`, `jpg` | Formats written for every image. Possible: `png`, `jpg`, `tga`, `tif`, `exr`. |
| Extract Sources for Review | Make an image sequence instead of flatten image | Off | Build the review from an image sequence of all images, instead of one flattened image. |
| Extract Layers | Enabled, Optional, Active | Off, Off, On | Export the layers of the instance to a Photoshop file. |
| | Merge Layersets | Off | Merge all layersets within the instance set. |
| | Export extension | `psd` | `psd` or `psb`. |

## Workfile Builder

| Setting | Default | Description |
|---|---|---|
| Create first workfile | Off | Saves the first workfile with the built template when no workfile exists. |
| Template profiles | None | A list of templates. Each has **Task types** and a **Template path** with one entry per platform (**Windows**, **Linux**, **MacOS**). |
