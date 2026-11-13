---
title: SyncSketch addon
sidebar_label: Overview
description: "The AYON integration for SyncSketch: pushing version lists to SyncSketch review sessions, pulling comments and drawings back as activities, the processor service and the requirements."
addon: syncsketch
addon_repo: ayon-syncsketch
addon_version: 0.4.1
addon_scope: server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-syncsketch/tree/0.4.1
  - https://github.com/ynput/ayon-syncsketch/releases
  - https://help.ayon.app/en/help/articles/0905719-syncsketch
---

# SyncSketch addon

<AddonInfo />

The SyncSketch addon connects AYON to [SyncSketch](https://www.syncsketch.com), a web-based review tool. It adds two actions for AYON version lists: one pushes the reviewables of the versions in a list to a SyncSketch review session, the other pulls the comments and drawings made there back into AYON as comments on the versions. The work is done by a processor service. The settings are described on the [settings page](settings.md).

:::note Earlier design
Release 0.4.0 replaced the earlier design of the addon (an ftrack synchronization, a status mapping, reviewable presets and the `syncsketchreview` tag) with the push and pull actions described here.
:::

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.15.9 or newer |
| AYON core addon | 0.4.0 or newer |
| Review addon | 0.6.0 or newer, when used in the same bundle (compatible addon) |
| Service | `processor`, image `ynput/ayon-syncsketch-processor:1.0.0` |
| SyncSketch account | A user with an API key, stored in the AYON secrets |

## What it connects

| AYON | SyncSketch |
|---|---|
| Project | Project. By default the one with the same name, compared without regard to case; see the [project mapping](settings.md#sync-options). |
| Version list | Review session, with the label of the list as its name |
| Version in a list | Review item, made from a reviewable of the version |
| Comments on a version | Comments of a review item |
| Drawings (sketches) | Images attached to a comment |

The addon does not create SyncSketch projects: the project must exist, otherwise the action fails.

## Actions

Both actions are in the category **SyncSketch**, are available inside a project and work on selected version lists.

| Action | What it does |
|---|---|
| **Push to SyncSketch** | Sends the versions of the list to a SyncSketch review session. |
| **Pull from SyncSketch** | Brings the comments and drawings of that review session back to the versions. |

Each action creates a job that the processor service runs. The job appears as an event with its status (pending, in progress, finished or failed) and a description of the result or the error.

### Push

1. The SyncSketch project is the one stored on the list from an earlier push. Otherwise it follows the **Project Mapping** setting: the AYON project name, or a choice in a form, which can also offer a custom name.
2. The review session is found by the id stored on the list, or by the label of the list. When it does not exist it is created in the SyncSketch project.
3. For each version of the list that is not in the session yet, the reviewable stored on the list item, or else the first reviewable of the version, is added to the session as a review item. A version without a reviewable is skipped. Reviewables are uploaded from AYON, or linked by URL when the server stores them elsewhere.
4. The SyncSketch project, the review id and the id of each review item are stored on the list and its items.

Items that were already pushed are not sent again. Pushing fails when the list is empty or is not a version list.

### Pull

The pull works on lists that were pushed before. For each review item that belongs to the list:

- Comments become comments on the AYON version. A comment on a frame starts with the frame number, for example `Frame 0012`. A comment that was already pulled is updated when its text changed.
- Mentions of SyncSketch users are replaced with AYON mentions, and the comment is created as the AYON user whose email matches the SyncSketch author. When no user matches, the comment is created without that attribution.
- Drawings are downloaded as images named `Frame <number>.jpg` and attached to one comment. They are only pulled again when the set of drawings changed.

## Services

| Service | Image | What it does |
|---|---|---|
| `processor` | `ynput/ayon-syncsketch-processor:1.0.0` | Polls for push and pull jobs and runs them. Checks the SyncSketch credentials from the addon settings first. |

When the credentials are missing or invalid, the service marks pending jobs as failed with a message to check the addon settings. Jobs that failed for this reason are set back to pending once the credentials are valid.

## Settings areas

| Area | Contents |
|---|---|
| SyncSketch server config | API username and key (as secrets) and the SyncSketch server URL |
| Sync options | How an AYON project maps to a SyncSketch project |

## Related

- [SyncSketch settings](settings.md)
