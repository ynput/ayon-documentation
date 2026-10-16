---
title: Photoshop addon
sidebar_label: Overview
description: "The AYON integration for Adobe Photoshop: the AYON panel, the image, review and workfile products it creates, publishing, validators, loaders, remote publishing and requirements."
addon: photoshop
addon_repo: ayon-photoshop
addon_version: 0.4.8
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-photoshop/tree/0.4.8
  - https://github.com/ynput/ayon-photoshop/releases
  - https://help.ayon.app/en/articles/7712931-working-with-photoshop-in-ayon
  - https://help.ayon.app/en/articles/0146725-photoshop-addon-settings
---

# Photoshop addon

<AddonInfo />

The Photoshop addon connects [Adobe Photoshop](https://www.adobe.com/products/photoshop.html) to AYON. It provides a CEP extension that shows an **AYON** panel inside Photoshop. The panel opens the pipeline tools, and the addon provides the plugins that create, publish and load images from Photoshop documents (`.psd`, `.psb`). Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.2 or newer |
| Applications addon | Defines the Photoshop executables that the AYON Launcher starts |

The addon runs no services.

## AYON panel

The addon ships the extension `extension.zxp` (extension id `io.ynput.PS.panel`). A pre-launch hook can install it into the user's Adobe CEP extensions folder; it compares the installed and bundled extension versions and replaces the installed one when they differ (see [settings](settings.md)). The panel talks to the addon through a local web socket server.

| Button | What it does |
|---|---|
| **Workfiles...** | Opens the Workfiles tool. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the document. |
| **Experimental Tools...** | Opens the experimental tools dialog. |
| **Script Editor...** | Opens the script editor tool. |

Workfiles can have the extension `.psd` or `.psb`. The **Default workfile extension** setting decides which of the two is used first.

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Image | `image` | The visible content of a layer or layer group, or of the whole document |
| Flatten Image | `image` | One image of all visible layers, created automatically. Off by default |
| Review | `review` | A flattened preview of all published images (or of all visible layers when no image exists). Created automatically, and the artist can disable it |
| Workfile | `workfile` | The Photoshop document itself. Created automatically |

The **Image** creator marks layers with the publish icon. It has these options.

| Option | Default | Meaning |
|---|---|---|
| Create only for selected | On | Use the selected layers. When off, all visible layers are wrapped in one group. |
| Create separate instance for each selected | On | One image per selected layer or group. When off, the selected layers are grouped into one image. |
| Use layer name in product | Off | Adds the layer name to the product name. This is always done when several images are created at once. The position follows the `{layer}` placeholder of the product name templates. |
| Create separate review | Off | Also marks the image for a review of its own. |

Selected layers that are not groups are wrapped into a new group each. Removing an image instance also removes the group that the creator made for it, and keeps groups that existed before.

## Publishing

### Extractors

| Extractor | Applies to | What it produces |
|---|---|---|
| Extract Image | `image` | One file per instance and per configured format: `png`, `jpg`, `tga`, `tif` or `exr`. The document's color profile is remapped to an OCIO colorspace and stored with the representation. |
| Extract Layers | `image` (not the flatten image) | A copy of the document that holds only the instance's layers, saved as `psd` or `psb`. Off by default. |
| Extract Sources for Review | `review`, and `image` with a separate review | A flattened `jpg` that the core review extraction turns into the review, or an image sequence of all images when that option is on. |
| Extract Save Scene | `workfile` | Saves the document before the workfile is published. |

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Naming | That layer and product names contain no invalid characters (a configurable regex). Has a **Repair** action. | Image |
| Validate Instance Folder | That the instance's folder is the current context folder. Has a **Repair** action. Optional. | Instances |
| Validate Smart Object Links | That no Smart Object layer has a broken or missing link, for local files and for CC Libraries assets. The **Repair** action rasterizes the broken layers and embeds them again, which replaces the linked content. | Document |
| Validate Document Settings | That the resolution (DPI), color mode and bit depth match the expected values. Has a **Repair** action that can lose information, for example when converting from CMYK to RGB. Off by default. | Document |

### Other publish plugins

| Plugin | What it does |
|---|---|
| Collect Review | Adds the review family to instances marked for review. |
| Collect Version | Gives images, reviews and the workfile the version of the next published workfile. Off by default. |
| Collect Image, Collect Workfile, Collect Review Data | Gather the layer data of images, the current document and the data a review needs. |
| Increment Workfile | After a successful publish, saves the workfile as the next version. Optional. |
| Collect extension version | Compares the installed extension with the version of the addon. Optional. |

### Remote publishing

For publishing that is started without an artist (the web publisher), the addon can create instances without the Publisher. Collectors read the batch data from `AYON_PUBLISH_DATA`, and run only for automated publishes.

| Plugin | What it does |
|---|---|
| Collect Color-coded Instances | Creates an instance for each visible top level layer marked with a configured color, using the product base type and product name template of its mapping. Can also create a flattened image of all marked layers. |
| Collect Auto Image, Collect Auto Review, Collect Auto Workfile | Create the image, review and workfile instances that an artist would have in the Publisher. |
| Close PS | Closes Photoshop after the publish. |

## Loading

| Loader | Loads | Notes |
|---|---|---|
| Load image | `image`, `render` | Imports the file as a layer named after the folder and product. Tracked as a container, so it can be updated or replaced. |
| Load reference | `image`, `render` | Imports a reference image as a layer, tracked as a container. |
| Load image from sequence | `render` | Asks for one frame of a sequence and imports that frame. It does not create a container. |

## Color management

When enabled, Photoshop follows the global color management of the core addon. The document's native color profile name is mapped to an OCIO colorspace through the remapping rules, and that colorspace is stored on the extracted images. File rules of the host are optional.

## Launch hooks

| Hook | Order | What it does |
|---|---|---|
| Install AYON extension | 1 | Installs or updates the extension when **Install AYON Extension** is on. |
| Launch arguments | 20 | Starts Photoshop through the AYON launch script, and passes workfile paths that are given to it. |

The hooks apply to local launches only.

## Related

- [Photoshop settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
