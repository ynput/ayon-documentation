---
title: Jira addon settings
sidebar_label: Settings
sidebar_class_name: addon-archived
description: "Reference of the settings of the AYON Jira addon with their default values: Jira credentials, process phases and the notification profiles of the Jira comment publish plugin."
addon: jira
addon_repo: ayon-jira
addon_version: 0.1.1
addon_scope: pipeline-server
addon_flags: []
addon_archived: true
addon_last_push: 2026-02-24
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-jira/tree/0.1.1/server/settings
  - https://help.ayon.app/en/articles/8465192-jira
---

# Jira addon settings

<AddonInfo />

The settings of the [Jira addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## Connection

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Switches the addon's publish integration on. It is read by the credentials plugin and by the ticket lookup. |
| Jira server url | Empty | URL of the Jira server. |
| Jira username | Empty | User name for the Jira API. |
| Jira password | Empty | Password for the Jira API. It is stored as plain text in the settings. |
| Jira project code | Empty | Key of the Jira project in which tickets are created. |

## List of process phases

A list that lets one AYON task have several Jira tickets. The names also form the options of the **Jira Current Phase** task attribute. The list is empty by default.

| Field | Description |
|---|---|
| Phase name | Name of the phase. |
| Prefix value | Used to look up the Jira ticket ids of the task. |

## Publish plugins

### Notification to Jira

Settings of the `CollectJiraNotifications` plugin.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | The plugin runs. |
| Optional | On | The artist can switch it off in the Publisher. |
| Profiles | One profile with empty filters | List of notification profiles. The first matching profile is used. |

A profile has these fields. An empty filter list matches everything.

| Field | Default | Description |
|---|---|---|
| Hosts | Empty | Host applications the profile applies to. |
| Task types | Empty | Task types the profile applies to. |
| Task names | Empty | Task names the profile applies to. |
| Product names | Empty | Product names the profile applies to. |
| Product types | Empty | Product types the profile applies to. |
| Comment to ticket | Empty | Comment text. It can contain `{}` placeholders filled from the anatomy data, and capitalized or uppercase variants of them. |
| Upload thumbnail | Off | Attach the thumbnail, when the publish has one. |
| Upload review | Off | Attach the review, when the publish has one. |
| Review file size limit (MB) | 5 | A larger review is not attached, and its path is added to the comment instead. |
