---
id: addon_traypublisher_artist
title: Tray Publisher Basic
sidebar_label: Basic Usage
description: Basic usage of Tray Publisher.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.TrayPublisher_Badge}
</ReactMarkdown>

## About Tray Publisher

Tray Publisher is a standalone tool for publishing products into AYON pipeline.

<div class="row">
<div class="col">

It can be reached via Tray menu.

</div>
<div class="col">

![](assets/traypublisher/artist/access_tray_publisher.png)

</div>
</div>

## How to use it?

**Just Drag and Drop**, That's how to use it.

Tray Publisher is nothing different than the regular [publisher](artist_tools_publisher.md) tool.
It implements two additional fields to drag and drop your files you want to publish. 

import how_to_use_tray_publisher from './assets/traypublisher/how_to_use_tray_publisher.mp4'

<video controls style={{width: "100%" }}>
  <source src={how_to_use_tray_publisher}/>
</video>


## Supported Product Types 

Tray Publisher supports publishing almost any type of data across the pipeline.
It also supports special creators for advanced publishes.


### Simple Create Plugins

:::tip Simple Create Plugins
Simple Create Plugins are defined in the [Simple Create Plugins](addon_traypublisher_admin.md#simple-create-plugins) addon settings.
Admins are able to change (remove/add/modify) them.
:::

Every simple creator shares the same usage.

![](assets/traypublisher/artist/creator_plugins.png)
*In this example, I've prefixed the labels of simple creators with `(ട)` for easy identification.*

#### Usage
- Select Folder and task from left side.
- Drag & drop Representations and reviewable representations.
- Create
- (optional) Set publish options
- Publish

#### Key Create Options
1. Variant: Product's variant name.
2. Thumbnail: Product's Thumbnail.
3. Representations: Files to include in your publish. The field can allow multiple items. each item can be a single file or file sequences. the field provides hints about the configuration of the representations filed.
4. Reviewable representation: Supports a single reviewable item. it can be a single file or file sequences.

#### Default Simple Creators
- `workfiles`: Workfiles are full scenes from any application that are directly edited by artists. They represent a state of work on a task at a given point and are usually not directly referenced into other scenes.
- `model`: Models should only contain geometry data, without any extras like cameras, locators or bones. *Keep in mind that models published from tray publisher are not validated for correctness.* 
- `pointcache`: Alembic or bgeo cache of animated data
- `plate`: Any type of image seqeuence coming from outside of the studio. Usually camera footage, but could also be animatics used for reference.
- `render`: Sequence or single file renders.
- `camera`: Ideally this should be only camera itself with baked animation, however, it can technically also include helper geometry.
- `image`: Any image data can be published as image product type. References, textures, concept art, matte paints. This is a fallback 2d product type for everything that doesn't fit more specific product type.
- `vdb`: Hierarchical data structure for the efficient storage and manipulation of sparse volumetric data discretized on three-dimensional grids.
- `matchmove`: Script exported from matchmoving application to be later processed into a tracked camera with additional data.
- `rig`: CG rigged character or prop. Rig should be clean of any extra data and directly loadable into it's respective application.	
- `simpleUnrealTexture`: Texture files with Unreal Engine naming conventions.
- `audio`: Audio files for review or final delivery.


### Editorial Simple

Tray Publisher Editorial workflow allows mass setup of shots from reference video and EDL (Edit Decision List).
This creator dissects the input video file(s) into clip chunks based on the given edit list file and then converts each to a defined format defined Settings for each product preset.

It also creates any missing folders and shots when publishing.

![](assets/traypublisher/artist/editorial_simple.png)

#### Usage

- Select parent folder from the folders list on the left side.
- Drag & drop the The edit list file and media files
- Create, An instance will be created for each discovered product.
- (optional) Set publish options
- Publish


#### Key Create Options
1. Variant: Product's variant name.
2. Edit List File: source edit list file, it supports different file extensions.
3. Media Files: Media files to convert
4. Timeline offset
5. Instances attributes: *This list is generated from `Product Type Presets` in Editorial Simple settings*
   - Review: Extract Review
   - plate
   - audio
6. FPS
7. Workfile start frame:
8. Handle start
9. Handle end
10. Additional attributes: This section includes attributes that will be populated by the entered edit list and clips.


:::info
The following videos were created for Openpype (AYON's predecessor).
The workflow remains the same but the settings have been moved to AYON Server instead.

- **Tray Publisher Editorial Workflow**<br/>
<iframe width="560" height="315" src="https://www.youtube.com/embed/oSDskPRINHU?si=21H2ZOsrwgXoKKyU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
- **Introduction to Tray Publisher for editorial workflows**<br/>
<iframe width="560" height="315" src="https://www.youtube.com/embed/yGfWAI44hGw?si=4LfZnNzbSh8pF8wZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

:::

### Batch Movies

It's capable of publishing individual mov files to specific shots based on file name.
<!-- TODO: Add File name pattern once the creator is fixed. 
For context, the Batch mov creator doesn't work. -->

:::note
Currently, This creator doesn't work as expected.
It should be fixed soon.
:::


### CSV Ingest 
This feature allows mass publishing arbitrary files through a CSV file.
It requires a CSV file and then drag and drop it inside the Tray Publisher.
:::info Missing folders
CSV Ingest also supports creating missing hierarchy folders in case they are missing.
:::

![](assets/traypublisher/artist/csv_ingest.png)

#### Usage
- Prepare your CSV File.
- Drag & Drop your CSV file
- Create, An instance will be created for each discovered product.
- (optional) set publish options
- Publish

#### Prepare your CSV File

The CSV columns should follow the columns specified in your AYON tray publisher [CSV Ingest settings](addon_traypublisher_admin.md#ingest-csv). <br/>
Find example CSV file here: [ay_240319_0001.zip](https://github.com/ynput/ayon-core/files/14651928/ay_240319_0001.zip).

Here's a list of the default columns. *Items with <span style={{color:"red"}}>\*</span> are required (must exist in the CSV file).*

- **File Path <span style={{color:"red"}}>*</span>**: File path of the product, it can be relative to the CSV file location.
- **Folder Path <span style={{color:"red"}}>*</span>**: Relative folder path to the selected folder in he publisher UI. if left blank, it'll use the default folder type in [Folder creation config](addon_traypublisher_admin.md#folder-creation-config).
- **Task Name <span style={{color:"red"}}>*</span>**: if left blank, it'll use the default task type in [Folder creation config](addon_traypublisher_admin.md#folder-creation-config).
- **Product Type**: Product type to publish e.g. `render` or `model`. 
- **Variant**: Variant name to use.
- **Version**: Leave blank to set the version to the next version.
- **Version Comment**: Comment to use for the published version of the product.
- **Version thumbnail**: Thumbnail to use for the published version of the product. Check supported   
- **Frame Start <span style={{color:"red"}}>*</span>**: Start frame of the product/task.
- **Frame End <span style={{color:"red"}}>*</span>**: End frame of the product/task.
- **Handle Start <span style={{color:"red"}}>*</span>**: Start Handle of the of the product/task.
- **Handle End <span style={{color:"red"}}>*</span>**: End Handle of the of the product/task.
- **FPS <span style={{color:"red"}}>*</span>**: FPS of the of the product/task.
- **Slate Exists**: Indicates if the provided sequence includes a slate. Use Boolean values (literal `True` or `False`).
- **Representation**: The provided representation must exist in [representation config](addon_traypublisher_admin.md#representation-config).
- **Representation ColorSpace**: Color space name to associate to the provided sequence.
- **Representation Tags**: Tags to add to the provided representation. Find a list of available tags [here](addon_core_settings.md/#tags)

:::tip Multiple representation per product

When using the same `File Path`, `Folder Path`, `Task Name`, `Product Type`, `Variant` and `Version` in multiple rows with different representations, the CSV Ingest will add these representations to the same version of the published product.

:::

### Colorspace Look
This creator is used to publish colorspace look files (`ociolook`) which are any LUT files. 
This product is available for loading in Nuke host.

![](assets/traypublisher/artist/ociolook_create_options.png)

#### Usage
- Select Folder and task from left side.
- Drag & drop a single LUT file.
- Create
- Set publish options
![](assets/traypublisher/artist/ociolook_publish_options.png)
- Publish

#### Supported Extensions 
- `.3dl`
- `.csp`
- `.cc`
- `.cube`
- `.lut`
- `.spi1d`
- `.spi3d`

### Online
Online file retain their original name and use it as product name.
To avoid conflicts, this creator checks if product with this name already exists under selected folder.

![](assets/traypublisher/artist/online.png)

#### Usage
- Select Folder and task from left side.
- Drag & drop a single file or file sequence.
- Create
- (optional) Set publish options
- Publish

#### Supported Extensions

- `.dpx`
- `.exr`
- `.jpg`
- `.m4v`
- `.mov`
- `.mp4 `
- `.mpg`
- `.mxf`
- `.png`
- `.tif`

### Editorial Package

This creator is used to publish a whole folder containing `OTIO` file and movie `.mov` files

The result is a single `editorial_pkg` product type and (possibly) convert `.mov` files into different format and copy them into `publish` `resources` subfolder.

![](assets/traypublisher/artist/editorial_package.png)

#### Usage
- Select Folder and task from left side.
- Drag & drop the **folder** containing the `OTIO` file and movie `.mov` files
- Create
- (optional) Set publish options
![](assets/traypublisher/artist/editorial_package_publish.png)
- Publish

## Default Publish Options

### Optinal plugins

- **Override Colorspace**: A drop down menu that allows selecting colorspace for your render.
- **Collect Original Sequence Frame Data**: Disable to enforce the frame range from AYON folder or task entities (including start and end handles).
- **Validate Existing Version**: Checks if the specified version of the product that is being published doesn't exist in AYON. Disable to override the specified version.
- **Validate Existing Online Files**: Validate that product doesn't exist yet.
- **Validate Frame Range**: Validating frame range of rendered files against state in AYON.
- **Validate representation colorspaces**: Validate colorspace look attributes and representation colorspaces.
- **Integrate Hero Version**
- **Validate Deadline Job Info**
- **Validate Deadline Pools**

### Deadline Options

![](assets/traypublisher/artist/deadline_options.png)

Tray publisher supports deadline submissions for some product types like `render`.

Default deadline options, *Admins can modify this list from settings, See [Job Info Profiles](addon_deadline_admin.md/#profiles).*

- **Frames per Task**
- **Priority**
- **Department**
- **Group**
- **Primary pool**
- **Secondary pool**
- **Frames**