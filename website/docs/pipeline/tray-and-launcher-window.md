---
title: Tray and Launcher window
description: "The tray menu of the AYON launcher with its Console, Publish report viewer and AYON info window, and the Launcher window that lists the actions for a project, folder, task or workfile: selection pages, workfiles list, actions pane, application actions, local actions and the responses of server actions."
verified: 2026-11-23
ui_purpose: "The tray menu opens the AYON desktop tools. The Launcher window starts applications and other actions for the selected project, folder, task or workfile."
ui_location: "AYON icon in the system tray; tray menu entry Launcher, or a double click on the tray icon"
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/tray/ui/tray.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/tray/ui/info_widget.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/tray/ui/dialogs.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/console_interpreter/ui/window.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/launcher/ui/window.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/launcher/ui/hierarchy_page.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/launcher/ui/workfiles_page.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/launcher/ui/actions_widget.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/launcher/models/actions.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/actions/open_file_explorer.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/actions/show_in_ayon.py
  - https://github.com/ynput/ayon-applications/blob/develop/server/actions.py
  - https://github.com/ynput/ayon-launcher/blob/develop/common/ayon_common/connection/ui/login_window.py
---

# Tray and Launcher window

<PageInfo />

Once the [AYON launcher](launcher.md) has started, it shows an AYON icon in the system tray. The tray menu opens the desktop tools of the pipeline. One of them is the **Launcher** window, which lists the actions available for the selected project, folder, task and workfile; the most common ones start an application in that context. This page is the reference of both. What the launcher does on start, its modes and how it updates are described in [AYON launcher](launcher.md).

## Tray icon

Only one tray runs at a time; the `tray --force` command replaces a running one (see [Launcher command line](launcher-command-line.md#commands)). The icon shows the mode of the launcher (see [modes](launcher.md#production-staging-and-development-modes)).

| Interaction | What it does |
|---|---|
| Click | Opens the tray menu. |
| Double click | Opens the **Launcher** window, unless an addon registers another double-click action. |

The tray watches its connection to the AYON server. When the connection is lost, the icon blinks and its tooltip reads "AYON - Connection to server lost". After a minute without connection the icon turns into a red dot and a tray message says that the connection was lost; another message says when it is restored. When the server rejects the credentials, the tray shows the login dialog again, and closes when no new sign-in is made.

<!-- screenshot: the AYON tray icon and the open tray menu with Launcher, Publisher, Browser, Admin, Services, Login, the version entry and Exit -->

## Tray menu

The tray menu is built from fixed entries and from addons. Entries that addons add are only present when the addon is in the active bundle.

| Entry | Source | What it does |
|---|---|---|
| **Launcher** | Core | Opens the [Launcher window](#launcher-window). |
| **Publisher** | Tray Publisher addon | Opens the standalone publisher. See [Tray Publisher](../addons/essentials/traypublisher/index.md). |
| Other addon entries | Addons | For example the Kitsu and Workflow addons. |
| **Browser** | Core | Opens the [Loader](loader.md) without an application (title **AYON Browser**), with the actions for delivery, hero versions and cleaning up versions. |
| **Admin** | Core and addons | Submenu with [Console](#console), [Publish report viewer](#publish-report-viewer), and [Process Monitor](process-monitor.md) from the Applications addon. Visible when it has at least one entry. |
| **Services** | Addons | Submenu with the services that run in the tray. Visible when a service exists. |
| **Login** | Core | Opens the **Login to server** dialog. It accepts credentials, or signs in through the web browser with the **Login with AYON server** button. Once signed in, the dialog shows the current user. A changed account restarts the launcher. |
| Version entry | Core | Labeled with the launcher version. It opens the [AYON info window](#ayon-info-window). |
| **Restart & Update** | Core | Only visible when an update is pending. It restarts the launcher with the new bundle, in the same mode. See [updates](launcher.md#updates-while-the-tray-runs). |
| **Exit** | Core | Closes the tray. |

When an update is pending, the tray also shows the **AYON update** dialog, which says that AYON needs to update and that the launcher and running applications should be restarted. It has the buttons **Ignore** and **Restart & Update**. Ignoring shows a tray message and keeps the **Restart & Update** entry in the menu.

### Console

The **AYON Console** is a Python scripting window that runs code inside the AYON environment of the tray, for example to try out calls of the [AYON Python API](https://community.ynput.io/t/ayon-python-api-first-steps/1278) or of an addon. It has tabs (the first is named **Python**), an output pane and an input pane.

| Control | What it does |
|---|---|
| **Add tab...** | Adds a tab and asks for its name. The tab menu also has **Rename...**, **Duplicate...** and **Close**. |
| **Execute** | Runs the code of the tab. Shortcut `Ctrl+Enter`. |
| **Clear log** | Context menu entry of the output pane. |

### Publish report viewer

Opens the **Publish report viewer**, which displays exported publish reports the way the publisher showed them when the report was exported. Reports are added by dropping files on the window and removed again from the list. The same window opens with the `publish-report-viewer` command (see [Launcher command line](launcher-command-line.md#commands)). See [Publisher](publisher.md) for the report content.

### AYON info window

The window shows the server URL, the active bundle, the signed in username, the executable and the core addon version. A collapsible **Workstation info** section lists system, local ID (the [site ID](../ayon/how-ayon-works/site-ids.md)), username, hostname and host IP. A collapsible **Environments** section lists the environment variables of the process. The window can copy the information to the clipboard or export it to a directory, which is useful in support requests.

## Launcher window

The window is titled **Launcher** and has two main areas separated by a horizontal splitter: the selection pages on top and the actions pane below. The default size is 1100 by 740 pixels, and the window can be minimized.

![The Launcher window on the hierarchy page of the project AY_CG_demo: the folder robot and its task Modeling selected, with folder and task thumbnails and statuses, two Maya workfiles with their author, modification time and size, and the actions pane below with Blender, Maya and Houdini, Terminal, Tray Publisher, Explore here, Show in AYON and actions of other addons](assets/tray-and-launcher-window/launcher-window.webp "Launcher window")

### Selection pages

The pages slide horizontally. The first page lists the projects. Selecting a project slides in the second page, which holds the hierarchy.

| Page | Contents |
|---|---|
| Projects | Filter input **Filter projects...**, a refresh button, and the project list. |
| Hierarchy | A header with back button, project combobox and refresh button; a filter row; and three columns: folders, tasks and workfiles. |

The project list shows active projects only. Library projects are marked with a book icon, other projects with a map icon. Projects pinned in the web app are listed first, marked with a pin icon and separated from the others.

| Hierarchy control | What it does |
|---|---|
| Back button | Returns to the project list and clears the selection. |
| Project combobox | Switches the project without leaving the page. |
| Refresh button | Refreshes projects, hierarchy, workfiles and actions. |
| **Folder name filter...** input | Filters the folder tree by name. |
| My tasks toggle | Limits the folders and tasks to the ones with a task assigned to the signed in user. Tooltip: "Only show folders that have a task assigned to you." |
| Folders tree | Folders of the project with a status column. |
| Tasks list | Tasks of the selected folder with a status column. Order follows the task type order of the anatomy when the core setting **Use task type sorting** is on (default). |
| Workfiles list | Workfiles of the selected task. |

Selecting a folder, task or workfile updates the actions pane. Focusing the folder tree or the task list clears the workfile selection.

### Workfiles list

The list shows the workfile entities that the server holds for the selected task, even when the file is not on the local disk.

| Column | Content |
|---|---|
| **Workfiles** | File name, with the icon of the application that saved the file. |
| **Modified** | Modification time of the file, or the update time of the entity when the file is missing. The avatar of the user who updated the workfile is shown next to it; the tooltip holds the full name. |
| **Size** | File size. Empty when the file is missing. |

| Row state | Meaning |
|---|---|
| Disabled row | The file does not exist at the path resolved from the project roots. It cannot be selected. |
| `< No workfiles >`, `< Select a project >`, `< Select a folder >`, `< Select a task >` | Placeholder rows for the current selection. |
| Host group | The context menu of a file has **Group by host** (or **Ungroup by host** when its host is grouped), which nests the files of that application (host) under one row. Grouped hosts are listed on top. The context menu of a host row has **Ungroup**. The groups are remembered in the local launcher settings. |

### Actions pane

The pane shows the actions that are available for the current selection as a grid of icons. It refreshes when the selection changes and every 10 seconds while the window is active. A running action shows an animated ring around its icon for a few seconds, and the window shows messages (**Running: ...**, **Finished: ...**, **Failed to run: ...**).

| Interaction | What it does |
|---|---|
| Click on an action | Runs it with the selected context. |
| Click on an action with variants | Marked with a dots symbol. Opens a popup with the variants (for example several versions of one application). |
| Right click on an action | Opens the **Action Config** dialog for actions that have options. A gear icon appears at the top left of such actions while the pointer is over them (tooltip **Right click for options**). The dialog saves the values with **Save**. |

There are two kinds of actions.

| Kind | Source | Notes |
|---|---|---|
| Server actions | The AYON server, from addons such as Applications | The same web actions that the web app shows, listed for the selected entity type (project, folder, task or workfile), the active settings variant and the project. The list is cached for 20 seconds. Actions that start applications or the terminal are executed by a separate launcher process. |
| Local actions | Action plugins that addons register on the machine | Shown when the plugin is compatible with the selection. |

#### Application actions

The Applications addon provides one action per application variant that is allowed for the task type of the selected task. Variants of the same application group appear as one action with variants. They need a selected task. The actions open the application in the context of the task and prepare the environment, work directory and last workfile, as described in [Launching in context](launcher.md#launching-in-context).

| Selection | Behavior |
|---|---|
| Task selected | Starts the application. The last workfile is opened or not according to the core setting **Open last workfile on launch**. |
| Workfile selected | Only the applications of the host that created the workfile are offered. The workfile is opened. |
| Config **Skip last workfile** (off by default) | Remembered per user, application, project and task. When on, the application starts without opening the last workfile. When off, the studio setting decides. |

| Server action | Icon | Description |
|---|---|---|
| Application name | Icon of the application | Starts the application. |
| **Terminal** | Orange terminal symbol | Opens a terminal initialized with the environment of the task, useful for TDs to check what an application gets. Needs a selected task. |

#### Core local actions

| Action | Shown when | What it does |
|---|---|---|
| **Explore here** | A folder is selected | Opens the work directory of the selected folder or task in the file explorer. Holding `Ctrl` copies the path to the clipboard instead. A task directory that does not exist falls back to the folder directory. |
| **Show in AYON** | Always | Opens the AYON web app at the project overview, focused on the selected folder or task. Without a selected project, it opens the server address. |

Other addons add local actions, for example the integrations for Kitsu, ftrack and Clockify.

#### Responses of server actions

A server action can answer with one of the following. The launcher handles them as listed.

| Response | Launcher behavior |
|---|---|
| Message | Shown as a message in the window. |
| Redirect | Opens the address in the web browser. |
| Form | Opens a dialog with the fields defined by the action and sends the entered values back. |
| Launcher | Starts a detached AYON launcher process with the given arguments (how applications start). |
| Clipboard text | Copied to the clipboard. |
| Download address | Opened in the web browser. |
| Server, query, navigate | Cannot run in the launcher. The message asks to use the web app. |

How addons define web actions and their responses is described in [server code of an addon](../developer/addon-development/server.md#web-actions).

## Tool settings

Tool settings are set in the studio settings and can be overridden per project. The tray and the Launcher window have no personal settings for artists. The only settings a user keeps for one machine are the [site settings](../ayon/how-ayon-works/site-ids.md), edited in the web app per site, for example local root paths or Site Sync sites. Besides those, the windows only remember their layout, such as the grouped hosts of the workfiles list.

What the Launcher window lists depends on the signed-in user's access and on the active bundle, which sets the addons and therefore the actions (see [Bundles](../ayon/how-ayon-works/bundles.md)). The applications, tools and the task types that can launch them are set in the [Applications addon](../addons/essentials/applications/index.md). The [Core addon settings](../addons/essentials/core/settings.md) hold the launch behavior (**Open last workfile on launch** and **Open workfile tool on launch** under [Workfiles](../addons/essentials/core/settings.md#workfiles)), the task order (**Use task type sorting**) and the tray's **Update check interval (minutes)** under [General](../addons/essentials/core/settings.md#general).

## Related

- [AYON launcher](launcher.md): start-up, updates, modes and launching in context.
- [Launcher command line](launcher-command-line.md): the command line, commands and addon commands.
- [Workfiles](workfiles.md), the tool that opens and saves workfiles inside an application, and the [Templated workfile builder](template-builder.md).
- [Browser](loader.md) and [Loader](loader.md), the tools for published products.
- [Process Monitor](process-monitor.md), the tray tool of the Applications addon.
- [Publisher](publisher.md) and [Tray Publisher](../addons/essentials/traypublisher/index.md).
