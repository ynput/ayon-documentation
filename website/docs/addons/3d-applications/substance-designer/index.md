---
title: Substance Designer addon
sidebar_label: Overview
description: "The AYON integration for Substance Designer: the AYON menu, project templates, the texture set and SBSAR products, publishing, texture loading, color management and requirements."
addon: substancedesigner
addon_repo: ayon-substance-designer
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-substance-designer/tree/0.2.1
  - https://github.com/ynput/ayon-substance-designer/releases
  - https://help.ayon.app/en/articles/8280887-working-with-substance-designer-in-ayon
  - https://help.ayon.app/en/articles/4514163-configure-substance-designer-addon
  - https://help.ayon.app/en/articles/7771155-substance-designer-addon-settings
---

# Substance Designer addon

<AddonInfo />

The Substance Designer addon connects Substance Designer to AYON. It runs as a Substance Designer plugin (`ayon_plugin`) that adds an AYON menu, can build the initial package from a template when Substance Designer starts, and provides the plugins that publish texture sets and SBSAR files and load textures. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | Defines the Substance Designer executables that the AYON Launcher starts (application group `substancedesigner`) |

## AYON menu

The addon adds an **AYON** menu to the Substance Designer menu bar.

| Entry | What it does |
|---|---|
| **Create...** | Opens the Publisher on its create tab. |
| **Load...** | Opens the Loader, filtered to the current context. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the package. |
| **Library...** | Opens the Library Loader, for products of library projects. |
| **Version Up Workfile** | Saves the workfile as the next version. Shown only when the matching core addon setting is enabled. |
| **Work Files...** | Opens the Workfiles tool. |

## Workfiles

The workfile host handles the extensions `.sbs`, `.sbsar` and `.sbsasm`; the last two are read-only. AYON context data and the publish instances are stored as metadata in the package of the current graph, so that metadata must not be removed.

## Project templates

When Substance Designer starts and no last workfile is to be opened (or the last workfile does not exist), the addon builds a package from the **Project Creation** settings. Each template entry adds one graph, named after its **Graph Name**, to a temporary package `temp_ayon_package.sbs` and sets the output size of that graph to the entry's **Document Resolution**. Work that stays in the temporary package is lost unless it is saved through the Workfiles tool.

| Template type | Source of the graph |
|---|---|
| Default Substance Template | A template shipped with Substance Designer, chosen by name (for example Metallic Roughness or Specular Glossiness). |
| Custom Template | A named graph in an `.sbs` file. The path supports template keys. The entry is skipped when the graph name or path is empty, or the file does not exist. |
| Template By Task Types | An `.sbs` file whose path supports template keys. The graph taken from it is the one whose identifier equals the current task name. The entry is skipped when the file does not exist. |

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Textures | `textureSet` | The output maps of one or more graphs as image files |
| Sbsar | `sbsar` | The package exported as an SBSAR file |
| Workfile | `workfile` | The workfile itself. It is an auto-creator, so the instance is made by AYON rather than by the artist. |

The Textures creator cannot be used without a current graph. It has these options:

| Option | What it controls |
|---|---|
| Review | Marks the published images as reviewable. |
| File type | The image format: bmp, dds, jpeg, jpg, png, tga, tif, surface, hdr, exr, jif, jpe or webp. |
| Graphs To be Exported | The graphs of the package to export. When none is selected, all graphs are exported. |
| Graph Outputs To be Exported | The output maps to export. When none is selected, all outputs of the graphs are exported. Publishing fails when a selected output does not exist in a graph. |

## Publishing

### Extractors

| Plugin | Product base type | Published as |
|---|---|---|
| Extract Textures as Graph Outputs | `textureSet` | One image file per graph and output map, in the chosen file type. The texture set instance itself is not integrated. |
| Extract SBSAR | `sbsar` | An `.sbsar` file, exported from the package of the graph named on the instance |

A texture set is published as separate `image` products, one for each graph and output map. Their product names combine the instance name, graph name and map identifier, and they are grouped per graph in the Loader. Their representations carry the `review` tag, and the instances get the `review` family when the Review option is on. Color management data is attached to each image: the working colorspace of Substance Designer for the `diffuse` and `basecolor` maps, and the raw colorspace for every other map.

### Other publish plugins

- **Current Workfile** gathers the path of the open file; since 0.2.1 it runs early.
- **Workfile representation** publishes the current file as the representation of a workfile instance.
- **Collect Texture Set images** and **Texture Set Staging Dir** create the image instances of a texture set and share its staging directory with them.
- **Save current workfile** saves the file before extraction, when it has unsaved changes. It stops the publish with an error when a different workfile was opened during the publish.
- **Increment Workfile Version** is optional. After a successful publish it saves the workfile as the next version.

The addon provides no validators.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Texture | `image` and `textures` products | Any file type |

The loader imports each file as a bitmap resource into a resource folder named `<project>_resources` in the current package. The **Resource Loading Options** choose how the file is stored: Linked (the default), CopiedAndLinked or BinaryEmbedded. Updating a loaded texture creates a new bitmap resource, because the path of an existing resource cannot be changed. Removing it deletes the bitmap resource and the AYON metadata.

## Color management

When enabled, Substance Designer follows the studio color management, with host-specific file rules that map file patterns to colorspaces. See the [settings](settings.md).

## Related

- [Substance Designer settings](settings.md)
