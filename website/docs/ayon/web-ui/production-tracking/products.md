---
title: Products and versions
sidebar_label: Products
description: "The Products page lists the products and versions published in a project as a table or as thumbnail cards, with slicing, filtering, grouping and saved views."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/1183758-products-and-versions-page
---

# Products and versions

The **Products** page is the central place for browsing everything published in a project. It lists **versions** (the default) or **products** with their versions, as a table or as cards with thumbnails, and lets users filter, group, sort, preview media and edit version fields in place. It replaces the deprecated [Browser page](browser.md).

## Where it appears

| Item | Value |
|---|---|
| Project navigation bar | **Products** |
| URL path | `/projects/<project>/products` |
| Saved views | Supported, see [Views](../views.md) |

## Layout

| Region | Content |
|---|---|
| Slicer (left) | Quick filtering by hierarchy and common fields. See [Slicer](#slicer). |
| Toolbar (top) | Search filter, sync button, **Group by** dropdown, table/card switch, **Customize** button. |
| Main area | The table or the grid of cards. |
| Versions panel | A narrow list of the versions of the selected product. Shown when products are listed (grouped by product). |
| Details panel (right) | Details of the selected product or version, see [Details panel](../details-panel.md). |
| Settings panel (right) | Opened by **Customize**. Columns, sorting, grouping, featured version, row height and grid size. |

## Slicer

The slicer filters the main area by one field at a time. The field is chosen from a dropdown at the top of the panel.

| Slicer field | Filters by |
|---|---|
| Hierarchy | Folders of the project. Selecting a folder limits the page to the products and versions inside it. |
| Task assignee | Assignees of the task linked to the version. |
| Version status | Status of the version. |
| Version author | User who published the version. |
| Product type | Type of the product the version belongs to, for example model, render or plate. |
| Task type | Type of the task linked to the version. |
| Lists | Lists of the project. Selecting a list limits the page to the entities of that list. |

## Toolbar

| Control | What it does |
|---|---|
| Search filter | Builds filters from attributes of versions, products, tasks and folders. Fields in the dropdown are grouped by the entity they belong to (**Folder**, **Product**, **Version**, **Task**). Several filters can be active at once. |
| Sync button | Reloads the data after new versions or products are created. |
| **Group by** | Groups the main area by **Product** or by a version field such as status. Each option has an ascending/descending order toggle (the toggle applies to the sorting when grouped by product). Clearing the selection shows a flat list of versions. |
| Table / card switch | Switches between table (shortcut `T`) and cards (shortcut `G`). |
| **Customize** | Opens the settings panel. |

### Filtering rules

- Filters can use attributes of the product, of the version, of the parent folder and of the linked task.
- Grouped by product, a version filter keeps a product when at least one of its versions matches. For example, a version status filter of Approved lists only products with an approved version.
- The version filter offers special values, such as **Latest Done**, which matches the highest version of each product that has a status of the done state type.
- Folder type and task type filters apply to the flat and field-grouped version lists, not to the product list.

## Ways to view the data

### Versions

The default. Each row or card is one version. Table cells such as **Status** can be edited in place. Versions can be grouped by a version field, and the groups are ordered ascending or descending.

### Products

With **Group by** set to **Product**, each row or card is a product.

- In the table, a row expands to show the versions of the product.
- In the grid, the card shows the thumbnail, status and other fields of the product's **featured version**. The versions panel lists all versions of the selected product.
- Filters match a product by its own attributes or by attributes of its versions.

### Table

A spreadsheet-like view. Columns can be shown, hidden, reordered and pinned from **Customize**. Clicking a column header sorts by it. Double-clicking a **Folder** or **Task** cell opens that entity in the details panel without leaving the page.

### Cards

Each card shows a thumbnail, title, path and status. Cards of versions show the author, cards of products show their versions. A play indicator marks cards with playable media. The card size is set with **Grid size**.

## Hero versions

A star marks a hero version, on products and on versions, in the table and in the grid.

## Customize panel

| Setting | What it does |
|---|---|
| Columns | Show, hide, reorder and pin columns. Besides the version attributes, columns exist for the parent folder (status, type, tags, created and updated dates), the task (type, status), the product base type, **Author** and **Version**. |
| Sort by | Sort order of the table and the grid. |
| Group by | Grouping field and order. |
| **Featured version** | Ordered list of rules that choose the version a product represents: **Hero**, **Latest Done**, **Latest**. The order is configurable. |
| Row height | Height of table rows. |
| **Grid size** | Size of the cards, from 90 to 300. |
| **Latest per folder** | Shows only the latest published version of each folder (one version per folder). Combines with other filters. Disabled when grouped by product. |

## Previewing and keyboard

Selecting an item and pressing `Space` opens its media in the player. For a product, the featured version is played. While the player is open, `Ctrl`+`Left`/`Right` (`Cmd` on Mac) moves to the previous or next item of the list.

In the cards view the arrow keys move the selection, `Home` and `End` jump to the first and last card, and `Enter` opens the selected item.

## Context menu

| Entry | Applies to | What it does |
|---|---|---|
| **Show details** | Single item | Opens the details panel (also double-click). |
| **Open in viewer** | Version, or product with a featured version | Opens the player. |
| **Upload version** | Single product or version | Opens the version upload dialog. See [Versions without a pipeline](../../../production-tracking/versions-without-a-pipeline.md). |
| **Add to list** | Versions, or products through their featured version | Adds the versions to a list. See [Lists](lists.md). Review entries appear when the Review addon is available. |
| **Product data** | Products | Shows the raw data of the product. |
| **Version data** | Versions | Shows the raw data of the version. |
| **Delete version** / **Delete product** | Versions or products, on the name column | Deletes the selection after confirmation. |

## Views

Filters, sorting, grouping, columns, view mode (table or cards), featured version order, grid size and row height are part of the page's view settings. They can be saved as a view and shared with users or the whole project. See [Views](../views.md).

## Related

- [Upload version](../dialogs/upload-version.md)
- [Browser page](browser.md) (deprecated)
- [Lists](lists.md)
- [Details panel](../details-panel.md)
- [Reviewables](../../../production-tracking/reviewables.md)
- [Versions without a pipeline](../../../production-tracking/versions-without-a-pipeline.md)
- [Project overview](overview.md)
