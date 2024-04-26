---
id: addon_traypublisher_admin
title: Tray Publisher
sidebar_label: Tray Publisher
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.TrayPublisher_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Project settings can have project specific values. Each new project is using studio values defined in **studio settings** but these values can be modified or overridden per project.

Refer to Settings related to [Working with settings](admin_settings) for more details.

## Creator Plugins

Contains list of implemented families to show in middle menu in Tray Publisher. Each plugin must contain:

- **Product type**
- **Label**
- **Icon**
- **Extensions**

![example of simple creator plugin](assets/admin_traypublisher_settings_simple.png)
![example of complex creator plugin](assets/admin_traypublisher_settings_simple_extensions.png)



# CSV publishing

CSV data ingesting can be done through TrayPublisher in both interactive and headless mode. Settings allow for configuration of CSV columns and data expectations. Each column can be configured for data type or requirement. It is also possible to define a default value when data is missing.

:::info CSV publishing
This is a working prototype and doesn't include **Creating missing hierarchy folders in case they are missing**. At the moment the data in CSV has to be complied with preflight check so no validations needs to be done on them.
:::

## Feature settings

To be able to use the feature it has to be first enabled and configured in the Studio settings under Traypublisher addon. Here you can define the CSV columns and their requirements.

![CSV Ingest settings](assets/traypublisher/csv_publishing_settings.png)
1. Enable the feature in `ayon+settings://traypublisher/create/IngestCSV`
2. Define the columns and their requirements in `ayon+settings://traypublisher/create/IngestCSV/columns_config/columns`
3. Define Representation requirements in `ayon+settings://traypublisher/create/IngestCSV/representations_config/representations`
4. Save the settings and you are good for CSV ingestion

## CLI interface
Example of CLI command for CSV ingestion:

```powershell
cd "C:\Program Files\Ynput\AYON 1.0.2"
.\ayon_console.exe addon traypublisher ingestcsv --filepath '[CSV FILE ABS PATH]' --project [PROJECT_NAME] --folder-path [/FOLDER/PATH] --task [TASK NAME] --ignore-validators
```

- **--filepath**: The absolute path to csv file which is in root of package folder
- **--project**: The name of a project used for ingestion
- **--folder-path**: The folder path used for ingestion data (storing csv file iterations)
- **--task**: The name of task used for ingestion data iteration backup (case sensitive!)
- **--ignore-validators**: Flag argument for skipping validators

## Testing data and its use:
1. Download testing package [ay_240319_0001.zip](https://github.com/ynput/ayon-core/files/14651928/ay_240319_0001.zip)
2. Before you run the command make sure shots are created in your testing project (this process is not creating shot folders, it is only creating products, versions and representations)
Here is what I am having and it is in sync with the testing csv data:

![image](https://github.com/ynput/ayon-core/assets/40640033/577cc68e-9ffb-431e-ae07-e4ef9a18eb5d)
1. Project: Moawiya
2. CLI context: `ayon+entity://Moawiya/editorial?task=edit`
3. CSV folder: `ayon+entity://Moawiya/shots/mw_110_01_0060?task=comp`
4. CSV folder: `ayon+entity://Moawiya/shots/mw_110_01_0080?task=comp`
5. Follow the CLI command above and ingest the data.