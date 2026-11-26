---
title: Flow (ShotGrid) addon
sidebar_label: Overview
description: "The AYON integration for Autodesk Flow Production Tracking (ShotGrid): the project, hierarchy, task, version, note and playlist synchronization, the Leecher, Processor and Transmitter services, the Shotgrid settings page and the movie path publish plugin."
addon: shotgrid
addon_repo: ayon-shotgrid
addon_version: 0.6.20
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-shotgrid/tree/0.6.20
  - https://github.com/ynput/ayon-shotgrid/releases
  - https://help.ayon.app/en/articles/3639938-configure-flow-shotgrid-addon
---

# Flow (ShotGrid) addon

<AddonInfo />

The Flow (ShotGrid) addon connects AYON to Autodesk Flow Production Tracking, formerly called ShotGrid. The addon keeps the name `shotgrid` in AYON, and its settings page is titled **Shotgrid**. It synchronizes project structure, tasks, statuses, versions, notes and playlists between a Flow site and AYON projects, using three services that talk to the Flow API with a Flow script account. It also adds a publish plugin that writes media paths onto the synchronized Flow versions. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.12.5 or newer |
| AYON core addon | 0.3.0 or newer |
| Services | `ShotgridLeecher`, `ShotgridProcessor` and `ShotgridTransmitter`, started from the AYON server (Docker images `ynput/ayon-shotgrid-<service>:<addon version>`) |
| Flow | A site URL and a Flow script (script name and API key) with access to the projects to synchronize |

The addon has to be part of the production bundle for its settings page to appear.

## What it connects

| AYON | Flow |
|---|---|
| AYON server, through the addon settings and the three services | The Flow site set in **ShotGrid URL**, reached with the script name and API key stored as AYON secrets |
| AYON projects | Flow projects. The field set in **ShotGrid Project Code field name** supplies the AYON project code. |
| AYON users | Flow users. The addon stores the Flow user id in the AYON user data and exposes an endpoint that returns the AYON user name for a Flow user id. |

## What it synchronizes

The entity types that take part are chosen with **ShotGrid Enabled Entities** in the settings. The addon maps them to AYON entities as follows.

| Flow entity | AYON entity |
|---|---|
| Project | Project |
| Episode, Sequence, Scene, Shot, Asset | Folder |
| Task | Task |
| Version | Version |
| Note, Reply | Comment (see the note below) |
| Playlist | List |

Each synchronized AYON entity carries the attributes `shotgridId` and `shotgridType`. The addon creates these on the server, together with the project attribute `shotgridPush`, when it starts, and asks for a server restart if it had to create or change them.

| Synchronized data | Direction |
|---|---|
| Folder, task and version creation, removal and renaming | Both directions |
| Status of folders, tasks and versions | Both directions |
| Task assignees | Both directions. Assignees are matched through synchronized users. |
| Tags | AYON to Flow through the tag change events of folders and tasks. The Flow to AYON direction is handled by the hierarchy synchronization. |
| Folder attributes | Both directions, through the **Folder Attributes Map** setting |
| Notes and comments | Both directions when `Note` is enabled |
| Reviewables | A reviewable created in AYON is uploaded to the matching Flow version |
| Playlists and AYON lists | Both directions, for both automatic and manual synchronization |
| Hero versions | Not sent from AYON to Flow (since 0.6.20) |

`Reply` is one of the Flow entity types that can be enabled, and the addon listens for reply events.

The addon adds a frontend page (scope `settings`) to the AYON server that lists the Flow and AYON projects. Each row has a **Flow ► AYON** and an **AYON ► Flow** button for manual project synchronization, and a column that shows whether automatic synchronization runs in one direction, both, or neither. The page also has a button that creates AYON users from Flow users. After that, automatic synchronization depends on two switches:

| Direction | Switch |
|---|---|
| Flow to AYON | The **Ayon Auto Sync** checkbox on the Flow project (the field `sg_ayon_auto_sync`) |
| AYON to Flow | The `shotgridPush` attribute of the AYON project |

On a Flow project the addon creates the custom fields `sg_ayon_id`, `sg_ayon_sync_status`, `sg_ayon_auto_sync`, `sg_ayon_project_code` and `sg_ayon_server_url`.

## Services

| Service | What it does |
|---|---|
| `ShotgridLeecher` | Watches Flow event logs for the enabled entity types of projects that have the auto sync field on, and stores them in AYON as `shotgrid.event` events. |
| `ShotgridProcessor` | Processes the stored `shotgrid.event` events one at a time and applies them to AYON. It also handles the manual project synchronization requests (project creation, `sync-from-shotgrid`). |
| `ShotgridTransmitter` | Listens for AYON `entity.*` events and pushes them to Flow. It also synchronizes comments. It ignores events caused by the synchronization itself. |

The Leecher and the Processor are separate so that the Processor can be restarted without losing events. All three use the polling interval from the service settings and read the script credentials from the AYON secrets named in them.

## Publishing

| Plugin | Label | What it does |
|---|---|---|
| `IntegrateMoviePath` | Integrate event for Flow movie paths | After integration, picks a representation by profile (host, product base type, task type, task name) and sends its local path to the server, so the synchronized Flow version gets `sg_path_to_movie`. Image sequences also set `sg_path_to_frames` with `#` padding, and a slate sets `sg_frames_have_slate`. Without a matching representation it falls back to the thumbnail. Farm instances are skipped. |
| `CollectShotgridJobEnvVars` | Collect Shotgrid farm environment variables | For local publishes, adds `AYON_SG_USERNAME` to the environment of farm jobs, when it is set. |

The addon also registers the trait `shotgrid.moviepath.v1` (**Use as sg_path_to_movie**) that marks a representation as the source of the movie path.

## Related

- [Flow (ShotGrid) addon settings](settings.md)
