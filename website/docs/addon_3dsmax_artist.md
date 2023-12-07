---
id: addon_3dsmax_artist
title: 3Ds Max Artist Docs
sidebar_label: 3Ds Max
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Max_Badge}
</ReactMarkdown>

:::note Work in progress
This part of documentation is still work in progress.
:::

<!-- ## AYON Global Tools

-   [Work Files](artist_tools_workfiles)
-   [Create](artist_tools_creator)
-   [Load](artist_tools_loader)
-   [Manage (Inventory)](artist_tools_inventory)
-   [Publish](artist_tools_publisher)
-   [Library Loader](artist_tools_library_loader)
-->


## First Steps With AYON

Locate **AYON Icon** in the OS tray (if hidden dive in the tray toolbar).

> If you cannot locate the AYON icon ...it is not probably running so check [Getting Started](artist_getting_started.md) first.

By clicking the icon  ```AYON Menu``` rolls out.

![Menu AYON](assets/3dsmax/artist/3dsmax_tray_OP.png)

Choose ```AYON Menu > Launcher``` to open the ```Launcher``` window.

When opened you can **choose** the **project** to work in from the list. Then choose the particular **asset** you want to work on then choose **task**
and finally **run 3dsmax by its icon** in the tools.

![AYON Launcher](assets/3dsmax_Ayon_launcher.png)

:::note Launcher Content
The list of available projects, assets, tasks and tools will differ according to your Studio and need to be set in advance by supervisor/admin.
:::

## Running in the 3dsmax

If 3dsmax has been launched via OP Launcher there should be **AYON Menu** visible in 3dsmax **top header** after start.
This is the core functional area for you as a user. Most of your actions will take place here.

![Menu AYON](assets/3dsmax/artist/3dsmax_menu_first_OP.png)

:::note AYON Menu
User should use this menu exclusively for **Opening/Saving** when dealing with work files not standard ```File Menu``` even though user still being able perform file operations via this menu but preferably just performing quick saves during work session not saving actual workfile versions.
:::

## Working With Scene Files

In AYON menu first go to ```Work Files``` menu item so **Work Files  Window** shows up.

 Here you can perform Save / Load actions as you would normally do with ```File Save ``` and ```File Open``` in the standard 3dsmax ```File Menu``` and navigate to different project components like assets, tasks, workfiles etc.


![Menu AYON](assets/3dsmax/artist/3dsmax_menu_OP.png)

You first choose particular asset and assigned task and corresponding workfile you would like to open.

If not any workfile present simply hit ```Save As``` and keep ```Subversion``` empty and hit ```Ok```.

![Save As Dialog](assets/3dsmax/artist/3dsmax_SavingFirstFile_OP.png)

AYON correctly names it and add version to the workfile. This basically happens whenever user trigger ```Save As``` action. Resulting into incremental version numbers like

```workfileName_v001```

```workfileName_v002```

 etc.

Basically meaning user is free of guessing what is the correct naming and other necessities to keep everything in order and managed.

> Note: user still has also other options for naming like ```Subversion```, ```Artist's Note``` but we won't dive into those now.

Here you can see resulting work file after ```Save As``` action.

![Save As Dialog](assets/3dsmax/artist/3dsmax_SavingFirstFile2_OP.png)

## Understanding Context

As seen on our example AYON created pretty first workfile and named it ```il_asset_art_v002.max``` meaning it sits in the Project ```il``` being it ```asset``` asset and workfile being ```art``` task and obviously ```v002``` telling user its first existing version of this workfile.

It is good to be aware that whenever you as a user choose ```asset``` and ```task``` you happen to be in so called **context** meaning that all user actions are in relation with particular ```asset```. This could be quickly seen in host application header and ```AYON Menu``` and its accompanying tools.

![Workfile Context](assets/3dsmax/artist/3dsmax_context.png)

> Whenever you choose different ```asset``` and its ```task``` in **Work Files window** you are basically changing context to the current asset/task you have chosen.


This concludes the basics of working with workfiles in 3dsmax using AYON and its tools. Following chapters will cover other aspects like creating multiple assets types and their publishing for later usage in the production.

---

## Creating and Publishing Instances

:::warning Important
Before proceeding further please check [Glossary](artist_concepts.md) and [What Is Publishing?](artist_publish.md) So you have clear idea about terminology.
:::


### Intro

Current AYON integration (ver 3.15.4) supports only ```PointCache```, ```Camera```, ```MaxScene```,  ```Render```, ```PointCloud```
```TyCache```, ```RedshiftProxy``` and ```Review``` product types now.

**Pointcache** product type being basically any geometry outputted as Alembic cache (.abc) format

**Camera** product type being 3dsmax Camera object with/without animation outputted as native .max, FBX, Alembic format

**MaxScene** product type being 3dsmax scene outputted as native .max format

**Render** product type being 3dsmax scene submitted to AWS Thinkbox Deadline. Currently supports 3dsmax standard renderers, Vray and Redshift for multipass submissions. Only supports Arnold for beauty (RGBA) render submission.

**Point Cloud** and **TyCache** product type being 3dsmax cache generated from tyFlow plugin and outputted as PRT(Pointcloud)/TYC(TyCache) format.
As tyFlow is an external plugin from 3dsmax, make sure to get it install before using the product types.

**Redshift Proxy** product type being 3dsmax objects converted and outputted as RS format. As Redshift is an external plugin from 3dsmax,
user require to install redshift before using the product type.

**Review** product type being 3dsmax scene creating preview animation and outputted as video and image sequences(if users select keep image sequences)

---

### Publishing Point Cache (Alembic)

Simply select any animated geometry you want to export as alembic format and go **AYON -> Create** and select **Point Cache**. Make sure to keep your geometry selected before **Publish**. The output format of the geometry is Alembic (abc).

### Loading Point Cache

When you load the Point Cache via **AYON -> Load**, it creates the container which includes the Alembic object parented to the point cache object.

### Publishing Camera

Select the camera you want to export and go **AYON -> Create** and select **Camera**.
User can go **Publish** and decide the export options by turning on/off the camera extractors.

![Max Camera Extractor](assets/3dsmax/artist/3dsmax_camera_extractors.png)

:::warning Alembic compatibility
The exported Alembic from the current alembic extractor may only be loaded in Max. It may not be compatible with the alembic loader in other DCCs
such as Maya.
:::

### Loading Camera

The loader provides several options to load camera. You can import camera in either native Max, Fbx and Alembic (abc) format.

![Max Camera Loader](assets/3dsmax/artist/3dsmax_camera_loaders.png)

Similar to the Point Cache Instance, the Alembic camera loader will creates the container which includes the Alembic object parented to the point cache object.


The Fbx and max scene Loader import the published camera object which is parented to the newly created container.

### Publishing MaxScene

Select any type of objects in the scene you want to export and go **AYON -> Create** and select **Max Scene**.

### Loading MaxScene

Similar to other max scene loader, it will create the new containers which includes the published max scene object.

### Render

After choosing your render setting, select the target camera for rendering in the scene and go **AYON -> Create** and select **Render**.
When you go to **Publish**, you can set up the preferences in either creator or AYON setting before the deadline submission.

![Max Render AYON Setting](assets/3dsmax_ayon_render_setting.png)

![Max Render Creator Setting](assets/3dsmax/artist/3dsmax_deadline_render_settings.png)

The Render Instance supports AOV renders for VRay, Redshift, and 3dsMax default renderers(i.e QuickSliver Hardware Renderer, ART Renderer, Scanline Renderer, VUE File Renderer). Merely supports beauty render for Arnold due to the pymxs API limitation.

:::note
Make sure removing the old render instance and create the new one if you switch from one renderer to another
:::

### Point Cloud/TyCache

:::note Reminder
Point Cloud Instance only works when tyFlow plugin installed in 3dsmax
TyCache Instance only works when tyFlow Pro plugin installed in 3dsmax
:::

### Publishing Point Cloud
Select the tyFlow object(s) you want to export and go **AYON -> Create** and select **Point Cloud**. The exported object(s) would be in PRT format
You can add the attributes which needs to be exported in AYON setting before publishing.

![Max Point Cloud Attributes Setting](assets/3dsmax_pointcloud_attributes.png)


### Publishing TyCache
Select the tyFlow object(s) you want to export and go **AYON -> Create**  and select **TyCache**, you can choose the attribute data of tyCache to be exported in TYC format.
![Max Review Creator Setting](assets/3dsmax_tycache_settings.png)

:::note Info for TyCache Attributes Option
For users to have more information to know what the attributes they are exporting.

**Channels**

*Age* : tycacheChanAge, *Groups*: "tycacheChanGroups", *Position*: "tycacheChanPos",
*Rotation*: "tycacheChanRot", *Scale*: "tycacheChanScale", *Velocity*: "tycacheChanVel",
*Spin*: "tycacheChanSpin", *Shape*: "tycacheChanShape", *Material ID*: "tycacheChanMatID",
*Mapping*: "tycacheChanMapping", *Materials*: "tycacheChanMaterials",
*Custom Float*: "tycacheChanCustomFloat", *Custom Vectors*: "tycacheChanCustomVector",
*Custom TMs*: "tycacheChanCustomTM", *PhysX Data*: "tycacheChanPhysX"

**Mesh Files**

*Backup at regular itnervals*: "tycacheMeshBackup"

**Geometry Settings**

*Include cloth geometry*: "tycacheAdditionalCloth",
*Include actor skinned meshes*: "tycacheAdditionalSkin",
*Include actor skinned meshes ID*: "tycacheAdditionalSkinID",
*Include actor skinned meshes ID value*: "tycacheAdditionalSkinIDValue",
*Include terrain geometry*:"tycacheAdditionalTerrain",
*Include VDB geometry*: "tycacheAdditionalVDB",
*Include spline path geometry*: "tycacheAdditionalSplinePaths",
*Include additional geometry*: "tycacheAdditionalGeo",
*Activate render-only modifiers*: "tycacheAdditionalGeoActivateModifiers"

**Splines Settings**

*Include Spline Paths operators*: "tycacheSplines",
*Include additional splines*: "tycacheSplinesAdditionalSplines"
:::

### Loading Point Cloud/TyCache
When you load the point cloud through **AYON -> Load**, Max will create *tycache* object in the 3dsmax modifier's list and load the published PRT.

### Publishing Redshift Proxy
:::note Reminder
Redshift Proxy only works when Redshift is installed in 3dsMax and it is the current renderer in the scene.
:::
Select the object(s) you want to convert as redshift proxy and go **AYON -> Create**  and select **RedshiftProxy**. The exported objects will be outputted as RS format.

### Loading Redshift Proxy
You can load the redshift proxy through **AYON -> Load**, it will then load the redshift proxy with the converted object(s).

### Review
Select the target camera you want to create preview animation and go **AYON -> Create** and select **Review**.You can set up the preferences(e.g. resolution) with the creator or AYON setting before creating the instance.

![Max Review AYON Setting](assets/3dsmax_review_ayon_setting.png)

![Max Review Creator Setting](assets/3dsmax_review_creator_setting.png)

You can always edit if you want to create preview animation with different settings. You can also choose what to include in the preview animation.

![Max Review Publish Setting](assets/3dsmax_review_publish_setting.png)

## Validators

### Validate Frame Range
This validator is optional to check if the frame range in the scene aligns with that in the AYON project settings.
You can switch on/ off in either the project settings in AYON setting or the toggled button in Publisher Tab.

![Max Validate Frame Range in Ayon](assets/3dsmax_validator_frame_range_ayon_setting.png)

![Max Validate Frame Range in Publisher](assets/3dsmax_validator_frame_range_publisher_setting.png)

### Validate Attributes
This validator is to make sure the property attributes are valid in 3dsMax.
You need to put the data in JSON format in the AYON setting for attributes check.

![Max Validate Attributes](assets/3dsmax_validator_attributes.png)

:::note Example for inputting the JSON format in the setting.
E.g. If you want to check if ```renderers.current.separateAovFiles=true``` or
```renderers.current.MotionBlurShutterAngle=160.5``` etc..
```
{
    "renderers.current": {
        "separateAovFiles": true,
        "MotionBlurShutterAngle": 160.5,
        "PrimaryGIEngine": "#RS_GIENGINE_BRUTE_FORCE",
        "OCIOViewName": "ACES 1.0 SDR-video"
    }
}
```
:::

### Validate Loaded Plugin
This validator ensures the plugins are available for certain product types before publishing instances in 3dsMax.
You need to click ```+``` button to add product type and the plugins you want to validate within it.

![Max Validate Loaded Plugins](assets/3dsmax_validator_loaded_plugins.png)

