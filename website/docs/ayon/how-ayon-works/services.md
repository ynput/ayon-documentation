---
title: Addon services
description: "How addon services run in AYON: what a service is, how the Services page, the AYON server and the AYON Service Host (ASH) work together to start it as a container, what the container receives, and what happens when it stops."
verified: 2026-11-06
sources:
  - https://help.ayon.app/en/help/articles/7620452-ayon-service-host-ash
  - https://help.ayon.app/en/help/articles/2668013-ayon-services
  - https://github.com/ynput/ash/blob/main/ash/services.py
  - https://github.com/ynput/ash/blob/main/ash/config.py
  - https://github.com/ynput/ash/blob/main/ash/__main__.py
---

# Addon services

An addon can include services: standalone, containerized programs that run next to the AYON server and take repetitive or heavy work off it. A tracker addon, for example, runs a service that watches the events of ftrack, Flow (ShotGrid) or Kitsu and acts on them. Services are usually Docker images published on [`ynput` Docker Hub](https://hub.docker.com/u/ynput). An addon that has services does not work as expected without its services running, so a missing service is a common cause of a tracker integration that does nothing.

The AYON server never runs addon services itself. It records which services should run, and an [AYON Service Host (ASH)](../deployment/ash.md) runs them.

## How a service runs

1. A service is created on the [Services](../web-ui/services.md) page of the web app: the ASH worker (host), the addon, its version, the service, and a name for this instance. The server stores it in its database.
2. Each ASH worker regularly sends the server a heartbeat with the services running on it, and receives the list of services that should run on it.
3. ASH starts the services that should run but do not. It pulls the image first; if the pull fails, it uses the image already on the worker.
4. Each service runs as a Docker container named `aysvc_<service name>`. The container receives:
    - the server URL and the API key of the ASH worker;
    - `AYON_ADDON_NAME`, `AYON_ADDON_VERSION` and `AYON_SERVICE_NAME`;
    - the environment variables set in the service definition;
    - the mounts of the ASH container that target `/storage`.
5. ASH stops the containers of services that should no longer run, for example after the service was stopped or deleted on the Services page. Docker then removes the container.

The service reads the addon settings of the settings variant (bundle) chosen for it, and its addon version has to match the version in that bundle.

:::note Orphaned service containers

A container that fails to stop keeps running after its service was stopped or deleted, for example when its ASH worker is no longer running. It is recognizable by the `aysvc_` prefix and is stopped on the machine of the ASH worker, see [Orphaned service containers](../deployment/ash.md#orphaned-service-containers).
:::

## Related

- [AYON Service Host](../deployment/ash.md): running and configuring ASH workers
- [Services](../web-ui/services.md): the page of the web app that creates and controls services
- [Bundles](bundles.md)
