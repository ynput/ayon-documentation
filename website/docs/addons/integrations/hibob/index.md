---
title: HiBob addon
sidebar_label: Overview
description: "The AYON HiBob addon: synchronizes time off from the HiBob HR system into the AYON Planner addon with a background service, and into ftrack calendars with an ftrack action, with its requirements and settings areas."
addon: hibob
addon_repo: ayon-hibob
addon_version: 1.1.3
addon_scope: server
addon_flags: []
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-hibob/tree/1.1.3
  - https://github.com/ynput/ayon-hibob/releases
---

# HiBob addon

<AddonInfo />

The HiBob addon connects the HR system [HiBob](https://www.hibob.com/) to AYON. It reads the time off (holidays and other absences) of the employees in HiBob and writes it as absence entries into the [Planner addon](../../production-tracking/planner/index.md) of the AYON server, so that availability in planning matches the HR data. For studios that use ftrack, a server action does the same for ftrack calendar events. HiBob is the source of truth: entries created by the addon are updated or removed when HiBob changes. The addon has no pipeline (client) part. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Value |
|---|---|
| Required addons | None |
| Compatible addons | `planner` newer than 1.0.0 (target of the sync service), `ftrack` newer than 1.1.4 (for the ftrack action) |
| Service | `ayon_sync`, image `ynput/ayon-hibob-sync:1.0.1` |
| HiBob | A service user and its API token, stored as AYON secrets |

The service reads the Planner addon version from the active bundle (production or staging bundle for those variants, otherwise the bundle named like the settings variant). A sync fails with a logged error when the bundle has no `planner` addon or when the credentials are not set.

## What it connects

| System | Direction | How |
|---|---|---|
| HiBob | Read | The HiBob REST API (`people/search` for employee ids and email addresses, `timeoff/whosout` for time off). Hourly time off is not requested. |
| AYON Planner | Write | Absence events (event type `absence`) on the Planner resource of each user. Each event stores the HiBob request id in its data. |
| ftrack | Write | Leave calendar events (`CalendarEvent` with `leave` set) with the user as resource. |

People are matched by email address: the HiBob employee email against the email attribute of the AYON user (Planner sync) or the email of the ftrack user (ftrack action). Employees without a matching user are skipped. Only Planner resources of type person that are linked to an AYON user are written.

## Planner synchronization (service)

The `ayon_sync` service starts a sync every 10 minutes. Each run covers the period from 7 days in the past to 365 days in the future.

| Case | Result in Planner |
|---|---|
| HiBob time off with the same start and end as an existing synced event | The event is kept, and its label is updated when the policy name changed. |
| HiBob time off that overlaps no synced event | A new absence event is created, labeled with the policy display name (or `Holiday` when HiBob gives none). |
| HiBob time off that overlaps one synced event | The event is updated to the HiBob dates and label. |
| Synced event that matches no HiBob time off | The event is removed. This applies to users that have at least one time-off entry in HiBob in the period. |

Only events that carry a HiBob request id are considered, so absences entered by hand in Planner are not touched. The end date from HiBob is treated as inclusive (the event ends at the end of that day).

## ftrack action

With the `ftrack` addon, the HiBob addon ships ftrack event handlers. They register the server action **Sync HiBob Holidays** (identifier `sync.hibob.holidays.server`). The action creates, updates and removes ftrack leave events named `<policy name> (HiBob)` for the users found by email. Only events whose name ends with `(HiBob)` are managed, so other ftrack calendar events stay unchanged. The action is shown to users who have one of the configured roles and only when it is enabled in the settings. It reports an error when the service user or API key is not set.

## Settings areas

| Area | Content |
|---|---|
| Service Credentials | Names of the AYON secrets that hold the HiBob service user and API key. |
| Sync Configuration | HiBob policy types that are left out of the sync. |
| Ftrack actions | Enable switch and allowed ftrack roles of the **Sync HiBob Holidays** action. |

## Related

- [Settings](settings.md)
- [Planner addon](../../production-tracking/planner/index.md)
