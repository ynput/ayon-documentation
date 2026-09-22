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

### Triggering workflows automatically

There are several ways to trigger workflows automatically:

- When an event occurs: the event processor runs the workflow whenever its respective event is triggered.
  - On task assignees changed (`entity.task.assignees_changed`) — use the `OnTaskAssigneesChanged` node
  - On version creation (`entity.version.created`) — use the `OnVersionCreated` node
- When a workflow action is triggered from an entity's action menu: this relies on event triggering, as workflow actions emit either `workflow.from_simple_action.local` (runs the workflow on the user's machine) or `workflow.from_simple_action.remote` (runs the workflow on the workflow event processor service), depending on the `Execute Locally` setting in the workflow's configuration.
  - Run the action from version actions — use the `OnActionFromVersion` node
  - Run the action from folder actions — use the `OnActionFromFolder` node
- Periodically: based on cron expressions.
  - On a schedule — use the `OnSchedule` node

> **During the publishing process**: this isn't officially supported. It's possible to write a custom publish plugin to trigger a workflow during publishing; however, a more generic approach is to trigger workflows based on events — for example, creating a workflow that triggers on version creation, which fires once publishing completes.

:::tip Extend Workflows Input Nodes 

To support more events, the input nodes can be extended to cover custom event topics you might have. Please refer to [Reference: creating your own EventTrigger or OnSchedule input node](#reference-creating-your-own-eventtrigger-or-onschedule-input-node).
:::

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

- **Via the Workflow Editor** (UI) as outlined [here](place-holder-for-user-docs), or
- **Via the API**, using the `api/addons/workflow/{version}/upload` endpoint, where `{version}` is the addon version (e.g. `0.4.3`).

:::caution

You cannot upload multiple workflows with the same name. An existing workflow must be de-registered before a new one with the same name can be uploaded.
:::

:::tip

To obtain a list of registered workflow graphs, find it in the Workflow Editor or use `api/addons/workflow/{version}/registered_workflows`.
:::

## Running the workflow event processor service
The event processor listens for relevant events and executes registered workflows accordingly.
The following options are available for running the workflow event processor service:

- **Via the Services page** in AYON, as outlined [here](Place-holder-for-configure-workflow-addon-doc). This requires Docker login credentials, which are currently provided by request. Reach out to support to obtain them.
- **Directly on your machine**, via the CLI. Note that the processor does not use the credentials of the logged-in user. it requires a valid `AYON_API_KEY` to be passed explicitly using the `--token` flag:

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

You can extend the input nodes to support additional event topics or scheduling needs beyond what's provided out of the box (see [Triggering workflows automatically](#triggering-workflows-automatically)). You can do this by inheriting from the existing core input nodes:

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