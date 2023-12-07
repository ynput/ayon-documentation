---
id: addon_kitsu_artist
title: Kitsu Artist Docs
sidebar_label: Kitsu
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Kitsu_Badge}
</ReactMarkdown>

# How to use Kitsu in AYON

## Login to Kitsu module in AYON
1. Launch AYON, the `Kitsu Credentials` window will open automatically, if not, or if you want to log-in with another account, go to systray AYON icon and click on `Kitsu Connect`.
2. Enter your credentials and press *Ok*:

    ![kitsu-login](assets/kitsu/artist/kitsu_credentials.png)

:::tip
In Kitsu, All the publish actions executed by `pyblish` will be attributed to the currently logged-in user.
:::