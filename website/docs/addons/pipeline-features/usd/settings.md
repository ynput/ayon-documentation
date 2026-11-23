---
title: USD addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON USD addon with their default values: binary distribution (lakeFS and local), resolver logging, USD debug variable and the USD publish plugins."
addon: usd
addon_repo: ayon-usd
addon_version: 0.1.9
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-usd/tree/0.1.9/server/settings
---

# USD addon settings

<AddonInfo />

The settings of the [USD addon](index.md) are in **Studio settings > USD**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The settings of the USD contribution workflow, such as the department layer order, are not in this addon: they are in the Core addon (**Collect USD Layer Contributions**, `ayon+settings://core/publish/CollectUSDLayerContributions`) and in the application addons; typing `usd` in the filter of the settings editor shows them. The workflow is described in [OpenUSD](../../../pipeline/openusd.md).

## Binary distribution

<SettingLocation uri="ayon+settings://usd/distribution" scope="Studio, with project overrides" />

Where the AYON USD resolver comes from. When enabled, the addon sets up a matching resolver build for the launched application, if there is one; see [Resolver distribution](index.md#resolver-distribution).

:::caution
Disabling binary distribution also disables the AYON USD resolver for every application.
:::

<!-- screenshot: settings editor, Binary Distribution -->

<Settings>
<Setting name="Enabled" id="binary-distribution-enabled" default="Disabled">

Set up the resolver when an application is launched.

</Setting>
<Setting name="Distribution type" default="Distribute via AYON (LakeFS)">

**Distribute via AYON (LakeFS)** downloads the resolver from a lakeFS server, set in [LakeFS Distribution Settings](#lakefs-distribution-settings). **Configure via local path** uses a resolver that is already installed, set in [Local Distribution Settings](#local-distribution-settings).

</Setting>
</Settings>

### LakeFS Distribution Settings

<SettingLocation uri="ayon+settings://usd/distribution/lake_fs" scope="Studio, with project overrides" />

Used with **Distribute via AYON (LakeFS)**.

<Settings prefix="lake-fs">
<Setting name="Server URL" default="https://lake.ayon.cloud">

The lakeFS server that hosts the builds. Keep the default to use the builds Ynput provides.

</Setting>
<Setting name="Repository URI" default="lakefs://ayon-usd/v1.2.1/">

The repository tag or branch on the server. Keep the default to use the builds Ynput provides.

</Setting>
<Setting name="Access Key ID" default="{AYON_Distribution_Key_Id}">

Access key ID of the server. The default is a placeholder: the keys are not public, and Ynput provides them on request.

</Setting>
<Setting name="Secret Access Key" default="{AYON_Distribution_Access_Key}">

Secret key of the server. The default is a placeholder.

</Setting>
<Setting name="Resolver Application Paths" default="23 items">

Which resolver zip is used for which application and platform. The list comes with every build on the Ynput server, so it rarely needs changes, except for **Application Alias**.

<Settings>
<Setting name="Application">

Application name, for example `maya/2025`.

</Setting>
<Setting name="Application Alias" default="Empty list">

Other applications that use the same resolver, for example other patch versions of Houdini 20.5.

</Setting>
<Setting name="Platform">

**Windows**, **Linux** or **MacOS**.

</Setting>
<Setting name="Repository Object Path">

Path of the resolver zip inside the repository, for example `AyonUsdResolverBin/MayaLinux/Maya2024_2_Py310_Linux_Linux_x86_64.zip`. It is shown in the object information of the file on the lakeFS server.

</Setting>
</Settings>

The default items are one per application and platform: Maya 2024, 2025 and 2026 (Windows and Linux); Houdini 19.5 (also the `19-5Py37` variant), 20.0 (also `20-0Py39`), 20.5 (also `20-5Py310`), 21.0 and 22.0 (Windows and Linux); and Unreal 5.4 (Windows).

</Setting>
<Setting name="Resolver Application Overrides" default="Empty list">

Replaces the zip of an application with another one.

<Settings>
<Setting name="Application" />
<Setting name="Platform">

**Windows**, **Linux** or **MacOS**.

</Setting>
<Setting name="Repository Object URI">

Full `lakefs://` URI of the resolver zip, for example `lakefs://ayon-usd/V001/AyonUsdResolverBin/Hou/ayon-usd-resolver_hou19.5_linux_py37.zip`.

</Setting>
</Settings>

</Setting>
</Settings>

### Local Distribution Settings

<SettingLocation uri="ayon+settings://usd/distribution/local" scope="Studio, with project overrides" />

Used with **Configure via local path**.

<Settings prefix="local">
<Setting name="Resolver Roots" default="Empty list">

Named root paths, usable as `{resolver_root}` in resolver paths.

<Settings>
<Setting name="Root Name">

Required name of the root, such as `resolver_root`.

</Setting>
<Setting name="Windows" default="Empty" />
<Setting name="Linux" default="Empty" />
<Setting name="Darwin" default="Empty" />
</Settings>

</Setting>
<Setting name="Resolver Paths" default="Empty list">

Pre-installed resolvers per application.

<Settings>
<Setting name="Application" />
<Setting name="Application Alias" default="Empty list">

Other applications that use the same resolver.

</Setting>
<Setting name="Platform">

**Windows**, **Linux** or **MacOS**.

</Setting>
<Setting name="Resolver Directory Path">

The directory that contains the `ayonUsdResolver` folder.

</Setting>
</Settings>

</Setting>
</Settings>

## AYON USD Resolver Config

<SettingLocation uri="ayon+settings://usd/ayon_usd_resolver" scope="Studio, with project overrides" />

Logging of the resolver. The values are passed to the resolver as environment variables when an application starts.

<!-- screenshot: settings editor, AYON USD Resolver Config -->

<Settings>
<Setting name="Resolver Log Level" default="Warn">

**Info**, **Error**, **Warn**, **Critical** or **Off**.

</Setting>
<Setting name="Resolver File Logger Enabled" default="Off">

**Off** or **On**.

</Setting>
<Setting name="Resolver File logger file path" default="Empty">

Custom location of the log file, relative or absolute. Used only when the file logger is on.

</Setting>
<Setting name="AyonCppApi Logging Keys" default="Off">

Extra logging of the AYON C++ API: **Off**, **Api Debug**, **Env Debug** or **All**.

</Setting>
</Settings>

## USD Library Config

<SettingLocation uri="ayon+settings://usd/usd" scope="Studio, with project overrides" />

Options of the USD library shipped with the addon.

<!-- screenshot: settings editor, USD Library Config -->

<Settings>
<Setting name="Tf Debug Variable for Debugging USD" default="Empty">

Value of the `TF_DEBUG` environment variable, for debugging USD.

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://usd/publish" scope="Studio, with project overrides" />

**Enabled** runs the plugin, **Optional** lets the artist switch it off in the Publisher, and **Active** sets whether it is checked when the Publisher opens. The pinning plugin has only **Enabled**.

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Process USD files to use relative paths" default="Disabled, not optional, active">

Published USD layers anchor their asset paths to the published file path. Enabling it in the studio settings affects running projects; enabling it in the settings of new projects only is safer.

</Setting>
<Setting name="Generate USD Resolver Pinning file on publish" default="Enabled">

Writes a pinning file next to the published USD file that pins all dynamic entity URIs to paths. Disable it when the USD resolver is not used.

</Setting>
</Settings>

To deliver self-contained USD with relative paths and without the AYON USD resolver, for example to another studio: disable [Binary distribution](#binary-distribution), disable **Generate USD Resolver Pinning file on publish** and enable **Process USD files to use relative paths**.

## Related

- [USD addon](index.md)
- [OpenUSD](../../../pipeline/openusd.md)
