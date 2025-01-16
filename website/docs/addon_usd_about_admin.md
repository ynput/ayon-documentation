---
id: addon_usd_about_admin
title: About
sidebar_label: About
description: AYON USD Addon introduction for admins.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<div class="container">
  <div class="row">
    <div class=".col-sm-" style={{'margin-right':10+'px'}}>
      <ReactMarkdown>
        {versions.Core_Badge}
      </ReactMarkdown>
    </div>
    <div class=".col-sm-" style={{'margin-right':10+'px'}}>
      <ReactMarkdown>
        {versions.USD_Badge}
      </ReactMarkdown>
    </div>
    <div class=".col-sm-"  style={{'margin-right':10+'px'}}>
      <ReactMarkdown>
        {versions.Houdini_Badge}
      </ReactMarkdown>
    </div>
    <div class=".col-sm-" style={{'margin-right':10+'px'}}>
      <ReactMarkdown>
        {versions.Maya_Badge}
      </ReactMarkdown>
    </div>
    <div class=".col-sm-" style={{'margin-right':10+'px'}}>
      <ReactMarkdown>
        {versions.Blender_Badge}
      </ReactMarkdown>
    </div>
  </div>
</div>

## USD Addon Features

### USD Resolver Distribution

Currently, the usd addon is only responsible for downloading of USD binaries for AYON, along with pre-built AYON USD resolvers for various DCCs.

Once you enable and configure [Binary Distribution](addon_usd_admin.md#binary-distribution) setting, usd addon will download a matching AYON USD 
Resolver automatically for the launched application (if there's a compatible build for it). 

We provide multiple recent versions of major DCCs, like Houdini and Maya.

<!-- 
  <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span>
  <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span>
  <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>Darwin</span>
 -->

:::tip Available Builds
**Resolver Application Paths** setting comes pre-configured with all of the available builds on our [lakeFS](https://lake.ayon.cloud) server.

- **Unreal**: <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span>
  - `Unreal 5.4 Py 3.9`
- **Maya**: <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span>
  - `Maya 2024.2 Py 3.10`
  - `Maya 2025 Py 3.11`
- **Houdini**: <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span>
  - `Houdini 19.5 Py 3.7`
  - `Houdini 19.5 Py 3.9`
  - `Houdini 20 Py 3.9`
  - `Houdini 20 Py 3.10`
  - `Houdini 20.5 Py 3.10`
  - `Houdini 20.5 Py 3.11`
- **USD Standalone**: <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> <span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span>
  - `USD 23.5 Py 3.9`
:::

### USD Workflow Plugins

The base functionality of our USD workflow, outlined in our [USD Artist Docs](category/usd), is implemented in the [ayon-core](https://github.com/ynput/ayon-core) addon and each DCC specific workflow is implemented in its related DCC addon. e.g. Houdini USD workflow is implemented in [ayon-houdini](https://github.com/ynput/ayon-houdini).
Therefore, there's no need to install the [ayon-usd](https://github.com/ynput/ayon-usd) addon to utilize our USD workflow.

:::caution Future Consideration
It is considered to move all the USD bits into [ayon-usd](https://github.com/ynput/ayon-usd) addon in a similar fashion to [ayon-deadline](https://github.com/ynput/ayon-deadline) addon.
:::


### Pinning

The AYON USD Resolver supports **pinning**, mapping an entity URI to a 
resulting path without requiring a server connection. This is crucial for
(large) render farms to avoid the many resolves and server queries degrading
the server's performance.

<!-- **TODO** Explain how the pinning works technically and what env vars will be set to enable pinning in the resolver. -->

### API and Technical References

Looking for more technical documentation? The [AYON-USD Resolver repository](https://github.com/ynput/ayon-usd-resolver) contains more details about the resolver itself and provides a link to the [AYON USD Resolver API documentation](https://ynput.github.io/ayon-usd-resolver/index.html).