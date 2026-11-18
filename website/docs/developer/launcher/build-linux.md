---
title: Build AYON launcher on Linux
sidebar_label: Linux build steps
description: "Building the AYON launcher on Linux: the Docker builds used for the official installers (Ubuntu, Debian, Rocky Linux 8 and 9), their output and requirements, PySide2 builds, and building directly on the machine."
verified: 2026-11-12
sources:
  - https://github.com/ynput/ayon-launcher/blob/develop/tools/make.sh
  - https://github.com/ynput/ayon-launcher/blob/develop/Dockerfile
  - https://github.com/ynput/ayon-launcher/blob/develop/Dockerfile.debian
  - https://github.com/ynput/ayon-launcher/blob/develop/Dockerfile.rocky8
  - https://github.com/ynput/ayon-launcher/blob/develop/Dockerfile.rocky9
---

# Build AYON launcher on Linux

The official Linux installers are built in Docker, one per distribution. The Dockerfiles are at the root of the repository. Docker is only used to build: the result is an ordinary installer, not a container.

## Build with Docker

```bash
cd <ayon-launcher-repo-clone>
./tools/make.sh docker-build rocky9
```

| Variant | Dockerfile | Base image |
| -- | -- | -- |
| `ubuntu` (default) | `Dockerfile` | Ubuntu 20.04 (focal) |
| `debian` | `Dockerfile.debian` | Debian 11 (Bullseye) |
| `rocky8` | `Dockerfile.rocky8` | Rocky Linux 8.5 |
| `rocky9` | `Dockerfile.rocky9` | Rocky Linux 9 |

Rocky Linux is the choice for RHEL-compatible distributions.

- **Output:** the build runs inside the container and copies `output/`, `installer/`, `metadata.json` and `build.log` to `build_<variant>/`, for example `build_rocky9/`. The installer is `AYON-<version>-linux-<distribution>.tar.gz`, next to its `.json` metadata file.
- **On the host:** besides Docker, `tools/make.sh` uses uv on the host to read the launcher version before it starts the container. At the end it gives the results to the logged-in user with `chown $(logname)`, so it is usually run with `sudo`.
- **PySide2:** `--use-pyside2` after the variant, for example `./tools/make.sh docker-build rocky9 --use-pyside2`, builds with PySide2. The output folder then ends with `_pyside2`.
- **From Windows:** `./tools/manage.ps1 docker-build <variant>` runs the same build.

## Build on the machine

A build directly on a Linux machine uses the same commands as the other platforms:

```bash
cd <ayon-launcher-repo-clone>
./tools/make.sh create-env
./tools/make.sh install-runtime-dependencies
./tools/make.sh build-make-installer
```

The installer and its `.json` metadata file are in `build/installer/`. The packages that a distribution needs for the build are installed in its Dockerfile, which is the reference for a build on the machine.

The build updates the git submodules first. To skip that, `--no-submodule-update` goes before the target: `./tools/make.sh --no-submodule-update build`.

`./tools/make.sh` without arguments lists the targets, which are described in [Helper scripts](index.md#helper-scripts).
