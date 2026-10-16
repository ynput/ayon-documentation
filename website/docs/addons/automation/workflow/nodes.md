---
title: Workflow addon nodes
sidebar_label: Nodes
description: "Reference of the built-in nodes of the AYON Workflow addon: context, flow control, event trigger, application and publish nodes, with their inputs, outputs and what each does."
addon: workflow
addon_repo: ayon-workflow
addon_version: 0.4.4
addon_scope: pipeline-server
addon_flags: [licensed, studio-only]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/3023198-workflow-nodes-reference
---

# Workflow addon nodes

<AddonInfo />

The built-in nodes of the [Workflow addon](index.md). They come from the `ayon-workflow-nodes` repository (package version 0.1.0, requiring Workflow addon 0.0.1 or newer), which the addon includes as a submodule. Other addons and custom plugin paths can register further nodes. The table columns list the input and output names as shown on the node.

The nodes marked "Workstation" are only available when the workflow runs in a full AYON environment: the editor, the command line and the event processor started from a workstation. They are not available in the event processor that runs as an AYON service.

## Utility nodes

| Node | Inputs | Outputs | What it does |
|---|---|---|---|
| `NoOp` | `input_data` | `output_data` | Returns the input unchanged. |
| `Append` | `inputs` (accepts several connections) | `appended_data` | Combines the inputs into one list. Lists among the inputs are flattened into it. |
| `Context` | `project_name`, `folder_id`, `folder_path`, `task_name`, `task_type`, `ensure_exists` | `context` | Builds an AYON context: a project, or a folder when a folder id or path is given, or a task when a task name is also given. With `ensure_exists` (default on) the project, folder and task must exist, and the task type must match when given. |
| `TaskContext` | `project_name`, `task_id`, `task_path`, `ensure_exists` | `task_context` | Builds a task context from a task id or a task path (`folder/path/task`). One of the two is required. |
| `GetParentContext` | `context` | `parent_context` | Returns the parent of a context: the folder of a task, the parent folder of a folder, or the project. |
| `Video` | `path`, `frame_range` | `video` | Defines a video file path, existing or not. |
| `ImageSequence` | `directory`, `head`, `tail`, `frame_range`, `padding` | `image_sequence` | Defines an image sequence, existing or not. `head` and `tail` are the text before and after the frame number, such as `img.` and `.jpg`. The padding defaults to 4. A temporary directory is used when no directory is given. |
| `MergeSequence` | `image_sequences` (accepts several connections) | `merged_sequence` | Merges image sequences with the same pattern into one that covers the lowest first frame to the highest last frame. Fails when the patterns differ. |
| `SetEntityWatchers` | `input_entity`, `watchers`, `edit_mode` | `edited_entity` | Changes the watchers of an entity and returns the entity. `edit_mode` is `add` (default), `remove`, `replace` or `toggle`. |
| `UITest` | Sample inputs of every widget type | None | Shows every input widget of the editor. It does nothing and exists for editor development. |

## Flow control nodes

| Node | Inputs | Outputs | What it does |
|---|---|---|---|
| `If` | `input_data`, `condition` | `on_True`, `on_False` | Branches the workflow. The input is passed to `on_True` or `on_False`, and the nodes connected to the other output are skipped. The condition defaults to the truth value of the input. A text condition is evaluated as a Python expression on `input_data`, so only use it in trusted workflows. |

## Trigger nodes

A workflow that starts with a trigger node can be run by the event processor. Trigger nodes read the event they were started by.

| Node | Starts when | Inputs | Outputs |
|---|---|---|---|
| `OnSchedule` | A cron expression is due. The expression is validated strictly. | `cron_expression` | None |
| `OnVersionCreated` | Event `entity.version.created` | `event_id` | `event_context` (folder of the version), `event_version_item` (the version) |
| `OnTaskAssigneesChanged` | Event `entity.task.assignees_changed` | `event_id` | `event_context` (the task), `event_assignees` (the new assignee list) |
| `OnActionFromFolder` | A simple action on folders | `project_name`, `entity_id` | `event_context` (the folder) |
| `OnActionFromVersion` | A simple action on versions | `project_name`, `entity_id` | `event_context` (the folder of the version), `event_version` (the version) |

## Application nodes

These nodes start an installed application in the background through the AYON Applications addon. When the context is a task, the application starts with the task environment. With a folder or project context the environment can be incomplete, and `restrict_to_task` makes the node fail instead. The application variant defaults to the latest available one. Workstation only.

| Node | Inputs | Outputs | What it does |
|---|---|---|---|
| `BlenderRender` | `context`, `blender_script_path` (a `.blend` file), `input_resource_path`, `output_media`, `python_script_path`, `frame_range`, `blender_application_variant`, `log_file`, `restrict_to_task` | `rendered_media` | Renders a Blender scene as an image sequence in background mode. Without `python_script_path` it uses a built-in script that renders the animation and can import a `.vdb` or `.abc` input resource. Fails when an expected frame is missing. |
| `BlenderWorkfile` | `context`, `blender_script_path` (a `.blend` file), `input_resource_path`, `output_workfile`, `python_script_path`, `blender_application_variant`, `log_file`, `restrict_to_task` | `blend_workfile` | Edits a Blender scene with a Python script and returns the path of the output workfile. |
| `NukeRender` | `context`, `nuke_script_path` (a `.nk` file), `input_media`, `output_media`, `python_script_path`, `frame_range`, `read_node_name`, `write_node_name`, `nuke_application_variant`, `log_file`, `restrict_to_task` | `rendered_media` | Renders a Nuke script with a given input and output media. Without `python_script_path` it uses a built-in script that points the single Read node and the single Write node (or the named ones) to the media. Fails when the expected output is missing. |

When a frame range is set, the log file name of the Blender and Nuke render nodes gets a chunk suffix, so chunked renders write separate logs.

## Publish nodes

Workstation only.

| Node | Inputs | Outputs | What it does |
|---|---|---|---|
| `Representation` | `input_media` (accepts several connections), `name`, `frame_range`, `data`, `custom_tags`, `tags` | `output_representation` | Prepares a representation for publishing. A list of inputs gives one representation per entry with the same name, range, data and tags. |
| `Publish` | `input_paths` (accepts several connections), `context`, `product_type`, `product_base_type`, `username`, `variant`, `comment`, `host_name`, `context_data`, `instance_data` | `published_version` | Publishes the inputs as a new version of a product in the context, through the AYON publish plugins. The context is a folder or a task. The product name is built from the product settings. Defaults: variant `Main`, host name `workflow`. The base product type defaults to the product type. |

The `Publish` node relies on the publish plugin `Collect From Provided Files`, which the addon adds for the host `workflow`.

## Demo workflows

The nodes repository ships demo workflows. The event-driven ones are these files in `demo/workflow_from_events`:

| Demo | Trigger |
|---|---|
| `on_task_assignees_changed_watch_parent_folder.json` | `OnTaskAssigneesChanged` |
| `trigger_from_cron.json` | `OnSchedule` |
| `trigger_from_simple_action_folder.json` | `OnActionFromFolder` |
| `trigger_from_simple_action_version.json` | `OnActionFromVersion` |
| `trigger_from_version_created_event.json` | `OnVersionCreated` |

## Related

- [Workflow overview](index.md)
- [Workflow settings](settings.md)
