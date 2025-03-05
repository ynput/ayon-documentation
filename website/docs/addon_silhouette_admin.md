---
id: addon_silhouette_admin
title: Silhouette Admin Docs
sidebar_label: Silhouette
description: AYON Silhouette Addon's documentations for admins.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Silhouette_Badge}
</ReactMarkdown>


## Addon Settings

### Color Management (ImageIO)

> Setting Location: `ayon+settings://silhouette/imageio`

![](assets/traypublisher/settings/color_management.png)

This section allows you to configure and override the global color management settings. For more details, check [Host specific overrides](admin_colorspace.md#host-specific-overrides).

- **Enable Color Management**: Turns on color management for Tray Publisher.
- **File Rules**
  - **Activate Host Rules**: Enable this to override global color rules.
  - **Rules**
    - **+** : Add more rules
    - Each rule consists of:
      ![](assets/traypublisher/settings/color_management_rules.png)
      - **Rule name**
      - **Regex pattern**
      - **Colorspace name**
      - **File extension**

### Templated Workfile Builder
> Setting Location: `ayon+settings://silhouette/templated_workfile_build`

![](assets/silhouette/admin/templated_workfile_build.png)

First matched profile will be used as a workfile template

- Profiles
  - Each profile consists of:
    ![](assets/silhouette/admin/templated_workfile_build_profiles.png)
    - Task Types
    - Task names
    - Path to template
    - Keep placeholders
    - Create first version
  - **+**: Add more profiles

For example:

![AYON Silhouette - Templated Workfile Build Settings](assets/silhouette/ayon_silhouette_templated_workfile_build_settings.png)

_In this case it would build the workfile template only for the Roto task type
using the `.sfx` template project provided in the settings._