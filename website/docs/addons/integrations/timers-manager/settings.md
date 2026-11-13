---
title: TimersManager addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Timers Manager addon with their defaults: automatic stop after inactivity, idle time, dialog lead time and handling of publishing."
addon: timers_manager
addon_repo: ayon-timers-manager
addon_version: 0.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-timers-manager/tree/0.2.0/server/settings.py
---

# TimersManager addon settings

<AddonInfo />

The settings of the [Timers Manager addon](index.md), with the default values the addon ships with. All of them are available at studio scope only. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Timers

| Setting | Default | Description |
|---|---|---|
| Auto stop timer | On | Stop all timers when the user has been idle for the **Max idle time**. Has no effect on macOS and Linux, where auto stop is always off. |
| Max idle time | 15 | Idle time in minutes after which the timers stop. A value of 0 or less turns auto stop off. |
| When dialog will show | 0.5 | Minutes before the stop at which the inactivity dialog appears. The default is 30 seconds. The dialog appears at the maximum idle time minus this value. |
| Disregard publishing | Off | When on, the publish plugins **Stop Timer** and **Start Timer** stop the timers while publishing and start them again afterward, so publishing time is not counted. When off, publishing does not affect running timers. |
