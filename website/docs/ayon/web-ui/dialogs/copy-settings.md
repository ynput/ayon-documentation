---
title: Copy settings
description: "The copy settings dialogs of the AYON web app: copying addon settings into the studio or project settings editor with a per-value comparison, and copying all settings between bundles on the Bundles page."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/CopySettings/CopySettingsDialog.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/CopySettings/CopySettingsNode.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/CopySettings/AddonDropdown.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/CopyBundleSettingsButton.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/AddonSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/VariantSelector.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/BundleDropdown.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ProjectDropdown.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/Bundles/CopyBundleSettingsDialog/CopyBundleSettingsDialog.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/Bundles/CopyBundleSettingsDialog/CopyBundleSettingsDropdown.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/Bundles/Bundles.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/Bundles/BundleList.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/bundles/bundles.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/bundles/migration.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/helpers/migrate_addon_settings.py
---

# Copy settings

Addon settings are stored per addon version and variant, so a new addon version does not see the values of the previous one (see [Settings scopes and storage](../../backend/settings/index.md)). The web app has two dialogs that copy values across addon versions, variants, bundles and projects:

| Dialog | Where | What it does |
|---|---|---|
| [Settings copy dialog](#settings-copy-dialog) | [Studio settings](../studio/studio-settings.md) and [Project settings](../project/project-settings.md) | Compares the source and target values field by field and loads the chosen ones into the editor as unsaved changes. |
| [Bundle state dialog](#bundle-state-dialog) | [Bundles](../studio/bundles.md) | Copies all studio, project and project site settings of every addon from one bundle and variant to another, at once. |

## Where it appears

| Opens from | Control | Shortcut | Who sees it |
|---|---|---|---|
| Studio settings, addon list toolbar | Copy settings button (tooltip **Copy settings from another bundle**) | none | Managers and admins |
| Studio settings, addon list right-click menu | **Copy settings from...** | none | Managers and admins |
| Project settings, addon list toolbar | Copy settings button (tooltip **Copy settings from another bundle**) | none | Users who can open the project settings |
| Project settings, addon list right-click menu | **Copy settings from...** | none | Users who can open the project settings |
| Bundles, detail toolbar | **Set Production**, **Set Staging** | none | Admins |
| Bundles, right-click menu | **Set production**, **Set staging**, **Set dev** (developer mode) | none | Admins |
| Bundles, right-click menu | **Copy settings from...** | none | Admins |

The copy settings button is disabled while the editor has unsaved changes and when no bundle holds the selected variant. The right-click entry of the addon list acts on the selected addons, or on the clicked addon when it is not selected.

## Settings copy dialog

The dialog is titled **Copy &lt;variant&gt; settings from...** on Studio settings and **Copy &lt;project&gt; &lt;variant&gt; settings from...** on Project settings, where the variant is `production`, `staging` or the name of a dev bundle. It covers most of the window. Closing it with its close button discards the comparison.

### Layout and controls

| Region | Content |
|---|---|
| Toolbar | Source bundle, source variant and, on Project settings, source project. |
| Addon panels | One panel per addon: the source, an arrow and the target, with a change table under it. |
| Footer | **Copy selected settings**. |

**LOADING...** covers the panels while values are read.

Toolbar:

| Control | What it does |
|---|---|
| **Source bundle:** | Dropdown of bundles, with badges for **Production**, **Staging** and, in developer mode, **Dev** (**Active** on the user's own dev bundle). Dev bundles are listed in developer mode only; when the source variant is a dev bundle, only dev bundles are listed. Choosing a bundle also sets the source variant to the state of that bundle, or to production for a bundle without a state. Preselected with the bundle that holds the target variant. |
| **Source variant:** | **Production**, **Staging** and, in developer mode, **Dev**. Choosing one also selects the bundle that holds that state. **Dev** without a dev bundle of the user gives **No dev bundle found for your user. Please create one first.** |
| **Source project:** | Project settings only. Dropdown of the active projects, preselected with the current project. |

The two entry points differ:

| | Copy settings button | **Copy settings from...** |
|---|---|---|
| Addons | Every addon of the addon list. | The selected addons. |
| **Source bundle:** | Can be changed. | Can be changed only when the source variant is a dev bundle. |
| Source version of each addon | The version in the source bundle, fixed unless the source is a dev bundle. | Preset to the version in the source bundle, and can be changed to any installed version. |
| Addons without anything to copy | Hidden, unless the source is a dev bundle. | Shown with a message. |

With a dev bundle as the source, addons that are not part of that bundle are not shown.

Addon panel header:

| Element | Content |
|---|---|
| Switch | Includes the addon in the copy. Available only when the addon has changes. |
| Source version | Dropdown of the installed versions of the addon, newest first, labelled `<addon title> <version>`. |
| Source project | Project settings only: the source project. |
| Arrow or message | An arrow when there are changes. Otherwise **cannot copy from itself** (same version, variant and project), **no overrides to copy**, or **Nothing to copy**. |
| Target version | The addon version being edited. Read-only. |

Change table, shown under an included addon:

| Column | Content |
|---|---|
| Switch | Includes the change. Changes are switched on by default; a change whose structure does not fit the target field is switched off and cannot be switched on. |
| **Path** | The field address, as `group / field`. |
| **Current value** | The value in the editor now. |
| **New value** | The value that would be copied. |

Values are colored by the override level they come from (see [Override states in the editor](../../backend/settings/index.md#override-states-in-the-editor)). Booleans read `true` or `false`, simple lists `[ a, b ]`, and lists of named items show their names. Other values read **no value**, **empty list**, **[ complex list ]** or **[ complex object ]**; hovering a complex value shows it as JSON.

### Which fields are compared

| Rule | Effect |
|---|---|
| Overrides only | A field is listed when it has an override in the source or in the target. Fields that both take from the defaults are not compared. |
| Scope | On Studio settings only studio-scoped fields are listed; on Project settings only project-scoped fields. |
| Groups and lists | A group or a list is listed as one entry; the fields inside it are not listed one by one. |
| Equal values | A field with the same value at the same override level on both sides is not listed. The same value at a different level is listed. |
| Versions | Source values are converted to the model of the target version before the comparison. |

### Copying

**Copy selected settings** loads the switched-on changes into the editor as unsaved changes, closes the dialog and shows **Settings copied**. It is disabled when no change is switched on. Nothing is stored until **Save Changes**; **Clear Changes** discards the copy. Where the copied value comes from a lower level (a default copied into a studio field, or a studio or default value copied into a project field), the target override is removed on save, and the changes list marks the path `(unpin)`.

## Bundle state dialog

The Bundles page opens this dialog when a state is set on a bundle and another bundle exists to copy from, and from **Copy settings from...** in the bundle right-click menu.

| Opened by | Title |
|---|---|
| Setting Production, Staging or Dev on a bundle | **Set &lt;bundle&gt; as &lt;state&gt;?** |
| **Copy settings from...** | **Copy addon settings to your new &lt;state&gt; bundle?** |

When no bundle holds Production, Staging or (in developer mode) Dev, setting a state applies at once without the dialog. **Copy settings from...** is disabled for bundles without a state, for a bundle that holds both Production and Staging, with several bundles selected, and for a Production bundle when no Staging bundle exists (or a Staging bundle when no Production bundle exists), unless dev bundles exist in developer mode.

### Layout and controls

Under the title the dialog reads **Addons do not share settings between different versions automatically.** and **Here you can choose to apply all studio, project and site settings from the source to the target bundle automatically.**

| Element | Content |
|---|---|
| Source card | **Bundle:** with a dropdown of the source bundles and their state badges. |
| Arrow | Points from source to target. |
| Target card | **Bundle:** with the target bundle name and a badge of the state being set (or the states it holds, from **Copy settings from...**). |
| Note | **If you skip this step, you can always copy addon settings selectively later on.** |

Source dropdown:

| Rule | Effect |
|---|---|
| Listed bundles | Bundles that hold Production or Staging, and in developer mode Dev bundles. Each entry is one bundle and one state; a bundle that holds both Production and Staging is listed twice. |
| Excluded | The target bundle with the state that is being set (or, from **Copy settings from...**, with the states it holds). |
| Previous holder | When Production or Staging is being set, the bundle that holds that state now is listed with its badge struck through. |

Default source:

| Situation | Preselected source |
|---|---|
| Production or Staging is being set and another bundle holds it | That bundle, with the same variant. |
| Otherwise | The Production bundle, unless it is the target for production; then the Staging bundle, unless it is the target for staging; then, in developer mode, the first dev bundle. |

Buttons:

| Button | Shown | Effect |
|---|---|---|
| **Cancel** | When a state is being set | Closes the dialog. The state is not set. |
| **Do not copy** | Always | When a state is being set: sets the state without copying. From **Copy settings from...**: closes the dialog. |
| **Copy all settings** | Always | Sets the state (when one is being set), then copies the settings. |

Clicking outside the dialog does not close it. Results are reported as **Settings copied from &lt;bundle&gt; successfully** or **Failed to copy settings: &lt;message&gt;**.

### What is copied

The copy runs on the server for every addon that has a version in both bundles and is installed in both versions. Addons that exist in only one of the bundles are left alone.

| Settings | Effect on the target |
|---|---|
| Studio settings | The studio overrides of the source variant, converted to the target version, replace the studio overrides of the target variant. When the source has none, the target overrides are removed. |
| Project settings | The same, for every project. |
| Project site settings | For every project, site and user, the site overrides of the source version replace those of the target version. They have no variant. |
| Studio site settings | Not copied. |

The variants are `production` or `staging`, or the dev bundle's name for a Dev source or target. Every changed or removed override creates a `settings.changed` event (see [Event Viewer](../event-viewer.md)).

## Permissions

| Action | Required |
|---|---|
| Use the settings copy dialog on Studio settings | Manager or admin |
| Use the settings copy dialog on Project settings | Access to the project settings |
| Save the copied values | The permission to save the page, see [Studio settings](../studio/studio-settings.md#permissions) and [Project settings](../project/project-settings.md#permissions) |
| Bundle state dialog, copy settings between bundles | Admin |

## Related

- [Settings scopes and storage](../../backend/settings/index.md)
- [Studio settings](../studio/studio-settings.md)
- [Project settings](../project/project-settings.md)
- [Bundles](../studio/bundles.md)
- [Bundles in How AYON works](../../how-ayon-works/bundles.md)
- [Install pipeline release](install-pipeline-release.md)
