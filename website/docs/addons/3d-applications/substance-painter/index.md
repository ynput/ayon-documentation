---
title: Substance Painter addon
sidebar_label: Overview
description: "The AYON integration for Substance Painter: the AYON menu, loading the project mesh, publishing texture sets with their options and validator, shelves, color management and requirements."
addon: substancepainter
addon_repo: ayon-substance-painter
addon_version: 0.3.6
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-substance-painter/tree/0.3.6
  - https://github.com/ynput/ayon-substance-painter/releases
  - https://help.ayon.app/en/articles/2948998-working-with-substance-painter
  - https://help.ayon.app/en/articles/6244730-substance-painter-addon-settings
---

# Substance Painter addon

<AddonInfo />

The Substance Painter addon connects Substance Painter to AYON. It runs as a Substance Painter plugin (`ayon_plugin`) that adds an AYON menu, loads published meshes as the project mesh, publishes texture sets as separate `image` products, and can add shelves to the application. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Substance Painter executables that the AYON Launcher starts (application group `substancepainter`) |
| OpenImageIO | Needed only by the Extract TX plugin, for the `maketx` tool |

Release 0.3.2 fixed the automatic loading of the plugin in Substance Painter 12 and newer, and the loading of the colorspace configuration in version 12.0.0.

## AYON menu

The addon adds an **AYON** menu to Substance Painter.

| Entry | What it does |
|---|---|
| **Create...** | Opens the Publisher on its create tab. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the project. |
| **Library...** | Opens the Library Loader, for products of library projects. |
| **Work Files...** | Opens the Workfiles tool. |

When a project is opened and it holds outdated loaded content, a popup offers to open the Scene Inventory.

## Workfiles

The workfile host handles the extensions `.spp` and `.toc`. AYON context data, loaded containers and publish instances are stored as metadata in the Substance Painter project, so a texture set instance is configured once per workfile.

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Textures | `textureSet` | The texture sets of the project, exported with an output template |
| Workfile | `workfile` | The workfile itself. It is an auto-creator that runs when a project is open. |

The Textures creator needs an open project. In Substance Painter 10 and newer it can also use the layer stack nodes that are selected when the instance is created. It has these options:

| Option | What it controls |
|---|---|
| Review | Marks the published images as reviewable. On by default. |
| Flatten Texture Sets As One Texture Output | Exports several texture sets as one output, without the texture set name in the product names. Off by default. |
| Export Texture Set(s) | The texture sets to export. When none is selected, all are exported. |
| Export Channel(s) | The channels to export alone. When none is selected, all channels are exported. The list comes from the **Channel Mapping** setting. |
| Output Template | The Substance Painter export preset (`.spexp`) that defines the output maps. |
| Allow Skipped Output Maps | Lets the publish ignore output maps that Substance Painter skips because the project lacks the channels they need. On by default. |
| File type | The image format, or the format of the output template. |
| Size | The texture size from 128 to 8192, or the size of each texture set. |
| Padding | No padding (passthrough), or dilation: infinite, transparent, default background color or diffusion. Default is infinite. |
| Dilation Distance | The dilation distance from 0 to 256, used only with the dilation paddings. Default is 16. |

## Publishing

### Extractors

| Plugin | Product base type | Published as |
|---|---|---|
| Extract Texture Set | `textureSet` | Texture image files, written by the Substance Painter export using the collected export configuration. The texture set instance itself is not integrated. |
| Extract TX | `image` | An extra `tx` representation made with OpenImageIO's `maketx`, converting from the colorspace of the image to the rendering role colorspace of its OCIO config. Images without colorspace data are skipped. Optional, see the [settings](settings.md). |

A texture set is published as separate `image` products: one per output map, per texture set and stack, and per UDIM sequence. The product name is built from the variant of the texture set instance plus the texture set name, stack name, UV tile name and the map name taken from the output template, with the tokens such as `$mesh` and the colorspace and UDIM parts removed. The images are grouped per variant in the Loader. UDIM tiles are published as one representation that lists its tiles, and the images carry the colorspace reported by the export. When the Review option is on, the representations carry the `review` tag and get the frame range 1001 to 1001, or the range of the UDIM tiles. The product type of the images comes from the **Product type items** setting of the Textures creator; without it they are `image` products.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate output maps | That the selected export channels exist, then runs a minimal 2x2 test export to confirm that every output map of the template is generated. A map that is missing is disabled when **Allow Skipped Output Maps** is on, and an error otherwise. | Texture set |

### Other publish plugins

- **Current Workfile** gathers the path of the open file; since 0.3.3 it runs early.
- **Workfile representation** publishes the current file as the representation of a workfile instance.
- **Collect Texture Set images**, **Texture Set Staging Dir** and **Collect Export Preset for Single Texture Output** build the export configuration and the image instances of a texture set.
- **Save current workfile** saves the project before extraction, when it has unsaved changes. It stops the publish with an error when a different workfile was opened during the publish.
- **Increment Workfile Version** is optional. After a successful publish it saves the workfile as the next version.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load mesh | Any product | `.abc`, `.fbx`, `.obj`, `.gltf`, `.usd`, `.usda`, `.usdc` |

The loader asks for a project template (from the **Load Mesh** setting) and whether to import cameras and to preserve strokes. Without an open project it creates a new Substance Painter project from the mesh with the chosen template. With an open project it reloads the mesh of that project, because a project has exactly one mesh. The mesh is then tracked as a loaded product, so it can be updated or switched in the Scene Inventory. Updates always preserve strokes and keep the camera choice made at load time.

## Shelves

The **Shelves** setting lists folders that are added to Substance Painter as shelves when it starts. Paths can use template keys, such as the project roots. A path that fails to load is reported and skipped.

## Color management

When enabled, Substance Painter follows the studio color management, with host-specific file rules that map file patterns to colorspaces. See the [settings](settings.md).

## Related

- [Substance Painter settings](settings.md)
