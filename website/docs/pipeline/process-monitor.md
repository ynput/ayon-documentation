---
title: Process Monitor
description: "The AYON Process Monitor of the Applications addon: the window that lists applications launched from AYON, shows their state and displays their redirected console output."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/2830636-process-monitor-tool
---

# Process Monitor

The Process Monitor tracks the processes that the Applications addon starts, such as DCC applications launched from the Launcher, and shows the output they write to their console. Pipeline developers and administrators use it to read startup errors and logs of an application that has no console window of its own. The tool is provided by the Applications addon and runs inside the AYON tray application.

## Where it appears

| Item | Value |
|---|---|
| Menu entry | **Process Monitor** in the **Admin** submenu of the AYON tray menu |
| Provided by | The Applications addon (an admin action of the tray) |
| Window title | `AYON Process Monitor` (a dialog, minimum size 1000 by 600 pixels) |
| Instances | One window; closing it stops its background refresh and showing it starts it again. |

The **Admin** submenu appears in the tray menu only when at least one addon adds an action to it. The core tray adds **Console** and **Publish report viewer** to the same submenu.

## Layout

| Region | Content |
|---|---|
| Toolbar | Buttons **Refresh Process List**, **Clean Inactive**, **Delete Selected**. |
| Process tree | Table of recorded processes with an expandable list of child processes under each. |
| Output pane | Label **Output Content:**, the output text, and the checkbox **Auto-reload output for running processes**. The pane is below the tree (the tree gets about 60% of the height). |
| Status bar | Short messages: `Ready`, `Loaded N processes`, deletion results and errors. |

### Process tree

| Column | Content |
|---|---|
| **Name** | Name of the launched application, with a state icon. |
| **Executable** | Path of the executable. |
| **PID** | Process id, or `N/A`. |
| **Created** | When the record was created, in local time. |
| **Start Time** | When the process started, in local time. |
| **Output File** | Path of the file that holds the redirected output, or `N/A`. |

The table is sorted by **Created**, newest first, and any column can be sorted. Selection is extended (Ctrl and Shift).

Child processes started by an application are listed under its row, in italics. They carry the running state icon. Child processes are tracked for processes that are not marked stopped.

State icons:

| Icon | State |
|---|---|
| Green circle | The process is running. |
| Yellow circle | The main process has ended but some of its child processes still run. |
| Red circle | The process has stopped. |
| Gray circle | State not known yet. |

The list refreshes continuously in a background thread: new launches appear, states and child processes update, and records that were deleted elsewhere disappear.

## Controls

| Control | What it does |
|---|---|
| **Refresh Process List** | Reloads the list of recorded processes immediately. |
| **Clean Inactive** (tooltip "Remove all inactive processes from database") | After a confirmation, deletes the records of all stopped processes together with their output files, then refreshes. The status bar reports the number deleted. |
| **Delete Selected** (tooltip "Delete selected process from database and its output file") | After a confirmation, deletes the selected processes and their output files. The Delete key does the same. Child process rows cannot be deleted; selecting only child rows shows "Cannot delete a descendant process from DB." With no selection a notice asks to select a process. |
| Double-click on a main process row | Loads the content of its output file into the output pane. Child rows ignore the double-click. |
| **Auto-reload output for running processes** (on by default) | For a running process, the output pane follows the file: it updates whenever the file changes. Turning it off stops the updates. The view keeps its scroll position, or stays at the end when it was at the end. |

The output pane renders ANSI color codes as colors. Its placeholder reads "Double-click a process row to view its output file content...". Other texts it can show: "No output file available" when a process has no output file, "Output file not found" when the file was removed, "Output file is empty", and "Loading file content...".

## Where the data comes from

| Item | Behavior |
|---|---|
| Process records | Stored in a SQLite file `process_handlers.db` in the launcher local folder, shared by all AYON launches of the same user. Each record holds name, executable, arguments, environment, working folder, PID, start time, output file and a stopped flag. |
| Output file | A temporary text file named `ayon_<host name>_output_<random>.txt`. Standard output and error of the application are both written to it. |
| State | A process counts as running while a process with the recorded PID exists, its creation time matches the recorded start time (within one second) and its executable matches the recorded one. A process that fails the check is marked stopped in the database. |

## Permissions and settings

The monitor has no permission gate; it shows the records of the current OS user's launcher folder. In the Applications addon settings, each application variant has the setting **Redirect output to Process Monitor** (on by default, see [Applications addon](../addons/essentials/applications/index.md)). When it is on, the application's standard output and error go to the output file and are not shown in the application's own console window. When it is off, no output file is created, the process still appears in the list, and the output pane shows "No output file available". The default **Terminal** variant is configured without redirection.

## Related

- [Launcher](launcher.md): starts the applications that appear here.
- [Applications addon](../addons/essentials/applications/index.md): application variants and the redirect setting.
- [Publisher](publisher.md): the Details tab and the tray's **Publish report viewer** show publish logs, a separate tool in the same Admin submenu.
