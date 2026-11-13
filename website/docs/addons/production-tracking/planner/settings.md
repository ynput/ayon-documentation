---
title: Planner addon settings
sidebar_label: Settings
description: "The Planner addon settings: event access rules, default event durations, color presets and tags, with their defaults and scopes."
addon: planner
addon_repo: ayon-server-production-planner
addon_version: 2.3.2
addon_scope: server
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-10-19
sources:
  - https://help.ayon.app/en/articles/6066407-planner-plan-bookings
  - https://help.ayon.app/en/articles/1484826-planner-resources
---

# Planner addon settings

<AddonInfo />

The settings of the [Planner addon](index.md) are in **Studio settings > Planner**. They hold the event access rules, the default durations of new events, six color presets and a list of tags. Resources, resource types, booking statuses and attributes are not addon settings; they are data edited on the **Resources** page. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

| Group | Scope |
|---|---|
| Event access | Studio only |
| Default durations, Color Presets, Tags | Studio, with project overrides |

## Event access

A new Planner has no rules: every user can see and edit every event. Each setting is a list of rules; a rule pairs **Everyone**, a user or an access group with a level. Rules are evaluated per user; administrators and managers always have full access.

| Setting | Default | Description |
|---|---|---|
| Studio event access | No rules | Access to events without a project. |
| Project event access | No rules | Access to events assigned to a project. Access groups apply per project: a user gets the level of an access group only for projects on which the group is assigned to that user. |

| Level | Effect |
|---|---|
| No access | The event is listed, but its label, project, schedule link and attributes are redacted, and it cannot be saved. |
| Viewer | All details; cannot create, edit, move or delete. |
| Editor | Can create, edit, move and delete events. |

Access to individual attributes is set on each attribute on the **Resources** page, with the same three levels (see the [overview](index.md#attributes-resource-types-and-statuses)).

## Default durations

New events start with a duration in hours. The effective default for a new event is resolved in this order: the `duration` attribute of the booked resource, the resource type duration, the event type duration, the global duration. The resource-based values apply only when all booked resources give the same value. Hours must be between 0 and 168.

| Setting | Default | Description |
|---|---|---|
| Global Default Duration (hours) | 8 | Duration of new capacity and booking events, unless an event type or resource type has its own. |
| Duration per Event Type | Empty list | Overrides for event types. Each item has an **Event Type** (**Capacity**, **Booking**, **Time off**, **Milestone**; default **Capacity**) and a **Duration (hours)** (default 8). Each event type can appear once. |
| Duration per Resource Type | Empty list | Overrides for resource types, such as rooms. Each item has a **Resource Type** (chosen from the resource types of the studio) and a **Duration (hours)** (default 8). Each resource type can appear once. |

## Color Presets

Six preset colors. The tags endpoint returns them together with the tags under the virtual names `__red`, `__orange`, `__yellow`, `__green`, `__blue` and `__purple`; these names cannot be created or changed through the API.

| Setting | Default |
|---|---|
| Red | `#cd3535` |
| Orange | `#d95a1f` |
| Yellow | `#ebc13a` |
| Green | `#13b76d` |
| Blue | `#0094d8` |
| Purple | `#ac36c3` |

## Tags

| Setting | Default | Description |
|---|---|---|
| Tags | Empty list | Tags to categorize events. Each item has a **Name** (1 to 50 characters, unique within the list) and a **Color** (default `#ac36c3`). Tags are used on the task events of the [Schedule](index.md#schedule). |

## Migration of older settings

Settings saved by earlier versions with the access and duration keys at the top level (`studio_event_access`, `project_event_access`, `default_duration_hours`, `event_type_durations`, `resource_type_durations`) are moved into the **Event access** and **Default durations** groups when loaded.
