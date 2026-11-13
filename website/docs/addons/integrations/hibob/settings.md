---
title: HiBob addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON HiBob addon with their default values: service credentials, ignored policy types and the ftrack Sync HiBob Holidays action."
addon: hibob
addon_repo: ayon-hibob
addon_version: 1.1.3
addon_scope: server
addon_flags: []
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-hibob/tree/1.1.3/server/settings
---

# HiBob addon settings

<AddonInfo />

The settings of the [HiBob addon](index.md), with the default values the addon ships with. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Service Credentials

Available at the studio scope only. Both fields hold the name of an AYON secret, chosen from the secrets of the server, and not the value itself. The service and the ftrack action resolve the names to the secret values.

| Setting | Default | Description |
|---|---|---|
| HiBob Service User | empty | Secret that holds the id of the HiBob service user. |
| HiBob Service API key | empty | Secret that holds the API token of that service user. |

## Sync Configuration

| Setting | Default | Description |
|---|---|---|
| Ignored Policy Types | empty list | HiBob time-off policy types that are not synchronized. Entries are compared with the policy type that HiBob returns in lower case, so enter them in lower case. |

Versions before 1.1.0 stored this list in the ftrack action settings. The addon moves an existing override to this area when settings are converted.

## Ftrack actions

### Sync HiBob Holidays

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Makes the **Sync HiBob Holidays** action available in ftrack. |
| Roles | `Administrator`, `Project Manager` | ftrack roles of the users who can see and run the action. |
