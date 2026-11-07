---
title: AYON Service Host (ASH)
description: "Running the AYON Service Host (ASH) on premise: what it needs, running it in a separate stack or in the same Docker stack as the AYON server, its configuration, and stopping orphaned service containers."
verified: 2026-11-06
sources:
  - https://help.ayon.app/en/help/articles/7620452-ayon-service-host-ash
  - https://community.ynput.io/t/setting-up-ayon-service-host-ash/1535
  - https://github.com/ynput/ash
  - https://github.com/ynput/ash/blob/main/ash/config.py
  - https://github.com/ynput/ayon-docker/blob/main/docker-compose.worker.yml
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AYON Service Host (ASH)

The AYON Service Host (ASH) is a worker that runs the services of AYON addons as Docker containers. Like a farm node, it does the work that the AYON server hands out: the server records which services should run, and ASH starts and stops them. How this works is described in [Addon services](../how-ayon-works/services.md); services are created and controlled on the [Services](../web-ui/services.md) page of the web app.

This page is about running ASH on premise, next to a self-hosted server or as an additional worker for a server hosted on Ynput Cloud.

:::note
A server hosted on Ynput Cloud already has one ASH running in the cloud next to it.
:::

## Requirements

- An **API key of a service user**. ASH only accepts service accounts. A service user is created on the Users page of the web app, or with `settings/template.json` of `ayon-docker`. ASH passes the key on to the services it starts.
- The Docker socket, `/var/run/docker.sock`, mounted into the ASH container, so that ASH can start and stop containers.
- A URL to the AYON server that is reachable from the worker.
- Access to the Docker images of the services. In an air-gapped studio, the images have to be in the worker's local Docker image cache beforehand, for example with `docker load`, or available from a local registry mirror. When ASH cannot pull an image, it uses the one in the local cache.

## Running ASH

ASH is distributed as the Docker image [`ynput/ayon-ash`](https://hub.docker.com/r/ynput/ayon-ash/tags). It can run in the same Docker stack as a self-hosted server, or separately from the server, on the server machine or on another one. The API keys and server URLs in the examples below are examples, to be replaced with the studio's own.

### In the same stack as the server

The `ayon-docker` repository comes with an ASH worker, `docker-compose.worker.yml`, that runs in the same stack as the server. It is added to the stack in the `.env` file of the `ayon-docker` folder:

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```bash
COMPOSE_FILE=docker-compose.yml;docker-compose.worker.yml
AYON_API_KEY=veryinsecurapikey
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
COMPOSE_FILE=docker-compose.yml:docker-compose.worker.yml
AYON_API_KEY=veryinsecurapikey
```

</TabItem>
</Tabs>

`AYON_API_KEY` is the API key of a service user, created by the `setup` command or on the Users page. Then the stack is started:

```bash
docker compose up -d
```

### In a separate stack

On the machine chosen for ASH, a folder such as `ayon-ash` holds a `docker-compose.yml`:

```yaml
services:
  worker:
    image: ynput/ayon-ash:latest
    hostname: worker-01
    restart: unless-stopped
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    environment:
      - "AYON_API_KEY=veryinsecurapikey"
      - "AYON_SERVER_URL=https://ayon.example.com"
```

- `hostname` is the name of the worker on the Services page.
- `AYON_API_KEY` is the API key of a service user.
- `AYON_SERVER_URL` is the URL of the AYON server, including the scheme. It has to be reachable from inside the container, so it is the full address of the server, for example `http://192.168.1.10:5000` or `https://ayon.example.com`, not `localhost`.

With `restart: unless-stopped`, the worker starts again whenever Docker starts, for example after a reboot. The worker is started from that folder:

```bash
docker compose up -d
```

The worker then appears as a host when a service is created on the [Services](../web-ui/services.md) page. If it does not, see [Troubleshooting](#troubleshooting).

## Configuration

ASH has further optional settings, set as environment variables with the `AYON_` prefix. Each is added as a line in the `environment` section of the `worker` service, for example `- "AYON_LOG_LEVEL=INFO"`:

| Variable | Default | Description |
|---|---|---|
| `AYON_HOSTNAME` | the container hostname | Name of the worker on the Services page. The name has to stay the same, so either this variable or the container hostname (`hostname` in Compose) is set; otherwise Docker gives every new container a random hostname. |
| `AYON_NETWORK`, `AYON_NETWORK_MODE` | the network of the ASH container | Docker network or network mode for the services ASH starts. |
| `AYON_LOG_LEVEL` | `DEBUG` | Console log level: `TRACE`, `DEBUG`, `INFO`, `WARNING`, `ERROR` or `CRITICAL`. |
| `AYON_LOG_MODE` | `text` | Log format, `text` or `json`. |
| `AYON_LOG_CONTEXT` | `False` | Print the log context along with the message. |

## Troubleshooting

### The worker does not appear on the Services page

The worker's log gives the cause. It is shown from the folder of the worker's compose file:

```bash
docker compose logs -f worker
```

In both setups on this page, `worker` is the name of the ASH service in the compose file.

Example error messages:

- `Unable to connect to the server... Retrying`: `AYON_SERVER_URL` is not reachable from inside the container, see [In a separate stack](#in-a-separate-stack).
- `Unable to login. Error: 401`: `AYON_API_KEY` is wrong. Another error code means that `AYON_SERVER_URL` points to something other than the AYON server.
- `Heartbeat: No response`, repeated: `AYON_API_KEY` belongs to a regular user. It has to be the API key of a service user.

### Orphaned service containers

ASH runs each service as a container named `aysvc_<service name>` and stops it when the service should no longer run. If a container fails to stop, for example because its ASH worker is no longer running, it keeps running and is stopped by hand on the worker's machine:

```bash
docker ps | grep aysvc
docker stop <container_id>
```

The container is removed when it stops.

## Related

- [Addon services](../how-ayon-works/services.md)
- [Services](../web-ui/services.md)
- [On-premise deployment](on-premise.md)
- Discussions about ASH are tagged `ash` on the [Ynput forums](https://community.ynput.io/tag/ash).
