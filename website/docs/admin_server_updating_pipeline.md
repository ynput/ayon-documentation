---
id: admin_server_updating_pipeline
title: Updating Pipeline to latest Release
sidebar_label: Updating Pipeline
description: Information for admins about updating the pipeline release.
toc_max_heading_level: 5
---

:::tip Pipeline releases
Pipeline releases are official bundles with the latest tested and stable addons, launchers and their dependencies for your pipeline.
:::

The `Update Pipeline` tool is designed to be user-friendly, transparent, and fast. It automatically detects which addons need updates and identifies the platforms you’re already using (whether it’s MacOS, Windows, or Linux). The update process only requires two simple clicks, select the menu option, and hit the `Update Pipeline` button.

:::info
Keep in mind This will not affect your existing setup, a new bundle will be created for the new release.
:::

![](assets/server/admin/update_pipeline.png)

The `Update Pipeline` UI is pre-configured, but you can adjust it by clicking the `change` button next to `Addons` and `AYON launchers`.

![](assets/server/admin/update_pipeline_configuration.png)

:::info
Once the update begins, it should not be interrupted. In the rare event the update fails to complete, restarting the server will cancel the download process.
:::

:::tip Next Steps
Once the update is complete, you can begin testing it by setting it to staging. A pop-up window will appear to help you copy settings from existing bundles. The same process applies when setting it to production, but be aware that this may affect your current setup.

![](assets/server/admin/copy_settings_popup.png)
:::