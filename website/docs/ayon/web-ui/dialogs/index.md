---
title: Dialogs
sidebar_label: Dialogs
description: "The larger dialogs of the AYON web app that open from several places: the first-run setup of a new server, Install pipeline release, Copy settings, Upload version and Import CSV."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/tree/develop/src/containers
  - https://github.com/ynput/ayon-frontend/tree/develop/shared/src/components
---

# Dialogs

Most popups in the web app belong to one button, such as renaming a user or creating a list, and are described on the page of that button. The dialogs in this group are larger: they have several steps or panes, or open from several pages, so each has a page of its own.

| Dialog | Opens from | Page |
|---|---|---|
| First-run setup | A server without an admin account, or an admin until the setup is finished or skipped; App menu **Launch Bootstrap Setup** | [First-run setup](first-run-setup.md) |
| **Install pipeline release** | App menu **Update Pipeline**, **Setup pipeline**, **Install release bundle** in the Market | [Install pipeline release](install-pipeline-release.md) |
| Copy settings | **Studio settings**, **Project settings**, setting a bundle state on **Bundles** | [Copy settings](copy-settings.md) |
| Upload version | Details panel **More actions**, **Products**, **Overview** | [Upload version](upload-version.md) |
| **Import CSV** | **Import / Export** on the project **Overview** and **Lists**, **Users** tab | [Import CSV](import-csv.md) |

## Related

- [Web UI](../index.md)
- [Details panel](../details-panel.md)
- [Web viewer](../web-viewer.md)
- [Views](../views.md)
