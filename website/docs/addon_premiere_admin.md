---
id: addon_premiere_admin
title: Premiere Admin Docs
sidebar_label: Premiere
description: AYON Premiere Addon's documentations for admins.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Premiere_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Premiere Extension installation

Adobe extension must be installed on each artist machine willing to use this integration.

Artists could do it themselves, see more details in [Artist documentation](addon_premiere_artist.md).

On Windows OS it is also possible to enable pre launch hook `Install AYON Extension` which will try to install extension automatically.
Enable toggle at `ayon+settings://premiere/auto_install_extension`.

This hook installs extension to user `appdata`.

Example: `C:\Users\YOUR_USER_NAME\AppData\Roaming\Adobe\CEP\extensions\io.ynput.PPRO.panel`

## Premiere settings

There is currently only single configuration which provides functionality to automatically installing required
Adobe extension. 

Location: `ayon+settings://Premiere/hooks`

