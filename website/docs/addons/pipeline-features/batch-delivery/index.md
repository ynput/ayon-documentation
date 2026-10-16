---
title: Batch delivery addon
sidebar_label: Overview
description: "The AYON Batch delivery addon: server actions that submit delivery and transcoding jobs to Deadline, the Deadline submitter service, the publish plugins it adds, its ftrack action and its requirements."
addon: batchdelivery
addon_repo: ayon-batch-delivery
addon_version: 0.4.5
addon_scope: pipeline-server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/1653353-introduction-ayon-batch-delivery
  - https://help.ayon.app/en/articles/0910045-batch-delivery-user-guide
  - https://help.ayon.app/en/articles/9181441-batch-delivery-configuration
  - https://help.ayon.app/en/articles/8965048-batch-delivery-hand-book
---

# Batch delivery addon

<AddonInfo />

The Batch delivery addon prepares published versions for hand-off to clients and vendors. A user selects versions in AYON and triggers an action; the AYON server records the request, a service submits it as a job to a Deadline render farm, and the farm re-processes the published files (for example a color transform, a resize or a new file format) with Nuke. The result is published back into the project, either as a new version in a delivery location or as an extra representation of the source version. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.8.0 or newer, below 2.0.0 |
| AYON launcher | 1.3.0 or newer |
| Required addons | `core` 1.4.0 or newer, `ayon_third_party` 1.1.0 or newer, `applications` 1.1.0 or newer, `deadline` 0.5.10 or newer, `nuke` 0.3.4 or newer |
| Compatible addons | `ftrack` newer than 1.2.0 (for the ftrack action), `hiero` 0.5.2 or newer (for published effects) |
| Service | `DeadlineSubmitter`, run by the AYON server as a service (see [Services](#services)) |

The farm processing is Deadline only. The `deadline` addon provides the connection to the Deadline web service; the `nuke` and `applications` addons provide the Nuke executable that the farm job starts.

## What the addon adds to the pipeline

| Part | Where it appears | What it does |
|---|---|---|
| **Batch Delivery Submit** action | Server action on versions | Submits the selected versions for delivery with a chosen delivery preset. |
| **Batch Transcode Submit** action | Server action on versions | Submits the selected versions for transcoding with a chosen transcoding preset and source representation. |
| **Integrate Enroll Offloaded Transcode** plugin | Publisher, in local publishing | Submits a transcode request automatically for a version that is being published. |
| **Batch Delivery Submit** action in ftrack | ftrack | Submits the selected ftrack versions for delivery. |
| `DeadlineSubmitter` service | AYON server services | Turns requests into Deadline jobs and tracks them. |
| Offloaded publish plugins | The publish run on the farm | Re-process and integrate the result (see [Publish plugins](#publish-plugins)). |
| Anatomy template keys | Delivery anatomy templates | Extra keys for naming deliverables (see [Template keys](#template-keys)). |

## Actions

Both server actions are registered for the `version` entity and allow several versions to be selected. They are labeled **Batch Delivery Submit** and **Batch Transcode Submit**. They are shown where versions are listed, for example in the version details panel of the Products and Lists pages.

| Action | Asks for | Submits | Result |
|---|---|---|---|
| **Batch Delivery Submit** | A delivery preset (from `delivery_presets`). | One request for the selected versions; one Deadline job per delivery job of the preset and version. | A new version at the destination folder and task that the preset defines. |
| **Batch Transcode Submit** | A transcoding preset (from `transcoding_presets`) and, for each selected version, one source representation. | One or more Deadline jobs per version, following the job definitions of the preset. | New representations on the source version. |

Both actions pass the user name, the settings variant (production, staging or a development bundle) and the version `comment` and `intent` attributes with the request. The server exposes the request as the endpoint `request_offloaded_process` of the addon, which the actions and the Publisher plugin use.

A request is an event of the topic `ayon.batchdelivery.offload_process.request`. The service answers it with a job event of the topic `ayon.batchdelivery.offload_process.job`, which shows the state of the farm job and can be read in the event viewer of the AYON server.

## Services

The addon declares one service.

| Service | Image | Role |
|---|---|---|
| `DeadlineSubmitter` | `ynput/ayon-batchdelivery-deadline-submitter:<addon version>` | Enrolls in the request events, reads the Deadline connection of the project from the `deadline` addon settings, submits a job of the Deadline plugin `Ayon` with the parameters of the **Deadline submitter** settings, and dispatches a job event that tracks it. |

The service needs network access to the Deadline web service configured in the `deadline` addon. If requests are submitted but no job appears in Deadline, the service state, its connection to the Deadline web service and its log are the places to look. The farm submission parameters come from the **Deadline submitter** settings.

## Delivery and transcoding

### Delivery presets

A delivery preset lists *delivery jobs*. Each delivery job names an anatomy delivery template, a version distribution mode, and one job type. The only job type selectable in 0.4.5 is **Reprocessing published data**.

A reprocessing delivery job defines:

- **Reprocessing jobs**: filters (product name, representation name and extension, all with regex or anatomy template support) that pick the published files, and the transcoding preset applied to them.
- **Hierarchy options**: where the delivered version is published (a new folder with parent folders, a unique task, and a fallback task when the source product has no task).
- **Version distribution**: `separated` (delivery versions start at their own numbering and stay locked), `separated-continuous`, or `aligned` (the delivery version equals the production version), and the link type created between source and delivered version (default `generative|version|version`).

### Transcoding presets

A transcoding preset holds *input source overrides* (an input colorspace and metadata overrides) and a list of *job definitions*. All job definitions of one preset run in the same Deadline job. A job definition selects a processing backend:

| Backend | Setting value | How it works |
|---|---|---|
| Nuke transcoder | `nuke_transcoder` | Builds a Nuke script from the settings: a root working colorspace, an ordered effect chain (published effects loaded through a Nuke loader plugin, and an explicit resize), knobs for the Write node and a target colorspace. |
| Nuke template | `nuke_template` | Runs an existing Nuke script (a template path) that the settings point to. |

The Nuke version is chosen with a regular expression over the application name and variant, such as `nuke/.*`, set in the **Extract Offloaded Transcoding** plugin settings.

The settings classes also contain an OIIO tool processing model (`OIIOToolProcessingModel`). It is not part of the backend choice in 0.4.5.

## Publish plugins

The addon adds publish plugins that run in different publish targets. `offloaded_processor` is the target of the publish run that the farm job starts; `local` is a normal publish from an application.

| Plugin | Order | Target | What it does |
|---|---|---|---|
| Collect OCIO Config Publishing | Collector | no restriction | For `effect` and `ociolook` instances whose product name matches, adds the `ocioconfig` family and the data to build an OCIO config. |
| Validate OCIO Config Publishing | Validator | no restriction | For `ocioconfig` instances, checks that the OCIO config data is valid, that the target view space exists in the config when enabled, and that the context name template resolves. |
| Extract OCIO Config Publishing | Extractor + 0.1 | no restriction | For `ocioconfig` instances, writes an OCIO config file as a representation, with the configured environment variables and resolved context values. |
| Collect Offloaded Processing Context | Collector - 0.399 | `offloaded_processor` | Reads the request and builds the publish context and instances from the selected versions. |
| Collect Delivery Context Data | Collector + 0.499 | `offloaded_processor` | Restores the anatomy data of the source and computes the published directory and file paths of the result. |
| Extract Offloaded Transcode | Extractor - 0.009 | `offloaded_processor` | Prepares the Nuke processing for the job definitions (transcoder or template backend), with colorspace handling and effect chains. |
| Integrate Delivery Product | Integrator | `offloaded_processor` | Registers the product, version and representations in the database and transfers the files. |
| Connect Dependency Offloaded processing links | Integrator + 0.2 | `offloaded_processor` | Links the source version and the output version (link name `Offloaded Processing`). |
| Integrate Enroll Offloaded Transcode | Integrator + 0.4999 | `local` | For a version that is being published, submits a transcode request for the representations that match a profile. Can be optional and active by default. |

The offloaded transcode extractor also reads the output frame rate from the Nuke Write node (`mov64_fps` for MOV and `mxf_edit_rate_knob` for MXF) and stores it in the representation (since 0.4.x).

## Template keys

The addon adds keys that can be used in delivery anatomy templates and in the settings fields that support anatomy formatting.

| Key | Meaning |
|---|---|
| `deliveryPresetName` | Name of the delivery preset. |
| `deliveryJobType` | Job type of the delivery job. |
| `deliveryReprJobName` | Name of the reprocessing job. |
| `targetTaskType` | Target task type of the delivery. |
| `targetFolderType` | Target folder type of the delivery. |
| `sourceFolderName` | Name of the source folder. |
| `sourceFolderPath` | Path of the source folder with `/` replaced by `_`, for a flat delivery structure. |
| `sourceParentFolderName` | Name of the parent of the source folder. |
| `sourceTaskName`, `sourceTaskType` | Task of the source version. |
| `transcodingName` | Name of the transcoding preset. |
| `transcodingJobName` | Name of the transcoding job definition. |
| `ext` | Output extension of the job definition. |

The delivery anatomy template itself is defined in the project anatomy, not in this addon.

## ftrack

When the `ftrack` addon is used, the addon ships an ftrack event handler package (served from the addon's private files) that adds a **Batch Delivery Submit** action to ftrack. It is offered for asset versions, review sessions and asset version lists. The **Ftrack delivery action** settings define which note label marks a client comment and how ftrack labels map to the `intent` value that is available to templates.

## Related

- [Batch delivery addon settings](settings.md)
