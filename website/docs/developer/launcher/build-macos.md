---
title: Build AYON launcher on macOS
sidebar_label: MacOS build steps
description: "Building the AYON launcher on macOS: the requirements, cloning the repository, preparing the environment, building, creating and uploading the installer, code signing and notarization, and all build targets."
---

# Build AYON launcher on macOS

:::warning

macOS is not fully supported. The build process may not work on some machines. A pre-built installer is uploaded with each release.

:::

## Requirements

:::important

If you are on an M1 or newer Mac, you also have to enable Rosetta virtualization on the Terminal application. Do this before you start the build process or install dependencies. If you already installed dependencies, you might have to reinstall them.

:::

To build AYON you need some tools and libraries. They are not provided, so you have to install them yourself.

- **Terminal**
- [**Homebrew**](https://brew.sh)
- [**git**](https://git-scm.com/downloads)
- [**Rust**](https://rust-lang.org/tools/install/) to build the shim
- [**uv**](https://docs.astral.sh/uv/)
- [**Python 3.11**](https://www.python.org/downloads/). The project requires 3.11.9, which uv can install.
- [**CMake**](https://cmake.org/)
- **Xcode Command Line Tools** (or some other build system)
- **create-dmg** to create the installer

### Prepare requirements

The easy way of installing everything necessary is [Homebrew](https://brew.sh).

1. Install **Homebrew**:

   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install **cmake** and **create-dmg**:

   ```sh
   brew install cmake create-dmg
   ```

3. Install [uv](https://docs.astral.sh/uv/getting-started/installation/):

   ```sh
   brew install uv
   ```

4. Install the required Python version, 3.11.x:

   ```sh
   # install Python build dependencies
   brew install openssl readline sqlite3 xz zlib

   uv python install 3.11.9
   ```

## Build

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

The build creates `./build/AYON {version}.app` and updates git submodules first. Pass `--no-submodule-update` to skip that.

#### Create installer

Create an installer that can be distributed to the server and workstations.

```sh
./tools/make.sh make-installer
```

The installer is in the `./build/installer/` directory. You should find a `.dmg` and a `.json` file. The JSON file contains the metadata required by the server.

To build and create the installer in one step, run `./tools/make.sh build-make-installer`.

#### Upload installer

To register the installer on your server, see [Upload installer to server](index.md#upload-installer-to-server).

## Code signing and notarization

To distribute AYON outside the Mac App Store, code signing and notarization are required by current macOS security policies. Signing is controlled by environment variables read by `./tools/make.sh build`. By default, `AYON_APPLE_CODESIGN` is `1`, but the app is signed only when `AYON_APPLE_SIGN_IDENTITY` is set. Set `AYON_APPLE_CODESIGN=0` to skip signing.

You need:

1. An Apple Developer account
2. A Developer ID Application certificate
3. Your 10-character Team ID

### Sign only

```sh
export AYON_APPLE_CODESIGN="1"
export AYON_APPLE_SIGN_IDENTITY="Developer ID Application: Your Name (XXXXXXXXXX)"
./tools/make.sh build-make-installer
```

### Sign and notarize

```sh
export AYON_APPLE_CODESIGN="1"
export AYON_APPLE_SIGN_IDENTITY="Developer ID Application: Your Name (XXXXXXXXXX)"
export AYON_APPLE_TEAM_ID="XXXXXXXXXX"
export AYON_APPLE_NOTARIZE="1"
export AYON_APPLE_NOTARIZE_KEYCHAIN_PROFILE="ayon-notarize"
./tools/make.sh build-make-installer
```

When notarization is enabled, the installer is submitted to Apple after the DMG is created, and the ticket is stapled to the DMG once it succeeds.

:::tip

In CI environments, use the certificate hash instead of its name for `AYON_APPLE_SIGN_IDENTITY`.

:::

### Skip signing and notarization

```sh
export AYON_APPLE_CODESIGN="0"
export AYON_APPLE_NOTARIZE="0"
./tools/make.sh build-make-installer
```

### Environment variables

| Variable | Description |
| -- | -- |
| `AYON_APPLE_CODESIGN` | `1` enables code signing (default), `0` skips it |
| `AYON_APPLE_SIGN_IDENTITY` | Certificate identity (name or hash). Required for signing |
| `AYON_APPLE_TEAM_ID` | Team ID for hardened runtime (10 characters) |
| `AYON_APPLE_ENTITLEMENTS` | Path to the entitlements file. Defaults to `tools/macos/ayon.entitlements` |
| `AYON_APPLE_NOTARIZE` | `1` submits the installer for notarization. Applies only when signing is enabled |
| `AYON_APPLE_NOTARIZE_KEYCHAIN_PROFILE` | Keychain profile name used for notarization |
| `AYON_APPLE_NOTARIZE_APPLE_ID` | Apple ID email, as an alternative to a keychain profile |
| `AYON_APPLE_NOTARIZE_PASSWORD` | Apple ID app-specific password, as an alternative to a keychain profile |
| `AYON_APPLE_NOTARIZE_TEAM_ID` | Team ID used for notarization authentication |
| `AYON_APPLE_BUNDLE_ID` | Main app bundle ID. Defaults to `com.ayon.launcher` |
| `AYON_APPLE_SHIM_BUNDLE_ID` | Shim app bundle ID. Defaults to `com.ayon.launcher.shim` |
| `AYON_APPLE_DRY_RUN` | `1` prints the commands without running them |
| `AYON_APPLE_VERBOSE` | `1` enables verbose logging |

### Verify the result

```sh
# Check the app bundle signature
codesign -v -v build/AYON\ *.app

# Check the DMG notarization ticket
xcrun stapler validate build/installer/AYON-*.dmg

# Run the Gatekeeper assessment
spctl --assess --verbose build/installer/AYON-*.dmg
```

More details, including the signing configuration and troubleshooting, are in the [signing configuration guide](https://github.com/ynput/ayon-launcher/blob/develop/tools/macos/SIGNING_CONFIG.md) in the repository.

## All targets

Run `./tools/make.sh` without arguments to print the list.

| Target | Description |
| -- | -- |
| `create-env` | Create the uv virtual environment and update it from the lock file |
| `install-runtime-dependencies` (alias `install-runtime`) | Install runtime dependencies (Qt binding) |
| `build` | Build the desktop application |
| `make-installer` | Create the installer |
| `build-make-installer` | Build the desktop application and create the installer |
| `upload` | Upload the installer to the server |
| `run` | Run the desktop application from code |
