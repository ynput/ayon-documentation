---
title: Lists
sidebar_label: Lists
description: "Lists collect folders, tasks or versions from anywhere in a project into one view, with list folders, list attributes and access levels."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7382645-lists
---

# Lists

**Lists** group folders, tasks or versions from anywhere in a project into one table, outside the folder and task hierarchy. A list can hold shots to review, tasks to track, versions to compare or a personal to-do collection. There is no limit on the number of lists or of items per list.

## Where it appears

| Item | Value |
|---|---|
| Project navigation bar | **Lists** |
| URL path | `/projects/<project>/lists`; a list is addressed with the `list` query parameter |
| Other pages | The **Lists** field of the slicer on the [Project overview](overview.md) and [Products and versions](products.md) pages filters those pages by a list. Review lists are shown on the [Review sessions](../../../addons/production-tracking/review/index.md) page. |

The page shows lists of the generic type. Lists of the review-session type belong to the Review addon.

## Layout

| Region | Content |
|---|---|
| Left | The lists table: lists and list folders, a header with search, create and filter controls. |
| Toolbar | Controls for the selected list, see [List toolbar](#list-toolbar). |
| Main area | The items of the selected list as a spreadsheet-style table. |
| Details panel (right) | Details of the selected item, see [Details panel](../details-panel.md). |
| Settings panel (right) | Opened by **Customize**: columns, sorting and list attributes. |

## List types

A list holds one entity type. The type is chosen when the list is created and cannot be mixed.

| Entity type | Items |
|---|---|
| Folder | Folders |
| Version | Versions |
| Task | Tasks |

Products cannot be added to a list. From a product, the **Add to list** entry adds its featured version.

## Lists table

### Header

| Control | What it does |
|---|---|
| Search | Filters the lists by name. |
| Create list (`N`) | Creates a list. The dialog asks for the **List label** and the **Entity type**. |
| Create folder (`F`) | Creates a list folder. Power feature. |
| Menu: **Select all lists** | Selects every list. |
| Menu: **Show archived** | Includes archived lists. |
| Menu: **Filter lists** | Opens a filter bar above the table. |
| Menu: **Delete selection** | Deletes the selected lists or folders. |

### Filter bar

Lists can be filtered by **Entity Type**, **Tags** and by any attribute scoped to lists.

### Context menu

| Entry | What it does |
|---|---|
| **Rename list** / **Rename folder** (`R`) | Renames the entry. Double-clicking the name does the same. |
| **Details** (double-click) | Opens the list details. |
| **Create review** | Creates a review session from the list. Shown when the Review addon is installed. |
| **Create list** (`N`) | On a folder: creates a list inside it. |
| **Create folder** / **Create subfolder** (`F`) | Creates a list folder, or a subfolder of the selected folder. |
| **Edit folder** | Edits label, scope, icon and color of a folder. |
| **Move list** / **Move folder** | Opens a folder picker. The picker also unsets the folder of a list. |
| **Make root folder** (`Shift`+`Alt`+`F`) | Moves a subfolder to the top level. |
| **Select all lists** | On a folder: selects the lists it contains. |
| **Delete** | Deletes the list or the folder only (the lists inside a deleted folder remain). Holding `Ctrl` or `Cmd` skips the confirmation. |

`Shift`+`F` removes the selected lists or folders from their parent folder.

## List folders

List folders organize lists in a hierarchy. A folder contains lists and other folders. List folders are a [power feature](../../../production-tracking/power-features.md).

| Field | Meaning |
|---|---|
| **Label** | Required name. |
| **Scope** | Where the folder appears: **Lists**, **Review Sessions**, or both. |
| Icon and color | Optional visual markers. |

`F` is context aware: with nothing selected it creates an empty folder, with lists selected it creates a folder containing them, with a folder selected it creates a subfolder. Users who are not administrators or managers can edit and delete only folders they own.

## List items

### List toolbar

| Control | What it does |
|---|---|
| Open review session button | Opens the list in a review session. Disabled for an empty list. |
| Undo, redo, remove from list | Edit actions. |
| Filter | Filters the items of the list. |
| Sync button | Reloads the items. |
| Import | Imports data into the list items, see [Import CSV](../dialogs/import-csv.md). |
| Actions | Actions that run on the list. Addons, for example studio addons, can contribute list actions. |
| **Customize** | Opens the settings panel. |

### Editing items

- The table supports the same filtering, column customization and in-cell editing as the [Project overview](overview.md).
- Items can be reordered by dragging.
- Items are removed with the **Remove from list** action or `Ctrl`/`Cmd`+`Backspace`. The action can be undone.
- Items are added from other pages through the **Add to list** context menu entry, which opens a dialog to choose the lists or to create a new list.
- Columns that cannot be edited on a list, especially on version lists, are read-only and marked with a lock icon.

## List attributes

List attributes are custom fields defined per list. They appear as extra columns and hold a value for each list item. Attributes are not shared between lists. List attributes are a [power feature](../../../production-tracking/power-features.md).

Typical uses: an approval checkbox per director, delivery dates or editorial notes, the vendor and deadline of outsourced work, or per-cut inclusion flags and output formats.

Attributes are managed in the **List attributes** section of the settings panel (**Customize**), where attributes can be added, renamed and deleted.

## Details and sharing

The list details panel has two tabs.

| Tab | Content |
|---|---|
| **Details** | List attributes of the list (label, tags and others) and metadata such as ID, entity type, item count and owner. |
| **Share** | Access control of the list and a link to copy. Power feature. |

## Access levels

Access can be granted to users and to groups.

| Level | Meaning |
|---|---|
| None | The list is not visible. |
| Viewer | Can view the list and its items. |
| Editor | Can also add items to and remove items from the list. |
| Admin | Full control: rename, delete, change list attributes and manage access. |

Administrators and managers always have full control. Lists without explicit access settings are open: everyone has full control. Setting access levels requires the Power Pack. Without it, everyone keeps full control of every list.

## Related

- [Review sessions](../../../addons/production-tracking/review/index.md)
- [Project overview](overview.md)
- [Products and versions](products.md)
- [Views](../views.md)
- [Power features](../../../production-tracking/power-features.md)
- [Details panel](../details-panel.md)
