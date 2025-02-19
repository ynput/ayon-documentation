---
id: addon_mochapro_admin
title: Mocha Pro Admin Docs
sidebar_label: Mocha Pro
description: AYON Mocha Pro Addon's documentations for admins.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Mocha_Badge}
</ReactMarkdown>

## Overview

The Mocha Pro Addon for AYON provide features to manage you Mocha Pro workfiles, load clips and
publish tracking data and shape data.

:::note
This addon supports only Mocha Pro - the standalone application, not the plugin versions for DCCs.
:::

## Addon Settings

### Creator Plugins

#### Create Tracking Points
> Setting Location: `ayon+settings://mocha/create/CreateTrackingPoints`

![](assets/mocha/admin/create_tracking_points.png)

- **Enable**: When enabled, users can create `tracking points` products using the publisher tool.
- **Default Exporters**: Choose the default exporter for `tracking points` for each Mocha version.

#### Create Shapes
> Setting Location: `ayon+settings://mocha/create/CreateShapeData`

![](assets/mocha/admin/create_shapes.png)

- **Enable**: When enabled, users can create `Shapes Data` products using the publisher tool.
- **Default Exporters**: Choose the default exporter for `Shapes Data` for each Mocha version.