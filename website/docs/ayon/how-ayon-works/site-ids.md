---
title: Site IDs
description: "Site IDs in AYON: the ID of one workstation that ties site settings to a machine, how the AYON launcher creates and stores it, the AYON_SITE_ID override, how it is sent to and registered on the server, where it is listed in the web app, and how sites are deleted."
verified: 2026-11-15
sources:
  - https://github.com/ynput/ayon-launcher/blob/develop/common/ayon_common/utils.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/dependencies.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/system/sites.py
---

# Site IDs

A site ID identifies one workstation. It is what ties site settings to a machine.

| Property | Value |
|---|---|
| Format | Lowercase letters, digits and hyphens |
| Created by | The AYON launcher, at its first start on the machine. Three random words joined by hyphens |
| Stored on the machine | In a file named `site_id` in the launcher's local data folder. The `AYON_SITE_ID` environment variable overrides the file |
| Sent to the server | In the `x-ayon-site-id` header, together with the platform, host name and launcher version |
| Registered on the server | When a signed-in, non-guest user opens a session with those headers. The server adds the site, or updates its platform, host name or version, and adds the user to the site's user list |
| Listed in the web app | The **Site ID** and **Platform** columns of the site lists on both **Site settings** pages show the sites registered to the signed-in user |

Site settings are read and saved for the signed-in user and the selected site. A user cannot edit the site settings of another user in the web app.

Sites can be listed and deleted through the server API (`/api/system/sites`); the web app has no page for it. Deleting a site is limited to admins and removes the site's studio and project site settings and its custom roots. A maintenance task also removes project site settings whose site or user no longer exists.

## Related

- [Settings](settings.md)
- [Artist workstation setup](../workstation-setup.md)
- [Site settings (studio)](../web-ui/studio/site-settings.md)
- [Site settings (project)](../web-ui/project/site-settings.md)
