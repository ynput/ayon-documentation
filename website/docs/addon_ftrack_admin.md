---
id: addon_ftrack_admin
title: Ftrack Admin Docs
sidebar_label: Ftrack
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Ftrack_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Ftrack is currently the main project management option for AYON. This documentation assumes that you are familiar with Ftrack and its basic principles. If you're new to Ftrack, we recommend having a thorough look at [Ftrack Official Documentation](https://help.ftrack.com/en/).

## Prepare Ftrack for AYON

### Server URL
If you want to connect Ftrack to AYON you might need to make few changes in Ftrack settings. These changes would take a long time to do manually, so we prepared a few Ftrack actions to help you out. First, you'll need to launch AYON settings, enable [Ftrack module](admin_settings_system.md#Ftrack), and enter the address to your Ftrack server.

### Login
Once your server is configured, restart AYON and you should be prompted to enter your [Ftrack credentials](addon_kitsu_artist.md#How-to-use-Ftrack-in-AYON) to be able to run our Ftrack actions. If you are already logged in to Ftrack in your browser, it is enough to press `Ftrack login` and it will connect automatically.

For more details step by step on how to login to Ftrack in AYON to go [artist Ftrack login](addon_kitsu_artist.md#How-to-use-Ftrack-in-AYON) documentation.

You can only use our Ftrack Actions and publish to Ftrack if each artist is logged in.


### Custom Attributes
After successfully connecting AYON with you Ftrack, you can right-click on any project in Ftrack and you should see a bunch of actions available. The most important one is called `AYON Admin` and contains multiple options inside.

To prepare Ftrack for working with AYON you'll need to run [AYON Admin - Create/Update Custom Attributes](addon_ftrack_manager.md#create-update-custom-attributes), which creates and sets the Custom Attributes necessary for AYON to function.


## Event Server
Ftrack Event Server is the key to automation of many tasks like _status change_, _thumbnail update_, _automatic synchronization to AYON server_ and many more. Event server should run at all times to perform the required processing as it is not possible to catch some of them retrospectively with enough certainty.

### What you need?
1. You need a user which is used to connect to ftrack server, and it's API key.
2. A machine where the services will be running.

### Which user to use?
-   should have `Administrator` role
-   the same user should not be used by an artist
-   the user should have permissions for private projects you want to sync


### How to run ftrack event server
At this moment event server consist of 2 processes Leecher and Processor. There are prepared docker images for each process. We do recommend to use ASH (AYON service host) to be able to control them from AYON server web. In that case make sure you have running ASH and create both services in **Services** on server.

There is option to run the services manually, in that case please check ftrack addon repository for more information.

### Where to run event server

We recommend you to run event server on stable server machine with ability to connect to AYON server and Ftrack web server. Best practice we recommend is to run event server as service. It can be Windows or Linux.
For a well functioning ftrack event server, we recommend a linux virtual server with Ubuntu or CentOS. CPU and RAM allocation needs differ based on the studio size, but a 2GB of ram, with a dual core CPU and around 4GB of storage should suffice.

* * *

## Ftrack events

Events are helpers for automation. They react to Ftrack Web Server events like change entity attribute, create of entity, etc.

### Sync to AYON

Automatic [synchronization to pipeline database](addon_ftrack_manager.md#synchronization-to-ayon-server).

This event updates entities on their changes Ftrack. When new entity is created or existing entity is modified. Interface with listing information is shown to users when [synchronization rules](addon_ftrack_manager.md#synchronization-rules) are not met. This event may also undo changes when they might break pipeline. Namely _change name of synchronized entity_, _move synchronized entity in hierarchy_.

### Synchronize Hierarchical and Entity Attributes

Auto-synchronization of hierarchical attributes from Ftrack entities.

Related to [Synchronize to AYON database](addon_ftrack_manager.md#synchronization-to-ayon-server) event _(without it, it makes no sense to use this event)_. Hierarchical attributes must be synchronized with special way so we needed to split synchronization into 2 parts. There are [synchronization rules](addon_ftrack_manager.md#synchronization-rules) for hierarchical attributes that must be met otherwise interface with messages about not meeting conditions is shown to user.

### Update Hierarchy thumbnails

Push thumbnails from version, up through multiple hierarchy levels

### Update status on task action

Change status of next task from `Not started` to `Ready` when previous task is approved.

Multiple detailed rules for next task update can be configured in the settings.

### Sync status from Task to Parent

List of parent object types where this is triggered ("Shot", "Asset build", etc. Skipped if it is empty)

### Sync status from Version to Task

Updates Task status based on status changes on its Asset Version.

The issue this solves is when Asset version's status is changed but the artist assigned to Task is looking at the task status, thus not noticing the review.

This event makes sure statuses Asset Version get synced to it's task. After changing a status on version, this event first tries to set identical status to version's parent (usually task). But this behavior can be tweaked in settings.

### Sync status on first created version

This event handler allows setting of different status to a first created Asset Version in Ftrack.

This is useful for example if first version publish doesn't contain any actual reviewable work, but is only used for roundtrip conform check, in which case this version could receive status `pending conform` instead of standard `pending review`

### Update status on next task
Change status on next task by task types order when task status state changed to "Done". All tasks with the same Task mapping of next task status changes From → To. Some status can be ignored.

## Publish plugins

### Collect Ftrack Family

Reviews uploads to Ftrack could be configured by combination of hosts, families and task names.
(Currently implemented only in Standalone Publisher, Maya.)

#### Profiles

Profiles are used to select when to add Ftrack family to the instance. One or multiple profiles could be configured, Families, Task names (regex available), Host names combination is needed.

Eg. If I want review created and uploaded to Ftrack for render published from Maya , setting is:

Host names: 'maya'
Families: 'render'
Add Ftrack Family: enabled

![Collect Ftrack Family](assets/ftrack/ftrack-collect-main.png)

#### Advanced adding if additional families present

In special cases adding 'ftrack' based on main family ('Families' set higher) is not enough.
(For example upload to Ftrack for 'plate' main family should only happen if 'review' is contained in instance 'families', not added in other cases. )

![Collect Ftrack Family](assets/ftrack/ftrack-collect-advanced.png)
