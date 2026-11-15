---
title: Site settings
description: "The Site settings tab of the AYON Studio Settings: the workstation settings of the signed-in user, edited per addon and site ID for every project, with the addon list, the site list, the editor panels and saving; the only Studio Settings tab that users without the manager role see."
verified: 2026-11-15
ui_purpose: "Edits the settings of the signed-in user's workstations (sites), in every project."
ui_location: "Studio Settings > Site settings; App menu > Site Settings for users"
ui_url: /settings/site
ui_shortcut: "s+s (users)"
ui_access: Everyone
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/SiteSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SiteList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsAddonList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/SettingsPage.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/addons/site_settings.py
---

# Site settings

<PageInfo />

![The Site settings tab with the Deadline addon selected in the addon list, No sites found in the site list below it, and Select a site to edit settings in the editor](../../assets/web-ui/studio-site-settings/page.webp)

The **Site settings** tab edits the studio-level site settings: values for one workstation (site) of one user, in every project. They are a separate set of fields that each addon defines, with no variant and no inheritance from the studio or project settings. For users without the manager role, it is the only tab of the Studio Settings: **Site Settings** replaces **Studio Settings** in the [App menu](../app-header.md#app-menu), and `s+s` opens it. What a site ID is and how the site levels differ is explained in [Settings](../../how-ayon-works/site-ids.md).

## Addons, sites and editor

The tab has the addon list and the site list on the left and the editor on the right.

| Part | Content |
|---|---|
| Addon list | **Addon** and **Version** of the addons in the Production bundle that define site settings, sorted by title. Several can be selected. **No addons found** when none does; **WARNING: No bundle set to production** without a Production bundle. |
| Site list | **Site ID** and **Platform** of the signed-in user's sites: the workstations where the user has started the AYON launcher. Several can be selected. **No sites found** until the user has started a launcher. |
| Editor | One panel for each selected addon and site, titled with the addon title and the site ID in parentheses. **Select a site to edit settings** while no site is selected. |

Each panel shows the complete site settings of the addon for that site: the stored values, with the addon defaults for fields never saved. There are no override marks and no variant badge, because site settings are stored as one complete document.

Site settings are read and saved for the signed-in user only. Two users on the same workstation have separate values, and the web app cannot edit the site settings of another user. The values are stored per addon version, so a new addon version in the Production bundle starts from its defaults.

## Controls and interactions

- **Save Changes** is always enabled. It saves each changed panel as a whole document, one addon and site at a time. **Site settings saved** confirms it. If one fails, **Unable to save &lt;addon&gt; settings** lists the validation errors and the remaining panels are not saved.
- The first selected site is remembered in the browser and selected again next time.

The project-level counterpart, overrides of the normal addon settings for one site in one project, is the [Site settings](../project/site-settings.md) tab of the project settings. The two do not read each other.

## Related

- [Settings](../../how-ayon-works/settings.md)
- [Studio settings](studio-settings.md)
- [Project site settings](../project/site-settings.md)
- [Pipeline storage](../../how-ayon-works/pipeline-storage.md)
- [Studio configuration](index.md)
