---
title: Kitsu addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Kitsu addon with their default values: server and login secrets, publish plugins, user, casting and project synchronization, and the default task and status mapping."
addon: kitsu
addon_repo: ayon-kitsu
addon_version: 1.2.7
addon_scope: pipeline-server
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-kitsu/tree/1.2.7/server/settings
  - https://help.ayon.app/en/articles/3271341-kitsu-addon-settings
  - https://help.ayon.app/en/articles/8645549-configure-kitsu-addon
---

# Kitsu addon settings

<AddonInfo />

The settings of the [Kitsu addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Enables the addon. In project settings, turning it off disables the publish plugins for that project. |
| Kitsu Server | Empty | URL of the Kitsu server. The addon adds `https://` when no scheme is given and `/api` to the end. |
| Kitsu user email | `kitsu_email` | Name of the AYON secret that holds the Kitsu login email. |
| Kitsu user password | `kitsu_password` | Name of the AYON secret that holds the Kitsu password. |

The email and password settings name secrets; the server and the `processor` service read the values from the secrets. The defaults are placeholder secret names.

## Publish plugins

### Collect Kitsu family

Adds the `kitsu` family to instances so that they are published to Kitsu.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Runs the plugin. |
| Profiles | 11 profiles, see below | List of profiles. |

A profile has **Host names**, **Families** (matched against the product base type), **Task types**, **Task names**, **Add Kitsu Family** (default on) and **Advanced adding if additional families present**: items of **Additional Families** and **Add Kitsu Family** that override the decision when the instance has one of those families. An empty filter matches everything. The default profiles:

| Host names | Families | Add Kitsu Family | Advanced filtering |
|---|---|---|---|
| `traypublisher` | All | On | None |
| `traypublisher` | `matchmove`, `shot` | Off | None |
| `traypublisher` | `plate`, `review`, `audio` | Off | On for the families `clip` and `review` |
| `maya` | `model`, `setdress`, `animation`, `look`, `rig`, `camera` | On | None |
| `tvpaint` | `renderPass` | Off | None |
| `tvpaint` | All | On | None |
| `nuke` | `write`, `render`, `prerender` | Off | On for the family `review` |
| `aftereffects` | `render`, `workfile` | On | None |
| `flame` | `plate`, `take` | On | None |
| `houdini` | `usd` | On | None |
| `photoshop` | `review` | On | None |

### Integrate Kitsu note

Posts the publish comment as a note on the Kitsu task of instances that have the `review` and `kitsu` families.

| Setting | Default | Description |
|---|---|---|
| Set status on note | Off | Sets a Kitsu task status together with the note. Otherwise the note keeps the current task status. |
| Note shortname | `wfa` | Short name of the Kitsu status to set. Case sensitive. |
| Status change conditions | Empty | Conditions that must hold for the status to change; see below. |
| Custom Comment Template | Off | Use a template for the note text. |

**Status change conditions** has two lists.

| List | Fields | Description |
|---|---|---|
| Status conditions | **Condition** (`equal` or `not equal`), **Short name** | The short name of the current Kitsu task status must be equal, or not equal, to the given one, compared without regard to case. |
| Family requirements | **Condition** (`equal` or `not equal`), **Family** | The product types of the published instances must be equal, or not equal, to the given family. |

**Custom Comment Template** has these settings. Kitsu supports Markdown in notes. The placeholders are keys of the instance data; a missing key is replaced with an empty string and a warning is logged.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Use the template instead of the plain publish comment. |
| Custom comment | The comment followed by a Markdown table of `version`, `family` and `name` | Template text with `{key}` placeholders. |

## Sync settings

### Delete projects

| Setting | Default | Description |
|---|---|---|
| Delete projects | Off | Intended to delete AYON projects when the paired Kitsu project is deleted. In 1.2.7 the setting has no effect, because the handler for deleted projects does not read it. |

### Sync users

When a Kitsu user is synchronized, the default password is set for the new AYON user; the user should change it in AYON.

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Synchronize Kitsu users. |
| Default Password | `default_password` | Password of newly created users. |
| Access Group | `kitsu_group` | Default access group of synchronized users. |
| Roles | See below | The AYON role each Kitsu role gets. |

**Roles** map a Kitsu role to one of the values `admin`, `manager` or `user`, which make the AYON user an administrator, a manager or a regular user.

| Kitsu role | Default AYON role |
|---|---|
| Studio manager | `admin` |
| Vendor | `user` |
| Client | `user` |
| Production manager | `manager` |
| Supervisor | `manager` |
| Artist | `user` |

### Sync casting

| Setting | Default | Description |
|---|---|---|
| Sync casting links | Off | Create AYON links from the Kitsu casting breakdown. |
| Casting link type | `breakdown` | Name of the AYON link type used. |

### Default sync info

The mapping for tasks and statuses that the synchronization creates in AYON. A task type or status that is listed uses the given names and icon; any other gets default names and a default icon.

| Setting | Default | Description |
|---|---|---|
| Tasks | 12 items, see below | Items with **Name**, **Short name** and **Icon**. |
| Statuses | 9 items, see below | Items with **Short name**, **State** and **Icon**. Statuses already have names, so the short name is the key. |

Default tasks:

| Name | Short name | Icon |
|---|---|---|
| Concept | `cncp` | `lightbulb` |
| Modeling | `mdl` | `language` |
| Shading | `shdn` | `format_paint` |
| Rigging | `rig` | `construction` |
| Edit | `edit` | `cut` |
| Storyboard | `stry` | `image` |
| Layout | `lay` | `nature_people` |
| Animation | `anim` | `directions_run` |
| Lighting | `lgt` | `highlight` |
| FX | `fx` | `local_fire_department` |
| Compositing | `comp` | `layers` |
| Recording | `rcrd` | `video_camera_back` |

Default statuses:

| Short name | State | Icon |
|---|---|---|
| `todo` | `not_started` | `fiber_new` |
| `neutral` | `in_progress` | `timer` |
| `wip` | `in_progress` | `play_arrow` |
| `wfa` | `in_progress` | `visibility` |
| `retake` | `in_progress` | `timer` |
| `done` | `done` | `task_alt` |
| `ready` | `not_started` | `timer` |
| `approved` | `done` | `task_alt` |
| `rejected` | `blocked` | `block` |
