---
title: Account
description: "The Account space of the AYON web app: how it opens from the User menu, and its Profile, Sessions and Launchers tabs for the signed-in user's own profile, sign-in sessions and launcher downloads."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/AccountPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/UserMenu/UserMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/UserMenu/UserMenuHeader.jsx
---

# Account

Account is the part of the web app that belongs to the signed-in user: their profile and preferences, the sessions they are signed in with, and the launcher installers to download. All its pages live under the route `/account/` and share one row of tabs. Other users' accounts are managed on the [Users](../studio/users.md) page of Studio Settings.

## Where it appears

| Item | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Account | **User** menu, **Account** | `0` opens the User menu | `/account/profile` | Everyone except guests |
| Launchers | **User** menu, **Download Launcher** | `0` opens the User menu | `/account/downloads` | Everyone except guests |

The User menu opens from the avatar at the right end of the top bar. Its header shows the username and the full name. A user without a full name sees **Set Full Name** there instead, which opens **Profile**. The bare path `/account` and unknown tab paths open **Profile**.

## Tabs

| Tab | URL path | Page |
|---|---|---|
| **Profile** | `/account/profile` | [Profile](profile.md) |
| **Sessions** | `/account/sessions` | [Sessions](sessions.md) |
| **Launchers** | `/account/downloads` | [Launchers](launchers.md) |

## Related

- [Navigation bar](../navigation-bar.md#user-menu)
- [Users](../studio/users.md)
- [Inbox and notifications](../inbox/index.md)
