---
title: ArchivalTool addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON ArchivalTool addon with their default values: publish area configs and work area configs."
addon: archival_tool
addon_repo: ayon-archival-tool
addon_version: 0.1.2
addon_scope: pipeline-server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-18
---

# ArchivalTool addon settings

<AddonInfo />

The settings of the [ArchivalTool addon](index.md) are in **Studio settings > ArchivalTool**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. Both groups are lists of profiles. An analysis copies them into the report it creates, so later changes to the settings do not alter existing reports; the configuration of a single report is edited on its report page, see [Report page](index.md#report-page).

:::caution
The defaults delete: each list has one profile named `default` that matches every product or task, and its deleting switches are on. Review the profiles before running an analysis and a delete run.
:::

## Publish area configs

<SettingLocation uri="ayon+settings://archival_tool/publish" scope="Studio, with project overrides" />

Rules for published versions. Each profile produces its own section in the report. A product is processed when one of the product type patterns and one of the product name patterns match; the patterns are matched from the start of the value.

<!-- screenshot: settings editor, Publish area configs -->

<Settings>
<Setting name="Publish area configs" id="publish-area-configs-list" default="One profile, default">

<Settings>
<Setting name="Name" default="default">

Name of the profile, unique in the list. Used as the section name in the report.

</Setting>
<Setting name="Product types" default="Empty list">

Regex patterns matched against the product type. An empty list matches every product type.

</Setting>
<Setting name="Product names" default="Empty list">

Regex patterns matched against the product name. An empty list matches every name.

</Setting>
<Setting name="Keep versions" default="2">

Number of newest versions that are kept. Older versions are marked for deletion with their files.

</Setting>
<Setting name="Delete in DB" default="Enabled">

Delete the versions and their representations from the database.

</Setting>
<Setting name="Delete files" default="Enabled">

Delete the version files from storage.

</Setting>
<Setting name="Delete reviewables" default="Enabled">

Delete the reviewable files uploaded to the versions.

</Setting>
<Setting name="Archive in ftrack" default="Disabled">

Archive the versions in ftrack. Needs the ftrack addon; without it the versions are reported as failed.

</Setting>
<Setting name="Copy kept files" default="Disabled">

Copy the files of the kept versions to **Copy to directory**, keeping their path under the project root.

</Setting>
<Setting name="Copy to directory" default="Empty">

Directory the kept files are copied to. Nothing is copied while it is empty.

</Setting>
</Settings>

</Setting>
</Settings>

## Work area configs

<SettingLocation uri="ayon+settings://archival_tool/work" scope="Studio, with project overrides" />

Rules for the work files of tasks. Each profile produces its own section in the report.

<!-- screenshot: settings editor, Work area configs -->

<Settings>
<Setting name="Work area configs" id="work-area-configs-list" default="One profile, default">

<Settings>
<Setting name="Name" default="Empty (default in the default profile)">

Name of the profile, unique in the list. Used as the section name in the report.

</Setting>
<Setting name="Directory regex" default=".*">

Regex matched from the start against the names of the tasks of the analysed folders. Only matching tasks are processed.

</Setting>
<Setting name="Delete known files" default="Enabled">

Delete files created by AYON, those that follow its naming.

</Setting>
<Setting name="Delete unknown files" default="Enabled">

Delete files not created by AYON, such as reference files added by artists.

</Setting>
<Setting name="Delete folders" default="Enabled">

Delete the folders.

</Setting>
<Setting name="Delete files" default="Enabled">

Delete the files from storage.

</Setting>
<Setting name="Copy kept files" default="Disabled">

Copy the kept files. In version 0.1.2 the delete run copies kept files for the published area only, so this has no effect.

</Setting>
<Setting name="Copy to directory" default="Empty">

Directory the kept files are copied to. No effect in version 0.1.2, as for **Copy kept files**.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [ArchivalTool addon](index.md)
- [Delete run](index.md#delete-run)
