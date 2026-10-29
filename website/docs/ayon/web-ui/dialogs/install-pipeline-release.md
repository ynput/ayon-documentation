---
title: Install pipeline release
description: "The Install pipeline release dialog of the AYON web app: where it opens, the release, addon and launcher cards, the selection steps, the download progress and the bundle it creates."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/ReleaseInstallerDialog.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/ReleaseInstaller.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/helpers.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/hooks/useReleaseForm.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/hooks/useInstallRelease.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/forms/ReleaseInstallerOverview.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/forms/ReleaseInstallerAddons.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/forms/ReleaseInstallerPlatforms.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/forms/ReleaseInstallerProgress.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/ReleaseInstallerDialog/ReleaseInstallerPrompt/ReleaseInstallerPrompt.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/features/releaseInstaller.ts
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/AppMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/PlatformSelect/PlatformSelect.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/MarketPage/MarketPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/Bundles/getNewBundleName.js
  - https://github.com/ynput/ayon-frontend/blob/develop/src/context/restart/RestartContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/market/releases.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/addons/install.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/desktop/installers.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/bundles/bundles.py
---

# Install pipeline release

A pipeline release is an official set of tested addons, AYON launchers and dependency packages, published by Ynput on Ynput Cloud. The **Install pipeline release** dialog downloads one release to the server and creates a new [bundle](../studio/bundles.md) from it. How bundles are used once they exist is explained in [Bundles](../../how-ayon-works/bundles.md).

The first-run setup of a new server installs a release with its own steps; see [First-run setup](first-run-setup.md).

## Where it appears

| Opens from | Control | Shortcut | Who sees it |
|---|---|---|---|
| App menu | **Update Pipeline** | none | Admins |
| Header of the web app | **Setup pipeline** | none | Admins, on a server that has no launcher installers or no dependency packages |
| [Market](../market.md), release details | **Install release bundle** | none | Admins |

**Setup pipeline** opens the [Bundles](../studio/bundles.md) page and the dialog. Its close button hides it for the rest of the browser session.

From **Update Pipeline** and **Setup pipeline** the dialog installs the latest release. From the Market it installs the release whose details are open.

When the server is not connected to Ynput Cloud, the **Connect to Ynput Cloud** dialog opens instead (see [Connecting to Ynput Cloud](../market.md#connecting-to-ynput-cloud)).

The open dialog is remembered by the browser and opens again after a page reload.

## Layout and controls

The dialog has four views: the overview, the addon selection, the launcher platform selection and the progress view.

### Overview

The overview shows a short description of releases, three cards and the footer.

| Card | Content | Control |
|---|---|---|
| **Release** | Ynput, the release version and how long ago the release was published. | None. The release cannot be changed in the dialog. |
| **Addons** | **&lt;n&gt; selected out of &lt;m&gt; available** | **Change** opens the addon selection. Reads **Pick Addons** when no addon, or only mandatory addons, are selected. |
| **AYON launchers** | The selected platforms (Windows, Linux, macOS), or **None selected**. | **Change** opens the platform selection. Reads **Pick AYON launchers** when no platform is selected. |

Under the cards the note **This will not affect your existing setup, a new bundle will be created for testing first.** is shown. An error during the start of the installation appears as **Error installing release: &lt;message&gt;**.

| Button | Effect |
|---|---|
| **Cancel** | Closes the dialog. |
| **Confirm** | Starts the downloads and switches to the progress view. Disabled while the release is loading and until at least one addon and one platform are selected. |

### Initial selection

| Choice | Opened from **Update Pipeline** or **Setup pipeline** | Opened from the Market |
|---|---|---|
| Addons | The addons of the current bundle (the Production bundle, otherwise the Staging bundle, otherwise the first listed bundle), plus the mandatory addons of the release. Without a bundle, every addon of the release. | Every addon of the release. |
| Platforms | The platforms of the launcher installers uploaded for the launcher version of the current bundle. Without a bundle, the operating system of the browser. | Same as from the App menu. |

Only addons that are part of the release are counted and downloaded.

### Addon selection

Titled **Select addons to install from the release**. A grid of addon cards shows each addon of the release with its title and version. Clicking a card selects or deselects it. Mandatory addons of the release are selected and cannot be deselected. Selected addons are listed first, mandatory ones at the top.

| Button | Effect |
|---|---|
| **Cancel** | Returns to the overview without changes. |
| **Confirm** | Keeps the selection and returns to the overview. |

### Launcher platform selection

Titled **Select launcher platforms**. One card per platform for which the release has a launcher: **Windows**, **Linux**, **macOS**. The tooltip of **Linux** reads **This will install Rocky 9 specific environment that should be compatible with all EL9 linux variants**. The selected platforms decide which launchers and dependency packages are downloaded.

The buttons are the same as in the addon selection.

### Progress view

| Element | Content |
|---|---|
| Progress bar | Overall progress of all downloads. |
| Message | **Installing: &lt;item&gt;...** for the item in progress, for example `Installer - windows`, `Dependency package - linux` or `Addon - core`. **Installing release...** before the first item starts. |
| Result | **Installed successfully. Restart server to apply changes.** once every download has finished. |

Buttons shown after the installation:

| Button | Effect |
|---|---|
| **Restart later (snooze)** | Closes the dialog, opens the Bundles page and hides the restart banner until 20:00 of the same day. |
| **Restart now** | Closes the dialog, opens the Bundles page and asks **Restart Server?** before restarting the server. |

The progress view has no cancel button. The list of running downloads is kept for the browser tab, so the progress view comes back when the dialog is opened again in the same tab while downloads are still running.

## What the installation creates

| Item | Description |
|---|---|
| Launcher installers | One per selected platform, downloaded from the release. An installer with the same file name is overwritten. |
| Dependency packages | The packages of the release for the selected platforms, downloaded and overwritten in the same way. |
| Addons | The selected addons, at the versions of the release. |
| Bundle | Created when all downloads have finished. See below. |

Every download runs on the server in the background as an event with the topic `installer.install_from_url`, `dependency_package.install_from_url` or `addon.install_from_url`, visible in the [Event Viewer](../event-viewer.md).

The new bundle:

| Property | Value |
|---|---|
| Name | `<release>-<YYYY>-<MM>-<DD>-<nn>`, for example `2023.08-2026-10-25-01`. `nn` counts the bundles created with the same prefix that day. |
| Addons | The selected addons at the release versions. Server addons (addons of type `server`) of the current bundle are added at the versions the current bundle uses. |
| Launcher version | The launcher version of the release. |
| Dependency packages | The release packages for the selected platforms. |
| State | None. When the server has no Production bundle yet, the new bundle becomes Production. |

The bundle is created without the [compatibility check](../studio/bundles.md#compatibility-check). The current Production and Staging bundles are not changed. Addon settings are not carried over to the new addon versions by the installation; they can be copied when the bundle receives a state, see [Copy settings](copy-settings.md#bundle-state-dialog).

## Errors

| Situation | Display |
|---|---|
| No release can be loaded | **No releases** with **No releases found: &lt;message&gt;** and a **Close** button. |
| A download cannot be started | **Error installing release: &lt;message&gt;** on the overview. |

## Permissions

| Action | Required |
|---|---|
| See **Update Pipeline**, **Setup pipeline** and the Market | Admin |
| Download addons, launchers and dependency packages | Admin |
| Create the bundle | Admin |
| Reach the releases | A server connected to Ynput Cloud and not in offline mode |

The latest release is available to every connected server. Earlier releases are offered on the Market and require an active subscription.

## Related

- [Bundles](../studio/bundles.md)
- [Market](../market.md)
- [First-run setup](first-run-setup.md)
- [Copy settings](copy-settings.md)
- [Bundles in How AYON works](../../how-ayon-works/bundles.md)
- [Navigation bar](../navigation-bar.md)
