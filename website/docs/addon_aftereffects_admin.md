---
id: addon_aftereffects_admin
title: After Effects Admin Docs
sidebar_label: After Effects
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Aftereffects_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## AfterEffects settings

There is a couple of settings that could configure publishing process for **AfterEffects**.
All of them are Project based, eg. each project could have different configuration.

Location: `ayon+settings://aftereffects/publish`

![AfterEffects Project Settings](assets/aftereffects/admin/admin_hosts_aftereffects_settings.png)

## Publish plugins

### Collect Review
Enable/disable collecting reviews. If disabled, no review will be created at all. 

### Validate Scene Settings

#### Skip Resolution Check for Tasks

Set regex pattern(s) to look for in a Task name to skip resolution check against values from DB.

#### Skip Timeline Check for Tasks

Set regex pattern(s) to look for in a Task name to skip `frameStart`, `frameEnd` check against values from DB.

### Validate Containers
Checks if all imported assets to the workfile through `Loader` are in latest version. Limits cases that older version of asset would be used.

If enabled, artist might still decide to disable validation for each publish (for special use cases).
Limit this optionality by toggling `Optional`.
`Active` toggle denotes that by default artists sees that optional validation as enabled.

### AfterEffects Submit to Deadline

* `Use Published scene` - Set to True (green) when Deadline should take published scene as a source instead of uploaded local one.
* `Priority` - priority of job on farm
* `Primary Pool` - here is list of pool fetched from server you can select from.
* `Secondary Pool`
* `Frames Per Task` - number of sequence division between individual tasks (chunks)
making one job on farm.