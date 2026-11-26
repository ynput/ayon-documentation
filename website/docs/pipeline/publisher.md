---
title: Publisher
description: "The AYON Publisher: the window with the Create, Publish, Report and Details tabs that defines products in a scene, edits their options, runs validation and publishing, and shows the publish report."
verified: 2026-11-23
ui_purpose: "Marks scene content as products to publish, edits their publish options, then validates and publishes them and shows the report."
ui_location: "AYON menu of the host application > Create... or Publish...; outside a host, the Tray Publisher"
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/window.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/widgets/overview_widget.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/widgets/create_widget.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/widgets/product_context.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/widgets/publish_frame.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/widgets/report_page.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/publisher/publish_report_viewer/widgets.py
  - https://github.com/ynput/ayon-core/blob/develop/server/settings/tools.py
---

# Publisher

<PageInfo />

The Publisher is where work leaves the artist's scene and becomes something the rest of the pipeline can use. Anything another department loads, reviews, renders on the farm or tracks in production goes through it: the modeler's mesh, the animator's cache, the lighter's render. It is the creator and the publisher in one window. The **Create** tab marks content of the open scene as a product to publish (in Maya a set with publish attributes, in Nuke a publishable write node) and the **Publish** tab runs the publish plugins over those products. The Publisher does not change the content itself: it stores the product definitions, called instances, as metadata in the workfile, so the next publish of the same scene starts from the same list.

This page describes the window. How a publish runs (the collect, validate, extract and integrate stages and their plugins) is described on the [Publishing](publishing.md) page; the names of the resulting products on [Product types](product-types.md) and [Naming conventions](naming-conventions.md).

## Where it appears

- **In a host application:** the AYON menu of the integration. The Maya, Nuke and Blender integrations add **Create...** (opens the **Create** tab) and **Publish...** (opens the **Publish** tab); other integrations call the same window with the tab to show. The window title is `AYON Publisher`, followed by a context subtitle when the host provides one. There is one window per host session, created on first use and reused.
- **Outside a host application:** the Tray Publisher addon opens the same window for files from disk, see [Tray Publisher](../addons/essentials/traypublisher/index.md).

Each time the window is shown it resets: the create context is rebuilt from the scene, the publish state is cleared and the plugins are discovered again. On the first reset after opening it shows the **Create** tab, unless the caller asked for a specific tab.

A typical session from an artist's point of view:

1. Select what to publish in the scene.
2. On the **Create** tab, pick the publish type, check the folder and task, type a variant (every folder usually has a `Main` variant; other variants are named freely) and click **Create**.
3. On the **Publish** tab, check which products are active and adjust their publish options.
4. Type a comment and click **Publish** (or **Validate** first). When a validator fails, the **Report** tab explains the problem and often offers a repair action.

## Layout

The window opens at 1300 by 800 pixels, centered. From top to bottom it has:

| Region | Content |
|---|---|
| Header | AYON icon, context label (the current project, folder and task), and the **?** help button. |
| Tab strip | Four tabs: **Create**, **Publish**, **Report**, **Details**. |
| Content | The page of the active tab. **Create** and **Publish** share one page, the overview, which animates between the two states. |
| Footer | Comment input and the buttons **Save**, **Reset**, **Stop**, **Validate**, **Publish**. |
| Publish frame | A floating bar at the bottom edge that is shown while a publish is running or paused. |

### Overview page (Create and Publish tabs)

The overview has three panels. Which of them are visible depends on the tab.

| Panel | Create tab | Publish tab |
|---|---|---|
| Create panel (context, creators, create options) | Visible, left | Hidden |
| **Products to publish** (instance list) | Visible, center | Visible, left |
| **Publish options** (attributes of the selected instances) | Hidden | Visible, right |

Switching between **Create** and **Publish** slides the create panel out and the **Publish options** panel in. Double-clicking an item in the instance list switches to the **Publish** tab. On the **Create** tab, an arrow handle appears at the right edge of the window when the mouse is in the right part of the window; clicking it switches to the **Publish** tab.

## Products to publish (instance list)

The list holds the instances of the current scene: one entry per product the publish will output, plus the **Context** entry and, when present, a group of incompatible products.

| Element | Meaning |
|---|---|
| **Context** entry | Represents the publish context itself (global attributes of the publish, not a product). Selecting it shows publish plugin attributes that apply to the whole publish. |
| Instance entry | One product. Shows the product name and an on/off toggle. Cards also show the folder name and the task. A warning icon with the tooltip "Contain invalid context. Please check details." marks an instance whose folder or task is invalid. |
| Toggle | Activates or deactivates the instance. Inactive instances are skipped by the publish. Mandatory instances have no toggle. A child instance that shares its active state with a parent follows the parent and its toggle is disabled while the parent is inactive. |
| Group header (list views) | Instances are grouped by the group label of their creator; the header has a toggle that switches all children (partially checked when mixed). |
| **Incompatible products** group | Entries of the legacy convertors: old publishable products that the current Publisher cannot use. |
| Orphaned instances | In the grouped list view, children whose parent instance no longer exists are collected in a separate group. |

Buttons below the list:

| Control | What it does |
|---|---|
| Add button (tooltip "Create new instance") | Switches to the **Create** tab. |
| Delete button (tooltip "Remove selected instances") | Removes the selected instances after the confirmation "Do you really want to remove the instance?" (or the count when several). Disabled while nothing is selected. |
| View buttons | Three buttons at the right switch the view: **Card view**, **List view** and **Parent grouping view** (a list grouped by parent instance). |

The default view is the card view. When an instance is added in the card view and the count reaches 10, the window switches to a list view on its own. The selection is kept when the view changes.

Selection and keyboard in the views:

| Input | Effect |
|---|---|
| Click | Selects one entry. |
| Ctrl+click, Shift+click (cards) | Extends the selection or selects a range. Lists use the standard extended selection. |
| Space | Toggles the active state of the selected instances. |
| Return | Activates the selected instances. |
| Backspace | Deactivates the selected instances. |

The toggle keys are ignored while a publish is running. The toggles of all instances are disabled during a publish and enabled again on reset.

## Create tab

<!-- screenshot: the Create tab of the Publisher with a creator selected, its options and the product name (current release shows "Product base type") -->

### Create context panel

The left panel chooses the folder and task the new product is created for. It contains a folder name filter (placeholder "Folder name filter..."), a toggle button that limits the tree to folders with a task assigned to the current user, a **Go to current context** button (shown when the host has a current folder), the folder tree and the task list. On a reset the selection returns to the current context of the host. The panel is disabled when the selected creator does not allow a context change; in that case the product name field shows `< Valid variant >` because the name is not calculated.

### Creators and create options

The creator panel shows, for the selected creator, an icon, its product type (with the product base type in brackets when it differs) and a description. Below, two columns:

| Column | Content |
|---|---|
| **Choose publish type** | List of creators (artist creators only), sorted by their show order. Entries are the creator labels; a creator that serves several product types lists one entry for each. Creators filtered by the **Filter creator profiles** setting are not listed. |
| **Create options** | The **Variant** and **Product** fields, an optional thumbnail, the creator's pre-create attributes and the **Create** button. |

| Control | What it does |
|---|---|
| **Variant** | Text input with a drop-down of hints: the creator's default variants, a separator, then variants already used for the same product naming in the selected folder. The default value is the creator's default variant, falling back to `Main`. Allowed characters: letters, digits, `_` and `.`. Pressing Return creates. |
| **Product** (read only) | Preview of the final product name, calculated by the creator with the product name profiles of the **Creator** tool settings from the selected folder, task and variant. |
| Thumbnail | Shown only for creators that accept a thumbnail. Buttons on hover: take screenshot, paste from clipboard, browse for a file, clear. Also accepts a dropped image (`.png`, `.jpg`, `.jpeg`). |
| Pre-create attributes | Attribute widgets defined by the creator. When the creator has none the panel shows "This creator has no configurable options". |
| **Create** (tooltip "Create new product/s") | Creates the instance from the current selection of the host. On success a message "Creation finished..." appears and the variant is kept for the next creation. |

The **Variant** field is colored by its state: empty, existing (the product name already exists in the folder, compared case-insensitively), new, and invalid. The **Product** field shows these placeholders instead of a name:

| Shown text | Condition |
|---|---|
| `< Invalid variant >` | The variant contains characters outside the allowed set. **Create** is disabled. |
| `< Missing task >` | The naming template needs a task and none is selected. **Create** is disabled. |
| `< Folder is not set >` | No folder is selected. |
| `< Valid variant >` | The creator does not allow a context change, so no name is previewed. |

**Create** is also disabled, with a tooltip, when no creator is available ("Creator is not selected") or no folder is selected ("Context is not selected"), and when the variant is empty.

## Publish tab (Publish options)

<!-- screenshot: the Publish tab of the Publisher with a product selected and its publish options -->

Selecting instances in the list fills the **Publish options** panel on the right. For several selected instances, values that differ are shown as `< Multiselection >` and changes are applied to all selected instances. Changes to attributes are saved into the workfile with the other instance data.

| Section | Content |
|---|---|
| Global attributes | Form with **Variant**, **Folder**, **Task**, **Product base type** (read only) and **Product name** (read only). Changes are held back until **Confirm** is pressed; **Cancel** restores the previous values. Both buttons appear only while a value differs. **Confirm** recalculates the product name with the naming template and writes variant, folder, task and name to the instances. Instances whose creator has a promised context (folder and task are defined by the creator) have the folder and task fields disabled. If the task is required by the template and missing, the task field shows `< One or more products require Task selected >`. |
| Thumbnail | Same widget as on the **Create** tab; applies to the selected instances and to the context entry. |
| Creator attributes | Attributes the creator defines for its instances. Equal definitions of different instances are merged into one widget. Labels of values that differ from their default are marked, and a revert-to-default action is available on the label or the widget. Widgets are disabled when the context of an instance is invalid. Button attributes call the creator's callback for the selected instances. |
| Publish plugin attributes | Attributes defined by publish plugins for the selected instances or for the context, with the same override marking and revert action. |
| Incompatible products notice | When convertor entries are selected, a notice "Found old publishable products incompatible with new publisher." with the button **Update products** appears above the creator attributes. The button saves changes and runs the selected convertors. |

Instances with an invalid folder or task have their attribute sections disabled and make **Validate** and **Publish** unavailable until the context is corrected.

## Footer and publish controls

| Control | Tooltip | What it does | Enabled when |
|---|---|---|---|
| Comment input | Placeholder "Attach a comment to your publish" | Text stored as the publish comment on the context. Hidden while a publish runs, cleared after a successful publish and on close. | Not publishing |
| **Save** | "Save changes (Ctrl+S)" | Writes instance data to the scene. Asks for confirmation when the host context changed since the last reset. | Plugin discovery did not block the window |
| **Reset** | "Reset & discard changes (Ctrl+R)" | Rebuilds the create context from the scene, discards unsaved changes and resets the publish. | Not publishing |
| **Stop** | "Stop/Pause publishing" | Pauses the running publish after the current plugin. | Publishing |
| **Validate** | "Validate" | Runs the publish and stops after the validation order. | Publish not started or not yet validated, and all active instances valid |
| **Publish** | "Publish" | Runs the publish to the end; continues a paused publish. | Publish can continue, and all active instances valid |

Validate and Publish first check the comment length (see settings), then save the changes, then start. The window ignores Escape and Enter so that they do not close it or trigger a button. Closing the window saves the changes unless the host context changed.

States of the window:

| State | Create tab | Reset | Stop | Validate | Publish | Publish frame | Page content |
|---|---|---|---|---|---|---|---|
| Before publish | Enabled | Enabled | Disabled | Enabled | Enabled | Hidden | Editable |
| Running | Disabled | Disabled | Enabled | Disabled | Disabled | Visible, progress | Covered by an overlay |
| Paused | Disabled | Enabled | Disabled | Enabled until validated | Enabled | Visible | Not editable until a reset |
| Validation failed | Disabled | Enabled | Disabled | Disabled | Disabled | Visible, validation message | Not editable until a reset |
| Crashed | Disabled | Enabled | Disabled | Disabled | Disabled | Visible, error message | Not editable until a reset |
| Finished | Disabled | Enabled | Disabled | Disabled | Disabled | Visible, "Finished" | Not editable until a reset |

A reset returns the window to the first row. While publishing the **Create** tab cannot be opened; an attempt shows "Can't switch to Create tab because publishing is paused." When a publish starts on the **Create** tab, the window switches to **Publish**. When a publish stops on the **Publish** tab, the window switches to **Report**.

### Publish frame

A floating bar over the footer while a publish exists. Clicking the bar shrinks or expands it.

| Element | Content |
|---|---|
| Main label | `Publishing...`, `Publish paused` (with ` - Validation passed` when validation completed), `Error happened`, `Your publish didn't pass studio validations`, or `Finished`. |
| Second label | A hint ("Hit publish (play button) to continue."), the error message of a crash, or "Check results above please" for validation failures. |
| Progress | Name of the instance and the plugin being processed, and a progress bar. Hidden after validation errors. |
| Report button | Menu with **Go to details** (opens the **Details** tab), **Copy report** (JSON of the report to the clipboard) and **Export report** (saves a JSON file, default name `publish-report-<yymmdd-HH-MM>` in the home folder). |
| Buttons | Reset, Stop, Validate and Publish, with the same states as in the footer. |

The color of the bar follows the state: success, error, validation error, in progress and paused.

## Report tab

The **Report** tab shows the result of the last publish run, with a header that names the state: "Nothing to report until you run publish", "Publish report", "Publish success report", "Publish validation report" or "Publish error report". The page has up to three columns; which of them appear depends on the outcome.

| Outcome | Left column | Middle | Right |
|---|---|---|---|
| Paused or finished | Instances with a state icon: in progress, success, warning or error | Logs of the selected instances | None |
| Validation errors | Error list | Actions above the logs of the selected error | Description and details of the error |
| A plugin stops the publish with a publish error | Error list | Actions above the logs | Description and details |
| Any other crash (unexpected exception) | Instances | A "This is not your fault" notice with **Copy to clipboard** and **Save to disk** buttons, asking to report the error to pipeline support | None |

### Validation error view

Validation errors are grouped by the title that the validator gives its error. Each group is a row in the left column; groups for context validators have no instance list, groups for instance validators list the instances with a problem and can be expanded with an arrow. Errors that are not validation errors (plugin crashes) show an error icon. Selecting a group, or instances inside it, filters the logs to the instances and the plugin that failed.

| Element | Content |
|---|---|
| Actions | A button for each active action of the failing plugin whose filter is `failed` or `all` (typically repair or select-invalid actions). A click runs the action; a failure of an action opens an error dialog with the action label, message and traceback. |
| Description | Plain description of the problem, written as Markdown by the plugin. |
| **Details** | Collapsible block with the longer detail text of the plugin, shown only when the plugin provides one. |
| Logs | Log lines of the filtered instances and plugin with level icons. |

## Details tab

![The Details tab of the AYON Publisher in Maya: the Context instance on the left with Hide removed instances on, the plugin list with Hide skipped plugins on, and the Logs sub-tab with the log levels drop-down, the search field and Show timestamps, above the comment field and the footer buttons](assets/publisher/publisher-details.webp "Details tab")

The **Details** tab embeds the publish report viewer, the same viewer the tray offers as **Publish report viewer** in its Admin submenu.

| Region | Content |
|---|---|
| Instances list | Instances of the report, with errored ones marked. Switch **Hide removed instances** (on by default). |
| Plugins list | Plugins of the report in order, with errored ones marked. Switch **Hide skipped plugins** (on by default). |
| **Logs** sub-tab | All log records, filtered by the selected instances and plugins. See the controls below. |
| **Plugins Details** sub-tab | For each selected plugin: label with its type, docstring, **Class**, **Order**, **Families**, **File Path** and **Time** (`Not started`, `Skipped plugin` or the processing time). |
| **Crashed plugins** sub-tab | Plugin files that failed to import, with file path and traceback. Files that block publishing are marked with a red icon. Opened automatically when blocking paths exist. |
| Pop Out button | Opens the sub-tabs in a separate **Report Details** dialog. |

Controls of the **Logs** sub-tab:

| Control | What it does |
|---|---|
| Log levels drop-down | Multi-select of Debug, Info, Warning, Error, Critical; empty means all. |
| Search field | Two modes switched by the button at its left: search (placeholder "Search logs...", lists matches with surrounding text and jumps between them with Enter and Shift+Enter) and filter (placeholder "Filter logs...", shows only matching log entries). |
| Surrounding lines | In filter mode, the number of log entries kept before and after each match. |
| **Show timestamps** | Shows the time of each log record (on by default). |

If plugins fail to import and the **Validate plugins discovery** setting is on, the window shows the critical message "Failed to load plugins", jumps to the **Details** tab, disables the overview, **Save**, **Validate** and **Publish**; **Reset** stays enabled.

## Help button

The **?** button in the header opens a **Help dialog** to the right of the window. It shows the detailed description of the selected creator, rendered from Markdown. Creators without a detailed description show "We didn't prepare help for this part...".

## Tool settings

Tool settings are set in the studio settings and can be overridden per project.

The Publisher has no permission gate of its own: it works for any user who can run the host application, and what a user can publish depends on the permissions on the server, since publishing writes to the project.

The Publisher reads these Core addon settings:

- [Tools > Creator](../addons/essentials/core/settings.md#creator): which creators are listed in **Choose publish type** (creator filter profiles), and the product name profiles behind the **Product** preview. How product names are built is described in [Naming conventions: product names](naming-conventions.md#product-naming).
- [Tools > Publish](../addons/essentials/core/settings.md#publish-tool): the minimum comment length (Validate and Publish refuse to start while the comment is shorter, with the message "Please enter a comment of at least N characters"), and **Validate plugins discovery**, the strict mode described under [Details tab](#details-tab).

The defaults of **Creator attributes** and **Publish plugin attributes** come from the settings of the addon that owns the creator or plugin, usually the host addon.

## Related

- [Publishing](publishing.md): the stages of a publish and the plugins that run.
- [Product types](product-types.md) and [Naming conventions](naming-conventions.md): what a product is and how names are built.
- [Workfiles](workfiles.md): the scene file the instance data is saved in.
- [Loader](loader.md) and [Scene Inventory](scene-inventory.md): the tools that consume published products.
- [Experimental tools](experimental-tools.md): includes the Pyblish Debug Stepper, which pauses a publish plugin by plugin.
- [Process Monitor](process-monitor.md): the console output of an application, useful when a publish crash is logged there.
- [Tray Publisher](../addons/essentials/traypublisher/index.md): the same window outside a host application.
- [Core addon settings](../addons/essentials/core/settings.md): the Creator and Publish tool settings.
