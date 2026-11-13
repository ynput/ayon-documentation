---
title: Blender addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Blender addon with their default values: unit scale, startup, handles, hooks, color management, render settings, creator, loader and publish plugins, and the templated workfile build."
addon: blender
addon_repo: ayon-blender
addon_version: 1.1.11
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-blender/tree/1.1.11/server/settings
  - https://help.ayon.app/en/help/articles/6836825-configure-blender-addon
---

# Blender addon settings

<AddonInfo />

The settings of the [Blender addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Validators and extractors share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## Unit scale

Sets the preferred world scale, mostly useful when importing from other applications.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Apply the unit scale. |
| Apply on Opening Existing Files | Off | Also apply it when an existing file is opened. |
| Base File Unit Scale | 1.0 | The unit scale. Typically in tenths, such as 0.1, 0.01 or 100. |

## Startup

| Setting | Default | Description |
|---|---|---|
| Set Resolution on Startup | On | Forces the resolution of the AYON project on launch. |
| Set Start/End Frames and FPS on Startup | On | Forces the frame range and frame rate of the AYON project on launch. |

## Handles

Controls whether the frame handles extend the default playback and render range. Handles can be disabled here while staying configured in the AYON project.

| Setting | Default | Description |
|---|---|---|
| Include handles by default | Off | Extend the total frame range by the frame handles. |
| Include/exclude handles by profiles | None | Profiles that override the default. A profile has **Task types**, **Task names** and **Include handles**. |

## Hooks

| Setting | Default | Description |
|---|---|---|
| Execute PySide hook | On | When no Qt binding is found, installs PySide into Blender. This may need administrator privileges. |

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Blender follows the global color management, using the OCIO files set in the core addon. |
| Activate Host Rules (File Rules) | Off | Turn on the file rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Render settings

| Setting | Default | Description |
|---|---|---|
| Default Render Image Folder | `renders/blender` | Staging or work folder for rendered images. Not for final published images. |
| AOV Separator Character | `underscore` | Separator in AOV names. |
| Image Format | `exr` | Output format when a Render instance is created. |
| Multilayer (EXR) | On | Only has an effect when the EXR format is selected. |
| Renderer | `CYCLES` | Render engine used for render farm submission. |
| Enable Compositing | On | Outputs a composite AOV beside the regular beauty output. Only supported up to Blender 4, because the *Composite* node was removed in Blender 5. |
| AOVs to create | `combined` | The Blender AOVs created automatically when rendering. |
| Custom Passes | None | Additional AOVs. Each has an **Attribute name** and a **Type**. |

## Creator plugins

One entry for each creator: Action, Animation, Blender Scene, Camera, Layout, Look, Model, Point Cache, Render, Review, Rig and USD. Each has the same settings.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Make the creator available. |
| Default Variants | `Main` (none for Look) | The variants offered by default. |
| Product type items | None | Optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. |

## Loader plugins

| Loader | Setting | Default | Description |
|---|---|---|---|
| Alembic Camera Loader, Cache Model Loader | Always Add Cache Reader (Alembic) | Off | Always add a cache reader when importing Alembic files. |
| | Add namespace on load | On | Prefix the loaded objects and data with a namespace. |
| Link Blend (Flat) | Instances Collection | Off | Create instances for collections, instead of adding them directly to the scene. |
| | Instance Object Data | Off | Create instances for object data that no object references. |
| Reference Loader | Create Animation Instance on Load | On | Create an animation instance automatically when a rig file is loaded. |

## Publish plugins

### Validators

Validators that are not listed here have no settings of their own.

| Group | Validator | Enabled | Optional | Active | Checks |
|---|---|---|---|---|---|
| General | Validate Absolute Data Block Paths | On | On | On | External data with absolute file paths |
| | Validate No Animation | On | On | On | That objects have no animation data |
| | Validate Camera Zero Keyframe | Off | On | On | A keyframe on frame zero, mostly used when loading in Unreal Engine |
| | Validate File Saved | On | Off | On | That workfile changes have been saved |
| | Validate Instance is not Empty | On | Off | On | Empty publish instances that would publish no data |
| Model | Validate Mesh Has Uvs | On | On | On | That geometry has a UV set |
| | Validate Mesh No Negative Scale | On | Off | On | Objects scaled with negative values |
| | Validate Model Mesh Has UV map named map1 | Off | On | On | A UV set named `map1`, which matches Maya standards |
| | Validate Transform Zero | Off | On | On | That all object transforms are zero |
| | Validate No Colons In Name | Off | On | On | Names containing `:`, mostly an issue when exporting to Unreal Engine |
| Render | Validate Render Camera Is Set | On | Off | On | A renderable camera when using Render |
| | Validate Render Output for Deadline | On | Off | On | The render output folder naming, and that it matches the workfile and version |
| | Validate Frame Range | On | On | On | That the scene's frame range matches the AYON values of the context |
| | Validate Resolution Setting | On | On | On | That the resolution matches the AYON values of the context |

### Extractors

| Extractor | Enabled | Optional | Active | Other settings |
|---|---|---|---|---|
| Extract Blend | On | On | On | **Families** (`model`, `camera`, `rig`, `layout`, `blendScene`). **Compress** (off). **Pack Textures** (on): packs the textures into the `.blend`, which can enlarge the file significantly but keeps all textures with it. |
| Extract Blend Animation | On | On | On | **Compress** (off). |
| Extract Blend (Action) | On | Off | On | **Compress** (off). |
| Extract FBX | Off | On | On | |
| Extract Animation FBX | Off | On | On | |
| Extract Camera (FBX) | On | On | On | |
| Extract Camera as ABC | On | On | On | |
| Extract Model ABC | On | On | On | |
| Extract Layout (JSON) | On | On | Off | |
| Extract Model USD | On | On | On | |
| Extract ABC, Extract Animation ABC | | | | **Alembic Mesh Subdiv Schema** (off): exports meshes using Alembic's subdivision schema, which includes creases but excludes normals and usually gives smaller files. **Evaluation Mode** (`RENDER`): decides the visibility of objects and the modifier settings used. |
| Extract Playblast, Extract Thumbnail | On | On | On | **Presets**. **Compress** (off). **Background Images** (off): includes background images in the capture. Only active for Blender 5.2 or newer. |
| Extract USD | | | | **Convert Orientation** (off), **Animation** (off), **Hair** (off), **UV Maps** (on), **Normals** (on), **Materials** (on), **Mesh Colors** (on), **Generate Preview Surface** (on), **Generate MaterialX Network** (off), **Instancing** (on). **Exposed Overrides**: the attributes shown to the artist when publishing. |

## Templated workfile build

*Build/Update workfile blend scene.* A list of profiles, empty by default. A profile applies when it matches its filters, and its template configuration says what to do.

| Setting | Default | Description |
|---|---|---|
| Task types, Task names, Folder Types, Folder paths | | Filters that select when the profile applies. |
| Path to template | | The template workfile. |
| Keep placeholders | Off | Keep the placeholders after the build. |
| Apply to New Scene | Off | Apply the template to every new empty scene, as a "new file" template. |
| Apply on Blender launch | On | Apply the template when Blender starts and no workfile exists yet. |
| Save first workfile version | On | Save the first workfile version automatically. |
