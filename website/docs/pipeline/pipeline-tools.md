---
title: Pipeline tools
description: "Overview of the AYON desktop tools: what each tool is for, whether it opens from the tray menu or from the AYON menu inside a host application, and which step of the work it serves."
verified: 2026-11-23
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/tray/ui/tray.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/utils/host_tools.py
  - https://github.com/ynput/ayon-core/tree/develop/client/ayon_core/tools
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/api/menu.py
  - https://github.com/ynput/ayon-applications/tree/develop/client/ayon_applications
  - https://github.com/ynput/ayon-traypublisher/blob/develop/client/ayon_traypublisher/addon.py
---

# Pipeline tools

The pipeline tools are the desktop windows through which artists and TDs work with AYON day to day. They are what keeps work consistent without anyone typing a path: the tools pick the context (project, folder, task), name and place the files from the project templates, and record what was loaded and published. Most of them are part of the core addon and look and behave the same in every integration; a few come from other addons.

The tools open from two places:

- **The tray menu** of the AYON launcher, outside any application. These tools work at the project level: starting work, browsing what was published, publishing files from disk, and monitoring.
- **The AYON menu inside a host application**, added by its integration. These tools work in the context of the open scene: its workfile, what it loaded and what it publishes. The menu is labeled **AYON** unless the launcher sets another `AYON_MENU_LABEL`, and entry names can differ slightly between integrations.

## Tools by step of the work

The order of the work, from launch to publish, is shown in [The pipeline, step by step](index.md#the-pipeline-step-by-step).

| Step | Tool | Opens from |
|---|---|---|
| Start work | [Tray and Launcher window](#tray-and-launcher-window) | Tray |
| Open or save work files | [Workfiles](#workfiles) | AYON menu |
| Bring in published work | [Loader](#loader) | AYON menu; from the tray as **Browser** |
| Manage what is loaded | [Scene Inventory](#scene-inventory), [Look Assigner](#look-assigner) | AYON menu |
| Create and publish | [Publisher](#publisher), Tray Publisher | AYON menu; the Tray Publisher from the tray |
| Read the console output of applications | [Process Monitor](#process-monitor) | Tray, **Admin** submenu |
| Try new tools | [Experimental tools](#experimental-tools) | AYON menu |

## Tray and Launcher window

The tray is the AYON launcher running in the system tray; its menu opens the desktop tools. The **Launcher** window lists the actions available for the selected project, folder and task, most commonly starting a host application in that context, and has its own list of the task's workfiles to start an application with a chosen file.

Opens from: the tray menu entry **Launcher**, or a double click on the tray icon. See [Tray and Launcher window](tray-and-launcher-window.md).

## Workfiles

Replaces the open and save dialogs of the application: lists the workfiles of a task, opens them, and saves new versions with names and locations from the project templates. It can also copy a published workfile into a work area.

Opens from: AYON menu > **Work Files...**, or by itself when the application starts, if the studio enabled it. See [Workfiles](workfiles.md).

## Loader

Lists the published versions of the project and of library projects in a table or as cards, with filters, grouping and saved views. Inside an application it loads, references or imports them into the open scene, and every load creates a container that records its source. Opened from the tray as the **Browser**, the same tool works without an application and adds actions such as delivery, hero version creation and deleting old versions.

Opens from: AYON menu > **Load...**, or the tray menu entry **Browser**. See [Loader](loader.md).

## Scene Inventory

Lists what is loaded in the open scene, marks outdated versions, and updates, switches or removes the loaded containers.

Opens from: AYON menu > **Manage...**, from the outdated-content pop-up of some integrations, or from the **Validate Outdated Containers** validator. See [Scene Inventory](scene-inventory.md).

## Look Assigner

A Maya tool that finds the assets in the scene and assigns their published looks (shaders and render attributes) to the matching nodes. It belongs to the `cbId` workflow of the Maya addon; the OpenUSD workflow carries look assignments in the look products themselves.

Opens from: AYON menu > **Look assigner...** in Maya. See [Look Assigner](look-assigner.md).

## Publisher

The creator and the publisher in one window: its **Create** tab marks content of the open scene as products to publish, and its **Publish** tab validates and publishes them, with a report of every step. The same window runs outside an application as the Tray Publisher.

Opens from: AYON menu > **Create...** or **Publish...**. See [Publisher](publisher.md).

The [Tray Publisher](../addons/essentials/traypublisher/index.md) is the standalone publisher: it publishes files that already exist on disk, such as plates, renders or editorial files, without a host application. It opens from the tray menu entry **Publisher**.

## Process Monitor

Lists the applications started through AYON and shows their console output, for reading startup errors and logs of applications without a console window. Provided by the Applications addon.

Opens from: the tray menu > **Admin** > **Process Monitor**. See [Process Monitor](process-monitor.md).

## Experimental tools

A window that lists experimental tools. Today it has one, the Pyblish Debug Stepper, which steps through a publish plugin by plugin.

Opens from: AYON menu > **Experimental tools...**. See [Experimental tools](experimental-tools.md).

## Related

- [AYON launcher](launcher.md): the desktop application that runs the tray.
- [Publishing](publishing.md): how a publish runs.
- [Naming conventions](naming-conventions.md): the templates that name and place workfiles and published files.
- [Core addon](../addons/essentials/core/index.md): provides most of the tools; its [settings](../addons/essentials/core/settings.md#tools) shape them.
