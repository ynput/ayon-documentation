---
title: AWS Deadline Cloud addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON AWS Deadline Cloud addon with their default values: farm and queue overrides, Conda options, host requirement roles and extra job parameters."
addon: deadline_cloud
addon_repo: ayon-deadline-cloud
addon_version: 0.0.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-11-22
sources:
  - https://github.com/ynput/ayon-deadline-cloud/tree/develop/server
---

# AWS Deadline Cloud addon settings

<AddonInfo />

The settings of the [AWS Deadline Cloud addon](index.md) are in **Studio settings > AWS Deadline Cloud**, with overrides in **Project settings > AWS Deadline Cloud**. Pasting a location below into the URI bar of the web app opens that setting. The addon has a single settings group and no site settings. The default farm and queue of a workstation are not addon settings: they come from the local Deadline Cloud configuration of the machine, which the Farm ID and Queue ID settings can override.

## Settings

<SettingLocation uri="ayon+settings://deadline_cloud" scope="Studio, with project overrides" />

Where jobs are sent, which Conda packages the workers install, and which workers may run the render and publish steps.

<!-- screenshot: settings editor, AWS Deadline Cloud -->

<Settings>
<Setting name="Farm ID" default="Empty">

AWS Deadline Cloud farm ID, for example `farm-abc123`. When set, it replaces the farm of the local Deadline Cloud configuration of the machine. When empty, the machine default is used.

</Setting>
<Setting name="Queue ID" default="Empty">

AWS Deadline Cloud queue ID, for example `queue-abc123`. When set, it replaces the queue of the local configuration. When empty, the machine default is used.

</Setting>
<Setting name="Conda Packages" default="Empty">

Space-separated Conda package specifications to install on the worker, for example `maya=2024 vray=6`. Applied to the `CondaPackages` job parameter when the job template has it. When empty, the template value or the packages detected from the scene are used.

</Setting>
<Setting name="Conda Channels" default="deadline-cloud">

Space-separated Conda channels to search, for example `deadline-cloud conda-forge`. Applied to the `CondaChannels` job parameter when the job template has it.

</Setting>
<Setting name="Extra Job Parameters" default="Empty list">

Parameters to set on every submission, overriding values already present for the same parameter name. No plugin reads this setting yet, so entries have no effect.

<Settings>
<Setting name="Parameter Name" default="Empty">

Name of a parameter in the `parameterDefinitions` of the job template.

</Setting>
<Setting name="Value" default="Empty">

Value to set for that parameter.

</Setting>
</Settings>

</Setting>
<Setting name="Publish Host Requirement Roles" default="publish">

Values of the worker capability `attr.role` that may run the publishing step of a job.

</Setting>
<Setting name="render Host Requirement Roles" default="render">

Values of the worker capability `attr.role` that may run the render steps. The title is spelled with a lowercase "render" in the settings editor.

</Setting>
</Settings>

## Related

- [AWS Deadline Cloud addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
