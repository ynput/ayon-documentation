---
title: Account
description: "The Account pages of the AYON web app: how they open from the User menu, and the Profile, Sessions and Launchers tabs for the signed-in user's own profile and notification settings, sign-in sessions and launcher downloads."
verified: 2026-11-15
ui_purpose: "The signed-in user's own part of the web app: profile and notification settings, sessions, and the launcher installers to download."
ui_location: "User menu (avatar at the top right) > Account"
ui_url: /account/profile
ui_shortcut: "0 opens the User menu"
ui_access: "Everyone except guests"
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/AccountPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/UserMenu/UserMenu.jsx
---

# Account

<PageInfo />

The Account pages belong to the signed-in user: their profile and notification settings, the sessions they are signed in with, and the launcher installers to download. They open from the [User menu](../app-header.md#user-menu), the avatar at the right end of the App header (`0`): **Account** opens **Profile**, and **Download Launcher** opens **Launchers**. Other users' accounts are managed on the [Users](../studio/users.md) page of Studio settings.

| Tab | URL path | What it is for |
|---|---|---|
| **Profile** | `/account/profile` | [Profile](profile.md): the avatar, full name, email, password, custom user attributes and notification switches. |
| **Sessions** | `/account/sessions` | [Sessions](sessions.md): where the user is signed in, and ending those sessions. |
| **Launchers** | `/account/downloads` | [Launchers](launchers.md): the AYON launcher installers hosted on the server. |

The path `/account` and unknown tab paths open **Profile**. The URI bar shows the pages as **Account / Profile**, **Account / Sessions** and **Account / Downloads**.

## Related

- [User menu](../app-header.md#user-menu)
- [Users](../studio/users.md)
- [Inbox and notifications](../inbox/index.md)
