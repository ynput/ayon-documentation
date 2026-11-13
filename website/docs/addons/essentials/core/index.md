---
title: Core addon
sidebar_label: Overview
description: "The AYON core addon: the base of the AYON pipeline with the artist tools (Launcher, Workfiles, Loader, Publisher, Scene Inventory), the shared publish plugins, launch hooks, color management and the studio-wide settings."
addon: core
addon_repo: ayon-core
addon_version: 1.10.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-core/tree/1.10.1
  - https://github.com/ynput/ayon-core/releases/tag/1.10.1
  - https://help.ayon.app/en/help/articles/3005275-core-addon-settings
  - https://help.ayon.app/en/help/articles/1279384-colorspace-settings
  - https://help.ayon.app/en/help/articles/3945756-applications-and-tools
---

# Core addon

<AddonInfo />

The core addon is the base of the AYON pipeline. It provides the base classes that every application integration builds on, the graphical tools that artists use (Launcher, Workfiles, Loader, Publisher, Scene Inventory and others), the publish plugins that work in every application, the global launch hooks, the color management logic and the settings that apply to the whole studio. It is also the main command line handler of the AYON Launcher. Integrations for specific applications, such as Blender or Maya, are separate addons that depend on it. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.14.0 or newer, below 2.0.0 |
| AYON Launcher | 1.5.4 or newer |
| Required addons | None |
| Compatible addons | `ayon_third_party` 1.3.0 or newer, `ayon_ocio` 1.2.1 or newer, `applications` 1.1.2 or newer, `deadline` 0.6.0 or newer, `harmony` above 0.4.0, `fusion` 0.3.3 or newer, `openrv` 1.0.2 or newer, `traypublisher` 0.3.0 or newer |

The core addon has no services. The built-in OCIO configs in the color management settings come from the `ayon_ocio` addon.

## Dependencies that are not declared

Core lists `ayon_third_party` and `ayon_ocio` only as compatible addons, which does not require them to be in a bundle, but uses both:

| Addon | How Core uses it | Without it |
|---|---|---|
| `ayon_third_party` | The helpers that return the FFmpeg and OpenImageIO command lines (`get_ffmpeg_tool_args`, `get_oiio_tool_args`) import it first. They are used by many publish plugins, among them the review, thumbnail, OTIO and slate extractors and the OIIO post-process extractor. | The import fails and the log shows `!!! Failed to import 'ayon_third_party' addon.` Core then looks for the tool in the folders of the `AYON_FFMPEG_PATHS` or `AYON_OIIO_PATHS` environment variable and then on the system `PATH`. If none is found, the plugins that need the tool cannot run. |
| `ayon_ocio` | Sets the global environment variable `BUILTIN_OCIO_ROOT`. The default color management profile and every built-in config in the settings are paths of the form `{BUILTIN_OCIO_ROOT}/...`. | The path template cannot be solved (`TemplateUnsolved ... Missing keys: "BUILTIN_OCIO_ROOT"`). A custom OCIO config path, a published `ocioconfig` product or disabled color management avoid the variable, but the settings have to be changed for that. |

A bundle that leaves out these two addons is not rejected. The errors appear at publish time.

## Artist tools

The tools are Qt windows. Application integrations open them from the AYON menu, and some can also run outside an application.

| Tool | What it does |
|---|---|
| Launcher | Lists projects, folders and tasks and starts applications for a task. Its actions come from addons, such as the applications defined in the Applications addon. |
| Workfiles | Opens, saves and versions workfiles of a task, using the workfile templates of the project anatomy. It can also list published workfiles. |
| Creator and Publisher | Create the publish instances of a workfile and publish them. The Publisher runs the collect, validate, extract and integrate plugins and shows reports and error details. |
| Loader | Browses products and versions of the project and loads them into the application with a loader plugin, or runs a loader action. |
| Scene Inventory | Lists the containers loaded in the scene and updates, switches or removes them. |
| Push to project | Pushes versions to another project (select context dialog). |
| Delivery | Delivers representations of selected versions to a location, using a delivery template. |
| Browser | A table view of project content whose right-click menu offers loader actions. |
| Publish report viewer | Opens a saved publish report. |
| AYON Console | Shows console output and offers an interpreter. |
| Experimental tools | A dialog that enables **New publisher** for some hosts (CelAction, Flame, Harmony, Hiero, Resolve) and the **Pyblish Debug Stepper**. |
| Workfile template build | The windows for building a workfile from a template and managing its placeholders. |

The tray application and the web server of the AYON Launcher also live in the addon.

## Launcher actions

| Action | What it does |
|---|---|
| Explore here | Opens the folder of the context in the file explorer. |
| Show in AYON | Opens the AYON web page of the current context. |

## Loader actions

Loader actions are available in the Loader and in the Browser context menu.

| Action | What it does |
|---|---|
| Copy file / Copy file path | Copies a published file, or its path, to the clipboard. One entry per representation. |
| Create Hero Version | Creates a hero version from the selected version. |
| Delete Versions | **Old versions** removes versions beyond a number to keep, **Selected versions** removes the selected ones, and **Calculate Versions size** reports the size. Each can remove the publish folder. |
| Deliver Versions | Opens the delivery tool for the selected versions. |
| Export OTIO | Exports the selected items as an OpenTimelineIO file. |
| Open file | Opens an image sequence or video with the system default application. |
| Push to project | Opens the Push to project tool. |

The Scene Inventory has one core action, **Remove and load**, which deletes an inventory item and loads it again.

## Launch hooks

The core addon registers pre-launch hooks that run when the AYON Launcher starts an application.

| Hook | What it does |
|---|---|
| Global host data hook | Prepares host data for the launch (runs first). |
| Copy template workfile | Copies the workfile template for the task into the work folder. Applies to After Effects, Blender, Photoshop, TVPaint and Wrap. |
| Add last workfile to launch args | Adds the last workfile to the launch arguments, controlled by the setting **Open last workfile on launch**. Applies to a list of applications. |
| Create workdir extra folders | Creates the folders from **Extra work folders** in the work directory. |
| OCIO environment hook | Sets the OCIO environment variable for the application from the color management settings. Applies to a list of hosts that includes Maya, Houdini, Nuke, Blender, Fusion and Resolve. |
| Remove launcher paths | Removes launcher paths from the environment of the application. |
| Filter farm environments | For farm publish jobs, removes or rewrites environment variables according to **Filter farm environment**. |
| Launch with terminal, New console apps | Platform specific launch arguments (macOS terminal launch; Foundry applications such as Nuke and Hiero). |

## Publish plugins

The plugins below run for every application. Application addons add their own. Plugins marked "setting" are configurable in the [publish plugin settings](settings.md#publish-plugins).

### Collectors

| Plugin | What it does |
|---|---|
| Collect Current context, Context Entities, Instance entities | Collect the project, folder and task and the entities of instances. |
| Collect Anatomy Context Data, Collect Anatomy Instance data (setting) | Collect the data used to fill the anatomy templates. Version numbering is configurable. |
| Collect Scene Version (setting) | Reads the version number from the workfile name for selected hosts. |
| Collect Folder Audio (setting) | Collects the last published audio of the folder for review instances. |
| Comment per instance (setting) | Lets the artist enter a comment for each instance. |
| Collect Version Status (setting) | Sets the status of the published version, optionally editable by the artist. |
| Collect Version Tags (setting) | Lets the artist pick version tags. |
| Collect Version to List (setting) | Adds published versions to a list defined by profiles. |
| Choose Explicit Resolution (setting) | Adds a resolution choice to instances. |
| Collect Frames to Fix (setting) | Adds a field for frames to re-render (Nuke render and prerender instances). |
| Collect Hierarchy (setting) | Collects hierarchy data from the `parents` of instances. |
| Collect USD Layer Contributions, Collect USD Custom Contributions (settings) | Prepare the USD department layer contribution workflow. |
| Collect Managed Staging Directory | Applies a matching **Custom Staging Dir Profile** to an instance. |
| Collect rendered frames | Collects rendered files that were described by JSON files. |
| Collect Custom Frame Range | Collects a custom frame range for render submission. |
| OTIO collectors | Collect ranges, resources and review tracks from OpenTimelineIO data. |
| Other collectors | Collect addons, current user, host name, machine name, time and date, resource paths, source, settings, input representations and the versions loaded in the scene. |

### Validators

| Plugin | What it checks |
|---|---|
| Validate File Saved | The workfile has a saved file name. Offers actions to save the next version and to show the Workfiles tool. |
| Validate Folder entities | Every instance has a folder entity, unless the context has one. |
| Validate Product Uniqueness | No two instances that will be published publish to the same folder and product. It does not compare with products that already exist. |
| Validate Version (setting) | The version to publish is higher than the latest version in AYON. |
| Validate Outdated Containers (setting) | The containers loaded in the scene are at their latest version. |
| Validate Intent (setting) | An intent was selected for the publish. |
| Validate publish dir | For in-place publishing with the `source` template, the files are inside a project root. |
| Resources | Mapped resources exist, carry `source` and `files`, and do not collide on the same publish path. |
| Validate File Sequences | Something was collected in a farm or file-sequence publish. |
| Validate Editorial Asset Name (setting) | Listed in the settings. The plugin itself is not part of the core addon. |
| Unicode Strings | A collector that checks that environment variables are strings. |

### Extractors

| Plugin | What it does |
|---|---|
| Extract Review (setting) | Creates review media with FFmpeg from representations tagged `review`. |
| Extract burnins (setting) | Burns text overlays into review outputs tagged `burnin`. |
| Extract Thumbnail, Extract Thumbnail from source (settings) | Create thumbnails from instances or from an artist-provided image. |
| Transcode color spaces, OIIO Post Process (settings) | Convert representations with `oiiotool`. |
| Extract OTIO review, audio tracks, file and trimming | Prepare review, audio and workfile data from OpenTimelineIO. |
| Extract Colorspace data | Adds colorspace data to representations. |
| Review with Slate frame, Slate Data | Add a slate frame to review media (Nuke and shell hosts). |
| Extract Scanline EXR | Converts tiled EXR files to scanline with `oiiotool`. |
| Extract Hierarchy To AYON | Creates folder entities in AYON from collected hierarchy data. |
| Extract USD Department Layer Contributions, Extract USD Asset/Shot Contributions (settings) | Write department layers and the combined `usdAsset` or `usdShot`. |

### Integrators

| Plugin | What it does |
|---|---|
| Integrate Asset | Registers the version and representations in AYON and copies the files to their destinations. |
| Integrate Traits of an Asset | Integrates representations with traits. |
| Product Group (setting) | Sets the product group from a template. |
| Integrate Hero Version (setting) | Keeps an unversioned copy of the latest publish. |
| Attach reviewables (setting) | Attaches the reviewable of one instance to another. |
| Integrate AYON Review, Integrate Thumbnails to AYON, Override Integrate Thumbnail Representations (setting) | Upload and register review media and thumbnails. |
| Connect Dependency InputLinks AYON | Connects version dependency links. |
| Integrate Version Attributes, Integrate Versions to List | Set version attributes and add versions to lists. |
| Integrate Resources Path | Generates the directory for resources of selected product types. |

### Clean up

| Plugin | What it does |
|---|---|
| Clean Up (setting) | Deletes temporary staging files after a successful publish. |
| Explicit Clean Up | Deletes files and folders that plugins marked for removal. |
| Clean Up Farm (setting) | Deletes staging folders after a farm publish. |

## Color management

The core addon holds the global color management settings. When **Enable Color Management** is on, the OCIO config of a context comes from the best matching **OCIO config profile** (the one with the most matching filters; the earliest wins a tie). A profile can use a built-in config of the `ayon_ocio` addon, a path to a config file, a published `ocioconfig` representation (with a fallback config) or disable OCIO management. The path can use anatomy keys. **File Rules** assign a colorspace to files by regular expression and extension, for use when a published or loaded file has no colorspace data. A host can activate its own file rules, which then replace the global rules for that host. The image-related plugins (Extract Review, Thumbnail, OIIO transcode) use the colorspace information of the representations.

## Other features

| Feature | Description |
|---|---|
| Disk mapping | Maps paths per platform when the launcher starts. |
| Global and project environments | Environment variables applied to AYON processes and, per project, to launched applications. |
| Project folders | A folder structure that the **Create project folders** action creates on disk. |
| Additional plugin paths | Folders with custom create, publish and load plugins that are registered for a project. |
| Version start | Sets the first version number of products and workfiles per context. |
| Product naming and creator filtering | Product name templates and per-context limits on the creators shown in the Publisher. |

## Related

- [Core addon settings](settings.md)
