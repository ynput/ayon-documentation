---
title: Flow (ShotGrid) addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Flow (ShotGrid) addon with their default values: connection, local storage, entity mapping, folder attribute map, re-parenting, service settings and the movie path publish plugin."
addon: shotgrid
addon_repo: ayon-shotgrid
addon_version: 0.6.20
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-shotgrid/tree/0.6.20/server/settings
  - https://help.ayon.app/en/articles/3639938-configure-flow-shotgrid-addon
---

# Flow (ShotGrid) addon settings

<AddonInfo />

The settings of the [Flow (ShotGrid) addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The settings page appears under the name **Shotgrid**.

## Connection

| Setting | Default | Description |
|---|---|---|
| ShotGrid URL | Empty | URL of the Flow site to synchronize with. |
| No SSL validation | Off | Turns off hostname matching validation for SSL certificates. |
| ShotGrid Project Code field name | `code` | Field of the Flow `Project` entity that supplies the project code when AYON projects are created. |
| Enable ShotGrid Local Storage. | On | Use the local storage defined in Flow (Site Preferences, File Management, Local Storage). |
| ShotGrid Local Storage entry name | `primary` | The `code` of the Flow local storage entry to use when there are several. |
| Anatomy Preset | `_` | Anatomy preset used for projects synchronized from Flow. |

## ShotGrid <-> AYON compatibility settings

| Setting | Default | Description |
|---|---|---|
| Default Task Type | `Generic` | Task type for Flow tasks that have no pipeline step. |
| ShotGrid Enabled Entities | `Project`, `Episode`, `Sequence`, `Shot`, `Asset`, `Task`, `Version`, `Note` | Flow entity types that take part in the synchronization. The list to choose from is `Project`, `Episode`, `Sequence`, `Scene`, `Shot`, `Asset`, `Task`, `Version`, `Playlist`, `Note`, `Reply`. |
| Folder Attributes Map | One row per folder attribute, with an empty **SG** value | Maps AYON attributes to Flow fields. See below. |

### Folder Attributes Map

One row per attribute.

| Field | Description |
|---|---|
| AYON | Name of the AYON attribute. |
| Field type | Type of the Flow field. |
| SG | Name of the Flow field, without the `sg_` prefix. Rows with an empty value are ignored. |
| Scope | The Flow entity types the mapping applies to. |

The default has one row per AYON folder attribute (except `shotgridId`, `shotgridType` and `tools`), with an empty **SG** value and all default enabled entities as scope, except `startDate`, which leaves out `Project`. The rows are built from the attributes of the running server.

### Folder re-parenting

Controls where AYON folders for synchronized Flow entities are placed in the hierarchy. Both groups are off by default and have no presets. When a group is on but has no preset, the default behavior is used.

| Group | Default | Description |
|---|---|---|
| Root relocation | Off | Creates a custom parent hierarchy for the folders of a Flow entity type. The first parent in a preset becomes the root folder. |
| Type grouping | Off | Groups all folders of a Flow entity type under a custom folder hierarchy. |

A preset of either group has these fields.

| Setting | Default | Description |
|---|---|---|
| Filter by ShotGrid Entity Type | `Asset` | Flow entity type the preset applies to. |
| Parents | Empty | List of parent folders, from top to bottom. The order matters. |
| Parent Ayon Folder Type | `asset` | Folder type of a parent. |
| Parent Ayon Folder Name | `assets` | Folder name of a parent. |

## Service settings

| Setting | Default | Description |
|---|---|---|
| How often (in seconds) to process ShotGrid related events. | 10 | Wait time between event processing passes of the services. |
| ShotGrid's Script api key | Empty | AYON secret that holds the API key of the Flow script. |
| ShotGrid's Script Name | Empty | AYON secret that holds the name of the Flow script. |

## Publish plugins

### Synchronize movie path information to Flow(SG)

Settings of the `IntegrateMoviePath` plugin ([Overview](index.md#publishing)).

| Setting | Default | Description |
|---|---|---|
| Profiles for selected representations for movie path | None | List of profiles that choose the representation used for `Version.sg_path_to_movie`. |

A profile has these fields. Empty lists match everything.

| Field | Description |
|---|---|
| Host names | Host applications the profile applies to. |
| Product base types | Product base types the profile applies to. |
| Task types | Task types the profile applies to. |
| Task names | Task names the profile applies to. |
| Selected representation names | Representation names, in order of preference. The first one found in the publish is used. |
