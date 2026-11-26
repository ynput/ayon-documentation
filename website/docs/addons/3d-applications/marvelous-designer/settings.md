---
title: Marvelous Designer addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Marvelous Designer addon with their default values: prelaunch directories, creator plugins, extractors and the point cache loader scale."
addon: marvelous_designer
addon_repo: ayon-marvelous-designer
addon_version: 1.1.4
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-marvelous-designer/tree/1.1.4/server
---

# Marvelous Designer addon settings

<AddonInfo />

The settings of the [Marvelous Designer addon](index.md) are in **Studio settings > Marvelous Designer**, and can be overridden per project in **Project settings > Marvelous Designer**. Pasting a location below into the URI bar of the web app opens that setting. How studio values, project overrides and addon versions combine is described in [Settings](../../../ayon/how-ayon-works/settings.md). The Marvelous Designer executables are defined in the Applications addon, not here.

## Prelaunch settings

<SettingLocation uri="ayon+settings://marvelous_designer/prelaunch_settings" scope="Studio, with project overrides" />

Folders used by the launch hooks that prepare Marvelous Designer when the AYON Launcher starts it. Each setting holds one path, valid on one operating system, so studios with several operating systems override it per project or keep the same path on every machine. When a folder does not exist, the hook logs a warning and skips its step.

<!-- screenshot: settings editor, Prelaunch Settings -->

<Settings>
<Setting name="Qt Binding Directory" default="/Users/Public/Documents/MarvelousDesigner/Configuration/python311/Lib/site-packages">

The `site-packages` folder of the Python of Marvelous Designer. The hook installs PySide6 there and points `QtDir` and `QT_PLUGIN_PATH` to it.

</Setting>
<Setting name="Plugins Directory" default="/Users/Public/Documents/MarvelousDesigner/Configuration/Plugins">

The folder that holds `pluginSettings.json`. The hook adds the AYON plugin entry to that file, so that **ayon_plugins** appears in the plugin system of Marvelous Designer.

</Setting>
</Settings>

## Create

<SettingLocation uri="ayon+settings://marvelous_designer/create" scope="Studio, with project overrides" />

One entry per creator. Each has a **Product type items** list: product types the creator can make on top of its product base type, each shown as its own entry in the Publisher's create list. See [Product type, variant and product name](../../../pipeline/product-types.md#product-type-variant-and-product-name). The workfile creator has no settings.

<!-- screenshot: settings editor, Create -->

<Settings>
<Setting name="Create Model">

<Settings>
<Setting name="Product type items" default="Empty list">

<Settings>
<Setting name="Product type">

Name of the product type.

</Setting>
<Setting name="Label">

How the Publisher shows the product type.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Create Point Cache">

<Settings>
<Setting name="Product type items" default="Empty list">

Same fields as for **Create Model**.

</Setting>
</Settings>

</Setting>
<Setting name="Create Zfab">

<Settings>
<Setting name="Product type items" default="Empty list">

Same fields as for **Create Model**.

</Setting>
</Settings>

</Setting>
</Settings>

## Publishers

<SettingLocation uri="ayon+settings://marvelous_designer/publish" scope="Studio, with project overrides" />

The extractors that write the published files. Each has three switches: **Enabled** (the plugin runs), **Optional** (the artist can turn it off in the Publisher) and **Active** (it is turned on by default in the Publisher).

<!-- screenshot: settings editor, Publishers -->

<Settings>
<Setting name="Extract Point Cache" default="Enabled, optional, active" />
<Setting name="Extract OBJ" default="Enabled, optional, active" />
<Setting name="Extract FBX" default="Enabled, optional, active" />
</Settings>

## Loaders

<SettingLocation uri="ayon+settings://marvelous_designer/load" scope="Studio, with project overrides" />

Options of the loaders.

<!-- screenshot: settings editor, Loaders -->

<Settings>
<Setting name="Load Point Cache">

<Settings>
<Setting name="Scale" default="1.0">

Scale factor applied when loading Alembic, FBX and OBJ point caches, for example to convert between the units of the source application and those of Marvelous Designer.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Marvelous Designer addon](index.md)
- [Product types](../../../pipeline/product-types.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
