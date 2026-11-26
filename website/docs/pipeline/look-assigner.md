---
title: Look Assigner
description: "The Look Assigner (Look Manager) of the Maya integration: the window that finds the assets in a Maya scene and assigns the latest published look to their nodes."
verified: 2026-11-23
ui_purpose: "Finds the assets in a Maya scene and assigns the latest published look of each to its nodes."
ui_location: "Maya: AYON menu > Look assigner..., or the Look Manager button in the Maya toolbox"
sources:
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/tools/mayalookassigner/app.py
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/tools/mayalookassigner/widgets.py
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/tools/mayalookassigner/models.py
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/tools/mayalookassigner/commands.py
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/tools/mayalookassigner/lib.py
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/api/menu.py
  - https://github.com/ynput/ayon-maya/blob/develop/client/ayon_maya/api/customize.py
---

# Look Assigner

<PageInfo />

:::caution Part of the traditional Maya workflow
The Look Assigner belongs to the `cbId` workflow of the Maya addon: it finds assets through the `cbId` attribute on the nodes, so it needs **Use cbId workflow** on in the [Maya addon settings](../addons/3d-applications/maya/settings.md#general) (on by default). It fits pipelines that exchange geometry as Maya references and Alembic caches. In the [OpenUSD contribution workflow](openusd.md#the-contribution-workflow), each look product carries its own assignments and is layered over the model, so no separate assignment step is needed.
:::

The Look Assigner connects the lookdev department to everyone downstream. A look artist publishes shaders once; lighting, animation or layout scenes that contain the model, often as a reference or a cache, get those shaders back with a few clicks instead of rebuilding or importing shading networks by hand. Because the assignment is driven by the ids that AYON stores on the published geometry, it keeps working when the geometry comes from a cache, a proxy or another namespace, and a new look version is picked up by assigning again.

A published look product holds two things: the Maya file with the shading networks, and a JSON file with the relationships, meaning which shading group belongs to which node and which render attributes sit on the meshes. The tool reads the AYON folder id stored on the scene nodes (the `cbId` attribute), finds the look products published for those folders, and re-applies the latest version of the chosen look to the matching nodes. It is a Maya-only tool, part of the [Maya addon](../addons/3d-applications/maya/index.md), not of the core addon. The window title reads `Look Manager`, the menu entry **Look assigner...**.

## Where it appears

- **AYON menu in Maya:** **Look assigner...**
- **Maya toolbox:** a **Look Manager** button that the AYON integration adds to the toolbox in place of Maya's web button.

The window is created once per Maya session and reused. Its title is `Look Manager 1.4.0 - [<workfile name>]`, where the name is the open scene file or `untitled`.

A typical use:

1. Click **Get All Assets** (or select geometry and click **Get Assets From Selection**).
2. Select one or more assets, or a namespace under an asset, in the **Assets** panel.
3. In the **Looks** panel, right-click the look to apply and choose **Assign looks..**.

## Layout

The window is 750 by 500 pixels and is split into two panels, with a footer.

![The Look Manager window for the workfile cg_sh010_lighting_v003.ma: the Assets panel with Get All Assets and Get Assets From Selection above a tree of assets such as airConditionerA and brickPileA, and the Looks panel with the look Main matching one asset, the Assign to selected only checkbox and the Remove Unused Looks button](assets/look-assigner/look-manager.png "Look Manager")

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

## Requirements

The tool has no permission gate and no settings of its own. It needs a project context on the Maya session and read access to the project's products and published files. It lists products of the product type `look`, which the Maya look creator and publish plugins produce (see [Maya addon](../addons/3d-applications/maya/index.md)), and relies on the `cbId` workflow described above.

The [Templated workfile builder](template-builder.md) in Maya offers an **Assign Look** placeholder that applies a look product to the containers loaded by other placeholders, the same kind of assignment without opening the tool.

## Related

- [Maya addon](../addons/3d-applications/maya/index.md): the AYON menu, the look creator and the look validators.
- [Maya rendering and renderers](../addons/3d-applications/maya/rendering.md): Arnold standins and V-Ray proxies that can take looks.
- [Publisher](publisher.md): publishes the look products.
- [Loader](loader.md) and [Scene Inventory](scene-inventory.md): load and manage published products in a scene. Loaded looks appear as containers.
- [Product types](product-types.md): the `look` product type.
