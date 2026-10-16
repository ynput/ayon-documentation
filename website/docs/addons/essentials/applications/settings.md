---
title: Applications addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Applications addon with their default values: application definitions, additional applications, tool definitions and the application and tool filters."
addon: applications
addon_repo: ayon-applications
addon_version: 1.4.7
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-applications/tree/1.4.7/server
  - https://help.ayon.app/en/help/articles/3945756-applications-and-tools
---

# Applications addon settings

<AddonInfo />

The settings of the [Applications addon](index.md), with the default values the addon ships with. The settings have two parts. **Definitions** (applications and tools) are studio settings. **Filters** decide which applications and tools are available in a context and can be set per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Environment fields hold a JSON object. Values can be lists and can be split per platform with the keys `windows`, `linux` and `darwin`.

## Applications Definitions

One group per application. Every group has the same fields.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Whether the application group is available. |
| Host name | See [default applications](#default-applications) | Name of the pipeline integration that the application uses, for example `maya`. Keep the default for integrated applications. |
| Environment | Mostly `{}` | Environment variables applied to every variant of the group. |
| Variants | See below | The versions of the application. |

Default group environments that are not empty: Maya (Autodesk variables), Flame (script directories), Nuke Studio and Hiero (workfile and tag startup switches), and Fusion and Resolve (Python and utility script paths).

### Variant

| Setting | Default | Description |
|---|---|---|
| Name | Per variant | Name of the variant, used in the full application name `<group>/<variant>`. By convention lowercase letters, digits and hyphens. |
| Label | Empty | Label shown in the UI. The name is used when empty. |
| Group label | Empty | Overrides the group label used to group the variant in the UI. |
| Group in UI | On | Groups the variant under its group label in the UI. |
| Executables | Per variant | Lists of executable paths for **Windows**, **Linux** and **MacOS**. Several paths can be given when machines differ. |
| Arguments | Empty | Lists of launch arguments for **Windows**, **Linux** and **MacOS**. |
| Environment | Per variant | Environment variables for this variant, usually the version variable such as `MAYA_VERSION`. |
| Redirect output to Process Monitor | On | Sends the standard output and error of the application to the AYON Process Monitor. When off, output is lost unless the application logs itself. |

### Default applications

The table lists the application groups defined by default, the host name of each group and the variants that exist by default.

| Application (key) | Host name | Default variants |
|---|---|---|
| Maya (`maya`) | `maya` | 2026, 2025, 2024, 2023 |
| 3ds Max (`adsk_3dsmax`) | `max` | 2024, 2023 |
| Flame (`flame`) | `flame` | 2021, 2021_1, 2024-2, 2026 |
| Gaffer (`gaffer`) | `gaffer` | 1.5.2 |
| Katana (`katana`) | `katana` | 9.0, 8.0 |
| Nuke (`nuke`) | `nuke` | 17.0, 16.0, 15-0, 14-0, 13-2 |
| Nuke Assist (`nukeassist`) | `nuke` | 15-0, 14-0, 13-2 (argument `--nukeassist`) |
| Nuke X (`nukex`) | `nuke` | 15-0, 14-0, 13-2 (argument `--nukex`) |
| Nuke Studio (`nukestudio`) | `hiero` | 15-0, 14-0, 13-2 (argument `--studio`) |
| Hiero (`hiero`) | `hiero` | 15-0, 14-0, 13-2 (argument `--hiero`) |
| Fusion (`fusion`) | `fusion` | 20, 19, 18, 17 |
| Resolve (`resolve`) | `resolve` | stable |
| Houdini (`houdini`) | `houdini` | 19-5, 19-0, 18-5, 20-5 |
| Blender (`blender`) | `blender` | 3-6-5, 4-2, 4-4, 5-0 |
| Harmony (`harmony`) | `harmony` | 22, 21 |
| TVPaint (`tvpaint`) | `tvpaint` | animation_11-64bits, animation_11-32bits |
| Photoshop (`photoshop`) | `photoshop` | 2023, 2024, 2025 |
| After Effects (`aftereffects`) | `aftereffects` | 2023, 2024, 2025, 2026 |
| Premiere (`premiere`) | `premiere` | 2023, 2024, 2025 |
| Celaction 2D (`celaction`) | `celaction` | local |
| Substance Painter (`substancepainter`) | `substancepainter` | stable |
| Substance Designer (`substancedesigner`) | `substancedesigner` | 2025 |
| Speedtree (`speedtree`) | `speedtree` | 10-0 |
| Unreal Editor (`unreal`) | `unreal` | 5-2, 5-3, 5-4 |
| Wrap (`wrap`) | `wrap` | 2023 |
| OpenRV (`openrv`) | `openrv` | 1.0.0 |
| Marvelous Designer (`marvelousdesigner`) | `marvelousdesigner` | 2025.2 |
| CLO (`clo`) | `marvelousdesigner` | 2025.2 |
| Zbrush (`zbrush`) | `zbrush` | 2024 |
| 3DEqualizer (`equalizer`) | `equalizer` | 7-1v2 |
| Motion Builder (`motionbuilder`) | `motionbuilder` | 2025, 2024 |
| Cinema4D (`cinema4d`) | `cinema4d` | 2025, 2024, 2023 |
| Mocha Pro (`mochapro`) | `mochapro` | 12-0-0, 11-5-0, 8-0-0 |
| BorisFX Silhouette (`silhouette`) | `silhouette` | 2024-5 |
| PureRef (`pureref`) | `pureref` | 2.1.3 |
| Marmoset Toolbag (`marmoset`) | `marmoset` | 5 |
| ShapeFX Loki (`loki`) | `loki` | 1-0-0 |
| Terminal (`terminal`) | Empty | main (label Main; executables `cmd.exe`, a list of Linux terminal emulators and `Terminal.app`; output is not redirected to the Process Monitor) |

Default executable paths are typical installation folders per platform, for example `C:\Program Files\Autodesk\Maya2026\bin\maya.exe` for Maya 2026 on Windows. Some variants have a path for only some platforms. The paths need to be checked against the installations of the studio.

### Additional Applications

A list of application groups for software without an AYON integration. The list is empty by default. These applications are launched but get no AYON integration.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Whether the group is available. |
| Name | Empty | Name of the group. It must not equal the name of a built-in application group. |
| Label | Empty | Label of the group. |
| Host name | Empty | Host name of the group. |
| Icon | Empty | Icon of the group, chosen from the built-in icons and the uploaded custom icons. |
| Environment | `{}` | Environment variables applied to every variant. |
| Variants | Empty | The versions of the application. Each variant has the fields of a [variant](#variant). |

## Tools Definitions

A list of tool groups. The environments of the selected tools are added to the environment of the launched application.

| Setting | Default | Description |
|---|---|---|
| Name | Per group | Name of the tool group. |
| Label | Per group | Label of the tool group. |
| Environments | Per group | Environment variables applied to all variants of the tool. |
| Variants | Per group | The versions of the tool. |

Each tool variant has these fields.

| Setting | Default | Description |
|---|---|---|
| Name | Per variant | Name of the variant. |
| Label | Empty | Label of the variant. |
| Hosts | Per variant | Host names the variant applies to. |
| Applications | Empty | Application variants the tool applies to. |
| Environments | Per variant | Environment variables of this variant, usually the version variable. |

The default tool groups are examples that need the paths of the studio: `htoa` (Arnold for Houdini), `mtoa`, `redshiftMaya`, `redshift3dsmax`, `rendermanMaya`, `mGear`, `yetiMaya`, `vrayMaya` and `vraynuke`. The `htoa` group has one example variant, `5-4-2-7`, limited to the host `houdini`.

## Applications Filters

Using these filters replaces the `applications` project attribute, which is to be deprecated.

| Setting | Default | Description |
|---|---|---|
| Profiles | One profile | Profiles that select the applications available for a context. |

A profile has these fields.

| Field | Default | Description |
|---|---|---|
| Task Types | Empty | Task types the profile applies to. Empty applies to all. |
| Allow | `All applications` | `All applications` or `Selected`. |
| Applications | Empty | The allowed applications when **Allow** is `Selected`. |

The default profile has no task types and allows all applications.

## Tool Filters

Using these filters replaces the `tools` attribute of folders and tasks, which is to be deprecated.

| Setting | Default | Description |
|---|---|---|
| Profiles | Empty | Profiles that select the tools used for a context. |

A profile has these fields.

| Field | Default | Description |
|---|---|---|
| Folder paths | Empty | Folder paths the profile applies to. Regular expressions are supported. |
| Task Types | Empty | Task types the profile applies to. |
| Task Names | Empty | Task names the profile applies to. |
| Tools | Empty | Tools used in the matching context. |

Tool environments are resolved when the application starts, so switching task inside an open application does not change the loaded tools.
