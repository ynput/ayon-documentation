---
title: Publisher
description: "The AYON Publisher: the window with the Create, Publish, Report and Details tabs that defines products in a scene, edits their options, runs validation and publishing, and shows the publish report."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/articles/1075843-creator-publisher
---

# Publisher

The Publisher is the artist tool of the core addon that combines two jobs in one window: defining what is published (the Create part, formerly a separate Creator tool) and running the publish (the Publish part). It works on the scene of the host application it was opened from. It does not change content in the scene; it creates the metadata that marks content as publishable, stores that metadata in the workfile, and runs the publish plugins over it. The stages a publish goes through (collect, validate, extract, integrate) are described on the [Publishing](publishing.md) page; the names of the resulting products are described on the [Product types](product-types.md) and [Naming conventions](naming-conventions.md) pages.

## Where it appears

| Item | Value |
|---|---|
| Host applications | A menu entry of the AYON menu in the DCC integration. The Maya, Nuke and Blender integrations add **Create...** (opens the **Create** tab) and **Publish...** (opens the **Publish** tab). Integrations call the same window with the tab to show. |
| Window title | `AYON Publisher`, followed by a context subtitle when the host provides one. |
| Instances of the window | One window per host session. It is created on first use and reused. |
| Standalone | The Tray Publisher addon opens the same window outside of a DCC, see [Tray Publisher](../addons/essentials/traypublisher/index.md). |
| Experimental entry | In the Experimental tools dialog the **New publisher** button exists for the hosts `celaction`, `flame`, `harmony`, `hiero` and `resolve`. See [Experimental tools](experimental-tools.md). |

Each time the window is shown it resets: the create context is rebuilt from the scene, the publish state is cleared and the plugins are discovered again. On the first reset after opening it shows the **Create** tab, unless the caller asked for a specific tab.

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
| View button | Cycles through three views: cards, list, and list grouped by parent. Tooltips name the view the click changes to. |

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

## Permissions and settings

The Publisher has no permission gate of its own: it works for any user who can run the host application. What a user can publish depends on the project and task context and on the permissions on the server (publishing writes to the project).

Settings that influence it are in the Core addon settings, **Tools** group (see [Core addon settings](../addons/essentials/core/settings.md)):

| Setting group | Setting | Effect on the Publisher |
|---|---|---|
| **Creator** | **Product name profiles** | Templates that calculate the **Product** preview and the final product name from product base type, product type, host, task type and task name. |
| **Creator** | **Filter creator profiles** | Limits the creators in **Choose publish type** for matching host, task type and task name; entries are creator labels, regular expressions allowed. Without a matching profile all creators are listed. |
| **Creator** | **Use legacy product names for renders** | While on, render products ignore render templates in the product name profiles. |
| **Publish** | **Publish comment minimum required characters** | Validate and Publish refuse to start while the comment is shorter; the comment field is outlined in red and a message "Please enter a comment of at least N characters" appears. Default 0. |
| **Publish** | **Validate plugins discovery** | Strict mode: when a publish plugin file fails to import, publishing is blocked and the crashed plugin report is shown. |
| **Publish** | **Template name profiles**, **Hero template name profiles**, **Custom Staging Dir Profiles** | Used by the publish plugins, not by the window. See [Publishing](publishing.md). |

The attributes in **Creator attributes** and **Publish plugin attributes** come from the creators and publish plugins; their defaults come from the addon settings of the plugin owner (for example the host addon settings).

## Related

- [Publishing](publishing.md): the stages of a publish and the plugins that run.
- [Product types](product-types.md) and [Naming conventions](naming-conventions.md): what a product is and how names are built.
- [Workfiles](workfiles.md): the scene file the instance data is saved in.
- [Loader](loader.md) and [Scene inventory](scene-inventory.md): the tools that consume published products.
- [Experimental tools](experimental-tools.md): includes the Pyblish Debug Stepper, which pauses a publish plugin by plugin.
- [Tray Publisher](../addons/essentials/traypublisher/index.md): the same window outside a host application.
