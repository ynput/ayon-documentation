---
title: Workfiles
description: "The Workfiles tab of an AYON project: the folder hierarchy, task list, workfile list and detail panel, with the workfile author, site-resolved path, attributes and deletion."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/WorkfilesPage/WorkfilesPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/WorkfilesPage/WorkfileList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/WorkfilesPage/WorkfileDetail.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/WorkfilesPage/WorkfileUsers.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectPage/ProjectPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/hierarchy.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/taskList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SiteDropdown.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/attributeTable.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/services/getWorkfiles.js
  - https://github.com/ynput/ayon-frontend/blob/develop/src/services/workfiles/deleteWorkfile.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/features/context.js
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/EntityLinksSlot/EntityLinksSlot.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/workfiles/workfiles.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/entities/workfile.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/entities/models/workfile.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/resolvers/workfiles.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/nodes/workfile.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/roots.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/helpers/roots.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/system/info.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/access/utils.py
---

# Workfiles

The **Workfiles** tab lists the workfile records of a project's tasks. Folders are picked in a hierarchy, tasks in the task list next to it, and the workfiles of the selected tasks appear in a third column, with the selected workfile's thumbnail, path and attributes in a detail panel on the right. The records are written by the pipeline when artists save scene files with the [Workfiles tool](../../../pipeline/workfiles.md); the tab only shows them and can delete them. What a workfile is and how it relates to tasks is described in the [data model](../../backend/data-model/index.md#workfile).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Workfiles | Project tab row, **Workfiles** | none (`1` opens the project menu) | `/projects/<project>/workfiles` | Users with access to the project; managers and admins for every project. Guests see a locked page |

The tab is part of every project, after **Reports** in the tab row and before the tabs added by addons. See [Project production tracking](index.md).

## Layout and controls

The page has four columns side by side, from left to right.

| Column | Contents |
|---|---|
| Hierarchy | The folder tree of the project, with a filter field and a folder type filter on top |
| Task list | The tasks of the selected folders |
| Workfile list | The workfiles of the selected tasks |
| Detail panel | Thumbnail, path and attributes of the selected workfile |

Each column depends on the one to its left: selecting folders loads their tasks, selecting tasks loads their workfiles, and selecting a workfile fills the detail panel.

### Hierarchy

| Control | What it does |
|---|---|
| **Filter folders...** | Filters the tree by folder name, ignoring case. A matching folder is shown with its parents and all of its children. Disabled while the tree loads |
| **Select folder types** | Multi-select of the project's folder types. With types chosen, only folders of those types and their parents remain. The selected types are shown by their capital letters, for example `S` for `Shot` |
| **Hierarchy** column | Folder label (the name when there is no label) with the folder type icon. Hovering shows the folder name |
| Selection | Several folders can be selected. Their tasks appear in the task list |
| Expand arrow | Expands or collapses a folder. `Ctrl`/`Cmd` + click on the arrow of a selected folder expands or collapses all selected folders |

Context menu of a folder:

| Entry | Shortcut | What it does |
|---|---|---|
| **Open in viewer** | `Spacebar` | Opens the folder in the viewer. `Spacebar` opens it in quick view |
| **Add to list (deprecated)** | | Always disabled |
| **Detail** | | Opens a dialog with the raw data of the selected folder |
| **View all versions as latest** | | Resets the version selection kept for the legacy Browser page |

### Task list

| Column | Contents |
|---|---|
| **Task** | Task label with the icon of its task type. Inactive tasks are dimmed and show a crossed-out eye icon. Tasks with the same name in several selected folders are grouped under one expandable row |
| **Folder** | Folder label of the task. Shown only when more than one folder is selected |
| **Task type** | Task type name |

Tasks are sorted by label. Several tasks can be selected; a click on the empty area below the rows clears the selection. When the folder selection changes, tasks with the same names as the previously selected ones are selected again, so moving from shot to shot keeps, for example, the `compositing` task selected. With no task in the selected folders the list shows **No tasks found**.

Each selected task gets a highlight color on its icon (up to ten tasks). The workfiles of that task carry the same color on their icon in the workfile list.

Context menu of a task:

| Entry | Shortcut | What it does |
|---|---|---|
| **Open in viewer** | `Spacebar` | Opens the task in the viewer. `Spacebar` opens it in quick view |
| **Upload version** | | Opens the version upload dialog for the task and its folder. Enabled for a single task. See [Versions without a pipeline](../../../production-tracking/versions-without-a-pipeline.md) |
| **Filter products by task** / **Filter products by tasks** | | Sets the task type filter of the product list on the deprecated [Browser page](browser.md) to the task types of the selected tasks |
| **Add to list (deprecated)** | | Always disabled |
| **Detail** | | Opens a dialog with the raw data of the selected task |

### Workfile list

The list shows the workfiles of all selected tasks in one table, in the order they were created. One workfile can be selected at a time. With no task selected, or no workfile in the selected tasks, it shows **No workfiles found**.

| Column | Contents |
|---|---|
| **Name** | File name of the workfile, taken from the end of its path, with an icon in the highlight color of its task. Hovering shows the full stored path |
| **Author** | Avatar of the user who created the workfile. When another user updated it last, a second avatar shows that user; otherwise the creator's full name (or user name) follows the avatar. Hovering an avatar shows **Created by** or **Updated by** with the user and the date and time (`dd/MM/yyyy, HH:mm`). The cell stays empty when the creator is not a user of the project |

The columns cannot be sorted and the list has no search field. The list holds at most the first 1000 workfiles of the selected tasks. Workfiles of inactive tasks and inactive workfiles are listed too.

Context menu of a workfile (a right click also selects it):

| Entry | What it does |
|---|---|
| **Workfile detail** | Opens the **workfile detail** dialog with the raw data of the workfile as JSON |
| **Delete File** | Asks for confirmation (**Delete &lt;name&gt;**, "Are you sure? This cannot be undone", buttons **Delete** and **Cancel**), then deletes the workfile record and clears the selection |

**Delete File** removes the workfile entity and its links from the server. The scene file on disk is not touched.

The tab has no action that opens a workfile or starts an application. Workfiles are opened from the [Workfiles tool](../../../pipeline/workfiles.md) inside an application or from the [Launcher](../../../pipeline/launcher.md).

### Detail panel

| Element | Contents |
|---|---|
| Thumbnail | The thumbnail of the workfile, or a placeholder image icon when it has none |
| **Path for site** | Dropdown of sites (placeholder **Select a site**). It lists the sites registered to the signed-in user, by site ID. The choice is remembered in the browser and can be cleared |
| **Path** | The workfile path with its `{root[...]}` placeholders replaced by root paths. A click copies the path |
| Attributes | One row per workfile attribute that has a value, labelled with the attribute title. Hovering the title shows the attribute description. Date values are shown as `dd/MM/yyyy` |

The roots used for **Path** come from the project anatomy for the platform of the selected site, overridden by the user's [root overrides](../project/roots.md) for that site. Without a site, the anatomy roots for the platform of the browser are used. A root that cannot be resolved stays as a placeholder.

The attributes that a workfile can carry are those with the workfile scope on the [Attributes](../studio/attributes.md) page. The default ones are **File extension** and **Description**.

## Keyboard shortcuts

| Shortcut | Where | Action |
|---|---|---|
| `ArrowUp` / `ArrowDown` | Hierarchy, task list, workfile list | Move the selection to the previous or next row |
| `Shift` + `ArrowUp` / `ArrowDown` | Hierarchy, task list | Extend the selection |
| `Spacebar` | Hierarchy, task list | Open the first selected folder or task in the viewer (quick view) |
| `g` / `l` | Anywhere on the page, with a workfile selected | Open the links of the selected workfile as a graph (`g`) or in columns (`l`). Requires the [Power Pack](../../../addons/production-tracking/power-pack/index.md); without it the keys show what the Power Pack offers |

Other shortcuts of the web app are listed in [Keyboard shortcuts](../quick-navigation.md#keyboard-shortcuts).

## Data

| Shown | Source |
|---|---|
| Folder tree | The folder hierarchy of the project |
| Tasks | The tasks of the selected folders, from the GraphQL `tasks` query |
| Workfile list | The GraphQL `workfiles` query of the project, filtered by the selected task IDs: ID, task ID, name, path, created and updated dates and users |
| Detail panel | The workfile entity from `GET /api/projects/<project>/workfiles/<id>`, its thumbnail, and the project roots from `GET /api/projects/<project>/siteRoots` |
| **Workfile detail** dialog | The same workfile entity, unformatted |
| **Delete File** | `DELETE /api/projects/<project>/workfiles/<id>` |

A workfile entity holds its path, parent task, thumbnail, status, tags, attributes, a free `data` field, the active flag, and the users and dates of creation and last update. Its name is not stored; it is the file name at the end of the path. The path is stored as written by the pipeline, usually with root placeholders such as `{root[work]}`. Workfiles in AYON's internal folder are not listed.

The selected folders, tasks and workfile and the expanded folders are kept in the browser and restored when the page is opened again. Selecting a project from the project menu clears them.

## Permissions

| Action | Who can do it |
|---|---|
| Open the tab | Users with access to the project, managers and admins. Guests see a locked page and the server returns no workfiles to them |
| See folders, tasks and workfiles | Managers and admins see everything. For other users, the **Restrict folder read** setting of their access groups limits the folders, and with them the tasks and workfiles, that are returned |
| See attributes in the detail panel | Limited by **Restrict attribute read** |
| **Delete File** | Managers and admins, and users whose **Restrict folder delete** setting allows the folder of the workfile's task. The entry is shown to everyone; the server rejects the deletion for others |
| Create or change workfiles | Not possible on this tab. The pipeline creates workfiles through the API, which requires **Restrict publishing** to allow the task's folder (managers are not limited) |

See [Permissions](../../how-ayon-works/permissions.md#permission-keys) for the access group settings and [Project access](../project/project-access.md) for assigning them.

## Related

- [Upload version](../dialogs/upload-version.md)
- [Workfiles tool](../../../pipeline/workfiles.md)
- [Launcher](../../../pipeline/launcher.md)
- [Data model](../../backend/data-model/index.md#workfile)
- [Roots](../project/roots.md)
- [Attributes](../studio/attributes.md)
- [Links manager](../links-manager.md)
- [Project production tracking](index.md)
- [Overview](overview.md)
- [Task progress](task-progress.md)
- [Products](products.md)
- [Lists](lists.md)
