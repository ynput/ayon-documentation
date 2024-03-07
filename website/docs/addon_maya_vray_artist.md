---
id: addon_maya_vray_artist
title: VRay for Maya
sidebar_label: VRay
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Maya_Badge}
</ReactMarkdown>

## Working with VRay in AYON

### #Using VRay Proxies

AYON support publishing, loading and using of VRay Proxy in look management. Their underlying format
can be either vrmesh or alembic.

:::warning vrmesh or alembic and look management
Be aware that **vrmesh** cannot be used with looks as it doesn't retain IDs necessary to map shaders to geometry.
:::

### Creating VRay Proxy

To create VRay Proxy, select geometry you want and - **AYON → Create ...** select **VRay Proxy**. Name your
product as you want and press **Create** button.

This will create `vrayproxy` set for your product. You can set some options in Attribute editor, mainly if you want
export animation instead of single frame.

![Maya - VRay Proxy Creation](assets/maya/artist/vray_proxy.jpg)

### Publishing VRay Proxies

VRay Proxy can be published - **AYON → Publish ...**. It will publish data as VRays `vrmesh` format and as
Alembic file.

## Using VRay Proxies

You can load VRay Proxy using loader - **AYON → Loader ...**

![Maya - VRay Proxy Creation](assets/maya/artist/vray_proxy-loader.jpg)

Select your product and right-click. Select **Import VRay Proxy (vrmesh)** to import it.

:::note
Note that even if it states `vrmesh` in descriptions, if loader finds Alembic published along (default behavior) it will
use abc file instead of vrmesh as it is more flexible and without it looks doesn't work.
:::
