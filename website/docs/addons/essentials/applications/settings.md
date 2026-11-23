---
title: Applications addon settings
sidebar_label: Settings
description: "The Applications addon settings: application and tool definitions, their environment values with the farm and standard groups, and the application and tool filters, with their defaults and scopes."
addon: applications
addon_repo: ayon-applications
addon_version: 1.4.9
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-applications/tree/1.4.9/server
---

# Applications addon settings

<AddonInfo />

The settings of the [Applications addon](index.md) are in **Studio settings > Applications**, with project overrides for the filters in **Project settings > Applications**. Pasting a location below into the URI bar of the web app opens that setting. The settings have two parts: the **definitions** of applications and tools are studio settings, and the **filters**, which decide the applications and tools available in a context, can be overridden per project. Environment variables for all applications of a project are not set here but in **Project environments** of the [Core settings](../core/settings.md#project-project-environments).

## Environment values

Every **Environment** and **Environments** field on this page holds a JSON object of environment variables. A value can be:

- a string;
- a list of strings, joined with the path separator of the platform (`;` on Windows, `:` on Linux and macOS);
- an object with the platform keys `windows`, `linux` and `darwin`, each holding a string or a list; a platform without a key does not get the variable;
- an object with **environment group** keys, each holding any of the values above. An object is read as groups when none of its keys is a platform key.

```json
{
    "ARNOLD_LICENSE_ORDER": {
        "standard": "network",
        "farm": "none"
    },
    "RENDER_ONLY_SETTING": {
        "farm": "1"
    },
    "MY_PLUGIN_PATH": {
        "standard": {
            "windows": ["P:/plugins/win", "{MY_PLUGIN_PATH}"],
            "linux": "/mnt/plugins/linux"
        },
        "farm": "/opt/plugins"
    }
}
```

The environment group decides which value a launch uses:

- **`standard`** is used for every launch that does not ask for another group: applications started from the launcher, the web app actions and the `launch` commands, and the environment of the publish job on the farm, which the publish command computes without a group.
- **`farm`** is requested by the farm addons when they compute the environment of a render job on the render node: the Deadline `GlobalJobPreLoad.py` and the Royal Render `ayon_inject_envvar.py` call the `extractenvironments` command with `--envgroup farm`. Typical uses are license servers, plugin paths or switches that differ on the render nodes. See [Farm rendering](../../../pipeline/farm.md).

A variable that is split into groups and has no value for the requested group is left out: in the example, `RENDER_ONLY_SETTING` exists only in farm render jobs. A variable that is not split is used by every group. Other group names work too: `extractenvironments --envgroup <name>` selects them, but no AYON addon requests another group. The same rules apply to **Project environments** in the Core settings.

At launch the values are merged in this order, a later value replacing an earlier one: the application group, the application variant, then for each selected tool group (sorted by name) the tool group and its selected tool variants. A reference such as `{MY_PLUGIN_PATH}` is filled in with the value set before it, or with the environment of the process that launches the application.

## Applications Definitions

<SettingLocation uri="ayon+settings://applications/applications" scope="Studio only" />

The applications AYON can launch: one group per application, each with its versions (variants), their executables, launch arguments and environment. Each group can be opened directly, for example `ayon+settings://applications/applications/maya`. Change it to point the executables at the installations of the studio, to add or remove versions, or to disable applications the studio does not use.

<!-- screenshot: settings editor, Applications Definitions -->

Every application group has the same fields:

<Settings prefix="group">
<Setting name="Enabled" default="Enabled">

Whether the applications of the group can be launched and appear in the [filters](#applications-filters).

</Setting>
<Setting name="Host name">

Name of the AYON integration the application uses, for example `maya`. Keep the default for integrated applications; the [default applications](#default-applications) list it per group. It must match the host name of the integration addon (see [Host integration](../../../developer/addon-development/host-integration.md)). An application with a host name needs a folder and a task to be launched.

</Setting>
<Setting name="Environment" default="{}">

Environment variables for every variant of the group. See [Environment values](#environment-values).

</Setting>
<Setting name="Variants">

The versions of the application, each with the fields of a [variant](#variant). Variant names are unique within a group.

</Setting>
</Settings>

### Variant

One version of an application. The full name of a variant, used in the filters and in commands, is `<group>/<variant>`, for example `maya/2026`.

<Settings prefix="variant">
<Setting name="Name">

Name of the variant. It is required and cannot contain `/`.

</Setting>
<Setting name="Label">

Label shown in the UI next to the group label. The name is used when empty.

</Setting>
<Setting name="Group label">

Overrides the group label used to group the variant in the UI.

</Setting>
<Setting name="Group in UI" default="Enabled">

Groups the variant under its group label in the UI. When disabled, the variant is shown on its own.

</Setting>
<Setting name="Executables" default="Empty lists">

Paths of the executable for **Windows**, **Linux** and **MacOS**. Several paths can be listed when machines differ: the first path that exists on the machine is launched.

</Setting>
<Setting name="Arguments" default="Empty lists">

Launch arguments for **Windows**, **Linux** and **MacOS**.

</Setting>
<Setting name="Environment" default="{}">

Environment variables of this variant, usually the version variable such as `MAYA_VERSION`. See [Environment values](#environment-values).

</Setting>
<Setting name="Redirect output to Process Monitor" default="Enabled">

Sends the standard output and error of the application to the [Process Monitor](../../../pipeline/process-monitor.md). When disabled, the output is lost unless the application logs it itself.

</Setting>
</Settings>

### Default applications

The application groups of the settings model with their defaults. All groups are enabled by default. Default executables are typical installation paths per platform, for example `C:\Program Files\Autodesk\Maya2026\bin\maya.exe` for Maya 2026 on Windows; some variants have a path for only some platforms. The paths need to be checked against the installations of the studio.

<Settings>
<Setting name="Maya">

Key `maya`, host name `maya`. Variants 2026, 2025, 2024 and 2023, each setting `MAYA_VERSION`. The group environment disables the Autodesk customer involvement and error reporting dialogs (`MAYA_DISABLE_CLIC_IPM`, `MAYA_DISABLE_CIP`, `MAYA_DISABLE_CER`), sets `PYMEL_SKIP_MEL_INIT` and sets `LC_ALL` to `C`.

</Setting>
<Setting name="3ds Max">

Key `adsk_3dsmax`, host name `max`. Variants 2024 and 2023, each setting `3DSMAX_VERSION`.

</Setting>
<Setting name="Flame">

Key `flame`, host name `flame`. Variants 2021, 2021.1, 2024.2 and 2026, each setting the Python executable, Python path and Wiretap tools of the integration. The group environment sets the script directories and the Wiretap host, volume and group.

</Setting>
<Setting name="Gaffer">

Key `gaffer`, host name `gaffer`. Variant 1.5.2.

</Setting>
<Setting name="Katana">

Key `katana`, host name `katana`. Variants 9.0 and 8.0.

</Setting>
<Setting name="Nuke">

Key `nuke`, host name `nuke`. Variants 17.0, 16.0, 15.0, 14.0 and 13.2.

</Setting>
<Setting name="Nuke Assist">

Key `nukeassist`, host name `nuke`. Variants 15.0, 14.0 and 13.2, launched with `--nukeassist` on Windows and Linux.

</Setting>
<Setting name="Nuke X">

Key `nukex`, host name `nuke`. Variants 15.0, 14.0 and 13.2, launched with `--nukex` on Windows and Linux.

</Setting>
<Setting name="Nuke Studio">

Key `nukestudio`, host name `hiero`. Variants 15.0, 14.0 and 13.2, launched with `--studio` on Windows and Linux. The group environment sets the workfile and tag startup switches `WORKFILES_STARTUP` and `TAG_ASSETBUILD_STARTUP`.

</Setting>
<Setting name="Hiero">

Key `hiero`, host name `hiero`. Variants 15.0, 14.0 and 13.2, launched with `--hiero` on Windows and Linux. The group environment is the same as for Nuke Studio.

</Setting>
<Setting name="Fusion">

Key `fusion`, host name `fusion`. Variants 20, 19, 18 and 17. The group environment sets `FUSION_PYTHON3_HOME`.

</Setting>
<Setting name="Resolve">

Key `resolve`, host name `resolve`. Variant stable. The group environment sets the utility scripts folder and `RESOLVE_PYTHON3_HOME`.

</Setting>
<Setting name="Houdini">

Key `houdini`, host name `houdini`. Variants 19.5, 19.0, 18.5 and 20.5.

</Setting>
<Setting name="Blender">

Key `blender`, host name `blender`. Variants 3.6.5 LTS, 4.2 LTS, 4.4 and 5.0, all launched with `--python-use-system-env`; 4.4 and 5.0 also set `AYON_BLENDER_USE_SYSTEM_PATH`.

</Setting>
<Setting name="Harmony">

Key `harmony`, host name `harmony`. Variants 22 and 21.

</Setting>
<Setting name="TVPaint">

Key `tvpaint`, host name `tvpaint`. Variants 11 (64bits) and 11 (32bits).

</Setting>
<Setting name="Photoshop">

Key `photoshop`, host name `photoshop`. Variants 2023, 2024 and 2025. The group environment sets `WORKFILES_SAVE_AS`.

</Setting>
<Setting name="After Effects">

Key `aftereffects`, host name `aftereffects`. Variants 2023, 2024, 2025 and 2026. The group environment sets `WORKFILES_SAVE_AS`.

</Setting>
<Setting name="Premiere">

Key `premiere`, host name `premiere`. Variants 2023, 2024 and 2025. The group environment sets `WORKFILES_SAVE_AS`.

</Setting>
<Setting name="Celaction 2D">

Key `celaction`, host name `celaction`. Variant local. The group environment sets `CELACTION_TEMPLATE`.

</Setting>
<Setting name="Substance Painter">

Key `substancepainter`, host name `substancepainter`. Variant Stable.

</Setting>
<Setting name="Substance Designer">

Key `substancedesigner`, host name `substancedesigner`. Variant 2025.

</Setting>
<Setting name="Speedtree">

Key `speedtree`, host name `speedtree`. Variant 10.0.

</Setting>
<Setting name="Unreal Editor">

Key `unreal`, host name `unreal`. Variants 5.2, 5.3 and 5.4.

</Setting>
<Setting name="Wrap">

Key `wrap`, host name `wrap`. Variant 2023.

</Setting>
<Setting name="OpenRV">

Key `openrv`, host name `openrv`. Variant 1.0.0.

</Setting>
<Setting name="Marvelous Designer">

Key `marvelousdesigner`, host name `marvelousdesigner`. Variant 2025 (name `2025.2`).

</Setting>
<Setting name="CLO">

Key `clo`, host name `marvelousdesigner`. Variant 2025 (name `2025.2`).

</Setting>
<Setting name="Zbrush">

Key `zbrush`, host name `zbrush`. Variant 2024.

</Setting>
<Setting name="3DEqualizer">

Key `equalizer`, host name `equalizer`. Variant 7.1v2.

</Setting>
<Setting name="Motion Builder">

Key `motionbuilder`, host name `motionbuilder`. Variants 2025 and 2024.

</Setting>
<Setting name="Cinema4D">

Key `cinema4d`, host name `cinema4d`. Variants 2025, 2024 and 2023.

</Setting>
<Setting name="Mocha Pro">

Key `mochapro`, host name `mochapro`. Variants 2025, 2024.5 and 2021 (names `12-0-0`, `11-5-0` and `8-0-0`).

</Setting>
<Setting name="BorisFX Silhouette">

Key `silhouette`, host name `silhouette`. Variant 2024.5.

</Setting>
<Setting name="PureRef">

Key `pureref`, host name `pureref`. Variant 2.1.3.

</Setting>
<Setting name="Marmoset Toolbag">

Key `marmoset`, host name `marmoset`. Variant 5.

</Setting>
<Setting name="ShapeFX Loki">

Key `loki`, host name `loki`. Variant 1.0.0.

</Setting>
<Setting name="Terminal">

Key `terminal`, no host name. Variant Main (name `main`), which opens a terminal with the environment of the task: `cmd.exe` on Windows, `Terminal.app` on macOS and the first available of a list of terminal emulators on Linux. Its output is not redirected to the Process Monitor.

</Setting>
</Settings>

### Additional Applications

<SettingLocation uri="ayon+settings://applications/applications/additional_apps" scope="Studio only" />

Application groups that are not in the settings model, typically software without an AYON integration, launched with the task environment.

<!-- screenshot: settings editor, Additional Applications -->

<Settings>
<Setting name="Additional Applications" id="additional-applications-list" default="Empty list">

<Settings>
<Setting name="Enabled" default="Enabled">

Whether the applications of the group can be launched.

</Setting>
<Setting name="Name">

Name of the group, the first part of the full application name. It is required, cannot contain `/`, must be unique in the list and must not equal the key of a group of the [default applications](#default-applications).

</Setting>
<Setting name="Label">

Label of the group in the UI. The name is used when empty.

</Setting>
<Setting name="Host name">

Name of the AYON integration. Leave empty for software without an integration.

</Setting>
<Setting name="Icon">

Icon of the group, chosen from the custom icons uploaded to the addon, or **`< No icon >`**.

</Setting>
<Setting name="Environment" default="{}">

Environment variables for every variant of the group. See [Environment values](#environment-values).

</Setting>
<Setting name="Variants" default="Empty list">

The versions of the application, each with the fields of a [variant](#variant).

</Setting>
</Settings>

</Setting>
</Settings>

## Tools Definitions

<SettingLocation uri="ayon+settings://applications/tool_groups" scope="Studio only" />

Tools are renderers, plugins and other software that are set up through environment variables. The environment of the tools selected by the [Tool Filters](#tool-filters) is added to the environment of the launched application. Group names must be unique.

<!-- screenshot: settings editor, Tools Definitions -->

<Settings prefix="tool">
<Setting name="Name">

Name of the tool group, the first part of the full tool name `<group>/<variant>`. It is required and cannot contain `/`.

</Setting>
<Setting name="Label">

Label of the tool group in the UI. The name is used when empty.

</Setting>
<Setting name="Environments" default="{}">

Environment variables for every variant of the tool. See [Environment values](#environment-values).

</Setting>
<Setting name="Variants" default="Empty list">

The versions of the tool. Variant names are unique within a group.

<Settings>
<Setting name="Name">

Name of the variant. It is required and cannot contain `/`.

</Setting>
<Setting name="Label">

Label of the variant in the UI. The name is used when empty.

</Setting>
<Setting name="Hosts" default="Empty list">

Host names the variant applies to, for example `maya`. Empty applies to all.

</Setting>
<Setting name="Applications" default="Empty list">

Application variants the tool variant applies to, for example **Maya 2026**. Empty applies to all. A tool variant is added only when the launched application matches both **Hosts** and **Applications**.

</Setting>
<Setting name="Environments" default="{}">

Environment variables of this variant, usually the version variable. See [Environment values](#environment-values).

</Setting>
</Settings>

</Setting>
</Settings>

The default tool groups are examples whose paths start with a `{STUDIO_SW}` variable for the software repository of the studio, which can be set in **Project environments** of the Core settings. Their labels end in "(example)":

- `htoa`, Arnold for Houdini: variant `5-4-2-7`, host `houdini`;
- `mtoa`, Arnold for Maya: variants `5-3-1-0` and `5-3-4-1`;
- `redshiftMaya`, Redshift for Maya: variant `3-5-23`;
- `redshift3dsmax`, Redshift for 3dsmax: variant `3-5-19`, host `max`;
- `rendermanMaya`, Renderman for Maya: variant 24.3 RFM (`24-3-maya`), host `maya`, application `maya/2022`;
- `mGear`, mGear for Maya: variant `4-0-7`;
- `yetiMaya`, Yeti for Maya: variant `4.2.11`;
- `vrayMaya`, Vray for Maya: variant `6.10.01`, host `maya`;
- `vraynuke`, Vray for Nuke: variant `5-20-00`, host `nuke`.

## Applications Filters

<SettingLocation uri="ayon+settings://applications/project_applications" scope="Studio, with project overrides" />

The applications offered for a task, in the launcher and in the web app actions. The addon selects applications only through these profiles; the older `applications` project attribute is not read.

<!-- screenshot: settings editor, Applications Filters -->

<Settings>
<Setting name="Profiles" default="One profile: any task type, All applications">

A profile listing the task type of the task is used before a profile without task types. When no profile matches, no applications are offered for the task.

<Settings>
<Setting name="Task Types" default="Empty list">

Task types the profile applies to. Empty applies to all.

</Setting>
<Setting name="Allow" default="Selected">

**All applications** (every enabled variant of the definitions) or **Selected**. A new profile starts with **Selected**; the default profile uses **All applications**.

</Setting>
<Setting name="Applications" default="Empty list">

The application variants offered when **Allow** is **Selected**, in a sortable list.

</Setting>
</Settings>

</Setting>
</Settings>

## Tool Filters

<SettingLocation uri="ayon+settings://applications/project_tools" scope="Studio, with project overrides" />

The tools added to the environment of applications launched in a context. The addon selects tools only through these profiles; the older `tools` attribute of folders and tasks is not read. Tools are resolved when the application starts, so switching task inside an open application does not change the loaded tools.

<!-- screenshot: settings editor, Tool Filters -->

<Settings>
<Setting name="Profiles" id="tool-filters-profiles" default="Empty list">

The profile that matches the most filters is used. Between profiles that match as many filters, a match on the folder path counts before one on the task name, then the task type. When no profile matches, no tools are added.

<Settings>
<Setting name="Folder paths" default="Empty list">

Folder paths the profile applies to. Regular expressions are supported. Empty applies to all.

</Setting>
<Setting name="Task Types" default="Empty list">

Task types the profile applies to. Empty applies to all.

</Setting>
<Setting name="Task Names" default="Empty list">

Task names the profile applies to. Empty applies to all.

</Setting>
<Setting name="Tools" default="Empty list">

Tool variants added in the matching context. A tool variant is skipped when its **Hosts** or **Applications** do not match the launched application.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [Applications addon](index.md)
- [Core addon settings](../core/settings.md): project environments and the farm environment filter
- [Farm rendering](../../../pipeline/farm.md): how render and publish jobs get their environment
- [Process Monitor](../../../pipeline/process-monitor.md): output redirection of application variants
- [Host integration](../../../developer/addon-development/host-integration.md): the host name of an integration
