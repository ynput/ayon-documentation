---
title: Attributes
description: "The Attributes page of the AYON web app: the attribute table, scopes, data types, the attribute editor, dynamic enums, and attribute permissions."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/4636995-attributes
---

# Attributes

Attributes are the named, typed properties of AYON entities, such as `frameStart`, `fps` or `priority`. An attribute is defined once for the whole AYON server (its name, scopes, type and validation rules) and then exists on every entity of its scopes. The **Attributes** page lists all definitions and edits them. Attribute values are not edited here; they belong to the individual entities.

## Where it appears

| Item | Value |
|---|---|
| Location | **Attributes** link in the settings navigation bar, after **Anatomy presets** |
| URL path | `/settings/attributes` |
| Visible to | Managers and admins. Only admins can save changes (see [Permissions](#permissions)). |

Attributes are defined for the AYON server as a whole. There is no per-project attribute definition.

## Layout

A toolbar sits above a table of attributes. A change in the table is local until it is saved.

### Toolbar

| Control | What it does |
|---|---|
| **Add Attribute** | Opens the attribute editor for a new attribute. |
| **Delete attribute** | Removes the selected attribute from the table. Disabled for built-in attributes. |
| **Filter attributes...** | Filters the table by name, title, scope and type. |
| **Unsaved Changes** | Label shown while the table differs from the saved state. |
| **Clear changes** | Discards all unsaved changes. |
| **Save attributes changes** | Saves the table to the AYON server. Deleted custom attributes are removed from the server at this point. |

### Table columns

| Column | Meaning |
|---|---|
| Drag handle | Reorders rows. The order is stored as the attribute position. |
| **Name** | Internal name. |
| **Title** | Label shown in the web app. |
| (unnamed) | Shows `built-in` for built-in attributes. |
| **Scopes** | Entity types the attribute exists on. |
| **Type** | Data type as shown in the editor, for example **Text**, **Select**, **Number**, **Checkbox**, **Date and time**, or **Select (multiple)**. |
| **Example** | Example value. |
| **Description** | Description. |
| **Inherit** | Whether child entities inherit the value. |

A double click on a row opens it in the attribute editor. The context menu has **Edit** and **Delete**; **Delete** is disabled for built-in attributes.

## Sources of attributes

| Source | Description |
|---|---|
| Built-in | Defined by the AYON server and required by it, for example `priority`, `fps`, `resolutionWidth`, `resolutionHeight`, `pixelAspect`, `clipIn`, `clipOut`, `frameStart`, `frameEnd`, `handleStart`, `handleEnd`, `fullName`, `email`, `startDate`, `endDate`, `description`. They are marked `built-in` and cannot be deleted. Their scope, type and multi-select setting are locked; other settings can be changed, which can break features that depend on them. |
| Custom | Created on this page by an admin. |
| Addon | Registered by an addon when it is used on the AYON server, for example the tracker addons add identifiers such as `ftrackId`. Changing them can break the addon. |

An attribute has to be defined on the AYON server before pipeline code, publish plugins or sync tools can read or store it.

## Scopes

The **Scope** of an attribute lists the entity types it exists on. The scope can contain several entries.

| Scope | Entity |
|---|---|
| Project | Projects |
| Folder | Folders |
| Task | Tasks |
| Product | Products |
| Version | Versions |
| Representation | Representations |
| User | Users |
| List | Entity lists |

The scope of a built-in attribute cannot be changed.

## Attribute editor

The editor is a dialog. Its header shows the title of the attribute (or **New attribute**). The button is **Create Attribute** for a new attribute and **Save Attribute** for an existing one; `Ctrl+Enter` (`Cmd+Enter` on macOS) also confirms. Confirming applies the change to the table only; **Save attributes changes** sends it to the AYON server.

### Common fields

| Field | Description |
|---|---|
| **Title** | Label of the attribute. For a new attribute, the **Name** is generated from the title in camel case. |
| **Name** | Internal name, 2 to 64 letters and digits, no spaces or symbols. Must be unique. Fixed once the attribute exists. |
| **Scope** | Multi-select of the [scopes](#scopes). |
| **Type** | Data type, see [Data types](#data-types). Fixed once the attribute exists. |
| **Description** | Description. |
| **Example** | Example value. Not offered for **Checkbox**. |
| **Default** | Default value. Offered when the scope contains Project. A switch for **Checkbox**. |
| **Inherit** | Switch. A child entity takes the value of its parent when it has none of its own. Offered when the scope contains Project, Folder, Task, Product, Version, Representation or User. |

### Data types

| Type | Stored as | Extra fields |
|---|---|---|
| **Text** | `string` | **MinLength**, **MaxLength**, **Regex** (the value must match). A second dropdown selects the widget: **Short text** (single line) or **Long text** (multi-line with Markdown). |
| **Select** | `string`, or `list_of_strings` with **Multi-select** | **Multi-select**, **Enum**, and for multi-select **MinItems** and **MaxItems**. |
| **Number** | `integer`, or `float` with **Decimal** | **Decimal**, **Min**, **Max**. For decimal numbers a button beside each limit switches between inclusive (`≥`, `≤`) and strict (`>`, `<`) comparison; integer limits are always inclusive. |
| **Checkbox** | `boolean` | None. |
| **Date and time** | `datetime` (UTC) | None. |

### Enum source

The **Enum** field of a **Select** attribute chooses where the options come from.

| Source | Description |
|---|---|
| **Custom** | A list defined in the editor. Each item has **Label**, **Value**, **Icon** and **Color**. **Add new item** appends an item; items can be duplicated and removed. |
| A dynamic enum | Options generated from AYON data when the attribute is used, so the list stays current. |

Dynamic enums provided by the AYON server:

| Enum | Options |
|---|---|
| **Actions** | Actions of installed addons. |
| **Folder Types**, **Task Types**, **Statuses**, **Tags**, **Link Types** | The corresponding entries of the project anatomy. They depend on the project the attribute is used in. |
| **Users and teams** | Users and teams. Settings: **Hide inactive users** and **Mode** (**Users**, **Teams** or **Users and teams**). |
| **Attribute enumerator** | The enum options of another attribute, selected by attribute name. |

Addons can register further dynamic enums, which appear in the same dropdown.

When a dynamic enum is chosen, the editor shows its description, a note when the options depend on the project or the current user, its settings form, a preview of the first five options (with a count of the rest) and a **Debug** button. The **Debug** dialog has these sections:

| Section | Content |
|---|---|
| **Context Params** | Values such as `project_name` and `user` used to resolve the options. |
| **Form** | The settings of the enum. |
| **Enum Resolver Data** | The definition of the enum and the parameters it accepts. |
| Item list | The resulting options, with **Search items...**. |

## Restart

Saving attribute changes marks the AYON server as needing a restart. The AYON menu shows **Restart Required** until it is restarted, and the new definitions take effect after the restart.

## Permissions

| Action | Required |
|---|---|
| View the page | Manager or admin |
| Read attribute definitions (API) | Any signed-in user |
| Create, edit, delete and save | Admin |
| Change only descriptive metadata of an attribute (API) | Manager |

Which attribute values a user may read or change is set per access group, in the **Permissions** of the group:

| Setting | Effect |
|---|---|
| **Restrict attribute read** | Allows reading only the listed attributes. |
| **Restrict attribute update** | Allows changing only the listed attributes. It also covers fields such as **Name**, **Label** and **Status** and moving folders and tasks. Because it limits fields that are not shown in the interface, it can affect automated pipeline operations. |

The settings apply to users through their access groups; admins and managers have unrestricted access.

## Related

- [Users and permissions](users-and-permissions.md)
- [Entity templates](entity-templates.md)
- [Bundles and addons](bundles-and-addons.md)
- [Navigating the web app](navigating-the-web-app.md)
