---
title: Airtable addon
sidebar_label: Overview
description: "The AYON integration for Airtable: the version status synchronization between AYON and an Airtable base, the Leecher, Processor and Transmitter services, the tray status entry and the editorial return publish plugins."
addon: airtable
addon_repo: ayon-airtable
addon_version: 0.1.1
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-airtable/tree/0.1.1
  - https://github.com/ynput/ayon-airtable/releases
  - https://help.ayon.app/en/articles/5634320-ayon-air-table-addon
---

# Airtable addon

<AddonInfo />

The Airtable addon connects AYON to a table in an [Airtable](https://www.airtable.com/) base. Three services keep the status of AYON versions and the matching Airtable records in step, and a set of publish plugins writes an editorial return value back into the table. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.0.7 or newer |
| AYON Launcher | 1.0.2 or newer |
| Required addons | None |
| Services | `leecher`, `processor` and `transmitter`, started from the AYON server (Docker images `ynput/ayon-airtable-<service>:<addon version>`) |
| Airtable | A personal access token, stored as an AYON secret, and a base with a table that has the fields named in the attribute mapping |

## What it connects

| AYON | Airtable |
|---|---|
| AYON server and its versions | One table (**Table Name**, default `Shots`) of one base (**Base Name**) |

The Airtable API key is read from the AYON secret named in **Airtable's Script api key**. The addon creates three attributes on the server when it starts: `airtableId`, `airtablePath` (project, folder, task and version scope) and `airtablePush` (project scope, default on). It asks for a server restart if it created or changed them.

## What it synchronizes

Only versions are synchronized. The fields of the Airtable table are chosen in the attribute mapping ([settings](settings.md)).

| Direction | Trigger | Effect |
|---|---|---|
| AYON to Airtable | AYON events `entity.version.created` and `entity.version.status_changed`, for projects with `airtablePush` on | Creates or updates the record that matches the project, the product name and, for a status change, the version id. It writes project, version id, status, version number (three digits, for example `001`), the task type as tag, and the product name, each into the mapped field. Fields whose mapping is empty are skipped. |
| Airtable to AYON | An Airtable webhook for table data updates | For each changed record that has the mapped project, status and version id fields, sets the status of the AYON version to the Airtable status when the project has that status, and writes the base id and base URL to `airtableId` and `airtablePath`. Immutable entities are not changed. |

Changes made by the services themselves (sender type `airtable`) are ignored in the AYON to Airtable direction, so updates do not loop.

## Services

| Service | What it does |
|---|---|
| `leecher` | Creates an Airtable webhook on the base (filtered to `tableData` updates) and stores the received payloads in AYON as events. It removes the webhook when it stops. |
| `processor` | Processes the stored Airtable events one at a time and updates AYON versions. |
| `transmitter` | Listens for AYON version events and writes them to Airtable. |

Airtable events are only processed while the Leecher runs. The Processor can be restarted without losing the stored events. The services must use the same addon version and settings variant. The Airtable `Status` options must match the project statuses in AYON and the `Types` options the task types.

## Tray and publishing

| Part | What it does |
|---|---|
| Tray menu **Airtable** | Shows a disabled entry, **Airtable API Key: Valid** or **Airtable API Key: Invalid**, from a request to the Airtable API with the configured key. |
| `CollectAirtableAPI` (Collect Airtable API) | For `editorial` and `editorial_pkg` instances, collects the API key, base name, table name and the mapped product name and version fields from the environment set by the addon. |
| `CollectProductNameForEditorialReturn` (Collect Product Name For Editorial Return (Airtable)) | Reads the product names from the Airtable table for the current project and offers them in the Publisher as the multi-selection **Product Name for Editorial Return**. Fails the publish when the table cannot be reached. |
| `CollectEditorialReturn` (Collect Editorial Return) | After integration, writes the name of the instance into the field `Editorial_Return` of the Airtable record of each selected product name. |

## Known limitations

- The `assignee` mapping exists in the settings, but assignees are not synchronized at 0.1.1. Assignee synchronization needs an Airtable Enterprise plan.
- There is no setting to select which task types are synchronized at 0.1.1.
- The editorial return plugins write to a fixed field named `Editorial_Return`.

## Related

- [Airtable addon settings](settings.md)
