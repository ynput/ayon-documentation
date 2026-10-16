---
title: Reports addon
sidebar_label: Reports
description: "The AYON Reports addon: project-level dashboards of charts and KPI cards for tasks, folders and versions, with filters, shareable views and PDF or CSV export."
addon: reports
addon_repo: "-"
addon_version: 0.3.13
addon_scope: server
addon_flags: [licensed, beta]
addon_unverified: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/9869698-reports
---

# Reports addon

<AddonInfo />

The Reports addon adds a **Reports** page to AYON projects. It turns project data (task statuses, published versions, folder priorities) into dashboards of charts and KPI cards, aimed at coordinators, supervisors and producers who assess progress, workflow efficiency and productivity.

## Availability

| Item | Value |
|---|---|
| Licensing | Premium addon, included with the Studio subscription or an extra with a Pro subscription |
| Scope | Project level only. Reports across all projects are described as planned. |
| First use | The first time a project's Reports page is opened, the addon builds report data from events, which can take a couple of minutes. It is not repeated for later visits. |

## In the web app

### Where it appears

| Item | Value |
|---|---|
| Menu entry | **Reports** in the project navigation |
| URL path | `/projects/<project>/reports` |
| Requirement | The Reports addon. Without it the page shows a feature overview. |

### Layout

| Region | Content |
|---|---|
| Left panel | The hierarchy slicer and attribute slicers that filter every chart. |
| Dashboard | Charts and cards on a snapping grid. A new project starts with a default dashboard of six example charts. |
| Header | **Add Chart**, the view controls and **Export**. |
| Chart editor | A preview in the center and the chart configuration on the right. |

Charts move by their header and resize from the bottom-right corner. A dashboard layout is saved as a [view](../../../production-tracking/views.md), so a project can have several dashboards, such as task progress and version output, and share them with the team.

### Chart configuration

A chart is built from a data source, a metric, grouping and an appearance.

| Setting | Options |
|---|---|
| Template | **Add Chart** offers pre-made templates or a custom chart. |
| Data type | **Current State** (a snapshot now), **Historical Timeline** (how data changed over time), **Attribute-Based Timeline** (plotted by a date attribute such as `created_at` or a custom due date, which also shows upcoming load) |
| Data source | Tasks, Folders, Versions |
| Metric | **Count Records**. Totals and averages of attributes are described as future work. |
| Grouping | Any attribute, such as task type, status or assignee, or an attribute of the parent, such as the status or priority of a task's folder. Colors and icons come from the project anatomy. |
| Sorting | Default order, name or value |
| Include groups | Excludes selected groups from the chart. |
| Segmenting | Sub-groups within each group, for example a bar chart by status split by task type. |
| Chart type | Bar (stacked or not, vertical or horizontal), Line (smooth, jagged or stepped), Pie (no segmenting), Card (one number or percentage; grouping but no segmenting) |
| Display | Axis labels and legend on or off, empty groups hidden (default) or shown, text descriptions above or below the chart |

### Filtering

| Filter | What it does |
|---|---|
| Hierarchy slicer | Limits all charts to a selected part of the hierarchy, such as a sequence or shot, and its children. |
| Attribute slicers | Filter by attributes such as assignee, status or task type. |

### Export and sharing

**Export** in the header offers the file exports; each chart has copy options.

| Output | Content |
|---|---|
| PDF | A preview where charts are selected or deselected. The report name defaults to the view name plus the current date. The studio logo is at the top. |
| CSV | The data points of the charts currently visible. |
| Copy chart image | The chart as an image on the clipboard. |
| Copy chart data | The chart values formatted for pasting into spreadsheet software. |

## Related

- [Views](../../../production-tracking/views.md)
- [Task progress](../../../production-tracking/task-progress.md)
