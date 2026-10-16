---
title: Planner addon
sidebar_label: Overview
description: "The AYON Planner addon: a studio-level resource and booking timeline with capacity and workload, and a project-level task schedule."
addon: planner
addon_repo: "-"
addon_version: 2.3.2
addon_scope: server
addon_flags: [licensed, beta]
addon_unverified: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/0795203-planner-addon-overview
  - https://help.ayon.app/en/articles/1484826-planner-resources
  - https://help.ayon.app/en/articles/6066407-planner-plan-bookings
  - https://help.ayon.app/en/articles/3791436-planner-schedule-tasks
---

# Planner addon

<AddonInfo />

The Planner addon adds resource planning and task scheduling to the AYON web app. A studio-level **Plan** timeline shows who and what the studio has (people, rooms, machines, licenses), when each resource is booked and how much capacity is left. A project-level **Schedule** timeline shows the project's production tasks as bars with start and end dates, and links them to the bookings. Its settings are on the [settings page](settings.md).

## Availability

| Item | Value |
|---|---|
| Licensing | Premium addon, included with the Studio subscription or an extra with a Pro subscription |
| Where it appears | AYON web app: the studio-level **Plan**, **Resources** and **Projects** tabs (`/dashboard/planner`), and a **Schedule** tab inside each project (`/projects/<project>/scheduler`). Without the addon, both locations show a feature overview. |
| Settings | **Studio settings > Planner** (event access) |

## Concepts

| Concept | What it is |
|---|---|
| Resource | Anything the studio schedules. Types are not fixed; examples are people, spaces, hardware and software licenses. |
| Booking | A block of time that allocates one or more resources, for example an artist with a workstation and a license. |
| Project (planning project) | The project a booking is assigned to, with attributes such as client, brand and producer. |
| Scheduler | The **Schedule** tab of an AYON project: tasks on a timeline linked to the production hierarchy. |
| Scenario | A separate copy of the plan used for what-if timelines. |

Person resources are separate from licensed AYON user accounts, so a team can be forecast with placeholders before the people exist in AYON.

## In the web app

### Resources

The **Resources** tab lists every resource in a table. Resource types are not fixed; examples are people, spaces (review rooms, edit bays, grading suites), hardware (workstations, render nodes) and software (floating licenses).

| Feature | What it provides |
|---|---|
| **Create new resource** | Adds a resource. |
| Inline editing | Edits attributes in the table, also on several selected rows at once. |
| Filter and **Advanced search** | Finds resources by attribute, for example everyone in a location. |
| Attributes | Descriptive fields such as Department, Location, Role or Day Rate, each scoped to resources, bookings, projects or a combination. An attribute scoped to resources and bookings appears twice in **Group by**. |
| Attribute access | In **Resources > Attributes**, the **People with access** panel sets a level for everyone and raises it for users or access groups. By default everyone is an editor. |

Attribute access levels:

| Level | Effect |
|---|---|
| No access | Hidden from everyone except admins. |
| Viewer | Shown read-only. |
| Editor | Can edit. |

Deleting a resource affects the bookings that use it.

### Plan

The **Plan** tab is the studio-level timeline of events. Bookings are created at studio level and can then be assigned to a project; projects and their attributes are managed on the **Projects** page, and the timeline can be grouped by any of them.

#### Event types

| Type | Meaning |
|---|---|
| Capacity | The hours a resource is available to work. |
| Booking | Allocates resources to work and uses up their capacity. |
| Time Off | Sets the resource's capacity to zero for the period, even where capacity events cover it, and highlights clashing bookings. |
| Milestone | Marks a key date such as a delivery or client review. |

#### Bookings

| Feature | Behavior |
|---|---|
| Creation | **Ctrl/Cmd**-drag on the timeline, `S` for creation mode, or **Create Event** in the context menu of empty space. |
| Contextual resource picker | The picker for a new booking is prefiltered by the current grouping or filter. |
| Hours | A booking can use an exact time range (in the **Day** view), or a number of hours spread across several days; an 8-hour booking over two days counts as 4 hours per day. A booking without hours is ignored by the workload graph. |
| Booking statuses | Customizable. New installs have Confirmed, Tentative, Pencil and Pencil 2. One status is marked as the confirmed status; its label can differ. |
| Details | Each booking shows who created and last updated it, and when. |
| Planning project from the dialog | Creates a basic project; its attributes are added on the **Projects** page. |

#### Capacity and workload

| Feature | Behavior |
|---|---|
| Capacity row | **Capacity** in the toolbar shows a blue capacity row above each resource. Capacity events are created in it by **Ctrl/Cmd**-drag or **Create capacity**. They can be duplicated, moved and made recurring. |
| Hours | **Hours total** for the event, or **Hours per day** to spread hours evenly (a week at 8 hours per day is 40 hours). In **Day** view, capacity and bookings can have exact times. |
| Default durations | New events start with a default duration, 8 hours globally. Admins override it per event type and per resource type in the [addon settings](settings.md). |
| Workload indicator | A colored indicator above each resource. Selecting it shows the workload graph; **Workload** in the toolbar shows it for everyone. |
| Workload graph | A dotted line for capacity per day and a solid line for booked hours. Hovering a day shows booked hours, capacity and hours left. |
| **Match capacity** | For selected bookings, creates capacity equal to the booked hours for each day. Used for plans made before capacity existed, whose bookings show red. |
| Duplicate and move | The context menu duplicates or moves an event to the next day or week. |

Workload colors:

| Color | Meaning |
|---|---|
| Grey to green | Capacity available; the green brightens as bookings approach capacity. |
| Bright green | Bookings match capacity exactly. |
| Orange | Slightly over capacity. |
| Red | Significantly over capacity, or booked with no capacity. |

#### Recurring events

Any event can repeat. A series ends on a date or after a set number of occurrences. Changing or deleting one occurrence applies to **Only this event**, **Following events** or **All events**. Recurrence follows RFC 5545; the `rrule` parameter accepts a standard `RRULE` string, such as `FREQ=WEEKLY;INTERVAL=2;BYDAY=WE;COUNT=10`, when events are created through the AYON REST or Python API.

| Pattern | Example |
|---|---|
| Daily | Morning production meeting |
| Weekly | Department sync every Wednesday |
| Weekdays | A suite booked Monday to Friday |
| Selected days | Supervisor on Monday, Wednesday and Friday |
| Monthly | The 25th, or the last Friday of each month |
| Nth weekday | First Monday of each month |
| Custom interval | Every other Wednesday |

#### Time zones

A booking keeps the time zone it was planned in, and opening it shows its time in that zone. The time zone switcher changes how the timeline is displayed, is saved in the browser and does not change bookings. Dragging a booking keeps its original time zone. In **Day** view, non-working hours are greyed like weekends.

#### Scenarios

| Scenario | Behavior |
|---|---|
| Live | Always exists. Changes update the real `start date` and `end date` of production tasks. |
| Staging scenarios | Used to test changes without affecting production. |

The context menu of a scenario tab offers **Rename**, **Duplicate**, **Sync**, **Details**, **Make Live** and **Delete**. **Make Live** asks for confirmation and **Delete** requires typing a confirmation. Only users with permission to manage scenarios see these controls.

#### Event access

A new Planner applies no permissions: everyone can see and edit every event. Admins set event access in **Studio settings > Planner** with two settings, **Studio event access** (events without a project) and **Project event access** (events assigned to a project). Each rule pairs **Everyone**, users or access groups with a level.

| Level | Effect |
|---|---|
| No access | The event is visible as existing; its details are redacted. |
| Viewer | All details; cannot create, edit, move or delete. |
| Editor | Can create, edit, move and delete. |

In **Project event access**, an access group applies per project: a user with the group on a project gets its level for that project's events, so one user can edit one project's events and only view another's. See the [settings page](settings.md).

### Schedule

The **Schedule** tab shows every task of the project as a bar with start and end dates. Moving a bar changes the task's dates; in the Live scenario these are the dates all users see. Moving a parent item moves the tasks inside it. The tab works on the current scenario.

| Feature | What it does |
|---|---|
| **Show Planner** | Displays the scenario's bookings above the task list. A selected booking is ghosted over matching tasks by task type or by assigned resource. Ghosting can be turned off in the page's customize settings. |
| **Create Schedule** (booking context menu) | Applies the booking's dates to matching tasks: all tasks, a task type or the booked people. |
| Subtasks | A button left of a task shows and adds subtasks. A parent task spans the earliest start and latest end of its subtasks. **Split into Subtasks** (task context menu) divides the task at the mouse position. In the Live scenario subtask changes update production data immediately. |

See also [subtasks](../../../production-tracking/subtasks.md).

### Timeline controls

These work in the **Plan** and **Schedule** tabs.

| Action | Control |
|---|---|
| Jump to today | `T` |
| Zoom in and out | `+`, `-` |
| Zoom level | `H` hour, `D` day, `W` week, `M` month, `Q` quarter, `Y` year |
| Zoom into a period | Click its header; **Alt/Option**-click zooms out |
| Fit an item to the view | Hover and press `F` |
| Go to off-screen events | Edge arrow or `G` |
| Select several | Drag a selection box; the selection moves together |
| Snap | Dragging near another event's edge; can be turned off in settings |
| Copy and paste | **Ctrl/Cmd+C**, **Ctrl/Cmd+V**; pastes at the mouse position in a spreadsheet-compatible format |
| Duplicate | Context menu: Down (same dates), Right (after), Left (before) |
| Stamp duplicates | **Shift+Alt/Option+Arrow keys** |
| Undo and redo | **Ctrl+Z**, **Shift+Ctrl+Z**, up to 50 steps |

| Setting | Options |
|---|---|
| Group and filter | By any resource, booking or project attribute. |
| Color by | Resource, project, status and other attributes. |
| Event sorting | Auto (compact stacking), or one row per event sorted by start date, duration or label. |
| Granularity | Events snap to days; **Day** view gives hourly precision. |
| [Views](../../../production-tracking/views.md) | Filters, grouping, sorting and zoom saved and shared; Planner views can be assigned to specific users. |
| **Export events** | CSV or ICS file, or the clipboard, for chosen scenarios and groups. |

## Related

- [Settings](settings.md)
- [Views](../../../production-tracking/views.md)
- [Subtasks](../../../production-tracking/subtasks.md)
- [Teams](../../../production-tracking/teams.md)
- [Users and permissions](../../../ayon/web-ui/users-and-permissions.md)
