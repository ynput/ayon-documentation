---
title: Loader
description: "The Loader tool of AYON integrations: browsing published products, versions and representations of a project and running load actions on them in the open scene."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/4345209-loader
---

# Loader

The Loader lists the products that were published to a project and brings them into the scene of the running DCC application. For the selected products it shows versions, statuses and representations, and it offers the actions that are compatible with the selection: loaders of the integration (load, reference, import and so on) and general actions such as copying a file path. The result of a load is a container in the scene, which the [Scene Inventory](scene-inventory.md) manages afterwards.

## Where it appears

| Item | Value |
|---|---|
| Menu entry | **Load...** in the AYON menu of the DCC integrations. Some integrations add **Library...**, which opens the same tool. |
| Window title | **AYON Loader**, followed by the host name (legacy interface), or **AYON Browser**, followed by the host name (default interface, see below). |
| Standalone | The same windows open without a host from the tray menu entry **Browser** and the `browser` command of the launcher. They are titled **AYON Browser**. |

### Two interfaces

The integrations call the tool **Loader** in both cases. Which window opens depends on the core addon setting **Tools** > **Loader** > **Use legacy loader** (off by default) and on the environment variable `AYON_USE_LEGACY_LOADER` (`1` or `0`), which has priority over the setting.

| Interface | Used when | Described on |
|---|---|---|
| Browser interface | Legacy loader is off | [Browser](browser.md) |
| Loader interface | Legacy loader is on | This page |

The loader plugins of the integration, the loader actions, versions, containers and the **In scene** state work the same way in both. Differences are listed in the sections below.

## Layout

The window has three vertical sections separated by splitters.

| Section | Content |
|---|---|
| Left | Project selection, folder filter and tree, task list. |
| Middle | Product filter bar, the **Enable grouping** checkbox and the products tree. |
| Right | Thumbnail, **Version Info** and the representations list. |

### Project selection

| Control | What it does |
|---|---|
| Project combobox | Chooses the project to load from. With a host, only the project of the current context and library projects are listed. Without a host, all active projects are listed. |
| **Select the current context** button | Selects the project and folder of the current context. Visible when the application has a project context. |
| **Refresh** button | Reloads projects, folders and products. The window does not refresh itself while it is open. |

A project becomes available for loading by being marked as a library project in the project settings of the web app.

### Folders and tasks

| Control | What it does |
|---|---|
| **Folder name filter...** input | Filters the folder tree by name. |
| My tasks toggle | Limits folders and tasks to those where the signed in user is an assignee. |
| Folder tree | Folders of the project. Several folders can be selected; the products of all of them are listed. |
| Task list | Columns **Task name**, **Task type** and **Folder**. Selecting tasks limits the products, and the versions offered per product, to those published from the selected tasks. The entry **No task** matches versions without a task. |

### Products tree

The tree lists one row per product. Products with a shared name in several folders are merged under a row that shows the name and the count, marked by a colored dot. Selecting a merged row highlights its folders in the folder tree with that color. With **Enable grouping** on (default), products that have a product group are shown below a group row.

| Column | Content |
|---|---|
| **Product name** | Name with the icon of the product type. |
| **Product type** | Product type. |
| **Product base type** | Product base type. Hidden when the pipeline code does not support product base types. |
| **Folder** | Folder of the product. Visible only when more than one folder is selected. |
| **Version** | A drop-down per product. The default is the latest version. Hero versions are written in square brackets, for example `[v003]`. The list follows the active filters for task, status and tags. |
| **Status** | Version status with its icon and color. |
| **Time** | Publish time in relative form. |
| **Author** | The user who published the version. |
| **Frames** | Frame range. |
| **Duration** | Number of frames. |
| **Handles** | Handle start and end. |
| **Step** | Frame step. |
| **In scene** | **Yes** (green) when a container of the product is in the open scene, **No** (grey) otherwise, **N/A** when it cannot be determined. Hidden without a host. |
| **Availability** | Site sync only. Number of representations available on the active and on the remote site, each with the icon of the site (the tooltip names the site). Hidden when the Site Sync addon is off for the project. |

The tree is sorted by clicking a header; the default order is by product type. Group rows are always on top, merged rows follow, and products without a group come last.

### Filters

A filter bar above the tree holds filter items. Each item opens a popup to enter or pick values. `Ctrl+F` opens the popup that lists the items.

| Filter | Kind | Filters by |
|---|---|---|
| **Product name** | Text | Part of the product name. |
| **Product type** | List | Product types of the project. |
| **Statuses** | List | Version statuses (with their color). |
| **Version tags** | List | Tags of versions. |
| **Task tags** | List | Tags of the tasks the versions belong to. |

List popups have **Select all**, **Clear** and **Invert**, and **Back** and **Confirm**. Filters combine. When the first project is loaded in the window, the **Product type** filter is preset from the core setting **Product type filtering**, if a profile matches.

### Version info and representations

| Element | Content |
|---|---|
| Thumbnail | Thumbnail of the selected version, or of the selected folder when no version is selected. |
| **Version Info** | Product name, version label (`Hero version v003` for the hero version made from `v003`), comment (**No comment** when empty), creation time and source (**No source** when empty). The context menu of the text offers **Copy source path to clipboard**. |
| Representations list | Columns **Name**, **Product name**, **Folder**, **Active site** and **Remote site** for the selected versions. The site columns are visible when Site Sync is on and show the synchronization progress of each representation. |

## Actions

A right click on a product or on a representation opens the menu of compatible actions. The entries come from several sources.

| Source | Entries |
|---|---|
| Loader plugins of the integration and addons | One entry per loader that supports the selected context, labeled with the loader label (and the representation name for representation loaders). Loaders with options show an options button that opens a dialog titled `<label> Options`. Loaders can limit themselves to the Loader tool or to the library variant (used when the selected project is not the project of the current context). |
| Core loader actions | **Open file** (one entry per representation name with a file type that has an associated application), **Copy file path** and **Copy file** (per representation name), **Push to project** (needs versions of a single folder). |
| Loader actions without a host | **Open Source Workfile** (Applications addon), **Deliver Versions**, **Export OTIO**, **Create Hero Version**, **Delete Versions** (**Old versions**, **Selected versions**) and **Calculate Versions size**. These appear only when the tool runs without a host, for example when it is opened from the tray (see [Browser](browser.md)). |
| Site sync | For representations: **Download** (marks the representation for download to the active site), **Upload** (marks it for upload to the remote site) and **Remove from local**. Only with Site Sync enabled. |

When no action is compatible, the menu shows the entry "No compatible loaders for this version." (for several items: "your selection."). The selected action runs for all selected items at once. When a load fails, an error box **Loading failed** lists the product, representation, version and the error message of each failed item. Results of general actions appear as short messages, and some actions open a form.

### Product groups

The shortcut `Ctrl+G` opens the dialog **Grouping products** for the selected products. It has the input **Group Name**, where an empty value removes the group, a button to pick an existing group, and **Apply**. The group is stored as the `productGroup` attribute of the products, so it is shared by all users of the project.

## Permissions and settings

| Item | Effect |
|---|---|
| Core addon setting **Tools** > **Loader** > **Use legacy loader** | Chooses the interface. |
| Core addon setting **Tools** > **Loader** > **Product type filtering** | Profiles by **Host names** and **Task types** with **Filter type** (`is_allow_list` or deny list) and **Product types**. The matching profile sets the initial **Product type** filter. Applies to the Loader interface only. See [Core addon settings](../addons/essentials/core/settings.md). |
| Loader plugin settings | Plugins of the integrations can be enabled or disabled and configured in their addon settings. Disabled loaders are not listed. |
| Library projects | Define the projects that appear next to the current project when the tool runs inside an application. |
| Site Sync addon | Adds the availability column, the site columns and the site sync actions. |
| Server permissions | Actions that write to the server, such as hero version creation, version deletion and product groups, are subject to the permissions of the signed in user. |

## Related

- [Browser](browser.md): the default interface of the same tool, and the standalone variant.
- [Scene Inventory](scene-inventory.md): manages what was loaded.
- [Workfiles](workfiles.md), [Publisher](publisher.md): other tools of the integration menu.
- [Product types](product-types.md): the kinds of products that are listed.
- [Launcher](launcher.md): the tray menu entry **Browser**.
