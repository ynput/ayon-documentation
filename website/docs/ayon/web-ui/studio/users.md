---
title: Users
description: "The Users tab of the AYON Studio Settings: access levels (admin, manager, user, service), the user table, the detail panel, creating users and service users, invitations, and active and inactive users."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/2635883-user-permissions-and-project-access-groups
  - https://help.ayon.app/en/help/articles/6698141-user-management
---

# Users

AYON controls what a person or a service can do with two layers. The **access level** of a user (admin, manager, user, service) sets the base authority on the server, and is set on the **Users** tab of the Studio Settings. For users with the access level **User**, access groups then define what they can see and change inside each project; they are defined on the [Permissions](permissions.md) tab and assigned on the [Project access](../project/project-access.md) tab of each project. How the two layers work together is explained in [Permissions](../../how-ayon-works/permissions.md).

AYON permissions apply to AYON data only. They do not change file system permissions on storage.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Users | Studio Settings, **Users** | `u+u` | `/settings/users` | Managers and admins |

## Access levels

| Access level | Where it is set | What it allows |
|---|---|---|
| **Admin** | **Access level** on the Users page (settable by admins only) | Full access to all projects, studio settings, addons, bundles, the Market, server restart, secrets, licenses and all users, including other admins. An admin cannot demote their own account. |
| **Manager** | **Access level** on the Users page | Access to all projects and to studio settings, project settings, attributes, permissions and users. No access to the **Global** server settings, **Addons**, **Bundles**, the **Market**, server restart, or to secret values. Managers can create and modify users and assign access groups, but cannot modify admin accounts or grant the **Admin** level. |
| **User** | **Access level** on the Users page | No project access by default. Sees only projects where an access group is assigned, and works within the permissions of that group. Can edit their own profile attributes. |
| **Service** | **Add Service User** on the Users page | Account for automation, such as a service or a script, that authenticates with an API key instead of a password. A service has admin rights and can act as another user. It cannot have a password or an email address. |
| **Guest (legacy)** | Existing accounts only | Deprecated mode that is shown only on accounts that still carry it. The user detail shows a **Remove Guest flag** button that converts the account to a regular user. Guests cannot be created or edited through the Users page. |

The access level also sets how much of the web app is visible: the menu entries **Event Viewer** and **Services** appear for managers and admins; **Market**, **Update Pipeline** and **Restart Server** appear for admins only.

## Layout and controls

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
| **Licenses** | Opens the license dialog (see [Licenses](../../licenses.md)). |

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

## Permissions

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Users** | Yes | Yes | No |
| Create, edit, delete users | Yes | Yes, except admin accounts and admin level | No (own profile attributes only) |
| Set **Developer** | Yes | No | No |
| Set passwords of other users | Yes | Yes | Own password only |
| Generate API keys of existing service users | Yes | No | No |

## Related

- [Permissions](permissions.md)
- [Project access](../project/project-access.md)
- [Attributes](attributes.md)
- [Licenses](../../licenses.md)
- [Permissions in How AYON works](../../how-ayon-works/permissions.md)
