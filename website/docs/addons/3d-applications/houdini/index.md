---
title: Houdini addon
sidebar_label: Overview
description: "The AYON integration for SideFX Houdini: the AYON menu, the products Houdini can create, publish and load, validators and extractors, the loader HDAs, USD support, templated workfile building and requirements."
addon: houdini
addon_repo: ayon-houdini
addon_version: 0.10.10
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-houdini/tree/0.10.10
  - https://github.com/ynput/ayon-houdini/releases
  - https://help.ayon.app/en/articles/2777507-working-with-houdini-in-ayon
  - https://help.ayon.app/en/articles/4210042-houdini-ayon-loader-hdas
  - https://help.ayon.app/en/articles/0982414-configure-houdini-addon
---

# Houdini addon

<AddonInfo />

The Houdini addon connects [Houdini](https://www.sidefx.com/products/houdini/) to AYON. Inside Houdini it adds an AYON menu that opens the pipeline tools, ROP-based creators that make publish instances, publish plugins for caches, renders, USD and digital assets, loaders, and a set of loader digital assets (HDAs) that select AYON products from inside a node network. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.9.9 or newer |
| Deadline addon (compatible, optional) | 0.7.0 or newer, for farm rendering and farm caching |
| Applications addon | Defines the Houdini executables that the AYON Launcher starts |

Houdini 19.5 and newer is supported, and since 0.10.5 the addon includes the Python libraries for Houdini 22. Some features depend on the Houdini version: the Copernicus creator and loader need Houdini 20.5 or newer, and the Flipbook node type of the Review creator is offered from Houdini 20.5. Some plugins need a renderer or a third-party node: the Arnold, Redshift and V-Ray creators need their renderer, and the PRT point cloud creator needs the `PRT_ROPDriver` node.

## AYON menu

The addon adds a menu to the Houdini main menu bar. Its label is **AYON**, or the value of the `AYON_MENU_LABEL` environment variable when it is set. The first entry, disabled, shows the current folder path and task name.

| Entry | What it does |
|---|---|
| **Version Up Workfile** | Saves the workfile as the next version. Only enabled when the **AYON Menu** option of the core addon (`version_up_current_workfile`) is on. |
| **Create...** | Opens the Publisher on its create tab. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Work Files...** | Opens the Workfiles tool. |
| **Set Frame Range** | Sets the scene's frame range and FPS from the current task. |
| **Update Houdini Vars** | Updates the Houdini variables configured in the addon settings and shows what changes. |
| **Clear AYON USD Resolver Cache** | Clears the cache of the AYON USD resolver. |
| **Experimental tools...** | Opens the experimental tools dialog of the core addon. |
| **Template Builder** | A submenu for the templated workfile build: *Build Workfile from template*, *Update Workfile from template*, *Open Template*, *Create Placeholder...* and *Update Placeholder*. |

There is no **Library...** entry in this version.

### Other integration points

| Where | What it adds |
|---|---|
| TAB menu | Every creator is registered in the TAB menu, so a publish instance can be created interactively from the network editor. |
| Node context menu | **Create Digital Asset (AYON)...** creates an `hda` publish instance from a node that can become a digital asset. |
| Parameter context menu | **Load with AYON** on a file reference parameter of a non-ROP node connects it to an `AYON Generic Loader` node. If the parameter is already connected, the loader's parameters are shown instead. |
| Shelves | Shelves can be added from the addon settings (**Shelves Manager**). |
| Publish button | When **Add Self Publish Button** is on, each created ROP gets a self-publish button. |
| USD output processors | **AYON URI Output Processor** resolves AYON entity URIs into file paths when USD is written. A hidden **AYON Remap Paths** processor remaps paths for publishing. |

## Products Houdini can create

Each creator makes one kind of publish instance, usually by creating a ROP node. The output path and frame range of the ROP are set when it is created, unless **Set ROP Output Directory on Create** is turned off.

| Creator | Product base type | What it publishes |
|---|---|---|
| Camera (Abc) | `camera` | A single baked camera, from an Alembic ROP |
| Arnold ASS | `ass` | An Arnold `.ass` archive |
| Arnold ROP | `render` | A render with Arnold |
| Karma ROP | `render` | A render with Karma |
| Mantra ROP | `render` | A render with Mantra |
| Redshift ROP | `render` | A render with Redshift |
| VRay ROP | `render` | A render with V-Ray |
| USD Render | `render` | A render with a USD Render ROP in `/stage` |
| Composite (Copernicus) | `render` | An image sequence from the Copernicus Image ROP |
| Composite (COP2) | `imagesequence` | An image sequence from a Composite ROP of a COP2 network |
| Model (Abc) | `model` | A static model as Alembic |
| Model (FBX) | `model` | A static model as FBX |
| Static Mesh (FBX) | `staticMesh` | A static mesh as FBX, usually for Unreal Engine |
| PointCache (Abc) | `pointcache` | Geometry as an Alembic point cache |
| PointCache (Bgeo) | `pointcache` | Geometry as a BGEO point cache |
| APEX Rig | `rig` | An APEX rig as BGEO, with a USD layer of the rig |
| PointCloud (PRT) | `pointcloud` | A PRT point cloud. Disabled by default |
| VDB Cache | `vdbcache` | OpenVDB volumes from a Geometry ROP |
| Redshift Proxy | `redshiftproxy` | A Redshift proxy (`.rs`) |
| Houdini Digital Asset (Hda) | `hda` | A digital asset definition |
| Review | `review` | A viewport render from an OpenGL ROP, or from a Flipbook ROP in Houdini 20.5 and newer |
| USD | `usd` | A USD layer from a USD ROP in `/stage` |
| USD Asset Model | `model` | A USD layer of an asset model |
| USD Asset Assembly | `assembly` | A USD layer of an assembly |
| USD Asset Groom | `groom` | A USD layer of fur or hair |
| USD Asset Look | `look` | A USD look, with localized textures |
| USD Component Builder LOPs | `usd` | USD created from Component Builder LOPs |
| Workfile | `workfile` | The workfile itself, created automatically |

A *legacy convertor* finds products created by earlier versions of the addon and converts them.

Most creators that make a ROP have a **Render target** attribute: *Local machine rendering*, *Use existing frames (local)* or *Farm Rendering*. The Arnold, Mantra, Redshift, V-Ray and USD Render creators add *Farm Export & Farm Rendering* and *Local Export & Farm Rendering*. The render ROP creators also have a **Review** toggle that marks the render as reviewable. Farm submission is done by the Deadline addon.

The `render` product base type is shared by all render ROPs. When **Render ROPs use legacy product types** is on, the Arnold, Karma, Mantra, Redshift, V-Ray and USD Render ROPs use the older product types such as `arnold_rop`, `mantra_rop` and `usdrender` instead.

The **Houdini Digital Asset (Hda)** creator has the options **Set Current User**, **Use Project as menu entry** and **Promote Spare Parameters**. The **Review** creator has options for the node type (`opengl` or `flipbook`), keeping image sequences, the image format and an override of the resolution and pixel aspect.

## Publishing

### Extractors

| Extractor | Used for | Published as |
|---|---|---|
| Extract ROP | Camera, Alembic models and point caches, BGEO point caches, FBX models and static meshes, VDB caches, Arnold ASS, Redshift proxies, PRT point clouds, Copernicus images | The file written by the ROP: `.abc`, `.bgeo` variants, `.fbx`, `.vdb`, `.ass`, `.rs`, `.prt` or images |
| Extract Composite (Image Sequence) | `imagesequence` | Image sequence |
| Extract Render | Render ROPs: Arnold, Karma, Mantra, Redshift, V-Ray, USD Render | Rendered images, rendered locally during the publish, or submitted to the farm by the Deadline addon |
| Extract Review (OpenGL & Flipbook) | `review` | Viewport render, optionally with the image sequence kept |
| Extract USD | Products of the USD creators | USD layers written by the USD ROP |
| Extract APEX To USD | `rig` | The USD rig layer |
| Extract HDA | `hda` | `.hda`, with the version of the publish set on the definition |
| Extract Active View Thumbnail | `workfile` | A thumbnail grabbed from the active viewport. Enabled by default |
| Extract Last Published | All products | Copies files of the last published version into the staging directory, for frames to fix |

**Save current file** saves the scene before extraction. **Increment current file** saves the workfile as the next version after a publish of a workfile or a render, and is optional.

### Validators

In the second column, "Yes" means the validator has settings in the addon (see the [settings](settings.md)); the others have no settings of their own.

| Validator | Setting | Checks | Applies to |
|---|---|---|---|
| Validate ROP Bypass | | That the ROP is not bypassed | All instances with a ROP |
| Instance in same Context | Yes | That the instance's folder and task match the current context | All instances |
| Validate no errors | Yes | That the instance has no cook errors | All instances |
| Validate Frame Range | | That the start frame is not higher than the end frame, which happens when task handles are applied to a short range. Repair disables **Use task handles** on the instance | Instances with frame data |
| Validate Frame Range Frames to Fix | | That the ROP's frame range covers the frames to fix, and that the pattern (for example `5,10-15`) is valid | Instances with frames to fix |
| Create Intermediate Directories Checked | | That the ROP creates intermediate directories | Point cache, camera, VDB cache, model |
| Validate Render Product Paths Unique | | That no two ROPs write to the same file paths. Optional | Caches, renders, review |
| Houdini Apprentice License | | That Houdini does not run with an Apprentice license, which cannot export Alembic and scrambles USD files | USD, Alembic, FBX, camera |
| Validate Output Node (SOP) | Yes | That the SOP path is set, exists, is a SOP node with an input and has geometry | Point cache, VDB cache, Alembic and APEX instances |
| Validate Input Node (Abc) | Yes | That the connected node is not a VDB or a volume | Alembic instances |
| Validate Primitive to Detail (Abc) | Yes | That the *Primitive to Detail* attributes exist on all primitives of the same hierarchy path, because inconsistent values can crash Houdini | Alembic instances |
| Validate Prims Hierarchy Path | Yes | That the path attribute used by *Build Hierarchy from Attribute* exists on the primitives | Alembic instances |
| Validate Alembic ROP Face Sets | | Logs a warning when the ROP saves face sets. It does not fail | Alembic instances |
| Camera ROP | | That the Alembic ROP is not set to use a SOP path, has a root and a single object, and that the object is a camera | Camera |
| Output File Extension | | That the output is `.abc` for a camera and `.vdb` for a VDB cache | Camera, VDB cache |
| Validate Single Frame | Yes | That the export is a single frame | Model |
| Validate Mesh is Static | Yes | That the output node is not time dependent | Model, static mesh |
| Validate FBX Output Node | Yes | That the output node path is set, exists, is a SOP or object node with geometry and has no invalid primitive types | FBX |
| Validate Product Name | Yes | That the product name matches the name built from the project's naming settings. Repair sets it | Static mesh, HDA |
| Unreal Static Mesh Name (FBX) | Yes | That the output node name has a collision prefix and the product name follows `{prefix}_{FolderName}{Variant}` | Static mesh |
| Validate Frame Settings, Validate Frame Token | | That the output path contains the `$F` frame token when a frame range is exported | VDB cache |
| Validate Output Node (VDB) | Yes | That all primitives of the output are VDBs | VDB cache |
| Validate COP2 Output Node | | That the COP2 path is set, exists and is a COP node | `imagesequence` |
| Validate Export Toggle | | That the export parameter of the render ROP agrees with the render target. Repairable | Render ROPs |
| Validate Review Colorspace | Yes | That the OpenGL or Flipbook ROP uses *OpenColorIO* with a valid colorspace, and the review colorspace of the settings when one is set | Review |
| Scene Setting for review | | That the scene path and camera of the ROP exist (object or LOP camera), and that an override resolution is not zero | Review |
| Validate Output Node (USD) | | That the LOP path is set, exists and is a LOP node | USD |
| Validate USD ROP Default Prim | | That the default prim set on the ROP exists | USD |
| Validate USD Asset Contribution Default Prim | | That a default prim is set when the USD contribution is an asset. Optional | USD |
| Validate All Geometry Has Material Assignment | Yes | That all geometry prims have a material binding | Look |
| Validate Look No Disallowed Types | Yes | That the look layers define none of the configured USD types (by default boundable geometry, render settings, render vars and cameras) | Look |
| Validate Look Shaders Are Defined | | That material prims are defined and not overs. Optional | Look |
| Validate Render Products | | That at least one render product exists | USD Render |
| Validate USD Render ROP Settings | | That a single USD file is written by a single process | USD Render |
| Validate USD Render Arnold Settings | | For the Arnold delegate, that render products use the *Arnold Product Type* and that *Delegate Products* is on in the Husk settings | USD Render |
| Validate USD Render Camera | | That a valid render camera is defined by the ROP override, a render product or the render settings | USD Render |
| Validate USD Render Product Names | | That render product names are set correctly. Optional | USD Render |
| Validate USD Render Product Paths | Yes | That render product paths contain `$HIPNAME` in a parent folder | USD Render |
| Validate Render Resolution | Yes | That the resolution and pixel aspect of the render products match the context | USD Render |
| Validate Wait For Render to Complete | | That *Wait For Render to Complete* is on for a local render | USD Render |
| Validate Workfile Paths | Yes | That file parameters do not use the prohibited variables | Workfile |

### Collectors

Collectors gather the current file, the frame range of the ROP, the frames that will be written, output node paths, render products per ROP type (Arnold, Karma, Mantra, Redshift, V-Ray, USD), the render colorspace, review data, reviewable instances, task handles, USD layers, USD value clips, USD look assets and their file transfers, the frames to fix, and the source inputs (containers) used. **Collect Frames to Fix** adds a text field for frames to re-render and an optional **Rewrite latest version** toggle. **Collect Local Render Instances** creates one instance per AOV for local renders.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Alembic | Model, animation, point cache, GPU cache | `.abc` |
| Load Alembic as Archive | The same types, as the full geometry hierarchy | `.abc` |
| Load Camera (abc) | Camera | `.abc` |
| Load bgeo | Any product | `.bgeo` and its compressed variants |
| Load FBX | Any product | `.fbx` |
| Load VDB | VDB cache | `.vdb` |
| Load Arnold Procedural | `ass` | `.ass` |
| Load Redshift Proxy | Redshift proxy | `.rs` |
| Load Hda | `hda` | `.hda` |
| Load Layout | Layout | `.json` |
| Load Image (COP2) | Image sequence, review, render, plate, image, online | Images |
| Load Image (Copernicus) | The same types, into a Copernicus network. Houdini 20.5 and newer | Images |
| Load Asset (LOPs) | Any product, through the `AYON Load Asset` HDA | `.usd`, `.usda`, `.usdc`, `.usdlc`, `.usdnc`, `.abc` |
| Load Shot (LOPs) | Any product, through the `AYON Load Shot` HDA | The same formats |
| Reference USD | `usd`, `usdCamera`, as a reference in Solaris | `.usd`, `.usda`, `.usdlc`, `.usdnc`, `.abc` |
| Sublayer USD | `usd`, `usdCamera`, as a sublayer in Solaris | The same formats |
| Load USD to SOPs | Any product, with `usdimport` | `.usd`, `.usda`, `.usdc`, `.usdlc`, `.usdnc` |
| Load filepath to node | Any product, as a managed file path on an `AYON Generic Loader` node | Any |
| Show in usdview | Any USD product | `.usd`, `.usda`, `.usdlc`, `.usdnc`, `.abc` |
| Set frame range, Set frame range (with handles) | Actions that set the scene's frame range from a loaded animation, camera, point cache, VDB cache or USD product | `.abc`, `.vdb`, USD |

The Scene Inventory has the actions **Select in scene**, **Set Camera Resolution** and **Show parameters** for Houdini containers. Loaded paths can be collapsed to project root variables (see the settings).

## Loader HDAs

The addon ships digital assets that select an AYON product from within a node network. The choice of product, version and representation is stored in node parameters, so it can be driven by expressions and context options.

| HDA | Network | What it does |
|---|---|---|
| AYON Generic Loader (`ayon::generic_loader`) | Objects, SOPs and LOPs | Selects a product, version and representation and exposes the resulting file path in its **File** parameter. Any file parameter can reference it. |
| AYON Load Asset (`ayon::lop_import`) | LOPs | References or payloads an AYON USD product, usually an asset, into the stage. It combines the generic loader with a *Reference* LOP and filters representations to `usd usda usdlc usdnc abc`. |
| AYON Load Shot (`ayon::load_shot`) | LOPs | Sublayers a USD file, usually a shot, into the stage. It combines the generic loader with a *Sublayer* LOP and the same representation filter. |
| AYON Mute Layers (`ayon::mute_layers`) | LOPs | Mutes USD layers by wildcard path patterns, for example all look layers. The addon ships it, but none of its plugins creates it. |

The generic loader has the parameters **Project**, **Folder Path**, **Folder Name**, **Product**, **Version**, **Representation**, optional representation and extension filters, **Clear Cache**, **File** and **Use AYON Entity URI**. When the entity URI option is on, the file parameter holds an AYON URI that the AYON USD resolver turns into a path at runtime. The nodes can show the product thumbnail in the network view, and **Nodes Referencing File** lists the nodes that use the file. Load Asset adds reload, primitive root, reference type and time offset and scale options; Load Shot adds mute layer and time offset and scale options.

The loaders **Load Asset (LOPs)** and **Load Shot (LOPs)** create these nodes in `/stage`, and **Load filepath to node** creates a generic loader in the AYON container network in `/obj`.

## Workfiles and templated workfile build

Profiles select a workfile template by task type, task name, folder type and folder path. A template can be applied when Houdini starts without a workfile, to every new empty scene, or on demand from the **Template Builder** menu, and it can save the first workfile version. The placeholder types are *Houdini Create*, *Houdini Load* and *Run Python Script*. The run script placeholder was added in 0.10.2.

## Scene setup

| Feature | Behavior |
|---|---|
| Houdini variables | On context change the variables from the settings are updated, for example `$JOB` is set to the work folder of the task. Variables marked as directories are created when missing. |
| Frame range | **Set Frame Range** applies the frame range and FPS of the task. |
| Task handles | **Collect Task Handles** applies the handles of the task to publish instances. It can be turned off, so that the handles are ignored. |
| Launch directory | The launch hook **SetPath** starts Houdini with the work directory as its current directory. |

## Color management

When enabled, Houdini follows the studio's global color management through the OCIO files of the core addon. File rules map file patterns to colorspaces. The **Workfile** color settings set the active displays and views of Houdini through the environment variables `OCIO_ACTIVE_DISPLAYS` and `OCIO_ACTIVE_VIEWS` when Houdini launches (hook **SetDefaultDisplayView**), and can define the review colorspace. The render space of Houdini is always the `scene_linear` role.

## Related

- [Houdini settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
