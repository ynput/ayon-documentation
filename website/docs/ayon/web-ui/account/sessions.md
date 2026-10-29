---
title: Sessions
description: "The Sessions tab of the AYON web app's Account space: the signed-in user's active sessions with IP address, platform, client, device, location and last activity, and how to invalidate one."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/SessionListPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/api/queries/users/getUsers.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/api/queries/users/updateUsers.ts
  - https://github.com/ynput/ayon-backend/blob/develop/api/users/users.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/auth/session.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/clientinfo.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
---

# Sessions

The **Sessions** tab lists the sessions the signed-in user currently has on the server: one per sign-in in a browser, in the AYON launcher or in another client. It shows where and with what each session was opened and when it was last used, and lets the user end any of them, for example after signing in on a shared machine.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Sessions | **User** menu, **Account**, then the **Sessions** tab | `0` opens the User menu | `/account/sessions` | Everyone except guests |

## Layout and controls

The page is one table with a row per session. The session of the current browser is highlighted.

| Column | Content |
|---|---|
| **IP** | The client's IP address when the session was created. |
| **Platform** | `windows`, `darwin` or `linux` for browsers; the platform reported by AYON clients. |
| **Client** | The browser, or `Ayon client <version>` for AYON clients such as the launcher. |
| **Device** | The device type reported by the browser, or the machine's host name for AYON clients. |
| **Country**, **City** | Location looked up from the IP address. Empty for internal addresses and on servers without a GeoIP database. |
| **Last active** | When the session was last used. |
| **Invalidate** | Ends the session at once, without confirmation. Invalidating the current browser's session signs the user out. |

## Session lifetime

A session ends by itself when it has not been used for the session lifetime of the server, 72 hours by default (the `AYON_SESSION_TTL` setting, see [On-premise deployment](../../deployment/on-premise.md#configuration)). Each use extends it. A session used from a different public IP address than the one it was created from is ended, unless the server sets `AYON_DISABLE_CHECK_SESSION_IP`. Signing out ends the session of the current browser only. Changing the password or the profile keeps all sessions; a user who is deactivated loses all of them.

## Permissions

| Action | Who can do it |
|---|---|
| List and invalidate own sessions | Every user except guests |
| List and invalidate other users' sessions | Managers and admins, through the REST API. The web app has no page for it. |

## Related

- [Account](index.md)
- [Profile](profile.md)
- [Users](../studio/users.md)
