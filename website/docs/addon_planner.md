---
id: addon_planner
title: Planner Addon
sidebar_label: Planner Addon
description: Planner Addon Documentation.
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Planner_Badge}
</ReactMarkdown>

The Planner Addon facilitates the planning of your productions, from initial outlining to detailed scheduling of tasks and artists. It can be extended for your own use cases, such as adding personal vacations or booking freelancers.

:::warning
The Planner Addon is an early preview release and the documentation is a work in progress. It may contain bugs and experience instability. We welcome your feedback to help shape its development.
:::

The addon can be split up in two specific areas, the planning of high level, rough phases and detailed task scheduling.

## Phase Planner

The Phase Planner allows you to map out production timelines without needing exact dates, tasks, or assigned personnel. This helps estimate the duration of different production phases and reserve time for them.

It’s not limited to project planning; it can also be used for other calendar-based events, such as tracking team availability or vacations.

### Studio and Project Planning

The Phase Planner can be viewed at both the project level and the studio level.

To see plans for all projects across the studio, go to **Home > Planner** (`/dashboard/addon/planner`). This view helps you compare project timelines and avoid scheduling conflicts. You can also create **custom tracks** that aren’t tied to a specific project, such as studio-wide vacations.

For planning within a specific project, we recommend using the Planner tab inside that project for a more focused experience. Open the project from the sidebar and navigate to **Planner**.

### Planner Events

To create a new event in the Planner, first create a **track**, then click and drag to set the event's duration.  
Planner events are independent entities, separate from tasks and the AYON pipeline. Think of them like calendar events rather than task-based assignments.

#### Required Fields

Every event must have the following:

-   **Event Type** – Choose from **Phase, Time Off,** or **Milestone**
-   **Title** – Often auto-filled
-   **Start and End Dates** – Minimum duration of 1 day

#### Optional Fields

-   **People** – Assign relevant team members
-   **Task Types** – Indicate the types of tasks this event relates to
-   **Tags** – Customizable colored labels for additional context

### Planner Tracks

Tracks help keep your plans organized and manageable. Instead of handling all events in a single, cluttered timeline, tracks allow you to structure events into separate lanes; similar to timeline tracks in video editing software like **DaVinci Resolve** or **Premiere Pro**.  
Tracks are highly flexible and can represent anything. For example, you might create a separate track for each episode in a series.

#### Track Features

-   **Duplicate & Move** – Easily duplicate and reposition tracks, making it simple to set up template tracks for recurring structures like episodes.
-   **Rename** – Click on a track's title to rename it.
-   **Change Color** – Click on the colored track icon to pick its color or **Right-click** to select a suggested color automatically.

### Scenarios

Scenarios let you explore and edit plans without affecting your main schedule. Think of them like separate sheets in a spreadsheet, each scenario has its own independent set of events.

#### Scenario Features

-   **Independent Event Sets** – Changes in one scenario don’t impact others.
-   **Duplicate Scenarios** – Easily duplicate existing scenarios to test different planning approaches.
-   **Set as Live** – Once finalized, tag a scenario as **“Live”** to make it the active production plan.

    :::note
    Scenarios are only available within **project-specific plans**. The **studio-level planner** always displays the **Live** scenario from each project.  
    :::

### Planner Roadmap

The Planner Addon is in active development and is still missing features. Bellow are some of the features and bugs we hope to finish. If you have any feedback, please contact the team so they can add to this list.

| Issue                                        | Type        | Description                                                              |
| -------------------------------------------- | ----------- | ------------------------------------------------------------------------ |
| Click on project title to view codes         | Bug         | Clicking project titles should display codes instead of titles.          |
| Define template with ratios                  | Feature     | Create a template with preset phase ratios for planning.                 |
| Show first/last event in collapsed tracks    | Feature     | Minimized project tracks should display a bar with start and end events. |
| Fake horizontal scrollbar                    | Enhancement | Add a draggable scrollbar for easier horizontal scrolling.               |
| Dock dialog to the right                     | Feature     | Allow docking dialog to the right for better event selection.            |
| Event descriptions                           | Enhancement | Add more details to events.                                              |
| Overlay plan on schedule                     | Feature     | Display plan overlay on the schedule for comparison.                     |
| Exclude filters & empty value filters        | Feature     | Add filtering options for excluding values and detecting empty fields.   |
| Filter events by `taskTypes` and `eventType` | Feature     | Implement filtering similar to `people` and `tags`.                      |

## Scheduler

The scheduler is designed to schedule out specific tasks and assign artists to those tasks. Schedules are always created within the context of a project. The planner can be used to help inform how a schedule should be created, offering a clear overview of project phases and milestones to guide scheduling decisions.

_The scheduler is currently in development._
