---
title: Tasks (home) page
description: "The Tasks page, the landing page of the AYON web app, showing the tasks assigned to a user as a status board or a list."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/2408349-tasks-home-page
---

# Tasks (home) page

The Tasks page is the landing page of the AYON web app. It lists the tasks assigned to the current user across one or more projects, either as a board with one column per status (kanban) or as a grouped list. Artists use it to see their assignments, change task statuses and discuss tasks in the activity feed. It is the first tab of the Home section, next to the Projects page and the Planner.

## Where it appears

| Item | Value |
|---|---|
| Location | Home section, **Tasks** tab. The root URL redirects to it |
| URL path | `/dashboard/tasks` (`/dashboard` redirects to it) |
| Shortcut | `h+h` from anywhere in the web app. See [Keyboard shortcuts](../ayon/web-ui/keyboard-shortcuts.md) |
| Access | Every user except guests. Guests see a locked page |

The page shows only tasks assigned to the selected user. The whole project context, including unassigned tasks, is on the [Project overview](project-overview.md) page.

## Layout

| Region | Contents |
|---|---|
| Project list | Left side, resizable. Multi-select list of the projects the user can access. Tasks of all selected projects are shown together |
| Toolbar | Sort by, Group by, text filter, assignee switch, **List** and **Board** buttons |
| Task area | Board or list of task cards |
| [Details panel](details-panel.md) | Right side. Opens for the selected task or tasks |
| Related panel | Bottom bar below the board or list |

The selected view is kept in the `view` URL query parameter. The default view is **Board**.

## Toolbar

| Control | What it does |
|---|---|
| **Sort by** | Sorts tasks. Options: Task, Folder, Status, Priority, Due Date. Each has an ascending or descending direction. Several sort keys can be combined, for example Folder followed by Task, so tasks in equally named folders stay ordered by task name |
| **Group by** | Groups tasks. Options: Folder, Parent Folder, Status, Priority, Type, Project. **Assignee** is added when tasks of other users are shown. One grouping at a time, ascending or descending. Grouping applies to the list view; the board always has one column per status |
| **Filter tasks...** | Text filter over the displayed tasks |
| **Me** | Shows the tasks assigned to the current user |
| **Assignees** | Dropdown to show the tasks of one or more other users |
| **List** | Switches to the list view |
| **Board** | Switches to the board (kanban) view |

### Viewing other users' tasks

The **Assignees** dropdown is available to administrators and managers. For other users it is available only when none of the selected projects has read restrictions enabled in the user's access group. Otherwise only **Me** is available, and the assignee selection resets to the current user.

## Board view

The board has one column per task status of the selected projects. Each card shows the task thumbnail, the task name with its type icon, the folder path, the assignees and the priority.

| Capability | Behavior |
|---|---|
| Change status | Dragging a card, or several selected cards, to another column sets the status. Statuses can also be changed in the details panel |
| Multi-select | Several cards can be selected and moved or edited together. Only statuses that exist in every project of the selected tasks can be set |
| Collapse a column | A button in the corner of each column collapses it. Adjacent collapsed columns merge into one collapsed strip |
| Open the details panel | Double-click on a card, or **Show details** in the context menu. `Escape` toggles the panel |
| Open in the project overview | `Ctrl`/`Cmd` + double-click on a card |
| Thumbnails | A task shows its own thumbnail when one is set, otherwise the thumbnail of its latest version. A file dropped on the details panel sets the task thumbnail |

### Card context menu

| Entry | Shortcut | What it does |
|---|---|---|
| **Show details** / **Hide details** | Double click / `Escape` | Toggles the details panel |
| **Open in viewer** | `Spacebar` | Opens the task in the web viewer |
| **Open in overview** | `Ctrl`/`Cmd` + double click | Opens the task on the project's Overview page |
| **Copy task ID** | | Copies the task id. Disabled when several tasks are selected |
| **Copy latest version ID** | | Copies the id of the task's latest version. Disabled when several tasks are selected or the task has no version |

## List view

The list view shows one row per task in collapsible groups, with the status icon, task, folder and project path, assignees and priority.

| Capability | Behavior |
|---|---|
| Keyboard selection | `ArrowUp` and `ArrowDown` move the selection, `Spacebar` opens the viewer |
| Collapse a group | `c` while hovering a group collapses or expands it |
| Change status | The status icon of a row opens the list of statuses |
| Groups | Defined by **Group by**. Empty groups are hidden |

## Related panel

The Related panel is a [power feature](power-features.md). It sits at the bottom of the page. When expanded it shows thumbnails of the selected task and up to five related tasks.

| Mode | Shows |
|---|---|
| Related timeline tasks (default) | Tasks of the same task type in sibling folders, for example the previous and next shots |
| Related workflow tasks | Sibling tasks in the same folder, ordered by the project anatomy, for example the tasks upstream and downstream of the selected one |

The panel is also available in the web viewer (`Spacebar`), where it switches playback between related tasks without closing the player. Without the Power Pack addon the panel is not shown. See [Power Pack](../addons/production-tracking/power-pack/index.md).

## Task details

The [details panel](details-panel.md) shows the task attributes, versions and the [activity feed and comments](activity-feed-and-comments.md). Edits with several tasks selected apply to all of them.

## Related

- [Project overview](project-overview.md)
- [Task progress](task-progress.md)
- [Details panel](details-panel.md)
- [Activity feed and comments](activity-feed-and-comments.md)
- [Planner](../addons/production-tracking/planner/index.md)
- [Navigating the web app](../ayon/web-ui/navigating-the-web-app.md)
