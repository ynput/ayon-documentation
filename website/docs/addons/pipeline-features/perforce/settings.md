---
title: Perforce addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Perforce addon with their default values: server connection, workspace and stream templates, and the Collect Perforce Control profiles."
addon: perforce
addon_repo: ayon-perforce
addon_version: 0.0.1+dev.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-perforce/tree/develop/server/settings
---

# Perforce addon settings

<AddonInfo />

The settings of the [Perforce addon](index.md), with the default values the addon ships with. The addon has not been released yet; the values are those of the default branch. All settings are studio settings that can be overridden per project. The addon has no site settings: the Perforce user name and password are entered in the AYON tray on each machine. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The addon is disabled by default.

## General

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Turns the Perforce features on for the project. Read by the launch hook `SyncUnrealProject`, the login collector and the connection lookup. |

## Connection

| Setting | Default | Description |
|---|---|---|
| Host name | `perforce` | Name of the Perforce server. |
| Port | 1666 | Port of the Perforce server. This is not the port of the local web server the tray starts, which is chosen at run time. |

## Workspace Settings

Both values are templates. Keys include `{project[code]}`, the folder and task entities, and the workstation info (`{workstation[hostname]}`, `{workstation[system_name]}`).

| Setting | Default | Description |
|---|---|---|
| Depot Name Template | `{project[code]}` | Name of the Perforce depot that holds the project. |
| Workspace Name Template | `{workstation[hostname]}_{workstation[system_name]}_{project[code]}` | Name of the Perforce workspace (client) of the artist or farm machine. |

## Stream Settings

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Described as work in progress ("enable to use streams"). No code of the addon reads this toggle. |
| Stream Profiles | empty list | Profiles that choose the stream of a task. |

Each stream profile has two fields. The workspace creation hook uses the profile whose task types include the task type of the launch context (the last matching profile wins) and fails when none matches.

| Field | Default | Description |
|---|---|---|
| Stream Name Template | empty | Template for the stream name. A name that does not start with `//` is prefixed with `//<depot>/`. |
| Task Type | none | Task types the profile applies to. |

## Publish Plugins

### Collect Perforce Control

Selects which published products are marked for committing to Perforce. Keep it disabled when published files should be versioned only in AYON.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Run the plugin. |
| Profiles to trigger Perforce commit | empty list | Profiles that choose the products. |

Each profile has these fields. An empty filter matches everything.

| Field | Default | Description |
|---|---|---|
| Host names | empty list | Applications the profile applies to. |
| Product base types | empty list | Product base types the profile applies to. |
| Task types | empty list | Task types the profile applies to. |
| Task names | empty list | Task names the profile applies to. |
| Commit representations to Perforce | On | Add the `perforce` family to matching instances. |
| Template name | empty | Name from Anatomy that gives the path and file name of the committed file. |

The plugin is limited to Unreal in the code. The addon contains no plugin that commits files for the `perforce` family, see [Current limitations](index.md#current-limitations).
