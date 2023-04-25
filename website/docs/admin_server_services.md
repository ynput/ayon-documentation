---
id: admin_server_services
title: Ayon services 
sidebar_label: Services
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Ayon services are independent processes provided by addons that run in Docker containers outside of the main Ayon stack. 
These services connect to the server using the HTTP API and perform various tasks in the background. 
Since they are not directly connected to the database but use the API, it is safe to run services even on different premises. 
This can be beneficial, for example, when the Ayon server is running in a public cloud while several services run on-premises.


Service account 
---------------

Ensure you have a service account with API key. 
You can create a service account using either the provisioning file (`settings/template.json`) or the web interface.

template.json

```json
  {
      "name": "service",
      "apiKey": "veryinsecureapikey",
      "isService": true
  }
```


ASH
---

To run a managed service (controllable from the web interface), the worker machine needs to run the Ayon Service Host (ASH). 
ASH is a small process that handles spawning services as specified by the administrator in the services page.
It periodically checks the services declared in the Ayon server database and starts them if they are not
running. It also provides a simple API for services to report their status and to receive configuration.


### Setting up using docker compose

To add ASH as a service to your `docker-compose.yml` file, you can either use the same stack as the server 
or create a completely separate one. 

You need to provide the `AYON_API_KEY` and `AYON_SERVER_URL` environment variables. 
Additionally, ASH requires the `docker.sock` file to be mounted as a volume to control the Docker process and spawn services.


```yaml
worker:                                                                                                                           
  image: ynput/ayon-ash:latest
  hostname: worker01
  restart: unless-stopped
  volumes:
    - "/var/run/docker.sock:/var/run/docker.sock"
  environment:
    - "AYON_API_KEY=veryinsecureapikey"
    - "AYON_SERVER_URL=https://ayon.example.com"
```

:::important Server URL 
Make sure to use an IP address that is accessible from the host machine for the `AYON_SERVER_URL` environment variable, 
as services are spawned outside the Docker stack and cannot use the Docker DNS resolver. 
:::



Troubleshooting
---------------

### Handling Failed Services

In case a service fails to stop and remove its container, you may need to manually intervene to stop the orphaned containers.

Ayon service containers are easily identifiable by their naming convention. 
They use the service name with an `aysvc_` prefix. 
This prefix allows you to quickly filter and manage Ayon service containers when working with Docker commands.

Run the following command to list all running Docker containers and filter the results to display only Ayon service containers.

```bash
$ docker ps | grep aysvc
af60516ccb4b   ynput/ayon-openpype-import:latest   "python -m processor"    2 weeks ago    Up 2 weeks   aysvc_op3import
```

Once you've identified the orphaned service containers, use the `docker stop` command to stop them individually. 
Replace `<container_id>` with the actual container ID of the orphaned container:

```bash
docker stop <container_id>
```

Since the containers are started with the `--remove` flag, they will be automatically removed once they are stopped.


