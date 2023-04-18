---
id: admin_server_installation
title: Installing Ayon server 
sidebar_label: Server installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Requirements

- Docker with the compose plugin. To install the latest Docker, you can use this script: [https://get.docker.com](https://get.docker.com)
- If you use a stand-alone `docker-compose` script instead of the compose plugin, make sure to use `docker-compose` wherever `docker compose` is used in this tutorial.
- For production, using Linux is highly recommended. However, for evaluation purposes, Windows with WSL (Windows Subsystem for Linux) can be used.

## Installation

1. Clone [ayon-docker repository](https://github.com/ynput/ayon-docker) to your local machine.
2. Tweak the `docker-compose.yml` file according to your requirements.
3. You may use the `.env` file to set environment variables (for example, for SSO configuration).
4. On Windows, comment-out or delete the `- "/etc/localtime:/etc/localtime:ro"` line from the `docker-compose.yml` file.
5. Install addons to the `addons` directory.
6. Modify the default settings in the `settings/template.json` file.
7. Run the stack using `docker compose up -d`
8. Run `make setup` (Unix) or `manage.ps1 setup` (Windows) to set up the server.
9. Once the setup is complete, navigate to [http://localhost:5000/](http://localhost:5000/) in your web browser and log in as `admin/admin`.


