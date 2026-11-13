---
title: Batch delivery addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Batch delivery addon with their default values: transcoding presets, publish plugins, delivery presets, the ftrack delivery action and the Deadline submitter."
addon: batchdelivery
addon_repo: ayon-batch-delivery
addon_version: 0.4.5
addon_scope: pipeline-server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/9181441-batch-delivery-configuration
  - https://help.ayon.app/en/articles/8965048-batch-delivery-hand-book
---

# Batch delivery addon settings

<AddonInfo />

The settings of the [Batch delivery addon](index.md), with the default values the addon ships with. They are studio settings that can be overridden per project, and the editor marks overridden values. See [settings and scopes](../../../ayon/backend/settings/index.md) (planned).

The addon has five settings areas.

| Area | Setting key | Purpose |
|---|---|---|
| [Transcoding presets](#transcoding-presets) | `transcoding_presets` | How files are converted. Used by the transcode action and by delivery presets. |
| [Publish plugins](#publish-plugins) | `publish` | OCIO config publishing, offloaded transcoding and transcode submission during publishing. |
| [Delivery presets](#delivery-presets) | `delivery_presets` | What a delivery picks, where the result is published and which transcoding preset is applied. |
| [Ftrack delivery action](#ftrack-delivery-action) | `ftrack_delivery_action` | Note labels and intent mapping for the ftrack action. |
| [Deadline submitter](#deadline-submitter) | `deadline_submitter` | Deadline job parameters. |

Setting URIs of the form `ayon+settings://batchdelivery/transcoding_presets` refer to these areas.

## Transcoding presets

A list of presets. The default list has one preset named `default`. Preset names are used by the **Linked transcoding preset** fields and by the `{transcodingName}` template key.

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Unique name of the preset. |
| Input Source Overrides | see below | Overrides applied to the source representation before processing. |
| Job Definitions | one job, `default` | The jobs of the preset. All jobs of one preset run in the same Deadline job. |

### Input source overrides

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Apply the overrides to the metadata of the source. |
| Input colorspace | empty | Colorspace to use for the source. Anatomy context tokens are supported. When empty, the colorspace of the source is used. |
| Metadata overrides | one empty row | List of **Metadata key** and **New value** pairs that replace metadata of the source, such as timecode or frame rate. |

### Job definition

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Name of the job. Available as `{transcodingJobName}`. |
| Output extension | empty | Extension of the output without a dot. Available as `{ext}`. When empty, it is taken from the input representation or from the Write node of a template. |
| Processing backend | `nuke_transcoder` | The engine: **Nuke processing** (`nuke_transcoder`) or **Nuke template processing** (`nuke_template`). |
| Representation processing | `review` | Processing steps applied to the output representation: `review` (extract review processing), `add_slate` (with slate), `with_thumb` (with thumbnail), `only_webreview` (use the job output directly as the web reviewable). |
| Custom Tags | empty | Tags added to the resulting representation. |

### Nuke processing

Used when the backend is `nuke_transcoder`. The addon builds a Nuke script with one Write node from these settings.

| Setting | Default | Description |
|---|---|---|
| Root working colorspace | empty | Working colorspace of the Nuke script. |
| Effect processing | two items, see below | Chain of effects. Processed from top to bottom. |
| Write node knobs properties | empty | Knobs set on the Write node. Each has **Knob name**, **Knob type** (text, boolean, number or decimal number) and a **Value** of that type. |
| Type of final colorspace identification | `target_colorspace` | Where the colorspace stored on the output representation comes from. |
| Target colorspace | see below | Colorspace of the output. |

Effect processing items have a **Type**: **Published effects** (`published_effects`) or **Explicit resize** (`resize_to`). Both items carry both groups of fields; the type selects the one that is used.

| Setting | Default | Description |
|---|---|---|
| Effect products | `.*Lookinvert` (first item) | Product name patterns of published effects to apply. |
| Representation name | `effectJson` | Representation of the effect products that is loaded. |
| Loader plugin | `LoadEffects` | Class name of the Nuke loader plugin that loads the effect, without the `.*InputProcess` suffix. |
| Resize mode | `resize` (first item), `resize_fill` (second item) | One of `resize` (just resize), `crop_resize` (crop and resize), `resize_fill` (resize and fill), `resize_percent` (resize by percent). |
| Side preference | `width` | Which side, width or height, leads. |
| Width | 1920 | Width in pixels, or percent for resize by percent. |
| Height | 1080 | Height in pixels, or percent for resize by percent. |

The default chain has two items: published effects matching `.*Lookinvert`, then an explicit resize to 1920 by 1080 with `resize_fill`.

Target colorspace:

| Setting | Default | Description |
|---|---|---|
| Target colorspace type | `colorspace` | Use a colorspace name, or a display and view (the view is resolved to its colorspace). |
| Colorspace | `ACES - ACEScg` | Colorspace name. Anatomy context tokens are supported. |
| Display & View | empty | **Display** and **View**, used when the type is display and view. |

### Nuke template processing

Used when the backend is `nuke_template`.

| Setting | Default | Description |
|---|---|---|
| Nuke template script path | empty | Path to the Nuke script. Anatomy formatting is supported, for example `{root[work]}`. The script needs exactly one Read node and one Write node and that the output colorspace comes from the Write node, or from an OCIOColorspace node directly above it. |
| Enable colorspace distribution from representation | Off | Under **Representation related colorspace distribution**. |
| Root working colorspace | empty | Under **Representation related colorspace distribution**. |

## Publish plugins

### Collect OCIO config

Collects the settings for an OCIO config on `effect` and `ociolook` instances. The three plugins of the OCIO config share these settings; only this one has an **Enabled** switch.

| Setting | Default | Description |
|---|---|---|
| Enabled | On | Run the plugin. |
| Activate on product names | empty | Product name patterns of effect or OCIO look products that get an OCIO config representation. Regex patterns are supported. |
| Data default colorspace | `lin_ap0` | Default data colorspace of the generated config. Under **Config default colorspace overrides**. |
| Working colorspace | `lin_ap1` | Working colorspace of the generated config. Under **Config default colorspace overrides**. |
| Target view space: Enabled | On | Set a target view space on the config. When off, the default working colorspace is used. |
| Target view space type | `colorspace` | `colorspace` (use colorspace) or `display_view` (use display and view). |
| Target view space: Colorspace | `Output - sRGB` | Colorspace name. Anatomy context tokens are supported. |
| Target view space: Display & View | `ACES` and `sRGB` | Display and view. |
| Context name template | `{project[code]}_{parent}_{folder[name]}` | Template of the name of the context; used for new items created in the config. |
| Allowed displays | `ACES` | Displays allowed in the config. Regex patterns are supported. |
| Allowed views | `sRGB`, `Rec.709`, `Log`, `Raw` | Views allowed in the config. Regex patterns are supported. |
| Environment variables | empty | List of **Name** and **Value** pairs written to the config. Anatomy formatting resolves context values. |

### Extract Offloaded Transcoding

| Setting | Default | Description |
|---|---|---|
| Enable | On | Run the plugin. |
| Nuke variant | `nuke/.*` | Regular expression over `<application name>/<variant>` that selects the Nuke to use, such as `nuke/15.*` or `nukex/15.0v4`. When empty, the highest Nuke version is used. |
| Passing metadata keys from job context | empty | Keys passed from the job context to a ModifyMetadata node under the first Read node, readable as `[metadata AYON/<key>]` in Nuke expressions. The editor offers `publishedDir`, `publishedFile` and `publishedVersion`. |

### Integrate Enroll Offloaded Transcoding

Submits a transcode request during a local publish.

| Setting | Default | Description |
|---|---|---|
| Enable | On | The plugin exists. |
| Optional | Off | The artist can switch it off in the Publisher. |
| Active | On | It is selected by default in the Publisher. |
| Profiles | one profile | See below. |

A profile has filters and jobs. The default profile has empty filters (it matches every publish) and one job.

| Setting | Default | Description |
|---|---|---|
| Host names, Task types, Task names, Product base types, Product names | empty | Filters. Empty lists match everything. |
| Jobs: Representation name | `exr` | Source representation of the job. |
| Jobs: File extension (no dot) | `exr` | Extension of the source representation. When empty, the extension of the representation is used. |
| Jobs: Linked transcoding preset | `default` | Transcoding preset to apply. |

With the defaults, the plugin is enabled, not optional and active, so a transcode request is submitted for the `exr` representation of every publish, using the `default` transcoding preset.

## Delivery presets

A list of presets, offered by the **Batch Delivery Submit** action. The default list has one preset named `Default`.

| Setting | Default | Description |
|---|---|---|
| Preset name | `Default` | Name offered in the action. Available as `{deliveryPresetName}`. |
| Task types | empty | Task types the preset is meant for. Empty means all. |
| Task names | empty | Task names, with regex support. Empty means all. |
| Delivery jobs | one job | The jobs of the preset. Each runs as its own Deadline job. |

### Delivery job

| Setting | Default | Description |
|---|---|---|
| Anatomy template name | `delivery_template` | Name of a template in the delivery section of the project anatomy templates. |
| Version distribution type | `separated` | `separated` (delivery versions are separate and locked), `separated-continuous` (separate and continuous) or `aligned` (same version number as production). |
| Version linking type | `generative\|version\|version` | Link type created between the source version and the delivered version. |
| Type of delivery job | `reprocessing` | Reprocessing published data. The only option offered in 0.4.5. |

### Reprocessing workflow jobs

| Setting | Default | Description |
|---|---|---|
| Publish result to new folder: Enabled | Off | Publish the result to a new folder. |
| Target Folder type | `Folder` | Folder type of the new folder. Available as `{targetFolderType}`. |
| Target Folder name | `{sourceFolderName}` | Name of the new folder. Anatomy formatting is supported. |
| Target parent folders | `Folder` / `Deliverables`, `Folder` / `{sourceFolderPath}` | Ordered list of parent folders, each with a **Folder type** and **Folder name**. |
| Non-existent task override: Target task type | `Generic` | Task type used when the source product has no task. |
| Non-existent task override: Target task name | `roundtrip` | Task name used when the source product has no task. |
| Publish result to unique task: Enabled | Off | Publish the result to a dedicated task. |
| Publish result to unique task: Target task type | `Generic` | Task type of the target task. Available as `{targetTaskType}`. |
| Publish result to unique task: Target task name | `{targetTaskType}{deliveryPresetName}` | Task name. Anatomy formatting is supported. |
| Reprocessing workflow jobs | one job, `default` | Which published files are processed, see below. |

Each reprocessing job:

| Setting | Default | Description |
|---|---|---|
| Name | `default` | Name of the job. Available as `{deliveryReprJobName}`. |
| Product name | `renderCompositingMain` | Pattern for the product names to process, such as `render.*Main`. Anatomy formatting is supported. |
| Representation name | `exr` | Pattern for the representation names. |
| File extension (no dot) | `exr` | Extension of the representations to process. |
| Linked transcoding preset | `default` | Transcoding preset applied. |

## Ftrack delivery action

| Setting | Default | Description |
|---|---|---|
| Label for client comment | `To Client` | ftrack note label that marks the comment used in slates and deliveries. Only versions with such a note are processed. |
| Default intent | `WIP` | Label used when a version has no intent label. |
| Label intent mapping | `TEMP` to Temporary, `TEST` to Testing, `BLK` to Blocking, `WIP` to Work In Progress, `PAF` to Proposed as Final | Maps ftrack labels to the intent value. |

The mapping fills the `{intent}` key for the current job and does not change the `intent` attribute of the AYON version.

## Deadline submitter

Parameters of the Deadline jobs that the `DeadlineSubmitter` service submits, for both delivery and transcoding.

| Setting | Default | Description |
|---|---|---|
| Department | empty | Deadline department. |
| Priority | 50 | Deadline priority. |
| Primary Pool | empty | Deadline pool. |
| Secondary Pool | empty | Deadline secondary pool. |
| Group | empty | Deadline group. |
| Limit Groups | empty | Deadline limit groups. |
