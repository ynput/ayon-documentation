---
id: artist_publish
title: Publishing
sidebar_label: Publishing
---

## What is publishing?

A process of exporting particular data from your work scene to be shared with others.

Think of publishing as a checkpoint between two people, making sure that we catch mistakes as soon as possible and don’t let them pass through pipeline step that would eventually need to be repeated if these mistakes are not caught.

Every time you want to share a piece of work with others (be it camera, model, textures, animation or whatever), you need to publish this data. The main reason is to save time down the line and make it very clear what can and cannot be used in production.
This process should mostly be handled by publishing scripts but in certain cases might have to be done manually.

Published assets should comply to these rules:

- Clearly named, based on internal naming conventions.
- Versioned (with master version created for certain types of assets).
- Immediately usable, without any dependencies to unpublished assets or work files.
- Immutable

All of these go into the publish folder for the given entity (shot, asset, sequence)

:::note
Keep in mind that while publishing the data might take you some extra time, it will save much more time in the long run when your colleagues don’t need to dig through your work files trying to understand them and find that model you saved by hand.
:::

## Product Types:

Published products are categorized into ‘product types’ based on what is their purpose in the production. Knowing a product type should always tell you what to expect from the give publish. For example if something is marked as a `model` you know it passed through certain studio validations and you can expect it to be up to the studio standard, however, `mayaScene` doesn't provide the same confidence (because it's less strict during publishing), even though they might both actually contain the same model.  

Following product type definitions and requirements are the AYON defaults and what we consider good industry practice, but most of the requirements can be altered to suit the studio or project needs.
Here's a list of supported product types

| Product Type              | Comment                                            | Example variants          |
| ------------------------- | -------------------------------------------------- | ------------------------- |
| [Model](#model)           | Cleaned geo without materials.                     | main, proxy, broken       |
| [Look](#look)             | Package of shaders, assignments and textures.      | main, wet, dirty          |
| [Rig](#rig)               | Characters or props with animation controls.       | main, deform, sim         |
| [Assembly](#assembly)     | A complex model made from multiple other models.   | main, deform, sim         |
| [Layout](#layout)         | Simple representation of the environment.          | main, anim                |
| [Setdress](#setdress)     | Environment containing only referenced assets.     | main, messy, clean        |
| [Camera](#camera)         | May contain trackers or proxy geo.                 | main, tracked, anim       |
| [Animation](#animation)   | Animation exported from a rig.                     | characterA, vehicleB      |
| [PointCache](#pointcache) | Arbitrary animated geometry.                       | rest, ROM , pose01        |
| VDBCache                  | Volumetric data.                                   | fire, smoke               |
| PointCloud                | 3ds Max point animated point cloud.                | particles, rain           |
| MayaScene                 | Maya publishes that don't fit other categories.    |                           |
| MaxScene                  | 3ds Max publishes that don't fit other categories. |                           |
| Render                    | Rendered frames from CG or Comp.                   |                           |
| PreRender                 | Preliminary renders, usually not versioned         | background, sky           |
| RenderSetup               | Scene render settings, AOVs and layers.            |                           |
| Audio                     | Shot audio track for reference.                    | animatic, mix             |
| Plate                     | Ingested, transcode, conformed footage.            | raw, graded, imageplane   |
| Image                     | Any non-plate image to be used by artists.         | Reference, ConceptArt     |
| LayeredImage              | Software agnostic layered image with metadata.     | Reference, ConceptArt     |
| Background                | 2d animation background, usually with layers.      |                           |
| Review                    | Reviewable video or image.                         |                           |
| Matchmove                 | Matchmoved camera, potentially with geometry.      | main                      |
| Review                    | Reviewable video or image.                         |                           |
| Workfile                  | Backup of the workfile with all its content.       | uses the task name        |
| NukeNodes                 | Any collection of nuke nodes.                      | maskSetup, usefulBackdrop |
| [Yeticache](#yeti-cache)  | Cached out yeti fur setup.                         |                           |
| [YetiRig](#yeti-rig)      | Yeti groom ready for geometry cache.               | main, destroyed           |
| VrayProxy                 | Vray proxy geometry for rendering.                 |                           |
| VrayScene                 | Vray full scene export.                            |                           |
| ArnodldStandin            | All arnold .ass archives for rendering.            | main, wet, dirty          |
| Effect                    | Hiero timeline soft effect applicable to a s      | LUT, grade             |
| Gizmo                     | Nuke shareable gizmo                           |                           |
| HarmonyTemplate           | Toon Boom harmony template file                    |                           |
| HarmonyPalette            | Toon Boom harmony asset colour palette         |                           |



### Model

Clean geometry without any material assignments. Published model can be as small as a single mesh, or as complex as a full building. That is purely up to the artist or the supervisor. Models can contain hierarchy defined by groups or nulls for better organisation.

Example products:
`modelMain`, `modelProxy`, `modelSculpt`, `modelBroken`

Example representations:
`.ABC`, `.MA`, `.MB`, `.BLEND`, `.OBJ`, `.FBX`


### Look

A package of materials, shaders, assignments, textures and attributes that collectively define a look of a model for rendering or preview purposes. This can usually be applied only to the model is was authored for, or its corresponding cache, however, material sharing across multiple models is also possible. A look should be fully self-contained and ready for rendering.

Example products:
`lookMain`, `lookProxy`, `lookWet`, `lookDirty`, `lookBlue`, `lookRed`

Example Representations:
`.MA + .JSON`, `.MTLX (yet unsupported)`, `.BLEND`

Please note that a look is almost never a single representation, but a combination of multiple.
For example in Maya a look consists of `.ma` file with the shaders, `.json` file which
contains the attributes and assignments and `/resources` folder with all the required textures.


### Rig

Characters or props with animation controls or other parameters, ready to be referenced into a scene and animated. Animation Rigs tend to be very software specific, but in general they tend to consist of Geometry, Bones or Joints, Controllers and Deformers. AYON in maya supports both, self-contained rigs, that include everything in one file, but also rigs that use nested references to bring in geometry, or even skeleton. By default we bake rigs into a single file during publishing, but that behaviour can be turned off to keep the nested references live in the animation scenes.

Example products:
`rigMain`, `rigMocap`, `rigSim`, `rigCamera`, `rigMuscle`

Example Representations:
`.MA`, `.MB`, `.BLEND`, `.HDA`


### Assembly

A product created by combining two or more smaller products into a composed bigger asset.
A good example would be a restaurant table asset with the cutlery and chairs included,
that will eventually be loaded into a restaurant Set. Instead of loading each individual
fork and knife for each table in the restaurant, we can first prepare `assemblyRestaurantTable` product
which will contain the table itself, with cutlery, flowers, plates and chairs nicely arranged.

This table can then be loaded multiple times into the restaurant for easier scene management
and updates.

Extracted assembly doesn't contain any geometry directly, but rather information about all the individual products that are inside the assembly, their version and transformations. On top of that and alembic is exported which only holds any extra transforms and groups that are needed to fully re-create the original assembled scene.

Assembly ca also be used as a sort of collection of elements that are often used together in the shots. For example if we're set dressing lot's of forest shots, it would make sense to make and assembly of all the forest elements for scattering so we don't have to load them individually into each shot.

Example products:
`assemblyTable`, `assemblyForestElements`, `assemblyRoof`

Example Representations:
`.ABC + .JSON`



### Setdress

Fully prepared environment scene assembled from other previously published assets. Setdress should be ready for rendering as is, including any instancing, material assignments and other complex setups the environment requires. Due to this complexity, setdress is currently only publishable in the native file format of the host where it was created. In maya that would be `.ma` or `.mb` file.


### Camera

Clean virtual camera without any proprietary rigging, or host specific information. Considering how widely across the hosts published cameras are used in production, published camera should ideally be as simple and clean as possible to ensure consistency when loaded into various hosts.


Example Representations:
`.MA`, `.ABC`


### Pointcache

Geometry with baked animation. Cache is usually exported as alembic,
but can be potentially any other representation that makes sense in the given scenario.
Cache is defined by the artist directly in the fx or animation scene.

Example products:
`assemblyTable`, `assemblyForestElements`, `assemblyRoof`

Example Representations:
`.ABC`, `.BGEO`


### Animation

Published result of an animation created with a rig. Animation can be extracted
as animation curves, cached out geometry or even fully animated rig with all the controllers.  
Animation cache is usually defined by a rigger in the rig file of a character or
by FX TD in the effects rig, to ensure consistency of outputs.

Example products:
`animationBob_01`, `animationJack_02`, `animationVehicleA`

Example Representations:
`.MA`, `.ABC`, `.JSON`


### Yeti Cache

Cached out yeti fur simulation that originates from a yeti rig applied in the shot context.


### Yeti Rig

Yeti groom setup ready to be applied to a cached out character in the shot context.
