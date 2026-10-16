---
title: DJV player addon
sidebar_label: Overview
description: "The AYON integration for the DJV media player: the Open in DJV action of the Loader, the ftrack action, its requirements and the executable paths it uses."
addon: djv
addon_repo: ayon-djv
addon_version: 1.2.0
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-djv/tree/1.2.0
  - https://github.com/ynput/ayon-djv/releases
  - https://help.ayon.app/en/help/articles/0533566-djv
---

# DJV player addon

<AddonInfo />

The DJV player addon lets AYON open published images, image sequences and videos in [DJV](https://github.com/grizzlypeak3d/DJV), an open-source media player. It adds an **Open in DJV** action to the AYON Loader and, when the ftrack addon is used, a **DJV View** action in ftrack. The addon does not ship DJV: the location of the DJV executable is a setting, described on the [settings page](settings.md). The addon has no menu, creators, publish plugins or loaders that load into a scene.

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 1.6.10 or newer |
| DJV | Installed on the artist's machine, at a path listed in the settings |
| ftrack addon | Only for the **DJV View** ftrack action |

## Actions

| Action | Where it appears | What it does |
|---|---|---|
| **Open in DJV** | Loader, in the actions of a selected version or representation | Opens one representation in DJV. |
| **DJV View** | ftrack, as a user-level action of the ftrack addon | Opens an asset version component in DJV. |

### Open in DJV

The action is a loader action, so it is offered in the Loader tool. It is listed under the group **Open in DJV**, with one entry per representation name.

- It is only offered when a DJV executable from the settings exists on the machine.
- It works on a selected version or on selected representations.
- Only representations whose extension is an image or video extension known to the core addon are listed. An entry is left out when more than one selected representation has the same name.
- The path of the representation is resolved with the project anatomy. When the file does not exist, the action fails with the message "File to open was not found...".
- For an image sequence, DJV is started with the first frame of the sequence.
- DJV is started as a separate process, so it keeps running after the Loader closes.

### DJV View (ftrack)

The action is registered as a user-level ftrack event handler of the addon and appears in ftrack as **DJV View**, in the Application type. It runs on the user's machine.

- It is shown when exactly one entity is selected, the entity is an asset version or a task, and a DJV executable is found.
- For an asset version it offers the version if the file type of its first component is an image or video type. For a task it offers every asset version of that task with such a component.
- A form lists the components as `v<version> - <asset type> - <component name>`, in descending order. Only components whose folder exists on disk are listed.
- The selected file is opened in DJV.

## Executable lookup

The addon reads the DJV paths of the running platform from its settings and uses the first path that exists. The result is cached for 10 seconds.

## Related

- [DJV player settings](settings.md)
