---
title: Project permissions
description: "The Project permissions tab of the AYON Projects Manager: overriding the definition of a studio access group for one project, how the override is stored and used, and clearing it."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/help/articles/2635883-user-permissions-and-project-access-groups
  - https://help.ayon.app/en/help/articles/6698141-user-management
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectPermissions.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectManagerPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AccessGroups/index.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AccessGroups/AccessGroupList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AccessGroups/AccessGroupDetail.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/access/access_groups.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/access/access_groups.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/access/permissions.py
---

# Project permissions

The **Project permissions** tab of the Projects Manager overrides the settings of the studio [access groups](../studio/permissions.md) for the selected project. A project override replaces the whole definition of the group in that project; it is not merged with the studio definition. Groups without an override keep following the studio definition. How overrides fit into permission checks is explained in [Permissions](../../how-ayon-works/permissions.md#studio-definition-and-project-overrides).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Project permissions | Projects Manager, **Project permissions** | none | `/manageProjects/permissions?project=<project>` | Managers and admins |

The tab is limited to managers and admins in the web app. Other users who open its URL are redirected to the first tab they can open.

## Layout and controls

The page has the project list on the left (see [Projects Manager](index.md#project-list)), the list of access groups in the middle and the settings of the selected group on the right. **No access group selected** is shown until a group is selected.

### Access group list

The list has one column, **Access group**, with every group defined at the studio level. A group that has an override in the selected project is highlighted. There are no buttons to create or delete groups on this tab; groups are created on the studio [Permissions](../studio/permissions.md) tab.

Right-click menu:

| Entry | What it does |
|---|---|
| **Clear Overrides** | Asks for confirmation (**Clear project overrides**, button **Clear**) and deletes the group's override in the selected project. Disabled when the group has no override in the project. |
| **Delete** | Asks for confirmation and deletes the access group itself at the studio level, for every project. The group is removed from all users' assignments and default access lists. |

### Group settings

| Control | What it does |
|---|---|
| **Clear project overrides** | Same as **Clear Overrides**: deletes the group's override in the selected project after a confirmation. Disabled when the group has no override in the project. |
| **Save Changes** | Saves the edited settings as the group's override in the selected project. Active when something changed. Shows **Project access group settings saved**. |
| Settings editor | The settings of the group. For a group without an override it shows the studio definition; for a group with an override it shows the override. The header shows the project name. |

The settings are the same as on the studio level and are described on the [Permissions](../studio/permissions.md#permission-settings) tab, except that **Studio permissions** (**Create projects**, **List all users**) are not shown: they are studio-scoped and are read from the groups in the user's **Default projects access**. Right-clicking a field offers **Copy** and **Paste** of its value as JSON; a pasted value must have the same structure as the field.

## How overrides are stored

| Topic | Behavior |
|---|---|
| Storage | The complete group definition is stored in the project's own `access_groups` table under the group name. The studio definition stays in the server-wide table. |
| Saving | Saving writes the whole definition shown in the editor, so the first save of a group in a project copies the studio definition with the edits. From then on, later changes to the studio definition do not reach that group in this project. |
| Use | When a user's permissions in the project are combined, each assigned group is read from the project override when one exists, and from the studio definition otherwise. |
| Clearing | Deleting the override returns the group in this project to the studio definition at once. |
| Events | Saving emits `access_group.updated`, clearing emits `access_group.deleted`, both with the project name. |
| Deleting the project | The overrides are deleted with the project. |

## Permissions

| Action | Required in the web app | Required by the server |
|---|---|---|
| Open the tab | Manager or admin | Not applicable |
| Save or clear a project override | Manager or admin | Manager or admin, or **Read & Write** on **Project access** in the project |
| Delete an access group | Manager or admin | Manager or admin |

Users with **Read & Write** on **Project access** can save project overrides through the API (`/api/accessGroups/<group>/<project>`), but the tab is not shown to them.

## Related

- [Permissions](../studio/permissions.md)
- [Project access](project-access.md)
- [Permissions (how AYON works)](../../how-ayon-works/permissions.md)
- [Project configuration](index.md)
