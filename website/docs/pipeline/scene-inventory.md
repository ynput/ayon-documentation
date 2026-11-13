---
title: Scene Inventory
description: "The Scene Inventory tool of AYON integrations: listing the loaded products of the open scene, their versions and statuses, and updating, switching, locking and removing them."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/9770233-scene-inventory
---

# Scene Inventory

The Scene Inventory lists what was loaded into the open scene with the [Loader](loader.md) and manages it. Every loaded item is a container that records the representation it came from. The tool compares each container with the published versions of its product, marks outdated ones, and changes the version, the folder, the product or the representation of the containers, or removes them. It is also known as the manager and in some integrations as **Inventory**.

## Where it appears

| Item | Value |
|---|---|
| Menu entry | **Manage...** in the AYON menu of the DCC integrations. |
| Maya | The toolbox button **Inventory**, in addition to the menu entry. |
| Outdated content pop-up | Maya, Houdini and Fusion show a pop-up when a scene with outdated containers opens. Its button opens the tool. |
| Publishing | The validator **Validate Outdated Containers** has the action **Show Inventory**. |
| Window title | **AYON Scene Inventory**, followed by the host name. |
| Requirement | The integration must be able to list and load containers (the load host interface). The list refreshes when the window opens and when the refresh button is pressed, not while the scene changes. |

## Layout

A toolbar sits above the container tree.

| Control | What it does |
|---|---|
| **Search** input | Filters the tree by name (placeholder **Filter by name...**). Matches are case-insensitive substrings of the name; a group stays visible when its name or the name of one of its containers matches. |
| **Filter to outdated** checkbox | Shows only groups whose loaded version is not the latest (tooltip "Show outdated files only"). |
| Update arrow button | Updates all outdated containers to the latest version (tooltip "Update all outdated to latest version"). Hero versions are skipped. |
| Refresh button | Reloads the containers and versions (tooltip "Refresh"). |

The tree contains one group row per loaded representation, with the containers that use it as children. The group row is named `<folder name>_<product name>: (<representation name>)`, shown in bold with a folder icon. A container row shows the namespace of the container with a file icon.

### Columns

| Column | Content |
|---|---|
| **Name** | Group name, or namespace of the container. |
| **Version** | Loaded version, for example `v003`. A hero version is written `[v003]`. The text is red when the version is not the latest. Container rows are grey. A lock icon marks locked versions. |
| **Status** | Status of the loaded version, with icon and color. |
| **Count** | Number of containers in the group. |
| **Product type** | Product type with its icon. |
| **Group** | Product group of the product. |
| **Loader** | Name of the loader plugin that created the container. |
| **Object name** | Name of the container object in the scene. |
| **Active site**, **Remote site** | Site Sync only. Synchronization progress of the representation on each site in percent, with the icon of the site provider. Hidden when Site Sync is off. |
| **Project** | Project of the loaded entity. A scene can contain content of several projects. |

## States

| State | Appearance and effect |
|---|---|
| Up to date | The loaded version is the latest version of the product, or a hero version made from the latest version. |
| Outdated | The version text of the group is red. The group counts for **Filter to outdated** and for the update arrow. |
| Entity not found | The representation, version or product cannot be found. The group is named `< Entity N/A >` with an exclamation icon, the version reads **N/A**, and only **Remove items** is available. |
| Locked version | A container that has `version_locked` set. A lock icon appears next to the version (an open lock when only some containers of the group are locked). The tooltips are "Version is locked" and "Some versions are locked". Updates skip locked containers. |

## Context menu

A right click opens the menu for the selected rows. An entry used on a group row applies to all containers of the group. Which entries appear depends on the selection.

| Entry | Shown when | What it does |
|---|---|---|
| **Switch to versioned** | A selected container uses a hero version and the version it was made from exists | Replaces the hero version by that numbered version. |
| **Update to last approved** | A version with a status of the done state exists and differs from the loaded version | Updates to the latest version whose status belongs to the done state. |
| **Update to latest** | A selected container is outdated or uses a hero version | Updates to the latest numbered version. |
| **Change to hero** | A hero version exists for a selected product | Switches to the hero version. |
| **Set version** | A container is the active row | Opens **Select version**: **Set version number to** and a drop-down with the versions of the selected products (hero versions in brackets). Statuses are shown when the selection holds one product. **OK** and **Cancel**. |
| **Switch Folder** | The selection has containers whose entities exist | Opens the switch dialog. |
| **Remove items** | Always | Asks **Are you sure?** and removes the containers from the scene. |
| **Download**, **Upload** | Site Sync is enabled | Resynchronizes the representations to the active site or the remote site. |
| **Expand all items**, **Collapse all items** | Always | Expands or collapses the tree. |
| **Actions** | An inventory action matches | Submenu with the inventory actions that integrations and addons register for the selected containers, for example **Select in scene** or **Import Reference**, and **Remove and load** from the core addon. |
| **Cherry-Pick (Hierarchy)** | Rows are selected | Shows only the selected containers. The border of the tree turns orange. A cherry-pick can be narrowed again. |
| **Back to Full-View** | Cherry-pick is active | Returns to the full list. |

Updates run per container. When one fails, the dialog **Update failed** shows the error, and its **Switch Folder** button opens the switch dialog for the container. The list refreshes after every change.

### Switch dialog

The dialog **Switch selected items ...** changes the source of the selected containers. It has four columns.

| Column | Content |
|---|---|
| Project | A searchable list of projects (placeholder `<project>`). |
| Folder | A folder field that opens a **Select folder** dialog with the filter **Filter folders..**. The button **Use current folder** is enabled when the scene has a folder context. |
| Product | A searchable list (placeholder `<product>`). |
| Representation | A searchable list (placeholder `<representation>`). |

Under each column a label shows the target value, or **\*No changes** when the column keeps its current value. A column that cannot be matched shows **\*Please select** with a red border. The confirm button stays disabled until the combination is valid: the target folder, product and representation must exist for every selected container. The arrow of the confirm button lists the loaders that can switch the containers. Several containers can be switched together when the target exists for each of them. A failed switch shows **Switch asset failed**.

Possible changes include a new representation only (for example from `ma` to `abc`), a new product, and a new folder, each with or without keeping the other fields where the target has them.

## Permissions and settings

| Item | Effect |
|---|---|
| Integration | Lists and edits containers through the host. The loaders and inventory actions available depend on the integration and its addon settings. |
| Core addon setting group **Publish** > **Validate Outdated Containers** | Profiles by **Host names** with **Enabled**, **Optional** and **Active**. Controls whether publishing fails on outdated containers. See [Core addon settings](../addons/essentials/core/settings.md). |
| Site Sync addon | Adds the site columns and the **Download** and **Upload** entries. |
| Project statuses | Status names, colors and icons, and which statuses belong to the done state (used by **Update to last approved**). |

## Related

- [Loader](loader.md) and [Browser](browser.md): create the containers.
- [Workfiles](workfiles.md) and [Publisher](publisher.md): the other tools of the integration menu.
- [Product types](product-types.md).
