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
This developer reference guide covers how to programmatically create, edit, execute, and extend custom workflows using the `ayon-workflow` Python API and Command-Line Interface (CLI).


## Quick Start: My First Workflow

Before deep-diving into execution frameworks, here is how to programmatically create an execution graph, define an entry parameter, and compute an in-memory results dictionary inside the AYON console:

```python
from ayon_workflow.workflow_editor import Workflow
from ayon_workflow.workflow_execution import execute_workflow
from ayon_workflow.plugin_system import register_all_plugins

# Discover all available node definitions in the environment
register_all_plugins()

# Create a new workflow
my_workflow = Workflow(name="My First Workflow")
graph = my_workflow.execution_graph

# Create a node using the NoOp (No Operation) plugin type
node = graph.create_node("NoOp")
node["input_data"] = "hello world"

# Execute locally in the active session
result = execute_workflow(my_workflow)
print(result)  # Output: {'NoOp1.output_data': 'hello world'}

```

## Glossary & Core Architecture

| Term | Domain | Definition |
| --- | --- | --- |
| **Workflow** | Editing | An editable Python object describing an execution Graph and multiple optional DispatchGraphs. |
| **Graph** | Editing | An editable Python object describing a workflow execution composed of multiple Node objects. |
| **Node** | Editing | A Python object representing a unit of work created from a Plugin description. |
| **Plugin** | Editing | A Python dictionary or class defining the type and behavior of a Node. |
| **DispatchGraph** | Editing | An editable Python object describing how to split a Workflow execution Graph into discrete tasks. |
| **Flow** | Execution | A non-editable TaskFlow object generated from a Graph containing all Atom execution objects. |
| **Backend** | Execution | A persistent, disk-based component storing task states, inputs, and outputs to enable distributed execution. |

## Workflow File Operations

### Listing Discovered Node Types (Plugins)

To query the registry for all node definitions currently active and available for graph construction:

```python
from ayon_workflow.plugin_system import register_all_plugins, PluginRegistry

register_all_plugins()

for plugin in PluginRegistry().plugin_list():
    print(f"   + {plugin}")

```

### JSON Import/Export Serialization

Workflows can be saved down to or loaded from `.json` workflow layout:

```python
from ayon_workflow.workflow_editor import Workflow

# Import existing workflow architecture from a JSON file
my_workflow = Workflow.import_from_file("/path/to/workflow.json")

# Export layout changes back to disk
my_workflow.export_to_file("/path/to/workflow.json")

```

## Execution Modes & Farm Dispatching

AYON Workflow supports three distinct execution frameworks:

| Mode | Description | Persistence | Distribution |
| --- | --- | --- | --- |
| **In-Memory** | Runs entirely in memory within a single Python process. Best for rapid local development or host-DCC automation. | None | Single process |
| **Backend** | Persists state to a disk-based system. Enables individual flows to be split, resumed, or retried on failure. | **Disk** (Persistent backend directory data) | Single or Multi-process |
| **Farm Distributed** | Automatically splits sub-flows, matching node connections to job dependencies inside a render farm. | **Disk + Farm** (Persistent backend directory data + Render jobs/tasks in farm manager) | Multi-machine |

### Python API Execution Call Reference

```python
from ayon_workflow.workflow_execution import (
    execute_workflow,
    execute_in_memory,
    execute_from_backend,
    submit_workflow_to_farm,
)

# All execution functions works via workflow object or path

# Standard memory execution
execute_workflow(my_workflow)
execute_workflow("/path/to/workflow.json")
execute_in_memory("/path/to/workflow.json")

# Render farm job submission 
submit_workflow_to_farm(
    "/path/to/workflow.json",
    "/path/to/shared/farm/backend",  # Must exist and be network reachable
    project_name="my_project_name"   # Required parameter for multi-platform root resolution
)

# Persistent backend execution for individual slices/sub-graphs
execute_from_backend(
    "/path/to/workflow.json",
    "/path/to/shared/farm/backend",
    slice_flow_id,
    full_flow_id,
    project_name
)
```

### Advanced Distributed Farm Example (With Task Chunking)

For frame-range operations or multi-node rendering workflows, you must attach a `DispatchGraph` to partition your execution nodes into render farm tasks:

```python
from ayon_workflow.workflow_editor import Workflow, TaskChunkParameters
from ayon_workflow.workflow_execution import submit_workflow_to_farm
from ayon_workflow.plugin_system import register_all_plugins

register_all_plugins()

my_workflow = Workflow.import_from_file("/path/to/render_a_blender_file.json")
dispatch_graph = my_workflow.create_dispatch_graph("My Dispatch Graph")

# Create a render farm dispatch node (e.g., Deadline Thinkbox)
dispatch_group = dispatch_graph.create_node("DeadlineThinkbox")
dispatch_group.node_names = [node.name for node in my_workflow.execution_graph.all_nodes]

# Set render farm job specifications
dispatch_group.job_name = "Render and Publish from a Blender File"
dispatch_group.pool = "rendering-pool"
dispatch_group.group = "render-group"
dispatch_group.limit_groups = "blender"
dispatch_group.priority = 50

# Apply task chunking for frame-split workloads
dispatch_group.task_chunk = TaskChunkParameters(
    node_name="BlenderRender1",        # Target execution node
    node_input_name="frame_range",     # Input variable to chunk across blades
    chunk_size=2,
)

backend_dir = "/path/to/backend"
my_workflow.export_to_file("/path/to/workflow.json")

# Deploy to the render manager
submit_workflow_to_farm("/path/to/workflow.json", backend_dir)

```

### Command-Line Interface (CLI) Execution

<Tabs>

<TabItem value="windows" label=<span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> default>

```bash
cd <ayon-launcher-installation-location>

# In-memory execution
./ayon_console.exe addon workflow execute --workflow-path /path/to/workflow.json

# In-memory execution with dynamic input injection file
./ayon_console.exe addon workflow execute --workflow-path /path/to/workflow.json --inputs-path /path/to/input.json

# Render farm submission
./ayon_console.exe addon workflow submit --workflow-path /path/to/workflow.json --backend-dir /path/to/shared/farm/backend

# Individual slice flow processing on a farm worker node
./ayon_console.exe addon workflow execute-slice-flow --backend-dir /shared/farm/backend --slice-flow-id <flow_uuid> --full-flow_id <full_flow_id>
```

</TabItem>

<TabItem value="linux&mac" label=<div><span style={{color:'#1c2026',backgroundColor:'#f47421', borderRadius: '4px', padding: '2px 4px'}}>Linux</span> & <span style={{color:'#1c2026',backgroundColor:'#e9eff5', borderRadius: '4px', padding: '2px 4px'}}>MacOS</span></div> >

```bash
cd <ayon-launcher-installation-location>

# In-memory execution
ayon addon workflow execute --workflow-path /path/to/workflow.json

# In-memory execution with dynamic input injection file
ayon addon workflow execute --workflow-path /path/to/workflow.json --inputs-path /path/to/input.json

# Individual slice flow processing on a farm worker node
ayon addon workflow execute-slice-flow --backend-dir /shared/farm/backend --slice-flow-id <flow_uuid> --full-flow_id <full_flow_id>

# Render farm submission
ayon addon workflow submit --workflow-path /path/to/workflow.json --backend-dir /path/to/shared/farm/backend

```

</TabItem>

</Tabs>





You can find more info about the supported CLI commands via help flag.
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

:::tip Workflow Addon Verbosity
You can enable full diagnostic verbosity for CLI executions by exporting the environment variable `AYON_WORKFLOW_VERBOSE=1` beforehand.

:::

## Extending Workflow Nodes (Custom Plugins)

### Add your custom workflow plugins to the system
Custom node discovery can be achieved through **two separate integration pathways**, depending on how you intend to deploy and version control your custom tools:

#### Pathway 1: The Environment Variable Method

You can group your script modules inside a folder and declare its destination via an environment variable. It can be set globally via AYON Studio Settings `ayon+settings://core/environments` or scoped directly to an active production project environment `ayon+settings://core/project_environments?project=<project_name>` :

```json
{
    "AYON_WORKFLOW_ADDITIONAL_PLUGIN_PATH": "/path/to/my_plugins"
}
```

#### Pathway 2: The Packaged Addon Method

This approach embeds your custom node definitions directly within a custom AYON addon. The workflow manager automatically runs a registration pass scanning the client's localized bundle environment for the following internal folder layout:

```text
ayon_your_addon/
├── plugins/
│   └── workflow/
│       ├── __init__.py          # Must expose a get_plugins() function
│       descendants workflow plugins

```

### Custom Workflow Node Blueprint

Every custom workflow node class must inherit from `WorkflowTaskNode`. Type hints for inputs and outputs, as well as default fallback values for inputs, are dynamically extracted directly from the signature of the `execute()` method.

You can leverage standard data types located inside `ayon_workflow.datatypes` for type hints for arguments in the `execute()` method:

* `ContextItem` / `ProjectItem` / `FolderItem` / `TaskItem`
* `FrameRange` / `ImageSequence` / `Video`


### Custom Node Example Implementations

#### Example 1: Resolve Asset URI Node

This node contacts the server database via the native `ayon_api` to map global asset URIs to explicit file paths.

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

##### Testing the ResolveAssetURI Node

Open the AYON Console via the tray interface and run the following interactive block to test input ingestion and path parsing logic:

```python
from ayon_workflow.workflow_editor import Workflow
from ayon_workflow.workflow_execution import execute_workflow
from ayon_workflow.plugin_system import register_all_plugins

# Re-register tools to discover the new plugin architecture
register_all_plugins()

my_workflow = Workflow(name="Test Resolve Workflow")
graph = my_workflow.execution_graph

# Create the custom node type
node = graph.create_node("ResolveAssetURI")
node["ayon_asset_uri"] = "ayon+entity://Trash_Can/assets/characters/peely_banana?product=lookGreen&version=v001&representation=usd"
node["resolve_roots"] = True

# Evaluate graph paths
result = execute_workflow(my_workflow)
print(result)  
# Output: {'ResolveAssetURI1.resolved_path': 'E:\\AYON\\Trash_Can\\assets\\characters\\peely_banana\\publish\\look\\lookGreen\\v001\\trshcn_peely_banana_lookGreen_v001.usd'}

```

#### Example 2: File Creation Node with Revert Functionality

Nodes that commit external mutations (creating resources, updating tracking systems) must implement `revert_execute` to handle automatic transactional cleanups when downstream nodes fail.

```python title="my_workflows/create_file.py"
import os
from ayon_workflow.plugin_system import (
    InputAttribute,
    OutputAttribute,
    WorkflowTaskNode,
)

class CreateFile(WorkflowTaskNode):
    """Generate a file on disk with custom content, including rollback logic."""
    
    version = "1.0.0"

    inputs = [
        InputAttribute(name="file_path", description="Path to create", widget={"type": "filepath"}),
        InputAttribute(name="content", description="File content", default="random_content"),
    ]

    outputs = [
        OutputAttribute(name="created_path", description="Path of created file"),
    ]

    def execute(self, file_path: str = "", content: str = "random_content") -> str:
        with open(file_path, 'w') as f:
            f.write(content)
        return file_path

    def revert_execute(self, file_path: str = "", content: str = "random_content"):
        # Receives the exact same arguments context as execute for reverse processing
        if os.path.exists(file_path):
            os.remove(file_path)

def get_plugins() -> list[type[WorkflowTaskNode]]:
    return [CreateFile]

```

#### Example 3: Create Rootless File with Multi-Platform Compatibility

Production networks frequently utilize heterogeneous environments (e.g., Windows workstations generating graphs for Linux render nodes). **Always process path inputs via `remap_input()**` to dynamically parse rootless path strings relative to local storage configurations.

```python title="my_workflows/resolve_rootless_file.py"
import os
from ayon_workflow.datatypes import ContextItem
from ayon_workflow.plugin_system import (
    InputAttribute,
    OutputAttribute,
    WorkflowTaskNode,
)
from ayon_workflow.utils import remap_input

class CreateRootlessFile(WorkflowTaskNode):
    """Create a file handling rootless input tokens dynamically at runtime.
    
    Accepts explicit paths or rootless tokens (e.g., '{root[work]}/to/a/file.ext').
    """
    
    version = "1.0.0"

    inputs = [
        InputAttribute(name="context", description="Context item wrapper"),
        InputAttribute(name="file_path", description="Path to create", widget={"type": "filepath"}),
        InputAttribute(name="content", description="File content", default="default_content"),
    ]

    outputs = [
        OutputAttribute(name="created_path", description="Path of the created file"),
    ]

    def execute(self, context: ContextItem, file_path: str, content: str = "default_content") -> str:
        # Resolve the placeholder rootless string to the active OS file system paths on the fly
        remapped_path = remap_input(file_path, context.project_name)

        with open(remapped_path, 'w') as f:
            f.write(content)

        # Return original tokenized rootless reference so subsequent cross-platform nodes can interpret it
        return file_path

    def revert_execute(self, context: ContextItem, file_path: str, content: str = ""):
        remapped_path = remap_input(file_path, context.project_name)
        if os.path.exists(remapped_path):
            os.remove(remapped_path)

def get_plugins() -> list[type[WorkflowTaskNode]]:
    return [CreateRootlessFile]

```

#### Example 4: Multi-Output Function Nodes

When a node generates multiple distinct output branches, the return payload must be structured as a standard Python `tuple`. The indexes within the tuple must perfectly reflect the index order of the registered `outputs` block.

```python title="my_workflows/concatentate_and_float.py"
from ayon_workflow.plugin_system import (
    WorkflowTaskNode,
    InputAttribute,
    OutputAttribute,
)

class ConcatenateAndFloat(WorkflowTaskNode):
    """Combine text strings and track a floating-point computation constant."""
    
    version = "1.0.0"

    inputs = [
        InputAttribute(name="text1", description="First string"),
        InputAttribute(name="text2", description="Second string"),
        InputAttribute(name="separator", description="Text delimiter character", default=" "),
    ]

    outputs = [
        OutputAttribute(name="concatenated_text", description="Resulting combined text string"),
        OutputAttribute(name="float_value", description="Computed metadata float metric"),
    ]

    def execute(self, text1: str, text2: str, separator: str = " ") -> tuple[str, float]:
        # Tuple return ordering must match the index orientation of the outputs specification
        combined_text = f"{text1}{separator}{text2}"
        return combined_text, 1.0

def get_plugins() -> list[type[WorkflowTaskNode]]:
    return [ConcatenateAndFloat]

```

## Further Info
For further info, you can refer to 
- [AYON Workflow Addon API Reference](https://docs.ayon.dev/ayon-workflow/latest/) 
- The demo workflows shipped within the addon, you can locate the addon at 
  - Windows: `c:\Users\YOUR_USER\AppData\Local\Ynput\AYON\addons\workflow_X.X.X\ayon_workflow\demo\`
  - Linux: `~/.local/share/Ynput/AYON/addons/workflow_X.X.X\ayon_workflow\demo\`
  - MacOs: `~/Library/Application Support/Ynput/AYON/addons/workflow_X.X.X/ayon_workflow/demo/`
