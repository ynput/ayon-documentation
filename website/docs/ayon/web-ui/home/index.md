---
title: Home
description: "The Home space of the AYON web app: how it opens, its Tasks and Projects tabs, the Planner tab or the Plan and Resources pages of the Planner addon, other addon tabs, and what a server without projects shows."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/UserDashboardPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/DashboardAddon.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/UserDashboardNoProjects/UserDashboardNoProjects.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/BookingsPage/BookingsSplashscreen.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/header/AppHeader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/GuestUserPageLocked.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/LoginPage/LoginPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/api/queries/addons/getAddons.ts
---

# Home

Home is the studio-level start page of the web app. It is not tied to one project: it shows the signed-in user's own tasks across projects, the list of all projects the user can reach, and studio pages added by addons, such as resource planning. All its pages live under the route `/dashboard/` and share one row of tabs.

## Where it appears

| Item | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Home | **Home** button in the top bar | `h+h` | `/dashboard/tasks` | Everyone except guests |

The server root `/` and `/dashboard` both redirect to `/dashboard/tasks`, so a sign-in that starts at the root lands on the **Tasks** tab. A sign-in that starts from a link to another page returns to that page. The **Home** button is highlighted while any `/dashboard` page is open.

The URL paths of Home start with `/dashboard`, and the location shown in the middle of the top bar is built from them, so it reads **Dashboard / Tasks** or **Dashboard / Projects**. Both refer to Home. Home is not related to the dashboards of the [Reports addon](../../../addons/production-tracking/reports/index.md), which are a tab of each project.

Guests see a page with the message "Sorry, you don't have access to this page" in place of every Home tab.

## Tabs

| Tab | URL path | Shortcut | Who sees it | Page |
|---|---|---|---|---|
| **Tasks** | `/dashboard/tasks` | `h+h` | Everyone except guests | [Tasks](tasks.md) |
| **Projects** | `/dashboard/projects` | none | Everyone except guests | [Projects](projects.md) |
| **Planner** | `/dashboard/planner` | none | Everyone except guests, when the Planner addon is not in the production bundle | Overview of the [Planner addon](../../../addons/production-tracking/planner/index.md) |
| Addon tabs | `/dashboard/<page>` or `/dashboard/addon/<addon name>` | none | Depends on the addon | Documented with each addon |

The order of the table is the order of the tab row. A help button at the right end of the row (tooltip **Get help for this page**) opens the help article for the open tab, or a support message when there is none.

## Addon tabs

Addons add tabs to Home in two ways.

| Kind | Where it appears | Tab label | Notes |
|---|---|---|---|
| Studio page | `/dashboard/<page>` | Set by the addon | Rendered as part of the web app. The [Planner addon](../../../addons/production-tracking/planner/index.md) adds **Plan** (`/dashboard/bookings`) and **Resources** (`/dashboard/resources`) this way. Such a page can show the project list on the left. |
| Dashboard frontend | `/dashboard/addon/<addon name>` | Addon title | An addon that ships a web frontend for the `dashboard` scope. Shown in a frame, served from `/addons/<addon name>/<version>/frontend`, and receives the signed-in user's session and the current context. An addon can limit its tab to admins or to managers. |

Without the Planner addon in the production bundle, the **Planner** tab shows an overview of what the addon provides in place of **Plan** and **Resources**.

## A server without projects

When the server has no projects, **Tasks** and **Projects** show **No Projects**. Admins and managers also get a **Create first project** button there, which opens the new project dialog and then the project's **Anatomy** page. Addon tabs that do not depend on projects stay usable. See [Creating a project](../../how-ayon-works/creating-a-project.md).

## Related

- [Tasks](tasks.md)
- [Projects](projects.md)
- [Planner addon](../../../addons/production-tracking/planner/index.md)
- [Navigation bar](../navigation-bar.md)
- [Quick navigation and server layout](../quick-navigation.md)
