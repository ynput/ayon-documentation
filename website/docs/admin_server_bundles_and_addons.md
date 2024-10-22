---
id: admin_server_bundles_and_addons
title: Bundles & Addons
sidebar_label: Bundles & Addons
description: Bundles & Addons Documentation.
toc_max_heading_level: 5
---
 
## About Bundles & Addons
### Bundles vs Addon
A bundle is a set of addons.
addon is a set of code and settings used to extend AYON server and pipeline.

Bundles can be marked as `production`, `staging`, `<dev-bundle-name>` variant.

:::note Launch with different variants
You can use different variants with the launcher.
you can specify with variant to use by using the following flags with ayon launcher 
- `--use-staging`
- `--use-dev`

You can  overriding the default behavior and specifying the bundle on launch.
more info check [How to use different bundles with different projects?](https://community.ynput.io/t/how-to-use-different-bundles-with-different-projects/1096)
:::
        
:::note
Dev variant is the same as dev bundle name `<dev-bundle-name>`
Dev bundle are only accessible for the **assigned admin user**.
:::

### How Settings work

This variant is used across the addons.  
Each addon is saved on the server with different variant of settings.
The variant used in addons is exposed on the bundle.
The variant value on the bundle is like a main switch that set all the addons to use that variant value.

:::tip Settings management
For more info about setting management go to [Addon Settings](admin_server_settings_management.md#addon-settings)
:::

### Working with bundles
#### Create bundles
You can create a bundle by either one of these ways: 
- `+ Add Bundle`
- Right-Click any bundle and Select `Duplicate and Edit` shortcut `Shift+D`
- Select any bundle and click `Duplicate and Edit` button on the upper right.

#### Configure bundles

Bundles are configured on creation where you specify
- Bundle name
- Launcher version
- Dev bundle toggle
- Addon versions

After Creation these are locked and you can then only change
- Dependency Packages.
- Change version of some server addons (that don't affect the pipeline). e.g. Jira Addon.

:::note
Dev bundle supports more configurations: 
- Assigned dev
- Addon versions
- Addon client code directory. This special one allows developers to test the client code directory without uploading the addon. 
  However, they'll still need to upload the addons to update the settings on the server. 
:::

### Working with Addons
#### Install Addons

- `Addon Market`
- `Upload Addons`

:::tip
When updating pipeline release, new addons will be installed.
:::

#### Uninstall Addons
- `Uninstall Versions` button.

:::caution
WIth local server deployment, 
You can add or remove addons by extracting and deleting files from your addons directory on your ayon-docker server.
:::

:::info
Developers can upload/remove addons via ayon python api.
:::