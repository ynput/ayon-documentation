---
id: addon_substancedesigner_admin_settings
title: Substance Designer Admin Settings
sidebar_label: Settings
description: Substance Designer Addon's Settings - Admins documentation.
toc_max_heading_level: 5
---
import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.SubstanceDesigner_Badge}
</ReactMarkdown>

## Color Management (ImageIO)

Color configuration for Nuke scripts and nodes and also override the global color management settings, check [Host specific overrides](admin_colorspace.md#host-specific-overrides).

### Enable Color Management

> Setting Location: `ayon+settings://substancedesigner/imageio/activate_host_color_management`

![](assets/substance_designer/admin/enable_color_management.png)

This toggle enables AYON's global color management.
This toggle is a master switch that enables and disables the whole section.

### File Rules
> Setting Location: `ayon+settings://substancedesigner/imageio/file_rules`

![](assets/substance_designer/admin/file_rules.png)

- **Activate Host Rules**
- Rules
  - **+**: Add more rules
  - Each rule consists of
    ![](assets/substance_designer/admin/rules.png)
    - **Rule name**
    - **Regex pattern**
    - **Colorspace name**
    - **File extension**

## Project Creation
### Project Templates
> Setting Location: `ayon+settings://substancedesigner/project_creation/project_templates`

![](assets/substance_designer/admin/project_templates.png)
- Each template consists of
  ![](assets/substance_designer/admin/project_template_profile.png)
  - **Graph Name**
  - **Document Resolution**: Choose from a list the texture resolution when creating new project.
  - **Template Type**: Choose from a list either default substance templates or custom template for project creation.
  - **Template**: Choose template to create your Substance Graph.
- **+**: Add more rules

## Creator Plugins
### Create Textures
> Setting Location: `ayon+settings://substancedesigner/create/CreateTextures`

![](assets/substance_designer/admin/create_textures.png)

- **Review**: Enable to generate review.
- **Image Output File Type**: Choose from a list the texture output format.