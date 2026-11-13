---
title: Version Control addon settings
sidebar_label: Settings
sidebar_class_name: addon-archived
description: "Reference of the settings of the AYON Version Control addon with their default values: server connection, Collect Version Control profiles and the per-user credentials and workspace profiles."
addon: version_control
addon_repo: ayon-version-control
addon_version: 0.1.1
addon_scope: pipeline
addon_flags: []
addon_archived: true
addon_last_push: 2026-02-17
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-version-control/tree/0.1.1/server/settings
  - https://help.ayon.app/en/articles/7771120-perforce-addon-settings
---

# Version Control addon settings

<AddonInfo />

The settings of the [Version Control addon](index.md), with the default values the addon ships with. Most are studio settings that can be overridden per project. The **Local setting** group is a site setting, so each artist machine has its own values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The addon is disabled by default. The main switch next to the addon name turns it on.

## Connection

| Setting | Default | Description |
|---|---|---|
| Backend name | empty | The version control system to use. The only choice is Perforce. |
| Host name | `perforce` | Name of the Perforce server. |
| Port | 1666 | Port the Perforce server uses. |

## Publish plugins

### Collect Version Control

Selects which published products are also committed to Perforce. Keep it disabled when published files should be versioned only in AYON.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Run the plugin. |
| Profiles to add version control | empty list | Profiles that choose the products to commit. |

Each profile has these fields. An empty filter matches everything.

| Field | Default | Description |
|---|---|---|
| Host names | empty list | Applications the profile applies to. |
| Families | empty list | Product types the profile applies to. |
| Task types | empty list | Task types the profile applies to. |
| Task names | empty list | Task names the profile applies to. |
| Add Version Control to representations | On | Commit the representations of matching products to Perforce. |
| Template name | empty | Name of the Anatomy template that gives the path and file name of the committed file. |

## Local setting

Site scope only: the values of one artist on one workstation.

| Setting | Default | Description |
|---|---|---|
| Username | empty | Perforce user name. |
| Password | empty | Perforce password. |
| Workspace Profiles | empty list | Profiles that choose the Perforce workspace for a context. |

Each workspace profile has **Folder paths**, **Task types** and **Task names** (filters, all empty by default) and **My Workspace Name**, the name of the Perforce workspace to use. The workspace folder on disk is expected to carry the workspace name.
