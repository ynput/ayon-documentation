---
title: Open RV addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Open RV addon with their default values: the enable switch, the network connection used by the Open in RV loaders and color management."
addon: openrv
addon_repo: ayon-openrv
addon_version: 1.2.7
addon_scope: pipeline
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-openrv/tree/1.2.4/server
---

# Open RV addon settings

<AddonInfo />

The settings of the [Open RV addon](index.md) are in **Studio settings > OpenRV**, with overrides in **Project settings > OpenRV**. Pasting a location below into the URI bar of the web app opens that setting. The executables of Open RV and their arguments, such as the `-network` flag the loaders need, are not set here: they are defined for the `openrv` application group in the [Applications addon](../../essentials/applications/settings.md).

## General

<SettingLocation uri="ayon+settings://openrv/enabled" scope="Studio, with project overrides" />

<!-- screenshot: settings editor, Enabled -->

<Settings>
<Setting name="Enabled" default="Enabled">

Turns the addon on or off.

</Setting>
</Settings>

## Network Settings

<SettingLocation uri="ayon+settings://openrv/network" scope="Studio, with project overrides" />

The connection used by the **Open in RV** and **Open in Existing RV** loaders to talk to a running Open RV on the local machine; see [From other applications and the tray](index.md#from-other-applications-and-the-tray).

<!-- screenshot: settings editor, Network Settings -->

<Settings>
<Setting name="Connection Name" default="ayon-rv-connect">

The name the connection identifies itself with to Open RV.

</Setting>
<Setting name="Connection Port" default="45124">

The port of the network interface of Open RV.

</Setting>
<Setting name="Timeout in Seconds" default="20">

How long the connection is retried before it fails.

</Setting>
</Settings>

## Color Management (imageio)

<SettingLocation uri="ayon+settings://openrv/imageio" scope="Studio, with project overrides" />

Whether color management is applied for Open RV. How AYON resolves the OCIO config when a host starts is described in [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (imageio) -->

<Settings>
<Setting name="Enable Color Management" default="Enabled">

Read by the core addon as the switch that activates color management for this host.

</Setting>
</Settings>

The settings module also defines **Override global OCIO config** and **Config path** fields, but they are not part of the addon settings in this version.

## Related

- [Open RV addon](index.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
