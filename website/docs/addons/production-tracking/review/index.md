---
title: Review addon
sidebar_label: Review
description: "The AYON Review addon (review sessions): playlists of versions with frame-accurate playback, annotations, comparison, synchronized sessions and guest review."
addon: review
addon_repo: "-"
addon_version: 1.0.1
addon_scope: server
addon_flags: [licensed]
addon_unverified: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/8669165-review-sessions
  - https://help.ayon.app/en/articles/8506818-ayon-desktop-review-addon
---

# Review addon

<AddonInfo />

The Review addon (also called **Review Sessions**) adds a review player to the AYON web app. A review session is a playlist of published versions that a team plays back, annotates, compares and comments on together, either live in one synchronized session or independently. Reviewers can be project members or external guests.

## Availability

| Item | Value |
|---|---|
| Market flags | `licensed` |
| Licensing | Premium addon, included with the Studio subscription or an extra with a Pro subscription |
| Where it appears | AYON web app: the **Review** page of a project, a **Reviews** submenu in context menus, and actions on lists |
| Connection | Review sessions work over HTTPS only. |
| Used by | The [Review Desktop addon](../review-desktop/index.md) requires it (`review` newer than 0.0.4) to open sessions in a desktop player |

## What a review session is

A review session is a playlist of versions. Each clip is a version, so comparison, comments and status changes act on the version itself. Sessions are either permanent (named and listed on the **Review** page) or temporary: a session started from a context-menu action stays temporary, and is lost when its tab is closed, until it is named and saved.

### Ways to create a session

| Source | Result |
|---|---|
| Selected folders, tasks or versions (**Reviews** submenu) | **Open in review** starts a temporary session, **Create new session** makes a session containing the selection, **Add to review list** appends to an existing one. For folders and tasks the latest version of each is used. |
| An existing list | A **Create Review Session** action, a **Create Review** context-menu entry and a **Create Review** button on the list. The entry and button create permanent sessions; the action creates a temporary one. For lists of folders or tasks, the latest version of each item is used. |
| The **Review** page | The **+** button lists the project's lists to convert into a session and offers **Create empty review session**. |

Sessions can have versions added, removed and reordered, and they can be organized in folders on the **Review** page, as lists can.

## Features

| Area | What it provides |
|---|---|
| Playback | Frame-accurate playback, adjustable speed (0.25x to 2x), loop between in and out points, head and tail handle toggle, timecode and frame-offset display, clip audio volume |
| Timelines | A full timeline of all clips at relative length (with selective clip playback), a clip-tile view, and a timeline for the current clip |
| View controls | Flip horizontally and vertically, guides and mattes at several aspect ratios, pan, zoom, theater and fullscreen modes, collapsible side panels |
| Playlist | Drag-and-drop ordering, adding clips, replacing a clip with another version of the same product or any other version of the project, sections, grouping by any attribute |
| Status from grouping | When clips are grouped by status, moving a clip to another group changes the version's status on the AYON server |
| Annotations | Brush with pen pressure, arrow, circle, square and line shapes, opacity and hardness, color picker, eraser, single-frame and held-frame annotations |
| Comments | Annotations start a comment; one comment can carry several annotations on different frames. Annotations are saved as images with the comment. |
| Laser pointer | Broadcasts the cursor in synchronized sessions and draws temporary shapes in the user's profile color |
| Comparison | Swap, overlay (with opacity), split and side-by-side modes, against any version from any folder or product of the project; several comparisons can be active at once |
| Synchronized sessions | Participants enter de-synced and can join or leave the live sync. In standard sync any participant can control playback with a short cooldown after each action. A **Start Presenting** mode gives one person exclusive control of ordering, scrubbing and playback. |
| Participants | A **People** tab lists synced users, unsynced users and guests; a user can lose the presenter role, be removed from the sync or be removed from the session |

## In the web app

### Where it appears

| Item | Value |
|---|---|
| Menu entry | **Review** in the project navigation |
| URL path | `/projects/<project>/reviews`; an open session is at `/projects/<project>/reviews/<session id>` |
| Requirement | The Review addon. Without it the page shows a feature overview in place of the sessions. |

The **Review** page is the [Lists](../../../production-tracking/lists.md) page restricted to lists of the review session type, so it shares the list table, folders, grid and details panels. Sessions can be renamed and expanded to show their versions.

### Layout

| Region | Content |
|---|---|
| Viewer | The current clip, with the comparison, view and annotation tools. |
| Timeline | Bottom of the screen: the full timeline or the clips view, with a smaller timeline above it for the current clip. |
| Playlist panel | The clips of the session, with sections, grouping, **Add Clip** and **Add Section**. |
| Side panels | Comments for the current version, the **People** tab and the **Share** tab. Panels collapse independently. |
| Header | Session name with an **Edit** button for renaming, **Compare**, sync state, and a studio logo at the top left when one is configured. |

### Timelines

| Timeline | What it shows |
|---|---|
| Timeline (default) | All clips at their relative length, with duration and frame count per clip. Dragging navigates; zoom is adjustable. **Ctrl/Cmd**-click selects individual clips for selective playback, which skips unselected clips. |
| Clips | One equal-sized tile per version without frame information. Selecting a tile opens that clip in the viewer. |
| Current clip timeline | Above the main timeline; always spans the clip being watched. |

### Playback and view controls

| Control | Shortcut | What it does |
|---|---|---|
| Play and pause | `Space`, `K` | Starts and stops playback. Playback pauses automatically on still images. |
| Frame step | `Left`, `Right` | Moves one frame. |
| Previous and next clip | `Shift+Left`, `Shift+Right` | Jumps between clips. |
| Go to start and end | | Jumps to the start or end of the session. |
| In and out points | `I`, `O` | Sets the point to the playhead frame. |
| Loop | `L` | Loops between the in and out points. |
| Handles | `H` | Shows or hides head and tail handles. |
| Speed | | 0.25x to 2x. |
| Volume, mute | `M` | Clip audio volume and mute. |
| Timecode and frame offset | | Switches timecode formats and applies custom frame offsets. |
| Default, theater and fullscreen view | `F` | Cycles through the three views. |
| Collapse side panels | `,` and `.` | Collapses or opens the panels independently. |
| Flip vertical and horizontal | `Y`, `X` | Flips the image. |
| Guides and mattes | `Shift+G` | Toggles overlays and mattes at several aspect ratios. |
| Pan | **Alt/Option**-drag | Pans the image. |
| Zoom | **Ctrl/Cmd**-drag | Zooms the image. |
| Reset view | Double-click | Restores the default view. |

Still images support alpha channel transparency. Other shortcuts are listed on [Keyboard shortcuts](../../../ayon/web-ui/keyboard-shortcuts.md).

### Playlist

| Feature | What it does |
|---|---|
| **Add Clip** | Browses the project and inserts additional versions into the session. |
| **Replace Version** (three-dot menu) | Swaps a clip for another version of the same product, or for any version from any folder of the project. |
| Reordering | Drag clips by their thumbnails. |
| Sections (**Add Section**) | Collapsible headers that group clips manually. |
| Attribute grouping | Groups clips by any attribute, such as status, task or author. |
| **Auto-save** (settings menu, top right) | On by default: playlist changes are saved and synced to all participants. Turning it off keeps changes private. |

### Annotations and comments

| Tool | Shortcut | What it does |
|---|---|---|
| Brush | `B` | Freehand drawing with tablet and stylus pressure. |
| Arrow, circle, square, line | | Shape tools. |
| Opacity and hardness sliders | | Stroke transparency and edge hardness. |
| Color picker | `Q` | Picks from the image or a preset palette. |
| Brush size | `[`, `]` | Decreases or increases the size. |
| Eraser | Right mouse button while brushing | Temporarily switches to the eraser. |
| Laser pointer | | Draws temporary shapes. |
| Show all annotations | `/` | Shows the annotations of all comments during playback. Annotations are hidden during playback by default. |

An annotation starts a comment, which is created when submitted, with or without text. Each annotation is saved as an image with its frame range. A green marker under the clip timeline represents an annotation: dragging it moves a single-frame annotation, and dragging just outside its handles creates a held-frame annotation that is visible over a range of frames, with settable start and end frames.

On a comment, an annotation has a play icon, an **Expand** button that shows the rasterized image, and a download. Buttons at the bottom of the viewer jump to the previous and next annotation. Selecting the green marker or the comment highlights the annotation.

Comments are the version's [activity feed](../../../production-tracking/activity-feed-and-comments.md) comments.

### Comparison

**Compare** (`C`) compares a clip with any version from any folder or product of the project.

| Mode | What it shows |
|---|---|
| Swap | The comparison version replaces the current one. |
| Overlay | The comparison version over the current one, with an opacity slider. |
| Split | Part of each version in one view. |
| Side-by-side | Both versions next to each other. |

### Synchronized sessions

| Feature | Behavior |
|---|---|
| Entering | Users enter a session de-synced and browse independently. A banner at the top shows when a live sync is active and offers joining. The **Synced** indicator leaves or rejoins the sync. |
| Standard sync | Any participant can control navigation. An action blocks other participants' controls for a short cooldown, and the active user's name is shown at the top right. |
| Presenter mode | **Start Presenting** gives one participant exclusive control of playlist ordering, scrubbing, frame navigation and playback. For synced participants, timeline and playback controls are locked; theater and fullscreen view, laser pointer, annotations, pan and zoom stay available. |
| **People** tab | The three-dot menu of a user offers **Remove presenter role**, **Remove from sync** and **Remove from session**. A user removed from the session returns to the **Review** page; a guest returns to the AYON login page. |

## Guest review

Guests are external people who are given access to one session, without access to the rest of the project.

| Aspect | Behavior |
|---|---|
| Guest list | The **Share** tab lists guests, found by name or email or added by email address with an optional name. Guests are stored at the project level, so a name is remembered for later sessions of the project. |
| **Invite** | Sends the email with the one-time passwordless link to the selected guests. Adding a guest grants access but does not send an email; the invitation can be sent again. |
| Login | The link logs the guest in without a password and expires after one use. A guest whose session ended receives a new link by email. |
| Access | Limited to the invited session and its versions. Access can be revoked at any time; removing a guest ends their access, including through earlier links. |
| Commenting | Requires a comment category with creator permission assigned to the guest; without one the comment box is disabled and the guest can only view. A guest is locked to that one category and comments are tagged with it automatically. |
| Comment visibility | The guest sees only comments on the session's versions, and only those in the guest's category or without a category. Guests with different categories do not see each other's comments; internal users see all. |
| Approvals | Guests can submit **Approve** or **Request Changes** on a version. The result is posted to the version's activity feed, notifies internal users and updates the version's status history. |

Comment categories are described under [activity feed and comments](../../../production-tracking/activity-feed-and-comments.md).

## Permissions

Sessions are visible to project members. Access to a session can be restricted further for internal users. Guests see only the sessions they were invited to.

## Related

- [Review Desktop addon](../review-desktop/index.md): opens version lists in OpenRV with the AYON activity panel.
- [Lists](../../../production-tracking/lists.md)
- [Products and versions](../../../production-tracking/products-and-versions.md)
