---
title: Wrap addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Wrap addon with their default values: the workfile builder templates and multiple templates per task. The addon has not been released yet."
addon: wrap
addon_repo: ayon-wrap
addon_version: 0.0.3-dev.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-wrap/tree/develop/server/settings
---

# Wrap addon settings

<AddonInfo />

The settings of the [Wrap addon](index.md) are in **Studio settings > Wrap**, and can be overridden per project in **Project settings > Wrap**. Pasting a location below into the URI bar of the web app opens that setting. How studio values, project overrides and addon versions combine is described in [Settings](../../../ayon/how-ayon-works/settings.md). The addon has not been released yet; this page describes the development version `0.0.3-dev.1`.

Both groups point to template `.wrap` files. The paths are read on the artist machine when Wrap is launched, so they must be reachable from every artist machine. Each path has a field for **Windows**, **Linux** and **MacOS**, and the one of the current operating system is used.

## Workfile builder

<SettingLocation uri="ayon+settings://wrap/workfile_builder" scope="Studio, with project overrides" />

Gives artists a prepared first workfile when the work folder of the task has none. The core addon applies these settings with a launch hook: it copies the template of the first matching profile to the path of the first workfile version before Wrap starts.

<!-- screenshot: settings editor, Workfile Builder -->

<Settings>
<Setting name="Create first workfile" default="Disabled">

Copy a template as the first workfile when no workfile exists. When it is off, **Custom Templates** is not used.

</Setting>
<Setting name="Custom Templates" default="Empty list">

Profiles that choose the template file. The profile that matches the task type of the launch context most specifically is used.

<Settings>
<Setting name="Task types" default="Empty list">

Task types the profile applies to. An empty list matches every task type.

</Setting>
<Setting name="Task names" default="Empty list">

Not used when the profile is matched: profiles are filtered on task types only.

</Setting>
<Setting name="Path">

The template file, with a field per operating system. The path can contain anatomy keys, such as `{root[work]}` or `{project[name]}`, and environment variables written the same way, such as `{STUDIO_TEMPLATES}`.

</Setting>
</Settings>

</Setting>
</Settings>

## Multiple templates per task

<SettingLocation uri="ayon+settings://wrap/multiple_templates_per_tasks" scope="Studio, with project overrides" />

Lets the artist choose from several templates when a task needs more than one starting workfile. When a profile matches the task, a Workfiles dialog opens before Wrap starts, where the artist picks a template and opens an existing workfile of it or creates a new one from it. For the matching tasks it replaces the [workfile builder](#workfile-builder).

<!-- screenshot: settings editor, Multiple templates per task -->

<Settings>
<Setting name="Profiles" default="Empty list">

Profiles matched on the task of the launch context. The most specific matching profile is used.

<Settings>
<Setting name="Task types" default="Empty list">

Task types the profile applies to. An empty list matches every task type.

</Setting>
<Setting name="Task names" default="Empty list">

Task names the profile applies to. An empty list matches every task name.

</Setting>
<Setting name="Templates" default="Empty list">

The templates offered for the task.

<Settings>
<Setting name="Workfile Template name">

Name of the template, shown in the dialog and available as `{template_name}` in the anatomy templates.

</Setting>
<Setting name="Path">

The template file, with a field per operating system. The path is used as written: anatomy keys are not filled.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

The workfiles of each template need their own folder, so the work template that the core addon selects for the host `wrap` must use `{template_name}`. A studio adds a work template to the [anatomy](../../../ayon/web-ui/project/anatomy.md), for example named `wrap_multi`, and selects it for the host `wrap` in the **Workfile template profiles** of the [core addon settings](../../essentials/core/settings.md#workfiles). For example:

| Key | Value |
|---|---|
| Directory | `{root[work]}/{project[name]}/{hierarchy}/{folder[name]}/work/{task[name]}</{template_name}>` |
| File | `{project[code]}_{folder[name]}_{task[name]}<_{template_name}>_{@version}.{ext}` |

The optional parts in angle brackets keep the template usable for tasks without multiple templates.

## Related

- [Wrap addon](index.md)
- [Core addon settings](../../essentials/core/settings.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
