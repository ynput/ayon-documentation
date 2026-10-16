---
title: Clockify addon
sidebar_label: Overview
description: "The AYON Clockify addon: it starts and stops Clockify time entries for AYON tasks, adds launcher actions to start a timer and sync projects, and connects to the Timers Manager addon."
addon: clockify
addon_repo: ayon-clockify
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-clockify/tree/0.2.2
  - https://help.ayon.app/en/articles/0909886-clockify
---

# Clockify addon

<AddonInfo />

The Clockify addon connects AYON to [Clockify](https://clockify.me/), a time tracking service. It writes time entries for the AYON task a user works on, using the Clockify REST API and a personal Clockify API key. It also registers itself as a timer connector for the [Timers Manager addon](../timers-manager/index.md), so a timer started in AYON can start a Clockify timer and a timer stopped in Clockify can stop the other connected timers. Its one server setting is described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | newer than 0.3.2 |
| Timers Manager addon | Optional. Needed for timers that start from launching an application or changing task. |
| ayon-ftrack addon | Optional. Needed only for the two ftrack actions listed below. |

The addon has no service and no server-side code besides its settings. Everything runs in the AYON launcher and tray. It does nothing unless a workspace name is set in its settings.

## What it connects

| AYON | Clockify |
|---|---|
| AYON project name | Clockify project with the same name |
| Task type name | Clockify tag with the same name, added to the time entry |
| Folder path and task name | Time entry description, in the form `<folder path without leading slash>/<task name>` |
| Workspace name setting | Clockify workspace the addon works in (exported as the `CLOCKIFY_WORKSPACE` environment variable) |
| Personal API key | Entered by each user in the tray, stored in the AYON secure registry on that machine |

A Clockify project must already exist for a time entry to start. If the project is not found, the timer does not start and the tray shows a message that names the project and the workspace.

## Tray menu

The addon adds a **Clockify** submenu to the AYON tray.

| Entry | What it does |
|---|---|
| **Settings** | Opens the **Clockify settings** window, where the user enters their Clockify API key. The key is validated against Clockify before it is accepted. |
| **Stop timer** | Finishes the running Clockify time entry. Only visible while a timer is running. |

While the tray runs, the addon checks Clockify every 5 seconds for a running time entry. When it finds one that was started from AYON (a project, and a description with at least two `/`-separated items), it reports the project, folder path and task to the Timers Manager. When the entry ends, it tells the Timers Manager that the timer stopped.

## Launcher actions

| Action | Shown when | What it does |
|---|---|---|
| **Clockify - Start Timer** | A task is selected | Starts a Clockify time entry for the selected task, with the task type as the tag. |
| **Sync to Clockify** | A project is selected, or any project exists | Creates, in the Clockify workspace, the Clockify projects that are missing for the selected project (or for all projects when none is selected) and the tags for their task types. It requires that the Clockify user holds the `WORKSPACE_OWN` or `WORKSPACE_ADMIN` role. |

Sync only adds: it does not rename or delete anything in Clockify. Projects that already exist in Clockify are skipped, and tags are only added for projects that the sync created.

## ftrack actions

When the ayon-ftrack addon is enabled, Clockify provides two ftrack actions for the roles Administrator and project Manager. They synchronize the ftrack project name and task type names to Clockify in the same way as the launcher action.

| Action | Where it runs |
|---|---|
| **Sync To Clockify** | In the user's ftrack action menu, on a selected project. Uses the user's API key. |
| **Sync To Clockify (server)** | In the ftrack event server. Reads the `CLOCKIFY_API_KEY` environment variable. |

## Timers Manager connection

The addon exposes the connector methods `start_timer` and `stop_timer` that the Timers Manager calls. A start request needs the project name, folder path, task name and task type, and does nothing if one is missing or if the user has not set an API key. See the [Timers Manager addon](../timers-manager/index.md).

## Related

- [Clockify addon settings](settings.md)
- [Timers Manager addon](../timers-manager/index.md)
