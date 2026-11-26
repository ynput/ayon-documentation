---
title: Subtasks
sidebar_label: Subtasks
description: "Subtasks in the AYON Planner addon: small work items stored inside a task with a label, a done state, assignees and dates, where they appear, their fields, the Subtasks tab of the details panel, editing, and copying and pasting them as spreadsheet text."
addon: planner
addon_repo: ayon-server-production-planner
addon_version: 2.3.6
addon_scope: server
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-11-17
---

# Subtasks

<AddonInfo />

A subtask is a small work item inside a task, such as "Roto" or "Cleanup" within a compositing task, with a done state, assignees and dates. Subtasks are stored in the task data (`subtasks`) and are not entities of their own: they have no status, versions or work files. The Planner addon provides the Subtasks manager to the AYON web app; without the addon, the subtasks views show a notice about the Planner addon. What subtasks are useful for in a production is shown in [Split work into small steps](../../../production-tracking/split-work-into-small-steps.md).

## Where it appears

| Location | Description |
|---|---|
| Details panel | A **Subtasks** tab (checklist icon) for tasks, next to the activity feed and **Details**. See [Details panel](../../../ayon/web-ui/details-panel.md). |
| Subtasks column | A **Subtasks** column in task tables of the [project overview](../../../ayon/web-ui/production-tracking/overview.md) and [lists](../../../ayon/web-ui/production-tracking/lists.md). Cells show a chip per subtask with a done checkbox. Opening a cell opens the same manager as the tab. Cells of tasks that have subtasks disabled show the notice **Subtasks are disabled for this task**. |
| Schedule | Subtasks with a start and an end date are shown as bars in the project [Schedule](index.md#schedule), where a task can also be split into subtasks. |

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

- [Planner addon](index.md)
- [Details panel](../../../ayon/web-ui/details-panel.md)
- [Project overview](../../../ayon/web-ui/production-tracking/overview.md)
- [Lists](../../../ayon/web-ui/production-tracking/lists.md)
