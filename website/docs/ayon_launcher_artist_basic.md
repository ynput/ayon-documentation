---
id: ayon_launcher_artist_basic
title: Basic Usage
sidebar_label: Basic Usage
description: AYON Launcher
toc_max_heading_level: 5
---

:::info
This page explains the basic usage of AYON Launcher, including the Tray Menu and how to use different actions.
:::

## Intro

<div class="row">
<div class="col">

Once you launch the AYON Launcher, the AYON icon should appear in your system tray.

</div>
<div class="col">

![A screenshot of the Windows System Tray showing the AYON icon](assets/artist_systray.png)

</div>
</div>

:::tip Launcher Icon Color Code

The AYON icon can appear in different colors, indicating the [pipeline mode](admin_server_bundles_and_addons.md#pipeline-modes) in which AYON was launched.
- <span style={{color:'#23E0A9'}}>⬤</span> : AYON is in <span style={{color:'#1c2026',backgroundColor:'#23E0A9', borderRadius: '4px', padding: '2px 4px'}}>Production</span> mode.
- <span style={{color:'#ff858b'}}>⬤</span> : AYON is in <span style={{color:'#1c2026', backgroundColor:'#ff858b', borderRadius: '4px', padding: '2px 4px'}}>Staging</span> mode.
- <span style={{color:'#e2e2e3'}}>⬤</span> : AYON is in <span style={{color:'#1c2026',backgroundColor:'#e2e2e3', borderRadius: '4px', padding: '2px 4px'}}>Development</span> mode.

The default executable starts AYON Launcher in <span style={{color:'#1c2026',backgroundColor:'#23E0A9', borderRadius: '4px', padding: '2px 4px'}}>Production</span> mode, which is the stable mode for daily work.

For more info about running the launcher in different modes, see [Launch in Different Pipeline Modes](ayon_launcher_artist_advanced.md#launch-in-different-pipeline-modes).

:::

## Tray Menu

When you click the AYON icon in your tray, the AYON Tray Menu appears. It provides a set of tools:

<div class="row">
<div class="col">

- [Launcher](#launcher)
- [Publisher](#publisher)
- [Browser](#browser)
- [Admin (Utilities)](#admin-utilities)
- [Login](#login)
- [Launcher Info](#launcher-info) *The button with the launcher version*
- [Exit](#exit)

</div>
<div class="col">

![](assets/launcher/artist/tray_menu.png)

</div>
</div>

### Launcher

AYON Launcher is used to launch DCCs in the specified AYON context.

#### Launcher UI

| Select a Project | Select a Task and Trigger an Action |
|--|--|
| ![](assets/launcher/artist/launcher_select_project.png) | ![](assets/launcher/artist/launcher_select_task.png) |

Launcher UI:
1. Select a Project. If no project is selected, use the project filter at the top.
2. Refresh View
3. Actions Pane
4. Select Folder. Use the folder filter at the top.
5. Select Task

#### Action Pane

Available actions follow your studio's configuration for application and tool settings mentioned in [Applications and Tools](addon_applications_admin.md).

- Left-click an action to trigger it and open a list of available application variants. By default, it opens the last available workfile; otherwise, it starts a new scene.
- Right-click an action to change its mode, which is useful for specifying how to launch applications. For example, enable `skip opening last workfile` to always start a new scene.

:::tip Starting New Scenes

Admins can enable initializing new scenes via the **Templated Build Workfile** feature.
:::

#### Common Actions

- **Launch Applications**: Denoted by the DCC app icon.
- **Explore Here**: Opens the location for the selected folder or task in the file explorer.
- **Show in AYON**: Opens the location for the selected folder or task on the AYON server.
- **Terminal**: Allows you to pick the shell context. Useful for admins and TDs. More info in [Launcher Advanced Usage](ayon_launcher_artist_advanced.md).

### Publisher 

*This is only available if your admin added the tray publisher addon to the pipeline bundle.*

When clicked, it launches the standalone publisher. For more info, see [Tray Publisher Docs](addon_traypublisher_artist.md). It's the same as our [Publisher](artist_tools_publisher.md) tool but standalone.

### Browser

Explore Published Products. It's the same as the [Loader](artist_tools_loader.md) tool but used for browsing and checking published products.

![](assets/launcher/artist/browser_ui.png)

1. Select a Project
2. Refresh UI
3. Select a Folder
4. Available Published Product Types
5. Available Published Products
6. Thumbnail of the Selected Product or Folder
7. Version Info of the Selected Product
8. Available Representation for the Selected Product Version

### Admin (Utilities)

<div class="row">
<div class="col">

Useful AYON utilities for Admins and TDs. 
- [Console](#console)
- [Publish Report Viewer](#publish-report-viewer)

</div>
<div class="col">

![](assets/launcher/artist/tray_menu_utilities.png)
</div>
</div>

#### Console

It's like any other script editor in DCCs where you can interact directly with AYON.

![](assets/launcher/artist/script_console.png)

1. Script Output Pane
2. Script Input Pane
3. Add Tab...
4. Execute

:::tip Some Useful Code Snippets

- [AYON Python API First Steps | Ynput Forums](https://community.ynput.io/t/ayon-python-api-first-steps/1278)
- [BigRoy's Gist](https://gist.github.com/BigRoy)
- [AYON Recipes by Mustafa](https://github.com/MustafaJafar/ayon-recipes)

:::

#### Publish Report Viewer

This tool is used to examine exported publish reports.

![](assets/launcher/artist/publish_report_viewer.png)

1. Publish Reports Pane: Drag and drop publish reports to add them. Click the trash icon to remove them.
2. Report Viewer: Displays what the publisher looked like when the report was exported.

### Login

Log in to AYON using the credentials provided by your studio. You can log in directly using the input fields on the login window or click `Login with AYON Server` to log in using the browser.

![](assets/launcher/artist/login_window.png)

Once logged in, the login window will show the current user.

![](assets/launcher/artist/login_window_2.png)

### Launcher Info

This button is labeled with the AYON launcher version. When clicked, it shows additional information about your installed AYON launcher, local site ID, and environment variables.

:::info

See [Environment Variables](dev_launcher.md#environment-variables) for more information about environment variables set during startup.
:::

![](assets/launcher/artist/AYON_info.png)

- **<strong><span style={{color:"red"}}>\*</span></strong> Local Site ID**: A unique ID assigned to your machine when installing AYON Launcher. More info in [Site ID](ayon_launcher_artist_advanced.md#site-id).

### Exit

Exit and close the AYON Launcher desktop app.