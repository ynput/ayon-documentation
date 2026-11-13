---
title: Experimental tools
description: "The Experimental tools dialog of the AYON core addon: the window that lists tools not yet in the standard menus, and the Pyblish Debug Stepper it provides."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/2558312-experimental-tools
---

# Experimental tools

Experimental tools is a small dialog of the core addon that collects tools which are not part of the standard AYON menus yet. A tool can be global or limited to certain host applications. The dialog exists because many host applications cannot easily extend their menu with new entries: the host only needs one **Experimental tools...** entry, and the dialog is filled from the list of tools registered in the core addon. Experimental tools can change or be removed between releases.

## Where it appears

| Item | Value |
|---|---|
| Host applications | An **Experimental tools...** entry in the AYON menu of the DCC integration (for example Maya, Nuke, Hiero, TVPaint and Unreal). Integrations open it through the shared host tools helper. |
| Window title | `AYON Experimental tools` |
| Instances | One dialog per host session. |

## Layout

The dialog is a narrow window (minimum width 220 pixels) with one button per tool available for the current host, in registration order. With no tools available it shows the text "There are no experimental tools available..." and an **OK** button that closes the dialog.

The list is rebuilt when the dialog is shown, when the dialog becomes the active window again, and every 3 seconds while it is visible and active, so tools that become enabled or disabled show up without reopening it.

## Tools

| Button | Tooltip | Available for | What it does |
|---|---|---|---|
| **New publisher** | "Combined creation and publishing into one tool." | Hosts `celaction`, `flame`, `harmony`, `hiero`, `resolve` | Opens the [Publisher](publisher.md) window. |
| **Pyblish Debug Stepper** | "Debug Pyblish plugins step by step." | All hosts | Opens the stepper window described below. |

A tool button is enabled when the tool is switched on. **Pyblish Debug Stepper** is always on. **New publisher** is registered but is switched off in the current release, so its button is disabled; the disabled tooltip reads "You can enable this tool in local settings." followed by the path `AYON Tray > Settings > Experimental Tools`. No local setting for experimental tools exists in the current release, so the button cannot be enabled.

## Pyblish Debug Stepper

The stepper pauses a publish after every plugin and shows the data of the publish at that point. It targets pipeline developers, technical directors and administrators who need to see what each collector, validator or extractor changed. It requires Pyblish 1.8.12 or newer.

The stepper window (`Pyblish Debug Stepper`, 700 by 500 pixels, always on top) registers a Pyblish `pluginProcessed` callback while it is visible and removes it when it is hidden. Every time a plugin finishes the callback pauses the publish and updates the window; the **Step** button continues until the next plugin finishes. The stepper reacts to validation and publish started from the [Publisher](publisher.md) or from code. Closing the window resumes the publish and unregisters the callback.

| Element | Content |
|---|---|
| Title | `Pyblish Debug Stepper`, followed by the label of the last processed plugin. |
| Info box | Plugin order, plugin class name, the instance it processed (when it is an instance plugin) and its duration in milliseconds. |
| **Filter keys...** | Filters the data tree by key, recursively. |
| Data tree | Columns **Key**, **Type**, **Value**. The first top-level entry is `context` (the context data); each instance follows under its name with its instance data. Nested dictionaries expand. Hovering a changed value shows its full JSON. |
| **Step** | Resumes the publish until the next plugin has finished. Disabled while no plugin is waiting. |

Changes since the previous step are color coded:

| Color | Meaning |
|---|---|
| Green key | Key added since the previous step. |
| Light value | Value changed or added since the previous step. |
| Dim value | Value unchanged. |
| Red type | The type of the value changed. |

Values longer than 100 characters are shortened in the cell; the tooltip holds the full value.

## Permissions and settings

Experimental tools have no permission gate and no addon settings. The dialog has no entry in the web app and does not read project settings.

## Related

- [Publisher](publisher.md): the window the stepper pauses, and the **New publisher** entry.
- [Publishing](publishing.md): the plugin stages and order the stepper walks through.
- [Process Monitor](process-monitor.md): another developer-facing tool that shows the output of launched applications.
