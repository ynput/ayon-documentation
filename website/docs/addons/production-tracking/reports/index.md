---
title: Reports addon
sidebar_label: Reports
description: "The AYON Reports addon: a project Reports page with dashboards of charts and cards counting folders, tasks and versions, current-state and history-based timelines, filters, saved views and PDF or CSV export."
addon: reports
addon_repo: ayon-reports
addon_version: 0.3.13
addon_scope: server
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-10-19
sources:
  - https://help.ayon.app/en/articles/9869698-reports
---

# Reports addon

<AddonInfo />

The Reports addon provides the **Reports** page of AYON projects. The page shows a dashboard of charts and number cards that count the folders, tasks and versions of a project, grouped by attributes such as task type, status, assignee or priority, either as the state of the project now or as it developed over time. The addon has a server part that answers the data queries and records a daily history of entities, and a web frontend that renders the dashboard. It has no settings, no client code and no services.

## Requirements

| Requirement | Value |
|---|---|
| AYON server | 1.11.0 or newer |
| Required addons | None |
| License | The web frontend checks the site license for the `reports` feature and shows a license screen without it. |
| Bundle | The addon records history and serves data only while its version is part of the production bundle. |
| Client and services | None. The addon is a server addon with a web frontend module. |

## Where it appears

| Item | Value |
|---|---|
| Project navigation | **Reports** opens `/projects/<project>/reports`. The entry is always present; without the addon installed the page shows a feature overview instead of the dashboard. |
| Scope | One project at a time. The addon contains no cross-project report. |
| Left panel | A slicer with four slice types: hierarchy, assignees, status and task type. The selection limits every chart on the dashboard. |
| Header | **Add chart**, the filter bar, a refresh button, **Export** and **Customize**. |

## Data model

| Item | Value |
|---|---|
| Entity types | Folders, tasks and versions. Products and other entities are reachable only as grouping fields of versions. |
| Metric | **Count Records**. The server rejects every other aggregation (sum, average, minimum, maximum) with a not-implemented error. |
| Access | Users who are not managers or administrators only count entities in folders they can access. |
| Related fields | Tasks can be grouped by folder fields. Versions can be grouped by product, task and folder fields. |

### Grouping fields

| Entity | Fields |
|---|---|
| Folder | Name, Folder Type, Status, State, Tags, Active and every folder attribute |
| Task | Name, Task Type, Status, State, Tags, Assignees, Active, every task attribute and the fields of the parent folder |
| Version | Name, Version, Status, State, Author, Tags, Active, every version attribute and the fields of the product, task and folder |

Fields that hold a list, such as tags and assignees, count an entity once for each element. The four states are Not Started, In Progress, Done and Blocked. Status, type, tag and user options come from the project anatomy and the user list.

## Chart data types

| Data type | Source | Result |
|---|---|---|
| Current state (`snapshot`) | The entities as they are now. | One value per group, optionally split into segments. |
| Historical timeline (`timeSeries`) | The daily history of entities. | The count per period between a start and an end date, over a time range of 7 days, 1 month, 3 months, 6 months, 12 months or all, with a frequency of day, week, month or year. Groups and segments are optional. |
| Attribute-based timeline (`snapshotTimeline`) | A date field of the entities. | The count per period of the chosen date, such as `createdAt`, `updatedAt` or a date attribute like start date, end date or due date. Related dates of a task, folder or product can be used for versions. |

## Chart configuration

| Setting | Options |
|---|---|
| Data Source | Tasks, Folders, Versions |
| Metric | Count Records |
| Chart Type | Bar Chart, Line Chart, Pie Chart and Card for current state. Bar Chart and Line Chart for timelines. |
| Group | One or more grouping fields, with a sort of Default, Name (A-Z), Name (Z-A), Value (Ascending) or Value (Descending), and a selection of included groups. |
| Segment | A second grouping level that splits each group, for example task types segmented by status. Sorted and selectable like groups. |
| Line Style | Smooth, Linear or Stepped |
| Stacked | Stacks bars, or stacks the areas of a timeline line chart. |
| Orientation | Vertical or horizontal bars. |
| Display toggles | Show axis labels (default on), show legend (default on), show data labels (default off), show total (on for new current-state charts), show empty groups (default off) |
| Descriptions | Optional text above and below the chart |
| Chart filter | A filter that applies to one chart only |

Each chart has a menu with **Edit**, **Duplicate**, **Refresh** and **Remove**, and two copy actions, **Copy as Table** and **Copy as Image**. Charts are placed on a grid: they move by their header and resize from the lower right corner. **Customize** lists the charts, where they can be reordered and hidden, and sets the date format: US (`MM/DD/YYYY`), European (`DD/MM/YYYY`), European with dots (`DD.MM.YYYY`), ISO (`YYYY-MM-DD`) or Asian (`YYYY/MM/DD`).

### Chart templates

A project without a saved dashboard starts with six charts. **Add chart** also offers the other templates and an empty custom chart.

| Template | Data | Shown initially |
|---|---|---|
| Task types and statuses | Stacked bars of task types segmented by status | Yes |
| Tasks cumulative flow | Timeline of tasks segmented by state | Yes |
| Folder Priorities | Pie chart of folders by priority attribute | Yes |
| Folder Tags | Bars of folders by tag | Yes |
| Version numbers distribution | Line of versions by version number | Yes |
| Versions by Author (6 months) | Timeline of versions segmented by author | Yes |
| Weekly Task Due Dates | Timeline of tasks by end date, segmented by state | No |
| Task by state | Bars of tasks by state | No |
| Task statuses List | Cards of tasks by status | No |
| Product Type Publishes | Stacked bars of versions by product type and task type | No |
| Current state, Historical timeline, Attribute based timeline | Empty custom charts of the three data types | No |

## Filtering

| Filter | Scope |
|---|---|
| Slicer | Hierarchy (folder paths, which can be pinned while another slice type is active), assignees, status and task type. Applies to every chart. |
| Filter bar | Filters on folder, task and version fields with exclusion, operator change and relative date values. Applies to every chart. |
| Chart filter | The same kind of filter in the editor of one chart. |

## Views and sharing

The charts of a dashboard, with their layout, are saved as a view of the project (see [views](../../../ayon/web-ui/views.md)), so a project can keep several dashboards.

## Export

**Export** opens a dialog that lets the user choose the charts (hidden charts are excluded) and the file type.

| Output | Content |
|---|---|
| PDF | An A4 portrait document with the studio logo from the AYON customization, the report name, the studio name, the date and one image per selected chart with its title and descriptions. The report name defaults to the view name followed by the current date. |
| CSV | One section per selected chart with the columns Widget, Group, Segment and Value, and a Date column for timelines. |

## History

Timelines of the type Historical timeline read the table `reports_snapshots` in the project schema, which holds one row per entity and day. The frontend checks whether the project has that table and, if not, starts the initialization automatically: it creates the table, takes a full snapshot of all folders, tasks and versions, and reconstructs earlier states from the entity events of the project (type, status, attribute, assignee and tag changes; data and thumbnail changes are ignored). Initialization is restricted to administrators, so a non-administrator who opens an uninitialized project gets an error instead of the dashboard. Afterwards, entity created and update events add snapshots as they happen.

## Server API

The addon registers these endpoints, used by the frontend.

| Endpoint | Purpose |
|---|---|
| `POST /current` | Counts of the current state, optionally grouped. |
| `POST /timeserie` | Counts over time from the history. Reports `history_enabled: false` when the project has no history. |
| `POST /dates` | Counts per period of a date field. Without dates it covers the last 365 days. |
| `POST /initialize/{project_name}` | Builds the history of a project (administrators only). |
| `GET /initialize/{project_name}` | Whether the project has history. |
| `GET /meta/enum`, `/meta/groups`, `/meta/dates` | Options, grouping fields and date fields for an entity type. |

## Related

- [Views](../../../ayon/web-ui/views.md)
- [Task progress](../../../ayon/web-ui/production-tracking/task-progress.md)
