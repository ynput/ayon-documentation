---
title: Keycloak addon
sidebar_label: Overview
description: "The AYON Keycloak addon: sign-in to AYON through a Keycloak realm using OpenID Connect, with Keycloak client roles mapped to AYON access levels and access groups."
addon: keycloak
addon_repo: ayon-keycloak
addon_version: 1.0.2
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/3555427-keycloak
  - https://help.ayon.app/en/articles/7917548-single-sign-on
---

# Keycloak addon

<AddonInfo />

The Keycloak addon connects an AYON server to a [Keycloak](https://www.keycloak.org/) server for single sign-on. It adds a sign-in button to the AYON login page that authenticates the user in a Keycloak realm (OpenID Connect, authorization code flow), creates the AYON user when needed and sets the user's access level and access groups from the user's Keycloak client roles. Its settings are described on the [settings page](settings.md).

It is a server addon. It has no client part, no services and no launcher or tray features. The [SSO addon](../sso/index.md) provides the same kind of sign-in for other identity providers.

## Requirements

| Requirement | Detail |
|---|---|
| AYON server | No minimum version. The addon plugs into the server (`plugin_for: ayon_server`) and is a system addon. |
| License | Needs the `ssoAddon` constraint of the AYON server license. Without it the addon logs a warning and offers no sign-in button. |
| Keycloak | A realm and an OpenID Connect client with client authentication enabled. |
| AYON secrets | Two secrets that hold the client ID and the client secret of the Keycloak client. |

## What it connects

| Item | Detail |
|---|---|
| Protocol | OpenID Connect against `<Keycloak URL>/realms/<realm>`, using the `openid roles` scopes. |
| Login button | Appears on the AYON login page only when the Keycloak URL, the realm, the client ID and the client secret are all set. Its title, icon and colors come from the settings. |
| Callback | The addon serves an endpoint `sso_callback` under `/api/addons/keycloak/<version>/`. The redirect URI it sends when exchanging the authorization code is `<AYON server URL>/login/keycloak`. |
| Token handling | The addon exchanges the code for a token, reads the user information through the Keycloak token introspection endpoint, and then logs the user out of Keycloak. |

## What it adds to the sign-in flow

1. The addon matches the Keycloak user to an AYON user by email address. When no AYON user has that email, it creates one. The user name is the part of the email before `@`, and the full name comes from the Keycloak `name` value.
2. It reads the roles of the Keycloak client (the `resource_access` entry of the client ID) and uses the first entry of **Role mappings** whose **Keycloak role** is among them.
3. When no role mapping matches, the **Default role** is used if it is enabled. If it is disabled, the user is denied access.
4. The addon writes the access level (`admin`, `manager` or regular user), the guest flag and the default access groups to the user. This happens at every login, so changes made to these values in AYON user management are overwritten at the next sign-in.

Changes to the Keycloak URL, realm and secrets are read when the addon is set up, so the server needs a restart after changing them. Role mappings and the default role are read at each login.

## Settings areas

| Area | What it holds |
|---|---|
| Connection | Keycloak URL, realm, and the secrets for client ID and client secret. |
| Login button | Title, icon and colors of the sign-in button. |
| Default role | The role given to users that match no mapping, or the denial of access. |
| Role mappings | The mapping of Keycloak client roles to AYON roles, access groups and the guest flag. |

## Related

- [Keycloak addon settings](settings.md)
- [SSO addon](../sso/index.md)
