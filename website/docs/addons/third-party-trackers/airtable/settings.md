---
title: Airtable addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Airtable addon with their default values: the Airtable to AYON attribute mapping and the service settings (base, table, API key secret, poll interval)."
addon: airtable
addon_repo: ayon-airtable
addon_version: 0.1.1
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-airtable/tree/0.1.1/server/settings
  - https://help.ayon.app/en/articles/5634320-ayon-air-table-addon
---

# Airtable addon settings

<AddonInfo />

The settings of the [Airtable addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Airtable <-> AYON Attributes Mapping

Each setting holds the name of the Airtable field that stores the value. The fields must exist in the Airtable table with these names. An empty value means the data is not written.

| Setting | Default | Description |
|---|---|---|
| Project Name | `Project` | Field with the AYON project name. |
| Assignee | `Assignee` | Field with the assignee. Not synchronized at 0.1.1, see the [overview](index.md#known-limitations). |
| Version | `V` | Field with the version number. |
| Status | `Status` | Field with the status. Its options have to match the statuses of the AYON project. |
| Tags | `Types` | Field that receives the task type of the version. Its options have to match the task types. |
| Product Name | `VFX_ID` | Field with the product name. |
| Version ID | `VersionId` | Field with the id of the AYON version. |

## Service settings

| Setting | Default | Description |
|---|---|---|
| Base Name | Empty | Name of the Airtable base to synchronize with. |
| Table Name | `Shots` | Name of the table in that base. |
| Airtable's Script api key | Empty | AYON secret that holds the Airtable personal access token. |
| Poll Interval | 10 | Seconds the services wait between checks for new events. |
