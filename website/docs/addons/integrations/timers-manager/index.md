---
title: TimersManager addon
sidebar_label: Overview
description: "The AYON Timers Manager addon: a common interface that starts and stops timers in connected time tracking addons, stops them after user inactivity, and offers a local REST API."
addon: timers_manager
addon_repo: ayon-timers-manager
addon_version: 0.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-timers-manager/tree/0.2.0
---

# TimersManager addon

<AddonInfo />

The Timers Manager addon is a tray service that gives time tracking addons one shared interface. When a timer starts or stops for a task in one connected addon, the Timers Manager relays it to the others. It starts a timer when an application is launched or the task changes in a host, can stop timers after a period of user inactivity, and can pause timers during publishing. By itself it tracks no time: it needs at least one addon that acts as a timer connector, such as the [Clockify addon](../clockify/index.md). Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | newer than 0.3.2 |
| Applications addon | Needed for timers that start on application launch; the launch hook imports it. |
| A timer connector addon | For example Clockify. |

The addon has no service of its own: it runs inside the AYON tray (the tray label is **Timers Service**).

## Connector interface

Any addon can connect by exposing a `timers_manager_connector` object. The Timers Manager ignores a connector that does not have both required methods.

| Method | Required | Purpose |
|---|---|---|
| `start_timer(data)` | Yes | Called when a timer starts elsewhere. `data` holds `project_name`, `folder_id`, `folder_path`, `task_name`, `task_type`, and the deprecated `asset_id`, `asset_name` and `hierarchy`. |
| `stop_timer()` | Yes | Called when the timers should stop. |
| `register_timers_manager(manager)` | No | Passes the manager to the connector so it can report its own events. |
| `get_task_time(project_name, folder_path, task_name)` | No | Returns the tracked time of a task. Used by the `get_task_time` endpoint. |

A connector reports its own events with `timer_started(source_id, data)` and `timer_stopped(source_id)` on the manager. The manager forwards them to every other connector and does not send them back to the source. A failure in one connector is logged and does not stop the others.

## When timers start and stop

| Trigger | Behavior |
|---|---|
| Application launch (local launches) | The post-launch hook `PostStartTimerHook` starts a timer for the launch context. It is skipped when the project, folder path or task name is missing, or when the addon is disabled. |
| Task change in a host | The manager registers a `taskChanged` callback on host install and starts a timer for the new task. |
| Inactivity | Stops all timers, if **Auto stop timer** is on. See below. |
| Publishing | The publish plugins **Start Timer** and **Stop Timer** stop the timers when publishing starts and start them again after integration. They act only when **Disregard publishing** is on. |

Hooks and publish plugins reach the manager through its local REST API, which needs the AYON tray running (the `AYON_WEBSERVER_URL` environment variable). Without it the request is logged as a warning and skipped.

## Idle detection

When **Auto stop timer** is on, the tray watches keyboard and mouse input (with the `pynput` library). A dialog appears when the idle time reaches the configured maximum minus the dialog lead time, with a countdown. If there is no input before the countdown ends, all timers stop. Input resets the countdown.

Auto stop is forced off on macOS and Linux (`pynput` needs root permissions on macOS and can lock threads on Linux), and when the maximum idle time is 0 or less.

## REST API

The tray web server adds these routes under `/timers_manager`, available only when the tray is initialized.

| Method and route | Body | Result |
|---|---|---|
| `POST /timers_manager/start_timer` | JSON with `project_name`, `folder_path`, `task_name` | Stops the running timers, then starts a timer for the context. Status 400 when a field is missing, 404 when the context is not found. |
| `POST /timers_manager/stop_timer` | none | Stops all timers. |
| `GET /timers_manager/get_task_time` | JSON with `project_name`, `folder_path`, `task_name` | JSON object with the tracked time per connector that implements `get_task_time`, keyed by addon name. |

## Related

- [Timers Manager addon settings](settings.md)
- [Clockify addon](../clockify/index.md)
