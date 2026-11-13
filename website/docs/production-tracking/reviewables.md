---
title: Reviewables
description: "Reviewables are the media files of a version that are played in the web viewer: the Files tab, supported formats and availability states, the viewer, version and reviewable comparison, and player shortcuts."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/0359490-reviewables
---

# Reviewables

A **reviewable** is a video or image file attached to a version for review in the browser. A version can have any number of reviewables, so one version can show a model under several lighting setups, a close-up of a detail, an animation from several angles or different areas of an environment. Reviewables are uploaded and managed in the web app and are played in the viewer.

Reviewables were introduced in AYON server 1.3.0.

## Where it appears

| Location | Description |
|---|---|
| **Files** tab of the [details panel](../ayon/web-ui/details-panel.md) of a version | Lists, uploads, sorts, renames, downloads and deletes the reviewables of the version. |
| Viewer | Plays a reviewable. |
| [Review sessions](../addons/production-tracking/review/index.md), [lists](../ayon/web-ui/production-tracking/lists.md), [products and versions](../ayon/web-ui/production-tracking/products.md), [task progress](../ayon/web-ui/production-tracking/task-progress.md), [tasks home](../ayon/web-ui/home/tasks.md) | Open the viewer from a selection or from a thumbnail. |

## Files tab

The tab shows one card per reviewable with a thumbnail, the file name or label and its state. An upload area at the end of the list reads **Drop or click to upload**.

| Item | Description |
|---|---|
| Upload area | Takes any number of video or image files, by dropping them on the tab or by choosing them with a file picker. A full-tab drop zone (**Upload reviewable**) appears while files are dragged over the panel. |
| Reviewable card | Click opens the reviewable in the viewer. Cards can be dragged to change the order of the reviewables of the version. |
| Edit button on a card | Opens the **Editing label** dialog (**Enter a new label**, **Save**, **Cancel**) to give the reviewable a label. |
| Card menu | **Download original** downloads the uploaded file. **Delete** removes the reviewable after a confirmation. The menu also shows the author of the reviewable. |

Files dropped before the version exists are held as waiting cards and uploaded as soon as the version is created, for example in the **Upload version** dialog of [Versions without a pipeline](versions-without-a-pipeline.md).

The server accepts files whose content type is a video type, an image type or `application/mxf`. Other types are rejected.

### Progress states

| Message on the card | Meaning |
|---|---|
| Waiting for upload | The file is held until the version exists. |
| Uploading | The file is being sent to the AYON server. |
| Importing, Validating | The file is being processed after the upload. |
| Queued - waiting to be transcoded | The file waits for a transcoding service. |
| Transcoding | A transcoding service is converting the file. |
| Unsupported - conversion required | The browser cannot play the file and no converted file exists. |

Uploaded files are not transcoded or converted by the AYON server itself.

## Supported formats

The AYON server inspects each uploaded file and assigns an availability.

| Availability | Meaning |
|---|---|
| `ready` | Plays in the viewer. |
| `conversionRecommended` | Plays, but playback can be unreliable. Applies to QuickTime (`.mov`) files and to H.264 or VP9 videos that are not encoded with I-frames only. |
| `conversionRequired` | Cannot be played. Applies to other codecs and containers. |
| `unknown` | The file has no video track that could be inspected. |

| Kind | Played without conversion |
|---|---|
| Video | H.264 or VP9 in an MP4 container (`mp42` or `isom` brand), encoded with I-frames only. |
| Image | PNG, JPEG, WebP. |

Recommended encoding for videos: MP4, `yuv420p`, H.264, `qtfaststart` flag enabled, I-frames only. Reviewables that need conversion are converted by a transcoding service when one is installed (see [Power features](power-features.md)).

## Viewer

The viewer plays reviewables with a timeline, the activity feed and the details of the entity next to it. It opens from any of these:

| Trigger | Description |
|---|---|
| Reviewable card | Opens that reviewable. |
| Entity thumbnail | Opens the viewer for the entity. |
| `Space` | Opens the selected folder, task, product or version in the viewer. |

### Player controls

| Control | Shortcut |
|---|---|
| Play or pause | `Space` or `k` |
| Previous or next frame | `ArrowLeft` or `3`, `ArrowRight` or `4` |
| Back or forward five frames | `j`, `1` or `Shift+ArrowLeft`; `l`, `2` or `Shift+ArrowRight` |
| First frame | `Shift+A` |
| Last frame | `Shift+D` |
| Cycle view mode (default, theater, full screen) | `f` |
| Mute | `m` |
| Loop playback | Button |
| Show or hide grid overlay | Button |
| Scrubbable timeline | Drag |
| Previous or next reviewable of the version | `w` and `s` |

See [Keyboard shortcuts](../ayon/web-ui/quick-navigation.md#keyboard-shortcuts) for the complete list. The brush and eraser tools of annotations (`b`, `e`) are part of the Power Features addon.

## Comparing versions

A version selector in the viewer switches between the versions of the product. The viewer keeps the current frame, and when the new version has a matching reviewable it is shown at the same frame. Reviewables that have the same label in different versions are matched, so two reviewables from different versions can be compared.

| Shortcut | Action |
|---|---|
| `a` | Previous version |
| `d` | Next version |
| `r` | Latest version |
| `e` | Approved version |
| `h` | Hero version |

## Permissions

Uploading reviewables is controlled by the **Upload reviewables** activity permission of an access group, together with the right to create the version. Sorting reviewables requires the right to update the version. See [Users](../ayon/web-ui/studio/users.md).

## Related

- [Upload version](../ayon/web-ui/dialogs/upload-version.md)
- [Versions without a pipeline](versions-without-a-pipeline.md)
- [Review sessions](../addons/production-tracking/review/index.md)
- [Activity feed](../ayon/web-ui/details-panel.md#activity-feed)
- [Review addon](../addons/production-tracking/review/index.md)
- [Power features](power-features.md)
