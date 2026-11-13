---
title: After Effects addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON After Effects addon with their default values: extension install, panel, color management, render creator, publish plugins, workfile builder, templated workfile build and scripts."
addon: aftereffects
addon_repo: ayon-aftereffects
addon_version: 0.3.7
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-aftereffects/tree/0.3.7/server/settings
  - https://help.ayon.app/en/articles/4515672-aftereffects-addon-settings
---

# After Effects addon settings

<AddonInfo />

The settings of the [After Effects addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## General

| Setting | Default | Description |
|---|---|---|
| Install AYON Extension | On | A pre-launch hook installs the AYON extension into the user's Adobe CEP extensions folder (`Adobe/CEP/extensions/io.ynput.AE.panel` in the user's application data) and replaces it when its version differs from the bundled one. Failures are logged and do not stop the launch. |
| Auto-open AYON Panel | On | Opens the AYON panel on every After Effects launch. |

## OCIO config

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | After Effects follows the global color management, using the OCIO files set in the core addon. |
| Activate Host Rules (File Rules) | Off | Turn on the file rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Creator plugins

The **Create Render** creator.

| Setting | Default | Description |
|---|---|---|
| Review | On | Whether new render instances have the Review option on. |
| Default Variants | `Main` | The variants offered by default. |
| Force resolution and duration values from Task | On | When a render instance is created, sets the frame range, frame rate and resolution of the composition from the task. |
| Rename composition to product name | On | Renames the composition to the product name when the instance is created or its name changes, for example on a variant change. |
| Product type items | None | Optional product types that the creator can make, each with a **Product type** name and a **Label** shown in the UI. |

## Publish plugins

| Group | Setting | Default | Description |
|---|---|---|---|
| Collect Review | Enabled | On | Adds the review family to instances that have Review on. |
| Validate Scene Settings | Enabled | On | Compares the composition with the task or folder attributes. |
| | Optional | On | |
| | Active | On | |
| | Skip Resolution Check for Tasks | `.*` | Regex patterns of task names that skip the resolution check. The default pattern matches every task, so the resolution is not checked. |
| | Skip Timeline Check for Tasks | `.*` | Regex patterns of task names that skip the check of frame rate, frame range and handles. The default matches every task, so with the defaults only the duration (frame count including handles) is checked. |
| Validate Footage Location | Enabled | Off | Fails when footage is stored outside of the project roots. |
| | Optional | On | |
| | Active | On | |

The other plugins of the addon (for example Validate Footage Items, Validate Rendered Files, Validate Instance in Context, Increment Workfile) have no settings of their own.

## Workfile Builder

A simpler template that is chosen by task type.

| Setting | Default | Description |
|---|---|---|
| Create first workfile | Off | Saves the first workfile with the built template when no workfile exists. |
| Custom Templates | None | A list of templates. Each has **Task types** and a **Path** with one entry per platform (**Windows**, **Linux**, **MacOS**). |

## Templated Workfile Build Settings

A list of profiles, empty by default, for a workfile template that uses placeholders. A profile applies when it matches its filters.

| Setting | Default | Description |
|---|---|---|
| Task types, Task names | | Filters that select when the profile applies. |
| Path to template | | The template workfile. |
| Keep placeholders | Off | Keep the placeholders after the build. |
| Create first version | On | Save the first workfile version automatically. |

## Scripts

Scripts to run in After Effects, with an empty list by default.

| Setting | Default | Description |
|---|---|---|
| Script list | None | Each script has the three settings below. |
| Script name | | The name shown in the **Run Scripts...** window. |
| Auto | On | Automatic scripts run when a workfile is opened. Manual scripts are run from the panel. |
| Path to script | | Path of a `.js` or `.jsx` file. It can use template keys of the current context, the project roots and environment variables. |
