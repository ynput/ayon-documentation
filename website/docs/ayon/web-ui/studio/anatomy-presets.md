---
title: Anatomy presets
description: "The Anatomy presets tab of the AYON Studio Settings: the preset list, the built-in AYON default, the primary preset, creating, renaming, deleting and editing presets, what a preset contains, and how presets are used when a project is created."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AnatomyPresets/AnatomyPresets.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AnatomyPresets/PresetList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AnatomyPresets/PresetNameDialog.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AnatomyEditor.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/NewProjectDialog/AnatomyPresetDropdown.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/anatomy/__init__.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/settings/anatomy/__init__.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/settings/enum.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/deploy.py
---

# Anatomy presets

An anatomy preset is a stored template of a project anatomy: roots, path templates, entity naming, project attributes and the lists of folder types, task types, link types, statuses, tags and product type appearance. The **Anatomy presets** tab manages these templates. A new project copies a preset into its own anatomy; after that, the project and the preset are independent (see [Creating a project](../../how-ayon-works/creating-a-project.md#the-anatomy-preset-becomes-the-projects-own-anatomy)).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Anatomy presets | Studio Settings, **Anatomy presets** | none | `/settings/anatomyPresets` | Managers and admins |

The path `/settings` without a tab also opens this tab.

## Layout and controls

The tab has the preset list on the left and the anatomy editor of the selected preset on the right, with a toolbar above it.

### Preset list

| Column | Content |
|---|---|
| **Name** | The preset name. The first row is the built-in anatomy, **AYON default (read only)**, followed by the stored presets in alphabetical order. |
| **Primary** | A check mark on the primary preset. When no stored preset is primary, **AYON default (read only)** carries it. |

On opening, the primary preset is selected.

Right-click menu on a stored preset:

| Entry | What it does |
|---|---|
| **Set as primary** | Makes the preset primary. Disabled on the primary preset. |
| **Rename** | Opens **Rename Preset** with the field **New preset name** and a **Save** button. |
| **Delete** | Asks for confirmation (**Delete Preset: &lt;name&gt;**), then deletes the preset. |

All three entries are disabled on **AYON default (read only)**.

### Toolbar

| Control | What it does |
|---|---|
| **Copy anatomy** | Copies the anatomy shown in the editor as JSON to the clipboard. |
| **Paste anatomy** | Replaces the anatomy in the editor with JSON from the clipboard, as an unsaved change. Messages: **No content to paste**, **Invalid JSON**. |
| **Set as primary** | Makes the selected preset primary. With **AYON default (read only)** selected, it clears the primary flag, so the built-in anatomy becomes the default again. Disabled when the selected preset is already primary. |
| **Delete preset** | Deletes the selected preset after a confirmation. Disabled for **AYON default (read only)**. |
| **Save as a new preset** | Opens **Create New Preset** with the field **Preset name** and a **Save** button, and saves the anatomy in the editor under that name. Highlighted when **AYON default (read only)** is selected. A name that already exists is overwritten. |
| **Save Current Preset** | Saves the editor content to the selected preset. Active when the anatomy was changed and a stored preset is selected. |

The built-in anatomy can be edited in the editor, but only saved as a new preset. Selecting another preset discards unsaved edits without a warning.

### Anatomy editor

The editor is the settings editor used across the web app, with the sections of the anatomy model. Right-clicking a field or group offers **Copy** and **Paste** for that part of the anatomy (the pasted structure must match).

| Section | Content |
|---|---|
| **Entity Naming** | Capitalization and separator used to suggest folder and task names from labels. |
| **Roots** | Named storage locations with one path each for **Windows**, **Linux** and **Darwin**. |
| **Templates** | Version and frame padding and templates, and the template groups **Work**, **Publish**, **Hero**, **Delivery**, **Staging directories** and **Others**. |
| **Attributes** | The project attributes (every attribute whose scope includes projects), with the defaults of the attribute definitions. They become the attribute values of a new project. |
| **Folder types** | Folder types with short name, color and icon. |
| **Task types** | Task types with short name, color and icon. |
| **Link types** | Link types with input and output entity type, color and line style. |
| **Statuses** | Statuses with short name, state, icon, color and the entity types they apply to. |
| **Tags** | Tags with their colors. |
| **Product Types** | **Default appearance** (color and icon) and **Appearance overrides** of product base types in the web app. |

Names in **Roots**, **Folder types**, **Task types**, **Statuses** and **Tags** must be unique within their list; saving a preset with duplicates fails. The meaning of roots, templates and entity naming is described in [Naming conventions](../../../pipeline/naming-conventions.md#project-anatomy) and [Pipeline storage](../../how-ayon-works/pipeline-storage.md); types, statuses and tags in [Data model](../../backend/data-model/index.md#statuses-types-and-tags).

## The primary preset

At most one stored preset is primary. When none is, the built-in anatomy plays its role.

| Where | How the primary preset is used |
|---|---|
| **Create a new project** dialog | Preselected in the preset dropdown, labelled `<name> (primary)`. The dropdown also lists **AYON default** and every stored preset. |
| Project creation through the API | Used when the request sends no anatomy and names no preset. |
| Studio-level addon settings | Settings that offer anatomy template names or link types as choices list those of the primary preset. Project-level settings list those of the project's own anatomy. |

Changing the primary preset, or editing a preset, does not change existing projects. Each project edits its own copy on its [Anatomy](../project/anatomy.md) page.

## Permissions

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Anatomy presets** | Yes | Yes | No |
| Create, save, rename, delete presets | Yes | Yes | No |
| Set or clear the primary preset | Yes | Yes | No |
| Read presets (for example in the **Create a new project** dialog) | Yes | Yes | Yes |

## Related

- [Creating a project](../../how-ayon-works/creating-a-project.md)
- [Pipeline storage](../../how-ayon-works/pipeline-storage.md)
- [Naming conventions](../../../pipeline/naming-conventions.md)
- [Data model](../../backend/data-model/index.md)
- [Project anatomy](../project/anatomy.md)
- [Attributes](attributes.md)
- [Studio configuration](index.md)
