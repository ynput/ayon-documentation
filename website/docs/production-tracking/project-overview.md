---
title: Project overview page
description: "The Overview page of a project, a spreadsheet-style table of folders and tasks for viewing, editing, filtering, grouping, creating and exporting project data."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7885519-project-overview-page
---

# Project overview page

The Overview page is the central place to view and edit the folders and tasks of a project. It is a spreadsheet-style table: one row per folder or task, one column per attribute, with editing in cells, copy and paste, filtering, grouping, entity creation, moving and CSV export. The page is available since AYON 1.8.0.

## Where it appears

| Item | Value |
|---|---|
| Location | Project page, **Overview** tab |
| URL path | `/projects/<project>/overview` |
| Access | Every user except guests |

The Overview page is the default project page. The other tabs of the project page are [Task progress](task-progress.md), [Products and versions](products-and-versions.md), [Lists](lists.md), Review ([Review sessions](../addons/production-tracking/review/index.md)), Schedule, [Reports](../addons/production-tracking/reports/index.md) and Workfiles.

## Layout

| Region | Contents |
|---|---|
| Slicer | Left side, resizable. Selects which rows the table shows. See [Slicer](#slicer) |
| Toolbar | Create menu, undo, redo and delete buttons, search and filter bar, sync button, **Group by**, **Import CSV**, project actions, **Customize** |
| Table | Folders and tasks with attribute columns |
| [Details panel](details-panel.md) | Opens for the selected row |
| Customize panel | Right side. Columns, sort, group and row height settings |

## Slicer

The slicer narrows the table to the rows that match a selection. Each slicer panel has a dimension dropdown.

| Dimension | Slices by |
|---|---|
| Hierarchy | Folders of the project tree |
| Assignee | Task assignees |
| Status | Task statuses |
| Folder Type | Folder types |
| Task Type | Task types |
| Attributes | Values of a selected attribute |
| Lists | Entity lists of the project |

The slicer panel header has collapse and search buttons. **Split slicer**, in the dimension dropdown, adds a further panel for a second dimension; it is a [power feature](power-features.md). Slicing by assignee and status shows counts per value. The hierarchy panel has its own context menu, with entries such as adding folders to a list, opening the viewer and moving folders.

## Toolbar

| Control | What it does |
|---|---|
| **Create** | Menu for creating a **Folder** (`N`), a **Folder sequence** (`M`) or a **Task** (`T`). Creating a task requires a selected folder, which becomes its parent. A new entity's name is generated from its label by the name template of the project anatomy and can be edited. `Ctrl`/`Cmd` + `Enter` confirms the dialog |
| Undo / Redo | Reverts or reapplies table edits. `Ctrl`/`Cmd` + `Z`, and `Shift` added for redo |
| Delete | Deletes the selected entities |
| Search and filter bar | Fuzzy search by name or path, and attribute filters. See [Filtering](#filtering) |
| Sync | Reloads the table with changes made by other users |
| **Group by** | Chooses how rows are arranged: **Hierarchy**, **Folder**, or a task field such as status, assignee, tags, task type, folder type or an attribute. Clearing it shows a flat list of tasks |
| **Import CSV** | Opens the CSV import dialog for the folder hierarchy. See [Data import](data-import.md) |
| Project actions | Actions from addons available for the project |
| **Customize** | Toggles the customize panel |

## Table

### Editing

| Capability | Behavior |
|---|---|
| Edit a cell | Double-click puts a cell in edit mode. Cells with a list of options open it with one click on the arrow |
| Multi-cell selection | `Shift` + click selects a range, `Ctrl`/`Cmd` + click adds individual cells, and dragging selects a block |
| Keyboard | Arrow keys, `Tab` and `Shift` + `Tab` move between cells. Standard editing shortcuts apply |
| Copy and paste | `Ctrl`/`Cmd` + `C` copies selected cells, `Ctrl`/`Cmd` + `V` pastes into the selected cells. The result can be pasted into other spreadsheet software |
| Inheritance | Values inherited from a parent folder are shown in gray. A cell can keep the inherited value or hold its own value. **Inherit from parent** in the context menu clears an own value |
| Row selection | Selecting a row through its row number opens that entity in the details panel |
| Attributes in the details panel | All attributes of an entity are editable in the [details panel](details-panel.md), wherever it is available in AYON |

### Columns

| Capability | Behavior |
|---|---|
| Sort | Clicking a column header sorts by it, clicking again reverses the order |
| Pin | Columns can be pinned to the left so they stay visible while scrolling horizontally |
| Reorder | Columns can be reordered by dragging, in the table or in the customize panel |
| Hide and show | Columns are hidden or shown in the customize panel, which also has a column search |
| Row height | A slider in the customize panel sets the row height. Thumbnails fill the available cell space for every aspect ratio. Row height is stored with the view |

Column, sort, group and filter settings are stored in the current [view](views.md).

### Customize panel

| Section | What it controls |
|---|---|
| **Columns** | Visible columns, their order and pinning |
| Sort | Sorting of the table |
| **Group** | Grouping of rows. Attribute grouping requires the Power Pack addon (see [Grouping](#grouping)) |
| Row height | Row height slider |

## Filtering

| Filter | Behavior |
|---|---|
| Attribute filters | Filter by any attribute. Suggested values are offered, or a custom value can be entered |
| Search | Fuzzy search by task name or path. Variations in the search term still match |
| Relative values | Filters that need no specific value, for example whether `assignees` or `tags` is empty or has at least one entry |
| Slicer | Rows are narrowed to the slicer selection |
| Excludes | Excludes tasks that match a value, for example hiding all tasks with status Approved. [Power feature](power-features.md) |
| Operator change, match all | Requires a task to match all values of an attribute, for example both the Character and Animation tags. [Power feature](power-features.md) |

## Grouping

Grouping arranges task rows under group rows. It is part of the [Power Pack](../addons/production-tracking/power-pack/index.md) addon. A group row can be expanded and collapsed, and **Ungroup** in its context menu removes the grouping.

| Groupable field | Notes |
|---|---|
| Folder type, Task type, Assignee, Status, Tags | Built-in fields |
| Attributes | Attributes of type string, integer and float. Attributes of type datetime, boolean and `list_of_*` cannot be grouped |

Each grouping has an ascending or descending order. **Hierarchy** and **Folder** are the grouping options that do not need the addon: **Hierarchy** shows folders with their tasks nested, **Folder** groups tasks by their folder.

## Context menu

A right click on a cell shows these entries, depending on the cell:

| Entry | What it does |
|---|---|
| **Copy**, **Copy row** | Copies selected cells or whole rows |
| **Paste** | Pastes into the selected cells |
| **Show details** | Opens the entity in the details panel. Double click |
| **Rename** | Renames the entity |
| **Open in viewer** | Opens the entity in the web viewer. `Spacebar` |
| **Expand children** / **Collapse children** | Expands or collapses a folder and all folders below it. `Alt` + click on the expand icon does the same |
| **Expand** / **Collapse** | For group rows |
| Add to list | Adds the selection to a [list](lists.md) or a review session |
| **Ungroup** | On group rows |
| **Inherit from parent** | Resets selected own attribute values to the inherited ones |
| **Export selection** | Exports the selected cells as a CSV file |
| **Upload Version** | Opens the version upload dialog for the folder and task. See [Versions without a pipeline](versions-without-a-pipeline.md) |
| **Move** | Moves the selected folders and tasks to another folder through a destination dialog |
| **Create folder**, **Create root folder**, **Create task** | Creates entities. A selected folder becomes the parent |
| **Delete** | Deletes the selected entities |

A folder that has published versions cannot be moved.

## Exporting data

| Method | Behavior |
|---|---|
| Copy and paste | Selected cells are copied to the clipboard and can be pasted into a spreadsheet application |
| **Export selection** | Writes the selected cells as a CSV file. Selecting the whole table, with all folders expanded (`Alt` + click on the expand icon of root folders), exports the whole project |

## Power features on this page

| Feature | Summary |
|---|---|
| Entity templates | Stored hierarchies, such as a set of tasks for a character or a default folder structure, reused to create entities. See [Entity templates](../ayon/web-ui/entity-templates.md) |
| [Calculated attributes](calculated-attributes.md) | Attributes calculated from a formula on the AYON server |
| Grouping, excludes, match all, split slicer | Described above |
| [Views](views.md) | Saved column, filter and grouping settings |

Power features need the Power Pack addon and a license. See [Power features](power-features.md).

## Permissions

Reading and editing follow the user's access group for the project; read restrictions limit which folders and tasks the table lists. Cells of entities the user cannot edit are read-only. See [Users and permissions](../ayon/web-ui/users-and-permissions.md).

## Related

- [Tasks (home) page](tasks-home.md)
- [Task progress](task-progress.md)
- [Details panel](details-panel.md)
- [Views](views.md)
- [Data import](data-import.md)
- [Attributes](../ayon/web-ui/attributes.md)
- [Navigating the web app](../ayon/web-ui/navigating-the-web-app.md)
