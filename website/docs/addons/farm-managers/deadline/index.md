---
title: Deadline addon
sidebar_label: Overview
description: "The AYON integration for the Deadline render farm manager: the job and publish plugins it adds to each application, the Deadline repository plugins, authentication, validators and its requirements."
addon: deadline
addon_repo: ayon-deadline
addon_version: 0.7.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-deadline/tree/0.7.5
  - https://github.com/ynput/ayon-deadline/releases
  - https://help.ayon.app/en/articles/5372986-configure-deadline-addon
  - https://help.ayon.app/en/articles/8138091-working-with-deadline-in-ayon
---

# Deadline addon

<AddonInfo />

The Deadline addon connects AYON to the AWS Thinkbox Deadline render farm manager. When an artist publishes an instance that is set to render on the farm, the addon submits a render job and a dependent AYON publish job to Deadline through the Deadline web service. It also ships the Deadline repository overlay that lets Deadline Workers start AYON and run the jobs. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | Newer than 1.6.4 (custom frame ranges are handled by core 1.10.0 or newer) |
| Applications addon | 1.0.0 or newer |
| Deadline | A running Deadline web service reachable from the artist machines, and a repository that contains the addon's overlay |
| AYON launcher | Installed on every Deadline Worker, with its executable set in the Deadline `AYON` plug-in |

The addon has no AYON services. If no Deadline server is configured in its settings, the addon disables itself.

## What it connects

| Part | Role |
|---|---|
| Deadline web service | The addon submits jobs and reads pools, groups, limit groups, Workers and job information through it. Several servers can be defined by name, and each project selects one. |
| Deadline repository overlay | The folder `client/ayon_deadline/repository` of the addon, copied into the Deadline repository. It holds the custom plug-ins and the `GlobalJobPreLoad.py` script. |
| AYON server | Workers authenticate against it with an API key set in the Deadline `AYON` plug-in. Additional servers can be listed there as `{server url}@{token}`. |

## What it submits

A farm publish produces a render job and a publish job. The publish job depends on the render job and starts after it finishes.

| Job | Created by | Content |
|---|---|---|
| Render job | The host-specific submit plugin (see below) | Renders the scene. |
| Publish job | `ProcessSubmittedJobOnFarm` ("Submit Image Publishing job to Deadline") | Runs AYON on a Worker to publish the rendered files, using a JSON metadata file that lists the expected files. |
| Houdini export job | `HoudiniSubmitDeadline` | Exports an intermediate render scene before the render job, when the Houdini export-and-render target is used. The job order is export, render, publish. |
| Houdini cache publish job | `ProcessSubmittedCacheJobOnFarm` ("Submit cache jobs to Deadline") | Publishes caches that were exported on the farm. |
| Tile jobs | `MayaSubmitDeadline` | Tile rendering from Maya, assembled by the configured tile assembler plugin. |

Jobs of different instances do not depend on each other when published from AYON. Dependencies between, for example, a Houdini cache and a render job have to be set in Deadline.

## Submit plugins per application

The addon provides the submit plugins of the supported applications. They live in the Deadline addon, not in the application addons.

| Application | Plugin label | Instance families |
|---|---|---|
| After Effects | Submit AE to Deadline | `render.farm` |
| Blender | Submit Render to Deadline | `render` |
| CelAction | Submit CelAction to Deadline | `render.farm` |
| Cinema 4D | Submit Render to Deadline | `render` |
| Fusion | Submit Fusion to Deadline | `render`, `image` |
| Harmony | Submit to Deadline | `render.farm` |
| Houdini | Submit Render to Deadline | `redshift_rop`, `arnold_rop`, `mantra_rop`, `karma_rop`, `vray_rop` |
| Houdini | Submit Render to Deadline (USD) | `usdrender` |
| Houdini | Submit Scene to Deadline | `publish.hou` (publishes the scene on the farm) |
| 3ds Max | Submit Render to Deadline | `maxrender` |
| Maya | Submit Render to Deadline | `renderlayer` |
| Maya | Submit Scene to Deadline (Maya) | `remote_publish_on_farm` (publishes the scene on the farm) |
| Nuke | Submit Nuke to Deadline | `render`, `prerender` |
| Unreal | Submit Unreal to Deadline | `render.farm` |

## Collectors and other publish plugins

These plugins run for every host.

| Plugin | What it does |
|---|---|
| Default Deadline Webservice | Collects the web service URL of the server selected in the project settings. |
| Deadline Webservice from the Instance | Takes the URL from the instance when a host sets one there. |
| Collect Deadline User Credentials | Collects the user name and password when the server requires authentication. Site settings override the studio default. |
| Collect Deadline JobInfo | Builds the Deadline job info from the matching profile and the values the artist set in the Publisher. Adds the `deadline` family and, for most instances, the family that triggers the publish job. |
| Deadline Farm Environment Variables | Passes `AYON_APP_NAME`, the tracker credential variables of the Ftrack, Kitsu and ShotGrid addons, and `PYBLISHPLUGINPATH` to the job. |
| Add AYON Server URL to farm job | Passes `AYON_SERVER_URL` to the job. Off by default. |
| Collect Environment File | Marks the environment file that was extracted for the job to be deleted. |
| Collect Scene Render Clean Up | Collects temporary render files and folders (files whose name ends in `_tmp`, Blender `tmp` folders) for cleanup. |
| Copy Last Version Files | Copies frames of the previous version to fill gaps when the artist chose to reuse the last version. |

## Job parameters in the Publisher

The profiles in **Render Job Settings** supply the default job parameters. The **Exposed Overrides** list of the matching profile decides which of them the artist can change in the Publisher.

| Override | Notes |
|---|---|
| Department, Priority, Frames per Task, Group, Limit groups, Primary pool, Secondary pool, Machine List, Machine List is a Deny, Number of Concurrent Tasks, Publish Job State | Group, pool, limit group and machine choices are read from the Deadline web service. |
| Delay job | Format `dd:hh:mm:ss`. |

From core addon 1.10.0 on, the core addon collects custom frame ranges. The Deadline addon uses them as the frame list of the job and can reuse frames of the last published version. The **Validate Deadline JobInfo** validator rejects custom frames outside the frame range of the instance.

## Validators

| Validator | What it checks |
|---|---|
| Validate Deadline Web Service | The web service answers, and credentials are set and accepted when authentication is required. |
| Validate Deadline Pools | The primary and secondary pools exist on the Deadline server. |
| Validate Deadline JobInfo | The priority is between 0 and 100, and custom frames lie inside the instance frame range. |
| Validate rendered files from Deadline | All expected files exist after the render job. When the user changed the frame range in Deadline, the frame list of the finished job is used. Runs for `render` instances when the `deadline` target is active, which is the case in the publish job. |
| Validate Frame Token (USD Render) | Houdini only. For `usdrender` instances with custom frames, the output path needs a frame token such as `$F4`. A repair action adds `$F4` to the `lopoutput` parameter. |

## Deadline repository plug-ins

| Item | Purpose |
|---|---|
| `GlobalJobPreLoad.py` | Runs for every job on the Worker. It reads the AYON executable from the `AYON` plug-in settings, asks it for the environment of the job's context and injects that environment into the render process. |
| `Ayon` plug-in | Runs AYON on a Worker, used by the publish jobs. Its settings hold the AYON executable locations (one per operating system), the AYON server URL and the API key. |
| `CelAction` plug-in | Required for CelAction submissions. |
| `HarmonyAYON` plug-in | Required for Harmony submissions. |
| `UnrealEngine5` plug-in | A copy of Deadline's Unreal Engine 5 plug-in extended with pre-load scripts that sync a Perforce project to the changelist of the submission. |

Houdini `usdrender` submissions also need the Husk Standalone Deadline plug-in. It is a separate project and is not part of this addon.

## Settings areas

| Area | What it covers |
|---|---|
| System Deadline Webservice Info | Named Deadline servers with URL, authentication and SSL options. |
| Selected Deadline server name | The server a project uses. |
| Render Job Settings | Profiles with default job parameters per host, task and product base type. |
| Publish Job Settings | Parameters of the publish job and the review filters of the published AOVs. |
| Host-specific groups | Fusion, Houdini export and cache, Maya and Nuke submission options. |
| Validators and collectors | Enable, optional and active switches. |
| Site settings | Per-user credentials for Deadline servers. |

## Related

- [Deadline addon settings](settings.md)
- The applications that submit through this addon have their own pages, for example the [Blender addon](../../3d-applications/blender/index.md).
