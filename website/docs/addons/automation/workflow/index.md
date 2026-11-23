---
title: Workflow addon
sidebar_label: Overview
description: "The AYON Workflow addon: node-based automation with a browser editor, local, farm and event-triggered execution, simple actions in the AYON web app, the event processor service and its requirements, and the demo workflows and scripts that ship with it."
addon: workflow
addon_repo: ayon-workflow
addon_version: 0.4.6
addon_scope: pipeline-server
addon_flags: [licensed, studio-only]
addon_private: true
verified: 2026-11-20
sources:
  - https://help.ayon.app/en/articles/5235518-ayon-workflow-introduction
  - https://help.ayon.app/en/articles/0480584-configure-workflow-addon
  - https://help.ayon.app/en/articles/1804107-workflows-and-automations
  - https://help.ayon.app/en/articles/3023198-workflow-nodes-reference
  - https://help.ayon.app/en/articles/8963758-workflow-editor-your-first-workflows
---

# Workflow addon

<AddonInfo />

The Workflow addon is a node-based automation framework for AYON. A workflow is a graph of nodes, each node performing one task such as resolving a context, rendering in Blender or Nuke, or publishing a version. The graph is edited in a browser editor, stored as a JSON file, and executed in memory on a workstation, split into jobs for a render farm, or started automatically by a schedule, an AYON event or an action in the AYON web app. In these pages, a workflow always means such a graph, also called a workflow graph; the [pipeline workflows](../../../pipeline/index.md#workflows), such as the templated workfile builder or editorial publishing, are a different thing. The addon needs a Studio plan license (flags above). It is in initial development: backwards incompatible changes are marked by minor version bumps.

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon (compatible) | 1.7.0 or newer |
| Deadline addon (compatible, for farm submission) | 0.5.2 or newer |
| RoyalRender addon (compatible, for farm submission) | 0.4.0 or newer |
| Required addons | None |
| Service | `WorkflowEventProcessor` (image version 1.0.1) |

The nodes ship in the separate `ayon-workflow-nodes` repository, included in the addon as a submodule. Pipeline nodes also use the AYON Applications addon (to start Blender and Nuke) and the core publish plugins.

## What the addon provides

| Feature | Where it appears | What it does |
|---|---|---|
| Workflow editor | Tray item **Workflow editor**; command `ayon addon workflow editor` | Starts a local web editor backend and opens it in the browser, where workflows are authored, saved, loaded and executed. The first start from the tray installs the editor's Python packages, with a progress dialog; quitting the tray stops the editor backend. |
| Nodes | Editor palette | Built-in nodes for context, flow control, event triggers, applications and publishing; see [Workflow nodes](nodes.md). Any addon can register more. |
| Dispatch graphs | Editor | Splits a workflow into jobs for a farm. Dispatch types are Generic (AYON), Deadline Thinkbox and RoyalRender, with optional chunking of a node input. |
| Registered workflows | AYON server | Workflow JSON files stored on the server, listed and served by the addon API; the event processor and the simple action settings read them. Only managers, admins and services can register or delete them. |
| Simple actions | Actions menu of folders and versions | Exposes a registered workflow as an action; see [Simple actions](#simple-actions). |
| Event processor | AYON service or command line | Runs workflows started by events and cron schedules; see [Event processor](#event-processor). |
| Command line | `ayon addon workflow` | Commands to execute, submit and process workflows; see [Command line](#command-line). |

## Execution modes

| Mode | Description |
|---|---|
| In memory | The whole workflow runs in one process on the machine that starts it (`execute`). |
| From backend | A workflow is split by a dispatch graph into slices. The slices run as separate jobs that share a backend directory (`execute-slice-flow`). |
| Farm submission | The dispatch graph is submitted to a farm (`submit`). Supported managers in the dispatch nodes are Deadline Thinkbox and RoyalRender. |
| From event | An event, cron tick or simple action starts a registered workflow (`process-event` or the event processor). |

The execution engine is based on TaskFlow. The engine provides revert handling for failed workflows: when a node fails, the nodes that already ran undo their work where they support it, for example `SetStatus` restores the previous status.

A saved workflow records the version of each node. It runs with the installed node of the same version or a newer compatible one: the same major version, or below 1.0 the same minor version. With an incompatible node version the run fails with an error naming the node. The backend directory used for dispatch is set in the [Dispatch directory settings](settings.md#dispatch-directory).

## Simple actions

A registered workflow that starts with an `OnActionFromFolder` or `OnActionFromVersion` node can be exposed in the actions menu of folders or versions. Each exposed workflow is configured in the [Simple actions settings](settings.md#simple-actions) and appears under the category `workflow`, with the configured label, and can be run on several selected entities. When **Execute Locally** is on, the action starts `ayon addon workflow process-event` for the generated event on the user's machine. Otherwise the server creates an event and the event processor runs the workflow.

## Event processor

The event processor scans the registered workflows periodically, so new workflows are found without a restart. It runs workflows for these triggers:

| Trigger | Node | Source |
|---|---|---|
| Version created | `OnVersionCreated` | Event `entity.version.created` |
| Task assignees changed | `OnTaskAssigneesChanged` | Event `entity.task.assignees_changed` |
| Simple action | `OnActionFromFolder`, `OnActionFromVersion` | Events `workflow.from_simple_action.remote` (the `.local` variant is handled on the user's machine) |
| Schedule | `OnSchedule` | Cron expression |

The processor can run in two ways, and only one should run at a time:

| Way | Support |
|---|---|
| AYON service `WorkflowEventProcessor` | Runs workflows in memory on the server side. The nodes `NukeRender`, `BlenderRender`, `BlenderWorkfile`, `Publish` and `Representation` are not available there. |
| Command `ayon addon workflow event-processor --token <key>` on an AYON workstation | Supports all nodes and farm submission. The token is a service API key. |

## Demo workflows

The demos come with the nodes repository and are installed with the addon, in `ayon_workflow/plugins/demo/` inside the addon folder of the AYON launcher (for example `%LOCALAPPDATA%\Ynput\AYON\addons\workflow_0.4.6\` on Windows). They are also in the [ayon-workflow-nodes](https://github.com/ynput/ayon-workflow-nodes/tree/develop/demo) repository.

### Trigger templates

The files in `demo/workflow_from_events/` show how a registered workflow is started, one per trigger. Apart from the watchers demo, which is a complete automation, the work they do is a placeholder: a `NoOp` job sent to Deadline, to be replaced with real nodes. All except the watchers demo need a working Deadline setup to show a result.

| Demo | Trigger node | What it shows |
|---|---|---|
| `on_task_assignees_changed_watch_parent_folder.json` | `OnTaskAssigneesChanged` | A complete automation: adds the new assignees of a task as watchers of its parent folder (`GetParentContext`, `SetEntityWatchers`). Runs without a farm. |
| `trigger_from_version_created_event.json` | `OnVersionCreated` | Continuing only for versions of one project (`Demo`), checked with an `If` node. A DCC publish, the Tray Publisher and an upload in the web app all start it. |
| `trigger_from_cron.json` | `OnSchedule` | A scheduled run, every minute (`*/1 * * * *`); the result shows in the Deadline Monitor. |
| `trigger_from_simple_action_folder.json` | `OnActionFromFolder` | A folder action, set up below to run on the user's machine. |
| `trigger_from_simple_action_version.json` | `OnActionFromVersion` | A version action, set up below to run on the event processor. |

To try one:

1. In the editor, open it with **File > Load...**.
2. Register it with **File > Registered Workflows > Register Current Workflow...** and give it a name. From then on the event processor runs it when its trigger fires.
3. For the action demos, add an entry in the [Simple actions settings](settings.md#simple-actions): a label, the registered workflow, and **Execute Locally** on for the folder demo and off for the version demo. Entries are disabled when added, so enable the entry. The action then appears in the actions menu of folders or versions.

### Python scripts

The scripts in `demo/` are examples for developers rather than editor graphs. Each one builds a workflow in code and runs it, started with `ayon run <script>`:

| Script | What it shows |
|---|---|
| `example.py` | Creating, connecting, editing and deleting nodes from Python, saving and loading the workflow, and running it in memory and through the command line. |
| `demo_publish_render.py` | A Blender render and a Nuke render, followed by publishing the results as versions. Needs a folder with a `Generic` task, and Blender and Nuke set up in the Applications addon. |
| `example_workflow_deadlinethinkbox.py`, `example_workflow_royalrender.py` | The same Blender and Nuke work dispatched to Deadline or Royal Render, each application in its own job, so it uses its own pool or license. |
| `example_workflow.py`, `example_workflow_split.py` | Running a workflow from a backend directory, as one dispatch graph or several. |
| `example_workflow_chunk.py` | Splitting an image sequence into frame chunks that run as separate jobs. |
| `example_revert.py` | What the nodes that already ran undo when a later node fails. |

## Command line

| Command | Purpose |
|---|---|
| `execute` | Runs a workflow file in memory. Options: `--workflow-path` (required), `--inputs-path`, `--project`. |
| `execute-slice-flow` | Runs one slice of a dispatched workflow. Options: `--graph-path`, `--backend-dir`, `--slice-flow-id`, `--full-flow-id` (all required), `--project`. |
| `submit` | Submits a workflow to a farm. Options: `--workflow-path` (required), `--backend-dir`, `--dispatch-graph-name`, `--inputs-path`, `--project`. |
| `process-event` | Processes one event with the registered workflows. Option: `--event-id` (required). |
| `editor` | Starts the web editor backend. Options: `--host`, `--port`. |
| `event-processor` | Starts the event processor. Option: `--token`. |

## Server API

The addon registers endpoints on the AYON server for the registered workflows: list (`GET registered_workflows`), read (`GET registered_workflows/{name}`), upload (`POST upload`) and delete (`DELETE registered_workflows/{name}`). All of them need a signed-in user or a service; upload and delete need a manager, an admin or a service. The files are stored in `/storage/addons/workflow/registered_workflows` on the server.

## Related

- [Workflow nodes](nodes.md)
- [Workflow settings](settings.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md) (planned)
