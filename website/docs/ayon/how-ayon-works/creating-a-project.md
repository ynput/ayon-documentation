---
title: Creating a project
description: "Projects in AYON: the project types (production, planning, library), creating a project and its name, code and label, the anatomy and anatomy presets, the project attributes, building the project hierarchy (in the web app, with Import CSV, by syncing a production tracker, or by editorial publishing from the Tray Publisher, Hiero, Resolve or Flame), web actions on projects, folders and tasks, what to configure afterward, and entity templates with the Power Pack."
verified: 2026-11-15
sources:
  - https://help.ayon.app/en/help/articles/4902206-managing-projects
  - https://help.ayon.app/en/help/articles/3815114-project-anatomy
  - https://help.ayon.app/en/help/articles/2635883-user-permissions-and-project-access-groups
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/NewProjectDialog/NewProject.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/projects.py
---

# Creating a project

All production data in AYON lives in a project: its folders and tasks, everything published to it, its own anatomy and its own settings. This page explains the kinds of projects, how a project is created and set up, and the ways its folders and tasks are filled in. The dialog and the pages mentioned here are described on their reference pages, linked below.

## Types of projects

| Type | What it is for | Set with |
|---|---|---|
| Production | A normal project with a folder hierarchy, tasks and published data. The default. | **Project state** **Production** in the create dialog |
| Planning | A project that is not started yet: it appears in the project lists with the state **Planning** and can carry attributes and a thumbnail, but it has no anatomy editor and holds no hierarchy. Creating a production project with the same name later turns it into a full project. | **Project state** **Planning** |
| Library | A production project that stores reusable data, such as assets, which other projects load from. | The **Library project** switch, offered for production projects |

## Creating a project

**Create new project** on the [Projects](../web-ui/home/projects.md) tab of Home, or the add button of a project list, opens the **Create a new project** dialog.

1. Enter the **Project label**; the name and code are suggested from it.
2. Check the **Project name** and **Project code**.
3. Choose the anatomy preset, and change any value of the anatomy for this project, see [Project configuration](#project-configuration).
4. **Create Project**, or `Enter`, creates the project and opens its **Anatomy** page. `Shift+Enter` creates it and keeps the dialog open for the next one.

| Value | Rules | Used for |
|---|---|---|
| **Project label** | Required in the dialog. No single quote or semicolon. | The name shown in the web app. |
| **Project name** | At least 3 characters: letters, digits and `_`, not starting or ending with `_`; spaces become `_`. Unique, ignoring upper and lower case. | The identifier of the project, and the `{project[name]}` key that the default work and publish directories start with. |
| **Project code** | At most 10 characters, with the same rules. Unique among projects. Suggested from the name with the **Project Code Regex** of the [Global](../web-ui/studio/global.md) settings (by default the first three characters). | The `{project[code]}` key that the default file names start with. |

Admins, managers and service users can create projects. A user with the **User** access level can when one of their **Default projects access** groups has **Create projects**; the button is shown only to those who can. See [Permissions](permissions.md).

A new project starts empty: no folders, no tasks and nothing on disk. Users with the **User** level get access to it when they have **Default projects access** groups: those groups are assigned in the new project at the moment it is created, and are not applied to existing projects later. Other users are added on the [Project access](../web-ui/project/project-access.md) page.

## Project configuration

The structure and conventions of a project are its anatomy: roots, path templates, folder types, task types, statuses, tags, link types, entity naming and product types. A new project takes its anatomy from an **anatomy preset**, a template kept on the [Anatomy presets](../web-ui/studio/anatomy-presets.md) tab of the studio settings. The dialog starts with the primary preset, marked `(primary)`, or the built-in **AYON default**.

The preset is copied into the project, including the changes made in the dialog. From then on the project has its own anatomy:

- later changes to the preset, or a new primary preset, do not reach existing projects;
- changes on the project's [Anatomy](../web-ui/project/anatomy.md) page do not change the preset;
- two projects made from the same preset are independent.

:::caution Changing the anatomy during production
Roots, templates and entity naming decide where files go and how entities are named, so they are best set before production starts. Changing them later applies to new work files and publishes only; existing files are not moved or renamed. Published versions often keep working, because their records store rootless paths and the template data they were made with, but that is not guaranteed for every tool and workflow.
:::

Addon settings are not part of the anatomy. A new project reads the studio settings of the addons until it gets its own overrides on the [Project settings](../web-ui/project/project-settings.md) tab, see [Settings](settings.md).

## Project attributes

The **Attributes** section of the anatomy editor holds the project's values of every attribute that exists on projects, such as `fps`, `resolutionWidth`, `frameStart` or `startDate`, starting from the defaults of the [attribute definitions](../web-ui/studio/attributes.md). Folders and tasks take a value from the project when they have none of their own, so these values apply to the whole hierarchy until a folder or task sets its own, see [Attributes and inheritance](entities.md#attributes-and-inheritance). After creation they are edited in the project's details on the Projects tab, or in the **Attributes** section of the project anatomy.

## Project hierarchy

### Ways to build it

The folders and tasks of a project are created in one or more of these ways:

| Way | How | Described in |
|---|---|---|
| In the web app | **Create** on the project's **Overview** page adds folders and tasks, one by one or several at once. | [Project overview](../web-ui/production-tracking/overview.md) |
| From a spreadsheet | **Import** under **Import / Export** on the Overview reads a CSV or Excel file of folders and tasks. | [Import CSV](../web-ui/dialogs/import-csv.md) |
| From a production tracker | The ftrack, Flow (ShotGrid), Kitsu and Airtable addons sync the hierarchy of a project in that tracker into AYON. | [ftrack](../../addons/third-party-trackers/ftrack/index.md), [Flow (ShotGrid)](../../addons/third-party-trackers/flow-shotgrid/index.md), [Kitsu](../../addons/third-party-trackers/kitsu/index.md), [Airtable](../../addons/third-party-trackers/airtable/index.md) |
| From an edit | Editorial publishing creates the shots of an edit, with their plates, as it publishes: from an edit file with the Tray Publisher, or from a timeline in Hiero, Resolve or Flame. | [Tray Publisher](../../addons/essentials/traypublisher/index.md), [Hiero](../../addons/compositing-editorial-applications/hiero/index.md), [Resolve](../../addons/compositing-editorial-applications/resolve/index.md), [Flame](../../addons/compositing-editorial-applications/flame/index.md) |

### Actions on projects, folders and tasks

Addons add [web actions](../../developer/addon-development/server.md#web-actions) to the project, its folders and its tasks, shown in the details panel for the selected entities. For example, the Core addon's **Create Project Folder Structure** creates the directories of the Core setting **Project folder structure** under the project root on disk, through the AYON launcher of the user who runs it; see [Storage](storage.md#when-directories-and-files-are-written).

## What to configure afterward

| Area | Where | Why |
|---|---|---|
| Roots | Project **Anatomy**, **Roots** | The default root `work` points to example paths. Every workstation needs paths that reach the studio storage. Change roots before production starts, because existing files are found through them. |
| Templates, types, statuses | Project **Anatomy** | Adjust the copy taken from the preset. |
| Project attributes | Project details on the Projects tab | Frame range, resolution, frame rate, dates. |
| Project settings | [Project settings](../web-ui/project/project-settings.md) | Project overrides of addon settings, such as Core profiles or application variants. |
| Access | [Project access](../web-ui/project/project-access.md) | Users who did not get access through default access groups. |
| Access group overrides | [Project permissions](../web-ui/project/project-permissions.md) | Project-specific changes to an access group. |
| Folders on disk | Web action **Create Project Folder Structure** | Creates the skeleton of directories under the project root. |

A new project works with the studio's Production bundle, and most projects stay on it. A [project bundle](../web-ui/project/project-bundle.md) is a later choice, not a setup step: for example, when a long-running production runs next to smaller ones and the studio is about to update its bundle, locking the long-running project first keeps it on the versions it was tested with.

## Power features

These features need the [Power Pack](../../addons/production-tracking/power-pack/index.md) and a license, see [Power features](../../production-tracking/power-features.md).

### Entity templates

An entity template is a stored tree of folders and tasks, for the studio or for one project, that is applied to build or extend a hierarchy at once. **Apply template** on the project or on folders creates the tree, with options for which fields to apply and what to do with entities that already exist. **Create template** saves selected folders as a new template. See [Hierarchy templates](../../addons/production-tracking/power-pack/index.md#hierarchy-templates).

## Where to look

| Question | Place |
|---|---|
| Who created the project, and when? | **Event Viewer**, topic `entity.project.created` |
| Which anatomy does the project use? | The project's **Anatomy** page (its own copy, not the preset) |
| Which users got access? | **Project access** page of the project |
| Why can a user not see the new project? | The user has the **User** level and no access group in the project: their default access groups were empty, the user was inactive, or the user was created after the project. |
| Why can a user not create projects? | None of the user's **Default projects access** groups has **Create projects**. |

## Related

- [Projects](../web-ui/home/projects.md)
- [Anatomy](../web-ui/project/anatomy.md)
- [Anatomy presets](../web-ui/studio/anatomy-presets.md)
- [AYON entities](entities.md)
- [Permissions](permissions.md)
- [Storage](storage.md)
- [Settings](settings.md)
- [Naming conventions](../../pipeline/naming-conventions.md)
