---
id: addon_kitsu_admin
title: Kitsu Admin Docs
sidebar_label: Kitsu
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Kitsu_Badge}
</ReactMarkdown>


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Kitsu is a great open source production tracker and can be used for project management instead of Ftrack. This documentation assumes that you are familiar with Kitsu and its basic principles. If you're new to Kitsu, we recommend having a thorough look at [Kitsu Official Documentation](https://kitsu.cg-wire.com/).

:::info prerequisites
- Having Kitsu set up and running. <br /> For more info refer to [official installation guide](https://zou.cg-wire.com/) or [community kitsu docker](https://github.com/EmberLightVFX/Kitsu-for-Docker)
- Having [AYON Server Host (ASH)](https://github.com/ynput/ash) set up and running. 
:::

## Kitsu Addon Installation

### Addon Market 

If you have already connected your ayon instance to Ynput cloud, you would be able to get the addon from Addon Market.

![Addon Market](assets/kitsu/admin/kitsu_addon_market.png)

### Manual Installation 
Another method is to get it from Github releases and install it manually.

- [Kitsu Addon Github Releases](https://github.com/ynput/ayon-kitsu/releases)

| Download Addon | Install Addon |
|--|--|
| ![Kitsu GH Releases](assets/kitsu/admin/kitsu_gh_releases.png) | ![AYON Install AYON](assets/kitsu/admin/ayon_install_addon.png) |

## Preparation for Kitsu Addon
Essential preparation for Kitsu addon to work.

1. Create New Bundle and set Kitsu addon version
2. Add Kitsu Admin Account to AYON Secrets.
3. Spawn Kitsu service.
4. Set Kitsu Server URL


### Create Bundle and Set Addon Version
Create new production bundle, Set Kitsu Addon version to your installed version, and finally restart server.

:::info NOTE
The Kitsu tab will only become visible once you set the bundle that includes the Kitsu addon to production mode.

Once you restart your server, the Kitsu tab will appear, but it will be empty initially.
:::

### Set Kitsu Admin Account
By default Kitsu addon expects two special keys in AYON secrets.
- `kitsu_email`
- `kitsu_password`
  
![](assets/kitsu/admin/kitsu_admin_account.png)


### Spawn Kitsu service
From Services, Create New Service.

:::caution
Kitsu service should be the same version as your Kitsu addon version.
If you already have a running Kitsu service, you can simply Right-click, delete it and create new one.
:::

![](assets/kitsu/admin/kitsu_service.png)

### Server URL

:::tip
If you're operating your Kitsu instance with Docker and encounter a connection error, it's likely due to an incorrect IP address. Make sure to use the right one. For additional details, visit this community post: [Kitsu connection error (Could not login to Kitsu)](https://community.ynput.io/t/kitsu-connection-error-could-not-login-to-kitsu/1556/13).
:::

As soon as you set the `Server` url in Kitsu settings. And that's all!
- `ayon+settings://kitsu/server`
  
![](assets/kitsu/admin/kitsu_server_url.png)


## Synchronize
Synchronization is two step process.
From Kitsu Tab:
1. Click `Pair project`
2. Click `Sync now`

> Currently, Synchronization is one-way only **Kitsu ➜ AYON**.

| Kitsu Productions | Kitsu Tab |
|--|--|
| ![](assets/kitsu/admin/kitsu_tab_sync_2.png) | ![](assets/kitsu/admin/kitsu_tab_sync.png) |

## Kitsu Addon Configuration

### Integrate Kitsu Note
Task status can be automatically set during publish thanks to `Integrate Kitsu Note`. This feature can be configured in:
- `ayon+settings://kitsu/publish/IntegrateKitsuNote`.

Available settings:
- `Set status on note`: Turns on and off this integrator.
- `Note shortname`: Which status shortname should be set automatically (Case sensitive).
- `Status change conditions`: Conditions that need to be met for kitsu status to be changed. You can add as many conditions as you like.
  - `Status Conditions`: There are two fields to each conditions: 
    - `Condition` (Whether current status should be equal or not equal to the condition status)
    - `Short name` (Kitsu Shortname of the condition status).
  - `Product type requirements`
    - `Condition` (Whether published product type should be equal or not equal to the condition status)
    - `Product type` (AYON Product type)
- `Custom Comment Template` -> when enabled, AYON publisher will use this template as Kitsu comment. You can use markdown as it's supported by Kitsu.


![Integrate Kitsu Note project settings](assets/kitsu/admin/integrate_kitsu_note_settings.png)

#### Custom Comment Template example
Here's an example template that makes a nice table.
- `| comment | version | product type | name |\n|--|--|--|--|\n| {comment} | {version} | {productType} | {name} |`
  
:::tip Custom Comment Template
Artists need only to provide comment in publisher UI. 
And, `Integrate Kitsu Note` will do the hard work for them.
![](assets/kitsu/admin/kitsu_comment_publisher.png)

![](assets/kitsu/admin/kitsu_comment_template.png)
:::
### Sync Settings

- `Delete Projects`: Enabling 'Delete projects' will remove projects on Ayon when they get deleted on Kitsu
- `Sync users` Sync Kitsu Users, their passwords and map Kitsu roles to AYON roles.
- `Default sync info`
  - Tasks (Name, Short Name, Icon)
  - Statuses (Short Name, State, Icon)

## Q&A
### Is it safe to rename an entity from Kitsu?
:::caution
While changing the names of entities is allowed, Be aware it doesn't change the existent file names or publishes.
:::

Absolutely! Entities are linked by their unique IDs between the two databases.  
- If you rename an entity in the AYON project editor, this change won't show up in Kitsu. Instead, it will be replaced with the original name when the next sync happens.
- When you rename an entity directly in Kitsu, the new name will be updated in AYON during the upcoming synchronization.
