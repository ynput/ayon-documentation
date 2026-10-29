---
title: Profile
description: "The Profile tab of the AYON web app's Account space: the signed-in user's avatar, username, full name, email and custom user attributes, password change, desktop notifications and notification sound."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/ProfilePage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Avatar/Avatar.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/UsersSettings/UserAttribForm.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/UsersSettings/SetPasswordDialog.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/users/users.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/users/avatar.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/auth/utils.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
  - https://github.com/ynput/ayon-backend/blob/develop/setup/attributes.py
---

# Profile

The **Profile** tab is where a user edits their own account: the avatar, the full name and email, the custom user attributes of the server, the password, and how the web app notifies them of new inbox messages. The same values of other users are edited by managers on the [Users](../studio/users.md) page.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Profile | **User** menu, **Account** | `0` opens the User menu | `/account/profile` | Everyone except guests |

## Layout and controls

The page is a single column: the avatar with the full name below it, then a form, then **Save profile**.

| Control | What it does |
|---|---|
| Avatar | The user's picture. The edit button on it opens a menu with **Upload photo...** (a PNG or JPEG file) and **Reset to default**. Both take effect at once, without **Save profile**. Without an uploaded photo the avatar comes from the **Avatar URL** attribute when it is set, otherwise it shows the user's initials. |
| **Username** | The login name. Read-only. |
| **Full name**, **E-Mail** | Built-in user attributes. Spaces typed in the email are removed. |
| Custom user attributes | Every other attribute with the user scope, below a divider. Attributes with a list of values are dropdowns, boolean attributes are switches. **Avatar URL** and **Developer mode** are not shown here. |
| **Password** | Masked field with an edit button that opens the password dialog. Hidden when password login is disabled for the user. |
| **Desktop Notifications** | Shows a notification for new important inbox messages: a desktop notification while the web app is in the background, a message in the corner while it is in front. Disabled unless the server is reached over HTTPS or as `localhost`. |
| **Notification Sound** | Plays a chime for new important inbox messages while the web app is in the background. Works independently of **Desktop Notifications**. |
| **Save profile** | Saves the attributes and both notification switches. Active when something has changed. |

### Password dialog

| Control | What it does |
|---|---|
| **New Password**, **Confirm Password** | The new password, typed twice. |
| **Set Password** | Saves the password. Active when both fields are filled; refused with "Passwords do not match" when they differ. |

The current password is not asked for. The server requires at least 8 characters with letters, digits and special characters by default (the `AYON_AUTH_PASS_MIN_LENGTH` and `AYON_AUTH_PASS_COMPLEX` settings); passwords set by admins are not checked. Changing the password does not end the user's other sessions; they can be ended on the [Sessions](sessions.md) tab.

### Enabling desktop notifications

Switching **Desktop Notifications** on and saving asks the browser for permission to show notifications. When the browser has blocked notifications for the server, or the request is denied, the web app shows a warning and turns the switch off again. See [Inbox and notifications](../inbox/index.md#real-time-notifications).

## Permissions

| Change | Who can make it |
|---|---|
| Own attributes, avatar, password, notification switches | Every user except guests |
| Access level, access groups, active state, password login | Not on this page. Managers and admins change them on the [Users](../studio/users.md) page. |

## Related

- [Account](index.md)
- [Sessions](sessions.md)
- [Users](../studio/users.md)
- [Attributes](../studio/attributes.md)
- [Inbox and notifications](../inbox/index.md)
