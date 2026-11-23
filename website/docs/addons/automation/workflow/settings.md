---
title: Workflow addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Workflow addon with their default values: the dispatch directory and the simple actions that expose workflows in the AYON web app."
addon: workflow
addon_repo: ayon-workflow
addon_version: 0.4.6
addon_scope: pipeline-server
addon_flags: [licensed, studio-only]
addon_private: true
verified: 2026-11-20
---

# Workflow addon settings

<AddonInfo />

The settings of the [Workflow addon](index.md) are in **Studio settings > Workflow**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The simple actions are read from the project settings when the action is started in a project, and from the studio settings otherwise. The workflows themselves are not settings: they are registered on the server and edited in the workflow editor, and the event processor that runs them is set up as described in [Event processor](index.md#event-processor).

## Dispatch directory

<SettingLocation uri="ayon+settings://workflow/dispatch_directory" scope="Studio, with project overrides" />

Where the backend directory of a dispatched workflow is created when the workflow is dispatched without a project context. The location must be reachable from the machine that dispatches and from the farm machines that run the jobs.

<!-- screenshot: settings editor, Dispatch Directory -->

<Settings>
<Setting name="Default directory" default="{root}/backend/{yyyy}_{mm}_{dd}/{HH}_{MM}_{SS}">

The directory used for dispatch. `{root}` is the **Root directory (path)** below. The time keys `{d}`, `{dd}`, `{m}`, `{mm}`, `{yy}`, `{yyyy}`, `{H}`, `{HH}`, `{M}`, `{MM}`, `{S}` and `{SS}` are supported.

</Setting>
<Setting name="Root directory (path)">

The root per platform, so that workers on different operating systems resolve the same directory.

<Settings>
<Setting name="Windows" default="C:\Windows\Temp\ayon_workflow" />
<Setting name="Linux" default="/var/tmp/ayon_workflow" />
<Setting name="MacOS" default="/var/tmp/ayon_workflow" />
</Settings>

</Setting>
</Settings>

## Simple actions

<SettingLocation uri="ayon+settings://workflow/simple_actions" scope="Studio, with project overrides" />

Exposes registered workflows as actions of the AYON web app, so they can be started on demand; see [Simple actions](index.md#simple-actions) on the addon page. Both lists are empty by default, and their items have the same fields.

<!-- screenshot: settings editor, Simple Actions -->

<Settings>
<Setting name="From Folder" default="Empty list">

Actions shown on folders, for workflows with an `OnActionFromFolder` node.

</Setting>
<Setting name="From Version" default="Empty list">

Actions shown on versions, for workflows with an `OnActionFromVersion` node.

</Setting>
</Settings>

Fields of one action:

<Settings prefix="simple-action">
<Setting name="Enabled" default="Disabled">

Shows the action. Disabled items are not offered.

</Setting>
<Setting name="Action label">

The label of the action in the actions menu.

</Setting>
<Setting name="Execute Locally" default="Disabled">

Runs the workflow on the machine of the user, like launching an application from the actions menu, bypassing the event processor. Needed for workflows that use pipeline nodes. When off, the event processor runs the workflow.

</Setting>
<Setting name="Workflow Name">

Required. The registered workflow to run; the list shows the registered workflows that contain the matching trigger node.

</Setting>
</Settings>

## Related

- [Workflow addon](index.md)
- [Workflow nodes](nodes.md)
- [Automations](../../../pipeline/automations.md)
