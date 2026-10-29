---
title: Upload version
description: "The Create new version dialog of the AYON web app, which creates a version from uploaded media files: where it opens, the product, version and task fields, reviewable files, what it creates, and the direct upload on pages without the dialog."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/articles/3889290-create-versions-without-a-pipeline
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/VersionUploader/components/UploadVersionDialog.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/VersionUploader/components/UploadVersionForm.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/VersionUploader/context/version-upload/VersionUploadContext.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/EntityPanelUploader/EntityPanelUploader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/EntityPanelUploader/EntityPanelUploaderDialog.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/ReviewablesList/ReviewablesUpload.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/ReviewablesList/useReviewablesUpload.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/util/versionUploadHelpers.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/util/extractVersionFromFilename.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/DetailsPanel/components/DetailsPanelMoreMenu/DetailsPanelMoreMenu.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/context/thumbnail-uploader/ThumbnailUploaderContext.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/containers/Slicer/hooks/useHierarchyContextMenuItems.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectOverviewPage/hooks/useOverviewContextMenu.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/VersionsProductsPage/hooks/useVPContextMenu.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/BrowserPage/BrowserPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/BrowserPage/Products/Products.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/hierarchy.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/taskList.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectPage/ProjectPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/InboxPage/InboxDetailsPanel.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/review/upload.py
---

# Upload version

The **Create new version** dialog creates a version from media files uploaded in the web app, without the pipeline tools. It creates the product when needed, then the version, and uploads the files to the version as [reviewables](../../../production-tracking/reviewables.md). How this fits into production work, and what it does not do, is explained in [Versions without a pipeline](../../../production-tracking/versions-without-a-pipeline.md).

## Where it appears

The dialog is available on the project pages and in the [Inbox](../inbox/index.md).

| Opens from | Control | Shortcut | Who sees it |
|---|---|---|---|
| [Details panel](../details-panel.md), **More actions** | **Upload version**. Shown when one entity other than a representation is shown. | none | Users who can open the project |
| Details panel, dragging files over the panel | Drop zone **Upload version**. The dropped files wait in the dialog. Shown when one entity other than a representation is shown. | none | Users who can open the project |
| Details panel, right-click on the thumbnail | **Upload version**. Opens a file picker; the chosen files wait in the dialog. | none | Users who can open the project |
| [Project overview](../production-tracking/overview.md), right-click menu of a folder or task | **Upload Version** | none | Users who can open the project |
| Slicer, right-click menu of the hierarchy | **Upload version**, for a folder or task | none | Users who can open the project |
| [Products and versions](../production-tracking/products.md), right-click menu in table and grid view | **Upload version**, for one product or version. Disabled with several selected. | none | Users who can open the project |
| [Browser](../production-tracking/browser.md), right-click menu of the folder hierarchy, the task list and the products | **Upload version**, for one selected folder, task or product | none | Users who can open the project |
| [Workfiles](../production-tracking/workfiles.md), right-click menu of the task list | **Upload version**, for one selected task | none | Users who can open the project |

On pages without the dialog, such as [Tasks](../home/tasks.md) on Home and the [web viewer](../web-viewer.md), the drop zone still works but uploads directly; see [Upload without the dialog](#upload-without-the-dialog).

## Layout and controls

The title is **Create new version - Folder**, **Create new version - Task** or **Create new version - Product**, according to what the dialog was opened for. Opened from a version, it works on the version's product.

### Fields

| Field | Description |
|---|---|
| **Product Name** | Name of the product. Typing the name of an existing product of the folder adds the version to that product, and the field shows **Matched existing product (latest: v&lt;nnn&gt;)** or **Matched existing product (no versions)**. Hidden when the dialog is opened for a product or version. |
| Existing products button | Next to the name (tooltip **Browse existing products**). Lists the products of the folder and fills the name. Disabled when the folder has none. |
| Prefix note | **We recommend prefixing with "&lt;product type&gt;".** with an **Apply prefix** link, shown while the name does not start with the product type and matches no product. Changing **Product Type** also changes a name that starts with the previous type. |
| **Product Type** | Product type of a new product, from the product types of the project. Hidden when the dialog is opened for a product or version, and when the name matches an existing product. |
| **Version** | Version number. Cannot be lower than the latest version of the product. |
| **Task** | Optional task the version is linked to, shown as folder path and task name. Clicking it opens a task picker; the close button removes the link. Without a task, the field shows **Link task**. |
| **Reviewable files** | Upload area (**Drop or click to upload**) that takes any number of files. Files added before the version exists are listed as waiting cards, each with a remove button. Dragging files over the area shows **Upload reviewable**. |

### Prefilled values

| Field | Prefilled with |
|---|---|
| **Product Name** | `review`. When the folder has products: the product name last used in this dialog for the same folder, otherwise the last product of the folder. |
| **Product Type** | `review`, or the type of the matched product. |
| **Version** | The latest version of the product plus one, or `1` for a new product. For a new product, a version number in the name of the first added file is used, for example `shot010_comp_v003.mov` gives `3`. |
| **Task** | The task the dialog was opened for. Opened for a product or version, or when the name matches a product, the task of the product's latest version, unless a task was chosen by hand. |

### Buttons

| Control | Description |
|---|---|
| **Cancel** | Closes the dialog. Waiting files are discarded. |
| **Create v&lt;nnn&gt;** | Creates the version, with the number in three digits, for example **Create v004**. `Ctrl+Enter` or `Cmd+Enter` in the dialog does the same. |

Errors are shown at the bottom of the dialog, for example **Name is required**, **Version must be greater than &lt;n&gt;**, or an error from the AYON server.

## What gets created

| Step | Result |
|---|---|
| Product | When the name matches no product of the folder, a new product with the name and **Product Type**. Otherwise the existing product is used. A product name may contain letters, digits, underscores, dots and dashes, and must not start or end with a dot or dash. |
| Version | A new version with the number from **Version**, linked to the **Task** when one is set. A message **Created new version** confirms it. |
| Reviewables | The waiting files are uploaded to the version. Each reviewable gets the file name without its extension as label. |

After the version is created, the fields are locked and the upload area stays active: files added now are uploaded straight to the new version. The dialog closes when all uploads have finished, or right away when no files were added. A failed upload is reported in a message and leaves the dialog open. The version without files can still get reviewables later in the **Files** tab of its details panel.

## Upload without the dialog

On pages without the dialog, dropping files on the **Upload version** drop zone of the details panel uploads them at once:

| Shown entity | Result |
|---|---|
| A version | A new version of the same product, with the next version number and the task of the shown version, gets the files as reviewables. |
| A folder or task | The **Upload Entity** dialog asks for the **Product Name**, prefilled with `review` and the name of the first file, for example `reviewShot010Comp`. **Upload** creates a product of type `review` in the folder and version 1 (linked to the task when a task is shown), and uploads the files. **Cancel** discards them. The name is converted to camel case and characters other than letters, digits, underscores and dashes are removed. |

A progress bar (**Uploading version...**) covers the panel during the upload; its close button hides it.

## Permissions

| Action | Requirement |
|---|---|
| Create the product and the version | The right to create products and versions in the project; access groups can restrict creating entities. |
| Upload the files | The **Upload reviewables** activity permission of the access group, and the right to create on the version. |

See [Users](../studio/users.md) and [Permissions](../studio/permissions.md).

## Related

- [Versions without a pipeline](../../../production-tracking/versions-without-a-pipeline.md)
- [Reviewables](../../../production-tracking/reviewables.md)
- [Details panel](../details-panel.md)
- [Products and versions](../production-tracking/products.md)
- [Web viewer](../web-viewer.md)
