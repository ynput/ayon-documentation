---
title: Projects
description: "The Projects tab of the AYON web app's Home space: the table of all projects with thumbnails, activity heartbeat, state and attributes, filters and grouping, project folders, the project details panel, Create new project and the project context menu."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/UserDashboardPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/ProjectsPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/constants.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/hooks/useProjectColumns.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/hooks/useProjectTableRows.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/hooks/useProjectGrouping.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/hooks/useBuildProjectFilterOptions.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/hooks/useGetProjectsData.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/utils/filterProjects.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectsPageTableSettings.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectThumbnailUploader/ProjectThumbnailUploader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectDetailsPanel/ProjectDetailsPanel.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectDetailsPanel/components/ProjectInfoTab.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectDetailsPanel/components/ProjectTeamsTab.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectDetailsPanel/components/ProjectTimeline.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectsPage/components/ProjectDetailsPanel/components/ProjectHeartbeat.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/hooks/useProjectMenuController.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectsList/hooks/useProjectsListMenuItems.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/hooks/useUserProjectPermissions.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/api/queries/project/getProject.ts
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/list_projects.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/projects.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/project_folders/project_folders.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/project_dashboard/dashboard.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/thumbnails/thumbnails.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/access/permissions.py
---

# Projects

The **Projects** tab of Home lists the projects of the server in one table, with their thumbnail, recent activity, state and project attributes. It is where producers and managers get an overview of all productions, create new projects, archive or delete old ones and organize projects into folders. Selecting a project opens a details panel with its dates, attributes and teams; opening a project leads to its project pages.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Projects | **Home**, then the **Projects** tab | none | `/dashboard/projects` | Everyone except guests |

Which projects are listed depends on the user:

| User | Projects listed |
|---|---|
| Admin, manager | All projects |
| User with the **Create projects** studio permission | All projects |
| Other users | Projects where they have an access group |

When the server has no projects, the tab shows **No Projects** (see [Home](index.md#a-server-without-projects)).

## Layout and controls

| Region | Content |
|---|---|
| Toolbar | **Create new project**, **Create folder**, the search and filter bar, **Group by**, **Customize** and the views button. |
| Table | One row per project, or project rows inside groups. Archived projects are dimmed. |
| Details panel | Right side, for the selected project. |
| Settings panel | Right edge, opened with **Customize**. |

### Toolbar

| Control | What it does |
|---|---|
| **Create new project** | Opens the **Create a new project** dialog. Shown only to users who can create projects (see [Permissions](#permissions)). After creation the new project appears in the table; the page does not change. The dialog is described in [Creating a project](../../how-ayon-works/creating-a-project.md). |
| **Create folder** | Opens the dialog for a new project folder. Project folders are a [Power feature](../../../production-tracking/power-features.md); without a Power license the button is marked with a lightning symbol and shows what the feature provides. |
| Search and filter bar | Typed text matches the project name, label, code and description. Filters: **Archived** (Archived or Active), **Library** (Library or Not library), **State** (Production or Planning), and every project attribute that is a boolean, a date or has a list of values. Date filters offer preset ranges and a custom range. With a Power license, attribute filters can also match "has a value", "has no value" and exclusions. |
| **Group by** | Groups the rows. Options: **Folder**, **Archived**, **Library**, **State**, and every project attribute that is a boolean or has a list of values. Several levels can be combined, in ascending or descending order. Grouping by **Folder** shows the folder tree, including empty folders. |
| **Customize** | Opens the settings panel with **Columns** (visibility and order), **Sort** and **Group by**. |
| Views button | The working view and saved views of the page. Filters, sorting, grouping and columns are stored in the view. See [Views](../views.md). |

The table loads up to 20,000 projects. Beyond that a warning shows "Showing &lt;count&gt; projects. Some projects are not listed."

### Columns

Columns can be sorted from their header, resized and reordered.

| Column | Shown by default | Content |
|---|---|---|
| **Thumbnail** | Yes | The project thumbnail. An image dropped on it, or **Upload thumbnail** in its context menu, uploads a new one. |
| **Label / Name** | Yes | The project label, or the name when there is no label. |
| **Name** | No | The project name. |
| **Heartbeat** | Yes | A line of the project's activity: the number of entity events per day over the last 30 days, scaled. Sorting by it orders projects by their activity, with recent days weighted more. |
| **Code** | Yes | The project code. |
| **Active** | Yes | Off for archived projects. |
| **Library** | Yes | On for library projects. |
| **State** | Yes | **Production**, or **Planning** for a planning project without a hierarchy. See [Planning projects](../../how-ayon-works/creating-a-project.md#planning-projects). |
| **Created at**, **Updated at** | **Created at** only | Dates of the project record. |
| Project attributes | **End date** only | One column per attribute with the project scope, such as **Start date**, **End date** or **Description**. |

The cells of the table are read-only. Values are edited in the details panel.

### Selection and shortcuts

| Gesture | Effect |
|---|---|
| Click on a row | Selects the project and shows its details panel. `Ctrl` and `Shift` add rows to the selection. |
| Double click on a row | Opens the project's pages, on the project tab used last. |
| `Esc` | Clears the selection and closes the details panel. |
| Right click on a row | Opens the context menu. |

## Context menu

The menu acts on the selected rows. Entries that do not apply to the selection are hidden.

| Entry | Applies to | What it does |
|---|---|---|
| **Open** | One project | Opens the project's pages. |
| **Manage** | One project | Opens the project's **Anatomy** page in Projects Settings. |
| **Edit folder** | A folder row | Edits the folder's label, icon and color. |
| **Create folder** / **Create subfolder** | Projects or a folder | Creates a project folder, for the selected projects or inside the selected folder. Power feature. |
| **Move project** / **Move folder** | Projects or folders | Submenu with the folder tree. **Unset folder** takes projects out of their folder; **Make root folder** moves a folder to the top level. Power feature. |
| **Archive** / **Activate** | One project | Sets the project inactive, or active again. Admins and managers only. |
| **Archive to delete** / **Delete** | One project | Deletion works on archived projects only: an active project shows the disabled **Archive to delete**. **Delete** asks for confirmation and removes the project with all its data. Admins and managers only. |
| **Delete (only folder)** | Folders | Deletes the folder. Its projects are not deleted. |

## Details panel

The panel shows the first selected project.

| Part | Content |
|---|---|
| Timeline | **Set start date** and **Set end date** buttons with a bar between them. With both dates set, the bar shows the days passed and **&lt;days&gt; Left**, and a **Day &lt;n&gt;** marker for today. A start date after the end date is refused. |
| Header | Thumbnail, display name and heartbeat. An image dropped on the header uploads a new thumbnail. The close button closes the panel. |
| **Details** tab | Description, then the editable fields **Label**, **Code**, every project attribute, **Active** and **Library**, then the read-only **Name**, **Created at** and **Updated at**. Changes are saved as soon as they are made. |
| **Teams** tab | The project's teams with their leaders (or **No leaders**) and member avatars, and **Manage teams**. A team card opens that team on the project's [Teams](../project/teams.md) page; with no teams the tab shows **No teams created yet**. |

## Permissions

| Action | Who can do it |
|---|---|
| See the tab | Everyone except guests |
| **Create new project** | Admins, managers, and users whose **Default projects access** includes an access group with the **Create projects** studio permission. See [Permissions](../studio/permissions.md#studio-permissions). |
| Edit project fields in the details panel, archive, activate, delete | Admins and managers. The server refuses project changes from other users. |
| Create, edit, move and delete project folders | Admins and managers, with a Power license |
| Upload a thumbnail | Users with write access to the project's anatomy |

## Related

- [Home](index.md)
- [Tasks](tasks.md)
- [Creating a project](../../how-ayon-works/creating-a-project.md)
- [Teams](../project/teams.md)
- [Views](../views.md)
- [Power features](../../../production-tracking/power-features.md)
