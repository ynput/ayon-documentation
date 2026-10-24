---
title: Build AYON launcher on Linux
sidebar_label: Linux build steps
description: "Building the AYON launcher on Linux, with the prepared Docker builds (recommended) or directly on the machine: requirements, preparing the environment, building, creating and uploading the installer, and all build targets."
---

# Build AYON launcher on Linux

:::warning

Building directly on Linux needs distribution specific steps. Use the prepared Docker build options when possible.

:::

## Build with Docker (recommended)

The repository contains Dockerfiles that do all the necessary steps for you. Docker must be installed.

| Variant | Dockerfile | Base image |
| -- | -- | -- |
| `ubuntu` (default) | `Dockerfile` | Ubuntu 20.04 (focal) |
| `debian` | `Dockerfile.debian` | Debian Bullseye |
| `rocky8` | `Dockerfile.rocky8` | Rocky Linux 8.5 |
| `rocky9` | `Dockerfile.rocky9` | Rocky Linux 9 |

```sh
git clone --recurse-submodules git@github.com:ynput/ayon-launcher.git
cd ayon-launcher
./tools/make.sh docker-build rocky9
```

The variant is optional and defaults to `ubuntu`. The build runs inside the container and copies the results to `./build_<variant>/` (for example `./build_rocky9/`): the `output`, `installer` and `metadata.json` plus `build.log`. The installer and its JSON metadata file are in `./build_<variant>/installer/`.

The official launcher releases are built for the `ubuntu`, `debian`, `rocky8` and `rocky9` variants. Rocky Linux is the choice for RHEL-compatible distributions. The CentOS 7 build files are gone. Rocky Linux 9 is the recommended RHEL-compatible variant, and Rocky Linux 8 is built as well.

The Docker build is also available from Windows PowerShell (`./tools/manage.ps1 docker-build <variant>`).

:::note Qt binding

The default Qt binding is PySide6. If an installer should use PySide2, add `--use-pyside2` to the docker build command, for example `./tools/make.sh docker-build rocky9 --use-pyside2`. The output directory then gets a `_pyside2` suffix. For a local build, set the environment variable `QT_BINDING=pyside2` instead.

:::

## Build on your machine

### Requirements

You have to install these tools yourself:

- [**bash**](https://www.gnu.org/software/bash/)
- [**curl**](https://curl.se) on systems that don't have it preinstalled
- [**git**](https://git-scm.com/downloads)
- [**Rust**](https://rust-lang.org/tools/install/) to build the shim
- [**uv**](https://docs.astral.sh/uv/). `tools/make.sh` installs it with curl if it is missing.
- [**Python 3.11**](https://www.python.org/downloads/). The project requires 3.11.9, which uv can provide.
- [**CMake**](https://cmake.org/)

To build Python related packages, you need the Python header files (`python3-dev` on Ubuntu, for example). See the Dockerfiles in the repository for the full list of packages each distribution needs.

### Prepare requirements

<details>
<summary>Details for Ubuntu</summary>

Install git, cmake and curl:

```sh
sudo apt install build-essential checkinstall
sudo apt install git cmake curl
```

If you run into an error about `xcb` when running AYON, you may need additional Qt libraries:

```sh
sudo apt install qt6-default
```

On Ubuntu newer than 20.04 there is no `qt6-default` package, so install its content individually:

```sh
sudo apt-get install qtbase6-dev qtchooser qt6-qmake qtbase6-dev-tools
```

</details>

<details>
<summary>Libraries for building Python packages</summary>

You will need **bzip2**, **readline**, **sqlite3** and other libraries.

**For Ubuntu:**

```sh
sudo apt-get update; sudo apt-get install --no-install-recommends make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

**Install uv:**

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

</details>

### Build

#### Clone repository

```sh
git clone --recurse-submodules git@github.com:ynput/ayon-launcher.git
```

#### Prepare environment

Create the virtual environment in `./.venv` from the lock file and install the runtime dependencies, such as the Qt binding.

```sh
./tools/make.sh create-env
./tools/make.sh install-runtime-dependencies
```

#### Build AYON Desktop

Build AYON in `./build/`.

```sh
./tools/make.sh build
```

The build updates git submodules first. Pass `--no-submodule-update` to skip that.

#### Create installer

```sh
./tools/make.sh make-installer
```

The installer and its `.json` metadata file are in the `./build/installer/` directory. The JSON file contains the metadata required by the server.

To build and create the installer in one step, run `./tools/make.sh build-make-installer`.

#### Upload installer

To register the installer on your server, see [Upload installer to server](index.md#upload-installer-to-server).

## All targets

Run `./tools/make.sh` without arguments to print the list.

| Target | Description |
| -- | -- |
| `create-env` | Create the uv virtual environment and update it from the lock file |
| `install-runtime-dependencies` (alias `install-runtime`) | Install runtime dependencies (Qt binding). `--use-pyside2` installs PySide2 instead of PySide6 |
| `build` | Build the desktop application |
| `make-installer` | Create the installer |
| `build-make-installer` | Build the desktop application and create the installer |
| `upload` | Upload the installer to the server |
| `run` | Run the desktop application from code |
| `docker-build [variant]` | Build in Docker. Variant is `debian`, `rocky8` or `rocky9`, or empty for the default `ubuntu` |
