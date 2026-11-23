---
title: Motionbuilder addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Motionbuilder addon, which has one area: the product type items of the Animation creator."
addon: motionbuilder
addon_repo: ayon-motionbuilder
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-motionbuilder/tree/0.2.1/server/settings
---

# Motionbuilder addon settings

<AddonInfo />

The settings of the [Motionbuilder addon](index.md) are in **Studio settings > Motion Builder**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The addon has no validator or extractor settings: the publish behaviour it shares with other hosts is set in the settings of the core addon.

## Create plugins

<SettingLocation uri="ayon+settings://motionbuilder/create" scope="Studio, with project overrides" />

The product types that the creators offer.

<!-- screenshot: settings editor, Create plugins -->

<Settings>
<Setting name="Create animation">

<Settings>
<Setting name="Product type items" default="Empty list">

Optional list of product types that the Animation creator can create. The core creator base class reads this list to offer product types besides the creator's own product base type, `animation`.

<Settings>
<Setting name="Product type">

Name of the product type.

</Setting>
<Setting name="Label" default="Empty">

How the UI shows the product type.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Motionbuilder addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
