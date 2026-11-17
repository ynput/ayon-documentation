---
title: Split work into small steps
sidebar_label: Split work into small steps
description: "Splitting a task into small steps with subtasks: checkpoints inside a task without new tasks, sharing a task between people, seeing how far a task is, scheduling the parts of a long task, and reusing the same checklist on many tasks."
verified: 2026-11-17
---

# Split work into small steps

<!-- screenshot: Subtasks tab of the details panel for a wing_it compositing task: Roto, Cleanup and Grading, two of them done, with assignees and dates -->

A task such as the compositing of a shot is often several smaller jobs: roto, cleanup, keying, grading. Making each of them a task of its own adds work files, statuses and review steps that nobody needs. Subtasks keep them inside the task as a checklist with assignees and dates, so the task stays one piece of work in the pipeline and in the schedule, while the steps inside it can be followed. Subtasks are provided by the [Planner addon](../addons/production-tracking/planner/index.md); their fields and controls are described in [Subtasks](../addons/production-tracking/planner/subtasks.md).

## Checkpoints inside a task

<!-- screenshot: Subtasks tab with a batch of subtasks just created from "Roto, Cleanup, Grading" -->

A subtask is a label and a done checkbox, optionally with a description. Typing several labels at once, such as `Roto, Cleanup, Grading`, creates one subtask for each, so a checklist is set up in seconds. Artists tick subtasks off as they go, and the task keeps one status for the work as a whole. A subtask has no status, versions or work files of its own: publishing still happens on the task.

## Share a task between people

A subtask has its own assignees. A senior artist can own the task while a junior does the roto, or two artists can split the cleanup of a long shot, without the task being cut into separate tasks. The subtasks can be filtered by assignee, so each person finds their part.

## See how far a task is

<!-- screenshot: Overview of a wing_it sequence with the Subtasks column, one chip per subtask with its done checkbox -->

The **Subtasks** column of the [Project overview](../ayon/web-ui/production-tracking/overview.md) and of [lists](../ayon/web-ui/production-tracking/lists.md) shows the subtasks of each task as chips with their done state. A coordinator sees at a glance which shots are half way through their compositing and which have not started, without opening each task.

## Schedule the parts of a long task

<!-- screenshot: Schedule of wing_it with a compositing task split into three dated subtask bars below its parent bar -->

Subtasks with a start and an end date appear as bars in the project's **Schedule**, below the bar of their task. A long task can be split into dated subtasks right on the timeline, and the task bar can stretch to cover its subtasks, so the plan shows when each step happens and who does it. See [Planning](planning.md) and the [Schedule](../addons/production-tracking/planner/index.md#schedule) of the Planner addon.

## Reuse the same checklist

Subtasks are copied and pasted as tab-separated text, one subtask per line. A checklist made on one task can be pasted on others, replacing their subtasks or adding to them, and a list prepared in a spreadsheet can be pasted in the same way. This keeps the steps of a department the same across a sequence.

## Related

- [Subtasks](../addons/production-tracking/planner/subtasks.md) in the Planner addon
- [Planning](planning.md)
- [See where every task stands](tracking-progress.md)
- [Details panel](../ayon/web-ui/details-panel.md)
