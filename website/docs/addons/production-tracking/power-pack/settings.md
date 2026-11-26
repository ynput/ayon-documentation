---
title: Power Features addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Power Features addon with their default values: comment categories, calculated attributes, hierarchy templates, status sync, pinned project settings and personal API keys."
addon: powerpack
addon_repo: ayon-power-pack
addon_version: 1.8.3
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-24
---

# Power Features addon settings

<AddonInfo />

The settings of the [Power Features addon](index.md) are in **Studio settings > Power Pack**, and most of them can be overridden in **Project settings > Power Pack**; the exceptions are noted per group. Pasting a location below into the URI bar of the web app opens that setting. The statuses, folder types and product types offered in the status sync settings are not addon settings: they come from the [anatomy](../../../ayon/web-ui/studio/anatomy-presets.md) of the project. Views, list attributes and list access are set in the web app where they are used, not here.

## Comment categories

<SettingLocation uri="ayon+settings://powerpack/activity_categories" scope="Studio, with project overrides" />

Categories for comments in the activity feed, each with a highlight color and an access rule; see [Comment categories](index.md#comment-categories). Guests can comment only in a category given to them, so the categories also decide what clients see in a review; see [Client review](../../../production-tracking/client-review.md).

<!-- screenshot: settings editor, Activity Categories -->

<Settings>
<Setting name="Activity Categories" default="Guest, Director, Private">

<Settings>
<Setting name="Name">

Category name.

</Setting>
<Setting name="Color" default="#ffffff">

Highlight color of the category.

</Setting>
<Setting name="Access control" default="No rules">

Access level per subject: everyone, guests, a user, an access group or a team. The read level (10) lets a user see the comments of the category; the update level (20) also lets the user comment in it.

</Setting>
</Settings>

</Setting>
</Settings>

The three default categories:

- **Guest**, `#cd8de2`: guests and the access group `supervisor` can comment, everyone can read.
- **Director**, `#44ee9f`: the access group `supervisor` can comment, everyone can read.
- **Private**, `#ff9a47`: only the access group `supervisor` can read and comment.

## Calculated attributes

<SettingLocation uri="ayon+settings://powerpack/calculated_attributes" scope="Studio, with project overrides" />

Formulas that compute attribute values from other data of the entity, its children or its tasks. How formulas are written and evaluated is described in [Calculated attributes](calculated-attributes.md).

<!-- screenshot: settings editor, Calculated Attributes -->

<Settings>
<Setting name="Formulas" default="Empty list">

Each item defines one calculated attribute.

<Settings>
<Setting name="Attribute" default="Empty">

The attribute to calculate. The list offers the attributes whose scope includes a project-level entity type.

</Setting>
<Setting name="Entity types" default="Empty list">

Entity types the formula applies to. At least one is required, and the attribute must exist on each selected type.

</Setting>
<Setting name="Formula" default="Empty">

Jinja2 template, validated when the settings are saved. The variables are listed in [Variables and functions](calculated-attributes.md#variables-and-functions).

</Setting>
<Setting name="Calculation mode" default="Automatic">

- **Automatic:** the system decides from the complexity of the formula.
- **Manual:** the attribute is calculated only when a user triggers it.
- **Always:** the attribute is calculated when the entity is saved.

</Setting>
</Settings>

</Setting>
</Settings>

## Hierarchy templates

<SettingLocation uri="ayon+settings://powerpack/hierarchy_templates" scope="Studio templates at studio level, project templates per project" />

Folder and task structures that can be created in a project in one step. The JSON structure of a template is described in [Hierarchy templates](index.md#hierarchy-templates).

<!-- screenshot: settings editor, Hierarchy Templates -->

<Settings>
<Setting name="Sort alphabetically" default="Disabled">

Studio only. Ignores the positions of the templates in the lists and always sorts them alphabetically.

</Setting>
<Setting name="Studio Templates" default="Empty list">

Studio only. Templates available in every project.

<Settings prefix="studio-templates">
<Setting name="Name" default="Empty">

Unique in the list.

</Setting>
<Setting name="Template" default="Empty">

The template as JSON. It is checked against the template structure and reformatted when saved.

</Setting>
</Settings>

</Setting>
<Setting name="Project Templates" default="Empty list">

Project only. Templates available in one project, with the same fields as **Studio Templates**.

</Setting>
</Settings>

## Status sync

<SettingLocation uri="ayon+settings://powerpack/sync_statuses" scope="Studio, with project overrides" />

Rules that change statuses automatically when a related entity changes status. Each of the four rules has its own **Enabled** switch, disabled by default. The status, folder type and product type choices come from the anatomy.

<!-- screenshot: settings editor, Status sync -->

### Sync status from Task to parent Folder

<SettingLocation uri="ayon+settings://powerpack/sync_statuses/status_task_to_folder" scope="Studio, with project overrides" />

<Settings prefix="task-to-folder">
<Setting name="Enabled" default="Disabled" />
<Setting name="Trigger type" default="On update">

When the rule runs: **On update**, **On create**, or both.

</Setting>
<Setting name="Filter folder types Allow/Deny" default="All folder types">

**All folder types**, or **Selected folder types** to apply the rule only to the folder types below.

</Setting>
<Setting name="Filter folder types" default="Empty list">

The folder types used when **Selected folder types** is chosen.

</Setting>
<Setting name="All tasks match" default="Empty list">

Sets the folder status when all its tasks have one of the listed statuses. Has priority over **Task to folder status mapping**.

<Settings>
<Setting name="Task statuses" default="Empty list" />
<Setting name="New folder status" />
</Settings>

</Setting>
<Setting name="Task to folder status mapping" default="Empty list">

Sets the folder status when any of its tasks changes to one of the listed statuses.

<Settings>
<Setting name="Task status" default="Empty list" />
<Setting name="New folder status" />
</Settings>

</Setting>
</Settings>

### Sync status from Task to Version

<SettingLocation uri="ayon+settings://powerpack/sync_statuses/status_task_to_version" scope="Studio, with project overrides" />

<Settings prefix="task-to-version">
<Setting name="Enabled" default="Disabled" />
<Setting name="Product types Allow/Deny" default="Deny list">

Whether **Product types** is an **Allow list** or a **Deny list**. An empty deny list includes every product type.

</Setting>
<Setting name="Product types" default="Empty list">

The product types the rule filters on.

</Setting>
<Setting name="Status mapping" default="Empty list">

Each task status can appear once.

<Settings>
<Setting name="Task status" />
<Setting name="New version status" />
</Settings>

</Setting>
</Settings>

### Sync status from Folder to Task

<SettingLocation uri="ayon+settings://powerpack/sync_statuses/status_folder_to_task" scope="Studio, with project overrides" />

<Settings prefix="folder-to-task">
<Setting name="Enabled" default="Disabled" />
<Setting name="Trigger type" default="On update">

**On update**, **On create**, or both.

</Setting>
<Setting name="Filter folder types Allow/Deny" default="All folder types">

**All folder types**, or **Selected folder types** to apply the rule only to the folder types below.

</Setting>
<Setting name="Filter folder types" default="Empty list">

The folder types used when **Selected folder types** is chosen.

</Setting>
<Setting name="Status mapping" default="Empty list">

Each folder status can appear once.

<Settings>
<Setting name="Folder status" />
<Setting name="New task status" />
</Settings>

</Setting>
</Settings>

### Sync status from Version to Task

<SettingLocation uri="ayon+settings://powerpack/sync_statuses/status_version_to_task" scope="Studio, with project overrides" />

<Settings prefix="version-to-task">
<Setting name="Enabled" default="Disabled" />
<Setting name="Trigger type" default="On update">

**On update**, **On create**, or both.

</Setting>
<Setting name="Product types Allow/Deny" default="Deny list">

Whether **Product types** is an **Allow list** or a **Deny list**.

</Setting>
<Setting name="Product types" default="Empty list">

The product types the rule filters on.

</Setting>
<Setting name="Status mapping" default="Empty list">

Each version status can appear once.

<Settings>
<Setting name="Version status" />
<Setting name="New task status" />
</Settings>

</Setting>
</Settings>

## Pin project settings

<SettingLocation uri="ayon+settings://powerpack/settings_overrides" scope="Studio only" />

Settings that are written to each new project as project overrides, so that later changes to the studio settings do not change them in that project.

<!-- screenshot: settings editor, Pin project settings -->

<Settings>
<Setting name="Settings Paths" default="Empty">

One settings path per line, such as `ayon+settings://core/imageio`. Each listed setting is written to a new project as an override. Settings that exist only at studio scope cannot be pinned.

</Setting>
</Settings>

## Personal API keys

<SettingLocation uri="ayon+settings://powerpack/personal_api_keys" scope="Studio only" />

Whether users can create API keys for themselves on their [Profile page](../../../ayon/web-ui/account/profile.md#personal-api-keys), and how long such a key can live.

<Settings>
<Setting name="Enabled" default="Enabled">

Users can create personal API keys on their profile page. When disabled, the card shows the user's existing keys, which can still be revoked, and the message "Creating personal API keys is turned off in this studio."

</Setting>
<Setting name="Maximum lifetime (days)" default="90">

Every personal API key expires within this many days, from 1 to 3650. The **Expires** date of a new key cannot be later.

</Setting>
</Settings>

## Related

- [Power Features addon](index.md)
- [Calculated attributes](calculated-attributes.md)
- [Client review](../../../production-tracking/client-review.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
