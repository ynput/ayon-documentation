---
title: Zbrush addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Zbrush addon with their default values: stopping the timer on exit and the creator plugins."
addon: zbrush
addon_repo: ayon-zbrush
addon_version: 0.4.2
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-zbrush/tree/0.4.2/server/settings
---

# Zbrush addon settings

<AddonInfo />

The settings of the [Zbrush addon](index.md) are in **Studio settings > Zbrush**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The addon has no settings for its publish plugins: its validator is turned on or off only through its optional state in the Publisher.

## General

<SettingLocation uri="ayon+settings://zbrush/stop_timer_on_application_exit" scope="Studio, with project overrides" />

A single field at the top of the addon settings.

<!-- screenshot: settings editor, Zbrush general settings -->

<Settings>
<Setting name="Stop timer on application exit" default="Disabled">

Stops the running timer of the Timers Manager when Zbrush closes. Has an effect only when the Timers Manager addon is in the bundle.

</Setting>
</Settings>

## Create plugins

<SettingLocation uri="ayon+settings://zbrush/create" scope="Studio, with project overrides" />

The product types that the creators offer.

<!-- screenshot: settings editor, Create plugins -->

<Settings>
<Setting name="Create Model">

<Settings>
<Setting name="Product type items" default="Empty list">

Optional list of product types the creator can create.

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

- [Zbrush addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
