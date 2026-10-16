---
title: Data import
description: "Data import creates or updates folders, tasks, list items and users from CSV data: the import dialog, column and value mapping, error handling, templates, mapping presets, required columns and permissions."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/4296440-data-import
---

# Data import

**Data import** creates or updates entities in bulk from CSV data. The source columns do not have to match the AYON names: each column and each value of the file is mapped to an AYON field in the import dialog, so exports from other production trackers or spreadsheets can be used as they are. Every import is previewed before anything is written.

## Where it appears

The **Import CSV** button opens the import dialog for the entities of the current page.

| Import | Where the button is | Entities |
|---|---|---|
| Folders and tasks (hierarchy) | Toolbar of the [project overview](project-overview.md) | Folders and tasks, imported together as one hierarchy. |
| List items | Toolbar of the [lists](lists.md) page and the empty state of the list items table | Items added to a list. |
| Users | Users management | User accounts. |

## Import dialog

The dialog is titled **Import &lt;items&gt;**, for example **Import folders and tasks**, and shows the import context and the name of the loaded file. It has five stages.

| Stage | Description |
|---|---|
| **1. Upload file** | The file is dropped on the dialog, chosen with **Choose .csv file with &lt;items&gt;**, or pasted from the clipboard (`Ctrl+V` or `Cmd+V`, for example cells copied from a spreadsheet). The dialog reports the number of columns and rows found. **Download template** downloads a CSV with the expected columns. |
| **2. Map columns** | Every column of the file is mapped to an AYON field or skipped. |
| **3. Review values** | Values of mapped columns are mapped to AYON values. |
| **4. Preview result** | A summary of what the import would do. Nothing is written yet. |
| **5. Import data** | Runs the import and reports the result. |

The uploaded file is held on the AYON server for 30 minutes.

### Map columns

| Element | Description |
|---|---|
| Source column | A column of the file. |
| Target | The AYON field the column is mapped to. Required fields are marked **(required)**. |
| Indicator | Green when the column is mapped, red when it needs attention. A column whose header equals an AYON field name is mapped automatically. |
| **Map** / **Skip** | Skip leaves the column out of the import, for example an internal ID from another system. |
| Error handling | What happens when a value in the column cannot be imported: **Skip Row**, **Set to default value** or **Abort Import**. The available choices depend on the field; for example a name has no default. |
| **Data preview** | The values of the selected column. **Show unique values** lists each distinct value once. Several columns can be selected together. |
| **Continue** | Enabled when every column is resolved and every required target is mapped. The footer shows the number of resolved columns and lists missing required targets. |
| **Restart** | Returns to the upload stage. |

### Review values

Columns that map to fields with a fixed set of values (status, folder type, task type, priority and similar) list their distinct source values.

| Action | Description |
|---|---|
| Map | Maps a source value to an existing value of the project, for example `Medium` to `Normal`, or `Shot` to the folder type of the project. |
| Create | Creates the value, for example a task status, in the project during the import. Not offered for fields whose values cannot be created, such as the entity type. |
| Skip | Leaves out the rows that contain the value. |

### Preview result

| Counter | Meaning |
|---|---|
| Created | New entities. |
| Updated | Rows that match an existing entity. Its attributes are updated instead of creating a duplicate. |
| Skipped | Rows left out by the mapping. |
| Failed | Rows with incompatible data. They are listed with the reason. |

The result of the finished import uses the same counters.

## Fields

### Folders and tasks

Folders and tasks are in the same file; each row is one folder or one task.

| Column | Required | Description |
|---|---|---|
| **Path** (`path`) | Yes | Path of the folder, or of the task including its folder. |
| **Entity type** (`entity_type`) | Yes | `folder` or `task`. Source values such as an object type of another system are mapped in the **Review values** stage. |
| **Folder or Task type** (`folder_or_task_type`) | No | A single column for the folder type and the task type. Alternatively the types are in separate `folder_type` and `task_type` columns. |
| Name, label, status, tags, active, id | No | Fields of folders and tasks. |
| Attributes (`attrib.<name>`) | No | Any attribute of the entity, for example `attrib.priority`. |

The template for hierarchies has the columns `path`, `entity_type`, `folder_type`, `task_type`, `status` and `attrib.priority`.

### List items

| Column | Required | Description |
|---|---|---|
| **Entity Id** (`entity_id`) | One of the two | Id of the folder, task or version to add. |
| **Entity path** (`folder_path`) | One of the two | Path of the folder or task to add. |
| **Entity List Id** (`entity_list_id`) | No | The list the item belongs to. |

### Users

| Column | Required | Description |
|---|---|---|
| **Name** (`name`) | Yes | User name. |
| Email, full name | No | `attrib.email`, `attrib.fullName`. |
| **Admin**, **Developer** | No | `data.isAdmin`, `data.isDeveloper`. Default `False`. |
| Active | No | `active`. |

## Existing entities

The import matches rows with existing entities (folders and tasks by path or id, users by name) and updates them. It never creates a second entity for a row that matches.

## Mapping presets

The column and value mappings of an import can be saved as a **Mapping presets** entry, for repeated imports from the same source, such as a weekly vendor delivery or an export of another tracker. Presets use the same mechanism as [views](views.md): they can be private or shared, saved for one project or for all projects, and set as a studio or project default. Saving and sharing presets is a Power feature; see [Power features](power-features.md).

| Entry | Description |
|---|---|
| **Mapping presets** (button) | Shows the preset menu. Shows the name of the selected preset. |
| Working preset | The current mapping, without a saved preset. |
| My presets | Presets of the user. |
| Default preset | Studio and project defaults. |
| **Create new preset** | Saves the current mapping as a preset. |

## Permissions

| Import | Who |
|---|---|
| Users | Administrators |
| Folders and tasks, list items | Managers, and users of access groups in which neither create nor attribute write restrictions are enabled for the project. |

Exporting the same data as CSV is available to managers. See [Users and permissions](../ayon/web-ui/users-and-permissions.md).

## Related

- [Project overview](project-overview.md)
- [Lists](lists.md)
- [Views](views.md)
- [Attributes](../ayon/web-ui/attributes.md)
- [Users and permissions](../ayon/web-ui/users-and-permissions.md)
