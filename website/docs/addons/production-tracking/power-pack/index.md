---
title: Power Features addon
sidebar_label: Overview
description: "The AYON Power Features addon (powerpack): the licensed features it adds, such as multi-view slicer, annotations, views, comment categories, calculated attributes, hierarchy templates and status sync, and where they appear in the AYON web app."
addon: powerpack
addon_repo: ayon-power-pack
addon_version: 1.6.7
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7017685-power-features
  - https://help.ayon.app/en/articles/7144550-calculated-attributes
---

# Power Features addon

<AddonInfo />

The Power Features addon (addon name `powerpack`, package title "Power Pack") unlocks the licensed, advanced functions of the AYON web app and adds server-side automation to the AYON server. It combines front-end modules (multi-view slicer, annotations, views and table summaries, list attributes and list access) with server features (comment categories, calculated attributes, hierarchy templates, status synchronization and pinned project settings). Features that need a Power license are marked with a lightning symbol in the web app.

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.16.4 or newer |
| Addon type | Server addon, no launcher client code |
| Automations addon | Not compatible: its features were merged into this addon |

The server features are activated only when this addon version is part of the production bundle. For other bundle variants the features are uninstalled.

## Features

| Feature | Where it appears | What it does |
|---|---|---|
| Multi-view slicer | Project pages that support slicing | Filters a page on the fly by hierarchy, assignees, status and task type, without changing the saved filters. |
| Annotations | Media viewer | Drawing tools for marking up frames of videos and images, with undo history and export of the drawing. |
| Views | Table pages | Saves custom page layouts as views. A view can be shared as private or public, with an access level per user, group or team. |
| Table summaries | Footer of tables | Summary cells per column: sum, average, minimum and maximum for numbers; checked or not checked for booleans; filled or empty for text; a count and breakdown for the name column. |
| Related tasks | Task panels | Shows tasks related to the selected task. |
| List attributes and list access | Lists | Adds attributes to entity lists and access control for each list. |
| Comment categories | Activity feed | Categories for comments, each with a color and an access rule. |
| Calculated attributes | Entity attributes | Attributes whose value is computed by a formula. |
| Hierarchy templates | Actions menu | Creates and applies folder and task templates. |
| Status sync | Server events | Changes statuses between tasks, folders and versions. |
| Pinned project settings | New projects | Copies chosen studio settings into a new project as overrides. |

The front-end modules the addon publishes to the web app are `annotations`, `slicer`, `license` and `views`. The web app decides which pages show them; the addon supplies the components.

## Comment categories

A comment category has a name, a highlight color and an access rule. The rule maps subjects to an access level: everyone (`__everyone__`), guests (`__guests__`), a user, an access group or a team. Managers always pass, and the owner of a rule's entity passes. Guests need guest access to the project. A user can use the categories whose rule grants the requested level. Three categories ship by default: Guest, Director and Private (see [settings](settings.md#comment-categories)).

The addon also replaces the server's access check for lists and shared entities. Rules written for lists use the same subjects, and guest users can only reach entities that are in a list shared with them.

## Calculated attributes

A calculated attribute is an existing attribute whose value is computed by a Jinja2 formula for the chosen entity types. The formula result is text; the server converts it to the attribute type when possible and strips surrounding whitespace.

| Formula variable | Available for | Content |
|---|---|---|
| `entity` | All entity types | The entity being calculated, with the fields of the REST API. |
| `project` | All entity types | The project, including its anatomy, for example `project.statuses`. |
| `utils` | All entity types | Helper functions, including `utils.now()` and `utils.keep()`. |
| `operation` | All entity types | The operation that triggered the calculation. |
| `get_tasks(recursive=False)` | Folders | The tasks of the folder, and of its sub-folders with `recursive=True`. |
| `get_children(recursive=False)` | Folders | The child folders, and all descendants with `recursive=True`. |

Other variable names are rejected when the settings are saved. `project`, `get_tasks` and `get_children` are advanced variables because they read data outside the entity.

| Calculation mode | Behavior |
|---|---|
| Automatic (`auto`, default) | Recalculated when the entity is saved, except for formulas that use an advanced variable. Those need an action. |
| Manual (`manual`) | Recalculated only by an action. |
| Always (`always`) | Recalculated on every save of the entity. Complex formulas can load the server. |

Actions in the actions menu: **Recalculate attributes** (project), **Recalculate folder attributes** and **Recalculate task attributes**.

## Hierarchy templates

A template is a JSON tree of folders and tasks. Each entry has a type, subtype, name and optional label, status, attributes and assignees. A folder entry can carry a sequence that repeats it a number of times, with the counter usable in the name, for example `sh{iter:02d}0`. Templates are stored in settings, for the studio or for one project.

| Action | Entity | What it does |
|---|---|---|
| **Apply template** | Project, folders | Opens a form with the **Template**, the **Fields to apply** (Status, Attributes, Task assignees) and **On conflict** (Skip, Merge, Replace). Template fields such as sequence counts can be customized before applying. |
| **Create template** | Folders | Saves the selected folders as a template. The form asks for **Template name**, **Template scope** (Project or Studio), **Overwrite existing** and **Children only**. |

## Status sync

Status sync listens to entity events and changes the status of related entities according to mappings. The status choices come from the primary anatomy preset at studio level and from the project anatomy at project level. Rules can chain (a task change can change its folder), so circular mappings must be avoided. Events caused by status sync itself are ignored.

| Rule | What changes | Trigger types setting | Filter |
|---|---|---|---|
| Task to parent folder | Folder status, from the statuses of its tasks | On update, On create | Folder types |
| Task to version | Version status, when a task status changes | None | Product types allow or deny list |
| Folder to task | Statuses of the tasks of a folder, when the folder status changes or a folder is created | On update, On create | Folder types |
| Version to task | Task status, when a version status changes or a version is created | On update, On create | Product types allow or deny list |

For task to folder, **All tasks match** rules take priority over **Task to folder status mapping**. All four rules are disabled by default. The folder to task rule is new in 1.6.7. See [settings](settings.md#status-sync).

## Pinned project settings

When a project is created, every settings path listed in the **Settings Paths** setting (form `ayon+settings://addon/path`) is written to the new project as an override, so later studio changes do not reach that value. Only settings available at both studio and project scope can be pinned.

## Not covered

Pipeline release access, single sign-on and the reviewables transcoder are delivered by other components and are not part of this addon.

## Related

- [Power Features settings](settings.md)
- [Settings and scopes](../../../ayon/backend/settings/index.md) (planned)
