---
title: Ynput Cloud addon settings
sidebar_label: Settings
description: "Reference of the two settings of the AYON Ynput Cloud addon with their default values: Allow Ynput Cloud login and Allow remote support."
addon: ynputcloud
addon_repo: ayon-cloud-addon
addon_version: 1.1.1
addon_scope: server
addon_flags: [licensed, power-feature, cloud-only, cloud-required]
addon_private: true
verified: 2026-11-18
---

# Ynput Cloud addon settings

<AddonInfo />

The settings of the [Ynput Cloud addon](index.md) are in **Studio settings > Ynput Cloud**. Pasting a location below into the URI bar of the web app opens that setting. The addon is a system addon: its settings are visible to administrators only, and the addon reads only the studio values. The connection of the server to Ynput Cloud itself is not an addon setting.

## Allow Ynput Cloud login

<SettingLocation uri="ayon+settings://ynputcloud/ynput_cloud_sso" scope="Studio only" />

Whether users can log in to the server with their Ynput Cloud account, as described in [Cloud login](index.md#cloud-login).

<!-- screenshot: settings editor, Allow Ynput Cloud login -->

<Settings>
<Setting name="Allow Ynput Cloud login" id="allow-ynput-cloud-login-setting" default="Enabled">

Offers the Ynput Cloud account as a login option on the login page and accepts the login callback. When disabled, the option is not offered and the callback is refused.

</Setting>
</Settings>

## Allow remote support

<SettingLocation uri="ayon+settings://ynputcloud/remote_support" scope="Studio only" />

Whether the Ynput support team can log in to the server, as described in [Remote support](index.md#remote-support).

<!-- screenshot: settings editor, Allow remote support -->

<Settings>
<Setting name="Allow remote support" id="allow-remote-support-setting" default="Disabled">

Lets Ynput support accounts log in with their Ynput Cloud accounts, without a dedicated support user on the server. It has an effect only when **Allow Ynput Cloud login** is enabled. The check is made when a support account logs in for the first time: disabling the setting refuses support accounts that do not exist on the server yet, but not a support user that was already created.

</Setting>
</Settings>

## Related

- [Ynput Cloud addon](index.md)
- [SSO addon settings](../sso/settings.md)
- [Settings in AYON](../../../ayon/how-ayon-works/settings.md)
