---
title: Versions without a pipeline
description: "Versions can be created in the web app by uploading reviewable files, without pipeline tools or DCC integrations: what an upload creates, where the files are stored, which files work, and how such versions are removed."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/3889290-create-versions-without-a-pipeline
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/VersionUploader/context/version-upload/VersionUploadContext.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/EntityPanelUploader/EntityPanelUploader.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/review/upload.py
---

# Versions without a pipeline

The web app can create versions directly from uploaded media files, so the production tracking features work without the AYON pipeline tools or DCC integrations. A producer or a vendor coordinator can put a delivered movie or a still on a shot or task, review it in the viewer, comment on it and set its status, just like a published version.

This function is limited to reviewables: the files are attached to a new version as [reviewables](reviewables.md) and are played in the viewer. It does not publish work files or representations, and pipeline tools cannot load the files.

## How it works

An upload is started on a folder, task, product or version, from the details panel or from the right-click menus of the project pages. The **Create new version** dialog then asks for the product, the version number and an optional task, and takes the files. Its fields and the places it opens from are described in [Upload version](../ayon/web-ui/dialogs/upload-version.md).

| Started on | What the upload adds |
|---|---|
| A folder | A version of a product of the folder. The product is created when its name matches no product of the folder. |
| A task | The same, with the version linked to the task. |
| A product or version | A new version of that product. |

The version number follows the latest version of the product, so uploads and published versions share one numbering. A version number in the file name, such as `_v003`, is taken over for a new product.

Each uploaded file becomes one reviewable of the version, labelled with its file name. A version can hold several reviewables, for example several angles or a movie and a still. Reviewables with the same label in different versions are matched when versions are compared in the viewer.

## Deleting versions

| Where | Entry | Description |
|---|---|---|
| [Products and versions](../ayon/web-ui/production-tracking/products.md), right-click menu of a version | **Delete version (&lt;name&gt;)**, or **Delete &lt;n&gt; versions** for a selection | Deletes the versions after a confirmation. |
| Products and versions, right-click menu of a product | **Delete product (&lt;name&gt;)**, or **Delete &lt;n&gt; products** | Removes a product, for example one left without versions. |

## Storage and files

| Topic | Behavior |
|---|---|
| Processing | Uploads need no local installation or addon. The files are processed and stored on the AYON server. |
| Storage location | The files are kept in the storage of the AYON server for the project. They are not written to the local or network storage defined in the project anatomy, so pipeline tools in a DCC (Houdini, Maya and others) cannot load them. To keep versions in the pipeline storage, publish with Tray Publisher or Web Publisher. |
| Product types | Any product type can be chosen, for example `render`. The default is `review`; the upload is optimized for visual review. |
| File types | Video or image files. For smooth playback the files must be in a format the browser plays; see [Supported formats](reviewables.md#supported-formats). Files are not converted on upload. |

## Permissions

Creating a version needs the right to create products and versions in the project; adding reviewables needs the **Upload reviewables** activity permission. See [Upload version](../ayon/web-ui/dialogs/upload-version.md#permissions) and [Users](../ayon/web-ui/studio/users.md).

## Related

- [Upload version](../ayon/web-ui/dialogs/upload-version.md)
- [Reviewables](reviewables.md)
- [Web viewer](../ayon/web-ui/web-viewer.md)
- [Products and versions](../ayon/web-ui/production-tracking/products.md)
- [Details panel](../ayon/web-ui/details-panel.md)
