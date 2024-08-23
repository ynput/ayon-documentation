---
id: addon_aftereffects_artist
title: After Effects Artist Docs
sidebar_label: After Effects
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<ReactMarkdown>
{versions.Aftereffects_Badge}
</ReactMarkdown>

<!-- based on PS implementation, same principle and menu -->
## Available Tools

-   [Work Files](artist_tools_workfiles)
-   [Create](artist_tools_creator)
-   [Load](artist_tools_loader)
-   [Publish](artist_tools_publisher)
-   [Manage](artist_tools_inventory)

## AE Extension installation

:::info
Once your admin has activated `After Effects` in the production bundle, you need to run the AYON launcher at least once. This allows the launcher to download the addon to the correct location on your computer. 
After that, you can continue with the installation instructions for the After Effects extension.
:::

<Tabs
groupId="platforms"
defaultValue="win"
values={[
{label: 'Windows', value: 'win'},
{label: 'Linux', value: 'linux'},
{label: 'Mac', value: 'mac'},
]}>

<TabItem value="win">

1. Use your favorite app to install extensions. We recommend using [Anastasyi's Extension Manager](https://install.anastasiy.com/).
2. Locate and install the `extension.zxp` file. You can find it in the `AppData` folder, typically at `c:\Users\YOUR_USER\AppData\Local\Ynput\AYON\addons\aftereffects_X.X.X\ayon_aftereffects\api`.

:::tip
You can quickly navigate to the local app data using the environment variable shortcut: `%LOCALAPPDATA%`. For example, using `%LOCALAPPDATA%\Ynput\AYON\addons` as path to see your installed addons.
:::

</TabItem>

<TabItem value="linux">

1. Use your favorite app to install extensions.
2. Locate and install the `extension.zxp` file. You can find it in the user data folder, typically at `~/.local/share/Ynput/AYON/addons/aftereffects_X.X.X/ayon_aftereffects/api`.

</TabItem>

<TabItem value="mac">

1. Use your favorite app to install extensions. we recommend using [Anastasyi's Extension Manager](https://install.anastasiy.com/).
2. Locate and install the `extension.zxp` file. You can find it in the `Application Support` folder, typically at `~/Library/Application Support/Ynput/AYON/addons/aftereffects_X.X.X/ayon_aftereffects/api`.

</TabItem>

</Tabs>

## Implemented functionality

AfterEffects implementation currently allows you to import and add various media to composition (image plates, renders, audio files, video files etc.) and send prepared composition for rendering to Deadline or render locally. 

## Usage

When you launch AfterEffects you will be met with the Workfiles app. If don't have any previous workfiles, you can just close this window.

Workfiles tools takes care of saving your .AEP files in the correct location and under a correct name. You should use it instead of standard file saving dialog.

In AfterEffects you'll find the tools in the `AYON` extension:

![Extension](assets/photoshop_extension.png) <!-- same menu as in PS -->

You can show the extension panel by going to `Window` > `Extensions` > `AYON`.

:::note guide
On newer MacOS you need to:
- go to `Applications/Adobe AfterEffects XXXX`
- right clicking on the `Adobe AfterEffects XXXX.app`
- then `Get Info`, check `Open using Rosetta`
:::

### Publish

When you are ready to share some work, you will need to publish it. This is done by opening the `Publisher` through the `Publish...` button.

There is always instance for workfile created automatically (see 'workfileCompositing' item in `Products to publish` column.) This allows to publish (and therefore backup) workfile which is used to produce another publishable elements (as `image` and `review` items).

Main publishable item in AfterEffects will be of `render` product type. Result of this item (instance) is picture sequence that could be a final delivery product or loaded and used in another DCCs.

First select existing composition and then press `Create >>>` in middle column of `Publisher`.

After this process you should have something like this:

![Highlights](assets/aftereffects_publish_instance.png)

Name of publishable instance (eg. product name) could be configured with a template in `project_settings/global/tools/creator/product_name_profiles`.
(This must be configured by admin who has access to AYON Settings.)

Trash icon under the list of instances allows to delete any selected `render` instance.

Workfile instance will be automatically recreated though. If you do not want to publish it, use pill toggle on the instance item.

If you would like to modify publishable instance, click on `Publish` tab at the top. This would allow you to change name of publishable instances, disable them from publishing, change their task etc.

Publisher allows publishing into different context, just click on any instance, update `Variant`, `Asset` or `Task` in the form in the middle and don't forget to click on the 'Confirm' button.

#### RenderQueue

AE's Render Queue is required for publishing locally or on a farm. Artist needs to configure expected result format (extension, resolution) in the Render Queue in an Output module. 
Currently its expected to have only single render item per composition in the Render Queue.


AE might throw some warning windows during publishing locally, so please pay attention to them in a case publishing seems to be stuck in a `Extract Local Render`.

#### Repair Validation Issues

If you would like to run validation rules set by your Studio, click on funnel icon at the bottom right. This will run through all enabled instances, you could see more information after clicking on `Details` tab.

If there is some issue in validator phase, you will receive something like this:
![Validation error](assets/aftereffects_publish_failed.png)

All validators will give some description about what the issue is. You can inspect this by clicking on items in the left column.

If there is an option of automatic repair, there will be `Repair` button on the right. In other case you need to fix the issue manually.
(By deleting and recreating instance, changing workfile setting etc.)

#### Render instance options

There are currently 2 options of `render` item:
- Render of farm - allows offload rendering and publishing to Deadline - requires Deadline module being enabled
- Validate Scene Settings - enables validation plugin which controls setting in DB (or asset control system like Ftrak) and scene itself

![Configuration of render instance](assets/aftereffects_render_instance.png)

#### Buttons on the bottom right are for:
- `Refresh publishing` - set publishing process to starting position - useful if previous publish failed, or you changed configuration of a publish
- `Stop/pause publishing` - if you would like to pause publishing process at any time
- `Validate` - if you would like to run only collecting and validating phases (nothing will be published yet)
- `Publish` - standard way how to kick off full publishing process

### Load

When you want to load existing published work, you can use the `Loader` tool. You can reach it in the extension's panel.

![Loader](assets/loader.png) <!-- picture needs to be changed -->

The supported product types for loading into AfterEffects are:

- `image`
- `plate`
- `render`
- `prerender`
- `review`
- `audio`
- `background` `(set of images sorted in predefined order)`

To load an item, right-click on the product you want and choose a representation you want to load:

![Loader](assets/loader_load.gif)

### Manage

Now that we have some content loaded, you can manage which version is loaded. This is done through the `Scene Manager`. You can reach it through the extension's `Manage` button.

:::note
Loaded images have to stay as smart layers in order to be updated. If you rasterize the layer, you can no longer update it to a different version using AYON tools.
:::

![Loader](assets/manage.png)

You can switch to a previous version of the image or update to the latest.

![Loader](assets/manage_switch.gif)
![Loader](assets/manage_update.gif)

#### Support help
If you would like to ask for help admin or support, you could use any of the three options on the `Note` button on bottom left:
- `Go to details` - switches into a more detailed list of published instances and plugins.
- `Copy report` - stash full publishing log to a clipboard
- `Export report` - save log into a file for sending it via mail or any communication tool

If you are able to fix the workfile yourself, use the first button on the right to set the UI to initial state before publish. (Click the `Publish` button to start again.)

#### Legacy instances

All screenshots from Publish are from updated dialog, before publishing was being done by regular `Pyblish` tool.
New publishing process should be backward compatible, eg. if you have a workfile with instances created in the previous publishing approach, they will be translated automatically and
could be used right away.

If you hit on unexpected behaviour with old instances, contact support first, then you could try to delete and recreate instances from scratch.
Nuclear option is to purge workfile metadata in `Window > Metadata > Basic > Label`. This is only for most determined daredevils though!

### Setting section

Composition properties should be controlled by state in Asset Management System (Ftrack etc). Extension provides couple of buttons to trigger this propagation.

#### Set Resolution

Set width and height from AMS to composition.

#### Set Frame Range

Start frame and duration in workarea is set according to the settings in AMS. Handles are incorporated (not inclusive).
It is expected that composition(s) is selected first before pushing this button!

#### Apply All Settings

Both previous settings are triggered at same time.

### Experimental tools

Currently empty. Could contain special tools available only for specific hosts for early access testing.


### Workfile builder section

Next 3 menu items handle creation and usage advanced workfile builder. This could be used to prepare workfile template with placeholders for loaded items and publishable items.
This allow to build template with layers for guides, any text layers and layer for image content which get dynamically populated when template is used an populated by an artist.

#### Create placeholder

Load or Create placeholders could be used to provide dynamic content or preparation steps for publish.

##### Load Placeholder

This one provide way how to load particular representation for particular product for particular asset for particular task.
Eg. Whenever artist start `animation` task they want to load `png` representation of `imageMain` product of current context's asset.

![Load placeholder](assets/aftereffects_load_placeholder.png)

#### Create Placeholder

This allows to create new composition and when populated it will be enhanced with metadata for publish instance which will be created.

![Create placeholder](assets/aftereffects_create_placeholder.png)


### Example

This is how it looks when `Load placeholder` was used to create `LOADERPLACEHOLDER` item which is added as a layer into `CREATEPLACEHOLDER` composition
created by `Create placeholder`.

![Prepared template](assets/aftereffects_prepared_template.png)

Load placeholder was configured to load `image` product type, product with name `imageMain` and `png` representation.

Any additional layers could be added into composition, when `Build Workfile from template` will be used by an artist, load placeholders will be replace
by loaded item(s).

![Prepared template](assets/aftereffects_populated_template.png)

Same prepared template could be used for any asset, in each case correct asset according to context will be used automatically.