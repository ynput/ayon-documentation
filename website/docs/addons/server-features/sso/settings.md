---
title: SSO addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON SSO addon with their default values: the Authentik, Discord, Microsoft Entra, Google and Okta providers, new users, permission sync and role mappings."
addon: sso
addon_repo: ayon-sso
addon_version: 1.1.2
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-18
---

# SSO addon settings

<AddonInfo />

The settings of the [SSO addon](index.md) are in **Studio settings > SSO**, with one group per identity provider. Pasting a location below into the URI bar of the web app opens that setting. The addon is a system addon and reads only the studio values.

The settings editor asks for a server restart after a change: the providers and their login buttons are loaded when the server starts. Each SSO sign-in also reloads the provider settings and secrets, so a rotated secret is picked up without a restart. Fields named **Client ID**, **Client Secret** and **Directory ID** hold the name of an [AYON secret](../../../ayon/web-ui/studio/secrets.md), not the value itself; they offer the existing secrets. The applications or clients on the provider side are set up in the provider's own console.

## Authentik

<SettingLocation uri="ayon+settings://sso/authentik" scope="Studio only" />

Sign-in through an Authentik application, with OpenID Connect. Users are matched by email address, and their access level and access groups can follow their Authentik groups.

<!-- screenshot: settings editor, Authentik -->

<Settings prefix="authentik">
<Setting name="Enabled" default="Disabled">

Loads the provider and adds its button to the login page.

</Setting>
<Setting name="Appearance">

The sign-in button.

<Settings>
<Setting name="Title" default="Authentik">

Title of the sign-in button.

</Setting>
<Setting name="Background Color" default="#FD4B2D" />
<Setting name="Text Color" default="#ffffff" />
</Settings>

</Setting>
<Setting name="Configuration URL" default="Empty">

The OpenID Connect discovery URL of the Authentik application, such as `https://authentik.example.com/application/o/ayon/.well-known/openid-configuration`. The addon reads the authorization, token, user information and revocation endpoints from it; without it the provider is not loaded.

</Setting>
<Setting name="Client ID" default="authentik_client_id">

Secret with the client ID of the Authentik application.

</Setting>
<Setting name="Client Secret" default="authentik_client_secret">

Secret with the client secret.

</Setting>
<Setting name="Sync permissions" default="Enabled">

At each login, replaces the admin and manager flags, the guest flag and the default access groups of an existing user with what the role mapping gives. When disabled, only new users get them.

</Setting>
<Setting name="New users">

<Settings>
<Setting name="Allow new users" default="Disabled">

Creates an AYON user when no user has the email address. When disabled, only existing users can sign in.

</Setting>
<Setting name="Disable password" default="Disabled">

New users cannot log in with a password and must use a sign-in option.

</Setting>
</Settings>

</Setting>
<Setting name="Role mappings" default="Empty list">

The first entry whose **Group name** is among the groups of the user (the `groups` claim) is applied. When no entry matches, the sign-in is refused, also for existing users, so at least one entry is needed.

<Settings>
<Setting name="Group name">

Name of an Authentik group.

</Setting>
<Setting name="Ayon role" default="user">

**admin**, **manager** or **user**.

</Setting>
<Setting name="Access groups" default="Empty list">

Default access groups to give.

</Setting>
<Setting name="Guest" default="Disabled">

Marks the user as a guest.

</Setting>
</Settings>

</Setting>
</Settings>

## Discord

<SettingLocation uri="ayon+settings://sso/discord" scope="Studio only" />

Sign-in with a Discord account. Only users that already exist in AYON with the same email address can sign in, and their access is not changed.

<!-- screenshot: settings editor, Discord -->

<Settings prefix="discord">
<Setting name="Enabled" default="Disabled">

Loads the provider and adds its button to the login page.

</Setting>
<Setting name="Client ID" default="discord_sso_client_id">

Secret with the client ID of the Discord application.

</Setting>
<Setting name="Client Secret" default="discord_sso_client_secret">

Secret with the client secret.

</Setting>
</Settings>

## Microsoft Entra

<SettingLocation uri="ayon+settings://sso/entra" scope="Studio only" />

Sign-in with a Microsoft Entra ID account. The access level and access groups can follow the user's Entra groups, read from Microsoft Graph.

<!-- screenshot: settings editor, Microsoft Entra -->

<Settings prefix="entra">
<Setting name="Enabled" default="Disabled">

Loads the provider and adds its button to the login page.

</Setting>
<Setting name="Directory ID" default="entra_directory_id">

Secret with the directory (tenant) ID.

</Setting>
<Setting name="Client ID" default="entra_client_id">

Secret with the client ID of the app registration.

</Setting>
<Setting name="Client Secret" default="entra_client_secret">

Secret with the client secret.

</Setting>
<Setting name="Sync permissions" default="Enabled">

At each login, replaces the admin and manager flags, the guest flag and the default access groups of an existing user with what the role mapping gives.

</Setting>
<Setting name="New users">

<Settings>
<Setting name="Allow new users" default="Disabled">

Creates an AYON user when no user has the email address.

</Setting>
<Setting name="Disable password" default="Disabled">

New users cannot log in with a password and must use a sign-in option.

</Setting>
</Settings>

</Setting>
<Setting name="Role mappings" default="Empty list">

The first entry whose **Group name** is among the display names of the user's Entra groups is applied. When no entry matches, the sign-in is refused, also for existing users.

<Settings>
<Setting name="Group name">

Display name of an Entra group.

</Setting>
<Setting name="Ayon role" default="user">

**admin**, **manager** or **user**.

</Setting>
<Setting name="Access groups" default="Empty list">

Default access groups to give.

</Setting>
<Setting name="Guest" default="Disabled">

Marks the user as a guest.

</Setting>
</Settings>

</Setting>
</Settings>

## Google

<SettingLocation uri="ayon+settings://sso/google" scope="Studio only" />

Sign-in with a Google account, limited to email domains. Permissions are not synced; new users get one fixed role.

<!-- screenshot: settings editor, Google -->

<Settings prefix="google">
<Setting name="Enabled" default="Disabled">

Loads the provider and adds its button to the login page.

</Setting>
<Setting name="Client ID" default="google_sso_client_id">

Secret with the OAuth client ID.

</Setting>
<Setting name="Client Secret" default="google_sso_client_secret">

Secret with the client secret.

</Setting>
<Setting name="Allowed domains" default="Empty list">

Email domains that may sign in, such as `example.com`. With the list empty, nobody can sign in.

</Setting>
<Setting name="New users">

<Settings>
<Setting name="Allow new users" default="Disabled">

Creates an AYON user when no user has the email address.

</Setting>
<Setting name="Disable password" default="Disabled">

New users cannot log in with a password and must use a sign-in option.

</Setting>
<Setting name="Role">

What a new user gets.

<Settings>
<Setting name="Access level" default="user">

**admin**, **manager** or **user**.

</Setting>
<Setting name="Access groups" default="Empty list">

Default access groups.

</Setting>
<Setting name="Guest" default="Disabled">

Marks the user as a guest.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Okta

<SettingLocation uri="ayon+settings://sso/okta" scope="Studio only" />

Sign-in through an Okta organization. The access level and access groups can follow the user's Okta groups.

<!-- screenshot: settings editor, Okta -->

<Settings prefix="okta">
<Setting name="Enabled" default="Disabled">

Loads the provider and adds its button to the login page.

</Setting>
<Setting name="Entrypoint" default="Empty">

Base URL of the Okta organization, such as `https://mycompany.okta.com`. The addon builds the `/oauth2/v1/` endpoints from it.

</Setting>
<Setting name="Client ID" default="okta_client_id">

Secret with the client ID of the Okta application.

</Setting>
<Setting name="Client Secret" default="okta_client_secret">

Secret with the client secret.

</Setting>
<Setting name="Sync permissions" default="Enabled">

At each login, replaces the admin and manager flags, the guest flag and the default access groups of an existing user with what the role mapping gives.

</Setting>
<Setting name="New users">

<Settings>
<Setting name="Allow new users" default="Disabled">

Creates an AYON user when no user has the email address.

</Setting>
<Setting name="Disable password" default="Disabled">

New users cannot log in with a password and must use a sign-in option.

</Setting>
</Settings>

</Setting>
<Setting name="Role mappings" default="Empty list">

The first entry whose **Role name** is among the groups of the user (the `groups` claim) is applied. When no entry matches, the sign-in is refused, also for existing users.

<Settings>
<Setting name="Role name">

Name of an Okta group.

</Setting>
<Setting name="Ayon role" default="user">

**admin**, **manager** or **user**.

</Setting>
<Setting name="Access groups" default="Empty list">

Default access groups to give.

</Setting>
<Setting name="Guest" default="Disabled">

Marks the user as a guest.

</Setting>
</Settings>

</Setting>
</Settings>

## Related

- [SSO addon](index.md)
- [Keycloak addon settings](../keycloak/settings.md)
- [Settings in AYON](../../../ayon/how-ayon-works/settings.md)
