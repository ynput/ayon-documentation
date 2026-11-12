---
title: Build AYON launcher on macOS
sidebar_label: MacOS build steps
description: "Building the AYON launcher on macOS: what the build needs besides the common tools (Xcode Command Line Tools, create-dmg), the commands and the output, and code signing and notarization with their environment variables."
verified: 2026-11-12
sources:
  - https://github.com/ynput/ayon-launcher/blob/develop/tools/make.sh
  - https://github.com/ynput/ayon-launcher/blob/develop/tools/build_post_process.py
  - https://github.com/ynput/ayon-launcher/blob/develop/tools/macos/SIGNING_CONFIG.md
  - https://github.com/ynput/ayon-launcher/releases/tag/1.5.0
---

# Build AYON launcher on macOS

:::warning Apple silicon

Since [launcher 1.5.0](https://github.com/ynput/ayon-launcher/releases/tag/1.5.0), the macOS builds in the releases are for Apple silicon (`arm64`, M1 or newer). Intel Macs need a launcher and a dependency package built for Intel, see [Intel and Apple silicon Macs](#intel-and-apple-silicon-macs).

:::

The common tools are listed in [Requirements](../requirements.md), and the commands in [Build and upload](index.md#build-and-upload). On macOS, the build also needs:

- **Xcode Command Line Tools**, installed with `xcode-select --install`.
- [**create-dmg**](https://github.com/create-dmg/create-dmg) to create the installer, for example with `brew install create-dmg`.

## Build

```bash
cd <ayon-launcher-repo-clone>
./tools/make.sh create-env
./tools/make.sh install-runtime-dependencies
./tools/make.sh build-make-installer
```

- The application is `build/AYON <version>.app`.
- The installer, `AYON-<version>-macos.dmg`, and its `.json` metadata file are in `build/installer/`.
- The build installs `cargo-bundle` with Rust's `cargo` to bundle the shim.
- The build updates the git submodules first. To skip that, `--no-submodule-update` goes before the target: `./tools/make.sh --no-submodule-update build`.

## Intel and Apple silicon Macs

The launcher and the dependency package for macOS have to be built for the same architecture: `arm64` for Apple silicon or `x86_64` for Intel. A mismatch fails with an `incompatible architecture` error.

A bundle has one launcher version and one dependency package for macOS, so all the Macs that use a bundle run the same architecture:

- **Apple silicon only:** the official releases and an `arm64` dependency package, built on an Apple silicon Mac.
- **Intel, or a mix of Intel and Apple silicon:** a launcher and a dependency package built for Intel. Apple silicon Macs run them through Rosetta, while Intel Macs cannot run `arm64` builds. Both are built on an Intel Mac, or on an Apple silicon Mac in a terminal that runs under Rosetta, keeping the Intel and `arm64` environments apart so their libraries don't mix.

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
| `AYON_APPLE_NOTARIZE_KEYCHAIN_PROFILE` | Keychain profile name used for notarization. Required for notarization |
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

`./tools/make.sh` without arguments lists the targets, which are described in [Helper scripts](index.md#helper-scripts).
