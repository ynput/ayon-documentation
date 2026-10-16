---
title: SiteSync addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SiteSync addon with their default values: enabling, sync configuration, sites and provider settings, and the per-user site settings."
addon: sitesync
addon_repo: ayon-sitesync
addon_version: 1.3.2
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-sitesync/tree/1.3.2/server/settings
  - https://help.ayon.app/en/articles/3882937-site-sync
---

# SiteSync addon settings

<AddonInfo />

The settings of the [SiteSync addon](index.md), with the default values the addon ships with. Most are studio settings that can be overridden per project. The **Local setting** group is only available as a site setting, so each user and workstation can have its own values. Some provider fields are also available at site scope, for personal credentials. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The addon is disabled by default. The main switch next to the addon name enables Site Sync (default: off). Sites must be defined in the studio settings and are then available to projects.

## Config

| Setting | Default | Description |
|---|---|---|
| Retry Count | 3 | How many times a failed file transfer is tried again. |
| Loop Delay | 60 | Delay, in seconds, between two checks for files to synchronise. |
| Always accessible on sites | empty list | Sites that every published file must eventually reach. The sync server of the active site copies files there. |
| User Default Active Site | `studio` | Active site for users who did not choose one. |
| User Default Remote Site | `studio` | Remote site for users who did not choose one. When both are the same, nothing is synchronised. |

## Local setting

Site scope only: the choice of an individual user on a workstation.

| Setting | Default | Description |
|---|---|---|
| My Active Site | empty | Active site of this user. Empty uses the default from **Config**. |
| My Remote Site | empty | Remote site of this user. Empty uses the default from **Config**. |
| Local roots overrides | one root: **Root name** `work`, **Path** `C:/projects_local` | Root folders of the `local` site on this workstation. Each item has a **Root name** (letters, digits and underscores) and a **Path**. |

Roots that do not exist on the machine should be removed, because missing paths can slow down loading of workfiles.

## Sites

A list of sites, empty by default (the `studio` and `local` sites are built in). Each item is one site. The defaults below are those of a newly added site.

| Setting | Default | Description |
|---|---|---|
| Site name | none (required) | Name of the site. |
| Provider | empty | Type of storage: Google Drive, Local Drive, Dropbox, SFTP or Rclone. The settings of the chosen provider are shown. |
| Alternative sites | empty list | Sites whose files are physically present on this site as well. Example: an SFTP site that exposes the `studio` disk. |

### Local Drive

| Setting | Default | Description |
|---|---|---|
| Roots | one root `work`, with the default paths of the AYON server anatomy roots | Root paths for the site, one item per root with **Root name** and a path for Windows, Linux and Darwin. |

### Google Drive

| Setting | Default | Description |
|---|---|---|
| Credentials url | empty lists for Windows, Linux and Darwin | Path of the service account `.json` file, on a disk reachable from every machine. |
| GDrive root folder | empty | Root folder on Google Drive. A personal Drive needs the `/My Drive` prefix, shared drives do not. |

### Dropbox

| Setting | Default | Description |
|---|---|---|
| Access token | empty | Dropbox API access token. |
| Team Folder Name | empty | Name of the team folder. |
| Acting As Member | empty | Member on whose behalf the addon acts. |
| Roots | empty | Root folder on Dropbox. |

### SFTP

Authenticate with a password or with an SSH key (and its password), not both. The key must be in OpenSSH format (`.pem`).

| Setting | Default | Description |
|---|---|---|
| SFTP host name | empty | Domain name or IP address of the server. |
| SFTP port | 0 | Port of the server. |
| SFTP user name | empty | User name. |
| SFTP password | empty | Password, for password authentication. |
| SFTP key path | empty lists for Windows, Linux and Darwin | Path of the key file, on a disk reachable from every machine. |
| SFTP user ssh key password | empty | Passphrase of the key, when it has one. |
| SFTP root folder | empty | Root folder on the server. |

### Rclone

| Setting | Default | Description |
|---|---|---|
| RClone Executable Path | empty for Windows, Linux and MacOS | Path of the `rclone` executable. Leave as `rclone` when it is on `PATH`. Environment variables can be written as `{LOCALAPPDATA}/path`. |
| Config Type | `config_web` | Whether the connection is defined by a configuration file (`config_file`) or inline (`config_web`). |
| RClone File Config | empty | **Remote Name from the rclone config** and **RClone Config Path (.conf)** per platform, for an existing `rclone.conf`. |
| RClone Web Config | empty | **Type** of the remote (for example `webdav` or `S3`) and a list of **Config Parameters**, each a **Key** and a **Value**, so no file needs to be distributed. |
| Root Folder | empty | Root folder on the remote storage. |
| Additional Arguments | empty list | Extra flags passed to rclone, for example `--checkers=16`. |
