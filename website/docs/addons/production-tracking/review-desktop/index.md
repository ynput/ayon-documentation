---
title: Review Desktop addon
sidebar_label: Overview
description: "The AYON Review Desktop addon: opens version lists and review sessions in OpenRV with an AYON activity panel for viewing feedback and submitting comments and annotations, with its requirements, actions and behavior."
addon: review_desktop
addon_repo: ayon-review-desktop
addon_version: 0.0.5
addon_scope: pipeline
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/8506818-ayon-desktop-review-addon
---

# Review Desktop addon

<AddonInfo />

The Review Desktop addon connects AYON's review tools to a desktop video player. A version list on the AYON server can be opened as a session in [OpenRV](https://github.com/AcademySoftwareFoundation/OpenRV), which plays the media at full quality with the player's own color tools. Inside the player an AYON activity panel shows the version's feedback and lets the reviewer comment, draw annotations and change the version status. The addon is a beta release (flags `licensed` and `beta`). Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.9.0 or newer |
| AYON launcher | 1.4.0 or newer |
| Required addons | `applications` 1.0.2 or newer, `review` newer than 0.0.4 (the [Review addon](../review/index.md)), `core` 1.9.8 or newer |
| Compatible addons | `openrv` 1.1.1 or newer |
| Software | OpenRV on the user's machine. The executable comes from the application variants defined in the Applications addon settings. |

The addon uses `ayon_core.ui` and does not depend on the UI Qt addon (release 0.0.4 replaced that dependency).

The addon has no services.

## What it adds

| Part | Where | What it does |
|---|---|---|
| **Open session on desktop app** action | AYON web app, actions of a list (category **Review**) | Available on lists of versions of the types `version:review-session` and `version:generic`, for one list at a time. Starts the flow described below. |
| Pre-launch hook `PreReviewToolOpenRV` | AYON launcher, application group `openrv` | Installs the addon's `review_tools` package into OpenRV with `rvpkg` (a copy is cached in the system temp folder, keyed by a hash of the package) and adds it to `RV_SUPPORT_PATH`. |
| `review_tools` package for OpenRV | Inside OpenRV | Detects new sources and metadata changes of the loaded clips. It reads the OCIO configuration from the `OCIO` environment variable. |
| Command `show-review-session-on-desktop` | AYON launcher (`addon review_desktop ...`), options `--project` and `--event` | Launches the player for a session described by a server event. The action starts it; it is not meant for direct use. |

## Opening a list as a session

The action collects its choices in the web app in three steps, then hands over to the launcher.

| Step | What is chosen |
|---|---|
| Representations | One representation per version in the list. The preselected one is the first representation (in the order the server returns them) whose name matches any pattern of **Default Representation** (see [settings](settings.md)). Versions without representations are left out. |
| Desktop app variant | A variant of the application in the Applications addon, listed as `<app>/<variant>`. Variants are filtered by **App Variant Regex**; if none match, all variants are shown. The preselected variant is the one with the highest version number found in its name. If no variant exists, the action reports that variants must be configured in the Applications addon. |
| Launch | The server records an event with the selection (topic `review_desktop.run_desktop_app_review_session`) and returns a launcher action. The launcher builds an OpenTimelineIO (`.otio`) file of the list in list order with the chosen representations, and starts the application with it. |

When the representations carry a color configuration, its OCIO config path is passed to the player as `OCIO`. The player is started with `AYON_REVIEWER_MODE=1` and the project name in `AYON_PROJECT_NAME`.

## Activity panel in the player

The panel follows the clip that is loaded in the player and mirrors the details panel of the AYON web app.

| Area | What it shows or does |
|---|---|
| Header | Thumbnail, entity path, product and version, with controls for the version **status**, the assignee, tags and the version's web actions. The status list is filtered by entity type. |
| Activity stream | Switchable between all activity, comments, published versions, checklists and **Details** (the version's attributes). Comment images load when they scroll into view, and user avatars are shown. |
| Comment editor | Writes a comment with a comment category and mentions of project users. Comments can be edited and deleted from the stream. |
| Annotations | Annotations drawn in the player are detected per frame (one per frame), exported without the view transform and submitted with the comment. A frame offset keeps frame numbers consistent with the version's start frame. |
| Live updates | The panel listens to AYON server events for the current version and refreshes the stream when something relevant changes. |
| Non-AYON sources | When the loaded media does not come from AYON, the panel shows a notice and commenting is disabled. |

## Player support

The adaptor layer has implementations for OpenRV and for xSTUDIO (the latter imports the `ayon_xstudio` module). The launch hook and the list action only handle the `openrv` application group, so OpenRV is the player that sessions are opened in.

## Related

- [Settings](settings.md)
- [Review addon](../review/index.md): the review sessions that the action can open.
