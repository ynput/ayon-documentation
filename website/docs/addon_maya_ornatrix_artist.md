---
id: addon_maya_ornatrix_artist
title: Ornatrix for Maya
sidebar_label: Ornatrix
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Maya_Badge}
</ReactMarkdown>

AYON supports Ephere's **Ornatrix** with the workflow of publishing and loading maya scene with Ornatrix data, Ornatrix groom presets and Ornatrix Alembic. It also supports to connect your target geometry with the loaded Ornatrix data (either from the maya scene or the groom preset.)

## Maya Addon Setting before using AYON for Ornatrix Maya
On the AYON Studio Settings or Project Settings enable the Ornatrix plug-ins for Maya:

- Project settings > `Maya` > `Creators` > `Create Ornatrix Rig`
- Project settings > `Maya` > `Creators` > `Create Ornatrix Cache`
- Project settings > `Maya` > `Publishers` > `Validate Ornatrix Rig Contents`
- Project settings > `Maya` > `Publishers` > `Validate Ornatrix Cache Contents`
- Project settings > `Maya` > `Loaders` > `Ornatrix Cache Loader`
- Project settings > `Maya` > `Loaders` > `Ornatrix Rig Loader`


![Maya - Ornatrix Creators Setting](assets/maya/artist/ox_creators_maya_addon_setting.jpg)

![Maya - Ornatrix Validator Setting](assets/maya/artist/ox_validator_maya_addon_setting.jpg)

![Maya - Ornatrix Loader Setting](assets/maya/artist/ox_loaders_maya_addon_setting.png)

## Workflow
AYON has two creators for Ornatrix publishing: ```Ornatrix Rig``` and ```Ornatrix Cache```.

## Ornatrix Rig

### Creating and publishing

The **Ornatrix Rig** (product type: *oxrig*) publishes the geometry with the Ornatrix data.

![Maya - Ornatrix Rig Publishing](assets/maya/artist/ornatrix_rig_publishing.gif)

Select your mesh (that has Ornatrix fur) and create the Ornatrix Rig instance.

:::tip
If the instance contains anything other than the mesh or the mesh has more than one hair shape, the publish validators will report the error to make sure there are always mesh(es) inside the instance.

:::

When it is published, several files are exported to the publish folder:

- Maya Scene with the Ornatrix data (.ma)
- Rig Setting data (.rigsettings)
- Ornatrix Almebic (.abc)
- Cache Setting data (.cachesettings)

### Loading

![Maya - Ornatrix Loader Product Type](assets/maya/artist/ox_loader_product_type.png)

**Ornatrix Rig** supports to load maya scene (.ma) and Ornatrix alembic (.abc).

![Maya - Ornatrix Loaders](assets/maya/artist/ox_rig_loader.png)

Both Maya Scene and groom preset allow for connecting ornatrix rig with the animation/pointcache rig.

![Maya - Ornatrix Rig Loading](assets/maya/artist/ornatrix_rig_loading.gif)

#### Connecting an Ornatrix rig with a pointcache or animation
After loading the Ornatrix Rig and a pointcache to connect it to, you can use the AYON tools to connect it for you:

1. Go to `AYON` -> `Manage...`
2. In the inventory select the assets from oxrig and animation/pointcache product type.
3. Right-click `Actions` -> `Connect Ornatrix Rig`
The Ornatrix geometry will be connected the animation rig with the transform and mesh attributes.

:::tip
The connecting will occur by node name - so if it fails, make sure the node name for the geometry is the same across your animation caches and the ornatrix exports.

**Double geometry:** Be aware that both the ornatrix rig and your animated cache have the mesh geometry. After connecting the fur you will most likely want to hide one of the two to ensure you do not have two overlapping meshes during rendering.
:::


## Ornatrix Caches

### Creating and publishing

There are two options to allow users to publish with ```Ornatrix Cache``` product type:

1. Create an ```Ornatrix Cache``` instance themselves by selecting the mesh with the Ornatrix data.
2. Load ornatrix rig which automatically creates the instance ready for publishing.

![Maya - Ornatrix Cache Publishing](assets/maya/artist/ornatrix_cache_publishing.gif)

The cache family exports Ornatrix Alembic (.abc) which includes the Ornatrix data into the publish folder.

### Loading

The **Ornatrix Cache** supports to load Ornatrix alembic (.abc), Vray Proxy (.abc) and Arnold Scene Source (.abc).
