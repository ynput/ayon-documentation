---
title: Browser page (deprecated)
description: "The legacy Browser page lists the products published in a folder; it is deprecated and replaced by the Products page."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7648006-browser-page-deprecated
---

# Browser page (deprecated)

The **Browser** page lists the products and versions published to a project, folder by folder. It is deprecated and not maintained. The [Products and versions](products.md) replaces it.

## Where it appears

| Item | Value |
|---|---|
| Project navigation bar | **Browser**, marked as deprecated |
| URL path | `/projects/<project>/browser` |
| Availability | Hidden by default. The server configuration setting **Frontend Flags**, option **Enable legacy version browser page**, shows it in the navigation. |

## Layout

| Region | Content |
|---|---|
| Left | Folder hierarchy with the task list of the selected folder. |
| Middle | Products published in the selected folder, showing the latest version of each. |
| Right | Details panel of the selected product or version. |

## Controls

| Control | What it does |
|---|---|
| Version dropdown (version column) | Switches the version shown for a product. |
| View mode toggle | **List View**, **Card View** (thumbnails) and **Grouped View**. |
| `Space` | Opens the reviewable media of the selected version in the player. |

## Related

- [Products and versions](products.md)
- [Details panel](../details-panel.md)
