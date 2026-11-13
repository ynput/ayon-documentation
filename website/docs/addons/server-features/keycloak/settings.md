---
title: Keycloak addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Keycloak addon with their default values: connection, login button appearance, default role and role mappings."
addon: keycloak
addon_repo: ayon-keycloak
addon_version: 1.0.2
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/3555427-keycloak
---

# Keycloak addon settings

<AddonInfo />

The settings of the [Keycloak addon](index.md), with the default values the addon ships with. They are studio settings. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). The addon reads the connection and button settings when the server starts, so changing them needs a server restart.

## Connection

| Setting | Default | Description |
|---|---|---|
| Keycloak URL | Empty | Base URL of the Keycloak server, including any path prefix. The addon appends `/realms/<realm>`. |
| Keycloak realm | Empty | Name of the realm used for authentication. |
| Client ID | `keycloak_client_id` | Name of the AYON secret that holds the client ID of the Keycloak client. |
| Client secret | `keycloak_client_secret` | Name of the AYON secret that holds the client secret of the Keycloak client. |

## Login button

| Setting | Default | Description |
|---|---|---|
| SSO provider title | `Keycloak` | Title of the sign-in button, also shown in the login message. |
| SSO icon | Empty | URL of an icon for the button. |
| SSO button color | `#252523` | Background color of the button. |
| SSO button text color | `#c0c0c0` | Text color of the button. |

## Default role

Applies to users that have none of the roles listed in the role mappings.

| Setting | Default | Description |
|---|---|---|
| Allow default role | Off | When on, such users get the default role. When off, they are denied access. |
| Default role | See below | The role definition applied when the default role is allowed. |

The default role has these fields:

| Setting | Default | Description |
|---|---|---|
| Ayon role | `user` | Access level. `admin` and `manager` set the matching flag on the user; any other value gives a regular user. |
| Access groups | Empty | Default access groups of the user. |
| Guest | Off | Marks the user as a guest. |

## Role mappings

A list of profiles. The first profile whose **Keycloak role** is found among the user's client roles is applied. No profiles exist by default.

| Setting | Default | Description |
|---|---|---|
| Keycloak role | Empty | Name of a role of the Keycloak client. |
| Ayon role | Empty | Access level to give, with the same meaning as in the default role. |
| Access groups | Empty | Default access groups to give. |
| Guest | Off | Marks the user as a guest. |
