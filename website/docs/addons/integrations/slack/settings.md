---
title: Slack addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Slack addon with their defaults: the authentication token and the notification profiles with filters, channels, message templates and upload options."
addon: slack
addon_repo: ayon-slack
addon_version: 1.3.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-slack/tree/1.3.1/server/settings
  - https://help.ayon.app/en/articles/8988101-slack
---

# Slack addon settings

<AddonInfo />

The settings of the [Slack addon](index.md), with the default values the addon ships with. They are read from the project settings during publishing, so the token and the profiles can differ per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Authentication

| Setting | Default | Description |
|---|---|---|
| Auth Token | empty | Bot token of the Slack app. |

## Notification to Slack

Settings of the **Collect Slack family** publish plugin, under **Publish plugins**.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Whether notifications are collected. |
| Optional | On | Whether the artist can switch the plugin off in the Publisher. |
| Profiles | One profile with all filters empty, no channel messages and a 50 MB review limit | List of profiles. The first profile that matches an instance is used. |

The default profile has no channel messages, so it sends nothing until a message is added.

### Profile

| Setting | Default | Description |
|---|---|---|
| Host names | empty | Host names (applications) the profile applies to. Empty matches all. |
| Task types | empty | Task types the profile applies to. Empty matches all. |
| Task names | empty | Task names the profile applies to. Empty matches all. |
| Product base types | empty | Product base types (for example `render`) the profile applies to. Empty matches all. |
| Product names | empty | Product names the profile applies to. Empty matches all. |
| Upload review maximum file size (MB) | 50.0 | Largest review file that is uploaded. A larger file is replaced by its path in the message. |
| Messages to channels | empty | List of channel messages sent when the profile matches. |

Profiles saved by older versions of the addon use `hosts` and `product_types`; the addon converts them to **Host names** and **Product base types** when the settings are loaded.

### Messages to channels

| Setting | Default | Description |
|---|---|---|
| Channels | empty | Slack channels that receive the message. Template keys can be used. |
| Upload thumbnail | On | Upload the thumbnail of the instance, when it has one. |
| Upload review | On | Upload the review of the instance when it is within the size limit. |
| Message | empty | Message template. It can use template keys, `{review_filepath}` and `@` mentions. |
