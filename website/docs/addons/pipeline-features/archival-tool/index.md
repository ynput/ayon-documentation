---
title: ArchivalTool addon
sidebar_label: Overview
description: "The AYON ArchivalTool addon: analysing folders of a project, reporting which published versions and work files can be removed, and deleting or archiving them."
addon: archival_tool
addon_repo: ayon-archival-tool
addon_version: 0.1.2
addon_scope: pipeline-server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7924402-project-archival-tool
---

# ArchivalTool addon

<AddonInfo />

The ArchivalTool addon frees storage by removing old published versions and work files of a project. It works in two steps: an analysis of selected folders that produces a report of what would be deleted and what would be kept, and a delete run that applies a report. The rules come from the addon settings and are stored in each report, where an administrator can change them before the run. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.6.0 or newer |
| AYON core addon | Newer than 0.3.2 |
| AYON launcher | Runs the analysis and delete commands on a machine that can reach the project storage |
| ftrack addon | Only for the setting **Archive in ftrack** |
| License | ArchivalTool is a licensed addon (flags: `licensed`, `power-feature`) |

The addon has no service. The launcher commands are started from the AYON server through an action, or by hand.

## Where it appears in AYON

| Place | What it is |
|---|---|
| **Analyse in Archival Tool** action | A server action in the category `server`, offered for one folder and visible to administrators only. It starts the launcher with `addon archival_tool analyse` for the selected folder. |
| **Archival Tool** project page | A page in the project view, restricted to administrators. It lists the reports with their status and opens a detail page per report. |
| Launcher commands | `addon archival_tool analyse --project <name> --input <folder ids>` and `addon archival_tool delete --project <name> --report_id <id>`. |
| Reports | Stored per project in the table `archival_tool_reports`, which the server addon creates when needed. |

The tool is run on demand. It has no scheduler.

## Analysis

The analysis starts from one or more folders and covers them and their descendants. The result is stored as a report with an ID, the user, the analysed paths and a status.

| Area | What is evaluated | Configured by |
|---|---|---|
| Published | Versions of products in the selected folders. A product is considered when its product type and its name each match one of the profile's patterns (an empty list matches all). The newest **Keep versions** versions are kept, older ones are marked for deletion with their files. | **Publish area configs** |
| Work | Work directories of the tasks of the selected folders. Tasks whose name matches the **Directory regex** are considered. Known files (AYON naming), unknown files and folders are marked according to the profile. | **Work area configs** |

Each profile produces its own section in the report, with the paths to delete and keep and counts and sizes.

| Report status | Meaning |
|---|---|
| `analyse_started` | The report was created and the analysis is running. |
| `analyse_finished` | The analysis is complete. Only reports in this state can be deleted. |
| `starting_delete` | A delete run is in progress. |
| `delete_finished` | The delete run is complete. |

## Report page

| Control | What it does |
|---|---|
| **Details** | Opens the page of a report: configuration, collected items and results. |
| **Update config** | Saves the configuration changes of the report. |
| **Run** | Applies the report (the `delete` command). |
| **Download report** | Downloads the report. |
| **Delete in DB**, **Delete reviewables**, **Delete files on disk** | Switches per profile. The first two exist for the published area only. |
| **Back** | Returns to the report list. |

## Delete run

For each profile of the report, in this order:

| Step | Applies to | Condition |
|---|---|---|
| Delete the collected files | Published and work | **Delete files** is on |
| Delete the reviewable files of the versions | Published | **Delete reviewables** is on |
| Delete representations and versions from the database | Published | **Delete in DB** is on |
| Archive the versions in ftrack | Published | **Archive in ftrack** is on and the ftrack addon is enabled; otherwise the versions are reported as failed |
| Copy the kept files to a directory, keeping the path under the project root | Published | **Copy kept files** is on and a directory is set |

The delete run also records its result in the report.

## Related

- [ArchivalTool addon settings](settings.md)
