---
title: Jira addon
sidebar_label: Jira (archived)
sidebar_class_name: addon-archived
description: "The archived AYON Jira addon: what it did (Jira ticket preparation from templates and publish comments on Jira tickets) and its status."
addon: jira
addon_repo: ayon-jira
addon_version: 0.1.1
addon_scope: pipeline-server
addon_flags: []
addon_archived: true
addon_last_push: 2026-02-24
verified: 2026-11-19
sources:
  - https://github.com/ynput/ayon-jira/tree/0.1.1
  - https://github.com/ynput/ayon-jira/releases
---

# Jira addon

<AddonInfo />

:::caution Archived
The Jira addon is archived and no longer maintained. Its last release, 0.1.1, is from 2024-11-29. There is no replacement addon.
:::

The Jira addon connected AYON to [Jira](https://www.atlassian.com/software/jira). It did two things:

- **Ticket preparation:** a project page created AYON tasks together with matching Jira epics and tickets from template files shipped in the addon source. New templates and the ids of the Jira custom fields it used had to be changed in the source before building the package.
- **Publish comments:** after a publish, a comment was posted to the Jira ticket of the task, optionally with the thumbnail and the review. Notification profiles in the addon settings chose which publishes did this, and the task attribute **Jira Current Phase** chose which of the task's tickets received the comment.

The Jira server, the credentials and the project code were set in the addon settings, per project if needed.

## Related

- [Integrations](../../index.md#other-integrations)
