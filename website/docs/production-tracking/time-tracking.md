---
title: Know where the time goes
sidebar_label: Time tracking
description: "Tracking the time spent on a production with the Time Tracker addon, in development: one running timer per artist, time logged on tasks, folders, versions or Planner bookings, uncategorized time, manual entries, locking old logs, and the totals available so far."
verified: 2026-11-17
---

# Know where the time goes

:::note
The Time Tracker addon is in development and not released yet. Its plan and licence are not decided. This page describes the current development version (0.1.0-dev); features and names can change before the release.
:::

<!-- screenshot: the Time tracker popover under the header timer on wing_it, with a running timer on a lighting task and the logs of the week grouped by day with their totals -->

Bids, budgets and schedules are estimates; time logs show what the work really took. The Time Tracker addon records the time people spend, linked to the work in AYON: a task, a shot, a version or a booking of the Planner. Producers can then see how much time went into a shot or a task, and artists keep their timesheet in the same web app where they find their tasks.

## Log time with one running timer

<!-- screenshot: the AYON header with the running timer showing the elapsed time, and the right-click menu of a task in the Overview with Start timer -->

Each user has one timer, shown in the header of the web app on every page. A timer can be started from the header with only a description of the work, or with **Start timer** in the right-click menu of a task, folder or version in the project tables and the details panel. Starting a new timer stops the running one and logs its time, also when the two are in different projects, so time is never counted twice. Every time log has a button to start a new timer on the same work, which makes switching back to a task one click.

The timer keeps running while any AYON page is open. When no AYON page has been open for a set time (15 minutes by default), the timer is stopped and its time is logged up to the last moment AYON was open, so a forgotten timer does not log the night. A timer started by mistake can be discarded without creating a log.

## Link time to the work

<!-- screenshot: the Time tab of the details panel for a wing_it shot task, with the total time logged, Start timer, Add time and the list of logs -->

A time log can be linked to a task, a folder or a version of a project. The details panel of these entities has a **Time** tab with the time logged on them, a timer and their logs, and the project tables can show a **Time logged** column with the time on each row. Artists see their own time there; managers see the time of everyone.

When the [Planner](../addons/production-tracking/planner/index.md) is installed, time can also be logged on a booking of the Plan: **Start timer** is in the menu of a booking and of a task bar on the Schedule, and the booking form has a start and stop button. The Planner marks the bar of the booking or task that the running timer tracks. A booking without a project gives a time log without a project.

When the project has [teams](../ayon/web-ui/project/teams.md), a log also records the team of the user, which is set automatically when the user is a member of only one team in the project.

## Keep time that belongs to no task

Not all time is spent on shots: installing software, setting up a workstation, meetings. A log does not need a project or an entity; it is kept as uncategorized time and can be linked to a task later. The server can list and sum uncategorized logs separately, which shows how much time is not attributed to production work; the web app has no view for this yet.

## Enter time after the fact

<!-- screenshot: the time log editor with the date, start and end times, the duration with the +1h, +4h and +8h buttons, the description, the project and the billable switch -->

Time can also be entered by hand, for example by artists who prefer to fill in their day at the end of it. **Add time** in the **Time** tab, or **Add time manually** in the menu of the header timer, asks for the date, the start and end times or a duration, with buttons that add one hour, half a day or a day. A log can be edited afterwards: its duration, times, description and the work it is linked to. Logs can be marked as billable.

Whether artists may enter time by hand is a setting of the addon, for the studio or per project; managers can always enter time, also for other users. Logs are never shorter than one minute. Deleted logs are kept in the database, marked as deleted, and logs stay after their project or user is deleted.

## Close old timesheets

Once timesheets are delivered, they should not change. The **Artist edit lock** setting, for the studio or per project, stops artists from creating, editing or deleting logs older than a number of days; it is off by default. Managers can also lock and unlock chosen logs, and a locked log shows a lock icon. Managers are not limited by these locks.

## Totals so far

The current version gives totals in a few places: the time logged on an entity in its **Time** tab and in the **Time logged** column, and the total of each day in a user's list of logs. The server can sum logs per user, per entity and per day, filtered by project, user, team, dates and billable, which is the base for reports to come.

## Not covered yet

The following are design proposals in the development version and not implemented:

- A report page, and exports of time logs to CSV, Excel or PDF.
- Comparing logged time with the time booked in the Planner. Time can be logged on a booking, but no view compares the two.
- Approval of timesheets by artists and managers.
- Closing reporting periods (day, week or month) instead of the rolling lock in days.
- Importing timesheets from CSV or Excel files.
- Starting a timer from the AYON launcher or from the DCC applications.
- Permissions per access group: today only managers and admins see and manage the time of other users.

## Related

- [Planner addon](../addons/production-tracking/planner/index.md)
- [Planning](planning.md)
- [Report on the production](reporting.md)
- [Teams](../ayon/web-ui/project/teams.md)
- [Details panel](../ayon/web-ui/details-panel.md)
