---
title: Migrating OpenPype projects
sidebar_label: Migrating OpenPype projects (legacy)
sidebar_class_name: addon-archived
description: "The OpenPype project import of the AYON server: what the ayon-openpype-import addon brings from an OpenPype project into AYON, what it does not, and what it needs."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/6657894-migrate-openpype-projects-to-ayon
---

# Migrating OpenPype projects

:::note Legacy
The import addon works only with AYON server 1.0.2 and older. This page is kept for reference.
:::

The `ayon-openpype-import` addon imports an OpenPype project into an AYON server. The import is meant for evaluation and transition work. It is not recommended for production use, and the imported project does not match the original exactly.

## Components

| Component | Role |
|---|---|
| `pack-project` command (OpenPype) | Exports an OpenPype project into a ZIP package. |
| `ayon-openpype-import` server addon | Adds an import page to the AYON web app, from which packed projects are imported. Published from the `ynput/ayon-openpype-import` repository; the addon package is built from the source with its `create_package.py` script. |
| OpenPype import service | A service of the addon that runs the import. It is created and run on the [Services](web-ui/services.md) page. |

## The export package

`pack-project` is available from the OpenPype executable, from an OpenPype source checkout, and as a Python function in OpenPype's console (`openpype.lib.project_backpack.pack_project`).

| Argument | Meaning |
|---|---|
| `--project` | Name of the project to pack. |
| `--dirpath` | Destination directory of the package. Required with `--dbonly`. |
| `--dbonly` | Dumps only the MongoDB documents, not the project's files. |

The package is a ZIP file containing:

| File | Content |
|---|---|
| Project files | Files of the project root. Not included with `--dbonly`. |
| `database.json` | The MongoDB dump of the project. |
| `metadata.json` | The project root definitions. |

Thumbnails are imported when the folder in which OpenPype stores the project's thumbnails is added to the ZIP file as a `thumbnails` folder.

## What the import needs

| Requirement | Detail |
|---|---|
| A single project root | Projects with several roots cannot be packed. |
| The addon on the server | The addon package is uploaded on the [Bundles page](web-ui/bundles-and-addons.md), the server is restarted, and the addon version is added to a bundle (the Production bundle for normal use). |
| The import service | A running OpenPype import service, created on the Services page. |
| An AYON server version supported by the addon | AYON server 1.0.2 or older. |
| A packed project | The ZIP file from `pack-project`. |

## What is imported and what is not

An OpenPype project consists of files on disk (the `work` and `publish` areas) and metadata records in MongoDB. AYON keeps the same files and stores the metadata in PostgreSQL.

| Item | Result |
|---|---|
| Files on disk | Untouched. File relationships stay the same. |
| Project structure, folders, products, versions and representations | Recreated in AYON from the metadata. |
| Thumbnails | Imported when supplied in a `thumbnails` folder of the package. |
| Studio and project settings | Not transferred. |
| Identifiers | Not preserved. MongoDB IDs are 24-character hexadecimal strings; AYON uses UUIDs of 32 hexadecimal characters without hyphens. |
| References to loaded versions inside scene files | Not matched to the new identifiers. Workfiles open as before, but the version of a loaded product cannot be changed with the version manager; the product must be loaded again. |

The IDs of the converted entities come from a deterministic, name-based mapping rather than random UUIDs, so the mapping is stable.

## Related

- [Bundles and addons](web-ui/bundles-and-addons.md)
- [Services](web-ui/services.md)
- [AYON setups](setups.md)
