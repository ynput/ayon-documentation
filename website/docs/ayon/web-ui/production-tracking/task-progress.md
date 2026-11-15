---
title: Task progress
sidebar_label: Task progress
description: "The Task progress page of a project: a matrix of folders and task types with one task card per cell, the Done percentage and status bars per folder, expanded rows with thumbnails, editing statuses, assignees and priorities of many tasks at once, the slicer, search filters, context menus and keyboard shortcuts."
verified: 2026-11-15
ui_purpose: "Shows how far each folder of a project is, as a matrix of folders and task types, and edits many tasks at once."
ui_location: "Project tab row > Task progress"
ui_url: "/projects/<project>/tasks"
ui_shortcut: "Shift+E expands or collapses all rows"
ui_access: "Everyone except guests"
sources:
  - https://help.ayon.app/en/articles/5526719-task-progress-page
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/TasksProgressPage/TasksProgressPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/TasksProgress/TasksProgress.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/TasksProgress/components/TasksProgressTable/TasksProgressTable.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/TasksProgress/components/FolderBody/FolderBody.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/TasksProgress/helpers/formatTaskProgressForTable.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/Slicer/context/slicer/SlicerContextInstance.ts
---

# Task progress

<PageInfo />

![The Task progress page of wing_it: the 020_tryout sequence selected in the slicer, one row per shot with a Done percentage and one task card per task type, and the details panel of the selected lighting task on the right](../../assets/web-ui/task-progress/page.webp)

The Task progress page shows the tasks of a project as a matrix: one row per folder, one column per task type, and the task cards of that type in each cell. It answers "how far is this sequence?" at a glance and lets producers change the status, assignees and priority of many tasks at once. The [slicer](../slicer.md) on the left chooses the folders, and the [details panel](../details-panel.md) on the right shows the selected task or folder. For a spreadsheet of all folder and task attributes, use the [Project overview](overview.md); for the tasks of one user, [Home tasks](../home/tasks.md).

## Progress table

The table stays empty with **Select a folder to begin.** until something is selected in the slicer.

### Columns

| Column | Contents |
|---|---|
| **Folder** | The folder name and thumbnail, pinned to the left and sortable. The arrow on the left expands or collapses the row. Clicking the name or thumbnail selects the folder and opens it in the details panel |
| **Done** | The share of the folder's active tasks whose status has the **done** state, as a percentage. Sortable |
| One column per task type | The task cards of that type, in the order of the task types in the project anatomy. Clicking the header sorts the rows by the task status. Columns can be resized |

Folders are grouped under their parent. A parent row shows its name, the number of folders and tasks, the Done percentage, and a bar per task type with the share of each status in its color. The arrow on the left collapses the parent.

### Task cards

A card shows the assignees, the priority and the status of one task, in the color of its status. Hovering the card shows the task name.

- **Select:** click a card. `Ctrl`/`Cmd` + click adds to the selection, `Shift` + click selects a range. `Enter` selects the focused card.
- **Edit:** the assignee, priority and status areas of a selected card open their menus. A change applies to every selected task. With several tasks selected, adding or removing an assignee changes only that assignee on each task; their other assignees stay.

<Columns widths="55 45">
<Column>

The status menu lists the task statuses of the project in their colors, with the current one highlighted.

</Column>
<Column>

![The status menu open on a lighting task card, listing Not ready, Ready to start, In progress, Pending review, Approved, On hold and Omitted](../../assets/web-ui/task-progress/status-edit.png "Status menu")

</Column>
</Columns>

### Expanded rows

**Expand all rows** (`Shift`+`E`) shows every row with larger cards that include the thumbnail, the task name with its type icon and a play button for tasks with reviewables. The button then reads **Collapse all rows**. Single rows can still be expanded or collapsed with their arrow.

![All rows expanded: each shot shows its thumbnail on the left and a card with a thumbnail, task name and status for each task type](../../assets/web-ui/task-progress/expanded.webp)

## Controls and interactions

### Toolbar

| Control | What it does |
|---|---|
| Search filter | Free text and filters on **attributes**, **task type**, **status**, **assignees** and **tags**. The field used by the slicer is not offered |
| Sync button | Reloads the page when tasks or folders change elsewhere |
| **Expand all rows** / **Collapse all rows** | Shows or hides the expanded cards of all rows. Shortcut `Shift`+`E` |

Filter rules: several values in one filter match any of them; several filters must all match; the same filter can be added twice, for example two tag filters; a filter can exclude its values instead of including them.

### Interactions

<Columns widths="60 40">
<Column>

- **Open details panel:** double-click a card, or **Show details** in its right-click menu. `Escape` hides the panel.
- **Play reviewables:** `Spacebar` on a card or a folder opens it in the [web viewer](../web-viewer.md).
- **Add to list:** right-click the selected cards and choose **Add to list**, see [Lists](lists.md).
- **Column width:** right-click a task type header and choose **Reset column width**.

</Column>
<Column>

![The right-click menu of a task card with Show details, Open in viewer and Add to list, and their shortcuts](../../assets/web-ui/task-progress/context-menu.png "Right-click menu")

</Column>
</Columns>

The read restrictions of the user's access group limit which folders and tasks are listed.

## Power features

These features need the [Power Pack](../../../addons/production-tracking/power-pack/index.md) and a license, see [Power features](../../../production-tracking/power-features.md).

- **Slicer:** slice types other than **Hierarchy**, and split panels, see [Slicer](../slicer.md#power-features).
- **Saved and shared views**, see [Views](../views.md#power-features).

## Related

- [Project overview](overview.md)
- [Home tasks](../home/tasks.md)
- [Slicer](../slicer.md)
- [Details panel](../details-panel.md)
- [Lists](lists.md)
- [Reviewables](../../../production-tracking/reviewables.md)
