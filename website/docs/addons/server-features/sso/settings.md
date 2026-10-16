---
title: SSO addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SSO addon with their default values: the Authentik, Discord, Microsoft Entra, Google and Okta providers, new users, permission sync and role mappings."
addon: sso
addon_repo: ayon-sso
addon_version: 1.1.1
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7917548-single-sign-on
---

# SSO addon settings

<AddonInfo />

The settings of the [SSO addon](index.md), with the default values the addon ships with. There is one section per provider, and each has an **Enabled** switch (default off). They are studio settings. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The server must be restarted after changing them.

Fields named **Client ID**, **Client Secret** and **Directory ID** hold the name of an AYON secret, not the value itself.

## Shared structures

New users (Authentik, Microsoft Entra, Okta):

| Setting | Default | Description |
|---|---|---|
| Allow new users | Off | Create an AYON user when none matches the email address. |
| Disable password | Off | New users cannot set a password and must use a sign-in option. |

Role mappings (Authentik, Microsoft Entra, Okta). A list of profiles, empty by default. The first profile whose **Role name** is among the user's groups is applied.

| Setting | Default | Description |
|---|---|---|
| Role name | Empty | Group name from the provider. |
| Ayon role | `user` | `admin`, `manager` or `user`. |
| Access groups | Empty | Default access groups. |
| Guest | Off | Marks the user as a guest. |

## Authentik

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Activates the provider. |
| Title | `Authentik` | Title of the sign-in button. |
| Background Color | `#FD4B2D` | Background color of the button. |
| Text Color | `#ffffff` | Text color of the button. |
| Configuration URL | Empty | The OpenID Connect discovery URL of the Authentik application. The addon reads the endpoints from it. |
| Client ID | `authentik_client_id` | Secret with the client ID. |
| Client Secret | `authentik_client_secret` | Secret with the client secret. |
| Sync permissions | On | Update access level, guest flag and access groups of existing users at each login. |
| New users | See above | Creation of new users. |
| Role mappings | Empty | See above. |

## Discord

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Activates the provider. |
| Client ID | `discord_sso_client_id` | Secret with the client ID. |
| Client Secret | `discord_sso_client_secret` | Secret with the client secret. |

## Microsoft Entra

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Activates the provider. |
| Directory ID | `entra_directory_id` | Secret with the directory (tenant) ID. |
| Client ID | `entra_client_id` | Secret with the client ID. |
| Client Secret | `entra_client_secret` | Secret with the client secret. |
| Sync permissions | On | Update access level, guest flag and access groups of existing users at each login. |
| New users | See above | Creation of new users. |
| Role mappings | Empty | See above; the role name is the display name of an Entra group. |

## Google

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Activates the provider. |
| Client ID | `google_sso_client_id` | Secret with the client ID. |
| Client Secret | `google_sso_client_secret` | Secret with the client secret. |
| Allowed domains | Empty | Email domains that may sign in. With the list empty, nobody can sign in. |
| New users | Off | Contains **Allow new users** (off), **Disable password** (off) and a **Role**. |

The **Role** of a new Google user:

| Setting | Default | Description |
|---|---|---|
| Access level | `user` | `admin`, `manager` or `user`. |
| Access groups | Empty | Default access groups. |
| Guest | Off | Marks the user as a guest. |

## Okta

| Setting | Default | Description |
|---|---|---|
| Enabled | Off | Activates the provider. |
| Entrypoint | Empty | Base URL of the Okta organization, for example `https://mycompany.okta.com`. |
| Client ID | `okta_client_id` | Secret with the client ID. |
| Client Secret | `okta_client_secret` | Secret with the client secret. |
| Sync permissions | On | Update access level, guest flag and access groups of existing users at each login. |
| New users | See above | Creation of new users. |
| Role mappings | Empty | See above; the role name is a group name in the `groups` claim. |
