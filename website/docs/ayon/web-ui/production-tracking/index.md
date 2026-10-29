---
title: Project production tracking
sidebar_label: Project production tracking
description: "The pages of a project in the AYON web app: how a project opens, its tab row, and the native tabs Overview, Task progress, Products, Lists and Workfiles, next to the tabs that come with addons and plans."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectPage/ProjectPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
---

# Project production tracking

Each project in the web app has its own pages, shown as a row of tabs under the top bar. The location in the middle of the top bar reads **Projects / &lt;project&gt; / &lt;tab&gt;**. A project opens on the tab used last, the **Overview** the first time, and switching to another project from a project page keeps the current tab.

## Where it appears

| Space | Opens from | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Project pages | Project menu in the top bar, or a double click on a project on the [Projects](../home/projects.md) tab of Home | `1` opens the project menu | `/projects/<project>/<tab>` | Users with access to the project; managers and admins for every project |

## Tabs

| Tab | URL path | Page |
|---|---|---|
| **Overview** | `/projects/<project>/overview` | [Overview](overview.md) |
| **Task progress** | `/projects/<project>/tasks` | [Task progress](task-progress.md) |
| **Products** | `/projects/<project>/products` | [Products](products.md) |
| **Lists** | `/projects/<project>/lists` | [Lists](lists.md) |
| **Workfiles** | `/projects/<project>/workfiles` | [Workfiles](workfiles.md) |

The tab row also holds tabs that come with addons and plans: **Review** (the [Review addon](../../../addons/production-tracking/review/index.md)), **Schedule** (the [Planner addon](../../../addons/production-tracking/planner/index.md)) and **Reports** (the [Reports addon](../../../addons/production-tracking/reports/index.md)). They are always in the row; without their addon in the production bundle they show an overview of what the addon provides. Other addons can add tabs of their own. A deprecated **Browser** tab appears only when the server enables it, see [Browser page](browser.md).

## Related

- [Production tracking](../../../production-tracking/index.md)
- [Details panel](../details-panel.md)
- [Quick navigation and server layout](../quick-navigation.md)
