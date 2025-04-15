---
id: addon_nuke_artist
title: Nuke Artist Docs
sidebar_label: Nuke
description: Nuke Artist Docs
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'
import DocCardList from '@theme/DocCardList';

<ReactMarkdown>
{versions.Nuke_Badge}
</ReactMarkdown>

:::note
AYON supports Nuke version **`13.0`** and above.
:::

:::caution Nuke License compatibility
The AYON Nuke addon integration is compatible exclusively with the `commercial` license of Nuke, which provides Full Python API Support and pipeline functionality. Please note that the `non-commercial` and `indie` licenses lack full Python API support and, as a result, are not supported by the addon.

For more details, check out the comparison between different Nuke licenses [here](https://learn.foundry.com/nuke/content/getting_started/meet_nuke/about_indie.html).
:::

<DocCardList />
