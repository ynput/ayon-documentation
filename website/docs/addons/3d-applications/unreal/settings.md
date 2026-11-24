---
title: Unreal addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Unreal addon with their default values: color management, prelaunch, import, render setup, project setup and creators."
addon: unreal
addon_repo: ayon-unreal
addon_version: 0.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-unreal/tree/0.4.0/server
---

# Unreal addon settings

<AddonInfo />

The settings of the [Unreal addon](index.md) are in **Studio settings > Unreal**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The Unreal engine versions and their executables are not addon settings: they are variants of the Applications addon. How studio and project values combine is described in [Settings](../../../ayon/how-ayon-works/settings.md).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://unreal/imageio" scope="Studio, with project overrides" />

Whether Unreal follows the color management of AYON, with an optional OCIO configuration of its own and file rules. How these switches combine with the global ones is described in [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Unreal follows the color management of AYON.

</Setting>
<Setting name="OCIO config">

<Settings>
<Setting name="Override global OCIO config" default="Disabled">

Use the configuration of this addon instead of the global one.

</Setting>
<Setting name="Config path" default="Empty list">

Paths to the OCIO configuration. The first path that exists is used.

</Setting>
</Settings>

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the file rules of this host.

</Setting>
<Setting name="Rules" default="Empty list">

Rules that assign a colorspace to files. Rule names must be unique.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Prelaunch settings

<SettingLocation uri="ayon+settings://unreal/prelaunch_settings" scope="Studio, with project overrides" />

The launch hook that installs the PySide Qt binding into the Python of Unreal, which the AYON tools need. Studios without internet access on workstations can install it from a local source.

<!-- screenshot: settings editor, Prelaunch Settings -->

<Settings prefix="prelaunch">
<Setting name="Enabled" default="Enabled">

Install PySide2 or PySide6 into the Python packages of Unreal. Disable to skip the hook.

</Setting>
<Setting name="Use Offline Package Source" default="Disabled">

Install PySide from a local folder or URL instead of downloading it.

</Setting>
<Setting name="Offline Package Source Path" default="Empty">

Folder or URL holding the PySide package files, for example `.whl` or `.tar.gz`.

</Setting>
<Setting name="Install to Launcher Data Path" default="Disabled">

Install into a dedicated folder in the launcher local data folder (`AYON_LAUNCHER_LOCAL_DIR`) and add it to the Python path of Unreal, instead of changing the system, engine or user Python environment.

</Setting>
</Settings>

## Import settings

<SettingLocation uri="ayon+settings://unreal/import_settings" scope="Studio, with project overrides" />

Where loaded products are stored in the Unreal project and how they are named, and how Alembic files and layouts are loaded. The folder and name fields are templates filled with the data of the loaded product.

<!-- screenshot: settings editor, Import settings -->

<Settings prefix="import">
<Setting name="Asset directories for loaded assets" default="`{folder[path]}/{product[name]}_{version[version]}`">

Template of the folder that stores loaded assets.

</Setting>
<Setting name="Asset name for loaded assets" default="`{folder[name]}_{product[name]}_{version[version]}_{representation[name]}`">

Template of the names of loaded assets.

</Setting>
<Setting name="Use nanite" default="Enabled">

Import meshes with Nanite enabled. Works only when the interchange pipeline is not used; with interchange, set it in the pipeline asset.

</Setting>
<Setting name="Show import dialog" default="Disabled">

Show the import dialog of Unreal when loading.

</Setting>
</Settings>

### Load Alembic Settings

<Settings prefix="import">
<Setting name="Alembic Conversion Setting Presets" default="maya">

Preset that converts loaded Alembic files to the correct UV and transform: **maya**, **3dsmax** or **custom**. **custom** uses the values below.

</Setting>
<Setting name="Custom Alembic Conversion Setting Presets">

Values of the **custom** preset.

<Settings>
<Setting name="Flip U" default="Disabled" />
<Setting name="Flip V" default="Enabled" />
<Setting name="Rotation X" default="90.0" />
<Setting name="Rotation Y" default="0.0" />
<Setting name="Rotation Z" default="0.0" />
<Setting name="Scale X" default="1.0" />
<Setting name="Scale Y" default="-1.0" />
<Setting name="Scale Z" default="1.0" />
</Settings>

</Setting>
</Settings>

### Load Layout Settings

<Settings prefix="import">
<Setting name="Directories for loaded layouts" default="`{folder[path]}/{product[name]}`">

Template of the folder that stores loaded layouts.

</Setting>
<Setting name="Layout name for loaded layouts" default="`{folder[name]}_{product[name]}_{version[version]}`">

Template of the names of loaded layouts.

</Setting>
<Setting name="Generate level sequences when loading layouts" default="Enabled">

Create level sequences when a layout is loaded.

</Setting>
<Setting name="Enable user override layout representation" default="Disabled">

Load the assets of a layout through the representation chosen below instead of the one the layout JSON names.

</Setting>
<Setting name="Override layout representation by" default="json">

The representation used when the override is enabled: **json**, **fbx** or **abc**.

</Setting>
<Setting name="Remove loaded assets when deleting layouts" default="Disabled">

Also remove the assets of a layout when the layout is removed.

</Setting>
<Setting name="Delete assets that are not matched" default="Disabled">

When **Load Layout on Existing Scene** runs, remove the assets of the current layout that do not match the loaded one.

</Setting>
</Settings>

## Render setup

<SettingLocation uri="ayon+settings://unreal/render_setup" scope="Studio, with project overrides" />

The Movie Render Queue assets and output used when rendering, see [Rendering](index.md#rendering). The assets must exist in the Unreal project.

<!-- screenshot: settings editor, Render Setup -->

<Settings prefix="render-setup">
<Setting name="Render Queue Path" default="/Game/Ayon/renderQueue">

Path of the Render Queue asset used for farm publishing.

</Setting>
<Setting name="Render Config Path" default="/Game/Ayon/DefaultMovieRenderQueueConfig.DefaultMovieRenderQueueConfig">

Path of the render configuration asset used for farm publishing.

</Setting>
<Setting name="Pre-roll frames" default="0">

Number of frames rendered as the initial delay of the render (the Movie Render Queue `initial_delay_frame_count`).

</Setting>
<Setting name="Render format" default="EXR">

Output format of renders: **PNG**, **EXR**, **JPG** or **BMP**.

</Setting>
</Settings>

## Project setup

<SettingLocation uri="ayon+settings://unreal/project_setup" scope="Studio, with project overrides" />

What the launch hook does when the Unreal project of the task does not exist yet.

<!-- screenshot: settings editor, Project Setup -->

<Settings prefix="project-setup">
<Setting name="Allow project creation" default="Enabled">

Create a new Unreal project when none exists. Disable when an external source control such as Perforce provides the project.

</Setting>
<Setting name="Use Existing UProject for Project Creation" default="Empty">

Folder holding an existing `.uproject` file. When it exists, the folder is copied as the new project instead of generating an empty one.

</Setting>
<Setting name="Force existing project" default="Disabled">

When project creation is disabled and the project does not exist, stop the launch with an error.

</Setting>
<Setting name="Dev mode" default="Disabled">

Generate the Unreal project in the C++ style.

</Setting>
</Settings>

## Creators

<SettingLocation uri="ayon+settings://unreal/create" scope="Studio, with project overrides" />

The creators offered in the Publisher. Each creator has the same fields. The Level creator has no settings.

<!-- screenshot: settings editor, Creators -->

Shared fields of each creator:

<Settings prefix="creator">
<Setting name="Enabled">

Make the creator available.

</Setting>
<Setting name="Default Variants">

Variants offered when naming a product.

</Setting>
<Setting name="Product Type Items" default="Empty list">

Optional product types the creator can make.

<Settings>
<Setting name="Product Type">

Name of the product type.

</Setting>
<Setting name="Label">

Label of the product type in the UI.

</Setting>
</Settings>

</Setting>
</Settings>

The creators and their defaults:

<Settings prefix="creators">
<Setting name="Create Camera" default="Enabled, variants Main and Hero" />
<Setting name="Create Layout" default="Enabled, variant Main" />
<Setting name="Create Render" default="Enabled, variant Main" />
<Setting name="Create Static Mesh" default="Enabled, variant Main" />
<Setting name="Create UAsset" default="Enabled, variant Main" />
</Settings>

The addon has no settings for its publish or load plugins.

## Related

- [Unreal addon](index.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
