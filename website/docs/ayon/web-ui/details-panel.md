---
title: Details panel
description: "The details panel of the AYON web app, the side panel that opens for a selected entity on most pages: header, tabs and actions, the activity feed with comments, mentions, checklists, attachments, reactions and comment categories, and the attributes of the entity."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/0219162-the-details-panel
  - https://help.ayon.app/en/articles/8709483-activity-feed-and-comments
---

# Details panel

The details panel is the side panel that shows one or more selected entities (folders, tasks, versions and representations) and lets users edit their core fields, read and write comments, and open actions. It is the shared place for communication about an entity across the web app.

## Where it appears

The panel opens when an entity is selected or opened on these pages:

- [Project overview](production-tracking/overview.md)
- [Task progress](production-tracking/task-progress.md)
- [Products and versions](production-tracking/products.md)
- [Browser](production-tracking/browser.md)
- [Inbox and notifications](inbox/index.md)
- [Tasks home](home/tasks.md)
- The media viewer used for [reviews](../../addons/production-tracking/review/index.md)

An entity opened from a link (a shared URL or an AYON URI) opens the panel on that entity. The panel can be opened for entities of one project at a time; with a selection that spans several projects it still shows the entities, but commenting is disabled.

Opening an entity from inside a panel (a mentioned version, a linked entity) opens a second, slide-out panel next to the first.

## Layout

From top to bottom:

| Region | Content |
|---|---|
| Toolbar | Entity path (breadcrumb), **More actions** menu, **Watchers** selector, and a close button (**Escape**). |
| Header | Thumbnail, title with tags, subtitle (entity type and path or version details), status selector, assignee selector, web actions, priority selector and the tab buttons. |
| Body | The selected tab: activity feed, subtasks, version files or details. |

With several entities selected, the header shows stacked thumbnails and the combined values of the selection. Changing a field applies to every selected entity.

### Header

| Element | What it shows or does |
|---|---|
| Thumbnail | The entity thumbnail. For an entity with reviewables, a play badge is shown and clicking the thumbnail opens the viewer. |
| Title and tags | Name of the entity. The tag selector shows and edits its tags. |
| Subtitle | Entity type and the folder path. For versions a row with the linked task is shown. |
| Status | Shows and changes the status. Statuses available depend on the entity type and the project. |
| Assignees | For tasks, the assigned users, editable. For versions, the author, read-only. Not shown for folders. |
| Web actions | Actions registered for the entity, such as launching applications through the AYON launcher. |
| Priority | The `priority` attribute, if it is available for the entity type. |

### Tabs

| Tab | Icon or label | Entity types | Content |
|---|---|---|---|
| Activity feed | Forum icon | Folders, tasks, versions | Comments and activity. See [Activity feed](#activity-feed). |
| Subtasks | Checklist icon | Tasks | The task's subtasks. See [Subtasks](../../production-tracking/subtasks.md). |
| Version files | Play-list icon | Versions | The version's reviewables and its representations. See [Reviewables](../../production-tracking/reviewables.md). |
| Details | **Details** | All | Description and attributes. |

Representations have the **Details** tab only. If the selected tab does not exist for the next selected entity, the panel switches to the activity feed.

### More actions menu

| Entry | Available when | What it does |
|---|---|---|
| **Open in viewer** | A folder, task, product or version is shown. | Opens the media viewer on the entity. |
| **Picture in picture** | Always. | Opens the panel in a floating window that stays while navigating to other pages. |
| **Upload thumbnail** | A single entity is shown. | Replaces the entity thumbnail with a chosen image. Files dropped on the panel can also be used. |
| **Upload version** | A single non-representation entity is shown on a page that supports version upload. | Uploads a media file as a new version. See [Versions without a pipeline](../../production-tracking/versions-without-a-pipeline.md). |
| **Add to list** | The page provides lists. | Adds the selected entities to a [list](production-tracking/lists.md). |
| **Add to session** | Versions, when the Review addon is installed. Disabled when no selected version has reviewables. | Adds the versions to a review session list. See [Review sessions](../../addons/production-tracking/review/index.md). |
| **Share** | Folders, tasks, products, versions and representations. | Shows a link to the entity. Folders and tasks link to the project overview, the others to the products page. |
| **View data** | Always. | Shows the raw data of the entity. |
| **Delete** | The page provides entity deletion. | Deletes the shown entities after confirmation. |

## Activity feed

The activity feed is the timeline of everything that happens to an entity: comments, status changes, assignee changes, attribute changes and published versions. It is the first tab of the panel and is available for folders, tasks and versions. Products and representations have no feed.

### Activity types

| Type | Shown as |
|---|---|
| Comment | A message with author, time, rich text, attachments, checklists and reactions. |
| Status change | The old and new status. |
| Assignee change | A user added to or removed from a task. |
| Attribute, tag and type change | The changed field with old and new value. |
| Version published | A published version with its thumbnail, product and version name. Selecting it opens the version in a slide-out panel. |
| Version review | A review result (approved or changes requested) given on a version. |

Several minor changes by the same user in a row are grouped into one item.

#### Relations

Some activities belong to a second entity besides their origin. A comment written on a version is also shown in the feed of the version's task, and a version published for a task appears in that task's feed. Watchers of the task are notified of a new published version (see [Inbox and notifications](inbox/index.md)).

### Feed filter

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

### Writing comments

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

#### Mentions

| Trigger | Mentions | Suggestions |
|---|---|---|
| `@` | Users and teams of the project. `user:` or `team:` before the search text limits the list to one kind. | Project users and [teams](project/teams.md) |
| `@@` | Versions | Versions related to the entity, latest first |
| `@@@` | Tasks | Sibling tasks of the same folder |

A mention makes the comment appear in the feed of the mentioned entity, and notifies mentioned users. Guests cannot use mentions.

#### Checklists

Any user who can see a comment can check and uncheck its checklist items. Checklists do not change the status of the task. The **Checklists** filter shows the progress as checked items over total items.

#### Attachments

Any file type can be attached. Images are previewed in the web app. Files are added with the attach button, by drag and drop, or by pasting from the clipboard. Attachments are stored on the AYON server upload storage, and a background process removes files whose comment was deleted. No file size limit is applied by the web app.

#### Frame links

On a version, a comment can carry a frame number or a frame range. In the viewer, the link jumps to that frame.

#### Reactions

Comments take reactions from a fixed set of five: thumbs up, thumbs down, heart, celebration and notes. Reactions do not send notifications and do not affect watchers. The REST API accepts other reaction types than the web app offers.

### Comment menu

| Entry | Available to |
|---|---|
| **Edit** | The author and administrators. |
| **Copy text** | Everyone who can see the comment. |
| **Duplicate** | Where duplicating is enabled. |
| **Copy link** | Everyone who can see the comment. Copies a link that opens the entity at the comment. |
| **Delete** | The author and administrators, after confirmation. |

### Comment categories

A comment category limits who sees a comment. A category has a name, a color and an access list. Categories require the Power Pack addon (see [Power Pack](../../addons/production-tracking/power-pack/index.md)); without it the category selector is shown disabled.

| Aspect | Behavior |
|---|---|
| Selector | Shown in the comment box to users with **Creator** access to at least one category, and to administrators. Without a choice the comment has no category. |
| Display | A categorized comment is highlighted in the category color. |
| Visibility | Users without access to the category do not see the comment at all. |
| Access levels | **Viewer** sees comments of the category. **Creator** sees and writes them. Users not on the list have no access. Administrators and managers have full access to every category. |
| Configuration | Categories are defined in the Power Pack studio settings and can be overridden per project, where project [teams](project/teams.md) can be added to the access list. |
| Guests | Guests never see the selector or category names. Guest comments in review sessions are categorized by the server. See [Review sessions](../../addons/production-tracking/review/index.md). |

### Activity permissions

| Action | Requirement |
|---|---|
| Read the feed | Read access to the entity. |
| Comment | Any member, unless the access group restricts activities and omits **Comment**. Managers and administrators are never restricted. Disabled when entities of several projects are selected. |
| Guests | May comment only in review sessions where their email has a category assigned. |
| Edit and delete | Author and administrators. |

## Details tab

| Section | Content |
|---|---|
| Description | The `description` attribute, editable with mentions of users, versions and tasks. Mixed values across a selection are marked. |
| Fields | Editable: name, label, folder type or task type, status, tags, and every attribute whose scope includes the entity type. See [Attributes](studio/attributes.md). |
| Details | Read-only: id, entity type, project name, path, created and updated time. |

Rules:

- The folder type of a folder that has published versions is locked.
- For versions, only status and tags are editable; name, label and built-in attributes are read-only.
- Fields the user has no write permission for cannot be changed (see [Users](studio/users.md)).

## Watchers

The **Watchers** selector in the toolbar lists the users who receive notifications for the entity. Users can be added or removed for the whole selection. Watching and notification behavior is described in [Inbox and notifications](inbox/index.md).

## Keyboard

| Key | Action |
|---|---|
| `Escape` | Closes the panel. Ignored while typing in a field, and while the viewer or a slide-out panel is open on top. |

See [Keyboard shortcuts](quick-navigation.md#keyboard-shortcuts) for the other shortcuts.

## Permissions

- Editing fields, status and assignees follows the user's project access group (attribute write, status and assignee restrictions).
- Commenting is disabled for guests outside review sessions, and for users whose access group restricts activities and omits **Comment**.
- Deleting depends on the delete restrictions of the access group.

## Related

- [Upload version](dialogs/upload-version.md)
- [Subtasks](../../production-tracking/subtasks.md)
- [Reviewables](../../production-tracking/reviewables.md)
- [Links manager](links-manager.md)
- [Navigation bar](navigation-bar.md)
