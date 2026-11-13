---
title: ftrack addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON ftrack addon with their default values: server and service credentials, server actions and events, status automation, application launch status, user actions, publish plugins and custom attributes."
addon: ftrack
addon_repo: ayon-ftrack
addon_version: 1.6.8
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-ftrack/tree/1.6.8/server/settings
  - https://help.ayon.app/en/articles/1229195-configure-ftrack-addon
---

# ftrack addon settings

<AddonInfo />

The settings of the [ftrack addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Actions share a **Roles for action** list: the ftrack roles that may see and run the action. An empty list is listed as "none" below. Role names are matched as written, so `Project manager` and `Project Manager` are different values; the defaults contain both spellings.

## General

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Enables the addon. |
| ftrack server url | Empty | The URL of the ftrack server. |

## Service settings

The user the `leecher`, `processor` and `transmitter` services log in with. A value can name an AYON secret, which the services resolve.

| Setting | Default | Description |
|---|---|---|
| ftrack user name | Empty | ftrack user name or an AYON secret that holds it. |
| ftrack API key | Empty | ftrack API key or an AYON secret that holds it. |

## Server actions and events

Handlers that run in the `processor` service. Unless noted, each has **Enabled** (on by default) and **Roles for action**.

| Handler | Default roles | Other settings |
|---|---|---|
| Prepare Project | Administrator, Project manager | None. |
| Sync to AYON | Administrator, Project manager | **Sync version statuses** (Off): synchronize version statuses from ftrack, which may slow down the synchronization. **Sync Link Type** (`< Skip >`): the AYON link type that ftrack links are synchronized to. |
| Sync Users to AYON | Administrator, Project manager | None. |
| Sync Hierarchical and Entity Attributes | Administrator, Project Manager | **Entity types of interest** (`Shot`, `Asset Build`); **Attributes to sync** (`frameStart`, `frameEnd`); **Enable Action** (On): also provide the user action. |
| Clone Review Session | Administrator, Project Manager | None. |
| Delete Folders/Products | None (the default dictionary has no entry for it) | None. |
| Update Hierarchy thumbnails | No roles setting | **Levels** (1): how many hierarchy levels a thumbnail pushed from a version goes up through. A value below 1 skips the update. |
| Action to transfer hierarchical attribute values | Administrator, Project manager | None. |
| Create daily lists | Administrator, Project Manager | See below. Off by default. |
| Calculate project component sizes | Administrator, Project Manager | None. |

### Sync status from Task to Parent

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the handler on. |
| Object types | `Shot`, `Asset Build` | Parent object types whose status is changed. |
| Change parent if all tasks match | One item: new status `Completed` when all task statuses are `Approved` or `Omitted` | A list of items; each has a parent status (name) and the task statuses (value) that must all match. |
| Change parent status if a single task matches | One item: new status `In Progress` for the task statuses `in progress`, `change requested`, `retake`, `pending review` | A list of items; each has a **New parent status** and **Task status** values. |

### Sync status from Task to Version

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the handler on. |
| Status mapping | Empty | Items of a version status (name) and the task statuses (value) that set it. |
| Asset types Allow/Deny | Allow list | Whether **Asset types (short)** is an allow list or a deny list. |
| Asset types (short) | Empty | Short names of the asset types the filter applies to. |

### Sync status from Version to Task

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the handler on. |
| Status mapping | Empty | Items of a task status (name) and the version statuses (value) that set it. |
| Asset types Allow/Deny | Deny list | Whether **Asset types (short)** is an allow list or a deny list. |
| Asset types (short) | Empty | Short names of the asset types the filter applies to. |

### Update status on next task

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the handler on. |
| Status Mappings | One item: `Not Ready` is changed to `Ready` | Items of a current status (name) and the new status (value). |
| Ignored statuses | `Omitted` | Task statuses that are skipped. |
| name_sorting | Off | Sort tasks of the same type by name when looking for the next task; tasks are always ordered by task type. The field has no title in the UI. |

### Create daily lists

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Turns the action on. |
| Roles for action | Administrator, Project Manager | Roles that may run the action. |
| Create daily lists at | `00:00:00` | Time of day of the automated run. A change may take effect on the next day. |
| Days of week | Monday to Friday | Days on which the automated run happens. |
| Lists | One list | The lists to create; see the table below. |

Each item of **Lists** has these fields. The default list has the name template `{yy}{mm}{dd}`, the category `Dailies`, automatic running on, and one filter for the status `Approved` without custom attributes.

| Field | Default for a new item | Description |
|---|---|---|
| Name template | `{yy}{mm}{dd}` | Template of the list name. |
| List category | `Dailies` | ftrack list category. |
| Run automatically | Off | Create the list on the schedule above. |
| Asset version filters | Empty | Filters; each has **Statuses** and **Custom attributes**. |

A custom attribute filter has **Attribute name**, **Attribute type** (default `bool_value`) and one **Expected value** field that matches the type (boolean `true`, string, integer `0`, float `0.0` or a list of enum values).

## Status change on application launch

Changes the status of a task when an application is launched through AYON.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Turns the hook on. |
| mapping | See below | Items of a **New status** and **From statuses** (the current statuses that trigger it). |

The special value `__any__` in **From statuses** matches every current status. The special **New status** `__ignore__` skips the change when the current status is in **From statuses**. The default mapping is:

| New status | From statuses |
|---|---|
| `In Progress` | `__any__` |
| `Ready` | `Not Ready` |
| `__ignore__` | `in progress`, `omitted`, `on hold` |

## User actions and events

Actions that run in the action server of the tray, on the artist's machine.

| Action | Enabled | Default roles | Other settings |
|---|---|---|---|
| Create/Update Custom Attributes | No switch | Administrator | None. |
| Prepare Project | On (not shown in the UI) | Administrator, Project manager (not shown in the UI) | **Create project structure** (Off). |
| Clean hierarchical custom attributes | On | Administrator, Project manager | None. |
| Delete old versions | On | Project Manager, Administrator | None. The handler is not loaded in 1.6.8. |
| Delivery action | On | Project Manager, Administrator | None. |
| Job Killer | On | Administrator | None. |
| Fill workfile Custom attribute | Off | None | **Custom attribute key**: a Text custom attribute on the Task entity type. The handler is not loaded in 1.6.8. |

## Publish plugins

### Collect ftrack Family

Adds the `ftrack` family to instances so that they are uploaded to ftrack.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Runs the plugin. |
| Profiles | 11 profiles, see below | List of profiles. |

A profile has **Host names**, **Product base types**, **Task types**, **Task names**, **Add ftrack Family** (default on) and **Advanced adding if additional families present**: items of **Additional Families** and **Add ftrack Family** that override the decision when the instance has one of those families. An empty filter matches everything. The default profiles:

| Host names | Product base types | Add ftrack Family | Advanced filtering |
|---|---|---|---|
| `traypublisher` | All | On | None |
| `traypublisher` | `matchmove`, `shot` | Off | None |
| `traypublisher` | `plate`, `review`, `audio` | Off | On for the families `clip` and `review` |
| `maya` | `model`, `setdress`, `animation`, `look`, `rig`, `camera`, `review` | On | None |
| `blender`, `houdini`, `max` | All | Off | On for the family `review` |
| `tvpaint` | `renderPass` | Off | None |
| `tvpaint` | All | On | None |
| `nuke` | `write`, `render`, `prerender` | Off | On for the family `review` |
| `aftereffects` | `render`, `workfile` | On | None |
| `flame` | `plate`, `take` | On | None |
| `photoshop` | `review` | On | None |

### Collect Custom Attribute Data

Collects ftrack custom attributes for ftrack entities, for use in templates during publishing.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Runs the plugin. |
| Custom attribute keys | Empty | Keys of the custom attributes to collect. |

### Validate ftrack Attributes

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Runs the validator. |
| Custom attributes to validate | `{}` | A JSON text of ftrack custom attribute names and the values or expressions to compare with. |

### Integrate Hierarchy to ftrack

Sets the status of tasks the plugin creates; without a matching profile the ftrack default status is used.

| Setting | Default | Description |
|---|---|---|
| create_task_status_profiles | Empty | Profiles with **Task types**, **Task names** and **Status name**. |

### Integrate ftrack Description

Adds a description to the integrated asset version.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Runs the plugin. |
| Optional | On | The artist can skip it in the Publisher. |
| Active | On | It is selected by default in the Publisher. |
| Description template | `{comment}` | Template with the keys `intent` and `comment`. |

### Integrate ftrack Note

Uses the publish comment as a note on the asset version.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Runs the plugin. |
| Note template | `{comment}` | Template with the keys `comment`, `host_name`, `app_name`, `app_label`, `published_paths` and `source`. |
| Note labels | Empty | ftrack note labels to add. |

### Integrate ftrack Component Overwrite

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Runs the plugin. |

### Integrate ftrack Instance

| Setting | Default | Description |
|---|---|---|
| Product base type Mapping | 32 items, see below | Items of a product base type (**Family**) and the ftrack **Asset Type** short name. |
| Make product name as first asset name | On | Keeps the product name as the first asset name for review. |
| AssetVersion status on publish | Empty | Profiles with **Host names**, **Product base types**, **Task types** and **Status name**. |
| Additional metadata keys on components | Empty | Extra keys written to the component metadata. |

Default mapping of product base type to asset type:

| Asset type | Product base types |
|---|---|
| `cam` | `camera` |
| `look` | `look` |
| `scene` | `mayaAscii`, `workfile`, `mayaScene` |
| `geo` | `model`, `unrealStaticMesh` |
| `rig` | `rig`, `camerarig`, `yetiRig` |
| `setdress` | `setdress` |
| `cache` | `pointcache`, `animation`, `ass`, `yeticache`, `vrayproxy`, `redshiftproxy` |
| `render` | `render`, `prerender`, `render2d`, `write` |
| `comp` | `nukescript` |
| `mov` | `review` |
| `img` | `plate`, `image` |
| `audio` | `audio` |
| `reference` | `reference` |
| `xgen` | `xgen` |
| `rendersetup` | `rendersetup` |
| `assembly` | `assembly` |
| `layout` | `layout` |
| `usd` | `usd` |

### Integrate ftrack Farm Status

Changes the task status when a product is submitted to a farm.

| Setting | Default | Description |
|---|---|---|
| Farm status profiles | One profile | Profiles with **Host names**, **Task types**, **Task names**, **Product base types**, **Product names** and **Status name**. The default profile sets the status `Render` for the host `celaction` and the product base type `render`. |

### ftrack Status Local Integration and ftrack Status On Farm Integration

Change the task status after a local integration, and after the integration on the farm.

| Setting | Default | Description |
|---|---|---|
| Status profiles | Empty | Profiles with **Host names**, **Task types**, **Task names**, **Product base types**, **Product names** and **Status name**. |

### Integrate ftrack Task Status

| Setting | Default | Description |
|---|---|---|
| After version integration | On | Applies the collected task statuses after the versions are integrated. Some status automations on versions can conflict with the task status when the order is wrong. |

## Custom attributes

### Mandatory custom attributes

Read and write security roles of the attributes AYON needs in ftrack. Each attribute has **Write roles** and **Read roles**.

| Attribute | Default write roles | Default read roles |
|---|---|---|
| `ayon_id` | None | None |
| `ayon_path` | None | None |
| `ayon_list_type` | None | None |
| `ayon_sync_failed` | API, Administrator | API, Administrator |
| `auto_sync_enabled` | API, Administrator | API, Administrator |

### Attributes mapping

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Use the custom attributes mapping. |
| Attributes mapping | 10 items, see below | Items that map an AYON attribute to ftrack custom attributes. |

An item has the **AYON attribute**, an **Attribute type** (`hierarchical` or `standard`), the **ftrack attribute name** used for a hierarchical attribute and the **ftrack attribute names** used for standard attributes. In the default items the attribute type is `standard` and the hierarchical name equals the AYON attribute name.

| AYON attribute | ftrack attribute name | ftrack attribute names (standard) |
|---|---|---|
| `resolutionWidth` | `resolutionWidth` | None |
| `resolutionHeight` | `resolutionHeight` | None |
| `pixelAspect` | `pixelAspect` | None |
| `fps` | `fps` | `fps` |
| `frameStart` | `frameStart` | `fstart` |
| `frameEnd` | `frameEnd` | `fend` |
| `handleStart` | `handleStart` | None |
| `handleEnd` | `handleEnd` | None |
| `clipIn` | `clipIn` | None |
| `clipOut` | `clipOut` | None |
