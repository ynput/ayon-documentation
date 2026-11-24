---
title: Batch delivery addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Batch delivery addon with their default values: transcoding presets, publish plugins, delivery presets, the ftrack delivery action and the Deadline submitter."
addon: batchdelivery
addon_repo: ayon-batch-delivery
addon_version: 0.5.0
addon_scope: pipeline-server
addon_flags: [licensed, power-feature]
addon_private: true
verified: 2026-11-24
---

# Batch delivery addon settings

<AddonInfo />

The settings of the [Batch delivery addon](index.md) are in **Studio settings > Batch delivery**, and every group can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. Two things the addon needs are not addon settings:

- the delivery anatomy template that **Anatomy template name** points to, with its root, is defined in the [project anatomy](../../../ayon/web-ui/project/anatomy.md); the keys the addon adds to it are listed in [Template keys](index.md#template-keys);
- the connection to the Deadline web service comes from the Deadline addon settings.

## Transcoding presets

<SettingLocation uri="ayon+settings://batchdelivery/transcoding_presets" scope="Studio, with project overrides" />

How files are converted: color transforms, resizes, file formats. A preset is used by the **Batch Transcode Submit** action, and by delivery presets and the **Integrate Enroll Offloaded Transcoding** plugin through their **Linked transcoding preset** fields. The default list has one preset named `default`.

<!-- screenshot: settings editor, Transcoding presets -->

<Settings>
<Setting name="Transcoding presets" id="transcoding-presets-list" default="One preset, default">

<Settings>
<Setting name="Name" default="default">

Unique name of the preset, offered in the actions and in the **Linked transcoding preset** fields. Letters, digits, `_`, `.` and `-`. Available as `{transcodingName}` in templates.

</Setting>
<Setting name="Input Source Overrides">

Overrides applied to the metadata of the source representation before it is processed.

<Settings>
<Setting name="Enabled" default="Enabled">

Apply the overrides.

</Setting>
<Setting name="Input colorspace" default="Empty">

Colorspace to use for the source. Anatomy context tokens are supported. When empty, the colorspace of the source is used.

</Setting>
<Setting name="Metadata overrides" default="One empty row">

Pairs of **Metadata key** and **New value** that replace metadata of the source, such as the timecode or the frame rate.

</Setting>
</Settings>

</Setting>
<Setting name="Job Definitions" default="One job, default">

The jobs of the preset, such as `exr_proxy` and `exr_highres`. All jobs of one preset run in the same Deadline job. Fields of one job:

<Settings>
<Setting name="Name" default="default">

Unique name of the job. Letters, digits, `_`, `.` and `-`. Available as `{transcodingJobName}`.

</Setting>
<Setting name="Output extension" default="Empty">

Extension of the output, without a dot, such as `mov`, `jpg` or `exr`. Available as `{ext}`. When empty, it is taken from the input representation or from the Write node of a template.

</Setting>
<Setting name="Processing backend" default="Via Nuke - transcoder">

The engine of the job:

- **Via Nuke - transcoder:** the addon builds a Nuke script with one Write node from the **Nuke processing** fields.
- **Via Nuke - template builder:** runs an existing Nuke script set in the **Nuke template processing** fields.
- **Passing through:** no conversion; the files of the source representation are copied and published as they are.

The Nuke version is set in **Extract Offloaded Transcoding** under [Publish plugins](#publish-plugins).

</Setting>
<Setting name="Representation processing" default="Extract review processing">

Steps applied to the output representation, any of **Extract review processing** (generate a reviewable from the output), **With slate**, **With thumbnail** and **Only webreview**. **Only webreview** uses the output of the job directly as the reviewable, without the standard review extraction or burnins, so the output must be in a format the web player supports.

</Setting>
<Setting name="Custom Tags" default="Empty list">

Tags added to the resulting representation.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

### Nuke processing

Used when the backend is **Via Nuke - transcoder**. The settings describe the Nuke graph, and the addon builds the script from them.

<Settings prefix="nuke-processing">
<Setting name="Root working colorspace" default="Empty">

Working colorspace of the Nuke script, such as `ACES - ACEScg`.

</Setting>
<Setting name="Effect processing" default="Two items, see below">

Chain of effects, processed from top to bottom. Each item has a **Type**, and the type selects which group of fields is used:

<Settings>
<Setting name="Type">

**Published effects** (load effects published from Hiero) or **Explicit resize** (add a reformat to a given resolution).

</Setting>
<Setting name="Color effects">

Used with **Published effects**.

<Settings>
<Setting name="Effect products" default="Empty list">

Product name patterns of the published effects to apply.

</Setting>
<Setting name="Representation name" default="effectJson">

Representation of the effect products that is loaded.

</Setting>
<Setting name="Loader plugin" default="LoadEffects">

Class name of the Nuke loader plugin that loads the effect, without the `InputProcess` suffix.

</Setting>
</Settings>

</Setting>
<Setting name="Resize to">

Used with **Explicit resize**.

<Settings>
<Setting name="Resize mode" default="Just resize">

**Just resize**, **Crop and resize**, **Resize and fill** or **Resize by percent**.

</Setting>
<Setting name="Side preference" default="Width">

Which side leads: **Width** or **Height**.

</Setting>
<Setting name="Width" default="1920">

Width in pixels, or in percent with **Resize by percent**.

</Setting>
<Setting name="Height" default="1080">

Height in pixels, or in percent with **Resize by percent**.

</Setting>
</Settings>

</Setting>
</Settings>

The default chain has two items: **Published effects** with the effect products `.*Lookinvert`, then **Explicit resize** to 1920 by 1080 with **Resize and fill**.

</Setting>
<Setting name="Write node knobs properties" default="Empty list">

Knobs set on the Write node, such as `premultiplied`. Each has a **Knob name** (unique; the name is found by pasting the node into a text editor), a **Knob type** (**Text**, **Boolean**, **Number** or **Decimal number**) and a **Value** of that type.

</Setting>
<Setting name="Type of final colorspace identification" default="From Target Colorspace">

Where the colorspace stored on the output representation comes from: **From Target Colorspace** (the **Target colorspace** fields), **From Effect chain output** (the last node of the effect chain) or **From Write Node Knob value** (the colorspace knob of the Write node).

</Setting>
<Setting name="Target colorspace">

Colorspace of the output.

<Settings>
<Setting name="Target colorspace type" default="Use Colorspace">

**Use Colorspace** or **Use Display & View**. A display and view is resolved to its colorspace.

</Setting>
<Setting name="Colorspace" default="ACES - ACEScg">

Colorspace name. Anatomy context tokens are supported.

</Setting>
<Setting name="Display & View" default="Empty">

**Display** and **View**, used with **Use Display & View**. Anatomy context tokens are supported in the view.

</Setting>
</Settings>

</Setting>
</Settings>

### Nuke template processing

Used when the backend is **Via Nuke - template builder**. This is a plain Nuke script, not a workfile template of the Nuke addon, and it has no AYON placeholders.

<Settings prefix="nuke-template-processing">
<Setting name="Nuke template script path" default="Empty">

Path to the `.nk` script. Anatomy formatting is supported, for example `{root[work]}/path/to/template.nk`, so one path works on every platform. The script needs exactly one Read node and one Write node. The output colorspace comes from the Write node, or from an OCIOColorspace node directly above it.

</Setting>
<Setting name="Representation related colorspace distribution">

<Settings>
<Setting name="Enable colorspace distribution from representation" default="Disabled">

Take the colorspace from the source representation.

</Setting>
<Setting name="Root working colorspace" default="Empty">

Working colorspace of the Nuke script.

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://batchdelivery/publish" scope="Studio, with project overrides" />

Plugins that run in publishing: the OCIO config publishing of effect products, the transcoding in the publish run on the farm, and the submission of a transcode request from a local publish. What each plugin does is described in [Publish plugins](index.md#publish-plugins) of the addon page.

<!-- screenshot: settings editor, Publish plugins -->

<Settings>
<Setting name="Collect OCIO config" default="Enabled">

Settings for building an OCIO config representation on `effect` and `ociolook` products. The collector, validator and extractor of the OCIO config all read them; only the collector has an **Enabled** switch.

<Settings>
<Setting name="Enabled" default="Enabled" />
<Setting name="Activate on product names" default="Empty list">

Product names of effect or OCIO look products that get an OCIO config representation. Regex patterns are supported.

</Setting>
<Setting name="Config default colorspace overrides">

Advanced overrides for the colorspaces of the generated config. Change only when the color management of the project needs it.

<Settings>
<Setting name="Data default colorspace" default="lin_ap0">

Default data colorspace of the config, usually ACES2065-1 (AP0).

</Setting>
<Setting name="Working colorspace" default="lin_ap1">

Working colorspace of the config, usually inherited from the application, such as ACEScg.

</Setting>
</Settings>

</Setting>
<Setting name="Target view space">

<Settings>
<Setting name="Enabled" default="Enabled">

Set a target view space on the config. When off, the default working colorspace is used.

</Setting>
<Setting name="Target view space type" default="Use Colorspace">

**Use Colorspace** or **Use Display & View**.

</Setting>
<Setting name="Colorspace" default="Output - sRGB">

Colorspace name. Anatomy context tokens are supported.

</Setting>
<Setting name="Display & View" default="ACES, sRGB">

**Display** and **View**.

</Setting>
</Settings>

</Setting>
<Setting name="Context name template" default="{project[code]}_{parent}_{folder[name]}">

Template of the name of the context, used for the items created in the config. Anatomy formatting is supported.

</Setting>
<Setting name="Allowed displays" default="ACES">

Displays allowed in the config. Regex patterns are supported.

</Setting>
<Setting name="Allowed views" default="sRGB, Rec.709, Log, Raw">

Views allowed in the config. Regex patterns are supported.

</Setting>
<Setting name="Environment variables" default="Empty list">

Pairs of **Name** and **Value** written to the config. Anatomy formatting resolves context values in the value.

</Setting>
</Settings>

</Setting>
<Setting name="Extract Offloaded Transcoding" default="Enabled">

Runs the transcoding job definitions in the publish run on the farm.

<Settings>
<Setting name="Enable" default="Enabled" />
<Setting name="Nuke variant" default="nuke/.*">

Regular expression over `<application name>/<variant>` that selects the Nuke the farm uses, matching the Applications addon settings: `nukex/16-06` for one variant, `nukex/16.*` for the highest 16 version, `nukex/.*` for the highest NukeX. The application names are `nuke`, `nukex`, `nukestudio` and `nukeassist`. When empty, the highest Nuke version is used.

</Setting>
<Setting name="Passing metadata keys from job context" default="Empty list">

Keys passed from the job context to a ModifyMetadata node under the first Read node, readable as `[metadata AYON/<key>]` in Nuke expressions. The options are **AYON/publishedDir**, **AYON/publishedFile** and **AYON/publishedVersion**.

</Setting>
</Settings>

</Setting>
<Setting name="Integrate Enroll Offloaded Transcoding" default="Enabled, not optional, active">

Submits a transcode request for the version being published in a local publish, so conversions run automatically from the Publisher. With the defaults, a request is submitted for the `exr` representation of every publish with the `default` transcoding preset. To let artists trigger it on demand, enable **Optional** and disable **Active**.

<Settings>
<Setting name="Enable" default="Enabled">

The plugin runs.

</Setting>
<Setting name="Optional" default="Disabled">

The artist can switch it off in the Publisher.

</Setting>
<Setting name="Active" default="Enabled">

It is checked when the Publisher opens.

</Setting>
<Setting name="Profiles" default="One profile">

When the plugin runs, and what it submits. The default profile has empty filters, so it matches every publish.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list">

Filters of the profile. Empty lists match everything.

</Setting>
<Setting name="Jobs" default="One job">

One transcode per item. Several jobs can target different representations, or apply several presets to the same one.

<Settings>
<Setting name="Representation name" default="exr">

Representation of the publish used as the source.

</Setting>
<Setting name="File extension (no dot)" default="exr">

Extension of the source representation. When empty, the extension of the representation is used.

</Setting>
<Setting name="Linked transcoding preset" default="default">

[Transcoding preset](#transcoding-presets) to apply.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Delivery presets

<SettingLocation uri="ayon+settings://batchdelivery/delivery_presets" scope="Studio, with project overrides" />

What a delivery picks from the selected versions, where the result is published and which transcoding preset is applied. Presets are offered by the **Batch Delivery Submit** action. The default list has one preset named `Default`; its **Anatomy template name** must match a delivery template of the project anatomy, and its product name `renderCompositingMain` can be widened, for example to `render.*`.

<!-- screenshot: settings editor, Delivery presets -->

<Settings>
<Setting name="Delivery presets" id="delivery-presets-list" default="One preset, Default">

<Settings>
<Setting name="Preset name" default="Default">

Unique name offered in the action. Available as `{deliveryPresetName}`.

</Setting>
<Setting name="Preset options">

<Settings>
<Setting name="Task types" default="Empty list">

Task types the preset is meant for. Empty means all.

</Setting>
<Setting name="Task names" default="Empty list">

Task names, with regex support. Empty means all.

</Setting>
<Setting name="Delivery jobs" default="One job">

The jobs of the preset, described in [Delivery job](#delivery-job). Each runs as its own Deadline job.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

### Delivery job

<Settings prefix="delivery-job">
<Setting name="Anatomy template name" default="delivery_template">

Name of a template in the delivery section of the project anatomy templates, which sets the path and name of the delivered files.

</Setting>
<Setting name="Version distribution">

<Settings>
<Setting name="Version distribution type" default="Separated versioning (Client review versions - locked)">

- **Separated versioning (Client review versions - locked):** delivered versions have their own numbering, starting at 1.
- **Separated versioning (Client review versions - continuous):** their own numbering, continuous.
- **Aligned versioning (Client version the same as production):** the delivered version has the number of the production version, for example v004 stays v004.

</Setting>
<Setting name="Version linking type" default="generative|version|version">

Link type created between the source version and the delivered version, one of the link types of the project. The generative link shows that the new version was generated from the source.

</Setting>
</Settings>

</Setting>
<Setting name="Type of delivery job" default="Reprocessing published data">

**Reprocessing published data**, the only option in 0.4.5. Available as `{deliveryJobType}`.

</Setting>
<Setting name="Reprocessing workflow jobs">

Used with **Reprocessing published data**. Delivered versions are ordinary publishes, so they need a folder and a task: by default they are published under the folder and task of the source.

<Settings>
<Setting name="Publish result to new folder">

<Settings>
<Setting name="Enabled" default="Disabled">

Publish the result to a new folder instead of the source folder.

</Setting>
<Setting name="Target Folder type" default="Folder">

Folder type of the new folder. Available as `{targetFolderType}`.

</Setting>
<Setting name="Target Folder name" default="{sourceFolderName}">

Name of the new folder. Anatomy formatting is supported.

</Setting>
<Setting name="Target parent folders" default="Folder Deliverables, Folder {sourceFolderPath}">

Ordered list of parent folders of the new folder, each with a **Folder type** and a **Folder name**. With the defaults, deliveries go under `Deliverables` in a flat structure, as `{sourceFolderPath}` replaces `/` with `_`.

</Setting>
</Settings>

</Setting>
<Setting name="Non-existent task override">

Task used when the source product was not published under a task.

<Settings>
<Setting name="Target task type" default="Generic" />
<Setting name="Target task name" default="roundtrip">

Anatomy formatting is supported.

</Setting>
</Settings>

</Setting>
<Setting name="Publish result to unique task">

<Settings>
<Setting name="Enabled" default="Disabled">

Publish the result to a dedicated task.

</Setting>
<Setting name="Target task type" default="Generic">

Task type of the target task. Available as `{targetTaskType}`.

</Setting>
<Setting name="Target task name" default="{targetTaskType}{deliveryPresetName}">

Name of the target task. Anatomy formatting is supported.

</Setting>
</Settings>

</Setting>
<Setting name="Reprocessing workflow jobs" id="delivery-job-reprocessing-jobs" default="One job, default">

Which published files of a version are processed. Several jobs can target different products. The names of representations and their files are shown on the version in the browser.

<Settings>
<Setting name="Name" default="default">

Name of the job. Available as `{deliveryReprJobName}`.

</Setting>
<Setting name="Product name" default="renderCompositingMain">

Pattern for the product names to process, such as `render.*Main`. Anatomy formatting is supported.

</Setting>
<Setting name="Representation name" default="exr">

Pattern for the representation names, such as `exr.*`.

</Setting>
<Setting name="File extension (no dot)" default="exr">

Extension of the representations to process.

</Setting>
<Setting name="Linked transcoding preset" default="default">

[Transcoding preset](#transcoding-presets) applied.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Ftrack delivery action

<SettingLocation uri="ayon+settings://batchdelivery/ftrack_delivery_action" scope="Studio, with project overrides" />

How the **Batch Delivery Submit** action in ftrack reads the notes of the selected versions. A version is processed only when it has a note with the client comment label; a second label sets the intent.

<!-- screenshot: settings editor, Ftrack delivery action -->

<Settings>
<Setting name="Label for client comment" default="To Client">

ftrack note label that marks the comment used in slates and deliveries.

</Setting>
<Setting name="Default intent" default="WIP">

Label used when a version has no intent label.

</Setting>
<Setting name="Label intent mapping" default="5 labels, see below">

Maps ftrack labels to an intent value, each a unique **Label** and its **Intent**. The defaults map `TEMP` to Temporary, `TEST` to Testing, `BLK` to Blocking, `WIP` to Work In Progress and `PAF` to Proposed as Final.

The value fills the `{intent}` key for the current job, for burnins or file names. It does not change the `intent` attribute of the AYON version.

</Setting>
</Settings>

## Deadline submitter

<SettingLocation uri="ayon+settings://batchdelivery/deadline_submitter" scope="Studio, with project overrides" />

Parameters of the Deadline jobs that the `DeadlineSubmitter` service submits, for both delivery and transcoding. If no job appears in Deadline, see [Services](index.md#services).

<!-- screenshot: settings editor, Deadline submitter -->

<Settings>
<Setting name="Department" default="Empty" />
<Setting name="Priority" default="50" />
<Setting name="Primary Pool" default="Empty" />
<Setting name="Secondary Pool" default="Empty" />
<Setting name="Group" default="Empty" />
<Setting name="Limit Groups" default="Empty list" />
</Settings>

## Related

- [Batch delivery addon](index.md)
- [Template keys](index.md#template-keys)
- [Project anatomy](../../../ayon/web-ui/project/anatomy.md)
