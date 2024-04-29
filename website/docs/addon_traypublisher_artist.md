---
id: addon_traypublisher_artist
title: Tray Publisher
sidebar_label: Tray Publisher
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.TrayPublisher_Badge}
</ReactMarkdown>

Tray Publisher is a standalone tool for publishing products into AYON pipeline.
It can be accessed via UI or command line.


## Tray Publisher UI
How to use it ? 
1. Access the tool via Tray menu.
![](assets/traypublisher/artist/open_publisher.gif)
2. Create and Publish 
   a. Select AYON Folder path
   b. Select a Task
   c. Select a product Type
   d. Drop your files
   e. Click create
   f. Finally, click publish.
![](assets/traypublisher/artist/publish_a_product.gif)
3. Then you'll be able to access the published product via AYON Loader.
![](assets/traypublisher/artist/check_in_loader.gif)


## Tray Publisher command line
Currently, Tray publisher supports two commands
1. `launch` : Shows publisher UI
2. `ingestcsv` : Ingest CSV file into project.

### Shows publisher UI
```shell
cd "C:\Program Files\Ynput\[AYON Launcher Version]"
.\ayon_console.exe addon traypublisher launch
```

### Ingest CSV file into project
```shell
cd "C:\Program Files\Ynput\[AYON Launcher Version]"
.\ayon_console.exe addon traypublisher ingestcsv --filepath '[CSV FILE ABS PATH]' --project [PROJECT_NAME] --folder-path [/FOLDER/PATH] --task [TASK NAME] --ignore-validators
```

## Default Product Types
### Simple Create Plugins
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

:::tip Simple Create Plugins
Admins are able to define extend simple create plugins via [Tray publisher addon settings](https://ayon.ynput.io/docs/addon_traypublisher_admin#creator-plugins).
:::

### Editorial Simple
...

![](assets/traypublisher/artist/editorial_simple.png)

### Batch Movies
...

### CSV Ingest 
...

## Default Validators
Tray Publisher provides simple validators. 
e.g.
- ColorSpace: Validate colorspace look attributes and representation colorspaces.
- Filepaths: Validate existence of source filepaths .
- Frame Ranges: Validating frame range of rendered files against state in AYON.