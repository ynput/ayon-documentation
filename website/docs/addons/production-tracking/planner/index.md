---
title: Planner addon
sidebar_label: Overview
description: "The AYON Planner addon: a studio-level Plan timeline of resources, bookings, capacity and workload, a Resources page, a project-level Schedule of task dates with scenarios and subtasks, its permissions model and REST API."
addon: planner
addon_repo: ayon-server-production-planner
addon_version: 2.3.2
addon_scope: server
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-10-19
sources:
  - https://help.ayon.app/en/articles/0795203-planner-addon-overview
  - https://help.ayon.app/en/articles/1484826-planner-resources
  - https://help.ayon.app/en/articles/6066407-planner-plan-bookings
  - https://help.ayon.app/en/articles/3791436-planner-schedule-tasks
---

# Planner addon

<AddonInfo />

The Planner addon adds resource planning and task scheduling to the AYON web app. A studio-level **Plan** timeline shows resources (people, rooms, hardware, software), the events that book them, and the capacity and workload that result. A **Resources** page manages the resources and their attributes. A project-level **Schedule** timeline shows the project's tasks as bars with start and end dates, keeps them in sync with the task attributes, and provides subtasks. The addon is a server addon with a web frontend: it has no launcher or DCC part and runs no services. Its settings are on the [settings page](settings.md).

## Requirements

| Item | Value |
|---|---|
| AYON server | 1.16.7 or newer |
| Launcher, other addons, services | None |
| License | Premium feature `planner` (flags `licensed`, `beta`). The web app checks the license and shows a license screen when the feature is missing; the server endpoints do not check it. |
| Database | The addon creates its own tables on the server database (schema `public` and, per initialized project, the project schema). Tables are created and updated when the addon version is the production bundle's version. |

## Where it appears

| Location | Name | What it is |
|---|---|---|
| `/dashboard/bookings` | **Plan** | Studio-level timeline of bookings, capacity, time off and milestones. |
| `/dashboard/resources` | **Resources** | Table of resources, plus resource types, booking statuses and attributes for admins and managers. |
| `/projects/<project>/scheduler` | **Schedule** | Project timeline of task events. |
| Details panel, **Subtasks** tab, and the **Subtasks** column of task tables | Subtasks manager | Provided to the host app as a module; see [Subtasks](../../../production-tracking/subtasks.md). |

The studio-level **Projects** page belongs to the AYON web app itself and is available without the addon. Without the addon, `/dashboard/planner` and the project **Schedule** tab show a feature overview, and the subtasks views show a notice about the Planner addon.

## Data the addon stores

| Entity | What it is | Stored in |
|---|---|---|
| Resource | Anything that can be booked: label, resource type, attributes, optional link to an AYON user (`person` type only). The pool flag exists in the data model but is hidden in the interface. | `public.planner_resources` |
| Resource type | Category of resources with label, icon and color. Defaults on first start: Person, Room, Software, Hardware. | `public.planner_resource_types` |
| Attribute | Custom field of resources and/or events, with data type, scopes, optional enum options and an access list. | `public.planner_attributes` |
| Booking event | An item on the Plan timeline: type, label, time range, status, optional project, track and scenario, attributes, resources, links between events. | `public.planner_booking_events` |
| Booking | One resource's slice of a booking event (unit count, time range, net duration). Workload is computed from these rows. | `public.planner_bookings` |
| Booking status | Label, color, icon, a **confirmed** flag and a **default** flag. | `public.planner_booking_statuses` |
| Track | A named lane that groups events, optionally bound to one project. | `public.planner_booking_tracks` |
| Recurrence schedule | An RFC 5545 rule with time zone that generates events. | `public.planner_booking_schedules` |
| Scenario | A named copy of a plan. Exactly one scenario per set is live. Booking scenarios are studio-wide; the Schedule has its own scenarios per project. | `planner_scenarios` in `public` and in each project schema |
| Task event | The bar of a task, or of a subtask, in a scenario of the project Schedule. | `planner_task_events` in the project schema |

Event access and attribute access are not stored in these tables but in the [addon settings](settings.md#event-access) and in each attribute's access list.

## Resources

The **Resources** page lists resources in a table with the columns **Name**, **Resource Type**, one column per attribute, and **ID**.

| Feature | Behavior |
|---|---|
| Person resources | Every AYON user (except support and service users) gets a `person` resource, created when the addon starts and whenever a user is created. A person resource can also exist without an AYON user, for example as a placeholder; only `person` resources can be linked to a user. |
| Resource editing | Only admins and managers can create, edit or delete resources. Deleting a resource removes its bookings. |
| Filtering | Filter and advanced search by attribute; a new resource takes the values of the active filter. |
| **Show restricted resources** | Lists person resources that are redacted for the current user. Admins and managers always see everything. |
| Visibility of people | Users who are not managers see another person resource only when the two users share at least one project through access groups; otherwise the resource is redacted (empty label and no attributes). When the server limits user visibility, all other people are redacted. Managers and admins are never redacted. |
| Undo | 100 steps on the Resources page. |

### Attributes, resource types and statuses

Admins and managers get an **Attributes** mode on the page with lists for attributes, resource types and booking statuses.

| Item | Details |
|---|---|
| Attribute scopes | `resource` (optionally limited to resource types) and `event` (optionally limited to event types). A scope without a list applies to all types. |
| Data types | The AYON attribute types: `string`, `integer`, `float`, `boolean`, `datetime`, `list_of_strings`, `list_of_integers`, `list_of_any`, `list_of_submodels` and `dict`. An enum can be fixed options or resolved from a server enum such as `taskTypes`. |
| Default attributes | **Department** (resource and event scopes, with Animation, Lighting, Layout options), **Task Types**, **Effort**, **Billable** (event scope), **Duration** (resource scope, float). Created only when missing. |
| Attribute access | Per attribute: **No access**, **Viewer** or **Editor** for everyone, users or access groups. With no rules, everyone is an editor. Managers and admins always have full access. |
| Resource types | Label, icon, color, order. Deleting a type that resources use is refused by the database. |
| Booking statuses | Label, color, icon, order, **confirmed** flag (any number of statuses can be confirmed) and one **default** status applied to new events. New installs have **Confirmed** (confirmed), **Tentative** (default), **Pencil** and **Pencil 2**. |

## Plan

The **Plan** page is a timeline of booking events grouped by resource by default.

### Event types

| Type (`event_type`) | UI label | Meaning |
|---|---|---|
| `capacity` | Capacity | Hours a resource can work. |
| `allocation` | Booking | Allocates one or more resources to work. |
| `absence` | Time off | Removes capacity. A time off without hours (all day) sets the day's capacity to zero; a time off with hours is subtracted from capacity. |
| `milestone` | Milestone | A key date. |

### Booking events

| Feature | Behavior |
|---|---|
| Creation | **Ctrl/Cmd**-drag creates a booking, **Ctrl/Cmd+Alt**-drag a time off; `S` toggles creation mode; the context menu has **Create**. A new event is prefilled by the current grouping or filter. |
| Fields | Label, type, status, time, repeat, duration, resources (with unit count), project, track and the attributes scoped to the event type. Each event records who created and last updated it, and when. |
| Project | A booking can be assigned to an AYON project. The project selector can create a new project; it is created as a skeleton project (name, code, label and color, default anatomy preset). An event's track and project must match: a track bound to a project accepts only events of that project, and a track without project accepts only events without one. |
| Status | New events take the default status. The status's **confirmed** flag decides whether the event counts as confirmed or unconfirmed workload. |
| Hours | An event has a start, an end and an optional net duration in seconds. In the dialog the duration is **hours total** or **hours per day** (a total is spread evenly over the days of the event: 8 hours over two days count 4 hours per day). All-day events without hours are not counted in the workload. |
| Default hours | New events use a default duration, resolved in this order: the `duration` attribute of the booked resource, the duration of its resource type, the duration of the event type, then the global default (8 hours). Resource-based values apply only when all booked resources agree. Defaults are [addon settings](settings.md#default-durations). |
| Dependencies | Events can link to other events (`depends_on`, `dependents`) through the API; circular links are rejected by the database. The timeline does not draw them. |
| Search | Resources and events keep a text search index; it can be rebuilt through the API by managers. |

### Capacity and workload

Capacity events are shown in a capacity row above each resource; a workload indicator above each resource shows how much of the capacity is booked. Both are toggled in the toolbar (**Shift+C** and **Shift+W**) and are on by default.

| Quantity | Computation |
|---|---|
| Capacity per day | Hours of `capacity` events minus hours of partial time off; zero when the day has an all-day time off. |
| Booked per day | Hours of `allocation` events, confirmed plus unconfirmed, spread over the days of each event. |
| Workload color | Grey to green with the booked share of capacity; full green at exactly 100 percent. Orange when over capacity by up to one hour per day. Red when over by more than one hour, including bookings on days without capacity. |
| Tooltip | Booked hours, capacity and the hours left or over. |
| **Match capacity** | Event context menu action on bookings: creates capacity events equal to the booked hours. |

### Recurring events

Any event can repeat. The rule is an RFC 5545 `RRULE` with a time zone, evaluated in that zone (so wall-clock times hold across daylight-saving changes).

| Preset | Notes |
|---|---|
| Does not repeat, Daily, Weekly on a day, Monthly on the nth weekday, Annually, Every weekday | Presets end one calendar year after the event starts. |
| Custom | Day, week, month or year interval; weekdays for weekly rules; monthly by date or by nth weekday; ends on a date or after 1 to 10000 occurrences. |

Edits and deletions apply to this event only, this and following events, or the whole series. A deleted single occurrence is kept as a hidden ghost so the series does not recreate it. The API accepts any valid `RRULE` string.

### Time zones

An event keeps the time zone it was planned in. The viewing time zone switcher changes only how the timeline is displayed and is stored in the browser. All-day events are stored as UTC calendar dates.

### Scenarios

Scenarios are separate versions of a plan. Events without a scenario are shared by every scenario.

| Action | Who |
|---|---|
| List scenarios | Everyone |
| Create, rename, reorder, duplicate, set live, delete | Admins and managers |

The scenario menu offers **Delete**, **Details**, **Rename**, **Duplicate** and **Make Live**; making a scenario live asks for confirmation and applies to all users. See [Schedule](#schedule) for the **Sync** action.

## Schedule

The **Schedule** tab of a project shows one bar per task (and per subtask) as task events of the current scenario. The first time the Schedule opens for a project, the web app initializes the project tables and creates the first live scenario.

| Feature | Behavior |
|---|---|
| Task events | One main event per task with start, end and assignees, plus one event per subtask that has both dates. Moving a parent moves its subtasks; a parent spans its subtasks when **Link parent & subtasks** is on (default). |
| Creation | **Create** in the context menu: **Event**, **Sub task**, **Milestone**. |
| **Split into subtasks** | Divides the selected event at the mouse position into subtask events. |
| **Sync with subtasks** | Resizes a parent event to its subtasks. |
| Tags | Task events can carry tags. The tag list and six color presets are [addon settings](settings.md#tags). |
| Grouping | None, folder or an attribute; the page also has a filter and a slicer. |
| **Show Plan** (`P`) | Overlays the studio Plan above the task list, with its own scenario, grouping, **Show capacity** and **Show workload**. Selected bookings are ghosted over tasks that match by **Task Types** or **People**. |
| **Create schedule** | On a booking in the overlay: applies the booking's dates to matching tasks (all, by task type, or by people). |
| Group adjustment | Moving or scaling a group of tasks rescales every task event in the group in proportion. |

### Synchronization with tasks

| Direction | Trigger | Effect |
|---|---|---|
| Tasks to events | The server handles task created, `startDate` or `endDate` changed, assignees changed and subtasks changed events. | Updates the main and subtask events of the **live** scenario. Tasks without both dates are skipped. |
| Events to tasks | Changes in the live scenario are queued and sent 2 seconds after the last change; making a scenario live; **Sync** in the live scenario's menu. | Overwrites `startDate`, `endDate`, assignees and subtasks of the tasks. Subtasks missing from the events are unscheduled (their dates are cleared). |

**Sync** has two directions, **Events → Tasks** (live scenario only) and **Tasks → Events**. Edits in non-live scenarios never change tasks.

### Subtasks

Subtasks are stored in the task data (`subtasks`). The Subtasks manager is exposed to the AYON web app (details panel tab and task table column) and is used by the Schedule. Subtask events are created from subtasks that have a start and an end date.

## Timeline controls

Shortcuts work in the Plan and Schedule timelines when no dialog or text field has focus.

| Action | Control |
|---|---|
| Jump to today | `T` |
| Zoom | `+`, `-`; `H` hour, `D` day, `W` week, `M` month, `Q` quarter, `Y` year (default week) |
| Fit item, go to off-screen events | `F`, `G` |
| Create mode | `S` |
| Copy, paste | **Ctrl/Cmd+C**, **Ctrl/Cmd+V** (tab-separated, spreadsheet compatible) |
| Duplicate | **Shift+Alt+Arrow** keys in the direction; in the Plan **Shift+Ctrl/Cmd+Left/Right** duplicates to the previous or next period |
| Delete | `Delete` or `Backspace` |
| Undo, redo | **Ctrl/Cmd+Z**, **Ctrl/Cmd+Shift+Z** or **Ctrl+Y**; 50 steps |
| Event info | **Ctrl/Cmd+I** |
| Refresh | **Shift+R** (Plan) |

| Setting | Options |
|---|---|
| Group by (Plan) | Track, resource, resource type, project, event type, status, any event attribute or resource attribute; several levels. |
| Color by | Resource, project, status and other attributes. |
| Event sorting | Multi-level sort by **Start Date**, **Duration**, **Name**, **Task Type** or **Resource Count**. |
| **Snap to events** | On by default. |
| Event preview | Hover preview, on by default. |
| [Views](../../../production-tracking/views.md) | Filters, grouping, sorting, zoom and the settings above are saved in views. |
| **Export** (Plan only) | The bookings of a date range and selected groups as CSV (spreadsheet) or ICS (calendar), or copied to the clipboard. On the Schedule, tasks can only be copied as tab-separated rows. |

## Permissions

| Operation | Who |
|---|---|
| View the Plan, find events and resources | Everyone with the license; event content is redacted per [event access](settings.md#event-access) and attribute values per attribute access. |
| Create, edit, move, delete booking events | Users with the Editor level for the event's project (or the studio level for events without a project); admins and managers always. Setting an attribute also needs Editor access to that attribute. |
| Create, edit, delete resources, resource types, statuses, tracks, attributes | Admins and managers |
| Scenarios (create, update, delete, duplicate) | Admins and managers |
| Task events (Schedule) | Users with read or update access to the task's folder; users with attribute write restrictions also need write access to `startDate`, `endDate` and `assignees`. |
| Tags | Any user |

Event access rules are evaluated by the AYON server's entity access helper. In the open-source server that helper is a placeholder that allows everything, so rules take effect only on a server that implements it.

## Integration with AYON

| Mechanism | Detail |
|---|---|
| Frontend modules | `SchedulerProject` (Schedule tab), `BookingsStudio` (Plan), `ResourcesStudio` (Resources) and `SubtasksManager`. |
| Server events handled | `entity.user.created` (creates a person resource), `entity.task.created`, `entity.task.attrib_changed`, `entity.task.assignees_changed`, `entity.task.data_changed` (sync to the live scenario), `bundle.updated` (re-run setup). Handlers are active only when the addon version is the production bundle's version. |
| Server events dispatched | `planner.scenario.created`, `planner.scenario.updated`, `planner.scenario.deleted`, `scheduler.event.created`, `scheduler.event.updated`, `scheduler.event.deleted`. |
| Task data written | `attrib.startDate`, `attrib.endDate`, `assignees`, `data.subtasks`, `data.subtaskSyncID` and `data.schedulerSyncData`. |

## REST API

Endpoints are under `/api/addons/planner/<version>/`.

| Path | Purpose |
|---|---|
| `booking/events` (`POST`, `PATCH`/`DELETE` on `/{id}`), `booking/events/find` | Booking events. `DELETE` takes `scope`: `event`, `future` or `schedule`. |
| `booking/events/{id}/schedule`, `.../split-schedule`, `booking/schedule` | Recurrence of events. |
| `booking/resources`, `booking/resources/find`, `booking/resource-types`, `booking/statuses`, `booking/tracks`, `booking/attributes` | Resources and their configuration. |
| `booking/find-allocations` | Capacity and booked time per resource and time step (used for the workload). |
| `booking/planner-access` | Event and attribute access level of the current user. |
| `scenarios`, `scenarios/{id}/duplicate`, `tags` | Scenarios (studio or `?project=`) and tags. |
| `taskEvents`, `taskEventsOperations`, `taskGroups`, `taskGroups/adjust`, `syncEventsToTasks` | Schedule task events and sync (require `project`). |
| `setup/booking`, `setup/scheduler/{project}` | Initialization status and initialization of the Plan and of a project's Schedule. |

The legacy `events`, `tracks` and `setup` (root) routes are marked deprecated.

## Related

- [Settings](settings.md)
- [Views](../../../production-tracking/views.md)
- [Subtasks](../../../production-tracking/subtasks.md)
- [Teams](../../../production-tracking/teams.md)
- [Users and permissions](../../../ayon/web-ui/users-and-permissions.md)
