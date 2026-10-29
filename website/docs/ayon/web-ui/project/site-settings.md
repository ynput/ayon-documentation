---
title: Site settings (project)
description: "The Site settings tab of the AYON Projects Manager: per-workstation overrides of site-capable addon settings for one project, edited by each user for the sites registered to them."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectManagerPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/AddonSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsAddonList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SiteList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/hooks/useUserProjectPermissions.ts
---

# Site settings (project)

The **Site settings** tab of the [Projects Manager](index.md) edits project site settings: overrides of an addon's normal settings fields for one workstation (site), one user and one project. Only fields the addon marks as site-capable appear. Values set here apply on top of the studio and project values. This tab is not the same as the studio-level [Site settings](../studio/site-settings.md) page, which edits a separate set of fields for every project; neither reads the other. See [Settings scopes and storage](../../backend/settings/index.md#the-four-scopes) and [Site IDs](../../backend/settings/index.md#site-ids).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Site settings | Projects Manager, **Site settings** | none | `/manageProjects/siteSettings?project=<project>` | Everyone |

## Layout and controls

The page has the project list on the left (see [Projects Manager](index.md#project-list)), the addon list and the site list in the next column, the settings editor in the middle and the changes list with the save buttons on the right.

| Area | Content |
|---|---|
| Addon list | Columns **Addon** and **Version**. Lists the addons that have project site settings. There is no variant selector, bundle field or copy button on this tab. Rows are coloured when the addon has overrides (see [override states](../../backend/settings/index.md#override-states-in-the-editor)). |
| Site list | Columns **Site ID** and **Platform**, with the sites registered to the signed-in user. Several sites can be selected. **No sites found** when the user has no registered site. The first selected site is remembered in the browser and selected again next time. |
| Editor | One panel per selected addon and selected site. The header of each panel shows badges for the project, the site ID and the variant. Nothing is shown until a site is selected. |
| Changes list | Unsaved changes with **Clear Changes** and **Save Changes**, as on the [Project settings](project-settings.md#changes-and-saving) tab. |

The editor has the same search, help toggle and right-click menus as the [Project settings](project-settings.md#editor) tab; overrides here are site overrides (pink). **Remove all site overrides** on the root of a panel deletes every site override of the addon for that site, project and variant.

Site settings are stored per variant. The tab uses the variant last chosen on the **Project settings** or **Studio settings** tab in the same browser tab (Production by default); the variant badge of each panel shows which one is edited.

A site appears in the list after the AYON launcher has connected from that workstation with the user signed in. A site cannot be added on this page.

## Permissions

Every signed-in user can open this tab for the projects in their project list and edit the site settings of their own registered sites. The values are stored under the user's name, so two users on the same workstation have separate values, and no user can edit another user's site settings in the web app. Access groups do not limit this tab.

## Related

- [Settings scopes and storage](../../backend/settings/index.md)
- [Site settings (studio)](../studio/site-settings.md)
- [Project settings](project-settings.md)
- [Roots](roots.md)
- [Project configuration](index.md)
