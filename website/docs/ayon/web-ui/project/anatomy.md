---
title: Anatomy
description: "The Anatomy tab of the AYON Projects Manager: editing a project's own anatomy (entity naming, roots, templates, attributes, folder and task types, link types, statuses, tags, product types), copying and pasting it as JSON, and saving it."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectAnatomy.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AnatomyEditor.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SettingsEditor/FormTemplates/FieldTemplate.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/hooks/useUserProjectPermissions.ts
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/anatomy.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/settings/anatomy/__init__.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/settings/anatomy/templates.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/settings/anatomy/entity_naming.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/settings/anatomy/product_base_types.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/entities/project_aux_tables.py
---

# Anatomy

The **Anatomy** tab of the [Projects Manager](index.md) edits the anatomy of the selected project: its roots, path templates, project attributes and the lists of types, statuses and tags its entities can use. A project gets its anatomy as a copy of an anatomy preset when it is created; from then on the project's anatomy is its own and changes here do not reach the preset or other projects (see [Creating a project](../../how-ayon-works/creating-a-project.md#the-anatomy-preset-becomes-the-projects-own-anatomy)). The presets themselves are edited on the [Anatomy presets](../studio/anatomy-presets.md) tab.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Anatomy | Projects Manager, **Anatomy**; **Manage** in the project list menu | `a+a` | `/manageProjects/anatomy?project=<project>` | Managers and admins; users with **Read only** or **Read & Write** on **Project anatomy** in at least one project |

After a project is created from the Projects page, the web app opens this tab for the new project.

## Layout and controls

The project list is on the left (see [Projects Manager](index.md#project-list)); the anatomy editor of the selected project fills the rest of the page.

### Toolbar

| Control | What it does |
|---|---|
| **Copy anatomy** | Copies the anatomy as shown in the editor, including unsaved edits, to the clipboard as JSON. |
| **Paste anatomy** | Reads JSON from the clipboard and replaces the whole editor content with it. Shows **No content to paste** or **Invalid JSON** when the clipboard cannot be used. The pasted anatomy is an unsaved edit. |
| **Read-only** | Text shown when the user has **Read only** on **Project anatomy** in this project. |
| **Save changes** | Saves the anatomy to the project. Active when the editor differs from the saved anatomy and the user has **Read & Write**; otherwise its tooltip reads **You don't have edit permissions**. A failed save shows **Failed to save anatomy** with the server's message. |

Copy and paste work between projects and with anatomy presets, which have the same structure. The toolbar is hidden when the user cannot view the anatomy of the selected project; the page then shows **You don't have permission to view this project's anatomy**.

Right-clicking a field or group of the editor offers **Copy** and **Paste** for that value as JSON.

## Anatomy sections

The editor shows the sections of the anatomy model in this order. How roots and templates decide file paths is explained in [Pipeline storage](../../how-ayon-works/pipeline-storage.md); types, statuses, tags and links in [Data model](../../backend/data-model/index.md#statuses-types-and-tags).

| Section | Content |
|---|---|
| **Entity Naming** | **Capitalization** (**All lowercase**, **All UPPERCASE**, **Keep original capitalization**, **Capitalize Every Word**, **capitalize Every Word Except First**) and **Separator** (**None**, **Underscore (_)**, **Dash (-)**, **Dot (.)**) used to suggest entity names from labels. |
| **Roots** | One entry per root: **Root name** and a path for **Windows**, **Linux** and **Darwin**. Per-workstation paths are set on the [Roots](roots.md) tab instead. |
| **Templates** | **Version padding**, **Version template**, **Frame padding**, **Frame template**, and the template groups **Work**, **Publish**, **Hero**, **Delivery**, **Staging directories** and **Others**. Each template has a **Name**; work, publish, hero and delivery templates have a **Directory template** and a **File name template**. |
| **Attributes** | The project's own values of every attribute whose scope includes projects (see [Attributes](../studio/attributes.md)). Folders and tasks inherit them. |
| **Folder types** | **Name**, **Short name**, **Color**, **Icon**. |
| **Task types** | **Name**, **Short name**, **Color**, **Icon**. |
| **Link types** | **Link type**, **Input type**, **Output type**, **Color**, **Style** (solid or dashed). |
| **Statuses** | **Name**, **Short name**, **State** (**Not Started**, **In Progress**, **Done**, **Blocked**), **Icon**, **Color** and a scope that limits the status to entity types. |
| **Tags** | **Name**, **Color**. |
| **Product Types** | **Default appearance** (**Default color**, **Default icon**) and **Appearance overrides**: color and icon per product base type. |

The order of folder types, task types and statuses matters: a new folder or task takes the first type, and a new entity the first status whose scope fits it. Names in the lists of roots, folder types, task types, statuses and tags must be unique, and templates need unique names within a group.

## Saving

**Save changes** sends the complete anatomy to the server, which validates it and writes it into the project in one transaction. If any part fails, nothing is saved.

- The project needs at least one folder type, one task type and one status.
- Folder types, task types, statuses and tags are written to the project's own tables in the order of the lists. Renaming an item renames it on every entity that uses it. Items removed from a list are deleted from the project; removing a folder type, task type or status that entities still use makes the save fail.
- Link types, roots, templates, entity naming and product types are stored with the project.
- Changed project attributes are stored as the project's attribute values, and the inherited values of folders and tasks are rebuilt.
- The server emits project change events for the saved changes.

Saving changes nothing on disk.

## Permissions

| Action | Required |
|---|---|
| View the anatomy on this tab | Manager or admin, or **Read only** or **Read & Write** on **Project anatomy** in the project. (The server returns the anatomy to every user with access to the project.) |
| Save the anatomy | Manager or admin, or **Read & Write** on **Project anatomy** in the project (`project.anatomy`, level 2) |

**Project anatomy** is a project permission of the access groups (see [Permissions](../studio/permissions.md#permission-settings)).

## Related

- [Project configuration](index.md)
- [Anatomy presets](../studio/anatomy-presets.md)
- [Creating a project](../../how-ayon-works/creating-a-project.md)
- [Pipeline storage](../../how-ayon-works/pipeline-storage.md)
- [Data model](../../backend/data-model/index.md)
- [Roots](roots.md)
