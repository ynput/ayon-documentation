---
title: SyncSketch addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SyncSketch addon: the server configuration with the secrets for the API user and key, and the mapping between AYON and SyncSketch projects."
addon: syncsketch
addon_repo: ayon-syncsketch
addon_version: 0.4.1
addon_scope: server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-syncsketch/tree/0.4.1/server
  - https://help.ayon.app/en/help/articles/0905719-syncsketch
---

# SyncSketch addon settings

<AddonInfo />

The settings of the [SyncSketch addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The processor service reads the server configuration from the addon version it runs for, and the push action reads the sync options from the project settings.

## SyncSketch server config

| Setting | Default | Description |
|---|---|---|
| API Username | Empty | The name of an AYON secret that holds the SyncSketch API username. The setting offers the existing secrets. |
| API Key | Empty | The name of an AYON secret that holds the SyncSketch API key. |
| SyncSketch Server URL | Empty (placeholder `https://www.syncsketch.com`) | Address of the SyncSketch server. When empty, `https://www.syncsketch.com` is used. |

The settings store secret names, not the values. The service looks the values up in the AYON secrets and checks them against the SyncSketch API before processing jobs.

## Sync options

| Setting | Default | Description |
|---|---|---|
| Project Mapping | Match Project Name | How the SyncSketch project is chosen when a list is pushed for the first time. **Match Project Name** uses the AYON project name. **Select from list** offers the projects below in a form. |

The following settings are shown when **Project Mapping** is **Select from list**.

| Setting | Default | Description |
|---|---|---|
| SyncSketch Project Names | Empty list | SyncSketch projects to select from. When the list has a single name and custom names are not allowed, that project is used without a form. |
| Allow custom project name | Off | Adds a **< Custom project name >** option to the form, so that the user can type a project name. |
