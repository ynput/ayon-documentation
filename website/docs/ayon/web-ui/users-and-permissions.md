---
title: Users and permissions
description: "The Users page of the AYON server web app, user roles, service users, access groups, the permission settings they contain and how project access is assigned."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/2635883-user-permissions-and-project-access-groups
  - https://help.ayon.app/en/help/articles/6698141-user-management
---

# Users and permissions

AYON server controls what a person or a service can do with two layers. The **access level** of a user (admin, manager, user, service) sets the base authority on the server. For users with the access level **User**, **access groups** then define what they can see and change inside each project. Users are managed on the **Users** page of the studio settings; access groups are defined on the **Permissions** page and assigned per project.

AYON permissions apply to AYON data only. They do not change file system permissions on storage. Terms such as folder permissions refer to folder entities in AYON, not to directories on disk.

## Where it appears

| Page | Location | Shortcut | URL path | Visible to |
|---|---|---|---|---|
| **Users** | Studio settings, left sidebar | `U+U` | `/settings/users` | Managers and admins |
| **Permissions** | Studio settings, left sidebar | | `/settings/accessGroups` | Managers and admins |
| **Project permissions** | Project pages (**Projects Settings** in the app menu, `P+P`), left sidebar | | `/manageProjects/permissions` | Managers and admins |
| **Project access** | Project pages (**Projects Settings** in the app menu, `P+P`), left sidebar | | `/manageProjects/projectAccess` | Managers, admins and users with the **Project access** permission |

Studio settings open from the app menu (nine-dot icon, top right) with `S+S`.

## Access levels

| Access level | Where it is set | What it allows |
|---|---|---|
| **Admin** | **Access level** on the Users page (settable by admins only) | Full access to all projects, studio settings, addons, bundles, the Market, server restart, secrets, licenses and all users, including other admins. An admin cannot demote their own account. |
| **Manager** | **Access level** on the Users page | Access to all projects and to studio settings, project settings, attributes, permissions and users. No access to the **Global** server settings, **Addons**, **Bundles**, the **Market**, server restart, or to secret values. Managers can create and modify users and assign access groups, but cannot modify admin accounts or grant the **Admin** level. |
| **User** | **Access level** on the Users page | No project access by default. Sees only projects where an access group is assigned, and works within the permissions of that group. Can edit their own profile attributes. |
| **Service** | **Add Service User** on the Users page | Account for automation, such as a service or a script, that authenticates with an API key instead of a password. A service has admin rights and can act as another user. It cannot have a password or an email address. |
| **Guest (legacy)** | Existing accounts only | Deprecated mode that is shown only on accounts that still carry it. The user detail shows a **Remove Guest flag** button that converts the account to a regular user. Guests cannot be created or edited through the Users page. |

The access level also sets how much of the web app is visible: the menu entries **Event Viewer** and **Services** appear for managers and admins; **Market**, **Update Pipeline** and **Restart Server** appear for admins only.

## Users page

The page lists all users of the AYON server in a table, with a detail panel for the selected users.

### Toolbar

| Control | What it does |
|---|---|
| **Add New User** (`n`) | Opens the **Create New User** dialog. |
| **Add Service User** | Opens the **Create Service User** dialog. |
| **Filter users...** | Filters the table. Matches username, full name, email, access group names and the password state. Terms separated by commas must all match. The text is kept in the `search-users` query parameter of the URL. |
| Totals | **Total users** (services excluded), **Active**, **Admins**, **Managers** and **Services**. When license pools exist, **Licenses** shows used and maximum seats of all pools; the tooltip splits it into base (fixed) and metered pools. |
| **Send Invite** | Opens the invite dialog for the selected users. Disabled while no user is selected. |
| **Import CSV** | Opens the import dialog to create users in bulk from a CSV file. |
| **Licenses** | Opens the license dialog (see [Licenses](licenses.md)). |

### Table columns

Columns can be sorted, resized and reordered; the layout is remembered in the browser. Inactive users are dimmed.

| Column | Content |
|---|---|
| **Username** | Login name with avatar. |
| **Full name**, **Email** | User attributes. |
| **License** | License pool of the user. Shown only when license pools exist. `Invalid` marks a pool that no longer exists. |
| **Access level** | `Admin`, `Manager`, `User` or `Service`. |
| **Default projects access** | Access groups applied to new projects. |
| **Has password** | `yes` or `no`. |
| **Active** | `yes` for active users. |
| **Invitation** | Invitation state: `Pending`, `Accepted` or `Expired`, with the time. An invitation expires 7 days after it was sent. |

Selecting several rows edits them together. The right-click menu on a row has **Set username**, **Set password**, **Invite** (**Resend** when an invitation is pending) and **Delete selected**. **Set username** and **Set password** work on one user at a time. A user cannot delete their own account.

### Detail panel

The panel opens on the right for the selected users and has a header with the avatar, the name and the access level or access groups, a close button and a menu with **Delete user**.

| Section | Fields |
|---|---|
| Account (single user only) | **Username** and **Password**, each with an edit button that opens **Set username** or **Set password**. User attributes: **Full name**, **E-Mail**, **Avatar URL** and any custom attribute with the user scope (see [Attributes](attributes.md)). |
| **License control** (**Login control** when no license pools exist) | **User active**: inactive users cannot log in and lose their license seat. **User license**: the license pool, listed with used and maximum seats; full or invalid pools cannot be selected. **Invitation**: **Invite** or **Resend** button and the invitation state. |
| **Access** | **Disable password**, **Developer**, **Staging access**, **Access level** and **Default projects access**. |

Footer buttons: **Cancel** (single user only) and **Save selected users**, which saves only the changed fields. A user cannot change their own access level, license or activity. Managers cannot change admin accounts.

Access fields:

| Field | Meaning |
|---|---|
| **Disable password** | The user cannot sign in with a password and has to use another login option, such as a Ynput Cloud account or a single sign-on addon. |
| **Developer** | Turns on developer mode. Only admins can set it, only for active users with the **Admin** level. |
| **Staging access** | Lets the user switch the web app to staging mode to test staging bundles and actions before release. |
| **Access level** | **User**, **Manager** or **Admin** (the **Admin** option is offered to admins only). |
| **Default projects access** | Access groups the user receives automatically in every new project. Shown for the **User** level; admins, managers and services have full access to all projects. |

### Create New User dialog

| Field | Notes |
|---|---|
| **Username** | Required, no spaces. |
| **Password**, **Password Confirm** | Optional; the two must match. Passwords set by managers are checked for complexity; passwords set by admins are not. |
| **Full name**, **E-Mail**, **Avatar URL**, custom attributes | User attributes. An email address must be unique among users. |
| Access fields | As in the detail panel. The new user is active with the **User** level by default. |

Buttons: **Create user** (`Shift+Enter`) creates the user and keeps the dialog open for the next one. **Create and close** (`Ctrl+Enter`) creates the user and closes the dialog.

### Create Service User dialog

| Element | Meaning |
|---|---|
| **Username** | Required, no spaces. |
| **Service user key** | **Generate new key...** creates an API key and copies it to the clipboard. The key is displayed once, in the dialog, and a user is only created once a key exists. |

An existing service user shows only its username and **API Key** in the detail panel. The panel shows a preview of the stored key, with a delete button that revokes it, or **Generate new key...** when none exists. A newly generated key is shown once. The key is used as `AYON_API_KEY` by the Python API, command-line tools and service hosts such as ASH.

### Other dialogs

| Dialog | Content |
|---|---|
| **Set username** | **New name**. Renaming a user can have unintended consequences and is meant as a last resort. |
| **Set password** | **New Password** and **Confirm Password**. |
| Delete | Asks to type the user name (`delete selected` for several users) to confirm. **Disable user** deactivates instead of deleting. Deleting removes the user from all task assignments and ends their sessions. |
| **Invite users to AYON by email** | Lists the users that will receive an email invitation (active users with an email address) and the skipped ones. **Send** button. |

### Active and inactive users

An active user can log in and uses a license seat when license pools exist. Any number of inactive users can exist; deactivating a user clears the license assignment. This allows preparing users, for example freelancers, and assigning them to projects without a seat. Activating a user can be blocked when the maximum number of active users of the license is reached. Users are also created by addons that sync users from production trackers, by single sign-on addons and through the Python API.

## Access groups

An access group is a named set of permission settings. Each user with the **User** level has access groups per project, and permissions are combined from the groups assigned in that project. Three groups are created when the server is first set up:

| Group | Default setup |
|---|---|
| `supervisor` | No restrictions. |
| `artist` | Restricted folder creation and folder deletion with empty whitelists, so folders cannot be created or deleted. |
| `freelancer` | Folder creation, update and deletion restricted; reading and publishing limited to folders that contain tasks assigned to the user. |

Groups can be edited, deleted and added. Names use letters, digits, `_`, `.` and `-`.

### Permissions page

The page has a list of access groups on the left and the settings of the selected group on the right. On the studio level (**Permissions** in studio settings):

| Control | What it does |
|---|---|
| **New access group** | Creates a group with an empty definition. |
| **Delete access group** | Deletes the selected group after confirmation. Assignments to the group are cleaned up on the users. |
| **Save Changes** | Saves the settings of the group. |
| Right-click menu | **Clear Overrides** (disabled without project overrides) and **Delete**. |

On the **Project permissions** page the same list and editor work for the selected project. A group that has an override in the project is marked in the list. Project overrides replace the studio definition of the group for that project. **Clear project overrides** removes the override. Studio permissions are not shown on the project level. Creating and deleting groups is only possible on the studio level.

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

## Project access

Users with the **User** level see a project only after an access group is assigned to them in that project. **Default projects access** is a template that is applied when a project is created; it does not change existing projects. Managers and admins have access to all projects and are not listed on this page.

The **Project access** page has three panes: **Projects**, **All users** and **Access groups**. Selecting one or several projects shows the users and the access groups assigned in them.

| Control | What it does |
|---|---|
| Filter bar | Free text search and filters by **Project**, **User** and **Access Group**. |
| **Add access** (`a`) | Assigns access groups to the selected users in the selected projects. With one group visible it applies directly; otherwise the **Add access for** dialog lists the groups with **Select all** and **Save**. |
| **Remove access** (`r`) | Removes the selected users from the selected access group. |
| Row buttons and context menu | **Add access**, **Remove access**, **Remove all access** and **Filter by user**. |
| Access group panels | One collapsible panel per group with its users. |

Only active users with the **User** level are listed. Editing requires **Read & Write** on **Project access** in every selected project, or manager rights. A user with read rights sees the page read-only.

## How permissions are evaluated

1. Admins and managers bypass all project permission settings.
2. For a **User** in a project, the groups assigned to them in that project are combined (project override of a group if there is one, otherwise the studio definition). A user without an assigned group cannot open the project.
3. Settings outside of a project, such as the studio permissions, use the **Default projects access** groups of the user.
4. Listing all users of the server requires the **List all users** studio permission. A user with the **User** level who manages project access therefore needs a group with that permission in **Default projects access**.

## Permissions summary

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Users** and **Permissions** | Yes | Yes | No |
| Create, edit, delete users | Yes | Yes, except admin accounts and admin level | No (own profile attributes only) |
| Set **Developer** | Yes | No | No |
| Create or edit studio access groups | Yes | Yes | No |
| Edit project access group overrides and assign project access | Yes | Yes | With **Project access** set to **Read & Write** |
| Set passwords of other users | Yes | Yes | Own password only |
| Generate API keys of existing service users | Yes | No | No |
| View **Event Viewer** | Yes | Yes | No |

## Related

- [Licenses](licenses.md)
- [Secrets](secrets.md)
- [Event Viewer](events.md)
- [Attributes](attributes.md)
- [Services](services.md)
- [Navigating the web app](navigating-the-web-app.md)
- [Keyboard shortcuts](keyboard-shortcuts.md)
