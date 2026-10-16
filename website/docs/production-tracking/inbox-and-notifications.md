---
title: Inbox and notifications
description: "The inbox collects activity relevant to the current user across projects, sorted into Important, Other and Cleared, with watchers and real-time notifications."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7870202-inbox-and-notifications
---

# Inbox and notifications

The **inbox** consolidates the activity that concerns the current user across all projects: mentions, comments on watched entities, assignments, status changes and publishes. Messages are split into **Important** and **Other** tabs, related messages are grouped, and each message can be marked read or cleared, so the inbox works as a to-do list of items needing attention.

## Where it appears

| Item | Value |
|---|---|
| Header | Inbox icon. It carries an indicator when unread messages exist. |
| Shortcut | `I`, `I` opens **Important** |
| URL path | `/inbox/important`, `/inbox/other`, `/inbox/cleared`. `/inbox` redirects to `/inbox/important`. |

## Tabs

| Tab | Content |
|---|---|
| **Important** | Messages that reference the user as a mentioned user or as a watcher, except status changes. Shows an unread count (up to 99+). |
| **Other** | Messages where the user only has a relation to the entity (assigned to it, or author of it), and all status changes. Shows an unread count. |
| **Cleared** | Messages that were cleared from the other two tabs, of both kinds. |

Activity created by the user is never shown.

### Which messages are important

| Event | Reference of the recipient | Tab |
|---|---|---|
| The user is mentioned in a comment | Mentioned | Important |
| The user is assigned to a task | Mentioned | Important |
| Activity on an entity the user watches (comment, reviewable, publish, assignment change) | Watching | Important |
| Activity on an entity the user is assigned to or has authored | Related | Other |
| A status change on any entity the user watches, is assigned to or has authored | Watching or related | Other |

## Watchers

A watcher receives important messages about an entity. Users become watchers automatically when they:

- post a comment or other activity on the entity,
- post a reviewable on a version,
- publish a version (the author of the version also watches it),
- are assigned to a task.

Removing an assignee removes the watcher. Watchers of a task also watch the versions published from it.

The **Watchers** control in the toolbar of the [details panel](details-panel.md) lists the watchers of the entity and lets users add or remove watchers.

## Layout

| Region | Content |
|---|---|
| Projects panel (left) | List of projects. Selecting one switches to project mode, selecting it again returns to the cross-project inbox. Not shown to guests. |
| Toolbar | Filter bar, **Unread** toggle, **Enable notifications**, **Clear read**, **Clear all**, **Refresh**. |
| Messages list | Messages, newest first, with day dividers on **Important** and **Other**. |
| Details panel (right) | The selected message's entity and its activity feed. See [Activity feed and comments](activity-feed-and-comments.md). |

### Messages

A message shows the entity path, the type of activity, the author and the date. Messages about the same entity and activity type are grouped into one row with an unread count. Selecting a message marks it read and, for comments, highlights them in the activity feed.

## Toolbar controls

| Control | What it does |
|---|---|
| Filter bar | Filters messages. Available in project mode only. See [Filters](#filters). |
| **Unread** | Shows only unread messages. Not on the **Cleared** tab. The setting is kept with the view of the tab. |
| **Enable notifications** | Requests browser permission for desktop notifications. Hidden once permission is granted. Disabled unless the page is served over HTTPS or from localhost. |
| **Clear read** | Clears the read messages, unread ones stay. With filters active, only matching read messages. |
| **Clear all** (`Shift`+`C`) | Clears every message of the tab, or only those matching active filters. |
| **Refresh** (`R`) | Reloads the inbox. |

### Filters

| Filter | Values |
|---|---|
| Comments, Versions, Updates, Checklists, Attachments | On or off. |
| Reviews | **All reviews**, **Approved**, **Requested changes**. |
| Category | Comment categories of the project, and **No category**. |
| Reason | **Mentioned**, **Watching**, **Related** (on **Important**: **Mentioned** and **Watching**). |
| Entity type | Task, Version, Folder. |
| User | Author of the message. |
| Posted date | Date ranges, including a custom range. |

Free text matches the body, the entity name and label and the parents of the entity. The filter is saved with the view of the tab. See [Views](views.md).

## Actions on messages

| Action | Shortcut | What it does |
|---|---|---|
| **Clear** / **Unclear** | `C` | Moves the message to **Cleared**; on **Cleared**, moves it back. Also marks it read. |
| **Mark as read** / **Mark as unread** | `X` | Toggles the read state. Not available on **Cleared**. |

The shortcuts act on the hovered message, or on the whole selection when several are selected. The same actions are in the context menu.

| Key | What it does |
|---|---|
| `Up`, `Down`, `Tab` | Move to the previous or next message. |
| `Shift`+`Up`/`Down`, `Shift`+click | Extend the selection as a range. |
| `Ctrl`/`Cmd`+click | Add or remove a message from the selection. |

## Real-time notifications

When a new important message arrives:

- With the page focused, a toast appears. Selecting it opens the inbox.
- With the page in the background, a desktop notification appears, if enabled and permitted by the browser.
- A chime plays when notification sound is on and the page is not focused.

Both are set on the account profile page, in **Desktop Notifications** and **Notification Sound**, and work independently of each other. Desktop notifications require an HTTPS connection (or localhost).

## Related

- [Details panel](details-panel.md)
- [Activity feed and comments](activity-feed-and-comments.md)
- [Views](views.md)
- [Keyboard shortcuts](../ayon/web-ui/keyboard-shortcuts.md)
- [Navigating the web app](../ayon/web-ui/navigating-the-web-app.md)
