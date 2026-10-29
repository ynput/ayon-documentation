---
title: Bundles
description: "The Bundles tab of the AYON Studio Settings: bundle states and settings variants, the bundle list and form, the compatibility check, dependency packages, uploading addons, launchers and dependency packages, pipeline releases and copying settings."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/4644998-bundles-and-addons
  - https://help.ayon.app/en/help/articles/5135604-how-to-update-an-addon
  - https://help.ayon.app/en/help/articles/7772807-updating-pipeline-to-latest-release
---

# Bundles

An addon is a package of code and settings that extends the AYON server and the pipeline. A bundle is a named, versioned set of addons together with an AYON launcher version and dependency packages. Bundles decide which addon versions the server and the launcher run. The **Bundles** tab of the Studio Settings manages bundles, launcher installers and dependency packages. Which addon versions are installed and where they are used is shown on the [Addons](addons.md) tab.

## Concepts

| Term | Meaning |
|---|---|
| Addon | A package with a server part, a client (pipeline) part, or both, plus settings. Installed on the server as a `.zip` package, one folder per addon version. |
| Server addon | An addon of type `server`. Runs on the server only and does not change what the launcher runs. |
| Pipeline addon | An addon of type `pipeline`. Ships client code that the launcher loads. |
| Bundle | A named set of addon versions, one launcher version and up to three dependency packages (one per platform). |
| Bundle state | A label on a bundle that makes it active: Production, Staging or Dev. A bundle without a state is stored but not used. |
| Launcher (installer) | An AYON launcher build for one platform, uploaded to the server so users can download it and bundles can reference it. |
| Dependency package | An archive of the Python modules that the client code of a bundle's addons needs, built for one platform. |

Installing an addon only places it on the server. An addon version is used once it is part of a bundle that has a state.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Bundles | Studio Settings, **Bundles** | `b+b` | `/settings/bundles` | Admins |

Managers and users are redirected to the start page when they open the path.

The **Update Pipeline** entry of the app menu (admins only) opens the release installer. A **Setup pipeline** button appears for admins on a server that has no launcher installers or no dependency packages yet; it opens the Bundles page and the release installer.

## Bundle states

| State | Purpose | Number of bundles |
|---|---|---|
| Production | The stable bundle for daily work. The launcher's default mode. | One |
| Staging | A bundle for testing new addon versions or settings before they reach production. | One |
| Dev | A bundle for a developer who runs addons from source. Available when the user's **Developer mode** attribute is on. | One per developer |

Rules between states:

- Setting Production or Staging on a bundle removes that state from the bundle that had it. One bundle can hold both Production and Staging.
- A Dev bundle cannot be set to Production or Staging, and a Production or Staging bundle cannot be set to Dev. Unset one state before setting the other.
- A bundle that holds Production or Staging cannot be archived.
- Project bundles (see [project bundles](../project/project-settings.md#project-bundles)) cannot hold any of the three states.
- The launcher selects a bundle by mode: production, staging or dev. It can also be pointed at a specific bundle.

### Settings variants

Addon settings are stored per addon version and per variant. The variants are the factory defaults (built into the addon version), `production`, `staging`, and one development variant per Dev bundle, named after the bundle. A bundle reads the variant that matches its state, so an addon version keeps its production and staging values when it is used by other bundles with the same state. Setting a state on a bundle opens a dialog that offers to copy the settings of another bundle (see [Copying settings](#copying-settings)).

## Layout and controls

### Layout

| Region | Content |
|---|---|
| Toolbar | Buttons to add a bundle and to upload addons, launchers and dependency packages; switches **Archived** and **Project**. |
| Bundle list (left) | One row per bundle with **Name** and **Status**. The status column shows badges: Production, Staging, Dev (with the assigned developer's name) and Project. Archived bundles are listed after the others and marked `(archived)`. |
| Detail panel (right) | The selected bundle: toolbar with the state buttons, name, launcher version, addon list, dependency packages. With two to four bundles selected, a comparison of their addon versions replaces the detail. |

The splitter position and the **Archived** and **Project** switches are remembered in the browser. **Archived** is on by default; **Project** is off by default. Dev bundles are listed only when the user has **Developer mode** enabled.

### Controls

| Control | Where | What it does |
|---|---|---|
| **Add Bundle** (`n`) | Toolbar | Opens the form for a new bundle, prefilled with the latest installed version of every addon. |
| **Upload Addons** (`a`) | Toolbar | Opens the upload dialog for addon `.zip` packages. |
| **Upload Launcher** (`l`) | Toolbar | Opens the upload dialog for launcher installers. |
| **Upload Dependency Package** (`p`) | Toolbar | Opens the upload dialog for dependency packages. |
| **Archived** | Toolbar | Shows or hides archived bundles. |
| **Project** | Toolbar | Shows or hides per-project bundles. |
| **Set Production** / **Set Staging** | Detail toolbar | Sets or unsets the state. Shows a check mark when the state is set. Disabled when several bundles are selected. |
| **Duplicate and edit** (`Shift+D`) | Detail toolbar, context menu | Opens the new-bundle form filled with the selected bundle's launcher version, dependency packages and addons. Addons that are no longer installed are dropped. The name gets the next number suffix (`-01`, `-02`, ...). |
| **Set production** / **Set staging** / **Set dev** | Context menu | Same as the state buttons. Unset variants read **Unset ...**. **Set dev** appears only in developer mode. |
| **Copy settings from...** | Context menu | Copies addon settings from another bundle's variant into the selected bundle. Disabled for bundles without a state and when no source exists. |
| **Archive** / **Unarchive** | Context menu | Moves a bundle out of or back into the active list. Disabled for Production and Staging bundles. |
| **Delete** | Context menu | Permanently removes a bundle. Offered for archived bundles, and for any bundle when Ctrl or Cmd is held while opening the menu. Disabled for Production and Staging bundles. |

The query parameters `?bundle=<name>` (also `latest` and `prod`) and `?duplicate=<name>` select or duplicate a bundle on load.

## Bundle form

| Field | New bundle | Existing bundle |
|---|---|---|
| Bundle name | Required, no spaces. | Read-only. |
| Launcher version | Dropdown of uploaded launcher versions, each with platform tags (Windows, Linux, macOS). | Read-only, with platform tags. |
| Dev bundle | Switch, shown in developer mode. Makes the bundle a Dev bundle. | Not shown for non-dev bundles. |
| Assigned dev | Developer who owns the Dev bundle. **Assign to me** assigns the current user. A developer can be assigned to one Dev bundle. | Editable for Dev bundles. |
| Addons | Table of every installed addon with a version dropdown; `NONE` leaves the addon out. | Read-only for pipeline addons. The version of a server addon can be changed in place and is saved at once. |
| Dependency packages | Set for Dev bundles at creation. | One entry per platform (Windows, Linux, MacOS) with an add or edit button that opens **Update Dependency Package**. |
| Addon directory | Dev bundles only: per addon, a switch and a path to the addon's client folder, so client code runs from source. | Editable for Dev bundles. |

The **Addons** table has the columns **Title** and **Version**, is sortable, and supports multi-selection: a version chosen for one selected row applies to all selected rows. A hint icon next to a version shows the latest installed version when it differs. The context menu entry **View in Market** opens the [Market](../market.md) on that addon. A search field filters addons by name; a hint under the table counts the addons the filter hides.

The addon tools of the new-bundle form: **Select all addons**, **Deselect all addons**, **Select activated** (addons with a version), **Select deactivated** (addons set to `NONE`), **Version latest** and **Version NONE** (apply to the selected rows). For Dev bundles, **Enable development** and **Disable development** switch the addon directory for the selected rows.

Buttons at the top of the form: **Create new bundle** for a new bundle; **Save dev bundle** and **Cancel** when editing a Dev bundle.

### Compatibility check

A panel under the form checks the chosen addon versions against each other and reports one of: checking in progress, compatible, warnings, errors, or a failed check. Each warning or error names the addon and the message; selecting an entry selects the addon it refers to. **Create new bundle** is disabled while errors exist, except for Dev bundles. The server repeats the check when a bundle is created or when its addons change or it becomes Production or Staging.

### What stays editable after creation

| Property | Editable |
|---|---|
| Name, launcher version, pipeline addon versions | No. Duplicate the bundle instead. |
| Server addon versions | Yes. Changing the version of a server addon in the Production bundle migrates that addon's settings to the new version. |
| Dependency packages | Yes. |
| State and archive status | Yes. |
| Dev bundle: addons, launcher version, addon directories, assigned developer | Yes. |

## Dependency packages

A dependency package contains the Python modules the client code of a bundle's addons needs. Packages are platform-specific (Windows, Linux, macOS), and each has a launcher version and the addon versions it was built from. A bundle holds at most one package per platform.

Sources of dependency packages:

| Source | Description |
|---|---|
| Pipeline release | A release includes generic packages. They are downloaded together with the release (see [Pipeline releases](#pipeline-releases)). |
| Custom build | A package built for a specific bundle with the AYON dependencies tool, then uploaded with **Upload Dependency Package**. A custom package fits only the bundle it was built for. |

## Launchers and dependency package uploads

The upload dialog is shared by addons, launchers and dependency packages.

| Type | Accepted files |
|---|---|
| Addons (**Upload addon**) | One or more `.zip` addon packages. Requires an admin. The server can refuse custom addon uploads through the `allowCustomAddons` constraint of the subscription; addons installed from the Market are not affected. |
| Launcher (**Upload Launcher**) | A `.json` manifest and the installer file, or either alone. |
| Dependency package (**Upload Dependency Package**) | A `.json` manifest and the package file, or either alone. |

Footer buttons are **Upload** and **Cancel** (**Close** after completion); a progress bar shows the upload. Closing during an upload asks for confirmation and aborts the upload. After an addon upload the server needs a restart; the app menu then shows **Restart Required**.

For launchers and dependency packages the dialog has a **Manage uploads** button that opens a table with **File name**, **Installer version**, **Platform**, **Size** and **Status**, plus **Delete selected** (with confirmation) and **Upload files** to return.

## Updating the pipeline

A new version of a pipeline addon reaches the studio through a new bundle, created with **Duplicate and edit** or from a pipeline release, and set to Staging and then Production. How addon versions are installed is described on the [Addons](addons.md#updating-an-addon) tab.

### Pipeline releases

A release is an official set of tested addons, launchers and dependency packages published by Ynput. The **Install pipeline release** dialog, opened from **Update Pipeline** in the App menu, **Setup pipeline** or the [Market](../market.md), downloads a release and creates a new bundle from it without changing the current Production or Staging bundle. The dialog, its choices and the bundle it creates are described in [Install pipeline release](../dialogs/install-pipeline-release.md).

### Copying settings

Addon settings do not carry over between addon versions. Setting a state on a bundle, or **Copy settings from...** in the bundle context menu, opens a dialog that copies all studio, project and project site settings from another bundle and variant into the bundle, or sets the state without copying. The dialog and what it copies are described in [Copy settings](../dialogs/copy-settings.md#bundle-state-dialog); the per-value copy of the studio and project settings pages is described on the same page.

## Permissions

| Action | Required role |
|---|---|
| View the Bundles tab, create, change, archive and delete bundles, set states | Admin |
| Upload addons, launchers and dependency packages; install pipeline releases | Admin |
| Read the bundle list through the API | Any signed-in user |
| Freeze a bundle for a project | Manager or admin |

## Related

- [Addons](addons.md)
- [Project bundles](../project/project-settings.md#project-bundles)
- [Market](../market.md)
- [Bundles in How AYON works](../../how-ayon-works/bundles.md)
- [Setup options](../../setups.md)
