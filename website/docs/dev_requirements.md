---
id: dev_requirements
title: Requirements
sidebar_label: Requirements
---

AYON is a modular project, the AYON server lies at the core of it, so to develop for AYON  we need an instance of it either in the localhost or in a remote server, refer to the [Admin Server Deployment](admin_server_deployment.md) for more.

AYON is written in [**Python 3 (3.9.x)**](#python) and addheres to the versions defined in the [VFX Reference Platform](https://vfxplatform.com/).

Some parts are kept on Python 2.7.x for compatibility purposes with, until all supported third-party software are updated to a newer Python version, you can see the progress at the [VFX Python3 tracker](https://vfxpy.com/).

The main requirements needed to run and build AYON are:

- A **Terminal** application:
    - PowerShell 5.0+ (Windows)
    - Bash (Linux and macOs)
- [**Python 3.9.x**](#python)
- [**Ayon Server**](admin_server_deployment.md)


## Supported Operating Systems

AYON can be built and ran in any platform that supports the above requirements, the development team develops and thest it on the following list of Operating Systems:
- Windows 10
- Ubuntu 20.04 LTS
- CentOS 7
- macOS 10.15 "Catalina"
- macOS 11.1 "Big Sur" - via Rosetta2 compatibility layer.


## Python

Python is only required if you want to build [AYON launcher](dev_launcher.md), develop or run from the source code, otherwise is **highly advised** to use the pre-built binaries found in the [Release page](https://github.com/ynput/OpenPype/releases) which includes Python.

**Python 3.9.x** is the recommended version to use, as per [VFX platform CY2022](https://vfxplatform.com/).
**Note**: Python 3.9.0 is not supported because of [this bug](https://github.com/python/cpython/pull/22670). Please, use higher versions of 3.9.x.

And [Poetry](https://python-poetry.org/) is used to manage [dependencies](#dependencies).

## Hardware

There are no minimum hardware requirements, once built, it takes ~400 MB of Disk space, and it should be deployed in all the machines that interact with AYON.
As a rule of thumb, if the computer can run a DCC or perform render workloads, it will be able to run AYON.

## Dependencies

AYON is an project built on top of the following projects:
- [**Pyblish**](https://github.com/pyblish)
- [**OpenTimelineIO**](https://github.com/PixarAnimationStudios/OpenTimelineIO)
- [**OpenImageIO**](https://github.com/OpenImageIO/oiio) [^centos7]
- [**FFmpeg**](https://github.com/FFmpeg/FFmpeg)

[^centos7]: On Centos 7 you need to install additional libraries to support OIIO there - mainly boost
and libraw (`sudo yum install boost-1.53.0 LibRaw`)

### Python Dependecies

AYON uses [Poetry](https://python-poetry.org/) to handle the dependencies, and you can see the full list of dependencies in the [`pyproject.yoml`](https://github.com/ynput/OpenPype/blob/develop/pyproject.toml), here is a list of these with their corresponging licenses:


| Compatible  | Package                  | License(s)                                                           |
| ----------- | ------------------------ | -------------------------------------------------------------------- |
| ✔          | Deprecated               | MIT License                                                          |
| ✖          | OpenTimelineIO           | Apache Software License                                              |
| ✔          | SecretStorage            | BSD License                                                          |
| ✖          | Unidecode                | GNU General Public License v2 or later (GPLv2+)                      |
| ✔          | acre                     | GNU LESSER GENERAL PUBLIC LICENSE Version 3                          |
| ✔          | aiohttp                  | Apache Software License                                              |
| ✔          | aiohttp-json-rpc         | Apache Software License                                              |
| ✔          | aiohttp-middlewares      | BSD License                                                          |
| ✔          | aiosignal                | Apache Software License                                              |
| ✔          | appdirs                  | MIT License                                                          |
| ✔          | arrow                    | Apache Software License                                              |
| ✔          | async-timeout            | Apache Software License                                              |
| ✔          | attrs                    | MIT License                                                          |
| ✔          | ayon-python-api          | Apache License (2.0)                                                 |
| ✔          | bcrypt                   | Apache Software License                                              |
| ✔          | blessed                  | MIT License                                                          |
| ✔          | cachetools               | MIT License                                                          |
| ✔          | certifi                  | Mozilla Public License 2.0 (MPL 2.0)                                 |
| ✔          | cffi                     | MIT License                                                          |
| ✔          | charset-normalizer       | MIT License                                                          |
| ✔          | click                    | BSD License                                                          |
| ✔          | clique                   | Apache Software License                                              |
| ✔          | coolname                 | BSD License                                                          |
| ✔          | cryptography             | Apache Software License;; BSD License                                |
| ✔          | dnspython                | ISC                                                                  |
| ✔          | dropbox                  | MIT License                                                          |
| ✔          | enlighten                | Mozilla Public License 2.0 (MPL 2.0)                                 |
| ✔          | evdev                    | BSD License                                                          |
| ✔          | frozenlist               | Apache Software License                                              |
| ✔          | ftrack-python-api        | Apache Software License                                              |
| ✔          | future                   | MIT License                                                          |
| ✔          | gazu                     | GNU Library or Lesser General Public License (LGPL)                  |
| ✔          | google-api-core          | Apache Software License                                              |
| ✔          | google-api-python-client | Apache Software License                                              |
| ✔          | google-auth              | Apache Software License                                              |
| ✔          | google-auth-httplib2     | Apache Software License                                              |
| ✔          | googleapis-common-protos | Apache Software License                                              |
| ✔          | httplib2                 | MIT License                                                          |
| ✔          | idna                     | BSD License                                                          |
| ✔          | importlib-metadata       | Apache Software License                                              |
| ✔          | jeepney                  | MIT License                                                          |
| ✔          | jinxed                   | Mozilla Public License 2.0 (MPL 2.0)                                 |
| ✔          | jsonschema               | MIT License                                                          |
| ✔          | keyring                  | Python Software Foundation License;; MIT License                     |
| ✔          | log4mongo                | BSD License                                                          |
| ✔          | multidict                | Apache Software License                                              |
| ✖          | opencolorio              | Copyright Contributors to the OpenColorIO Project.                   |
| ✔          | paramiko                 | GNU Library or Lesser General Public License (LGPL)                  |
| ✔          | pathlib2                 | MIT License                                                          |
| ✔          | pillow                   | Historical Permission Notice and Disclaimer (HPND)                   |
| ✔          | ply                      | BSD                                                                  |
| ✔          | prefixed                 | Mozilla Public License 2.0 (MPL 2.0)                                 |
| ✔          | protobuf                 | 3-Clause BSD License                                                 |
| ✔          | pyaaf2                   | MIT License                                                          |
| ✔          | pyasn1                   | BSD License                                                          |
| ✔          | pyasn1-modules           | BSD License                                                          |
| ✔          | pyblish-base             | GNU Lesser General Public License v3 (LGPLv3)                        |
| ✔          | pycparser                | BSD License                                                          |
| ✔          | pymongo                  | Apache Software License                                              |
| ✔          | pynacl                   | Apache License 2.0                                                   |
| ✔          | pynput                   | GNU Lesser General Public License v3 (LGPLv3)                        |
| ✔          | pyparsing                | MIT License                                                          |
| ✔          | pysftp                   | BSD License                                                          |
| ✔          | python-dateutil          | Apache Software License;; BSD License                                |
| ✔          | python-engineio          | MIT License                                                          |
| ✔          | python-socketio          | MIT License                                                          |
| ✔          | python-xlib              | GNU Lesser General Public License v2 or later (LGPLv2+)              |
| ✖          | python3-xlib             | GPLv2                                                                |
| ✔          | requests                 | Apache Software License                                              |
| ✔          | rsa                      | Apache Software License                                              |
| ✔          | semver                   | BSD License                                                          |
| ✔          | shotgun-api3             | Copyright (c) 2009-2011, Shotgun Software Inc All rights reserved.   |
| ✔          | six                      | MIT License                                                          |
| ✔          | slack-sdk                | MIT License                                                          |
| ✔          | "Qt.py"                  | MIT License                                                          |
| ✔          | QtPy                     | MIT License                                                          |
| ✔          | qtawesome                | MIT License                                                          |
| ✔          | speedcopy                | Apache Software License                                              |
| ✔          | stone                    | MIT License                                                          |
| ✔          | termcolor                | MIT License                                                          |
| ✔          | uritemplate              | BSD License;; Apache Software License                                |
| ✔          | urllib3                  | MIT License                                                          |
| ✔          | wcwidth                  | MIT License                                                          |
| ✔          | websocket-client         | Apache Software License                                              |
| ✔          | wrapt                    | BSD License                                                          |
| ✔          | wsrpc-aiohttp            | Apache Software License                                              |
| ✔          | yarl                     | Apache Software License                                              |
| ✔          | zipp                     | MIT License                                                          |

