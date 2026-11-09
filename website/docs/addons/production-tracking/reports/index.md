---
title: Reports addon
sidebar_label: Reports
description: "The AYON Reports addon: a project Reports page with dashboards of chart and text cards that count or measure folders, tasks and versions, current-state and history-based timelines, the entities behind a chart, filters, saved views and PDF or CSV export."
addon: reports
addon_repo: ayon-reports
addon_version: 0.3.15
addon_scope: server
addon_flags: [licensed, beta]
addon_private: true
verified: 2026-11-09
sources:
  - https://help.ayon.app/en/articles/9869698-reports
---

# Reports addon

<AddonInfo />

The Reports addon provides the **Reports** page of AYON projects. The page shows a dashboard of chart and text cards. Charts count the folders, tasks and versions of a project, or measure them with a numeric attribute or a calculated metric, grouped by attributes such as task type, status, assignee or priority, either as the state of the project now or as it developed over time. A chart opens the list of entities it counts. The addon has a server part that answers the data queries, stores the cards and records a daily history of entities, and a web frontend that renders the dashboard. It has no client code and no services.

## Requirements

| Requirement | Value |
|---|---|
| AYON server | 1.17.3 or newer |
| Required addons | None |
| License | The web frontend checks the site license for the `reports` feature and shows a license screen without it. |
| Bundle | The addon records history and serves data only while its version is part of the production bundle. |
| Client and services | None. The addon is a server addon with a web frontend module. |

## Where it appears

| Item | Value |
|---|---|
| Project navigation | The **Reports** tab of a project, next to Overview and Task progress, opens `/projects/<project>/reports`. The entry is always present; without the addon installed the page shows a feature overview instead of the dashboard. |
| Addresses | Every Reports page has its own address. The chart editor opens at its own path, so the browser's back button returns to the dashboard and a link to an editor opens that chart directly. |
| Scope | One project at a time. The addon contains no cross-project report. |
| Left panel | A slicer with four slice types: hierarchy, assignees, status and task type. The selection limits every chart on the dashboard. |
| Header | **Add chart**, the filter bar, a refresh button, **Export** and **Customize**. |

## Data model

| Item | Value |
|---|---|
| Entity types | Folders, tasks and versions. Products and other entities are reachable only as grouping fields of versions. |
| Metric | **Count** of the entities, or the **sum**, **average**, **minimum** or **maximum** of a numeric attribute. |
| Calculated metrics | Tasks only. **Cycle time**: the days from the start of work to done. **Days overdue**: the days past the end date. Both are aggregated like a numeric attribute. |
| Access | Users who are not managers or administrators only count entities in folders they can access. Reports follows the **Show sibling tasks** access setting: users who see only their assigned tasks do not see the other tasks of a folder in charts, metrics or the entities behind a chart. |
| Related fields | Tasks can be grouped by folder fields. Versions can be grouped by product, task and folder fields. |

### Grouping fields

| Entity | Fields |
|---|---|
| Folder | Name, Folder Type, Status, State, Tags, Active and every folder attribute |
| Task | Name, Task Type, Status, State, Tags, Assignees, Active, every task attribute and the fields of the parent folder |
| Version | Name, Version, Status, State, Author, Tags, Active, every version attribute and the fields of the product, task and folder |

Fields that hold a list, such as tags and assignees, count an entity once for each element. The four states are Not Started, In Progress, Done and Blocked. Status, type, tag and user options, with their colors and icons, come from the project anatomy and the user list.

## Card types

| Card | Content |
|---|---|
| Chart | A chart of one of the data types below. |
| Text | Markdown text, such as a title, context for the charts around it or the conclusions of a review. Its menu can hide the card background. |

## Chart data types

| Data type | Source | Result |
|---|---|---|
| Current state (`snapshot`) | The entities as they are now. | One value per group, optionally split into segments. Grouped by a date field, such as `createdAt`, `updatedAt` or a date attribute like start date, end date or due date, the chart shows the value per period of that date. Related dates of a task, folder or product can be used for versions. |
| Historical timeline (`timeSeries`) | The daily history of entities. | The count per period between a start and an end date, over a time range of 7 days, 1 month, 3 months, 6 months, 12 months or all, with a frequency of day, week, month or year. Groups and segments are optional. |

Charts created before 0.3.15 with the former **Attribute based timeline** (`snapshotTimeline`) data type keep working and open in their own editor. New charts use Current state grouped by a date field instead.

## Chart configuration

| Setting | Options |
|---|---|
| Data | Tasks, Folders, Versions |
| Metric | Count, a numeric attribute, or for tasks a calculated metric (cycle time, days overdue) |
| Aggregation | Sum, average, minimum or maximum, for every metric other than Count |
| Chart Type | Bar Chart, Line Chart, Pie Chart and Card for current state. Bar Chart and Line Chart for timelines. Pie charts and cards have no segments. |
| Group | One or more grouping fields, with a sort of Default, Name (A-Z), Name (Z-A), Value (Ascending) or Value (Descending), and a selection of included groups. |
| Segment | A second grouping level that splits each group, for example task types segmented by status. Sorted and selectable like groups. |
| Line Style | Smooth, Linear or Stepped |
| Stacked | Stacks bars, or stacks the areas of a timeline line chart. |
| Orientation | Vertical or horizontal bars. |
| Display toggles | Show axis labels (default on), show legend (default on), show data labels (default off), show total (on for new current-state charts), show empty groups (default off) |
| Number format | Durations show in days. The value axis keeps decimals for small values, such as an average cycle time below one day. |
| Descriptions | Optional text above and below the chart |
| Chart filter | A filter that applies to one chart only |

A chart card has a menu with **Edit** (also a double-click on the chart), **Show data**, **Rename**, **Duplicate**, **Refresh** and **Remove**, and two copy actions, **Copy as Table** and **Copy as Image**. A text card has **Edit**, **Rename**, **Hide background**, **Duplicate** and **Remove**. Cards are placed on a grid: they move by their header and resize from the lower right corner. **Customize** lists the cards, where they can be reordered and hidden, and sets the date format: US (`MM/DD/YYYY`), European (`DD/MM/YYYY`), European with dots (`DD.MM.YYYY`), ISO (`YYYY-MM-DD`) or Asian (`YYYY/MM/DD`).

### Chart templates

A project without a saved dashboard starts with six charts. **Add chart** also offers the other templates, empty custom charts of the two data types and an empty text card.

| Template | Data | Shown initially |
|---|---|---|
| Task types and statuses | Stacked bars of task types segmented by status | Yes |
| Tasks cumulative flow | Timeline of tasks segmented by state | Yes |
| Folder Priorities | Pie chart of folders by priority attribute | Yes |
| Folder Tags | Bars of folders by tag | Yes |
| Version numbers distribution | Line of versions by version number | Yes |
| Versions by Author (6 months) | Timeline of versions segmented by author | Yes |
| Weekly Task Due Dates | Tasks by end date per week, segmented by state | No |
| Task by state | Bars of tasks by state | No |
| Task statuses List | Cards of tasks by status | No |
| Cycle time by task type | Bars of the average cycle time of tasks per task type | No |
| Days overdue by assignee | Bars of the days overdue of tasks per assignee | No |
| Product Type Publishes | Stacked bars of versions by product type and task type | No |
| Current state, Historical timeline | Empty custom charts of the two data types | No |
| Text | Empty text card | No |

## Entities behind a chart

A click on a bar, slice or point, or **Show data** in the card menu, opens a window next to the chart with the entities the chart counts. In the chart editor, a toggle above the preview switches between the chart and its entities.

| Item | Value |
|---|---|
| Table | The project table of the web app, as in the Overview page: the same columns, sorting, summary row and grouping, with the rows grouped like the chart. |
| Conditions | Read-only filter chips at the top of the window: the clicked point, the chart filter and the dashboard filter. |
| Window | Can be moved and enlarged, and closes with **Esc**. |
| Limit | The first 10,000 entities. The window says when the chart counts more. |
| Supported charts | Current-state charts of tasks and folders. Not supported: version charts, calculated metrics and Historical timelines. |

## Filtering

| Filter | Scope |
|---|---|
| Slicer | Hierarchy (folder paths, which can be pinned while another slice type is active), assignees, status and task type. Applies to every chart. |
| Filter bar | The filter bar of the web app, on folder, task and version fields, with exclusion, operator change and relative date values. Applies to every chart. |
| Chart filter | The same kind of filter in the editor of one chart. |

## Views and sharing

The layout of a dashboard is saved as a view of the project (see [views](../../../ayon/web-ui/views.md)), so a project can keep several dashboards. The cards of a dashboard are stored as documents of the project, referenced by the view. Dashboards saved by earlier versions, with the cards inside the view, move to documents the first time a user who can edit the view opens it.

## Export

**Export** opens a dialog that lets the user choose the charts (hidden charts are excluded) and the file type.

| Output | Content |
|---|---|
| PDF | An A4 portrait document with the studio logo from the AYON customization, the report name, the studio name, the date and one image per selected chart with its title and descriptions. The report name defaults to the view name followed by the current date. |
| CSV | One section per selected chart with the columns Widget, Group, Segment and Value, and a Date column for timelines. |

## Settings

| Setting | Scope | Value |
|---|---|---|
| Review statuses | Studio, project | Task statuses that mean waiting for review. When empty, statuses whose name contains `review` are used. |

## History

Timelines of the type Historical timeline read the table `reports_snapshots` in the project schema, which holds one row per entity and day. The frontend checks whether the project has that table and, if not, starts the initialization automatically: it creates the table, takes a full snapshot of all folders, tasks and versions, and reconstructs earlier states from the entity events of the project (type, status, attribute, assignee and tag changes; data and thumbnail changes are ignored). Initialization is restricted to administrators, so a non-administrator who opens an uninitialized project gets an error instead of the dashboard. Afterwards, entity created and update events add snapshots as they happen.

## Server API

The addon registers these endpoints, used by the frontend.

| Endpoint | Purpose |
|---|---|
| `POST /current` | Counts or aggregated values of the current state, optionally grouped. |
| `POST /timeserie` | Counts over time from the history. Reports `history_enabled: false` when the project has no history. |
| `POST /dates` | Counts per period of a date field. Without dates it covers the last 365 days. |
| `POST /entities/query` | The entities behind a chart or a point of it. |
| `GET`, `POST /dashboards/{dashboard_id}/cards`, `PUT`, `DELETE /dashboards/{dashboard_id}/cards/{card_id}` | The cards of a dashboard. |
| `POST /dashboards/{dashboard_id}/cards/migrate` | Moves the cards of an earlier dashboard to documents. |
| `POST /initialize/{project_name}` | Builds the history of a project (administrators only). |
| `GET /initialize/{project_name}` | Whether the project has history. |
| `GET /meta/enum`, `/meta/groups`, `/meta/dates` | Options, grouping fields and date fields for an entity type. |

## Related

- [Views](../../../ayon/web-ui/views.md)
- [Task progress](../../../ayon/web-ui/production-tracking/task-progress.md)
