---
title: AYON server event system
sidebar_label: Event system
description: "The event system of the AYON server: persistent and fire-and-forget events, event fields and statuses, dispatching and updating events on the server and from clients or services, permissions for changing and deleting events, the enroll endpoint that services use to take jobs (with retries), a short service example and a table of well known event topics."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/events/base.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/events/typing.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/events/eventstream.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/events/enroll.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/events/patch.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/context.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/messaging.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/events/events.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/events/enroll.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/events/operations.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/background/log_collector.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/helpers/thumbnails/invalidate_thumbnail.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/create_activity.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/_api.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/_api_helpers/events.py
  - https://github.com/ynput/ayon-workflow/blob/develop/client/ayon_workflow/workflow_execution/from_event.py
---

# AYON server event system

The AYON server records what happens on it as events. Events are used for logging, audit trails, job control and notifications. Services use them to find work and to report progress.

Stored events can be browsed in the web app. See [Event Viewer](../../ayon/web-ui/event-viewer.md).

## Event types

| Type | Stored | Use |
|---|---|---|
| Persistent | Yes, in the `events` table | Logs, audit trail, jobs, dependencies between events. |
| Fire-and-forget | No | Real-time notifications to connected clients, for example UI refresh requests. |

Both types are sent to connected clients over WebSocket. An event is fire-and-forget when it is dispatched with `store=False`. Fire-and-forget events never show in the Event Viewer.

## Event fields

| Field | Description |
|---|---|
| `id` | Unique ID, created by the server when the event is dispatched. |
| `hash` | A second unique key. Defaults to the event ID. A dispatcher can set its own hash so the same event is not stored twice, for example a hash built from an external system's event ID. |
| `topic` | The only required field. Describes what happened, for example `entity.folder.created`. |
| `sender` | ID of the process that sent the event, for example a service name. Taken from the `X-Sender` header when not given. A client can use it to recognize its own events coming back over WebSocket. |
| `sender_type` | Kind of sender, for example a service type. Taken from the `X-Sender-Type` header when not given; defaults to `api` for REST requests. |
| `project` | Name of the project the event belongs to, if any. Not linked to the projects table, so the event stays after the project is deleted. |
| `user` | Name of the user who caused the event. Defaults to the user of the request. Not linked to the users table either. |
| `depends_on` | ID of the event that started this one. Used by [enroll](#enroll-taking-jobs). The referenced event must exist. |
| `status` | Current status, see [Statuses](#statuses). |
| `retries` | How many times the event has been retried. |
| `description` | Short, human-readable text, shown in the Event Viewer table. |
| `summary` | Small JSON object with the key data of the event. Sent to clients in real time. Its structure should stay the same for one topic. |
| `payload` | Full JSON data of the event. Only available over REST, not sent over WebSocket. |
| `created_at`, `updated_at` | Timestamps. |
| `progress` | Completion percentage. **Not stored.** It is only sent over WebSocket when an event is updated with a progress value, for example to drive a progress bar. |

### Statuses

| Status | Meaning |
|---|---|
| `pending` | Created, not started yet. |
| `in_progress` | Being processed. |
| `finished` | Done. Default for new events. |
| `failed` | Processing failed. |
| `aborted` | Processing was stopped. |
| `restarted` | Marked to run again. |

A new event is `finished` unless it is dispatched with `finished=False`; then it is `pending`.

## Dispatching and updating events

### On the server

Server code (core and addons) uses `EventStream` from `ayon_server.events`.

`EventStream.dispatch(topic, ...)` creates an event and returns its ID.

| Argument | Default | Description |
|---|---|---|
| `topic` | required | Event topic. |
| `hash` | event ID | Unique key. Dispatching a second event with the same hash fails, unless `reuse` is set. |
| `reuse` | `False` | If an event with the same hash exists, overwrite it with the new data (new ID included) instead of failing. Fails when another event depends on the old one. |
| `finished` | `True` | `False` creates a `pending` event. |
| `store` | `True` | `False` creates a fire-and-forget event. |
| `recipients` | all users | List of user names that get the event over WebSocket. |
| `sender`, `sender_type` | from the request | See [Event fields](#event-fields). |
| `project`, `user`, `depends_on`, `description`, `summary`, `payload` | empty | See [Event fields](#event-fields). |

`EventStream.update(event_id, ...)` changes `status`, `description`, `summary`, `payload`, `project`, `user`, `retries`, `sender` and `sender_type`, and can send a `progress` value. With `store=False`, the change is only sent to clients and not saved.

Server code can also react to events with `EventStream.subscribe(topic, handler)`. A topic ending in `.*` matches every topic with that prefix.

### From clients and services

Clients and services use the REST API, or the matching [ayon-python-api](../api/python.md) helpers.

| REST endpoint | ayon_api helper | Description |
|---|---|---|
| `POST /api/events` | `dispatch_event` | Create an event. Accepts `topic`, `sender`, `hash`, `project`, `description`, `summary`, `payload`, `finished`, `store` and `reuse`. The user is always the caller. |
| `GET /api/events/{id}` | `get_event` | Read one event, payload included. |
| `PATCH /api/events/{id}` | `update_event` | Update an event. |
| `DELETE /api/events/{id}` | none | Delete an event. |
| `POST /api/enroll` | `enroll_event_job` | Take a job, see [Enroll](#enroll-taking-jobs). |

Many events can be listed and filtered with the `events` query of the [GraphQL API](../api/graphql.md), or with `get_events` in ayon_api.

## Permissions

| Action | Who |
|---|---|
| Create an event (`POST /api/events`) | Managers and admins. |
| Read an event | Everyone except guests. Users who are not managers need access to the event's project. |
| Update an event | Managers and admins can update any event. Other users only their own events, and they cannot change the event's user. |
| Change the status of an event | Services: any event. Others: only events that have `depends_on` set, or whose topic is `addon.install_from_url`, `dependency_package.install_from_url` or `installer.install_from_url`. |
| Change the status of an `action.launcher` event | The user who created it, or an admin. |
| Delete an event | Admins only. |
| Bulk delete (`POST /api/eventops`) | Admins only. Deletes all events matching a filter. Only the `delete` operation is implemented; `restart` and `abort` return "Not implemented". |

## Enroll: taking jobs

Services use `POST /api/enroll` to get the next job. A job pairs a **source event** (something that happened) with a **target event** (the work done because of it). The target event has `depends_on` set to the source event.

:::note Services only
Only service users can enroll. Other users get `403 Forbidden`.
:::

### Request

| Field | Default | Description |
|---|---|---|
| `sourceTopic` | required | A topic or a list of topics. A single topic can use `*` as a wildcard. |
| `targetTopic` | required | Topic of the target event. No wildcards. |
| `sender` | `X-Sender` header | Name of the worker. |
| `senderType` | `X-Sender-Type` header | Type of the worker. |
| `description` | `Convert from <source> to <target>` | Description of the new target event. |
| `sequential` | `false` | Process source events strictly in order. If the next source event is already taken by another worker, return nothing instead of skipping it. |
| `filter` | none | Query filter applied to the source events, for example on `payload/newValue`. |
| `maxRetries` | `3` | How many times a failed target event is retried. |
| `ignoreSenderTypes` | none | Skip source events from these sender types. |
| `ignoreOlderThan` | `3` | Skip events older than this many days. `0` means no limit. |

### What happens

1. The server looks for the oldest `finished` source event that has no `finished` target event yet.
2. If there is no target event, it creates one with status `pending` and returns it. The target hash is built from the target topic and the source event ID, so two workers cannot create the same job.
3. If a target event exists from another worker, the source event is skipped (or nothing is returned when `sequential` is set).
4. If a target event exists from the same worker, it is returned again.

The response contains `id` (target event), `dependsOn` (source event), `hash` and `status`.

| Response | Meaning |
|---|---|
| `200` | A job was returned. |
| `204` | Nothing to process. |
| `503` | The database connection pool is low, or the same enroll request is already running. Try again later. |

### Retries

- A `failed` target event is set back to `pending` and its `retries` count goes up by one. Once `retries` is above `maxRetries`, the source event is no longer offered.
- A `restarted` target event is set back to `pending` without changing `retries`.

### Example service loop

A minimal service with [ayon-python-api](../api/python.md). It reacts to folder status changes and marks each job as finished.

```python
import time
import ayon_api

ayon_api.init_service()

while True:
    job = ayon_api.enroll_event_job(
        source_topic="entity.folder.status_changed",
        target_topic="example.on_folder_status",
        sender="example-service-01",
        description="Reacting to a folder status change",
    )
    if not job:
        time.sleep(2)
        continue

    source = ayon_api.get_event(job["dependsOn"])
    ayon_api.update_event(job["id"], status="in_progress")
    try:
        ...  # do the work with source["payload"]
    except Exception:
        ayon_api.update_event(job["id"], status="failed")
    else:
        ayon_api.update_event(job["id"], status="finished")
```

## Well known event topics

The server dispatches these topics, mostly as a response to a user action. The table is sorted by topic. `{type}` is an entity type such as `folder`, `task`, `product`, `version`, `representation` or `workfile`.

| Topic | Emitted when |
|---|---|
| `access_group.updated`, `access_group.deleted` | An access group is saved or deleted. |
| `action.launcher` | A user runs an action that the launcher has to execute. |
| `activity.created`, `activity.updated`, `activity.deleted` | A comment or other activity changes. Status, assignee and version publish activities are not stored. |
| `addon.install`, `addon.install_from_url` | An addon is uploaded, or installed from a URL. |
| `auth.login`, `auth.logout` | A user logs in or out. |
| `bundle.created`, `bundle.updated`, `bundle.status_changed` | A bundle is created, changed or promoted. |
| `database_import` | A database file is imported. |
| `dependency_package.install`, `dependency_package.install_from_url` | A dependency package is uploaded, or installed from a URL. |
| `entity.project.changed` | A project is updated. Also emitted per field: `config_changed`, `statuses_changed`, `tags_changed`, `folder_types_changed`, `task_types_changed`, `attrib_changed`, `active_changed` and the others above. |
| `entity.project.created`, `entity.project.deleted` | A project is created or deleted (`entity.project_skeleton.*` for project skeletons). |
| `entity.project.renamed` | A project is renamed. |
| `entity.task.assignees_changed` | Assignees are set through the task assign endpoint. |
| `entity.{type}.assignees_changed`, `product_type_changed`, `author_changed`, `files_changed` | Task assignees, product type, version author or representation files change. |
| `entity.{type}.attrib_changed` | An entity's attributes change. |
| `entity.{type}.created`, `entity.{type}.deleted` | An entity is created or deleted. |
| `entity.{type}.data_changed`, `label_changed`, `type_changed`, `thumbnail_changed`, `active_changed` | The matching field changes (`type_changed` covers folder type and task type). |
| `entity.{type}.parent_changed`, `folder_changed`, `task_changed`, `product_changed`, `version_changed` | An entity is moved to another parent. |
| `entity.{type}.renamed` | An entity's name changes. |
| `entity.{type}.status_changed` | An entity's status changes. |
| `entity.{type}.tags_changed` | An entity's tags change. |
| `entity.user.created`, `entity.user.deleted`, `entity.user.renamed` | A user is created, deleted or renamed. |
| `entity_list.created`, `entity_list.changed`, `entity_list.deleted` | An entity list is created, saved or deleted. |
| `import.data` | A data import (or its validation) runs. |
| `inbox.message` | A user gets an inbox notification (fire-and-forget). |
| `installer.install`, `installer.install_from_url` | A launcher installer is uploaded, or installed from a URL. |
| `link.created`, `link.deleted`, `links.created` | A link is created or deleted, or many links are created at once. |
| `log.{level}` | A server log entry, for example `log.info`, `log.warning`, `log.error`. Only levels from the configured database log level up are stored (default `INFO`). |
| `maintenance` | Scheduled maintenance runs. |
| `reviewable.created` | A reviewable is uploaded. |
| `reviewable.process` | Created by a transcoding service, not by the server. The server reads it to show the processing state of reviewables. |
| `server.attributes_updated` | The attribute configuration changes. |
| `server.log_collector_started` | Server log collection starts. |
| `server.restart_requested` | An admin asks the server to restart. |
| `server.restart_required` | A change needs a server restart (only one such event is kept). |
| `server.started` | The server starts. |
| `settings.changed` | Studio, project or site settings of an addon change. |
| `user.log_fail` | A login attempt fails. |

:::note Not in the Event Viewer
`thumbnail.updated` is fire-and-forget, and `heartbeat` is sent over WebSocket only. Neither is stored, so neither shows in the Event Viewer.
:::

:::tip Addon topics
Addons and services add their own topics. Prefix them with the addon name. For example, ayon-workflow uses `workflow.from_simple_action.local` and `workflow.from_simple_action.remote`.
:::
