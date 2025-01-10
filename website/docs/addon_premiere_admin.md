---
id: addon_aftereffects_admin
title: After Effects Admin Docs
sidebar_label: After Effects
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Aftereffects_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Premiere Extension installation

Adobe extension must be installed on each artist machine willing to use this integration.

Artists could do it themselves, see more details in [Artist documentation](addon_premiere_artist.md).

It is also possible to enable pre launch hook `Install AYON Extension` which will try to install extension automatically.

:::info NOTE
This hook is still in development, currently it brute force reinstalls every launch. By default this hook is
disabled in Settings.
:::

## Premiere settings

There is currently only single configuration which provides functionality to automatically installing required
Adobe extension. 

Location: `ayon+settings://Premiere/hooks`

