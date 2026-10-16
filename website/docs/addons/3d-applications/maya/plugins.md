---
title: Maya hair, fur and USD plugins
sidebar_label: Plugins
description: "The third-party plugin integrations of the AYON Maya addon: Yeti, XGen, Ornatrix and Multiverse products, their validators, extractors, loaders and inventory actions."
addon: maya
addon_repo: ayon-maya
addon_version: 0.6.13
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-maya/tree/0.6.13
  - https://help.ayon.app/en/articles/4740816-working-with-yeti-in-ayon
  - https://help.ayon.app/en/articles/7485931-working-with-xgen-in-ayon
  - https://help.ayon.app/en/articles/7811185-working-with-ornatrix-in-ayon
  - https://help.ayon.app/en/articles/7718098-working-with-multiverse-in-ayon
---

# Maya hair, fur and USD plugins

<AddonInfo />

The [Maya addon](index.md) has creators, extractors, validators, loaders and inventory actions for four third-party Maya plugins: Yeti, XGen, Ornatrix and Multiverse. Each plugin has its own product base types. The creators for Ornatrix and Multiverse are off by default; the settings for them are on the [settings page](settings.md#creators). The renderers are on the [rendering page](rendering.md).

## Yeti

Yeti fur is handled in two modes: a **cache** that stores the simulated fur, and a **rig** that stores the Yeti node graph so it can be reconnected to animated geometry later.

| Product | Product base type | What it publishes |
|---|---|---|
| Yeti Cache | `yeticache` | A sequence of `.fur` files and a `.fursettings` file with the Yeti node settings, over the scene time range. The creator has **Submit to Farm**, **Preroll** (frames simulated before the cache starts), the frame range and **Samples** (default 3) |
| Yeti Rig | `yetiRig` | A Maya scene with the Yeti nodes, the Yeti rig settings (the input connections collected from the `input_SET`) and a one-frame Yeti cache |
| Unreal - Yeti Cache | `yeticacheUE` | Yeti caches for Unreal Engine, as Alembic |

| Plugin type | Plugin | What it does |
|---|---|---|
| Validator | Yeti Rig Cache State | Validates the input and output attributes of the Yeti nodes. A repair action fixes the errors |
| Validator | Yeti Rig Input Shapes In Instance | Checks that all input nodes of the rig are part of the instance hierarchy |
| Validator | Yeti Rig Settings | Checks that the input connections were collected for the nodes in the `input_SET` |
| Validator | Yeti Render Script Callbacks | Checks whether the pre and post render callbacks of Yeti are used during a render (`renderlayer` instances) |
| Loader | Load Yeti Cache (`.fur`) | Creates the Yeti nodes from the `.fursettings` file and points them to the cache files |
| Loader | Load Yeti Rig (`.ma`) | References the rig. The setting **Create Yeti Cache instance on load** (on by default) creates a `yeticache` instance for it |
| Inventory action | Connect Yeti Rig | Connects the rig with an animation or point cache |

## XGen

| Product | Product base type | What it publishes |
|---|---|---|
| Xgen | `xgen` | An `.xgen` file and a Maya scene, for one XGen collection. The creator has **Submit to Farm** |
| Workfile | `workfile` | When a render is submitted, the **Extract Workfile Xgen** plugin prepares the XGen side car files for the workfile. The **Reset Xgen Attributes** plugin restores the original attribute values after publishing |

The **Validate Xgen** validator checks that the instance has a single `xgmPalette` node (called a collection in Maya), that the collection has no inactive modifiers, and that the collection has a namespace. The **Reference Xgen** loader (`.ma`, `.mb`) references published XGen data, and **Connect Xgen** connects it with an animation or point cache in the Scene Inventory.

## Ornatrix

| Product | Product base type | What it publishes |
|---|---|---|
| Ornatrix Cache | `oxcache` | Ornatrix procedural nodes as Alembic (`.abc`) with a cache settings file. Creator options include **Submit to Farm**, the frame range, **Format** (Ogawa or HDF5), **Use Render Version**, **Up Direction** and the export switches for strand data, strand ids and groups, widths, texture coordinates, normals and velocities |
| Ornatrix Rig | `oxrig` | A Maya scene and the rig settings of Ornatrix nodes, and the Alembic cache |

| Plugin type | Plugin | What it does |
|---|---|---|
| Validator | Validate Ornatrix Cache Content | Checks that the instance follows the content rules of the `oxcache` product base type (also used for `oxrig`) |
| Validator | Validate Ornatrix Rig Content | Checks the content rules of the `oxrig` product base type |
| Loader | Ornatrix Alembic Loader (`.abc`) | Loads a cache with import options |
| Loader | Load Ornatrix Rig (`.ma`) | References the rig. **Create Ornatrix Cache instance on load** (on by default) creates a cache instance |
| Inventory action | Connect Ornatrix Rig | Connects the rig with an animation or point cache |

## Multiverse

All Multiverse creators are off by default and publish USD data through the Multiverse plugin.

| Product | Product base type | Published as |
|---|---|---|
| Multiverse USD Asset | `usd` (family also `mvUsd`) | A `.usd` file, or `.usdz` |
| Multiverse USD Composition | `mvUsdComposition` | A `.usda` composition file, with layers written as compound layers when the option is set |
| Multiverse USD Override | `mvUsdOverride` | A `.usda` override file |
| Multiverse Look | `mvLook` | USD look data. The creator has a file format and **Publish MipMap** |

The creators expose the Multiverse export options (for example **Strip Namespaces**, **Merge Transform and Shape**, **Write Ancestors**, **Flatten Content** and what an override writes: transforms, visibility, attributes, materials, variants). The loaders are **Load USD to Multiverse** (`.usd`, `.usda`, `.usdc`, `.usdz`, `.abc`) and **Load Usd Override into Compound**; both are off by default. A Multiverse look is loaded with the **Reference** loader.
