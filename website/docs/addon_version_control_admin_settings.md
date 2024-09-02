---
id: addon_version_control_admin_settings
title: Version Control Addon Settings
sidebar_label: Settings
description: Version Control Addon Settings.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
    {versions.VersionControl_Badge}
</ReactMarkdown>

## Settings
![](assets/version_control/connection_settings.png)

- **Backend name:** List of active version control systems. 
- **Host name:** Pipeline integration name for the backend name.
- **Port:** port number that perforce server uses. 
  :::info
  By default, The server url for perforce is expected to be `http://localhost:{Port}`.
  Keep in mind that the addon sets the URL to `PERFORCE_WEBSERVER_URL` environment variable.
  :::

## Publish Plugins

### Collect Version Control

![](assets/version_control/collect_version_control.png)
Profiles: 
- Host names
- Families
- Task Types
- Task names
- Add Version Control to representations
- **Template name:** Name from Anatomy to provide path and name of committed file.

