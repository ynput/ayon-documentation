---
title: Keep the conversation in one place
sidebar_label: Conversations
description: "Keeping production communication in AYON: the activity feed of every folder, task and version with comments, mentions, checklists, attachments, frame links and reactions, its history of statuses and versions, internal comment categories, client feedback in the same feed, and the inbox with watchers and notifications."
verified: 2026-11-17
---

# Keep the conversation in one place

<!-- screenshot: details panel of the lighting task of wing_it 020_0040 with an activity feed of comments, a checklist, a mention and published versions -->

Notes about a shot get lost when they are spread over chat, email and meeting minutes. In AYON every folder, task and version has its own activity feed in the [details panel](../ayon/web-ui/details-panel.md), and the same panel opens on every project page, in the inbox and next to the player. The comments, the versions and the changes of a piece of work stay together, so anyone who opens the shot, months later or on their first day on the project, reads its whole story in one place.

## Notes that stay with the work

<!-- screenshot: activity feed of a wing_it task showing a status change, an assignee change, a published version and a comment on that version -->

The [activity feed](../ayon/web-ui/details-panel.md#activity-feed) is the timeline of an entity: comments, published versions, version reviews, and changes of status, assignees, attributes and tags. It answers "what happened to this shot?" without asking around: when it went to **Pending review**, who was assigned, which version was approved.

A comment on a version also shows in the feed of its task, so the artist and the lead read all the notes of a task in one feed, across its versions.

## Bring the right people in

<!-- screenshot: comment editor on wing_it with the @ suggestion list showing users and the lighting team -->

A [mention](../ayon/web-ui/details-panel.md#mentions) puts a note in front of the people who need it:

- `@` notifies a user or a whole [team](../ayon/web-ui/project/teams.md), for example asking the compositing team about a plate.
- `@@` links a version and `@@@` links a task, so a note about a dependency also shows in the feed of the version or task it refers to.

People also follow work without being mentioned. Assignees, authors of versions and everyone who comments become watchers automatically, and anyone can be added as a [watcher](../ayon/web-ui/details-panel.md#watchers), for example a producer who wants to follow a hero shot without being assigned to it.

## Notes an artist can act on

<!-- screenshot: a wing_it version comment with a frame chip, an annotation image and a checklist of three items, one checked -->

A good note says exactly what to fix. The comment editor helps with that:

- **Frame links and annotations:** in the [web viewer](../ayon/web-ui/web-viewer.md#comments-and-frames), a comment can point to a frame or a frame range, and with the [Power Pack](../addons/production-tracking/power-pack/index.md) carry a drawing on the frame.
- **Checklists:** a list of fixes inside a comment, which the artist ticks off. The feed shows the progress, for example `2/3`.
- **Attachments:** reference images or files dropped into the comment.
- **Reactions:** a thumbs up or another reaction acknowledges a note without another comment, and sends no notification.

## Keep internal notes internal

With the Power Pack, a comment can have a [comment category](../ayon/web-ui/details-panel.md#comment-categories), which limits who sees it. A supervisor can write a note for the leads only, or a director's note that only some people read, in the same feed as everyone else's comments. Users without access to the category do not see the comment, and the inbox does not notify them about it.

## Client feedback in the same feed

Comments and decisions of clients who review as guests arrive in the same activity feed, next to the team's notes; see [Bring clients into review](client-review.md#collect-the-clients-decision).

## One inbox for what needs attention

<!-- screenshot: the Inbox of a wing_it coordinator on the Important tab, with a mention, a published version and a change request -->

The [Inbox](../ayon/web-ui/inbox/index.md) collects, across all projects, the activity that concerns each user: mentions, and activity on the work they watch, such as new versions, comments and reviews. Status changes and activity on work the user is only related to go to a separate tab, so the main tab stays short. Messages are cleared when dealt with, which turns the inbox into a to-do list. Selecting a message opens the entity in the details panel, where the reply is written in the same feed.

New messages can show as a desktop notification or play a sound while the web app is in the background, set by each user on their [Profile](../ayon/web-ui/account/profile.md) page; see [Real-time notifications](../ayon/web-ui/inbox/index.md#real-time-notifications).

## Find a note again

The feed can be searched and filtered by comments, versions, checklists, attachments, category, user and date; see [Feed filter](../ayon/web-ui/details-panel.md#feed-filter). **Copy link** on a comment gives a link that opens the entity at that comment, to point someone to a note from outside AYON.

## Related

- [Details panel](../ayon/web-ui/details-panel.md)
- [Inbox and notifications](../ayon/web-ui/inbox/index.md)
- [Profile](../ayon/web-ui/account/profile.md)
- [Teams](../ayon/web-ui/project/teams.md)
- [Review and approve](review-and-approve.md)
- [Bring clients into review](client-review.md)
