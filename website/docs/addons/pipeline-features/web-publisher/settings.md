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
verified: 2026-11-18
---

# Web Publisher addon settings

<AddonInfo />

The settings of the [Web Publisher addon](index.md) are in **Studio settings > Webpublisher**. The upload directory, the log copy and the retention time are studio only; the other settings can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting.

## General

<SettingLocation uri="ayon+settings://webpublisher" scope="Studio only, except the maintenance settings" />

Storage of uploads and logs, and maintenance mode.

<!-- screenshot: settings editor, Web Publisher general settings -->

<Settings>
<Setting name="Upload directory" default="/storage/addons/webpublisher/uploads">

Directory where the AYON server stores uploaded files and where the service keeps downloaded batches. Studio only.

</Setting>
<Setting name="Copy failed logs to studio drive" default="Empty">

Path on the studio drive where the logs of failed publishes are copied, such as `{root[work]}/webpublisher_logs`. Anatomy placeholders such as `{root[work]}/{project[name]}` are supported. Empty disables the copy. Studio only.

</Setting>
<Setting name="Retention time (days)" default="7.0">

How long uploaded files are kept for re-processing. Studio only.

</Setting>
<Setting name="Maintenance mode" default="Disabled">

Limits the page, the uploads and the processing to administrators.

</Setting>
<Setting name="Maintenance message" default="Empty">

Message shown to users who are not administrators during maintenance. When empty, a default maintenance text is shown.

</Setting>
</Settings>

## OCIO config

<SettingLocation uri="ayon+settings://webpublisher/imageio" scope="Studio, with project overrides" />

The standard image I/O settings of the AYON server. The addon itself does not use these values.

<!-- screenshot: settings editor, OCIO config -->

<Settings>
<Setting name="OCIO config">

<Settings>
<Setting name="Enabled" default="Disabled">

Use the configured OCIO config.

</Setting>
<Setting name="Config path" default="Empty list">

Paths to the OCIO config.

</Setting>
</Settings>

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Enabled" default="Disabled">

Use the configured file rules.

</Setting>
<Setting name="Rules" default="Empty list">

Each rule has a name, a regex pattern, a colorspace name and a file extension.

</Setting>
</Settings>

</Setting>
</Settings>

## Timeout profiles

<SettingLocation uri="ayon+settings://webpublisher/timeout_profiles" scope="Studio, with project overrides" />

Meant to limit how long a publish may run per host and task type. In version 1.2.5 the profiles have no effect, because no publish path reads them.

<!-- screenshot: settings editor, Timeout profiles -->

<Settings>
<Setting name="Timeout profiles" id="timeout-profiles-list" default="One profile: photoshop, 600">

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Timeout (sec)" default="600" />
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://webpublisher/publish" scope="Studio, with project overrides" />

How uploaded files become products, and how TVPaint layers are split. The plugins are described in [Publish plugins](index.md#publish-plugins) of the addon page.

<!-- screenshot: settings editor, Publish plugins -->

### Collect published files

<SettingLocation uri="ayon+settings://webpublisher/publish/CollectPublishedFiles" scope="Studio, with project overrides" />

Configures the plugin **Collect uploaded files** and the upload boxes of the web form: which files a task type accepts, the product base type they are published as, and the tags of their representation. For example, a `.png` upload can create a `render` product whose representation has the `review` tag, so a review is created from it.

<Settings prefix="collect-published-files">
<Setting name="Sync next publish version" default="Disabled">

Give every product of the batch the same version: the highest next version of all of them.

</Setting>
<Setting name="Task type to product base type mapping" default="Four entries">

One entry per task type, with unique names. The entry `default_task_type` is used when none matches the task.

<Settings>
<Setting name="Task type">

Name of the task type.

</Setting>
<Setting name="Default Variant" default="Empty">

Variant offered in the form. Empty falls back to `Main`.

</Setting>
<Setting name="Value" default="Empty list">

One item per upload box.

<Settings>
<Setting name="Description" default="Empty">

Text of the upload box.

</Setting>
<Setting name="Is required" default="Disabled">

At least one file must be uploaded.

</Setting>
<Setting name="Require sequence" default="Disabled">

The uploaded files must be a sequence.

</Setting>
<Setting name="Allow any" default="Disabled">

Any file type and number of files.

</Setting>
<Setting name="Extensions" default="Empty list">

Allowed extensions.

</Setting>
<Setting name="Families" default="Empty list">

More detailed families for additional processing.

</Setting>
<Setting name="Tags" default="Empty list">

Tags added to the representation for additional processing, for example `review`.

</Setting>
<Setting name="Resulting product base type" default="Empty">

Product base type of the published instance.

</Setting>
<Setting name="Additional instances product base type" default="Empty list">

Product base types of extra instances created from the same upload, for example a `workfile` and an `image` from one `.psd`.

</Setting>
<Setting name="Color of upload box" default="#4d7650">

Background color of the upload box.

</Setting>
</Settings>

</Setting>
</Settings>

The default entries each have two boxes:

- `Animation`: a `tvp` file as `workfile`; a sequence of `png`, `exr`, `tiff` or `tif` as `render`, with the family and tag `review`.
- `Compositing`: an `aep` file as `workfile`; the same sequence box as `Animation`.
- `Layout`: a `psd` file as `workfile`; a single `png`, `jpg`, `jpeg`, `tiff` or `tif` file as `image`, with the family and tag `review`.
- `default_task_type`: a `tvp` or `psd` file as `workfile`; the same sequence box as `Animation`.

The workfile boxes are green (`#4d7650`), the sequence boxes red (`#764d4d`) and the `Layout` image box blue (`#4d5b76`).

</Setting>
</Settings>

### Collect TVPaint instances

<SettingLocation uri="ayon+settings://webpublisher/publish/CollectTVPaintInstances" scope="Studio, with project overrides" />

<Settings prefix="collect-tvpaint-instances">
<Setting name="Layer name regex" default="(?P<layer>L[0-9]{3}_\w+)_(?P<pass>.+)">

Extracts the render layer and pass names from a TVPaint layer name, to create the render pass instances. It must contain the named groups `layer` and `pass`. For `L001_Person_Hand`, the layer is `L001_Person` and the pass `Hand`.

</Setting>
</Settings>

## Related

- [Web Publisher addon](index.md)
- [Batches](index.md#batches)
