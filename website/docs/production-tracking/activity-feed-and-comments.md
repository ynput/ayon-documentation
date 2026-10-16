---
title: Activity feed and comments
description: "The activity feed of the details panel: a timeline of comments, status and assignee changes and published versions, with mentions, checklists, attachments, reactions and comment categories."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/8709483-activity-feed-and-comments
---

# Activity feed and comments

The activity feed is the timeline of everything that happens to an entity: comments, status changes, assignee changes, attribute changes and published versions. It is the first tab of the [details panel](details-panel.md) and is available for folders, tasks and versions. Products and representations have no feed.

## Activity types

| Type | Shown as |
|---|---|
| Comment | A message with author, time, rich text, attachments, checklists and reactions. |
| Status change | The old and new status. |
| Assignee change | A user added to or removed from a task. |
| Attribute, tag and type change | The changed field with old and new value. |
| Version published | A published version with its thumbnail, product and version name. Selecting it opens the version in a slide-out panel. |
| Version review | A review result (approved or changes requested) given on a version. |

Several minor changes by the same user in a row are grouped into one item.

### Relations

Some activities belong to a second entity besides their origin. A comment written on a version is also shown in the feed of the version's task, and a version published for a task appears in that task's feed. Watchers of the task are notified of a new published version (see [Inbox and notifications](inbox-and-notifications.md)).

## Feed filter

The search bar at the top of the feed combines text search with filters.

| Filter | Matches |
|---|---|
| **Comments** | Comment activities. Also available as a quick action. |
| **Versions** | Published version activities, ungrouped. |
| **Updates** | Status, assignee, attribute and tag changes. |
| **Checklists** | Comments containing checklist items. Also a quick action, labeled with the checked and total item count when the entity has checklists. |
| **Attachments** | Comments with attached files. |
| **Review session** | Activities from review sessions. Available for versions and folders. |
| **Category** | Comments by comment category, including no category. Shown when the project has categories accessible to the user. |
| **User** | Activities by author. |
| **Posted date** | Activities within a date range. |

The comment box is hidden while a filter is active that excludes comments.

## Writing comments

Comments use a rich text editor that stores GitHub Flavored Markdown: headings, bold, italic, underline, lists, quotes, links, inline code and code blocks.

Typing `/` in the editor opens a menu of block types.

| Entry | Inserts |
|---|---|
| Heading 1, 2, 3 | Headings |
| Bullet list, Numbered list | Lists |
| Checklist | A checklist |
| Quote | A block quote |
| Code block, Inline code | Code |
| YouTube video | An embedded video |
| Image or video | An embedded media file |
| Attachment | A file picker |
| Mention user, version, task | A mention trigger |

The toolbar below the editor adds mention buttons (user, version, task), a frame link (on versions and in the viewer), a category selector, an attach button and the **Comment** button (**Save** while editing).

### Mentions

| Trigger | Mentions | Suggestions |
|---|---|---|
| `@` | Users and teams of the project. `user:` or `team:` before the search text limits the list to one kind. | Project users and [teams](teams.md) |
| `@@` | Versions | Versions related to the entity, latest first |
| `@@@` | Tasks | Sibling tasks of the same folder |

A mention makes the comment appear in the feed of the mentioned entity, and notifies mentioned users. Guests cannot use mentions.

### Checklists

Any user who can see a comment can check and uncheck its checklist items. Checklists do not change the status of the task. The **Checklists** filter shows the progress as checked items over total items.

### Attachments

Any file type can be attached. Images are previewed in the web app. Files are added with the attach button, by drag and drop, or by pasting from the clipboard. Attachments are stored on the AYON server upload storage, and a background process removes files whose comment was deleted. No file size limit is applied by the web app.

### Frame links

On a version, a comment can carry a frame number or a frame range. In the viewer, the link jumps to that frame.

### Reactions

Comments take reactions from a fixed set of five: thumbs up, thumbs down, heart, celebration and notes. Reactions do not send notifications and do not affect watchers. The REST API accepts other reaction types than the web app offers.

## Comment menu

| Entry | Available to |
|---|---|
| **Edit** | The author and administrators. |
| **Copy text** | Everyone who can see the comment. |
| **Duplicate** | Where duplicating is enabled. |
| **Copy link** | Everyone who can see the comment. Copies a link that opens the entity at the comment. |
| **Delete** | The author and administrators, after confirmation. |

## Comment categories

A comment category limits who sees a comment. A category has a name, a color and an access list. Categories require the Power Pack addon (see [Power Pack](../addons/production-tracking/power-pack/index.md)); without it the category selector is shown disabled.

| Aspect | Behavior |
|---|---|
| Selector | Shown in the comment box to users with **Creator** access to at least one category, and to administrators. Without a choice the comment has no category. |
| Display | A categorized comment is highlighted in the category color. |
| Visibility | Users without access to the category do not see the comment at all. |
| Access levels | **Viewer** sees comments of the category. **Creator** sees and writes them. Users not on the list have no access. Administrators and managers have full access to every category. |
| Configuration | Categories are defined in the Power Pack studio settings and can be overridden per project, where project [teams](teams.md) can be added to the access list. |
| Guests | Guests never see the selector or category names. Guest comments in review sessions are categorized by the server. See [Review sessions](../addons/production-tracking/review/index.md). |

## Permissions

| Action | Requirement |
|---|---|
| Read the feed | Read access to the entity. |
| Comment | Any member, unless the access group restricts activities and omits **Comment**. Managers and administrators are never restricted. Disabled when entities of several projects are selected. |
| Guests | May comment only in review sessions where their email has a category assigned. |
| Edit and delete | Author and administrators. |

## Related

- [Details panel](details-panel.md)
- [Inbox and notifications](inbox-and-notifications.md)
- [Review sessions](../addons/production-tracking/review/index.md)
- [Teams](teams.md)
- [Users and permissions](../ayon/web-ui/users-and-permissions.md)
