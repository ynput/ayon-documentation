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
verified: 2026-10-19
---

# Ynput Cloud addon settings

<AddonInfo />

The settings of the [Ynput Cloud addon](index.md), with the default values the addon ships with. The addon is a system addon, so its settings are only visible to administrators. The settings are read at the studio level. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

| Setting | Default | Description |
|---|---|---|
| Allow Ynput Cloud login | On | Offers the Ynput Cloud account as a login option on the AYON server and accepts the login callback. When off, no option is offered and the callback is refused. |
| Allow remote support | Off | Allows the Ynput support team to log in with their Ynput Cloud accounts, without a dedicated support user on the server. Only has an effect when cloud login is on. |
