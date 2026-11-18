---
title: Workfiles
description: "The Workfiles tool of AYON integrations: browsing, opening, saving, duplicating and copying published workfiles in a project, folder and task context, with naming from the project templates."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/9624270-workfiles
---

# Workfiles

The Workfiles tool replaces the file open and file save dialogs of a DCC application. It lists the workfiles of a task, opens them, saves new versions, and calculates file names and locations from the project templates, so artists do not name or place files by hand. A workfile is a scene file that belongs to a task. The AYON server stores an entity for each workfile with its path, version, comment, note (description), host name and the user who updated it.

## Where it appears

| Item | Value |
|---|---|
| Menu entry | **Work Files...** in the AYON menu of most DCC integrations (for example Maya, Nuke, 3ds Max, Hiero, Blender). Some integrations name it **Workfiles...** or **Workfiles ...**, or show it as a button in a panel (Fusion, Resolve). The menu label itself is **AYON** unless the launcher sets another `AYON_MENU_LABEL`. |
| Window title | **AYON Workfiles**, followed by the host name. |
| On application start | Opens by itself when the core setting **Open workfile tool on launch** matches the host, task type and task name. |
| From publishing | The failure of the **Validate File Saved** validator offers the action **Show Workfiles Tool...**. |
| Requirement | The integration must implement the workfile host interface. Otherwise the tool shows "Workfiles tool is not supported in this host/DCCs." over the window. |

The tool exists only inside an integration. The [Launcher](launcher.md) has its own read-only list of workfiles per task, and it can start an application with a chosen workfile.

## Layout

The window has four columns.

| Column | Content |
|---|---|
| Folders | Folder filter **Folder name filter...**, a my tasks toggle, a **Select the current context in the hierarchy** button, a refresh button, and the folder tree with a status column. |
| Tasks | Tasks of the selected folder with a status column. |
| Files | Filter **Filter files..**, the **Published** checkbox, the file list and the action buttons. |
| Side panel | **Details** (size, creation and modification) and the note field. |

The folder and task selection starts on the current context of the application. The my tasks toggle limits folders and tasks to those that have the signed in user as an assignee.

### File list

| Column | Content |
|---|---|
| **Name** | File name. |
| **Author** | The user who last updated the workfile entity (full name when known). |
| **Date Modified** | Modification time of the file. |

The list contains the files in the work directory of the selected task that have an extension supported by the host, and the workfile entities of the task whose file is missing. Entries whose file is missing are shown but cannot be selected. The file with the latest modification time is selected after each refresh. The list is sorted by clicking a column header; the filter input matches file names.

| Placeholder row | Shown when |
|---|---|
| **Select folder and task** | No task is selected. |
| **Work Area is empty..** | The task has no workfiles. |

### Buttons of the work area

| Button | What it does |
|---|---|
| **Open** | Opens the selected workfile. A double click does the same. If the current scene has unsaved changes, a dialog **Unsaved Changes!** asks to save (**Yes**), discard (**No**) or cancel. When opening succeeds, the window closes. |
| **Browse** | Opens a native file dialog titled **Work Files** in the work directory, limited to the extensions of the host. The chosen file opens as with **Open**. |
| **Save As** | Opens the **Save Workfile As** dialog and saves the current scene as a new workfile in the selected folder and task. |

The context menu of a file has **Duplicate**, which opens the same dialog and copies the selected file to the new name without opening it.

**Save As** and **Browse** need a selected folder and task. **Save As** is disabled when the integration shows the tool with saving disabled.

### Save Workfile As dialog

| Control | What it does |
|---|---|
| **Version** spinner | Version number, 1 to 9999. Visible only when the file template contains a version key. |
| **Next Available Version** | On by default. The version is the highest existing version plus one. When the work area has no version, the first version comes from the version start setting. Turning it off enables the spinner. |
| **Subversion** input and drop-down | Comment that becomes part of the file name. Visible only when the file template contains a comment key. The drop-down lists the comments of existing workfiles and the entry `< Empty >`. |
| **Extension** | Extensions that the host supports. |
| **Preview** | The resulting file name in green. In red, the text `Cannot create "name" because file exists!` with the file name, and **Save** is disabled. |
| **Artist Note** | Free text stored in the workfile entity. Placeholder **Provide a note about this workfile.** |
| **Save**, **Cancel** | Confirm or close. |

File names and directories come from the work templates of the project anatomy. The template used is chosen by the core setting **Workfile template profiles** (by task type and host). See [naming conventions](naming-conventions.md). The version in the name is independent of product versions: publishing can raise the workfile version, and the subversion is only a comment, so removing it continues with the next version number.

### Published workfiles

The **Published** checkbox switches the file list to the workfiles that were published from the folder. Published workfiles are the representations of products of the base type `workfile` (type `workfile` on servers older than 1.14). When a task is selected, only the ones published from that task are listed.

| Element | What it does |
|---|---|
| File list | Columns **Name**, **Author** and **Date Modified**. Placeholder rows **Select folder** and **Didn't find any published workfiles.** |
| **Copy & Open** | Opens **Save Workfile As** with the extension fixed to the one of the published file, copies the published file into the work area of the selected task under the new name, and opens it. |
| **Choose different context** | Lets the folder and task selection change, so the copy can go to another task. While active, the file list keeps showing the published files, and the button is replaced by **Cancel**, which restores the previous selection. |
| Side panel | The note field is renamed **Comment**, read-only, and shows the comment of the published version. |

### Side panel

| Element | Content |
|---|---|
| **Size** | File size. |
| **Created** | The creator and the creation time of the file. |
| **Modified** | The user who updated it and the modification time. |
| **Artist Note** | Editable note of the selected workfile. **Save note** is enabled when the text changed. |

## Messages

The window shows short messages after operations.

| Message | Operation |
|---|---|
| **Workfile saved**, **Failed to save workfile** | Save As. |
| **Workfile duplicated**, **Failed to duplicate workfile** | Duplicate. |
| **Publish workfile saved**, **Failed to copy published workfile** | Copy & Open. |
| **Failed to open workfile** | Open. |

## Permissions and settings

| Item | Effect |
|---|---|
| Core addon setting group **Tools** > **Workfiles** | **Workfile template profiles**, **Open last workfile on launch**, **Open workfile tool on launch**, **Extra work folders** and **Workfile lock profiles**. See [Core addon settings](../addons/essentials/core/settings.md). |
| Core addon setting **Version start** | Version of the first workfile in a work area. |
| Core addon setting **Use task type sorting** | Order of tasks. |
| **Workfile lock profiles** | When enabled for a host, the integration writes a lock file next to an opened workfile. Integrations that support locks show a warning dialog with the buttons **Cancel** and **Ignore lock** when another user or machine has the file open. Currently the Maya integration implements the lock check. |
| Project anatomy | The work templates (directory and file) and roots decide the location and names. |

## Related

- [Launcher](launcher.md): starts applications, optionally with a chosen workfile.
- [Publisher](publisher.md): publishes the workfile as a product, which appears under **Published**.
- [Loader](loader.md) and [Scene Inventory](scene-inventory.md): the other host tools.
- [Naming conventions](naming-conventions.md) and [template builder](template-builder.md).
