---
title: Dialogs
sidebar_label: Dialogs
description: "The larger dialogs of the AYON web app that have several steps or open from several pages: the first-run setup of a new server, Install pipeline release, Copy settings, Upload version and Import CSV, with where each one opens."
verified: 2026-11-15
ui_purpose: "The larger dialogs of the web app: those with several steps or panes, or that open from several pages."
sources:
  - https://github.com/ynput/ayon-frontend/tree/develop/src/containers
  - https://github.com/ynput/ayon-frontend/tree/develop/shared/src/components
---

# Dialogs

<PageInfo />

Most popups in the web app belong to one button, such as renaming a user or creating a list, and are described on the page of that button. The dialogs in this group are larger: they have several steps or panes, or open from several pages, so each has a page of its own.

| Dialog | What it does | Opens from |
|---|---|---|
| [First-run setup](first-run-setup.md) | Creates the first admin of a new server and can install a pipeline release. | A server without an admin account, or an admin until the setup is finished or skipped; App menu **Launch Bootstrap Setup** |
| [Install pipeline release](install-pipeline-release.md) | Downloads a release from Ynput Cloud and creates a bundle from it. | App menu **Update Pipeline**, **Setup pipeline** in the App header, **Install release bundle** in the Market |
| [Copy settings](copy-settings.md) | Copies addon settings between addon versions, variants, bundles and projects. | **Studio settings**, **Project settings**, setting a bundle state or **Copy settings from...** on **Bundles** |
| [Upload version](upload-version.md) | Creates a version from media files uploaded in the browser. | Details panel **More actions**, right-click menus of the project pages |
| [Import CSV](import-csv.md) | Creates or updates folders and tasks, list items or users from a CSV or Excel file. | **Import / Export** on the project **Overview**, **Lists** and the **Users** tab; **Create list from CSV** in **Lists** |

## Related

- [Web UI](../index.md)
- [Details panel](../details-panel.md)
- [Web viewer](../web-viewer.md)
- [Views](../views.md)
