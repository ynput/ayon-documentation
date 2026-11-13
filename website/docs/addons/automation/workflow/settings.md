---
title: Workflow addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Workflow addon with their default values: the dispatch directory and the simple actions that expose workflows in the AYON web app."
addon: workflow
addon_repo: ayon-workflow
addon_version: 0.4.4
addon_scope: pipeline-server
addon_flags: [licensed, studio-only]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/0480584-configure-workflow-addon
---

# Workflow addon settings

<AddonInfo />

The settings of the [Workflow addon](index.md), with the default values it ships with. The simple actions are read from the project settings when the action is started in a project, and from the studio settings otherwise. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Dispatch directory

Where the backend directory of a dispatched workflow is created. The location must be reachable from the machine that dispatches and from the farm machines that run the jobs. A workflow dispatched without a project context creates its backend directory here.

| Setting | Default | Description |
|---|---|---|
| Default directory | `{root}/backend/{yyyy}_{mm}_{dd}/{HH}_{MM}_{SS}` | The directory used for dispatch. `{root}` is the root directory below. The time keys `{d}`, `{dd}`, `{m}`, `{mm}`, `{yy}`, `{yyyy}`, `{H}`, `{HH}`, `{M}`, `{MM}`, `{S}` and `{SS}` are supported. |
| Root directory (path) | Per platform, see below | The multiplatform root, so that workers on different operating systems resolve the same directory. |

| Root platform | Default |
|---|---|
| Windows | `C:\Windows\Temp\ayon_workflow` |
| Linux | `/var/tmp/ayon_workflow` |
| MacOS | `/var/tmp/ayon_workflow` |

## Simple actions

Exposes registered workflows as actions of the AYON web app, so they can be started on demand. There are two lists, both empty by default: **From Folder** (workflows with an `OnActionFromFolder` node, shown on folders) and **From Version** (workflows with an `OnActionFromVersion` node, shown on versions). Each item has the same four settings.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Shows the action. Disabled items are not offered. |
| Action label | empty | The label of the action in the actions menu. |
| Execute Locally | Off | Runs the workflow on the machine of the user, like launching an application from the actions menu, and bypasses the event processor. Needed for workflows that use pipeline nodes. When off, the event processor runs the workflow. |
| Workflow Name | empty | The registered workflow to run. The list shows the registered workflows that contain the matching trigger node. |
