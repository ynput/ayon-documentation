---
title: ftrack addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON ftrack addon with their default values: server and service credentials, server actions and events, status automation, application launch status, user actions, publish plugins and custom attributes."
addon: ftrack
addon_repo: ayon-ftrack
addon_version: 1.6.10
addon_scope: pipeline-server
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-ftrack/tree/1.6.9/server/settings
---

# ftrack addon settings

<AddonInfo />

The settings of the [ftrack addon](index.md) are in **Studio settings > ftrack**, and most of them can be overridden in **Project settings**; the server, the service credentials and the custom attributes are studio only. Pasting a location below into the URI bar of the web app opens that setting. The ftrack side is not configured here: the custom attributes AYON needs are created in ftrack by the **Create/Update Custom Attributes** action (see [Custom attributes](index.md#custom-attributes)), and the `leecher`, `processor` and `transmitter` services are deployed separately (see [Services](index.md#services)). How studio and project values combine is described in [Settings](../../../ayon/how-ayon-works/settings.md).

Actions share a **Roles for action** list: the ftrack security roles that may see and run the action. Role names are compared without regard to case, so `Project manager` and `Project Manager` are the same role. An empty list lets every user run the action.

## General

<SettingLocation uri="ayon+settings://ftrack/ftrack_server" scope="Studio only" />

The ftrack server the addon, its services and the artists' machines connect to.

<!-- screenshot: settings editor, General -->

<Settings prefix="general">
<Setting name="Enabled" default="Enabled">

Enables the addon.

</Setting>
<Setting name="ftrack server url" default="Empty">

URL of the ftrack server, such as `https://studio.ftrackapp.com`.

</Setting>
</Settings>

## Service settings

<SettingLocation uri="ayon+settings://ftrack/service_settings" scope="Studio only" />

The ftrack user the `leecher`, `processor` and `transmitter` services log in with. A dedicated ftrack user makes the changes done by the services easy to tell apart. Both fields offer the AYON secrets of the server, which the services resolve.

<!-- screenshot: settings editor, Service settings -->

<Settings prefix="service-settings">
<Setting name="ftrack user name" default="Empty">

ftrack user name, or an AYON secret that holds it.

</Setting>
<Setting name="ftrack API key" default="Empty">

ftrack API key of that user, or an AYON secret that holds it.

</Setting>
</Settings>

## Server actions and events

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers" scope="Studio, with project overrides" />

Actions and event handlers that run in the `processor` service, without AYON running on the user's machine. What each of them does is described in [Server actions](index.md#server-actions) and [Status automation](index.md#status-automation). Most of them have **Enabled** (turns the handler on) and **Roles for action**.

<!-- screenshot: settings editor, Server Actions/Events -->

### Prepare Project

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/prepare_project" />

<Settings prefix="server-prepare-project">
<Setting name="Enabled" default="Enabled" />
<Setting name="Roles for action" default="Administrator, Project manager" />
</Settings>

### Sync to AYON

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/sync_from_ftrack" />

The synchronization from ftrack to AYON, as an action and on ftrack events.

<Settings prefix="sync-to-ayon">
<Setting name="Enabled" default="Enabled" />
<Setting name="Sync version statuses" default="Disabled">

Also synchronizes the statuses of versions from ftrack. This can slow down the synchronization.

</Setting>
<Setting name="Sync Link Type" default="< Skip >">

The AYON link type that ftrack links between entities are synchronized to. The options are `< Skip >`, which does not synchronize links, and the link types of the project anatomy that link a folder to a folder.

</Setting>
<Setting name="Roles for action" default="Administrator, Project manager" />
</Settings>

### Sync Users to AYON

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/sync_users_from_ftrack" />

<Settings prefix="sync-users-to-ayon">
<Setting name="Enabled" default="Enabled" />
<Setting name="Roles for action" default="Administrator, Project manager" />
</Settings>

### Sync Hierarchical and Entity Attributes

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/sync_hier_entity_attributes" />

Pushes attribute values, such as the frame range, between hierarchical attributes and the attributes of entities and their tasks, on events and as an action.

<Settings prefix="sync-hierarchical-attributes">
<Setting name="Enabled" default="Enabled">

Turns the event handler on.

</Setting>
<Setting name="Entity types of interest" default="Shot, Asset Build">

ftrack object types whose values are pushed.

</Setting>
<Setting name="Attributes to sync" default="frameStart, frameEnd">

Names of the attributes to push.

</Setting>
<Setting name="Enable Action" default="Enabled">

Also offers the action, to push the values of selected entities manually.

</Setting>
<Setting name="Roles for action" default="Administrator, Project Manager" />
</Settings>

### Clone Review Session

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/clone_review_session" />

<Settings prefix="clone-review-session">
<Setting name="Enabled" default="Enabled" />
<Setting name="Roles for action" default="Administrator, Project Manager" />
</Settings>

### Delete Folders/Products

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/delete_ayon_entities" />

<Settings prefix="delete-folders-products">
<Setting name="Enabled" default="Enabled" />
<Setting name="Roles for action" default="Empty list">

The defaults of the release do not set roles for this action, so every user can run it until roles are added.

</Setting>
</Settings>

### Update Hierarchy thumbnails

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/thumbnail_updates" />

Pushes the thumbnail of a new version up through the hierarchy.

<Settings prefix="update-hierarchy-thumbnails">
<Setting name="Enabled" default="Enabled" />
<Setting name="Levels" default="1">

How many hierarchy levels above the version the thumbnail goes up. `0` skips the update.

</Setting>
</Settings>

### Sync status from Task to Parent

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/status_task_to_parent" />

Sets the status of a parent object, such as a shot, from the statuses of its tasks.

<Settings prefix="task-to-parent">
<Setting name="Enabled" default="Enabled" />
<Setting name="Object types" default="Shot, Asset Build">

Parent object types whose status is changed.

</Setting>
<Setting name="Change parent if all tasks match" default="Completed when all tasks are Approved or Omitted">

Each item sets a parent status when the statuses of all its tasks are in a list.

<Settings>
<Setting name="Name">

The new parent status.

</Setting>
<Setting name="Value" default="Empty list">

The task statuses that all tasks must have.

</Setting>
</Settings>

</Setting>
<Setting name="Change parent status if a single task matches" default="In Progress when a task is in progress, change requested, retake or pending review">

Each item sets a parent status when one task gets one of the listed statuses.

<Settings>
<Setting name="New parent status" />
<Setting name="Task status" default="Empty list">

The task statuses that trigger the change.

</Setting>
</Settings>

</Setting>
</Settings>

### Sync status from Task to Version

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/status_task_to_version" />

Copies a new task status to the versions of the task.

<Settings prefix="task-to-version">
<Setting name="Enabled" default="Enabled" />
<Setting name="Status mapping" default="Empty list">

Each item has a version status (name) and the task statuses (value) that set it. A version status can appear once.

</Setting>
<Setting name="Asset types Allow/Deny" default="Allow list">

**Allow list** or **Deny list**: whether **Asset types (short)** lists the asset types the handler applies to or the ones it skips.

</Setting>
<Setting name="Asset types (short)" default="Empty list">

Short names of ftrack asset types, such as `img`.

</Setting>
</Settings>

### Sync status from Version to Task

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/status_version_to_task" />

Copies a new version status to the task of the version.

<Settings prefix="version-to-task">
<Setting name="Enabled" default="Enabled" />
<Setting name="Only for latest version" default="Disabled">

Changes the task status only when the version is the latest version of its asset.

</Setting>
<Setting name="Status mapping" default="Empty list">

Each item has a task status (name) and the version statuses (value) that set it. A task status can appear once.

</Setting>
<Setting name="Asset types Allow/Deny" default="Deny list">

**Allow list** or **Deny list**: whether **Asset types (short)** lists the asset types the handler applies to or the ones it skips.

</Setting>
<Setting name="Asset types (short)" default="Empty list">

Short names of ftrack asset types.

</Setting>
</Settings>

### Update status on next task

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/next_task_update" />

When a task gets a status of the **Done** state, changes the status of the next tasks of the same parent. Tasks are ordered by task type; by default all tasks of a task type must be done before the tasks of the next type change.

<Settings prefix="next-task">
<Setting name="Enabled" default="Enabled" />
<Setting name="Status Mappings" default="Not Ready to Ready">

Each item has the current status of the next task (name) and the status it gets (value). A next task whose status is not listed is left as it is.

</Setting>
<Setting name="Ignored statuses" default="Omitted">

Task statuses that count as done, such as statuses that never change.

</Setting>
<Setting name="Name sorting" default="Disabled">

Checks tasks one by one, sorted by task type and then by name, instead of in batches of the same task type.

</Setting>
</Settings>

### Action to transfer hierarchical attribute values

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/transfer_values_of_hierarchical_attributes" />

<Settings prefix="transfer-hierarchical-values">
<Setting name="Enabled" default="Enabled" />
<Setting name="Roles for action" default="Administrator, Project manager" />
</Settings>

### Create daily lists

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/create_daily_lists" />

Creates ftrack lists of asset versions by filter, when the action is run and on a schedule.

<Settings prefix="create-daily-lists">
<Setting name="Enabled" default="Disabled" />
<Setting name="Create daily lists at" default="00:00:00">

Studio only. Time of day of the scheduled run. A change can take effect on the next day.

</Setting>
<Setting name="Days of week" default="Monday to Friday">

Studio only. Days of the scheduled run: **Monday** to **Sunday**.

</Setting>
<Setting name="Lists" default="One list">

The lists to create. The default list has the name template `{yy}{mm}{dd}`, the category **Dailies**, **Run automatically** on, and one filter for the status `Approved`.

<Settings>
<Setting name="Name template" default="{yy}{mm}{dd}">

Template of the list name.

</Setting>
<Setting name="List category" default="Dailies">

**Default**, **Clients** or **Dailies**.

</Setting>
<Setting name="Run automatically" default="Disabled">

Creates the list on the schedule above.

</Setting>
<Setting name="Asset version filters" default="Empty list">

A version is added when it matches one of the filters.

<Settings>
<Setting name="Statuses" default="Empty list">

Version statuses.

</Setting>
<Setting name="Custom attributes" default="Empty list">

Custom attribute values the version must have.

<Settings>
<Setting name="Attribute name" />
<Setting name="Attribute type" default="Boolean">

**Boolean**, **String**, **Integer**, **Float** or **Enumerator**.

</Setting>
<Setting name="Expected value">

One field that matches the type: a boolean (default enabled), a string, an integer (default `0`), a float (default `0.0`) or a list of enumerator values.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Roles for action" default="Administrator, Project Manager" />
</Settings>

### Calculate project component sizes

<SettingLocation uri="ayon+settings://ftrack/service_event_handlers/project_components_sizes" />

<Settings prefix="component-sizes">
<Setting name="Enabled" default="Enabled">

Studio only: it cannot be turned off per project.

</Setting>
<Setting name="Roles for action" default="Administrator, Project Manager" />
</Settings>

## Status change on application launch

<SettingLocation uri="ayon+settings://ftrack/post_launch_hook" scope="Studio, with project overrides" />

Changes the status of a task when an application is launched for it through AYON. See [Launch hook](index.md#launch-hook).

<!-- screenshot: settings editor, Status change on application launch -->

<Settings prefix="launch-status">
<Setting name="Enabled" default="Enabled" />
<Setting name="Mapping" default="Three items, see below">

Each item sets a new status when the current status is in its list. Items are checked in order and the first matching item is used; status names are compared without regard to case.

<Settings>
<Setting name="New status">

The status to set. The special value `__ignore__` keeps the current status when it is in **From statuses**.

</Setting>
<Setting name="From statuses" default="Empty list">

The current statuses that trigger the change. The special value `__any__` matches every status.

</Setting>
</Settings>

</Setting>
</Settings>

The default mapping:

- `In Progress` from `__any__`;
- `Ready` from `Not Ready`;
- `__ignore__` from `in progress`, `omitted` and `on hold`.

## User actions and events

<SettingLocation uri="ayon+settings://ftrack/user_handlers" scope="Studio, with project overrides" />

Actions that run in the action server of the tray, on the artist's machine. See [User actions](index.md#user-actions). Each has **Enabled** and **Roles for action** unless noted.

<!-- screenshot: settings editor, User Actions/Events -->

<Settings prefix="user">
<Setting name="Create/Update Custom Attributes" default="Administrator">

Only **Roles for action**; the action has no switch.

</Setting>
<Setting name="Prepare Project" default="Enabled, Administrator, Project manager">

<Settings>
<Setting name="Create project structure" default="Disabled">

Checks **Create project structure** by default.

</Setting>
</Settings>

No user action of the release reads these values; the **Prepare Project** action runs in the `processor` service and uses its own [settings](#prepare-project).

</Setting>
<Setting name="Clean hierarchical custom attributes" default="Enabled, Administrator, Project manager" />
<Setting name="Delete old versions" default="Enabled, Project Manager, Administrator">

The release does not load the handler of this action.

</Setting>
<Setting name="Delivery action" default="Enabled, Project Manager, Administrator" />
<Setting name="Job Killer" default="Enabled, Administrator" />
<Setting name="Fill workfile Custom attribute" default="Disabled, no roles">

<Settings>
<Setting name="Custom attribute key" default="Empty">

A custom attribute of the type **Text** on the **Task** entity type.

</Setting>
</Settings>

The release does not load the handler of this action.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://ftrack/publish" scope="Studio, with project overrides" />

Publish plugins that send published versions, statuses and notes to ftrack. An instance is sent to ftrack when it has the `ftrack` family. What every publish plugin does is listed in [Publishing](index.md#publishing).

<!-- screenshot: settings editor, Publish plugins -->

### Collect ftrack Family

<SettingLocation uri="ayon+settings://ftrack/publish/CollectFtrackFamily" />

Adds the `ftrack` family to instances, so that they are uploaded to ftrack. The first profile that matches an instance decides; empty filters match everything.

<Settings prefix="collect-ftrack-family">
<Setting name="Enabled" default="Enabled" />
<Setting name="Profiles" default="11 profiles, see below">

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Add ftrack Family" default="Enabled">

Adds the `ftrack` family to matching instances.

</Setting>
<Setting name="Advanced adding if additional families present" default="Empty list">

Overrides **Add ftrack Family** when the instance has one of the listed families.

<Settings>
<Setting name="Additional Families" default="Empty list" />
<Setting name="Add ftrack Family" default="Enabled" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

The default profiles, in order:

- `traypublisher`, all product base types: added.
- `traypublisher`, `matchmove` and `shot`: not added.
- `traypublisher`, `plate`, `review` and `audio`: not added, unless the instance has the family `clip` or `review`.
- `maya`, `model`, `setdress`, `animation`, `look`, `rig`, `camera` and `review`: added.
- `blender`, `houdini` and `max`, all product base types: not added, unless the instance has the family `review`.
- `tvpaint`, `renderPass`: not added.
- `tvpaint`, all product base types: added.
- `nuke`, `write`, `render` and `prerender`: not added, unless the instance has the family `review`.
- `aftereffects`, `render` and `workfile`: added.
- `flame`, `plate` and `take`: added.
- `photoshop`, `review`: added.

### Collect Custom Attribute Data

<SettingLocation uri="ayon+settings://ftrack/publish/CollectFtrackCustomAttributeData" />

Collects the values of ftrack custom attributes of the ftrack entities, for use in templates during publishing.

<Settings prefix="collect-custom-attribute-data">
<Setting name="Enabled" default="Disabled" />
<Setting name="Custom attribute keys" default="Empty list">

Keys of the custom attributes to collect.

</Setting>
</Settings>

### Validate ftrack Attributes

<SettingLocation uri="ayon+settings://ftrack/publish/ValidateFtrackAttributes" />

Compares ftrack custom attributes with values evaluated in the scene.

<Settings prefix="validate-ftrack-attributes">
<Setting name="Enabled" default="Disabled" />
<Setting name="Custom attributes to validate" default="{}">

A JSON object of ftrack custom attribute names and the checks to run. The value must parse as a JSON object.

</Setting>
</Settings>

### Integrate Hierarchy to ftrack

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateHierarchyToFtrack" />

Sets the status of the tasks the plugin creates in ftrack. Without a matching profile, ftrack's default status is used.

<Settings prefix="integrate-hierarchy">
<Setting name="Create task status profiles" default="Empty list">

<Settings>
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Status name" default="Empty" />
</Settings>

</Setting>
</Settings>

### Integrate ftrack Description

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateFtrackDescription" />

Adds a description to the integrated asset version.

<Settings prefix="integrate-description">
<Setting name="Enabled" default="Disabled" />
<Setting name="Optional" default="Enabled">

The artist can turn the plugin off in the Publisher.

</Setting>
<Setting name="Active" default="Enabled">

The plugin is turned on by default in the Publisher.

</Setting>
<Setting name="Description template" default="{comment}">

Template with the keys `intent` and `comment`.

</Setting>
</Settings>

### Integrate ftrack Note

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateFtrackNote" />

Adds the publish comment as a note on the asset version.

<Settings prefix="integrate-note">
<Setting name="Enabled" default="Disabled" />
<Setting name="Note template" default="{comment}">

Template with the keys `comment`, `host_name`, `app_name`, `app_label`, `published_paths` and `source`.

</Setting>
<Setting name="Note labels" default="Empty list">

ftrack note labels to add to the note.

</Setting>
</Settings>

### Integrate ftrack Component Overwrite

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateFtrackComponentOverwrite" />

<Settings prefix="integrate-component-overwrite">
<Setting name="Enabled" default="Enabled" />
</Settings>

### Integrate ftrack Instance

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateFtrackInstance" />

Prepares the ftrack asset versions and components of an instance.

<Settings prefix="integrate-instance">
<Setting name="Product base type Mapping" default="32 items, see below">

The ftrack asset type used for each product base type. A product base type can appear once.

<Settings>
<Setting name="Family">

The product base type.

</Setting>
<Setting name="Asset Type">

Short name of the ftrack asset type.

</Setting>
</Settings>

</Setting>
<Setting name="Make product name as first asset name" default="Enabled">

Keeps the product name as the first asset name for review.

</Setting>
<Setting name="AssetVersion status on publish" default="Empty list">

Profiles that set the status of new asset versions.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Status name" default="Empty" />
</Settings>

</Setting>
<Setting name="Additional metadata keys on components" default="Empty list">

Extra values written to the metadata of the components: **AYON ftrack version**, **AYON launcher version**, **Frame start**, **Frame end**, **Duration**, **Resolution width**, **Resolution height**, **FPS** and **Codec**.

</Setting>
</Settings>

The default mapping of product base types to asset types:

- `cam`: `camera`
- `look`: `look`
- `scene`: `mayaAscii`, `workfile`, `mayaScene`
- `geo`: `model`, `unrealStaticMesh`
- `rig`: `rig`, `camerarig`, `yetiRig`
- `setdress`: `setdress`
- `cache`: `pointcache`, `animation`, `ass`, `yeticache`, `vrayproxy`, `redshiftproxy`
- `render`: `render`, `prerender`, `render2d`, `write`
- `comp`: `nukescript`
- `mov`: `review`
- `img`: `plate`, `image`
- `audio`: `audio`
- `reference`: `reference`
- `xgen`: `xgen`
- `rendersetup`: `rendersetup`
- `assembly`: `assembly`
- `layout`: `layout`
- `usd`: `usd`

### Integrate ftrack Farm Status

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateFtrackFarmStatus" />

Changes the task status when a product is submitted to a farm.

<Settings prefix="integrate-farm-status">
<Setting name="Farm status profiles" default="One profile: Render for celaction renders">

The default profile sets the status `Render` for the host `celaction` and the product base type `render`.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Status name" default="Empty" />
</Settings>

</Setting>
</Settings>

### ftrack Status Local Integration and ftrack Status On Farm Integration

<SettingLocation uri="ayon+settings://ftrack/publish/ftrack_task_status_local_publish" />

<SettingLocation uri="ayon+settings://ftrack/publish/ftrack_task_status_on_farm_publish" />

Two groups with the same fields: the task status to set after a local integration, and after the integration of a product on the farm. The status is applied by [Integrate ftrack Task Status](#integrate-ftrack-task-status).

<Settings prefix="task-status-integration">
<Setting name="Status profiles" default="Empty list">

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Status name" default="Empty" />
</Settings>

</Setting>
</Settings>

### Integrate ftrack Task Status

<SettingLocation uri="ayon+settings://ftrack/publish/IntegrateFtrackTaskStatus" />

<Settings prefix="integrate-task-status">
<Setting name="After version integration" default="Enabled">

Applies the collected task statuses after the versions are integrated instead of before. Status automations on versions can conflict with the task status when the order is wrong.

</Setting>
</Settings>

## Custom attributes

<SettingLocation uri="ayon+settings://ftrack/custom_attributes" scope="Studio only" />

The custom attributes AYON uses in ftrack: the security roles of the mandatory attributes, and which ftrack attributes AYON attributes are synchronized with. See [Custom attributes](index.md#custom-attributes).

<!-- screenshot: settings editor, Custom Attributes -->

### Mandatory custom attributes

<SettingLocation uri="ayon+settings://ftrack/custom_attributes/mandatory_attributes" />

Read and write security roles of the attributes AYON needs in ftrack. Each attribute has **Write roles** and **Read roles**.

<Settings prefix="mandatory">
<Setting name="AYON ID" default="No roles">

The `ayon_id` attribute.

</Setting>
<Setting name="AYON path" default="No roles">

The `ayon_path` attribute.

</Setting>
<Setting name="AYON list type" default="No roles">

The `ayon_list_type` attribute.

</Setting>
<Setting name="AYON sync failed" default="API, Administrator">

The `ayon_sync_failed` attribute; the default is the same for both roles lists.

</Setting>
<Setting name="AYON auto-sync" default="API, Administrator">

The `auto_sync_enabled` attribute; the default is the same for both roles lists.

</Setting>
</Settings>

### Attributes mapping

<SettingLocation uri="ayon+settings://ftrack/custom_attributes/attributes_mapping" />

<Settings prefix="attributes-mapping">
<Setting name="Enabled" default="Enabled">

Uses the mapping below.

</Setting>
<Setting name="Attributes mapping" default="10 items, see below">

Maps AYON attributes to ftrack custom attributes.

<Settings>
<Setting name="AYON attribute" />
<Setting name="Attribute type" default="Hierarchical">

**Hierarchical** or **Standard**. The field below it changes with the type.

</Setting>
<Setting name="ftrack attribute name">

For **Hierarchical**: the hierarchical ftrack attribute.

</Setting>
<Setting name="ftrack attribute names" default="Empty list">

For **Standard**: the ftrack attributes of the entity types.

</Setting>
</Settings>

</Setting>
</Settings>

In the default items the attribute type is **Standard** and the hierarchical name is the AYON attribute name. Only three default items have standard ftrack attributes: `fps` uses `fps`, `frameStart` uses `fstart` and `frameEnd` uses `fend`. The other items are `resolutionWidth`, `resolutionHeight`, `pixelAspect`, `handleStart`, `handleEnd`, `clipIn` and `clipOut`.

## Related

- [ftrack addon](index.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
