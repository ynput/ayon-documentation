---
title: Node Graph addon
sidebar_label: Node Graph
description: "The AYON Node Graph addon: a node-based view of a project's entities and the links between them, with a hierarchy browser and a links creator."
addon: nodegraph
addon_repo: "-"
addon_version: 0.3.0
addon_scope: server
addon_flags: [licensed]
addon_unverified: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/5603128-node-graph
---

# Node Graph addon

<AddonInfo />

The Node Graph addon shows a project as nodes and connections in the AYON web app. Entities of the project are drawn as nodes, and the links between them (for example which assets are used in which shots) and the dependencies between tasks are drawn as connections. It also lets users create new links.

## Availability

| Item | Value |
|---|---|
| Market flags | `licensed` |
| Licensing | Premium addon, included with the Studio subscription or an extra with a Pro subscription |
| Maturity | Alpha |
| Where it appears | AYON web app. The graph can be opened from anywhere in the app. |

## In the web app

The graph can be opened from anywhere in the web app to show the links of an entity.

| Feature | What it provides |
|---|---|
| Node-based project view | An overview of the project's structure, with navigation through its components. |
| Relationships | Shows existing links between entities, answering questions such as which assets are in which shots or whether two shots share characters. |
| Workflow view | Shows how tasks depend on each other, for example which tasks must finish before another can start. |
| Hierarchy browser | Browses the project hierarchy and the network of links, with full keyboard and shortcut support. |
| Links creator | Creates links between nodes. |
| Graph from anywhere | Opens the graph from different places in the app to show an entity's links. |

## Related

- [Links manager](../../../production-tracking/links-manager.md)

