---
title: Maya addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Maya addon with their default values: general options, color management, scene units, render settings, creators, publish plugins, loaders and workfile build."
addon: maya
addon_repo: ayon-maya
addon_version: 0.6.13
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-maya/tree/0.6.13/server/settings
  - https://help.ayon.app/en/articles/5903683-maya-general-settings
  - https://help.ayon.app/en/articles/6662463-maya-creator-settings
  - https://help.ayon.app/en/articles/1686073-maya-publishers-settings
  - https://help.ayon.app/en/articles/7860563-maya-loaders-settings
---

# Maya addon settings

<AddonInfo />

The settings of the [Maya addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The defaults shown are the effective ones.

Validators and extractors share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher). A dash means that the plugin has no such switch.

## General

| Setting | Default | Description |
|---|---|---|
| Use cbId workflow | On | Creates a `cbId` identifier on each node and validates it for many product base types. It is used by look publishing, among others. When off, the attribute is still created on scene save, but it is not validated. |
| Open Workfile Post Initialization | On | Opens the last workfile after Maya has initialized, instead of at launch. |
| Maya MEL Workspace | A set of `workspace -fr` lines | The content of the `workspace.mel` copied into the work directory. The default sets the file rules `shaders` (`renderData/shaders`), `images` (`renders/maya`), `particles` (`particles`), `alembicCache` (`cache/alembic`), `renderData` (`renderData`), `sourceImages` (`sourceimages`), `fileCache` (`cache/nCache`) and `autoSave` (`autosave`), and empty rules for `mayaAscii`, `mayaBinary` and `scene`. |
| Extension Mapping | `model`, `mayaScene`, `camera`, `rig`, `workfile`, `yetiRig`, `setdress`, `layout` and `camerarig`, all `ma` | The Maya file extension (`ma` or `mb`) used for each product type. A product type can be listed once. |

## Color management

Settings group **Color Management (imageio)**.

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Applies the color management of the project to Maya. |
| File Rules: Activate Host Rules | Off | Applies the file rules of this host. |
| File Rules: Rules | Empty | A list of rules, each with **Rule name**, **Regex pattern**, **Colorspace name** and **File extension**. |
| Workfile: Enabled | On | Sets the workfile color management. |
| Workfile: Rendering Space | `ACES - ACEScg` | The rendering space of the workfile. |
| Workfile: Display | `ACES` | The display. |
| Workfile: View | `sRGB` | The view. |

## Explicit plugin loading

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Loads only the plugins that are enabled in the list at startup. Maya is then started with `-noAutoloadPlugins`. |
| Plugins To Load | A list of 101 Maya plugin names | Each entry has an **Enabled** switch and a **Name**. Enabled by default: `AbcExport`, `AbcImport`, `cacheEvaluator`, `deformerEvaluator`, `GPUBuiltInDeformer`, `modelingToolkit`, `objExport`, `renderSetup` and `stereoCamera`. |

## Scene units

| Setting | Default | Description |
|---|---|---|
| Linear Units | `cm` | The preferred Maya linear unit. |
| Angular units | `deg` | The preferred Maya angular unit. |

## Dirmap

Settings group **Maya dirmap Settings**.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Maps paths when scenes are opened. |
| Use env var placeholder in referenced paths | Off | Writes an environment variable placeholder in referenced paths. |
| Source Paths, Destination Paths | Empty | Two lists of path prefixes. A source path is replaced by the destination path at the same position. |

## Include handles

Group **Include/Exclude Handles in default playback & render range**.

| Setting | Default | Description |
|---|---|---|
| Include handles by default | Off | Extends the default playback and render range by the frame handles. |
| Include/exclude handles by task type | Empty | A list of entries with **Task types** and **Include handles** that override the default. |

## Scripts menu

Group **Scriptsmenu Settings**. It adds a menu with the studio's own tools to Maya.

| Setting | Default | Description |
|---|---|---|
| Menu Name | `Custom Tools` | The label of the menu. |
| Define menu using | `definition` | Either the **Menu Definition** list or the **Menu Definition JSON**. |
| Menu Definition | One action, **Edit shader name definitions** (`python`, tags `pipeline` and `shader`) | A list of items with **Type**, **Command**, **Source Type**, **Title**, **Tooltip** and **A list of tags**. |
| Menu Definition JSON | `[]` | The menu as a JSON list. |

The default action calls a function in the `openpype.hosts.maya` namespace, which is a legacy module path.

## Render settings

Applied to the scene when a Render instance is created (if enabled) and by **Set workfile attributes > Render Settings**. See [rendering](rendering.md).

| Setting | Default | Description |
|---|---|---|
| Apply Render Settings on creation | On | Applies these settings when a Render instance is created. |
| Default render image folder | `renders/maya` | The default render image folder. |
| Include all lights in Render Setup Layers by default | On | The default of **Render Setup Include Lights** in the Render creator. |
| AOV Separator character | `underscore` | The character between the layer and the AOV name. |
| Reset Current Frame | Off | Resets the current frame to the start frame. |
| Remove existing AOVs | Off | Removes the existing AOVs before the configured ones are created. |

### Arnold

| Setting | Default | Description |
|---|---|---|
| Image prefix template | `<Scene>/<RenderLayer>/<RenderLayer>` | The image prefix. |
| Output Image Format | `exr` | The image format. |
| Multilayer (exr) | On | Writes one multilayer EXR. |
| Tiled (tif, exr) | On | Writes tiled output. |
| AOVs to create | Empty | A list of AOV names. |
| Additional Arnold Options | Empty | Pairs of **Attribute name** and **Value** that are set on the render settings. |

### V-Ray

| Setting | Default | Description |
|---|---|---|
| Image prefix template | `<scene>/<Layer>/<Layer>` | The image prefix. |
| Production Engine | `1` | The production engine. |
| Output Image Format | `exr` | The image format. |
| AOVs to create | Empty | A list of AOV names. |
| Additional Vray Options | Empty | Pairs of attribute name and value. |

### Redshift

| Setting | Default | Description |
|---|---|---|
| Image prefix template | `<Scene>/<RenderLayer>/<RenderLayer>` | The image prefix. |
| Enable Global Illumination | Off | Turns global illumination on. |
| Primary GI Engine, Secondary GI Engine | `0` (None) | The GI engines. When `None`, AYON does not manage them. |
| Output Image Format | `exr` | The image format. |
| Multipart (exr) | On | Writes a multipart EXR. |
| Force combine beauty and AOVs | On | Combines the beauty and the AOVs in one file. |
| AOVs to create | Empty | A list of AOV names. |
| Additional Redshift Options | Empty | Pairs of attribute name and value. |

### Renderman

| Setting | Default | Description |
|---|---|---|
| Image prefix template | `<layer>{aov_separator}<aov>.<f4>.<ext>` | The image prefix. |
| Image Output Directory | `<scene>/<layer>` | The output directory. |
| Display Filters | Empty | A list of display filters. |
| Image Display Filter Directory | `<imagedir>/<layer>{aov_separator}imageDisplayFilter.<f4>.<ext>` | The path of the display filter output. |
| Sample Filters | Empty | A list of sample filters. |
| Cryptomatte Output Directory | `<imagedir>/<layer>{aov_separator}cryptomatte.<f4>.<ext>` | The path of the Cryptomatte output. |
| Watermark Filter Directory | `<imagedir>/<layer>{aov_separator}watermarkFilter.<f4>.<ext>` | The path of the watermark output. |
| Additional Renderer Options | Empty | Pairs of attribute name and value. |

### Maya Hardware 2.0

| Setting | Default | Description |
|---|---|---|
| Image prefix template | `<Scene>/<RenderLayer>/<RenderLayer>` | The image prefix. |

## Creators

Group **Creators**. Every creator has **Default Variants** and an optional **Product type items** list (extra product types the creator can make, each with a product type and a label). Creators with an **Enabled** switch can be turned off. The creator for animation has no such switch.

| Setting | Default | Description |
|---|---|---|
| Use current context entity attributes as frame range defaults | Off | Uses the frame range of the current task as the default of created instances. When off, the Maya timeline is used. |

| Creator | Enabled | Default variants | Other settings |
|---|---|---|---|
| Create Animation | - | `Main` | Include Parent Hierarchy: Off; Include User Defined Attributes: Off |
| Create Arnold Scene Source | On | `Main` | Export Bounding Box: On; Use gzip Compression (.ass.gz): Off; Expand Procedurals: Off; Export Cameras: Off; Export Color Managers: Off; Export Drivers: Off; Export Filters: Off; Export Imagers: Off; Export Lights: Off; Export Operators: Off; Export Options: Off; Export Override Nodes: Off; Export Shaders: Off; Export Shapes: Off; Motion Blur: On; Motion Blur Keys: 2; Motion Blur Length: 0.5 |
| Create Camera | On | `Main` | - |
| Create Camera Rig | On | `Main` | - |
| Create Layout | On | `Main` | - |
| Create Look | On | `Main` | Texture Reference Objects: Off; Make tx files: On; Make Redshift texture files: Off |
| Create Matchmove | On | `Main` | - |
| Create Maya Scene | On | `Main` | - |
| Create Maya USD | On | `Main` | - |
| Create Maya USD: Model | On | `Main` | - |
| Create Maya USD Export Layer | On | `Main` | - |
| Create Model | On | `Main`, `Proxy`, `Sculpt` | Include Shaders: Off; Write Face Sets: On |
| Create Multi-shot Layout | On | `Main` | - |
| Create Multiverse Look | Off | Empty | Publish MipMap: On |
| Create Multiverse USD | Off | `Main` | - |
| Create Multiverse USD Composition | Off | `Main` | - |
| Create Multiverse USD Override | Off | `Main` | - |
| Create Ornatrix Cache | Off | `Main` | - |
| Create Ornatrix Rig | Off | `Main` | - |
| Create Point Cache | On | `Main` | Include User Defined Attributes: Off |
| Create Proxy Alembic | On | `Main` | Write Color Sets: Off; Write Face Sets: Off |
| Create Redshift Proxy | On | `Main` | - |
| Create Render | On | `Main` | - |
| Create Render Setup Preset | On | `Main` | - |
| Create Review | On | `Main` | Use Maya Timeline for Frame Range.: On |
| Create Rig | On | `Main`, `Sim`, `Cloth` | - |
| Create Set Dress | On | `Main`, `Anim` | Exact Set Members Only: On; Include shader: On |
| Create Unreal- Skeletal Mesh | On | `Main` | Joint root hint: `jnt_org` |
| Create Unreal - Static Mesh | On | empty string, `_Main` | Collision Prefixes: `UBX`, `UCP`, `USP`, `UCX`; Static Mesh Prefix: `S` |
| Create Unreal - Yeti Cache | On | `Main`, `Sim`, `Cloth` | - |
| Create VRay Proxy | On | `Main` | Alembic: On; VrMesh: On |
| Create VRay Scene | On | `Main` | - |
| Create Xgen | On | `Main` | - |
| Create Yeti Cache | On | `Main` | - |
| Create Yeti Rig | On | `Main` | - |

The **Create Workfile** creator has the setting **Mandatory workfile** (default Off), which stops artists from turning the workfile instance off. It requires core addon 1.4.1 or newer.

## Publish plugins

Group **Publishers**. Defaults are the effective ones.

### Collectors

| Plugin | Enabled | Optional | Active |
|---|---|---|---|
| Collect Model for FBX export | Off | Off | On |
| Collect Assets for GLB/GLTF export | Off | - | - |

Plugins with more settings:

| Plugin | Enabled / Optional / Active | Setting | Default | Description |
|---|---|---|---|---|
| Collect Render Layers | - / - / - | Sync render version with workfile | Off |  |
| Collect FBX Animation | Off / On / On | Input Connections | On |  |
|  |  | Up Axis | `y` |  |
| Collect Camera for FBX export | Off / Off / On | Input Connections | On |  |
|  |  | Up Axis | `y` |  |
| Maya USD Export Chaser: Filter Properties | Off / - / - | Default Filter | Empty string | Set the default filter for USD properties to export. |

### Validators

| Plugin | Enabled | Optional | Active |
|---|---|---|---|
| Validate Instance In Context | On | On | On |
| Validate Look Shading Engine Naming | On | On | On |
| Validate Colorspace | On | On | On |
| Validate Resolution Setting | On | On | On |
| Validate Current Render Layer Has Renderable Camera | On | Off | On |
| Validate GLSL Material | Off | Off | On |
| Validate GLSL Plugin | Off | Off | On |
| Validate Ornatrix Rig Content | On | Off | On |
| Validate Ornatrix Cache Content | On | Off | On |
| Validate Render Image Rule (Workspace) | On | Off | On |
| Validate No Default Cameras Renderable | On | Off | On |
| Validate Render Single Camera | On | Off | On |
| Validate Render Passes/AOVs Are Registered | On | Off | On |
| Validate Step Size | On | Off | On |
| VRay Distributed Rendering | On | Off | On |
| VRay Referenced AOVs | On | Off | On |
| VRay Translator Settings | On | Off | On |
| VRay Proxy Settings | On | Off | On |
| VRay Proxy Members | On | Off | On |
| Yeti Render Script Callbacks | On | Off | On |
| Yeti Rig Cache State | On | Off | On |
| Yeti Rig Input Shapes In Instance | On | Off | On |
| Yeti Rig Settings | On | Off | On |
| Validate Color Sets | On | On | On |
| Validate Mesh Has Overlapping UVs | Off | On | On |
| Validate Mesh Arnold Attributes | Off | On | On |
| Validate Mesh Shader Connections | On | On | On |
| Validate Mesh Single UV Set | Off | On | On |
| Validate Mesh Has UVs | On | On | On |
| Validate Mesh Lamina Faces | Off | On | On |
| Validate Mesh Ngons | Off | On | On |
| Validate Mesh Non-Manifold | Off | On | On |
| Validate Mesh No Negative Scale | On | Off | On |
| Validate Mesh Edge Length Non Zero | On | On | On |
| Validate Mesh Normals Unlocked | Off | On | On |
| Validate Mesh UV Set Map 1 | Off | On | On |
| Validate Mesh Vertices Have Edges | On | On | On |
| Validate No Animation | Off | On | On |
| Validate No Namespace | On | Off | On |
| Validate No Null Transforms | On | Off | On |
| Validate No Unknown Nodes | On | Off | On |
| Validate Node No Ghosting | Off | Off | On |
| Validate Shape Default Names | Off | On | On |
| Validate Shape Render Stats | Off | On | On |
| Validate Shape Zero | Off | On | On |
| Validate Transform Zero | Off | On | On |
| Validate Unique Names | Off | On | On |
| Validate No V-Ray Proxies (VRayMesh) | On | Off | On |
| Validate if Mesh is Triangulated | Off | On | On |
| Validate Alembic Visible Node | On | Off | On |
| Validate Rig Contents | Off | On | On |
| Validate Rig Joints Hidden | Off | On | On |
| Validate Rig Controllers | Off | On | On |
| Validate Animation Content | On | Off | On |
| Validate Animation Out Set Related Node Ids | On | Off | On |
| Validate Animation Product Type Publish | On | Off | On |
| Validate Rig Controllers (Arnold Attributes) | On | Off | On |
| Validate Scene Unknown Nodes | On | On | On |
| Validate Single Assembly | On | Off | On |
| Validate Animated Rig Content | On | Off | On |
| Validate Skeletal Mesh Top Node | On | Off | On |
| Validate Skeleton Rig Contents | On | On | On |
| Validate Skeleton Rig Controllers | Off | On | On |
| Validate Skincluster Deformer Relationships | On | Off | On |
| Validate Skeleton Rig Output Ids | Off | On | On |
| Validate Skeleton Top Group Hierarchy | On | On | On |
| Validate Camera Attributes | Off | On | On |
| Validate Ass Relative Paths | On | Off | On |
| Validate No Default Cameras | On | Off | On |
| Validate Unreal Up-Axis Check | Off | On | On |
| Validate Alembic Defaults Pointcache | On | On | On |
| Validate Alembic Defaults Animation | On | On | On |

Plugins with more settings:

| Plugin | Enabled / Optional / Active | Setting | Default | Description |
|---|---|---|---|---|
| Validate Frame Range | On / On / On | Exclude product base types | `model`, `rig`, `staticMesh` |  |
| Validate Shader Name | Off / On / On | Validation regex | `(?P<asset>.*)_(.*)_SHD` |  |
| Validate Attributes | Off / - / - | Attributes | `{}` (empty JSON) |  |
| Validate Loaded Plugin | Off / On / - | Whitelist Maya Native Plugins | Off |  |
|  |  | Authorized plugins | Empty |  |
| Validate Maya Units | On / Off / - | Validate linear units | On | Whether to validate the Maya scene linear units against the _Scene Unit_ settings |
|  |  | Validate angular units | On | Whether to validate the Maya scene angular units against the _Scene Unit_ settings |
|  |  | Validate FPS | On | Whether to validate the Maya scene FPS against the task context's FPS |
| Validate Unreal Static Mesh Name | On / On / - | Validate mesh names | Off |  |
|  |  | Validate collision names | On |  |
| Validate Cycle Error | On / Off / - | Families | `rig` |  |
| Plug-in Path Attributes | Off / Off / On | File Attribute | 33 pairs of node type and attribute, for example `AlembicNode` / `abc_File`, `aiStandIn` / `dso`, `VRayProxy` / `fileName`, `pgYetiMaya` / `cacheFileName` |  |
| Validate Render Settings | On / Off / On | Arnold Render Attributes | Empty |  |
|  |  | VRay Render Attributes | Empty |  |
|  |  | Redshift Render Attributes | Empty |  |
|  |  | Renderman Render Attributes | Empty |  |
| Validate Model Content | On / Off / - | Validate one top group | On |  |
| Validate Transform Naming Suffix | On / On / - | Suffix Naming Tables | JSON: `mesh` `_GEO`, `_GES`, `_GEP`, `_OSD`; `nurbsCurve` `_CRV`; `nurbsSurface` `_NRB`; `locator` `_LOC`; `group` `_GRP` | Validates transform suffix based on the type of its children shapes. |
|  |  | Allow if suffix not in table | On |  |
| Validate Rig Out Set Node Ids | On / Off / - | Allow history only | Off |  |
| Validate Skeleton Rig Out Set Node Ids | Off / Off / - | Allow history only | Off |  |
| Validate Camera Content | On / Off / - | Validate presence of shapes | On |  |

### Extractors

| Plugin | Enabled | Optional | Active |
|---|---|---|---|
| Extract OBJ | Off | On | On |
| Extract Playblast Settings | On | Off | On |
| Extract Active View Thumbnail | On | Off | On |
| Extract Arnold Scene Source | On | Off | On |
| Extract Camera Maya Scene | On | Off | On |
| Extract Animation FBX | On | Off | On |
| Extract FBX | On | Off | On |
| Extract Layout | On | Off | On |
| Extract Maya USD Layer | On | Off | On |
| Extract Model (Maya Scene) | On | On | On |
| Extract Animation (Alembic) | On | Off | On |
| Extract Maya USD with Model | On | On | Off |
| Extract Maya USD with Pointcache | On | On | Off |
| Extract Maya USD with Animation | On | On | Off |
| Extract Multiverse Look | Off | Off | On |
| Extract Multiverse USD Composition | Off | Off | On |
| Extract Multiverse USD Override | Off | Off | On |
| Extract Multiverse USD | Off | Off | On |
| Extract Ornatrix Cache | On | Off | On |
| Extract Ornatrix Rig | On | Off | On |
| Extract Redshift Proxy | On | Off | On |
| Extract Render Setup | On | Off | On |
| Extract Rig | On | Off | On |
| Extract Skeleton Mesh | On | On | On |
| Extract Thumbnail | On | Off | On |
| Extract Unreal Skeletal Mesh - Alembic | On | On | On |
| Extract Unreal Skeletal Mesh - FBX | On | On | On |
| Extract Unreal Static Mesh | On | Off | On |
| Extract Unreal Yeti Cache | On | Off | On |
| Extract VRay Proxy | On | Off | On |
| Extract VRay Scene | On | Off | On |
| Extract Workfile Xgen | On | Off | On |
| Extract Xgen | On | Off | On |
| Extract Yeti Cache | On | Off | On |
| Extract Yeti Rig | On | Off | On |

Plugins with more settings:

| Plugin | Enabled / Optional / Active | Setting | Default | Description |
|---|---|---|---|---|
| Extract Proxy Alembic | Off / Off / On | Families | `proxyAbc` |  |
| Maya Scene(Raw) | On / Off / On | Families | `layout` |  |
| Extract Camera Alembic | On / On / On | Bake Attributes | `[]` (empty JSON list) | List of attributes that will be included in the alembic camera export. |
| Extract GLB | Off / Off / On | GLSL Shader Directory | `/maya2glTF/PBR/shaders/glTF_PBR.ogsfx` |  |
| Extract Look | On / Off / On | Extra arguments for maketx command line | Empty |  |
| Extract GPU Cache | Off / Off / On | Families | `model`, `animation`, `pointcache` |  |
|  |  | Step | 1.0 |  |
|  |  | Step Save | 1 |  |
|  |  | Optimize Hierarchy | On |  |
|  |  | Optimization Threshold | 40000 |  |
|  |  | Optimize Animations For Motion Blur | On |  |
|  |  | Write Materials | On |  |
|  |  | User Based Tessellation | On |  |
| Extract Alembic | On / Off / On | Families | `pointcache`, `model`, `vrayproxy.alembic` |  |
|  |  | Custom Attributes | Empty string | Attributes matching by name will be included in the Alembic export. |
|  |  | Custom Attributes Prefix | Empty string | Attributes starting with these prefixes will be included in the Alembic export. |
|  |  | Bake Attributes | Empty | List of attributes that will be included in the alembic export. |
|  |  | Bake Attribute Prefixes | Empty | List of attribute prefixes for attributes that will be included in the alembic export. |
|  |  | Data Format | `ogawa` | The data format to use to write the file. |
|  |  | Euler Filter | Off | Apply Euler filter while sampling rotations. |
|  |  | Mel Per Frame Callback | Empty string | When each frame (and the static frame) is evaluated the string specified is evaluated as a Mel command. |
|  |  | Mel Post Job Callback | Empty string | When the translation has finished the string specified is evaluated as a Mel command. |
|  |  | Exposed Overrides | `attr`, `attrPrefix`, `renderableOnly`, `visibleOnly`, `worldSpace`, `writeColorSets`, `writeFaceSets`, `writeNormals` | Expose the attribute in this list to the user when publishing. |
|  |  | Pre Roll | Off | Uses the pre roll start frame to begin the evaluation of the mesh; frames before the export start are not written. Useful for simulation run-up. |
|  |  | Pre Roll Start Frame | 0 | The frame to start scene evaluation at. |
|  |  | Python Per Frame Callback | Empty string | When each frame (and the static frame) is evaluated the string specified is evaluated as a python command. |
|  |  | Python Post Job Callback | Empty string | When the translation has finished the string specified is evaluated as a python command. |
|  |  | Renderable Only | Off | Only export renderable visible shapes. |
|  |  | Strip Namespaces | On | Namespaces will be stripped off of the node before being written to Alembic. |
|  |  | UVs Only | Off | If this flag is present, only uv data for PolyMesh and SubD shapes will be written to the Alembic file. |
|  |  | UV Write | On | Uv data for PolyMesh and SubD shapes will be written to the Alembic file. |
|  |  | User Attr | Empty string | Attributes matching by name will be included in the Alembic export. |
|  |  | User Attr Prefix | Empty string | Attributes starting with these prefixes will be included in the Alembic export. |
|  |  | Verbose | Off | Prints the current frame that is being evaluated. |
|  |  | Visible Only | Off | Only export dag objects visible during frame range. |
|  |  | Whole Frame Geo | Off | Data for geometry will only be written out on whole frames. |
|  |  | World Space | On | Any root nodes will be stored in world space. |
|  |  | Write Color Sets | Off | Write vertex colors with the geometry. |
|  |  | Write Creases | Off | Write the geometry's edge and vertex crease information. |
|  |  | Write Face Sets | Off | Write face sets with the geometry. |
|  |  | Write Face Sets: Force all assignments | Off | When writing with face sets is enabled then force all assignments to be face assignments on export so that all material assignments become face sets. |
|  |  | Write Normals | On | Write normals with the deforming geometry. |
|  |  | Write UV Sets | Off | Write all uv sets on MFnMeshes as vector 2 indexed geometry parameters with face varying scope. |
|  |  | Write Visibility | Off | Visibility state will be stored in the Alembic file. |
| Extract Maya USD | On / Off / On | Exposed Overrides | `stripNamespaces`, `worldspace`, `exportComponentTags`, `exportVisibility`, `mergeTransformAndShape`, `defaultMeshScheme` | Expose the attribute in this list to the user when publishing. |
|  |  | Strip Namespaces | On | Strip namespaces from Maya node names when writing USD. |
|  |  | World-Space | On | Export root prims using their full world-space transforms instead of local transforms. |
|  |  | Export Component Tags | Off | When enabled, export geometry component tags as UsdGeomSubset data. |
|  |  | Export Visibility | On | Export visibility state and animation from Maya visibility attributes. |
|  |  | Merge Transform and Shape | On | Combine Maya transform and shape into a single USD prim that has transform and geometry. |
|  |  | Default Subdivision Method | `catmullClark` | Default subdivision method for meshes. |
|  |  | Export BlendShapes | On | Enable or disable export of blend shape (morph) data. |
|  |  | Export Skin | `none` | How skin clusters are exported: `none`, `auto` (when present) or `explicit` (only explicitly tagged clusters). |
|  |  | Export Skeletons | `none` | How skeletons are exported: `none`, `auto` (all skeletons, which may create SkelRoots) or `explicit` (only those under SkelRoots). |
|  |  | Export Collection Based Bindings | Off | When enabled, export material bindings as collection-based assignments. |
|  |  | Export Color Sets | On | Enable or disable exporting of color sets. |
|  |  | Export Display Color | Off | Enable or disable exporting of display color information. |
|  |  | Export Materials | On | Enable or disable export of materials. |
|  |  | Export Assigned Materials | Off | Only export materials that are assigned to meshes. |
|  |  | Export Instances | On | Enable or disable export of instanced geometry. |
|  |  | Export UVs | On | Enable or disable export of UV sets. |
|  |  | Up Axis | `mayaPrefs` | The up axis authored in USD: `mayaPrefs` follows the Maya preferences, `none` authors no axis, `y` or `z` authors that axis and converts data if needed. |
|  |  | Export Unit | `mayaPrefs` | The units authored in USD: `mayaPrefs` follows the Maya preferences, `none` authors no units, or an explicit unit (`mm`, `cm`, `m`, `in`, `ft`). |
|  |  | Custom Attribute Default Namespace | `userProperties:` | Default namespace prefix used when exporting custom Maya attributes to USD when no explicit usdAttrName is provided. |
|  |  | Custom Attribute Name Mapping | Empty | Direct mappings from Maya attribute names to USD attribute names. |
|  |  | Advanced Custom Attribute Mapping | `{}` (empty JSON) | Advanced JSON mapping for Maya->USD attribute conversions. |

The **Extract Playblast Settings** plugin (`ExtractPlayblast`) is on by default (Enabled On, Optional Off, Active On). It has a list of **Profiles**, empty by default. Each profile has **Task types**, **Task names**, **Products names** and a **Capture Preset**. A capture preset has the groups **Codec** (default encoding `png`, format `image`, quality 95), **Display Options** (background color, gradient and its top and bottom colors, all `[125, 125, 125, 1.0]`), **Generic** (**Isolate View** On, **Off Screen** On, **2D Pan/Zoom** Off), **Renderer** (`vp2Renderer`), **Resolution** (1920 by 1080 in the default preset), **Viewport Options** (lighting, textures, shadows, anti-aliasing, ambient occlusion, fog, motion blur and one switch per object type to show, such as polygons and image planes) and **Camera Options** (gate mask, resolution, film gate, field chart, safe action and title, film pivot and origin, overscan 1.0). The setting **Capture Preset** at the top of the plugin is deprecated in favor of the profiles.

## Loader plugins

Group **Loaders**.

### Outliner colors

Group **Loaded Products Outliner Colors**: the color of loaded content in the Outliner, as RGBA (0 to 255, alpha 1.0).

| Product | Default |
|---|---|
| Model | `[209, 132, 30]` |
| Rig | `[59, 226, 235]` |
| Pointcache | `[94, 209, 30]` |
| Animation | `[94, 209, 30]` |
| Arnold StandIn | `[249, 135, 53]` |
| Camera | `[136, 114, 244]` |
| FBX | `[215, 166, 255]` |
| Maya Ascii | `[67, 174, 255]` |
| Maya Scene | `[67, 174, 255]` |
| Set Dress | `[255, 250, 90]` |
| Layout | `[255, 250, 90]` |
| VDB Cache | `[249, 54, 0]` |
| VRay Proxy | `[255, 150, 12]` |
| VRay Scene | `[255, 150, 12]` |
| Yeti Cache | `[99, 206, 220]` |
| Yeti Rig | `[0, 205, 125]` |
| Ornatrix Cache | `[156, 234, 195]` |
| Ornatrix Rig | `[206, 234, 195]` |

### Reference and import loaders

| Setting | Default | Description |
|---|---|---|
| Reference Loader: Namespace | `{folder[name]}_{product[name]}_##_` | Supports the tokens `{folder[name]}`, `{product[name]}` and `{product[type]}`. |
| Reference Loader: Group name | `_GRP` | Supports `{namespace}`, to make the group name unique, and the namespace tokens. |
| Reference Loader: Display Handle On Load References | On | Shows the handle of loaded references. |
| Reference Loader: Lock Animation Instance on Rig Load | Off | Locks the animation instance that is made when a rig is loaded. |
| Reference Loader: Create Camera instance on load | Off | Creates a camera instance when a camera product is loaded, to publish its output directly. |
| Reference Loader: Update Namespace on Switch | Off | When a container is updated to another folder or task type, updates the namespace to match. |
| Import Loader: Enabled | On | Turns the **Import** loader on. |
| Import Loader: Namespace | `{folder[name]}_{product[name]}_##_` | Same tokens as the reference loader. |
| Import Loader: Group name | `_GRP` | Same tokens as the reference loader. |

### Loader switches

| Loader | Enabled | Other settings |
|---|---|---|
| Arnold Standin Loader | On | - |
| Audio Loader | On | - |
| File Node (Image) Loader | On | - |
| GPU Cache Loader | On | - |
| Image Plane Loader | On | - |
| Look Loader | On | - |
| Matchmove Loader | On | - |
| Maya Load USD to Maya Proxy Loader | On | Use AYON Entity URI: Off |
| Multiverse USD Loader | Off | - |
| Multiverse USD Override Loader | Off | - |
| Redshift Proxy Loader | On | - |
| Render Setup Loader | On | - |
| VDB to Arnold Loader | On | - |
| VDB to Redshift Loader | On | - |
| VDB to V-Ray Loader | On | - |
| Vray Proxy Loader | On | - |
| VrayScene Loader | On | - |
| Xgen Loader | On | - |
| Yeti Cache Loader | On | - |
| Yeti Rig Loader | On | Create Yeti Cache instance on load: On |
| Ornatrix Rig Loader | On | Create Ornatrix Cache instance on load: On |

The Multiverse loaders are off by default. **Use AYON Entity URI** makes the USD loader use the AYON entity URI instead of the resolved path, so the AYON USD resolver resolves it at runtime; it should be on when that resolver is used.

## Workfile build settings

Group **Workfile Build Settings**, used by **Build Workfile (Legacy)**. It is a list of **Profiles**.

| Setting | Description |
|---|---|
| Task types, Task names | Where the profile applies. Empty matches all. |
| Current Context | Products to load from the current folder. Each entry has **Product name Filters** (regular expressions), **Product base types**, **Repre Names** and **Loaders**. |
| Linked Assets | The same, for folders linked to the current one. |

The default has one profile for the task name `Lighting`. For the current context it loads, with the `ReferenceLoader`, `model` products whose name matches `.+[Mm]ain` (representations `abc`, `ma`), `animation`, `pointcache` and `proxyAbc` products (`abc`) and `camera` products (`abc`), and `rendersetup` products (`json`) with the `RenderSetupLoader`. For linked folders it loads `setdress` products (`ma`) with the `ReferenceLoader` and `ArnoldStandin` products (`ass`) with `assLoader`.

## Templated workfile build settings

Group **Templated Workfile Build Settings**, used by **Build Workfile (Templates)**. A list of **Profiles**, empty by default.

| Setting | Default | Description |
|---|---|---|
| Task types, Task names | Empty | Where the profile applies. |
| Path to template | Empty | The workfile template. |
| Keep placeholders | Off | Keeps the placeholders after the build. |
| Apply to New Scene | Off | Builds the template in each new scene. |
| Apply on Maya launch | On | Builds the template when Maya launches. |
| Save first workfile version | On | Saves the built file as the first version of the workfile. |

## Related

- [Maya addon](index.md)
- [Rendering and renderers](rendering.md)
- [Hair, fur and USD plugins](plugins.md)
