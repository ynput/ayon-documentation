---
title: Entity templates
description: "Entity templates (hierarchy templates): the Create template and Apply template actions, their fields, conflict modes, template storage and the template format."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/2451163-entity-templates
---

# Entity templates

Entity templates store a tree of folders and tasks so it can be created again in any project or below any folder. A template can hold, for example, the tasks of a character asset or the default folder structure of a new project. Templates are never applied automatically; each application is started by a user through an action.

Entity templates are a feature of the Power Pack addon (addon name `powerpack`, setting group `hierarchy_templates`) and are available while that addon is part of the production bundle. Templates are stored in the settings of that addon.

## Where it appears

The actions are web actions, listed in the actions menu of the web app for the entities they work on.

| Action | Entity | Description |
|---|---|---|
| **Apply template** | Project | Applies a template at the root of the project. |
| **Apply template** | Folders (one or several) | Applies a template below each selected folder. |
| **Create template** | Folders (one or several) | Saves the selected folders as a template. |

**Apply template** only creates or updates folders and tasks on the AYON server. It does not create directories on disk; that is done by the separate **Create Project Folder Structure** action, which uses the `project_folder_structure` setting of the core addon (`ayon+settings://core/project_folder_structure`).

## Create template

**Create template** opens a form titled **Save template**. The suggested name is `<folder name> Template`.

| Field | Description |
|---|---|
| **Template name** | Name of the template. |
| **Template scope** | **Project** saves the template in the project settings of the Power Pack addon. **Studio** saves it in the studio settings, where it is available to all projects. |
| **Overwrite existing** | When on, a template of the same name and scope is replaced. When off and the name already exists, the form is shown again with a warning that the template exists. |
| **Children only** | When on, the template contains the descendants of each selected folder, not the selected folders themselves. This suits templates for assets or shots, which are applied below a folder. When off, the selected folders are part of the template. |

What is captured:

- For selected folders that are nested in one another, only the top-level ones are used as roots; their descendants are collected from the hierarchy.
- Each folder and task keeps its name, label, status and attributes (including values inherited from above). Tasks also keep their assignees.
- Folder entries keep their folder type and task entries their task type.

Templates are saved to the `production` settings variant.

## Apply template

**Apply template** opens a form titled **Apply template to** the project root, the selected folder, or the number of selected folders.

| Field | Description |
|---|---|
| **Template** | Dropdown of the available templates, each with a **project** or **studio** badge. Project templates are listed before studio templates, unless **Sort alphabetically** is on in the settings. |
| **Fields to apply** | **Status**, **Attributes** and **Task assignees**. Only the chosen fields are written from the template. None chosen means names, labels and types only. |
| **On conflict** | How an entity that already exists (matched by name, case-insensitive, at the same level) is handled: see below. |

If the template contains a repeated entry (see [Template format](#template-format)), a second form titled **Customize template** follows with one number field per repeated entry. Its button is **Apply**.

Conflict modes:

| Mode | Existing folders and tasks | New entities |
|---|---|---|
| **Skip** | Left unchanged. Their children from the template are not processed. | Created. |
| **Merge** | Not updated. Their children from the template are processed, so missing children are added. | Created. |
| **Replace** | Updated with the chosen fields of the template. Their children are processed too. | Created. |

Tasks in a template are created only below a folder; at the project root, task entries are ignored. A success message, **Template applied successfully**, is shown and the hierarchy and task views reload. If no template exists, the action reports **No templates found**.

## Template format

Templates are stored as JSON text in the Power Pack settings, in **studio templates** (studio settings) and **project templates** (project settings). Each template has a **name** and a **template** text field; the text is validated when saved. Names must be unique within each list.

Each template has an `entities` list. Each entry has:

| Key | Description |
|---|---|
| `entity_type` | `folder` or `task`. |
| `entity_subtype` | Folder type or task type. |
| `name`, `label` | Name and optional label. |
| `status` | Optional status. |
| `attrib` | Optional attribute values. |
| `assignees` | Optional list of user names (tasks). |
| `entities` | Optional child entries. |
| `sequence` | Optional repetition: `name` (the form field), optional `label`, and `value` (default count, 10). The entry is created once per count, and `{iter}` in the name is replaced by the counter starting at 1, with an optional format such as `{iter:02d}`. |

## Permissions

**Apply template** is allowed to managers and admins and to users whose access group does not restrict the creation of entities; a user with restricted creation receives **You do not have permission to apply templates.**

## Related

- [Bundles and addons](bundles-and-addons.md)
- [Attributes](attributes.md)
- [Users and permissions](users-and-permissions.md)
- [Addons](../../addons/index.md)
