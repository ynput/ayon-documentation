---
title: Launcher
description: "The AYON launcher desktop application: tray menu, pipeline modes, and the Launcher window that starts applications and other actions for a project, folder, task or workfile."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/6207691-launcher
  - https://help.ayon.app/en/articles/2308428-launcher-admin-notes
---

# Launcher

The AYON launcher is the desktop application that artists and technical directors start first. It signs in to the AYON server, installs the addons, dependency packages and third-party binaries that the active bundle requires, and shows an icon in the system tray. The tray menu opens the pipeline tools. One of them is the **Launcher** window, which lists the actions available for the selected project, folder, task and workfile. The most common actions start a digital content creation (DCC) application in an AYON context, with the environment defined by the studio settings.

## Where it appears

| Item | Value |
|---|---|
| Installed application | Windows: `ayon.exe` (no console) and `ayon_console.exe` (console with output). Linux and macOS: `ayon`. |
| Tray icon | Starting the application without a command starts the tray. Only one tray runs at a time; `--force` replaces a running one. |
| **Launcher** window | Tray menu entry **Launcher**. A double click on the tray icon opens it too, unless an addon registers another double-click action. |
| Web app | Actions started from the AYON web app run through the `ayon-launcher://` protocol scheme, which the launcher registers on the machine. |

## Pipeline modes

The launcher runs in one of three modes. The mode decides which bundle is used and which tray icon is shown.

| Mode | Started by | Bundle | Tray icon |
|---|---|---|---|
| Production | Default | The production bundle of the AYON server | Green triangle |
| Staging | Argument `--use-staging`, or `AYON_USE_STAGING=1` | The staging bundle | Orange triangle |
| Development | Argument `--use-dev`, `AYON_USE_DEV=1`, or a development bundle given by name | A development bundle | Outlined symbol without the triangle |

Staging is never derived from a bundle name; it must be requested explicitly. Development is also active when the bundle name passed with `--bundle` (or set in `AYON_STUDIO_BUNDLE_NAME`) or `AYON_BUNDLE_NAME` is a development bundle. Without any of these, the mode is production.

### Command-line arguments

| Argument | Effect |
|---|---|
| `--use-staging` | Staging mode. |
| `--use-dev` | Development mode. |
| `--bundle <name>` | Uses the named bundle as the studio bundle instead of the one of the current mode. |
| `--project-bundle <name>` | Uses the named bundle for project-scoped processes. |
| `--ayon-login` | Shows the login dialog even if credentials are stored. |
| `--headless` | Bootstrap does not show any UI. Cannot be combined with `--ayon-login`. |
| `--verbose <level>`, `--debug` | Log level and debug mode. |
| `--skip-headers`, `--skip-bootstrap` | Skip the printed headers, or the bootstrap (update and addon preparation) step. |
| `init-ayon-launcher` | Deploys the shim and registers the `ayon-launcher://` protocol scheme, then exits. The installer runs it. |

The tray command also accepts `--force`, which closes an already running tray and starts a new one. Other commands of the launcher are provided by the core addon and by addons: `publish`, `publish-report-viewer`, `browser`, `run`, `interactive`, `contextselection`, `create-project-structure`, `deliver` and `addon <addon name> <command>`.

### Environment variables

| Variable | Meaning |
|---|---|
| `AYON_VERSION` | Version of the launcher. |
| `AYON_BUNDLE_NAME`, `AYON_STUDIO_BUNDLE_NAME` | Bundle names in use. |
| `AYON_USE_STAGING`, `AYON_USE_DEV` | `1` when the mode is active. |
| `AYON_SERVER_URL`, `AYON_API_KEY` | Server connection. |
| `AYON_SITE_ID` | Site ID of the machine (see below). |
| `AYON_LAUNCHER_STORAGE_DIR` | Directory for addons, dependency packages and shims. Can point to a shared location. |
| `AYON_LAUNCHER_LOCAL_DIR` | Directory for machine and user specific files. |
| `AYON_ADDONS_DIR`, `AYON_DEPENDENCIES_DIR` | Locations of the downloaded addons and dependency packages. |
| `AYON_HEADLESS_MODE`, `AYON_DEBUG` | `1` when headless or debug mode is active. |
| `AYON_MENU_LABEL` | Label of the AYON menu in DCC integrations (`AYON`). |

## Distribution and updates

The AYON server distributes the launcher installers, addons, dependency packages and third-party binaries. What a machine receives is defined by the bundle of its mode. Launcher installer packages are named `AYON-<version>-win-setup.exe`, `AYON-<version>-linux.tar.gz` and `AYON-<version>-Installer.dmg`. Administrators upload them on the **Bundles & Addons** page of the web app (see [bundles and addons](../ayon/web-ui/bundles-and-addons.md)).

On start, the launcher compares its own version with the launcher version of the bundle. When they differ, it starts the matching installed version, and downloads and installs it first if it is missing.

While the tray runs, it also checks the server on an interval (the **Update check interval (minutes)** setting of the core addon, default 5; `0` switches the periodic check off, the check at start remains). Development mode is not checked. When the bundle assigned to the mode differs from the running bundle:

| Element | Behavior |
|---|---|
| **Restart && Update** tray entry | Becomes visible. It restarts the launcher with the new bundle. |
| **AYON update** dialog | Shows the message that AYON needs to update and that the launcher and running applications should be restarted. Buttons **Ignore** and **Restart && Update**. Ignoring shows a tray message and keeps the entry in the menu. |

### Site ID

The first start assigns a random three-word identifier to the machine, for example `military-mouse-of-jest`. Addons that keep per-machine settings (site settings) use it as the site ID.

| Aspect | Value |
|---|---|
| Stored in | The file `site_id` in the launcher local directory: `%LOCALAPPDATA%\Ynput\AYON` on Windows, `~/.local/share/AYON` on Linux, `~/Library/Application Support/AYON` on macOS (unless `AYON_LAUNCHER_LOCAL_DIR` is set). |
| Override | The `AYON_SITE_ID` environment variable takes priority over the file. Editing the file changes the stored value. |

## Tray menu

The tray menu is built from fixed entries and from addons. Entries that addons add are only present when the addon is in the active bundle.

| Entry | Source | What it does |
|---|---|---|
| **Launcher** | Core | Opens the Launcher window. |
| **Publisher** | Tray Publisher addon | Opens the standalone publisher. See [Tray Publisher](../addons/essentials/traypublisher/index.md). |
| Other addon entries | Addons | For example the Kitsu and Workflow addons. |
| **Browser** | Core | Opens the [Browser](browser.md) window (title **AYON Browser**). |
| **Admin** | Core and addons | Submenu with **Console**, **Publish report viewer**, and **Process Monitor** from the Applications addon. Visible when it has at least one entry. |
| **Services** | Addons | Submenu with the services that run in the tray. Visible when a service exists. |
| **Login** | Core | Opens the sign-in dialog. It accepts credentials, or signs in through the web browser with the **Login with AYON server** button. Once signed in, the dialog shows the current user. A changed account restarts the launcher. |
| Version entry | Core | The entry is labeled with the launcher version. It opens the **AYON info** window. |
| **Restart && Update** | Core | Only visible when an update is pending. |
| **Exit** | Core | Closes the tray. |

### Console

The **AYON Console** is a Python scripting window that runs code inside the AYON environment of the tray. It has tabs (the first is named **Python**), an output pane and an input pane.

| Control | What it does |
|---|---|
| **Add tab...** | Adds a tab and asks for its name. The tab menu also has **Rename...**, **Duplicate...** and **Close**. |
| **Execute** | Runs the code of the tab. Shortcut `Ctrl+Enter`. |
| **Clear log** | Context menu entry of the output pane. |

### Publish report viewer

Opens the **Publish report viewer**, which displays exported publish reports. Reports are added by dropping files on the window and removed again from the list. See [Publisher](publisher.md) for the report content.

### AYON info window

The window shows the server URL, the active bundle, the signed in username, the executable and the core addon version. A collapsible **Workstation info** section lists system, local ID, username, hostname and host IP. A collapsible **Environments** section lists the environment variables of the process. The window can copy the information to the clipboard or export it to a directory.

## Launcher window

The window is titled **Launcher** and has two main areas separated by a horizontal splitter: the selection pages on top and the actions pane below. The default size is 1100 by 740 pixels, and the window can be minimized.

### Selection pages

The pages slide horizontally. The first page lists the projects. Selecting a project slides in the second page, which holds the hierarchy.

| Page | Contents |
|---|---|
| Projects | Filter input **Filter projects...**, a refresh button, and the project list. |
| Hierarchy | A header with back button, project combobox and refresh button; a filter row; and three columns: folders, tasks and workfiles. |

The project list shows active projects only. Library projects are marked with a book icon, other projects with a map icon. Projects pinned in the web app (user preference `pinnedProjects`) are listed first, marked with a pin icon and separated from the others.

| Hierarchy control | What it does |
|---|---|
| Back button | Returns to the project list and clears the selection. |
| Project combobox | Switches the project without leaving the page. |
| Refresh button | Refreshes projects, hierarchy, workfiles and actions. |
| **Folder name filter...** input | Filters the folder tree by name. |
| My tasks toggle | Limits the folders and tasks to the ones with a task assigned to the signed in user. Tooltip: "Only show folders that have a task assigned to you." |
| **Folders** tree | Folders of the project with a status column. |
| **Tasks** list | Tasks of the selected folder with a status column. Order follows the task type order of the anatomy when the core setting **Use task type sorting** is on. |
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
| Host group | Files can be grouped by the application (host) that created them. The context menu of a file has **Group by host**. A double click on a host row, or its context menu entry **Ungroup (double-click)**, expands the group again. The groups are remembered in the local launcher settings. |

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
| Server actions | The AYON server, from addons such as Applications | Listed for the selected entity type (project, folder, task or workfile), the active settings variant and the project. The list is cached for 20 seconds. Actions that start applications or the debug terminal are executed by a separate launcher process. |
| Local actions | Action plugins that addons register on the machine | Shown when the plugin is compatible with the selection. |

#### Application actions

The Applications addon provides one action per application version that is allowed for the task type of the selected task. Applications of the same group appear as one action with variants. They need a selected task. The actions open the application in the context of the task and prepare the environment, work directory and last workfile.

| Selection | Behavior |
|---|---|
| Task selected | Starts the application. The last workfile is opened or not according to the core setting **Open last workfile on launch**. |
| Workfile selected | Only the applications of the host that created the workfile are offered. The workfile is opened. |
| Config **Skip last workfile** (off by default) | Remembered per user, application, project and task. When on, the application starts without opening the last workfile. When off, the studio setting decides. |

| Server action | Icon | Description |
|---|---|---|
| Application name | Icon of the application | Starts the application. |
| **Terminal** | Orange terminal symbol | Opens a terminal initialized with the environment of the task. Needs a selected task. |

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

## Permissions and settings

| Item | Effect |
|---|---|
| Server credentials | The projects, folders, tasks and workfiles shown depend on what the signed in user can read. |
| Applications addon settings | Define the applications and tools and which task types can launch them. See [Applications addon](../addons/essentials/applications/index.md). |
| Core addon setting group **Tools** > **Workfiles**: **Open last workfile on launch**, **Open workfile tool on launch** | Profiles by host, task type and task name. See [Core addon settings](../addons/essentials/core/settings.md). |
| Core addon setting **Update check interval (minutes)** | Interval of the tray update check. |
| Core addon setting **Use task type sorting** | Task order in the tasks list. |
| Bundles | Define the addon versions, launcher version and which actions exist. See [bundles and addons](../ayon/web-ui/bundles-and-addons.md). |

## Related

- [Workfiles](workfiles.md), the tool that opens and saves workfiles inside an application, and [template builder](template-builder.md).
- [Browser](browser.md) and [Loader](loader.md), the tools for published products.
- [Process Monitor](process-monitor.md), the tray tool of the Applications addon.
- [Publisher](publisher.md) and [Tray Publisher](../addons/essentials/traypublisher/index.md).
- [Setups](../ayon/setups.md) for the arrangement of server, launcher and sites.
