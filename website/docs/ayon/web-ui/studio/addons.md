---
title: Addons
description: "The Addons tab of the AYON Studio Settings: the installed addons, their versions and the bundles that use them, status dots, uninstalling versions, and how a new addon version is installed and put into use."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/4644998-bundles-and-addons
  - https://help.ayon.app/en/help/articles/5135604-how-to-update-an-addon
---

# Addons

An addon is a package of code and settings that extends the AYON server and the pipeline. The **Addons** tab of the Studio Settings shows which addon versions are installed on the server and which bundles use them. Installing an addon only places it on the server: an addon version is used once it is part of a bundle that has a state, which is set on the [Bundles](bundles.md) tab.

| Term | Meaning |
|---|---|
| Addon | A package with a server part, a client (pipeline) part, or both, plus settings. Installed on the server as a `.zip` package, one folder per addon version. |
| Server addon | An addon of type `server`. Runs on the server only and does not change what the launcher runs. |
| Pipeline addon | An addon of type `pipeline`. Ships client code that the launcher loads. |

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Addons | Studio Settings, **Addons** | none | `/settings/addons` | Admins |

Managers and users are redirected to the start page when they open the path.

## Layout

The tab has three linked tables, from left to right. Selecting rows in one table filters the next.

| Table | Rows | Selection effect |
|---|---|---|
| **Addons** | Every installed addon. | Lists the versions of the selected addons. |
| **Versions** | `<addon> <version>` of the selected addons. | Lists the bundles that contain the selected versions. |
| **Bundles** | Bundles that contain the selected versions (archived bundles excluded). | None. |

Each table has a **Status** column with colored dots:

| Dot | Meaning |
|---|---|
| Production, Staging, Dev | The row is part of a bundle with that state. |
| Active | The row is part of a bundle without a state. |
| Error | A version is broken (`(broken)` suffix: the addon failed to load; details are in the server log), or was removed and waits for a restart (`(deleted)` suffix). |

### Controls

| Control | Where | What it does |
|---|---|---|
| **Upload Addons** (`a`) | Above the Addons table | Opens the addon upload dialog, described on the [Bundles](bundles.md#launchers-and-dependency-package-uploads) tab. |
| **Addon Market** | Above the Addons table | Opens the [Market](../market.md). |
| **Uninstall Versions** | Above the Versions table, context menu **Uninstall** | Removes the selected addon versions from the server after confirmation, then offers a server restart. Disabled when a selected version is used by any bundle. |
| **Archive Bundles** | Above the Bundles table, context menu **Archive** | Archives the selected bundles. Skips bundles with a Production, Staging or Dev state. Disabled for those rows. |
| **View in Market** | Context menu of addons and versions | Opens the Market on the addon. |
| **API Docs** | Context menu of versions | Shows the addon version's REST API documentation in a dialog with **Open in new tab**. Reports an error when the version has no API documentation. |
| **View bundle** | Context menu of bundles | Opens the Bundles page with that bundle selected. |

## Updating an addon

Updating is separated into installing a new version and putting it into use.

| Capability | Description |
|---|---|
| Install from the Market | Official addon releases are downloaded from the [Market](../market.md) by an admin on a server connected to Ynput Cloud. The server restarts to load the new version. |
| Install from a package | The upload dialog installs an addon from a `.zip` file. |
| Use in a server addon | A new version of a server addon can be selected directly in the Production bundle. |
| Use in a pipeline addon | A new version of a pipeline addon requires a new bundle, created with **Duplicate and edit** or from a pipeline release. |
| Roll out | Setting the new bundle to Staging and then Production switches the studio over. Settings can be copied at that moment. |


Pipeline releases, which install a tested set of addons at once, and copying settings between bundles are described on the [Bundles](bundles.md#pipeline-releases) tab.

## Permissions

| Action | Required role |
|---|---|
| View the Addons tab, install, upload and uninstall addons | Admin |
| Read the addon list through the API | Any signed-in user |

## Related

- [Bundles](bundles.md)
- [Market](../market.md)
- [Services](../services.md)
- [Addons catalogue](../../../addons/index.md)
