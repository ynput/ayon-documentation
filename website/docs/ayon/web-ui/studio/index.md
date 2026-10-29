---
title: Studio configuration
sidebar_label: Studio configuration
description: "The Studio Settings space of the AYON web app: how it opens, which tabs it has (Global, Addons, Bundles, Studio settings, Site settings, Anatomy presets, Attributes, Users, Permissions, Secrets and addon tabs) and which role sees each one."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/SettingsPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/header/AppNavLinks.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/AppMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/shortcuts/ShortcutsContext.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/api/queries/addons/getAddons.ts
---

# Studio configuration

The studio configuration, called **Studio Settings** in the web app (its header and App menu entry), configures the whole AYON server rather than one project: the server configuration, installed addons and bundles, the studio values of addon settings, anatomy presets, attributes, users, access groups and secrets. All its pages live under the route `/settings/` and share one row of tabs. Per-project configuration is in **Projects Settings** instead.

## Where it appears

| Item | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Studio Settings | **App** menu, **Studio Settings** | `s+s` | `/settings/studio` | Managers and admins |
| Site Settings | **App** menu, **Site Settings** | `s+s` | `/settings/site` | Users (in place of **Studio Settings**) |

The `s+s` shortcut opens `/settings/studio` for everyone. A user without the manager role is sent on to the first tab they may open, which is **Site settings**. The bare path `/settings` opens **Anatomy presets**.

The browser tab title is the name of the open tab followed by `• Studio settings`.

## Tabs

The tab row shows only the tabs the signed-in user may open. Opening the URL of a hidden tab redirects: managers who open **Addons** or **Bundles** go to the start page, and users who open a manager tab go to **Site settings**.

| Tab | URL path | Shortcut | Who sees it | Page |
|---|---|---|---|---|
| **Global** | `/settings/server` | none | Admins | [Global](global.md) |
| **Addons** | `/settings/addons` | none | Admins | [Addons](addons.md) |
| **Bundles** | `/settings/bundles` | `b+b` | Admins | [Bundles](bundles.md) |
| **Studio settings** | `/settings/studio` | `s+s` | Managers and admins | [Studio settings](studio-settings.md) |
| **Site settings** | `/settings/site` | none | Everyone | [Site settings](site-settings.md) |
| **Anatomy presets** | `/settings/anatomyPresets` | none | Managers and admins | [Anatomy presets](anatomy-presets.md) |
| **Attributes** | `/settings/attributes` | none | Managers and admins | [Attributes](attributes.md) |
| **Users** | `/settings/users` | `u+u` | Managers and admins | [Users](users.md) |
| **Permissions** | `/settings/accessGroups` | none | Managers and admins | [Permissions](permissions.md) |
| **Secrets** | `/settings/secrets` | none | Managers and admins | [Secrets](secrets.md) |
| Addon tabs | `/settings/addon/<addon name>` | none | Managers and admins | Documented with each addon |

The order of the table is the order of the tab row. A help button at the right end of the row (tooltip **Get help for this page**) opens the help article for the open tab, or a support message when there is none.

## Addon tabs

An addon can add its own tab to Studio Settings by shipping a web frontend for the `settings` scope. One tab is added per such addon, after **Secrets**, labelled with the addon title. Only addon versions in the Production bundle are considered. The tab shows the addon's frontend in a frame, served from `/addons/<addon name>/<version>/frontend`, and passes it the signed-in user's session and the current context.

These tabs are separate from the addon's studio settings, which are edited on the [Studio settings](studio-settings.md) tab. Users without the manager role who open an addon tab URL are sent to the start page.

## Related

- [Navigation bar](../navigation-bar.md)
- [Quick navigation and server layout](../quick-navigation.md)
- [Settings scopes and storage](../../backend/settings/index.md)
- [Users](users.md)
