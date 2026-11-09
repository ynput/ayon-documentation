---
title: Task pages
description: "The three pages of the AYON web app that list tasks, Home tasks, Task progress and Overview: the question each one answers, what it shows, what can be changed on it, and which one to open."
verified: 2026-11-07
sources:
  - https://github.com/ynput/ayon-frontend/tree/develop/src/pages/UserDashboardPage
  - https://github.com/ynput/ayon-frontend/tree/develop/src/pages/TasksProgressPage
  - https://github.com/ynput/ayon-frontend/tree/develop/src/pages/ProjectOverviewPage
---

# Task pages

Three pages of the web app list tasks: [Home tasks](../web-ui/home/tasks.md), [Task progress](../web-ui/production-tracking/task-progress.md) and the [Overview](../web-ui/production-tracking/overview.md). They look alike, with a table of tasks, a panel on the left and the [details panel](../web-ui/details-panel.md) on the right, but each one answers a different question.

| Page | Answers | Shows | Rows | Changes on the page |
|---|---|---|---|---|
| **Home tasks** | What does a user have to do? | The tasks assigned to the signed-in user or to selected users, across several projects | One card or row per task, as a board by status or as a list | Status. Other fields in the details panel |
| **Task progress** | How far along is each shot or asset? | The tasks of the folders selected in the [slicer](../web-ui/slicer.md), in one project | One row per folder, one column per task type, with the share of done tasks | Status, assignees and priority, for many tasks at once |
| **Overview** | What is in the project? | All folders and tasks of one project, assigned or not | A spreadsheet of folders and tasks with their attributes | Everything: creating, editing, moving and deleting folders and tasks |

## Which one to open

| Need | Page |
|---|---|
| See and update one's own work | Home tasks |
| Check the workload of an artist | Home tasks, with the user selected |
| See which shots or assets are behind | Task progress |
| Find unassigned tasks | Overview, with the **Assignee** filter set to no value. Home tasks shows only assigned tasks |
| Create folders and tasks, or edit attributes | Overview |

## Related

- [Home tasks](../web-ui/home/tasks.md)
- [Task progress](../web-ui/production-tracking/task-progress.md)
- [Overview](../web-ui/production-tracking/overview.md)
- [Production workflow](production-workflow.md)
