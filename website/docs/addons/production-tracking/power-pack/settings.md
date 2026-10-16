---
title: Power Features addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Power Features addon with their default values: comment categories, calculated attributes, hierarchy templates, status sync and pinned project settings."
addon: powerpack
addon_repo: ayon-power-pack
addon_version: 1.6.7
addon_scope: server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7017685-power-features
  - https://help.ayon.app/en/articles/7144550-calculated-attributes
---

# Power Features addon settings

<AddonInfo />

The settings of the [Power Features addon](index.md), with the default values it ships with. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned). Most areas are studio settings that can be overridden per project; the exceptions are noted in the tables.

## Comment categories

A list of categories for comments in the activity feed. The default list has three entries.

| Setting | Default | Description |
|---|---|---|
| Name | none | Category name. |
| Color | `#ffffff` for a new entry | Highlight color of the category. |
| Access control | empty for a new entry | Access level per subject: everyone, guests, users, access groups, teams. |

| Default category | Color | Access |
|---|---|---|
| Guest | `#cd8de2` | Guests 20, everyone 10, group `supervisor` 20 |
| Director | `#44ee9f` | Everyone 10, group `supervisor` 20 |
| Private | `#ff9a47` | Group `supervisor` 20 |

## Calculated attributes

**Formulas** is a list, empty by default. Each item defines one calculated attribute.

| Setting | Default | Description |
|---|---|---|
| Attribute | empty | The attribute to calculate. The list offers attributes whose scope includes project-level entity types. |
| Entity types | none selected | Entity types the formula applies to. |
| Formula | empty | Jinja2 template; the variables are listed on the [overview](index.md#calculated-attributes). |
| Calculation mode | Automatic | Automatic, Manual or Always. |

## Hierarchy templates

| Setting | Default | Description |
|---|---|---|
| Sort alphabetically | Off | Ignores the template positions in the list and always sorts alphabetically. Studio scope. |
| Studio Templates | empty list | Templates available in every project. Studio scope. |
| Project Templates | empty list | Templates available in one project. Project scope. |

Each template has a **Name** and a **Template**. The template is JSON and is validated when saved; names must be unique within a list. The structure is described in [Hierarchy templates](index.md#hierarchy-templates).

## Status sync

All four groups have **Enabled** off by default. Status choices come from the anatomy.

### Sync status from Task to parent Folder

| Setting | Default | Description |
|---|---|---|
| Trigger type | On update | When the rule runs: On update, On create, or both. |
| Filter folder types Allow/Deny | All folder types | Apply to all folder types, or to the selected folder types only. |
| Filter folder types | empty | The folder types used when the selection is active. |
| All tasks match | empty list | Each item has **Task statuses** and **New folder status**. Sets the folder status when all its tasks have one of the listed statuses. Has priority over the mapping below. |
| Task to folder status mapping | empty list | Each item has **Task status** and **New folder status**. Sets the folder status when any of its tasks changes to one of the listed statuses. |

### Sync status from Task to Version

| Setting | Default | Description |
|---|---|---|
| Product types Allow/Deny | Deny list | Whether **Product types** is an allow list or a deny list. An empty deny list includes every product type. |
| Product types | empty | The product types the rule filters on. |
| Status mapping | empty list | Each item has **Task status** and **New version status**. |

### Sync status from Folder to Task

| Setting | Default | Description |
|---|---|---|
| Trigger type | On update | On update, On create, or both. |
| Filter folder types Allow/Deny | All folder types | Apply to all folder types, or to the selected ones only. |
| Filter folder types | empty | The folder types used when the selection is active. |
| Status mapping | empty list | Each item has **Folder status** and **New task status**. |

### Sync status from Version to Task

| Setting | Default | Description |
|---|---|---|
| Trigger type | On update | On update, On create, or both. |
| Product types Allow/Deny | Deny list | Whether **Product types** is an allow list or a deny list. |
| Product types | empty | The product types the rule filters on. |
| Status mapping | empty list | Each item has **Version status** and **New task status**. |

## Pin project settings

| Setting | Default | Description |
|---|---|---|
| Settings Paths | empty | One settings path per line, such as `ayon+settings://core/imageio`. Each listed setting is written to a new project as an override. Settings that exist only at studio scope cannot be pinned. |
