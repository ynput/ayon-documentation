---
title: Web Publisher addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Web Publisher addon with their default values: upload directory, retention, maintenance mode, OCIO config, timeout profiles and the publish plugins."
addon: webpublisher
addon_repo: ayon-webpublisher
addon_version: 1.2.5
addon_scope: pipeline-server
addon_flags: [licensed]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/4834329-web-publisher
---

# Web Publisher addon settings

<AddonInfo />

The settings of the [Web Publisher addon](index.md), with the default values the addon ships with. Retention time is a studio-only setting; the others can be overridden per project. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

## General

| Setting | Default | Description |
|---|---|---|
| Upload directory | `/storage/addons/webpublisher/uploads` | Directory where the AYON server stores uploaded files and where the service keeps downloaded batches. |
| Copy failed logs to studio drive | Empty | Path on the studio drive where logs of failed publishes are copied. Supports anatomy placeholders such as `{root[work]}/{project[name]}`. Empty disables the copy. |
| Retention time (days) | 7.0 | How long uploaded files are kept for re-processing. |
| Maintenance mode | Off | Limits the page to administrators. |
| Maintenance message | Empty | Message shown to users who are not administrators during maintenance. When empty, a default maintenance text is shown. |

## OCIO config

The standard image I/O settings model of the AYON server (OCIO config and file rules). The addon itself does not use these values.

| Setting | Default | Description |
|---|---|---|
| OCIO config: Enabled | Off | Use the configured OCIO config. |
| OCIO config: Config path | Empty | List of paths to the OCIO config. |
| File Rules: Enabled | Off | Use the configured file rules. |
| File Rules: Rules | Empty | List of rules, each with a rule name, regex pattern, colorspace name and file extension. |

## Timeout profiles

A list of profiles, each with **Host names**, **Task types** and **Timeout (sec)**. The default has one profile: host `photoshop`, no task types, timeout 600 seconds (the default of a new profile is also 600).

In version 1.2.5 the profiles have no effect, because no publish path reads them.

## Publish plugins

### Collect published files

Configures the plugin **Collect uploaded files** and the upload boxes of the web form.

| Setting | Default | Description |
|---|---|---|
| Sync next publish version | Off | Use the highest next version of all products in the batch for every product. |
| Task type to product base type mapping | Four entries | List of entries, described below. |

An entry has a **Task type**, a **Default variant** (empty falls back to `Main` in the form) and a list of **Value** items, one per upload box. The task type `default_task_type` is used when none matches the task.

| Value item field | Default | Description |
|---|---|---|
| Description | Empty | Text of the upload box. |
| Is required | Off | At least one file must be uploaded. |
| Require sequence | Off | Uploaded files must be a sequence. |
| Allow any | Off | Any file type and number of files. |
| Extensions | Empty | Allowed extensions. |
| Families | Empty | More detailed families for additional processing. |
| Tags | Empty | Tags added to the representation for additional processing, for example `review`. |
| Resulting product base type | Empty | Product base type of the published instance. |
| Additional instances product base type | Empty | Product base types of extra instances created from the same upload, for example a `workfile` and an `image` from one `.psd`. |
| Color of upload box | `#4d7650` | Background color of the upload box. |

Default entries:

| Task type | Box 1 | Box 2 |
|---|---|---|
| `Animation` | `tvp` file, `workfile` | Sequence of `png`, `exr`, `tiff`, `tif`, `render`, family and tag `review` |
| `Compositing` | `aep` file, `workfile` | Same sequence box as `Animation` |
| `Layout` | `psd` file, `workfile` | Single `png`, `jpg`, `jpeg`, `tiff`, `tif` file, `image`, family and tag `review` |
| `default_task_type` | `tvp` or `psd` file, `workfile` | Same sequence box as `Animation` |

### Collect TVPaint instances

| Setting | Default | Description |
|---|---|---|
| Layer name regex | `(?P<layer>L[0-9]{3}_\w+)_(?P<pass>.+)` | Extracts the render layer and pass names from a TVPaint layer name. It must contain the named groups `layer` and `pass`. For `L001_Person_Hand` the layer is `L001_Person` and the pass `Hand`. |
