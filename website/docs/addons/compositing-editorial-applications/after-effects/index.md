---
title: After Effects addon
sidebar_label: Overview
description: "The AYON integration for Adobe After Effects: the AYON panel, the render and workfile products it creates, publishing and farm rendering, loaders, validators, workfile templates, scripts and requirements."
addon: aftereffects
addon_repo: ayon-aftereffects
addon_version: 0.3.7
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-aftereffects/tree/0.3.7
  - https://github.com/ynput/ayon-aftereffects/releases
  - https://help.ayon.app/en/articles/9429657-working-with-after-effects-in-ayon
  - https://help.ayon.app/en/articles/4515672-aftereffects-addon-settings
---

# After Effects addon

<AddonInfo />

The After Effects addon connects [Adobe After Effects](https://www.adobe.com/products/aftereffects.html) to AYON. It provides a CEP extension that shows an **AYON** panel inside After Effects. The panel opens the pipeline tools, and the addon provides the plugins that create, publish and load products from After Effects projects (`.aep`). Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.1.2 or newer |
| AYON core addon | 1.8.0 or newer |
| Deadline addon | 0.7.0 or newer, compatible (only needed for farm rendering) |
| Applications addon | Defines the After Effects executables that the AYON Launcher starts |

The addon runs no services.

## AYON panel

The addon ships the extension `extension.zxp` (extension id `io.ynput.AE.panel`). A pre-launch hook can install it into the user's Adobe CEP extensions folder; it compares the installed and bundled extension versions and replaces the installed one when they differ (see [settings](settings.md)). The panel talks to the addon through a local web socket server. AYON works with one running After Effects instance at a time.

| Button | What it does |
|---|---|
| **Workfiles...** | Opens the Workfiles tool. |
| **Version Up Workfile** | Saves the workfile as the next version. Shown only when the version-up entry of the AYON menu is enabled in the core addon settings. |
| **Load...** | Opens the Loader. |
| **Publish...** | Opens the Publisher. |
| **Manage...** | Opens the Scene Inventory, which lists what is loaded in the project. |
| **Set Resolution** | Sets the resolution of the selected compositions from the task (or folder) attributes. |
| **Set Frame Range** | Sets the frame range and duration of the selected compositions from the task (or folder) attributes. |
| **Apply All Settings** | Applies both of the above. |
| **Create placeholder**, **Update placeholder** | Create or edit a placeholder for the templated workfile build. |
| **Build Workfile from template** | Builds the workfile from the template configured in the settings. |
| **Script Editor** | Opens the script editor tool. |
| **Run Scripts...** | Opens a window with the scripts configured as manual. |
| **Experimental Tools...** | Opens the experimental tools dialog. |

The addon can open the panel on every After Effects launch, with a startup script that it places in the After Effects Scripts/Startup folder.

## Products it can create

| Creator | Product base type | What it publishes |
|---|---|---|
| Render | `render` | A video or image sequence rendered from a composition through the After Effects Render Queue |
| Workfile | `workfile` | The `.aep` workfile itself. Created automatically and recreated when removed |

A **Render** instance is tied to one composition. When the instance is created, the composition is added to the Render Queue. By default it is also renamed to the product name, and its frame range, frame rate and resolution are set from the task. The original composition name is restored when the instance is removed. Each instance has two options.

| Option | Values | Meaning |
|---|---|---|
| Render target | Local machine rendering, Farm rendering, Use existing frames | Where and how the files are produced |
| Review | On or off | Also create a review from the render |

The creator can use the selected compositions or all compositions. The composition name can be placed in the product name with the `{composition}` placeholder of the product name templates; when several compositions are created at once the composition name is always added.

## Publishing

### Rendering

Render outputs come from the output module of the composition's Render Queue item. One output module per composition is expected.

| Render target | What happens |
|---|---|
| Local machine rendering | **Extract Local Render** renders the Render Queue item into a staging folder and publishes the files found there. The first representation is tagged for review when Review is on. |
| Farm rendering | The expected files are calculated in a `renders/aftereffects/<workfile name>` folder next to the workfile, and the instance gets the `render.farm` family and the `aerender` renderer. The Deadline addon submits the render and the publish job. |
| Use existing frames | Files already rendered from the Render Queue are collected and published, without rendering again. |

### Validators

| Validator | Checks | Applies to |
|---|---|---|
| Validate Scene Settings | That the composition's duration, and optionally frame range, handles, frame rate and resolution, match the task or folder attributes. Also that the workfile exists on disk under its name. Has a **Repair** action. | Render |
| Validate Footage Items | That the files of the footage used in the composition exist on the machine. After Effects fails silently on missing files. | Render |
| Validate Footage Location | That all footage of the project is stored under a project root, so that the farm and other machines can reach it. Has a **Select invalid footage** action. Off by default. | Project |
| Validate Rendered Files | That the files expected from the Render Queue exist, for instances that use existing frames. Has a **Repair** action. | Render |
| Validate Instance in Context | That the instance folder and task are the current context. Has a **Repair** action. | Instances |

### Other publish plugins

| Plugin | What it does |
|---|---|
| Collect After Effects Render Layers | Builds the render instances from the compositions and their Render Queue items. |
| Collect Review | Adds the `review` family to instances that have Review on. |
| Collect Audio | Collects the audio file of a farm-rendered composition. |
| Extract Compositions | Stores the composition names of the project in the workfile representation. |
| Extract Save Scene | Saves the project before extraction. |
| Increment Workfile | After a publish without errors, saves the workfile as the next version. Optional. |
| Clean render comp, Add render highlight | For farm renders, removes the publish icon from the composition name before submission and restores the name afterwards. |
| Close AE | Closes After Effects after a publish. For automated web publishing only. |
| Collect extension version | Compares the installed extension with the version of the addon. Optional. |

## Loading

| Loader | Loads | Notes |
|---|---|---|
| Load file | `image`, `plate`, `render`, `prerender`, `review`, `audio`, `workfile` | Imports files into the project. Representations with several files are imported as a sequence, interpreted at the frame rate of the version, task or folder. A `.psd` file is imported as a composition. |
| Load JSON Background | `background` | Reads a background JSON and builds a folder of images, with a composition that has one layer per image. |

Loaded items are tracked as containers, so they can be updated or replaced from the Scene Inventory.

## Workfile build and templates

Two settings areas exist: a template per task type (**Workfile Builder**), and profiles that use placeholders (**Templated Workfile Build Settings**). Placeholders are compositions that are created from the panel. Two placeholder plugins exist, **AfterEffects create** and **AfterEffects load**. Populating a create placeholder renames the composition, creates a `render` instance on it and applies the task's frame range and resolution.

## Scripts

Scripts (`.js`, `.jsx`) can be configured per project. Scripts marked **Auto** run when a workfile is opened. The others are listed in the **Run Scripts...** window. A script path can use keys of the current context, the project roots and environment variables.

## Color management

When enabled, After Effects follows the global color management of the core addon, with optional file rules of its own.

## Launch hooks

| Hook | Order | What it does |
|---|---|---|
| Install AYON extension | 1 | Installs or updates the extension when **Install AYON Extension** is on. |
| Open panel on first launch | 15 | Deploys the startup script that opens the panel when **Auto-open AYON Panel** is on, and passes the version-up menu option to the panel. |
| Launch arguments | 20 | Starts After Effects through the AYON launch script, with the last workfile or a given workfile path when one exists. |

The hooks apply to local launches only.

## Related

- [After Effects settings](settings.md)
- [Product types](../../../pipeline/product-types.md) and [publishing](../../../pipeline/publishing.md)
