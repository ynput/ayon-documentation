---
title: Addon services
description: "Addon services in AYON for administrators: what a service is and why some addons need one, where services come from (a Docker image named by the addon), and the ways to run them: from the Services page with the AYON Service Host (ASH), or as a container managed outside AYON, for example with Docker Compose or Portainer, with what such a container needs."
verified: 2026-11-15
sources:
  - https://help.ayon.app/en/help/articles/7620452-ayon-service-host-ash
  - https://help.ayon.app/en/help/articles/2668013-ayon-services
  - https://github.com/ynput/ash/blob/main/ash/services.py
  - https://github.com/ynput/ash/blob/main/ash/config.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/_api.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/addons/list_addons.py
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ServicesPage/NewServiceDialog.jsx
---

# Addon services

A service is a program that an addon runs next to the AYON server, to take repetitive or long work off it. A tracker addon, for example, runs a service that follows the changes in ftrack, Flow (ShotGrid) or Kitsu and keeps AYON in sync with them. An addon that has services does not work as expected while they are not running, so a missing service is a common cause of an integration that does nothing.

The AYON server never runs services itself. It only knows which services exist and gives them access to its API; the services run somewhere else, as containers.

## Where services come from

Each service is a Docker image that the addon names in the `services` key of its `package.py`, usually tagged with the addon version; the ftrack addon, for example, names `ynput/ayon-ftrack-leecher`, `ynput/ayon-ftrack-processor` and `ynput/ayon-ftrack-transmitter`. The image of Ynput's addons is published on [Docker Hub](https://hub.docker.com/u/ynput); other addons may use another registry or an image built locally. A new addon version usually names new service images, see [Matching the bundle](#matching-the-bundle).

To see which services an installed addon has without opening its package:

- On the [Services](../web-ui/services.md) page, **New service** lists only the addon versions that have services, and then the services of the chosen version.
- Through the REST API, `GET /api/addons?details=true` returns each addon version with its `services`: the name of each service and its image.

How an addon defines its services and ships its images is described for developers in [Addon services](../../developer/addon-development/services.md).

## Running services

A service is a container like any other, so it can run wherever Docker runs. There are two usual ways:

| Way | Who starts and stops the container | Shown on the Services page |
|---|---|---|
| [With ASH](#with-ash) | An AYON Service Host worker, on request of the server | Yes, with its status |
| [Outside AYON](#outside-ayon) | The studio's own tools, such as Docker Compose, Portainer or Kubernetes | No |

### With ASH

The [AYON Service Host (ASH)](../deployment/ash.md) is a small worker, itself a container, that runs services on the machine it runs on. Services are then created and controlled on the [Services](../web-ui/services.md) page:

1. A service is created on the Services page, with the ASH worker (host), the addon, its version, the service and a name. The server stores it.
2. Each ASH worker regularly tells the server which services run on it, and receives the list of services that should run there.
3. ASH starts the services that should run but do not. It pulls the image first; if the pull fails, it uses the image already on the machine.
4. Each service runs as a container named `aysvc_<service name>`, with the server URL, the API key of the ASH worker, the addon name, version and service name, the environment variables set on the Services page and the `/storage` mounts of the ASH container.
5. When a service is stopped or deleted on the Services page, ASH stops its container.

:::note Orphaned service containers
A container that fails to stop keeps running after its service was stopped or deleted, for example when its ASH worker is no longer running. It is recognizable by the `aysvc_` prefix and is stopped on the machine of the ASH worker, see [Orphaned service containers](../deployment/ash.md#orphaned-service-containers).
:::

### Outside AYON

A studio that already manages its containers, for example with Docker Compose, Portainer or Kubernetes, can run the service images there without ASH. The container then needs the same environment that ASH would give it:

| Variable | Value |
|---|---|
| `AYON_SERVER_URL` | The URL of the AYON server, reachable from the container |
| `AYON_API_KEY` | The API key of a [service user](../web-ui/studio/users.md) |
| `AYON_ADDON_NAME`, `AYON_ADDON_VERSION` | The addon and the addon version the service belongs to |
| `AYON_SERVICE_NAME` | A name for this service instance |
| `AYON_DEFAULT_SETTINGS_VARIANT` | Optional: `staging` or a Dev bundle name, to read those settings instead of `production` |

Plus the variables the service itself documents, such as the credentials of a tracker. Such a container does not appear on the Services page, and AYON does not start, stop or update it: the studio's tools do, also when the addon version changes.

### Matching the bundle

A service should run the same addon version as the bundle it works for: the Production bundle, or the bundle of the settings variant set for it. A service of another version may work, but it is not guaranteed, for example when the new version changed its settings or the data it writes.

With ASH, a service is created for one addon version: ASH takes the image from that version's `package.py` and sets `AYON_ADDON_VERSION` to the same version, so the image and the version it reports always match. Outside AYON, the image tag and `AYON_ADDON_VERSION` are set separately, so they can differ by mistake, for example a new image that reports the old version; both must name the same addon version.

Services do not follow the bundle by themselves, whether they run with ASH or outside AYON. When a bundle with a new version of the addon is put into use, its services are updated by hand:

| Way | Update |
|---|---|
| With ASH | Create a new service for the new addon version on the Services page, then stop and delete the service of the old version. **Edit service** cannot change the addon version. |
| Outside AYON | Change the image tag and `AYON_ADDON_VERSION` of the container to the new version, and restart it. |

## Settings

A service reads the settings of its addon from the server, in the `production` variant unless another variant is set for it. On the Services page the variant is chosen when the service is created. See [Settings](settings.md#variants).

## Related

- [AYON Service Host](../deployment/ash.md): running and configuring ASH workers
- [Services](../web-ui/services.md): the page of the web app that creates and controls services
- [Addon services for developers](../../developer/addon-development/services.md)
- [Bundles](bundles.md)
