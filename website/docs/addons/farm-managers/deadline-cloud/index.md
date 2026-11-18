---
title: AWS Deadline Cloud addon
sidebar_label: Overview
description: "The AYON integration for AWS Deadline Cloud: the creator and publish plugins that submit Maya, Houdini and Nuke render jobs, the publishing step that runs AYON on a worker, and its requirements."
addon: deadline_cloud
addon_repo: ayon-deadline-cloud
addon_version: 0.0.1
addon_scope: pipeline
addon_flags: [beta]
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-deadline-cloud/tree/v0.0.1-alpha.1
---

# AWS Deadline Cloud addon

<AddonInfo />

The AWS Deadline Cloud addon connects AYON to AWS Deadline Cloud, the managed render service of Amazon Web Services. It adds a `deadline_cloud` product base type to Maya, Houdini and Nuke. Publishing an instance of that type builds a job from the Deadline Cloud submitter of the application and submits it to a Deadline Cloud farm and queue. The job has a render step and a publishing step that runs AYON on a worker and registers the rendered files as a version. The addon is at version 0.0.1 and its only release is the alpha `v0.0.1-alpha.1`, so its behavior can still change. Its settings are described on the [settings page](settings.md).

AWS Deadline Cloud is a different product from the Thinkbox Deadline render farm manager. The code does not use the Deadline web service, the Deadline repository or the Deadline addon; it calls the `deadline` Python library of AWS Deadline Cloud (`deadline.client` and the submitter packages of the applications). The [Deadline addon](../deadline/index.md) covers Thinkbox Deadline.

## Requirements

| Requirement | Detail |
|---|---|
| Addon dependencies | `package.py` declares no required or compatible addons and no minimum AYON server or launcher version. |
| Applications | Maya, Houdini or Nuke through their AYON addons: the [Maya](../../3d-applications/maya/index.md), [Houdini](../../3d-applications/houdini/index.md) and [Nuke](../../compositing-editorial-applications/nuke/index.md) addons. |
| Deadline Cloud submitter | The Deadline Cloud submitter package of the application (`deadline.maya_submitter`, `deadline_cloud_for_houdini`, `deadline.nuke_submitter`) has to be importable in the application. The plugins import it directly and the addon does not install it. |
| Deadline Cloud credentials | AYON does not manage authentication. Credentials and the default farm and queue come from the Deadline Cloud configuration of each machine. |
| Publishing worker | The publishing step runs `ayon addon deadline_cloud publish`, so AYON Launcher has to be available on the worker and able to reach the AYON server and the project roots. |

The addon has no AYON services.

## What it connects

| Part | Role |
|---|---|
| Deadline Cloud submitter of the application | Supplies the job template, parameter values, queue parameters and asset references. |
| Deadline Cloud API | `create_job_from_job_bundle` submits the job bundle. The submitter name is "AYON Deadline Cloud Addon" and the job attachments file system mode is `COPIED`. |
| AYON publish pipeline | In the application it collects the job data, adds the publishing step and submits. On the worker the same pipeline runs in the `shell` host with the `farm` target and publishes the rendered files. |

## Products it can create

| Product base type | Creator | Applications |
|---|---|---|
| `deadline_cloud` | Deadline Cloud Render Job | Maya, Houdini, Nuke |

The creator builds its attributes from the `parameterDefinitions` of the job template of the submitter, so the fields in the Publisher depend on the submitter version and the scene. `STRING` and `PATH` parameters become text fields (check boxes for the `CHECK_BOX` control), `INT` parameters become number fields and, in Nuke, `DROPDOWN_LIST` parameters become drop-down lists. Other parameter types are not exposed. The `deadline_cloud` instance is not integrated as a product.

| Application | Creator details |
|---|---|
| Maya | Adds an empty dummy set to the instance so the default empty-instance check passes. Fills `ProjectPath` and `OutputFilePath` from the scene settings, or from the AYON work directory when they are empty. |
| Houdini | Creates a node of type `deadline_cloud` and uses it as the render node of the submitter settings. Its input files, input directories and output directories come from the multiparms of that node. The `productType`, `productBaseType` and `id` parameters are locked. |
| Nuke | Uses the standard AYON Nuke creator. The job attributes come from the Nuke submitter. |

## Publishing from the application

The plugins below run for `deadline_cloud` instances when the Publisher runs in the application (target `local`).

| Plugin | Order | What it does |
|---|---|---|
| Collect AWS Deadline Cloud Instances | Collector + 0.1 | Adds the `deadline_cloud` family to every instance with the `deadline_cloud` product base type and turns off integration for it. |
| Collect AWS Deadline Cloud Job Data | Collector + 0.4999 | Builds the job template, parameter values and asset references through the submitter of the host (Maya, Houdini, Nuke). Adds AYON context parameters to the template and applies overrides from the instance attributes and the settings. |
| Add Publishing Step to the Job Template | Integrator | Adds the render role requirement to the existing steps and appends the publishing step. |
| Submit Job to AWS Deadline Cloud | Integrator + 0.1 | Writes `template.yaml`, `parameter_values.yaml` and `asset_references.yaml` to a temporary job bundle and submits it. |

### Job data

The collector adds these parameters to the job template when it does not already define them: `folderPath`, `taskName`, `projectName`, `userName`, `hostName`, `sourceFile`, `productBaseType`, `variant` and `OutputFilePath`. `OutputFilePath` is the single output directory of the asset references, or their common root path when there are several; the plugin raises an error when they have no common root.

Parameter values are resolved in this order, later steps overriding earlier ones:

1. The values the submitter proposes.
2. The creator attributes of the instance, for parameters that exist in the template.
3. The **Conda Packages** and **Conda Channels** settings, when the template has `CondaPackages` and `CondaChannels` parameters and the setting is not empty.
4. Conda packages detected from the scene (implemented for Maya, Houdini and Nuke), when `CondaPackages` is still empty.
5. The **Extra Conda Packages** field of the instance in the Publisher, appended to `CondaPackages`.

**Farm ID** and **Queue ID** from the settings replace the defaults of the local Deadline Cloud configuration when they are not empty.

### Job steps

The publishing step is named `publish to AYON`. It depends on every other step of the template and runs a script that calls `ayon addon deadline_cloud publish` with the AYON context taken from the job parameters and the path mapping file of the session. Both kinds of steps are restricted by the worker capability `attr.role`: the render steps accept the roles of **render Host Requirement Roles** and the publishing step the roles of **Publish Host Requirement Roles**. The code treats every step of the template as a render step. The publishing step sets `DISABLE_CONDA_ENV` to `true`, so the queue environment can skip creating a Conda environment there, and passes `AYON_STUDIO_BUNDLE_NAME` and `AYON_BUNDLE_NAME` from the submitting session.

## Publishing on the worker

The addon adds the command `ayon addon deadline_cloud publish`. Its path argument is a folder or file with the render output.

| Option | Required | Meaning |
|---|---|---|
| `-p`, `--project-name` | Yes | AYON project. |
| `-f`, `--folder-path` | Yes | Folder path of the context. |
| `-t`, `--task-name` | No | Task of the context. |
| `-u`, `--user-name` | Yes | User the publish runs as, when the connection uses a service user. |
| `--host-name` | No | Host that submitted the job. It is accepted but not used further in this version. |
| `--product-base-type` | Yes | Product base type passed to the created instances. |
| `--variant` | Yes | Product variant. |
| `-s`, `--source-file` | No | Source workfile. |
| `--path-mapping-file` | No | JSON file with `path_mapping_rules`. The output path is remapped by replacing the first matching `source_path` prefix with its `destination_path`. |

The command starts a publish in the `shell` host with the `farm` target. The plugin **Create publishing instances from files** (collector order -0.2) creates the instances from the output path.

| Files found | Instances created |
|---|---|
| Frame sequences | One instance per sequence pattern. Sequences that differ only in file extension share an instance with one representation per extension. The variant is taken from the file name. |
| Other files | One instance when their names share a prefix of at least two characters, with a representation per file. Otherwise one instance per file. |

The instances use the family `render` and a product name built with the project settings and the product base type given on the command line. Each file gets a standard representation tagged `review` and a trait-based representation with a mime type and, for images, an image trait. Frame ranges come from the sequence indexes. The folder and the task are looked up on the AYON server and the publish fails if they do not exist. The other plugins of the publish pipeline, such as review and thumbnail extractors, then process the instances.

## Settings areas

| Area | What it covers |
|---|---|
| Farm and queue | **Farm ID** and **Queue ID** overrides of the local Deadline Cloud configuration. |
| Conda | **Conda Packages** and **Conda Channels** passed to the worker environment. |
| Host requirement roles | Worker capability values that separate render workers from publishing workers. |
| Extra job parameters | Key and value pairs for job parameters (not used by the code of this version, see the settings page). |

## Known limitations

The repository lists these limitations of the current implementation.

- The submitter packages have to be installed separately and the addon does not check that they are present.
- Only image output is supported; caches and other data are not.
- Publishing runs only on workers that have AYON Launcher and access to the studio file system. The addon does not synchronize published results from the Deadline Cloud storage.
- Path remapping on the worker is a basic string replacement.
- In Nuke, instances cover all write nodes or one, not several.

The repository README also names Blender as a supported application. The code of this version has no Blender creator and no Blender submitter bridge.

## Related

- [AWS Deadline Cloud addon settings](settings.md)
- [Deadline addon](../deadline/index.md) for Thinkbox Deadline.
