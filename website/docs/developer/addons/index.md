---
title: Addons
sidebar_label: Overview
description: "Developer guides for specific AYON addons: how to work with them in code and extend them, with examples such as scripting workflows, writing custom nodes and event-triggered workflows for the Workflow addon."
---

# Addons

This group has developer guides for specific addons. They explain how to work with an addon in code and what developers can do with it, with examples, such as writing custom nodes for the Workflow addon.

- **The generated reference** of an addon's Python code is linked from the [addons table](../index.md#addons) on the Developer page.
- **What an addon does** and how to set it up is on its page in the [addons catalogue](../../addons/index.md).
- **Building an addon** of one's own is described in [Addon development](../addon-development/overview.md).

## Workflow

The [Workflow addon](../../addons/automation/workflow/index.md) runs node-based workflows, in an application, in the launcher or on a render farm.

- [Scripting and custom nodes](workflow-scripting.md): writing and running workflows in Python, sending them to a render farm, and writing custom nodes.
- [Event-triggered workflows](workflow-events.md): starting workflows from server events and on a schedule, with the workflow event processor.
