---
title: SpeedTree addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SpeedTree addon with their default values: the Pipeline SDK directory, the custom workfile template and the Model creator."
addon: speedtree
addon_repo: ayon-speedtree
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-speedtree/tree/0.2.1/server
---

# SpeedTree addon settings

<AddonInfo />

The settings of the [SpeedTree addon](index.md) are in **Studio settings > SpeedTree**, and can be overridden per project in **Project settings > SpeedTree**. Pasting a location below into the URI bar of the web app opens that setting. How studio values, project overrides and addon versions combine is described in [Settings](../../../ayon/how-ayon-works/settings.md). The SpeedTree executables are defined in the Applications addon, not here.

## General

<SettingLocation uri="ayon+settings://speedtree/sdk_directory" scope="Studio, with project overrides" />

The two paths that the launch hooks use when the AYON Launcher starts SpeedTree. The custom template is at `ayon+settings://speedtree/template_path`.

<!-- screenshot: settings editor, SpeedTree general settings -->

<Settings>
<Setting name="Pipeline SDK directory" default="/path/to/bindings/python/python3.9">

The folder of the Python bindings of the SpeedTree Pipeline SDK, the one that contains the `speedtree` package (`bindings/python/python3.9` in the SDK). The default is a placeholder and must be replaced.

At launch, a hook reads the SDK version from this folder, copies the folder into the addon (under `api/sdk/speedtree/<version>`, updating it when it is out of date) and adds that copy to `PYTHONPATH`. When the Perforce addon is installed, the folder is synced from Perforce first.

</Setting>
<Setting name="Custom Template Path">

An `.spm` file copied as the new project when SpeedTree is launched without a workfile. When it is empty, or the file does not exist, the `tree_templates/Games/Blank.spm` of the SpeedTree installation is used.

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://speedtree/create" scope="Studio, with project overrides" />

Settings of the creators.

<!-- screenshot: settings editor, Create Plugins -->

<Settings>
<Setting name="Create Model">

Creator of `model` products.

<Settings>
<Setting name="Product type items" default="Empty list">

Product types the creator can make on top of its product base type, each shown as its own entry in the Publisher's create list. See [Product type, variant and product name](../../../pipeline/product-types.md#product-type-variant-and-product-name).

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
</Settings>

## Related

- [SpeedTree addon](index.md)
- [Product types](../../../pipeline/product-types.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
