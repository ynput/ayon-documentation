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


## AYON Perforce Support

:::tip
AYON has a dedicated addon for Perforce support.
Please refer to [Version Control Admin Docs](category/version-control) to learn more.
:::

## Manually installing Qt bindings

It might happen that automatic installation of th Qt bindings into Unreal fails. It that case here are manual steps that can be taken to amend it:

### Option A (preferred)

Using Unreal's Python interpreter (located on a path like `Engine\Binaries\ThirdParty\Python3\Win64` depending on the platform):

```sh
python -m pip install pyside6
```
### Option B (unsupported)
You can run following python code either directly from Unreal or using Unreal's Python interpreter:

```python
import pip
pip.main(["install", "pyside6"])
```

Be aware that calling **pip** like so is deprecated by pip itself and might not work in newer versions.

:::note
For Unreal Engine versions `>= 5.4`, use `pyside6`. For earlier versions, use `pyside2`.
:::
