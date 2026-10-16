---
title: Calculated attributes
description: "Calculated attributes are attributes whose value is computed by a Jinja2 formula: formula settings, calculation modes, the variables and functions available in formulas, and the recalculate actions."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7144550-calculated-attributes
---

# Calculated attributes

A **calculated attribute** is an existing attribute whose value is computed by a formula instead of being typed in. The formula can use the other attributes of the entity and, for folders, the tasks and folders below it. A frame length attribute can, for example, be computed from the start frame, end frame and handles, and a folder description can show the progress of the tasks below the folder. Calculated values appear in tables, the [details panel](details-panel.md) and filters like any other attribute value.

Calculated attributes are a Power Features addon function. Requirements, licensing and the addon settings are described in [Power Features addon](../addons/production-tracking/power-pack/index.md); the overview of Power Features is in [Power features](power-features.md).

## Where it appears

| Location | Description |
|---|---|
| Power Features addon settings, **Calculated attributes** | Defines the formulas. |
| Actions menu of the project, a folder or a task | **Recalculate attributes**, **Recalculate folder attributes**, **Recalculate task attributes**. |
| Attribute columns of tables, fields of the details panel | Show the calculated value. |

## Formula settings

Each entry in the **Formulas** list of the addon settings has these fields.

| Field | Description |
|---|---|
| **Attribute** | The attribute to calculate. The attribute must already exist (see [Attributes](../ayon/web-ui/attributes.md)) and be in scope for every chosen entity type. Turning off **Inherit** in the attribute definition is recommended. |
| **Entity types** | Entity types the formula applies to: folders, products, versions, representations, tasks and workfiles. At least one is required. |
| **Formula** | A Jinja2 template. |
| **Calculation mode** | When the formula is evaluated. |

Saving the settings fails when the formula has a syntax error, uses a variable that does not exist, or uses `get_tasks` or `get_children` on entity types other than folders.

### Calculation modes

| Mode | Behavior |
|---|---|
| **Automatic** (default) | Recalculated when the entity is saved, except when the formula reads data outside the entity (`project`, `get_tasks`, `get_children`). Those formulas are recalculated by an action. |
| **Manual** | Recalculated only by an action. |
| **Always** | Recalculated on every save of the entity, whatever the formula reads. Frequent recalculation of complex formulas increases processor and database load on the AYON server. |

An attribute that is changed explicitly in the same save is not recalculated for that save. When a formula fails, the previous value is kept.

## Formulas

Formulas use the Jinja2 template language. The formula always renders to text; the AYON server strips surrounding whitespace and converts the text to the type of the attribute (string, integer, float, boolean, list of strings, list of integers, date and time).

| Syntax | Description |
|---|---|
| `{{ expression }}` | Evaluates the expression and inserts the result. |
| `{% statement %}` | Control structures such as `if`, `for` and `set`. |
| `expression \| filter` | Applies a Jinja2 filter, for example `upper`, `length`, `round`, `map`, `selectattr`. |

An expression outside `{{ }}` is not evaluated: the text itself becomes the value.

### Variables and functions

| Name | Available for | Description |
|---|---|---|
| `entity` | All entity types | The entity being calculated. Fields are the same as in the REST API, with dot notation (`entity.name`, `entity.status`, `entity.attrib.priority`). Attributes are under `entity.attrib.<name>`; the list of attributes is on the **Attributes** page. |
| `project` | All entity types | The project, including its anatomy: `project.name`, `project.code`, `project.statuses`. |
| `get_tasks(recursive=False)` | Folders | The tasks of the folder; with `recursive=True` also those of all folders below it. |
| `get_children(recursive=False)` | Folders | The child folders; with `recursive=True` all descendants. Use it instead of `entity.children`. |
| `utils.now` | All entity types | The current time as an ISO 8601 string in UTC. |
| `utils.keep` | All entity types | The current value of the calculated attribute. |
| `operation` | All entity types | The operation that triggered the calculation (`operation.type`, `operation.user`). |

Any other variable name is rejected when settings are saved.

### Examples

| Purpose | Entity types | Formula |
|---|---|---|
| Frame length with handles | Folder, Task | `{{ entity.attrib.handleStart + entity.attrib.handleEnd + entity.attrib.frameEnd - entity.attrib.frameStart + 1 }}` |
| Name and status as text | Any | `{{ entity.name \| upper }} is {{ entity.status }}` |
| Number of statuses | Any | `{% set status_names = project.statuses \| map(attribute="name") \| list %}{{ status_names \| length }} statuses available` |
| Number of subfolders | Folder | `{% set subfolders = get_children(recursive=True) %}I have {{ subfolders \| length }} subfolders` |

The following formula writes the share of finished tasks below a folder, with a colored circle for the range. It uses `project` and `get_tasks`, so it is recalculated by an action in **Automatic** mode.

```jinja
{% set done_statuses = project.statuses | selectattr("state", "equalto", "done") | map(attribute="name") | list %}
{% set all_tasks = get_tasks(recursive=True) %}
{% set done_tasks = all_tasks | selectattr("status", "in", done_statuses) | list %}
{% set progress = (done_tasks | length / all_tasks | length * 100) if all_tasks | length > 0 else 0 %}

{% if progress < 10 %}🔴{% elif progress < 50 %}🟠{% elif progress < 90 %}🟡{% else %}🟢{% endif %}

{{ progress | round(2) }} % ({{ done_tasks | length }} / {{ all_tasks | length }})
```

| Range | Circle |
|---|---|
| Under 10% | Red |
| 10% to under 50% | Orange |
| 50% to under 90% | Yellow |
| 90% and above | Green |

## Recalculate actions

The actions are server actions in the actions menu. They send an empty update for each affected entity, which makes the AYON server evaluate the formulas, including **Manual** formulas and formulas that read other entities.

| Action | Entity | What it does |
|---|---|---|
| **Recalculate attributes** | Project | Recalculates the attributes of the project entities that have formulas. Available to managers. |
| **Recalculate folder attributes** | One or several folders | Recalculates the attributes of the selected folders. |
| **Recalculate task attributes** | One or several tasks | Recalculates the attributes of the selected tasks. |

## Related

- [Power Features addon](../addons/production-tracking/power-pack/index.md)
- [Power features](power-features.md)
- [Attributes](../ayon/web-ui/attributes.md)
- [Project overview](project-overview.md)
