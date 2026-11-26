---
title: Time Tracker addon
sidebar_label: Time Tracker
description: "The AYON Time Tracker addon, not released yet: a timer in the web app header, time logs on tasks, folders, versions and Planner bookings, a Time tab in the details panel, and its settings."
addon: timetracker
addon_repo: ayon-server-timetracker
addon_version: 0.1.0-dev
addon_scope: server
addon_flags: [unreleased]
addon_private: true
verified: 2026-11-24
---

# Time Tracker addon

<AddonInfo />

:::note Unreleased
The addon has not been released yet: it is not published on the Market, and details may change before the first release.
:::

The Time Tracker addon records the time people spend on a production. It adds a timer to the header of the AYON web app, time logs linked to tasks, folders, versions or bookings of the [Planner](../planner/index.md), and a **Time** tab in the details panel. It is a server addon: it has no launcher or DCC part. How time tracking is used in a production is described in [Time tracking](../../../production-tracking/time-tracking.md).

## Requirements

- **AYON server** 1.17.5 or newer.
- **No other addons** are needed. With the [Planner](../planner/index.md), time can also be logged on its bookings.

## Settings

The settings are in **Studio settings > Time Tracker**. The timer settings apply to the whole studio, because a running timer is not bound to one project; the time log settings can be overridden in **Project settings > Time Tracker**. Pasting the location below into the URI bar of the web app opens the settings.

<SettingLocation uri="ayon+settings://timetracker" scope="Studio, with project overrides for time logs" />

<!-- screenshot: settings editor, Time Tracker -->

### Timers

<Settings>
<Setting name="Stale session timeout (minutes)" default="15">

A running timer that has had no AYON page open for this long is stopped, and its time log ends at the last moment a page was open. Studio only.

</Setting>
<Setting name="Heartbeat persist interval (seconds)" default="60">

How often the state of running timers is written to the database; in between it is kept in memory. At least 10, and at most half of the stale session timeout. Studio only.

</Setting>
</Settings>

### Time logs

<Settings>
<Setting name="Allow artists to create manual time logs" default="Enabled">

Lets artists add time logs by hand, besides the timer. Managers can always create time logs.

</Setting>
<Setting name="Artist edit lock (days)" default="0">

Artists cannot create, edit or delete time logs with a work date older than this number of days. 0 turns the lock off. Managers are not limited by it.

</Setting>
</Settings>

## Related

- [Time tracking](../../../production-tracking/time-tracking.md)
- [Planner addon](../planner/index.md)
