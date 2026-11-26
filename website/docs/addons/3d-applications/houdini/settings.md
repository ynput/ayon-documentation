---
title: Houdini addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Houdini addon with their default values: general, color management, shelves, creator, publish and loader plugins, and templated workfile build."
addon: houdini
addon_repo: ayon-houdini
addon_version: 0.10.11
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-houdini/tree/0.10.11/server/settings
---

# Houdini addon settings

<AddonInfo />

The settings of the [Houdini addon](index.md) are in **Studio settings > Houdini**, and can be overridden per project in **Project settings > Houdini**. The editor marks overridden values; see [Settings](../../../ayon/how-ayon-works/settings.md). Pasting a location below into the URI bar of the web app opens that setting. The defaults are the values the addon ships with.

Some behavior that people look for here is set in other addons: the OCIO config and the global color management in the [core addon settings](../../essentials/core/settings.md), together with the custom staging directory profiles that can override the ROP output directory.

## General

<SettingLocation uri="ayon+settings://houdini/general" scope="Studio, with project overrides" />

The publish button on created ROPs, and the Houdini variables that follow the current context.

<!-- screenshot: settings editor, General -->

<Settings>
<Setting name="Add Self Publish Button" default="Disabled">

Adds a self-publish button to every ROP that a creator makes.

</Setting>
<Setting name="Update Houdini Vars on context change">

Keeps Houdini variables in sync with the context. They are updated when the context changes, and with **Update Houdini Vars** in the AYON menu.

<Settings>
<Setting name="Enabled" default="Enabled">

Turns the update on.

</Setting>
<Setting name="Houdini Vars" default="One entry, JOB">

The variables to set. The default is `JOB` with the value `{root[work]}/{project[name]}/{hierarchy}/{folder[name]}/work/{task[name]}`, treated as a directory.

<Settings>
<Setting name="Var">

Name of the variable, without `$`. It is converted to upper case.

</Setting>
<Setting name="Value">

The value, a template that can use context keys such as `{folder[name]}` and `{task[name]}`.

</Setting>
<Setting name="Treat as directory" default="Disabled">

The value is a folder: it is created if it does not exist.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Color Management (ImageIO)

<SettingLocation uri="ayon+settings://houdini/imageio" scope="Studio, with project overrides" />

Whether Houdini follows the global color management of the core addon, with file rules and the display and view settings of the workfile. How these settings are applied at launch is described in [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="color-management">
<Setting name="Enable Color Management" default="Enabled">

Houdini follows the global color management, using the OCIO config of the core addon.

</Setting>
<Setting name="File Rules">

Rules that assign a colorspace to files by their path. See [File rules](../../../pipeline/color-management-on-launch.md#file-rules).

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Turns on the rules below for Houdini.

</Setting>
<Setting name="Rules" default="Empty list">

Rule names must be unique.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension">

Extension of the files the rule applies to.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Workfile">

The color settings of the workfile. Empty values are skipped, so existing environment variables pass through. The render space in Houdini is always the `scene_linear` role.

<Settings>
<Setting name="Enabled" default="Disabled">

Applies the values below.

</Setting>
<Setting name="Default active displays" default="ACES">

Works like the `OCIO_ACTIVE_DISPLAYS` environment variable: a colon-separated list of displays, for example `ACES:P3`.

</Setting>
<Setting name="Default active views" default="sRGB">

Works like the `OCIO_ACTIVE_VIEWS` environment variable: a colon-separated list of views, for example `sRGB:DCDM`.

</Setting>
<Setting name="Review colorspace" default="Empty">

Sets the OCIO colorspace parameter of OpenGL nodes. When empty, it is worked out from the default display and view.

</Setting>
</Settings>

</Setting>
</Settings>

## Shelves Manager

<SettingLocation uri="ayon+settings://houdini/shelves" scope="Studio, with project overrides" />

Shelves that the addon adds to Houdini, either from an existing `.shelf` file or defined here tool by tool. The list is empty by default.

<!-- screenshot: settings editor, Shelves Manager -->

<Settings prefix="shelves">
<Setting name="Shelves Manager" id="shelves-manager-list" default="Empty list">

<Settings>
<Setting name="Options">

How the shelf set is added: **Add a .shelf file** or **Add Shelf Set Name and Shelves Definitions**. Only the fields of the chosen option are shown.

</Setting>
<Setting name="Add a .shelf file">

<Settings>
<Setting name="Shelf Set Path">

Path of the shelf set file, per platform: **Windows**, **Linux** and **MacOS**.

</Setting>
</Settings>

</Setting>
<Setting name="Add Shelf Set Name and Shelves Definitions">

<Settings>
<Setting name="Shelf Set Name" default="Empty" />
<Setting name="Shelves Definitions" default="Empty list">

<Settings>
<Setting name="Shelf name" />
<Setting name="Shelf Tools" default="Empty list">

The tools of the shelf. **Name** and **Script Path** are mandatory.

<Settings>
<Setting name="Name">

Label of the tool.

</Setting>
<Setting name="Script Path">

Python script the tool runs.

</Setting>
<Setting name="Icon Path" default="Empty" />
<Setting name="Help text" default="Empty" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://houdini/create" scope="Studio, with project overrides" />

The creators that make publish instances (ROP nodes), and the defaults of the ROPs they create. The products themselves are described in [Products Houdini can create](index.md#products-houdini-can-create).

<!-- screenshot: settings editor, Creator Plugins -->

### General creator settings

<Settings>
<Setting name="Render ROPs use legacy product types" default="Disabled">

When enabled, the Arnold, Karma, Mantra, Redshift, V-Ray and USD Render ROPs use the legacy product types, such as `arnold_rop`, `mantra_rop` and `usdrender`. When disabled, they publish the `render` product type. Kept for backward compatibility with existing projects.

</Setting>
<Setting name="Set ROP Output Directory on Create">

Sets output paths on ROP nodes when they are created. These paths can be overridden by the custom staging directory profiles of the core addon (`ayon+settings://core/tools/publish/custom_staging_dir_profiles`).

<Settings>
<Setting name="Enabled" default="Enabled">

Disabling it turns off both the default output directory and the custom staging directories.

</Setting>
<Setting name="Expand Houdini Variables" default="Disabled">

Expands Houdini variables such as `$HIP` in the **Default Output Directory**. Houdini expressions such as `` `chs('AYON_productName')` `` stay unexpanded.

</Setting>
<Setting name="Default Output Directory" default="$HIP/ayon/`chs(&quot;AYON_productName&quot;)`">

Initial output directory of new AYON ROPs; artists can change it after creation. It supports Houdini variables and expressions. Houdini expressions are expanded for HDA products.

</Setting>
</Settings>

</Setting>
</Settings>

### Creators

Each creator has these fields, unless noted:

- **Enabled:** the creator is available in the Publisher.
- **Default Products** (titled **Default Product Variants** for Create Arnold Ass, Create Review and Create Static Mesh): the variants offered when creating, `Main` by default.
- **Product Type Items:** an optional list of product types the creator can make, each with a **Product Type** and a **Label** shown in the UI. Empty by default.

Creator settings are matched to creators by class name. **Create Model FBX** is stored under the key `CreateModelFBX`, but the creator class is `CreateFBX`, so these settings are not applied to the **Model (FBX)** creator. The creators **Composite (Copernicus)**, **APEX Rig**, **USD Asset Model**, **USD Asset Assembly**, **USD Asset Groom** and **USD Component Builder LOPs** have no settings of their own.

<Settings>
<Setting name="Create Alembic Camera" default="Enabled, Main" />
<Setting name="Create Arnold Ass" default="Enabled, Main">

<Settings>
<Setting name="Extension" default=".ass">

Extension of the exported files.

</Setting>
<Setting name="Show in Viewport Menu" default="Disabled">

When disabled, the Arnold ROP is not listed in the render view as a renderable candidate. This product is mostly used for `.ass` exports, so it is rarely needed there.

</Setting>
</Settings>

</Setting>
<Setting name="Create Arnold ROP" default="Enabled, Main" />
<Setting name="Create Composite (Image Sequence)" default="Enabled, Main" />
<Setting name="Create Houdini Digital Asset" default="Enabled, Main" />
<Setting name="Create Karma ROP" default="Enabled, Main" />
<Setting name="Create Look" default="Enabled, Main" />
<Setting name="Create Mantra ROP" default="Enabled, Main" />
<Setting name="Create Model" default="Enabled, Main" />
<Setting name="Create Model FBX" default="Enabled, Main">

Not applied to the **Model (FBX)** creator; see above.

</Setting>
<Setting name="Create PointCache (Abc)" default="Enabled, Main" />
<Setting name="Create PointCache (Bgeo)" default="Enabled, Main" />
<Setting name="Create PointCloud (PRT)" default="Disabled, Main">

Point cloud instances published with the PRT representation. It requires the `PRT_ROPDriver` node from the [houdini_PRTROP](https://github.com/flipswitchingmonkey/houdini_PRTROP) project.

</Setting>
<Setting name="Create Redshift Proxy" default="Enabled, Main" />
<Setting name="Create Redshift ROP" default="Enabled, Main">

<Settings>
<Setting name="Multi Layered Mode" default="No Multi-Layered EXR File">

Default mode of new Redshift ROPs: **No Multi-Layered EXR File** or **Full Multi-Layered EXR File**.

</Setting>
</Settings>

</Setting>
<Setting name="Create Review" default="Enabled, Main">

<Settings>
<Setting name="Default Node Type" default="OpenGL">

Node type of new review instances: **OpenGL** or **Flipbook**.

</Setting>
</Settings>

</Setting>
<Setting name="Create Static Mesh" default="Enabled, Main">

<Settings>
<Setting name="Static Mesh Prefix" default="S">

Prefix of static mesh names, checked by **Validate Unreal Static Mesh Name**.

</Setting>
<Setting name="Collision Prefixes" default="UBX, UCP, USP, UCX">

Prefixes that mark collision meshes, also checked by **Validate Unreal Static Mesh Name**.

</Setting>
</Settings>

</Setting>
<Setting name="Create USD" default="Enabled, Main" />
<Setting name="Create USD render" default="Enabled, Main">

<Settings>
<Setting name="Default Renderer" default="Karma CPU">

The Hydra renderer plug-in, by its nice name, such as `Karma CPU`, or its plug-in name, such as `BRAY_HdKarma`.

</Setting>
</Settings>

</Setting>
<Setting name="Create VDB Cache" default="Enabled, Main" />
<Setting name="Create VRay ROP" default="Enabled, Main" />
<Setting name="Create Workfile">

The workfile instance is created automatically. It has **Product Type Items**, and no **Enabled** or variants fields.

<Settings>
<Setting name="Mandatory workfile" default="Disabled">

The artist cannot disable the workfile instance in the Publisher. Requires core addon 1.4.1 or newer.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://houdini/publish" scope="Studio, with project overrides" />

The collectors, validators and extractors that run when publishing from Houdini. What each plugin checks or writes is described in [Publishing](index.md#publishing) on the addon page.

Most plugins share three fields:

- **Enabled:** the plugin runs.
- **Optional:** the artist can turn the plugin off in the Publisher.
- **Active:** the plugin is turned on by default in the Publisher. Only used when it is optional.

The default of each plugin below lists these three fields; other fields are listed under the plugin.

<!-- screenshot: settings editor, Publish Plugins -->

### Collectors

<Settings>
<Setting name="Collect Asset Handles">

<Settings>
<Setting name="Use asset handles" default="Enabled">

Applies the start and end handles from the task or folder data to publish instances. Disable it for the Publisher to ignore the handles.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Files For Cleaning Up." default="Disabled, optional, active">

Collects the files written by the instances for cleaning up after publishing.

<Settings>
<Setting name="Product Types" default="Empty list">

The product types it applies to: **Camera (Abc)**, **PointCache (Abc)/PointCache (Bgeo)**, **Review**, **Static Mesh (FBX)**, **USD (experimental)**, **VDB Cache**, **Composite (Image Sequence)**, **Arnold ASS**, **Arnold ROP**, **Mantra ROP**, **Redshift Proxy**, **Redshift ROP**, **Karma ROP**, **VRay ROP** and **Model**.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Frames to Fix">

Adds a text field to the Publisher for the frames to re-render.

<Settings>
<Setting name="Enabled" default="Enabled" />
<Setting name="Show 'Rewrite latest version' toggle" default="Disabled">

Lets the artist turn on **Rewrite latest version**, so that the fixed frames update the latest version instead of creating a new one.

</Setting>
<Setting name="Families" default="*">

The product types the plugin applies to.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Local Render Instances">

Creates one instance per AOV for local renders.

<Settings>
<Setting name="Use Deadline AOV Filter" default="Disabled">

Takes the AOV filter from the `ProcessSubmittedJobOnFarm` settings of the Deadline addon instead of the filter below.

</Setting>
<Setting name="Reviewable products filter">

Selects the AOVs that become reviewable. The host name must be the one used for Houdini.

<Settings>
<Setting name="Houdini Host name" default="houdini" />
<Setting name="AOV regex" default=".*([Bb]eauty).*">

Regular expressions matched, from the start, against the file name of the first rendered file of each AOV (not the product name).

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

### Validators

<Settings>
<Setting name="Validate Abc Primitive To Detail" default="Enabled, not optional, active">

The Primitive to Detail attribute of the Alembic ROP is consistent.

</Setting>
<Setting name="Validate Alembic Input Node" default="Enabled, not optional, active">

The node connected to the output is correct.

</Setting>
<Setting name="Validate Primitive Hierarchy Paths" default="Enabled, not optional, active">

All primitives build their hierarchy from the path attribute.

</Setting>
<Setting name="Validate FBX Output Node" default="Enabled, not optional, active" />
<Setting name="Validate Instance is in same Context" default="Enabled, optional, active" />
<Setting name="Validate Mesh is Static" default="Enabled, optional, active" />
<Setting name="Validate No Errors" default="Enabled, not optional, active">

The instance has no cooking errors.

</Setting>
<Setting name="Validate Single Frame" default="Enabled, not optional, active" />
<Setting name="Validate Sop Output Node" default="Enabled, not optional, active" />
<Setting name="Validate Review Colorspace" default="Enabled, optional, active" />
<Setting name="Validate Product Name" default="Enabled, optional, active" />
<Setting name="Validate Unreal Static Mesh Name" default="Disabled, optional, active" />
<Setting name="Validate VDB Output Node" default="Enabled, not optional, active">

The node connected to the output node is of type VDB.

</Setting>
<Setting name="Validate workfile paths settings" default="Enabled, optional">

Checks file paths on nodes for variables that should not be used. It has no **Active** field.

<Settings>
<Setting name="Node Types" default="file, alembic">

The node types whose paths are checked.

</Setting>
<Setting name="Prohibited Variables" default="$HIP, $JOB">

Variables that are not allowed in those paths.

</Setting>
</Settings>

</Setting>
<Setting name="Validate USD Look Assignments" default="Enabled, optional, active" />
<Setting name="Validate USD Look Disallowed Types" default="Enabled, not optional, active">

<Settings>
<Setting name="Disallowed Types" default="UsdGeomBoundable, UsdRenderSettingsBase, UsdRenderVar, UsdGeomCamera">

USD schema types not allowed in a look product: `UsdGeomBoundable` for meshes, lights and procedurals, `UsdRenderSettingsBase` for render settings, `UsdRenderVar` for render vars and `UsdGeomCamera` for cameras.

</Setting>
</Settings>

</Setting>
<Setting name="Validate USD Render Product Paths" default="Disabled, optional, active" />
<Setting name="Validate USD Render Resolution" default="Enabled, optional, active">

The render resolution and pixel aspect of USD render products match the context resolution.

</Setting>
</Settings>

### Extractors

<Settings>
<Setting name="Extract Active View Thumbnail" default="Enabled, not optional, active" />
<Setting name="Extract USD">

It has no **Enabled**, **Optional** or **Active** fields.

<Settings>
<Setting name="Remap save layers to AYON Entity URI" default="Disabled">

Remaps explicit save layers to AYON entity URIs on publish, instead of the resolved publish file paths. See [The AYON USD resolver](../../../pipeline/openusd.md#the-ayon-usd-resolver).

</Setting>
</Settings>

</Setting>
</Settings>

## Loader plugins

<SettingLocation uri="ayon+settings://houdini/load" scope="Studio, with project overrides" />

Options of the loaders. The loaders themselves are listed in [Loading](index.md#loading) on the addon page.

<!-- screenshot: settings editor, Loader Plugins -->

<Settings>
<Setting name="Collapse loaded paths to project root variables" default="Disabled">

Collapses loaded file paths to project root environment variables when a path starts with one. For example, `C:/root/project/path/to/file` becomes `$AYON_PROJECT_ROOT_WORK/project/path/to/file`.

</Setting>
<Setting name="Load Camera (abc)">

<Settings>
<Setting name="Camera Aperture Expression on load" default="Houdini Default">

The aperture expression of loaded Alembic cameras: **Houdini Default**, or **Match Maya render mask**, an expression that better matches the Maya render mask, based on the one Houdini applies when it imports FBX cameras.

</Setting>
</Settings>

</Setting>
<Setting name="Load Image (COP2)" default="Enabled" />
<Setting name="Load Image (Copernicus)" default="Enabled" />
<Setting name="Load Layout">

<Settings>
<Setting name="Remove Layout Container Members during removing container" default="Disabled">

Removes the members of the layout container when the container is removed. This cleans up the nodes the loader created, but also removes nodes that were added to the container by hand.

</Setting>
</Settings>

</Setting>
</Settings>

The USD loaders **LOP Load Asset**, **LOP Load Shot**, **USD Sublayer Loader**, **USD Reference Loader** and **USD SOP Import Loader** each have one field:

<Settings prefix="usd-loaders">
<Setting name="Use AYON Entity URI" default="Disabled">

Loads the AYON entity URI instead of the resolved file path, so that the [AYON USD resolver](../../../pipeline/openusd.md#the-ayon-usd-resolver) resolves the path at runtime. Enable it when the AYON USD resolver is used.

</Setting>
</Settings>

## Templated Workfile Build

<SettingLocation uri="ayon+settings://houdini/templated_workfile_build" scope="Studio, with project overrides" />

Profiles that pick a workfile template for the context and decide when it is applied. How templates and placeholders work is described in [Template builder](../../../pipeline/template-builder.md).

<!-- screenshot: settings editor, Templated Workfile Build -->

<Settings prefix="templated-workfile">
<Setting name="Profiles" default="Empty list">

The profile that best matches the context is used. Empty filters match everything.

<Settings>
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Folder Types" default="Empty list" />
<Setting name="Folder paths" default="Empty list" />
<Setting name="Path to template">

The template workfile.

</Setting>
<Setting name="Keep placeholders" default="Disabled">

Keeps the placeholders after the build.

</Setting>
<Setting name="Apply to New Scene" default="Disabled">

Applies the template to every new empty scene.

</Setting>
<Setting name="Apply on Houdini launch" default="Enabled">

Applies the template when Houdini starts and no workfile exists yet.

</Setting>
<Setting name="Save first workfile version" default="Enabled">

Saves the first workfile version after the build.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Houdini addon](index.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Template builder](../../../pipeline/template-builder.md)
- [OpenUSD](../../../pipeline/openusd.md)
