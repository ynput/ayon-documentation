---
title: Version Control addon
sidebar_label: Overview
sidebar_class_name: addon-archived
description: "The AYON Version Control addon: Perforce support for publishing products to a Perforce server, the Unreal Engine changelist sync dialog and changelist metadata product, and the Perforce trigger endpoint."
addon: version_control
addon_repo: ayon-version-control
addon_version: 0.1.1
addon_scope: pipeline
addon_flags: []
addon_archived: true
addon_last_push: 2026-02-17
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-version-control/tree/0.1.1
  - https://help.ayon.app/en/articles/1233046-about-perforce-and-ayon
  - https://help.ayon.app/en/articles/4584821-working-with-perforce-in-ayon
  - https://help.ayon.app/en/articles/7771120-perforce-addon-settings
---

# Version Control

<AddonInfo />

The Version Control addon connects AYON to an external version control system. The only backend is Perforce (Helix Core). The addon adds two things: committing published files to a Perforce server in addition to the normal AYON publish, and, for Unreal Engine projects, marking a Perforce changelist as "published" so that a later job (for example a render on a farm) can sync to the same state. It does not replace AYON versioning: a published product still gets a new AYON version, and the Perforce commit is a second copy. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.4.0 or newer (required) |
| Compatible addons | None |
| Services | None |
| Perforce client tools (for example P4V) | Not provided by the addon. The studio installs them. |

Perforce workspaces must exist on the artist machines. The addon does not create them.

## How it talks to Perforce

The Perforce Python library is binary-dependent on the Python version of each application. To avoid shipping it into every application, the addon runs a small web server inside the AYON tray (it starts when the addon is enabled, on `localhost` port 64111). The publish plugins and the launch hook call this server through a REST client that only needs the `requests` library. The settings **Host name** and **Port** describe the Perforce server, not this local server.

## What the addon adds

| Part | Where it appears | What it does |
|---|---|---|
| Creator **Publish Changelist Metadata** | Unreal Publisher (auto creator, product type `changelist_metadata`) | Creates one `changelist_metadata` instance per scene so the latest changelist can be stored on publish. |
| Launch hook `SyncUnrealProject` (order -5) | Before Unreal launches locally | Opens a changelist viewer dialog so the artist can sync the workspace to a chosen changelist before Unreal starts. |
| Publish plugins | Publisher | Collect login and commit information, store changelist metadata and commit published files. See below. |
| Server endpoint `change_submit` | AYON server, `/api/addons/version_control/<version>/change_submit` | Accepts a Perforce submit (user, changelist, client, stream) and dispatches a `perforce.change_submit` event on the AYON server. |
| Perforce trigger script | `client/version_control/perforce_triggers/change_submit_trigger.py` in the addon | A script to register as a `change-submit` trigger on the Perforce server so that submits are reported to the endpoint above. It needs Python 3 on the Perforce server machine. |
| Tray service | AYON tray | Runs the local web server, shown in the tray as **Version Control: Perforce**. |

## Publishing

All plugins run only for local publishing (target `local`).

| Plugin | Applies to | What it does |
|---|---|---|
| Collect Version Control Connection Info | Context | When the addon is enabled for the project, reads host, port, user name, password and workspace name from the settings, logs in through the local web server and stores the Perforce stream and the workspace directory. Missing credentials only log a warning. |
| Collect Latest Changelist | `changelist_metadata` | Reads the most recent changelist (number, user, description, time) from Perforce. |
| Collect Version Control Submission Info | Every instance | Matches the **Collect Version Control** profiles against host, product type and task. When a matching profile has **Add Version Control to representations** on, adds the `version_control` family and the connection data to the instance. |
| Extract Change List Info | `changelist_metadata` | Writes the changelist information to `<changelist number>.json` and adds it as a representation named `changelist_metadata`. |
| Validate P4 Stream | `changelist_metadata` | Fails when the workspace is not connected to a Perforce stream. The Deadline integration needs depots of type stream. |
| Validate P4 workspace dir | `version_control` | Fails when the local workspace directory is empty or does not exist. |
| Integrate Perforce items | `version_control` | For each representation, builds the target path from the Anatomy template named in the profile, copies the published file into the workspace, checks it out if it is already on the server (an error if someone else has it checked out) or adds it if it is new, and submits a changelist. |

The **Template name** setting is either a template area (the `default` template of that area is used) or `<area>_<name>`. The path inside Perforce does not contain a version, so the template should follow the hero template approach.

## Related

- [Version Control addon settings](settings.md)
