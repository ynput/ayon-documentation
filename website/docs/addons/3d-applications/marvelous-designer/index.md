---
title: Marvelous Designer addon
sidebar_label: Overview
description: "The AYON integration for Marvelous Designer: the AYON plugin entry, the garment and fabric products it can create, publish and load, launch hooks, export options and requirements."
addon: marvelous_designer
addon_repo: ayon-marvelous-designer
addon_version: 1.1.4
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-marvelous-designer/tree/1.1.4
  - https://github.com/ynput/ayon-marvelous-designer/releases
  - https://help.ayon.app/en/articles/3284682-marvelous-designer-user-guide
  - https://help.ayon.app/en/articles/2112433-marvelous-designer-configuration
---

# Marvelous Designer addon

<AddonInfo />

The Marvelous Designer addon (addon name `marvelous_designer`, application group `marvelousdesigner`) connects Marvelous Designer to AYON. It registers an AYON plugin in the application, gives access to the Workfiles, Loader, Scene Inventory and Publisher tools, publishes garments as geometry and fabrics as `.zfab` presets, and loads avatars, animated caches and fabrics. Workfiles use the `.zprj` extension. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.8.0 or newer (compatible addon; not strictly required) |
| Applications addon | Defines the Marvelous Designer executables that the AYON Launcher starts |
| Qt binding | PySide6 in the Marvelous Designer Python environment, in the directory set in the [prelaunch settings](settings.md#prelaunch-settings) |

## AYON plugin

Marvelous Designer has no AYON menu. The addon ships a script, `ayon_plugins.py`, that Marvelous Designer lists in its plugin system as **ayon_plugins** (under **Plugins / Plug-in**). Running it opens a dialog with four buttons.

| Button | What it does |
|---|---|
| **Workfile...** | Opens the Workfiles tool. |
| **Load...** | Opens the Loader. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Publish...** | Opens the Publisher. |

Since 1.1.2 the launch hook **Install AYON plugins** writes the plugin entry into the `pluginSettings.json` file in the configured plugins directory, so the script is registered at launch. Before that release the script had to be added by hand in Marvelous Designer's plug-in manager. The script is located in the addon folder at `ayon_marvelousdesigner/deploy`.

## Products Marvelous Designer can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Model | `model` | The garment as static geometry |
| Point Cache | `pointcache` | The garment as animated geometry |
| Zfab | `zfab` | One fabric preset, with its physical properties and embedded textures |
| Workfile | `workfile` | The workfile itself, created automatically |

The Zfab creator has the option **Use selection**. When it is on, the fabric currently selected in the fabric list is stored in the instance. When it is off, the first fabric in the list is used.

### Export options

Model and point cache instances have these options in the Publisher.

| Option | Default | Description |
|---|---|---|
| **Export Garment** | On | Exports the garment (the 2D pattern group). |
| **Export Avatar** | Off | Includes the avatar group in the export. |
| **Single Object** | On | Exports the garment as a single object. |
| **Thin** | Off | The thin option of the export. |
| **XML MetaData** | On | Writes the metadata file of the export. |

The Marvelous Designer API has no "export selected": every pattern of the scene is exported as one object, so each garment that is published as its own product needs its own workfile.

## Publishing

### Extractors

Model and point cache instances are run through all three geometry extractors.

| Extractor | Product base types | Published as | Optional |
|---|---|---|---|
| Extract PointCache (Alembic) | `model`, `pointcache` | Alembic (`.abc`) | Yes |
| Extract OBJ | `model`, `pointcache` | OBJ (`.obj`), plus the XML metadata file (`xml`) when one was written | Yes |
| Extract FBX | `model`, `pointcache` | FBX (`.fbx`) | Yes |
| Extract Zfab | `zfab` | Fabric preset (`.zfab`) | No |

The geometry representations carry the up axis of the export and a scale derived from the export option as trait data.

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate No Fabric | That the fabric stored in the instance (by index and name) still exists in the scene. The repair action stores the currently selected fabric instead. | `zfab` |

### Other publish plugins

- **Save current workfile** saves the workfile before extraction.
- **Increment Workfile Version** saves the workfile as the next version after a publish. It is optional and fails when the publish was not successful.
- **Collectors** gather the current file, the workfile data and the export options.

## Loading

| Loader | Loads | Formats | What it does |
|---|---|---|---|
| Load Pointcache | Any product | `.abc`, `.fbx`, `.obj` | Imports the file, for example an avatar or an animated cache. The import scale comes from the loader setting **Scale**. |
| Load ZFab | `zfab` | `.zfab` | Adds the fabric to the fabric list. |

Loaded products are tracked, so they can be updated or removed from the Scene Inventory. The fabric loader can also switch versions and removes the fabric when the container is removed.

## Launch hooks

| Hook | Order | What it does |
|---|---|---|
| Install Qt binding | 11 | Installs PySide6 (6.10.1) into the Qt binding directory from the prelaunch settings and exports `QtDir` and `QT_PLUGIN_PATH`. Skipped, with a warning, when the directory does not exist. |
| Install AYON plugins | 12 | Adds the **ayon_plugins** script to `pluginSettings.json` in the plugins directory from the prelaunch settings. Skipped, with a warning, when the directory does not exist. |
| Create temp zprj file | 12 | Chooses the file to start with: an explicit workfile path, the last workfile when the launcher is set to start it, or else a copy of an empty default `.zprj` in a temporary folder. |

The addon also removes `QT_AUTO_SCREEN_SCALE_FACTOR` from the application environment.

## Related

- [Marvelous Designer settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
