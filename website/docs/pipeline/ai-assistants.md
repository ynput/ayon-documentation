---
title: AI assistants
description: "What AI assistants connected to AYON through the AYON MCP server addon are useful for to artists and TDs: finding assigned work and approved versions, reading notes, exploring the data model and settings, drafting scripts, bulk updates and data audits, and how permissions and confirmations keep changes under control."
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-mcp/tree/v0.3.0
  - https://github.com/ynput/ayon-mcp/blob/develop/services/mcp/ayon_mcp/instructions.py
  - https://github.com/ynput/ayon-mcp/blob/develop/services/mcp/ayon_mcp/tools/entities.py
  - https://github.com/ynput/ayon-mcp/blob/develop/services/mcp/ayon_mcp/tools/attributes.py
  - https://github.com/ynput/ayon-mcp/blob/develop/server/addon.py
---

# AI assistants

An AI assistant such as Claude can work with AYON data when it is connected through the [AYON MCP server addon](../addons/production-tracking/mcp/index.md), which exposes the AYON server through the Model Context Protocol (MCP). Artists and TDs then ask in plain language instead of clicking through pages or writing a query: what is assigned to them, which version of a shot is approved, how a project's data is set up, or which shots are missing a frame range. The assistant finds the right AYON operations, reads the data with the permissions of the person asking, and changes data only when that person asks for it and confirms. Producers use the same connection for reports, see [Ask an AI assistant connected to AYON](../production-tracking/reporting.md#ask-an-ai-assistant-connected-to-ayon).

The addon is experimental (alpha). Installing it, creating keys and configuring each assistant are described on the [addon page](../addons/production-tracking/mcp/index.md), which also lists its cautions.

<!-- screenshot: a chat in an AI assistant answering "what is assigned to me on wing_it?" with a list of tasks, their statuses and due dates read from AYON -->

## How the assistant works with AYON

The assistant does not see the AYON database. It sees a catalog of tools, each one an AYON operation, and chooses which to call:

- **Discovery.** By default the assistant gets five discovery tools. It searches the catalog for an operation, reads its arguments, then runs it. This keeps the assistant's context small although the catalog holds hundreds of operations.
- **Curated tools** cover the usual questions: projects, the folder hierarchy, tasks, products, versions, representations, events, addons, bundles and settings.
- **REST tools.** Every operation of the AYON REST API is in the catalog too, built from the API description of the running server, so the assistant can do what the REST API allows within the user's permissions.
- **GraphQL.** For questions the other tools do not express, the assistant writes and runs a GraphQL query.
- **Addon tools.** Installed addons can add tools of their own to the catalog.
- **Attribute descriptions.** The assistant reads the description of an attribute to understand what a value means. When an attribute has none, it asks the user and saves the user's wording as the attribute's description for the whole studio; it never invents one from the attribute's name, and it replaces an existing description only when the user agrees. Saving descriptions needs admin rights.

## For artists

Artists use the assistant to find their way in the project without leaving the chat or the editor they work in:

- **"What is assigned to me?"** The assistant lists the user's tasks in a project, filtered by status, with their folders and due dates.
- **"Find the latest approved version of sh010 compositing."** The assistant resolves the shot, lists the versions of the product by status, and returns the version with its author, date and files, ready to load with the [Loader](loader.md).
- **"Explain the notes on my task."** The assistant reads the comments of the task's activity feed and summarizes what the supervisor asked for, with the versions the comments refer to.
- **"What changed on my shot since yesterday?"** The assistant reads the events of the project and lists new versions, status changes and comments.

An artist with write access can also ask the assistant to post a comment or set a task status; the assistant asks for confirmation before it does.

## For TDs

TDs use the assistant as a quick interface to the server while they build and maintain the pipeline:

- **Explore the data model.** The assistant reads a project's folder types, task types, statuses, tags and attributes, and the attributes of any entity, and explains how a project is set up or how two projects differ.
- **Check settings and bundles.** The assistant lists installed addons and bundles, compares the addon versions of the production and staging bundles, and reads the resolved settings of an addon at studio or project level. Saving settings is possible too, with confirmation: a save replaces all overrides at that level.
- **Draft scripts and automations.** The assistant looks up the REST operations and the GraphQL schema of the actual server, runs a query to check it returns what is expected, and drafts a script with ayon-python-api, a service or a custom node for the Workflow addon, see [Automations](automations.md).
- **Bulk updates.** The assistant prepares a change on many entities, such as setting the frame range of every shot of a sequence or fixing a misspelled tag, shows what it will change, and runs it after the TD confirms. The changes go through the operations endpoint of the AYON server, so server-side validation applies and the usual events are raised, which other automations can react to.
- **Audit data consistency.** The assistant finds shots without a frame range, tasks without assignees, versions without reviewables, or folders whose status does not match their tasks, and reports them before they break a publish or a delivery.

## Safety

The assistant can only do what its user can do, and changes need a confirmation:

- **The user's own identity.** Each person connects with credentials of their own AYON user, normally a personal API key. The assistant acts as that user, so the AYON [permissions](../ayon/how-ayon-works/permissions.md) of that user decide what it can read and change. A user with read-only access gets an assistant that only reads.
- **Confirmed changes.** In the default discovery mode, a tool that changes data runs only when the assistant marks the call as confirmed, and its instructions tell it to do so only after the user explicitly agreed. The flag is set by the assistant, so it is a safeguard, not an approval enforced by AYON: the user's permissions remain the real limit.
- **Hidden admin operations.** Operations on secrets, API keys, users, access groups, services and the server itself are not offered to the assistant unless the service is configured for them.
- **Server-wide limits.** An administrator can run the service read-only, which removes every tool that changes data, or in a strict mode that also blocks deletions.

Because an assistant can misread a request, the addon page recommends a restricted key or a read-only user, and a non-production server, until the behavior is validated for the studio's work.

:::note In development
Connecting by approving the assistant in AYON through OAuth instead of creating an API key (planned for AYON Studio, with a separate AYON OAuth addon), access policies per user and per tool set in the addon settings, and interactive cards that show project insights or propose a status change for a person to approve are being developed. They are not released yet.
:::

## Related

- [AYON MCP server addon](../addons/production-tracking/mcp/index.md)
- [Report on the production](../production-tracking/reporting.md#ask-an-ai-assistant-connected-to-ayon)
- [Automations](automations.md)
- [Permissions](../ayon/how-ayon-works/permissions.md)
- [GraphQL Explorer](../ayon/web-ui/graphql-explorer.md)
- [REST API](../ayon/web-ui/rest-api.md)
- [Python API](../developer/api/python.md)
