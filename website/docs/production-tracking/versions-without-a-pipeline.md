---
title: Versions without a pipeline
description: "Versions can be created in the web app by uploading reviewable files, without pipeline tools or DCC integrations: the entry points, the Create new version dialog, storage and file considerations."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/3889290-create-versions-without-a-pipeline
---

# Versions without a pipeline

The web app can create versions directly from uploaded media files, so the production tracking features work without the AYON pipeline tools or DCC integrations. This function is limited to uploading reviewables: the files are attached to a new version as [reviewables](reviewables.md) and are played in the viewer. It does not publish work files or representations.

## Where it appears

| Entry point | Entities | Description |
|---|---|---|
| Drop files on the [details panel](details-panel.md) | Folder, task, product, version | Dropping files shows two drop zones, **Upload thumbnail** and **Upload version**. Dropping on **Upload version** creates a version from the files. When the entity is a folder or a task, the dialog **Upload Entity** asks for the **Product Name** first. |
| **Upload Version** in the context menu of the [project overview](project-overview.md) | Folder, task | Creates the product when it does not exist yet and adds the new version below it. |
| **Upload version** in the context menu of [products and versions](products-and-versions.md) | Product, version | Adds a version to an existing product. One entity must be selected. |
| **Upload version** in the hierarchy context menu of the slicer | Folder, task | Same as on the overview. |
| **Upload version** in the more menu of the details panel | Single entity, except representations | Opens the dialog for the entity shown in the panel. |

The same drop zones upload and replace thumbnails of folders, tasks, products and versions. Thumbnails can also be uploaded from the thumbnail of the panel.

## Create new version dialog

The dialog is titled **Create new version - Folder**, **- Task** or **- Product**, according to where it was opened. Its button reads **Create v&lt;number&gt;** with the version number in the form `v001`.

| Field | Description |
|---|---|
| **Product Name** | Name of the product. Typing a name of an existing product of the folder adds the version to that product; the dialog then shows the latest version of the matched product. A list picks an existing product of the folder. Hidden when the dialog is opened from a product. |
| **Product Type** | Product type of a new product, from the product types of the project. Hidden when the dialog is opened from a product or when the name matches an existing product. A note recommends starting the product name with the product type, with a button to apply the prefix. |
| **Version** | Version number of the new version. |
| **Task** | Optional link to a task. The task is chosen in a picker and can be cleared. Preset when the dialog is opened from a task. |
| **Reviewable files** | The media files of the version, uploaded as reviewables. Files dropped on the dialog are listed and uploaded after the version is created. |

`Ctrl+Enter` or `Cmd+Enter` in the dialog creates the version. Errors from the AYON server are shown at the bottom of the dialog.

When the dialog is opened from a product, the product type and name come from the selected product.

## Deleting versions

| Where | Entry | Description |
|---|---|---|
| [Products and versions](products-and-versions.md), context menu of a version | **Delete version (&lt;name&gt;)**, or **Delete &lt;n&gt; versions** for a selection | Deletes the versions after a confirmation. |
| Products and versions, context menu of a product | Delete product | Removes a product, for example one left without versions. |

## Storage and files

| Topic | Behavior |
|---|---|
| Processing | Uploads need no local installation or addon. The files are processed and stored on the AYON server. |
| Storage location | The files are kept in the storage of the AYON server for the project. They are not written to the local or network storage defined in the project anatomy, so pipeline tools in a DCC (Houdini, Maya and others) cannot load them. To keep versions in the pipeline storage, publish with Tray Publisher or Web Publisher. |
| Product types | Any product type can be chosen, for example `render`. The upload is optimized for visual review. |
| File types | Video or image files. For smooth playback the files must be in a format the browser plays; see [Supported formats](reviewables.md#supported-formats). Files are not converted on upload. |

## Permissions

Creating a version needs the right to create versions in the project; adding reviewables needs the **Upload reviewables** activity permission. See [Users and permissions](../ayon/web-ui/users-and-permissions.md).

## Related

- [Reviewables](reviewables.md)
- [Products and versions](products-and-versions.md)
- [Project overview](project-overview.md)
- [Details panel](details-panel.md)
