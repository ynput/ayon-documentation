---
id: artist_hosts_unreal
title: Unreal
sidebar_label: Unreal
---

## Working with AYON in Unreal Engine

AYON in Unreal Engine allows you to create, publish and manage assets and scenes across different projects and platforms. AYON handles tasks such as versioning, validation, synchronization, rendering and publishing in Unreal.

## Getting started with Unreal Engine in AYON

### Prerequisites

AYON supports Unreal Engine 5.0 and 5.1. To use it, you need to install the [AYON Integration plugin](https://temp.com) from the Unreal Marketplace.

## Unreal project and data structure

While other hosts in AYON have specific workfiles for each task, Unreal Engine is a bit different.
An Unreal project is made by design to contain all the content of a project, so it wouldn't make sense to have more than one.
We recommend creating a task in AYON specifically for Unreal, and use that task to manage the Unreal project.

For linear animation projects, and in particular for episodic formats, we still recommend keeping only one Unreal project. Having a project for each episode would result in duplicated data between the episodes, and it would be hard to manage.

<!-- TODO: ![Unreal Task]() -->

### AYON Menu and global AYON tools

The AYON menu will be the main tool to interact with AYON in Unreal. It will allow you to create, load, publish and manage assets.

-   [Create](artist_tools_creator) is the tool to create metadata for asset publishing.
-   [Load](artist_tools_loader) is the tool to load assets from AYON into Unreal.
-   [Manage (Inventory)](artist_tools_inventory) is the tool to manage loaded assets.
-   [Publish](artist_tools_publisher) is the tool to publish assets from Unreal to AYON.
-   Render, which starts the render for a selected `AyonPublishInstance`.

<!-- TODO: ![AYON Menu]() -->

### Default structure

The structure of the project data is handled by AYON. The first time you create an instance or load an asset, AYON will create a folder called `AYON` in the Content Browser. This folder will contain all the data handled by AYON, and it is organised as follows:

- `/Content/AYON/Assets` contains all the single assets that are loaded from AYON.
- `/Content/AYON/PublishInstances` contains all the instances that are created in Unreal.
- The rest of the directories are generated automatically when loading layouts and cameras. They will have the same structure of your project and will contain the levels and level sequences that are generated when you load those kinds of asset.

To be better identifiable, these folders are colored with the AYON color palette.

### DataAssets

AYON introduces two type of Unreal Assets: `AyonAssetContainer` and `AyonPublishInstance`. These assets are used to manage Ayon metadata in Unreal, and they are not meant to be used directly in the scene. The first ones are used to store metadata of loaded assets, while the second ones for metadata of assets that are going to be published.

## Static and Skeletal Meshes

Unreal handles models and rigs as [Static](https://docs.unrealengine.com/en-US/Engine/Content/Importing/FBX/StaticMeshes/index.html) and [Skeletal](https://docs.unrealengine.com/en-US/Engine/Content/Importing/FBX/SkeletalMeshes/index.html) Meshes. To load one of these kinds of assets, just choose **AYON → Load ...**, right-click your mesh and select **Import Static Mesh** or **Import Skeletal Mesh**.

These meshes can be loaded as FBX or as Alembic. The latter can be also be loaded as a point cache, but with some [limitations](https://docs.unrealengine.com/5.1/en-US/alembic-file-importer-in-unreal-engine/).

The meshes will be loaded in the `/Content/AYON/Assets` folder, and they will be automatically added to the `AyonAssetContainer` asset that is created in the same folder. The Container will only contain the metadata of the asset, and it will not be used in the scene. Instead, in the same folder you will find the imported mesh, which can be added to the scene [as usual](https://docs.unrealengine.com/5.1/en-US/assets-and-content-packs-in-unreal-engine/).

### Publishing

To publish a mesh from Unreal, you need to create a publish instance for the mesh. To do this, select the mesh in the Content Browser, and click on **AYON → Create ...**. This will open the Creator screen. From here, select *Static Mesh* or *Skeletal Mesh*, set the name of the subset, and click on **Create**. This will create a `AyonPublishInstance` file in `/Content/AYON/PublishInstances`, with the metadata necessary to publish the asset.

You can now click on **AYON → Publish ...** to open the Publisher screen. On the left, you will see all the publish instances that you have created. Select the ones that you want to publish, and click on **Publish**.

## Look development

AYON supports look development in Unreal Engine.

### Loading model

First, you will need a model as Static Mesh. To load it, just choose **AYON → Load ...**, right-click your mesh and select **Import Static Mesh**. You will find the loaded Static Mesh in `/Content/AYON/Assets`.

### Creating look

To create the look, you will need to create the [Materials](https://docs.unrealengine.com/5.1/en-US/Engine/Rendering/Materials/) for the model you loaded, and assign them to the model. You can create the materials in Unreal, or you can import them from AYON as UAsset.

### Publishing look

Select the model with the materials in the Content Browser, and click on **AYON → Create ...**. This will open the Creator screen. From here, select *Material*, set the name of the subset, and click on **Create**. This will create a `AyonPublishInstance` file in `/Content/AYON/PublishInstances`, with the metadata necessary to publish the asset.

To get the look ready to be publishable, AYON will create a new folder `/Content/AYON/Looks`. In here, it will be created a folder that will contain a simple model with the materials you created assigned, that will be used to publish the look. This folder will be named after subset name you chose when creating the instance. You don't need to do anything with this folder, it is just for the publishing process.

You can now click on **AYON → Publish ...** to open the Publisher screen. On the left, you will see all the publish instances that you have created. Select the ones that you want to publish, and click on **Publish**.

## UAssets

Unreal Engine uses [UAssets](https://docs.unrealengine.com/5.1/en-US/working-with-assets-in-unreal-engine/) to store assets. AYON supports publishing and loading of this kind of assets.

To publish UAssets, you will need to create a publish instance for the asset. To do this, select the asset in the Content Browser, and click on **AYON → Create ...**. This will open the Creator screen. From here, select *UAsset*, set the name of the subset, and click on **Create**. This will create a `AyonPublishInstance` file in `/Content/AYON/PublishInstances`, with the metadata necessary to publish the asset.

:::note
Publishing UAssets has some limitations currently. You can only publish a single UAssets, and it must not have any dependencies.
:::

You can now click on **AYON → Publish ...** to open the Publisher screen. On the left, you will see all the publish instances that you have created. Select the ones that you want to publish, and click on **Publish**.

To load a UAsset, just choose **AYON → Load ...**, right-click your asset and select **Load UAsset**. You will find the loaded UAsset in `/Content/AYON/Assets`.

## Layouts

### Layouts for linear animation

There are two different layout options in Unreal, depending on the type of project you are working on. This section explains how to handle layouts for linear animation. To do this, AYON generates [Master Sequences](https://docs.unrealengine.com/5.1/en-US/master-sequences-shots-and-takes-in-unreal-engine/) to track the whole level sequence hierarchy.
To set this mode, you should turn **on** the setting *Generate level sequences when loading layouts* in AYON **Project Settings → Unreal Engine**.

![Unreal OP Settings Level Sequence](assets/unreal_setting_level_sequence.png)

#### Loading

To load a layout, click on the AYON icon in Unreal’s main taskbar, and select **Load**.

![Unreal OP Tools Load](assets/unreal_openpype_tools_load.png)

Select the task on the left, then right click on the layout asset and select **Load Layout**.

![Unreal Layout Load](assets/unreal_load_layout.png)

If you need to load multiple layouts, you can select more than one task on the left, and you can load them together.

![Unreal Layout Load Batch](assets/unreal_load_layout_batch.png)

#### Navigating the project

The layout will be imported in the directory `/Content/AYON`. The layout will be split into two subfolders. In `/Content/AYON/Assets` you will find all the rigs and models contained in the layout, while the folder with the name of the layout will contain the levels and the level sequences.

Typically, in a linear animation project, the project will be split into several shots, and shots are organised in scenes. If the project is episodic, scenes will also be organised in episodes. To reflect this structure, whenever you load a layout, AYON will create the same hierarchy of your project with [Level Sequences](https://docs.unrealengine.com/5.1/en-US/unreal-engine-sequencer-movie-tool-overview/) and Levels.

In the main folder of the layout (or the episode folder, in case of an episodic project), you will find the master level and the master level sequence and the folders for all the scenes in the episodes. AYON is then flexible to accomodate any kind of project structure, and each layer will have its own level sequence. Finally, each shot will have again their own level sequence, and their own level.

After opening the master level, open the *Levels* window (from the menu **Windows → Levels**), and you will see the list of the levels of each shot of the episode for which a layout has been loaded.

![Unreal Level List](assets/unreal_level_list.png)

Here you will be able to add any other level that you need to the master level. For example, you can add the environment level to the master level, so that it is always loaded when you open the master level, or any level that contains the lighting.

![Unreal Add Level](assets/unreal_add_level.png)

After adding the environment level to the master level, you will need to set it as always loaded by right clicking it, and selecting **Change Streaming Method** and selecting **Always Loaded**.

![Unreal Level Streaming Method](assets/unreal_level_streaming_method.png)

 Otherwise, you will need to set the visibility in the master sequence.

#### Update layouts

To manage loaded layouts, click on the AYON icon in Unreal’s main taskbar, and select **Manage**.

![Unreal OP Tools Manage](assets/unreal_openpype_tools_manage.png)

You will get a list of all the assets that have been loaded in the project.
The version number will be in red if it isn’t the latest version. Right click on the element, and select Update if you need to update the layout.

:::warning
**DO NOT** update rigs or models imported with a layout. Update only the layout.
:::

### Layouts for interactive projects

There are two different layout options in Unreal, depending on the type of project you are working on. This section explains how to handle layouts for interactive projects. In this case, AYON will not generate the level sequences hierarchy, but will load the layout in a single level and with a single level sequence.
To set this mode, you should turn **off** the setting *Generate level sequences when loading layouts* in AYON **Project Settings → Unreal Engine**.

![Unreal OP Settings Level Sequence](assets/unreal_setting_level_sequence.png)

#### Loading

The layout will be imported in the directory `/Content/AYON`. The layout will be split into two subfolders. In `/Content/AYON/Assets` you will find all the rigs and models contained in the layout, while the folder with the name of the layout will contain the levels and the level sequences.

The layout level will and should contain only the data included in the layout. To add other elements, like the environment or the lighting, you have to create a master level, and add the layout level as a [streaming level](https://docs.unrealengine.com/5.1/en-US/level-streaming-in-unreal-engine/).

Create the master level and open it. Then, open the *Levels* window (from the menu **Windows → Levels**). Click on **Levels → Add Existing** and select the layout level and the other levels you with to include in the scene. The following example shows a master level in which have been added a level with lighing and the layout level.

![Unreal Add Level](assets/unreal_add_level.png)
![Unreal Level List](assets/unreal_level_list_no_sequences.png)

### Layout on existing project

In case you already loaded the assets in Unreal, or imported them manually, and have assembled a scene in Unreal, you can still load the layout to match the existing assets. To do so, after having published the layout, you can load it in Unreal by selecting **Load Layout on Existing Scene** in the Loader. This will create the *AyonAssetContainer* for each asset you have in the scene that does not have one yet, and will create the *AyonAssetContainer* for the layout.

You have the option, in **Project Settings → Unreal Engine** to delete any unmatched asset in the scene.

### Layouts from Maya

### Layouts from Blender

### Publishing layouts

AYON supports publishing of layouts directly from Unreal. To publish a layout, you will need to create a `AyonPublishInstance`. To do so, open a level and select the actors you want to include in the layout. Then, click on **AYON → Create ...**. This will open the Creator screen. From here, select *Layout*, set the name of the subset, and click on **Create**. This will create a `AyonPublishInstance` file in `/Content/AYON/PublishInstances`, with the metadata necessary to publish the layout.

You can now click on **AYON → Publish ...** to open the Publisher screen. On the left, you will see all the publish instances that you have created. Select the ones that you want to publish, and click on **Publish**.

## Cameras

## Animations

## Rendering

:::note
The rendering requires a layout loaded with the option to create the level sequences **on**.
:::

### Creating the render instance

To render and publish an episode, a scene or a shot, you will need to create a Render `AyonPublishInstance`. The publish instance for the rendering is based on one level sequence. That means that if you want to render the whole project (or a the whole episode), you will need to create it for the master level sequence, but if you want to render just one shot, you will need to create it for that shot.

Navigate to the folder that contains the level sequence that you need to render. Select the level sequence, and then click on the AYON icon in Unreal’s main taskbar, and select **Create**. In the Creator window select **Render**, give it a name, and click **Create**. The render instance will be created in `/Content/AYON/PublishInstances`.

![Unreal OP Tools Create](assets/unreal_openpype_tools_create.png)

![Unreal OP Instance Creator](assets/unreal_create_render.png)

### Render settings

AYON offers a set of render settings that you can set from the Projects Settings. Settings like frame rate, frame range, and resolution can be set in the **Project Settings → Anatomy → Attributes**. Settings more specific to Unreal can be found in **Project Settings → Unreal Engine**, and these are:
- Render Format, Unreal supports **EXR**, **PNG**, **JPG** and **BMP**. 
- Pre-roll Frames, the amount of warm up frames that will be rendered before the actual render.

Additionally, AYON allows you to prepare a [preset of settings](https://docs.unrealengine.com/5.1/en-US/cinematic-render-settings-in-unreal-engine/) directly from the [Movie Render Queue](https://docs.unrealengine.com/5.1/en-US/render-cinematics-in-unreal-engine/) and pass them to the render. To do so, you will need to set the path of the preset in **Project Settings → Unreal Engine**.

### Start the rendering

To start the rendering, just select the render `AyonPublishInstance` you want to render, and then click on the AYON icon in Unreal’s main taskbar, and select **Render**. You can render more than one instance at a time, if needed. Just select all the instances that you need to render before selecting the **Render** button from the AYON menu.

![Unreal OP Tools Render](assets/unreal_openpype_tools_render.png)

### Publish the render

Once the render is finished, you can publish the render. Click on the AYON icon in Unreal’s main taskbar, and select **Publish**.

![Unreal OP Tools Publish](assets/unreal_openpype_tools_publish.png)

On the left, in the list of publish instances, you will find the render instances that you created earlier. They will be automatically reorganised to have an instance for each shot. So, for example, if you have created the render instance for the whole episode, here you will have an instance for each shot in the episode.

![Unreal Publish Render](assets/unreal_publish_render.png)

Click on the play button in the bottom right, and it will start the publishing process.
