---
title: Studio settings
description: "The Studio settings tab of the AYON web app: the addon settings editor at studio scope with the variant buttons, bundle selector, addon list, search, override actions, copy and paste, copying settings from another bundle, the low-level editor and saving."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/StudioSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/AddonSettings.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/AddonSettingsPanel.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsAddonList.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/VariantSelector.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/BundlesSelector.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/CopyBundleSettingsButton.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsListHeader.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AddonSettings/SettingsChangesTable.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/CopySettings/CopySettingsDialog.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/RawSettingsDialog/RawSettingsDialog.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SettingsEditor/FormTemplates/FieldTemplate.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/SettingsEditor/FormTemplates/ObjectFieldTemplate.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/addons/studio_settings.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/settings/settings.py
---

# Studio settings

The **Studio settings** tab edits the settings of the server's addons at the studio level. The values saved here apply to every project and every workstation unless a project or site overrides them. Values are stored per addon version and variant (production, staging or a dev bundle), not per bundle. How scopes, overrides and variants work is explained in [Settings scopes and storage](../../backend/settings/index.md); this page describes the controls.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Studio settings | **App** menu, **Studio Settings** | `s+s` | `/settings/studio` | Managers and admins |

Users without the manager role are redirected to [Site settings](site-settings.md).

## Layout and controls

The tab has three columns: the addon list on the left, the editor in the middle and the list of unsaved changes on the right. A splitter separates the changes column from the rest.

### Addon list column

| Control | What it does |
|---|---|
| **Production**, **Staging** | Select the variant whose values are edited. The active button has the color of the variant. |
| **Dev** | Shown when the **Developer mode** attribute of the user is on. Selects the variant of the user's own dev bundle. Without one, the message **No dev bundle found for your user. Please create one first.** appears. |
| Copy settings button (tooltip **Copy settings from another bundle**) | Opens the copy dialog for all listed addons, see [Copy settings dialog](#copy-settings-dialog). Disabled while there are unsaved changes. |
| Bundle dropdown | Selects the bundle whose addon versions are listed. By default it shows the bundle that holds the state of the selected variant. See [Bundle dropdown](#bundle-dropdown). |
| Addon list | Columns **Addon** and **Version**, sorted by title. Lists the addons of the bundle that have settings in the studio scope, plus broken addons. Several addons can be selected; each selected addon opens a panel in the editor. |

The selected variant and bundle are kept for the browser tab. Turning developer mode on switches the tab to **Dev**, turning it off switches it back to **Production**.

Rows of the addon list are marked when the addon has unsaved changes, has studio overrides, or is broken (its version is declared in the bundle but cannot be loaded; no editor panel opens for it). When the list cannot be loaded, it shows **WARNING: No bundle set to &lt;variant&gt;**; when the bundle has no addon with settings, **No addons found**.

Right-click menu on the addon list (acts on the selected addons, or on the clicked addon when it is not selected):

| Entry | What it does | Who sees it |
|---|---|---|
| **Copy settings from...** | Opens the [Copy settings dialog](#copy-settings-dialog) for these addons. | Managers and admins |
| **Low-level editor** | Opens the [Low-level editor](#low-level-editor). Enabled for one addon only. | Admins |

### Bundle dropdown

The dropdown lists the bundles that are not archived. Dev bundles are listed only when developer mode is on.

| Order | Bundles | Badge |
|---|---|---|
| 1 | The Production bundle | **P** |
| 2 | The Staging bundle | **S** |
| 3 | Dev bundles, the user's own first | **Dev**, with **(me)** on the user's own |
| 4 | Project bundles | **Project** |
| 5 | Other bundles | none |

Within a group, the newest bundle comes first. Choosing a bundle lists its addon versions and keeps the selected variant, so the values of that variant are edited for those addon versions. Choosing a dev bundle also switches the variant to that dev bundle.

### Editor column

| Control | What it does |
|---|---|
| **Search and filter settings** | Filters the open panels to the fields that match the text, as a case-insensitive regular expression. When nothing matches, the panel shows **No settings found for the current search**. |
| Help button (tooltip **Show help descriptions**) | Shows or hides the descriptions of the fields. |
| Addon panels | One panel per selected addon, titled with the addon title and a badge with the variant. Fields show their override state with colored markers, see [Override states in the editor](../../backend/settings/index.md#override-states-in-the-editor). |

The toolbar appears once an addon is selected. Clicking or right-clicking a field selects it, and the breadcrumbs of the [navigation bar](../navigation-bar.md) show its address in the form `ayon+settings://<addon>/<path>`.

### Field right-click menu

| Entry | What it does |
|---|---|
| **Add current &lt;field&gt; value as studio override** | Asks for confirmation (**Pin override**), then stores the current value as a studio override at once, even when it equals the default. Disabled when the field already has a studio override. |
| **Remove studio override from &lt;field&gt;** | Asks for confirmation (**Remove selected override**), then deletes the studio override at once. The field falls back to the addon default. Disabled when the field has no studio override. |
| **Remove all studio overrides** | Only on the addon panel itself. Asks for confirmation (**Remove all overrides**), then deletes every studio override of the addon version for the selected variant. |
| **Copy** | Copies the value of the field or group as JSON to the clipboard. An empty value gives the message **No data to copy**. |
| **Paste** | Reads JSON from the clipboard and puts it into the field or group as an unsaved change. The structure must match the field. Messages: **No content to paste**, **Invalid JSON**, **Incompatible data structure**. |

For fields that belong to a group, the override entries act on the whole group.

### Changes column

| Control | What it does |
|---|---|
| **Clear Changes** | Discards all unsaved changes. Disabled when there are none. |
| **Save Changes** | Saves the unsaved changes of every addon. Disabled when there are none. |
| Changes list | Column **Name**. One row per addon with changes, showing the addon name, version and a badge with the variant. Under it, one row per changed path (`group / field`), marked `(unpin)` when a copied value removes an override. Shows **No changes** when empty. |
| Delete button on a path | Reverts that change. |
| **Clear Selected** (right-click menu) | Reverts the selected paths. |

Changes are kept while switching between addons, variants and bundles, and are listed per addon version and variant. Saving sends each changed addon separately. **Settings saved** appears when all succeed. A failed addon shows **Unable to save &lt;variant&gt; settings** with the addon name, version and the validation errors, and its changes stay in the list.

## Copy settings dialog

The dialog loads values from another bundle, variant or addon version into the editor as unsaved changes, with a comparison of the current and new value of every field. Nothing is stored until **Save Changes**. It opens from the copy settings button (all listed addons, source chosen by bundle) or from **Copy settings from...** in the addon list (the selected addons, source version free to choose). The dialog is described in [Copy settings](../dialogs/copy-settings.md#settings-copy-dialog).

Copying all settings of a bundle at once, including project settings, is done on the [Bundles](bundles.md#copying-settings) tab instead.

## Low-level editor

The low-level editor shows the stored studio override document of one addon version and variant as JSON. It is titled **&lt;addon&gt; &lt;version&gt; &lt;variant&gt; raw settings**.

| Element | What it does |
|---|---|
| Warning | Covers the editor at first: **This interface is intended for advanced users only.** Clicking it (**Click here to continue**) reveals the editor. |
| JSON editor | The stored overrides, without the defaults. |
| **Copy** | Copies the JSON to the clipboard. |
| **Save** | Active once the warning is dismissed. Stores the JSON as the override document, without validation, and reloads the addon panel. Invalid JSON gives **Invalid JSON**. |

## Permissions

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Studio settings** | Yes | Yes | No |
| Edit, pin and remove studio overrides | Yes | Yes | No |
| Copy settings into the editor | Yes | Yes | No |
| **Low-level editor** | Yes | No | No |

Each save creates a `settings.changed` event (see [Event Viewer](../event-viewer.md)).

## Related

- [Settings scopes and storage](../../backend/settings/index.md)
- [Bundles](bundles.md)
- [Addons](addons.md)
- [Site settings](site-settings.md)
- [Project bundles](../project/project-settings.md)
- [Studio configuration](index.md)
