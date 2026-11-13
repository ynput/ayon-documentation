---
title: Event Viewer
description: "The Event Viewer page of the AYON server web app: events table, filtering, detail panel, overview and event topics."
verified: 2026-10-15
ui_purpose: "A live stream of what happens on the server, used to see who changed what and to diagnose failing jobs and services."
ui_location: "App menu (nine dots, top right) > Event Viewer"
ui_url: "/events"
ui_shortcut: "e+e"
ui_access: "Managers and admins"
sources:
  - https://help.ayon.app/en/help/articles/2566382-ayon-event-viewer
---

# Event Viewer

<PageInfo />

The Event Viewer is a live stream of what happens on the AYON server: entity changes, server lifecycle events, background jobs, user actions and, optionally, the server log. Managers and admins use it to see who changed what and to diagnose failing jobs and services. It is where the detailed audit history of the server is browsed. On servers hosted by Ynput, how long the history is kept depends on the [plan](../plans.md).

## Layout

The page has a toolbar above a split view. The left panel (about 70% of the width) holds the events table. The right panel (about 30%) shows either the **Events Overview** or the details of the selected event. The divider can be dragged.

### Toolbar

| Control | What it does |
|---|---|
| **Filter events...** input | Filters the table. Matches against topic, user, project and description. Several terms separated by commas must all match. A term starting with `!` excludes matches. The text is kept in the `search-events` query parameter of the URL. |
| **Show With Logs** switch | Includes server log entries (topics `log.info`, `log.warning`, `log.error`) in the table. The state is remembered for the browser session and is on by default. |

Typing in the filter also queries the server for older matching events (after a short delay, or on Enter), so matches are not limited to the rows already loaded.

## Events table

The table is sorted by update time, newest first. It loads the latest 100 events and fetches 100 more when scrolled to the bottom. New events arrive live while the page is open.

| Column | Content |
|---|---|
| Status icon | Status of the event: check mark for `finished`, cross for `aborted`, error icon for `failed`, timer for `pending`, history icon for `restarted`, spinner for any other status (`in_progress`). |
| **Time** | Time the event was last updated. |
| **Topic** | Event topic, for example `entity.task.created`. |
| **Description** | Human-readable description of the event. |
| **User** | User who triggered the event. Empty for server-originated events. |
| **Project** | Project the event belongs to. Empty for server-wide events. |

Rows of topic `log.error` and `log.warning` are tinted as errors and warnings. When the selected event depends on another event, the parent row is highlighted.

## Events overview

The right panel shows the overview when no event is selected.

| Element | What it shows |
|---|---|
| **Error**, **Server**, **Entity**, **Product**, **Task**, **Version** buttons | Count of loaded events whose topic starts with that prefix (`log.error`, `server`, `entity`, `entity.product`, `entity.task`, `entity.version`). A button applies its name as the table filter; pressing it again clears the filter. **Error** also turns on **Show With Logs**. |
| **Last Error** | Most recent `log.error` entry (description, topic, age), or "No Errors Found". Selecting it opens its details. |
| **Last User** | Most recent event triggered by a user (topic, user, age), or "No Users Found". Selecting it opens its details. |

## Event details

Selecting a row opens its details in the right panel. The close button returns to the overview.

| Element | What it does |
|---|---|
| Header | Topic and update time. The three-dot button (**Full context data**) opens **Event Context**, a dialog with the full event record as JSON (`id`, `topic`, `payload`, `status`, `dependsOn` and the other fields). |
| **Description** | Event description. |
| **Message**, **Traceback** | Shown when the event payload contains a message or a traceback, as in log errors and failed jobs. |
| **User** | User tile with a **Manage user** button (opens the user in **Users**) and a **Filter by user** button (filters the table by that user name). |
| **Project** | Project name, how long ago the project last had an event, a **Project settings** button (opens the project in project settings) and a **Filter by project** button. |
| **Entity** | Entity the event refers to (for reviewable events, the version), with buttons that filter the table by the entity type. |
| **Restart** | Sets the event status to `restarted` so that its handler runs it again. Shown for events with status `finished`, `aborted` or `failed`. The server accepts it for events that depend on another event (jobs created by a service) and for `installer.install_from_url`, `dependency_package.install_from_url` and `addon.install_from_url`. |

## Event topics

Topics are dotted names, such as `entity.task.created` or `settings.changed`. The server dispatches a standard set and addons add their own. The topics, and when each one is raised, are listed in [Well known topics](../../developer/server/event-system.md#well-known-event-topics) on the Event system page.

## Event statuses

`pending`, `in_progress`, `finished`, `failed`, `aborted`, `restarted`.

## Permissions

- The page is available to managers and admins.
- Managers and admins receive events of all users. Other users only receive their own events from the server, and guests none.
- The server license can limit the event history to a number of days.
- Deleting events through the API is limited to admins.

## Related

- [Services](services.md)
- [Users](studio/users.md)
- [Navigation bar](navigation-bar.md)
- [Keyboard shortcuts](quick-navigation.md#keyboard-shortcuts)
