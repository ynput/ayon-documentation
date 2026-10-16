---
title: Navigating the web app
description: "The AYON web app's top bar, the App, Help and User menus, the project menu, page tabs and the server version indicator."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/5961925-navigating-ayon-server
---

# Navigating the web app

The AYON web app is served by the AYON server and is the main interface for production work and server administration. Every page shares a top bar with navigation buttons and menus. Most pages add a second row of tabs below it. Which entries appear depends on the user's role.

## Layout

The top bar has three regions.

| Region | Content |
|---|---|
| Left | Project menu button (user role and above), **Home** button |
| Center | Breadcrumbs showing the current location |
| Right | Prompts, bundle mode selector, chat bubble, **Help** menu, **Inbox**, **App** menu, **User** menu |

Guest users see only the **Home** button and the **User** menu. The chat bubble, Help, Inbox and App buttons are hidden for them.

### Left region

| Control | What it does | Shortcut |
|---|---|---|
| Project menu button (panel icon) | Toggles the project menu, a searchable list of projects with pinned projects at the top. Selecting a project opens its project pages. | `1` |
| **Home** | Opens the studio dashboard at `/dashboard/tasks`. Highlighted while any `/dashboard` page is open. | `h+h` |

The project menu is shown for users with the user role or above. While it is open only the menu toggle keys (`1`, `8`, `9`, `0`) are active.

### Right region

| Control | What it does | Shortcut |
|---|---|---|
| Launcher download prompt | Appears when the server hosts a launcher installer for the user's platform that has not yet been downloaded from this browser. Downloads the installer. Can be dismissed. | none |
| **Setup pipeline** prompt | Shown to administrators until the server has at least one launcher installer and one dependency package. Opens the **Bundles** page and the pipeline release installer. The close button hides it for the browser session. | none |
| Bundle mode selector | Appears for users with developer or staging access. Switches which bundle the user's own session resolves to: **Production**, **Staging** or **Developer**. A user with only one of the two modes sees a single switch instead of the dropdown. | none |
| Chat bubble | Opens the support messenger once it has loaded. A dot indicates unread messages. | none |
| **Help** menu (question mark) | Opens the [Help menu](#help-menu). | `8` |
| **Inbox** (inbox icon) | Opens `/inbox/important`. A dot indicates unread messages. | `i+i` |
| **App** menu (grid icon) | Opens the [App menu](#app-menu). A dot indicates a pending server restart. | `0` |
| **User** menu (avatar) | Opens the [User menu](#user-menu). | `9` |

## App menu

The App menu holds configuration and system pages. Entries are filtered by role.

| Entry | Route | Shortcut | Visible to |
|---|---|---|---|
| **Studio Settings** | `/settings/studio` | `s+s` | Managers and administrators |
| **Site Settings** | `/settings/site` | `s+s` | Users (replaces Studio Settings) |
| **Projects Settings** | `/manageProjects/projectSettings` | `p+p` | Everyone with the menu |
| **Event Viewer** | `/events` | `e+e` | Managers and administrators |
| **Services** | `/services` | `v+v` | Managers and administrators |
| **Market** | `/market` | `m+m` | Administrators |
| **Update Pipeline** | Opens the pipeline release installer | none | Administrators |
| **Restart Server** / **Restart Required** | Asks for confirmation, then restarts the server. The label and highlight change when a restart is required. | none | Administrators |
| **Launch Bootstrap Setup** | Restarts the onboarding flow and reloads the page | none | Users with developer mode enabled |

Administrators also see the Ynput Cloud connection control at the bottom of the menu. The footer of the menu shows the server version string with a button that copies it. The string has the form `<backend version>+<frontend build>`, for example `1.13.4+202512041544`.

Some pages have shortcuts but no menu entry: `a+a` (project anatomy), `b+b` (bundles), `u+u` (users). See [Keyboard shortcuts](keyboard-shortcuts.md).

## Help menu

Entries marked "when loaded" appear once the help and feedback widget has loaded.

| Entry | Target | Visible to |
|---|---|---|
| **Help center** | Opens the help center (when loaded) | Everyone |
| **Latest changes** | Opens the changelog (when loaded) | Everyone |
| **Submit Feedback** | Opens the feedback form (when loaded) | Everyone |
| **Community Forum** | `https://community.ynput.io/` | User role and above |
| **Discord Server** | `https://discord.gg/ynput` | User role and above |
| **Dev Portal** | `https://docs.ayon.dev/` | User role and above |
| **REST API** | `/doc/api`. Interactive API documentation of this server, including the endpoints of the addons in the active bundle. | User role and above |
| **GraphQL Explorer** | `/explorer`. Interactive GraphQL query tool. | User role and above |

## User menu

The menu header shows the user's avatar and full name.

| Entry | Target |
|---|---|
| **Account** | `/account/profile`. The account area has the tabs **Profile**, **Sessions** and **Launchers**. |
| **Download Launcher** | `/account/downloads`, the launcher installers hosted on this server. Administrators manage them in [bundles and addons](bundles-and-addons.md). |
| **Sign out** | Ends the session (`0+0`). |

**Account** and **Download Launcher** are hidden for guests.

## Page tabs

Pages show a second row of tabs. Addons can add tabs to these rows.

| Area | Route | Tabs |
|---|---|---|
| Home | `/dashboard/<tab>` | **Tasks**, **Projects**, plus addon pages |
| Project | `/projects/<project>/<tab>` | **Overview**, **Task progress**, **Browser** (when enabled), **Products**, **Lists**, **Review**, **Reports**, **Workfiles**, plus addon pages. Requires the user role or above. |
| Project settings | `/manageProjects/<tab>` | **Anatomy**, **Project settings**, **Project permissions** (managers), **Project access**, **Site settings**, **Roots**, **Teams** (managers) |
| Studio settings | `/settings/<tab>` | **Global** (administrators), **Addons**, **Bundles**, **Studio settings**, **Site settings**, **Anatomy presets**, **Attributes**, **Users**, **Permissions**, **Secrets**, plus one tab per addon with studio settings. All except **Site settings** require the manager role. |
| Inbox | `/inbox/<tab>` | **Important**, **Other**, **Cleared** |
| Account | `/account/<tab>` | **Profile**, **Sessions**, **Launchers** |

Visibility of project settings tabs also depends on the user's access group permissions. When a user opens a tab they cannot access, the app redirects to the first tab they can.

## Permissions

| Role | Top bar |
|---|---|
| Administrator | Everything described above |
| Manager | No **Market**, **Update Pipeline**, **Restart Server**, **Global** tab or setup prompt |
| User | **Site Settings** instead of **Studio Settings**; no **Event Viewer** or **Services** |
| Guest | **Home** and **User** menu only |

## Related
- [Keyboard shortcuts](keyboard-shortcuts.md)
- [Market](market.md)
- [Bundles and addons](bundles-and-addons.md)
- [Users and permissions](users-and-permissions.md)
- [Events](events.md)
- [Services](services.md)
