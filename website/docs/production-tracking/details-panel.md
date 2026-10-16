---
title: Details panel
description: "The details panel shows an entity's identity, status, assignees, activity and attributes and appears on most pages of the AYON web app."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/0219162-the-details-panel
---

# Details panel

The details panel is the side panel that shows one or more selected entities (folders, tasks, versions and representations) and lets users edit their core fields, read and write comments, and open actions. It is the shared place for communication about an entity across the web app.

## Where it appears

The panel opens when an entity is selected or opened on these pages:

- [Project overview](project-overview.md)
- [Task progress](task-progress.md)
- [Products and versions](products-and-versions.md)
- [Browser](browser.md)
- [Inbox and notifications](inbox-and-notifications.md)
- [Tasks home](tasks-home.md)
- The media viewer used for [reviews](../addons/production-tracking/review/index.md)

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
| Activity feed | Forum icon | Folders, tasks, versions | Comments and activity. See [Activity feed and comments](activity-feed-and-comments.md). |
| Subtasks | Checklist icon | Tasks | The task's subtasks. See [Subtasks](subtasks.md). |
| Version files | Play-list icon | Versions | The version's reviewables and its representations. See [Reviewables](reviewables.md). |
| Details | **Details** | All | Description and attributes. |

Representations have the **Details** tab only. If the selected tab does not exist for the next selected entity, the panel switches to the activity feed.

### More actions menu

| Entry | Available when | What it does |
|---|---|---|
| **Open in viewer** | A folder, task, product or version is shown. | Opens the media viewer on the entity. |
| **Picture in picture** | Always. | Opens the panel in a floating window that stays while navigating to other pages. |
| **Upload thumbnail** | A single entity is shown. | Replaces the entity thumbnail with a chosen image. Files dropped on the panel can also be used. |
| **Upload version** | A single non-representation entity is shown on a page that supports version upload. | Uploads a media file as a new version. See [Versions without a pipeline](versions-without-a-pipeline.md). |
| **Add to list** | The page provides lists. | Adds the selected entities to a [list](lists.md). |
| **Add to session** | Versions, when the Review addon is installed. Disabled when no selected version has reviewables. | Adds the versions to a review session list. See [Review sessions](../addons/production-tracking/review/index.md). |
| **Share** | Folders, tasks, products, versions and representations. | Shows a link to the entity. Folders and tasks link to the project overview, the others to the products page. |
| **View data** | Always. | Shows the raw data of the entity. |
| **Delete** | The page provides entity deletion. | Deletes the shown entities after confirmation. |

## Details tab

| Section | Content |
|---|---|
| Description | The `description` attribute, editable with mentions of users, versions and tasks. Mixed values across a selection are marked. |
| Fields | Editable: name, label, folder type or task type, status, tags, and every attribute whose scope includes the entity type. See [Attributes](../ayon/web-ui/attributes.md). |
| Details | Read-only: id, entity type, project name, path, created and updated time. |

Rules:

- The folder type of a folder that has published versions is locked.
- For versions, only status and tags are editable; name, label and built-in attributes are read-only.
- Fields the user has no write permission for cannot be changed (see [Users and permissions](../ayon/web-ui/users-and-permissions.md)).

## Watchers

The **Watchers** selector in the toolbar lists the users who receive notifications for the entity. Users can be added or removed for the whole selection. Watching and notification behavior is described in [Inbox and notifications](inbox-and-notifications.md).

## Keyboard

| Key | Action |
|---|---|
| `Escape` | Closes the panel. Ignored while typing in a field, and while the viewer or a slide-out panel is open on top. |

See [Keyboard shortcuts](../ayon/web-ui/keyboard-shortcuts.md) for the other shortcuts.

## Permissions

- Editing fields, status and assignees follows the user's project access group (attribute write, status and assignee restrictions).
- Commenting is disabled for guests outside review sessions, and for users whose access group restricts activities and omits **Comment**.
- Deleting depends on the delete restrictions of the access group.

## Related

- [Activity feed and comments](activity-feed-and-comments.md)
- [Subtasks](subtasks.md)
- [Reviewables](reviewables.md)
- [Links manager](links-manager.md)
- [Navigating the web app](../ayon/web-ui/navigating-the-web-app.md)
