---
id: addon_openrv_artist
title: OpenRV Artist Docs
sidebar_label: OpenRV
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.OpenRV_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## OpenRV integration

Open RV is an image and sequence viewer for VFX and animation artists. Open RV is high-performant, hardware accelerated, and pipeline-friendly.

## AYON global tools

-   [Load](artist_tools_loader)
-   [Publish](artist_tools_publisher)
-   [Manage (Inventory)](artist_tools_inventory)
-   [Work Files](artist_tools_workfiles)

## Usage

When you launch OpenRV you will be met with the Workfiles app. If you don't have any previous workfiles, you should create initial one or just close this window. 
Created workfile with proper naming is necessary for publishing though.

You should find `Ayon` menu next to `Window`. All Ayon target publish operations are triggered from there.


## Load

You can load any image, image sequences or movies (`.mov`, `.mp4`) via `Load` option in `Ayon` menu.

![Ayon Loader](assets/openrv_load.png)

(You could confirm or re-arrange order of loaded elements in `Tools > Session Manager`).

## Manage

`Manage` options prints a list of loaded elements and allows to update them to latest version if necessary.

![Ayon Scene Inventory](assets/openrv_manage.png)

## Publish

Whenever you are ready to publish final product of a review, press `Publish` button. This will open `Publisher` dialog.

An instance of `workfile` product type will be created automatically for you. This a primary product type that gets versioned and tracked in `Ayon`.
It produces versioned `.rv` workfile.

![Ayon Publish](assets/openrv_publish.png)

Hit `Publish` button in bottom right corner whenever ready. If there are no validation issues, `workfile` instance should be published and current `working` workfile 
versioned up.
