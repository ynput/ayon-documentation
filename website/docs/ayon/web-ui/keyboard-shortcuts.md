---
title: Keyboard shortcuts
description: "Every keyboard shortcut of the AYON web app: navigation, menus, and page-specific shortcuts."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/9085225-ayon-web-app-keyboard-shortcuts
---

# Keyboard shortcuts

The AYON web app has keyboard shortcuts for navigating between pages, toggling menus and working in tables and lists. Shortcuts that switch pages are two key presses of the same key (`h+h`); other shortcuts are a single key press or a key with a modifier.

## How shortcuts work

- A two-key shortcut is entered by pressing the key twice within 400 milliseconds. Holding a key does not repeat the shortcut.
- Key matching is case-sensitive for shifted keys. `shift+C` is a different shortcut from `c`.
- **Ctrl** on Windows and Linux is **Cmd** on macOS.
- Shortcuts are ignored while the cursor is in a text input, a text area or a rich text editor, in dialogs and panels that block shortcuts (for example the markdown editor, comment input and entity picker), and while the viewer is open.
- While the project menu is open only `1`, `8`, `9` and `0` are active.
- Shortcuts with a hover condition (marked "hover" below) act on the item under the mouse pointer.
- A shortcut is shown next to the matching entry in menus, context menus and tooltips.

## Navigation

| Shortcut | Opens | Route |
|---|---|---|
| `h+h` | Home dashboard | `/dashboard` |
| `s+s` | Studio settings (site settings for users) | `/settings/studio` |
| `p+p` | Project settings | `/manageProjects/projectSettings` |
| `a+a` | Project anatomy | `/manageProjects/anatomy` |
| `b+b` | Bundles | `/settings/bundles` |
| `u+u` | Users | `/settings/users` |
| `e+e` | Event viewer | `/events` |
| `v+v` | Services | `/services` |
| `m+m` | Market | `/market` |
| `i+i` | Inbox | `/inbox/important` |

`p+p` and `a+a` keep the current query parameters, so the selected project stays selected. Pages are subject to the user's role: a user who cannot open a page is redirected. See [Navigating the web app](navigating-the-web-app.md).

## Menus

| Shortcut | Action |
|---|---|
| `1` | Toggle the project menu |
| `8` | Toggle the Help menu |
| `9` | Toggle the App menu |
| `0` | Toggle the User menu |
| `0+0` | Sign out |

## Tables and the project overview

These apply to the tree table on the **Overview** page and to the same table component elsewhere.

| Shortcut | Action |
|---|---|
| `n` | New folder |
| `m` | New folder sequence (several folders at once) |
| `t` | New task. Requires a selected folder to create the task in. |
| `r` | Rename the focused folder or task, or the selected item in lists and hierarchy tables |
| Arrow keys | Move the focused cell |
| `Shift` + arrow keys | Extend the selection |
| `Tab` / `Shift+Tab` | Next or previous cell, wrapping across rows |
| `Enter` | On the name column of a folder or task, open the details panel. On other columns, edit the cell (toggles checkboxes) |
| `Esc` | Clear the selection, stop editing, drop the focused cell |
| `Space` | Open the selected item in the viewer |
| Double click | Show the details panel for the selected item |
| `Ctrl+C` | Copy selected cells |
| `Ctrl+V` | Paste into selected cells |
| `Ctrl+Z` | Undo the last cell change |
| `Ctrl+Y` or `Ctrl+Shift+Z` | Redo |
| `Backspace` or `Delete` | Clear the selected editable cells |
| `Ctrl+click` | Add or remove a single row from the selection |
| `Shift+click` | Select a continuous range |
| `Alt+click` on the expand arrow | Expand or collapse all children |
| `Shift+Ctrl+0` | Reset the working view to its default (clears filters and column settings) |
| `Shift+R` | Sync the table with server updates (where a sync button is shown) |

In cell editors: `Enter` confirms, `Esc` cancels. In markdown cells `Ctrl+Enter` also confirms.

## Table and grid switches

| Shortcut | Where | Action |
|---|---|---|
| `t` | Products | Table view |
| `g` | Products | Grid view |
| `t` | Lists | Table view |
| `g` | Lists | Card (grid) view |
| `p` | Lists | Playlist view |

## Lists

| Shortcut | Action |
|---|---|
| `n` | New list |
| `f` | New list folder |
| `Shift+F` | Remove the selected lists or folders from their parent folder. Not available to users with the user role. |
| `Ctrl+Backspace` | Remove selected items from the list |
| `Ctrl+C` | Copy selected cells |
| Double click | Show the details panel |

## Home and task progress

| Shortcut | Where | Action |
|---|---|---|
| `c` (hover) | Home task list | Collapse or expand the hovered group |
| `Space` | Home, task progress | Open the reviewables of the selected task in the viewer |
| `Ctrl+click`, `Shift+click` | Home | Add tasks to the selection |
| Arrow keys | Home | Move across the board or list |
| Double click | Home, task progress | Show the details panel |
| `Esc` | Home, task progress | Close the details panel |
| `Shift+E` | Task progress | Expand or collapse all folders |

## Products

| Shortcut | Action |
|---|---|
| `c` (hover) | Collapse or expand the hovered product group (grid view) |
| `Space` | Open the selected item in the viewer |

## Inbox

| Shortcut | Action |
|---|---|
| `r` | Refresh the current tab |
| `c` (hover) | Clear the hovered message |
| `Shift+C` | Clear all messages in the current tab |
| `x` (hover) | Mark the hovered message as read. Not available on the **Cleared** tab. |
| `Esc` | Close the details panel |

## Viewer

| Shortcut | Action |
|---|---|
| `Esc` | Close the viewer, or the slide-out panel when one is open. Does nothing in fullscreen. |
| `w` / `s` | Previous or next reviewable of the selected version |
| `f` | Cycle the view mode |

## Video player

| Shortcut | Action |
|---|---|
| `Space` or `k` | Play or pause |
| `ArrowLeft` or `3` | Back one frame |
| `ArrowRight` or `4` | Forward one frame |
| `j`, `1` or `Shift+ArrowLeft` | Back five frames |
| `l`, `2` or `Shift+ArrowRight` | Forward five frames |
| `Shift+A` | Go to the first frame |
| `Shift+D` | Go to the last frame |
| `m` | Mute or unmute |
| `b` | Brush tool (when annotations are available) |
| `e` | Eraser tool (when annotations are available) |

## Bundles

| Shortcut | Action |
|---|---|
| `n` | New bundle |
| `a` | Install addon (opens the addon upload dialog) |
| `l` | Install launcher (opens the installer upload dialog) |
| `p` | Install dependency package (opens the package upload dialog) |
| `Shift+D` | Duplicate the selected bundle. Requires exactly one selected bundle, or an open new-bundle form. |
| `Shift+A` | In the new-bundle form, select all addons in the filtered list, or clear the selection when all are selected |

## Addons

| Shortcut | Action |
|---|---|
| `a` | Install addon (opens the addon upload dialog) |

## Users and project access

| Shortcut | Where | Action |
|---|---|---|
| `n` | Users | New user |
| `a` | Project access | Assign access groups to the selected users |
| `r` | Project access | Remove the selected access group from the selected users |
| `Ctrl+Enter` | Project access assign dialog | Save |
| `Ctrl+A` | Project access assign dialog | Select or clear all access groups |

## Projects page

| Shortcut | Action |
|---|---|
| `Esc` | Clear the selection |

## Text editors

The markdown editor, used for descriptions and comments, supports these shortcuts. `Mod` is `Ctrl` or `Cmd`.

| Shortcut | Action |
|---|---|
| `Mod+B` | Bold |
| `Mod+I` | Italic |
| `Mod+E` | Inline code |
| `Mod+K` | Link |
| `#`, `##`, `###` at line start | Heading 1 to 3 |
| `>` at line start | Quote |
| `-` or `1.` at line start | Bullet or numbered list |
| `[]` at line start | Checklist |
| ` ``` ` | Code block |

## Related
- [Navigating the web app](navigating-the-web-app.md)
- [Market](market.md)
- [Bundles and addons](bundles-and-addons.md)
- [Users and permissions](users-and-permissions.md)
- [Events](events.md)
- [Services](services.md)
