---
title: Review Desktop addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Review Desktop addon with their default values: the application variant filter and the default representation of the Open Review Session action."
addon: review_desktop
addon_repo: ayon-review-desktop
addon_version: 0.0.7
addon_scope: pipeline
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-11-24
---

# Review Desktop addon settings

<AddonInfo />

The settings of the [Review Desktop addon](index.md) are in **Studio settings > Review Desktop**, with overrides in **Project settings > Review Desktop**. Pasting a location below into the URI bar of the web app opens that setting. The Open RV variants the action can start, with their executables and arguments, are not set here: they are defined for the `openrv` application group in the [Applications addon](../../essentials/applications/settings.md).

## General

<SettingLocation uri="ayon+settings://review_desktop/enabled" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Enabled -->

<Settings>
<Setting name="Enabled" default="Enabled">

Turns the addon on or off.

</Setting>
</Settings>

## Actions

<SettingLocation uri="ayon+settings://review_desktop/actions" scope="Studio, with project overrides" />

The **Open session on desktop app** action, which opens a list as a session in the player; see [Opening a list as a session](index.md#opening-a-list-as-a-session).

<!-- screenshot: settings editor, Actions -->

<Settings>
<Setting name="App Variant Regex" default="^openrv/.*$">

Regular expression matched against application variants written as `<app>/<variant>`. Only matching variants are offered by the action. The application name at the start of the expression (here `openrv`) decides which application's variants are read from the Applications addon. When nothing matches, all variants of that application are offered. An empty value falls back to `openrv/.*`.

</Setting>
</Settings>

### Open Review Session

<SettingLocation uri="ayon+settings://review_desktop/actions/open_review_session" scope="Studio, with project overrides" />

<Settings prefix="open-review-session">
<Setting name="Enabled" default="Enabled">

Shows the **Open session on desktop app** action on lists. Turning it off removes the action.

</Setting>
<Setting name="Default Representation" default="^exr$">

Regular expressions matched against representation names. For each version, the first representation that matches any of the patterns is preselected in the representation step of the action. The order of the patterns does not rank them.

</Setting>
</Settings>

## Related

- [Review Desktop addon](index.md)
- [Open RV addon](../../review-and-media-players/open-rv/index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
