---
title: Addon services
sidebar_label: Services
description: "Services of an AYON addon: programs that run outside the server as Docker containers run by ASH, the services key of package.py, connecting with ayon_api.init_service, the environment variables, the settings variant (AYON_DEFAULT_SETTINGS_VARIANT), taking jobs with enroll, the usual layout with a Dockerfile and a way to run from code (ftrack, ShotGrid and Kitsu as examples), and the ways to ship the image: a public registry, a private registry with credentials, or a local image for development and air-gapped studios."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ash/blob/develop/ash/services.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/_api.py
  - https://github.com/ynput/ayon-python-api/blob/develop/ayon_api/utils.py
  - https://github.com/ynput/ayon-ftrack/blob/develop/service_tools/main.py
  - https://github.com/ynput/ayon-shotgrid/blob/develop/service_tools/main.py
---

# Addon services

A service is a program that runs outside the server, usually as a Docker container, for example to sync with another tracker. The addon lists the image of each service in the `services` key of [`package.py`](overview.md#packagepy). The [AYON Service Host (ASH)](../../ayon/deployment/ash.md) pulls and runs the images; how a service is started, and the environment variables and mounts it gets, are described in [Addon services](../../ayon/how-ayon-works/services.md).

In the service, `ayon_api.init_service()` connects to the server from `AYON_SERVER_URL` and `AYON_API_KEY`, and reads `AYON_ADDON_NAME`, `AYON_ADDON_VERSION` and `AYON_SERVICE_NAME`. `ayon_api.get_service_addon_settings()` then returns the addon's settings, in the settings variant named by `AYON_DEFAULT_SETTINGS_VARIANT`, or `production` when it is not set. ASH does not set this variable; it is added to the environment of the service definition for a service that should use staging or a dev bundle. Services usually take jobs with the [enroll endpoint](../server/event-system.md#enroll-taking-jobs).

There is no required folder layout. The convention is:

- a Dockerfile that builds the image named in `package.py`;
- a way to run the service from code during development, with the same environment variables set by hand.

Examples with public code:

| Addon | Services | Run from code |
|---|---|---|
| [ayon-ftrack](https://github.com/ynput/ayon-ftrack) | `leecher`, `processor`, `transmitter` in `services/` | `service_tools/` |
| [ayon-shotgrid](https://github.com/ynput/ayon-shotgrid) | `leecher`, `processor`, `transmitter` in `services/` | `service_tools/` |
| [ayon-kitsu](https://github.com/ynput/ayon-kitsu) | `processor` in `services/processor/` | `manage.ps1`, `Makefile` in the service folder |

## Shipping the image

When ASH starts a service, it pulls the image named in `package.py` first, so an image changed under the same tag is updated. If the pull fails, ASH uses the image with that name that is already in the Docker engine it runs on. See also [Addon services](../../ayon/how-ayon-works/services.md).

This gives three ways to ship a service image:

| Way | Image name in `package.py` | How ASH gets it | Suits |
|---|---|---|---|
| Public registry | For example `my-studio/my-addon-processor:1.0.0` on Docker Hub, or `ghcr.io/my-studio/my-addon-processor:1.0.0` on GitHub | Pulls it | Public addons. Studio's images on a public registry, e.g. Docker Hub or GitHub. |
| Private registry | For example `registry.example.com/my-studio/my-addon-processor:1.0.0` | Pulls it with the credentials set in **Registry login** when the service is created on the [Services](../../ayon/web-ui/services.md#registry-settings) page | Testing from a personal account, private production images |
| Local image | Any name, matched exactly with its tag | The pull fails and ASH uses the local image | Development, and studios without internet access (air-gapped) |

A local image has to exist on the machine that runs ASH, with the exact name and tag from `package.py`. It is either built there with `docker build -t <name:tag> .`, or moved from another machine with `docker save` and `docker load`.

## Related

- [Server side](server.md)
- [Overview and packaging](overview.md)
- [Addon services](../../ayon/how-ayon-works/services.md)
- [AYON Service Host](../../ayon/deployment/ash.md)
- [Event system](../server/event-system.md)
