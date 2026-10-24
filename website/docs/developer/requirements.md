---
title: Development requirements
sidebar_label: Requirements
description: "What developing for AYON needs: an AYON server instance, the main tools (a terminal, git, Python 3.11), the supported operating systems, Python versions, hardware and dependencies."
---

AYON is a modular project. The AYON server lies at its core, so to develop for AYON you need an instance of it, either on localhost or on a remote server. See [AYON server repositories and stack](server/introduction.md) and the [Admin Server Deployment](https://help.ayon.app/articles/2293963#14llflexlb4) guide for more.

The [AYON launcher](launcher/index.md) is written in Python 3.11 and closely follows the [VFX Reference Platform](https://vfxplatform.com/). Some parts of the pipeline may still run on Python 2.7 until all supported third-party software is updated. You can follow the progress at the [VFX Python3 tracker](https://vfxpy.com/).

## Main requirements

To run AYON from sources or to build the launcher you need:

- A **terminal** application:
    - PowerShell 7.0 or newer (Windows). `tools/manage.ps1` is a PowerShell script.
    - Bash (Linux and macOS)
- [**Python 3.11**](#python)
- [**uv**](https://docs.astral.sh/uv/) to manage the virtual environment and dependencies
- [**git**](https://git-scm.com/downloads)
- [**Rust**](https://rust-lang.org/tools/install/) to build the shim
- [**CMake**](https://cmake.org/)
- [**Inno Setup**](https://jrsoftware.org/isdl.php) to create the installer (Windows only)
- An [**AYON server**](server/introduction.md)

The platform specific build guides list the remaining tools:

- [Windows](launcher/build-windows.md)
- [Linux](launcher/build-linux.md)
- [macOS](launcher/build-macos.md)

## Operating systems

The official launcher installers are built for these platforms:

| Platform | How it is built |
| -- | -- |
| Windows | Natively with `tools/manage.ps1` and Inno Setup |
| macOS | Natively with `tools/make.sh` |
| Linux | In Docker, with the Ubuntu (20.04), Debian (Bullseye), Rocky Linux 8 and Rocky Linux 9 variants |

Rocky Linux is the RHEL-compatible choice. CentOS 7 is not part of the build files anymore. See [Linux build steps](launcher/build-linux.md) for details.

## Python

Python is only required if you want to build the [AYON launcher](launcher/index.md), develop, or run from the source code. Otherwise, use the pre-built installers from the [releases page](https://github.com/ynput/ayon-launcher/releases), which include Python.

The launcher requires **Python 3.11.9** exactly (`requires-python == 3.11.9` in `pyproject.toml`). [uv](https://docs.astral.sh/uv/) manages the virtual environment and can install this Python version for you, so a separate Python installation or version manager is not needed. Dependencies are pinned in `uv.lock`.

## Hardware

There are no minimum hardware requirements. The launcher should be deployed on all machines that interact with AYON. As a rule of thumb, if a computer can run a DCC or perform render workloads, it can run AYON.

## Dependencies

AYON is built on top of other projects. The main runtime dependencies of the launcher are listed below. The full list, including development dependencies, is in [`pyproject.toml`](https://github.com/ynput/ayon-launcher/blob/develop/pyproject.toml).

| Package | Purpose |
| -- | -- |
| [ayon-python-api](https://github.com/ynput/ayon-python-api) | Communication with the AYON server |
| aiohttp | Asynchronous HTTP |
| arrow | Date and time handling |
| Unidecode | Text transliteration to ASCII |
| platformdirs | Platform specific user directories |
| coolname | Random name generation |
| keyring | Secure storage of credentials |
| blessed, enlighten | Terminal formatting and progress bars |
| cryptography | Cryptographic primitives |
| dnspython | DNS toolkit |
| urllib3 | HTTP client |
| semver | Semantic version handling |
| QtPy | Abstraction layer over Qt bindings |
| pywin32 | Windows API access (Windows only) |
| python3-xlib, distro | X11 access and distribution detection (Linux only) |

The Qt binding is installed separately by `install-runtime-dependencies`. It is PySide6 6.8.3 by default, or PySide2 5.15.2 when you pass `--use-pyside2` or set `QT_BINDING=pyside2`.

The launcher is frozen into an executable with [cx_Freeze](https://cx-freeze.readthedocs.io/en/latest).
