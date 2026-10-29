---
title: Important
description: "The Important tab of the AYON inbox lists activity where the user is mentioned or watches the entity, except status changes, and is the only tab that triggers notifications."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/7870202-inbox-and-notifications
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/Inbox/Inbox.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/util/inboxFilter.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/components/InboxSearchFilter.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/services/inbox/gql/GetInboxHasUnread.graphql
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/resolvers/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/create_activity.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/event_hook.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/utils.py
---

# Important

**Important** is the default tab of the [inbox](index.md). It lists the activity where the current user is mentioned or watches the entity, except status changes. It is the tab that the header icon, `i+i` and notifications open, and the only one whose new messages trigger notifications.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Important | Inbox icon in the header, **Important** tab | `i+i` | `/inbox/important` | Everyone |

## What lands here

A message is important when the user's reference to the activity is a mention or watching, and the activity is not a status change. An activity reaches each user once; when several references apply, a mention wins over watching, and watching wins over a relation.

| Activity | Why it is important |
|---|---|
| A comment that mentions the user, or a team the user belongs to | Mention |
| The user is assigned to a task, or removed from one | The assignment message mentions the user |
| A comment, review (approval or change request), reviewable or version publish on an entity the user watches | Watching |
| Assignee changes, tag changes and type changes on an entity the user watches | Watching |

Not here:

| Activity | Where it goes |
|---|---|
| Status changes, also on watched entities or with a mention | [Other](other.md) |
| Activity where the user is only an assignee or author, without watching | [Other](other.md) |
| Activity created by the user | Not in the inbox |

Since users watch the tasks they are assigned to and the versions they publish, most activity on their own work lands here. See [Watchers](index.md#watchers).

## Layout and controls

The layout, toolbar, filters and actions are those of the [inbox](index.md#layout-and-controls). On this tab:

| Item | Behavior |
|---|---|
| Tab | Shows the number of unread messages, up to **99+**. |
| Header icon | Carries a dot while this tab has unread messages. |
| Messages list | Newest first, with day dividers. |
| **Unread**, **Clear read**, **Clear all** | Available. **Clear all** and **Clear read** act on this tab only. |
| **Reason** filter | **Mentioned** and **Watching** only. |
| **Clear** (`C`) | Moves the message to [Cleared](cleared.md) and marks it read. |
| **Mark as read** / **Mark as unread** (`X`) | Available. |

## Notifications

A new message on this tab notifies the user as set on the account profile page: a toast while the page is focused, a desktop notification while it is not (**Desktop Notifications**), and a chime while it is not focused (**Notification Sound**). See [Real-time notifications](index.md#real-time-notifications).

## Related

- [Inbox and notifications](index.md)
- [Other](other.md)
- [Cleared](cleared.md)
- [Activity feed](../details-panel.md#activity-feed)
