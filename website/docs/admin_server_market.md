---
id: admin_server_market
title: AYON Market
sidebar_label: AYON Market
description: Downloading addons and releases from the market.
---

:::info
To access the market, you need to use AYON Cloud or have a local instance connected to Ynput Cloud.
![Ynput connect status](./assets/server/admin/ynput-connect-status.png)
:::

The AYON Market provides the latest official addons and releases, making it easy to enhance your server and pipeline. Access the market through the app menu or by pressing the shortcut `m+m` (double-tap the **m** key).

![AYON Market in the app menu](./assets/server/admin/market/market-menu.png)

## Release Bundles

Release bundles include addons, dependency packages, and launchers tested by Ynput for compatibility. We recommend starting with a release bundle rather than individual addons.

Bundles are tailored for different production tracking setups. You can deselect unnecessary pre-bundled addons before installation.

![AYON Market release bundles](./assets/server/admin/market/market-release-bundles.png)

After installing a release bundle, a new bundle is automatically created with your selected addons, launcher platforms, and pre-built, compatible dependency packages. We recommend testing the new bundle in a <span style={{color:'#1c2026', backgroundColor:'#ff858b', borderRadius: '4px', padding: '2px 4px'}}>staging</span> environment before using it in <span style={{color:'#1c2026',backgroundColor:'#23E0A9', borderRadius: '4px', padding: '2px 4px'}}>production</span>. You can configure this in the Bundle Settings within Studio Settings.

![AYON Market release bundle install](./assets/server/admin/market/market-release-install.png)

:::info
The Community Edition always has access to the latest release bundle, while [AYON subscribers](https://ynput.cloud/subscribe/ayon) can access all previous release bundles.
:::

## Market Addons

Addons expand your server's capabilities, offering support for DCCs and new features in the web interface.

You can download and update addons directly from Ynput's servers through the market, eliminating the need for manual installation.

After downloading a new addon version, you must add it to a bundle before using it. This ensures the version can be tested on your server prior to deployment in production.

![AYON Market release bundle install](./assets/server/admin/market/market-downloading-addon.png)

:::caution
Installing addons individually is not recommended, as versions may not be compatible and do not include dependency packages or a launcher. [Release bundles](#release-bundles) are safer and more convenient.
:::
