---
title: Perforce addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Perforce addon with their default values: server connection, workspace and stream templates, data file submission and the Collect Perforce Control profiles."
addon: perforce
addon_repo: ayon-perforce
addon_version: 0.1.0+dev.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-11-18
---

# Perforce addon settings

<AddonInfo />

The settings of the [Perforce addon](index.md) are in **Studio settings > Perforce**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The addon has not been released yet; the values are those of the default branch. It has no site settings: the Perforce user name and password are entered in the **Perforce** submenu of the AYON tray on each machine, see [Tray menu](index.md#tray-menu).

## General

<SettingLocation uri="ayon+settings://perforce" scope="Studio, with project overrides" />

Turns Perforce on for a project and sets the Perforce server. Perforce is off by default.

<!-- screenshot: settings editor, Perforce general settings -->

<Settings>
<Setting name="Enabled" default="Disabled">

Turns the Perforce features on for the project: the tray menu, the launch hooks, the publish plugins and the submission of data files.

</Setting>
<Setting name="Host name" default="perforce">

Name of the Perforce server.

</Setting>
<Setting name="Port" default="1666">

Port of the Perforce server. This is not the port of the local web server the tray starts, which is chosen at run time.

</Setting>
</Settings>

## Workspace Settings

<SettingLocation uri="ayon+settings://perforce/workspace" scope="Studio, with project overrides" />

How the Perforce workspace (client) of an artist or farm machine is named and set up when Unreal is launched. The names are templates; keys include `{project[code]}`, the folder and task entities, and the workstation info (`{workstation[hostname]}`, `{workstation[system_name]}`).

<!-- screenshot: settings editor, Workspace Settings -->

<Settings>
<Setting name="Depot Name Template" default="{project[code]}">

Name of the Perforce depot that holds the project.

</Setting>
<Setting name="Workspace Name Template" default="{workstation[hostname]}_{workstation[system_name]}_{project[code]}">

Name of the Perforce workspace of the machine.

</Setting>
<Setting name="Workspace Options" default="allwrite, clobber, rmdir">

Options of the workspaces that AYON creates or updates; options not selected are turned off. One or more of:

- **allwrite - files are writable**
- **clobber - sync overwrites writable**
- **compress - compress data**
- **locked - only owner can change spec**
- **modtime - keep submit time**
- **rmdir - remove empty directories**

Unreal needs **allwrite** to write to the project, and **allwrite** needs **clobber**, otherwise a sync fails on writable files.

</Setting>
</Settings>

## Stream Settings

<SettingLocation uri="ayon+settings://perforce/stream" scope="Studio, with project overrides" />

Whether the workspace is bound to a stream, and which stream a task uses.

<!-- screenshot: settings editor, Stream Settings -->

<Settings>
<Setting name="Enabled" default="Disabled">

Use streams. When off, the workspace creation hook creates a classic workspace without a stream and the profiles are ignored.

</Setting>
<Setting name="Stream Profiles" default="Empty list">

Profiles that choose the stream of a task. The workspace creation hook uses the last profile whose task types include the task type of the launch context, and fails when none matches.

<Settings>
<Setting name="Stream Name Template" default="Empty">

Template for the stream name. A name that does not start with `//` is prefixed with `//<depot>/`.

</Setting>
<Setting name="Task Type">

Task types the profile applies to.

</Setting>
</Settings>

</Setting>
</Settings>

## Auto-submit pipeline data files

<SettingLocation uri="ayon+settings://perforce/auto_submit_data_files" scope="Studio, with project overrides" />

A single switch for the pipeline data files that host integrations write into the workspace.

<!-- screenshot: settings editor, Auto-submit pipeline data files -->

<Settings>
<Setting name="Auto-submit pipeline data files" id="auto-submit-pipeline-data-files-toggle" default="Enabled">

Submit the files with pipeline data that host integrations write into the workspace, such as publish context data, in a dedicated changelist, so they are not reported as uncommitted changes when publishing. Skipped with a warning when the Perforce credentials are missing.

</Setting>
</Settings>

## Publish Plugins

<SettingLocation uri="ayon+settings://perforce/publish" scope="Studio, with project overrides" />

The publish plugins of the addon run in Unreal only; see [Publishing](index.md#publishing).

### Collect Perforce Control

<SettingLocation uri="ayon+settings://perforce/publish/CollectPerforceControl" scope="Studio, with project overrides" />

Selects which published products are marked for committing to Perforce. Keep it disabled when published files should be versioned only in AYON. No plugin of the addon commits the marked files yet, see [Current limitations](index.md#current-limitations).

<!-- screenshot: settings editor, Collect Perforce Control -->

<Settings>
<Setting name="Enabled" default="Disabled" />
<Setting name="Profiles to trigger Perforce commit" default="Empty list">

Profiles that choose the products whose representations are tracked in Perforce. An empty filter matches everything.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Product base types" default="Empty list">

Matched against the product base type, or the product type when the instance has none.

</Setting>
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Commit representations to Perforce" default="Enabled">

Add the `perforce` family, the connection data and the template name to matching instances.

</Setting>
<Setting name="Template name" default="Empty">

Name of an Anatomy template that gives the path and file name of the committed file.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Perforce addon](index.md)
- [Launch hooks](index.md#launch-hooks)
