---
title: Cleared
description: "The Cleared tab of the AYON inbox holds the messages cleared from Important and Other, which can be restored to their tab as unread."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/7870202-inbox-and-notifications
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/Inbox/Inbox.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/components/InboxSearchFilter.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/services/inbox/getProjectInbox.ts
  - https://github.com/ynput/ayon-backend/blob/develop/api/inbox/inbox.py
  - https://github.com/ynput/ayon-backend/blob/develop/schemas/schema.public.sql
---

# Cleared

**Cleared** is the third tab of the [inbox](index.md). It holds the messages cleared from [Important](important.md) and [Other](other.md), together in one list. Clearing a message also marks it read; restoring it (**Unclear**) returns it to its original tab as unread.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Cleared | **Cleared** tab of the inbox | | `/inbox/cleared` | Everyone |

## What lands here

| How a message is cleared | Where |
|---|---|
| **Clear** button on the message, `C`, or **Clear** in the context menu | [Important](important.md), [Other](other.md) |
| **Clear read** | Read messages of the tab |
| **Clear all**, `Shift`+`C` | All messages of the tab, or, with filters active, the matching messages loaded in the list |

New activity never arrives on this tab directly.

## Layout and controls

The layout, filters and selection are those of the [inbox](index.md#layout-and-controls). Differences from the other tabs:

| Item | On **Cleared** |
|---|---|
| Tab | No unread count. |
| Messages list | Messages of both tabs, newest first, without day dividers. |
| **Unread**, **Clear read**, **Clear all** | Not shown. |
| **Enable notifications**, **Refresh** (`R`) | Available. |
| **Reason** filter | **Mentioned**, **Watching** and **Related**. |

## Actions on messages

| Action | Shortcut | What it does |
|---|---|---|
| **Unclear** | `C` | Moves the message back to **Important** or **Other**, by the same rule that placed it there, and marks it unread. On a row of a multiple selection the button reads **Unclear selection**; the context menu shows **Unclear** followed by the number of messages. |
| **Mark as read** / **Mark as unread** | | Shown in the context menu but disabled. `X` does nothing on this tab. |
| Restore all | `Shift`+`C` | Has no button on this tab, but restores every cleared message, in all projects or in the selected project, as unread. With filters active, restores the matching messages loaded in the list. |

## Related

- [Inbox and notifications](index.md)
- [Important](important.md)
- [Other](other.md)
