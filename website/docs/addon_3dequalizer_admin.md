---
id: addon_3dequalizer_admin
title: 3DEqualizer Admin Docs
sidebar_label: 3DEqualizer
description: AYON 3DEqualizer Addon's documentations for admins.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Equalizer_Badge}
</ReactMarkdown>

## Overview

To get 3DEqualizer (3DE) addon running, we need to instal Qt Python bindings - for that we are using pre-launch hook that is automatically installing PySide2/6 into (3DE) Python. You can use ```TDE4_HOME``` environment variable to set the location, or it will be detected from the AYON settings.

:::warning Python Bindings
This automatic **PySide2/6** installation might fail if 3DE is used from protected location (either network drive or some user write restricted location). If this happens, you need to install PySide there manually.
:::

### Environment

3DE Addon is using ```AYON_TDE4_HEARTBEAT_INTERVAL``` environment variable to control how often it should yield control from Qt processes back to 3DE. This value can influence stability of 3DE and its responsivness. Default value is 500.

AYON is also using ```PYTHON_CUSTOM_SCRIPTS_3DE4``` environment variable to install itself to 3DE menu. It is appending to it but if you overwrite this variable using some startup script or rez, AYON menu won't be shown in 3DE.
