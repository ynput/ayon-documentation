---
title: Inbox and notifications
sidebar_label: Inbox
description: "The AYON inbox lists the activity that concerns the current user across projects in three tabs, Important, Other and Cleared, with filters, read and clear actions, watchers and real-time notifications."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/7870202-inbox-and-notifications
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/Inbox/Inbox.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxMessage/InboxMessage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/hooks/useGroupMessages.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/hooks/useKeydown.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/components/InboxSearchFilter.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/util/inboxFilter.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxDetailsPanel.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/header/InboxNotification.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/EnableNotifications.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/services/inbox/getInbox.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/Feed/helpers/buildBackendFilter.ts
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/resolvers/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/schemas/schema.public.sql
  - https://github.com/ynput/ayon-backend/blob/develop/api/inbox/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/create_activity.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/event_hook.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/references.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/activities/activity.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/reviewables/create_reviewable.py
---

# Inbox and notifications

The **inbox** lists the activity that concerns the current user across all projects: comments that mention them, activity on entities they watch, assignments, publishes, reviews and status changes. Each activity reaches a user at most once, through one reference: a mention, watching the entity, or a relation to it (assignee or author). The reference and the activity type decide whether the message lands in **Important** or **Other**. Messages can be marked read and cleared, which moves them to **Cleared**, so the inbox works as a list of items still needing attention.

Activity created by the user is never shown in their own inbox.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| [Important](important.md) (default) | Inbox icon in the header | `i+i` | `/inbox/important` | Everyone |
| [Other](other.md) | **Other** tab of the inbox | | `/inbox/other` | Everyone |
| [Cleared](cleared.md) | **Cleared** tab of the inbox | | `/inbox/cleared` | Everyone |

`/inbox` redirects to `/inbox/important`. The inbox icon in the header carries a dot when there are unread messages in **Important**; unread messages in **Other** do not set it. Users with the legacy guest flag get an empty inbox.

## Tabs

| Tab | Content | Unread count on the tab |
|---|---|---|
| **Important** | Activity where the user is mentioned or watches the entity, except status changes. See [Important](important.md). | Yes, up to **99+** |
| **Other** | Activity where the user is only related to the entity (assignee or author), and all status changes. See [Other](other.md). | Yes, up to **99+** |
| **Cleared** | Cleared messages of both tabs. See [Cleared](cleared.md). | No |

Each tab has its own set of [views](../views.md), which store the filter and the **Unread** toggle.

## Layout and controls

| Region | Content |
|---|---|
| Tab bar | **Important**, **Other**, **Cleared**, the views of the current tab, and the help button. |
| Projects panel (left) | The projects the user can access. Selecting a project switches to project mode; selecting it again returns to the cross-project inbox. Not shown to guests. |
| Toolbar | Filter bar, **Unread**, **Enable notifications**, **Clear read**, **Clear all**, **Refresh**. **Unread**, **Clear read** and **Clear all** are not on **Cleared**. |
| Messages list | Messages, newest first, 100 at a time; more load when scrolling to the end (**Load more**). On **Important** and **Other**, day dividers (**Today**, **Yesterday**, then the date) separate the days. With nothing to show: **All caught up! No messages to show.** |
| Details panel (right) | The entity of the selected message with its [activity feed](../details-panel.md). See [Details panel](../details-panel.md). |

The selected project is kept in the `inboxProject` URL query parameter.

### Toolbar

| Control | Shortcut | What it does |
|---|---|---|
| Filter bar | | Filters messages. Works in project mode only; without a project the bar is disabled with the tooltip **Select a project to enable filtering**. See [Filters](#filters). |
| **Unread** | | Shows only unread messages. Stored in the view of the tab. |
| **Enable notifications** | | Asks the browser for permission to show desktop notifications and turns on **Desktop Notifications** in the profile. Hidden once the browser permission is granted. Disabled unless the page is served over HTTPS or from `localhost`. |
| **Clear read** | | Clears the read messages; unread ones stay. Disabled when the list has no read message. With filters active, clears only the matching read messages loaded in the list. |
| **Clear all** | `Shift`+`C` | Clears every message of the tab in all projects, or in the selected project in project mode. With filters or **Unread** active, clears only the matching messages loaded in the list. Disabled when the list is empty. |
| **Refresh** | `R` | Reloads the messages and the unread counts. |

### Messages

| Element | What it shows |
|---|---|
| Thumbnail | Thumbnail or icon of the entity. The tooltip gives the entity type and its subtype. |
| Path | Parents and name of the entity, separated by ` - `. |
| Unread count | Number of unread messages in a group, when there are two or more. |
| Type icon | Activity type, with a tooltip such as **Comment**, **Version published**, **Reviewable uploaded**, **Approved**, **Changes requested**, **Assigned**, **Unassigned** or **Reassigned**. Approvals and change requests have colored icons. |
| Category dots | Comment categories of the messages. |
| Body | Author and text of the newest message; comments are cut after 75 characters. For status changes, the first and last status of the group instead. |
| Author, date | Avatar of the author and the date: relative for today, otherwise month, day and time. |
| **Clear** / **Unclear** | Appears on hover. On a row of a multiple selection: **Clear selection** / **Unclear selection**. |

Unread messages are highlighted. Selecting a message opens its entity in the details panel, marks the message (or the whole group) read, and, for comments, highlights them in the activity feed. Selecting the selected message again deselects it and closes the panel.

### Grouping

| Activity | Grouped when |
|---|---|
| Version publishes and reviewables | When the list holds more than one: grouped per parent folder within 5-minute windows. The row shows the folder and a summary of the publish: the product names for up to four versions, otherwise the number of versions and products. |
| Assignee changes | Additions and removals on the same task within 5 seconds are combined into one **Assigned**, **Unassigned** or **Reassigned** row that names the users. |
| Other activity | Same activity type on the same entity on the same day. |

## Filters

The filter bar is available in project mode. It combines filter chips with free text.

| Filter | Values |
|---|---|
| **Comments** | Comments. |
| **Versions** | Version publishes and reviewables. |
| **Reviews** | **All reviews**, **Approved**, **Requested changes**. |
| **Updates** | Status changes, assignee changes, tag changes and type changes. |
| **Checklists** | Comments containing a checklist. |
| **Attachments** | Activity with attached files. |
| **Category** | Comment categories of the project, and **No category**. Shown when the project has categories. |
| **Reason** | **Mentioned** (comments that mention the user), **Watching**, **Related**. On **Important** only **Mentioned** and **Watching**. |
| **Entity type** | **Task**, **Version**, **Folder**. |
| **User** | The author of the activity, or the assignee of an assignment change. |
| **Posted date** | Date ranges, including a custom range. |

Free text matches the body, the name and label of the entity, and the names of its parents. The filter is stored in the view of the tab.

## Actions on messages

| Action | Shortcut | What it does |
|---|---|---|
| **Clear** / **Unclear** | `C` | On **Important** and **Other**, moves the message to **Cleared** and marks it read. On **Cleared**, moves it back as unread. |
| **Mark as read** / **Mark as unread** | `X` | Toggles the read state. Not available on **Cleared**. |

The actions are on the context menu of a message. With several messages selected, the context menu acts on all of them (**Clear** followed by the number of messages, and **Mark as read** when any is unread). `C` acts on the hovered message, or on the selection when the hovered message is part of it. `X` acts on the selection when several messages are selected, otherwise on the hovered message.

## Keyboard shortcuts

| Key | What it does |
|---|---|
| `Up`, `Down`, `Tab`, `Shift`+`Tab` | Select the previous or next message. |
| `Shift`+`Up` / `Shift`+`Down`, `Shift`+click | Extend the selection as a range. |
| `Ctrl`/`Cmd`+click | Add a message to the selection or remove it. |
| `C` | Clear or unclear. |
| `X` | Mark read or unread. Not on **Cleared**. |
| `Shift`+`C` | **Clear all**. |
| `R` | **Refresh**. |

## Watchers

A watcher receives activity on an entity in **Important** (status changes go to **Other**). Users become watchers automatically when they:

- post a comment or another activity on the entity (service users and guests excepted),
- upload a reviewable to a version,
- publish a version; the author of the version watches it too,
- are assigned to a task.

Removing an assignee removes them as watcher. When a version is published for a task, the watchers of the task become watchers of the version.

The **Watchers** selector in the toolbar of the [details panel](../details-panel.md#watchers) lists the watchers of the entity and lets users add or remove them. Adding yourself from the inbox shows the toast "All future updates for" followed by the entity name and "will appear in your important inbox."

## Real-time notifications

New messages appear in the inbox and update the unread counts without a reload. For a new message in **Important**:

| Condition | Result |
|---|---|
| **Desktop Notifications** on, page focused | A toast with the first line of the message. Selecting it opens **Important**. |
| **Desktop Notifications** on, page not focused, browser permission granted | A desktop notification "New AYON message". Selecting it focuses the page and opens **Important**. |
| **Notification Sound** on, page not focused | A chime. |

Messages for **Other** do not notify. **Desktop Notifications** and **Notification Sound** are set on the account profile page and work independently of each other. **Desktop Notifications** can only be turned on over HTTPS or from `localhost`.

## Permissions

| Rule | Effect |
|---|---|
| Project access | Messages come from the projects the user has an access group in; managers and admins get messages from all projects. |
| Comment categories | Users who are not managers do not see, and are not notified about, activity with a comment category they cannot access. |
| Guests | Legacy guest accounts get no messages and no project mode. |

## Related

- [Important](important.md)
- [Other](other.md)
- [Cleared](cleared.md)
- [Details panel](../details-panel.md)
- [Activity feed](../details-panel.md#activity-feed)
- [Views](../views.md)
- [Keyboard shortcuts](../quick-navigation.md#keyboard-shortcuts)
- [Navigation bar](../navigation-bar.md)
