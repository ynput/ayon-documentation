---
title: Perforce addon
sidebar_label: Overview
description: "The AYON Perforce addon: Perforce workspace creation and changelist sync for Unreal Engine projects, a changelist viewer, and publish plugins that record the Perforce state for farm renders. The addon has not been released yet."
addon: perforce
addon_repo: ayon-perforce
addon_version: 0.0.1+dev.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-perforce
---

# Perforce addon

<AddonInfo />

The Perforce addon connects AYON to a Perforce (Helix Core) server. In its current state it targets Unreal Engine projects that live in a Perforce stream: it creates or switches the Perforce workspace of an artist when Unreal is launched, lets the artist sync the workspace to a chosen changelist before Unreal starts, and passes the Perforce stream and changelist of a publish to a Deadline render job so that the render machine syncs to the same state. Its settings are described on the [settings page](settings.md).

:::note Unreleased
The addon has not been released yet and is not in the AYON Market. This page describes the state of the default branch (`develop`), version `0.0.1+dev.1`. The code is work in progress and parts of it are not finished, see [Current limitations](#current-limitations).
:::

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.4.0 or newer (required) |
| Applications addon | Provides the launch hook base classes the addon imports |
| Compatible addons | None declared |
| Services | None |
| Perforce command line client (`p4`) | Not provided by the addon. Called by the launch hooks, so it must be installed and on the path. |
| Deadline integration | Needed to use the changelist on a render farm (the extractor writes into a Deadline job). |

The addon has a server package, so it has settings. The addon is disabled by default.

## Relation to the Version Control addon

The older [Version Control addon](../version-control/index.md) (`version_control`, repository `ayon-version-control`, archived) also integrates Perforce. The two are separate addons: the Perforce addon has its own name (`perforce`), its own settings and its own code, and nothing in its code imports or refers to the Version Control addon. Both address the same two use cases (committing published files to Perforce, and syncing Unreal projects to a changelist for farm renders), and the Perforce addon follows the same overall approach: a local web server started by the AYON tray runs the Perforce commands, and the application side talks to it through a REST client. Their feature sets differ as far as the code shows:

| Feature | Version Control addon | Perforce addon |
|---|---|---|
| Local web server in the tray that runs Perforce commands | Yes, on a fixed port | Yes, on a free port; the URL is stored in the `PERFORCE_WEBSERVER_URL` environment variable |
| Creator for a `changelist_metadata` product | Yes | No creator in the code |
| Extractor for the changelist | Writes `<changelist number>.json` as a `changelist_metadata` representation | Writes the stream and changelist into the Deadline job environment |
| Integrator that commits published files | Yes | No integrator in the code, see [Current limitations](#current-limitations) |
| Unreal changelist sync dialog before launch | Yes | Yes, **Changes Viewer** |
| Workspace creation and stream switching at launch | No | Yes |
| Perforce change-submit trigger and server endpoint | Yes | No |
| Perforce user name and password | Site settings of the addon | Entered per machine in the tray and kept in the local secure registry |
| Publish plugins limited to | Not limited to a host | Unreal |

Settings of the same purpose exist in both (host name, port, the **Collect** profiles with a template name), but the two addons do not share settings or read each other's.

## Tray menu

When the addon is enabled the AYON tray gets a **Perforce** submenu. It shows the Perforce server (`<host>:<port>`) and an entry that opens the **AYON - Perforce Login** dialog, where the artist enters a Perforce user name and password. The values are saved in the local secure registry of that machine and the `P4USER` environment variable is set. Clearing both fields removes the saved login.

On tray start the addon also starts a local web server on a free port (`localhost`). The publish plugins, the changes viewer and the hooks reach Perforce through this server, so that application Python versions do not need the binary Perforce Python library.

## Launch hooks

All hooks apply to Unreal Engine launches.

| Hook | Runs for | What it does |
|---|---|---|
| `PerforceWorkspaceCreationHook` (order -5.2) | Local launches and farm publish launches, unless the publish job number (`AYON_PUBLISH_JOB`) is above 0 | Builds the workspace name, workspace root, depot name and stream name from the settings and the launch context, then creates or updates the Perforce workspace spec and makes it the current one. Fails when no **Stream Profiles** entry lists the task type of the context. Refuses to switch streams while the workspace has opened files, unless the launch is not local (then opened files are reverted and the sync is forced). Syncs the workspace to the latest changelist. |
| `SyncUnrealProject` (order -5) | Local launches, only when Perforce is enabled for the project | Finds the single `.uproject` file in the workspace folder, sets it as the workfile and opens the **Changes Viewer** dialog before Unreal starts. Fails when the workspace folder does not exist or does not contain exactly one `.uproject`. |
| `PerforcePreLaunchFarmHook` | Farm publish launches (not for publish job number above 0) | Reads `AYON_P4_WORKSPACE`, `AYON_P4_STREAM` and `AYON_P4_CHANGELIST` from the environment, sets the Perforce workspace named by the **Workspace Name Template**, requires that its stream equals the stream of the job (switching streams is not supported), reverts all changes and syncs to the changelist. |

The workspace name, depot name, stream name and workspace root are templates filled with the project, folder, task and workstation data (for example `{project[code]}` and `{workstation[hostname]}`). The workspace root is the `work` directory template of Anatomy for Unreal, extended with the project file name.

## Changes Viewer

A dialog titled **Changes Viewer** that lists Perforce changelists with the columns **Change**, **Description**, **Author** and **Date submitted**. Selecting a change and pressing **Sync to** syncs the workspace folder of the launch context to that changelist. The dialog is modal: Unreal starts after it is closed.

## Publishing

The publish plugins are limited to Unreal and to local publishing, except where noted. The code gives a known issue with a Windows library on other hosts as the reason.

| Plugin | Applies to | What it does |
|---|---|---|
| Collect Perforce Connection Info | Context | Runs when Perforce is enabled for the project. Reads host, port, the saved user name and password and the workspace name, logs in through the local web server and stores the stream and the folder of the workspace. Missing credentials or missing host and port only log a warning. |
| Collect Perforce Submission Info | Every instance | Matches the **Collect Perforce Control** profiles against host name, product base type (or product type when the instance has none), task name and task type. When the matching profile has **Commit representations to Perforce** on, adds the `perforce` family, the connection data and the **Template name** to the instance. |
| Validate P4 workspace | Context | Fails when there is no Perforce connection info, when the workspace folder is missing, when the workspace has no stream, or when the workspace has pending files. The repair action **Repair** opens a dialog (**Pending Files in Changelist**) where the artist reverts selected files or submits the default changelist with a message prefixed `[PRE PUBLISH]`. |
| Extract P4 Changelist info | Instances of family `render.farm` | Reads the last submitted changelist and adds the stream, the changelist number, the web server URL and the Unreal version to the environment of the Deadline job, where the farm hook reads them. Fails when the local web server is not running. |

## Current limitations

These follow from the code of the default branch.

- The `perforce` family that **Collect Perforce Submission Info** adds is not consumed by any plugin of the addon, so **Commit representations to Perforce** and **Template name** have no effect on their own.
- The addon registers a create plugin folder for Unreal (`plugins/create/unreal`) that does not exist in the repository. There is no `changelist_metadata` creator.
- The **Stream Settings** group has an **Enabled** toggle (described in the settings as work in progress) that no code reads. The workspace creation hook uses the stream profiles regardless.
- The error text of the workspace validator refers to a local setting, `workspace_dir`, that the addon does not define.
- The repository README and the changes viewer README still describe a generic version control API with a `changelist_metadata` product, which the code does not implement.

## Related

- [Perforce addon settings](settings.md)
- [Version Control addon](../version-control/index.md) (archived)
