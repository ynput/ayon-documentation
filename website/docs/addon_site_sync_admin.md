---
id: addon_site_sync_admin
title: Site Sync Admin Docs
sidebar_label: Site Sync
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.SitSync_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Site Sync allows users and studios to synchronize published assets between multiple 'sites'. Site denotes a storage location,
which could be a physical disk, server, cloud storage. To be able to use site sync, it first needs to be configured. 

The general idea is that each user acts as an individual site and can download and upload any published project files when they are needed. that way, artist can have access to the whole project, but only every store files that are relevant to them on their home workstation. 

:::note
At the moment site sync is only able to deal with published files (eg. in `publish` folder). **No workfiles (in `work` folder) will be synchronized.** We are working on making workfile synchronization possible as well.
:::

## Studio Settings

First of all, you need to include Site Sync Addon to your bundle, and to use synchronization, *Site Sync* needs to be enabled globally in **ayon+settings://sitesync**.

![Configure module](assets/site_sync_system.png)

### Sites 

By default there are two sites created for each AYON installation:
- **studio** - default site - usually a centralized mounted disk accessible to all artists. Studio site is used if Site Sync is disabled.
- **local** - each workstation or server running AYON Tray receives its own with unique site name. Workstation refers to itself as "local"however all other sites will see it under it's unique ID.

Artists can explore their site ID by opening AYON Info tool by clicking on a version number in the tray app. 

Many different sites can be created and configured on the system level, and some or all can be assigned to each project.

Each AYON Tray app works with two sites at one time. (Sites can be the same, and no syncing is done in this setup).

Sites could be configured differently per project basis. 

Each new site needs to be created first in `Studio Settings`. Most important feature of site is its Provider, select one from already prepared Providers.

#### Alternative sites 

This attribute is meant for special use cases only.

One of the use cases is sftp site vendoring (exposing) same data as regular site (studio). Each site is accessible for different audience. 'studio' for artists in a studio via shared disk, 'sftp' for externals via sftp server with mounted 'studio' drive.

Change of file status on one site actually means same change on 'alternate' site occurred too. (eg. artists publish to 'studio', 'sftp' is using
same location >> file is accessible on 'sftp' site right away, no need to sync it anyhow.)

##### Example
![Configure module](assets/site_sync_system_sites.png)

Admin created new `SFTP` site which is handled by `SFTP` provider. Somewhere in the studio SFTP server is deployed on a machine that has access to `studio` drive.

Alternative sites work both way:
- everything published to `studio` is accessible on a `SFTP` site too
- everything published to `SFTP` (most probably via artist's local disk - artists publishes locally, representation is marked to be synced to `SFTP`. Immediately after it is synced, it is marked to be available on `studio` too for artists in the studio to use.)

## Project Settings

Sites need to be made available for each project. Of course this is possible to do on the default project as well, in which case all other projects will inherit these settings until overridden explicitly.

You'll find the setting in **ayon+settings://sitesync**

The attributes that can be configured will vary between sites and their providers. 

## Site settings

Each user should configure root folder for their 'local' site via **Local roots overrides** in `Site Settings` tab in AYON Server. This folder will be used for all files that the user publishes or downloads while working on a project. 

![Local overrides](assets/site_sync_local_root.png)

:::tip
There is also possibility to override local location of `studio` site. That could be found in `Roots` tab. (This 
configuration is applicable even without Site Sync, it just allows artist to use different drive/folder of their `studio` location. 
Could be because required value is not available, not enough space on that disk etc.)

![Local overrides](assets/site_sync_override_roots.png)
:::

Artists can also override which site they use as active and remote to activet Site Sync functionality if sites are not set in Project Settings.
Here artist could also change all user based configuration based on provider (for example password for sftp user etc.)

![Local overrides](assets/site_sync_local_setting.png)

:::info
Various use cases are explained in [Introduction to Site Sync in OpenPype / AYON | YouTube](https://www.youtube.com/watch?v=NEJ3kCeggn0)
:::


## Providers

Each site implements a so called `provider` which handles most common operations (list files, copy files etc.) and provides interface with a particular type of storage. (disk, gdrive, aws, etc.)
Multiple configured sites could share the same provider with different settings (multiple mounted disks - each disk can be a separate site, while
all share the same provider).

**Currently implemented providers:**

### Local Drive

Handles files stored on disk storage.

Local drive provider is the most basic one that is used for accessing all standard hard disk storage scenarios. It will work with any storage that can be mounted on your system in a standard way. This could correspond to a physical external hard drive, network mounted storage, internal drive or even VPN connected network drive. It doesn't care about how the drive is mounted, but you must be able to point to it with a simple directory path.

Default sites `local` and `studio` both use local drive provider.


### Google Drive

Handles files on Google Drive (this). GDrive is provided as a production example for implementing other cloud providers

Let's imagine a small globally distributed studio which wants all published work for all their freelancers uploaded to Google Drive folder.

For this use case admin needs to configure:
- how many times it tries to synchronize file in case of some issue (network, permissions)
- how often should synchronization check for new assets
- sites for synchronization - 'local' and 'gdrive' (this can be overridden in local settings)
- user credentials
- root folder location on Google Drive side

Configuration would look like this:

![Configure project](assets/site_sync_project_settings.png)

*Site Sync* for Google Drive works using its API: https://developers.google.com/drive/api/v3/about-sdk

To configure Google Drive side you would need to have access to Google Cloud Platform project: https://console.cloud.google.com/ 

To get working connection to Google Drive there are some necessary steps:
- first you need to enable GDrive API: https://developers.google.com/drive/api/v3/enable-drive-api
- next you need to create user, choose **Service Account** (for basic configuration no roles for account are necessary) 
- add new key for created account and download .json file with credentials
- share destination folder on the Google Drive with created account (directly in GDrive web application)
- add new site back in AYON Settings, name as you want, provider needs to be 'gdrive'
- distribute credentials file via shared mounted disk location

:::note
If you are using regular personal GDrive for testing don't forget adding `/My Drive` as the prefix in root configuration. Business accounts and share drives don't need this.
:::

### SFTP

SFTP provider is used to connect to SFTP server. Currently authentication with `user:password` or `user:ssh key` is implemented.
Please provide only one combination, don't forget to provide password for ssh key if ssh key was created with a passphrase.

(SFTP connection could be a bit finicky, use FileZilla or WinSCP for testing connection, it will be mush faster.)

Beware that ssh key expects OpenSSH format (`.pem`) not a Putty format (`.ppk`)!

#### How to set SFTP site

- Add side with SFTP provider in Studio Settings

![Enable syncing and create site](assets/site_sync_sftp_system.png)

- In Projects setting enable Site Sync
- Configure SFTP connection and destination folder on a SFTP server (in screenshot `/upload`)
  
- if you want to force syncing between local and sftp site for all users, use combination `active site: local`, `remote site: NAME_OF_SFTP_SITE`
- if you want to allow only specific users to use SFTP syncing (external users, not located in the office), use `active site: studio`, `remote site: studio`. 

![Select active and remote site on a project](assets/site_sync_sftp_project_setting_not_forced.png)

- Each artist can decide and configure syncing from his/her local to SFTP via `Site Settings`

![Select active and remote site on a project](assets/site_sync_sftp_settings_local.png)
  
### Custom providers

If a studio needs to use other services for cloud storage, or want to implement totally different storage providers, they can do so by writing their own provider plugin. We're working on a developer documentation, however, for now we recommend looking at [`abstract_provider.py`](https://github.com/ynput/ayon-sitesync/blob/develop/client/ayon_sitesync/providers/abstract_provider.py) and [`gdrive.py`](https://github.com/ynput/ayon-sitesync/blob/develop/client/ayon_sitesync/providers/gdrive.py) inside `ayon-sitesync/client/ayon-sitesync/providers` and using it as a template.

### Running Site Sync in background

Site Sync server synchronizes new published files from artist machine into configured remote location by default.

There might be a use case where you need to synchronize between "non-artist" sites, for example between studio site and cloud. In this case
you need to run Site Sync as a background process from a command line (via service etc) 24/7.

To configure all sites where all published files should be synced eventually you need to configure `project_settings/global/sync_server/config/always_accessible_on` property in Settings (per project) first.

![Set another non artist remote site](assets/site_sync_always_on.png)

This is an example of:
- Site Sync is enabled for a project
- default active and remote sites are set to `studio` - eg. standard process: everyone is working in a studio, publishing to shared location etc.
- (but this also allows any of the artists to work remotely, they would change their active site in their own Site Settings to `local` and configure local root.
  This would result in everything artist publishes is saved first onto his local folder AND synchronized to `studio` site eventually.)
- everything exported must also be eventually uploaded to `SFTP` site

This eventual synchronization between `studio` and `SFTP` sites must be physically handled by background process.

As current implementation relies heavily on Settings and Site Settings, background process for a specific site ('studio' for example) must be configured via Tray first to `syncserver` command to work.

To do this:

- run OP `Tray` with environment variable AYON_LOCAL_ID set to name of active (source) site. In most use cases it would be studio (for cases of backups of everything published to studio site to different cloud site etc.)
- start `Tray`
- check `Local ID` in information dialog after clicking on version number in the Tray
- open `Site Settings` in the `Ayon Server`
- configure for each project necessary active site and remote site
- close `Tray`
- run Ayon launcher from a command line with `syncserver` and `--active_site` arguments


This is an example how to trigger background syncing process where active (source) site is `studio`. 
(It is expected that OP is installed on a machine, `ayon_console` is on PATH. If not, add full path to executable.
)
```shell
ayon_console syncserver --active_site studio
```


## Copy Last Published Workfile

When opening an asset in a given task, a prelaunch hook will check if a workfile is locally available for the given asset and task.
If there's none, this hook will attempt to download the last published workfile in the `active` site, copy it in the `work` site
(with the version number incremented) and open it.


## `resources` folder

When an artist uses unpacked resources such as images, it is necessary to ensure they will be available in other sites as well.
For this purpose, they can be added to a folder named `resources` in the local workfile folder as follows:

`{path_to_asset}/{task_name}/resources`

The content of the `resources` folder can be published alongside the workfile (if featured in your host implementation).

Finally, when the `Copy Last Published Workfile` all the resources listed in the workfile representation will be downloaded
and added to the local workfile folder, inside the `resources` folder.
