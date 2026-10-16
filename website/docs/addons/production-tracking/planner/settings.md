---
title: Planner addon settings
sidebar_label: Settings
description: "The Planner addon documented settings: default event durations and event access rules for events with and without a project."
addon: planner
addon_repo: "-"
addon_version: 2.3.2
addon_scope: server
addon_flags: [licensed, beta]
addon_unverified: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/6066407-planner-plan-bookings
  - https://help.ayon.app/en/articles/1484826-planner-resources
---

# Planner addon settings

<AddonInfo />

The settings of the [Planner addon](index.md). The settings are in **Studio settings > Planner**. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Default durations

| Setting | Default | Description |
|---|---|---|
| Global default duration | 8 hours | Duration given to a new booking or capacity event, so an all-day event is created as 8 hours. Can be overridden per event type (for example for Time Off) and per resource type (for example 12 hours for rooms). |

## Event access

A new Planner has no rules, so everyone can see and edit every event.

| Setting | Applies to | Description |
|---|---|---|
| Studio event access | Events with no project assigned | List of rules. |
| Project event access | Events assigned to a project | List of rules. A rule can name an access group instead of a user; anyone holding that group on a project gets the level for that project's events. |

Each rule pairs who it applies to (**Everyone**, individual users or access groups) with an access level.

| Access level | What the user can do |
|---|---|
| No access | Sees that an event exists, but its details are redacted. |
| Viewer | Sees all details, but cannot create, edit, move or delete events. |
| Editor | Can create, edit, move and delete events. |

## Attribute access

Access to individual event and resource attributes (for example a day rate) is not part of the addon settings page. It is set on the **Resources > Attributes** page of the app, with the levels **No access**, **Viewer** and **Editor**, described on the [overview](index.md#resources).
