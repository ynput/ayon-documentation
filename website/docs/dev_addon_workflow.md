---
id: dev_addon_workflow
title: AYON Workflow Addon Developer Documentation
sidebar_label: Workflow
description: AYON Workflow Addon Developer Documentation
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

This guide covers how to create, edit, run, and extend workflows with the
`ayon-workflow` Python API and command-line interface (CLI).

## Quick Start: My First Workflow

This example creates a workflow with a single node, sets one of its inputs,
and runs it in memory. Run it in the AYON Console, which you can open from the
AYON tray:

```python
from ayon_workflow.workflow_editor import Workflow
from ayon_workflow.workflow_execution import execute_workflow
from ayon_workflow.plugin_system import register_all_plugins

# Discover all available node types
register_all_plugins()

# Create a new workflow
my_workflow = Workflow(name="My First Workflow", description="An optional description here")
graph = my_workflow.execution_graph

# Create a node from the NoOp (No Operation) node type
node = graph.create_node("NoOp")
node["input_data"] = "hello world"

# Run the workflow in the current session
result = execute_workflow(my_workflow)
print(result)  # Output: {'NoOp1.output_data': 'hello world'}
```

## Glossary

| Term | Domain | Definition |
| --- | --- | --- |
| **Workflow** | Editing | An editable Python object containing an execution Graph and optional DispatchGraphs. |
| **Graph** | Editing | An editable Python object describing the workflow to run, made of Node objects. |
| **Node** | Editing | A Python object representing a unit of work, created from a Plugin. |
| **Plugin** | Editing | A node type available in the Graph, implemented as a Python class or dictionary. |
| **DispatchGraph** | Editing | An editable Python object describing how to split a workflow's execution Graph into separate farm tasks or jobs. |
| **Flow** | Execution | A non-editable TaskFlow object generated from a Graph, containing all Atom execution objects. |
| **Backend** | Execution | A persistent, disk-based store of task states, inputs, and outputs, used for distributed execution. |

## Saving and Loading Workflows

Workflows can be saved to and loaded from `.json` files:

```python
from ayon_workflow.workflow_editor import Workflow

# Load a workflow from a JSON file
my_workflow = Workflow.import_from_file("/path/to/workflow.json")

# Save changes back to disk
my_workflow.export_to_file("/path/to/workflow.json")
```

## Running Workflows

AYON Workflow supports three execution modes:

| Mode | Description | Persistence | Distribution |
| --- | --- | --- | --- |
| **In-Memory** | Runs entirely in memory within a single Python process. Best for quick local development or automation inside a DCC. | None | Single process |
| **Backend** | Saves state to disk, so individual flows can be split, resumed, or retried on failure. | **Disk** (backend directory) | Single or multiple processes |
| **Farm Distributed** | Splits the workflow into sub-flows and submits them to a render farm, turning node connections into job dependencies. | **Disk + Farm** (backend directory, plus jobs and tasks in the farm manager) | Multiple machines |

### Workflow Python API

```python
from ayon_workflow.workflow_execution import (
    execute_workflow,
    submit_workflow_to_farm,
)

# Run the whole workflow locally, in memory
execute_workflow(my_workflow)               # from a Workflow object
execute_workflow("/path/to/workflow.json")  # from a workflow file

# Optional arguments
execute_workflow(
    my_workflow,
    inputs_data={"NoOp1.input_data": "custom_value"},  # override inputs (dict, str, or None)
    log=log,                              # custom logging.Logger
    flow_notifier=my_flow_tracking_func,  # callable, notified on flow updates
    task_notifier=my_task_tracking_func,  # callable, notified on task updates
)

# Submit to the render farm
submit_workflow_to_farm(
    "/path/to/workflow.json",
    "/path/to/shared/farm/backend",  # must exist and be reachable from the farm
    project_name="my_project_name",  # required, used to resolve roots on each platform
)
```
<!-- ```
# Persistent backend execution for individual slices/sub-graphs
from ayon_workflow.workflow_execution import execute_from_backend
from ayon_workflow.workflow_execution.from_backend.job_description import to_job_description

job_description = to_job_description(
    my_workflow,
    backend_dir="/path/to/shared/farm/backend"
)
for step in job_description.steps:
    args = step.script.args
    result = addon.execute_from_backend(
        # Get command line to run.
        args[5],  # execution graph path,
        args[7],  # backend directory
        args[9],  # slice flow id
        args[11], # full flow id
    )
``` -->

### Farm Example with Task Chunking

To control how a workflow is split into farm jobs, for example to render a
frame range in chunks, add a `DispatchGraph`:

```python
from ayon_workflow.workflow_editor import Workflow, TaskChunkParameters
from ayon_workflow.workflow_execution import submit_workflow_to_farm
from ayon_workflow.plugin_system import register_all_plugins

register_all_plugins()

my_workflow = Workflow.import_from_file("/path/to/render_a_blender_file.json")
dispatch_graph = my_workflow.create_dispatch_graph("My Dispatch Graph")

# Create a farm dispatch node (for example, Deadline Thinkbox)
dispatch_group = dispatch_graph.create_node("DeadlineThinkbox")
dispatch_group.node_names = [node.name for node in my_workflow.execution_graph.all_nodes]

# Set the farm job settings
dispatch_group.job_name = "Render and Publish from a Blender File"
dispatch_group.pool = "rendering-pool"
dispatch_group.group = "render-group"
dispatch_group.limit_groups = "blender"
dispatch_group.priority = 50

# Split the frame range into chunks
dispatch_group.task_chunk = TaskChunkParameters(
    node_name="BlenderRender1",     # node to split
    node_input_name="frame_range",  # input to split into chunks
    chunk_size=2,
)

backend_dir = "/path/to/backend"
my_workflow.export_to_file("/path/to/workflow.json")

# Submit to the render farm
submit_workflow_to_farm(
    "/path/to/workflow.json",
    backend_dir,
    project_name="my_project_name",
)
```

### Command-Line Interface (CLI)

<Tabs>

<TabItem value="windows" label=<span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> default>

```bash
cd <ayon-launcher-installation-location>

# Run in memory
./ayon_console.exe addon workflow execute --workflow-path /path/to/workflow.json

# Run in memory, with inputs from a JSON file
./ayon_console.exe addon workflow execute --workflow-path /path/to/workflow.json --inputs-path /path/to/input.json

# Submit to the render farm
./ayon_console.exe addon workflow submit --workflow-path /path/to/workflow.json --backend-dir /path/to/shared/farm/backend

# Run a single slice flow on a farm worker
./ayon_console.exe addon workflow execute-slice-flow --backend-dir /shared/farm/backend --slice-flow-id <flow_uuid> --full-flow_id <full_flow_id>
```

</TabItem>

<TabItem value="linux&mac" label=<div><span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> & <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span></div> >

```bash
cd <ayon-launcher-installation-location>

# Run in memory
ayon addon workflow execute --workflow-path /path/to/workflow.json

# Run in memory, with inputs from a JSON file
ayon addon workflow execute --workflow-path /path/to/workflow.json --inputs-path /path/to/input.json

# Submit to the render farm
ayon addon workflow submit --workflow-path /path/to/workflow.json --backend-dir /path/to/shared/farm/backend

# Run a single slice flow on a farm worker
ayon addon workflow execute-slice-flow --backend-dir /shared/farm/backend --slice-flow-id <flow_uuid> --full-flow_id <full_flow_id>
```

</TabItem>

</Tabs>

For all supported commands and options, use the `--help` flag:

<Tabs>

<TabItem value="windows" label=<span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> default>

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe addon workflow --help
```

</TabItem>

<TabItem value="linux&mac" label=<div><span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> & <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span></div> >

```bash
cd <ayon-launcher-installation-location>
ayon addon workflow --help
```

</TabItem>

</Tabs>

:::tip Verbose output
For full diagnostic output from CLI commands, set the environment variable
`AYON_WORKFLOW_VERBOSE=1` before running them.
:::

## Extending Workflow Nodes (Custom Plugins)

### Make your custom nodes available

There are two ways to make custom nodes available to the Workflow addon.
Choose based on how you want to deploy and version your nodes.

#### Pathway 1: Environment variable

Put your node modules in a folder, and set `AYON_WORKFLOW_ADDITIONAL_PLUGIN_PATH`
to that folder. Each module exposes its own `get_plugins()` function, as in the
[examples below](#custom-node-examples).

You can set the variable for the whole studio in
`ayon+settings://core/environments`, or for a single project in
`ayon+settings://core/project_environments?project=<project_name>`:

```json
{
    "AYON_WORKFLOW_ADDITIONAL_PLUGIN_PATH": "/path/to/my_plugins"
}
```

#### Pathway 2: Packaged addon

Ship your nodes inside your own AYON addon, using this folder layout. The
Workflow addon finds them automatically:

```text
ayon_your_addon/
└── plugins/
    └── workflow/
        ├── __init__.py   # must expose a get_plugins() function
        └── my_nodes.py   # your workflow node modules
```

#### Check that your nodes are available

To list every node type the Workflow addon has discovered, including yours:

```python
from ayon_workflow.plugin_system import register_all_plugins, PluginRegistry

register_all_plugins()

for plugin in PluginRegistry().plugin_list():
    print(f"   + {plugin}")
```

### Writing a custom node

Every custom node class inherits from one of these base classes:

- `WorkflowTaskNode`: most nodes, which take inputs and produce outputs.
- `WorkflowConditionTaskNode`: branching nodes, where only one output continues
  downstream.
- `EventTrigger` or `OnSchedule`: nodes that start a workflow from an AYON event
  or a cron schedule. See
  [Reference: creating your own EventTrigger or OnSchedule input node](https://docs.ayon.dev/docs/dev_addon_workflow_event#reference-creating-your-own-eventtrigger-or-onschedule-input-node).

The input and output types, and the input default values, are read from the
type hints and defaults in the `execute()` method signature. For structured
data, you can use the types in `ayon_workflow.datatypes`, such as `ContextItem`
and `FrameRange`.

:::tip
For the full conventions, including inputs and widgets, outputs, data types,
cross-platform paths, revert logic, and execution scopes, see the
[Node Authoring Guide](https://github.com/ynput/ayon-workflow-nodes/blob/main/docs/node_authoring.md).
:::

### Custom Node Examples

#### Example 1: Resolve an AYON URI

This node uses `ayon_api` to resolve an AYON URI to a file path.

```python title="my_workflows/resolve_uri.py"
from ayon_workflow.plugin_system import (
    InputAttribute,
    OutputAttribute,
    WorkflowTaskNode,
)

class ResolveAssetURI(WorkflowTaskNode):
    """Resolve an AYON Asset URI into an absolute file path."""

    version = "1.0.0"

    inputs = [
        InputAttribute(name="ayon_asset_uri", description="AYON Asset URI"),
        InputAttribute(name="resolve_roots", description="Resolve Roots flag"),
    ]

    outputs = [
        OutputAttribute(name="resolved_path", description="Resolved Absolute Path"),
    ]

    def execute(self, ayon_asset_uri: str, resolve_roots: bool = False) -> str:
        import ayon_api

        response = ayon_api.post(
            "resolve",
            resolveRoots=resolve_roots,
            uris=[ayon_asset_uri]
        )

        if response.status_code != 200:
            raise RuntimeError(f"Unable to resolve URI '{ayon_asset_uri}': {response.text}")

        data = response.data[0]
        if data.get("error"):
            raise RuntimeError(data["error"])

        return data["entities"][0]["filePath"]

def get_plugins() -> list[type[WorkflowTaskNode]]:
    return [ResolveAssetURI]
```

##### Testing the ResolveAssetURI node

Open the AYON Console from the AYON tray and run:

```python
from ayon_workflow.workflow_editor import Workflow
from ayon_workflow.workflow_execution import execute_workflow
from ayon_workflow.plugin_system import register_all_plugins

# Discover node types, including your new node
register_all_plugins()

my_workflow = Workflow(name="Test Resolve Workflow")
graph = my_workflow.execution_graph

# Create a node from your custom node type
node = graph.create_node("ResolveAssetURI")
node["ayon_asset_uri"] = "ayon+entity://Trash_Can/assets/characters/peely_banana?product=lookGreen&version=v001&representation=usd"
node["resolve_roots"] = True

# Run the workflow
result = execute_workflow(my_workflow)
print(result)
# Output: {'ResolveAssetURI1.resolved_path': 'E:\\AYON\\Trash_Can\\assets\\characters\\peely_banana\\publish\\look\\lookGreen\\v001\\trshcn_peely_banana_lookGreen_v001.usd'}
```

#### Example 2: Create a file, with cross-platform paths and revert

This example shows two conventions together:

- **Cross-platform paths.** A workflow can be built on one OS and run on
  another, for example on a Windows workstation and then a Linux farm node. So
  path inputs can be rootless, such as `{root[work]}/to/a/file.ext`. Always
  resolve path inputs with `remap_input()` before using them, and return the
  original rootless path so the next node can resolve it on its own machine.
- **Revert.** Nodes with side effects, such as creating files or updating
  tracking systems, should implement `revert_execute()`. If a later node
  fails, the Workflow addon calls it with the same arguments as `execute()`,
  so the node can undo its changes.

```python title="my_workflows/create_rootless_file.py"
import os
from ayon_workflow.datatypes import ContextItem
from ayon_workflow.plugin_system import (
    InputAttribute,
    OutputAttribute,
    WorkflowTaskNode,
)
from ayon_workflow.utils import remap_input

class CreateRootlessFile(WorkflowTaskNode):
    """Create a file at a rootless or absolute path, and remove it on revert."""

    version = "1.0.0"

    inputs = [
        InputAttribute(name="context", description="AYON context"),
        InputAttribute(name="file_path", description="Path to create", widget={"name": "filepath"}),
        InputAttribute(name="content", description="File content"),
    ]

    outputs = [
        OutputAttribute(name="created_path", description="Path of the created file"),
    ]

    def execute(self, context: ContextItem, file_path: str, content: str = "default_content") -> str:
        # Resolve the rootless path for this machine
        remapped_path = remap_input(file_path, context.project_name)

        with open(remapped_path, 'w') as f:
            f.write(content)

        # Return the original rootless path, so the next node can resolve it itself
        return file_path

    def revert_execute(self, context: ContextItem, file_path: str, content: str = "default_content"):
        # Receives the same arguments as execute(), so resolve the path again
        remapped_path = remap_input(file_path, context.project_name)
        if os.path.exists(remapped_path):
            os.remove(remapped_path)

def get_plugins() -> list[type[WorkflowTaskNode]]:
    return [CreateRootlessFile]
```

#### Example 3: Multiple outputs

A node with several outputs returns them as a `tuple`, in the same order as
`outputs`.

```python title="my_workflows/concatenate_and_float.py"
from ayon_workflow.plugin_system import (
    WorkflowTaskNode,
    InputAttribute,
    OutputAttribute,
)

class ConcatenateAndFloat(WorkflowTaskNode):
    """Combine two strings and return a float value."""

    version = "1.0.0"

    inputs = [
        InputAttribute(name="text1", description="First string"),
        InputAttribute(name="text2", description="Second string"),
        InputAttribute(name="separator", description="Separator between the strings"),
    ]

    outputs = [
        OutputAttribute(name="concatenated_text", description="The combined string"),
        OutputAttribute(name="float_value", description="A float value"),
    ]

    def execute(self, text1: str, text2: str, separator: str = " ") -> tuple[str, float]:
        # The tuple order matches the order of `outputs`
        combined_text = f"{text1}{separator}{text2}"
        return combined_text, 1.0

def get_plugins() -> list[type[WorkflowTaskNode]]:
    return [ConcatenateAndFloat]
```

## Further Reading

- **User and admin documentation:** [Workflow Addon - AYON Help Center](https://help.ayon.app/en/help/collections/6014460-workflow)
- **Event-triggered workflows:** [Event-triggered workflows developer documentation](https://docs.ayon.dev/docs/dev_addon_workflow_event)
- **Node conventions:** [Node Authoring Guide](https://github.com/ynput/ayon-workflow-nodes/blob/main/docs/node_authoring.md)
- **API documentation:** [AYON Workflow Addon API Reference](https://docs.ayon.dev/ayon-workflow-docs/latest/)
- **Demo workflows:** Available in the [`ayon-workflow-nodes` repository](https://github.com/ynput/ayon-workflow-nodes/tree/main/demo).They also ship with the addon. By default, you can find them at:
  - Windows: `C:\Users\YOUR_USER\AppData\Local\Ynput\AYON\addons\workflow_X.X.X\ayon_workflow\demo\`
  - Linux: `~/.local/share/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/`
  - macOS: `~/Library/Application Support/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/`