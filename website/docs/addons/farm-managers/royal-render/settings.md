---
title: Royal Render addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Royal Render addon with their default values: enabling the addon, Royal Render root paths and review generation."
addon: royalrender
addon_repo: ayon-royalrender
addon_version: 0.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-royalrender/tree/0.4.1/server
---

# Royal Render addon settings

<AddonInfo />

The settings of the [Royal Render addon](index.md) are in **Studio settings > Royal Render**, with overrides in **Project settings > Royal Render**. Pasting a location below into the URI bar of the web app opens that setting. The job configuration and scripts copied into the studio's `RR_ROOT` are not addon settings; they are described on the [Royal Render addon](index.md) page.

## Enable addon

<SettingLocation uri="ayon+settings://royalrender/enabled" scope="Studio; project overrides are ignored" />

Turns the addon on or off. The addon reads this switch from the studio settings when it starts, so a project override has no effect.

<!-- screenshot: settings editor, Enabled -->

<Settings>
<Setting name="Enabled" default="Disabled">

The addon ships disabled: turn it on before submitting to Royal Render.

</Setting>
</Settings>

## Royal Render Root Paths

<SettingLocation uri="ayon+settings://royalrender/rr_paths" scope="Studio only" />

Named RR root folders, one path per operating system. Projects choose among them by name in [Selected Royal Render Paths](#selected-royal-render-paths).

<!-- screenshot: settings editor, Royal Render Root Paths -->

<Settings>
<Setting name="Royal Render Root Paths" id="rr-paths" default="One entry, default, with empty paths">

<Settings>
<Setting name="Name" default="default">

Name that the selection refers to.

</Setting>
<Setting name="Windows" default="Empty" />
<Setting name="Linux" default="Empty" />
<Setting name="MacOS" default="Empty" />
</Settings>

</Setting>
</Settings>

## Selected Royal Render Paths

<SettingLocation uri="ayon+settings://royalrender/selected_rr_paths" scope="Studio, with project overrides" />

The root paths a project submits through.

<!-- screenshot: settings editor, Selected Royal Render Paths -->

<Settings>
<Setting name="Selected Royal Render Paths" id="selected-rr-paths" default="default">

Names of entries of [Royal Render Root Paths](#royal-render-root-paths). For each instance, the first listed root whose path for the current operating system exists is used.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://royalrender/publish" scope="Studio, with project overrides" />

Options of the publish plugins of the addon.

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Collect Sequences from the Job" default="Generate reviews enabled">

Collects the file sequences rendered by the job for publishing.

<Settings>
<Setting name="Generate reviews from sequences" default="Enabled">

Adds the review family to the collected sequences, so reviews are generated from them.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Royal Render addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
