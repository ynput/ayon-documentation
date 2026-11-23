---
title: TimersManager addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Timers Manager addon with their defaults: automatic stop after inactivity, idle time, dialog lead time and handling of publishing."
addon: timers_manager
addon_repo: ayon-timers-manager
addon_version: 0.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-timers-manager/tree/0.2.0/server/settings.py
---

# TimersManager addon settings

<AddonInfo />

The settings of the [Timers Manager addon](index.md) are in **Studio settings > Timers Manager**. Pasting the location below into the URI bar of the web app opens them. The time trackers the timers drive, such as [Clockify](../clockify/settings.md), have their own settings.

## Timers

<SettingLocation uri="ayon+settings://timers_manager" scope="Studio only" />

When running timers stop on their own because the user is idle, and whether publishing counts as working time.

<!-- screenshot: settings editor, Timers Manager -->

<Settings>
<Setting name="Auto stop timer" default="Enabled">

Stop all timers when the user has been idle for the **Max idle time**. Has no effect on macOS and Linux, where auto stop is always off.

</Setting>
<Setting name="Max idle time" default="15">

Idle time in minutes after which the timers stop. A value of 0 or less turns auto stop off.

</Setting>
<Setting name="When dialog will show" default="0.5">

Minutes before the stop at which the inactivity dialog appears. The default is 30 seconds. The dialog appears at the maximum idle time minus this value.

</Setting>
<Setting name="Disregard publishing" default="Disabled">

When enabled, the publish plugins **Stop Timer** and **Start Timer** stop the timers while publishing and start them again afterward, so publishing time is not counted. When disabled, publishing does not affect running timers.

</Setting>
</Settings>

## Related

- [Timers Manager addon](index.md)
- [Clockify addon settings](../clockify/settings.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
