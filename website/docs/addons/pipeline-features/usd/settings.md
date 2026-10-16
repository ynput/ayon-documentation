---
title: USD addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON USD addon with their default values: binary distribution (lakeFS and local), resolver logging, USD debug variable and the USD publish plugins."
addon: usd
addon_repo: ayon-usd
addon_version: 0.1.9
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-usd/tree/0.1.9/server/settings
  - https://help.ayon.app/en/articles/8466002-openusd-addon-settings
---

# USD addon settings

<AddonInfo />

The settings of the [USD addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Binary distribution

Controls where the AYON USD resolver comes from. Disabling it disables the resolver for every application.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Set up the resolver when an application is launched. |
| Distribution type | `lake_fs` | `lake_fs` downloads the resolver from a lakeFS server. `local` uses a resolver directory that is already installed. |

### LakeFS distribution settings

Used when the distribution type is `lake_fs`.

| Setting | Default | Description |
|---|---|---|
| Server URL | `https://lake.ayon.cloud` | The lakeFS server that hosts the builds. Keep the default to use the builds Ynput provides. |
| Repository URI | `lakefs://ayon-usd/v1.2.1/` | The repository tag or branch on the server. |
| Access Key ID | `{AYON_Distribution_Key_Id}` | Access key ID of the server. The default is a placeholder. The keys are given on request. |
| Secret Access Key | `{AYON_Distribution_Access_Key}` | Secret key of the server. The default is a placeholder. |
| Resolver Application Paths | 23 pre-configured items | Which resolver zip to use for which application and platform. See below. |
| Resolver Application Overrides | empty list | Item with **Application**, **Platform** and **Repository Object URI** (a full `lakefs://` URI of a zip file). Replaces the pre-configured zip for that application. |

Each item of **Resolver Application Paths** has these fields:

| Field | Description |
|---|---|
| Application | Application name, for example `maya/2025`. |
| Application Alias | Other application names that use the same resolver, for example a specific Houdini build. |
| Platform | `windows`, `linux` or `darwin`. |
| Repository Object Path | Path of the resolver zip inside the repository, for example `AyonUsdResolverBin/MayaLinux/Maya2024_2_Py310_Linux_Linux_x86_64.zip`. |

The default items are one per application and platform: Maya 2024, 2025 and 2026 (Windows and Linux); Houdini 19.5 (also with the `Py37` variant), 20.0 (also `Py39`), 20.5 (also `Py310`), 21.0 and 22.0 (Windows and Linux); and Unreal 5.4 (Windows). Application aliases are empty.

### Local distribution settings

Used when the distribution type is `local`. Both lists are empty by default.

| Setting | Description |
|---|---|
| Resolver Roots | Named root paths. Each item has a **Root Name** and a path for **Windows**, **Linux** and **Darwin**. A root can be used as `{resolver_root}` in resolver paths. |
| Resolver Paths | Items with **Application**, **Application Alias**, **Platform** and **Resolver Directory Path**, the directory that contains the `ayonUsdResolver` folder. |

## AYON USD Resolver Config

These values are passed to the resolver as environment variables when an application starts.

| Setting | Default | Description |
|---|---|---|
| Resolver Log Level | `WARN` | Verbosity of the resolver logger. |
| Resolver File Logger Enabled | `OFF` | Enables the resolver file logger. |
| Resolver File logger file path | empty | Custom location of the log file, relative or absolute. Used only when the file logger is enabled. |
| AyonCppApi Logging Keys | empty | Extra logging options for the AYON C++ API. |

## USD Library Config

| Setting | Default | Description |
|---|---|---|
| Tf Debug Variable for Debugging USD | empty | Value of the `TF_DEBUG` environment variable, for debugging USD. |

## Publish plugins

Each plugin has the switches **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default). The pinning plugin has only **Enabled**.

| Plugin | Enabled | Optional | Active | Description |
|---|---|---|---|---|
| Process USD files to use relative paths | Off | Off | On | Published USD layers anchor their asset paths to the published file path. |
| Generate USD Resolver Pinning file on publish | On | not available | not available | Writes a pinning file next to the published USD file that pins all dynamic entity URIs. Disable it when the USD resolver is not used. |
