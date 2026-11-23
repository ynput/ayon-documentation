---
title: Deadline addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Deadline addon with their default values: Deadline servers, render job profiles, publish job, host-specific submission options, validators and site settings."
addon: deadline
addon_repo: ayon-deadline
addon_version: 0.7.6
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-deadline/tree/0.7.6/server/settings
---

# Deadline addon settings

<AddonInfo />

The settings of the [Deadline addon](index.md) are in **Studio settings > Deadline**, with overrides in **Project settings > Deadline**; the Deadline server a project submits to is chosen in the project settings, and the user credentials are site settings. Pasting a location below into the URI bar of the web app opens that setting. The API key that Deadline Workers use to reach the AYON server is not an addon setting: it is set in the Deadline `AYON` plug-in of the Deadline repository, see [What it connects](index.md#what-it-connects) and [Deadline repository plug-ins](index.md#deadline-repository-plug-ins).

## System Deadline Webservice Info

<SettingLocation uri="ayon+settings://deadline/deadline_urls" scope="Studio only" />

The Deadline servers the studio can submit to, each under a unique name. Projects pick one of them by name in [Selected Deadline server name](#selected-deadline-server-name). If no server is defined, the addon disables itself.

<!-- screenshot: settings editor, System Deadline Webservice Info -->

<Settings>
<Setting name="System Deadline Webservice Info" id="deadline-servers" default="One server, default">

<Settings>
<Setting name="Name" default="default">

Name that projects use to select the server. Names must be unique in the list.

</Setting>
<Setting name="Url" default="http://127.0.0.1:8082">

Address and port of the Deadline web service.

</Setting>
<Setting name="Require authentication" default="Disabled">

The web service needs a user name and password. The credentials come from the [site settings](#site-settings), or from the defaults below.

</Setting>
<Setting name="Don't verify SSL" default="Disabled">

Skips certificate verification, for example for a self-signed certificate.

</Setting>
<Setting name="Default user name" default="Empty">

Web service user name used when a site sets none. Needs **Require authentication**.

</Setting>
<Setting name="Default password" default="Empty">

Password of the default user. Needs **Require authentication**.

</Setting>
</Settings>

</Setting>
</Settings>

## Selected Deadline server name

<SettingLocation uri="ayon+settings://deadline/deadline_server" scope="Project, with site overrides" />

The server, by its **Name** in [System Deadline Webservice Info](#system-deadline-webservice-info), that the project submits to. It is not shown in the studio settings: it is set in the project settings, and a site can override it.

<!-- screenshot: settings editor, Selected Deadline server name -->

<Settings>
<Setting name="Selected Deadline server name" id="selected-server" default="default">

One of the server names defined in the studio settings.

</Setting>
</Settings>

## Publish Plugins

<SettingLocation uri="ayon+settings://deadline/publish" scope="Studio, with project overrides" />

Job parameters of the submissions, host-specific options and the validators of the addon. The plugins are described in [Collectors and other publish plugins](index.md#collectors-and-other-publish-plugins) and [Validators](index.md#validators).

The validators share three switches:

- **Enabled:** the plugin runs.
- **Optional:** the artist can turn it off in the Publisher.
- **Active:** it is turned on by default in the Publisher.

<!-- screenshot: settings editor, Publish Plugins -->

### Render Job Settings

<SettingLocation uri="ayon+settings://deadline/publish/CollectJobInfo" scope="Studio, with project overrides" />

Profiles with the default Deadline job parameters, such as pools, groups and priority, so that different hosts or task types can use different values. They apply to the render jobs of all hosts, not to the AYON publish jobs or extra jobs such as the Houdini export job. A profile is selected by **Host names**, **Task types**, **Task names** and **Product base types**; an empty filter matches everything. If no profile matches a farm instance, the publish fails and asks an administrator to fill the profiles. The parameters listed in **Exposed Overrides** can be changed by the artist, see [Job parameters in the Publisher](index.md#job-parameters-in-the-publisher).

<!-- screenshot: settings editor, Render Job Settings -->

<Settings prefix="render-job">
<Setting name="Profiles" default="Two profiles">

Two profiles ship with the addon. The first has empty filters and applies to all hosts. The second applies to `aftereffects`, `fusion` and `nuke` and sets **Frames per Task** to 10. All their other values are the defaults below. A profile added in the editor starts with other values in two fields, noted below.

<Settings>
<Setting name="Host names" default="Empty list">

Hosts the profile applies to.

</Setting>
<Setting name="Task types" default="Empty list">

Task types the profile applies to.

</Setting>
<Setting name="Task names" default="Empty list">

Task names the profile applies to.

</Setting>
<Setting name="Product base types" default="Empty list">

Product base types the profile applies to.

</Setting>
<Setting name="Frames per Task" default="1">

Chunk size of the render job. A profile added in the editor starts with 999.

</Setting>
<Setting name="Priority" default="50">

Job priority. The **Validate Deadline Job Info** [validator](#validators) accepts 0 to 100.

</Setting>
<Setting name="Group" default="Empty">

Deadline group of the job.

</Setting>
<Setting name="Limit Groups" default="Empty list">

Limit groups of the job.

</Setting>
<Setting name="Primary Pool" default="Empty">

Pool of the job.

</Setting>
<Setting name="Secondary Pool" default="Empty">

Secondary pool of the job.

</Setting>
<Setting name="Machine Limit" default="0">

Most machines that render the job at the same time. 0 means unlimited.

</Setting>
<Setting name="Machine List" default="Empty list">

Workers that are allowed, or denied with **Machine List is a Deny**, to render the job.

</Setting>
<Setting name="Machine List is a Deny" default="Disabled">

Treats **Machine List** as a deny list. When disabled, only the listed machines render the job.

</Setting>
<Setting name="Number of concurrent tasks" default="1">

Tasks that one Worker renders at the same time.

</Setting>
<Setting name="Department" default="Empty">

Department shown in Deadline Monitor.

</Setting>
<Setting name="Delay job" default="Empty">

Start delay, in the format `dd:hh:mm:ss`.

</Setting>
<Setting name="Publish Job State" default="Active">

Initial state of the publish job: **Active** or **Suspended**. A suspended publish job waits to be resumed in Deadline Monitor, so that the render can be checked before it is published.

</Setting>
<Setting name="Use Published scene" default="Enabled">

Renders the published workfile instead of the current one.

</Setting>
<Setting name="Use Asset dependencies" default="Disabled">

Adds asset dependencies to the job. A profile added in the editor starts with it enabled.

</Setting>
<Setting name="Workfile Dependency" default="Enabled">

The job waits for the workfile to exist.

</Setting>
<Setting name="Additional JobInfo data" default="Empty">

JSON dictionary added to the JobInfo of the submission.

</Setting>
<Setting name="Additional PluginInfo data" default="Empty">

JSON dictionary added to the PluginInfo of the submission.

</Setting>
<Setting name="Exposed Overrides" default="Department, Frames per Task, Group, Priority, Primary pool, Secondary pool, Publish Job State">

Parameters the artist can change in the Publisher. The options are **Department**, **Delay job (timecode dd:hh:mm:ss)**, **Frames per Task**, **Group**, **Priority**, **Limit groups**, **Primary pool**, **Secondary pool**, **Machine List**, **Machine List is a Deny**, **Number of Concurrent Tasks** and **Publish Job State**.

</Setting>
</Settings>

</Setting>
</Settings>

### Publish Job Settings

<SettingLocation uri="ayon+settings://deadline/publish/ProcessSubmittedJobOnFarm" scope="Studio, with project overrides" />

Parameters of the AYON publish job that follows the render job and publishes the rendered files.

<!-- screenshot: settings editor, Publish Job Settings -->

<Settings prefix="publish-job">
<Setting name="Priority" default="50">

Priority of the publish job.

</Setting>
<Setting name="Group" default="Empty">

Deadline group of the publish job.

</Setting>
<Setting name="Pool" default="Empty">

Pool of the publish job.

</Setting>
<Setting name="Department" default="Empty">

Department of the publish job.

</Setting>
<Setting name="Skip integration of representation with ext" default="Empty list">

File extensions of representations that are not published.

</Setting>
<Setting name="List of family names to transfer to generated instances (AOVs for example)." id="publish-job-families-transfer" default="render3d, render2d, slate">

Families copied to the instances generated from the render, for example one instance per AOV.

</Setting>
<Setting name="Reviewable products filter" default="One entry per host">

Which rendered AOVs get a review, per host. By default `maya` and `blender` use `.*([Bb]eauty).*`, and `aftereffects`, `celaction`, `harmony`, `max` and `fusion` use `.*`, which matches everything. Each host can appear once.

<Settings>
<Setting name="Host">

Host name, such as `maya`.

</Setting>
<Setting name="AOV regex" default="Empty list">

Regular expressions matched, from the start, against the file name of the first rendered file of each AOV (not the product name). Matching AOVs are reviewable.

</Setting>
</Settings>

</Setting>
<Setting name="Add rendered files as Dependencies" default="Disabled">

Adds all expected rendered files as job dependencies, so that the publish job starts only when all of them exist.

</Setting>
</Settings>

### Fusion

<SettingLocation uri="ayon+settings://deadline/publish/FusionSubmitDeadline" scope="Studio, with project overrides" />

Options of the Fusion render jobs. This group starts the **Host specific** section of the editor.

<!-- screenshot: settings editor, Fusion -->

<Settings prefix="fusion">
<Setting name="Deadline Plugin" default="Fusion">

The Deadline plugin that renders Fusion jobs: **Fusion** or **FusionCmd**.

</Setting>
</Settings>

### Houdini Export Job Settings

<SettingLocation uri="ayon+settings://deadline/publish/HoudiniSubmitDeadline" scope="Studio, with project overrides" />

Parameters of the Houdini export job, which first exports a renderable scene file (such as `usd`, `ifd` or `ass`) instead of rendering directly from the Houdini file.

<!-- screenshot: settings editor, Houdini Export Job Settings -->

<Settings prefix="houdini-export">
<Setting name="Export Priority" default="50">

Priority of the export job.

</Setting>
<Setting name="Export Frames Per Task" default="10">

Chunk size of the export job.

</Setting>
<Setting name="Export Group" default="Empty">

Deadline group of the export job.

</Setting>
<Setting name="Export Limit Groups" default="Empty">

Comma-separated limit groups of the export job.

</Setting>
<Setting name="Export Machine Limit" default="0">

Most machines that run the export job at the same time. 0 means unlimited.

</Setting>
</Settings>

### Houdini Cache Publish Job Settings

<SettingLocation uri="ayon+settings://deadline/publish/ProcessSubmittedCacheJobOnFarm" scope="Studio, with project overrides" />

Parameters of the publish jobs of caches exported on the farm from Houdini, such as Alembic or VDB products.

<!-- screenshot: settings editor, Houdini Cache Publish Job Settings -->

<Settings prefix="houdini-cache">
<Setting name="Priority" default="50">

Priority of the job.

</Setting>
<Setting name="Group" default="Empty">

Deadline group of the job.

</Setting>
<Setting name="Pool" default="Empty">

Pool of the job.

</Setting>
<Setting name="Department" default="Empty">

Department of the job.

</Setting>
</Settings>

### Houdini Validate Frame Token (USD Render)

<SettingLocation uri="ayon+settings://deadline/publish/ValidateFrameTokenUSDRender" scope="Studio, with project overrides" />

Checks the frame token of the output paths of USD renders submitted from Houdini.

<Settings>
<Setting name="Houdini Validate Frame Token (USD Render)" id="validate-frame-token-usd-render" default="Enabled, not optional, active" />
</Settings>

### Maya

<SettingLocation uri="ayon+settings://deadline/publish/MayaSubmitDeadline" scope="Studio, with project overrides" />

Options of the Maya render jobs. Tile jobs use the job parameters of the matching [render job profile](#render-job-settings), with **Tile Priority** as the priority.

<!-- screenshot: settings editor, Maya -->

<Settings prefix="maya">
<Setting name="Use Scene with Imported Reference" default="Disabled">

Submits the scene with its references imported.

</Setting>
<Setting name="Tile Priority" default="50">

Priority of the tile jobs.

</Setting>
<Setting name="Tile Assembler Plugin" default="DraftTileAssembler">

Deadline plugin that assembles the tiles. The only option is **Draft Tile Assembler**.

</Setting>
<Setting name="Scene patches" default="Empty list">

Lines added to the submitted scene. Patch names must be unique.

<Settings>
<Setting name="Patch name" />
<Setting name="Patch regex">

Regular expression that finds the place to patch.

</Setting>
<Setting name="Patch line">

Line to add.

</Setting>
</Settings>

</Setting>
<Setting name="Disable Strict Error Check profiles" default="Enabled">

Default of the Maya strict error checking option of the job, passed to Deadline as `StrictErrorChecking`.

</Setting>
</Settings>

### Nuke

<SettingLocation uri="ayon+settings://deadline/publish/NukeSubmitDeadline" scope="Studio, with project overrides" />

Options of the Nuke render jobs.

<!-- screenshot: settings editor, Nuke -->

<Settings prefix="nuke">
<Setting name="Use GPU" default="Enabled">

Default of the GPU option of the Nuke job.

</Setting>
<Setting name="Continue On Error" default="Disabled">

Default of the continue-on-error option of the Deadline Nuke plug-in, in the publish instance attributes.

</Setting>
<Setting name="Node based Limit Groups" default="Empty list">

Limit groups added to the job when the scene contains nodes of given classes.

<Settings>
<Setting name="Group Name">

Deadline limit group to add.

</Setting>
<Setting name="Node Classes" default="Empty list">

Nuke node classes that add the group, for example `OFX.absoft.neatvideo5_v5`.

</Setting>
</Settings>

</Setting>
</Settings>

### Add AYON server to farm job

<SettingLocation uri="ayon+settings://deadline/publish/CollectAYONServerToFarmJob" scope="Studio, with project overrides" />

Sends the current `AYON_SERVER_URL` with the job, so that Workers use the same AYON server as the artist. The API key for such servers is set in the Deadline `AYON` plug-in. This group starts the **Others** section of the editor.

<!-- screenshot: settings editor, Add AYON server to farm job -->

<Settings prefix="add-ayon-server">
<Setting name="Enabled" default="Disabled">

Adds the server URL to the job.

</Setting>
</Settings>

### Validate Expected Files

<SettingLocation uri="ayon+settings://deadline/publish/ValidateExpectedFiles" scope="Studio, with project overrides" />

Compares the rendered files with the files the job expected, in the publish job on the farm. It has no **Optional** switch.

<!-- screenshot: settings editor, Validate Expected Files -->

<Settings prefix="validate-expected-files">
<Setting name="Enabled" default="Enabled" />
<Setting name="Active" default="Enabled" />
<Setting name="Allow user change frame range" default="Enabled">

Accepts a frame range changed in Deadline Monitor as the new expected files, so that artists can control the rendered frame range.

</Setting>
<Setting name="Trigger on families" default="render">

Families the validator applies to.

</Setting>
<Setting name="Trigger for plugins" default="deadline">

Publish targets for which the validator runs.

</Setting>
</Settings>

### Validators

The other validators have only the shared switches.

<Settings>
<Setting name="Validate Deadline Connection" default="Enabled, not optional, active">

Checks that the Deadline web service answers, and that credentials are set when the server requires authentication.

</Setting>
<Setting name="Validate Deadline Pools" default="Enabled, optional, active">

Checks that the primary and secondary pools of the job exist on the Deadline server.

</Setting>
<Setting name="Validate Deadline Job Info" id="validate-deadline-job-info" default="Enabled, optional, active">

Checks that the priority is between 0 and 100, and that custom frames are inside the frame range.

</Setting>
</Settings>

## Site settings

<SettingLocation uri="ayon+settings://deadline/local_settings" scope="Site" />

Credentials for the Deadline servers, set on each machine. They replace the **Default user name** and **Default password** of a server that has **Require authentication** enabled.

<!-- screenshot: settings editor, Deadline site settings -->

<Settings prefix="site">
<Setting name="Local setting" default="Empty list">

One entry per server.

<Settings>
<Setting name="DL server name" default="Empty">

One of the server names defined in [System Deadline Webservice Info](#system-deadline-webservice-info).

</Setting>
<Setting name="Username" default="Empty" />
<Setting name="Password" default="Empty" />
</Settings>

</Setting>
</Settings>

## Related

- [Deadline addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
