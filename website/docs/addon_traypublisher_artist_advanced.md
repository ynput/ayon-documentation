---
id: addon_traypublisher_artist_advanced
title: Tray Publisher CLI Interface
sidebar_label: CLI Interface
description: Advanced usage of Tray Publisher.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.TrayPublisher_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## About

This page is dedicated to advanced users who'd like to leverage the CLI feature of the Tray publisher. 

## CLI Interface 

You can use CLI actions to access the publisher tool. 
This allows your to use the publisher tool from terminal. this can be helpful if you don't like using UIs or like to write automation scripts at this point you'll be able to use the tray publisher as a standalone application.

### How it works

The entry point is via using `addon` argument with `traypublisher` as value.

<Tabs
groupId="platforms"
defaultValue="win"
values={[
{label: 'Windows', value: 'win'},
{label: 'Linux', value: 'linux'},
{label: 'Mac', value: 'mac'},
]}>

<TabItem value="win">

1. Locate your AYON executable path. by default it is in `C:\Program Files\Ynput\AYON\app\AYON X.X.X`
2. Open powershell at that location and run
```powershell
.\ayon_console.exe addon traypublisher
```

</TabItem>

<TabItem value="linux">

1. Locate your AYON executable path. by default it is in `~/.local/share/AYON/app/AYON X.X.X`
2. Open terminal at that location and run
```shell
ayon addon traypublisher
```

</TabItem>

<TabItem value="mac">

1. Locate your AYON executable path. by default it is in `~/Library/Application Support/AYON/app/AYON X.X.X`
2. Open terminal at that location and run
```shell
ayon addon traypublisher
```
</TabItem>

</Tabs>


## Supported Commands

### Launch

Launch TrayPublisher tool UI.
You can use it to access the tray publisher without running AYON. It can be used as a shortcut to launch the tray publisher directly without launching AYON launcher first.

<Tabs
groupId="platforms"
defaultValue="win"
values={[
{label: 'Windows', value: 'win'},
{label: 'Linux', value: 'linux'},
{label: 'Mac', value: 'mac'},
]}>

<TabItem value="win">

```powershell
.\ayon_console.exe addon traypublisher launch
```

</TabItem>

<TabItem value="linux">

```shell
ayon addon traypublisher launch
```

</TabItem>

<TabItem value="mac">

```shell
ayon addon traypublisher launch
```
</TabItem>

</Tabs>

### CSV Ingest

Run the CSV Ingestion feature without launching the Publisher UI.
It can be helpful for running automations.

<Tabs
groupId="platforms"
defaultValue="win"
values={[
{label: 'Windows', value: 'win'},
{label: 'Linux', value: 'linux'},
{label: 'Mac', value: 'mac'},
]}>

<TabItem value="win">

```powershell
.\ayon_console.exe addon traypublisher ingestcsv --filepath '[CSV FILE ABS PATH]' --project [PROJECT_NAME] --folder-path [/FOLDER/PATH] --task [TASK NAME] --ignore-validators
```

</TabItem>

<TabItem value="linux">

```shell
ayon addon traypublisher ingestcsv --filepath '[CSV FILE ABS PATH]' --project [PROJECT_NAME] --folder-path [/FOLDER/PATH] --task [TASK NAME] --ignore-validators
```

</TabItem>

<TabItem value="mac">

```shell
ayon addon traypublisher ingestcsv --filepath '[CSV FILE ABS PATH]' --project [PROJECT_NAME] --folder-path [/FOLDER/PATH] --task [TASK NAME] --ignore-validators
```
</TabItem>

</Tabs>

- **--filepath**: The absolute path to csv file which is in root of package folder
- **--project**: The name of a project used for ingestion
- **--folder-path**: The folder path used for ingestion data (storing csv file iterations)
- **--task**: The name of task used for ingestion data iteration backup (case sensitive!)
- **--ignore-validators**: Flag argument for skipping validators

:::tip
To more about the `CSV Ingest` and getting an example CSV, please go to [CSV Ingest User Docs](addon_traypublisher_artist.md#prepare-your-csv-file)
:::