---
id: addon_traypublisher_admin
title: Tray Publisher
sidebar_label: Tray Publisher
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.TrayPublisher_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Project settings can have project specific values. Each new project is using studio values defined in **studio settings** but these values can be modified or overridden per project.

Refer to Settings related to [Working with settings](admin_settings) for more details.

## Creator Plugins

Contains list of implemented families to show in middle menu in Tray Publisher. Each plugin must contain:

- **Product type**
- **Label**
- **Icon**
- **Extensions**

![example of simple creator plugin](assets/admin_traypublisher_settings_simple.png)
![example of complex creator plugin](assets/admin_traypublisher_settings_simple_extensions.png)