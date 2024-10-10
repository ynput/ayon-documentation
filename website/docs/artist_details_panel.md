---
id: artist_details_panel
title: The Task Details Panel
sidebar_label: Details Panel
---

:::info
The details panels received updates in server version `1.3.0`.
:::

## Overview 
When using the AYON production tracker, you'll encounter the details panel frequently. It's essential for team interactions.
As the name suggests, the details panel is packed with information about tasks, serving as a communication tool and offering useful actions.


## Panel Content

![](assets/details_panel/details_panel_overview.png)

- **Folder Path**: Displays the folder path of the current task.
- **Name & Thumbnail**: Shows the name and thumbnail of the task.
:::tip Update Thumbnail
You can update the thumbnail by right-clicking the thumbnail and selecting Upload new thumbnail.
:::
- **Tags**: View and add tags.
- **Status**: View and update status.
- **Web Actions**: Access available web actions to launch applications directly via the AYON web server.
:::info Web Actions
Requires core version >= `0.4.4` and Launcher >= `1.1.0`.
:::
- **Activity Feed**: More than just comments. Learn more in the [Activity Feed](artist_activity_feed.md) section.
- **Watchers**: Update notification settings for the current task and choose who receives updates.
- **Picture in Picture**
- **Escape**: Close the current details panel.
- **Assigned Users**: Shows the assignees of the current task.
- **Priority**: View and update the priority of the current task.
- **Attributes**: Provides task details like `fps`, `Start frame`, `End frame`.
:::tip Attributes and Pipeline
These attributes are used within the pipeline and can be modified by the admin via the project editor.
:::