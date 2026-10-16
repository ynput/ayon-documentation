---
title: ArchivalTool addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON ArchivalTool addon with their default values: publish area configs and work area configs."
addon: archival_tool
addon_repo: ayon-archival-tool
addon_version: 0.1.2
addon_scope: pipeline-server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7924402-project-archival-tool
---

# ArchivalTool addon settings

<AddonInfo />

The settings of the [ArchivalTool addon](index.md), with the default values the addon ships with. They are lists of profiles; an analysis copies them into the report it creates, so later changes to the settings do not alter existing reports. They can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The defaults delete: each list has one profile named `default` that matches every product or task, and its deleting switches are on. Review the profiles before running an analysis and a delete run.

## Publish area configs

Rules for published versions. Each profile has these fields.

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Name of the profile. Used as the section name in the report. |
| Product types | Empty | Regex patterns matched against the product type. Empty matches every product type. |
| Product names | Empty | Regex patterns matched against the product name. Empty matches every name. |
| Keep versions | 2 | Number of newest versions that are kept. |
| Delete in DB | On | Delete the versions and their representations from the database. |
| Delete files | On | Delete the version files from storage. |
| Delete reviewables | On | Delete the reviewable files uploaded to the versions. |
| Archive in ftrack | Off | Archive the versions in ftrack. Needs the ftrack addon. |
| Copy kept files | Off | Copy the files of the kept versions. |
| Copy to directory | Empty | Directory the kept files are copied to. |

A product is processed when one of the product type patterns and one of the product name patterns match (the patterns are matched from the start of the value).

## Work area configs

Rules for the work files of tasks. Each profile has these fields.

| Setting | Default | Description |
|---|---|---|
| Name | Empty (`default` in the default profile) | Name of the profile. Used as the section name in the report. |
| Directory regex | `.*` | Regex matched from the start against the names of the tasks of the analysed folders. Only matching tasks are processed. |
| Delete known files | On | Delete files created by AYON (those that follow its naming). |
| Delete unknown files | On | Delete files not created by AYON, such as reference files added by artists. |
| Delete folders | On | Delete the folders. |
| Delete files | On | Delete the files from storage. |
| Copy kept files | Off | Copy the kept files. |
| Copy to directory | Empty | Directory the kept files are copied to. |

In version 0.1.2 the delete run copies kept files for the published area only, so **Copy kept files** and **Copy to directory** of a work profile have no effect.
