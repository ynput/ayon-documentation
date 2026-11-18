---
title: Web Publisher addon
sidebar_label: Overview
description: "The AYON Web Publisher addon: publishing uploaded files from the AYON web interface, the studio-side service that processes the uploads, and the plugins that turn them into products."
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

# Web Publisher addon

<AddonInfo />

The Web Publisher addon lets users publish files from the AYON web interface without the AYON launcher or access to studio storage. A user picks a task in a project, adds files, and uploads them to the AYON server as a batch. A service that runs inside the studio network downloads the batch, runs a headless publish on it and writes the result to the project's storage. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON server | 1.8.4 or newer |
| AYON core addon | 1.8.0 or newer |
| Applications addon | 0.2.0 or newer |
| TVPaint addon | 0.2.0 or newer, compatible (needed for the TVPaint plugins) |
| Service | `Webpublisher`, Docker image `ynput/ayon-webpublisher:1.1.0` |
| License | Web Publisher is a licensed addon (flag: `licensed`). Without a license the server addon rejects batch requests. |

The service needs direct access to the studio storage that holds the project roots. When it starts it checks that at least one project directory can be found in the accessible storage and stops with an error otherwise. The service is therefore best run on an on-premises AYON Service Host (ASH) worker with the storages mapped in the service settings.

## Where it appears in AYON

| Place | What it is |
|---|---|
| **Web Publisher** project page | A page in the project view of the AYON web interface, available to every user. It has a batch form and a list of batches with their upload and processing status. |
| **Publish to Web Publisher** action | A server action in the category `server`, offered for one task. It opens the page with that task selected. |
| Service | The `Webpublisher` service listens for new uploads and processes them. |
| Launcher commands | `addon webpublisher` with the commands `listen` (what the service runs), `publish` and `publishfromapp` (internal, start a publish) and a batch statistics command (`batches_stats`) that writes a CSV file. |

## Batches

A batch is one upload by one user for one task.

| Part | Description |
|---|---|
| Task | The task the publish belongs to. Its task type selects the upload options. |
| Variant | Variant name used for the created products. |
| Comment | Comment stored with the publish. |
| Version (optional) | Fixed version number instead of the next free one. Shown to administrators only. |
| Jobs | Upload boxes. Each job has a type and takes the files of that type, for example a workfile box and a render box. The type name becomes the resulting product base type. Jobs can be added and deleted. |

The upload boxes shown for a task come from the **Task type to product base type mapping** setting of the [Collect published files](settings.md#collect-published-files) plugin: the entry with the task type of the selected task, or `default_task_type` when none matches. Each entry value defines one box (allowed extensions, whether a sequence or any files are accepted, whether it is required, box color).

### Batch list

| Control | Who | What it does |
|---|---|---|
| Status of upload and processing | Everyone | Shows progress and errors. |
| **Delete** | Users, for a batch whose upload failed before processing or is still pending; administrators, for any batch | Removes the batch and its stored files. The server also limits non-managers to their own unprocessed batches. |
| **Restart** | Administrators | Processes the batch again. Enabled when the batch has failed or finished. |
| **Publish task again** | Everyone | Starts a new batch for the same task as the listed batch. |
| All batches | Administrators | List of the batches of all users. Other users see their own batches. |

When the setting **Maintenance mode** is on, users who are not administrators see the **Maintenance message** instead of the page.

## Processing

The service subscribes to upload events. For each finished upload it downloads the files into the **Upload directory** (verifying the file sizes), then starts a launcher process with the `publish` command. The publish runs with the pyblish targets `filespublish` and `webpublish` under the host `webpublisher`, as the user who uploaded. A batch can also carry a `studio_processing` flag; for such batches the listener switches to a TVPaint (`.tvpp` files) or Photoshop (`.psd`, `.psb` files) processing path. The web form of this version does not set that flag.

The service also cleans up: uploaded files and batch records older than the **Retention time** are removed, abandoned uploads are marked failed after eight hours, and files of successfully published batches are deleted from the AYON server storage. Logs of failed publishes can be copied to a studio folder (**Copy failed logs to studio drive**).

### Publish plugins

| Plugin | Type | What it does |
|---|---|---|
| Collect batch data | Collector | Loads the batch information from the batch folder. |
| Collect uploaded files | Collector | Creates an instance per uploaded job from the task type mapping: result product base type, families and tags. Can give all products the same next version (**Sync next publish version**). Target `filespublish`. |
| Collect fps | Collector | Copies the fps of the context to each instance, needed by the review extractor. |
| Collect TVPaint Workfile data | Collector | Reads layer and scene data of a TVPaint workfile. Target `tvpaint_worker`. |
| Collect TVPaint Instances | Collector | Creates workfile, review, render layer and render pass instances from TVPaint layers, using the **Layer name regex**. Target `tvpaint_worker`. |
| Extract TVPaint Sequences | Extractor | Renders TVPaint layers to image sequences for the review, render pass and render layer instances. Target `tvpaint_worker`. |
| Validate Workfile Data | Validator | Fails when the TVPaint mark in/out range does not equal the expected frame count (frame range plus handles). Target `tvpaint_worker`. |
| Clean Up Job Root | Integrator, optional, active | Removes the job's staging folder after a successful publish. |

## Related

- [Web Publisher addon settings](settings.md)
