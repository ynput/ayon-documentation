---
id: addon_flame_admin_intro
title: Autodesk Flame Admin Introduction
sidebar_label: Introduction
description: Autodesk Flame Admin Introduction.
toc_max_heading_level: 5
---


import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Flame_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Addon name
This addon integration is still at the **beta** stage. If you have any questions or need help, please contact us.
:::

## Introduction

Autodesk Flame is a high-end visual effects and finishing software used in the post-production industry. The AYON Flame integration allows you to seamlessly connect your AYON Server with Flame and automate publishing and loading of your project data.

Current version of the integration also supports following features:

*   **Editorial:**
    *   Publishing of clips.
    *   Vertical publishing of clips.
    *   Folder hierarchy publishing.
    *   Publishing resources with on-the-fly transcoding using presets connected to Flame's native XML presets.
*   **Loading:**
    *   Loading clips into Flame's Media Panel as Reels clips with conversion to OpenClip.
    *   Loading clips into Flame's Media Panel as Batch clips with conversion to OpenClip.

## Flame's unique workflow
* Missing **Inventory manager** is not integrated for version control like other DCCs. This is because Flame has a unique workflow that doesn't fit well with the Inventory manager's versioning system. Instead, we use Flame's native versioning system to manage clip versions via OpenClip files. These files are created dynamically for each loaded clip and stored in the task's directory within the **work** tree. Each related [OpenClip](https://help.autodesk.com/view/FLAME/2023/ENU/?guid=GUID-1A051CEB-429B-413C-B6CA-256F4BB5D254) is then updated with newer versions of the clip.

* Due to the Python API limitations we are not able to place loaded clips directly to timeline as timeline segment. Instead, we place them in the Media Panel as Reels or Batch clips. This allows you to manually place them in the timeline as needed.