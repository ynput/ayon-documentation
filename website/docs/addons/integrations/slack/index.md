---
title: Slack addon
sidebar_label: Overview
description: "The AYON Slack addon: it posts notifications to Slack channels when products are published, with profile-based filtering, message templates, user mentions and optional thumbnail and review uploads."
addon: slack
addon_repo: ayon-slack
addon_version: 1.3.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-slack/tree/1.3.1
  - https://github.com/ynput/ayon-slack/releases
  - https://help.ayon.app/en/articles/8988101-slack
---

# Slack addon

<AddonInfo />

The Slack addon sends a message to Slack channels when products are published from AYON. Profiles decide which publish instances produce a notification and which channels receive it. The message is a template filled with publish data, can mention Slack users and groups, and can carry the thumbnail and the review of the instance. The addon runs inside the publishing process of any host and has no service. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.3.0 or newer |
| Applications addon | 0.2.0 or newer (compatible, not required) |
| Slack app | A Slack app installed in the Slack workspace, created from the `manifest.yml` shipped with the addon, and its bot token |

The Slack app in `manifest.yml` is named **AyonNotifier**, has a bot user, and requests these bot scopes:

| Scope | Used for |
|---|---|
| `chat:write` | Posting messages. |
| `chat:write.customize` | Posting messages with a customized sender. |
| `chat:write.public` | Posting to public channels the app has not joined. |
| `files:write` | Uploading thumbnails and reviews. |
| `channels:read` | Reading channels. |

Private channels need the app to be added to them by a Slack admin. A `not_in_channel` error is reported with a hint to that effect. Looking up users and groups for mentions uses the Slack `users.list` and `usergroups.list` calls; if they fail, the message is still sent and mentions are left as text.

## Publishing

The addon adds two publish plugins.

| Plugin | Order | What it does |
|---|---|---|
| **Collect Slack family** | Collector, late (`CollectorOrder + 0.4999`) | Finds the first profile that matches the instance (see below). On a match it adds the `slack` family to the instance and stores the channel messages and the project's token on it. Also adds the instance attribute **Additional Slack message**. |
| **Integrate Slack Api** | Integrator (`IntegratorOrder + 0.499`) | Runs on instances with the `slack` family. Sends one message per channel configured in the profile. It is optional in the Publisher and is skipped for instances marked to run on the farm. |

### Profile matching

A profile is matched on the host name of the publishing application, the task type and task name of the instance, its product base type (the product type when the instance has none) and its product name. Empty lists match everything. If no profile matches, no notification is sent.

### Message content

| Feature | Behavior |
|---|---|
| Template keys | The message and the channel names are filled with the publish data of the instance: anatomy keys such as `{folder[name]}`, `{product[name]}`, `{task[name]}`, the publish `{comment}`, and `{root}`. Capitalized and upper case variants of keys exist, for example `{Folder[name]}` and `{FOLDER[NAME]}`. The legacy keys `{asset}`, `{subset}` and `{family}` are still translated to `{folder[name]}`, `{product[name]}` and `{product[type]}`. |
| `{review_filepath}` | Path of the review file of the instance, when it has one. |
| Additional message | Text the artist writes in **Additional Slack message** in the Publisher. It is put before the profile message and is sent only for instances matched by a profile. |
| Mentions | A word that starts with `@` is matched, case-insensitively, against the Slack user name, display name and real name, and then against user group names and handles. A match becomes a Slack mention. Names with spaces can be written in quotes. Text that matches nothing is left unchanged. |
| Thumbnail | If the instance has a thumbnail representation and the channel message has **Upload thumbnail** on, the file is uploaded and linked in the message. |
| Review | If the instance has a review representation (a burnin version takes precedence) and **Upload review** is on, the file is uploaded when it is not larger than **Upload review maximum file size (MB)**. A larger file is not uploaded, and the message gets a note and the file path. |

Messages are not removed by the addon. Retention of messages and files is managed in Slack.

## Related

- [Slack addon settings](settings.md)
