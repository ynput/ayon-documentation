---
title: Links manager
description: "Links are typed, static relationships between entities of a project; the links manager shows and edits them from the link columns of project tables."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/1802697-links-manager
---

# Links manager

A link is a stored relationship between two entities of the same project, for example a breakdown from a shot folder to an asset folder or a reference between two versions. Links are permanent data, so they can be analyzed, displayed and used by pipeline automation, unlike relationships derived from events. The links manager is the popover of the web app that lists the links of one entity for one link type and edits them.

## Link types

Every project defines its own link types in its anatomy (the project anatomy). A link type has:

| Field | Meaning |
|---|---|
| Link type | The name of the relationship, for example `breakdown`. |
| Input type | The entity type the link starts at (folder, task, product, version, representation or workfile). |
| Output type | The entity type the link points to. |
| Color | Color used when links are visualized. |
| Style | `solid` or `dashed`. |

The full name of a link type is `link type|input type|output type`, for example `breakdown|folder|folder`. Several link types can share the same name with different entity types.

New projects contain these link types, which cannot be deleted:

| Link type | Input | Output |
|---|---|---|
| `generative` | version | version |
| `breakdown` | folder | folder |
| `reference` | version | version |
| `template` | folder | folder |

An entity cannot be linked to itself.

## Where it appears

Each link type adds two columns, labeled with the capitalized link type and the direction, to the task, folder, product and version tables of the [project overview](production-tracking/overview.md), the [products and versions](production-tracking/products.md) page and [lists](production-tracking/lists.md):

| Column | Shows |
|---|---|
| **Breakdown (in)** | Links that point to the entity (the entity is the output). The icon is the input entity type. |
| **Breakdown (out)** | Links that start at the entity (the entity is the input). The icon is the output entity type. |

Cells show the linked entities as chips. Opening a cell opens the links manager for that entity and link type. The columns can be shown, hidden and reordered like other columns (see [Views](views.md)).

## Layout

| Region | Content |
|---|---|
| Header | The link type and direction, for example **Breakdown links (in)**, and a close button (**Escape**). |
| Link list | One row per linked entity: icon, folder path and name, and the entity subtype. A row of an entity the user cannot read shows **Access Restricted**; for managers and administrators it shows **Unknown**. |
| **Add new link** | A search field (**Search &lt;entity type&gt;s...**) and a **Pick &lt;entity type&gt;s** button that opens an entity picker with multi-selection. |

## Controls

| Control | What it does |
|---|---|
| Row click | Opens the linked entity when the page supports it. |
| Unlink icon | Removes the link. On a grouped row it removes all links to that entity (**Remove all N links**). Not shown for restricted entities unless the user is a manager or administrator. |
| Count badge (**x5**) | Shown when several links connect the same two entities. Selecting it opens an input; entering a number creates or removes links until the count matches. |
| Search field | Finds entities of the target type by name; arrow keys and `Enter` select a result. |
| **Pick** button | Opens the entity picker, which starts on the current folder. |

Multiple links between the same pair of entities are grouped into one row.

## Copy and paste

Selected link cells can be copied and pasted between entities in the tables.

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + C` | Copy the links of the selected cells. |
| `Ctrl/Cmd + V` | Paste and replace the existing links of the target cell with the copied ones. |
| `Shift + Ctrl/Cmd + V` | Paste and add the copied links to the existing ones, skipping duplicates. |

A paste that would link an entity to itself is rejected.

## Other ways links are created

| Source | Description |
|---|---|
| Publishing | The pipeline creates links from workfile scenes and published products. |
| REST API | A link is created with the `input` and `output` entity ids and a `linkType`, and optionally a `name` and `data`. Bulk creation accepts many links in one transaction. |
| Addons and services | Addons can create and read links, for example a `taskFlow` link type from tasks to tasks created when tasks are created, or status changes derived from links at publish. |

## Permissions

- Creating links requires an access group that allows the link type: the **Restrict entity links creation** permission whitelists the link types a user can create. Managers and administrators are not restricted.
- Defining or deleting link types requires write access to the project anatomy.

## Related

- [Project overview](production-tracking/overview.md)
- [Lists](production-tracking/lists.md)
- [Users](studio/users.md)
- [Details panel](details-panel.md)
