---
id: dev_addon_workflow_event
title: Event-triggered workflows
sidebar_label: Event-triggered workflows
description: Event-triggered workflows
toc_max_heading_level: 5
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Overview

Event-triggered workflows let you use workflow graphs for automations. Once a
workflow is registered on the server, it runs without being started from the
Workflow editor: when an AYON event occurs, on a schedule, or when a user runs
it as an action from the AYON web UI. The Workflow addon's
[event processor](#running-the-workflow-event-processor) listens for these
triggers and runs the matching registered workflows.

Example use cases:
- Running a workflow when a new product version is created
- Running a workflow from the action menu of selected folders or versions in
  the AYON web UI
- Running a daily workflow that creates a playlist

:::caution
Event-triggered workflows only run while the
[event processor](#running-the-workflow-event-processor) is running.
:::

## Trigger nodes

A workflow's trigger is set by its first node. These trigger nodes are
available out of the box:

| Trigger | Node | Event topic |
| --- | --- | --- |
| Task assignees change | `OnTaskAssigneesChanged` | `entity.task.assignees_changed` |
| A new version is created | `OnVersionCreated` | `entity.version.created` |
| A user runs an action from the folder action menu | `OnActionFromFolder` | `workflow.from_simple_action.local` or `workflow.from_simple_action.remote` |
| A user runs an action from the version action menu | `OnActionFromVersion` | `workflow.from_simple_action.local` or `workflow.from_simple_action.remote` |
| A cron schedule | `OnSchedule` | None; runs based on its cron expression |

**Actions** are set up in the Workflow addon settings, at
`ayon+settings://workflow/simple_actions`. Each action's **Execute Locally**
setting decides which event it emits, and so where the workflow runs:

- **Enabled:** The action emits `workflow.from_simple_action.local`, and the
  workflow runs on the user's machine, bypassing the event processor. Use this
  for workflows with pipeline nodes.
- **Disabled:** The action emits `workflow.from_simple_action.remote`, and the
  event processor runs the workflow.

For setup steps, see
[Simple Actions - User Docs](https://help.ayon.app/en/help/articles/0480584-configure-workflow-addon).

To react to other event topics, you can write your own trigger node. See
[Reference: creating your own EventTrigger or OnSchedule input node](#reference-creating-your-own-eventtrigger-or-onschedule-input-node).

:::note Triggering a workflow during publishing
This isn't officially supported. You can write a custom publish plugin that
triggers a workflow, but triggering on events is usually simpler. For example,
a workflow triggered by `OnVersionCreated` runs once publishing has created
the new version.
:::

## Running the workflow event processor

The event processor listens for events, runs scheduled workflows based on
their cron expressions, and runs the matching registered workflows. It picks
up newly registered workflows automatically, without a restart.

There are two ways to run it. You can't run both at the same time.

| | As an AYON service | Through the CLI |
| --- | --- | --- |
| **Best for** | Lightweight server-side automations, such as syncing task and parent-folder status | Workflows that need the full pipeline |
| **Pipeline nodes** (`NukeRender`, `BlenderRender`, `BlenderWorkfile`, `Publish`, `Representation`) | Not supported | Supported |
| **Farm dispatch** | Not supported; workflows always run in memory | Supported |
| **Execution scope** | `ExecutionScope.SERVER` | `ExecutionScope.WORKSTATION` |
| **Runs on** | The AYON server, managed from the Services page | An AYON-initialized machine |
| **Updates** | Update the addon in your production bundle, then recreate the service | Managed manually |

The execution scope decides which nodes are available. Nodes that need a
local, interactive environment are only available in `WORKSTATION`. See
[Execution scope](https://github.com/ynput/ayon-workflow-nodes/blob/develop/docs/node_authoring.md#execution-scope)
in the Node Authoring Guide.

### As an AYON service

Spawn the Workflow Event Processor from the Services page. This requires
registry credentials, which are currently provided on request, so reach out
to support to get them. For setup steps, see
[Spawn an AYON Event Processor Service - User Docs](https://help.ayon.app/en/help/articles/0480584-configure-workflow-addon#8xxbd4mzzpf).

### Through the CLI

Run the processor on an AYON-initialized machine, with the AYON launcher
installed. To support every node type, the machine also needs access to
pipeline storage, the DCC applications used by your workflows, the dispatch
directory, and the farm server (for example, Deadline).

This method doesn't use the logged-in user's credentials, so pass a valid
`AYON_API_KEY` with the `--token` flag:

<Tabs>

<TabItem value="windows" label=<span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> default>

```bash
cd <ayon-launcher-installation-location>

./ayon_console.exe addon workflow event-processor --token <AYON_API_KEY>
```

</TabItem>

<TabItem value="linux&mac" label=<div><span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> & <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span></div> >

```bash
cd <ayon-launcher-installation-location>

ayon addon workflow event-processor --token <AYON_API_KEY>
```

</TabItem>

</Tabs>

For long-term use, run it as a background service (daemon) rather than a
one-off command in a terminal.

## Registering a workflow

Registering uploads a workflow to the server, so the event processor can run
it. You can register a workflow in two ways:

- **From the Workflow editor**, as shown in
  [Example workflow graph automations - User Docs](https://help.ayon.app/en/help/articles/1804107-workflows-and-automations#cczii712qik).
- **Through the API**, with the `api/addons/workflow/{version}/upload`
  endpoint, where `{version}` is the addon version (for example, `0.4.3`).

To list registered workflows, check the Workflow editor or use the
`api/addons/workflow/{version}/registered_workflows` endpoint.

:::caution
Workflow names must be unique. To upload a new workflow with the same name as
an existing one, de-register the existing workflow first.
:::

## Examples

Event-triggered workflow demos are available in the
[`ayon-workflow-nodes` repository](https://github.com/ynput/ayon-workflow-nodes/tree/develop/demo/workflow_from_events).
They also ship with the addon. By default, you can find them at:

- Windows: `C:\Users\YOUR_USER\AppData\Local\Ynput\AYON\addons\workflow_X.X.X\ayon_workflow\demo\workflow_from_events`
- Linux: `~/.local/share/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/workflow_from_events`
- macOS: `~/Library/Application Support/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/workflow_from_events`

| File | Trigger node | What it does |
| --- | --- | --- |
| `on_task_assignees_changed_watch_parent_folder.json` | `OnTaskAssigneesChanged` | Runs when assignees change on any task (`entity.task.assignees_changed`) and adds the new assignees as watchers on the task's parent folder (`GetParentContext` → `SetEntityWatchers`). Runs without farm dispatch. |
| `trigger_from_version_created_event.json` | `OnVersionCreated` | Runs when a new version is created (`entity.version.created`). Uses an `If` node so it only continues for versions in the `Demo` project, then dispatches to Deadline. |
| `trigger_from_cron.json` | `OnSchedule` (cron: `*/1 * * * *`) | Runs every minute and dispatches a `NoOp` task to Deadline. |
| `trigger_from_simple_action_folder.json` | `OnActionFromFolder` | Runs from a custom action in the folder action menu and dispatches a `NoOp` task to Deadline. |
| `trigger_from_simple_action_version.json` | `OnActionFromVersion` | Runs from a custom action in the version action menu and dispatches a `NoOp` task to Deadline. |

The demos that dispatch to Deadline need a working Deadline setup, and an
event processor [running through the CLI](#through-the-cli), since the AYON
service can't dispatch to the farm. For step-by-step instructions and
expected results, see
[Workflows & Automations - User Docs](https://help.ayon.app/en/help/articles/1804107-workflows-and-automations).

## Reference: creating your own EventTrigger or OnSchedule input node

To react to event topics or schedules not covered by the
[built-in trigger nodes](#trigger-nodes), write your own trigger node by
subclassing one of these:

- `OnSchedule`: For nodes that run on a cron schedule.
- `EventTrigger`: For nodes that react to an AYON event. Each node handles its
  own event topic, so create one node per topic. For well-known event topics,
  see the
  [AYON Event Viewer article](https://help.ayon.app/en/help/articles/2566382-ayon-event-viewer#e4bo4xwd0ei).

Trigger nodes are custom nodes like any other, so make them available to the
Workflow addon the same way. See
[Extending Workflow Nodes (Custom Plugins)](https://docs.ayon.dev/docs/dev_addon_workflow#extending-workflow-nodes-custom-plugins).

### Example 1: A schedule node that returns the current time and timezone

```python
import datetime
from typing import Tuple

from ayon_workflow.plugin_system import (
    OutputAttribute,
)
from ayon_workflow.plugins.workflow.inputs import OnSchedule


class OnScheduleWithTimezone(OnSchedule):
    """An input schedule node that returns the current time and timezone."""

    version = "0.0.1"
    outputs = [
        OutputAttribute(
            name="current_time",
            description="The current datetime.",
        ),
        OutputAttribute(
            name="current_timezone",
            description="The current timezone.",
        ),
    ]

    def execute(
        self,
        cron_expression: str,  # input inherited from OnSchedule
    ) -> Tuple[datetime.datetime, str]:
        super().execute(cron_expression)  # validates the cron expression
        local_dt = datetime.datetime.now().astimezone()

        return (
            local_dt,
            local_dt.tzname(),
        )


def get_plugins():
    return [OnScheduleWithTimezone]
```

### Example 2: An event node for a custom event topic

When the workflow runs outside an actual event, such as from the Workflow
editor, `event_id` is `None`. Make sure `execute()` returns empty outputs in
that case.

```python
from typing import Any, Dict, Optional

from ayon_workflow.plugin_system import (
    OutputAttribute,
)
from ayon_workflow.plugins.workflow.inputs import EventTrigger


class OnNewEvent(EventTrigger):
    """Trigger node: on new event.new.todo."""

    version = "0.0.1"
    event_topic = "event.new.todo"  # the event topic to react to
    outputs = [
        OutputAttribute(
            name="event_data",
            description="The output event data.",
        )
    ]

    def execute(
        self,
        event_id: Optional[str] = None
    ) -> Dict[str, Any]:
        if event_id is None:
            return {}

        event_data = super().execute(event_id)  # fetches the event data from its id
        # TODO: turn event_data into richer data types, such as ayon_workflow.datatypes.
        return event_data


def get_plugins():
    return [OnNewEvent]
```