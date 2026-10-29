---
title: Other
description: "The Other tab of the AYON inbox lists status changes and activity on entities the user is related to as assignee or author without watching them."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/7870202-inbox-and-notifications
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/Inbox/Inbox.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/util/inboxFilter.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/resolvers/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/create_activity.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/references.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/event_hook.py
---

# Other

**Other** is the second tab of the [inbox](index.md). It lists every status change that reaches the current user, and the activity on entities the user is related to (as assignee or author) without watching them. New messages here update the unread count but do not notify.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Other | **Other** tab of the inbox | | `/inbox/other` | Everyone |

## What lands here

A message lands here when the user's reference to the activity is a relation, or when the activity is a status change, whatever the reference.

| Activity | Why it lands here |
|---|---|
| Status change of a folder, task, product or version the user watches or is related to | Status changes never go to **Important** |
| Activity on a task the user is assigned to | Relation (assignee) |
| Activity on a version of a task the user is assigned to | Relation (assignee) |
| Activity on a folder that directly contains a task the user is assigned to | Relation (assignee) |
| Activity on a version the user is the author of | Relation (author) |

A relation counts only when the user neither watches the entity nor is mentioned; otherwise the message goes to [Important](important.md). Assignees watch their tasks and authors watch their versions automatically, so relations land here mainly for activity on folders and for users who removed themselves as watchers. See [Watchers](index.md#watchers).

Activity created by the user is not in the inbox.

## Layout and controls

The layout, toolbar, filters and actions are those of the [inbox](index.md#layout-and-controls). On this tab:

| Item | Behavior |
|---|---|
| Tab | Shows the number of unread messages, up to **99+**. |
| Header icon | Not affected: its dot reflects **Important** only. |
| Notifications | None: no toast, desktop notification or chime. |
| Messages list | Newest first, with day dividers. |
| **Unread**, **Clear read**, **Clear all** | Available. **Clear all** and **Clear read** act on this tab only. |
| **Reason** filter | **Mentioned**, **Watching** and **Related**. |
| **Clear** (`C`) | Moves the message to [Cleared](cleared.md) and marks it read. |
| **Mark as read** / **Mark as unread** (`X`) | Available. |

## Related

- [Inbox and notifications](index.md)
- [Important](important.md)
- [Cleared](cleared.md)
- [Details panel](../details-panel.md)
