---
title: AYON Service Host (ASH)
description: "The AYON Service Host (ASH): the worker that runs addon services, how the AYON server, the Services page and ASH work together, its configuration and the default Docker setup."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/7620452-ayon-service-host-ash
  - https://help.ayon.app/en/help/articles/2668013-ayon-services
  - https://community.ynput.io/t/setting-up-ayon-service-host-ash/1535
  - https://github.com/ynput/ash
  - https://github.com/ynput/ayon-docker/blob/main/docker-compose.worker.yml
---

# AYON Service Host (ASH)

The AYON Service Host (ASH) is a worker that runs and manages the services of AYON addons. Like a farm node, it does the work that the AYON server hands out. The server never runs addon services itself: it records which services should run, and ASH starts, stops and removes the containers for them. ASH is free; some services belong to paid addons.

## Addon services

An addon can include services: standalone, containerized Python programs that run next to the AYON server and take repetitive or heavy work off it. A tracker addon, for example, runs a service that watches the events of ftrack, Flow (ShotGrid) or Kitsu and acts on them. Services are usually Docker images published on the `ynput` account of Docker Hub. An addon that has services does not work as expected without a running service, so a missing or misconfigured ASH is a common cause of a tracker integration that does nothing.

## How it works

1. A service is created on the **Services** page of the AYON web app (shortcut `v+v`): host, addon, addon version and service. The server stores it in its database.
2. ASH polls the server for the services of its host. It starts those that are not running, pulling the image first if it is not in the local Docker cache.
3. ASH starts each service as a container named `aysvc_<service name>`, removed automatically when it stops. The container gets the server URL and API key of the ASH, and the variables `AYON_ADDON_NAME`, `AYON_ADDON_VERSION` and `AYON_SERVICE_NAME`, plus any variables set in the service definition. Mounts of the ASH container that target `/storage` are passed on.
4. ASH offers a small API through which running services report their status and receive their configuration. The Services page shows the status.

The Services page lists each service with its host, addon and version. Its context menu offers **Start Selected**, **Stop Selected**, **Edit Service** and **Delete Selected**. A new service asks for:

| Field | Meaning |
|---|---|
| Host | The ASH worker that runs the service. |
| Addon name, Addon version, Service | The service to run. The version has to match the addon version in the production bundle. |
| Service name | A name for this instance. |
| Settings variant | The bundle whose addon settings the service reads. |
| Storages, Ports | Docker volumes and ports exposed to the service. |
| Registry settings | Credentials for a private image registry. All official addon services are public except those of the Workflow addon. |

| Status | Meaning |
|---|---|
| Unknown | The server gets no response from the service. |
| Not running | The service was started but is not running yet. |
| Running | The service is active. |
| Disabled | The service was stopped. |

## Requirements

- An **API key of a service user**. ASH only accepts service accounts. A key is created on the Users page of the web app, or set in `settings/template.json` of `ayon-docker`. It is passed on to the services ASH starts.
- The Docker socket, `/var/run/docker.sock`, mounted into the ASH container, so that it can control Docker and start services.
- A network path to the AYON server. A connection error on start almost always means ASH cannot reach the server, particularly when it runs in a separate Docker stack.
- Access to Docker images. In an air-gapped studio the images of the services have to be loaded onto the worker beforehand.

A cloud-hosted server includes one preconfigured ASH worker. More can be added on premise or alongside the cloud server with the setups below.

## Default setup

ASH is distributed as the Docker image `ynput/ayon-ash`. There are two ways to run it. Replace the API key and the server URL in the examples with real values.

### In the same stack as the server

A `worker` service is added at the end of the `services` section of `docker-compose.yml` in the `ayon-docker` clone:

```yaml
  worker:
    image: ynput/ayon-ash:latest
    hostname: worker01
    restart: unless-stopped
    network_mode: host
    depends_on:
      - server
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    environment:
      - "AYON_API_KEY=veryinsecureapikey"
      - "AYON_SERVER_URL=http://server:5000"
```

Then the stack is rebuilt:

```bash
docker compose up -d --build
```

The `ayon-docker` repository also contains `docker-compose.worker.yml`, a worker definition that takes `AYON_API_KEY` and `AYON_SERVER_URL` from the environment.

### In a separate stack

On the server machine or on another machine, a folder such as `my-ayon-ash` holds a `docker-compose.yml`:

```yaml
services:
  worker:
    image: ynput/ayon-ash:latest
    hostname: worker-02
    restart: unless-stopped
    network_mode: host
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    environment:
      - "AYON_API_KEY=veryinsecureapikey"
      - "AYON_SERVER_URL=https://ayon.example.com"
```

It is started from that folder with `docker compose up -d`.

### Plain Docker

```bash
docker run --rm -ti \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --hostname worker01 \
  --env AYON_API_KEY=verysecureapikey \
  --env AYON_SERVER_URL="http://172.18.0.1:5000" \
  ynput/ayon-ash
```

The container needs a fixed hostname. Without one, Docker assigns a random hostname. Without Docker, ASH can run with Python 3.10 from the [ash repository](https://github.com/ynput/ash).

## Configuration

ASH reads environment variables with the `AYON_` prefix. A `.env` file is supported.

| Variable | Default | Description |
|---|---|---|
| `AYON_SERVER_URL` | `http://ayon:5000` | URL of the AYON server, including the scheme. |
| `AYON_API_KEY` | required | API key of a service user. |
| `AYON_HOSTNAME` | the container hostname | Name of the worker on the Services page. |
| `AYON_NETWORK`, `AYON_NETWORK_MODE` | none | Docker network or network mode for the services ASH starts. |
| `AYON_LOG_LEVEL` | `DEBUG` | Console log level. |
| `AYON_LOG_MODE` | `text` | Log format, `text` or `json`. |
| `AYON_LOG_CONTEXT` | `False` | Print the log context along with the message. |

## Orphaned service containers

If a service fails to stop and remove its container, the container has to be stopped by hand. Service containers are recognizable by the `aysvc_` prefix:

```bash
docker ps | grep aysvc
docker stop <container_id>
```

The container is removed when it stops.

## Related

- [Self hosting](self-hosting.md)
- [AYON setups](../setups.md)
- Discussions about ASH are tagged `ash` on the [Ynput forums](https://community.ynput.io/tag/ash).
