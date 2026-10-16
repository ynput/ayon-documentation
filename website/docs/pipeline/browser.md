---
title: Browser
description: "The AYON Browser desktop tool: a table and card browser for the published versions of a project, used as the Loader inside applications and as a standalone window with delivery, hero version and clean-up actions."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/4087894-browser
---

# Browser

The Browser lists the published products and versions of a project, with filters, grouping, saved views, thumbnails and representations. It runs in two ways. Opened from the **Browser** entry of the tray menu, it is a standalone window without a host application; besides browsing, it offers administrative actions such as delivering files, creating hero versions and deleting published versions. Opened from the **Load...** entry of a DCC integration, it is the interface of the [Loader](loader.md), with the loading actions of the integration, and the **In Scene** column and filter.

The legacy Loader interface replaces the Browser when the core addon setting **Tools** > **Loader** > **Use legacy loader** is on (or the environment variable `AYON_USE_LEGACY_LOADER` is `1`). The Browser then does not open from the tray and from the integrations; the `browser` command of the launcher follows the same rule.

## Where it appears

| Item | Value |
|---|---|
| Tray menu | **Browser**. See [Launcher](launcher.md). |
| Command line | `ayon browser` (`ayon_console.exe browser` on Windows). |
| DCC menu | **Load...** (and **Library...** in integrations that have it). |
| Window title | **AYON Browser**, followed by the host name when started from an integration. |
| Window size | Opens at 1500 by 750 pixels, centered. |

## Layout

The window has three resizable panels: the slicer on the left, the version table in the middle and the inspector on the right.

### Slicer

| Control | What it does |
|---|---|
| Project selector | Chooses the project. Inside an application only the project of the current context and library projects are listed. Standalone, all active projects are listed. |
| Category selector | Chooses what the tree shows: **Hierarchy** (`HIE`), **Reviews** (`REV`) or **Lists** (`LIS`). |
| Search toggle | Replaces the category selector with an input **Search** that filters the tree by words. Closing it clears the text. `Esc` closes it. |
| My tasks toggle | Hierarchy only. Shows only folders that have a task assigned to the signed in user. Tooltip: "Only show folders that have a task assigned to you." |
| Go to current context | Hierarchy only, visible when the application has a project and folder context. Selects the current folder. Tooltip: "Select the current context in the hierarchy". |
| Tree | Folders of the project with a status column and thumbnails, or the entity lists. Several rows can be selected. |
| Task list | Hierarchy only. Columns **Task name** and **Task type** for the selected folders. Selecting tasks sets the **Task** filter of the table. |
| Progress indicator | Shows the background fetches that are running. |

| Category | Tree content | Versions shown |
|---|---|---|
| **Hierarchy** | The folder hierarchy | The versions published in the selected folders. |
| **Reviews** | Entity lists of the type review session | The versions in the selected review sessions. |
| **Lists** | All entity lists of the project, nested in their list folders, newest first | The versions of the selected lists. |

The data of **Reviews** and **Lists** is always shown as a flat version list, without grouping.

### Table toolbar

| Control | What it does |
|---|---|
| **Views** selector | Applies, saves and manages views (see below). |
| Filter bar | Filters rows by criteria. |
| **Refresh** | Reloads the table with the active filters. |
| **Group By** | Groups rows by a field. |
| Table and card toggle | Switches between **Table** and **Cards**. |
| **Customize** | Menu with display options. |

When nothing can be shown, an empty state explains why:

| Message | Meaning |
|---|---|
| **Select a project** | No project is selected. |
| **Select a folder to show versions or products** | A project is selected but no folder or list. |
| **No versions or products found** | The selection has no published versions. |
| **No versions or products match the active filters** | Rows exist, but the filters hide them. |

### Table

The table lists versions, one row each, in the form `<product> - <version>`. A hero version is written `★ (v003)`, with the number of the version it was made from. The initial filter is **Version** = **Latest**, so one version per product is listed. Rows load page by page while scrolling. With a grouping active, the table shows group header rows, and the versions of a group load when it expands.

The visible columns can be changed with the **+** button that appears at the right of the header on hover, or with **Customize** > **Columns**. The menu lists the built-in columns and, in a submenu **Attributes**, the attributes of versions, products, folders and tasks.

| Column | Visible by default | Content |
|---|---|---|
| **Thumbnail** | Yes | Thumbnail of the version. |
| **Product/Version** | Yes | Product name and version. |
| **Status** | Yes | Version status with color and icon. |
| **Product Base Type** | No | Product base type. |
| **Product Type** | Yes | Product type. |
| **Folder** | No | Folder of the product. |
| **Author** | Yes | The user who published the version. |
| **Time** | Yes | Publish time. |
| **Version** | Yes | Version label. |
| **Product Name** | No | Product name. |
| **Task Type** | No | Task type of the version task. |
| **Task** | No | Task of the version. |
| **Tags** | No | Version tags. |
| **Frame Start**, **Frame End**, **Handle Start**, **Handle End**, **Step** | Yes | Frame range attributes of the version. |
| Attribute columns | No | Other attributes of versions, products, folders and tasks, for example fps or resolution. |
| **In Scene** | No. Available only with a host | **Yes** (green) when the version is loaded in the open scene, **No** (grey) otherwise. For group rows of the **Product** grouping it says whether any version of the product is loaded. |
| **Active Site**, **Remote Site** | Optional | Site Sync only. Representations of the version available on each site as `available/total`, with the icon of the site. |

The **Reviews** and **Lists** categories have the same columns without **Folder** and **Task**.

### Filter bar

The filter bar combines criteria. A criterion has a field, values, and can exclude instead of include; text fields can match substrings. Fields are grouped by entity.

| Entity | Fields |
|---|---|
| Product | **Name**, **Type**, **Base Type**, **Status** |
| Version | **Status**, **Version** (`Latest`, `Latest Done`, `Hero`), **Author**, **Has Reviewables** (**Yes**, **No**), **Tags**, and **In Scene** (**Yes**, **No**) when a host is present |
| Folder | **Name**, **Status** |
| Task | **Task**, **Type**, **Status**, **Tags** |
| Representation | **Name**, **Extension**, **Status**, **Tags**. Only offered when the server can filter versions by representation. |
| Attributes | Attributes of each entity, except date attributes. Boolean attributes offer **Yes** and **No**. |
| Site Sync | **Active Site** and **Remote Site** (**Available**, **Partial**, **Unavailable**). Applied locally on the loaded rows. |

Tags and some text fields offer "has value" and "no value" choices where a field can be empty.

### Group By

The menu lists built-in fields and attributes. A search field at the top finds options by name. Selecting the active option again removes the grouping.

| Option | Groups by |
|---|---|
| **None** | No grouping. |
| **Product** | Product. The group row shows the featured version (see **Customize**). |
| **Status** | Version status. |
| **Tags** | Version tags. |
| **Task type** | Task type. |
| **Product type** | Product type. |
| Attributes | Version attributes and product attributes of the types boolean, date and time, float, integer and string, in submenus. |

### Customize

| Option | Applies to | What it does |
|---|---|---|
| **Featured Version** | **Group By** > **Product** | Order in which the featured version of a product is chosen: **Latest Done**, **Latest**, **Hero**. Default order: Latest Done, Latest, Hero. |
| **Columns** | Table | Opens the column menu. |
| **Card size** | Cards | Card width, 150 to 500. Default 200. |
| **Row height** | Table | Row height, 24 to 160. Default 34. |
| **Show empty groups** | Grouping | Lists groups without any version. Off by default. |
| **Leave blank values ungrouped** | Table | Versions that have no value for the grouped field stay below the groups instead of forming a group. On by default. The cards view always uses a group of their own. |
| **Latest per folder** | Table and cards | Shows one version per folder: the latest published one. Disabled while grouped by product. |
| **Show versions from child folders** | Hierarchy and Lists | Includes versions from folders below the selected folders. |

### Cards

The cards view shows one card per version. A card has the folder name as header, the product name with the icon and color of its product type, the status icon, the version and the thumbnail.

### Views

A view stores the column set and order, sort, row height, grouping, filters, display type, card size, featured version order, latest per folder, child folders and the my tasks filter. Views are stored on the AYON server per project (view type `desktop.browser`). The selector lists:

| Section | Content |
|---|---|
| **Working view** | The current working state of the user, with a reset control (**Reset to default**). |
| **My views** | Views of the signed in user. |
| **Shared views** | Views shared with the user. Sharing is provided by the Powerpack addon. |
| **Default view** | Control that saves the current view as the default view of the project, or removes it. |
| **Create new view...** | Creates a view from the current state. |

Without a stored view, the defaults are the columns marked above, no grouping, sort by **Product/Version** ascending, the **Version** = **Latest** filter and the table display.

### Inspector

The inspector on the right shows the selection and can be closed with its close button. It reopens when a row is activated.

| Element | Content |
|---|---|
| Path | Path of the selected version (copyable). |
| Thumbnail | Thumbnail of the version, or a composite of several. |
| **Version Info** | **Product:**, **Version:**, **Comment:**, **Created:** (relative, with the exact time as tooltip) and **Source:**. With several versions selected, each field reads "N items selected". |
| **Representations** | Table with **Name** and **Folder** of the representations of the selected versions. Shared representation names of several versions form a tree. A context menu offers the representation actions. |

## Actions

A context menu on one or more selected version rows (and on representations in the inspector) lists the compatible actions, grouped in submenus by their group label and sorted by order. Entries with options show an options button that opens a dialog. Actions of the integration's loader plugins appear when the Browser runs inside an application. When no loader fits, the menu says "No compatible loaders for this version." or "...your selection.". Results appear as messages, and some actions open a form.

| Action | Where | What it does |
|---|---|---|
| Loaders of the integration | Application only | Loads or references the version in the scene. A failed load shows the **Loading failed** box. |
| **Open Source Workfile** | Standalone | Offers the applications that can open the workfile that the version was published from (the `source` attribute of the version), and starts the chosen one with that workfile, in the task of the version. Needs a version with a task and a source file on disk. Provided by the Applications addon. |
| **Open file** | Both | Opens a representation file with the application associated with its extension. One entry per representation name. |
| **Copy file path**, **Copy file** | Both | Copies the path or the file of the representation to the clipboard. |
| **Push to project** | Both | Starts the push-to-project tool for versions of a single folder. |
| **Deliver Versions** | Standalone | Opens the delivery dialog (see below). |
| **Export OTIO** | Standalone | Exports an OpenTimelineIO file for the selected versions. |
| **Create Hero Version** | Standalone | Creates the hero version of the selected version (one version at a time). |
| **Delete Versions** > **Old versions** | Standalone | Deletes older versions of the selected products. |
| **Delete Versions** > **Selected versions** | Standalone | Deletes the selected versions. |
| **Calculate Versions size** | Standalone | Shows the total file size of the versions beyond the number of versions to keep. |

`Ctrl+G` opens the dialog **Grouping products** with **Group Name**, an option list of existing groups and **Apply**. An empty name removes the group. The group is the `productGroup` attribute of the product. If the access groups of the user restrict writing of attributes in the project and exclude `productGroup`, the dialog is replaced by the message "You don't have permissions to set the product group attribute". Admins, managers and services can always change it.

### Delivery

**Deliver Versions** opens the dialog titled **Deliver N versions**. It copies the files of the selected versions, or of the versions of the selected representations, to a folder structure that a delivery template defines.

| Control | What it does |
|---|---|
| **Selected representations** | Count and size of the files that will be delivered. |
| **Delivery template** | Template from the `delivery` templates of the project anatomy. Only templates whose directory pattern starts with `{root` are offered. The patterns are shown as **Directory template** and **File template**. |
| **Representations** | Checkable list of representation names. **Select All** checks all. |
| **Advanced options** | Collapsed by default. **Renumber Frame** with **Renumber start frame** renumbers frame sequences. **Root** is the root path that fills the `{root` part of the template. **List label** fills the `list[label]` key of the template. |
| **Deliver** | Copies the files and shows a report. Representations that fail are skipped and the report lists the reason. |

### Delete versions

| Step | Content |
|---|---|
| **Versions to keep** | For **Old versions**: how many of the latest versions per product stay (default 2, minimum 0). Hero versions are kept unless the number is 0. |
| **Remove publish folder** | Removes the whole publish folder of each version instead of only the files of its representations. |
| Confirmation | The form lists the number of versions and the total file size and requires typing `delete`. |

The action deletes the files, the representation entities and the version entities, and then the products that are left without versions. **Selected versions** refuses hero versions with the message "Hero versions cannot be deleted.".

## Permissions and settings

| Item | Effect |
|---|---|
| Core addon setting **Tools** > **Loader** > **Use legacy loader** | Switches the tool to the legacy Loader interface. |
| Project anatomy delivery templates | Provide the choices of the delivery dialog. |
| Access groups | Can restrict the attributes a user may write, which includes the product group. |
| Site Sync addon | Adds the **Active Site** and **Remote Site** columns and filters. |
| Server | The versions, views and representation filters use the server GraphQL API; features that depend on newer servers (representation filters) are hidden on older ones. |

The core setting **Product type filtering** does not apply to the Browser interface.

## Related

- [Loader](loader.md): the legacy interface and the loading concepts.
- [Scene Inventory](scene-inventory.md): manages the loaded versions.
- [Launcher](launcher.md): the tray menu.
- [Product types](product-types.md).
- [Products and versions page](../production-tracking/products-and-versions.md) of the web app, which uses the same kind of table, and the [Browser page](../production-tracking/browser.md) of the web app.
