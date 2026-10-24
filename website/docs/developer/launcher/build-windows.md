---
title: Build AYON launcher on Windows
sidebar_label: Windows build steps
description: "Building the AYON launcher on Windows: the requirements (PowerShell 7, git, Rust, uv, Python 3.11, Inno Setup, CMake, Visual Studio build tools), cloning the repository, preparing the environment, building, creating and uploading the installer, and all build targets."
---

# Build AYON launcher on Windows

## Requirements

To build AYON you need some tools and libraries. They are not provided, so you have to install them yourself.

- [**PowerShell**](https://github.com/PowerShell/PowerShell) 7.0 or newer, not the Windows PowerShell 5.1 that ships with Windows. The script contains a check for the version, which is currently switched off.
- [**git**](https://git-scm.com/downloads)
- [**Rust**](https://rust-lang.org/tools/install/) to build the shim
- [**uv**](https://docs.astral.sh/uv/). The script installs it if it is missing.
- [**Python 3.11**](https://www.python.org/downloads/). The project requires 3.11.9, which uv can provide.
- [**Inno Setup**](https://jrsoftware.org/isdl.php) to create the installer. `ISCC.exe` must be on `PATH`, or installed in the default `Program Files` location of Inno Setup 6.

More tools **might** be needed to install Python dependencies:

- [**CMake**](https://cmake.org/)
- [**Visual Studio**](https://visualstudio.microsoft.com/downloads/) (build tools)

See [Requirements](../requirements.md) for the overview.

## Build

Open PowerShell 7 and change to the directory where you want to clone the repository.

#### Clone repository

```sh
git clone --recurse-submodules git@github.com:ynput/ayon-launcher.git
```

#### Prepare environment

Create the virtual environment in `./.venv` from the lock file and install the runtime dependencies, such as the Qt binding (PySide6 by default).

```sh
./tools/manage.ps1 create-env
./tools/manage.ps1 install-runtime-dependencies
```

Use `--use-pyside2` with `install-runtime-dependencies` to install PySide2 instead.

#### Build AYON Desktop

Build the AYON executables, including the shim, in `./build/output/`.

```sh
./tools/manage.ps1 build
```

The build updates git submodules first. Pass `--no-submodule-update` to skip that.

#### Create installer

Create an installer that can be distributed to the server and workstations.

```sh
./tools/manage.ps1 make-installer
```

Output files are in the `./build/installer/` directory. You should find an `.exe` and a `.json` file. The JSON file contains the metadata required by the server.

To build and create the installer in one step, run:

```sh
./tools/manage.ps1 build-make-installer
```

#### Upload installer

To register the installer on your server, see [Upload installer to server](index.md#upload-installer-to-server).

## All targets

Run `./tools/manage.ps1` without arguments to print the list.

| Target | Description |
| -- | -- |
| `create-env` | Install uv if needed and create or update the virtual environment from the lock file |
| `install-runtime-dependencies` (alias `install-runtime`) | Install runtime dependencies (Qt binding). `--use-pyside2` installs PySide2 instead of PySide6 |
| `build` | Build the desktop application |
| `make-installer` | Create the installer |
| `build-make-installer` | Build the desktop application and create the installer |
| `upload` | Upload the installer to the server |
| `run` | Run the desktop application from code |
| `docker-build [variant]` | Build in Docker. Variant is `ubuntu`, `debian`, `rocky8` or `rocky9` |
