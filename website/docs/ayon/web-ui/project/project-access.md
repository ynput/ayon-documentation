---
title: Project access
description: "The Project access tab of the AYON Projects Manager: assigning access groups to users per project, the projects, users and access groups panes, and who can edit the assignments."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/help/articles/2635883-user-permissions-and-project-access-groups
  - https://help.ayon.app/en/help/articles/6698141-user-management
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/ProjectUserAccess.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/ProjectUserAccessProjectList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/ProjectUserAccessUserList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/ProjectUserAccessAssignDialog.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/ProjectUserAccessSearchFilterWrapper.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/hooks.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/Users/mappers.ts
  - https://github.com/ynput/ayon-backend/blob/develop/api/access/project_access.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/access/access_groups.py
---

# Project access

Users with the **User** level see a project only after an access group is assigned to them in that project. **Default projects access** is a template that is applied when a project is created; it does not change existing projects. Managers and admins have access to all projects and are not listed on this tab.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Project access | Projects Manager, **Project access** | none | `/manageProjects/projectAccess?project=<project>` | Managers and admins; users with **Read only** or **Read & Write** on **Project access** in at least one project |

| Keys | Action |
|---|---|
| `a` | Assign access groups to the selected users |
| `r` | Remove the selected access group from the selected users |
| `Ctrl+Enter` | Save, in the assign dialog |
| `Ctrl+A` | Select or clear all access groups, in the assign dialog |

The global `a+a` shortcut is turned off on this tab.

## Layout and controls

The **Project access** tab has three panes: **Projects**, **All users** and **Access groups**. It does not use the project list of the other Projects Manager tabs: the **Projects** pane has its own multiple selection and starts with the project of the `project` query parameter. Selecting one or several projects shows the users and the access groups assigned in them.

| Control | What it does |
|---|---|
| Filter bar | Free text search on username and full name, and filters by **Project**, **User** and **Access Group**. The filters are kept for the browser tab. |
| **Add access** (`a`) | Assigns access groups to the selected users in the selected projects. With one group visible it applies directly; otherwise the **Add access for** dialog lists the groups with **Select all** and **Save**. |
| **Remove access** (`r`) | Removes the selected users from the selected access group. |
| Row buttons and context menu | **Add access**, **Remove access**, **Remove all access** and **Filter by user**. **Remove access** is not offered in the **All users** pane. |
| Access group panels | One collapsible panel per group with its users. The expanded state is stored in the user's preferences. |

| Pane | Content |
|---|---|
| **Projects** | Column **Project name**. Active projects the user can edit come first. Projects with read-only access are marked **(read only)**; archived projects and projects without access are shown in italics. |
| **All users** | Columns **User** and **Project access groups** (the groups of the user in the selected projects). **All users assigned** when the list is empty. |
| **Access groups** | One panel per studio access group, with the users who have it in the selected projects. **No users assigned** for an empty group. |

In the **Add access for** dialog each group shows its state for the selected users: all of them have it, some of them, or none. Clicking a group switches it between all and none; groups switched to none are removed from the users on **Save**. Only changed groups are saved.

Changes are saved at once for every selected project and user. Removing the last group of a user in a project removes the project from the user. Open sessions of the affected users are updated, so the change applies without signing in again.

The **All users** and **Access groups** panes are replaced by a message when they cannot be used:

| Message | Cause |
|---|---|
| **Select an active project to manage users its access groups** | No project is selected. |
| **Project disabled** | An archived project is selected. |
| **Missing permissions** | The user has no access to **Project access** in a selected project. |
| **Missing Users permissions** | The user list cannot be loaded. Users need **List all users** in the studio permissions of an access group in their **Default projects access**. |

Only active users with the **User** level are listed. Editing requires **Read & Write** on **Project access** in every selected project, or manager rights. A user with read rights sees the page read-only.

## Related

- [Users](../studio/users.md)
- [Permissions](../studio/permissions.md)
- [Project permissions](project-permissions.md)
- [Project configuration](index.md)
