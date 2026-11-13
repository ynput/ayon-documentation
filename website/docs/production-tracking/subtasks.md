---
title: Subtasks
description: "Subtasks are lightweight work items stored inside a task, with a label, a done state, assignees and dates, managed in the details panel and the subtasks column."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/8559098-subtasks
---

# Subtasks

A subtask is a small work item inside a task, such as "Roto" or "Cleanup" within a compositing task. Subtasks give checkpoints, assignees and dates without creating full tasks. They are stored in the task data and are not entities of their own.

Subtasks are provided by the Planner addon. Without it, opening a subtasks view shows a notice about the Planner addon instead. See the [Planner addon](../addons/production-tracking/planner/index.md) for licensing and versions, and [Planner](../addons/production-tracking/planner/index.md) for the planning pages that schedule subtasks.

## Where it appears

| Location | Description |
|---|---|
| Details panel | A **Subtasks** tab (checklist icon) for tasks, next to the activity feed and **Details**. See [Details panel](../ayon/web-ui/details-panel.md). |
| Subtasks column | A **Subtasks** column in task tables of the [project overview](../ayon/web-ui/production-tracking/overview.md) and [lists](../ayon/web-ui/production-tracking/lists.md). Cells show a chip per subtask with a done checkbox. Opening a cell opens the same manager as the tab. Cells of tasks that have subtasks disabled show the notice **Subtasks are disabled for this task**. |
| Planner schedule | Subtasks can be scheduled in the Planner schedule. |

## Fields

| Field | Description |
|---|---|
| Label | Display name, required. Several subtasks can share a label. |
| Name | Unique identifier within the task, used by pipeline integrations. Generated from the label when empty; must follow the entity name rules. Duplicate names or ids in one task are rejected. |
| Completion | Checkbox for the done state. |
| Assignees | The users responsible. |
| Start and end date | Scheduling dates. |
| Description | Optional text, up to 2048 characters. Shown as the chip tooltip. |
| Id | Generated, unique within the task. |

## Details panel tab

| Region | Content |
|---|---|
| Title | **Subtasks (N)**, the number of subtasks of the task. |
| Search and filter bar | Text search by name, plus filters **Status** (**Done** or **Not Done**) and **Assignees** (specific users, any user or none). |
| List | The subtasks, in order, with the fields above. |
| Header menu | Bulk actions: **Copy All**, **Paste**, **Delete All**. |

Search accepts a comma-separated list, so `Roto, Grading` matches both names.

## Editing

| Capability | Behavior |
|---|---|
| Batch creation | A comma-separated label such as `Roto, Cleanup, Grading` creates one subtask per entry. |
| Continuous creation | `Ctrl/Cmd + Enter` while editing a label saves the subtask and starts a new one. |
| Reordering | The order of subtasks can be changed. |
| Multi-selection | `Ctrl/Cmd` + click selects several subtasks for copy or delete. |
| Quick delete | While `Ctrl/Cmd` is held, the options icon of a hovered subtask becomes a delete icon. |

## Copy and paste

Subtasks are copied as tab-separated text, one subtask per line, so they can be exchanged with spreadsheets. The columns are task id, task name, label, name, start date, end date, assignees (comma-separated) and status (`Done` or `Todo`). Pasting accepts this format with or without the task id and task name columns, and with an optional header row.

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + C` | Copy the selected subtasks. |
| `Ctrl/Cmd + V` | Paste and replace all existing subtasks of the target task. |
| `Shift + Ctrl/Cmd + V` | Paste and add to the existing subtasks. |

## Related

- [Details panel](../ayon/web-ui/details-panel.md)
- [Project overview](../ayon/web-ui/production-tracking/overview.md)
- [Planner](../addons/production-tracking/planner/index.md)
- [Lists](../ayon/web-ui/production-tracking/lists.md)
