---
title: Substance Designer addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Substance Designer addon with their default values: color management, project creation templates and the Textures and Sbsar creators."
addon: substancedesigner
addon_repo: ayon-substance-designer
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-substance-designer/tree/0.2.1/server/settings
  - https://help.ayon.app/en/articles/7771155-substance-designer-addon-settings
  - https://help.ayon.app/en/articles/4514163-configure-substance-designer-addon
---

# Substance Designer addon settings

<AddonInfo />

The settings of the [Substance Designer addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Substance Designer follows the global color management. This is the master switch of the section. |
| Activate Host Rules (File Rules) | Off | Turn on the file rules of this host. They override the global ones. |
| Rules | Empty list | File rules. A rule has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Project creation

### Project templates

A list of templates. The default list is empty, so no package is built. Each entry adds one graph to the package that is built at startup.

| Setting | Default of a new entry | Description |
|---|---|---|
| Graph Name | `default` | The name of the created graph. |
| Document Resolution | 1024 | The output size of the graph, from 2 to 8192 (powers of two), applied to width and height. The stored value is the exponent: 10 means 1024. |
| Template Type | Default Substance Template | One of **Default Substance Template**, **Custom Template** or **Template By Task Types**. Each type shows different settings. |

Settings of the **Default Substance Template** type:

| Setting | Default | Description |
|---|---|---|
| Template | Empty | The Substance Designer template to build the graph from: Empty, Metallic Roughness (also the Anisotropy, Coated, SSS and Sheen variants), Adobe Standard Material, Specular Glossiness, Blinn, Scan Processing (Metallic Roughness, Specular Glossiness), AxF to Metallic Roughness, AxF to Specular Glossiness, AxF to AxF, Studio Panorama, the Painter Filter and Generator templates, Sample Filter and CLO Metallic Roughness. |

Settings of the **Custom Template** type:

| Setting | Default | Description |
|---|---|---|
| Custom Template Graph Name | Empty | The name of the graph in the custom template file to use. When empty, the entry is skipped. |
| Path to Custom Template | Empty | The path of the `.sbs` file. It supports template keys, for example the project roots. When empty, the entry is skipped. |

Settings of the **Template By Task Types** type:

| Setting | Default | Description |
|---|---|---|
| Task types | Empty | The task types the template is meant for. |
| Path to template | Empty | The path of the `.sbs` file. It supports template keys. |

## Creator plugins

### Create Textures

| Setting | Default | Description |
|---|---|---|
| Review | Off | Default of the Review option of new texture set instances. |
| Image Output File Type | png | Default image format of new texture set instances. The settings list offers bmp, dds, jpeg, png, tga, tif, surface, hdr, exr, jif, jpe and webp. |
| Product type items | Empty list | Optional list of product types the creator can create. Each item has a **Product type** and a **Label**. |

### Create SBSAR

| Setting | Default | Description |
|---|---|---|
| Product type items | Empty list | Optional list of product types the creator can create. Each item has a **Product type** and a **Label**. |
