---
id: addon_zbrush_admin
title: Zbrush Admin Docs
sidebar_label: Zbrush
---
import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Zbrush_Badge}
</ReactMarkdown>

:::note Work in progress
This part of documentation is still work in progress.
Explain briefly about the pipeline of the zbrush (i.e. zbrushmetadata)
:::

### Intro to Zbrush Workflow with AYON
After launching Zbrush with AYON for the first time, it creates the ``.zrbushmetadata`` folder to store any AYON-relevant data. There are several folders found inside the metadata folder: ``containers``, ``create-context``, ``instances``, and ``context``. **Please do not remove the** ``.zbrushmetadata`` **folder if you are working on the project. If it is removed, all the AYON data would be lost.**

:::note
Before users saving the workfile, ``containers``, ``create_context`` and ``instances`` are always stored as temporary data in the metadata folder. All these data are moved from ``.zbrushmetadata`` to ``.zbrushmetadata/{YOUR_WORKFILE_NAME}`` once users save the workfile with versions.

If you already save the workfile, ``containers``, ``create_context`` and ``instances`` are located in the ``.zbrushmetadata/{YOUR_WORKFILE_NAME}`` folder.

If you publish with workfile instance being enabled or save new version of the workfile, ``containers``, ``create_context`` and ``instances`` are
copied from ``.zbrushmetadata/{YOUR_PREVIOUS_WORKFILE_NAME}`` to
``.zbrushmetadata/{YOUR_CURRENT_WORKFILE_NAME}``

:::

``containers``: A folder persists the container data where users loaded the meshes in Zbrush

``create-context``: A folder keeps the setting data where users preset when creating instances in Zbrush

``instances``: A folder stores the instance data which users create instances for publishing in Zbrush.

``context``: A folder includes the context data which includes the important information of the project(e.g. project name, folder path, task name)

There is a file named ``current_file.txt`` to merely stores the current filepath so that the Zbrush can recognize what the current file is.

:::note Limitation for metadata
All the AYON-related data is only relevant when users use the workfile tool to open and save as the ``.zpr`` file in Zbrush.
If users manually use `Save As` and `Open` from the `File` tool in Zbrush,
the AYON data would not be saved and kept correctly into ``.zbrushmetadata`` folder.
:::
