---
title: Other
description: "The Other tab of the AYON inbox: every status change that reaches the user, and activity on tasks, versions and folders the user is related to as assignee or author without watching them; its unread count, and why it never notifies."
verified: 2026-11-15
ui_purpose: "Status changes and activity on entities the user is related to without watching them. Does not notify."
ui_location: "Inbox > Other"
ui_url: /inbox/other
ui_access: "Everyone except guests"
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/Inbox/Inbox.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/resolvers/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/create_activity.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/references.py
---

# Other

<PageInfo />

![The Other tab with no messages, showing All caught up! No messages to show.](../../assets/web-ui/inbox/other.webp)

**Other** is the second tab of the [Inbox](index.md). It lists every status change that reaches the user, and the activity on entities the user is related to, as assignee or author, without watching them. New messages here update the unread count but never notify, so the tab suits a look now and then. Mentions and activity on watched entities go to [Important](important.md). The layout, filters and actions are described on the [Inbox](index.md) page.

## What lands here

A message lands here when the user's reference to the activity is a relation, or when the activity is a status change, whatever the reference.

| Activity | Why |
|---|---|
| A status change of a folder, task, product or version the user watches or is related to | Status changes never go to **Important** |
| Activity on a task the user is assigned to | Relation (assignee) |
| Activity on a version of a task the user is assigned to | Relation (assignee) |
| Activity on a folder that directly contains a task the user is assigned to | Relation (assignee) |
| Activity on a version the user is the author of | Relation (author) |

A relation counts only when the user neither watches the entity nor is mentioned; otherwise the message goes to [Important](important.md). Assignees watch their tasks and authors watch their versions automatically, so relations land here mainly for activity on folders and for users who stopped watching. See [Watchers](index.md#watchers).

## Controls and interactions

- The tab shows the number of unread messages, up to **99+**. Its tooltip reads **Changes to tasks assigned to you or authored by you**.
- The dot on the **Inbox** button does not count this tab, and its messages bring no toast, desktop notification or chime.
- Messages are newest first, with day dividers.
- **Unread**, **Clear read** and **Clear all** act on this tab only.
- The **Reason** filter offers **Mentioned**, **Watching** and **Related**.

## Related

- [Inbox and notifications](index.md)
- [Important](important.md)
- [Cleared](cleared.md)
- [Details panel](../details-panel.md)
