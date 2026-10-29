---
title: Teams
description: "The Teams page of project settings groups a project's users into named teams with per-member roles and team leaders."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/6300319-teams
---

# Teams

Teams are named groups of users defined per project. A team has members, and each member has any number of roles and an optional leader flag. Teams are stored in the project data and are managed on the **Teams** page of the project manager.

Teams currently organize users. Roles and leader flags are descriptive. Teams are offered as mention targets in comments (see [Activity feed](../details-panel.md#activity-feed)) and as entries in project access lists of the Power Pack addon, such as comment categories (see [Power Pack](../../../addons/production-tracking/power-pack/index.md)).

## Where it appears

| Item | Value |
|---|---|
| Location | Project manager, **Teams** tab, next to **Project permissions**, **Site settings** and **Roots** |
| Shortcut | `p+p` opens the project manager; select the **Teams** tab |
| Path | `/manageProjects/teams`, with the project in the `project` query parameter |
| Visible to | Managers and administrators |

## Layout

| Region | Content |
|---|---|
| Project list | Selects the project whose teams are shown. |
| Toolbar | **Add New Team** button, **Filter users...** field and the **Hide Other Team Members** switch. |
| Team list | One row per team, sorted by name, with multi-selection. Context menu: **Create Team**, **Duplicate Team** (single selection), **Delete Team** or **Delete Teams**. |
| Members table | The users of the project, with the columns below. |
| **Member Settings** | Settings of the selected users. |
| **Team Settings** | Settings of the selected teams. |

### Members table

Lists administrators, managers and every user with at least one access group in the project. Rows are grouped, with selected teams first.

| Group | Meaning |
|---|---|
| On A Selected Team | The user is on at least one selected team. |
| On Other Teams | The user is only on teams that are not selected (when a team is selected). |
| On Teams | The user is on a team (when no team is selected). |
| On No Teams | The user is on no team. |

| Column | Content |
|---|---|
| **Username** | User name with avatar. |
| **Full Name** | Full name attribute. |
| **Teams** | Teams of the user. Leaders are shown in the tertiary theme color. Teams that are not selected are dimmed. |
| **Roles** | Roles of the user across teams. Roles of unselected teams are dimmed. |

The **Filter users...** field searches name, full name, teams, roles and leader. **Hide Other Team Members** removes users who are not on a selected team. A context menu on users adds them to or removes them from teams, and toggles the hiding of other members.

## Controls

| Control | Where | What it does |
|---|---|---|
| **Add New Team** | Toolbar, team list context menu | Opens **Create New Team**. |
| **Create New Team** dialog | Dialog | Fields **Team Name**, **Team Members** and **Member Roles**, with a user table and filter. **Create New Team** saves, **Clear** resets. `Ctrl/Cmd + Enter` saves; `Shift + Enter` saves and keeps the dialog open; `Escape` closes. The roles entered apply to every member entered. |
| Duplicate Team | Team list context menu | Asks for a new name and copies the members, roles and leader flags. |
| Delete Team | Team list context menu | Deletes the selected teams after confirmation. |
| **Team Name** | **Team Settings** | Renames the team (one team selected). |
| **Roles** | **Team Settings** | Lists the roles used on the selected teams. A role can be renamed or deleted, which applies to every member of every team that has it. |
| **On Teams** | **Member Settings** | Multi-select of the teams the selected users belong to. |
| **Roles** | **Member Settings** | Roles of the selected users on the selected teams. A role that does not exist yet is created. |
| **Leader** | **Member Settings** | Marks the selected users as leaders of the selected teams. A team can have several leaders. |

## Rules

- Team names are formatted to lowercase without spaces and must be 2 to 64 characters. Names are unique within a project, case-insensitively.
- A user can be on several teams.
- Renaming a team is a duplicate followed by deleting the old team.
- With several teams selected, **Team Settings** shows the combined member and leader counts, and the name cannot be edited.

## Permissions

The **Teams** tab is shown to managers and administrators. Creating, changing and deleting teams requires the manager or administrator role on the server. Guests receive no teams. See [Users and permissions](../studio/users.md).

## Related

- [Activity feed](../details-panel.md#activity-feed)
- [Users and permissions](../studio/users.md)
- [Navigating the web app](../navigation-bar.md)
- [Power Pack](../../../addons/production-tracking/power-pack/index.md)
