---
title: Permissions
description: "The Permissions tab of the AYON Studio Settings: access groups and their defaults, the access group editor, the permission settings (restrictions, folder access lists, studio and project permissions) and how permissions are evaluated."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/2635883-user-permissions-and-project-access-groups
  - https://help.ayon.app/en/help/articles/6698141-user-management
---

# Permissions

An access group is a named set of permission settings. The **Permissions** tab of the Studio Settings defines the access groups of the server. Groups are assigned to users per project on the [Project access](../project/project-access.md) tab, and a project can override a group's settings on the [Project permissions](../project/project-permissions.md) tab. Access groups apply to users with the access level **User**; admins and managers bypass them (see [Users](users.md#access-levels)).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Permissions | Studio Settings, **Permissions** | none | `/settings/accessGroups` | Managers and admins |

## Access groups

An access group is a named set of permission settings. Each user with the **User** level has access groups per project, and permissions are combined from the groups assigned in that project. Three groups are created when the server is first set up:

| Group | Default setup |
|---|---|
| `supervisor` | No restrictions. |
| `artist` | Restricted folder creation and folder deletion with empty whitelists, so folders cannot be created or deleted. |
| `freelancer` | Folder creation, update and deletion restricted; reading and publishing limited to folders that contain tasks assigned to the user. |

Groups can be edited, deleted and added. Names use letters, digits, `_`, `.` and `-`.

## Layout and controls

The page has a list of access groups on the left and the settings of the selected group on the right. On the studio level (**Permissions** in studio settings):

| Control | What it does |
|---|---|
| **New access group** | Creates a group with an empty definition. |
| **Delete access group** | Deletes the selected group after confirmation. Assignments to the group are cleaned up on the users. |
| **Save Changes** | Saves the settings of the group. |
| Right-click menu | **Clear Overrides** (disabled without project overrides) and **Delete**. |

## Permission settings

### Restrictions

The restriction settings work as whitelists. A restriction does nothing until its **Enabled** switch is on; when it is on, only the listed items are allowed. When a user has several groups in a project, a restriction applies only if it is enabled in every one of the groups, and the allowed items of the groups are added together.

| Setting | Allows, when enabled |
|---|---|
| **Restrict folder creation** | Creating folders and entities below the listed folders. |
| **Restrict folder read** | Reading the listed folders, with their parent folders, tasks and the entities below them. |
| **Restrict folder update** | Editing the listed folders and their contents. |
| **Restrict publishing** | Publishing to the listed folders. |
| **Restrict folder delete** | Deleting in the listed folders. |
| **Restrict attribute read** | Reading only the listed attributes (**Readable attributes**). |
| **Restrict attribute update** | Changing only the listed attributes (**Writable attributes**) and the listed fields: change entity name, label, status, tags, enable or disable entity, move folder, change folder type, move task, change task type, change task assignees, change product base type, change product type, change additional data. Changing the thumbnail is always allowed. |
| **Restrict activities** | Only the listed activities: **Comment**, **Upload reviewables**. |
| **Restrict actions** | Running only the listed actions. |
| **Restrict entity links creation** | Creating links of only the listed link types. |
| **Restrict REST endpoints** | List of REST endpoints. |

### Folder access lists

The folder restrictions hold a list of items with a **Type** and a **Path**.

| Type | Meaning |
|---|---|
| **Assigned** | Folders that contain at least one task assigned to the user. The path is ignored. |
| **Hierarchy** | The folder at the path and everything below it, such as `/assets/props` with its subfolders and tasks. |
| **Children** | Everything below the folder at the path, without the folder itself. |

Read access to a path includes its parent folders so that the tree stays navigable. **Hierarchy** and **Children** differ only for operations that change the folder itself: **Hierarchy** allows editing the folder, **Children** only its contents.

### Advanced access control

| Setting | Meaning |
|---|---|
| **Show sibling tasks** | On by default. When access comes from **Assigned**, the other tasks in the same folders stay visible. When off, only the assigned tasks are visible. |

### Studio permissions

Part of the studio-level definition. They are evaluated with the **Default projects access** of the user, since they act outside a project.

| Setting | Allows |
|---|---|
| **Create projects** | Creating new projects. |
| **List all users** | Listing all users of the server. |

### Project permissions

Evaluated per project. Each has three levels: **No access**, **Read only** and **Read & Write**.

| Setting | Allows |
|---|---|
| **Project anatomy** | Viewing or editing the project anatomy. |
| **Project access** | Viewing or assigning users to access groups of the project. Gives access to the **Project access** page and, with edit rights, to the project-level access group overrides. |
| **Project addon settings** | Viewing or editing the project addon settings. |

For managers and admins these pages are always fully available.

## How permissions are evaluated

1. Admins and managers bypass all project permission settings.
2. For a **User** in a project, the groups assigned to them in that project are combined (project override of a group if there is one, otherwise the studio definition). A user without an assigned group cannot open the project.
3. Settings outside of a project, such as the studio permissions, use the **Default projects access** groups of the user.
4. Listing all users of the server requires the **List all users** studio permission. A user with the **User** level who manages project access therefore needs a group with that permission in **Default projects access**.

## Permissions

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Permissions** | Yes | Yes | No |
| Create, edit and delete studio access groups | Yes | Yes | No |

## Related

- [Users](users.md)
- [Project permissions](../project/project-permissions.md)
- [Project access](../project/project-access.md)
- [Permissions in How AYON works](../../how-ayon-works/permissions.md)
