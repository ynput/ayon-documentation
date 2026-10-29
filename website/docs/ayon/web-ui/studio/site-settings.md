---
title: Site settings
description: "The Site settings tab of the AYON Studio Settings: per-workstation addon settings of the signed-in user, edited per addon and site ID for every project, and the only Studio Settings tab that users without the manager role see."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/SiteSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SiteList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsAddonList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/SettingsPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/AppMenu.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/addons/site_settings.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/settings/settings.py
---

# Site settings

The **Site settings** tab edits the studio-level site settings: values that apply to one workstation (site) of one user, in every project. These values are a separate set of fields defined by each addon, with no variant and no inheritance from the studio or project settings. What a site ID is and how the site scopes differ is explained in [Settings scopes and storage](../../backend/settings/index.md#site-ids).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Site settings | Studio Settings, **Site settings** (managers and admins); **App** menu, **Site Settings** (users) | `s+s` (users) | `/settings/site` | Everyone |

For users without the manager role, **Site Settings** replaces **Studio Settings** in the **App** menu, and **Site settings** is the only tab in the Studio Settings tab row. The `s+s` shortcut and the paths of the other built-in tabs lead them here.

## Layout and controls

The tab has a left column with the addon and site lists, and the editor on the right.

| Control | What it does |
|---|---|
| Addon list | Columns **Addon** and **Version**. Lists the addons of the Production bundle that define site settings, sorted by title. Several addons can be selected. **No addons found** when none qualifies; **WARNING: No bundle set to production** when there is no Production bundle. |
| Site list | Columns **Site ID** and **Platform**. Lists the sites registered to the signed-in user, that is the workstations where the user has started the AYON launcher. Several sites can be selected. **No sites found** when the user has no site yet. The first selected site is remembered in the browser and preselected next time. |
| **Save Changes** | Saves the site settings of every open panel. |
| Editor | One panel for each combination of a selected addon and a selected site, titled with the addon title and the site ID in parentheses. Shows **Select a site to edit settings** while no site is selected. |

Each panel shows the complete site settings of the addon for that site and user: the stored values, with the addon defaults for fields that were never saved. There are no override markers and no variant badge, because studio site settings are stored as one complete document.

**Save Changes** is always enabled and saves every open panel as a whole, one request per addon and site. **Site settings saved** confirms the save. If one fails, **Unable to save &lt;addon&gt; settings** lists the validation errors and the remaining panels are not saved.

## Values per user and site

Site settings are read and saved for the signed-in user. Two users on the same workstation have separate values, and the web app offers no way to edit the site settings of another user. The values are stored per addon version: a new addon version in the Production bundle starts from its defaults.

The project-level counterpart, overrides of normal addon settings for one site in one project, is the **Site settings** tab of the project settings (`/manageProjects/siteSettings`). The two do not read each other.

## Permissions

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Site settings** | Yes | Yes | Yes |
| Edit own site settings | Yes | Yes | Yes |
| Edit site settings of other users | No | No | No |

## Related

- [Settings scopes and storage](../../backend/settings/index.md)
- [Studio settings](studio-settings.md)
- [Studio configuration](index.md)
- [Pipeline storage](../../how-ayon-works/pipeline-storage.md)
