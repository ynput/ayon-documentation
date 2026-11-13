---
title: ComfyUI addon
sidebar_label: Overview
description: "The AYON ComfyUI integration: how ComfyUI is launched locally or connected remotely, the AYON menu and nodes inside ComfyUI, and the products it can create, publish and load."
addon: comfyui
addon_repo: ayon-comfyui
addon_version: 0.0.28
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-comfyui/tree/0.0.28
  - https://help.ayon.app/en/articles/6794401-ayon-comfyui-setup-guide
---

# ComfyUI addon

<AddonInfo />

The ComfyUI addon connects [ComfyUI](https://github.com/Comfy-Org/ComfyUI), a node-based interface for generative image, video and 3D workflows, to AYON. It launches a local ComfyUI or connects to a ComfyUI server that is already running, wraps the ComfyUI web interface in a page that talks to AYON, and adds an AYON panel and AYON nodes inside ComfyUI. With them, artists open workfiles, load products into the graph, and publish generated images, videos and 3D models. Workfiles are ComfyUI graphs saved as `.json`. The settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| Applications addon | An application entry with the name and host name `comfyui` (lowercase) in the applications settings, which the AYON Launcher then lists. |
| ComfyUI | The plugin was tested with the ComfyUI Windows standalone build 0.18.1. |
| AYON core addon, server, launcher | No minimum. |

The addon declares the host name `comfyui` and ships a ComfyUI custom node folder, `ayon_menu`. A local launch uses the folder included in the addon, unless **Omit included plugin** is on. A remote ComfyUI server needs `ayon_menu` copied into its `custom_nodes` folder, because the addon cannot launch or modify a server it only connects to.

## Launch and connection

When the application is launched locally, the pre-launch hook `ComfyPrelaunchHook` replaces the launch command with the addon's launch script, which runs through the AYON launcher (in dev mode when it is on). The script shows a **ComfyUI profile** dialog to choose between a local and a remote profile defined in the settings.

| Mode | What happens |
|---|---|
| Local profile | AYON starts ComfyUI from the configured folder (on Windows, with the python of a portable build or a custom python), with the configured launch arguments and extra directories, then connects to it. Non-Windows launches can use a managed virtual environment. |
| Remote profile | AYON connects to the configured ComfyUI web address. The server must have the `ayon_menu` plugin. The browser can be opened automatically on connect. |

AYON serves a local wrapper page that embeds ComfyUI in an `<iframe>`. Three ports are involved: the wrapper page, a websocket for a heartbeat to the backend, and a websocket for RPC with the browser. A reverse proxy in front of a remote ComfyUI must not add `X-Frame-Options` or a restrictive `Content-Security-Policy`, so that the page can be embedded. String settings that hold paths and launch arguments accept anatomy template keys such as `{roots[work]}` and `{project[name]}`.

## AYON tools inside ComfyUI

The `ayon_menu` plugin adds a sidebar with actions that open the AYON tools, and an **AYON** node category.

| Tool | Opens |
|---|---|
| Workfiles | The Workfiles tool. Opening a workfile loads its graph. |
| Creator | The Creator, to add publish nodes. |
| Loader | The Loader, to load products into the graph. |
| Scene Inventory | The list of loaded products. |
| Publisher | The Publisher. |

A keybinding command, **Ayon Save Workfile**, saves the current graph into the AYON workfile path instead of using ComfyUI's own save. If the current tab has no associated workfile, it opens the Workfiles tool. It needs ComfyUI 0.18.x or newer, and it does not clear ComfyUI's unsaved-changes marker.

| Node | Purpose |
|---|---|
| **AYON Context** | Stores the AYON context information of the graph. |
| **AYON Image Save**, **AYON Video Save**, **AYON 3D Model Save** | Publish nodes. A creator adds one to the graph, and it provides the files that the publisher collects. |
| **AYON Load Image**, **AYON Load Video**, **AYON Load 3D Model** | Load nodes that hold products loaded from AYON. |

## Products it can create

| Creator | Product type | Notes |
|---|---|---|
| **Image** | `image` | Adds an image save node. Accepts batched images. Options: **Keep image metadata** (on), **Force re-cook on publish** (off), **Extra prefix for file**, **Use unique product name** (on), **Unique name included in saved file**, **PNG Compression level** (0 to 9, default 4). |
| **Video** | `render` | Adds a video save node. Options as for images, plus **Output Format | Codec** (`MP4 | H.264`, `WEBM | AV1`, `WEBM | VP9`), **WebM omit audio** (off) and **WebM Compression (FFMPEG CRF)** (0 to 63, default 32). |
| **3D Model** | `model` | Adds a 3D model save node. Options as for images, plus **Fallback export format** (`obj`, marked experimental, or `glb`) that is used when the node receives a mesh. |
| **Workfile** | `workfile` | Auto creator for the current graph. |

The product name is built from the prefix, the unique name (when used) and the variant. Creating a second instance with the same product name fails with a name collision error.

## Publishing

| Plugin | Product type | What it collects |
|---|---|---|
| **Collect Workfile** | `workfile` | The current graph as the workfile. |
| **Collect Generated Images** | `image` | The saved image files as a `png` representation, plus a thumbnail. |
| **Collect Generated Video + Thumbnail** | `render` | The saved video, `.mp4` or `.webm`, plus a `png` thumbnail. |
| **Collect Generated Model** | `model` | The saved model, one of `.gltf`, `.glb`, `.obj`, `.fbx`, `.stl`, `.spz`, `.splat`, `.ply`, `.ksplat`. |
| **Increment Workfile** | `workfile` | Optional. Saves the workfile as a new version after a successful publish, and does nothing when a plugin failed. |

The addon has no validators or extractors of its own. The files are written by the ComfyUI save nodes, and the collectors read them back from ComfyUI.

## Loading

| Loader | Product types | Formats |
|---|---|---|
| Load image(s) into current graph. | any | any representation |
| Load video into current graph. | any | any representation |
| Load model into current graph. | `model` | `.fbx`, `.splat`, `.ply`, `.obj`, `.stl`, `.spz`, `.ksplat`, `.gltf`, `.glb` |

Each loader adds a load node to the graph and implements load, update, switch and remove.

## Related

- [ComfyUI addon settings](settings.md)
