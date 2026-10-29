---
title: Project configuration
sidebar_label: Project configuration
description: "The Projects Manager of the AYON web app: how it opens, the project list with its actions (new project, pin, rename, folders, archive, delete), and the tabs Anatomy, Project settings, Project permissions, Project access, Site settings, Roots and Teams."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectManagerPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/mappers.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/NewProjectDialog/NewProject.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/NewProjectDialog/AnatomyPresetDropdown.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/ProjectsList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/ProjectsListTableHeader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/ProjectsSimpleTable.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/hooks/useProjectsListMenuItems.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/hooks/useProjectMenuController.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/hooks/useUserProjectPermissions.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/AppMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/shortcuts/ShortcutsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/projects.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/deploy.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/project_folders/project_folders.py
---

# Project configuration

The project configuration, called **Projects Manager** in the web app header (its App menu entry reads **Projects Settings**), configures projects one at a time: their anatomy, addon settings, access groups, user access, per-site settings and roots, and teams. It has a project list on the left and a row of tabs at the top; each tab works on the project selected in the list. What happens on the server when a project is created is described in [Creating a project](../../how-ayon-works/creating-a-project.md).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Projects Manager | App menu, **Projects Settings** | `p+p` | `/manageProjects/<tab>?project=<project>` | Everyone with the App menu; the tabs depend on the access level and access groups (see below) |

The page header reads **Projects Manager**. **Projects Settings** in the App menu and `p+p` open the **Project settings** tab; `a+a` opens the **Anatomy** tab. Both shortcuts keep the current query parameters, so the selected project stays selected. The settings button on a row of a project list elsewhere in the web app also opens the **Project settings** tab for that project.

The selected project is kept in the `project` query parameter. Opening `/manageProjects` without a tab goes to the first tab the user can open for that project, in the order Anatomy, Project settings, Site settings, Project access, Roots, Teams, Project permissions.

## Tabs

| Tab | URL path | Who sees it | Page |
|---|---|---|---|
| **Anatomy** | `/manageProjects/anatomy` | Managers and admins; users with **Read only** or **Read & Write** on **Project anatomy** in at least one project | [Anatomy](anatomy.md) |
| **Project settings** | `/manageProjects/projectSettings` | Managers and admins; users with **Read only** or **Read & Write** on **Project addon settings** in at least one project | [Project settings](project-settings.md) |
| **Project permissions** | `/manageProjects/permissions` | Managers and admins | [Project permissions](project-permissions.md) |
| **Project access** | `/manageProjects/projectAccess` | Managers and admins; users with **Read only** or **Read & Write** on **Project access** in at least one project | [Project access](project-access.md) |
| **Site settings** | `/manageProjects/siteSettings` | Everyone | [Site settings](site-settings.md) |
| **Roots** | `/manageProjects/roots` | Everyone | [Roots](roots.md) |
| **Teams** | `/manageProjects/teams` | Managers and admins | [Teams](teams.md) |

For users with the **User** level, a tab is listed when the user's access groups grant it in at least one project; whether it can be used for the selected project is checked on the tab itself, which shows a message such as **You don't have permission to view this project's anatomy** otherwise. A tab that has been opened through its URL stays listed. Opening a tab limited to managers redirects other users to the first tab they can open. The permission settings are described on the [Permissions](../studio/permissions.md#permission-settings) tab.

A help button at the right end of the tab row (tooltip **Get help for this page**) opens the help article for the current tab.

## Project list

The list on the left is titled **Projects**. It shows one row per project with the project label and the project code as a badge. Archived projects are dimmed. Its width is remembered in the browser. **Project access** has its own project pane and does not show this list.

### Header buttons

| Button | What it does |
|---|---|
| `...` (menu) | Opens the list menu (see below). |
| **Add new project** (`+`) | Opens the **Create a new project** dialog. Shown only to users who can create projects. |
| **Search projects** | Opens a search field above the list. The text is kept in the `project_search` query parameter. While searching, folders are not shown. |

### Rows

| Element | What it does |
|---|---|
| Click | Selects the project. The list has single selection here. |
| Double-click | Opens the project (`/projects/<project>/<default tab>`). |
| Settings button (on hover) | Opens the **Project settings** tab for the project. |
| Pin button (on hover, always shown on pinned rows) | Pins or unpins the project. |

Pinned projects are listed in a separate block at the top of the list. Pins are stored in the user's preferences on the server, so they follow the user to other browsers and are shared with the other project lists of the web app.

### List menu and right-click menu

The `...` menu and the right-click menu on a row offer the same actions for the selection; the right-click menu leaves out **Search**, **Add new project** and **Show archived**.

| Entry | What it does | Available to |
|---|---|---|
| **Search** | Opens the search field. | Everyone |
| **Open** | Opens the project. | Everyone except guests |
| **Manage** | Opens the **Anatomy** tab for the project. | Everyone except guests |
| **Show archived** | Shows or hides archived projects. Stored in the browser. Hiding them drops archived projects from the selection. | Everyone except guests |
| **Pin** / **Unpin** | Pins or unpins the selected projects. | Everyone |
| **Rename project** (`R`) | Edits the project label in place. The project name does not change. | Managers and admins |
| **Add new project** | Opens the **Create a new project** dialog. | Users who can create projects |
| **Create folder** (`F`), **Create subfolder** | Opens the folder dialog. Selected projects are put into the new folder. | Power Pack feature |
| **Move project**, **Move folder** | Submenu with the folders to move the selection into, plus **Unset folder** or **Make root folder** (`Shift+Alt+F`). | Power Pack feature |
| **Rename folder** (`R`), **Edit folder**, **Delete (only folder)** | Change or delete a folder. Deleting a folder does not delete its projects. | Power Pack feature |
| **Archive** / **Activate** | Sets the project inactive or active. One project at a time. | Managers and admins |
| **Delete** | Deletes an archived project after a confirmation (**Delete Project: ...**). For an active project the entry reads **Archive to delete** and is disabled. | Managers and admins |

Project folders group projects in the project lists; they are a Power Pack feature. Without a Power Pack license the folder entries open the Power Pack dialog. Creating, changing, moving and deleting folders is accepted by the server from managers and admins only.

Archiving keeps all data; an archived project is hidden from this list unless **Show archived** is on. Deleting drops the project record and its database schema with all entities, marks the project's files in the server's own file storage for deletion (with local storage, the project folder is renamed with a `.trash` suffix), removes the project from every user's access, and emits `entity.project.deleted`. It cannot be undone. Pipeline files on the studio storage are not touched.

## Create a new project

The dialog **Create a new project** opens from **Add new project**.

| Field | What it does |
|---|---|
| **Project state** | **Production** (default) or **Planning**. A planning project is created without an anatomy editor and without the project's database tables (see [Planning projects](../../how-ayon-works/creating-a-project.md#planning-projects)). Planning projects are not shown in the Projects Manager project list. |
| **Project label** | Required. Typing the label suggests the project name. |
| **Project name** | Required, at least 3 characters, letters, digits and `_`, not starting or ending with `_`. Spaces become `_`. |
| **Project code** | Required, at most 10 characters, same character rules. Suggested from the name with the **Project Code Regex** of the server settings; the tooltip shows the expression. A code typed by hand is kept when the name changes. |
| **Project anatomy preset** | Production projects only. **AYON default** and every anatomy preset; the primary preset is marked `(primary)` and selected first (see [Anatomy presets](../studio/anatomy-presets.md)). |
| **Project anatomy** | Production projects only. The editor with the values of the preset; edits apply to the new project only. |
| **Library project** | Switch in the footer, production projects only. |
| **Create Project** | Creates the project. Also `Ctrl+Enter` or `Shift+Enter`; `Esc` closes the dialog. |

On success the new project is selected in the list. The rules for name and code, and what the server creates, are described in [Creating a project](../../how-ayon-works/creating-a-project.md#name-code-and-label).

## Permissions

| Action | Required |
|---|---|
| Open the Projects Manager | Everyone with the App menu |
| Create a project | Admin or manager, or a user whose **Default projects access** includes a group with **Create projects** |
| Rename, archive, activate or delete a project | Manager or admin |
| Project folders | Power Pack license; manager or admin on the server |
| Each tab | See [Tabs](#tabs) and the page of each tab |

## Related

- [Creating a project](../../how-ayon-works/creating-a-project.md)
- [Permissions](../../how-ayon-works/permissions.md)
- [Navigation bar](../navigation-bar.md)
- [Settings scopes and storage](../../backend/settings/index.md)
- [Data model](../../backend/data-model/index.md)
