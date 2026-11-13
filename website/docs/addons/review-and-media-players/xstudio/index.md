---
title: xStudio addon
sidebar_label: Overview
description: "The AYON integration for the xStudio media player: the Open in xStudio action of the Loader, its requirements and the executable paths it uses. The addon has not been released yet."
addon: xstudio
addon_repo: ayon-xstudio
addon_version: 0.0.1
addon_scope: pipeline
addon_flags: [unreleased]
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-xstudio
---

# xStudio addon

<AddonInfo />

The xStudio addon lets AYON open published images, image sequences and videos in [xStudio](https://github.com/AcademySoftwareFoundation/xstudio), an open-source media player. It adds an **Open in xStudio** action to the AYON Loader. The addon does not ship xStudio: the location of the executable is a setting, described on the [settings page](settings.md).

:::note Unreleased
The addon has not been released yet: it has no release tag and is not published on the Market. Its current version is 0.0.1, and details may change before the first release.
:::

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.6.10 or newer |
| xStudio | Installed on the artist's machine, at a path listed in the settings |

## Actions

| Action | Where it appears | What it does |
|---|---|---|
| **Open in xStudio** | Loader, in the actions of a selected version or representation | Opens one representation in xStudio. |

The action is a loader action. It is listed under the group **Open in xStudio**, with one entry per representation name.

- It is only offered when an xStudio executable from the settings exists on the machine.
- It works on a selected version or on selected representations.
- Only representations whose extension is an image or video extension known to the core addon are listed. An entry is left out when more than one selected representation has the same name.
- The path of the representation is resolved with the project anatomy. When the file does not exist, the action fails with the message "File to open was not found...".
- For an image sequence, xStudio is started with the sequence path, written with `#` padding characters and the frame range (`<name>.####.<ext>=<first>-<last>`). A single file is opened by its path.
- xStudio is started as a separate process, so it keeps running after the Loader closes.

## Executable lookup

The addon reads the xStudio paths of the running platform from its settings and uses the first path that exists. The result is cached for 10 seconds.

## Related

- [xStudio settings](settings.md)
