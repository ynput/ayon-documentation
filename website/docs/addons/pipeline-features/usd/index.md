---
title: USD addon
sidebar_label: Overview
description: "The AYON USD addon: distribution of the AYON USD asset resolver for Maya, Houdini and Unreal, the launch hooks that set it up, the USD publish plugins and the requirements."
addon: usd
addon_repo: ayon-usd
addon_version: 0.1.9
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-usd/tree/0.1.9
  - https://github.com/ynput/ayon-usd/releases
  - https://help.ayon.app/en/articles/4862376-ayon-openusd-resolver
  - https://help.ayon.app/en/articles/8466002-openusd-addon-settings
---

# USD addon

<AddonInfo />

The USD addon supplies the AYON USD asset resolver to applications. The resolver is a plugin for OpenUSD that turns AYON entity URIs (`ayon://...`) into file paths while a USD stage is opened, so USD files can refer to the latest or the hero version of a published product without editing paths. The addon downloads, or locates, the resolver build that matches the application being launched and prepares the application environment to use it. It also provides two USD publish plugins. Its settings are described on the [settings page](settings.md).

The addon is experimental.

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.5.3 or newer (required) |
| Applications addon | 1.4.0 or newer (required) |
| Deadline addon | 0.3.0 or newer (compatible) |
| Services | None |

The addon has a client part and a server part. The resolver binaries are not part of the addon package: they are downloaded from a lakeFS server (by default `https://lake.ayon.cloud`, which needs access keys) or read from a local folder.

## Entity URI

The resolver handles URIs of this form. The scheme `ayon+entity:` is also accepted.

```
ayon://{project_name}/{folder_path}?product={product_name}&version={version}&representation={representation_name}
```

`version` is an integer, a padded value such as `v004`, or the keyword `latest` or `hero`.

## Resolver distribution

| Distribution type | Source of the resolver |
|---|---|
| `lake_fs` (default) | A zip file on a lakeFS server. The addon looks up the file for the application name and platform in **Resolver Application Paths** (or **Resolver Application Overrides**), downloads and extracts it, and downloads it again when the file on the server has a different modified time than the downloaded copy. |
| `local` | A resolver directory that is already installed, looked up for the application name and platform in **Resolver Paths**. Named roots can be defined and used as `{resolver_root}` in these paths. |

Binary distribution is disabled by default. When it is disabled, no resolver is set up. When it is enabled but no resolver is found for the application, the launch continues without it and a warning is logged.

The pre-configured lakeFS list covers these applications:

| Application | Platforms |
|---|---|
| Maya 2024, 2025, 2026 | Windows, Linux |
| Houdini 19.5, 20.0, 20.5, 21.0, 22.0 (several Python variants) | Windows, Linux |
| Unreal 5.4 | Windows |

An **Application Alias** list lets one entry serve other application variants, for example the patch versions of one Houdini release.

## Launch hooks

| Hook | Applications | Launch types | What it does |
|---|---|---|---|
| `InitializeAssetResolver` (order 10) | Maya, Houdini, Unreal | Local, farm publish | Finds or downloads the resolver for the application, then adds the resolver environment (including the logging settings) to the launch environment. |
| `SetupAssetResolver` (order 20) | Maya | Local | When the resolver was initialized, adds the addon's Maya startup folder to `PYTHONPATH`. Its `userSetup.py` sets `AyonUsdResolver` as the preferred USD resolver in Maya. |
| `UsdPinningRoot` | Blender, Maya, Unreal, Houdini | Farm publish | When a pinning file is set in the environment, expands its root and sets the pinning roots (project anatomy roots) so that a farm job can use the pinning file. |

## Publish plugins

| Plugin | Applications | Product types | What it does |
|---|---|---|---|
| Process USD files to use relative paths | All | `usd` | Rewrites the asset paths of a published USD layer to be relative to the published file. It runs immediately before integration. |
| Extract Skeleton Pinning JSON | Houdini | `usdrender` | For instances published on the farm, writes a `<name>_pin.json` file next to the exported USD file. The file lists the file path for every dynamic entity URI, which saves the farm from resolving them again. It adds the pinning file location to the farm job environment. It runs after the ROP extraction. |

## Related

- [USD addon settings](settings.md)
