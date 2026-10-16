---
title: Kitsu addon
sidebar_label: Overview
description: "The AYON integration for Kitsu: what it connects, how projects are paired and synchronized from Kitsu to AYON, the launcher and tray entries it adds, the publish plugins that write notes and reviews to Kitsu, its processor service and its requirements."
addon: kitsu
addon_repo: ayon-kitsu
addon_version: 1.2.7
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-kitsu/tree/1.2.7
  - https://github.com/ynput/ayon-kitsu/releases
  - https://help.ayon.app/en/articles/8645549-configure-kitsu-addon
  - https://help.ayon.app/en/articles/3271341-kitsu-addon-settings
  - https://help.ayon.app/en/articles/6394498-working-with-kitsu-in-ayon
---

# Kitsu addon

<AddonInfo />

The Kitsu addon connects a Kitsu production tracker to AYON. It pairs a Kitsu project with an AYON project, copies the Kitsu structure (episodes, sequences, shots, assets, edits, concepts, tasks, users and casting) to AYON, adds a **Show in Kitsu** launcher action and a **Kitsu Connect** tray login, and provides publish plugins that post notes, status changes and review files to Kitsu tasks. The synchronization runs in one service, `processor`, that listens to Kitsu events. It goes from Kitsu to AYON only. The settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.3.0 or newer |
| Service | `processor`, the Docker image `ynput/ayon-kitsu-processor` with the same version as the addon |
| Kitsu account | A user email and password, stored as AYON secrets and selected in the settings |
| Kitsu server | Concept events are only handled when the Kitsu API (Zou) is version 0.19.0 or newer |

The service runs on an AYON Service Host, and its version must match the addon version.

## What it connects

| Side | What the addon uses |
|---|---|
| Kitsu | The Kitsu server URL and API through the Python client `gazu`, and the Kitsu event stream (`socket.io`) |
| AYON server | Projects, folders, tasks, users, access groups, link types and events |

A paired AYON project stores the Kitsu project id in its project data (`kitsuProjectId`). Synchronized folders and tasks store the Kitsu id of their entity (`kitsuId`). The publish plugins and the launcher action use these ids to find the Kitsu entity.

## Pairing and synchronization

A page in the AYON server web UI, the **Kitsu** tab, lists the projects of Kitsu with the name of the paired AYON project, or **Not paired**. A project that is not paired has a **Pair project** button, a paired one has **Sync now**. Pairing asks for the AYON project name and project code, creates the AYON project from the Kitsu project, stores the Kitsu project id on it and requests a full synchronization. Only AYON managers can pair projects and push or remove entities.

| Part | What happens |
|---|---|
| Project creation | The new AYON project gets folder types, task types, statuses and attributes derived from the Kitsu project, on top of the primary anatomy preset. |
| Full synchronization | The `processor` service handles `kitsu.sync_request` events and synchronizes the assets, shots and tasks of the project, and casting links when enabled. It also runs a full synchronization of every paired project when it starts. |
| Live synchronization | The `processor` service listens to Kitsu events and pushes each change to the addon endpoint `push`. |

### What it synchronizes

| Kitsu entity | In AYON | Notes |
|---|---|---|
| Project | Project anatomy and attributes | Updated on Kitsu project changes. |
| Asset | Folder of the folder type `Asset`, below a folder for its asset type | The asset type folders are created below a root folder `Assets`. |
| Episode, Sequence, Shot, Edit, Concept | Folders of the same folder type | The parent is the Kitsu parent; entities without one go below a root folder named after the type in plural. The folder types `Edit` and `Concept` are added to the project when missing. |
| Task | Task of the folder | Task types and statuses are created when missing; names, short names and icons come from the [default sync info](settings.md#default-sync-info). Assignees are matched to AYON users. |
| Person | AYON user | Only when [Sync users](settings.md#sync-users) is on. The AYON role comes from the Kitsu role by the role mapping, and the user gets the configured default access group. |
| Casting | Links of the configured link type between shots or assets and the assets cast in them | Only when [Sync casting](settings.md#sync-casting) is on. An asset cast several times is stored as several links with an occurrence number, and links removed from the casting are deleted. |

The service reacts to these Kitsu events: `project:update`, `project:delete`, `new`, `update` and `delete` of `asset`, `episode`, `sequence`, `shot`, `task`, `edit`, `concept` and `person`, and `shot:casting-update` and `asset:casting-update`.

## Actions and tools it adds

| Entry | Where | What it does |
|---|---|---|
| **Show in Kitsu** | AYON launcher | Opens the selected project, folder or task in Kitsu in the web browser. Needs a selected project; a folder or task must carry a Kitsu id. |
| **Kitsu Connect** | Tray | Opens the **Kitsu Credentials** dialog for the Kitsu login and password. At start the tray checks the stored credentials and opens the dialog when they are missing or invalid. |
| **Kitsu** tab | AYON server web UI | Pairing list with **Pair project** and **Sync now**. |

The addon sets the global environment variable `KITSU_SERVER`. A process that needs Kitsu, for example a command-line launch, is blocked with an error when the credentials are missing or invalid; valid credentials are exported as the environment variables `KITSU_LOGIN` and `KITSU_PWD`.

## Publishing

Publishing to Kitsu is done by instances that have the `kitsu` family. The plugins are disabled for projects where Kitsu is disabled in the project settings. Actions in Kitsu are attributed to the user whose credentials the tray login stores.

| Plugin | Label | What it does |
|---|---|---|
| `CollectKitsuJobEnvVars` | Collect Kitsu farm environment variables | For local publishes, adds `KITSU_SERVER`, `KITSU_LOGIN` and `KITSU_PWD` to the environment of farm jobs. |
| `CollectKitsuLogin` | Kitsu user session | Logs in to Kitsu with the credentials from the environment. |
| `CollectKitsuEntities` | Kitsu entities | Finds the Kitsu project, entity and task of each instance from the stored Kitsu ids. Publishing fails when the project has no Kitsu id or an entity is not found in Kitsu. |
| `CollectKitsuFamily` | Collect Kitsu Family | Adds the `kitsu` family to instances by [profiles](settings.md#collect-kitsu-family). |
| `CollectKitsuUsername` | Kitsu username | Derives a display name from the Kitsu login and stores it in the instance custom data as `kitsuUsername`. |
| `IntegrateKitsuNote` | Kitsu Note and Status | For instances with the `review` and `kitsu` families, posts the publish comment as a note on the Kitsu task and optionally sets a task status. |
| `IntegrateKitsuReview` | Kitsu Review | Optional. Uploads representations tagged `kitsureview` as previews of the note, with the version number as the revision. It needs the note created by `IntegrateKitsuNote`. |
| `KitsuLogOut` | Kitsu Log Out | Logs out from the Kitsu API at the end of the publish. |

## Services

| Service | Image | What it does |
|---|---|---|
| `processor` | `ynput/ayon-kitsu-processor` | Logs in to Kitsu with the secrets from the settings, listens to Kitsu events, handles `kitsu.sync_request` events and runs the full synchronization of paired projects. |

## Settings areas

| Area | What it configures |
|---|---|
| General | Kitsu server URL and the secrets of the login |
| Publish plugins | Profiles for the `kitsu` family, note status change and the comment template |
| Sync settings | Project deletion, user synchronization, casting links and the default task and status mapping |

## Related

- [Kitsu settings](settings.md)
