---
title: Deadline addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Deadline addon with their default values: Deadline servers, render job profiles, publish job, host-specific submission options, validators and site settings."
addon: deadline
addon_repo: ayon-deadline
addon_version: 0.7.5
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-deadline/tree/0.7.5/server/settings
  - https://help.ayon.app/en/articles/5372986-configure-deadline-addon
---

# Deadline addon settings

<AddonInfo />

The settings of the [Deadline addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

Validators share three switches: **Enabled** (the plugin runs), **Optional** (the artist can skip it in the Publisher) and **Active** (it is selected by default in the Publisher).

## System Deadline Webservice Info

A list of named Deadline servers. The default list has one entry.

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Name used to refer to the server. |
| Url | `http://127.0.0.1:8082` | Address and port of the Deadline web service. |
| Require authentication | Off | The web service needs a user name and password. |
| Don't verify SSL | Off | Skip certificate verification, for example for self-signed certificates. |
| Default user name | Empty | Web service user name used for all artists. Needs **Require authentication**. |
| Default password | Empty | Password of the default user. Needs **Require authentication**. |

## Selected Deadline server name

| Setting | Default | Description |
|---|---|---|
| Selected Deadline server name | `default` | The server, by **Name**, that the project submits to. |

## Render Job Settings

Setting path `deadline/publish/CollectJobInfo`. A list of profiles with default Deadline job parameters. It applies to the render jobs of all hosts and does not affect the AYON publish jobs or extra jobs such as the Houdini export job. A profile is selected by **Host names**, **Task types**, **Task names** and **Product base types**; an empty filter matches everything. If no profile matches a farm instance, the publish fails and asks an administrator to fill the profiles.

A profile has these fields.

| Setting | Default | Description |
|---|---|---|
| Host names | Empty | Hosts the profile applies to. |
| Task types | Empty | Task types the profile applies to. |
| Task names | Empty | Task names the profile applies to. |
| Product base types | Empty | Product base types the profile applies to. |
| Frames per Task | 1 | Chunk size. `0` is allowed since 0.7.2 and the former limit of 999 was removed. |
| Priority | 50 | Job priority. |
| Group | Empty | Deadline group. |
| Limit Groups | Empty | Limit groups of the job. |
| Primary Pool | Empty | Pool of the job. |
| Secondary Pool | Empty | Secondary pool of the job. |
| Machine Limit | 0 | Most machines that render the job at once. 0 means unlimited. |
| Machine List | Empty | Workers that are allowed, or denied, to render. |
| Machine List is a Deny | Off | Treat **Machine List** as a deny list instead of an allow list. |
| Number of concurrent tasks | 1 | Tasks one Worker renders at the same time. |
| Department | Empty | Department shown in Deadline Monitor. |
| Delay job | Empty | Start delay in the format `dd:hh:mm:ss`. |
| Publish Job State | Active | Initial state of the publish job, `Active` or `Suspended`. Suspended lets the render be checked before publishing. |
| Use Published scene | On | Render the published workfile. |
| Use Asset dependencies | Off | Add asset dependencies to the job. |
| Workfile Dependency | On | The job waits for the workfile to exist. |
| Additional JobInfo data | Empty | JSON dictionary added to the JobInfo of the submission. |
| Additional PluginInfo data | Empty | JSON dictionary added to the PluginInfo of the submission. |
| Exposed Overrides | Department, Frames per Task, Group, Priority, Primary pool, Secondary pool, Publish Job State | Parameters the artist can change in the Publisher. The choices also include Delay job, Limit groups, Machine List, Machine List is a Deny and Number of Concurrent Tasks. |

Two default profiles exist. The first has empty filters and applies to all hosts. The second applies to `aftereffects`, `fusion` and `nuke` and sets **Frames per Task** to 10. All other values are the defaults above.

## Publish Job Settings

Setting path `deadline/publish/ProcessSubmittedJobOnFarm`. Parameters of the AYON publish job that follows the render job.

| Setting | Default | Description |
|---|---|---|
| Priority | 50 | Priority of the publish job. |
| Group | Empty | Group of the publish job. |
| Pool | Empty | Pool of the publish job. |
| Department | Empty | Department of the publish job. |
| Skip integration of representation with ext | Empty | File extensions that are not published. |
| List of family names to transfer to generated instances | `render3d`, `render2d`, `slate` | Families copied to instances generated from the render, for example one per AOV. |
| Reviewable products filter | One entry per host, see below | Which AOVs get a review. Each entry has a **Host** and a list of **AOV regex** patterns. |
| Add rendered files as Dependencies | Off | Adds all expected files as job dependencies, so the publish job starts only when all of them exist. |

Default reviewable products filter: `maya` and `blender` use `.*([Bb]eauty).*`. `aftereffects`, `celaction`, `harmony`, `max` and `fusion` use `.*`, which matches everything.

## Fusion

Setting path `deadline/publish/FusionSubmitDeadline`.

| Setting | Default | Description |
|---|---|---|
| Deadline Plugin | `Fusion` | The Deadline plugin used for Fusion jobs, `Fusion` or `FusionCmd`. |

## Houdini Export Job Settings

Setting path `deadline/publish/HoudiniSubmitDeadline`. Applies to the export job that creates an intermediate render scene such as `usd`, `ifd` or `ass`.

| Setting | Default | Description |
|---|---|---|
| Export Priority | 50 | Priority of the export job. |
| Export Frames Per Task | 10 | Chunk size of the export job. |
| Export Group | Empty | Group of the export job. |
| Export Limit Groups | Empty | Comma-separated limit groups of the export job. |
| Export Machine Limit | 0 | Most machines that run the export job at once. 0 means unlimited. |

## Houdini Cache Publish Job Settings

Setting path `deadline/publish/ProcessSubmittedCacheJobOnFarm`. Applies to the publish job of caches (for example Alembic or VDB) exported on the farm.

| Setting | Default | Description |
|---|---|---|
| Priority | 50 | Priority of the job. |
| Group | Empty | Group of the job. |
| Pool | Empty | Pool of the job. |
| Department | Empty | Department of the job. |

## Maya

Setting path `deadline/publish/MayaSubmitDeadline`. Tile jobs use the job info of the matching Maya profile, with the tile priority replacing the priority.

| Setting | Default | Description |
|---|---|---|
| Use Scene with Imported Reference | Off | Submit the scene with its references imported. |
| Tile Priority | 50 | Priority of tile jobs. |
| Tile Assembler Plugin | `DraftTileAssembler` | Deadline plugin that assembles tiles. |
| Scene patches | None | List of patches, each with **Patch name**, **Patch regex** and **Patch line**. |
| Disable Strict Error Check profiles | On | Default of the Maya strict error checking option of the job. The value is passed as `StrictErrorChecking`. |

## Nuke

Setting path `deadline/publish/NukeSubmitDeadline`.

| Setting | Default | Description |
|---|---|---|
| Use GPU | On | Default of the GPU option of the Nuke job. |
| Continue On Error | Off | Default of Deadline's continue-on-error option for Nuke jobs. |
| Node based Limit Groups | None | List of entries, each with a **Group Name** and the **Node Classes** that add that limit group when present in the scene. |

## Add AYON server to farm job

Setting path `deadline/publish/CollectAYONServerToFarmJob`. Sends the current `AYON_SERVER_URL` with the job so Workers use that server. The API key for such servers is set in the Deadline `AYON` plug-in.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Add the server URL to the job. |

## Validators

| Validator | Enabled | Optional | Active | Notes |
|---|---|---|---|---|
| Validate Deadline Connection | On | Off | On | Checks that the web service answers. |
| Validate Deadline Pools | On | On | On | Checks that the pools exist. |
| Validate Deadline Job Info | On | On | On | Checks the priority and custom frames. |
| Houdini Validate Frame Token (USD Render) | On | Off | On | Checks the frame token of USD render output. |

**Validate Expected Files** has its own settings.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | The validator runs. |
| Active | On | It is selected by default. |
| Allow user change frame range | On | Accept a frame range that the user changed in Deadline Monitor as the new expected files. |
| Trigger on families | `render` | Families the validator applies to. |
| Trigger for plugins | `deadline` | Publish targets for which the validator runs. |

## Site settings

Credentials that each artist machine can set for configured servers. They override the default user name and password of the server.

| Setting | Default | Description |
|---|---|---|
| Local setting | None | List of entries, each with **DL server name**, **Username** and **Password**. |
