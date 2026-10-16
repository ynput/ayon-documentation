---
title: Views
description: "Views save the layout of a web app page (filters, sorting, grouping, columns) as a working view, saved views with sharing, and studio or project default views."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/4664475-views
---

# Views

A **view** stores the layout of a page of the AYON web app: filters, sorting, grouping, columns and the other display settings of that page. Every user has a private **Working view** per page that records the current layout. Saved views keep a layout under a name, can be shared with other users, groups and teams, and can be set as the default layout of a project or of the whole AYON server.

The Working view and the studio default view are available without a license. Saved views, sharing and project default views are Power Features and are marked with a lightning symbol. See [Power features](power-features.md).

## Where it appears

The views button is in the toolbar of each page that supports views. Its menu lists the views of that page.

| Page | View type |
|---|---|
| [Tasks home](tasks-home.md) | One set per home page tab |
| [Project overview](project-overview.md) | `overview` |
| [Task progress](task-progress.md) | `taskProgress` |
| [Products and versions](products-and-versions.md) | `versions` |
| [Lists](lists.md) | `lists` |
| [Review sessions](../addons/production-tracking/review/index.md) | `reviews` |
| [Reports](../addons/production-tracking/reports/index.md) | `reports` |
| [Planner](../addons/production-tracking/planner/index.md) | `scheduler` |
| [Inbox](inbox-and-notifications.md) | One set per tab (Important, Other, Cleared) |
| CSV import dialog | `import.<context>`, shown as **Mapping presets** (see [Data import](data-import.md)) |

Each page has its own set of views. A view saved on the Project overview page is not offered on Task progress or any other page. The data of a view is stored on the AYON server, so views follow the user between machines.

## Menu

The views menu contains the following sections. Sections without items are hidden, and without a Power license only the Working view is listed.

| Entry | Description |
|---|---|
| **Working view** | The private working layout of the user. Has a reset button (**Reset to Default**, shortcut `Shift+Ctrl+0`, `Shift+Cmd+0` on macOS) that clears filters and column settings. |
| **My views** | Saved views the user owns. |
| **Shared views** | Saved views owned by others that are shared with the user. |
| **All private views** | Private views owned by other users. Administrators only. |
| **Default view** | Studio and Project buttons that set, load or remove a default view. Shown to administrators only. |
| **Create new view** | Opens the **Create new view** dialog with the current layout. Shows a lightning symbol without a Power license. |

Each saved view row has two buttons that appear with the row:

| Button | Description |
|---|---|
| Save icon | Overwrites the saved view with the current layout of the Working view. A **Confirm save** dialog asks first. Shown while another view is selected and the user can edit it. |
| More icon (**Edit view**) | Opens the **Edit view** dialog. |

## Working view

Changes to filters, sorting, grouping or columns are applied to the Working view. Saved views are never changed automatically: changing the layout while a saved view is loaded switches the page back to the Working view, which carries the modified layout. A saved view changes only when it is saved explicitly or edited in the dialog.

The Working view is always private and belongs to one page and one project.

## View dialog

**Create new view** and **Edit view** open the same dialog. A new view is created from the layout currently on screen.

| Field | Description |
|---|---|
| **View name** | Name shown in the menu. Required. |
| **Scope** | **Project - &lt;project name&gt;** makes the view available in the current project only. **All projects** makes it available in every project. The scope cannot be changed after creation. Not shown on pages that are not project specific. |
| Access | Who can use the view and with which access level. Subjects are **Everyone**, individual users, groups and teams. |

| Button | Description |
|---|---|
| **Create** / **Save** | Creates the view or saves the changes. `Ctrl+Enter` in the dialog also submits it. |
| **Duplicate** | Creates a new view from the loaded view. Shown when editing. |
| **Delete** | Deletes the view. Shown when editing, for users with the Admin access level. |
| **Cancel** | Closes the dialog. |

### Access levels

| Level | Description |
|---|---|
| Viewer | Can load and use the view. Cannot change its layout or settings. |
| Editor | Can change the name, scope and layout of the view. Cannot manage access or delete it. |
| Admin | Full control, including access and deletion. The owner of a view has this level. |

A view is private while it is shared with nobody. The owner of a view can be changed only by an administrator of the AYON server.

## Default views

A default view is a saved layout offered as the standard starting layout. The default view is never applied automatically to a user who opens a page for the first time; it is loaded into the Working view on request. The **Default view** section of the menu is shown to administrators.

| Scope | Description |
|---|---|
| Studio | Applies to all projects and users. Used as the fallback when no project default exists. Available without a Power license. |
| Project | Applies to one project and overrides the studio default there. Requires a Power license. |

The **Studio** and **Project** buttons behave as follows:

| State of the button | Click action |
|---|---|
| No default view exists (plus icon) | Saves the current Working view layout as the default view of that scope. |
| A default view exists (close icon on the button) | The button loads the default layout into the Working view. The close icon removes the default view after a confirmation (**Remove Default View**). |

## Settings stored per page

| Page | Stored in a view |
|---|---|
| Project overview | Hierarchy visibility, row height, grouping and group order, empty groups, sorting, filters, folder filter, slicer type, columns |
| Task progress | Filters, slicer type, columns |
| Products and versions | Product visibility, row height, grid display and height, featured version order, slicer type, grouping and group order, empty groups, latest per folder, sorting, filters, columns |
| Lists | Row height, sorting, filters, columns |
| Review sessions | Row height, sorting, filters, columns, grid height, display style (cards, table, playlist) |

Columns are stored with their visibility, pinning and width.

## Permissions

| Action | Who |
|---|---|
| Use the Working view, load the studio default view | All users |
| Create, share and load saved views; project default views | Users on an AYON server with the Power Features addon and a Power license |
| See and manage the **Default view** section | Administrators |
| Create a default view on the AYON server | Managers and administrators |
| Delete a view | Its owner, users with the Admin level and administrators |

## Related

- [Power features](power-features.md)
- [Power Features addon](../addons/production-tracking/power-pack/index.md)
- [Keyboard shortcuts](../ayon/web-ui/keyboard-shortcuts.md)
- [Navigating the web app](../ayon/web-ui/navigating-the-web-app.md)
