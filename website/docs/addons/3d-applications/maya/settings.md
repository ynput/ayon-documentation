---
title: Maya addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Maya addon with their default values: general options, color management, scene units, render settings, creators, publish plugins, loaders and workfile build."
addon: maya
addon_repo: ayon-maya
addon_version: 0.6.16
addon_scope: pipeline
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-maya/tree/0.6.16/server/settings
---

# Maya addon settings

<AddonInfo />

The settings of the [Maya addon](index.md) are in **Studio settings > Maya**, and every group can be overridden per project in **Project settings > Maya**. Pasting a location below into the URI bar of the web app opens that setting. The defaults are the ones the addon ships with. How studio and project values combine is described in [Settings](../../../ayon/how-ayon-works/settings.md). The Maya executables and their environment are set in the [Applications addon](../../essentials/applications/index.md), and the publish settings shared by all hosts (such as review outputs and thumbnails) in the [core addon settings](../../essentials/core/settings.md).

## General

<SettingLocation uri="ayon+settings://maya" scope="Studio, with project overrides" />

The fields at the top of the Maya settings: node identifiers, how the workfile is opened at launch, the Maya workspace and the file format per product type.

<!-- screenshot: settings editor, Maya general settings -->

<Settings>
<Setting name="Use cbId workflow" default="On">

Whether a `cbId` identifier is created on each node and validated. Look publishing, look assignment and Yeti, among others, rely on it.

- **On:** the attribute is created on scene save and validated on publish.
- **Generate ids, but do not validate them:** the attribute is created on scene save, but not validated.
- **Off:** the attribute is neither created nor validated. Workflows that rely on `cbId`, such as look assignment and Yeti, may not work.

</Setting>
<Setting name="Open Workfile Post Initialization" default="Enabled">

Opens the last workfile after Maya has finished initializing, instead of passing it on the command line at launch. When [explicit plugin loading](#explicit-plugin-loading) is enabled, the workfile is always opened after initialization, whatever this setting says.

</Setting>
<Setting name="Maya MEL Workspace" default="A set of workspace -fr lines">

The content of the `workspace.mel` written to the work directory, which sets Maya's project file rules. The default sets `shaders` (`renderData/shaders`), `images` (`renders/maya`), `particles` (`particles`), `alembicCache` (`cache/alembic`), `renderData` (`renderData`), `sourceImages` (`sourceimages`), `fileCache` (`cache/nCache`) and `autoSave` (`autosave`), and empty rules for `mayaAscii`, `mayaBinary` and `scene`.

</Setting>
<Setting name="Extension Mapping" default="model, mayaScene, camera, rig, workfile, yetiRig, setdress, layout, camerarig: ma">

The Maya file format used when a product type is saved as a Maya scene. Each product type can be listed once.

<Settings>
<Setting name="Product type" />
<Setting name="Extension">

**Maya Ascii (.ma)** or **Maya Binary (.mb)**.

</Setting>
</Settings>

</Setting>
</Settings>

## Explicit plugin loading

<SettingLocation uri="ayon+settings://maya/explicit_plugins_loading" scope="Studio, with project overrides" />

Loads only a chosen set of Maya plugins at startup, instead of the plugins set to auto-load in the Maya Plug-in Manager. This keeps the environment of every artist the same. When it is enabled, Maya is started with `-noAutoloadPlugins`, the enabled plugins are loaded on startup, and the workfile is opened after that.

<!-- screenshot: settings editor, Explicit Plugins Loading -->

<Settings prefix="explicit-plugins">
<Setting name="Enabled" default="Disabled" />
<Setting name="Plugins To Load" default="101 Maya plugins, 9 of them enabled">

The plugins to consider. Only the enabled entries are loaded. Enabled by default: `AbcExport`, `AbcImport`, `cacheEvaluator`, `deformerEvaluator`, `GPUBuiltInDeformer`, `modelingToolkit`, `objExport`, `renderSetup` and `stereoCamera`.

<Settings>
<Setting name="Enabled">

Load this plugin at startup.

</Setting>
<Setting name="Name">

The plugin name as Maya knows it, such as `mtoa` or `redshift4maya`.

</Setting>
</Settings>

<details>
<summary>All plugins in the default list</summary>

`AbcBullet`, `AbcExport`, `AbcImport`, `animImportExport`, `ArubaTessellator`, `ATFPlugin`, `atomImportExport`, `AutodeskPacketFile`, `autoLoader`, `bifmeshio`, `bifrostGraph`, `bifrostshellnode`, `bifrostvisplugin`, `blast2Cmd`, `bluePencil`, `Boss`, `bullet`, `cacheEvaluator`, `cgfxShader`, `cleanPerFaceAssignment`, `clearcoat`, `convertToComponentTags`, `curveWarp`, `ddsFloatReader`, `deformerEvaluator`, `dgProfiler`, `drawUfe`, `dx11Shader`, `fbxmaya`, `fltTranslator`, `freeze`, `Fur`, `gameFbxExporter`, `gameInputDevice`, `GamePipeline`, `gameVertexCount`, `geometryReport`, `geometryTools`, `glslShader`, `GPUBuiltInDeformer`, `gpuCache`, `hairPhysicalShader`, `ik2Bsolver`, `ikSpringSolver`, `invertShape`, `lges`, `lookdevKit`, `MASH`, `matrixNodes`, `mayaCharacterization`, `mayaHIK`, `MayaMuscle`, `mayaUsdPlugin`, `mayaVnnPlugin`, `melProfiler`, `meshReorder`, `modelingToolkit`, `mtoa`, `mtoh`, `nearestPointOnMesh`, `objExport`, `OneClick`, `OpenEXRLoader`, `pgYetiMaya`, `pgyetiVrayMaya`, `polyBoolean`, `poseInterpolator`, `quatNodes`, `randomizerDevice`, `redshift4maya`, `renderSetup`, `retargeterNodes`, `RokokoMotionLibrary`, `rotateHelper`, `sceneAssembly`, `shaderFXPlugin`, `shotCamera`, `snapTransform`, `stage`, `stereoCamera`, `stlTranslator`, `studioImport`, `Substance`, `substancelink`, `substancemaya`, `substanceworkflow`, `svgFileTranslator`, `sweep`, `testify`, `tiffFloatReader`, `timeSliderBookmark`, `Turtle`, `Type`, `udpDevice`, `ufeSupport`, `Unfold3D`, `VectorRender`, `vrayformaya`, `vrayvolumegrid`, `xgenToolkit`, `xgenVray`

</details>

</Setting>
</Settings>

## Color management

<SettingLocation uri="ayon+settings://maya/imageio" scope="Studio, with project overrides" />

Settings group **Color Management (imageio)**. How Maya follows the color management of the project, which is set in the core addon. See [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (imageio) -->

<Settings prefix="color-management">
<Setting name="Enable Color Management" default="Enabled">

Apply the color management of the project to Maya.

</Setting>
<Setting name="File Rules">

Rules that assign a colorspace to files by name.

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the rules below for Maya.

</Setting>
<Setting name="Rules" default="Empty list">

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name" />
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Workfile">

The color management preferences set in the workfile.

<Settings>
<Setting name="Enabled" default="Enabled">

Set the values below in Maya's color management preferences.

</Setting>
<Setting name="Rendering Space" default="ACES - ACEScg" />
<Setting name="Display" default="ACES" />
<Setting name="View" default="sRGB" />
</Settings>

</Setting>
</Settings>

## Scene units

<SettingLocation uri="ayon+settings://maya/scene_units" scope="Studio, with project overrides" />

The preferred Maya scene units. The **Validate Maya Units** validator in the [publish plugins](#validators) checks the scene against them.

<!-- screenshot: settings editor, Scene Units -->

<Settings>
<Setting name="Linear Units" default="centimeter">

**millimeter**, **centimeter**, **meter**, **kilometer**, **inch**, **foot**, **yard** or **mile**.

</Setting>
<Setting name="Angular units" default="degree">

**degree** or **radian**.

</Setting>
</Settings>

## Dirmap

<SettingLocation uri="ayon+settings://maya/dirmap" scope="Studio, with project overrides" />

Settings group **Maya dirmap Settings**. Maya directory mapping replaces path prefixes when files are opened and referenced, for example to work with scenes made on another platform or at another site.

<!-- screenshot: settings editor, Maya dirmap Settings -->

<Settings prefix="dirmap">
<Setting name="Enabled" default="Disabled">

Map the paths below when scenes are opened.

</Setting>
<Setting name="Use env var placeholder in referenced paths" default="Disabled">

Write the root as an environment variable placeholder, such as `${AYON_PROJECT_ROOT_WORK}`, instead of the resolved root path when a referenced path is stored in the workfile. Useful for remote work with Site Sync.

</Setting>
<Setting name="Dirmap Paths">

<Settings>
<Setting name="Source Paths" default="Empty list">

Path prefixes to replace.

</Setting>
<Setting name="Destination Paths" default="Empty list">

The replacements. A source path is replaced by the destination path at the same position in the list.

</Setting>
</Settings>

</Setting>
</Settings>

## Include handles

<SettingLocation uri="ayon+settings://maya/include_handles" scope="Studio, with project overrides" />

Settings group **Include/Exclude Handles in default playback & render range**: whether the frame handles of the task are added to the playback and render range when the scene's frame range is set.

<!-- screenshot: settings editor, Include/Exclude Handles -->

<Settings prefix="include-handles">
<Setting name="Include handles by default" default="Disabled">

Extend the playback and render range by the handles.

</Setting>
<Setting name="Include/exclude handles by task type" default="Empty list">

Overrides of the default for some task types.

<Settings>
<Setting name="Task types" />
<Setting name="Include handles" default="Enabled" />
</Settings>

</Setting>
</Settings>

## Scripts menu

<SettingLocation uri="ayon+settings://maya/scriptsmenu" scope="Studio, with project overrides" />

Settings group **Scriptsmenu Settings**. It adds a menu with the studio's own tools to the Maya menu bar; see [AYON menu](index.md#ayon-menu).

<!-- screenshot: settings editor, Scriptsmenu Settings -->

<Settings prefix="scriptsmenu">
<Setting name="Menu Name" default="Custom Tools">

The label of the menu.

</Setting>
<Setting name="Define menu using" default="Menu Builder">

**Menu Builder** uses the **Menu Definition** list; **Raw JSON (advanced)** uses **Menu Definition JSON**.

</Setting>
<Setting name="Menu Definition" default="One action, Edit shader name definitions">

The menu items. The default action calls a function in the `openpype.hosts.maya` namespace, which is a legacy module path.

<Settings>
<Setting name="Type">

For example `action` or `separator`.

</Setting>
<Setting name="Command">

The code to run.

</Setting>
<Setting name="Source Type">

The language of the command, `python` or `mel`.

</Setting>
<Setting name="Title" />
<Setting name="Tooltip" />
<Setting name="A list of tags">

Tags of the item.

</Setting>
</Settings>

</Setting>
<Setting name="Menu Definition JSON" default="`[]`">

The whole menu as a JSON list, in the configuration format of the `scriptsmenu` library. It must parse as a list.

</Setting>
</Settings>

## Render settings

<SettingLocation uri="ayon+settings://maya/render_settings" scope="Studio, with project overrides" />

The render settings applied to the scene when a Render instance is created (if **Apply Render Settings on creation** is enabled) and by **Set workfile attributes > Render Settings** in the AYON menu. How renders are published is described in [Rendering](rendering.md).

<!-- screenshot: settings editor, Render Settings -->

<Settings prefix="render-settings">
<Setting name="Apply Render Settings on creation" default="Enabled">

Apply these settings when a Render instance is created.

</Setting>
<Setting name="Default render image folder" default="renders/maya">

The `images` file rule of the Maya workspace, where renders are written. **Validate Render Image Rule (Workspace)** checks the scene against it, unless a custom staging directory is used.

</Setting>
<Setting name="Include all lights in Render Setup Layers by default" default="Enabled">

The default of **Render Setup Include Lights** on new Render instances.

</Setting>
<Setting name="AOV Separator character" default="_ (underscore)">

The character between the render layer and the AOV name in file names: **- (dash)**, **_ (underscore)** or **. (dot)**.

</Setting>
<Setting name="Reset Current Frame" default="Disabled">

Set the current frame to the start frame.

</Setting>
<Setting name="Remove existing AOVs" default="Disabled">

Delete the existing AOVs before the configured ones are created.

</Setting>
<Setting name="Default Render Target" default="Farm Rendering">

The default render target of new Render instances: **Local machine rendering**, **Use existing frames (local)** or **Farm Rendering**.

<Settings>
<Setting name="Default Local Render Method" default="Batch Render">

Shown when the target is **Local machine rendering**. The default local render method of new Render instances: **Batch Render** or **Render Sequence**.

</Setting>
</Settings>

</Setting>
</Settings>

Each renderer has a group of its own. **Additional ... Options** lists in each group take pairs of **Attribute name** and **Value** that are set on the render settings node, such as `AASamples` and `4` for Arnold.

### Arnold

<Settings prefix="arnold">
<Setting name="Image prefix template" default="`<Scene>/<RenderLayer>/<RenderLayer>`" />
<Setting name="Output Image Format" default="exr">

**jpeg**, **png**, **deepexr**, **tif**, **exr**, **maya** or **mtoa_shaders**.

</Setting>
<Setting name="Multilayer (exr)" default="Enabled" />
<Setting name="Tiled (tif, exr)" default="Enabled" />
<Setting name="AOVs to create" default="Empty list">

Arnold AOVs to create, picked from the list of Arnold AOVs.

</Setting>
<Setting name="Additional Arnold Options" default="Empty list" />
</Settings>

### V-Ray

Settings group **Vray Renderer**.

<Settings prefix="vray">
<Setting name="Image prefix template" default="`<scene>/<Layer>/<Layer>`" />
<Setting name="Production Engine" default="V-Ray">

**V-Ray** or **V-Ray GPU**.

</Setting>
<Setting name="Output Image Format" default="exr">

**png**, **jpg**, **vrimg**, **hdr**, **exr**, **exr (multichannel)**, **exr (deep)**, **tga**, **bmp** or **sgi**.

</Setting>
<Setting name="AOVs to create" default="Empty list">

V-Ray render elements to create.

</Setting>
<Setting name="Additional Vray Options" default="Empty list" />
</Settings>

### Redshift

<Settings prefix="redshift">
<Setting name="Image prefix template" default="`<Scene>/<RenderLayer>/<RenderLayer>`" />
<Setting name="Enable Global Illumination" default="Disabled" />
<Setting name="Primary GI Engine" default="None">

**None**, **Irradiance Cache** or **Brute Force**. With **None**, AYON does not set it.

</Setting>
<Setting name="Secondary GI Engine" default="None">

**None**, **Irradiance Point Cloud** or **Brute Force**. With **None**, AYON does not set it.

</Setting>
<Setting name="Output Image Format" default="OpenEXR">

**Maya IFF**, **OpenEXR**, **TIFF**, **PNG**, **Targa** or **JPEG**.

</Setting>
<Setting name="Multipart (exr)" default="Enabled" />
<Setting name="Force combine beauty and AOVs" default="Enabled" />
<Setting name="AOVs to create" default="Empty list">

Redshift AOVs to create.

</Setting>
<Setting name="Additional Redshift Options" default="Empty list" />
</Settings>

### Renderman

<Settings prefix="renderman">
<Setting name="Image prefix template" default="`<layer>{aov_separator}<aov>.<f4>.<ext>`" />
<Setting name="Image Output Directory" default="`<scene>/<layer>`" />
<Setting name="Display Filters" default="Empty list">

Display filters to create, such as `PxrImageDisplayFilter` or `PxrEdgeDetect`.

</Setting>
<Setting name="Image Display Filter Directory" default="`<imagedir>/<layer>{aov_separator}imageDisplayFilter.<f4>.<ext>`" />
<Setting name="Sample Filters" default="Empty list">

Sample filters to create, such as `PxrCryptomatte` or `PxrWatermarkFilter`.

</Setting>
<Setting name="Cryptomatte Output Directory" default="`<imagedir>/<layer>{aov_separator}cryptomatte.<f4>.<ext>`" />
<Setting name="Watermark Filter Directory" default="`<imagedir>/<layer>{aov_separator}watermarkFilter.<f4>.<ext>`" />
<Setting name="Additional Renderer Options" default="Empty list" />
</Settings>

### Maya Hardware 2.0

<Settings prefix="maya-hardware">
<Setting name="Image prefix template" default="`<Scene>/<RenderLayer>/<RenderLayer>`" />
</Settings>

## Creators

<SettingLocation uri="ayon+settings://maya/create" scope="Studio, with project overrides" />

The creators of the Publisher. The products they make are described in [Products Maya can create](index.md#products-maya-can-create). Every creator has these fields, unless noted:

- **Enabled:** the creator is listed in the Publisher.
- **Default Variants:** the variants offered when an instance is created.
- **Product type items:** an optional list of extra product types the creator can make, each with a **Product type** and a **Label** shown in the UI.

<!-- screenshot: settings editor, Creators -->

<Settings>
<Setting name="Use current context entity attributes as frame range defaults" default="Disabled">

Use the frame range of the current task as the default of created instances. When disabled, the current Maya timeline is used.

</Setting>
<Setting name="Create Animation" default="Main">

Has no **Enabled** switch: animation instances are created when a rig is loaded, not from the Publisher.

<Settings>
<Setting name="Include Parent Hierarchy" default="Disabled" />
<Setting name="Include User Defined Attributes" default="Disabled" />
</Settings>

</Setting>
<Setting name="Create Arnold Scene Source" default="Enabled, Main">

<Settings>
<Setting name="Expand Procedurals" default="Disabled" />
<Setting name="Motion Blur" default="Enabled" />
<Setting name="Motion Blur Keys" default="2" />
<Setting name="Motion Blur Length" default="0.5" />
<Setting name="Export Options" default="Disabled" />
<Setting name="Export Cameras" default="Disabled" />
<Setting name="Export Lights" default="Disabled" />
<Setting name="Export Shapes" default="Disabled" />
<Setting name="Export Shaders" default="Disabled" />
<Setting name="Export Override Nodes" default="Disabled" />
<Setting name="Export Drivers" default="Disabled" />
<Setting name="Export Filters" default="Disabled" />
<Setting name="Export Color Managers" default="Disabled" />
<Setting name="Export Operators" default="Disabled" />
<Setting name="Export Imagers" default="Disabled" />
<Setting name="Export Bounding Box" default="Enabled" />
<Setting name="Use gzip Compression (.ass.gz)" default="Disabled" />
</Settings>

</Setting>
<Setting name="Create Camera" default="Enabled, Main" />
<Setting name="Create Camera Rig" default="Enabled, Main" />
<Setting name="Create Layout" default="Enabled, Main" />
<Setting name="Create Look" default="Enabled, Main">

<Settings>
<Setting name="Make tx files" default="Enabled">

Convert textures to `.tx` with `maketx` on publish.

</Setting>
<Setting name="Make Redshift texture files" default="Disabled">

Convert textures to Redshift `.rstexbin` files on publish.

</Setting>
<Setting name="Texture Reference Objects" default="Disabled">

Include texture reference objects in the look.

</Setting>
</Settings>

</Setting>
<Setting name="Create Matchmove" default="Enabled, Main" />
<Setting name="Create Maya Scene" default="Enabled, Main" />
<Setting name="Create Maya USD" default="Enabled, Main">

<Settings>
<Setting name="Include User Defined Attributes" default="Disabled">

The default of whether all custom Maya attributes of the nodes are exported as USD metadata (`userProperties`).

</Setting>
<Setting name="Custom Attributes" default="Empty">

The default custom attributes to export, separated by commas, such as `attr1, attr2`.

</Setting>
<Setting name="Custom Attributes Prefix" default="Empty">

The default prefixes of custom attributes to export, separated by commas, such as `prefix1, prefix2`.

</Setting>
</Settings>

</Setting>
<Setting name="Create Maya USD: Model" default="Enabled, Main" />
<Setting name="Create Maya USD Export Layer" default="Enabled, Main" />
<Setting name="Create Model" default="Enabled; Main, Proxy, Sculpt">

<Settings>
<Setting name="Write Face Sets" default="Enabled" />
<Setting name="Include Shaders" default="Disabled" />
</Settings>

</Setting>
<Setting name="Create Multi-shot Layout" default="Enabled, Main" />
<Setting name="Create Multiverse Look" default="Disabled, no variants">

<Settings>
<Setting name="publish_mip_map" default="Enabled">

Publish MipMap files with the look. The settings editor shows the raw key as the label.

</Setting>
</Settings>

</Setting>
<Setting name="Create Multiverse USD" default="Disabled, Main" />
<Setting name="Create Multiverse USD Composition" default="Disabled, Main" />
<Setting name="Create Multiverse USD Override" default="Disabled, Main" />
<Setting name="Create Ornatrix Cache" default="Disabled, Main" />
<Setting name="Create Ornatrix Rig" default="Disabled, Main" />
<Setting name="Create Point Cache" default="Enabled, Main">

<Settings>
<Setting name="Include User Defined Attributes" default="Disabled" />
</Settings>

</Setting>
<Setting name="Create Proxy Alembic" default="Enabled, Main">

<Settings>
<Setting name="Write Color Sets" default="Disabled" />
<Setting name="Write Face Sets" default="Disabled" />
</Settings>

</Setting>
<Setting name="Create Redshift Proxy" default="Enabled, Main" />
<Setting name="Create Render" default="Enabled, Main" />
<Setting name="Create Render Setup Preset" default="Enabled, Main" />
<Setting name="Create Review" default="Enabled, Main">

<Settings>
<Setting name="Use Maya Timeline for Frame Range." default="Enabled">

Use the Maya timeline as the frame range of new review instances.

</Setting>
</Settings>

</Setting>
<Setting name="Create Rig" default="Enabled; Main, Sim, Cloth" />
<Setting name="Create Set Dress" default="Enabled; Main, Anim">

<Settings>
<Setting name="Exact Set Members Only" default="Enabled" />
<Setting name="Include shader" default="Enabled" />
</Settings>

</Setting>
<Setting name="Create Unreal- Skeletal Mesh" default="Enabled, Main">

<Settings>
<Setting name="Joint root hint" default="jnt_org">

The name of the root joint of the skeleton.

</Setting>
</Settings>

</Setting>
<Setting name="Create Unreal - Static Mesh" default="Enabled; empty variant, _Main">

<Settings>
<Setting name="Static Mesh Prefix" default="S" />
<Setting name="Collision Prefixes" default="UBX, UCP, USP, UCX">

Prefixes of the meshes that Unreal Engine uses as collision.

</Setting>
</Settings>

</Setting>
<Setting name="Create Unreal - Yeti Cache" default="Enabled; Main, Sim, Cloth" />
<Setting name="Create VRay Proxy" default="Enabled, Main">

<Settings>
<Setting name="VrMesh" default="Enabled">

Export a `.vrmesh` file.

</Setting>
<Setting name="Alembic" default="Enabled">

Export an Alembic file.

</Setting>
</Settings>

</Setting>
<Setting name="Create VRay Scene" default="Enabled, Main" />
<Setting name="Create Workfile">

Has no **Enabled** switch or variants.

<Settings>
<Setting name="Mandatory workfile" default="Disabled">

Artists cannot turn the workfile instance off in the Publisher. Requires core addon 1.4.1 or newer.

</Setting>
<Setting name="Product type items" default="Empty list" />
</Settings>

</Setting>
<Setting name="Create Xgen" default="Enabled, Main" />
<Setting name="Create Yeti Cache" default="Enabled, Main" />
<Setting name="Create Yeti Rig" default="Enabled, Main" />
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://maya/publish" scope="Studio, with project overrides" />

Settings group **Publishers**: the collectors, validators and extractors of the Maya publish. What each plugin checks or writes is described in [Publishing](index.md#publishing). Most plugins share three switches:

- **Enabled:** the plugin runs.
- **Optional:** the artist can turn the plugin off in the Publisher.
- **Active:** the plugin is turned on by default in the Publisher. Applies only to optional plugins.

The default of each plugin lists its switches, for example *Enabled, not optional, active*. A plugin without one of these switches lists only the switches it has. In the settings editor some **Enabled** switches are labelled with the plugin name, such as `ValidateFrameRange`. The plugins are grouped below by kind; the settings editor lists them in one group, mostly in the same order.

<!-- screenshot: settings editor, Publishers -->

### Collectors

<Settings>
<Setting name="Collect Render Layers" default="No switches">

<Settings>
<Setting name="Sync render version with workfile" default="Disabled">

Publish renders with the version number of the workfile.

</Setting>
</Settings>

</Setting>
<Setting name="Collect FBX Animation" default="Disabled, optional, active">

<Settings>
<Setting name="Input Connections" default="Enabled" />
<Setting name="Up Axis" default="y">

**y** or **z**.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Camera for FBX export" default="Disabled, not optional, active">

<Settings>
<Setting name="Input Connections" default="Enabled" />
<Setting name="Up Axis" default="y">

**y** or **z**.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Model for FBX export" default="Disabled, not optional, active" />
<Setting name="Collect Assets for GLB/GLTF export" default="Disabled">

Has only an **Enabled** switch.

</Setting>
<Setting name="Maya USD Export Chaser: Filter Properties" default="Disabled">

Has only an **Enabled** switch.

<Settings>
<Setting name="Default Filter" default="Empty">

The default filter of the USD properties to export, in the pattern syntax of Houdini parameters. Examples: `xformOp*` exports only transforms, `* ^xformOp*` everything but transforms, and `* ^extent ^points ^faceVertexCounts ^faceVertexIndices ^primvars*` everything but mesh point data.

</Setting>
</Settings>

</Setting>
</Settings>

### Validators

<Settings>
<Setting name="Validate Instance In Context" default="Enabled, optional, active" />
<Setting name="Validate Frame Range" default="Enabled, optional, active">

<Settings>
<Setting name="Exclude product base types" default="model, rig, staticMesh">

Product base types that are not validated.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Shader Name" default="Disabled, optional, active">

<Settings>
<Setting name="Validation regex" default="`(?P<asset>.*)_(.*)_SHD`">

The regular expression shader names must match. A named group `asset` is checked against the current folder name.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Look Shading Engine Naming" default="Enabled, optional, active" />
<Setting name="Validate Colorspace" default="Enabled, optional, active" />
<Setting name="Validate Attributes" default="Disabled">

Has only an **Enabled** switch.

<Settings>
<Setting name="Attributes" default="`{}`">

A JSON object of the attribute values to check. It must parse as an object.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Loaded Plugin" default="Disabled, optional">

<Settings>
<Setting name="Whitelist Maya Native Plugins" default="Disabled">

Allow all plugins that ship with Maya.

</Setting>
<Setting name="Authorized plugins" default="Empty list">

The plugins that are allowed to be loaded.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Maya Units" default="Enabled, not optional">

<Settings>
<Setting name="Validate linear units" default="Enabled">

Check the linear unit of the scene against [Scene units](#scene-units).

</Setting>
<Setting name="Validate angular units" default="Enabled">

Check the angular unit of the scene against [Scene units](#scene-units).

</Setting>
<Setting name="Validate FPS" default="Enabled">

Check the frame rate of the scene against the FPS of the task.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Unreal Static Mesh Name" default="Enabled, optional">

Checks names against the prefixes of the **Create Unreal - Static Mesh** creator.

<Settings>
<Setting name="Validate mesh names" default="Disabled" />
<Setting name="Validate collision names" default="Enabled" />
</Settings>

</Setting>
<Setting name="Validate Cycle Error" default="Enabled, not optional">

<Settings>
<Setting name="Families" default="rig">

The families the validator applies to.

</Setting>
</Settings>

</Setting>
<Setting name="Plug-in Path Attributes" default="Disabled, not optional, active">

Checks that file paths stored on plugin nodes exist.

<Settings>
<Setting name="File Attribute" default="32 node types">

Node types and the attribute that holds their file path, such as `AlembicNode` and `abc_File`. Each node type can be listed once. The default covers `AlembicNode`, `VRayProxy`, `RenderManArchive`, `pgYetiMaya`, `aiStandIn`, `RedshiftSprite`, `RedshiftBokeh`, `RedshiftCameraMap`, `RedshiftEnvironment`, `RedshiftDomeLight`, `RedshiftIESLight`, `RedshiftLightGobo`, `RedshiftNormalMap`, `RedshiftProxyMesh`, `RedshiftVolumeShape`, `VRayTexGLSL`, `VRayMtlGLSL`, `VRayVRmatMtl`, `VRayPtex`, `VRayLightIESShape`, `VRayMesh`, `VRayMtlOSL`, `VRayTexOSL`, `VRayTexOCIO`, `VRaySettingsNode`, `VRayScannedMtl`, `VRayScene`, `VRayMtlMDL`, `VRaySimbiont`, `dlOpenVDBShape`, `pgYetiMayaShape` and `gpuCache`.

<Settings>
<Setting name="Node type" />
<Setting name="Attribute" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Validate Render Settings" default="Enabled, not optional, active">

Besides the built-in checks, the lists below add render settings attributes that must have a given value, per renderer. Each item has a **Type** (the attribute, such as `defaultArnoldRenderOptions.AASamples`) and a **Value**.

<Settings>
<Setting name="Arnold Render Attributes" default="Empty list" />
<Setting name="VRay Render Attributes" default="Empty list" />
<Setting name="Redshift Render Attributes" default="Empty list" />
<Setting name="Renderman Render Attributes" default="Empty list" />
</Settings>

</Setting>
<Setting name="Validate Resolution Setting" default="Enabled, optional, active" />
<Setting name="Validate Current Render Layer Has Renderable Camera" default="Enabled, not optional, active" />
<Setting name="Validate GLSL Material" default="Disabled, not optional, active" />
<Setting name="Validate GLSL Plugin" default="Disabled, not optional, active" />
<Setting name="Validate Ornatrix Rig Content" default="Enabled, not optional, active" />
<Setting name="Validate Ornatrix Cache Content" default="Enabled, not optional, active" />
<Setting name="Validate Render Image Rule (Workspace)" default="Enabled, not optional, active" />
<Setting name="Validate No Default Cameras Renderable" default="Enabled, not optional, active" />
<Setting name="Validate Render Single Camera" default="Enabled, not optional, active" />
<Setting name="Validate Render Passes/AOVs Are Registered" default="Enabled, not optional, active" />
<Setting name="Validate Step Size" default="Enabled, not optional, active" />
<Setting name="VRay Distributed Rendering" default="Enabled, not optional, active" />
<Setting name="VRay Referenced AOVs" default="Enabled, not optional, active" />
<Setting name="VRay Translator Settings" default="Enabled, not optional, active" />
<Setting name="VRay Proxy Settings" default="Enabled, not optional, active" />
<Setting name="VRay Proxy Members" default="Enabled, not optional, active" />
<Setting name="Yeti Render Script Callbacks" default="Enabled, not optional, active" />
<Setting name="Yeti Rig Cache State" default="Enabled, not optional, active" />
<Setting name="Yeti Rig Input Shapes In Instance" default="Enabled, not optional, active" />
<Setting name="Yeti Rig Settings" default="Enabled, not optional, active" />
<Setting name="Validate Model Content" default="Enabled, not optional">

<Settings>
<Setting name="Validate one top group" default="Enabled">

Require a single top group in a model.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Transform Naming Suffix" default="Enabled, optional">

Checks the suffix of each transform against the type of its child shapes.

<Settings>
<Setting name="Suffix Naming Tables" default="JSON table">

A JSON object of shape types and their allowed suffixes. The default allows `_GEO`, `_GES`, `_GEP` and `_OSD` for `mesh`, `_CRV` for `nurbsCurve`, `_NRB` for `nurbsSurface`, `_LOC` for `locator` and `_GRP` for `group`.

</Setting>
<Setting name="Allow if suffix not in table" default="Enabled">

Accept transforms whose shape type is not in the table.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Color Sets" default="Enabled, optional, active" />
<Setting name="Validate Mesh Has Overlapping UVs" default="Disabled, optional, active" />
<Setting name="Validate Mesh Arnold Attributes" default="Disabled, optional, active" />
<Setting name="Validate Mesh Shader Connections" default="Enabled, optional, active" />
<Setting name="Validate Mesh Single UV Set" default="Disabled, optional, active" />
<Setting name="Validate Mesh Has UVs" default="Enabled, optional, active" />
<Setting name="Validate Mesh Lamina Faces" default="Disabled, optional, active" />
<Setting name="Validate Mesh Ngons" default="Disabled, optional, active" />
<Setting name="Validate Mesh Non-Manifold" default="Disabled, optional, active" />
<Setting name="Validate Mesh No Negative Scale" default="Enabled, not optional, active" />
<Setting name="Validate Mesh Edge Length Non Zero" default="Enabled, optional, active" />
<Setting name="Validate Mesh Normals Unlocked" default="Disabled, optional, active" />
<Setting name="Validate Mesh UV Set Map 1" default="Disabled, optional, active" />
<Setting name="Validate Mesh Vertices Have Edges" default="Enabled, optional, active" />
<Setting name="Validate No Animation" default="Disabled, optional, active" />
<Setting name="Validate No Namespace" default="Enabled, not optional, active" />
<Setting name="Validate No Null Transforms" default="Enabled, not optional, active" />
<Setting name="Validate No Unknown Nodes" default="Enabled, not optional, active" />
<Setting name="Validate Node No Ghosting" default="Disabled, not optional, active" />
<Setting name="Validate Scene Unknown Nodes" default="Enabled, optional, active" />
<Setting name="Validate Shape Default Names" default="Disabled, optional, active" />
<Setting name="Validate Shape Render Stats" default="Disabled, optional, active" />
<Setting name="Validate Shape Zero" default="Disabled, optional, active" />
<Setting name="Validate Transform Zero" default="Disabled, optional, active" />
<Setting name="Validate Unique Names" default="Disabled, optional, active" />
<Setting name="Validate No V-Ray Proxies (VRayMesh)" default="Enabled, not optional, active" />
<Setting name="Validate if Mesh is Triangulated" default="Disabled, optional, active" />
<Setting name="Validate Alembic Visible Node" default="Enabled, not optional, active" />
<Setting name="Validate Alembic Defaults Pointcache" default="Enabled, optional, active" />
<Setting name="Validate Alembic Defaults Animation" default="Enabled, optional, active" />
<Setting name="Validate Rig Contents" default="Disabled, optional, active" />
<Setting name="Validate Rig Joints Hidden" default="Disabled, optional, active" />
<Setting name="Validate Rig Controllers" default="Disabled, optional, active" />
<Setting name="Validate Animation Content" default="Enabled, not optional, active" />
<Setting name="Validate Animation Out Set Related Node Ids" default="Enabled, not optional, active" />
<Setting name="Validate Animation Product Type Publish" default="Enabled, not optional, active" />
<Setting name="Validate Rig Controllers (Arnold Attributes)" default="Enabled, not optional, active" />
<Setting name="Validate Single Assembly" default="Enabled, not optional, active" />
<Setting name="Validate Animated Rig Content" default="Enabled, not optional, active" />
<Setting name="Validate Skeletal Mesh Top Node" default="Enabled, not optional, active" />
<Setting name="Validate Skeleton Rig Contents" default="Enabled, optional, active" />
<Setting name="Validate Skeleton Rig Controllers" default="Disabled, optional, active" />
<Setting name="Validate Skincluster Deformer Relationships" default="Enabled, not optional, active" />
<Setting name="Validate Skeleton Rig Output Ids" default="Disabled, optional, active" />
<Setting name="Validate Skeleton Top Group Hierarchy" default="Enabled, optional, active" />
<Setting name="Validate Rig Out Set Node Ids" default="Enabled, not optional">

<Settings>
<Setting name="Allow history only" default="Disabled">

Accept nodes whose ID matches only through their history.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Skeleton Rig Out Set Node Ids" default="Disabled, not optional">

<Settings>
<Setting name="Allow history only" default="Disabled">

Accept nodes whose ID matches only through their history.

</Setting>
</Settings>

</Setting>
<Setting name="Validate Camera Attributes" default="Disabled, optional, active" />
<Setting name="Validate Ass Relative Paths" default="Enabled, not optional, active" />
<Setting name="Validate No Default Cameras" default="Enabled, not optional, active" />
<Setting name="Validate Unreal Up-Axis Check" default="Disabled, optional, active" />
<Setting name="Validate Camera Content" default="Enabled, not optional">

<Settings>
<Setting name="Validate presence of shapes" default="Enabled">

Require a camera shape in a camera instance.

</Setting>
</Settings>

</Setting>
</Settings>

### Extractors

Extract Playblast Settings has its own section [below](#extract-playblast-settings).

<Settings>
<Setting name="Extract Proxy Alembic" default="Disabled, not optional, active">

<Settings>
<Setting name="Families" default="proxyAbc" />
</Settings>

</Setting>
<Setting name="Extract OBJ" default="Disabled, optional, active" />
<Setting name="Extract Active View Thumbnail" default="Enabled, not optional, active" />
<Setting name="Extract Arnold Scene Source" default="Enabled, not optional, active" />
<Setting name="Extract Camera Maya Scene" default="Enabled, not optional, active" />
<Setting name="Extract Animation FBX" default="Enabled, not optional, active" />
<Setting name="Extract FBX" default="Enabled, not optional, active" />
<Setting name="Maya Scene(Raw)" default="Enabled, not optional, active">

<Settings>
<Setting name="Families" default="layout">

Families whose loaded instances are added to the raw Maya scene publish.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Camera Alembic" default="Enabled, optional, active">

<Settings>
<Setting name="Bake Attributes" default="`[]`">

The attributes included in the Alembic camera export, written as a JSON list.

</Setting>
</Settings>

</Setting>
<Setting name="Extract GLB" default="Disabled, not optional, active">

<Settings>
<Setting name="GLSL Shader Directory" default="/maya2glTF/PBR/shaders/glTF_PBR.ogsfx">

The `.ogsfx` shader of the maya2glTF plugin.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Look" default="Enabled, not optional, active">

<Settings>
<Setting name="Extra arguments for maketx command line" default="Empty list">

Arguments added to the `maketx` command that converts textures to `.tx`.

<Settings>
<Setting name="Argument">

The flag, such as `--colorconvert`.

</Setting>
<Setting name="Parameters">

The values that follow the flag.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Extract GPU Cache" default="Disabled, not optional, active">

<Settings>
<Setting name="Families" default="model, animation, pointcache" />
<Setting name="Step" default="1.0">

The time step between samples. 1.0 or more.

</Setting>
<Setting name="Step Save" default="1">

Save every n-th sample. 1 or more.

</Setting>
<Setting name="Optimize Hierarchy" default="Enabled" />
<Setting name="Optimization Threshold" default="40000" />
<Setting name="Optimize Animations For Motion Blur" default="Enabled" />
<Setting name="Write Materials" default="Enabled" />
<Setting name="User Based Tessellation" default="Enabled" />
</Settings>

</Setting>
<Setting name="Extract Layout" default="Enabled, not optional, active" />
<Setting name="Extract Maya USD Layer" default="Enabled, not optional, active" />
<Setting name="Extract Model (Maya Scene)" default="Enabled, optional, active" />
<Setting name="Extract Alembic" default="Enabled, not optional, active">

The Alembic export of point caches and models. The fields match the options of Maya's `AbcExport` command.

<Settings>
<Setting name="Families" default="pointcache, model, vrayproxy.alembic" />
<Setting name="Euler Filter" default="Disabled">

Apply an Euler filter while sampling rotations.

</Setting>
<Setting name="Renderable Only" default="Disabled">

Export only renderable visible shapes.

</Setting>
<Setting name="Strip Namespaces" default="Enabled">

Strip namespaces from node names.

</Setting>
<Setting name="UVs Only" default="Disabled">

Write only the UV data of polygon meshes and subdivision surfaces.

</Setting>
<Setting name="UV Write" default="Enabled">

Write the UV data of polygon meshes and subdivision surfaces.

</Setting>
<Setting name="Verbose" default="Disabled">

Print the frame being evaluated.

</Setting>
<Setting name="Visible Only" default="Disabled">

Export only DAG objects visible during the frame range.

</Setting>
<Setting name="Whole Frame Geo" default="Disabled">

Write geometry data only on whole frames.

</Setting>
<Setting name="World Space" default="Enabled">

Store root nodes in world space.

</Setting>
<Setting name="Write Color Sets" default="Disabled">

Write vertex colors with the geometry.

</Setting>
<Setting name="Write Creases" default="Disabled">

Write edge and vertex creases.

</Setting>
<Setting name="Write Face Sets" default="Disabled">

Write face sets with the geometry.

</Setting>
<Setting name="Write Face Sets: Force all assignments" default="Disabled">

With face sets enabled, write every material assignment as a face set.

</Setting>
<Setting name="Write Normals" default="Enabled">

Write normals with deforming geometry.

</Setting>
<Setting name="Write UV Sets" default="Disabled">

Write all UV sets, as face-varying indexed parameters.

</Setting>
<Setting name="Write Visibility" default="Disabled">

Store the visibility state. Otherwise everything is written as visible.

</Setting>
<Setting name="Pre Roll" default="Disabled">

Start evaluating the scene at **Pre Roll Start Frame**. The frames before the export start are evaluated but not written, for simulation run-up.

</Setting>
<Setting name="Pre Roll Start Frame" default="0">

The frame evaluation starts at. Used only when **Pre Roll** is enabled.

</Setting>
<Setting name="Data Format" default="ogawa">

**ogawa** or **HDF**.

</Setting>
<Setting name="Bake Attributes" default="Empty list">

Attributes included in the export.

</Setting>
<Setting name="Bake Attribute Prefixes" default="Empty list">

Prefixes of attributes included in the export.

</Setting>
<Setting name="Custom Attributes" default="Empty">

Attributes included in the export, separated by semicolons.

</Setting>
<Setting name="Custom Attributes Prefix" default="Empty">

Prefixes of attributes included in the export, separated by semicolons.

</Setting>
<Setting name="User Attr" default="Empty">

User attributes included in the export, separated by semicolons.

</Setting>
<Setting name="User Attr Prefix" default="Empty">

Prefixes of user attributes included in the export, separated by semicolons.

</Setting>
<Setting name="Mel Per Frame Callback" default="Empty">

MEL command run on each evaluated frame.

</Setting>
<Setting name="Mel Post Job Callback" default="Empty">

MEL command run when the export has finished.

</Setting>
<Setting name="Python Per Frame Callback" default="Empty">

Python command run on each evaluated frame.

</Setting>
<Setting name="Python Post Job Callback" default="Empty">

Python command run when the export has finished.

</Setting>
<Setting name="Exposed Overrides" default="Custom Attributes, Custom Attributes Prefix, Renderable Only, Visible Only, World Space, Write Color Sets, Write Face Sets, Write Normals">

The fields above that artists can change per instance in the Publisher. Any field of this plugin except **Families**, **Bake Attributes**, **Bake Attribute Prefixes** and **Write Face Sets: Force all assignments** can be picked.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Animation (Alembic)" default="Enabled, not optional, active">

The Alembic export of animation from loaded rigs.

</Setting>
<Setting name="Extract Maya USD" default="Enabled, not optional, active">

The USD export with the Maya USD plugin. The fields match the options of `mayaUSDExport`.

<Settings>
<Setting name="Exposed Overrides" default="Strip Namespaces, World-Space, Export Component Tags, Export Visibility, Merge Transform and Shape, Default Subdivision Method">

The fields below that artists can change per instance in the Publisher. Any field from **Strip Namespaces** to **Export Unit** can be picked.

</Setting>
<Setting name="Strip Namespaces" default="Enabled">

Strip namespaces from node names.

</Setting>
<Setting name="World-Space" default="Enabled">

Export root prims with their full world-space transforms instead of local transforms.

</Setting>
<Setting name="Export Component Tags" default="Disabled">

Export geometry component tags as `UsdGeomSubset` data.

</Setting>
<Setting name="Export Visibility" default="Enabled">

Export the visibility state and its animation.

</Setting>
<Setting name="Merge Transform and Shape" default="Enabled">

Combine a transform and its shape into one prim, which gives smaller and faster scenes. They are split again when imported into Maya.

</Setting>
<Setting name="Default Subdivision Method" default="Catmull Clark">

**Catmull Clark**, **Loop**, **Bilinear** or **None**. A mesh can set its own with a `USD_ATTR_subdivisionScheme` attribute.

</Setting>
<Setting name="Export BlendShapes" default="Enabled" />
<Setting name="Export Skin" default="None">

**None** (not exported), **Auto** (exported when present) or **Explicit** (only explicitly tagged skin clusters).

</Setting>
<Setting name="Export Skeletons" default="None">

**None** (not exported), **Auto** (all skeletons, which may create SkelRoots) or **Explicit** (only skeletons under SkelRoots).

</Setting>
<Setting name="Export Collection Based Bindings" default="Disabled">

Bind materials to material collections instead of binding them directly to each prim.

</Setting>
<Setting name="Export Color Sets" default="Enabled" />
<Setting name="Export Display Color" default="Disabled" />
<Setting name="Export Materials" default="Enabled" />
<Setting name="Export Assigned Materials" default="Disabled">

Export only materials assigned to meshes.

</Setting>
<Setting name="Export Instances" default="Enabled" />
<Setting name="Export UVs" default="Enabled" />
<Setting name="Up Axis" default="Maya Preferences">

**Maya Preferences** follows the Maya preferences, **None** authors no up axis, **y** or **z** authors that axis and converts the data if needed.

</Setting>
<Setting name="Export Unit" default="Maya Preferences">

**Maya Preferences**, **None** (no units authored), or **Millimeters**, **Centimeters**, **Meters**, **Inches** or **Feet**, which converts the data.

</Setting>
<Setting name="Custom Attribute Default Namespace" default="userProperties:">

The namespace given to exported custom attributes that have no explicit USD name.

</Setting>
<Setting name="Custom Attribute Name Mapping" default="Empty list">

Maya attribute names and the USD attribute names they are exported as.

<Settings>
<Setting name="Maya name" />
<Setting name="USD name" />
</Settings>

</Setting>
<Setting name="Advanced Custom Attribute Mapping" default="`{}`">

A JSON mapping of Maya attributes to USD attributes, in the structure of the `USD_UserExportedAttributesJson` attribute that `mayaUSDExport` reads.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Maya USD with Model" default="Enabled, optional, not active" />
<Setting name="Extract Maya USD with Pointcache" default="Enabled, optional, not active" />
<Setting name="Extract Maya USD with Animation" default="Enabled, optional, not active" />
<Setting name="Extract Multiverse Look" default="Disabled, not optional, active" />
<Setting name="Extract Multiverse USD Composition" default="Disabled, not optional, active" />
<Setting name="Extract Multiverse USD Override" default="Disabled, not optional, active" />
<Setting name="Extract Multiverse USD" default="Disabled, not optional, active" />
<Setting name="Extract Ornatrix Cache" default="Enabled, not optional, active" />
<Setting name="Extract Ornatrix Rig" default="Enabled, not optional, active" />
<Setting name="Extract Redshift Proxy" default="Enabled, not optional, active" />
<Setting name="Extract Render Setup" default="Enabled, not optional, active" />
<Setting name="Extract Rig" default="Enabled, not optional, active" />
<Setting name="Extract Skeleton Mesh" default="Enabled, optional, active" />
<Setting name="Extract Thumbnail" default="Enabled, not optional, active" />
<Setting name="Extract Unreal Skeletal Mesh - Alembic" default="Enabled, optional, active" />
<Setting name="Extract Unreal Skeletal Mesh - FBX" default="Enabled, optional, active" />
<Setting name="Extract Unreal Static Mesh" default="Enabled, not optional, active" />
<Setting name="Extract Unreal Yeti Cache" default="Enabled, not optional, active" />
<Setting name="Extract VRay Proxy" default="Enabled, not optional, active" />
<Setting name="Extract VRay Scene" default="Enabled, not optional, active" />
<Setting name="Extract Workfile Xgen" default="Enabled, not optional, active" />
<Setting name="Extract Xgen" default="Enabled, not optional, active" />
<Setting name="Extract Yeti Cache" default="Enabled, not optional, active" />
<Setting name="Extract Yeti Rig" default="Enabled, not optional, active" />
</Settings>

### Extract Playblast Settings

<SettingLocation uri="ayon+settings://maya/publish/ExtractPlayblast" scope="Studio, with project overrides" />

The playblast of review instances. The capture preset of the first profile that matches the task and product is used. When no profile matches, the deprecated **Capture Preset** is used. Default: enabled, not optional, active.

<!-- screenshot: settings editor, Extract Playblast Settings -->

<Settings prefix="playblast">
<Setting name="DEPRECATED! Please use &quot;Profiles&quot; below. Capture Preset" id="playblast-deprecated-capture-preset">

The capture preset used when no profile matches. Its fields are the same as the **Capture Preset** of a profile, described below. Its defaults are the same too, except **Resolution** (1920 by 1080) and **Plugin Objects** (one entry, `gpuCacheDisplayFilter`, disabled).

</Setting>
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Task types">

Empty matches all task types.

</Setting>
<Setting name="Task names">

Empty matches all task names.

</Setting>
<Setting name="Products names">

Empty matches all products.

</Setting>
<Setting name="Capture Preset" id="playblast-capture-preset">

The viewport and output settings of the playblast. Some of them can be changed per review instance in the Publisher, such as the resolution, the lights and the image plane.

<Settings prefix="playblast-codec">
<Setting name="Codec">

<Settings>
<Setting name="Encoding" default="png" />
<Setting name="Format" default="image" />
<Setting name="Quality" default="95" />
</Settings>

</Setting>
</Settings>

<Settings prefix="playblast-display">
<Setting name="Display Options">

<Settings>
<Setting name="Override display options" default="Enabled" />
<Setting name="Background Color" default="125, 125, 125, 1.0" />
<Setting name="Display background gradient" default="Enabled" />
<Setting name="Background Top" default="125, 125, 125, 1.0" />
<Setting name="Background Bottom" default="125, 125, 125, 1.0" />
</Settings>

</Setting>
</Settings>

<Settings prefix="playblast-generic">
<Setting name="Generic">

<Settings>
<Setting name="Isolate View" default="Enabled">

Show only the members of the review instance when it has members besides the camera.

</Setting>
<Setting name="Off Screen" default="Enabled" />
<Setting name="2D Pan/Zoom" default="Disabled" />
</Settings>

</Setting>
</Settings>

<Settings prefix="playblast-renderer">
<Setting name="Renderer">

<Settings>
<Setting name="Renderer name" default="Viewport 2.0">

Only **Viewport 2.0** is available.

</Setting>
</Settings>

</Setting>
</Settings>

<Settings prefix="playblast-resolution">
<Setting name="Resolution">

The playblast resolution. A resolution set on the review instance wins. When this one is 0 by 0, the resolution of the folder is used.

<Settings>
<Setting name="Width" default="0" />
<Setting name="Height" default="0" />
</Settings>

</Setting>
</Settings>

<Settings prefix="playblast-viewport">
<Setting name="Viewport Options">

<Settings>
<Setting name="Override viewport options" default="Enabled">

Use the options below. When disabled, the current settings of the viewport panel are used.

</Setting>
<Setting name="Display Lights" default="Default Lighting">

**Default Lighting**, **All Lights**, **Selected Lights**, **Flat Lighting** or **No Lights**.

</Setting>
<Setting name="Display Textures" default="Enabled" />
<Setting name="Texture Clamp Resolution" default="1024" />
<Setting name="Depth of Field" default="Enabled" />
<Setting name="Display Shadows" default="Enabled" />
<Setting name="Two Sided Lighting" default="Enabled" />
<Setting name="Enable Anti-Aliasing" default="Enabled" />
<Setting name="Anti Aliasing Samples" default="8" />
<Setting name="Load Textures" default="Disabled" />
<Setting name="Use Default Material" default="Disabled" />
<Setting name="Wireframe On Shaded" default="Disabled" />
<Setting name="X-Ray" default="Disabled" />
<Setting name="X-Ray Joints" default="Disabled" />
<Setting name="Backface Culling" default="Disabled" />
<Setting name="Screen Space Ambient Occlusion" default="Disabled" />
<Setting name="SSAO Amount" default="1" />
<Setting name="SSAO Radius" default="16" />
<Setting name="SSAO Filter Radius" default="16" />
<Setting name="SSAO Samples" default="16" />
<Setting name="Enable Hardware Fog" default="Disabled" />
<Setting name="Hardware Falloff" default="Linear">

**Linear**, **Exponential** or **Exponential Squared**.

</Setting>
<Setting name="Fog Density" default="0.0" />
<Setting name="Fog Start" default="0" />
<Setting name="Fog End" default="100" />
<Setting name="Fog Alpha" default="0" />
<Setting name="Fog Color R" default="1.0" />
<Setting name="Fog Color G" default="1.0" />
<Setting name="Fog Color B" default="1.0" />
<Setting name="Enable Motion Blur" default="Disabled" />
<Setting name="Motion Blur Sample Count" default="8" />
<Setting name="Shutter Open Fraction" default="0.2" />
</Settings>

The object types shown in the playblast, one switch each. **Hair Systems**, **Image Plane** and **Polygons** are enabled by default; all others are disabled: **Cameras**, **Clip Ghosts**, **Deformers**, **Dimensions**, **Dynamic Constraints**, **Dynamics**, **Fluids**, **Follicles**, **Grease Pencils**, **Blue Pencil**, **Grid**, **Handles**, **HUD**, **IK Handles**, **Joints**, **Lights**, **Locators**, **Manipulators**, **Motion Trails**, **nCloths**, **nParticles**, **nRigids**, **NURBS CVs**, **NURBS Curves**, **NURBS Hulls**, **NURBS Surfaces**, **Particle Instancers**, **Pivots**, **Planes**, **Plugin Shapes**, **Strokes**, **Subdiv Surfaces** and **Texture Placements**.

<Settings>
<Setting name="Plugin Objects" default="Empty list">

Display filters of plugin object types, such as `gpuCacheDisplayFilter`.

<Settings>
<Setting name="Name" />
<Setting name="Enabled" default="Enabled" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

<Settings prefix="playblast-camera">
<Setting name="Camera Options">

<Settings>
<Setting name="Display Gate Mask" default="Disabled" />
<Setting name="Display Resolution" default="Disabled" />
<Setting name="Display Film Gate" default="Disabled" />
<Setting name="Display Field Chart" default="Disabled" />
<Setting name="Display Safe Action" default="Disabled" />
<Setting name="Display Safe Title" default="Disabled" />
<Setting name="Display Film Pivot" default="Disabled" />
<Setting name="Display Film Origin" default="Disabled" />
<Setting name="Overscan" default="1.0" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://maya/load" scope="Studio, with project overrides" />

Settings group **Loaders**: the Outliner colors of loaded content, the namespace and group of referenced and imported products, and a switch per loader. Loading is described in [Loading](index.md#loading).

<!-- screenshot: settings editor, Loaders -->

### Outliner colors

<SettingLocation uri="ayon+settings://maya/load/colors" scope="Studio, with project overrides" />

Settings group **Loaded Products Outliner Colors**: the color of loaded content in the Outliner per product type, as RGBA (0 to 255, alpha 1.0). The labels end with a colon in the settings editor.

<Settings prefix="outliner-color">
<Setting name="Model" default="209, 132, 30, 1.0" />
<Setting name="Rig" default="59, 226, 235, 1.0" />
<Setting name="Pointcache" default="94, 209, 30, 1.0" />
<Setting name="Animation" default="94, 209, 30, 1.0" />
<Setting name="Arnold StandIn" default="249, 135, 53, 1.0" />
<Setting name="Camera" default="136, 114, 244, 1.0" />
<Setting name="FBX" default="215, 166, 255, 1.0" />
<Setting name="Maya Ascii" default="67, 174, 255, 1.0" />
<Setting name="Maya Scene" default="67, 174, 255, 1.0" />
<Setting name="Set Dress" default="255, 250, 90, 1.0" />
<Setting name="Layout" default="255, 250, 90, 1.0" />
<Setting name="VDB Cache" default="249, 54, 0, 1.0" />
<Setting name="VRay Proxy" default="255, 150, 12, 1.0" />
<Setting name="VRay Scene" default="255, 150, 12, 1.0" />
<Setting name="Yeti Cache" default="99, 206, 220, 1.0" />
<Setting name="Yeti Rig" default="0, 205, 125, 1.0" />
<Setting name="Ornatrix Cache" default="156, 234, 195, 1.0" />
<Setting name="Ornatrix Rig" default="206, 234, 195, 1.0" />
</Settings>

### Reference and import loaders

<Settings>
<Setting name="Reference Loader">

The **Reference** loader, which most product types use.

<Settings>
<Setting name="Namespace" default="`{folder[name]}_{product[name]}_##_`">

The namespace of the reference. Supports the tokens `{folder[name]}`, `{product[name]}` and `{product[type]}`; `##` is replaced by a number that makes it unique.

</Setting>
<Setting name="Group name" default="_GRP">

The group the reference is parented under. Supports `{namespace}`, to make the group name unique, and the same tokens as **Namespace**.

</Setting>
<Setting name="Display Handle On Load References" default="Enabled">

Show the selection handle of loaded references.

</Setting>
<Setting name="Lock Animation Instance on Rig Load" default="Disabled">

Lock the animation instance that is created when a rig is loaded.

</Setting>
<Setting name="Create Camera instance on load" default="Disabled">

Create a camera instance when a camera product is loaded, ready to publish its output.

</Setting>
<Setting name="Update Namespace on Switch" default="Disabled">

When a container is switched to a version of another folder or task type, update the namespace to match it.

</Setting>
</Settings>

</Setting>
<Setting name="Import Loader">

The **Import** loader, which imports instead of referencing.

<Settings>
<Setting name="Enabled" default="Enabled" />
<Setting name="Namespace" default="`{folder[name]}_{product[name]}_##_`">

Same tokens as the reference loader.

</Setting>
<Setting name="Group name" default="_GRP">

Same tokens as the reference loader.

</Setting>
</Settings>

</Setting>
</Settings>

### Loader switches

Each loader below can be turned off with its **Enabled** switch, which removes it from the Loader.

<Settings>
<Setting name="Arnold Standin Loader" default="Enabled" />
<Setting name="Audio Loader" default="Enabled" />
<Setting name="GPU Cache Loader" default="Enabled" />
<Setting name="File Node (Image) Loader" default="Enabled" />
<Setting name="Image Plane Loader" default="Enabled" />
<Setting name="Look Loader" default="Enabled" />
<Setting name="Matchmove Loader" default="Enabled" />
<Setting name="Maya Load USD to Maya Proxy Loader" default="Enabled">

<Settings>
<Setting name="Use AYON Entity URI" default="Disabled">

Use the AYON entity URI instead of the resolved file path, so that the AYON USD resolver resolves the path at runtime. Enable it when the AYON USD resolver is used.

</Setting>
</Settings>

</Setting>
<Setting name="Multiverse USD Loader" default="Disabled" />
<Setting name="Multiverse USD Override Loader" default="Disabled" />
<Setting name="Redshift Proxy Loader" default="Enabled" />
<Setting name="Render Setup Loader" default="Enabled" />
<Setting name="VDB to Arnold Loader" default="Enabled" />
<Setting name="VDB to Redshift Loader" default="Enabled" />
<Setting name="VDB to V-Ray Loader" default="Enabled" />
<Setting name="Vray Proxy Loader" default="Enabled" />
<Setting name="VrayScene Loader" default="Enabled" />
<Setting name="Xgen Loader" default="Enabled" />
<Setting name="Yeti Cache Loader" default="Enabled" />
<Setting name="Yeti Rig Loader" default="Enabled">

<Settings>
<Setting name="Create Yeti Cache instance on load" default="Enabled">

Create a Yeti cache instance when a Yeti rig is loaded, ready to publish its output.

</Setting>
</Settings>

</Setting>
<Setting name="Ornatrix Rig Loader" default="Enabled">

<Settings>
<Setting name="Create Ornatrix Cache instance on load" default="Enabled">

Create an Ornatrix cache instance when an Ornatrix rig is loaded, ready to publish its output.

</Setting>
</Settings>

</Setting>
</Settings>

## Workfile actions

<SettingLocation uri="ayon+settings://maya/workfile_actions" scope="Studio, with project overrides" />

Settings group **Workfile Actions**: extra actions of the Workfiles tool.

<!-- screenshot: settings editor, Workfile Actions -->

<Settings prefix="workfile-actions">
<Setting name="Open without references" default="Enabled">

Open the selected workfile from the Workfiles tool with all references unloaded.

</Setting>
</Settings>

## Workfile build settings

<SettingLocation uri="ayon+settings://maya/workfile_build" scope="Studio, with project overrides" />

Settings group **Workfile Build Settings**, used by **Build Workfile (Legacy)** in the AYON menu: which products are loaded into the scene, per task. See [Workfiles and workfile build](index.md#workfiles-and-workfile-build).

<!-- screenshot: settings editor, Workfile Build Settings -->

<Settings prefix="workfile-build">
<Setting name="Profiles" default="One profile, for the task Lighting">

<Settings>
<Setting name="Task types">

Empty matches all task types.

</Setting>
<Setting name="Task names">

Empty matches all task names.

</Setting>
<Setting name="Current Context">

Products to load from the current folder.

<Settings>
<Setting name="Product name Filters">

Regular expressions that product names must match. Empty matches all.

</Setting>
<Setting name="Product base types" />
<Setting name="Repre Names">

The representations to load, in order of preference.

</Setting>
<Setting name="Loaders">

The loaders to use, by class name, such as `ReferenceLoader`.

</Setting>
</Settings>

</Setting>
<Setting name="Linked Assets">

The same, for products of the folders linked to the current one.

</Setting>
</Settings>

</Setting>
</Settings>

For the current context, the default profile loads with the `ReferenceLoader`:

- `model` products whose name matches `.+[Mm]ain`, from the `abc` or `ma` representation;
- `animation`, `pointcache` and `proxyAbc` products, from `abc`;
- `camera` products, from `abc`.

It also loads `rendersetup` products (`json`) with the `RenderSetupLoader`. From linked folders it loads `setdress` products (`ma`) with the `ReferenceLoader` and `ArnoldStandin` products (`ass`) with `assLoader`.

## Templated workfile build settings

<SettingLocation uri="ayon+settings://maya/templated_workfile_build" scope="Studio, with project overrides" />

Settings group **Templated Workfile Build Settings**, used by **Build Workfile (Templates)** in the AYON menu. Templates are described in [Template builder](../../../pipeline/template-builder.md).

<!-- screenshot: settings editor, Templated Workfile Build Settings -->

<Settings prefix="templated-workfile-build">
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Task types">

Empty matches all task types.

</Setting>
<Setting name="Task names">

Empty matches all task names.

</Setting>
<Setting name="Folder Types">

Empty matches all folder types.

</Setting>
<Setting name="Folder paths">

Empty matches all folder paths.

</Setting>
<Setting name="Path to template">

The workfile template.

</Setting>
<Setting name="Keep placeholders" default="Disabled">

Keep the placeholders in the scene after the build.

</Setting>
<Setting name="Apply to New Scene" default="Disabled">

Build the template in every new scene.

</Setting>
<Setting name="Apply on Maya launch" default="Enabled">

Build the template when Maya launches.

</Setting>
<Setting name="Save first workfile version" default="Enabled">

Save the built scene as the first version of the workfile.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Maya addon](index.md)
- [Rendering and renderers](rendering.md)
- [Hair, fur and USD plugins](plugins.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Template builder](../../../pipeline/template-builder.md)
- [Core addon settings](../../essentials/core/settings.md)
