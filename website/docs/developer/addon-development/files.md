---
title: Addon private and public files
sidebar_label: Private and public files
description: "The private and public folders of an AYON addon: the URLs the server serves them at, who can access each, the client code package private/client.zip, downloading private files with ayon_api, and serving files from another location."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/static.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/addons/addon.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/_api.py
---

# Addon private and public files

Files in the addon's `private` and `public` folders are served by the server:

| Folder | URL | Access |
|---|---|---|
| `private/` | `/addons/{addon name}/{addon version}/private/{path}` | Signed-in users, not guests. Requests need a token, as for the REST API. |
| `public/` | `/addons/{addon name}/{addon version}/public/{path}` | Anyone who can reach the server. |

These URLs are not under `/api`. The client code package, `private/client.zip`, is served this way. `ayon_api.download_addon_private_file(addon_name, addon_version, filename, destination_dir)` downloads a private file. Public files suit icons and other files that external services or the web app load without a token; secrets do not belong there.

`get_private_dir()` and `get_public_dir()` return the folders and can be overridden to serve files from another location.

## Related

- [Overview and packaging](overview.md)
- [Server side](server.md)
- [Client side](client.md)
