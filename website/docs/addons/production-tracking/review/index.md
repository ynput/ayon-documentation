---
title: Review addon
sidebar_label: Review
description: "The AYON Review addon (review sessions): playlists of versions with a frame-accurate web player, annotations, comparison, synchronized sessions with a presenter, guest and open-link access, approvals, the actions that create sessions, requirements and server endpoints."
addon: review
addon_repo: ayon-review
addon_version: 1.0.3
addon_scope: server
addon_flags: [licensed]
addon_private: true
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-frontend
  - https://help.ayon.app/en/articles/8669165-review-sessions
---

# Review addon

<AddonInfo />

The Review addon (named **Review**, also called review sessions) adds a review player to the AYON web app. A review session is a playlist of versions, each shown with one of its reviewable files. A team plays the session back, annotates it, compares versions and comments on them, either alone or in a session that stays synchronized between several people. Sessions are stored as lists of the type `review-session`. External people can join a session as guests, by email invitation or through an open link. The addon contains a server part (endpoints, actions, a WebSocket for synchronization) and a web frontend that the AYON web app loads. It has no pipeline (client) part and no settings. Its [Review Desktop](../review-desktop/index.md) companion opens sessions in a desktop player.

## Requirements

| Requirement | Value |
|---|---|
| AYON server | 1.16.8 or newer |
| Required and compatible addons | None |
| License | The addon is licensed (flag `licensed`). The frontend checks the license features of the server for `review`. Without it a screen with the text "Your license to the Review addon has expired." replaces the session. |
| Bundle | The **Review** page of a project is only active when the addon is part of the production bundle. Otherwise the page shows an overview of the addon's features. |
| Connection | The session needs a secure context: the browser only allows video decoding (WebCodecs) over HTTPS or on localhost. Over plain HTTP the session shows "Review needs a secure connection". |
| Media | Only versions with a reviewable file can be added. Media the GPU cannot decode is decoded in software (since 1.0.3). |
| Email | Sending guest invitations needs mailing to be enabled on the AYON server. |
| Redis | The server uses its Redis for temporary sessions and for the synchronization state. |

## Where it appears

| Place | What it provides |
|---|---|
| **Review** in the project navigation (`/projects/<project>/reviews`) | The list page restricted to lists of the type `review-session`. The **Create review session** command (shortcut `N`) makes a new session. A selected session has an **Open review** button that opens it in a new tab. A selected generic list has a **Create review** button. |
| Session page (`/projects/<project>/reviews/<session id>`) | The player with the playlist, the timelines and the side panels. |
| **Review** submenu of the context menu of folders, tasks and versions | **Open in review**, **Create new session**, **Add to review list**. The submenu is disabled, with the note "need reviewable", when a selected entity is known to have no reviewable. |
| Context menu of a list | **Create review**, which turns a list into a review session. |
| Actions menu (category `review`) | The simple actions listed under [Actions](#actions). |
| Share tab of a session | Guest and open-link access, described under [Guest access](#guest-access). |

The addon exports its page, a guest-access form and a set of session card components to the web app. The **Review** page uses the same list table, folders and details panels as the [Lists](../../../ayon/web-ui/production-tracking/lists.md) page. A session's items show as cards or as a playlist table with the columns Folder, Product, Version, Task, Status and Author. The item context menu has **Open in viewer** (`Space`) and **Show details** (double click).

## Creating sessions

### Actions

| Action (label) | Appears on | Result |
|---|---|---|
| Open in review (`review-create-session-from-<type>s`) | Folders, tasks, versions (several can be selected) | Creates a temporary session and opens it in a new tab. |
| Create new review session (`review-save-session-from-<type>s`) | Folders, tasks, versions | Asks for a **Session label** (default `New Review Session`) and saves a permanent session. |
| Add to review session (`review-add-to-session-from-<type>s`) | Folders, tasks, versions | Asks to **Select review session** and appends the reviewables. Fails with a message when no review session exists. |
| Create review session (`review-create-session-from-list`) | Lists of folders, tasks or versions | Creates a temporary session from the list and opens it. |
| Save review session list (`review-save-session-from-list`) | Lists | Saves a permanent session, with the default label `<list label> (Saved Session)`. |
| Add to review session (`review-add-to-session-from-list`) | Lists | Appends the list's reviewables to an existing session. |

An action stops with "No reviewables found in the selection" when nothing can be reviewed. If a session label is already used, a number is appended (`label 1`, `label 2`).

### How reviewables are chosen

| Selection | Reviewable used |
|---|---|
| Version | The first reviewable of the version by reviewable order. |
| Folder | One reviewable per folder: the most recently updated reviewable file among the versions of its products. |
| Task | One reviewable per task: the most recently updated reviewable file among the versions linked to it. |

Sessions created from folders or tasks by an action are sorted by folder path and product name. A session created from a list keeps the list's order. The web app asks for Review addon 0.5.0 or newer for folders and tasks.

### Session from a list (endpoint)

The **Create review** commands call `POST .../sessions/fromList`. It creates a permanent session with the label `<list label> (review)`, or `(review 1)`, `(review 2)` and so on up to 50, when that label exists. Its thumbnail is the first reviewable.

### Temporary and permanent sessions

| Kind | Stored in | Behavior |
|---|---|---|
| Temporary (`transient`) | Redis, for one hour | Not visible to guests. Auto-save is off, and the session has to be named and saved to become permanent. Closing a session with unsaved changes asks for confirmation. |
| Permanent | A list of the type `review-session` in the project | Auto-save is on by default. The session keeps its sections, grouping and sorting, and per item the chosen reviewable and section. |

Saving a temporary session deletes the temporary copy.

## The session window

### Header

| Element | Behavior |
|---|---|
| Studio logo | Goes to the **Review** page ("Go to Sessions home"). Shows the studio logo of the server, or the AYON logo when none is set. |
| Session name | Editable by users who are not guests. Shows the number of items. A name that already exists is refused with a message. |
| **Save session** | Shown when auto-save is off. Enabled when there are changes. `Ctrl+S` saves. |
| Sync controls | Start or join a synchronized session, see [Synchronized sessions](#synchronized-sessions). |
| Actions | The addon's actions for the session list. |
| Session menu | The **Auto-save** switch. |
| User button, close | The user menu, and closing the session. |

When another user changes a session, a message tells so. With auto-save off the message offers **Sync with server** or **Save and overwrite server state**.

### Panels

| Panel | Content |
|---|---|
| Player | The current clip with the comparison, annotation and view tools, and the timelines (the session timeline and the annotations timeline). |
| Playlist | The clips of the session. **Add clips** inserts versions, **Add section** adds a named section. Clips can be sorted and grouped, dragged to reorder, replaced by another version, and removed (context menu **Remove**). **Version data** shows the data of a version. `,` shows or hides the panel. |
| **Feedback** tab | The details panel of the current version with its comments (the version's [activity feed](../../../ayon/web-ui/details-panel.md)). Unsaved annotations are attached to the comment being written. |
| **Share** tab | Access for internal users and the guest sections. Not shown to guests. |
| **People** tab | Who is in the session, see below. |

A clip can switch to another reviewable of the same version, and the choice is stored in the session item.

### Keyboard

| Keys | Action |
|---|---|
| `Left`, `Right` | Previous or next frame. At the clip end the next clip follows. |
| `Shift+Left`, `Shift+Right` | Previous or next clip, cycling through the session. |
| `Home`, `End` | Start or end of the session. |
| `,` | Shows or hides the playlist panel. |
| `Ctrl+Z`, `Shift+Ctrl+Z` | Undo and redo of annotation strokes. |
| `Ctrl+S` | Saves the session when auto-save is off. |

### Annotations and comparison

| Feature | What it does |
|---|---|
| Annotations | Draws on the current frame with a choice of colors (including yellow and mint) and an eraser. Undo, redo and clear are available. An unsaved annotation shows its frame or frame range on the timeline and in the comment it belongs to. Removing it from the comment attachments clears it. |
| Laser pointer | A laser pointer canvas is part of the annotation tools. |
| Comparison | The **Compare** button opens selectors for folder, product and version of the comparison version. The folder opens an entity picker. While comparison is on, the compare button is replaced by a disable control, and the viewer renders the compared version. Several comparisons can be set (the synchronized state stores a list). |
| Grouping and sorting | The playlist groups by section by default and can be regrouped and sorted. Both are stored in the session. |
| Playback controls | Play and pause, previous and next clip, a session timeline where a click or drag moves the playhead. |

Further player tools (view controls, loop and in/out points, timeline modes) come from the player component of the addon. They are not part of the addon repository.

## Synchronized sessions

A session can be shared live over a WebSocket (`/api/addons/review/<version>/ws`). Users enter a session unsynchronized and join the sync themselves.

| Element | Behavior |
|---|---|
| Sync button | **Start sync** (nobody is synced), **Join sync** (others are synced) or **Synced**. A toast **Sync session started** offers **Join sync** when others are already synced. |
| Sync menu | **Start presenting** or **Stop presenting**, **Leave sync**, and the lists **Synced**, **Not synced** and **Not joined** (guests that have access but did not open the session). |
| Presenter | One user presents. Other users see who is presenting, or who is controlling when nobody presents. |
| **People** tab | Searchable lists of the three groups. The menu of a user has **Add to sync**, **Remove from sync**, **Remove presenter role** and **Remove from session**. |

The synchronized state covers the playback position and playing state, in and out marks, the comparison list, the compare render style, splitter position, overlay opacity and swap, playback speed, display brightness, selection, playlist focus, and the annotation history of each user. The state is kept in Redis and expires two minutes after the last activity. The server sends a heartbeat about every three seconds.

## Guest access

Guests are external people who see a single session. A guest has no access to the project otherwise. Guests open the session with compact controls, in clip view with the playlist closed, and see no **Share** tab.

### Invited guests

| Aspect | Behavior |
|---|---|
| Guest list | Guests are stored per project by email address, with a full name (default: the part of the email before the `@`). A guest is added to a session by giving it read access (level 10) in the session's access list. Removing a guest revokes this access and keeps the guest in the project. |
| Invitation | Adding a guest does not send an email. **Invite** sends an email with the subject "Invited to review: &lt;session name&gt;" that carries the studio name, the session name and its creation date. |
| Link | The link signs the guest in without a password, is valid for 24 hours and works once. Using an expired or used link sends a new link by email. Signing in with a new link ends the earlier sessions of that guest. |
| Rights needed | Listing guests needs read access to the session, adding and removing guests needs access level 30 (manage). |

### Open links

An open link gives anyone who has it access to one session without any login.

| Aspect | Behavior |
|---|---|
| Creation | **Create open link** in the Share tab (needs manage access to the session). The link has the form `<server>/login/_token?q=review.<project>.<token>`. A session can have several links. |
| **Comment as** | Each link has a comment category chosen from the categories that guests may use, or **Disabled** to forbid commenting. The category can be changed later. |
| Visitors | Each visit creates an anonymous guest (`anonymous.guest.<id>`, full name Anonymous Guest). The guest is asked for a name ("What is your name?", at least two characters, **Enter session**). A user who is already signed in and is not a guest is taken to the session instead. |
| Removal | **Remove shared link** asks for confirmation. Everyone using the link loses access at once. |

### Commenting and approvals

| Aspect | Behavior |
|---|---|
| Commenting | A guest can comment only when a comment category is assigned (per guest in the Share tab, or per open link). Comments of a guest get that category automatically. Without a category the comment box is disabled. |
| Visibility | A guest sees the comments that were made in the session, in categories the guest may access, plus comments without a category. |
| **Approve**, **Request changes** | The guest feedback panel has these two buttons. They post a review to the version's activity feed (activity type `version.review`) and send a comment first when one is being written. A pill shows the guest's own last review. |
| Clip status | Guests do not see the internal version statuses. A clip card shows the icon of the latest review of the version, **Approved** or **Changes requested**. |

## Permissions

| Level | Needed for |
|---|---|
| Read (10) | Opening the session, listing its guests. |
| Update (20) | Reading the open links of a session. |
| Manage (30) | Adding and removing guests, creating, changing and removing open links. |

## Endpoints

All endpoints are under `/api/addons/review/<version>/`.

| Method and path | Purpose |
|---|---|
| `GET {project}/sessions` | Lists the project's review sessions. |
| `POST {project}/sessions` | Saves a session (items, sections, grouping, sorting, access). |
| `GET {project}/sessions/{id}` | Loads a stored or temporary session. Guests only get stored sessions they may access. |
| `POST {project}/sessions/fromList` | Creates a session from a list. |
| `GET`, `POST {project}/sessions/{id}/guests` | Lists guests, adds or removes guests, optionally sends invitations. |
| `GET`, `POST`, `PATCH`, `DELETE {project}/sessions/{id}/public-links[/{link id}]` | Manages open links. |
| `PATCH {project}/items/{id}` | Not implemented (returns "Not implemented"). |
| `WebSocket ws` | Session synchronization. |

## Related

- [Review Desktop addon](../review-desktop/index.md): opens version lists in OpenRV with the AYON activity panel.
- [Lists](../../../ayon/web-ui/production-tracking/lists.md)
- [Activity feed](../../../ayon/web-ui/details-panel.md#activity-feed)
- [Products and versions](../../../ayon/web-ui/production-tracking/products.md)
- [Keyboard shortcuts](../../../ayon/web-ui/quick-navigation.md#keyboard-shortcuts)
