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

## Premiere Extension Installation

The Adobe extension needs to be installed on each artist's machine to use this integration. It can be installed automatically; see [Auto Install Extension](#auto-install-extension) for more information.Alternatively, artists can install it manually. For more details, refer to the [Premiere Extension installation](addon_premiere_artist.md#premiere-extension-installation).


## Premiere settings

### Auto Install Extension
> Setting Location: `ayon+settings://premiere/auto_install_extension`

![](assets/premiere/admin/install_ayon_extension.png)

When enabled, it will try to install AYON Photoshop extension to user `appData` if it's not installed already.

Example: `C:\Users\YOUR_USER_NAME\AppData\Roaming\Adobe\CEP\extensions\io.ynput.PPRS.panel`

It checks extension version for current addon version and updates it if necessary.

If artist has extension installed in original directory (`Program Files`), installation in `appData` takes a precedence.

Works for Windows and MacOS.

