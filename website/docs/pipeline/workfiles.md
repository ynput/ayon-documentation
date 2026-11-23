---
title: Workfiles
description: "The Workfiles tool of AYON integrations: browsing, opening and saving the workfiles of a task with names and locations from the project templates, copying published workfiles, and the workfile actions."
verified: 2026-11-23
ui_purpose: "Opens, saves and versions the workfiles of a task, with names and locations from the project templates."
ui_location: "AYON menu of the host application > Work Files..."
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/widgets/window.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/widgets/files_widget.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/widgets/save_as_dialog.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/widgets/side_panel.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/widgets/actions_widgets.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/models/workfiles.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/workfiles/lock_dialog.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/pipeline/actions/workfile.py
  - https://github.com/ynput/ayon-core/tree/develop/client/ayon_core/plugins/workfile_actions
  - https://github.com/ynput/ayon-core/blob/develop/server/settings/workfile_actions.py
  - https://github.com/ynput/ayon-core/blob/develop/server/settings/tools.py
---

# Workfiles

<PageInfo />

Workfiles is where an artist's day in a host application starts and ends. It replaces the file open and file save dialogs of the application: instead of browsing the file system and typing a name, the artist picks a folder and a task, and the tool lists the scene files of that task, opens them and saves new versions with the name and location the project templates define. Because every workfile lands in the same predictable place with a versioned name, other tools can rely on it: the [Launcher](tray-and-launcher-window.md) reopens the last workfile, publishing knows which task a scene belongs to, and a TD can find any artist's file without asking.

A workfile is a scene file that belongs to a task. Besides the file on disk, the AYON server stores an entity for each workfile with its path, version, comment, note (description), host name and the user who updated it.

## Where it opens

| Item | Value |
|---|---|
| Menu entry | **Work Files...** in the AYON menu of most integrations (for example Maya, Nuke, 3ds Max, Hiero, Blender). Some integrations label it **Workfiles...**, or show it as a button in a panel (Fusion, Resolve). The menu itself is labeled **AYON** unless the launcher sets another `AYON_MENU_LABEL`. |
| Window title | **AYON Workfiles**, followed by the host name. |
| On application start | Opens by itself when the core setting [Open workfile tool on launch](../addons/essentials/core/settings.md#workfiles) matches the host, task type and task name. |
| From publishing | The failure of the **Validate File Saved** validator offers the action **Show Workfiles Tool...**. |
| Requirement | The integration must implement the workfile host interface. Otherwise the window shows "Workfiles tool is not supported in this host/DCCs." |

The tool exists only inside an integration. The [Launcher window](tray-and-launcher-window.md) has its own list of workfiles per task, and it can start an application with a chosen workfile. While the AYON server cannot be reached, a connection overlay covers the window and the tool refreshes when the connection returns.

## Layout

The window has four resizable columns.

| Column | Content |
|---|---|
| Folders | Folder filter **Folder name filter...**, a my tasks toggle, a **Select the current context in the hierarchy** button, a refresh button, and the folder tree with a status column. |
| Tasks | Tasks of the selected folder with a status column. |
| Files | Filter **Filter files..**, the **Published** checkbox, the file list and the buttons. |
| Side panel | **Details**, the quick actions row and the note field. |

The folder and task selection starts on the current context of the application. The my tasks toggle limits folders and tasks to those that have the signed-in user as an assignee.

![The AYON Workfiles window in Maya: the folder robot and its task Modeling selected, two workfiles cg_robot_Modeling_v002.ma and v001 with author and modification date, the Published switch off, the Open, Browse and Save As buttons, and the side panel with size, created and modified details, two quick action buttons and the Artist Note](assets/workfiles/workfiles-window.webp "Workfiles window")

### File list

| Column | Content |
|---|---|
| **Name** | File name. |
| **Author** | The user who last updated the workfile entity (full name when known). |
| **Date Modified** | Modification time of the file. |

The list contains the files in the work directory of the selected task that have an extension supported by the host, and the workfile entities of the task whose file is missing. Entries whose file is missing are shown but cannot be selected. The file with the latest modification time is selected after each refresh. Clicking a column header sorts the list; the filter input matches file names.

| Placeholder row | Shown when |
|---|---|
| **Select folder and task** | No task is selected. |
| **Work Area is empty..** | The task has no workfiles. |

### Buttons of the work area

| Button | What it does |
|---|---|
| **Open** | Opens the selected workfile. A double click does the same. If the current scene has unsaved changes, the dialog **Unsaved Changes!** asks to save (**Yes**), discard (**No**) or cancel. When opening succeeds, the window closes. |
| **Browse** | Opens a native file dialog titled **Work Files** in the work directory, limited to the extensions of the host. The chosen file opens as with **Open**. |
| **Save As** | Opens the **Save Workfile As** dialog and saves the current scene as a new workfile in the selected folder and task. |

**Save As** and **Browse** need a selected folder and task. **Save As** is disabled when the integration shows the tool with saving disabled.

### Save Workfile As dialog

| Control | What it does |
|---|---|
| **Version** spinner | Version number, 1 to 9999. Visible only when the file template contains a version key. |
| **Next Available Version** | On by default. The version is the highest existing version plus one. Turning it off enables the spinner, so a version can be picked by hand. |
| **Subversion** input and drop-down | Comment that becomes part of the file name. Visible only when the file template contains a comment key. The drop-down lists the comments of existing workfiles and the entry `< Empty >`. |
| **Extension** | Extensions that the host supports. |
| **Preview** | The resulting file name in green. In red, the text `Cannot create "name" because file exists!` with the file name, and **Save** is disabled. |
| **Artist Note** | Free text stored in the workfile entity. Placeholder **Provide a note about this workfile.** |
| Context hint | When the selected folder or task differs from the current context of the application, the text **Your context will switch to another task** with an info icon. Its tooltip names the folder and task the workfile is saved to. |
| **Save**, **Cancel** | Confirm or close. |

The name and the folder of the file come from the work template of the project anatomy, and the subversion is an optional comment in it. How they are built is described in [Naming conventions: Workfiles](naming-conventions.md#workfiles).

:::tip Start versions at 0 or another number
A new work area starts at version 1. To start at another number, for example `v000` for a first layout pass, add a profile to [Version start](../addons/essentials/core/settings.md#version-start) in the Core addon settings, filtered by host, task type or task.
:::

### Published workfiles

The **Published** checkbox switches the file list to the workfiles that were published from the folder: the representations of products of the base type `workfile`. When a task is selected, only the ones published from that task are listed.

| Element | What it does |
|---|---|
| File list | Columns **Name**, **Author** and **Date Modified**. Placeholder rows **Select folder** and **Didn't find any published workfiles.** |
| **Copy & Open** | Opens **Save Workfile As** with the extension fixed to the one of the published file, copies the published file into the work area of the selected task under the new name, and opens it. |
| **Choose different context** | Lets the folder and task selection change, so the copy can go to another task. While active, the file list keeps showing the published files, and the button is replaced by **Cancel**, which restores the previous selection. |
| Side panel | The note field is renamed **Comment**, is read-only, and shows the comment of the published version. |

### Side panel

| Element | Content |
|---|---|
| **Size** | File size. |
| **Created** | The creator and the creation time of the file. |
| **Modified** | The user who updated it and the modification time. |
| Quick actions | A row of buttons for the workfile actions that fit the selection (see below). Actions that do not fit the width move to the **More actions** button. |
| **Artist Note** | Editable note of the selected workfile. **Save note** is enabled when the text changed. |

## Workfile actions

Workfile actions are small plugins that act on the selected workfile or task. They appear in the context menu of the file list (work area and published) and, unless an action is marked as context-menu only, as buttons in the quick actions row of the side panel. Actions with a group label are listed in a submenu. The core addon provides:

| Action | Where | What it does |
|---|---|---|
| **Increment and open** | Quick action, work area | Copies the selected workfile to the next available version, keeping its comment, and opens the copy. Asks about unsaved changes first. |
| **Duplicate** | Context menu, work area | Opens **Save Workfile As** and copies the selected file to the new name without opening it. |
| **Copy file path**, **Copy file** | Context menu | Copies the path, or the file itself, to the clipboard. |
| **Set context** | Quick action | Changes the current context of the application to the selected task without opening a workfile. Off by default. |
| **Explore here** | Quick action | Opens the file browser of the operating system at the selected workfile, or at the work directory of the task when no file is selected. |

Each action can be switched on or off in the core addon settings group [Workfile actions](../addons/essentials/core/settings.md#workfile-actions), except **Copy file path** / **Copy file**, whose switch has no effect in Core 1.10.7. Addons add their own actions through `get_workfile_action_plugin_paths` of the `IPluginPaths` interface; see [plugin paths](../developer/addon-development/client.md#plugin-paths).

## Notifications

After an operation, a short notification appears at the top of the window. A bar in it drains for five seconds, then the notification slides away; while the pointer is over it, it stays.

| Notification | Operation |
|---|---|
| **Workfile saved**, **Failed to save workfile** | Save As. |
| **Workfile duplicated**, **Failed to duplicate workfile** | Duplicate. |
| **Publish workfile saved**, **Failed to copy published workfile** | Copy & Open. |
| **Failed to open workfile** | Open. |

## Workfile locks

When the core setting [Workfile lock profiles](../addons/essentials/core/settings.md#workfiles) is enabled for a host, the integration writes a lock file next to an opened workfile. Integrations that support locks show a **Warning** dialog with the buttons **Cancel** and **Ignore lock** when another user or machine has the file open. The Maya integration implements the lock check.

## Tool settings

Tool settings are set in the studio settings and can be overridden per project. The Workfiles tool reads these Core addon settings:

- [Tools > Workfiles](../addons/essentials/core/settings.md#workfiles): open the last workfile or this tool when an application starts, create extra folders in the work directory, and enable workfile locks.
- [Workfile actions](../addons/essentials/core/settings.md#workfile-actions): switch the workfile actions on or off.
- [Use task type sorting](../addons/essentials/core/settings.md#ayon-menu-and-general): orders the task list.

Where workfiles are saved and how they are named is set by the work templates of the project anatomy and the profiles that pick them, see [Naming conventions: Workfiles](naming-conventions.md#workfiles).

## Related

- [Tray and Launcher window](tray-and-launcher-window.md): starts applications, optionally with a chosen workfile.
- [Publisher](publisher.md): publishes the workfile as a product, which then appears under **Published**.
- [Loader](loader.md) and [Scene Inventory](scene-inventory.md): the other tools of the AYON menu.
- [Naming conventions](naming-conventions.md): how workfile names and folders are built.
- [Templated workfile builder](template-builder.md): new workfiles built from a template scene.
- [Pipeline tools](pipeline-tools.md): overview of all desktop tools.
