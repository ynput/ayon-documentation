---
title: Applications addon
sidebar_label: Overview
description: "The AYON Applications addon: how applications and tools are defined, filtered per task and launched from the AYON web UI, the launcher and the command line."
addon: applications
addon_repo: ayon-applications
addon_version: 1.4.7
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-applications/tree/1.4.7
  - https://help.ayon.app/en/help/articles/3945756-applications-and-tools
---

# Applications addon

<AddonInfo />

The Applications addon defines the software that AYON can launch and the tools that are added to the environment of that software. An application is a program such as a DCC; a tool is anything that is configured through environment variables, most often a renderer or plugin. The addon stores the executables, launch arguments and environment variables per application version and platform, decides which applications and tools are available for a task, and starts the application with the AYON context (project, folder, task and workfile). It has no application integration of its own: pipeline integration inside an application comes from that application's own addon. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.3.0 or newer |
| AYON Launcher | 1.1.0 or newer |
| Core addon | 1.4.0 or newer (required) |

## Concepts

| Term | Meaning |
|---|---|
| Application group | One application, for example Maya. It has a host name (the name of the pipeline integration), an enabled switch and an environment that applies to every version. |
| Application variant | One version of an application, for example Maya 2026. It has its own executables per platform, arguments and environment. The full name of a variant is `<group>/<variant>`, for example `maya/2026`. |
| Additional application | An application without an AYON integration. It can be launched but gets no AYON menu, creators or publish plugins. |
| Tool group and tool variant | A tool and its versions. A variant can be restricted to host names and application variants. Its environment is merged into the application environment at launch. |
| Filter profile | A rule in the project settings that selects the applications of a task type, or the tools of a folder, task type or task name. |

Environments are written as a JSON object. Values can be lists, can be split per platform (`windows`, `linux`, `darwin`) and can refer to other variables in curly braces.

## What the addon provides

| Area | What it does |
|---|---|
| Application launching | Starts an application for a task or for an existing workfile, with environment from the core addon, the application group, the variant and the selected tools. |
| AYON web UI actions | Adds an **Applications** category of actions for tasks, one per allowed application variant, with a **Skip last workfile** option. Applications are grouped by group label unless a variant opts out. A **Terminal** action opens a terminal with the task environment. For a selected workfile it offers actions to launch the application that created it. |
| Launcher integration | The AYON Launcher runs the actions through the `addon applications` command group (see below). |
| Application and tool lists | Server endpoints return the application and tool items, optionally filtered for a project or a task. |
| Custom icons | Icons for application groups can be uploaded to the server and chosen in the settings of an additional application. |
| Process Monitor | Launched applications can send their output to the AYON Process Monitor (per variant switch). |
| Publish plugins | Record which application a publish came from (see below). |
| Loader action | **Open Source Workfile** opens the workfile a published version came from in its application. |

## Command line

The addon adds the command group `addon applications` to the AYON launcher.

| Command | Purpose |
|---|---|
| `extractenvironments` | Writes the environment variables of a context to a JSON file. Options select project, folder, task, application and an environment group such as `farm`. |
| `launch` | Launches an application by project, folder path and task name. |
| `launch-by-id` | Launches an application for a task id. |
| `launch-by-workfile-id` | Launches an application for a workfile id. |
| `launch-debug-terminal` | Opens a terminal with the environment of a task. |

## Publish plugins

| Plugin | What it does |
|---|---|
| Collect App Name | Adds the host name of the running application to the publish context. |
| Collect Applications farm environment variables | Adds `AYON_APP_NAME` to the environment of farm jobs. |
| Add app name to version data | Stores the application name in the data of the published version. |

## Launch hook

On Windows a pre-launch hook sets process creation flags so that the **Terminal** application opens in a new console window.

## Project attributes

The older `applications` project attribute and `tools` attributes of folders and tasks are replaced by the filter profiles in the settings. The addon still provides these attributes for backward compatibility; attribute-based selection is to be deprecated.

## Related

- [Applications addon settings](settings.md)
