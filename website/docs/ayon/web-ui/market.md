---
title: Market
description: "The Market page of the AYON web app: browsing, installing and updating addons and pipeline release bundles from Ynput Cloud."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/7317917-ayon-market
---

# Market

The Market is the catalog of addons and pipeline release bundles that Ynput publishes for AYON servers. The page lists them, shows their installation state on the current server, and downloads them to the server directly from Ynput Cloud. Administrators use it to add addons, update installed addons and install tested sets of addons, launchers and dependency packages.

## Where it appears

| Item | Value |
|---|---|
| Menu | **App** menu, **Market** |
| Shortcut | `m+m` |
| Route | `/market`, with query parameters `type` (`addons` or `releases`), `filter` and `selected` (the open addon or release) |
| Visible to | Administrators (the menu entry is hidden for other roles). The catalog endpoints reject users who are not administrators. |
| Requires | A connection between the AYON server and Ynput Cloud, and an AYON server that is not in offline mode |

The Market needs a connected Ynput Cloud account but no paid plan. Addons flagged as requiring a subscription are listed but cannot be downloaded without one. An AYON server in offline mode cannot reach the Market and reports that the marketplace is not available.

## Layout

The page has three columns.

| Column | Content |
|---|---|
| Filters (left) | Two filter groups, **Addons** and **Release Bundles**, and the Ynput Cloud connection control |
| List (center) | Search field, **Update All** button (when updates exist) and the list of addon cards or release groups |
| Details (right) | Details of the selected addon or release. Empty when nothing is selected. |

### Filters

**Addons**

| Filter | Shows |
|---|---|
| **All** | Every addon in the Market, downloaded or not |
| **Free** | Addons that are not flagged as licensed |
| **Updates Available** | Downloaded addons with a newer version available |
| **In Production** | Downloaded addons used by the production bundle |
| **Production Outdated** | Downloaded addons flagged as using an outdated version in the production bundle |
| **Downloads Available** | Addons not yet downloaded to the server |

**Release Bundles**

| Filter | Shows |
|---|---|
| **Latest** | Only the latest pipeline release |
| **All** | Every pipeline release |

The selected filter and type are stored in the URL.

### Controls of the list

| Control | What it does |
|---|---|
| Search | Filters the list by name. For releases, the group title also matches. |
| **Update All** | Downloads the newest version of every downloaded addon that has an update. Shown only while at least one addon is outdated. The label changes to **Updating...** during the download and **All Updated** when it ends. |
| Group header (releases) | Expands or collapses the releases of one release name |
| Card | Selects the item and opens its details |
| Card action button | Downloads (**Install**) or updates (**Update**) the item. See [card states](#addon-card-states). |

Addons are sorted with downloaded addons first, then outdated ones, then official ones, then alphabetically. Addons flagged `cloud-only` appear only on servers managed by Ynput Cloud.

### Addon card

Each addon card shows the addon icon, title, author (the publishing organization), a badge and the action button.

| Badge | Meaning |
|---|---|
| Ynput logo | Official addon published by Ynput |
| Verified icon | Addon from a verified publisher (shown when the Market marks the publisher as verified) |
| none | Unverified publisher. The details panel labels it **Unverified**. |

### Addon card states

| State | Shown when | Action button |
|---|---|---|
| Install | Not downloaded | **Install** |
| Downloaded | Downloaded and up to date | **Downloaded** (no action) |
| Update | Downloaded, newer version available | **Update** |
| Pending | Waiting for **Update All** to reach it | **Pending** (disabled) |
| Downloading / Updating | Download in progress | **Downloading** or **Updating** with a spinning icon |
| Finished | Download completed in this session | **Finished** |
| Failed | Download failed | **Failed**. The details panel shows the error. |
| Subscribe | Addon requires a subscription the connected account does not have | **Subscribe** |

Download progress is tracked through server events, so the state is shared across browser sessions. When a download finishes the app asks for a server restart, because the server loads addons at start.

## Addon details

| Element | Content |
|---|---|
| Header | Icon, title and publisher status: **Official**, **Verified** or **Unverified** |
| Tags | **Subscription** chip for licensed addons (marked as included with the plan when it is a power feature) and **Early preview** for beta addons |
| Description | Markdown description from the publisher |
| Download area | Primary action button and a version dropdown |
| **Downloaded Versions** | The newest downloaded version, with **+N more** to list the others, or **Not downloaded** |
| **Production Usage** | The addon version used by the production bundle, or **Not used in Production** |
| **Author** | Publisher name |
| **Latest Version** | The newest version compatible with this server, with a note when newer versions exist that need a server update |
| Links | Publisher links grouped by type: homepage, GitHub, documentation, license |

### Details actions

| Action | When | What it does |
|---|---|---|
| **Download v\&lt;version\&gt;** | Not downloaded, or an update exists | Downloads the newest compatible version |
| **v\&lt;version\&gt; (server update required)** | The newest version needs a newer AYON server | Disabled |
| **Downloading...** | Download in progress | Disabled progress state |
| **Downloaded !** | Download finished | Disabled confirmation |
| **Pending...** | **Update All** is running | Disabled |
| **Uninstall** | Downloaded and up to date | Opens **Studio settings > Addons** with the addon selected, where it can be removed |
| **Subscribe** | A subscription is required and not active | Opens the subscription page |
| Version dropdown | Any addon with versions | Downloads the chosen version. Versions that need a newer server are disabled and marked **(server update required)**. Downloaded versions show a check mark. |
| **Use \&lt;version\&gt;** | Production version is older than the installed one | Opens **Bundles** with a duplicate of the production bundle that uses the newest installed version |
| **Bundle** | Production version is current | Opens the production bundle at this addon |
| **Report** | Download failed | Opens a bug report form |

Downloading an addon makes it available to the server. It is used only once a [bundle](bundles-and-addons.md) references it.

## Release bundles

A pipeline release is a tested set of compatible addons, launcher installers and dependency packages published by Ynput. Releases are grouped by release name (the part of the name before the first `-`). The first group header carries **Latest** for the newest release.

| Element | Content |
|---|---|
| Header | Icon, label, and **Official** status |
| Description | Markdown description |
| Addon links | One link per addon in the release. Selecting one opens that addon in the **Addons** view. |
| **Install release bundle** | Opens the **Install pipeline release** dialog |
| **Author** | Ynput |
| **Released** | Release date |

The latest release is available to every connected server. Earlier releases require an active subscription and show a subscription prompt in place of the install button.

### Install pipeline release dialog

The dialog has these steps.

| Step | Content |
|---|---|
| Overview | The release, the addons to install and the AYON launchers to install, each with a summary |
| Addons | Selection of addons from the release. Addons already installed on the server are preselected from the highest existing bundle. |
| Launcher platforms | Selection of the launcher platforms to download |
| Progress | Download progress. On success the dialog offers **Restart now** or **Restart later (snooze)**. |

Installation downloads the selected addons, launchers and compatible dependency packages, then creates a new bundle from them and opens **Bundles**. The same dialog is available from **Update Pipeline** in the App menu. If the server is not connected to Ynput Cloud, the dialog is replaced by a **Connect to Ynput Cloud** prompt.

## Connecting to Ynput Cloud

The connection control at the bottom of the filter column shows **link an account** or **connected**. When connected, a dropdown shows the plan name, the instance name and the organization, with a **Disconnect** button. Actions that need the connection open the **Connect to Ynput Cloud** dialog, which lists Addon Market Access, Official Release Bundles and Automated Bootstrapping as the benefits, and returns to the Market after the sign-in.

## Permissions

| Role | Access |
|---|---|
| Administrator | Full access to the page and downloads |
| Manager and below | No menu entry. The catalog endpoints return a forbidden error. |

## Related
- [Bundles and addons](bundles-and-addons.md)
- [Navigating the web app](navigating-the-web-app.md)
- [Keyboard shortcuts](keyboard-shortcuts.md)
- [Licenses](licenses.md)
- [Services](services.md)
- [Addons](../../addons/index.md)
