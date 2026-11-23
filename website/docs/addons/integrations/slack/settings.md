---
title: Slack addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Slack addon with their defaults: the authentication token and the notification profiles with filters, channels, message templates and upload options."
addon: slack
addon_repo: ayon-slack
addon_version: 1.3.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-slack/tree/1.3.1/server/settings
---

# Slack addon settings

<AddonInfo />

The settings of the [Slack addon](index.md) are in **Studio settings > Slack**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. They are read from the project settings during publishing, so the token and the profiles can differ per project. The Slack app itself, its scopes and its invitation to channels, are set up in Slack; see the [overview](index.md).

## Authentication

<SettingLocation uri="ayon+settings://slack/token" scope="Studio, with project overrides" />

The token the publish plugins use to post to Slack.

<!-- screenshot: settings editor, Slack -->

<Settings>
<Setting name="Enabled" default="Enabled">

Toggle at the top of the addon settings. The publish plugins of 1.3.1 do not read it: notifications are controlled by **Notification to Slack** below.

</Setting>
<Setting name="Auth Token" default="Empty">

Bot token of the Slack app. It is stored as plain text in the settings.

</Setting>
</Settings>

## Notification to Slack

<SettingLocation uri="ayon+settings://slack/publish/CollectSlackFamilies" scope="Studio, with project overrides" />

Settings of the **Collect Slack family** publish plugin, under **Publish plugins**. It picks a profile for each published instance and, when one matches, marks the instance for the Slack integrator with the profile's channel messages.

<!-- screenshot: settings editor, Notification to Slack -->

<Settings prefix="notification-to-slack">
<Setting name="Enabled" default="Enabled">

Whether notifications are collected.

</Setting>
<Setting name="Optional" default="Enabled">

Marks the plugin as optional. At 1.3.1 the plugin shows no on/off toggle in the Publisher, only an **Additional Slack message** field, so artists cannot switch it off per instance.

</Setting>
<Setting name="Profiles" default="One profile with all filters empty, no channel messages and a 50 MB review limit">

The profile used for an instance is the most specific match: a profile that names the value of a filter wins over one that leaves it empty. When no profile matches, nothing is sent. The default profile matches every instance but has no channel messages, so it sends nothing until a message is added.

</Setting>
</Settings>

### Profile

The fields of one profile. Empty filters match everything.

<Settings prefix="profile">
<Setting name="Host names" default="Empty list">

Host names (applications) the profile applies to.

</Setting>
<Setting name="Task types" default="Empty list">

Task types the profile applies to, chosen from the task types of the project.

</Setting>
<Setting name="Task names" default="Empty list">

Task names the profile applies to.

</Setting>
<Setting name="Product base types" default="Empty list">

Product base types (for example `render`) the profile applies to. Instances without a product base type are matched on their product type.

</Setting>
<Setting name="Product names" default="Empty list">

Product names the profile applies to.

</Setting>
<Setting name="Upload review maximum file size (MB)" default="50.0">

Largest review file that is uploaded. A larger file is not uploaded; a message can link to it with `{review_filepath}`.

</Setting>
<Setting name="Messages to channels" default="Empty list">

Messages sent when the profile matches. See [Messages to channels](#messages-to-channels).

</Setting>
</Settings>

Profiles saved by older versions of the addon use `hosts` and `product_types`; the addon converts them to **Host names** and **Product base types** when the settings are loaded.

### Messages to channels

The fields of one message.

<Settings prefix="message">
<Setting name="Channels" default="Empty list">

Slack channels that receive the message. Template keys can be used.

</Setting>
<Setting name="Upload thumbnail" default="Enabled">

Upload the thumbnail of the instance, when it has one.

</Setting>
<Setting name="Upload review" default="Enabled">

Upload the review of the instance when it is within the size limit.

</Setting>
<Setting name="Message" default="Empty">

Message template. It can use the template keys of the instance, `{review_filepath}` for a review too large to upload, and `@` mentions, which are turned into Slack user or group mentions.

</Setting>
</Settings>

## Related

- [Slack addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
