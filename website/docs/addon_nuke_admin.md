---
id: addon_nuke_admin
title: Nuke Addon Admin Settings
sidebar_label: Settings
description: Nuke Addon's Settings - Admins documentation.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Nuke_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution Nuke License compatibility
The AYON Nuke addon integration is compatible exclusively with the `commercial` license of Nuke, which provides Full Python API Support and pipeline functionality. Please note that the `non-commercial` and `indie` licenses lack full Python API support and, as a result, are not supported by the addon.

For more details, check out the comparison between different Nuke licenses [here](https://learn.foundry.com/nuke/content/getting_started/meet_nuke/about_indie.html).
:::

## General
### Menu Shortcuts
> Setting Location: `ayon+settings://nuke/general/menu`

![](assets/nuke/settings/menu_shortcuts.png)

Set Shortcuts for AYON global [artist tools](artist_tools.md).

Available tools: 
- **Create...**
- **Publish...**
- **Load...**
- **Manage...**
- **Build Workfile...**

## Color Management (ImageIO)

Color configuration for Nuke scripts and nodes and also override the global color management settings, check [Host specific overrides](admin_colorspace.md#host-specific-overrides).

### Enable Color Management

> Setting Location: `ayon+settings://nuke/imageio/activate_host_color_management`

![](assets/nuke/settings/enable_color_management.png)

This toggle enables AYON's global color management.
This toggle is a master switch that enables and disables the whole section.

### File Rules
> Setting Location: `ayon+settings://nuke/imageio/file_rules`

![](assets/nuke/settings/file_rules.png)

- **Activate Host Rules**
- Rules
  - **+**: Add more rules
  - Each rule consists of
    ![](assets/nuke/settings/rules.png)
    - **Rule name**
    - **Regex pattern**
    - **Colorspace name**
    - **File extension**

### Viewer
> Setting Location: `ayon+settings://nuke/imageio/viewer`

![](assets/nuke/settings/viewer.png)

- **Display**
- **View**

### Monitor OUT
> Setting Location: `ayon+settings://nuke/imageio/monitor`

![](assets/nuke/settings/monitor_out.png)

- **Display**
- **View**

### Backing Target Colorspace
> Setting Location: `ayon+settings://nuke/imageio/baking_target`

#### Mode 1: Use Colorspace
![](assets/nuke/settings/baking_target_colorspace.png)

- **Enable**
- **Target baking type**
- **Colorspace**

#### Mode 2: Use Display & View
![](assets/nuke/settings/baking_target_colorspace_display_view.png)

- **Enable**
- **Target baking type**
- **Display**
- **View**

### Workfile
> Setting Location: `ayon+settings://nuke/imageio/workfile`

![](assets/nuke/settings/workfile.png)

Nuke script project color settings map 1:1 

- **Color Management Workflow**
- **Native OpenColorIO Config**
- **Working Space**
- **Thumbnails**
- **Monitor Out**
- **8-bit Files**
- **16-bit Files**
- **Log Files**
- **Float Files**

### Nodes
> Setting Location: `ayon+settings://nuke/imageio/nodes`

#### Plugin required

![](assets/nuke/settings/node_plugins_required.png)

- **Used in plugins**
- **Nuke Node Class**
- **Knobs**
  - **Name**
  - **Type**
  - **Controller**
  - **+**: Add more knobs
- **+**: Add more node per plugins

#### Plugin's node overrides

![](assets/nuke/settings/node_plugins_nodes_overrides.png)

- **Used in plugins**
- **Nuke Node Class**
- **Knobs**
  - **Name**
  - **Type**
  - **Controller**
  - **+**: Add more knobs
- **+**: Add more node per plugins

### Assign colorspace to read nodes via rules
> Setting Location: `ayon+settings://nuke/imageio/regex_inputs`

![](assets/nuke/settings/assign_colorspace_to_read_nodes.png)

When using loading different clips and images sequences via AYON loader,
you can set the default colorspace for the read node based on a regex expression.

- **Regex expression**
- **Colorspace**
- **+**: Add more rules.

## Nuke Directory Mapping
> Setting Location: `ayon+settings://nuke/dirmap`

![](assets/nuke/settings/nuke_dir_mapping.png)

- **Enable**
- **Source Paths**
- **Destination Paths**

## Custom Tools
> Setting Location: `ayon+settings://nuke/scriptsmenu`

![](assets/nuke/settings/custom_tools_settings.png)

Creates a custom from the provided action definitions 
- **Menu Name**
- **Definitions**
  - Each definition includes
    - **Type**
    - **Command**
    - **Source Type**
    - **Title**
    - **Tooltip**
  - **+**: Add more definitions

:::tip Expected result
For the setting value in the screen shot above, 
custom tools menu will appear in Nuke's toolbar. 
![](assets/nuke/settings/custom_tools.png)
:::

## Gizmo Menu
> Setting Location: `ayon+settings://nuke/gizmo`

![](assets/nuke/settings/gizmo_menu.png)

- Toolbar Menu Name
- Toolbar Icon Path
- Gizmo Menu Options
  Gizmo Menu supports two modes:

<div class="row">
<div class="col">

![](assets/nuke/settings/gizmo_menu_directory_path_mode.png)

- Gizmo Directory Path

</div>
<div class="col">

![](assets/nuke/settings/gizmo_menu_gizmos_defs_mode.png)

- **Gizmo Definitions**
  - Each Definition consists of:
    - **Gizmo Menu Parent**
    - **Gizmo List**
      - Each Gizmo item consists of:
        - **Label**
        - **Type of usage**
        - **Python command**
        - **Icon Path**
        - **Hotkey**
      - **+**: Add More Gizmos
  - **+**: Add More gizmo Definitions

</div>
</div>

## Creator Plugins

### Create Write Render

> Setting Location: `ayon+settings://nuke/create/CreateWriteRender`

![](assets/nuke/settings/create_write_render_settings.png)

- Temporary rendering path template
- Default variants
- Instance attributes
- Write Node Exposed Knobs
- Preceding nodes
![](assets/nuke/settings/create_write_render_preceding_nodes.png)

### Create Write Prerender

> Setting Location: `ayon+settings://nuke/create/CreateWritePrerender`

![](assets/nuke/settings/create_write_prerender_settings.png)

- Temporary rendering path template
- Default variants
- Instance attributes
- Write Node Exposed Knobs
- Preceding nodes
![](assets/nuke/settings/create_write_prerender_preceding_nodes.png)

### Create Write Image

> Setting Location: `ayon+settings://nuke/create/CreateWriteImage`

![](assets/nuke/settings/create_write_image_settings.png)

- Temporary rendering path template
- Default variants
- Instance attributes
- Write Node Exposed Knobs
- Preceding nodes
![](assets/nuke/settings/create_write_image_preceding_nodes.png)

## Publish Plugins

### Collect Instance Version
> Setting Location: `ayon+settings://nuke/publish/CollectInstanceData`

![](assets/nuke/settings/collect_instnaces_version.png)

- Product types

### Validate Correct Folder Name
> Setting Location: `ayon+settings://nuke/publish/ValidateCorrectAssetContext`

![](assets/nuke/settings/validate_correct_folder_name.png)

- Enable
- Optional
- Active

### Validate Knobs
> Setting Location: `ayon+settings://nuke/publish/ValidateKnobs`

![](assets/nuke/settings/validate_knobs.png)

- Knobs

### Validate Output Resolution
> Setting Location:`ayon+settings://nuke/publish/ValidateOutputResolution`

![](assets/nuke/settings/validate_output_res.png)

- Enable
- Optional
- Active

### Validate Gizmo
> Setting Location: `ayon+settings://nuke/publish/ValidateGizmo`

![](assets/nuke/settings/validate_gizmo.png)

- Enable
- Optional
- Active

### Validate Backdrop
> Setting Location: `ayon+settings://nuke/publish/ValidateBackdrop`

![](assets/nuke/settings/validate_backdrop.png)

- Enable
- Optional
- Active

### Validate workfile attributes
> Setting Location: `ayon+settings://nuke/publish/ValidateScriptAttributes`

![](assets/nuke/settings/validate_workfile_attrs.png)

- Enable
- Optional
- Active

### Extract Review Data
> Setting Location: `ayon+settings://nuke/publish/ExtractReviewData`

![](assets/nuke/settings/extract_review_data.png)

### Extract Review Data Lut
> Setting Location: `ayon+settings://nuke/publish/ExtractReviewDataLut`

![](assets/nuke/settings/extract_review_data_lut.png)

### Extract Review Intermediates
> Setting Location: `ayon+settings://nuke/publish/ExtractReviewIntermediates`

![](assets/nuke/settings/extract_review_intermediates.png)

- Viewer lut raw
- Baking streams
  - Each baking stream consists of
    - Output name
    - Publish
    - Filter
      ![](assets/nuke/settings/extract_review_intermediates_filters.png)
    - Input read node RAW switch
    - Bake viewer process
    - Target backing colorspace override
      ![](assets/nuke/settings/extract_review_intermediates_colorspace_override.png)
    - Bake viewer input process node (LUT)
    - Reformate Nodes
    - ![](assets/nuke/settings/extract_review_intermediates_reposition_knobs.png)
    - File extension
    - Custom tags
  - **+**: Add more baking streams

### Extract Camera Formate
> Setting Location: `ayon+settings://nuke/publish/ExtractCameraFormat`

![](assets/nuke/settings/extract_camera_format.png)

- Camera export format

### Extract Slate Frame
> Setting Location: `ayon+settings://nuke/publish/ExtractSlateFrame`

![](assets/nuke/settings/extract_slate_frame.png)

- Viewer lut raw
- Key value mapping
  - f_submission_note
    - Template
  - f_submitting_for
    - Template
  - f_vfx_scope_of_work
    - Template

### Increment Workfile Version
> Setting Location: `ayon+settings://nuke/publish/IncrementScriptVersion`

![](assets/nuke/settings/increment_workfile_version.png)

- Enable
- Optional
- Active

## Load Plugins
### Load Image
> Setting Location: `ayon+settings://nuke/load/LoadImage`

![](assets/nuke/settings/load_image.png)

- Include representations
- Read node name template

### Load Clip
> Setting Location: `ayon+settings://nuke/load/LoadClip`

![](assets/nuke/settings/load_clip.png)


- Include representations
- Read node name template
- Loader options defaults
  - Start at workfile's start frame
  - Add retime
  - Deep Exr Read Node

## Workfile Builder
> Setting Location: `ayon+settings://nuke/workfile_builder`

![](assets/nuke/settings/workfile_builder_old.png)

:::caution deprecation alert
This setting is deprecated, use [Templated Workfile Builder](#templated-workfile-builder) Setting instead.
:::

- Create first workfile
- Custom templates
- RunBuilder at first workfile
- Builder profiles

## Templated Workfile Builder
> Setting Location: `ayon+settings://nuke/templated_workfile_build`

![](assets/nuke/settings/workfile_builder_new.png)

First matched profile will be used as a workfile template

- Profiles
  - Each profile consists of:
    - Task Types
    - Task names
    - Path to template
    - Keep placeholders
    - Create first version
  - **+**: Add more profiles