---
title: Ynput Cloud addon
sidebar_label: Overview
description: "The AYON Ynput Cloud addon: sign-in to an AYON server with a Ynput Cloud account, how users are created and mapped to roles, the remote support access and its two settings."
addon: ynputcloud
addon_repo: ayon-cloud-addon
addon_version: 1.1.1
addon_scope: server
addon_flags: [licensed, power-feature, cloud-only, cloud-required]
addon_private: true
verified: 2026-10-19
---

# Ynput Cloud addon

<AddonInfo />

The Ynput Cloud addon adds a sign-in method to an AYON server that is connected to [Ynput Cloud](https://ynput.cloud/): users log in with their Ynput Cloud account, and AYON creates or updates the matching AYON user from the account data. It can also let the Ynput support team sign in to the server. The addon is a system addon (it has no pipeline part, its settings are hidden from non-administrators) and is a server-side addon only. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Value |
|---|---|
| Plugin for | The AYON server (`plugin_for` is `ayon_server`) |
| Server connection | The server must be connected to Ynput Cloud: the addon reads the instance id and the public key of Ynput Cloud and fails with "Not connected to Ynput Cloud" otherwise |
| Bundle | The addon is only active when its version is in the production bundle |
| Required and compatible addons, services | None |

## Cloud login

When the addon is active and **Allow Ynput Cloud login** is on, the login page of the AYON server offers a **ynput.cloud** login option. The login runs as follows.

| Step | What the addon does |
|---|---|
| Request | Creates a one-time nonce (valid 30 minutes) and sends the browser to the Ynput Cloud authorization URL with the instance id and the nonce. |
| Callback | Ynput Cloud returns a signed token (RS256) to the addon endpoint `sso_callback`. The token is checked against the public key that the addon fetches from Ynput Cloud (cached for 24 hours) and against the instance id as audience. |
| Nonce | The nonce in the token must exist, be younger than 30 minutes, and is deleted when used. |
| User lookup | The AYON user is found by email address (case insensitive). |
| New user | If no user has that email, one is created with the name, email, full name and avatar from the token. |
| Roles | The user data is set from the cloud role: `admin` sets `isAdmin`, `manager` sets `isManager`, and the guest flag sets `isGuest`. This is done at every login, so these flags always follow Ynput Cloud. |
| Session | An AYON session is created and the user is logged in. |

The server itself decides whether a user may also log in with a password. That setting belongs to the user management of the server and not to this addon.

## Remote support

When **Allow remote support** is on, accounts of the Ynput support team (marked as support users in the token) can log in with the same flow, without a dedicated support user. A support user gets the `isSupport` flag and a support token in its user data. The server hides support users from user lists and strips the support token from user and profile updates. When the setting is off, a support login is refused for an account that does not exist on the server yet.

## Settings areas

| Setting | Effect |
|---|---|
| Allow Ynput Cloud login | Shows the Ynput Cloud login option and accepts its callback. |
| Allow remote support | Accepts logins of Ynput support accounts. |

## Related

- [Settings](settings.md)
- [Single sign-on addons](../sso/index.md)
