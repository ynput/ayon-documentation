---
title: Product types
description: "What a product type is in AYON, the default product types with their purpose, example variants, typical representations and the host integrations that create them, and what adding a custom type involves."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/7070980-about-ayon-pipeline
---

# Product types

A product type classifies a published product by its purpose in the production. The type tells a reader what to expect from a publish: a `model` has passed the studio's model validations and meets the studio standard, while a `mayaScene` is a less strict container that may hold the same geometry without the same guarantees. Product types are the vocabulary of the [publishing](publishing.md) pipeline: they decide which creators are offered, which validators and extractors run, which publish template is used and which products a loader shows.

The product types listed here are the AYON defaults. The requirements behind each type (validators, extractors, naming) can be adjusted per studio and per project through addon settings.

## Product type, variant and product name

| Term | Meaning |
|---|---|
| Product base type | The technical type a creator, plugin and profile works with, for example `model`. Instances carry it in their `families`, so plugins that list `model` run for model instances. It is the key the settings profiles (publish template, staging directory, product name, hero versions) filter by. |
| Product type | The type stored on the product record on the AYON server. It equals the product base type unless a studio defines its own type for a base type in the creator settings (product type items). |
| Variant | A free name chosen at creation that distinguishes products of the same type in one folder, for example `Main` or `Proxy`. Default variants are defined by the creator or its settings. |
| Product name | Built from a template and the variant. The default template is `{product[type]}{variant}`, so a model with the variant `Main` becomes `modelMain`. The product name profiles in the Core addon settings change the template per product base type, host, task type and task name. For workfiles the default template is `{product[type]}{Task[name]}` (the variant is the task name). See [naming conventions](naming-conventions.md). |

Variants shown below are conventions. The default variant list of most creators is `Main`; studios extend it in the creator settings.

## Default product types

Types created by the DCC integrations (host addons) and the Tray Publisher. The column **Created by** lists the addons that ship a creator for the type.

| Product type | Comment | Example variants | Typical representations | Created by |
|---|---|---|---|---|
| `model` | Cleaned geometry without materials. Can be a single mesh or a full building, with hierarchy through groups or nulls. | main, proxy, sculpt, broken | `ma`, `mb`, `abc`, `obj`, `fbx`, `usd`, `blend`, `max` | Maya, Houdini, Blender, Nuke, 3ds Max, ZBrush, Tray Publisher |
| `look` | Package of materials, shaders, assignments, textures and attributes that defines how a model looks. Applies to the model it was authored for or its cache and is self-contained. | main, wet, dirty | Maya: `ma` and `json` plus a `resources` folder with textures | Maya, Blender, Houdini |
| `rig` | Character or prop with animation controls, ready to be referenced and animated. Maya supports self-contained rigs and rigs with nested references. | main, deform, sim | `ma`, `mb`, `blend` | Maya, Blender, Houdini |
| `assembly` | A bigger asset composed from several published products. Holds the list of the contained products, their versions and transforms, not the geometry itself. | main, deform, sim | `usd` | Houdini |
| `layout` | Simple representation of an environment or of shot staging. | main, anim | `ma` and `json` (Maya), `blend`, `json` | Maya, Blender, Unreal |
| `setdress` | Environment that contains only referenced assets, ready to render with instancing and assignments. Published in the native scene format of the host. | main, anim, messy, clean | `ma`, `mb` | Maya |
| `camera` | Clean virtual camera without proprietary rigging. Can include helper geometry or trackers. | main, tracked, anim | `abc`, `ma`, `fbx` | Maya, Houdini, Blender, Nuke, 3ds Max, Cinema 4D, Unreal, Tray Publisher |
| `animation` | Result of animating a rig: curves, cached geometry or a fully animated rig. The output is defined in the rig so that results stay consistent. | characterA, vehicleB | `abc`, `usd`, `fbx` | Maya, Blender |
| `pointcache` | Geometry with baked animation. Usually Alembic, any suitable format is possible. Defined directly in the animation or FX scene. | rest, ROM, pose01 | `abc`, `bgeo`, `usd` | Maya, Houdini, Blender, 3ds Max, Cinema 4D |
| `vdbcache` | Sparse volumetric data. | fire, smoke | `vdb` | Houdini, Tray Publisher |
| `pointcloud` | Animated point cloud. | particles, rain | `prt` | Houdini, 3ds Max |
| `mayaScene` | Maya publish that fits no other type. | main | `ma`, `mb` | Maya |
| `maxScene` | 3ds Max publish that fits no other type. | main | `max` | 3ds Max |
| `blendScene` | Blender publish that fits no other type. | main | `blend` | Blender |
| `render` | Rendered frames from CG or compositing. | | Image sequences, movies | Maya, Houdini, Nuke, Blender, Fusion, After Effects, Harmony, TVPaint, Cinema 4D, Unreal, Tray Publisher |
| `prerender` | Preliminary renders, usually not versioned in the same way as final renders. | background, sky | Image sequences | Nuke |
| `rendersetup` | Scene render settings, AOVs and layers. | | `json` | Maya |
| `audio` | Shot audio track for reference. | animatic, mix | Audio files | Tray Publisher, Hiero, Resolve, Flame |
| `plate` | Ingested, transcoded or conformed footage. | raw, graded, imageplane | Image sequences, movies | Tray Publisher, Hiero, Resolve, Flame |
| `image` | Any non-plate image for artists: references, concept art, textures. | Reference, ConceptArt | Image files | Tray Publisher, Photoshop, Nuke, Fusion, Substance Painter |
| `review` | Reviewable video or image. | | Movies, images | Maya, Houdini, Blender, 3ds Max, Cinema 4D, Photoshop, TVPaint, Harmony, Tray Publisher |
| `matchmove` | Matchmoved camera, possibly with geometry. | main | `abc`, `ma` | Maya, Tray Publisher |
| `workfile` | Backup of the workfile with all its content. The variant follows the task name. | task name | Host scene file | Every host with a workfile |
| `nukenodes` | Any collection of Nuke nodes. | maskSetup, usefulBackdrop | `nk` | Nuke |
| `gizmo` | Shareable Nuke gizmo. | | Gizmo file | Nuke |
| `yetiRig` | Yeti groom ready to be applied on a geometry cache. | main, destroyed | `ma` and a rig settings file | Maya |
| `yeticache` | Cached Yeti fur setup. | | `fur` | Maya |
| `vrayproxy` | V-Ray proxy geometry for rendering. | | `vrmesh` | Maya |
| `vrayscene` | Full V-Ray scene export. | | `vrscene` | Maya |
| `ass` | Arnold standin archives for rendering. | main, wet, dirty | `ass` and `json` | Maya, Houdini |
| `effect` | Hiero timeline soft effect that can be applied to a shot. | LUT, grade | Effect data | Hiero |
| `harmony.template` | Toon Boom Harmony template. | | Harmony template | Harmony |
| `harmony.palette` | Toon Boom Harmony color palette of an asset. | | Harmony palette | Harmony |

The representations column lists what the creators and extractors in the addons produce; some are configurable. For example, the Maya scene type of model, rig, camera and look publishes is `ma` or `mb` depending on the Maya addon settings.

## Further product types in addons

Host addons add types for their own content. The most common ones:

| Product type | Content | Created by |
|---|---|---|
| `usd` | USD export for general use, including USD layers and asset contributions. | Houdini, Maya, Blender |
| `staticMesh`, `skeletalMesh`, `uasset` | Game engine assets for Unreal. | Maya, Houdini, Unreal |
| `redshiftproxy`, `proxyAbc`, `camerarig` | Redshift proxy geometry, proxy Alembic and a camera rig. | Maya, Houdini, 3ds Max, Cinema 4D |
| `xgen`, `oxcache`, `oxrig` | Hair and fur caches and rigs. | Maya |
| `hda`, `imagesequence` | Houdini digital asset and legacy composite output. | Houdini |
| `tyflow`, `matlib`, `renderpreset`, `maxrender` | 3ds Max particles, material library, render preset and render. | 3ds Max |
| `action` | Blender action. | Blender |
| `matteshapes` | Shape data for matte work. | Nuke, Mocha, Silhouette |
| `textureSet`, `texture` | Textures from texturing tools and texture files. | Substance Painter, Substance Designer, Tray Publisher |
| `source` | A source (read) node. | Nuke |
| `shot`, `editorial`, `editorial_pkg` | Editorial content: shot data, editorial files and editorial packages with OTIO. | Tray Publisher, Hiero, Resolve, Flame |
| `online` | A file published with its original file name. | Tray Publisher |
| `ociolook` | Color space look file. | Tray Publisher |
| `csv_ingest_file` | Ingest of products described in a CSV file. | Tray Publisher |

## Adding a custom product type

A new product type needs new pipeline plugins in each DCC integration addon that should support it: a **Creator** plugin that creates the instance and an **Extractor** plugin that writes its files. The work is repeated per addon, for example once for the Maya addon and once for the Houdini addon. Validators, loaders and settings profiles are added as the type requires. Studios can define their own product type names for an existing base type through the product type items of a creator's settings, without new code.

## Related

- [Publishing](publishing.md)
- [Publisher](publisher.md)
- [Naming conventions](naming-conventions.md)
- [Core addon settings](../addons/essentials/core/settings.md)
