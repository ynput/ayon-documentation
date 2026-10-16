---
title: Task progress page
description: "The Task progress page, a per-folder matrix of task cards by task type for tracking progress and editing statuses, assignees and priorities of many tasks."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/5526719-task-progress-page
---

# Task progress page

The Task progress page shows the tasks of a project as a matrix: one row per folder, one column per task type, and each cell holds the task cards of that type. It gives an overview of how far a project or a part of it has progressed, and supports editing statuses, assignees and priorities of many tasks at once. The page is available since AYON 1.4.0.

## Where it appears

| Item | Value |
|---|---|
| Location | Project page, **Task progress** tab |
| URL path | `/projects/<project>/tasks` |
| Access | Every user except guests |

## Layout

| Region | Contents |
|---|---|
| Slicer | Left side, resizable. Selects which folders are listed. The slice dimension is selectable: Hierarchy, Assignee, Status, Task Type. The table stays empty until a selection is made |
| Toolbar | Search and filter bar, sync button, **Expand all rows** |
| Table | Folder rows with task cards |
| [Details panel](details-panel.md) | Right side. Opens for the selected folder or tasks |

## Table

| Column | Contents |
|---|---|
| **Folder** | Folder name, type, status and thumbnail. Pinned to the left. Sortable. A button on each row expands or collapses its task cards. Clicking the folder name or thumbnail opens it in the details panel |
| **Done** | Share of the folder's active tasks whose status is in the Done state, as a percentage. Sortable |
| One column per task type | Task cards of that type for the folder, ordered like the task types of the project anatomy. The column header sorts by task status. Columns are resizable |

Folders are grouped under their parent folder. A parent row shows its name, the number of folders and tasks, and a segmented bar of the task statuses, colored by status. A button collapses the parent.

### Task card

A collapsed card shows the task name with its type icon, the status, the assignees and the priority. An expanded card also shows the task thumbnail. A play button appears on tasks that have reviewables.

| Capability | Behavior |
|---|---|
| Select | Click selects a task. `Ctrl`/`Cmd` + click adds to the selection, `Shift` + click selects a range. `Enter` on a focused card also selects it |
| Edit status, assignees, priority | Available on selected cards, from the status, assignee and priority areas of the card. A change applies to every selected task |
| Multiple assignees | With several tasks selected, adding or removing an assignee changes only that assignee on each task; the other assignees of each task stay |
| Open details | Double-click a card, or **Show details** in the context menu. `Escape` hides the panel |
| Open in viewer | `Spacebar` on a task or folder |

### Expanding rows

| Control | Shortcut | What it does |
|---|---|---|
| **Expand all rows** / **Collapse all rows** | `Shift + E` | Toggles expanded cards, with thumbnails, for all folder rows. Individual rows can still be toggled |

### Context menus

| Menu | Entry | What it does |
|---|---|---|
| Task card | **Show details** / **Hide details** | Toggles the details panel |
| Task card | **Open in viewer** | Opens the task in the web viewer |
| Task card | **Add to list** | Adds the selected tasks to a list. See [Lists](lists.md) |
| Task column header | **Reset column width** | Restores the default column width. Double-clicking the column resizer does the same |

## Search and filters

The search bar combines a free-text search with filters. Filters can be added for these fields: attributes, task type, status, assignees and tags.

| Rule | Behavior |
|---|---|
| Values within a filter | A filter with several values matches tasks that have any of the values |
| Several filters | Different filters narrow the result: a task must match all of them |
| Repeated filters | The same filter can be added more than once, for example two tag filters; a task must satisfy both |
| Exclude | A filter can be set to exclude its values instead of including them |
| Slicer interaction | The field used as the slicer dimension is not offered as a filter |

## Permissions

Read restrictions of the user's access group limit which folders and tasks are listed. See [Users and permissions](../ayon/web-ui/users-and-permissions.md).

## Related

- [Tasks (home) page](tasks-home.md)
- [Project overview](project-overview.md)
- [Details panel](details-panel.md)
- [Lists](lists.md)
- [Reviewables](reviewables.md)
