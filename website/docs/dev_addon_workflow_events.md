---
id: dev_addon_workflow_event
title: Event-triggered workflows
sidebar_label: Event-triggered workflows
description: Event-triggered workflows
toc_max_heading_level: 5
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Introducing Event-triggered workflows

Event-triggered workflows are registered on the server. They allow to chain workflow execution from events, manual action from the AYON server or recurrently from scheduled trigger. The workflow addon's event processor listens for relevant event and executes registered workflows accordingly. This is useful for incorporating workflow graphs into your automations.

Example use cases:
- Running a workflow when a new product version is created
- Reacting to an action menu triggered from selected folder(s) or version(s) on the AYON server
- Running a daily workflow to create a playlist

:::caution 
Ensure you have the workflow processor service running.
:::

### Supported ways to trigger workflows automatically

There are several ways to trigger workflows:

1. Run workflows from folder and version actions.
2. Run workflows when certain events are triggered on the server.
3. Run workflows periodically.
4. Run workflows during the publishing process. This isn't officially supported, but you can achieve a similar result by creating a workflow that triggers on version creation, which fires once publishing completes. It's also possible to write a custom publish plugin to trigger a workflow directly, but for now we recommend sticking with the on-version-created approach, since it's more generic.

### Supported events

Use the relevant input node in to gather input data within your workflow.
Like other workflow nodes, the default list can be extended to support custom `event-topic` you might have.

- `entity.version.created` — node: `OnVersionCreated`
- `entity.task.assignees_changed` — node: `OnTaskAssigneesChanged`
- `workflow.from_simple_action.local` and `workflow.from_simple_action.remote` (custom events emitted by the workflow addon when a workflow-related action is triggered from the action menu on folder or version entities) — nodes: `OnActionFromFolder` and `OnActionFromVersion`
- Cron expressions (not an AYON event, but a cron expression) — node: `OnSchedule`

## Examples

The AYON workflow addon ships with event-triggered workflow demos, located at:
- Windows: `C:\Users\YOUR_USER\AppData\Local\Ynput\AYON\addons\workflow_X.X.X\ayon_workflow\demo\workflow_from_events`
- Linux: `~/.local/share/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/workflow_from_events`
- macOS: `~/Library/Application Support/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/workflow_from_events`

Shipped event-triggered workflow demos
- `on_task_assignees_changed_watch_parent_folder` (**Sets task assignees as parent folder watchers**): React to the `entity.task.assignees_changed` event.
- `trigger_from_cron` (**CronWorkflow**): Tests triggering a workflow from a cron schedule.
- `trigger_from_simple_action_folder` (**SimpleActionWorkflowFolder**): Tests triggering a workflow from a simple action event (folder scope).
- `trigger_from_simple_action_version` (**SimpleActionWorkflowVersion**): Tests triggering a workflow from a simple action event (version scope).
- `trigger_from_version_created_event` (**VersionCreatedWorkflow**): Tests triggering a workflow from a new version created event.


### Registering a workflow

There are two ways to register and run event-triggered workflows: through the AYON UI, or directly via API.


- **Via the Workflow Editor** (UI), or
- **Via the API**, using the `api/addons/workflow/{version}/upload` endpoint, where `{version}` is the addon version (e.g. `0.4.3`).

## Running the workflow event processor service

- **Via the Services page** in the AYON UI — this requires login credentials, which are currently provided by request. Reach out to support to obtain them.
- **Directly on your machine**, via the CLI:


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

## Reference: creating your own EventTrigger or OnSchedule input node

You can create your own input logic by inheriting from the existing core input nodes:

- `OnSchedule`: Registers a new input node that's triggered periodically by a schedule.
- `EventTrigger`: Registers a new input node that reacts to an emitted AYON event. Keep in mind that for each event you want to act on, you'll need to create a dedicated node. You can find a list of well-known event topics [here](https://help.ayon.app/en/help/articles/2566382-ayon-event-viewer#e4bo4xwd0ei).

### Example 1: Implement a new schedule node that returns current time and timezone:
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
            cron_expression: str,  # come from OnSchedule node
        ) -> Tuple[datetime.datetime, str]:
        """ Execute the node.
        """
        super().execute(cron_expression)  # validate cron expression
        local_dt = datetime.datetime.now().astimezone()

        return (
            local_dt,
            local_dt.tzname(),
        )
```

### Example 2: Implement a new input node related to an incoming event:
```python
from typing import Optional, Dict

import ayon_api

from ayon_workflow.plugin_system import (
    OutputAttribute,
)

from ayon_workflow.plugins.workflow.inputs import EventTrigger


class OnNewEvent(EventTrigger):
    """Trigger node: on new event.new.todo."""

    version = "0.0.1"
    event_type = "event.new.todo"  # Enter your event type here.
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
        """ Return the event data.
        """
        if event_id is None:
            return {}

        event_data = super().execute(event_id)  # gather event data from ID
        # TODO: transform/process event_data into richer data type.
        return event_data
```