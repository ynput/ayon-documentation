---
title: SiteSync addon
sidebar_label: Overview
description: "The AYON SiteSync addon: what a site is, how published files are kept in step between sites, the storage providers, the sync page, the background sync service, the launch hook and its requirements."
addon: sitesync
addon_repo: ayon-sitesync
addon_version: 1.3.2
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-sitesync/tree/1.3.2
  - https://github.com/ynput/ayon-sitesync/releases
  - https://help.ayon.app/en/articles/3882937-site-sync
---

# SiteSync addon

<AddonInfo />

The SiteSync addon (Site Sync) keeps published files in step between storage locations. AYON calls each storage location a **site**: a physical disk, a network share, a server or a cloud storage. Artists publish to one site, and the addon copies the published files to another site so that people elsewhere can use them. The sync state of every file is stored on the AYON server, per representation and per site. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | No minimum |
| AYON launcher | 1.4.3 or newer |
| AYON core addon | 0.3.0 or newer (required) |
| Applications addon | 0.2.0 or newer (compatible, used by the launch hook) |

## Concepts

| Term | Meaning |
|---|---|
| Site | A named storage location. Each site uses one provider. |
| Provider | The component that talks to a type of storage: lists, uploads and downloads files. |
| Active site | The site an artist works on (publishes to and reads from). |
| Remote site | The site the active site is synchronised with. |
| `studio` | The default site, usually a central disk that every artist can reach. It is used when Site Sync is disabled. |
| `local` | The site of one workstation. Other sites see it under the unique ID of that machine. |
| Alternative site | A site that exposes the same files as another site. A change on one is treated as a change on the other. |

Only published files (representations) are synchronised. The addon does not synchronise workfiles. When Site Sync is disabled, or disabled for a project, the active site is `studio`.

## Providers

| Provider | Storage |
|---|---|
| Local Drive | Any storage that is mounted as a directory path: an external disk, a network share, a VPN drive. The built-in `studio` and `local` sites use it. |
| Google Drive | Google Drive through a service account. |
| Dropbox | Dropbox, using an access token. |
| SFTP | An SFTP server, with a user and password or a user and SSH key. |
| Rclone | Any storage that the `rclone` command-line tool supports. The addon runs `rclone` as a subprocess. |

Provider settings and credentials are described on the [settings page](settings.md#sites).

## What the addon adds

| Part | Where it appears | What it does |
|---|---|---|
| Publish plugin **Integrate Site Sync state** | Publisher (after integration) | Records, for every published representation, which sites the files are on and which still need to be synced. |
| Sync page | A project page of the AYON web interface (the addon declares a `project` frontend scope) | Lists representations with local and remote status and a per-file detail view. |
| Sync server | AYON tray, or a background process | Copies files between the active and remote site, retries failures, and updates the status on the server. |
| Launch hook **CopyLastPublishedWorkfile** | Application launch, before the workfile is opened | Copies the last published workfile into the work area as the first workfile. |
| Server endpoints | `/api/addons/sitesync/<version>/...` | Provide the sync parameters, the status of representations and the state of each file. |

### Sync states

| Status | Meaning |
|---|---|
| N/A | The file is not on the site (state not available). |
| In progress | A transfer is running. |
| Queued | The file waits for transfer. |
| Failed | The transfer failed. Failures are retried up to the **Retry Count** setting. |
| Paused | The transfer is paused. |
| Synced | The file or representation is fully synchronised. |

The overall status of a representation is derived from its files: synced only when all files are synced, failed when any file failed, then in progress, paused and queued in that order of precedence.

### Sync page

The page lists representations of a project with the columns folder, product, version, representation, local status and remote status. It can be filtered by folder, product, version, representation name and by status, and a detail view lists the files of a representation with their statuses. The local and remote site choices come from the sites that the current user has configured for the project.

### Background sync service

The sync server runs inside the AYON tray. For a site where no artist is working (for example synchronising `studio` with a cloud site), it can run without the tray with the launcher command:

```
ayon_console addon sitesync syncservice --active_site <site name>
```

`--active_site` (`-a`) is required. The sites that must eventually receive every published file are listed in **Always accessible on sites** in the settings. The service reads the active and remote site from the settings (project and site settings) of that site.

### Copy last published workfile

When an application starts for a task and no workfile exists in the work area, the hook downloads the last published workfile from the active site, copies it into the work area with the version number incremented and opens it. It does nothing when an explicit workfile path was given, or when Site Sync is not enabled for the project. The hook applies to these application groups: Blender, Photoshop, TVPaint, After Effects, Nuke, NukeAssist, NukeX, Nuke Studio and Hiero, Maya, Harmony, CelAction, Flame, Fusion and Houdini.

## Related

- [SiteSync addon settings](settings.md)
