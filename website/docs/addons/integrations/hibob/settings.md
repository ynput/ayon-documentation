---
title: HiBob addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON HiBob addon with their default values: service credentials, ignored policy types and the ftrack Sync HiBob Holidays action."
addon: hibob
addon_repo: ayon-hibob
addon_version: 1.1.3
addon_scope: server
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-hibob/tree/1.1.3/server/settings
---

# HiBob addon settings

<AddonInfo />

The settings of the [HiBob addon](index.md) are in **Studio settings > HiBob**, and some can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The HiBob credentials themselves are not stored in the settings: they are AYON [secrets](../../../ayon/web-ui/studio/secrets.md) that the settings point to.

The sync service reads the studio settings. The ftrack action reads the settings of the project it is run on.

## Service Credentials

<SettingLocation uri="ayon+settings://hibob/service_credentials" scope="Studio only" />

Which AYON secrets hold the credentials of the HiBob service user. Both fields hold the name of a secret, chosen from the secrets of the server, and not the value itself. The service and the ftrack action resolve the names to the secret values, and do nothing while either is empty.

<!-- screenshot: settings editor, Service Credentials -->

<Settings>
<Setting name="HiBob Service User" default="Empty">

Secret that holds the id of the HiBob service user.

</Setting>
<Setting name="HiBob Service API key" default="Empty">

Secret that holds the API token of that service user.

</Setting>
</Settings>

## Sync Configuration

<SettingLocation uri="ayon+settings://hibob/sync_config" scope="Studio, with project overrides" />

Which HiBob time off is left out of the synchronization.

<!-- screenshot: settings editor, Sync Configuration -->

<Settings>
<Setting name="Ignored Policy Types" default="Empty list">

HiBob time-off policy types that are not synchronized. The policy type that HiBob returns is compared in lower case: the ftrack action also lowercases the entries, but the sync service does not, so enter them in lower case.

</Setting>
</Settings>

Versions before 1.1.0 stored this list in the ftrack action settings. The addon moves an existing override to this group when settings are converted.

## Ftrack actions

<SettingLocation uri="ayon+settings://hibob/ftrack_event_handlers" scope="Studio, with project overrides" />

The ftrack action the addon adds through the [ftrack addon](../../third-party-trackers/ftrack/index.md) services.

<!-- screenshot: settings editor, Ftrack actions -->

### Sync HiBob Holidays

<SettingLocation uri="ayon+settings://hibob/ftrack_event_handlers/SyncHiBobHolidaysAction" scope="Studio, with project overrides" />

<Settings prefix="sync-hibob-holidays">
<Setting name="Enabled" default="Enabled">

Makes the **Sync HiBob Holidays** action available in ftrack.

</Setting>
<Setting name="Roles" default="Administrator, Project Manager">

ftrack roles of the users who can see and run the action.

</Setting>
</Settings>

## Related

- [HiBob addon](index.md)
- [Secrets](../../../ayon/web-ui/studio/secrets.md)
- [ftrack addon settings](../../third-party-trackers/ftrack/settings.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
