---
title: Look Assigner
description: "The Look Assigner (Look Manager) of the Maya integration: the window that finds the assets in a Maya scene and assigns the latest published look to their nodes."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/6062888-look-assigner
---

# Look Assigner

The Look Assigner applies published looks to the models in a Maya scene. A published look stores two things: the shading networks and the information about which shading network belongs to which model, and the render attributes that sit on the meshes. The tool reads the AYON folder id stored on the scene nodes, finds the look products published for those folders, and re-applies the latest published version of the chosen look to the matching nodes. The window title reads `Look Manager`, the menu entry reads **Look assigner...**. It is a Maya-specific tool and is part of the Maya addon, not of the core addon.

## Where it appears

| Location | Entry |
|---|---|
| AYON menu in Maya | **Look assigner...** |
| Maya toolbox | A **Look Manager** button, added to the toolbox by the AYON integration (it replaces Maya's web button). |

The window is created once per Maya session and reused. Its title is `Look Manager 1.4.0 - [<workfile name>]`, where the name is the open scene file or `untitled`.

## Layout

The window is 750 by 500 pixels and is split into two panels, with a footer.

| Region | Content |
|---|---|
| **Assets** panel (left) | Two buttons, **Get All Assets** and **Get Assets From Selection**, above a tree of the assets found in the scene. |
| **Looks** panel (right) | Table of look products available for the selected assets, a checkbox **Assign to selected only**, and the button **Remove Unused Looks**. |
| Footer | Status bar with short messages, and a red warning "Current Layer is not defaultRenderLayer" that appears while another render layer than `defaultRenderLayer` is active. |

### Assets panel

The tree has one top-level entry for each AYON folder found in the scene, labeled with the folder path, and one child for each Maya namespace the folder's nodes appear in (`(no namespace)` for nodes without one). Assets are found through the folder id attribute stored on the nodes, including nodes inside references, VRayProxy nodes and Arnold stand-in or GPU cache nodes whose cached geometry carries ids. Folder ids that do not exist in the project are skipped with a warning in the log.

| Control | What it does |
|---|---|
| **Get All Assets** | Scans all non-intermediate nodes of the scene and fills the tree. |
| **Get Assets From Selection** | Scans only the selected nodes and their children. |
| Selection | Extended selection; selecting entries fills the **Looks** panel. Selecting a namespace child restricts assignment to that namespace; selecting the top-level entry covers all of its namespaces. |
| Right-click menu **Select nodes** | Selects the Maya nodes that belong to the selected assets. Disabled when no entry is under the cursor. |

Refreshing keeps the expanded rows and the selection.

### Looks panel

The table lists, for the selected assets, every product of product type `look` that exists for their folders.

| Column | Content |
|---|---|
| Label | The look product name; a leading `look` is removed for readability. |
| `match` | The number of selected assets that have this look. |

The table is sorted by label. Entries can be selected with the extended selection.

| Control | What it does |
|---|---|
| Right-click menu **Assign looks..** | Assigns the selected looks to the selected assets. |
| **Assign to selected only** | When on, only the currently selected Maya nodes receive the look. When off (default), all nodes of the asset in the scene do. |
| **Remove Unused Looks** | Removes loaded look containers (`LookLoader`) whose shader sets have no members in the scene. |

## How assignment works

| Step | Behavior |
|---|---|
| Matching | For each selected asset, the first look of that asset whose name is among the selected looks is used. An asset without a matching look is skipped, and the status bar reports it. |
| Version | The latest version of the look product is used. |
| Loading | The look's Maya file is loaded with the `LookLoader` if it is not loaded yet; an already loaded look is reused. |
| Relationships | The look's relationship data (JSON representation) is read and the shaders and attributes are applied to the nodes of the asset. |
| Special nodes | VRayProxy nodes are handled when the V-Ray plug-in is loaded, and Arnold stand-ins when the Arnold plug-in is loaded; GPU cache nodes are included only when the current renderer is Arnold. Without the plug-in the status bar says the assignment to those node types was not possible. |
| Result | The status bar shows the progress per asset and `Finished assigning..` with the elapsed time. |

## Permissions and settings

The tool has no permission gate and no settings of its own. It needs a project context on the Maya session and read access to the project's products and published files. The look products it lists are those published by the Maya look publish plugins; the product type must be `look`.

## Related

- [Publisher](publisher.md): publishes the look products.
- [Loader](loader.md) and [Scene inventory](scene-inventory.md): load and manage published products in a scene. Loaded looks appear as containers.
- [Product types](product-types.md): the `look` product type.
- [Workfiles](workfiles.md)
