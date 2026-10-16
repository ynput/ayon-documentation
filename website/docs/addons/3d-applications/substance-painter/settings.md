---
title: Substance Painter addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Substance Painter addon with their default values: color management, shelves, the Workfile and Textures creators, the Load Mesh project templates and the Extract TX plugin."
addon: substancepainter
addon_repo: ayon-substance-painter
addon_version: 0.3.6
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-substance-painter/tree/0.3.6/server/settings
  - https://help.ayon.app/en/articles/6244730-substance-painter-addon-settings
---

# Substance Painter addon settings

<AddonInfo />

The settings of the [Substance Painter addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Substance Painter follows the global color management. |
| Activate Host Rules (File Rules) | Off | Turn on the file rules of this host. They override the global ones. |
| Rules | Empty list | File rules. A rule has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Shelves

| Setting | Default | Description |
|---|---|---|
| Shelves | Empty list | Shelves added to Substance Painter at startup. Each item has a **Name** and a **Path** to a folder. The path supports template keys. |

## Creators

### Create Workfile

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Create the workfile instance automatically. |
| Active by default | On | The workfile instance is selected by default in the Publisher. |
| Default Variant | Main | The variant used for the workfile product name. |

### Create Textures

| Setting | Default | Description |
|---|---|---|
| Channel Mapping | 28 items | The channels offered by the **Export Channel(s)** option of the Textures creator. Each item has a **Channel Type** (the label) and a **Channel Map** (the Substance Painter channel name). |
| Product type items | Empty list | Optional list of product types the creator can create. The first item is also the product type of the published `image` products. Each item has a **Product type** and a **Label**. |

The default channel types are Anisotropy Angle, Anisotropy Level, Base Color, Metallic, Roughness, Normal, Height, Specular Edge Color, Opacity, Displacement, Glossiness, Ambient Occlusion, Transmissive, Reflection, Diffuse, Index of Refraction, Specular Level, Blending Mask, Translucency, Scattering, Scatter Color, Sheen Opacity, Sheen Color, Coat Opacity, Coat Color, Coat Roughness, Coat Specular Level and Coat Normal. Most map names are the label without spaces, sometimes with different capitalization; other exceptions are Ambient Occlusion (`AO`) and Index of Refraction (`Ior`).

## Loaders

### Load Mesh

| Setting | Default | Description |
|---|---|---|
| Project Templates | 3 templates | Templates offered when a mesh is loaded. See the table below. |

A template has these settings:

| Setting | Default of a new template | Description |
|---|---|---|
| Template Name | `default` | The name shown in the template list. |
| Document Resolution | 1024 | The texture resolution of a new project: 128, 256, 512, 1024, 2048 or 4096. |
| Import Cameras | On | Import the cameras of the mesh file. |
| Normal Map Format | DirectX | **DirectX** or **OpenGL**. |
| UV Tile Settings | Default | The UV workflow: **Default**, **UV Tile** or **Texture Set Per UV Tile**. |
| Tangent Space | Per Fragment | **Per Fragment** or **Per Vertex**. |
| Preserve Strokes | On | Keep stroke positions on the mesh. Relevant only when loading into an existing project. |

The default templates:

| Template Name | Document Resolution | Normal Map Format | UV Tile Settings |
|---|---|---|---|
| 2K(Default) | 2048 | DirectX | Default |
| 2K(UV tile) | 2048 | DirectX | UV Tile |
| 4K(Custom) | 4096 | OpenGL | UV Tile |

All three import cameras, use Per Fragment tangent space and preserve strokes.

## Publishers

| Plugin | Enabled | Optional | Active | What it does |
|---|---|---|---|---|
| Extract Make TX | On | On | On | Adds a `tx` representation to the published images. See the [overview](index.md#extractors). |

**Enabled** means the plugin runs, **Optional** lets the artist skip it in the Publisher, and **Active** selects it by default.

The Validate output maps validator has no settings.
