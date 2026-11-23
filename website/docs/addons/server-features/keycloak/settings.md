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
verified: 2026-11-18
---

# Keycloak addon settings

<AddonInfo />

The settings of the [Keycloak addon](index.md) are in **Studio settings > Keycloak**. Pasting a location below into the URI bar of the web app opens that setting. The addon is a system addon and reads only the studio values. It reads the connection and button settings when the server starts, so changing them needs a server restart; the role mappings and the default role are read at each login. The Keycloak realm and client themselves are set up in Keycloak, and the client ID and secret are stored as [AYON secrets](../../../ayon/web-ui/studio/secrets.md), which the settings refer to by name.

## Connection

<SettingLocation uri="ayon+settings://keycloak" scope="Studio only" />

Where the Keycloak server is and which secrets hold the credentials of the Keycloak client. The sign-in button is shown only when all four values are set and the secrets exist.

<!-- screenshot: settings editor, Connection -->

<Settings>
<Setting name="Keycloak URL" default="Empty">

Base URL of the Keycloak server, including any path prefix. The addon appends `/realms/<realm>`.

</Setting>
<Setting name="Keycloak realm" default="Empty">

Name of the realm used for authentication.

</Setting>
<Setting name="Client ID" default="keycloak_client_id">

Name of the AYON secret that holds the client ID of the Keycloak client. The field offers the existing secrets.

</Setting>
<Setting name="Client secret" default="keycloak_client_secret">

Name of the AYON secret that holds the client secret of the Keycloak client.

</Setting>
</Settings>

## Login button

<SettingLocation uri="ayon+settings://keycloak" scope="Studio only" />

How the Keycloak sign-in button looks on the AYON login page.

<!-- screenshot: settings editor, Login button -->

<Settings>
<Setting name="SSO provider title" default="Keycloak">

Title of the sign-in button, also used in the login message.

</Setting>
<Setting name="SSO icon" default="Empty">

URL of an icon for the button.

</Setting>
<Setting name="SSO button color" default="#252523" />
<Setting name="SSO button text color" default="#c0c0c0" />
</Settings>

## Default role

<SettingLocation uri="ayon+settings://keycloak/default_role" scope="Studio only" />

What happens to users that have none of the Keycloak roles listed in the [role mappings](#role-mappings): either they get a default role, or they are denied access.

<!-- screenshot: settings editor, Default role -->

<Settings>
<Setting name="Allow default role" default="Disabled">

When enabled, such users get the default role below. When disabled, they are denied access.

</Setting>
<Setting name="Default role" id="default-role-mapping">

The role given when the default role is allowed.

<Settings>
<Setting name="Ayon role" default="user">

Access level: **admin**, **manager** or **user**. The user's admin and manager flags are set from it.

</Setting>
<Setting name="Access groups" default="Empty list">

Default access groups of the user, chosen from the access groups of the server.

</Setting>
<Setting name="Guest" default="Disabled">

Marks the user as a guest.

</Setting>
</Settings>

</Setting>
</Settings>

## Role mappings

<SettingLocation uri="ayon+settings://keycloak/role_mappings" scope="Studio only" />

The mapping of Keycloak client roles to AYON access levels and access groups. At each login, the first entry whose **Keycloak role** is among the roles of the user in the Keycloak client is applied, and its values replace the access level, guest flag and default access groups of the user. When no entry matches, the [default role](#default-role) decides.

<!-- screenshot: settings editor, Role mappings -->

<Settings>
<Setting name="Role mappings" id="role-mappings-list" default="Empty list">

<Settings>
<Setting name="Keycloak role" default="Empty">

Name of a role of the Keycloak client.

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

- [Keycloak addon](index.md)
- [SSO addon settings](../sso/settings.md)
- [Settings in AYON](../../../ayon/how-ayon-works/settings.md)
