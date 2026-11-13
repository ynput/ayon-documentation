---
title: Addon files
sidebar_label: Files
description: "Files of an AYON addon: the private and public folders shipped in the package (the URLs the server serves them at, who can access each, the client code package private/client.zip, downloading private files with ayon_api, serving them from another location), and addon data, files uploaded to the addon that every version uses, usually stored in /storage/addons/<addon name> (for example Slater templates and registered workflows)."
verified: 2026-11-14
sources:
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/static.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/addons/addon.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/_api.py
---

# Addon files

An addon can have files of two kinds:

| Kind | Comes from | Versioned |
|---|---|---|
| [Private and public files](#private-and-public-files) | Shipped in the addon's package | Yes, each version has its own |
| [Addon data](#addon-data) | Users, through the web app or the API | No, every version of the addon uses the same files |

## Private and public files

Private and public files are shipped in the addon's package, in its `private` and `public` folders, and served by the server:

| Files in | Are available at | To |
|---|---|---|
| `private/` | `/addons/{addon name}/{addon version}/private/{path}` | Signed-in users, not guests. Requests need a token, as for the REST API. |
| `public/` | `/addons/{addon name}/{addon version}/public/{path}` | Anyone who can reach the server. |

For example, `public/icon.png` of `my_addon` 1.0.0 is at `https://ayon.example.com/addons/my_addon/1.0.0/public/icon.png`.

Public files suit icons and other files that external services or the web app load without a token; secrets do not belong there. A private file is downloaded with `ayon_api.download_addon_private_file(addon_name, addon_version, filename, destination_dir)`. For example, the launcher downloads the addon's client code from `private/client.zip`, which `create_package.py` puts there.

`get_private_dir()` and `get_public_dir()` return the folders and can be overridden to serve files from another location.

## Addon data

Addon data is files that users upload to an addon, for example slate templates or workflows. Every version of the addon uses the same addon data. The addon's server code stores it and serves it through its own [endpoints](server.md#endpoints).

The usual place is `/storage/addons/<addon name>/`, in the server's own [storage folder](../../ayon/deployment/on-premise.md#storage-directory). The server does not enforce a location, but keeping to this one puts the files of all addons in one known place, which makes them easy to find when debugging or backing up the server. For example, the [Slater](../../addons/pipeline-features/slater/index.md) addon keeps its slate templates in `/storage/addons/slater/templates`, and the [Workflow](../../addons/automation/workflow/index.md) addon its registered workflows in `/storage/addons/workflow/registered_workflows`.

## Related

- [Overview and packaging](overview.md)
- [Server side](server.md)
- [Client side](client.md)
