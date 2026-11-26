---
title: ftrack addon
sidebar_label: Overview
description: "The AYON integration for ftrack: what it connects, the synchronization between ftrack and AYON, the actions and launcher entries it adds, the publish plugins that write to ftrack, its three services and its requirements."
addon: ftrack
addon_repo: ayon-ftrack
addon_version: 1.6.8
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-ftrack/tree/1.6.8
  - https://github.com/ynput/ayon-ftrack/releases
  - https://help.ayon.app/en/articles/1229195-configure-ftrack-addon
  - https://help.ayon.app/en/articles/0639073-ftrack-actions
  - https://help.ayon.app/en/articles/0474911-ftrack-manager
  - https://help.ayon.app/en/articles/6899451-working-with-ftrack-in-ayon
---

# ftrack addon

<AddonInfo />

The ftrack addon connects an ftrack server to AYON. It keeps the project hierarchy, tasks, statuses, users, thumbnails, comments and custom attributes of ftrack and AYON in step, adds ftrack actions that start applications and administer the pipeline, and provides publish plugins that create asset versions, components, notes and task status changes in ftrack. The work is split between three services that run next to the AYON server and a client part that runs in the AYON launcher tray and during publishing. The settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.4.3 or newer |
| Applications addon | 0.2.4 or newer (compatible addon, supplies the application launch actions) |
| Services | `leecher`, `processor` and `transmitter`, each a Docker image with the same version as the addon |
| ftrack user | A user name and API key for the services, stored as AYON secrets and selected in the service settings |

The service version must match the addon version, and the services run on an AYON Service Host.

## What it connects

| Side | What the addon uses |
|---|---|
| ftrack | The ftrack server URL, the ftrack Python API, ftrack events, custom attributes, actions, notes, asset versions, components and lists |
| AYON server | Projects, folders, tasks, products, versions, users, statuses, thumbnails, comments, entity lists and AYON events |

A project is linked to ftrack through the ftrack id stored on AYON entities and the AYON id stored in ftrack custom attributes (see [custom attributes](#custom-attributes)).

## What it synchronizes

| Direction | What | How |
|---|---|---|
| ftrack to AYON | Project hierarchy, tasks and attributes | The **Sync to AYON** action, and automatic synchronization on ftrack events for projects whose auto-sync custom attribute is on |
| ftrack to AYON | Hierarchical and entity attributes | The **Sync Hierarchical and Entity Attributes** action and event; the entity types and attributes of interest are settings |
| ftrack to AYON | Users | The **Sync Users to AYON** action and an event |
| ftrack to AYON | Comments (notes) on asset versions and tasks | An event handler in the `processor` service |
| ftrack to AYON | Version statuses | **Sync version statuses**, off by default |
| ftrack to AYON | Links | **Sync Link Type** maps ftrack links to an AYON link type |
| AYON to ftrack | Entity creation, deletion and activation changes, attribute changes, type changes, thumbnails, statuses and task assignees | The `transmitter` service, reacting to AYON events |
| AYON to ftrack | Comments (activities) | The `transmitter` service, polled at a fixed interval |
| AYON to ftrack | Entity lists and reviewables | The `transmitter` service, reacting to `entity_list.*` and `reviewable.created` events |

The synchronization from ftrack expects entity names with letters, numbers and underscores, unique names within a project and no tasks directly on the project; renaming or moving an entity is only safe before work has started.

## Status automation

Status handlers run in the `processor` service and are configured in the settings.

| Handler | What it does |
|---|---|
| Sync status from Task to Parent | Sets the status of a parent object (for example a shot) from the statuses of its tasks, either when all tasks match or when a single task matches |
| Sync status from Task to Version | Copies a task status to a version through a mapping, filtered by asset types |
| Sync status from Version to Task | Copies a version status to its task through a mapping, filtered by asset types |
| Update status on next task | When a task gets a status listed in the mapping, sets the status of the next task |
| Status change on application launch | Client side: changes the task status when an application is launched through AYON |
| Publish status plugins | Publish side: set task and asset version statuses (see [publishing](#publishing)) |

## Actions and tools it adds

### Launcher and tray

| Entry | Where | What it does |
|---|---|---|
| **Show in ftrack** | AYON launcher | Opens the selected project in ftrack (a project must be selected) |
| **ftrack** menu | Tray | **Credentials**, **Action server** (**Run action server**, **Reset action server**, **Stop action server**) and **Open ftrack...** |

Application actions appear in the ftrack web interface for tasks. They come from the Applications addon, which also decides which applications a project offers. The addon also connects to the Timers Manager addon: it can start and stop ftrack timers and read the time logged on a task.

### User actions

User actions run in the action server started by the tray, on the artist's machine. Their visibility depends on the entity type and on the roles set in the settings.

| Action label | Purpose |
|---|---|
| Application action | Launches applications for a task |
| **AYON Admin** group | **Create/Update Custom Attributes**, cleaning of hierarchical custom attributes, **Job Killer** (marks running ftrack jobs as failed) and an action that shows the machine where AYON runs |
| Create Project Structure | Creates the folder structure defined by the core addon's project folder structure setting, and ftrack entities for keys that request them |
| Create Folders | Creates work folders for the selected entities |
| Batch Task Create | Creates tasks for several entities |
| Delivery | Copies the components of selected versions to a delivery folder |
| Download Review Media | Downloads review media of selected versions |
| Multiple Notes | Adds one note to several asset versions |
| Sort Review | Sorts the asset versions of a review session |
| Open File | Opens the folder of a file component |
| Thumbnail | Propagates a thumbnail to the parent or to the children |

### Server actions

Server actions run in the `processor` service and do not need AYON running on the user's machine.

| Action label | Purpose |
|---|---|
| **Prepare Project** | Sets the attributes AYON needs on an ftrack project |
| **Sync to AYON** | Synchronizes selected entities and their children to AYON |
| **Sync Users to AYON** | Creates and updates AYON users from ftrack users |
| **Sync Hierarchical and Entity Attributes** | Synchronizes hierarchical attributes |
| **Clone Review Session (AYON)** | Clones a review session |
| **Delete Folders/Products** | Deletes or archives AYON folders and products together with the ftrack entities |
| **Multiple Notes (Server - AYON)** | Adds one note to several asset versions |
| **Create daily lists** | Creates lists of asset versions by filter, manually or on a schedule |
| **Calculate project component sizes** | Calculates the size of the components of a project |
| **Action to transfer hierarchical attribute values** | Moves hierarchical attribute values to non-hierarchical attributes |

The settings tree also lists **Delete old versions** and **Fill workfile Custom attribute**. The addon does not load their handlers in 1.6.8.

## Publishing

An instance is uploaded to ftrack when it has the `ftrack` family. The addon provides these publish plugins.

| Plugin | Label | What it does |
|---|---|---|
| `CollectFtrackFamily` | Collect ftrack Family | Adds the `ftrack` family to instances by profiles on host, product base type, task type and task name |
| `CollectFtrackApi` | Collect ftrack Api | Creates an ftrack session and finds the current ftrack task |
| `CollectLocalFtrackCreds` | Collect local ftrack credentials | Gets the credentials for local publishing |
| `CollectWebpublisherCredentials` | Collect ftrack credentials for Webpublisher | Translates the uploader's email to an ftrack user, for the `webpublisher` and `photoshop` hosts |
| `CollectFtrackJobEnvVars` | Collect ftrack farm environment variables | Collects environment variables to submit with farm jobs |
| `CollectFtrackCustomAttributeData` | Collect ftrack Custom Attribute Data | Stores ftrack custom attribute values in instance data for use in templates |
| `CollectFtrackTaskStatuses` | Collect ftrack Task Statuses | Collects the task statuses available on the project |
| `ValidateFtrackAttributes` | Validate Custom ftrack Attributes | Optional validator that compares ftrack attributes with values evaluated in the scene; runs for Blender, Fusion, Harmony, Houdini, Maya, Nuke, Hiero, Photoshop, Premiere, Resolve and Unreal |
| `IntegrateHierarchyToFtrack` | Integrate Hierarchy To ftrack | Creates ftrack entities from collected shot data for Hiero, Resolve, Flame, Traypublisher and the standalone publisher, with an initial task status by profile |
| `IntegrateFtrackInstance` | Integrate ftrack Component | Prepares the ftrack components of an instance, including the asset type from the product base type and the asset version status |
| `IntegrateFtrackApi` | Integrate ftrack Api | Commits components and asset versions to ftrack |
| `IntegrateFtrackDescription` | Integrate ftrack description | Sets the description of asset versions from a template |
| `IntegrateFtrackNote` | Integrate ftrack note | Creates a note with labels from a template |
| `IntegrateFtrackComponentOverwrite` | Overwrite ftrack created versions | Optional; sets component overwrite for `clip` instances |
| `IntegrateFtrackFarmStatus` | Integrate ftrack Farm Status | Sets the task status when a product is submitted to a farm |
| `IntegrateFtrackLocalStatus`, `IntegrateFtrackOnFarmStatus` | ftrack Task Status Local Publish, Ftrack Task Status On Farm Status | Collect the task status to set after local integration or after integration on the farm |
| `IntegrateFtrackTaskStatus` | Integrate ftrack Task Status | Applies the collected task statuses, before or after version integration |

Representations that carry the `ftrackreview` tag are prepared as review components.

## Launch hook

`PostFtrackHook` runs after a local application launch. When ftrack is enabled for the project and the ftrack server, user and API key are in the environment, it changes the status of the launched task according to **Status change on application launch**.

## Services

| Service | Image | What it does |
|---|---|---|
| `leecher` | `ynput/ayon-ftrack-leecher` | Listens to ftrack events and stores them as AYON events with the topic `ftrack.leech`, ignoring social feed, social notification and team entities |
| `processor` | `ynput/ayon-ftrack-processor` | Handles the stored ftrack events, runs the server actions and synchronizes from ftrack to AYON |
| `transmitter` | `ynput/ayon-ftrack-transmitter` | Reacts to AYON events and applies the changes in ftrack, and synchronizes comments from AYON to ftrack |

The services read the ftrack server URL and the user name and API key from the addon settings. A value that names an AYON secret is resolved from the secret.

## Custom attributes

The **Create/Update Custom Attributes** action creates the attributes AYON needs in ftrack: the mandatory attributes `ayon_id`, `ayon_path`, `ayon_list_type`, `ayon_sync_failed` and `auto_sync_enabled`, and attributes that mirror AYON attributes such as frame range, handles, fps and resolution. The settings define the read and write security roles of the mandatory attributes and the mapping between AYON attributes and ftrack attributes.

## Settings areas

| Area | What it configures |
|---|---|
| ftrack server url, Service settings | The server and the user the services use |
| Server Actions/Events | Roles and options of the `processor` actions and events, status synchronization, daily lists |
| Status change on application launch | Task status mapping on application launch |
| User Actions/Events | Roles and options of the tray actions |
| Publish plugins | Profiles and templates of the publish plugins |
| Custom Attributes | Security roles and the attribute mapping |

## Related

- [ftrack settings](settings.md)
