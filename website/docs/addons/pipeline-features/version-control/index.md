---
title: Version Control addon
sidebar_label: Version Control (archived)
sidebar_class_name: addon-archived
description: "The archived AYON Version Control addon, replaced by the Perforce addon: what it did (committing publishes to Perforce and Unreal changelist sync)."
addon: version_control
addon_repo: ayon-version-control
addon_version: 0.1.1
addon_scope: pipeline
addon_flags: []
addon_archived: true
addon_last_push: 2026-02-17
verified: 2026-11-19
sources:
  - https://github.com/ynput/ayon-version-control/tree/0.1.1
---

# Version Control

<AddonInfo />

:::caution Archived
The Version Control addon is archived and no longer maintained. It is replaced by the [Perforce addon](../perforce/index.md).
:::

The Version Control addon connected AYON to Perforce (Helix Core), its only backend. It did two things:

- **Committing publishes:** profiles in the addon settings chose products whose published files were also submitted to a Perforce workspace, in addition to the normal AYON publish.
- **Unreal changelists:** before Unreal launched, a dialog let the artist sync the workspace to a changelist, and the publish stored the latest changelist as a `changelist_metadata` product, so a later job such as a farm render could sync to the same state.

The Perforce commands ran in a small local web server started by the AYON tray.

## Related

- [Perforce addon](../perforce/index.md)
