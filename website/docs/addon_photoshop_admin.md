---
id: addon_photoshop_admin
title: Photoshop Admin Docs
sidebar_label: Photoshop
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Photoshop_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Photoshop settings

There is a couple of settings that could configure publishing process for **Photoshop**.
All of them are Project based, eg. each project could have different configuration.

Location: `ayon+settings://photoshop`

![Photoshop Project Settings](assets/admin_hosts_photoshop_settings.png)

## Auto Install Extension
> Setting Location: `ayon+settings://premiere/auto_install_extension`

When enabled, it will try to install AYON Photoshop extension to user `appData` if it's not installed already.

Example: `C:\Users\YOUR_USER_NAME\AppData\Roaming\Adobe\CEP\extensions\io.ynput.PS.panel`

It checks extension version for current addon version and updates it if necessary.

If artist has extension installed in original directory (`Program Files`), installation in `appData` takes a precedence.

Works for Windows and MacOS.

## Color Management (ImageIO)

Placeholder for Color Management. Currently not implemented yet.

## Creator plugins

Contains configurable items for creators used during publishing from Photoshop.

### Create Image

Provides list of [variants](artist_concepts.md#variant) that will be shown to an artist in Publisher. Default value `Main`.

### Create Flatten Image

Provides simplified publishing process. It will create single `image` instance for artist automatically. This instance will
produce flatten image from all visible layers in a workfile.

- Product template for flatten image - provide template for product name for this instance (example `imageBeauty`)
- Review - should be separate review created for this instance

### Create Review

Creates single `review` instance automatically. This allows artists to disable it if needed.

### Create Workfile

Creates single `workfile` instance automatically. This allows artists to disable it if needed.

## Publish plugins

Contains configurable items for publish plugins used during publishing from Photoshop.

### Collect Color Coded Instances

Used only in remote publishing!

Allows to create automatically `image` instances for configurable highlight color set on layer or group in the workfile.

#### Create flatten image
  - Flatten with images - produce additional `image` with all published `image` instances merged
  - Flatten only - produce only merged `image` instance
  - No - produce only separate `image` instances

#### Product name template for flatten image

Template used to create product name automatically (example `image{layer}Main` - uses layer name in product name)

### Collect Review

Disable if no review should be created

### Collect Version

If enabled it will push version from workfile name to all published items. Eg. if artist is publishing `test_asset_workfile_v005.psd`
produced `image` and `review` files will contain `v005` (even if some previous version were skipped for particular family).

### Validate Containers

Checks if all imported assets to the workfile through `Loader` are in latest version. Limits cases that older version of asset would be used.

If enabled, artist might still decide to disable validation for each publish (for special use cases).
Limit this optionality by toggling `Optional`.
`Active` toggle denotes that by default artists sees that optional validation as enabled.

### Validate naming of products and layers

Product cannot contain invalid characters or extract to file would fail

#### Regex pattern of invalid characters

Contains weird characters like `/`, `/`, these might cause an issue when file (which contains product name) is created on OS disk.

#### Replacement character

Replace all offending characters with this one. `_` is default.

### Extract Image

Controls extension formats of published instances of `image` product type. `png` and `jpg` are by default.

### Extract Review

Controls output definitions of extracted reviews to upload on Asset Management (AM).

#### Makes an image sequence instead of flatten image

If multiple `image` instances are produced, glue created images into image sequence (`mov`) to review all of them separately.
Without it only flatten image would be produced.

#### Maximum size of sources for review

Set Byte limit for review file. Applicable if gigantic `image` instances are produced, full image size is unnecessary to upload to AM.

#### Extract jpg Options

Handles tags for produced `.jpg` representation. `Create review` and `Add review to Ftrack` are defaults. 

#### Extract mov Options

Handles tags for produced `.mov` representation. `Create review` and `Add review to Ftrack` are defaults. 

### Extract Layers

Export layers within the instance layerset to a PSD file.

![Photoshop Extract Layers](assets/admin_hosts_photoshop_publish_extract-layers.png)

#### Merge layersets Options

Each layerset within the instance will be merged into a layer.

![Photoshop Extract Layers - Merge Layersets](assets/admin_hosts_photoshop_publish_extract-layers_merge-layersets.png)


### Workfile Builder

Allows to open prepared workfile for an artist when no workfile exists. Useful to share standards, additional helpful content in the workfile.

Could be configured per `Task type`, eg. `composition` task type could use different `.psd` template file than `art` task.
Workfile template must be accessible for all artists.
(Currently not handled by [SiteSync](addon_site_sync_admin.md))