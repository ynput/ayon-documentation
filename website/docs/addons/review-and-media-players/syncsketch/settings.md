---
title: SyncSketch addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SyncSketch addon: the server configuration with the secrets for the API user and key, and the mapping between AYON and SyncSketch projects."
addon: syncsketch
addon_repo: ayon-syncsketch
addon_version: 0.4.1
addon_scope: server
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-syncsketch/tree/0.4.1/server
---

# SyncSketch addon settings

<AddonInfo />

The settings of the [SyncSketch addon](index.md) are in **Studio settings > SyncSketch**, with overrides in **Project settings > SyncSketch**. Pasting a location below into the URI bar of the web app opens that setting. The SyncSketch credentials themselves are not addon settings: they are stored as [secrets](../../../ayon/web-ui/studio/secrets.md), and the settings only name them.

## SyncSketch server config

<SettingLocation uri="ayon+settings://syncsketch/config" scope="Studio; project overrides are ignored" />

The SyncSketch server and the credentials the processor service uses. The service reads them from the studio settings of the addon version it runs for, and checks them against the SyncSketch API before it processes jobs; see [Services](index.md#services).

<!-- screenshot: settings editor, SyncSketch server config -->

<Settings>
<Setting name="API Username" default="Empty">

The name of an AYON secret that holds the SyncSketch API username. The setting offers the existing secrets.

</Setting>
<Setting name="API Key" default="Empty">

The name of an AYON secret that holds the SyncSketch API key.

</Setting>
<Setting name="SyncSketch Server URL" default="Empty">

Address of the SyncSketch server. When empty, `https://www.syncsketch.com` is used, which is also shown as the placeholder.

</Setting>
</Settings>

## Sync options

<SettingLocation uri="ayon+settings://syncsketch/sync" scope="Studio, with project overrides" />

How the **Push to SyncSketch** action chooses the SyncSketch project when a list of the AYON project is pushed for the first time. The action reads these options from the project settings.

<!-- screenshot: settings editor, Sync options -->

<Settings>
<Setting name="Project Mapping" default="Match Project Name">

- **Match Project Name:** uses the SyncSketch project with the name of the AYON project.
- **Select from list:** offers the projects below in a form.

</Setting>
<Setting name="SyncSketch Project Names" default="Empty list">

Shown when **Project Mapping** is **Select from list**. SyncSketch projects to select from. When the list has a single name and custom names are not allowed, that project is used without a form.

</Setting>
<Setting name="Allow custom project name" default="Disabled">

Shown when **Project Mapping** is **Select from list**. Adds a `< Custom project name >` option to the form, so that the user can type a project name.

</Setting>
</Settings>

## Related

- [SyncSketch addon](index.md)
- [Secrets](../../../ayon/web-ui/studio/secrets.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
