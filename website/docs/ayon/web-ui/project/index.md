---
title: Project configuration
sidebar_label: Project configuration
description: "The Projects Manager of the AYON web app: how it opens, the project list with its actions (new project, pin, rename, folders, archive, delete), and the tabs Anatomy, Project settings, Project permissions, Project access, Site settings, Roots and Teams."
verified: 2026-10-25
ui_purpose: "Configures projects one at a time: anatomy, addon settings, permissions, access, site settings, roots and teams."
ui_location: "App menu (nine dots, top right) > Projects Settings"
ui_url: "/manageProjects/<tab>"
ui_shortcut: "p+p"
ui_access: "Everyone with the App menu; the tabs depend on the user's role"
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

<PageInfo />

The project configuration, called **Projects Manager** in the web app header (its App menu entry reads **Projects Settings**), configures projects one at a time: their anatomy, addon settings, access groups, user access, per-site settings and roots, and teams. It has a project list on the left and a row of tabs at the top; each tab works on the project selected in the list. What happens on the server when a project is created is described in [Creating a project](../../how-ayon-works/creating-a-project.md).

## Where it appears

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

The [project list](../project-list.md) on the left, titled **Projects**, selects the project that the tabs work on. Only one project can be selected here. **Project access** has its own project pane and does not show this list. Planning projects are not listed.

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
