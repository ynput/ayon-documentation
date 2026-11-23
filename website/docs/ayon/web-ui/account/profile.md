---
title: Profile
description: "The Profile page of the AYON web app's Account: the signed-in user's avatar, username, full name, email and custom user attributes, the password dialog, the Desktop notifications and Notification sound switches, Save profile, and the Personal API keys section of the Power Pack."
verified: 2026-11-15
ui_purpose: "Where users edit their own account: avatar, full name, email, password, custom attributes and how they are notified of new inbox messages."
ui_location: "User menu > Account > Profile"
ui_url: /account/profile
ui_shortcut: "0 opens the User menu"
ui_access: "Everyone except guests"
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/ProfilePage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/PersonalApiKeysPreview.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Avatar/Avatar.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/UsersSettings/UserAttribForm.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/UsersSettings/SetPasswordDialog.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/users/users.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/users/avatar.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/auth/utils.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
---

# Profile

<PageInfo />

![The Profile page: the avatar and full name at the top, the Profile card with Save profile, Username, Full name, E-Mail, Password, Desktop notifications and Notification sound, and the Personal API keys card on the right](../../assets/web-ui/account/profile.webp)

The Profile page is where users edit their own account: the avatar, the full name and email, the custom user attributes of the server, the password, and how the web app notifies them of new [inbox](../inbox/index.md) messages. Managers edit the same values of other users on the [Users](../studio/users.md) page, together with what is not on this page: the access level, access groups, active state and password login.

## Profile card

The avatar and the full name are at the top. Below them, the **Profile** card holds the form; sections added by addons, such as **Personal API keys**, are next to it, or below it on narrow screens.

### Avatar

<Columns widths="65 35">
<Column>

The edit button on the avatar opens **Upload photo...** (a PNG or JPEG file) and **Reset to default**. Both take effect at once, without **Save profile**. Without an uploaded photo, the avatar comes from the **Avatar URL** attribute when it is set, otherwise it shows the user's initials.

</Column>
<Column>

![The avatar with its edit menu open: Upload photo... and Reset to default](../../assets/web-ui/account/avatar-menu.png "Avatar menu")

</Column>
</Columns>

### Fields

| Field | What it does |
|---|---|
| **Username** | The login name. Read-only. |
| **Full name**, **E-Mail** | Built-in user attributes. Spaces around the values are removed when saved. |
| Custom user attributes | Every other attribute with the user scope, below a divider. Attributes with a list of values are dropdowns, boolean attributes are switches. **Avatar URL** and **Developer mode** are not shown. |
| **Password** | A masked field with an edit button that opens the password dialog. Hidden when password login is disabled for the user. |
| **Desktop notifications** | Shows a notification for new [Important](../inbox/important.md) messages: a desktop notification while the web app is in the background, a toast while it is in front. Disabled unless the server is reached over HTTPS or as `localhost`, with the tooltip **Browser notifications only work over HTTPS**. |
| **Notification sound** | Plays a chime for new Important messages while the web app is in the background. Works independently of **Desktop notifications**. |
| **Save profile** | Saves the fields and both switches. Active when something has changed. |

### Password dialog

<Columns widths="60 40">
<Column>

The dialog, titled **Set password for:** and the username, has **New Password** and **Confirm Password**. **Set Password** is active when both are filled; different values are refused with "Passwords do not match".

The current password is not asked for. By default the server requires at least 8 characters with letters, digits and special characters (the `AYON_AUTH_PASS_MIN_LENGTH` and `AYON_AUTH_PASS_COMPLEX` settings). Changing the password does not end the user's other sessions; they can be ended on the [Sessions](sessions.md) page.

</Column>
<Column>

![The Set password for: demouser10 dialog with New Password, Confirm Password and Set Password](../../assets/web-ui/account/password-dialog.png "Password dialog")

</Column>
</Columns>

## Controls and interactions

### Enabling desktop notifications

Switching **Desktop notifications** on and saving asks the browser for permission to show notifications. When the browser blocks notifications for the server, or the request is denied, the switch is turned off again. The **Enable notifications** button of the inbox does the same in one click. See [Real-time notifications](../inbox/index.md#real-time-notifications).

## Power features

These features need the [Power Pack](../../../addons/production-tracking/power-pack/index.md) and a license.

### Personal API keys

The **Personal API keys** card lets users create API keys of their own, for example for a script or an AI assistant. A key works as the user, with the user's access. Without the Power Pack, the card shows a preview with **Create API key**, which explains the feature. When the Power Pack is licensed but too old to provide the keys, the card reads "Update Power Pack to use personal API keys." Guests do not see it.

![The Personal API keys card with no keys yet: the text You have no personal API keys, the Name field with the placeholder What the key is for, the Expires date and the Create key button, and the note Keys expire within 90 days at most](../../assets/web-ui/account/personal-api-keys.webp)

| Element | What it does |
|---|---|
| **Name** | What the key is for, up to 100 characters. Two keys of one user cannot have the same name. |
| **Expires** | The day the key stops working: from tomorrow up to the maximum lifetime, 90 days unless the studio changed it in the [Power Pack settings](../../../addons/production-tracking/power-pack/settings.md#personal-api-keys). The default is 30 days from today, or the maximum lifetime when it is shorter. |
| **Create key** | Creates the key and shows it once. |
| Key rows | The keys of the user, each with its name, a masked preview (`8df2*****7f54`), the creation and expiry dates and a delete button that revokes the key at once, after a confirmation. |

A new key appears in a panel above the list with the text "Copy it now: you won't be able to see it again" and a copy button. **Done** closes the panel; after that only the masked preview remains.

From Power Pack 1.8.3, when the production bundle has the [AYON MCP server addon](../../../addons/production-tracking/mcp/index.md), the panel also has **Connect an MCP client...**, which lists ready-made configurations that connect an AI assistant to this server with the new key:

- **Claude Code: terminal command**
- **Claude Code: entry for a project's .mcp.json**
- **VS Code: entry for .vscode/mcp.json**
- **Claude Desktop: entry for claude_desktop_config.json**

The chosen configuration shows with a copy button and a short instruction for where to paste it. It uses the address of the server as the browser reaches it, followed by `/api/mcp`; an assistant that reaches AYON at another address needs that address changed after pasting. On a server without HTTPS, the Claude Desktop entry allows plain HTTP and the instruction warns that the key travels unencrypted.

![A new key named AYON MCP: the key with a copy button, the VS Code entry for .vscode/mcp.json chosen in Connect an MCP client, its JSON with the server address and the key and a copy button, the instruction to paste it inside servers and keep the file out of git, the Done button, and the saved key row below with its masked preview, dates and delete button](../../assets/web-ui/account/personal-api-keys-new-key.webp)

When the studio turns personal API keys off in the Power Pack settings, the card reads "Creating personal API keys is turned off in this studio." Admins can also see and revoke the personal API keys of any user in the user details of [Users](../studio/users.md).

## Related

- [Account](index.md)
- [Sessions](sessions.md)
- [Users](../studio/users.md)
- [Attributes](../studio/attributes.md)
- [Inbox and notifications](../inbox/index.md)
