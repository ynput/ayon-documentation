---
title: AWS Deadline Cloud addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON AWS Deadline Cloud addon with their default values: farm and queue overrides, Conda options, host requirement roles and extra job parameters."
addon: deadline_cloud
addon_repo: ayon-deadline-cloud
addon_version: 0.0.1
addon_scope: pipeline
addon_flags: [beta]
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-deadline-cloud/tree/v0.0.1-alpha.1/server
---

# AWS Deadline Cloud addon settings

<AddonInfo />

The settings of the [AWS Deadline Cloud addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The addon has a single settings area and no site settings.

## Settings

| Setting | Default | Description |
|---|---|---|
| Farm ID | empty | AWS Deadline Cloud farm ID, for example `farm-abc123`. When set, it replaces the farm of the local Deadline Cloud configuration of the machine. When empty, the machine default is used. |
| Queue ID | empty | AWS Deadline Cloud queue ID, for example `queue-abc123`. When set, it replaces the queue of the local configuration. When empty, the machine default is used. |
| Conda Packages | empty | Space-separated Conda package specifications to install on the worker, for example `maya=2024 vray=6`. Applied to the `CondaPackages` job parameter when the job template has it. When empty, the template value or the packages detected from the scene are used. |
| Conda Channels | `deadline-cloud` | Space-separated Conda channels to search. Applied to the `CondaChannels` job parameter when the job template has it. |
| Extra Job Parameters | empty list | List of **Parameter Name** and **Value** pairs, described below. |
| Publish Host Requirement Roles | `publish` | Values of the worker capability `attr.role` that may run the publishing step. |
| render Host Requirement Roles | `render` | Values of the worker capability `attr.role` that may run the render steps. The title is spelled with a lowercase "render" in the settings UI. |

## Extra Job Parameters

Each item has two fields.

| Field | Default | Description |
|---|---|---|
| Parameter Name | empty | Name of a parameter in the `parameterDefinitions` of the job template. |
| Value | empty | Value to set for that parameter. |

The setting description says these values are injected into every submission and override values already present. No plugin in version 0.0.1 reads the setting, so entries have no effect in this version.
