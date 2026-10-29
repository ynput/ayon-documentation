---
title: Web UI
sidebar_label: Web UI
description: "The Web UI section of AYONpedia: a reference of the AYON server web app that mirrors it one page per tab, covering the native features available in every edition without a subscription, and where the explanations and the features of plans and addons are described."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectPage/ProjectPage.tsx
---

# Web UI

The AYON server comes with a web app, opened in a browser at the address of the server. This section is a reference of that web app: it follows the app one page per tab, grouped the way the app groups them, and describes what each screen shows, its buttons and controls, and who can use them. Page and tab names are the names the app shows, so a page here can be found by the label on the screen.

## Scope

The section covers the native features of the AYON server, the ones every edition has, including the free Community edition without a subscription.

| Topic | Where it is described |
|---|---|
| Screens, tabs, buttons and controls of the native web app | This section |
| How things work: bundles, projects, permissions, storage, daily work | [How AYON works](../how-ayon-works/index.md) |
| Entities, attributes and settings scopes | [Backend](../backend/data-model/index.md) |
| Production tracking features explained, and the features added by plans and addons, such as review sessions, the Planner and its **Schedule** tab, **Reports** and the power features | [Production tracking](../../production-tracking/index.md) and [Addons](../../addons/index.md) |
| What each plan includes | [Plans](../plans.md) |

Some screens show a control only when an addon is installed or the server has a plan that includes it. Those controls are named where they appear, and the feature itself is described with its addon or in the Production tracking section.

## Spaces

| Space | Opens from | Pages |
|---|---|---|
| [Home](home/index.md) | **Home** button, `h+h` | [Tasks](home/tasks.md), [Projects](home/projects.md) |
| [Studio configuration](studio/index.md) (**Studio Settings**) | App menu, `s+s` | [Global](studio/global.md), [Addons](studio/addons.md), [Bundles](studio/bundles.md), [Studio settings](studio/studio-settings.md), [Site settings](studio/site-settings.md), [Anatomy presets](studio/anatomy-presets.md), [Attributes](studio/attributes.md), [Users](studio/users.md), [Permissions](studio/permissions.md), [Secrets](studio/secrets.md) |
| [Project configuration](project/index.md) (**Projects Manager**) | App menu, **Projects Settings**, `p+p` | [Anatomy](project/anatomy.md), [Project settings](project/project-settings.md), [Project permissions](project/project-permissions.md), [Project access](project/project-access.md), [Site settings](project/site-settings.md), [Roots](project/roots.md), [Teams](project/teams.md) |
| [Project production tracking](production-tracking/index.md) | Project menu, `1` | [Overview](production-tracking/overview.md), [Task progress](production-tracking/task-progress.md), [Products](production-tracking/products.md), [Lists](production-tracking/lists.md), [Workfiles](production-tracking/workfiles.md), [Browser](production-tracking/browser.md) (deprecated) |
| [Inbox](inbox/index.md) | Inbox icon, `i+i` | [Important](inbox/important.md), [Other](inbox/other.md), [Cleared](inbox/cleared.md) |
| [Account](account/index.md) | User menu, `0` | [Profile](account/profile.md), [Sessions](account/sessions.md), [Launchers](account/launchers.md) |
| [Dialogs](dialogs/index.md) | Buttons on several pages | [First-run setup](dialogs/first-run-setup.md), [Install pipeline release](dialogs/install-pipeline-release.md), [Copy settings](dialogs/copy-settings.md), [Upload version](dialogs/upload-version.md), [Import CSV](dialogs/import-csv.md) |
| Single pages | App menu and Help menu | [Market](market.md), [Services](services.md), [Event Viewer](event-viewer.md), [GraphQL Explorer](graphql-explorer.md), [REST API](rest-api.md) |

The top bar and its menus are described on the [Navigation bar](navigation-bar.md) page, the side panel that opens for a selected entity on almost every page on [Details panel](details-panel.md), the player of versions and reviewables on [Web viewer](web-viewer.md), the saved layouts of the pages on [Views](views.md), the link columns and their editor on [Links manager](links-manager.md), and the quickest ways around the app, with every keyboard shortcut, on [Quick navigation and server layout](quick-navigation.md).

## Related

- [Quick navigation and server layout](quick-navigation.md)
- [Navigation bar](navigation-bar.md)
- [Details panel](details-panel.md)
- [Web viewer](web-viewer.md)
- [Views](views.md)
- [Links manager](links-manager.md)
- [How AYON works](../how-ayon-works/index.md)
- [Production tracking](../../production-tracking/index.md)
