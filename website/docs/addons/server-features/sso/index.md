---
title: SSO addon
sidebar_label: Overview
description: "The AYON SSO addon: sign-in to AYON with Authentik, Discord, Microsoft Entra, Google or Okta accounts, automatic creation of users and mapping of provider groups to AYON roles."
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

# SSO addon

<AddonInfo />

The SSO addon connects an AYON server to external identity providers for single sign-on. For each enabled provider it adds a button to the AYON login page. After the user authenticates with the provider, the addon matches the account to an AYON user by email address, can create the user when it does not exist, and can set the user's access level and access groups from the provider's groups. Its settings are described on the [settings page](settings.md).

It is a server addon. It has no client part, no services and no launcher or tray features. A separate addon, [Keycloak](../keycloak/index.md), provides sign-in through a Keycloak server.

## Requirements

| Requirement | Detail |
|---|---|
| AYON server | 1.10.0 or newer. |
| License | Needs the `ssoAddon` constraint of the AYON server license. Without it no provider is loaded. |
| Bundle | The providers are set up only when the addon belongs to the production bundle. |
| AYON secrets | Client ID and client secret of each provider (and the directory ID for Entra) are stored as AYON secrets, and the settings name the secret. |

## Providers

| Provider | Sign-in button | Where groups come from | Creates new users | Syncs permissions |
|---|---|---|---|---|
| Authentik | Title and colors are configurable (default `Authentik`, `#FD4B2D`). | The `groups` claim of the user information. | Optional | Optional, on by default |
| Discord | Fixed color `#5865F2`, no icon. | Not used. | No | No |
| Microsoft Entra | Title `Microsoft Entra`, Microsoft icon. | Display names of the groups the user is a member of, read from Microsoft Graph. | Optional | Optional, on by default |
| Google | Black button with the Google icon. | Not used. | Optional, with one fixed role definition | No |
| Okta | Fixed color `#00297A`, no icon. | The `groups` claim of the user information. | Optional | Optional, on by default |

All providers use the OAuth 2.0 authorization code flow and the redirect URI `<AYON server URL>/login/<provider>`, where the provider is `authentik`, `discord`, `entra`, `google` or `okta`. The addon serves the callback endpoint `sso_callback` under `/api/addons/sso/<version>/`. After it has read the user information, the addon revokes the token where the provider has a revocation endpoint.

## What it adds to the sign-in flow

| Step | Behavior |
|---|---|
| Matching | The user is found by email address, compared case-insensitively. An inactive AYON user is refused. |
| Existing user | The provider's full name and email attributes are updated. When **Sync permissions** is on, the admin and manager flags, the guest flag and the default access groups are replaced by what the role mapping gives, at every login. |
| New user | Created only when **Allow new users** is on. The user name comes from the provider's preferred user name (Authentik), or from the full name or the email prefix, made unique by a numeric suffix. An `entity.user.created` event is dispatched. **Disable password** can mark the new user as unable to log in with a password. |
| Role mapping | For Authentik, Entra and Okta, the first **Role mappings** entry whose **Role name** is among the user's groups is applied. When none matches, the sign-in is refused, also for existing users. |
| Google | Only email domains listed in **Allowed domains** can sign in. New users get the role of the **New users** definition. |
| Discord | Only users that already exist in AYON can sign in, and their data is not changed. |

## Settings areas

| Area | What it holds |
|---|---|
| Authentik | Appearance of the button, configuration URL, secrets, permission sync, new users and role mappings. |
| Discord | Client ID and client secret secrets. |
| Microsoft Entra | Directory ID, client ID and client secret secrets, permission sync, new users and role mappings. |
| Google | Secrets, allowed domains and the role of new users. |
| Okta | Entrypoint URL, secrets, permission sync, new users and role mappings. |

Each provider has an enable switch. Providers are loaded when the server starts, so the server needs a restart after changing the settings.

## Related

- [SSO addon settings](settings.md)
- [Keycloak addon](../keycloak/index.md)
