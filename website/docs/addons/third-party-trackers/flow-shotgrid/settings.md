---
title: Flow (ShotGrid) addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Flow (ShotGrid) addon with their default values: connection, local storage, entity mapping, folder attribute map, re-parenting, service settings and the movie path publish plugin."
addon: shotgrid
addon_repo: ayon-shotgrid
addon_version: 0.6.22
addon_scope: pipeline-server
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-shotgrid/tree/0.6.21/server/settings
---

# Flow (ShotGrid) addon settings

<AddonInfo />

The settings of the [Flow (ShotGrid) addon](index.md) are in **Studio settings > Shotgrid**, and some of them can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The Flow script credentials are stored as AYON [secrets](../../../ayon/how-ayon-works/settings.md), and the [services](index.md#services) that synchronize the data run on a worker; neither is configured here beyond picking the secrets.

## Connection

<SettingLocation uri="ayon+settings://shotgrid" scope="Studio only, except No SSL validation and Anatomy Preset" />

The Flow site to connect to and how AYON projects are created from it. These fields are at the top level of the settings.

<!-- screenshot: settings editor, Connection -->

<Settings>
<Setting name="ShotGrid URL">

URL of the Flow site to synchronize with, such as `https://my-site.shotgrid.autodesk.com`. Studio only.

</Setting>
<Setting name="No SSL validation" default="Disabled">

Turns off hostname matching validation for SSL certificates.

</Setting>
<Setting name="ShotGrid Project Code field name" default="code">

Field of the Flow `Project` entity that supplies the project code when AYON projects are created, such as `sg_code`. Studio only.

</Setting>
<Setting name="Enable ShotGrid Local Storage." default="Enabled">

Uses the local storage defined in Flow (**Site Preferences > File Management > Local Storage**). Studio only.

</Setting>
<Setting name="ShotGrid Local Storage entry name" default="primary">

The `code` of the Flow local storage entry to use when there are several, such as `ayon_storage`. Studio only.

</Setting>
<Setting name="Anatomy Preset" default="_">

Anatomy preset used for projects synchronized from Flow. `_` is the primary preset.

</Setting>
</Settings>

## ShotGrid <-> AYON compatibility settings

<SettingLocation uri="ayon+settings://shotgrid/compatibility_settings" scope="Studio, with project overrides" />

How Flow entities map to AYON: which entity types are synchronized, which fields fill which attributes, and where the folders go in the hierarchy.

<!-- screenshot: settings editor, ShotGrid <-> AYON compatibility Settings -->

<Settings>
<Setting name="Default Task Type" default="Generic">

Task type for Flow tasks that have no pipeline step. One of the task types of the project.

</Setting>
<Setting name="ShotGrid Enabled Entities" default="Project, Episode, Sequence, Shot, Asset, Task, Version, Note">

Flow entity types that take part in the synchronization; disable the ones the studio does not use. The options are **Project**, **Episode**, **Sequence**, **Scene**, **Shot**, **Asset**, **Task**, **Version**, **Playlist**, **Note** and **Reply**.

</Setting>
</Settings>

### Folder Attributes Map

<SettingLocation uri="ayon+settings://shotgrid/compatibility_settings/custom_attribs_map" scope="Studio, with project overrides" />

Maps AYON folder attributes to Flow fields. Rows with an empty **SG** value are ignored. A Flow field and an AYON attribute can each be mapped only once; saving duplicates fails.

The default has one row per AYON folder attribute (except `shotgridId`, `shotgridType` and `tools`), with an empty **SG** value and all default enabled entities as scope, except `startDate`, which leaves out `Project`. The rows are built from the attributes of the running server.

<Settings>
<Setting name="Folder Attributes Map" id="folder-attributes-map-list" default="One row per folder attribute">

<Settings>
<Setting name="AYON">

Name of the AYON attribute.

</Setting>
<Setting name="Field type">

Type of the attribute, read-only. Enum attributes show `list`.

</Setting>
<Setting name="SG">

Name of the Flow field, without the `sg_` prefix.

</Setting>
<Setting name="Scope" default="Empty list">

The Flow entity types the mapping applies to, from the same options as **ShotGrid Enabled Entities**.

</Setting>
</Settings>

</Setting>
</Settings>

### Folder re-parenting

<SettingLocation uri="ayon+settings://shotgrid/compatibility_settings/folder_parenting" scope="Studio, with project overrides" />

Where AYON folders for synchronized Flow entities are placed in the hierarchy. When a group is enabled but has no preset, the default behavior is used.

<Settings>
<Setting name="Root relocation" default="Disabled, no presets">

Creates a custom parent hierarchy for the folders of a Flow entity type. The first parent in a preset becomes the root folder. Has **Enabled** and **Presets**.

</Setting>
<Setting name="Type grouping" default="Disabled, no presets">

Groups all folders of a Flow entity type under a custom folder hierarchy. Has **Enabled** and **Presets**.

</Setting>
<Setting name="Presets" default="Empty list">

A preset of either group has these fields.

<Settings>
<Setting name="Filter by ShotGrid Entity Type" default="Asset">

Flow entity type the preset applies to: **Episode**, **Sequence**, **Shot** or **Asset**.

</Setting>
<Setting name="Parents" default="Empty list">

Parent folders, from top to bottom. The order matters.

<Settings>
<Setting name="Parent Ayon Folder Type" default="asset">

Folder type of the parent, one of the folder types of the project.

</Setting>
<Setting name="Parent Ayon Folder Name" default="assets">

Folder name of the parent.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Service settings

<SettingLocation uri="ayon+settings://shotgrid/service_settings" scope="Studio only" />

Settings of the [services](index.md#services) (processor, leecher and transmitter): the Flow script they authenticate with and how often they process events.

<!-- screenshot: settings editor, Service settings -->

<Settings>
<Setting name="How often (in seconds) to process ShotGrid related events." default="10">

Wait time between event processing passes of the services.

</Setting>
<Setting name="ShotGrid's Script api key">

AYON secret that holds the API key of the Flow script.

</Setting>
<Setting name="ShotGrid's Script Name">

AYON secret that holds the name of the Flow script.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://shotgrid/publish" scope="Studio, with project overrides" />

Settings of the publish plugins of the addon. See [Publishing](index.md#publishing).

<!-- screenshot: settings editor, Publish plugins -->

### Synchronize movie path information to Flow(SG)

<SettingLocation uri="ayon+settings://shotgrid/publish/IntegrateMoviePath" scope="Studio, with project overrides" />

Chooses the representation whose path is written to `Version.sg_path_to_movie`.

<Settings>
<Setting name="Profiles for selected representations for movie path" default="Empty list">

The profile that matches the publish most specifically is used. Empty filter lists match everything. Without a matching profile, the movie path is not set.

<Settings>
<Setting name="Host names" default="Empty list">

Host applications the profile applies to.

</Setting>
<Setting name="Product base types" default="Empty list">

Product base types the profile applies to.

</Setting>
<Setting name="Task types" default="Empty list">

Task types the profile applies to.

</Setting>
<Setting name="Task names" default="Empty list">

Task names the profile applies to.

</Setting>
<Setting name="Selected representation names" default="Empty list">

Representation names, in order of preference. The first one found in the publish is used.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Flow (ShotGrid) addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
