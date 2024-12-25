---
id: admin_server_deployment
title: Server deployment
sidebar_label: Server deployment
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Requirements

-   Docker with the compose plugin. To install the latest Docker, you can use this script: [https://get.docker.com](https://get.docker.com)
-   GNU Make (on Linux and MacOS)
-   If you use a stand-alone `docker-compose` script instead of the compose plugin, make sure to use `docker-compose` wherever `docker compose` is used in this tutorial.
-   For production, using Linux is highly recommended. However, for evaluation purposes, Windows with WSL (Windows Subsystem for Linux) can be used.

## Installation

<Tabs
groupId="platforms"
defaultValue="linux"
values={[
{label: 'Windows', value: 'win'},
{label: 'Linux', value: 'linux'},
{label: 'Mac', value: 'mac'},
]}>

<TabItem value="linux">
<ReactMarkdown>

1. Clone [ayon-docker repository](https://github.com/ynput/ayon-docker) to your local machine.
2. Tweak the `docker-compose.yml` file according to your requirements.
3. You may use the `.env` file to set environment variables.
4. Manually install addons to the `addons` directory or automatically install later on (recommended).
5. Modify the default settings in the `settings/template.json` file (see [provisioning page](admin_server_provisioning.md#configuration-file)).
6. Run the stack using `docker compose up -d`
7. Run `make setup`
8. Once the setup is complete, navigate to [http://localhost:5000/](http://localhost:5000/)
9. If you haven't used `template.json` file to create a user, you will be prompted to create one now.

</ReactMarkdown>
</TabItem>

<TabItem value="win">
<ReactMarkdown>

1. Clone [ayon-docker repository](https://github.com/ynput/ayon-docker) to your local machine.
2. Tweak the `docker-compose.yml` file according to your requirements.
3. You may use the `.env` file to set environment variables.
4. Comment-out or delete the `- "/etc/localtime:/etc/localtime:ro"` line from the `docker-compose.yml` file.
5. Manually install addons to the `addons` directory or automatically install later on (recommended).
6. Modify the default settings in the `settings/template.json` file (see [provisioning page](admin_server_provisioning.md#configuration-file)).
7. Run the stack using `docker compose up -d`
8. Run `manage.ps1 setup` to set up the server. If you get a permission error, you may need to set your execution policy to `RemoteSigned` by running `Set-ExecutionPolicy RemoteSigned` in PowerShell [stackoverflow](https://stackoverflow.com/questions/10635/why-are-my-powershell-scripts-not-running).
9. Once the setup is complete, navigate to [http://localhost:5000/](http://localhost:5000/) in your web browser and log in as `admin/admin`.

</ReactMarkdown>
</TabItem>

<TabItem value="mac">
<ReactMarkdown>

1. Clone [ayon-docker repository](https://github.com/ynput/ayon-docker) to your local machine.
2. Tweak the `docker-compose.yml` file according to your requirements.
3. You may use the `.env` file to set environment variables.
4. Manually install addons to the `addons` directory or automatically install later on (recommended).
5. Modify the default settings in the `settings/template.json` file (see [provisioning page](admin_server_provisioning.md#configuration-file)).
6. Run the stack using `docker compose up -d`
7. Run `make setup`
8. If you see an error saying "port 5000 is already in use", there are 2 solutions:
   * **RECOMMENDED**: Set the port to 5001 instead of 5000 in `docker-compose.yml` (`ports: ["5001:5000"]`) and restart from step 6.
   * Alternative: Turn off `System Settings > General > AirDrop & Handoff > AirPlay Receiver` and restart from step 6.
9. Once the setup is complete, navigate to [http://localhost:5000/](http://localhost:5000/) in your web browser and log in as `admin/admin`.

</ReactMarkdown>
</TabItem>

</Tabs>

## Updates

If you are using our official docker images and docker compose for AYON server deployment, updating is as easy as

```shell
docker pull ynput/ayon:latest #replace with corresponding image version if you don't want latest
docker compose up -d --build
```
