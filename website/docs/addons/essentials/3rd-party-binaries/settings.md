---
title: 3rd party binaries addon settings
sidebar_label: Settings
description: "Settings of the 3rd party binaries addon (ayon_third_party): download or custom paths and launch arguments for ffmpeg and OpenImageIO."
addon: ayon_third_party
addon_repo: ayon-third-party
addon_version: 1.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-third-party/tree/1.4.1
---

# 3rd party binaries addon settings

<AddonInfo />

The settings of the [3rd party binaries addon](index.md) are in **Studio settings > 3rd Party Distribution**. Pasting a location below into the URI bar of the web app opens that setting. The addon has two groups, one per tool set, with the same shape. How the executables are resolved from these settings is described in [How the executables are resolved](index.md#how-the-executables-are-resolved).

:::note
The settings editor also offers project overrides, but the addon reads only the studio settings when it resolves the executables, so project overrides have no effect. The addon version itself can be set per project; see [settings](../../../ayon/how-ayon-works/settings.md).
:::

## FFmpeg

<SettingLocation uri="ayon+settings://ayon_third_party/ffmpeg" scope="Studio (project overrides are not used)" />

Where `ffmpeg` and `ffprobe` come from: the build stored in the addon package, or executables installed by the studio. A studio changes this to use its own ffmpeg build, for example one with other codecs.

<!-- screenshot: settings editor, FFmpeg -->

<Settings prefix="ffmpeg">
<Setting name="Download ffmpeg from server" default="Enabled">

Use the ffmpeg build stored in the addon package, downloaded to each workstation when needed. When disabled, one of the custom options below must be set.

</Setting>
<Setting name="Custom root" default="Empty lists">

Per platform (**Windows**, **Linux**, **MacOS**): folders searched in order for an executable with the tool's name. Used only when download is disabled, after **Custom arguments**. Environment variables can be written as `{VARIABLE}`.

</Setting>
<Setting name="Custom arguments">

Command lines used to launch each tool, tried in order before the custom roots. Used only when download is disabled. An item is used when running it with `-version` succeeds.

<Settings>
<Setting name="Tool 'ffmpeg'" default="Empty list">

Each item has an **Arguments** list of strings: the command with its leading arguments, for example an executable path, or a wrapper command followed by the executable.

</Setting>
<Setting name="Tool 'ffprobe'" default="Empty list">

Same items as **Tool 'ffmpeg'**.

</Setting>
</Settings>

</Setting>
</Settings>

## OpenImageIO

<SettingLocation uri="ayon+settings://ayon_third_party/oiio" scope="Studio (project overrides are not used)" />

Where the OpenImageIO tools come from: the build stored in the addon package, or executables installed by the studio.

<!-- screenshot: settings editor, OpenImageIO -->

<Settings prefix="oiio">
<Setting name="Download OpenImageIO from server" default="Enabled">

Use the OpenImageIO build stored in the addon package, downloaded to each workstation when needed. When disabled, one of the custom options below must be set.

</Setting>
<Setting name="Custom root" default="Empty lists">

Per platform (**Windows**, **Linux**, **MacOS**): folders searched in order for an executable with the tool's name. Used only when download is disabled, after **Custom arguments**. Environment variables can be written as `{VARIABLE}`.

</Setting>
<Setting name="Custom arguments">

Command lines used to launch each tool, tried in order before the custom roots. Used only when download is disabled. Each item has an **Arguments** list of strings, as for ffmpeg. An item is used when running it with `--help` succeeds. The asterisk in the titles of `oiiotool` and `maketx` is part of the title.

<Settings>
<Setting name="*Tool 'oiiotool'" default="Empty list" />
<Setting name="*Tool 'maketx'" default="Empty list" />
<Setting name="Tool 'iv'" default="Empty list" />
<Setting name="Tool 'iinfo'" default="Empty list" />
<Setting name="Tool 'igrep'" default="Empty list" />
<Setting name="Tool 'idiff'" default="Empty list" />
<Setting name="Tool 'iconvert'" default="Empty list" />
</Settings>

</Setting>
</Settings>

## Related

- [3rd party binaries addon overview](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
