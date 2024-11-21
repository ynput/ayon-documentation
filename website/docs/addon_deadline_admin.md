---
id: addon_deadline_admin
title: Deadline Admin Docs
sidebar_label: Deadline
description: Deadline Addon Admin Documentation
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Deadline_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

AYON integration for Deadline primarily uses the Deadline web service to send jobs.

The integration consists of two parts:
- The Deadline custom plugins.
- A `GlobalJobPreLoad` Deadline Script (triggered for each Deadline job submitted via the Deadline addon).

The `GlobalJobPreLoad` script manages the population of submitted jobs with the correct environment variables, using settings from the AYON Deadline Plug-in.

Additionally, the addon streamlines Unreal Deadline submissions by utilizing the version control addon. See [Unreal Engine 5 Plug-in](#unreal-engine-5-plug-in).


## Preparation

For [AWS Thinkbox Deadline](https://www.awsthinkbox.com/deadline) support, you'll need to set up a few things in both AYON and Deadline itself.

1. **Deploy AYON Launcher**: Install the AYON launcher on all nodes of the Deadline farm. See [Install & Run](admin_launcher_distribute.md) for guidance.
2. **Set Up Deadline Web API Service**: Follow the instructions [here](https://docs.thinkboxsoftware.com/products/deadline/10.1/1_User%20Manual/manual/web-service.html) to set up the Deadline Web API service.
3. **Install Custom Plugin and Scripts**: Copy the contents of `ayon/modules/deadline/repository` to `path/to/your/deadline/repository`. Refer to [Deadline Custom Plug-ins](#deadline-custom-plug-ins) for more details.
4. **Create a New AYON Bundle**: Include the Deadline Addon version in your new AYON Bundle.
5. **Configure Deadline Addon Settings**: See [Addon Settings](#addon-settings) for configuration details.
6. **Select Deadline Server**: By default, it uses the `default` server defined in the studio settings. See [System Deadline Webservice Info](#system-deadline-webservice-info). However, you can choose which Deadline server should be used for your project at  `ayon+settings://deadline/deadline_server?project=YOUR_PROJECT`.
7. **Get AYON_API_KEY**: Visit `http://YOUR_AYON/settings/users`, create a new service account user, and click on generate a new key. Store this key as you'll need it for the Deadline [AYON Plug-in](#ayon-plug-in) configuration.

:::note guide
You could check [deadline guide](https://community.ynput.io/t/ayon-openpype-deadline-setup/468) for more detailed steps and additional tips.
:::

### Authentication
Deadline supports username and passwords authentication to protect webservice from unwanted requests. (In Deadline `Tools>Configure Repository Options>Web Service Settings>Require Authentication`)

![](assets/deadline/deadline_authentication.png)

For this, admins need to enable authentication in the addon settings. See [System Deadline Webservice Info](#system-deadline-webservice-info).


### Deadline Custom Plug-ins

The AYON Deadline addon requires a few custom plugins to be installed.

:::info
The Deadline custom plugins and the GlobalJobPreLoad script come with the AYON Deadline addon.
In the Deadline addon, you'll find a repository overlay that you can copy into the Deadline repository to make it work.

To get the custom plugins, you can either download the addon `.zip` package from [ayon-deadline/releases - GitHub](https://github.com/ynput/ayon-deadline/releases) or find the downloaded one using the launcher on your machine. By default, the addon downloads to the path saved in the `AYON_ADDONS_DIR` environment variable.
The files should be in the `deadline_x.x.x/client/ayon_deadline/repository` directory.
:::

Custom Plugins:
- [AYON Plug-in](#ayon-plug-in)
- [CelAction Plug-in](#celaction-plug-in)
- [Harmony AYON Plug-in](#harmony-ayon-plug-in)
- [Unreal Engine 5 Plug-in](#unreal-engine-5-plug-in)
- [Husk Standalone Plug-in](#husk-standalone-plug-in) *This one is not shipped with deadline addon. Get it from [Husk Standalone Deadline Submitter - Github](https://github.com/BigRoy/HuskStandaloneSubmitter)*

#### AYON Plug-in

The `AYON` Deadline Plug-in must be configured to point to a valid AYON executable location. The executable need to be installed to
destinations accessible by DL process. Check permissions (must be executable and accessible by Deadline process)

- Enable `Tools > Super User Mode` in Deadline Monitor
- Go to `Tools > Configure Plugins...`, find `AYON` in the list on the left side, find location of AYON
executable. It is recommended to use the `ayon_console` executable as it provides a bit more logging.
- In case of multi OS farms, provide multiple locations, each Deadline Worker goes through the list and tries to find the first accessible
 location for itself.
- provide your Ayon server address and API key for service account generated in step 6 of [Preparation](#Preparation)
- provide additional servers if needed, they should follow this format: `{server url}@{token}`, e.g., `http://11.2.3.47@myapikey1`.

![](assets/deadline/deadline_configure_plugin.png)

#### CelAction Plug-in

It's required for CelAction submissions via deadline addon.
![](assets/deadline//celaction_dl_plugin.png)

#### Harmony AYON Plug-in

It's required for Harmony submissions via deadline addon.
![](assets/deadline/harmonyayon_dl_plugin.png)

#### Unreal Engine 5 Plug-in

It extends the official Unreal5 Plugin to support Unreal Perforce submissions.
It implements `PreLoad` scripts that syncs your project to change list id within the exported `changelist` before rendering.
For more info, check [Version Control - Support for Unreal and Deadline](addon_version_control_admin_get_started.md#support-for-unreal-and-deadline) and [Version Control - Deadline](addon_version_control_artist.md#deadline)

:::info
Unreal submissions via deadline addon requires `ayon-version-control` addon and configured (P4 credentials etc.). See [Version Control - Addon Settings](addon_version_control_admin_settings.md#addon-settings)
:::

![](assets/deadline//unreal5_dl_plugin.png)


#### Husk Standalone Plug-in

It's required for Houdini `usdrender` submissions via deadline addon.

:::info
This plugin is not shipped with `ayon-deadline` addon. 
It's also a repository overlay, so you can copy its content directly to your Deadline repository. Get it from [Husk Standalone Submitter](https://github.com/BigRoy/HuskStandaloneSubmitter)

If you have the `PATH` configured in your application addon as mentioned in  [How to submit houdini patch version to deadline?](addon_houdini_admin.md#how-to-publish-lookdev-from-houdini-), then you'd be able to only use `husk.exe` instead of the full path.
![](assets/deadline/husk_standalone_plugin.png)
:::

## Addon Settings


### System Deadline Webservice Info
> Setting Location: `ayon+settings://deadline/deadline_urls`

![Webservice url](assets/deadline/webserver_config.png)


1. **Server Name**: The designated name for a deadline server.
2. **URL**: The IP or hostname, including the port (e.g., a locally running DL: `http://127.0.0.1:8081`).
3. **Require Authentication**: The DL webservice may require a username and password. See [Authentication](#authentication).
4. **Don't verify SSL**: Enable this if your DL webservice uses SSL (e.g., on `https://`). Self-signed certificates might trigger an error, so disable certificate verification here.
5. **Default Username**: If `Require Authentication` is enabled, this field allows you to set a single username for all artists publishing to Deadline.
6. **Default Password**: The password for the default username.
7. **+**: Add more Deadline servers.

:::info
If each artist machine needs separate credentials, the admin must provide them in `Site Settings` on the `Studio Settings` page.

![](assets/deadline/studio_settings.png)
:::

## Addon Publish Plugins

### Collect Job Info
> Setting Location: `ayon+settings://deadline/publish/CollectJobInfo`

![](assets/deadline/collect_job_info.png)

A universal Deadline job info collector used across different DCCs/Hosts. When enabled, it will select the matching profile for your DCC.
*It doesn't affect the AYON publish jobs or additional jobs submitted by publish plugins like export job in Houdini.*

1. **Enable**: Turn on the main toggle of the plugin. Disable it to have the system ignore it.
2. **Profiles**: Provides a filter for matching DCCs and specifies the job info to add.

#### Profiles
<div class="row markdown">
<div class="col">

- **Host name**: Pipeline integration name provided by an AYON addon.
- **Task Types**: Select from a list of task types to determine which ones the filter profile will affect. Leave blank to apply the profile to all tasks.
- **Task names**: List of task names to determine which ones the filter profile will affect.
- **Frames per Task**: Number of frames per task (also known as `Chunk Size`).
- **Priority**: Job’s priority (default is 50).
- **Group**: Group to submit to.
- **Limit Groups**: Specifies the limit groups this job belongs to (default is blank).
- **Primary Pool**: Pool the job is submitted to (default is none).
- **Secondary Pool**: Secondary pool the job can spread to if machines are available. If not specified, the job won't use a secondary pool.
- **Machine Limit**: Maximum number of machines this job can be rendered on simultaneously (default is 0, meaning unlimited).
- **Machine List**: Specifies which Workers are on the job’s list (default list is an allow list).
- **Machine List is a Deny**: Enable to use the `Machine list` as a deny list.
- **Number of concurrent tasks**: Maximum number of tasks a Worker can render at a time (default is 1).
- **Department**: Department the job belongs to. Used to group jobs in the DL monitor; doesn't affect rendering.
- **Delay Job**: Start time delay applied to the submission date.
- **Use Published Scene**
- **Use Asset dependencies**
- **Workfile Dependency**
- **Multiprocess**
- **Additional JobInfo data**: Dictionary (JSON parsable) to add to `JobInfo` of submission.
- **Additional PluginInfo data**: Dictionary (JSON parsable) to add to `PluginInfo` of submission.
- **Exposed Overrides**: Expose the attributes in this list to the user when publishing.
- **+**: Add more profiles.

</div>
<div class="col">

![](assets/deadline/collect_job_info_profile.png)

</div>
</div>

### Add AYON server to farm job
> Setting Location: `ayon+settings://deadline/publish/CollectAYONServerToFarmJob`

:::tip
This feature is handy for submissions from a separate AYON dev server.
:::

![](assets/deadline/add_ayon_server_to_farm_job.png)

When enabled, submit your current `AYON_SERVER_URL` with the job to enforce using your current server. This requires modifying the Deadline AYON plugin configuration to add additional AYON servers. See [Deadline AYON Plug-in](#ayon-plug-in).

### Validate Expected Files
> Setting Location: `ayon+settings://deadline/publish/ValidateExpectedFiles`

![](assets/deadline/validate_expected_files.png)

1. **Enable**: Turn on the main toggle of the plugin. Disable it to have the system ignore it.
2. **Active**: Disable this to deactivate the plugin. The system will recognize the plugin, but it won't function.
3. **Allow user change frame range**
4. **Trigger on families**: List of `families` to determine which ones the validator will affect.
5. **Trigger for plugins**: List of `targets` to determine which ones the validator will affect.

### Fusion Submit to deadline
> Setting Location: `ayon+settings://deadline/publish/FusionSubmitDeadline`

![](assets/deadline/fusion_to_deadline.png)

- **Deadline Plugin**: Choose the default deadline plugin for Fusion submissions: `Fusion` or `FusionCmd`.

### Houdini Submit render to deadline
> Setting Location: `ayon+settings://deadline/publish/HoudiniSubmitDeadline`

:::info
To save on licenses, *in compliance with the native Deadline node,* Houdini render submission supports splitting the render into two jobs:
- **Export Job:** This job uses Houdini to handle exporting caches or intermediate render files, like `.ass` or `.ifd`.
- **Render Job:** This job uses a separate Deadline plugin from Houdini to process these intermediate files, such as `Arnold` for `.ass` or `Mantra` for `.ifd`.
:::

![](assets/deadline/houdini_render_to_deadline.png)

This publish plugin provides additional settings specifically for the `export job`.

- **Export Priority**: Export Job’s priority (default is 50).
- **Export Chunk Size**: Export Job's chunk size. (also known as `Number of frames per task `).
- **Export Group**: Group to submit the export job to.
- **Export Limit Groups**: Specifies the limit groups the export job belongs to (default is blank).
- **Export Machine Limit**: Maximum number of machines the export job can be rendered on simultaneously (default is 0, meaning unlimited).

### Maya Submit to deadline
> Setting Location: `ayon+settings://deadline/publish/MayaSubmitDeadline`

:::info
This publish plugin can also submit Tile jobs.
Tile jobs use the same job info that matches the Maya profile but also allow you to explicitly override some settings, like `priority`.
:::

![](assets/deadline/maya_to_deadline.png)

- **Use Scene with Imported Reference**
- **Tile Priority**: Tile job’s priority (default is 50).
- **Tile Assembler Plugin**: Choose the default deadline plugin for Tile submissions:  Currently, only `Draft Tile Assembler` is available.
- **Scene patches**
    ![](assets/deadline/maya_to_deadline_scene_patches.png)
    1. **Patch name**
    2. **Patch regex**
    3. **Patch line**
    4. **+**: Add more scene patches.
- **Disable Strict Error Check profiles**

### Nuke Submit to deadline
> Setting Location: `ayon+settings://deadline/publish/NukeSubmitDeadline`

![](assets/deadline/nuke_to_deadline.png)

- **Use GPU**: Use the GPU For Rendering.
- **Node based Limit Groups**: Set limit groups based on node types in the workfile. For example, if there is a node of type X, LimitX should be added, etc.
    ![](assets/deadline/nuke_to_deadline_nuke_limit_groups.png)
    1. **Node name**
    2. **Limit Groups list**
    3. **+**: Add more items to the Limit group list
    4. **+**: Add another **Limit Groups** list for a different node name.

### Process submitted cache Job on farm
> Setting Location: `ayon+settings://deadline/publish/ProcessSubmittedCacheJobOnFarm`

![](assets/deadline/process_submitted_cache_job_on_farm.png)

It submits a dependent AYON Job to publish the exported cache.

- **Department**: Department the AYON publish job belongs to.
- **Pool**: Pool the job is submitted to.
- **Group**: Group to submit to.
- **Priority**: Job’s priority (default is 50).

### Process submitted job on farm
> Setting Location: `ayon+settings://deadline/publish/ProcessSubmittedJobOnFarm`

It submits a dependent AYON Job to publish the rendered images.

![](assets/deadline/process_submitted_job_on_farm.png)

- **Department**: Department the AYON publish job belongs to.
- **Pool**: Pool the job is submitted to.
- **Group**: Group to submit to.
- **Priority**: Job’s priority (default is 50).
- **Skip integration of representation with ext:** list of extensions that shouldn't be published.
- **List of family names to transfer to generated instances (AOVs for example):** Ensure the AOV instances have these families if present.
- **Reviewable products filter:** Add review for specific aov names.
![](assets/deadline/reviewable_products_filter.png)
   1. **AOV Filter**
       1. **host_name**: Pipeline integration name supplied by an AYON addon.
       2. **AOV Regex**: AOV regex patterns for AOV filters.
       3. **+**: Add more AOV regexes 
   2. **+**: Add more filters


## Troubleshooting

### Publishing jobs fail directly in DCCs

- Double check that all previously described steps were finished
- Check that `deadlinewebservice` is running on DL server
- Check that user's machine has access to deadline server on configured port

### Jobs are failing on DL side

Each publishing from AYON consists of 2 jobs, first one is rendering, second one is the publishing job (triggered after successful finish of the rendering job).

![Jobs in DL](assets/deadline_fail.png)

- **<font size="4"> Jobs are failing with `AYON executable was not found` error </font>**

    Check if AYON is installed on the Worker handling this job and ensure `AYON` Deadline Plug-in is properly [configured](#configuration)


- **<font size="4"> Render jobs are failing with `Got invalid credentials. Invalid API key for...` error </font>**

    If you are sure that you provided correct AYON API key in Deadline `Configure Plugin`, check if you have enabled Deadline Secrets Management. 
    
    You will need to grant access to secrets to user or machine.

    You will need to run this command on Deadline Server machine:

    `deadlinecommand secrets GrantKeyAccessToServer {SECRETS_USER} defaultKey {NODE_ID}`

    See more details [Deadline Secrets Management - GrantKeyAccessToServer](https://docs.thinkboxsoftware.com/products/deadline/10.1/1_User%20Manual/manual/secrets-management/deadline-secrets-management.html#deadline-secrets-management-command-grantkeyaccesstoserver)


- **<font size="4"> Publishing job is failing with `ffmpeg not installed` error </font>**

    AYON executable has to have access to `ffmpeg` executable, check AYON `ayon+settings://ayon_third_party`

    ![FFmpeg setting](assets/ffmpeg_path.png)

- **<font size="4"> Both jobs finished successfully, but there is no review on Ftrack </font>**

    Make sure that you correctly set published family to be send to Ftrack.

    ![Ftrack Family](assets/ftrack/ftrack-collect-main.png)

    Example: I want send to Ftrack review of rendered images from Harmony :
        - `Host names`: "harmony"
        - `Families`: "render"
        - `Add Ftrack Family` to "Enabled"

    Make sure that you actually configured to create review for published product in `ayon+settings://deadline/publish/ProcessSubmittedJobOnFarm`

    ![Ftrack Family](assets/deadline_review.png)

    Example: I want to create review for all reviewable products in Harmony :
      - Add "harmony" as a new key an ".*" as a value.


- **<font size="4"> Rendering jobs are stuck in 'Queued' state or failing </font>**

    Make sure that your Deadline is not limiting specific jobs to be run only on specific machines. (Eg. only some machines have installed particular application.)

    Check job info [profiles](#profiles).

    ![Deadline group](assets/deadline/deadline_group.png)

    Example: I have separated machines with "Harmony" installed into "harmony" group on Deadline. I want rendering jobs published from Harmony to run only on those machines.
