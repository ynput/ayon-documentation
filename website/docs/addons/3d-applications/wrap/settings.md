---
title: Wrap addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Wrap addon with their default values: the workfile builder templates and multiple templates per task. The addon has not been released yet."
addon: wrap
addon_repo: ayon-wrap
addon_version: 0.0.3-dev.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-wrap/tree/develop/server/settings
  - https://help.ayon.app/en/articles/0840796-wrap-addon-settings
---

# Wrap addon settings

<AddonInfo />

The settings of the [Wrap addon](index.md), with their default values. The addon has not been released yet. They are studio settings that can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Template files are not shared by site sync, so the paths must be reachable from every artist machine. Each path is set for Windows, Linux and macOS.

## Workfile builder

Settings location: `ayon+settings://wrap/workfile_builder`. Gives artists a prepared workfile when the work folder has none.

| Setting | Default | Description |
|---|---|---|
| Create first workfile | Off | Save the built workfile as the first version when no workfile exists in the work folder. |
| Custom Templates | None | Profiles that choose a template `.wrap` file. The first matching profile is used. |

A custom template has **Task types**, **Task names** and a **Path** with the fields **Windows**, **Linux** and **MacOS**.

## Multiple templates per task

Settings location: `ayon+settings://wrap/multiple_templates_per_tasks`. Lets the artist choose from several templates when a task needs more than one starting workfile. It overrides the workfile builder for the matching tasks.

| Setting | Default | Description |
|---|---|---|
| Profiles | None | Profiles that match tasks. |

A profile has **Task types**, **Task names** and **Templates**. Each template has a **Workfile Template name**, shown in the selection dialog and available as `{template_name}` in the anatomy templates, and a **Path** with the fields **Windows**, **Linux** and **MacOS**.

The workfile names need an additional anatomy work template that puts each template in its own subfolder, for example named `wrap_multi`:

| Key | Value |
|---|---|
| Directory | `{root[work]}/{project[name]}/{hierarchy}/{folder[name]}/work/{task[name]}</{template_name}>` |
| File | `{project[code]}_{folder[name]}_{task[name]}<_{template_name}>_{@version}.{ext}` |

The name of that template is then added to the workfile template profiles of the core addon, with the host `wrap`.
