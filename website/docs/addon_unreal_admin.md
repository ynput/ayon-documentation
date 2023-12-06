---
id: addon_unreal_admin
title: Unreal Admin Docs
sidebar_label: Unreal
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Unreal_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Custom location of the Ayon plugin for Unreal Engine

Sometimes you might want to use custom paths for the location of plugin for Ayon, instead of using the Marketplace one. This can be useful if you want to make changes to the plugin or want to distribuite the compiled plugin. In this section, we will explain how to set these custom paths.

### Setting custom paths for the UE project of the plugin

This is the source code of the plugin that you can use to make changes to the plugin. By setting this path, when first launching Unreal, the plugin will be compiled and added to the engine as a plugin, and available for any project you create in the future.

To use a custom path for the UE project of the plugin, you need to set an environment variable called `AYON_UNREAL_PLUGIN`. This variable should point to the directory where the source plugin is located. For example, if you have the source plugin in `C:/Ayon/Source`, you should set the following environment variable:

`AYON_UNREAL_PLUGIN=C:/Ayon/Source`

You can set this variable either in Ayon Studio Setting in `applications/unreal/environment`, or, from there, to a specific version of Unreal.

### Setting custom paths for the compiled plugin

If you already have compiled the plugin and want to distribute it, you can set a custom path for the compiled plugin. By setting this path, when first launching Unreal, the plugin will be added to the engine as a plugin, and available for any project you create in the future.

To use a custom path for the compiled plugin, you need to set an environment variable called `AYON_BUILT_UNREAL_PLUGIN`. This variable should point to the directory where the plugin is located. For example, if you have the plugin in `C:/Ayon/CompiledPlugin`, you should set the following environment variable:

`AYON_BUILT_UNREAL_PLUGIN=C:/Ayon/CompiledPlugin`

You can set this variable either in Ayon Studio Setting in `applications/unreal/environment`, or, from there, to a specific version of Unreal.
