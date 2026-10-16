---
title: Maya addon
sidebar_label: Overview
description: "The AYON integration for Autodesk Maya: the AYON menu, the products Maya can create, publish and load, validators and extractors, inventory actions, workfile building and its requirements."
addon: maya
addon_repo: ayon-maya
addon_version: 0.6.13
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-maya/tree/0.6.13
  - https://github.com/ynput/ayon-maya/releases
  - https://help.ayon.app/en/articles/6811988-working-with-maya-in-ayon
  - https://help.ayon.app/en/articles/5903683-maya-general-settings
  - https://help.ayon.app/en/articles/6662463-maya-creator-settings
  - https://help.ayon.app/en/articles/1686073-maya-publishers-settings
---

# Maya addon

<AddonInfo />

The Maya addon connects Autodesk Maya to AYON. Inside Maya it adds an **AYON** menu that opens the pipeline tools, and it provides the plugins that create, publish and load products from Maya scenes, including look development, rigs, animation caches, rendering, USD, and the hair, fur and renderer plugins that Maya supports. Its settings are described on the [settings page](settings.md).

This page covers the Maya integration itself. The renderers and the third-party plugins have their own pages: [rendering and renderers](rendering.md) (Arnold, V-Ray, Redshift, Renderman, Maya Hardware 2.0) and [hair, fur and USD plugins](plugins.md) (Yeti, XGen, Ornatrix, Multiverse).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.9.9 or newer |
| Deadline addon | 0.7.0 or newer, when it is used (compatible addon, not required). It submits the Maya renders and caches to the render farm |
| Applications addon | Defines the Maya executables that the AYON Launcher starts |

The addon has no services. Workfiles use the `.ma` and `.mb` extensions. One launch hook also applies to the `mayapy` application group.

## AYON menu

The addon adds an **AYON** menu to the Maya main window. In batch mode no menu is created. The menu label can be changed with the `AYON_MENU_LABEL` environment variable.

| Entry | What it does |
|---|---|
| Current context (disabled item at the top) | Shows the folder path and task name of the current session. |
| **Version Up Workfile** | Saves the workfile as the next version. Only shown when the core addon setting for it is enabled. |
| **Work Files...** | Opens the Workfiles tool. |
| **Create...** | Opens the Publisher on its create tab. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Load...** | Opens the Loader for the current context. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Look assigner...** | Opens the Look Assigner, which assigns published looks to loaded geometry. |
| **Build Workfile (Legacy)** | Builds the workfile from the profiles of the [workfile build settings](settings.md#workfile-build-settings). |
| **Build Workfile (Templates)** | A submenu for the templated workfile build: *Build from Template*, *Update from Template*, *Open Template*, *Create Placeholder* and *Update Placeholder*. |
| **Experimental tools...** | Opens the experimental tools dialog. |
| **Set workfile attributes** | A submenu: **Colorspace**, **Frame Range**, **Render Settings** and **Resolution**. Each applies the value of the current task or of the project settings to the scene. |

A second menu, built from the [scripts menu settings](settings.md#scripts-menu), adds the studio's own tools. It is created after Maya has finished starting.

## Products Maya can create

Each creator makes one kind of publish instance, backed by an object set in the scene. The product base type is the identifier of the kind of product. The creators listed as off by default are the ones for the Multiverse and Ornatrix plugins, which a studio switches on when it uses them.

| Creator | Product base type | What it publishes |
|---|---|---|
| Animation | `animation` | Animation output of character rigs. Hidden creator: the instance is made when a rig is loaded |
| Arnold Scene Source | `ass` | An Arnold scene source (`.ass`) |
| Arnold Scene Source Proxy | `assProxy` | An Arnold scene source with proxy geometry for the viewport |
| Camera | `camera` | A single baked camera |
| Camera Rig | `camerarig` | A complex hierarchy that contains a camera |
| Layout | `layout` | A grouped package of loaded content |
| Look | `look` | Shader connections that define the look of shapes |
| Matchmove | `matchmove` | A setup of cameras, for example for tracking |
| Maya Scene | `mayaScene` | A raw Maya scene export |
| Maya USD | `usd` | A USD export of selected Maya scene objects |
| Maya USD: Model | `model` | A USD export of a model |
| Maya USD Export Layer | `usd` | A USD export of the layer of a `mayaUsdProxyShape` |
| Model | `model` | Static polygonal geometry |
| Multi-shot Layout | `layout` | A multi-shot layout in the Maya scene |
| Multiverse Look | `mvLook` | A Multiverse look (off by default) |
| Multiverse USD Asset | `usd` | A Multiverse USD asset (off by default) |
| Multiverse USD Composition | `mvUsdComposition` | A Multiverse USD composition (off by default) |
| Multiverse USD Override | `mvUsdOverride` | A Multiverse USD override (off by default) |
| Ornatrix Cache | `oxcache` | Procedural plugin nodes of Ornatrix (off by default) |
| Ornatrix Rig | `oxrig` | Ornatrix nodes with their rig data (off by default) |
| Pointcache | `pointcache` | An Alembic point cache of animated data |
| Proxy Alembic | `proxyAbc` | An Alembic of bounding box geometry for animated data |
| Redshift Proxy | `redshiftproxy` | A Redshift proxy |
| Render | `renderlayer` | One instance for each render layer of the scene's Render Setup |
| Render Setup Preset | `rendersetup` | The Render Setup template as JSON data |
| Review | `review` | A playblast to review |
| Rig | `rig` | A rig with controls to drive motion |
| Set Dress | `setdress` | A grouped package of loaded content |
| Unreal - Skeletal Mesh | `skeletalMesh` | A skeletal mesh for Unreal Engine |
| Unreal - Static Mesh | `staticMesh` | Static meshes with collisions for Unreal Engine |
| Unreal - Yeti Cache | `yeticacheUE` | Yeti caches for Unreal Engine |
| VRay Proxy | `vrayproxy` | A V-Ray proxy of animated data |
| VRay Scene | `vrayscene` | A V-Ray scene, per render layer |
| Workfile | `workfile` | The workfile itself, created automatically |
| Xgen | `xgen` | XGen data |
| Yeti Cache | `yeticache` | Yeti caches for one or more Yeti nodes |
| Yeti Rig | `yetiRig` | A Yeti rig (Yeti, XGen or other procedural plugin nodes) |

A *legacy convertor* finds products created by earlier versions of the addon and converts them. The workfile creator can be made mandatory, so that artists cannot turn it off.

## Publishing

### Extractors

The extractors decide which representations a product is published as. Most of them have an **Enabled**, **Optional** and **Active** switch in the settings; the defaults are on the [settings page](settings.md#publish-plugins).

| Product base type | Published as |
|---|---|
| `animation` | Alembic (`.abc`); optionally FBX, USD, GPU cache or glTF (`.glb`) |
| `ass`, `assProxy` | Arnold scene source (`.ass`, or `.ass.gz` when compressed) with JSON data |
| `camera`, `matchmove` | Alembic (`.abc`) and a Maya scene; optionally FBX |
| `layout` | JSON layout data, and a Maya scene when the layout is added to the raw scene extractor (the default) |
| `look` | Maya scene and JSON look data, with textures converted to `.tx` or `.rstexbin` when enabled in the creator |
| `model` | Maya scene (`.ma` or `.mb`, from the extension mapping) and Alembic; optionally OBJ, USD, FBX or GPU cache |
| `mayaScene`, `setdress`, `camerarig` | Raw Maya scene |
| `oxcache`, `oxrig` | Ornatrix Alembic (`.abc`) with cache settings; the rig also a Maya scene and rig settings |
| `pointcache` | Alembic (`.abc`); optionally USD or GPU cache |
| `proxyAbc` | Alembic of bounding box geometry |
| `redshiftproxy` | Redshift proxy (`.rs`) |
| `renderlayer` | Rendered images: rendered on the local machine, from existing frames, or on a render farm |
| `rendersetup` | Render Setup template (`.json`) |
| `review` | Playblast, in the format set by the codec preset, and a thumbnail |
| `rig` | Maya scene; optionally an FBX skeleton mesh |
| `skeletalMesh` | FBX and Alembic |
| `staticMesh` | FBX |
| `usd` (Maya USD) | USD (`.usd`); the layer instance exports the layer of a `mayaUsdProxyShape` |
| `vrayproxy` | V-Ray mesh (`.vrmesh`) and Alembic |
| `vrayscene` | V-Ray scene (`.vrscene`) |
| `workfile` | Active view thumbnail; with XGen, the workfile XGen data |
| `xgen` | `.xgen` data and a Maya scene |
| `yeticache` | Yeti cache sequence (`.fur`) and `.fursettings` |
| `yetiRig` | Maya scene, Yeti rig settings and a one-frame Yeti cache |
| `yeticacheUE` | Alembic for Unreal Engine |
| Multiverse products | USD |

### Validators

Whether a validator runs, can be skipped or is selected by default is set in the settings; the lists of defaults are on the [settings page](settings.md#publish-plugins). The families in the last column are the internal families the validator applies to.

#### General and scene

| Validator | Checks | Applies to |
|---|---|---|
| Instance has members | That the object set of the instance has any members | All |
| Product Name | That the product name has only valid characters | All |
| Instance in same Context | That the folder path and task of the instance match the current context | All |
| Maya Units | That the Maya scene units and frame rate match the settings and the task context | Context |
| Maya Workspace Set | That the scene is inside the Maya workspace that is set | Context |
| Unknown Nodes in Scene | That the scene has no unknown nodes. A repair action removes them | Model, rig, Maya scene, look, render, Yeti rig |
| Validate Frame Range | That the frame ranges are valid for the instance | Animation, pointcache, camera, proxy Alembic, render, review, Yeti cache, Ornatrix cache |
| Validate Attributes | That the attributes configured in the settings (as JSON, by family: `node_name.attribute_name` and its value) have those values. A repair action sets them | Any |
| Loaded Plugin | That no unauthorized plugin is loaded | Any |
| Plug-in Path Attributes | That the file path attributes of plugin nodes point to files that exist | Workfile |
| Instance Nodes Have ID, Node Ids in Database, Node Ids Related (ID), Non Duplicate Instance Members (ID), Deformed shape ids | That nodes have a `cbId` identifier, that it relates to a folder in the database and to the instance, and that it is unique | Model, look, rig, point cache, animation, Yeti rig |

The node identifier validators belong to the `cbId` workflow, which is switched by a [setting](settings.md#general).

#### Model

| Validator | Checks |
|---|---|
| Model Content | That the instance follows the content rules of the `model` product base type, optionally with one top group |
| Mesh Empty | That meshes have vertices |
| Mesh Has UVs | That the mesh has UVs |
| Mesh Has Overlapping UVs | That the mesh has no overlapping UVs |
| Mesh Single UV Set | Warns when a polygon mesh has more than one UV set (also pointcache) |
| Mesh has map1 UV Set | That the default UV set exists and is named `map1` |
| Mesh ngons | That meshes have no ngons |
| Mesh Lamina Faces | That meshes have no lamina faces |
| Mesh Non-Manifold Edges/Vertices | That meshes have no non-manifold edges or vertices |
| Mesh Edge Length Non Zero | That meshes have no zero-length edges |
| Mesh Vertices Have Edges | That every vertex is connected to an edge |
| Mesh Normals Unlocked | That the normals are not locked |
| Mesh ColorSets | That meshes have no color sets. A repair action removes them |
| Mesh Shader Connections | That the shading engine connections of the mesh are valid |
| Mesh Arnold Attributes | That the mesh has the default Arnold attributes |
| Mesh No Negative Scale | That meshes do not have a negative scale |
| Transform Zero (Freeze), Shape Zero (Freeze) | That transforms have no values and shape components have no tweak values |
| Unique transform name | That transform names are unique |
| Suffix Naming Conventions | That a transform's suffix matches the type of its child shapes, from a configurable table |
| Shape Default Naming | That shape names use Maya's default format |
| Shape Default Render Stats | That the render stats of shapes have their defaults |
| No Namespaces | That nodes have no namespace |
| No Empty/Null Transforms | That the scene has no null transforms |
| Unknown Nodes | That the instance has no unknown nodes (model and rig) |
| No Animation | That nodes of the instance have no keyframes |
| No Ghosting | That nodes do not have ghosting enabled (model and rig) |

#### Rig and animation

| Validator | Checks |
|---|---|
| Rig Contents | That the rig has the pipeline-critical content |
| Rig Controllers | That the rig controllers are valid |
| Rig Controllers (Arnold Attributes) | That control curves have no keyable Arnold attributes |
| Joints Hidden | That all joints are hidden |
| Rig Out Set Node Ids | That deformed shapes have IDs related to the original shapes |
| Rig Output Ids | That the rig outputs have valid IDs |
| Single Assembly | That the content is grouped in a single hierarchy |
| Cycle Errors | That the nodes produce no cycle errors |
| Skeleton Rig ... (Contents, Controllers, Out Set Node Ids, Output Ids, Top Group Hierarchy) | The same checks for the skeleton sets of an FBX rig |
| Animated Rig Content | That the `skeletonAnim_SET` has one or more objects |
| Skincluster Deformer Relationships | That skin clusters on meshes have valid member relationships (FBX) |
| Animation Content | That the instance follows the content rules of the `animation` product base type |
| Animation Out Set Related Node Ids | That deformed shapes have IDs related to the original shapes (animation, pointcache, proxy Alembic) |
| Animation Product base Type Publish | That at least one product base type is exported |
| Alembic Visible Only, Excluded parents visible | That at least one node is visible in the frame range, and that parents are visible when excluded from the export (pointcache, animation) |
| Alembic Options Defaults | That the instance's Alembic attributes are the defaults |
| Validate clashing sibling names | That siblings have unique names when namespaces are stripped |
| Step size | That the step size is in a valid range (camera, pointcache, animation) |
| No V-Ray Proxies (VRayMesh) | That the point cache has no VRayMesh objects |

#### Camera, look, review and workfile

| Validator | Checks |
|---|---|
| Camera Contents | That the camera instance has the expected content, optionally including shapes |
| Camera Attributes | That the camera has no invalid attribute keys or values |
| No Default Cameras | That no default (startup) camera is in the instance |
| Look Data Contents | That the look instance content is valid |
| Textures Have No Files | That the look resources have valid files |
| Look Default Shader Connections | That the default shaders in the scene have their default connections |
| Look Id Reference Edits | That nodes of the look have no reference edits to `cbId` |
| Look No Default Shaders | That no node is connected to a default shader |
| Look Sets | That no set relationships are left uncollected |
| Look Shading Engine Naming | That shading engines are named after the surface material |
| Look Single Shader Per Shape | That every mesh and NURBS surface has exactly one shader |
| Validate Shaders Name | That the shader name matches a regular expression that can use the current folder name |
| Validate Review | That the review instance is valid |
| SetDress Root | That the top root node of a set dress is published |

## Loading

The loaders create managed containers that the Scene Inventory tracks, unless noted. The settings turn single loaders on or off.

| Loader | Loads | Formats |
|---|---|---|
| Reference | Model, pointcache, proxy Alembic, animation, Maya scene, set dress, layout, camera, rig, camera rig, static mesh, skeletal mesh, Multiverse look, matchmove | `.ma`, `.mb`, `.abc`, `.fbx` |
| Reference animation | Animation, camera, pointcache | `.abc`; a second loader for `.fbx` (animation, camera) |
| Reference Maya USD | USD | `.usd`, `.usda`, `.usdc` |
| Import | Model, pointcache, proxy Alembic, animation, Maya scene, set dress, layout, camera, rig, camera rig, static mesh, workfile. Unmanaged: not tracked in the inventory | `.ma`, `.mb`, `.obj` |
| Reference look | Look | `.ma` |
| Load as template | Workfile, Maya scene | `.ma`, `.mb` |
| Load Gpu Cache | Model, animation, proxy Alembic, pointcache | `.abc` |
| Load Layout | Layout | `.json` |
| Load Audio | Audio | `.wav` |
| Load file node | Any product | `.exr`, `.tif`, `.png`, `.jpg`, `.jpeg` |
| Load imagePlane | Image, plate, render, on the selected camera | `.mov`, `.mp4`, `.exr`, `.png`, `.jpg`, `.jpeg` |
| Run matchmove script | Matchmove | `.py`, `.mel` |
| Load USD to Maya Proxy | Model, USD, pointcache, animation | `.usd`, `.usda`, `.usdc`, `.usdz`, `.abc` |
| Load RenderSetup template | Render Setup preset | `.json` |
| Set frame range, Set frame range (with handles) | Animation, camera, proxy Alembic, pointcache. Actions that set the scene's frame range without loading anything | `.abc` |

The loaders for renderers and plugins (Arnold, V-Ray, Redshift, VDB, Yeti, XGen, Ornatrix, Multiverse) are on the [rendering](rendering.md) and [plugins](plugins.md) pages.

Loaded content is colored in the Outliner by product base type. The colors, the namespace and the group name of the reference loader are [settings](settings.md#loader-plugins). When the loader updates a container, it can also update the namespace to match the folder and task type of the new version. Loading a camera can create a camera publish instance, and loading a rig can lock its animation instance.

## Scene Inventory actions

| Action | What it does |
|---|---|
| Connect Geometry | Connects geometries within containers |
| Connect Ornatrix Rig, Connect Xgen, Connect Yeti Rig | Connects the hair or fur rig with an animation or pointcache |
| Import Model Render Sets | Imports the render sets of a model |
| Import Reference | Imports the selected reference into the file |
| Lock versions, Unlock versions | Locks or unlocks the version of the selected containers |
| Recreate rig animation instance | Recreates the animation publish instance of a loaded rig |
| Select in scene | Selects the nodes of the selected containers in the scene |
| Highlight by scene selection | Selects the containers in the inventory from the scene selection |

## Workfiles and workfile build

**Legacy build.** Profiles for task types and task names list, for the current context and for linked folders, which products to load: filtered by product name, product base type and representation name, with the loader to use.

**Templated build.** A workfile template is applied by profile (task types and task names). A profile can apply when Maya launches, to every new scene, or on demand from the menu, can keep its placeholders and can save the first workfile version. The addon has four placeholder types.

| Placeholder | What it does |
|---|---|
| Maya load | Loads products into the scene |
| Assign Look | Assigns a look product to the members of the placeholder set |
| Run Python Script | Runs a script at the given order during the build |
| Set Context Settings | Sets context variables for the build |

## Scene setup and Maya preferences

| Feature | What it does |
|---|---|
| Scene units | Sets the linear and angular units of the scene. The Maya Units validator can check them |
| Include handles | Includes or excludes the frame handles in the default playback and render range, per task type |
| Dirmap | Maps path prefixes of other platforms when scenes are opened |
| Explicit plugin loading | Loads only the listed Maya plugins at startup. The launch hook starts Maya with `-noAutoloadPlugins` when enabled |
| MEL workspace | A `workspace.mel` that is copied into the work directory, which sets the file rules of the workspace |
| Color management | Applies the project's OCIO configuration to Maya, with file rules and the workfile rendering space, display and view |
| `cbId` workflow | Gives nodes a `cbId` identifier and validates it. It links looks to geometry |

## Launch hooks

| Hook | What it does |
|---|---|
| Define the `-noAutoloadPlugins` flag | Adds the `-noAutoloadPlugins` flag to the Maya launch when explicit plugin loading is enabled |
| Copy workspace.mel | Copies the `workspace.mel` from the settings to the work directory (for `maya` and `mayapy`) |
| Open workfile post initialization | Decides whether the last workfile opens after Maya has initialized |

## Related

- [Maya settings](settings.md)
- [Rendering and renderers](rendering.md)
- [Hair, fur and USD plugins](plugins.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
