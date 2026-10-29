---
title: First-run setup
description: "The first-run setup of a new AYON server: when it appears, creating the first admin, connecting to Ynput Cloud, installing a pipeline release and how the setup ends, plus Launch Bootstrap Setup."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/OnBoardingPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/context/on-boarding/OnBoardingContext.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/Landing.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/ConnectionDetails.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/CreateUser.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/BoostrapStart.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/ReleaseSelect.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/AddonSelectStep.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/PlatformSelectStep.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/Step/ProgressInstall.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/OnBoarding/util/StepWrapper.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/services/onBoarding/onBoarding.js
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Release/ReleasePreset.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/AppMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/app.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/api/onboarding/onboarding.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/system/info.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/ynputcloud/connect.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/helpers/cloud.py
---

# First-run setup

The first-run setup (also called onboarding or bootstrap setup) is the full-screen flow that a new AYON server shows before the regular web app. It creates the first admin account and can install a pipeline release from Ynput Cloud: addons, AYON launchers and dependency packages, plus a bundle that uses them. Setting up a server is described in [On-premise deployment](../../deployment/on-premise.md); releases and bundles in [Install pipeline release](install-pipeline-release.md) and [Bundles](../studio/bundles.md).

## Where it appears

| Opens from | Control | Shortcut | Who sees it |
|---|---|---|---|
| Any page of a server without an admin account | Shown instead of the login page, at `/onboarding` | none | Everyone who opens the web app |
| Any page, after signing in, while the setup is not finished | Shown instead of the web app, at `/onboarding` | none | Admins (not service users) |
| App menu | **Launch Bootstrap Setup** | none | Users with **Developer mode** on |

A server has no admin account when no user has the admin access level. A server with an active `ynputcloud` addon counts as having one.

The setup counts as finished once it has been completed or skipped. Until then every admin who signs in sees it again.

**Launch Bootstrap Setup** marks the setup as not finished and reloads the page, so the setup starts again at **Configure your server**. The server accepts this from admins only; for other users the menu entry shows **Failed to launch bootstrap setup**.

## Layout and controls

The setup is a sequence of panels on the login background of the server. A server without an admin account starts at the first step; a server with an admin account starts at **Configure your server**.

### Steps

| Step | Heading | Content and controls |
|---|---|---|
| 1 | **Lets get things set up for you.** | A Ynput Cloud button that connects the server to a Ynput Cloud account. **Read more or skip** shows **What is Ynput Cloud?** with an explanation and **I know what I am doing, skip bootstrap.**, which goes to **Create Admin** without connecting. |
| 2 | **Connected!** | Shown after connecting: **Your Ynput Community account is now linked to the server.**, the account details, and **Only admins can see this information and you can disconnect later.** **Continue** goes on. |
| 3 | **Create Admin** | The form for the first admin account (see below). **Create Admin** creates it and signs in. |
| 4 | **Configure your server** | Explains the bootstrap setup. With a Ynput Cloud connection, a **Bootstrap Setup** button goes to the release selection; without one, the Ynput Cloud button connects first and then shows **Connected!** with **Continue**. **I know what I am doing, skip bootstrap.** ends the setup without installing anything. |
| 5 | **Select a Release Package** | One card per available release with its icon, label and description. The first release is preselected. The selected card shows **Release: Ynput - &lt;name&gt; - &lt;date&gt;**; clicking the date switches between a relative and an exact date. **Continue** goes on. |
| 6 | **Pick your Addons** | A grid of the optional addons of the release, all selected. Clicking a card deselects or selects it. Mandatory addons of the release are not shown and are always installed. **Back** and **Next**. |
| 7 | **Pick your Platforms** | One card per platform the release has a launcher for: **Windows**, **Linux**, **macOS**. The operating system of the browser is preselected. **Confirm** starts the installation and is disabled until a platform is selected. **Back** returns to the addons. |
| 8 | **Getting Everything Installed...** | One card per download with its progress (see below). The heading changes to **Finished Installation!** when all downloads have ended. **Finish Setup** becomes active then. |

While the server connects to Ynput Cloud, **Connecting Ynput Account...** is shown. After 10 seconds without a connection the message **Connection timed out** appears.

### Create Admin form

| Field | Rule |
|---|---|
| **Username** | Required. Must not contain spaces: submitting a name with spaces shows **Username must not contain any spaces** and replaces the spaces with dots. Prefilled with the Ynput Cloud user name when the server was connected in step 1. |
| **Password** | Required. |
| **Confirm Password** | Required. Must match **Password**. |
| **Email (optional)** | Must contain `@` when filled. Prefilled from the Ynput Cloud account. |
| **Full Name (optional)** | Free text. |

Errors appear under the form, for example **Username is missing**, **Password and Confirm Password do not match**, **Email must be valid** or **Unable to create admin**. The server refuses the form once an admin exists.

After the account is created, the web app signs in as the new admin and the setup continues with **Configure your server**.

### Installation progress

| Card state | Display |
|---|---|
| Waiting | Hourglass icon. |
| Downloading | Sync icon and a progress bar. The list scrolls to the item in progress. |
| Finished | Check icon. An item that already exists on the server also shows as finished. |
| Failed | Error icon and the error message. |

Addons are listed after the launchers and dependency packages. Each card is named after the addon or the file.

## What the setup creates

| Step | Creates |
|---|---|
| Connecting to Ynput Cloud | Stores the Ynput Cloud key of the server. Without a signed-in user this is allowed only while the server has no admin account. |
| **Create Admin** | The first user, with the admin access level, and a signed-in session for it. |
| **Confirm** on **Pick your Platforms** | Downloads, as background events: the selected addons (including the mandatory ones), the launcher installers and the dependency packages of the release for the selected platforms. Installers and packages with the same file name are overwritten. |
| **Finish Setup** | A bundle built from the release, the same way as by [Install pipeline release](install-pipeline-release.md#what-the-installation-creates). On a new server, which has no Production bundle, it becomes the Production bundle. The setup is then marked finished and the server restarts. |

During the restart the screen reads **Almost there! Restarting server to apply setup...**. The web app opens when the server is back. When the bundle cannot be created, the message **Please create your production bundle manually after restarting the server.** appears and the setup still finishes.

## Skipping the setup

| Skip | Result |
|---|---|
| **I know what I am doing, skip bootstrap.** in step 1 | Goes to **Create Admin**. Ynput Cloud is not connected. |
| **I know what I am doing, skip bootstrap.** in **Configure your server** | Marks the setup finished without a restart. Nothing is downloaded and no bundle is created. Addons, launchers and dependency packages can be uploaded later on the [Bundles](../studio/bundles.md) page, or installed with [Install pipeline release](install-pipeline-release.md). |

## Permissions

| Action | Required |
|---|---|
| Create the first admin | No sign-in, only while the server has no admin account |
| Connect to Ynput Cloud | No sign-in while the server has no admin account; admin otherwise |
| See the setup after signing in, install a release, finish or skip the setup | Admin |
| **Launch Bootstrap Setup** | Shown with **Developer mode**; accepted for admins only |

## Related

- [Install pipeline release](install-pipeline-release.md)
- [Bundles](../studio/bundles.md)
- [Market](../market.md)
- [Navigation bar](../navigation-bar.md)
- [On-premise deployment](../../deployment/on-premise.md)
- [Users](../studio/users.md)
