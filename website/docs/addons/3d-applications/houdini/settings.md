---
title: Houdini addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Houdini addon with their default values: general, color management, shelves, creator, publish and loader plugins, and templated workfile build."
addon: houdini
addon_repo: ayon-houdini
addon_version: 0.10.10
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-houdini/tree/0.10.10/server/settings
  - https://help.ayon.app/en/articles/0982414-configure-houdini-addon
---

# Houdini addon settings

<AddonInfo />

The settings of the [Houdini addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Validators and extractors share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## General

| Setting | Default | Description |
|---|---|---|
| Add Self Publish Button | Off | Add a self-publish button to every ROP that a creator makes. |
| Update Houdini Vars on context change: Enabled | On | Keep Houdini variables in sync when the context changes. A value treated as a directory is created if it does not exist. |
| Houdini Vars | One entry, `JOB` | A list of variables. Each has a **Var** name, a **Value** template and **Treat as directory**. |

The default variable is `JOB` with the value `{root[work]}/{project[name]}/{hierarchy}/{folder[name]}/work/{task[name]}` and **Treat as directory** on.

## Color Management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Houdini follows the global color management, using the OCIO files of the core addon. |
| File Rules: Activate Host Rules | Off | Turn on the file rules of this host. |
| File Rules: Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |
| Workfile: Enabled | Off | Apply the workfile color settings below. Empty values are skipped, so existing environment variables pass through. The render space in Houdini is always the `scene_linear` role. |
| Workfile: Default active displays | `ACES` | Works like `OCIO_ACTIVE_DISPLAYS`: a colon-separated list of displays, for example `ACES:P3`. |
| Workfile: Default active views | `sRGB` | Works like `OCIO_ACTIVE_VIEWS`: a colon-separated list of views, for example `sRGB:DCDM`. |
| Workfile: Review colorspace | Empty | Sets the OCIO colorspace parameter of OpenGL nodes. When empty, the default is worked out from the default display and view. |

## Shelves Manager

A list, empty by default. Each item has an **Options** switch with two modes.

| Setting | Default | Description |
|---|---|---|
| Options | | **Add a .shelf file** or **Add Shelf Set Name and Shelves Definitions**. |
| Add a .shelf file: Shelf Set Path | | The path of a shelf set file, per platform (**Windows**, **Linux**, **MacOS**). |
| Add Shelf Set Name and Shelves Definitions: Shelf Set Name | Empty | The name of the shelf set. |
| Shelves Definitions | None | A list of shelves, each with a **Shelf name** and **Shelf Tools**. Each tool has a **Name** and a **Script Path** (both mandatory), an **Icon Path** and a **Help text**. |

## Creator plugins

### General creator settings

| Setting | Default | Description |
|---|---|---|
| Render ROPs use legacy product types | Off | When on, the Arnold, Karma, Mantra, Redshift, V-Ray and USD Render ROPs use the legacy product types (`arnold_rop`, `mantra_rop`, `usdrender` and so on). When off, they publish the `render` product type. Kept for backward compatibility with existing projects. |
| Set ROP Output Directory on Create: Enabled | On | Set output paths on ROP nodes when they are created. These can be overridden by the custom staging directory profiles of the core addon. Turn it off to disable both. |
| Set ROP Output Directory on Create: Expand Houdini Variables | Off | Expand Houdini variables such as `$HIP` in the default output directory. Expressions such as `` `chs('AYON_productName')` `` stay unexpanded. |
| Set ROP Output Directory on Create: Default Output Directory | `` $HIP/ayon/`chs("AYON_productName")` `` | The initial output directory of new AYON ROPs. Artists can change it after creation. Houdini expressions are expanded for HDA products. |

### Settings of each creator

Each creator below, except Create Workfile, has **Enabled** (on unless noted), **Default Products** (the default variants, `Main`) and **Product Type Items** (an optional list of product types the creator can make, each with a **Product Type** and a **Label**). The Review, Arnold ASS and Static Mesh groups use the title **Default Product Variants** for the variants.

| Creator | Enabled | Other settings |
|---|---|---|
| Create Alembic Camera | On | |
| Create Arnold Ass | On | **Extension** (`.ass`), **Show in Viewport Menu** (off): when off, the Arnold ROP is not listed as a renderable candidate in the render view. |
| Create Arnold ROP | On | |
| Create Composite (Image Sequence) | On | |
| Create Houdini Digital Asset | On | |
| Create Karma ROP | On | |
| Create Look | On | |
| Create Mantra ROP | On | |
| Create Model | On | |
| Create Model FBX | On | See the note below. |
| Create PointCache (Abc) | On | |
| Create PointCache (Bgeo) | On | |
| Create PointCloud (PRT) | Off | Requires the `PRT_ROPDriver` node from the `houdini_PRTROP` project. |
| Create Redshift Proxy | On | |
| Create Redshift ROP | On | **Multi Layered Mode** (`1`, *No Multi-Layered EXR File*; `2` is *Full Multi-Layered EXR File*): the default for new Redshift ROPs. |
| Create Review | On | **Default Node Type** (`opengl`). |
| Create Static Mesh | On | **Static Mesh Prefix** (`S`), **Collision Prefixes** (`UBX`, `UCP`, `USP`, `UCX`). |
| Create USD | On | |
| Create USD render | On | **Default Renderer** (`Karma CPU`): the nice name of the Hydra renderer plug-in, for example `Karma CPU`, or the plug-in name, for example `BRAY_HdKarma`. |
| Create VDB Cache | On | |
| Create VRay ROP | On | |
| Create Workfile | | **Mandatory workfile** (off): the artist cannot disable the workfile in the Publisher. Requires core addon 1.4.1 or newer. It has **Product Type Items**, and no **Enabled** or variants setting. |

Creator settings are matched to creators by class name:

- **Create Model FBX** is stored under the key `CreateModelFBX`, but the creator class is `CreateFBX`, so these settings are not applied to the **Model (FBX)** creator. **Create Static Mesh** matches its class (`CreateStaticMesh`).
- The creators **Composite (Copernicus)** (`CreateCopernicusROP`), **APEX Rig** (`CreateRig`), **USD Asset Model**, **USD Asset Assembly**, **USD Asset Groom** and **USD Component Builder LOPs** have no settings group of their own.

## Publish plugins

### Collectors

| Setting | Default | Description |
|---|---|---|
| Collect Asset Handles: Use asset handles | On | Apply the start and end handles from the task or folder data to publish instances. Turn it off for the Publisher to ignore the handles. |
| Collect Files For Cleaning Up: Enabled / Optional / Active | Off / On / On | Collect files for cleaning up after publishing. **Product Types** is the list of product types it applies to. |
| Collect Frames to Fix: Enabled | On | Provide a text field for frames to re-render. |
| Collect Frames to Fix: Show 'Rewrite latest version' toggle | Off | Let the artist rewrite the frames in the latest version instead of publishing a new version. |
| Collect Frames to Fix: Families | `*` | The families the plugin applies to. |
| Collect Local Render Instances: Use Deadline AOV Filter | Off | Take the AOV filter from the `ProcessSubmittedJobOnFarm` settings of the Deadline addon instead of the filter below. |
| Collect Local Render Instances: Reviewable products filter | Host name `houdini`, AOV regex `.*([Bb]eauty).*` | Selects the AOVs that become reviewable. The host name must be the one used for Houdini. |

### Validators

| Validator | Enabled | Optional | Active | Other settings |
|---|---|---|---|---|
| Validate Abc Primitive To Detail | On | Off | On | |
| Validate Alembic Input Node | On | Off | On | |
| Validate Primitive Hierarchy Paths | On | Off | On | |
| Validate FBX Output Node | On | Off | On | |
| Validate Instance is in same Context | On | On | On | |
| Validate Mesh is Static | On | On | On | |
| Validate No Errors | On | Off | On | |
| Validate Single Frame | On | Off | On | |
| Validate Sop Output Node | On | Off | On | |
| Validate Review Colorspace | On | On | On | |
| Validate Product Name | On | On | On | |
| Validate Unreal Static Mesh Name | Off | On | On | |
| Validate VDB Output Node | On | Off | On | |
| Validate workfile paths settings | On | On | | **Node Types**: `file`, `alembic`. **Prohibited Variables**: `$HIP`, `$JOB`. |
| Validate USD Look Assignments | On | On | On | |
| Validate USD Look Disallowed Types | On | Off | On | **Disallowed Types**: `UsdGeomBoundable`, `UsdRenderSettingsBase`, `UsdRenderVar`, `UsdGeomCamera`. |
| Validate USD Render Product Paths | Off | On | On | |
| Validate USD Render Resolution | On | On | On | |

### Extractors

| Extractor | Enabled | Optional | Active | Other settings |
|---|---|---|---|---|
| Extract Active View Thumbnail | On | Off | On | |
| Extract USD | | | | **Remap save layers to AYON Entity URI** (off): remap explicit save layers to AYON entity URIs on publish, instead of the resolved publish file paths. |

## Loader plugins

| Setting | Default | Description |
|---|---|---|
| Collapse loaded paths to project root variables | Off | Collapse loaded file paths to project root environment variables when a path starts with one, for example `C:/root/project/path/to/file` becomes `$AYON_PROJECT_ROOT_WORK/project/path/to/file`. |
| Load Camera (abc): Camera Aperture Expression on load | `default` | Keeps the Houdini default expression on loaded Alembic cameras. The alternative *Match Maya Render mask* uses an expression based on the one Houdini applies when it imports FBX cameras. |
| Load Image (COP2): Enabled | On | Turn the loader on or off. |
| Load Image (Copernicus): Enabled | On | Turn the loader on or off. |
| Load Layout: Remove Layout Container Members during removing container | Off | Remove the members of the layout container when the container is removed. This cleans up nodes created by the loader, but can also remove nodes that were added to the container by hand. |
| LOP Load Asset, LOP Load Shot, USD Sublayer Loader, USD Reference Loader, USD SOP Import Loader: Use AYON Entity URI | Off | Use the AYON entity URI on load instead of the resolved file path, so that the AYON USD resolver resolves the path at runtime. Turn it on when the AYON USD resolver is used. |

## Templated Workfile Build

A list of **Profiles**, empty by default. A profile applies when it matches its filters.

| Setting | Default | Description |
|---|---|---|
| Task types, Task names, Folder Types, Folder paths | | Filters that select when the profile applies. |
| Path to template | | The template workfile. |
| Keep placeholders | Off | Keep the placeholders after the build. |
| Apply to New Scene | Off | Apply the template to every new empty scene. |
| Apply on Houdini launch | Off | Apply the template when Houdini starts and no workfile exists yet. |
| Save first workfile version | On | Save the first workfile version automatically. |
