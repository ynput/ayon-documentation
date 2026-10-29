---
title: Launchers
description: "The Launchers tab of the AYON web app's Account space: downloading the AYON launcher installer of the production bundle for Windows, macOS or Linux, and every other launcher version hosted on the server."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/DownloadsPage/DownloadsPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/AccountPage/DownloadsPage/DownloadsPageHelpers.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/InstallerDownload/useGetInstallerDownload.js
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/InstallerDownload/InstallerProdCard/InstallerProdCard.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/InstallerDownload/InstallerDownloadPrompt.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/UserMenu/UserMenu.jsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/desktop/installers.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/bundles/bundles.py
---

# Launchers

The **Launchers** tab offers the AYON launcher installers hosted on the server for download. The launcher is the desktop application that artists install on their workstation to run the pipeline (see [Launcher](../../../pipeline/launcher.md)). The page puts the installer of the production bundle first, for each platform, and lists every other version below.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Launchers | **User** menu, **Download Launcher**; or **Account**, then the **Launchers** tab | `0` opens the User menu | `/account/downloads` | Everyone except guests |

## Layout and controls

| Region | Content |
|---|---|
| Platform cards | **Windows Installer**, **macOS Installer** and **Linux Installer**. Each lists the installers of the launcher version set in the production bundle for that platform, as buttons named by file name. The card of the browser's own platform is highlighted and its buttons are filled. A card without such an installer shows **None available**. |
| **All Versions** | Every installer on the server, one line per launcher version, newest first. Each line has one button per platform with the platform logo; the tooltip shows the file name. |

A button starts the download in the browser. Installers uploaded to the server are downloaded from it (`/api/desktop/installers/<file name>`); installers registered only with an external URL are downloaded from that URL. An installer with neither shows "URL for launcher not found".

## Download prompt in the top bar

The top bar shows a launcher download prompt when the production bundle's launcher has an installer for the browser's platform that this browser has not downloaded yet. A download from the prompt or from this page, or dismissing the prompt, is remembered in the browser, and the prompt no longer appears for that file. See [Navigation bar](../navigation-bar.md#right-region).

## Managing installers

Installers are uploaded by admins on the [Bundles](../studio/bundles.md#launchers-and-dependency-package-uploads) page, which also sets the launcher version of each bundle. When the production bundle has no launcher version, or no installer exists for that version, the platform cards show **None available** and only **All Versions** offers downloads.

## Related

- [Account](index.md)
- [Bundles](../studio/bundles.md)
- [Launcher](../../../pipeline/launcher.md)
- [Bundles and how a workstation picks one](../../how-ayon-works/bundles.md)
