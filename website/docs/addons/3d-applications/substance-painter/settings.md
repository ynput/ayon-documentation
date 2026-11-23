---
title: Substance Painter addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Substance Painter addon with their default values: color management, shelves, the Workfile and Textures creators, the Load Mesh project templates and the Extract TX plugin."
addon: substancepainter
addon_repo: ayon-substance-painter
addon_version: 0.3.6
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-substance-painter/tree/0.3.6/server/settings
---

# Substance Painter addon settings

<AddonInfo />

The settings of the [Substance Painter addon](index.md) are in **Studio settings > Substance Painter**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The Substance Painter versions and their executables are not addon settings: they are variants of the Applications addon. How studio and project values combine is described in [Settings](../../../ayon/how-ayon-works/settings.md).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://substancepainter/imageio" scope="Studio, with project overrides" />

Whether Substance Painter follows the global color management, and file rules of this host. The addon has no OCIO config override: the global configuration is used. See [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Substance Painter follows the global color management.

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the file rules of this host instead of the global ones.

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

## Shelves

<SettingLocation uri="ayon+settings://substancepainter/shelves" scope="Studio, with project overrides" />

Shelves of resources (brushes, smart materials and so on) added to Substance Painter when AYON starts in it, so that studio libraries are available to every artist.

<!-- screenshot: settings editor, Shelves -->

<Settings>
<Setting name="Shelves" default="Empty list">

<Settings>
<Setting name="Name">

Name of the shelf in Substance Painter.

</Setting>
<Setting name="Path">

Folder of the shelf. The path can hold template keys such as `{root[work]}`, `{project[name]}` or `{folder[name]}`, filled from the current context.

</Setting>
</Settings>

</Setting>
</Settings>

## Creators

<SettingLocation uri="ayon+settings://substancepainter/create" scope="Studio, with project overrides" />

The creators of the Publisher. What they publish is described in the [Substance Painter addon](index.md) page.

<!-- screenshot: settings editor, Creators -->

### Create Workfile

<SettingLocation uri="ayon+settings://substancepainter/create/CreateWorkfile" />

<Settings prefix="create-workfile">
<Setting name="Enabled" default="Enabled">

Create the workfile instance automatically.

</Setting>
<Setting name="Active by default" default="Enabled">

The workfile instance is selected for publishing by default.

</Setting>
<Setting name="Default Variant" default="Main">

Variant of the workfile product name.

</Setting>
</Settings>

### Create Textures

<SettingLocation uri="ayon+settings://substancepainter/create/CreateTextures" />

<Settings prefix="create-textures">
<Setting name="Channel Mapping" default="28 channels, listed below">

The channels offered by the **Export Channel(s)** option of the Textures creator.

<Settings>
<Setting name="Channel Type">

Label of the channel in the creator.

</Setting>
<Setting name="Channel Map">

Channel name in Substance Painter.

</Setting>
</Settings>

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types the creator can make. When the list is set, the published `image` products take the product type of the texture product instead of `image`; for existing instances without one, the first item is used.

<Settings>
<Setting name="Product type">

Name of the product type.

</Setting>
<Setting name="Label">

Label of the product type in the UI.

</Setting>
</Settings>

</Setting>
</Settings>

The default channel types are Anisotropy Angle, Anisotropy Level, Base Color, Metallic, Roughness, Normal, Height, Specular Edge Color, Opacity, Displacement, Glossiness, Ambient Occlusion, Transmissive, Reflection, Diffuse, Index of Refraction, Specular Level, Blending Mask, Translucency, Scattering, Scatter Color, Sheen Opacity, Sheen Color, Coat Opacity, Coat Color, Coat Roughness, Coat Specular Level and Coat Normal. Most channel maps are the label without spaces, sometimes with different capitalization (`Anisotropyangle`, `Anisotropylevel`, `Specularlevel`); the other exceptions are Ambient Occlusion (`AO`) and Index of Refraction (`Ior`). With an empty list, the creator offers a built-in set of channels.

## Loaders

<SettingLocation uri="ayon+settings://substancepainter/load" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Loaders -->

### Load Mesh

<SettingLocation uri="ayon+settings://substancepainter/load/SubstanceLoadProjectMesh" />

The project templates offered when a mesh is loaded, which set up the Substance Painter project. The artist picks one in the loader dialog.

<Settings prefix="load-mesh">
<Setting name="Project Templates" default="2K(Default), 2K(UV tile), 4K(Custom)">

<Settings>
<Setting name="Template Name" default="default">

Name shown in the template list.

</Setting>
<Setting name="Document Resolution" default="1024">

Texture resolution of a new project: **128**, **256**, **512**, **1024**, **2048** or **4096**.

</Setting>
<Setting name="Import Cameras" default="Enabled">

Import the cameras of the mesh file.

</Setting>
<Setting name="Normal Map Format" default="DirectX">

**DirectX** or **OpenGL**.

</Setting>
<Setting name="UV Tile Settings" default="Default">

UV workflow of a new project: **Default**, **UV Tile** or **Texture Set Per UV Tile**.

</Setting>
<Setting name="Tangent Space" default="Per Fragment">

How tangent space is computed: **Per Fragment** or **Per Vertex**.

</Setting>
<Setting name="Preserve Strokes" default="Enabled">

Keep stroke positions on the mesh. Relevant only when loading into an existing project.

</Setting>
</Settings>

</Setting>
</Settings>

The defaults above are those of a new template. The three default templates import cameras, use **Per Fragment** tangent space and preserve strokes; they differ in:

- **2K(Default):** 2048, **DirectX**, **Default** UV workflow.
- **2K(UV tile):** 2048, **DirectX**, **UV Tile**.
- **4K(Custom):** 4096, **OpenGL**, **UV Tile**.

## Publishers

<SettingLocation uri="ayon+settings://substancepainter/publish" scope="Studio, with project overrides" />

Each publish plugin has three switches: **Enabled** runs the plugin, **Optional** lets the artist skip it in the Publisher, and **Active** selects it by default. The Validate output maps validator has no settings.

<!-- screenshot: settings editor, Publishers -->

<Settings prefix="publish">
<Setting name="Extract Make TX" default="Enabled, optional, active">

Adds a `tx` representation to the published images. See [Extractors](index.md#extractors).

</Setting>
</Settings>

## Related

- [Substance Painter addon](index.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
