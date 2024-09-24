---
id: addon_flame_admin_intro
title: Flame Admin Introduction
sidebar_label: Introduction
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
