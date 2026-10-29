---
title: AYON web viewer
sidebar_label: Web viewer
description: "The AYON web viewer, also called the player or review player, which plays the reviewables of a version: where it opens, the version and product selection, the player controls, theater and full screen modes, keyboard shortcuts, and the annotations that need the power features."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/0359490-reviewables
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Viewer/ViewerDialog.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Viewer/Viewer.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Viewer/ViewerComponent.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Viewer/ViewerPlayer.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Viewer/ViewerImage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Viewer/ViewerDetailsPanel.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/VideoPlayer/VideoPlayer.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/VideoPlayer/VideoPlayerControls.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/VideoPlayer/hooks/usePlayerPreferences.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/VersionSelectorTool/VersionSelectorTool.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/VersionSelectorTool/hooks/useReviewShortcuts.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/AnnotationsTools/AnnotationTools.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/viewer/ViewerContext.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/features/viewer.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/ReviewablesSelector/ReviewablesSelector.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/hooks/useReviewablesKeyboardNavigation.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/ReviewablesList/getGroupedReviewables.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/DetailsPanel/components/DetailsPanelMoreMenu/DetailsPanelMoreMenu.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/DetailsPanel/components/DetailsPanelHeader/DetailsPanelHeader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/ProjectTreeTable/hooks/useCellContextMenu.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/ProjectTreeTable/hooks/useKeyboardNavigation.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/VersionsProductsPage/hooks/useVPContextMenu.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/TasksProgress/components/TasksProgressTable/TasksProgressTable.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/hooks/useTaskSpacebarViewer.tsx
---

# AYON web viewer

The AYON web viewer, also called the player or review player, plays the [reviewables](../../production-tracking/reviewables.md) of a version: videos with a frame-accurate player, and images. It opens over the current page, next to the details panel of the version, so a version can be watched, compared with other versions and commented on in one place. The viewer is built into the web app; only drawing annotations needs a plan that includes the power features.

It opens with **Open in viewer** and `Space`. It is not related to [views](views.md), the saved layouts of the table pages.

## Where it appears

| Opens from | Control | Shortcut | Who sees it |
|---|---|---|---|
| [Project overview](production-tracking/overview.md), folder and task rows | Right-click **Open in viewer** (name or thumbnail column) | `Space` | Users who can open the project |
| Project overview and other project pages, slicer hierarchy | Right-click **Open in viewer** | none | Users who can open the project |
| [Products and versions](production-tracking/products.md), table and grid | Right-click **Open in viewer**, on a version or a product with a featured version | `Space` | Users who can open the project |
| [Lists](production-tracking/lists.md), list items table | Right-click **Open in viewer** (name or thumbnail column) | `Space` | Users who can open the project |
| [Task progress](production-tracking/task-progress.md) | Right-click **Open in viewer** on a task | `Space` | Users who can open the project |
| [Tasks](home/tasks.md) on Home | Selected task | `Space` | All users |
| [Browser](production-tracking/browser.md) and [Workfiles](production-tracking/workfiles.md), folder hierarchy and task list; Browser products | Right-click **Open in viewer** | `Space` | Users who can open the project |
| [Details panel](details-panel.md) | **More actions**, **Open in viewer** (folder, task, product or version); clicking the thumbnail of an entity with reviewables (play icon on hover) | none | Users who can read the entity |
| Details panel, **Files** tab of a version | Clicking a reviewable card | none | Users who can read the version |

Opened for a folder or task, the viewer shows the versions of the product with the most recent reviewable; opened for a product, its versions. It selects the given version, otherwise the latest one, and the first playable reviewable of it. Opened with `Space`, or with **Open in viewer** on the **Overview**, **Products**, **Lists** and **Task progress** pages or in the **More actions** menu, a video starts playing right away.

The open viewer is kept in the URL (`project_name`, `viewer_product`, `viewer_task`, `viewer_folder`, `viewer_version`, `reviewable_id`, `selected_product`), so reloading the page or opening a copied link shows the same version and reviewable.

## Layout and controls

| Region | Content |
|---|---|
| Version toolbar (top left) | Version selection, see [Version selection](#version-selection). |
| Top right | **Theater** button and the close button. In theater mode, the path of the version (folder / product / version) is shown next to them. |
| Player | The selected reviewable: the [video player](#video-player), an image, or a placeholder. |
| Reviewables column (right of the player) | One card per playable reviewable of the version. Hovering a card shows its label; the cards next to the selected one show their shortcuts (`W`, `S`). The **+** button switches the details panel to the **Files** tab and opens a file picker to upload more reviewables. Below the cards: the annotation tools. |
| Details panel (right) | The [details panel](details-panel.md) of the selected version, with its activity feed, files and details. |

Placeholders in the player area:

| Message | Meaning |
|---|---|
| **This task has published no versions.** | Nothing to show for the task or folder. The details panel is hidden. |
| **This version has no online reviewables.** | The version has no reviewables. The area takes dropped files (**Drop or click to upload**) and uploads them to the version. |
| **File not supported and needs conversion** | The reviewables of the version cannot be played by the browser; see [Supported formats](../../production-tracking/reviewables.md#supported-formats). |

### Version selection

| Control | Shortcut | Description |
|---|---|---|
| Previous version (left arrow and version name) | `a` | The version before the selected one. |
| Version dropdown | none | All versions of the product, newest first, with the hero version at the top. |
| Next version (version name and right arrow) | `d` | The version after the selected one. |
| **Latest - v&lt;nnn&gt;** | `r` | The latest version. |
| **Approved - v&lt;nnn&gt;** | `e` | The latest version whose status is a done status. Disabled when there is none. |
| Hero version | `h` | Shown when the product has a hero version. |
| **Product:** dropdown | none | Shown when the folder or task has reviewables in several products. Switches the product. |

When the version changes, the viewer keeps the current frame and picks the reviewable with the same label in the new version, or its first ready reviewable. So the same shot of two versions can be compared at the same frame.

### Video player

| Control | Shortcut | Description |
|---|---|---|
| Timeline | Drag | Scrubs through the frames. Shows the loaded part of the video, frames with annotations and frames that comments are linked to. |
| Current frame field | none | Shows the frame number (from 1); typing a number jumps to that frame. |
| Mute | `m` | Mutes or unmutes the sound. |
| Loop playback | none | Plays the video in a loop. On by default. |
| **Go to Start** | `Shift+A` | First frame. |
| **Back 5 frames** | `j`, `1` or `Shift+ArrowLeft` | |
| **Back 1 frame** | `ArrowLeft` or `3` | |
| **Play** / **Pause** | `Space` or `k` | |
| **Forward 1 frame** | `ArrowRight` or `4` | |
| **Forward 5 frames** | `l`, `2` or `Shift+ArrowRight` | |
| **Go to End** | `Shift+D` | Last frame. |
| Grid overlay | none | Shows or hides a grid over the video. |
| **Fullscreen** | none | Switches full screen on or off. |
| Total frames | none | Number of frames of the video. |

Mute, loop and the grid overlay are remembered for the browser session. Images are shown fitted to the player area, without the player controls.

### View modes

| Mode | How | Description |
|---|---|---|
| Default | | Version toolbar, player, reviewables column and details panel. |
| Theater | **Theater** button (tooltip **Hide surrounding panels to maximize viewer size**), or `f` | Hides the version toolbar, the reviewables column and the details panel. The version and reviewable shortcuts keep working. Remembered for the browser session. |
| Full screen | **Fullscreen** button of the player, or `f` in theater mode | The player fills the screen. |

`f` cycles through the modes: default, theater, full screen, and back to default.

### Comments and frames

Comments are written in the activity feed of the details panel. While a video is shown, a comment can be linked to the current frame, and clicking the frame link of a comment jumps to that frame. See [Activity feed](details-panel.md#activity-feed).

### Annotations

Annotations are drawings over a frame of a video or over an image. The annotation tools sit below the reviewables column: brush (`b`), eraser (`e`), colours, undo and redo. Annotations are added to the comment being written in the activity feed and are saved with it. They are hidden while a video plays.

Annotations need a plan that includes the power features; see [Power features](../../production-tracking/power-features.md). Without it, the annotation tools are shown disabled with a power features button.

## Keyboard shortcuts

Shortcuts are ignored while typing in a text field or a comment. See [Keyboard shortcuts](quick-navigation.md#keyboard-shortcuts) for the shortcuts of the other pages, which are off while the viewer is open.

| Shortcut | Action |
|---|---|
| `Esc` | Close the viewer, or the slide-out panel when one is open. Does nothing in full screen. |
| `f` | Cycle the view mode |
| `w` / `s` | Previous or next reviewable of the selected version, wrapping around |
| `a` / `d` | Previous or next version |
| `r` | Latest version |
| `e` | Approved version |
| `h` | Hero version |
| `Space` or `k` | Play or pause |
| `ArrowLeft` or `3` / `ArrowRight` or `4` | Back or forward one frame |
| `j`, `1` or `Shift+ArrowLeft` / `l`, `2` or `Shift+ArrowRight` | Back or forward five frames |
| `Shift+A` / `Shift+D` | First or last frame |
| `m` | Mute or unmute |
| `b` / `e` | Brush or eraser tool (when annotations are available) |

## Closing the viewer

The close button at the top right, or `Esc`, closes the viewer and returns to the page it was opened from. `Esc` first closes an open slide-out panel. Clicking outside the viewer does not close it.

## Permissions

| Action | Requirement |
|---|---|
| Open the viewer | Read access to the project and the entity. |
| Comment | As in the [details panel](details-panel.md#activity-permissions). |
| Upload reviewables | The **Upload reviewables** activity permission. See [Users](studio/users.md). |
| Annotations | A plan that includes the [power features](../../production-tracking/power-features.md). |

## Related

- [Reviewables](../../production-tracking/reviewables.md)
- [Details panel](details-panel.md)
- [Upload version](dialogs/upload-version.md)
- [Keyboard shortcuts](quick-navigation.md#keyboard-shortcuts)
- [Power features](../../production-tracking/power-features.md)
