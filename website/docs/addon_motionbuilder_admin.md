---
id: addon_motionbuilder_admin
title: Motionbuilder Admin Docs
sidebar_label: Motionbuilder
---
import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.MotionBuilder_Badge}
</ReactMarkdown>

:::caution Unknown support for MotionBuilder 2023 and below

The AYON MotionBuilder addon was initially developed with MotionBuilder 2024 and 2025.
Hence functionality was not tested in older versions than 2024 and may not work.
:::

## Supported Workflows

The MotionBuilder addon currently enables you to import models, rigs, animations, and cameras. It also supports exporting animations and managing workfiles through saving, opening, and publishing.

:::info MotionBuilder Addon Settings
The MotionBuilder addon does not include individual settings, so it won't be listed in your studio's addon settings. However, this does not affect the addon's ability to utilize the core settings.
:::

## Publish Plugins

The MotionBuilder addon leverages the plugins from the core addon. Many of these plugins offer filters where you can specify motionbuilder as the host. For example:

- **Validate Version:** Ensures that the workfile version is up to date with the latest in AYON. Access this validator at `ayon+settings://core/publish/ValidateVersion` and include MotionBuilder's host name, which by default is `motionbuilder`.
![](assets/motionbuilder/valid_version_plugin.png)


- **Validate Outdated Container:** Checks that any loaded content is the most recent version. This validator is accessible at `ayon+settings://core/publish/ValidateOutdatedContainers`. Add MotionBuilder's host name, which by default is `motionbuilder`.
![](assets/motionbuilder/validate_outdated_containers.png)
