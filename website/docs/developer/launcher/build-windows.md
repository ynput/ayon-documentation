---
title: Build AYON launcher on Windows
sidebar_label: Windows build steps
description: "Building the AYON launcher on Windows: what the build needs besides the common tools (PowerShell 7, the Visual Studio C++ build tools for Rust, Inno Setup 6), the commands, the output and the notes specific to Windows."
verified: 2026-11-12
sources:
  - https://github.com/ynput/ayon-launcher/blob/develop/tools/manage.ps1
  - https://github.com/ynput/ayon-launcher/blob/develop/tools/build_post_process.py
  - https://github.com/ynput/ayon-launcher/blob/develop/inno_setup.iss
---

# Build AYON launcher on Windows

The common tools are listed in [Requirements](../requirements.md), and the commands in [Build and upload](index.md#build-and-upload). On Windows, the build also needs:

- [**PowerShell 7**](https://github.com/PowerShell/PowerShell) to run `tools/manage.ps1`.
- The **Visual Studio C++ build tools**: Rust on Windows uses the MSVC toolchain to build the shim. The [Rust installer](https://rust-lang.org/tools/install/) offers to install them.
- [**Inno Setup 6**](https://jrsoftware.org/isdl.php) to create the installer. `ISCC.exe` must be on `PATH`, or installed in the default Program Files location.

## Build

```powershell
cd <ayon-launcher-repo-clone>
./tools/manage.ps1 create-env
./tools/manage.ps1 install-runtime-dependencies
./tools/manage.ps1 build-make-installer
```

- The application, with `ayon.exe` and `ayon_console.exe`, is in `build/output/`.
- The installer, `AYON-<version>-win-setup.exe`, and its `.json` metadata file are in `build/installer/`.
- Every run of `tools/manage.ps1` updates the git submodules first.
- `create-env` installs all optional dependencies (`uv sync --all-extras`) and the pre-commit hooks of the repository.

`./tools/manage.ps1` without arguments lists the targets, which are described in [Helper scripts](index.md#helper-scripts).
