---
title: ComfyUI addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON ComfyUI addon with their defaults: local launch profiles, remote connection profiles, ports, launch arguments, extra directories and creators."
addon: comfyui
addon_repo: ayon-comfyui
addon_version: 0.0.28
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-comfyui/tree/0.0.28/server
  - https://help.ayon.app/en/articles/6794401-ayon-comfyui-setup-guide
---

# ComfyUI addon settings

<AddonInfo />

The settings of the [ComfyUI addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The launch settings are organized as lists of named profiles; the **ComfyUI profile** dialog at launch offers one of them. By default both lists are empty, so at least one profile has to be added before ComfyUI can be launched or connected.

All string settings that hold paths, directories and launch arguments accept anatomy template keys such as `{roots[work]}/{project[name]}`.

## ComfyUI local launch options

Shared by all local profiles.

| Setting | Default | Description |
|---|---|---|
| Default port for website user interacts with. | 5454 | Port of the wrapper page that embeds ComfyUI in an `<iframe>`. |
| Default port to pulse connection to backend | 55055 | Websocket port of the heartbeat that checks the backend is alive. |
| Default port for frontend websocket RPC | 55056 | Websocket port used to talk to the browser. |
| Local configuration entry | empty list | The local profiles. |

### Local configuration entry

| Setting | Default | Description |
|---|---|---|
| Setting name | empty | Name of the profile. It also names the managed virtual environment. |
| Port for ComfyUI (default = 8188) | 8188 | ComfyUI is started on `http://127.0.0.1:<port>`. |
| ComfyUI folder on windows. / on Linux. / on MacOsx. | empty | The ComfyUI folder for each platform (the folder that contains ComfyUI itself, not the portable build root). |
| Use alternate python? | Off | Use a custom python executable, for a ComfyUI taken from its git repository. |
| Use managed virtual environment with python | On | Outside Windows, create a virtual environment in the AYON folder and install the dependencies from ComfyUI's `requirements.txt` into it, based on the custom python or the default `python`. Keeping it on is recommended. |
| Windows / Linux / MacOsx | empty | The custom ComfyUI python path for each platform. |
| Launch configuration | see below | Launch arguments and extra directories. |

### Launch configuration

| Setting | Default | Description |
|---|---|---|
| Is windows path a 'portable windows' build? | On | On Windows, take the python from `python_embeded` and add the `--windows-portable` flag to the launch arguments. |
| Omit included plugin (use for developing) | Off | Do not use the `ayon_menu` plugin included in the addon. A **Custom Nodes** extra directory that holds the plugin is then required. |
| Launch arguments for Windows / Linux / MacOsx | empty | Extra launch arguments, as a list of **Key** and **Value (can be empty)** pairs. |
| Extra directories | empty list | Directories that are added to the configuration file that ComfyUI reads at start. |

### Extra directory

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Switches the entry on or off. |
| Name | empty | Name used in diagnostics. |
| Folder type | Automatic (Based on subdirectory name) | What ComfyUI expects in the directory. **Automatic (Based on subdirectory name)** includes subdirectories that follow ComfyUI naming conventions. **Automatic (No validity checking, all subdirectories)** adds all subdirectories without checking their names. Single-purpose types follow, such as **Custom Nodes**, **Checkpoints**, **Diffusion Models**, **Diffusers**, **LoRAs**, **VAEs** and **ControlNet**. |
| Custom directories windows / linux / MacOsx | empty | Directories for each platform. |

## ComfyUI remote launch options

| Setting | Default | Description |
|---|---|---|
| Remote configuration entry | empty list | The remote profiles. |

### Remote configuration entry

| Setting | Default | Description |
|---|---|---|
| Entry Name | empty | Name of the profile. |
| Default port to pulse connection to backend | 55055 | Heartbeat websocket port. It must match the port configured on the server (`AYON_BACKEND_PORT` in the plugin's `consts.py`). |
| Default port for frontend RPC | 55056 | Websocket port used to talk to the browser. |
| Default port for website user interacts with. | 5454 | Port of the wrapper page. |
| ComfyUI Web Address | `http://127.0.0.1:8188` | Address of the ComfyUI frontend, for example `https://comfyui.contoso.com` for a server on the web. |
| Open browser on connect? | On | Open the browser when the connection is made. |

## Creators

Each of the three creators has the same settings. They are applied to the creator class as attributes by the settings category `comfyui`.

| Creator | Enabled | Default Variants | Description |
|---|---|---|---|
| Create Image | On | `Main` | Creator of `image` products. |
| Create Model | On | `Main` | Creator of `model` products. |
| Create Video | On | `Main` | Creator of `render` products. |

Each also has **Product type items**, an optional list of product type and label pairs (**Product type**, **Label**) that is empty by default. The addon does not use this list.
