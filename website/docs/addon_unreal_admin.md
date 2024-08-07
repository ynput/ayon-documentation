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


### Farm rendering via Deadline

AYON Unreal integration supports rendering on Deadline, please take a look how to setup Deadline [here](addon_deadline_admin.md).

Deadline requires Render Queue and Render Settings uassets to be physically present in unreal project at expected locations.

By default they are expected at these paths:
- `/Game/Ayon/renderQueue`
- `/Game/Ayon/DefaultMovieRenderQueueConfig.DefaultMovieRenderQueueConfig`

These could be modified by AYON admin in `ayon+settings://unreal/render_queue_path`.

![Unreal AYON Render Queue and Settings](assets/unreal_render_queue_and_settings.png)

Deadline workers need to expose location of Unreal editor for rendering via `UnrealExecutable` (or `UnrealEditorExecutable_5_4` for specific version) environment variable.
This variable could be set locally on the workers as needed or could be set and controlled by AYON by setting it in 
`ayon+settings://applications/applications/unreal/variants/3/environment`

Default value could be there as:
```
{
    "UnrealExecutable": {"windows": "C:/Program Files/Epic Games/UE_5.4/Engine/Binaries/Win64/UnrealEditor-Cmd.exe"},
}
```
Please notice platform suport with `windows` key (could be also `linux` value).


### Perforce support

There is also a Perforce support for rendering on a Deadline. `ayon-version-control` addon needs to be installed and configured for that.
(Install addon from AYON Marketplace or from https://github.com/ynput/ayon-version-control).

This addon requires configuration in `Studio Settings` where `Perforce` should be selected as `Backend name`, `Host name` and `Port` filled.

Each artist using this integration need to configure their `Local Setting` in `ayon+settings://version_control/local_setting?project=ayon_test&site=XXX-YYY-ZZZ`

![Unreal AYON Local Settings](assets/unreal_perforce_local_settings.png)

It is expected that value in `My Workspace Directory` would be pointing to existing and configured Perforce workspace on artist machine.
Initial checkout from Perforce should be done by P4V tool. 

AYON Perforce integration handles currently only rendering from P4 on Deadline, commits to Unreal project should be done in P4V or with 
official Unreal Perforce plugin inside of Unreal editor.

Each Deadline worker for this integration need to have set env vars:
- P4PORT (`perforce_host:1666`)
- P4USER
- P4PASSWD

Again these variables could be set locally on the worker or be controlled by AYON in `ayon+settings://applications/applications/unreal/variants/3/environment`.
Please make sure you are modifying appropriate `Variant` of Unreal application as this configuration is separate.