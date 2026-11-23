---
title: SiteSync addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SiteSync addon with their default values: enabling, sync configuration, sites and provider settings, and the per-user site settings."
addon: sitesync
addon_repo: ayon-sitesync
addon_version: 1.3.2
addon_scope: pipeline-server
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-sitesync/tree/1.3.2/server/settings
---

# SiteSync addon settings

<AddonInfo />

The settings of the [SiteSync addon](index.md) are in **Studio settings > SiteSync**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. Sites are defined in the studio settings and then made available to projects. Each user sets an active and a remote site and the root of the `local` site in the **Site settings** of the project, so each user and workstation has its own values; some provider fields, such as credentials, can also be set there. The local paths of the `studio` site are not a SiteSync setting: they are overridden in the **Roots** of the site settings, and work without SiteSync. The built-in sites, active and remote sites, and the providers are explained in [Concepts](index.md#concepts).

## Enabled

<SettingLocation uri="ayon+settings://sitesync" scope="Studio, with project overrides" />

The main switch of the addon, shown next to its name.

<!-- screenshot: settings editor, Site Sync with the switch next to the addon name -->

<Settings>
<Setting name="Enabled" id="enabled-toggle" default="Disabled">

The switch next to the addon name. Turns Site Sync on, for the studio or for a project.

</Setting>
</Settings>

## Config

<SettingLocation uri="ayon+settings://sitesync/config" scope="Studio, with project overrides" />

How often the sync runs, how failures are retried, and the default sites of users.

<!-- screenshot: settings editor, Config -->

<Settings>
<Setting name="Retry Count" default="3">

How many times a failed file transfer is tried again.

</Setting>
<Setting name="Loop Delay" default="60">

Delay, in seconds, between two checks for files to synchronise.

</Setting>
<Setting name="Always accessible on sites" default="Empty list">

Sites that every published file must eventually reach, for example a cloud backup of the `studio` site. Copying between sites that are not artist sites needs the [background sync service](index.md#background-sync-service).

</Setting>
<Setting name="User Default Active Site" default="studio">

Active site for users who did not choose one.

</Setting>
<Setting name="User Default Remote Site" default="studio">

Remote site for users who did not choose one. When the active and the remote site are the same, nothing is synchronised. For example, `local` and an SFTP site sync every user with the SFTP server, while `studio` and `studio` leave it to the users who choose otherwise in their site settings.

</Setting>
</Settings>

## Local setting

<SettingLocation uri="ayon+settings://sitesync/local_setting" scope="Site" />

The choice of an individual user on a workstation, in the **Site settings** of a project.

<!-- screenshot: settings editor, Local setting -->

<Settings>
<Setting name="My Active Site" default="Empty">

Active site of this user: `local`, `studio` or a configured site. Empty uses **User Default Active Site**.

</Setting>
<Setting name="My Remote Site" default="Empty">

Remote site of this user. Empty uses **User Default Remote Site**.

</Setting>
<Setting name="Local roots overrides" default="work: C:/projects_local">

Root folders of the `local` site on this workstation, used for all files the user publishes or downloads. Each item has a **Root name** (letters, digits and underscores) and a **Path**.

:::caution
Remove roots that do not exist on the machine: missing paths can slow down loading workfiles in the launcher.
:::

</Setting>
</Settings>

## Sites

<SettingLocation uri="ayon+settings://sitesync/sites" scope="Studio, with project overrides; some fields also Site" />

Additional sites, empty by default; `studio` and `local` are built in. Each site uses a provider, the type of storage, and several sites can use the same provider with different settings, such as two mounted disks.

<!-- screenshot: settings editor, Sites -->

<Settings>
<Setting name="Sites" id="sites-list" default="Empty list">

<Settings>
<Setting name="Site name">

Required, unique name of the site. Also settable per site.

</Setting>
<Setting name="Provider" default="Empty">

**Google Drive**, **Local Drive**, **Dropbox**, **SFTP** or **Rclone**. The fields of the chosen provider are shown, described below.

</Setting>
<Setting name="Alternative sites" default="Empty list">

For special cases: sites where the files of this site are physically present as well. A change of file state on one is a change on the other, so no sync is needed between them. For example, an SFTP server that exposes the `studio` disk to external artists: files published to `studio` are available on the SFTP site right away, and files synced to the SFTP site are available on `studio`. Studio and project only.

</Setting>
</Settings>

</Setting>
</Settings>

### Local Drive

Files on any storage mounted with a directory path: an internal or external disk, network storage or a VPN drive. The built-in `studio` and `local` sites use this provider.

<Settings prefix="local-drive">
<Setting name="Roots" default="work: C:/projects, /mnt/share/projects, /Volumes/projects">

Root paths of the site, one item per root with a **Root name** and a path for Windows, Linux and macOS. Also settable per site.

</Setting>
</Settings>

### Google Drive

Files on Google Drive through its API. The connection needs a Google Cloud project with the Drive API enabled, a service account with a JSON key, and the destination folder shared with that account.

<Settings prefix="gdrive">
<Setting name="Credentials url" default="Empty lists">

Path of the service account `.json` file, per platform (Windows, Linux, Darwin), on a disk reachable from every machine. Also settable per site.

</Setting>
<Setting name="GDrive root folder" default="Empty">

Root folder on Google Drive. A personal Drive needs the `/My Drive` prefix; business accounts and shared drives do not. Studio and project only.

</Setting>
</Settings>

### Dropbox

<Settings prefix="dropbox">
<Setting name="Access token" default="Empty">

Dropbox API access token. Also settable per site.

</Setting>
<Setting name="Team Folder Name" default="Empty">

Name of the team folder. Studio and project only.

</Setting>
<Setting name="Acting As Member" default="Empty">

Member on whose behalf the addon acts. Also settable per site.

</Setting>
<Setting name="Roots" default="Empty">

Root folder on Dropbox. Also settable per site.

</Setting>
</Settings>

### SFTP

Authenticate with a password or with an SSH key and its password, not both. The key must be in OpenSSH format (`.pem`), not PuTTY format (`.ppk`). A client such as FileZilla or WinSCP is a quick way to test the connection.

<Settings prefix="sftp">
<Setting name="SFTP host name" default="Empty">

Domain name or IP address of the server. Studio and project only.

</Setting>
<Setting name="SFTP port" default="0">

Port of the server. Studio and project only.

</Setting>
<Setting name="SFTP user name" default="Empty">

Also settable per site.

</Setting>
<Setting name="SFTP password" default="Empty">

Password, for password authentication. Also settable per site.

</Setting>
<Setting name="SFTP key path" default="Empty lists">

Path of the key file per platform (Windows, Linux, Darwin), on a disk reachable from every machine. Without a shared disk, use the password. Also settable per site.

</Setting>
<Setting name="SFTP user ssh key password" default="Empty">

Passphrase of the key, when it has one. Also settable per site.

</Setting>
<Setting name="SFTP root folder" default="Empty">

Root folder on the server, such as `/upload`. Studio and project only.

</Setting>
</Settings>

### Rclone

Any storage that rclone supports, such as WebDAV or S3.

<Settings prefix="rclone">
<Setting name="RClone Executable Path" default="Empty">

Path of the `rclone` executable for Windows, Linux and MacOS. `rclone` is enough when it is on `PATH`. Environment variables can be written as `{LOCALAPPDATA}/path`. Studio and project only.

</Setting>
<Setting name="Config Type" default="Use Web Config">

**Use File Config** (an existing `rclone.conf`) or **Use Web Config** (the remote defined inline, so no file needs to be distributed).

</Setting>
<Setting name="RClone File Config">

Used with **Use File Config**: **Remote Name from the rclone config**, the name of the remote in `rclone.conf`, and **RClone Config Path (.conf)** per platform. Environment variables can be used in the path.

</Setting>
<Setting name="RClone Web Config">

Used with **Use Web Config**: the **Type** of the remote (for example `webdav` or `S3`) and a list of **Config Parameters**, each a **Key** and a **Value**.

</Setting>
<Setting name="Root Folder" default="Empty">

Root folder on the remote storage. Studio and project only.

</Setting>
<Setting name="Additional Arguments" default="Empty list">

Extra flags passed to rclone, for example `--checkers=16`. Studio and project only.

</Setting>
</Settings>

## Related

- [SiteSync addon](index.md)
- [Background sync service](index.md#background-sync-service)
- [Copy last published workfile](index.md#copy-last-published-workfile)
