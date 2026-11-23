---
title: Kitsu addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Kitsu addon with their default values: server and login secrets, publish plugins, user, casting and project synchronization, and the default task and status mapping."
addon: kitsu
addon_repo: ayon-kitsu
addon_version: 1.2.7
addon_scope: pipeline-server
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-kitsu/tree/1.2.7/server/settings
---

# Kitsu addon settings

<AddonInfo />

The settings of the [Kitsu addon](index.md) are in **Studio settings > Kitsu**, and most of them can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The Kitsu login email and password are stored as AYON [secrets](../../../ayon/how-ayon-works/settings.md); the settings only name them. The `processor` service that synchronizes the data is described in the [addon overview](index.md).

## General

<SettingLocation uri="ayon+settings://kitsu" scope="Studio only, except Enabled" />

The Kitsu server and the account the addon logs in with. These fields are at the top level of the settings.

<!-- screenshot: settings editor, General -->

<Settings>
<Setting name="Enabled" default="Enabled">

Enables the addon. In project settings, turning it off disables the publish plugins for that project.

</Setting>
<Setting name="Kitsu Server">

URL of the Kitsu server. The addon adds `https://` when no scheme is given and `/api` to the end. Studio only.

</Setting>
<Setting name="Kitsu user email" default="kitsu_email">

AYON secret that holds the Kitsu login email. The default is a placeholder secret name. Studio only.

</Setting>
<Setting name="Kitsu user password" default="kitsu_password">

AYON secret that holds the Kitsu password. The default is a placeholder secret name. Studio only.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://kitsu/publish" scope="Studio, with project overrides" />

The publish plugins that decide which instances go to Kitsu and what note is posted there.

<!-- screenshot: settings editor, Publish plugins -->

### Collect Kitsu Family

<SettingLocation uri="ayon+settings://kitsu/publish/CollectKitsuFamily" scope="Studio, with project overrides" />

Adds the `kitsu` family to instances so that they are published to Kitsu. The profile that matches the instance most specifically decides; an empty filter matches everything.

<Settings prefix="collect-kitsu-family">
<Setting name="Enabled" default="Enabled">

Runs the plugin.

</Setting>
<Setting name="Profiles" default="11 profiles, listed below">

<Settings>
<Setting name="Host names" default="Empty list">

Host applications the profile applies to.

</Setting>
<Setting name="Families" default="Empty list">

Product base types the profile applies to. Instances without a base type are matched on their product type.

</Setting>
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Add Kitsu Family" default="Enabled">

Adds the `kitsu` family to matching instances.

</Setting>
<Setting name="Advanced adding if additional families present" default="Empty list">

Filters that override **Add Kitsu Family** when the instance has other families, for example editorial instances that carry `review`. A filter applies when the instance has all its families; when several apply, the one with the most families wins.

<Settings>
<Setting name="Additional Families" default="Empty list" />
<Setting name="Add Kitsu Family" default="Enabled">

Value used instead of the profile value when this filter applies.

</Setting>
</Settings>

</Setting>
</Settings>

The default profiles, by host and families:

- `traypublisher`, all families: added.
- `traypublisher`, `matchmove` and `shot`: not added.
- `traypublisher`, `plate`, `review` and `audio`: not added, but added when the instance has the families `clip` and `review`.
- `maya`, `model`, `setdress`, `animation`, `look`, `rig` and `camera`: added.
- `tvpaint`, `renderPass`: not added.
- `tvpaint`, all families: added.
- `nuke`, `write`, `render` and `prerender`: not added, but added when the instance has the family `review`.
- `aftereffects`, `render` and `workfile`: added.
- `flame`, `plate` and `take`: added.
- `houdini`, `usd`: added.
- `photoshop`, `review`: added.

</Setting>
</Settings>

### Integrate Kitsu Note

<SettingLocation uri="ayon+settings://kitsu/publish/IntegrateKitsuNote" scope="Studio, with project overrides" />

Posts the publish comment as a note on the Kitsu task of instances that have the `review` and `kitsu` families, and can change the task status at the same time.

<Settings>
<Setting name="Set status on note" default="Disabled">

Sets a Kitsu task status together with the note. Otherwise the note keeps the current task status.

</Setting>
<Setting name="Note shortname" default="wfa">

Short name of the Kitsu status to set. Case sensitive. When no status has this short name, the status is not changed.

</Setting>
<Setting name="Status change conditions">

Conditions that must hold for the status to change.

<Settings>
<Setting name="Status conditions" default="Empty list">

The short name of the current Kitsu task status must meet every condition, compared without regard to case.

<Settings>
<Setting name="Condition" default="Equal">

**Equal** or **Not equal**.

</Setting>
<Setting name="Short name" />
</Settings>

</Setting>
<Setting name="Family requirements" default="Empty list">

Requirements on the product types of the published instances.

<Settings>
<Setting name="Condition" default="Equal">

**Equal** or **Not equal**.

</Setting>
<Setting name="Family" />
</Settings>

:::caution
In 1.2.7 a family requirement makes the plugin fail: the plugin reads a key that the setting does not store. Leave this list empty.
:::

</Setting>
</Settings>

</Setting>
<Setting name="Custom Comment Template">

A template for the note text, instead of the plain publish comment. Kitsu supports Markdown in notes.

<Settings>
<Setting name="Enabled" default="Disabled">

Uses the template.

</Setting>
<Setting name="Custom comment" default="The comment followed by a Markdown table of version, family and name">

Template text with `{key}` placeholders, filled from the instance data, such as `{comment}`, `{version}`, `{family}` and `{name}`. A missing key is replaced with an empty string and a warning is logged.

</Setting>
</Settings>

</Setting>
</Settings>

## Sync settings

<SettingLocation uri="ayon+settings://kitsu/sync_settings" scope="Studio, with project overrides" />

What the synchronization between Kitsu and AYON creates: users, casting links, and the names and icons of task types and statuses.

<!-- screenshot: settings editor, Sync settings -->

### Delete projects

<Settings>
<Setting name="Delete projects" id="delete-projects-setting" default="Disabled">

Intended to delete AYON projects when the paired Kitsu project is deleted. In 1.2.7 the setting has no effect, because the handler for deleted projects does not read it.

</Setting>
</Settings>

### Sync users

<SettingLocation uri="ayon+settings://kitsu/sync_settings/sync_users" scope="Studio, with project overrides" />

When a Kitsu user is synchronized, the new AYON user gets the default password and should change it in AYON.

<Settings prefix="sync-users">
<Setting name="Enabled" default="Disabled">

Synchronizes Kitsu users.

</Setting>
<Setting name="Default Password" default="default_password">

Password of newly created users.

</Setting>
<Setting name="Access Group" default="kitsu_group">

Default access group of synchronized users.

</Setting>
<Setting name="Roles">

The AYON role each Kitsu role gets: **User**, **Manager** or **Admin**, which make the AYON user a regular user, a manager or an administrator.

<Settings>
<Setting name="Studio manager" default="Admin" />
<Setting name="Vendor" default="User" />
<Setting name="Client" default="User" />
<Setting name="Production manager" default="Manager" />
<Setting name="Supervisor" default="Manager" />
<Setting name="Artist" default="User" />
</Settings>

</Setting>
</Settings>

### Sync casting

<SettingLocation uri="ayon+settings://kitsu/sync_settings/sync_casting" scope="Studio, with project overrides" />

<Settings>
<Setting name="Sync casting links" default="Disabled">

Creates AYON links from the Kitsu casting breakdown.

</Setting>
<Setting name="Casting link type" default="breakdown">

Name of the AYON link type used.

</Setting>
</Settings>

### Default sync info

<SettingLocation uri="ayon+settings://kitsu/sync_settings/default_sync_info" scope="Studio, with project overrides" />

The names and icons of task types and statuses that the synchronization creates in AYON. A task type or status that is listed uses the given values; any other gets default names and a default icon.

<Settings>
<Setting name="Tasks" default="12 items, listed below">

<Settings>
<Setting name="Name" />
<Setting name="Short name" />
<Setting name="Icon" default="task_alt" />
</Settings>

The default tasks, as name, short name and icon:

- Concept, `cncp`, `lightbulb`
- Modeling, `mdl`, `language`
- Shading, `shdn`, `format_paint`
- Rigging, `rig`, `construction`
- Edit, `edit`, `cut`
- Storyboard, `stry`, `image`
- Layout, `lay`, `nature_people`
- Animation, `anim`, `directions_run`
- Lighting, `lgt`, `highlight`
- FX, `fx`, `local_fire_department`
- Compositing, `comp`, `layers`
- Recording, `rcrd`, `video_camera_back`

</Setting>
<Setting name="Statuses" default="9 items, listed below">

Statuses already have names, so the short name is the key.

<Settings>
<Setting name="Short name" />
<Setting name="State" default="In progress">

**Not started**, **In progress**, **Done** or **Blocked**.

</Setting>
<Setting name="Icon" default="task_alt" />
</Settings>

The default statuses, as short name, state and icon:

- `todo`, Not started, `fiber_new`
- `neutral`, In progress, `timer`
- `wip`, In progress, `play_arrow`
- `wfa`, In progress, `visibility`
- `retake`, In progress, `timer`
- `done`, Done, `task_alt`
- `ready`, Not started, `timer`
- `approved`, Done, `task_alt`
- `rejected`, Blocked, `block`

</Setting>
</Settings>

## Related

- [Kitsu addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
