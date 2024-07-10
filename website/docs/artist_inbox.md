---
id: artist_inbox
title: Inbox and Notifications
sidebar_label: Inbox and Notifications
---

:::info
The inbox was introduced in `1.2.0`.
:::

![Inbox overview](./assets/inbox/inbox_important.png)

### Overview

The inbox is an email-inspired feature that consolidates all your updates and notifications across AYON. Designed for more than just listing notifications, it serves as a hub of organization and prioritization. With two tabs, "Important" and "Other," it ensures that crucial messages don't get lost in the production noise. Related notifications, such as multiple messages about the same folder, are grouped together for better clarity.

Think of the inbox as a dynamic to-do list for tasks that require your attention. You can mark messages as read to revisit them later, or clear them once you're done to keep your workflow organized.

:::tip
The inbox has full keyboard support! Hover over any message and press `X` to mark it as read/unread or `C` to clear/unclear.
:::

### Important VS Other

Currently, what qualifies as "Important" or "Other" is pre-set. However, future updates will allow you to customize the importance of messages.

**Important**

-   You are directly mentioned in the comment. For example: `Looks great @Felix Peterson`.
-   You are assigned to or removed from a task.

**Other**

-   You are removed from a task.
-   New activity on entities you are assigned to or have authored, including:
    -   Comments
    -   Status changes
    -   Assignee changes

### Realtime Notifications

Enable browser push notifications to stay aware of new important inbox messages. You can activate these notifications from the inbox or your account profile page.

You can also enable notification sounds for added awareness.

![Turn on notifications](./assets/inbox/inbox_enable.png)
![Turn on notifications in account](./assets/inbox/notifications_account_settings.png)

:::tip
Desktop notifications and notification sounds work independently to one another.
:::

:::warning
Desktop notifications will not work over HTTP connections due to strict browser security measures.
:::
