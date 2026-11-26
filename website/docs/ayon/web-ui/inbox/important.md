---
title: Important
description: "The Important tab of the AYON inbox: comments that mention the user or their team, assignments, and comments, reviews, publishes and other activity on the entities the user watches, except status changes; its unread count, the dot on the Inbox button, and the notifications it triggers."
verified: 2026-11-15
ui_purpose: "The default inbox tab: activity where the user is mentioned or watches the entity. The only tab that notifies."
ui_location: "Inbox button in the App header, or Inbox > Important"
ui_url: /inbox/important
ui_shortcut: i+i
ui_access: "Everyone except guests"
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/Inbox/Inbox.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/components/InboxSearchFilter.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/notifications/NotificationsContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/resolvers/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/create_activity.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/activities/event_hook.py
---

# Important

<PageInfo />

![The Important tab with an unread count of 1, a dot on the Inbox button in the App header, and one unread message: an assignment to the 060_0060 lighting task, under the day divider 1 September 2025](../../assets/web-ui/inbox/important-unread.webp)

**Important** is the default tab of the [Inbox](index.md). It lists the activity where the user is mentioned or watches the entity, except status changes. The **Inbox** button, `i+i` and notifications open it, and it is the only tab whose new messages notify. Status changes and activity on entities the user is only related to go to [Other](other.md). The layout, filters and actions are described on the [Inbox](index.md) page.

## What lands here

A message is important when the user's reference to the activity is a mention or watching, and the activity is not a status change. When several references apply, a mention wins over watching, and watching wins over a relation.

| Activity | Why |
|---|---|
| A comment that mentions the user, or a team the user belongs to | Mention |
| The user is assigned to a task, or removed from one | The assignment message mentions the user |
| A comment, review (approval or change request), reviewable or version publish on an entity the user watches | Watching |
| Assignee, tag and type changes on an entity the user watches | Watching |

Users watch the tasks they are assigned to and the versions they publish, so most activity on their own work lands here. See [Watchers](index.md#watchers). Status changes go to [Other](other.md), even on watched entities or with a mention, and activity created by the user is not in the Inbox.

## Controls and interactions

- The tab shows the number of unread messages, up to **99+**. Its tooltip reads **Activities where you are directly mentioned**.
- The **Inbox** button in the App header carries a dot while this tab has unread messages.
- Messages are newest first, with day dividers.
- **Unread**, **Clear read** and **Clear all** act on this tab only.
- The **Reason** filter offers **Mentioned** and **Watching**.
- A new message notifies as set on the [Profile](../account/profile.md) page: a toast, a desktop notification or a chime. See [Real-time notifications](index.md#real-time-notifications).

## Related

- [Inbox and notifications](index.md)
- [Other](other.md)
- [Cleared](cleared.md)
- [Activity feed](../details-panel.md#activity-feed)
