---
title: Airtable addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Airtable addon with their default values: the Airtable to AYON attribute mapping and the service settings (base, table, API key secret, poll interval)."
addon: airtable
addon_repo: ayon-airtable
addon_version: 0.1.1
addon_scope: pipeline-server
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-airtable/tree/0.1.1/server/settings
---

# Airtable addon settings

<AddonInfo />

The settings of the [Airtable addon](index.md) are in **Studio settings > Airtable**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The Airtable personal access token is not stored in the settings: it is an AYON [secret](../../../ayon/web-ui/studio/secrets.md) that the settings point to.

The leecher and processor services read the studio settings only; project overrides apply to the values the addon passes to applications on launch.

## Airtable <-> AYON Attributes Mapping

<SettingLocation uri="ayon+settings://airtable/attribute_maps" scope="Studio, with project overrides" />

Which Airtable field holds each value. Each setting is the name of a field in the Airtable table, and the fields must exist there with these names. An empty value means the data is not written.

<!-- screenshot: settings editor, Airtable <-> AYON Attributes Mapping -->

<Settings>
<Setting name="Project Name" default="Project">

Field with the AYON project name.

</Setting>
<Setting name="Assignee" default="Assignee">

Field with the assignee. Not synchronized at 0.1.1, see the [overview](index.md#known-limitations).

</Setting>
<Setting name="Version" default="V">

Field with the version number.

</Setting>
<Setting name="Status" default="Status">

Field with the status. Its options have to match the statuses of the AYON project.

</Setting>
<Setting name="Tags" default="Types">

Field that receives the task type of the version. Its options have to match the task types.

</Setting>
<Setting name="Product Name" default="VFX_ID">

Field with the product name.

</Setting>
<Setting name="Version ID" default="VersionId">

Field with the id of the AYON version.

</Setting>
</Settings>

## Service settings

<SettingLocation uri="ayon+settings://airtable/service_settings" scope="Studio, with project overrides (the services read the studio values)" />

The Airtable base and table to synchronize with, the access token and how often the services check for changes. The services do not start until **Base Name** and **Airtable's Script api key** are set.

<!-- screenshot: settings editor, Service settings -->

<Settings>
<Setting name="Base Name" default="Empty">

Name of the Airtable base to synchronize with.

</Setting>
<Setting name="Table Name" default="Shots">

Name of the table in that base.

</Setting>
<Setting name="Airtable's Script api key" default="Empty">

AYON secret that holds the Airtable personal access token. The list offers the secrets of the server.

</Setting>
<Setting name="Poll Interval" default="10">

Seconds the services wait between checks for new events.

</Setting>
</Settings>

## Related

- [Airtable addon](index.md)
- [Secrets](../../../ayon/web-ui/studio/secrets.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
