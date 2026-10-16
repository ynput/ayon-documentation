---
title: Silhouette addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Silhouette addon with their default values: AYON menu and shortcuts, session defaults, color management, loaders, creators, publish plugins and the templated workfile build."
addon: silhouette
addon_repo: ayon-silhouette
addon_version: 0.2.2
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-silhouette/tree/0.2.2/server/settings
  - https://help.ayon.app/en/articles/5294823-silhouette-addon-settings
---

# Silhouette addon settings

<AddonInfo />

The settings of the [Silhouette addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Extractors share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## AYON menu

Customizes the AYON menu in Silhouette.

| Setting | Default | Description |
|---|---|---|
| Set Frame Range | On | Shows the menu entry that sets the active session's frame range and frame rate from the current task. |
| Set Resolution | On | Shows the menu entry that sets the active session's resolution from the current task. |

### Shortcuts

Keyboard shortcuts for the AYON tools, as text such as `ctrl+alt+c`. An empty value assigns no shortcut.

| Setting | Default |
|---|---|
| Create... | `ctrl+alt+c` |
| Publish... | `ctrl+alt+p` |
| Load... | `ctrl+alt+l` |
| Manage... | `ctrl+alt+m` |
| Workfiles... | Empty |
| Build Workfile... | `ctrl+alt+b` |
| Version Up Workfile | `alt+shift+s` |

## Session default settings

| Setting | Default | Description |
|---|---|---|
| Bit Depth | `8` | Default bit depth of the workfile session. Choices: `8` (8 Bit), `F16` (Float 16), `F32` (Float 32). |

## Color management (ImageIO)

| Setting | Default | Description |
|---|---|---|
| Enable Color Management | On | Turns on color management for Silhouette. |
| Activate Host Rules (File Rules) | Off | Overrides the global file rules with the rules of this host. |
| Rules | None | Rules that assign a colorspace to files. Each has a **Rule name**, a **Regex pattern**, a **Colorspace name** and a **File extension**. |

## Load

### Load Source

| Setting | Default | Description |
|---|---|---|
| Set Session Frame Range on Load | Off | When loading a source, sets the session's start frame and duration to the frame range of the source, handles included. Useful because Silhouette aligns loaded sources with the session's start frame. The loader also offers this as an option at load time. |
| Set Session Frame Range on Update | Off | When updating a source, forces the session's start frame and duration to the frame range of the loaded source. |

## Creator plugins

One entry for each creator: Matte Shapes, Render and Track Points. Each has the same settings.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Make the creator available. |
| Default Variants | `Main` | The variants offered by default. |
| Product type items | None | Optional list of product types the creator can make, each with a **Product type** name and a **Label** shown in the UI. |

## Publish plugins

### Extractors

| Extractor | Enabled | Optional | Active | Other settings |
|---|---|---|---|---|
| Extract Nuke 9+ .nk Shapes | On | Off | On | |
| Extract Nuke 6.2+ .nk Shapes | Off | Off | On | |
| Extract Silhouette .fxs Shapes. | On | Off | On | |
| Extract Shake 4.x .ssf Shapes | Off | Off | On | |
| Extract Fusion .settings Shapes | Off | Off | On | |
| Extract After Effects .txt Trackers | On | Off | On | |
| Extract Nuke 5 .nk Trackers | On | Off | On | |
| Extract Workfile | | | | **Add project.sfx representation** (off): adds the `project.sfx` file as a separate `sfx_project` representation. |

## Templated workfile build

*Templated Workfile Build.* A list of profiles, empty by default. The first profile that matches is used as the workfile template.

| Setting | Default | Description |
|---|---|---|
| Task types | | Task types the profile applies to. |
| Task names | | Task names the profile applies to. |
| Path to template | | The template project. |
| Keep placeholders | Off | Keep the placeholders after the build. |
| Create first version | On | Save the first version of the built workfile. |
