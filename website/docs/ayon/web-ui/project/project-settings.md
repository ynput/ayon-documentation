---
title: Project settings
description: "The Project settings tab of the AYON Projects Manager: editing addon settings for one project per variant, the addon list, the editor and its overrides, copying settings, and freezing a project bundle with its own launcher, dependency packages and addon versions."
verified: 2026-10-25
sources:
  - https://help.ayon.app/en/help/articles/0782429-project-bundles
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/ProjectManagerPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/AddonSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsAddonList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/VariantSelector.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/BundlesSelector.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/CopyBundleSettingsButton.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsListHeader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsChangesTable.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/PerProjectBundleConfig/PerProjectBundleConfig.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/PerProjectBundleConfig/PerProjectBundleDialog.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/projects/bundle.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/bundles/project_bundles.py
---

# Project settings

The **Project settings** tab of the [Projects Manager](index.md) edits the addon settings of the selected project. Values set here are project overrides: they apply to this project only and are stored on top of the studio settings of the same addon version and variant. Fields without a project override keep following the [Studio settings](../studio/studio-settings.md). Scopes, override layers and storage are explained in [Settings scopes and storage](../../backend/settings/index.md).

The toolbar of this tab also holds the lock button that freezes a [project bundle](#project-bundles).

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Project settings | App menu, **Projects Settings**; Projects Manager, **Project settings** | `p+p` | `/manageProjects/projectSettings?project=<project>` | Managers and admins; users with **Read only** or **Read & Write** on **Project addon settings** in at least one project |

The settings button on a project row of the project lists also opens this tab for that project.

## Layout and controls

The page has four columns: the project list (see [Projects Manager](index.md#project-list)), the addon list with its toolbar, the settings editor of the selected addons, and the list of unsaved changes with the save buttons.

### Addon list toolbar

| Control | What it does |
|---|---|
| **Production**, **Staging**, **Dev** | Variant selector. The active variant is highlighted. **Dev** is shown in developer mode only and selects the user's own dev bundle; without one the message **No dev bundle found for your user. Please create one first.** appears. The choice is kept per browser tab and shared with the **Studio settings** tab. |
| Lock button | Opens the project bundle dialog for the selected variant (see [Project bundles](#project-bundles)). |
| **Copy settings from another bundle** | Opens the copy dialog with every addon of the list, to load values from another bundle, variant and project into the editor. Disabled while there are unsaved changes. See [Copy settings](../dialogs/copy-settings.md#settings-copy-dialog). |
| Bundle field | Shows the bundle the project uses for the selected variant: the studio bundle of that variant, or the project bundle when one exists. Read-only on this tab. |

### Addon list

The list has the columns **Addon** and **Version** and shows the addons of that bundle that have at least one project-scoped field, sorted by title. Several addons can be selected at once; each selected addon gets its own panel in the editor.

| Marker | Meaning |
|---|---|
| Row colour | The addon has overrides at the studio, project or site level, or unsaved changes. Colours follow the [override states](../../backend/settings/index.md#override-states-in-the-editor). |
| **(Inherited)** after the version | The project has a project bundle and the addon follows the studio bundle. |
| **WARNING: No bundle set to &lt;variant&gt;** | No bundle has the selected variant. |

Right-click menu: **Copy settings from...** (load values from another addon version, variant or project into the editor, see [Copy settings](../dialogs/copy-settings.md#settings-copy-dialog)) and, for admins, **Low-level editor**, which edits the stored project overrides of one addon directly.

### Editor

| Control | What it does |
|---|---|
| **Search and filter settings** | Filters the addon panels to the matching fields. |
| **Show help descriptions** | Shows or hides the field descriptions. |
| Addon panels | One per selected addon. The header shows badges for the project and the variant. Fields show their override state with colours; right-click menus pin or remove project overrides and copy or paste values (see [Right-click menu on fields](../../backend/settings/index.md#right-click-menu-on-fields)). |

When the project has a project bundle and the addon has an explicit version in it, the panel shows **The addon settings for this project are frozen to the project bundle. Studio settings are also displayed alongside project-scoped settings.** and also shows the studio-scope fields of the addon.

### Changes and saving

| Control | What it does |
|---|---|
| **Clear Changes** | Discards all unsaved changes. |
| **Save Changes** | Saves the changed fields of every addon as project overrides. Disabled with the tooltip **You don't have edit permissions** without write access. |
| Changes list | One row per changed field, grouped by addon, with badges for project and variant. The delete button of a row, or **Clear Selected** in the right-click menu, reverts those changes. **No changes** when nothing is pending. |

Removing an override and pinning a value as override from the right-click menu take effect immediately, after a confirmation; other edits wait for **Save Changes**.

Without view permission for the selected project the page shows **You don't have permission to view the addon settings for this project**.

## Project bundles

A project bundle is a bundle assigned to one project. It lets the project run on its own launcher version, dependency packages and addon versions while the studio Production or Staging bundle moves on. Project bundles protect long-running projects from changes made to the studio bundles. A project bundle is frozen, not locked: individual addon versions can be changed afterward.

### Where project bundles appear

| Place | Description |
|---|---|
| This tab, addon list toolbar | The lock button. Its tooltip reads **Freeze production bundle for this project** (or staging). The button is highlighted when the project already uses a project bundle for the selected variant. |
| Bundle field of this tab | Shows the project bundle name when the project uses one. |
| Bundles page | Project bundles are listed when the **Project** switch is on, with a **Project** badge. See [Bundles](../studio/bundles.md). |
| Bundle name | `__project__<project name>__<variant>`, where the variant is `production` or `staging`. |

The lock button is available for the Production and Staging variants only. For any other variant, including Dev, it is disabled with the tooltip **Variant must be production or staging to freeze.**

### What a project bundle contains

| Part | Description |
|---|---|
| Launcher version | The launcher version for the project. |
| Dependency packages | One package per platform (Windows, Linux, Darwin), or **None**. |
| Addon versions | A version choice for each addon that allows project-level version overrides. |

Addons that do not allow project-level version overrides are not part of the choice. They always follow the studio bundle of the same variant. They appear in the project bundle on the Bundles page with a lock icon, the studio version, and the note **(cannot override)**.

Without a project bundle, the dialog starts from the studio bundle of the selected variant: its launcher version and dependency packages, and each overridable addon at the studio version. An addon whose studio version cannot be used in project bundles starts at **Inherit**, and an addon missing from the studio bundle at **Disable**. With a project bundle, the dialog shows the values of the project bundle.

### The freeze dialog

The dialog is titled **Freeze &lt;variant&gt; bundle for &lt;project&gt;**.

| Section | Control | Options |
|---|---|---|
| Launcher | **Launcher Version** dropdown | Launcher versions uploaded to the server. |
| **Dependency Packages** | One dropdown per platform | **None** and the dependency packages uploaded for that platform. |
| **Addons** | One dropdown per overridable addon | See below. |

Addon version options:

| Option | Meaning |
|---|---|
| **Inherit (&lt;version&gt;)** | The addon follows the studio bundle of the variant. When the studio bundle changes its version, the project follows. The label shows the current studio version, or `DISABLED`. |
| **Disable** | The addon is disabled for the project (stored as no version). |
| An explicit version | The addon stays at that version regardless of studio changes. Versions that cannot be used in project bundles are listed but disabled, with the message **This version cannot be used in project bundles.** |

Footer buttons:

| Button | Visible | What it does |
|---|---|---|
| **Freeze** | No project bundle yet | Creates the project bundle from the dialog values. |
| **Update Freeze** | A project bundle exists | Saves the dialog values to the existing project bundle. |
| **Unfreeze** | A project bundle exists | Removes the project bundle. |

Errors from the server appear in a message at the bottom of the dialog.

### Effects on settings

| Event | Effect |
|---|---|
| Freeze or update | For every addon with an explicit version, the project's complete settings (studio values plus project overrides) are written as project overrides for that addon version. In the settings editor these values show as project overrides. Later changes to the studio settings of those fields no longer reach the frozen project. |
| Unfreeze | The project bundle is deleted and removed from the project. For the addons that had explicit versions, fields that are not project-scoped are removed from the project overrides, and the overrides are migrated to the version the studio bundle uses. Project overrides are not lost. |

A project keeps its own overrides whether it uses a studio bundle or a project bundle. A project bundle locks the code; the settings storage is described in [Project bundles and settings](../../backend/settings/index.md#project-bundles-and-settings).

### Behavior and limits

| Topic | Behavior |
|---|---|
| Inherited and non-overridable addons | They are not frozen. Their versions follow the studio bundle of the variant, so check their compatibility when the studio bundle changes. |
| Disabling a non-overridable addon | Not possible in the dialog. |
| State | A project bundle cannot be set to Production, Staging or Dev, and its state cannot be changed. |
| Compatibility check | Not run when a project bundle is created or updated. |
| Development mode | Project bundles are not supported for the Dev variant. |
| Bundle form | A project bundle in the Bundles page shows overridable addons first. Overrides are shown in orange; inherited values are shown with a lock. |

## Permissions

| Action | Required |
|---|---|
| View the project settings | Manager or admin, or **Read only** or **Read & Write** on **Project addon settings** in the project |
| Save project settings, remove or pin overrides | Manager or admin, or **Read & Write** on **Project addon settings** in the project |
| Low-level editor | Admin |
| Open the freeze dialog, freeze, update or unfreeze a project bundle | Manager or admin |
| View project bundles on the Bundles page | Admin |

See [Settings scopes and storage](../../backend/settings/index.md#permissions) for the full list.

## Related

- [Settings scopes and storage](../../backend/settings/index.md)
- [Studio settings](../studio/studio-settings.md)
- [Site settings](site-settings.md)
- [Bundles](../studio/bundles.md)
- [Project configuration](index.md)
- [AYON setups](../../setups.md)
