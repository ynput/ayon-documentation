---
title: Node Graph addon
sidebar_label: Node Graph
description: "The AYON Node Graph addon: a project page that draws the folder hierarchy and the entity links of a project as a node graph, and creates and deletes links between entities."
addon: nodegraph
addon_repo: ayon-nodegraph
addon_version: 0.3.0
addon_scope: server
addon_flags: [licensed]
addon_private: true
verified: 2026-10-19
sources:
  - https://help.ayon.app/en/articles/5603128-node-graph
---

# Node Graph addon

<AddonInfo />

The Node Graph addon adds a page to every project of the AYON web app that draws the project as a graph of nodes. It has two modes: **Hierarchy** shows the structure of the project (folders, products, tasks, versions, representations and workfiles) around the selected folders, and **Links** shows the entity links between those nodes and creates and deletes them. The addon consists of a web frontend only: it has no settings, no client code and no services.

## Requirements

| Requirement | Value |
|---|---|
| AYON server | No minimum version is declared by the addon |
| Required addons | None |
| Client and services | None. The addon is a server addon with a project-scoped web frontend. |

## Where it appears

| Item | Value |
|---|---|
| Project navigation | An entry named **Node Graph** opens the page at `/projects/<project>/addon/nodegraph`. |
| Hierarchy sidebar | The page shows the project's folder hierarchy on the left. The folders selected there become the focus of the graph. |
| Restrictions | The addon sets no administrator or manager restriction, so the page is listed for every user who can open the project. |

The graph is rebuilt whenever the folder selection in the hierarchy sidebar changes. The page does not provide entry points in other pages of the web app.

## Modes

| Mode | What the graph shows |
|---|---|
| **Hierarchy** | The selected folders with their parent folder and their children. Folders have folders, products and tasks as children, products have versions, tasks have versions and workfiles, versions have representations. Edges are drawn parent to child. This is the default mode. |
| **Links** | The same nodes connected by the entity links of the project instead of the hierarchy. Each edge is drawn in the color and line style (solid or dashed) of its link type. |

The mode can be switched from the top bar or with the keyboard.

## Nodes

| Node | Content |
|---|---|
| Entity node | Label of the entity with an icon taken from the project anatomy (folder type, task type) or from the product type. Selecting or hovering a node shows the names of its parent entities in a tooltip. |
| Leaf nodes | Representations and workfiles end the hierarchy and cannot be expanded. |
| Pinned node | A node that stays visible when the entity filters hide its type. A pin icon marks it. The focus nodes of a rebuilt graph are pinned. |

## Node tools

Selected nodes show a toolbar with four tools. Each tool also has a keyboard shortcut that acts on the node under the pointer or on the selection.

| Tool | Key | What it does |
|---|---|---|
| Upstream | `A` | Toggles the nodes that feed into the selected nodes (their inputs in the current mode). |
| Regraph | `S` | Rebuilds the Hierarchy and Links graphs around the selected nodes. |
| Pin | `W` | Pins or unpins the selected nodes. |
| Downstream | `D` | Toggles the nodes that the selected nodes feed into (their outputs in the current mode). |

Upstream, Downstream and Regraph are disabled for representations and workfiles. Pin is disabled for workfiles. A short message at the node reports a shortcut that is not available.

## Side panel

| Panel | What it provides |
|---|---|
| Filters | One toggle per entity type: Folder, Product, Task, Version, Representation and Workfile. A hidden type disappears from the graph, except pinned nodes. |
| Tooltips | Controls the parent-name tooltips of nodes: **Always**, **Hover** (default) or **Off**. |
| Links | Lists the link types of the project with their color, line style and the entity types of both ends. |

The panel can be collapsed. The top bar also offers a link type selector and a **Share** button.

## Creating and deleting links

Links are stored in the AYON server through the project links endpoints, so they are the same links that the [links manager](../../../ayon/web-ui/links-manager.md) shows.

| Action | Behavior |
|---|---|
| Create a link | Connecting the output handle of one node to the input handle of another creates a link if the project has a link type whose input and output types match the two entity types. Connecting nodes of several selected entities creates a link for each valid pair. |
| Choosing the link type | With a link type chosen in the top bar, that type is used. Otherwise a menu offers the matching link types, or reports that no link type matches. |
| Connecting in Hierarchy mode | The page switches to Links mode first, and the link type has to be chosen again. |
| Failed or duplicate link | A short error message appears at the target node. A link that already exists is not created twice. |
| Delete a link | The close button on a link edge deletes the link on the server. If the server rejects the deletion, the edge is restored and an error message is shown. |

Link types are defined in the project anatomy, not by the addon. Task-to-task links, for example task dependencies, appear in the graph only if the project defines a link type between tasks. The addon has no separate workflow or dependency view.

## Sharing a graph

**Share** (also `Shift+S`) opens a dialog with a URL of the current page that stores the graph state: pinned nodes, expanded upstream and downstream nodes and node positions, compressed into a `d` query parameter. Opening that URL restores the graph. Above 2000 characters the dialog warns that older browsers may not support the length, and above 8192 characters the URL cannot be copied.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `A`, `S`, `D`, `W` | Upstream, Regraph, Downstream, Pin on the hovered or selected nodes |
| `Shift+Q` | Switch between Hierarchy and Links mode |
| `Shift+M` | Collapse or expand the side panel |
| `Shift+S` | Share |
| `Shift+I` | Cycle the tooltips setting |
| `Shift+F`, `Shift+P`, `Shift+T`, `Shift+V`, `Shift+R`, `Shift+W` | Toggle the Folder, Product, Task, Version, Representation and Workfile filter |

The canvas pans with the scroll wheel or with the middle and right mouse buttons, and a drag on empty canvas selects nodes.

## Related

- [Links manager](../../../ayon/web-ui/links-manager.md)
