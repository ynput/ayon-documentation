---
id: dev_dev_mode
title: Developer mode
sidebar_label: Developer mode
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Development usage
As described in admin documentation, AYON launcher can be launched in `Production` or `Staging` mode. For development is added another state `Development`. Development state requires to create develop bundles on server.

There are 2 ways how to start in development mode using command line arguments:
1. Start AYON launcher with `--bundle <dev bundle name>`. Dev bundle cannot be set as production or staging.
2. Using argument flag `--use-dev`. With this argument a dev bundle is found for logged user.

Both options can be defined with environment variables `AYON_BUNDLE_NAME` and `AYON_USE_DEV` (value `1` to enable).

Develop mode automatically disregard any production or staging information.

### Develop mode benefits
First of all dev bundles can enable/disable addons and change their versions on server.

Benefit for AYON launcher is that it is possible to enable custom path to addon code. Which gives option to point directly to repository so changes in repository codebase is propagated when AYON launcher is started.

:::note
Some addons have more complicated preparation of code for AYON launcher which reduce this benefit. And changes of server part of an addon (like settings) still require to upload changes to server.
:::

:::important
Custom paths to addons only affects AYON launcher code and has no effect for server side code.
:::

### Steps to enable develop mode
1. Log in to AYON server as admin user.
2. In user settings select your user, enable `Developer` and save changes.
   ![dev_user_settings](assets/ayon_user_developer.png)
3. At top right corner should appear `Developer mode` checkbox (you may need to refresh page).
   ![dev_user_settings](assets/ayon_developer_mode.png)
4. Enable the checkbox.

### Steps to create develop bundle
1. Go to Bundles page.
2. Click on `Add new bundle`.
3. Form for bundle creation should have `Dev bundle` checkbox and `Assigned dev`.
4. Make sure `Dev bundle` is enabled.
5. Assign yourself to the bundle (you can have assigned only one dev bundle at a time).
6. Choose addons and their versions.
7. Confirm Create new bundle.
   ![dev_user_settings](assets/ayon_develop_bundle.png)

Select the bundle in list. You should be able to change addon versions and change custom paths.

:::info
Custom addon paths must be enabled. If custom path is enabled it is always used even if the path is not filled.
:::
