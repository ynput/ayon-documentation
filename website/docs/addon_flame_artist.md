---
id: addon_flame_artist
title: Autodesk Flame
sidebar_label: Flame
description: AYON Flame Addon's documentations for artists.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Flame_Badge}
</ReactMarkdown>

:::info Addon name
This addon integration is still at the **beta** stage. If you have any questions or need help, please contact us.
:::

## Launch Flame

:::tip
It's expected to have only one instance of Flame running. Please close any open Flame instances before launching Flame from the launcher.
:::

Head to the AYON launcher, select your folder and task, and then launch Flame by clicking its icon in the launcher.

![](assets/flame/artist/flame_launcher.png)

## AYON Flame Menus

<!-- TODO: Add a tip about how to show the publisher window -->

AYON Integration adds AYON menus in multiple locations within the Flame UI.

| Main Menu | Timeline item Menu|
|--|--|
| ![](assets/flame/artist/main_menu_integration.png) | ![](assets/flame/artist/timeline_item_menu_integration.png) |

| Reels Menu | Media Panel Menu |
|--|--|
| ![](assets/flame/artist/reels_menu_integration.png) | ![](assets/flame/artist/media_panel_menu_integration.png) |

## Create and Publish Products

The current publishing process is
1. Create a publish instance using `Create` menu.
2. Click publish ▶️ button in the [Publisher](artist_tools_publisher.md) Tool! 

:::info
Flame addon is currently using the old creator.

![](assets/flame/artist/old_creator.png)
:::


### Publishable Clip

Steps for making a publishable clip:
- Select your clips in the timeline.
- Go to **AYON -> Create**, and select **Create Publishable Clip**.
- **AYON publish attributes creator** window will appear where you can specify multiple options for your publish instance.
- After that, you can go to **AYON -> Publish** which runs some validations before exporting and publishing your clip.

Once you create a publish instance, you'll start noticing that your clip is marked.
these marks are objects that hold AYON publish metadata.
![](assets/flame/artist/ayon_marks.png)

:::info AYON Publish attributes creator

**AYON publish attributes creator** provides various options for you to tweak your publish instances.
e.g. You can rename the clips, specify frame padding and etc.
<!-- TODO: Break down the creator options -->
![](assets/flame/artist/ayon_attribute_publish_creator.png)
:::

<!-- TODO: Add a note about publish plugins so that artists are aware of the changes that happens on publishing? -->

## Loading Products

You can load products using [AYON Loader](artist_tools_loader.md) like any other addons.

Currently, we place the loaded media in the Media Panel as Reels or Batch clips with conversion to OpenClip. This allows you to manually place them in the timeline as needed.

![](assets/flame/artist/flame_loader_actions.png)


## Manage versions of loaded clips

Flame addon, *unlike other addons,* doesn't include **Inventory manager**. 
Alternatively, you should be able to set versions of your loaded media via Reels and Media panel menus using `Source Versions` action.

![](assets/flame/artist/source_versions_action.png)