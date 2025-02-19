---
id: addon_nuke_admin_tutorials
title: Workflow Tutorials
sidebar_label: Tutorials
description: Nuke Addon's Workflow Tutorials - Admins documentation.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Nuke_Badge}
</ReactMarkdown>

## Table of contents

- [How to Use Templated Workfile Builder](#how-to-use-templated-workfile-builder)


## How to Use Templated Workfile Builder

The `Templated Workfile Builder` initializes Nuke with a Node Graph from a pre-made workfile template. This tool is useful if you want your artists to start working on a task using a template.

To make this work:

1. [Create a workfile template](#create-workfile-template).
2. [Add that template to your Nuke settings](#add-a-template-to-settings).

### Create Workfile Template

When building a workfile, you'll usually start from an empty scene. You can do this by launching Nuke with the `skip opening last file` option enabled in the launcher.

#### What is a Placeholder

A placeholder is a key component in workfile templates, used to define products to publish or to load published products. A placeholder node is replaced when the `Templated Workfile Builder` tool builds a workfile.

There are two main types of placeholders:
- **Create**: This is replaced by a publish instance. It works the same way as if a user opened the publisher tool and created a product.
- **Load**: This is used for loading products.

| Create | Load |
|--|--|
| ![Create Place Holder](assets/nuke/admin_tutorials/placeholder_create.png) | ![Load Place Holder](assets/nuke/admin_tutorials/placeholder_load.png) |

#### Create a Place Holder

Here's a step by step guide to create place Holders.

<div class="row">
<div class="col">

From AYON menu, select `Template Builder > Create Place Holder`.
</div>

<div class="col">

![Create Place Holder](assets/nuke/admin_tutorials/create_workfile_placeholder.png)
</div>
</div>

<div class="row">
<div class="col">

The `Placeholder Manager` window will appear to configure the placeholder.

</div>

<div class="col">

![Create Place Holder](assets/nuke/admin_tutorials/placeholder_create.png)
</div>
</div>


<div class="row">
<div class="col">

A red node called `PLACEHOLDER` will be created. It will be replaced when building the workfile template.

</div>
<div class="col">

![Create menu](assets/nuke_placeHolderNode.png)

</div>
</div>

<div class="row">
<div class="col">

You can connect the placeholder node in a node graph, and the replacement will be done in place.

</div>
<div class="col">

![Create menu](assets/nuke_placeholder.png)

</div>
</div>

<div class="row">
<div class="col">

:::note
Any published instance that replaces the placeholder must have unique input and output nodes, unless it's imported as a single node.
:::

</div>
<div class="col">

![Create menu](assets/nuke_publishedinstance.png)
</div>
</div>


#### Update Place Holder

<div class="row">
<div class="col">

From the AYON menu, select `Template Builder > Update Place Holder`.

This opens the Placeholder Manager window, allowing you to modify the information in the extra attributes of the selected placeholder.

</div>

<div class="col">

![Update Place Holder](assets/nuke/admin_tutorials/update_placeholder.png)
</div>
</div>

#### Build Current Workfile

<div class="row">
<div class="col">

From the AYON menu, select `Build Workfile`.

This action builds the current workfile, replacing all placeholders with the corresponding Nuke nodes.

</div>

<div class="col">

![Update Place Holder](assets/nuke/admin_tutorials/build_workfile.png)
</div>
</div>


#### Build Workfile from template

<div class="row">
<div class="col">

From the AYON menu, select `Template Builder > Build Workfile from Template`.

This tool imports the template and replaces existing placeholders with the corresponding published objects, which may also contain placeholders. If no published items match the given description, the placeholder will remain in the node graph.
</div>

<div class="col">

![Build Workfile from template](assets/nuke/admin_tutorials/build_workfile_from_template.png)
</div>
</div>

<div class="row">
<div class="col">

:::tip Example Output

- Replace the `PLACEHOLDER` node in the template with the published instance that matches the information provided in the extra attributes of the placeholder.
:::

:::info

If the instance replacing Placeholder **A** contains another placeholder **B** that points to multiple published elements, all nodes imported with **A**, except **B**, will be duplicated for each element replacing **B**.
:::

</div>

<div class="col">

![Create menu](assets/nuke_buildworkfile.png)
</div>
</div>

#### Open Template

<div class="row">
<div class="col">

From the AYON menu, select `Template Builder > Open Template`.

Use this to open the workfile template that matches the current AYON context.
</div>

<div class="col">

![Build Workfile from template](assets/nuke/admin_tutorials/open_a_template.png)
</div>
</div>

### Add a Template to Settings

Once you have a template workfile, you can add it to your settings.
This is typically done by adding a profile in the [Templated Workfile Builder](addon_nuke_admin_settings.md#templated-workfile-builder) setting.

![](assets/nuke/settings/workfile_builder_new.png)


