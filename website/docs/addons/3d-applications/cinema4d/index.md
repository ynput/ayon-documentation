---
title: Cinema4D addon
sidebar_label: Overview
description: "The AYON integration for Cinema4D: the AYON menu, the products Cinema4D can create, publish and load, the validators and extractors it provides, render takes, color management and its requirements."
addon: cinema4d
addon_repo: ayon-cinema4d
addon_version: 0.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-cinema4d/tree/0.2.0
  - https://github.com/ynput/ayon-cinema4d/releases
  - https://help.ayon.app/en/articles/7284251-working-with-ayon-in-cinema4d
  - https://help.ayon.app/en/articles/4858866-configure-cinema4d-addon
---

# Cinema4D addon

<AddonInfo />

The Cinema4D addon connects Maxon Cinema 4D to AYON. Inside Cinema 4D it adds an AYON menu that opens the pipeline tools, and it provides the plugins that create, publish and load products from Cinema 4D scenes. Cinema 4D workfiles use the `.c4d` extension. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.8.2 or newer (required) |
| Deadline addon | 0.7.0 or newer, when it is in the same bundle (compatible addon; needed for Cinema 4D render submission) |
| Applications addon | Defines the Cinema 4D executables that the AYON Launcher starts |
| Qt binding | A `PySide6` or `PySide2` package that matches the Python version of the Cinema 4D release, available to Cinema 4D |

The addon contains a hook that is meant to install PySide into Cinema 4D's Python packages before launch. In version 0.2.0 the hook does nothing, so the Qt binding has to be present already. Several features also need the Redshift renderer: Redshift Proxy, loading VDB files to Redshift, the default render settings, and the colorspace values applied to the Redshift renderer.

Known issue: the Redshift render view may be scaled wrongly on high DPI monitors because of Qt scaling variables that AYON sets. Setting the environment variable `QT_AUTO_SCREEN_SCALE_FACTOR` to `0` in the application environment is the suggested workaround.

## AYON menu

The addon registers an **AYON** menu in Cinema 4D's main menu bar. The first entry is a label showing the current folder path and task name.

| Entry | What it does |
|---|---|
| **Create...** | Opens the Publisher on its create tab, to create publish instances. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher on its publish tab. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the scene. |
| **Library...** | Opens the Library Loader. |
| **Workfiles...** | Opens the Workfiles tool. |
| **Reset Frame Range** | Sets the scene's frame range and frame rate from the current task. |
| **Reset Scene Resolution** | Sets the render resolution from the current task. |
| **Reset Colorspace** | Sets the document's color management to OCIO from the project's OCIO configuration and, when the workfile color management setting is enabled, applies its render space, display and view. |
| **Reset Render Settings** | Applies a default render setup (see [Render takes](#render-takes)). |
| **Experimental Tools** | Opens the experimental tools dialog. |

## Products Cinema4D can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Camera | `camera` | A single baked camera. Has the option **Bake to World Space** (on by default); when off, the parent hierarchy is included in the baked result. |
| Pointcache | `pointcache` | Geometry as an Alembic point cache |
| Redshift Proxy | `redshiftproxy` | A Redshift proxy |
| Render | `render` | Renders, one instance for each take (see below) |
| Review | `review` | A viewport render for review |
| Workfile | `workfile` | The workfile itself, created automatically |

## Render takes

The Render creator works on Cinema 4D takes. Creating a render instance adds a take named after the variant, or marks an existing take with that name. After the first render instance exists, every take in the scene is collected as a render instance. Each take can override render settings, so frame range, renderer and output paths are read from the take's effective render data.

Render instances are flagged as farm instances and rely on the Deadline addon for submission. The collector computes the expected output files, supports the Redshift renderer, and records the scene's OCIO configuration, display, view and render colorspace for the published renders.

**Reset Render Settings** sets Redshift as the renderer, saves only the multi-pass image (the regular image is not saved), uses the output path `./renders/cinema4d/$prj/$take/$pass` with a pass-name suffix, enables a multi-layer file and sets its format to EXR.

## Publishing

### Extractors

| Product base type | Published as |
|---|---|
| `camera` | Alembic (`.abc`) |
| `pointcache` | Alembic (`.abc`) |
| `redshiftproxy` | Redshift proxy (`.rs`), with frame numbers added to the file names |
| `review` | `.mp4` viewport playblast over the frame range including handles |
| `render` | Rendered images, produced by the render farm |

### Validators

| Validator | Checks | Applies to | Optional |
|---|---|---|---|
| Validate Frame Range | That the instance's frame start, frame end and handles equal those of the task (or folder). The repair action resets the frame range. | Camera, pointcache, Redshift proxy, render, review | Yes |
| Validate Resolution | That the take's render width, height and pixel aspect equal the values of the AYON context. The repair action fixes it. | Render | Yes |
| Validate Render Relative Paths | That the regular image path and the multi-pass image path (when those outputs are saved) are absolute, because the scene renders from the published location and a relative path would send the output to the publish folder. | Render | No (not configurable in settings) |

### Other publish plugins

- **Increment current file** saves the workfile as the next version after a publish. It is optional.
- **Save current file** saves the scene before extraction.
- **Collectors** gather the active document, the current file, the instances, the workfile data and the render data.

## Loading

| Loader | Loads | Formats |
|---|---|---|
| Load Alembic | Any product | `.abc` |
| Load Camera | `camera` | `.abc` |
| Load Redshift Proxy | Any product | `.rs` |
| Load VDB to Redshift | Any product | `.vdb`, as a Redshift volume |
| Load VDB to Volume Loader | Any product | `.vdb`, as a Cinema 4D volume loader |
| Load XRef | Any product | `.c4d`, `.fbx`, `.abc`, as an XRef object |
| Set frame range | Animation, camera, pointcache, vdbcache, usd, render, plate, mayaScene, review | Any; sets the frame range without handles |
| Set frame range (with handles) | The same products | Any; sets the frame range including handles |

Loaded products are tracked, so they can be updated or removed from the Scene Inventory.

## Color management

When enabled, Cinema 4D follows the studio's global color management through the OCIO configuration of the core addon. File rules map file patterns to colorspaces, and the workfile color management settings define the default render space, display, view and thumbnail space that **Reset Colorspace** applies.

## Related

- [Cinema4D settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
