---
title: Product types
description: "Lookup of the product types that AYON integrations publish: product base type versus product type, the common types with their purpose and the addons that create them, and what adding a custom type involves."
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/pipeline/create/structures.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/pipeline/create/creator_plugins.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/pipeline/compatibility.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/integrate.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/server_api.py
---

# Product types

A product type classifies a published product by its purpose in the production. The type tells a reader what to expect from a publish: a `model` has passed the studio's model validations and meets the studio standard, while a `mayaScene` is a less strict container that may hold the same geometry without the same guarantees. Product types are the vocabulary of [publishing](publishing.md): they decide which creators are offered, which validators and extractors run, which publish template is used and which products a loader offers.

The types listed here are those the AYON integrations create at their latest releases. The requirements behind each type (validators, extractors, naming) can be adjusted per studio and project in the addon settings. The color and icon of each type in the web app and the tools are set in the project anatomy, see [Product Types in the anatomy](../ayon/web-ui/project/anatomy.md#product-types).

## Product type, variant and product name

A product carries two type values. In most studios they are the same.

| Term | Meaning |
|---|---|
| **Product base type** | The technical type that a creator defines, for example `model` or `render`. Publish plugins, loaders and the settings profiles (product name, publish template, staging directory, hero version, status) filter on it, so it decides how the product is processed. |
| **Product type** | The type stored on the product and shown to users. It equals the product base type, unless a studio defines its own product types for a creator in that creator's **Product type items** setting. Each item has a name and a label and appears as its own entry in the Publisher's create list, for example `modelProxy` labeled *Proxy model* on top of the base type `model`. The items get the same plugins as their base type, because plugins filter on the base type. |
| **Variant** | A free name chosen at creation that distinguishes products of the same type in one folder, for example `Main` or `Proxy`. Default variants come from the creator or its settings. |
| **Product name** | Built from a product name template, the type and the variant. With the default template `{product[type]}{variant}`, a model with the variant `Main` becomes `modelMain`. Templates can also use `{product[basetype]}`. See [Product name profiles](naming-conventions.md#product-naming). |

Support for separate product types needs ayon-core with product base types (the current releases) and an AYON server 1.13.0 or newer. On an older server only one value is stored, and AYON stores the product base type there. Creators of older addons that define no base type use their product type as the base type. Most host addons offer **Product type items** in their creator settings; see the settings page of each addon. How the two values are used in names and paths is described in [Product naming](naming-conventions.md#product-naming).

## Common product types

Types that several integrations create, or that are part of a common workflow. Example variants are conventions; the default variant list of most creators is `Main`.

| Product type | Content | Example variants | Typical representations | Created by |
|---|---|---|---|---|
| `workfile` | Backup of the workfile with all its content. The variant follows the task name. | task name | Host scene file | Every host with a workfile, and the Tray Publisher |
| `model` | Clean geometry without materials. Can be a single mesh or a full building, with hierarchy through groups or nulls. | Main, Proxy, Sculpt | `abc`, `ma`, `mb`, `obj`, `fbx`, `usd`, `blend`, `max` | Maya, Houdini, Blender, 3ds Max, Nuke, ZBrush, Marvelous Designer, SpeedTree, Wrap, Tray Publisher |
| `look` | Materials, shaders, assignments, textures and attributes that define how a model looks. Applies to the model it was authored for or its cache, and is self-contained. In Maya it is an `ma` with the shaders, a `json` with the assignments and attributes, and a `resources` folder with the textures. | Main, Wet, Dirty | `ma` and `json`, `blend` | Maya, Houdini, Blender |
| `rig` | Character or prop with animation controls, ready to be referenced and animated. Maya supports self-contained rigs and rigs with nested references. | Main, Mocap, Sim | `ma`, `mb`, `blend`, `hda` | Maya, Houdini, Blender, Tray Publisher |
| `animation` | Result of animating a rig: curves, cached geometry or an animated rig. The outputs are defined in the rig so results stay consistent. | characterA, vehicleB | `abc`, `fbx`, `usd` | Maya, Blender, MotionBuilder |
| `pointcache` | Geometry with baked animation, defined directly in the animation or FX scene. | rest, ROM, pose01 | `abc`, `bgeo`, `usd` | Maya, Houdini, Blender, 3ds Max, Cinema 4D, Marvelous Designer, Tray Publisher |
| `camera` | Clean virtual camera without proprietary rigging, simple so it loads consistently in every host. Can include helper geometry or trackers. | Main, Tracked, Anim | `abc`, `ma`, `fbx`, `usd` | Maya, Houdini, Blender, 3ds Max, Cinema 4D, Nuke, Unreal, Tray Publisher |
| `matchmove` | Matchmoved camera, possibly with geometry. | Camera, Object, Mocap | `abc`, `ma` | Maya, 3DEqualizer, Tray Publisher |
| `layout` | Simple representation of an environment or of shot staging. | Main, Anim | `ma` and `json`, `blend`, `json` | Maya, Blender, Unreal |
| `assembly` | A bigger asset composed of published products, for example a table with its chairs and cutlery. Holds the contained products, their versions and transforms rather than geometry. | Table, ForestElements | `usd` | Houdini |
| `setdress` | Environment that contains only referenced assets, ready to render with instancing and assignments, in the native scene format of the host. | Main, Clean | `ma`, `mb` | Maya |
| `usd` | USD layers and asset or shot contributions. See [OpenUSD](../addons/pipeline-features/usd/index.md). | Main | `usd` | Maya, Houdini, Blender |
| `vdbcache` | Sparse volumetric data. | Fire, Smoke | `vdb` | Houdini, Tray Publisher |
| `pointcloud` | Animated point cloud. | Particles, Rain | `prt` | Houdini, 3ds Max |
| `redshiftproxy` | Redshift proxy geometry. | Main | `rs` | Maya, Houdini, 3ds Max, Cinema 4D |
| `ass` | Arnold standin archives. | Main | `ass` | Maya, Houdini |
| `render` | Rendered frames from CG or compositing. | Main, Beauty | Image sequences, movies | Maya, Houdini, Blender, Cinema 4D, Nuke, Fusion, After Effects, Harmony, TVPaint, Silhouette, Flame, Unreal, Wrap, Tray Publisher |
| `prerender` | Intermediate renders of a compositing script. | Background, Sky | Image sequences | Nuke |
| `review` | Reviewable video or image, such as a playblast. | Main, Reference | Movies, images | Maya, Houdini, Blender, 3ds Max, Cinema 4D, Photoshop, TVPaint, Harmony, Tray Publisher |
| `image` | Any non-plate image for artists: references, concept art, backgrounds. | Reference, Concept | Image files | Photoshop, Nuke, Fusion, Substance Painter, PureRef, Wrap, Tray Publisher |
| `plate` | Ingested, transcoded or conformed footage. | Main, BG, Reference | Image sequences, movies | Hiero, Resolve, Flame, Tray Publisher |
| `audio` | Shot audio track. | Main | `wav` | Hiero, Resolve, Flame, Tray Publisher |
| `shot` | The shot of an editorial publish: creates or updates the shot folder and its attributes. Has no files of its own. | | None | Hiero, Resolve, Flame, Tray Publisher |
| `editorial` | The base type of the editorial creators. In Hiero, Resolve and Flame, **Create Publishable Clip** uses it to mark timeline clips and make their `shot`, `plate` and `audio` instances; the timeline itself is published as an `otio` representation of the `workfile`. In the Tray Publisher it publishes the edit file. | Main | Edit file (`edl`, `xml`, `aaf`, `fcpxml`) | Hiero, Resolve, Flame, Tray Publisher |
| `editorial_pkg` | A timeline as an OTIO file with its media, as one product. | Main | `otio` with media | Hiero, Resolve, Tray Publisher |
| `textureSet`, `texture` | Textures exported from texturing tools, and texture files or UDIM sequences. | Main | Image files | Substance Painter, Substance Designer, Tray Publisher |
| `matteshapes`, `trackpoints` | Roto shapes and tracking data. | Main | Host formats | Nuke (shapes), Mocha, Silhouette |

[Editorial publishing](editorial-publishing.md) explains how `shot`, `plate`, `audio`, `editorial` and `editorial_pkg` work together.

## Host-specific product types

Types that one integration creates for its own content.

| Host | Product types |
|---|---|
| Maya | `mayaScene` (publish that fits no other type), `rendersetup` (render settings, AOVs and layers), `vrayproxy`, `vrayscene`, `assProxy`, `proxyAbc`, `camerarig`, `xgen`, `yetiRig` (groom ready for a cache), `yeticache`, `yeticacheUE`, `oxrig`, `oxcache`, `staticMesh` and `skeletalMesh` (for Unreal), `mvLook`, `mvUsdComposition`, `mvUsdOverride` (Multiverse) |
| Houdini | `hda` (digital asset), `groom`, `staticMesh`, `imagesequence` |
| 3ds Max | `maxScene`, `maxrender`, `renderpreset`, `matlib`, `tyflow` |
| Blender | `blendScene`, `action` |
| Nuke | `nukenodes` (any collection of nodes), `gizmo`, `source` (a read node) |
| Hiero | `effect` (timeline soft effects as JSON, loadable in Nuke), `frame` (single frames marked with tags) |
| Harmony | `harmony.template`, `harmony.palette` |
| Unreal | `uasset`, `staticMesh` |
| 3DEqualizer | `lensDistortion` |
| Substance Designer | `sbsar` |
| Marvelous Designer | `zfab` |
| Tray Publisher | `online` (keeps the original file name), `ociolook` (color look files), `csv_ingest_file`, `simpleUnrealTexture` |

## Adding a custom product type

Two levels of customization exist:

- **A studio name for an existing base type** needs no code. A creator's **Product type items** setting adds product types that are processed like their base type, for example to tell proxy models from hero models in the Loader and on the server.
- **A new base type** needs new pipeline plugins in each host addon that should support it: a creator that makes the instance and an extractor that writes its files, plus validators, loaders and settings profiles as the type requires. The work is repeated per addon, for example once for the Maya addon and once for the Houdini addon. See [Host integration](../developer/addon-development/host-integration.md).

## Related

- [Publishing](publishing.md)
- [Naming conventions](naming-conventions.md)
- [Editorial publishing](editorial-publishing.md)
- [Publisher](publisher.md)
- [Product Types in the anatomy](../ayon/web-ui/project/anatomy.md#product-types)
- [Core addon settings](../addons/essentials/core/settings.md)
