---
id: artist_hosts_houdini
title: Houdini
sidebar_label: Houdini
---
[![Houdini addon - 0.1.4](https://img.shields.io/badge/Houdini%20addon-0.1.4-FF4713?logo=houdini)](https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/houdini)

## AYON global tools

- [Work Files](artist_tools_workfiles)
- [Create](artist_tools_creator)
- [Load](artist_tools_loader)
- [Manage (Inventory)](artist_tools_inventory)
- [Publish](artist_tools_publisher)
- [Library Loader](artist_tools_library_loader)

## Ayon Menu

![ayon-menu](assets/houdini/artist/ayon-menu.png)

1. asset_name, task_name
2. Ayon create, publish, load and manage loaded assets
3. manage workfiles and artist notes
4. set global start and end frames for your Houdini session as well as FPS 
5. Update Houdini variables as in studio settings
6. Not implemented yet

## Ayon Publishing Process
:::info
Ayon tries to not be opinionated on your workflow, it only ensures that your work meets your studio's technical specifications using studio project settings customizations to customize it for particular studio or project's needs.
:::

The current publishing process is
1. Create a publish instance using `Create` menu or tab menu
2. Click publish! 
   
| Tab Menu | Create Menu |
|--|--|
| ![tab-menu](assets/houdini/artist/tab-menu.png) | ![create-menu](assets/houdini/artist/create-menu.png) |

| Publish |
|--|
| ![publish-button](assets/houdini/artist/publish-button.png) |

## Create and publish products

### Alembic Camera 
Publish baked camera in Alembic format. 

Steps:
- Select your camera
- Go **AYON -> Create**, select **Camera (abc)**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Create Camera (abc)` from the tab menu.* 
  > ![alembic-camera-tab-menu](assets/houdini/artist/alembic-camera-tab-menu.png)
- Ayon will create Alembic ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your camera will be published to `.abc` file.

import alembic_camera from './assets/houdini/artist/alembic_camera.mp4'

<video controls style={{width: "75%" }}>
  <source src={alembic_camera}/>
</video>

### Arnold Scene Source 
Publish Arnold .ass Archive.

Steps:
- Go **AYON -> Create**, select **Arnold ASS**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Arnold ASS` from the tab menu.* 
  > ![arnold-ass-tab-menu](assets/houdini/artist/arnold-ass-tab-menu.png)
- Ayon will create Arnold ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your scene source will be published to `.ass` file.

### Arnold ROP 
Publish Arnold Render.

Steps:
- Go **AYON -> Create**, select **Arnold ROP**, set **Variant** name, set user attributes and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Arnold ROP` from the tab menu.* 
  > ![arnold-rop-tab-menu](assets/houdini/artist/arnold-rop-tab-menu.png)
- Ayon will create Arnold ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected format.

![arnold-rop-publisher-ui](assets/houdini/artist/arnold-rop-publisher-ui.png)


### Composite (Image Sequence) 
Publish image sequence from Houdini `cop` networks.

Steps:
- Select your cop node
- Go **AYON -> Create**, select **Composite (Image Sequence)**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Composite (Image Sequence)` from the tab menu.* 
  > ![composite-tab-menu](assets/houdini/artist/composite-tab-menu.png)
- Ayon will create Composite ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your cop will be published to `exr` file.

import composite_seq from './assets/houdini/artist/composite.mp4'

<video controls style={{width: "75%" }}>
  <source src={composite_seq}/>
</video>


### Houdini Digital Asset
Publish Houdini Digital Asset for an easy interchange of data between Houdini instances or even other DCCs with Houdini Engine.
HDAs can be used to publish most of Houdini nodes.

:::caution Current limitations
1. Any HDA created by Ayon, you are not supposed to change its definition otherwise it will break.
2. It only works in Objects level
3. Having consistent data inside the HDA is your responsibility 
:::

Steps:
- Go **AYON -> Create**, select **Houdini digital asset (hda)**, set **Variant** name and click **`Create 》`**. 
- Ayon will create a HDA definition in **/obj** and move your selection inside it.
- After that, you can **AYON -> Publish** and after some validations your HDA will be published to `.hda` file.
  
import hda from './assets/houdini/artist/hda.mp4'

<video controls style={{width: "75%" }}>
  <source src={hda}/>
</video>

### Karma ROP
Publish Karma render from Houdini.

Steps:
- Select your candidate objects
- Go **AYON -> Create**, select **Karma ROP**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Karma ROP` from the tab menu.* 
  > ![karma-rop](assets/houdini/artist/karma-rop.png)
- Ayon will create Karma ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected format.

import karma_rop from './assets/houdini/artist/karma-rop.mp4'

<video controls style={{width: "75%" }}>
  <source src={karma_rop}/>
</video>


### Mantra ROP 
Publish Mantra render from Houdini.

Steps:
- Select your candidate objects
- Go **AYON -> Create**, select **Mantra ROP**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Mantra ROP` from the tab menu.* 
  > ![mantra-rop](assets/houdini/artist/mantra-rop.png)
- Ayon will create Mantra ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected format.

import mantra_rop from './assets/houdini/artist/mantra-rop.mp4'

<video controls style={{width: "75%" }}>
  <source src={mantra_rop}/>
</video>

### PointCache (Abc)
Publish Alembic point caches from Houdini.

Steps:
- Select your sop node or obj node
- Go **AYON -> Create**, select **PointCache (Abc)**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create PointCache (Abc)` from the tab menu.* 
  > ![alembic-rop-tab-menu](assets/houdini/artist/alembic-rop-tab-menu.png)
- Ayon will create Alembic ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the `.abc` file.

:::info Node Selection
 When selecting an ObjNode, Ayon will try to get its sop output node with the minimum `Output Index` otherwise it will get the sop node with display flag.
:::

:::caution
 Adding a `path` attribute to alembic point caches is a mandatory which achieves better compatibility with other DCCs.How
you handle `path` attribute is up to you. Ayon does not enforce specific values, it only checks for `path` presence and suggests a default `path` value if it is missing.
:::

import alembic_pointcache from './assets/houdini/artist/alembic_pointcache.mp4'

<video controls style={{width: "75%" }}>
  <source src={alembic_pointcache}/>
</video>

### PointCache (Bgeo)
Publish Bgeo point caches from Houdini.

Steps:
- Select your sop node
- Go **AYON -> Create**, select **PointCache (Bgeo)**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create PointCache (Bgeo)` from the tab menu.* 
  > ![bgeo-rop-tab-menu](assets/houdini/artist/bgeo-rop-tab-menu.png)
- Ayon will create Geometry ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected bgeo format.

![pointcache-bgeo-publish](assets/houdini/artist/pointcache-bgeo-publish.png)

### Redshift Proxy 
Publish Bgeo point caches from Houdini.

Steps:
- Select your sop node
- Go **AYON -> Create**, select **Redshift Proxy**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Redshift Proxy` from the tab menu.* 
  > ![redshift-proxy-rop-tab-menu](assets/houdini/artist/redshift-proxy-rop-tab-menu.png)
- Ayon will create Redshift Proxy ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the `.rs` file.

### Redshift ROP 
Publish Redshift render from Houdini.

Steps:
- Select your candidate objects
- Go **AYON -> Create**, select **Redshift ROP**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Redshift ROP` from the tab menu.* 
  > ![redshift-rop-tab-menu](assets/houdini/artist/redshift-rop-tab-menu.png)
- Ayon will create Redshift ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected format.
  
### Review 
Publish Reviews from Houdini.

Steps:
- Select your candidate objects
- Go **AYON -> Create**, select **Review**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Review` from the tab menu.* 
  > ![review-rop](assets/houdini/artist/review-rop.png)
- Ayon will create OpenGl ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected format.

:::info Notes
**ColorManagement:** Specifying a value for `OCIO Colorspace` parameter is a mandatory if OCIO is enabled.
Ayon doesn't enforce specific values, it only validates the value is an existent colorspace otherwise it suggests using default colorspace.

**Convert to video and add burnins:** Ayon will do them automatically on publishing if they are enabled in studio settings.
:::

import review from './assets/houdini/artist/review.mp4'

<video controls style={{width: "75%" }}>
  <source src={review}/>
</video>

### Static Mesh (FBX)
Publish Static Meshes from Houdini.

Steps:
- Select your sop node or obj node or obj subnetwork.
- Go **AYON -> Create**, select **Static Mesh**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create Static Mesh (FBX)` from the tab menu.* 
  > ![filmbox-fbx-tab-menu](assets/houdini/artist/filmbox-fbx-tab-menu.png)
- Ayon will create Flimbox FBX ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your mesh will be published to a `.fbx` file.

:::info Node Name and subset name
By default, the name will be something like this `staticMeshMain`

![staticmesh-name-default](assets/houdini/artist/staticmesh-name-default.png)

If your admin used unreal static mesh namings, you'll find names be something like this `S_assetNameMain` 

![staticmesh-name-unreal](assets/houdini/artist/staticmesh-name-unreal.png)
:::

import filmbox_fbx from './assets/houdini/artist/filmbox-fbx.mp4'

<video controls style={{width: "75%" }}>
  <source src={filmbox_fbx}/>
</video>

### USD (experimental)
Publish Solaris Stage as USD file.

![Solaris USD](assets/houdini/artist/houdini_usd_stage.png)

:::caution
This is an experimental product-type, and may not work properly.
:::

- Select your **lop** node
- Go **AYON -> Create**, select **USD (experimental)**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create USD (experimental)` from the tab menu.* 
  > ![usd-tab-menu](assets/houdini/artist/usd-tab-menu.png)
- Ayon will create USD ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your Solaris Stage will be published to a `.usd` file.
  
### USD render (experimental)
Publish USD Render.

:::caution
This is an experimental product-type, and may not work properly.
:::

- Select your **lop** node
- Go **AYON -> Create**, select **USD render (experimental)**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create USD render (experimental)` from the tab menu.* 
  > ![usd-render-tab-menu](assets/houdini/artist/usd-render-tab-menu.png)
- Ayon will create USD ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to a `.usd` file.
  
### VDB Cache
Publish VDB caches from Houdini.

Steps:
- Select your sop node or obj node
- Go **AYON -> Create**, select **VDB Cache**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create VDB Cache` from the tab menu.* 
  > ![vdb-geometry-rop](assets/houdini/artist/vdb-geometry-rop.png)
- Ayon will create Geometry ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your vdb cache will be published to a `.vdb` file.

:::info Node Selection
 When selecting an ObjNode, Ayon will try to get its sop output node with the minimum `Output Index` otherwise it will get the sop node with display flag.
:::

:::caution VDB and Volumes
VDB publishing uses Houdini Geometry Rop Node which doesn't export volumes. Therefore, you should always convert any volumes to VDB.
:::

import vdb from './assets/houdini/artist/vdb.mp4'

<video controls style={{width: "75%" }}>
  <source src={vdb}/>
</video>

### VRay ROP
Publish VRay render from Houdini.

Steps:
- Select your camera
- Go **AYON -> Create**, select **VRay ROP**, toggle **Use selection**, set **Variant** name and click **`Create 》`**. 
  > *Alternatively, you can just select `Create VRay ROP` from the tab menu.* 
  > ![vray-rop-tab-menu](assets/houdini/artist/vray-rop-tab-menu.png)
- Ayon will create VRay ROP in **/out** with path and frame range already set.
- After that, you can **AYON -> Publish** and after some validations your render will be published to the selected format.

![vray-rop](assets/houdini/artist/vray-rop.png)

## Load published products
Loading is done by
- **load...** : load products from the current project
- **library...** : load products from a library project
  
![load-project-library](assets/houdini/artist/load-project-library.png)

Loaded stuff is by default wrapped in subnetwork node called `AVALON_CONTAINERS`.
Artist can move nodes inside `AVALON_CONTAINERS` out without losing management ability. For more info, Go to [Load](artist_tools_loader) and [Library Loader](artist_tools_library_loader)

import load_products from './assets/houdini/artist/load-publish-products.mp4'

<video controls style={{width: "75%" }}>
  <source src={load_products}/>
</video>

:::info Loading HDA
When you load hda, it will install its type in your hip file and add published version as its definition file. When
you switch version via Scene Manager, it will add its definition and set it as preferred.
:::

:::info Push to library project
You can use the `loader` to push a product to a library project. 
![push-to-library](assets/houdini/artist/push-to-library.png)
:::

## Manage Loaded products
Use Inventory menu button to manage loaded products.

Key features:
1. Set Version
2. Switch Asset
3. Inventory Actions

For more info, Go to [Manage (Inventory)](artist_tools_inventory)

![manage-products](assets/houdini/artist/manage-products.png)

## FAQ

### How does Ayon name ROP nodes ? and is it safe to rename them ?

Nodes are named after their `subset` names by default.
It's safe to change the node name but it's not safe to change the `subset` name (found in `Extra` attributes) without referring to your pipeline admin. 
![extra-attributes-subset](assets/houdini/artist/extra-attributes-subset.png)

The default subset naming profile consists of family name (product type) and variant name
For example if you are creating a `camera` publish and set the variant to name `Main`
Then Ayon will create a rop node with the name `cameraMain`.

:::info 
Admins are free to update subset naming profiles.
:::

![composite-tab-menu](assets/houdini/artist/faq-subset-name.png)

### Does Ayon work with vanilla Houdini ROPs and Deadline nodes ?
This feature is not implemented yet.

### How to publish existing files on disk ?
This feature is not implemented yet. For more info, Follow this Github Issue [Enhancement: Houdini publish existing caches/frames](https://github.com/ynput/OpenPype/issues/5767)