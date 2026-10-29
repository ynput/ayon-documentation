---
title: Roots
description: "The Roots tab of the AYON Projects Manager: per-site root paths that replace the project anatomy roots for one user on one workstation in one project."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectRoots.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectManagerPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/hooks/useUserProjectPermissions.ts
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/roots.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/system/info.py
---

# Roots

The **Roots** tab of the [Projects Manager](index.md) sets root paths for the selected project per site. A path saved here replaces the root path of the project anatomy for the signed-in user on that workstation, for example when the storage is mounted under another drive letter or mount point. The anatomy roots themselves are edited on the [Anatomy](anatomy.md) tab. The order in which root paths are resolved, including Site Sync, is described in [Pipeline storage](../../how-ayon-works/pipeline-storage.md#roots).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Roots | Projects Manager, **Roots** | none | `/manageProjects/roots?project=<project>` | Everyone |

## Layout and controls

The page has the project list on the left (see [Projects Manager](index.md#project-list)) and one panel per site on the right.

| Element | Content |
|---|---|
| Panel header | The host name of the site, with the site ID on the right. |
| One field per root | Labelled with the root name. The placeholder shows the path from the project anatomy for the platform of that site. An empty field means the anatomy path is used. |
| **Save** | Saves the root paths of that site. Active when a field differs from the saved value. Shows **Roots saved**. |

The panels list the sites registered to the signed-in user, that is, the workstations where the user has used the AYON launcher (see [Site IDs](../../backend/settings/index.md#site-ids)). **No sites were found** is shown when there is none.

A user who is not assigned to the selected project sees **You don't have permission to view this project's roots**.

## Storage

| Topic | Behavior |
|---|---|
| Key | The values are stored in the project, per site ID and user name. Two users on the same workstation have separate values. |
| Platform | A site has one platform, so each panel holds one path per root, for that platform. |
| Empty values | Empty fields are not stored. Saving a site with every field empty deletes its entry. |
| Unknown roots | Only roots that exist in the project anatomy are shown. |
| Use | The launcher and pipeline tools ask the server for the roots of the project for the current site; the server combines the anatomy roots with the values saved here. |

Deleting a site through the server API removes its custom roots.

## Permissions

| Action | Required |
|---|---|
| Open the tab | Everyone |
| View and save roots for a project | Manager or admin, or a user assigned to the project through an access group |
| Edit another user's roots | Not possible in the web app; values are always read and saved for the signed-in user |

## Related

- [Pipeline storage](../../how-ayon-works/pipeline-storage.md)
- [Anatomy](anatomy.md)
- [Site settings (project)](site-settings.md)
- [Settings scopes and storage](../../backend/settings/index.md)
- [Project configuration](index.md)
