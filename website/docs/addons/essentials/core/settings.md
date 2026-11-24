---
title: Core addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON core addon with their default values: general studio settings, tools (creator, workfiles, loader, publish, delivery), version start, color management, the publish plugins and the workfile actions."
addon: core
addon_repo: ayon-core
addon_version: 1.10.9
addon_scope: pipeline
addon_flags: []
verified: 2026-11-24
sources:
  - https://github.com/ynput/ayon-core/tree/1.10.9/server/settings
---

# Core addon settings

<AddonInfo />

The settings of the [core addon](index.md) are in **Studio settings > Core**, and projects can override most of them in **Project settings > Core**. Pasting a location below into the URI bar of the web app opens that setting. How studio values and project overrides combine is described in [Settings](../../../ayon/how-ayon-works/settings.md). The templates that the profiles below select by name (work, publish, hero and staging templates) are defined in the [project anatomy](../../../ayon/web-ui/project/anatomy.md), not here, and the color management switch and file rules of each application are in the settings of its host addon.

Most lists are **profile lists**: each profile has filters, such as **Host names**, **Task types**, **Task names**, **Product base types** or **Product names**, and values. An empty filter matches everything, and filter values can be regular expressions. The profile whose filters match the most values of the context is used; when several match equally, the earlier one in the list wins. A profile without filters acts as the default. When no profile matches, the feature uses its built-in behavior, which is given for each list.

## General

<SettingLocation uri="ayon+settings://core" scope="Studio only, or studio settings read by the launcher" />

Identity of the studio, global environment variables and the start-up behavior of the AYON Launcher. Disk mapping and the update check are read from the studio settings when the launcher starts, so project overrides of them have no effect.

<!-- screenshot: settings editor, General -->

<Settings prefix="general">
<Setting name="Studio name" default="Empty">

Full name of the studio. Studio only. Can be used as a variable in some places.

</Setting>
<Setting name="Studio code" default="Empty">

Short code of the studio. Studio only.

</Setting>
<Setting name="Global environment variables" default="STUDIO_SW example">

JSON object of environment variables applied to AYON processes. Studio only. A value can be a string or an object with a value per platform (`windows`, `linux`, `darwin`). The default sets `STUDIO_SW` to `P:/REPO_SW` on Windows and `/mnt/REPO_SW` on Linux and macOS, as an example.

</Setting>
<Setting name="Update check interval (minutes)" default="5">

How often the tray checks the server for a changed bundle. `0` switches the periodic check off. See [AYON Launcher](../../../pipeline/launcher.md).

</Setting>
<Setting name="Disk mapping" default="Empty lists">

Per platform (**Windows**, **Linux**, **MacOS**) a list of paths to map when the launcher starts, so project files are reachable under the same path on every machine.

<Settings>
<Setting name="Source" default="Empty">

Existing path, for example a network share.

</Setting>
<Setting name="Destination" default="Empty">

Path under which the source becomes available, for example `P:` on Windows or `/mnt/projects` on Linux. The launcher uses `subst` on Windows and a symbolic link on Linux (with `sudo`) and macOS.

</Setting>
</Settings>

</Setting>
</Settings>

## Tools

<SettingLocation uri="ayon+settings://core/tools" scope="Studio, with project overrides" />

Behavior of the artist tools: the AYON menu, the Publisher's creators, the Workfiles tool, the Loader, the templates used when publishing and the Delivery dialog. The tools themselves are described in [Pipeline tools](../../../pipeline/pipeline-tools.md).

<!-- screenshot: settings editor, Tools -->

### AYON Menu and General

<SettingLocation uri="ayon+settings://core/tools/ayon_menu" scope="Studio, with project overrides" />

<Settings prefix="tools">
<Setting name="Version Up Workfile" default="Disabled">

Adds **Version Up Workfile** to the AYON menu of the integrations. Located in **AYON Menu**.

</Setting>
<Setting name="Use task type sorting" default="Enabled">

Sorts tasks in the tools by the order of task types in the project anatomy. Located in **General** (`ayon+settings://core/tools/general`).

</Setting>
</Settings>

### Creator

<SettingLocation uri="ayon+settings://core/tools/creator" scope="Studio, with project overrides" />

Product naming and the creators offered in the [Publisher](../../../pipeline/publisher.md). How product names are built is described in [Naming conventions](../../../pipeline/naming-conventions.md).

<!-- screenshot: settings editor, Creator -->

<Settings prefix="creator">
<Setting name="Create Smart Select" default="5 items">

Pairs of **Product type** and **Task names**. No code of the core addon uses it in this version. Defaults: `Render` for tasks `light` and `render`; `Model` for `model`; `Layout` for `layout`; `Look` for `look`; `Rig` for `rigging` and `rig`.

</Setting>
<Setting name="Use legacy product names for renders" default="Enabled">

Keeps the legacy naming of render products. While enabled, templates for renders in **Product name profiles** are ignored.

</Setting>
<Setting name="Product name profiles" default="10 profiles">

Templates that build product names.

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Product types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Template" default="Empty">

Template of the product name. Only letters, digits, `_`, `.`, braces, square brackets and angle brackets are allowed. A key written with a capital first letter, such as `{Task[name]}`, capitalizes the first letter of the value; a fully capitalized key capitalizes every letter. A part in angle brackets, such as `<_{Aov}>`, is left out when its key has no value.

</Setting>
</Settings>

The default profiles:

- no filters: `{product[type]}{variant}`;
- `workfile`: `{product[type]}{Task[name]}`;
- `render`: `{product[type]}{Task[name]}{Variant}<_{Aov}>`;
- `renderLayer`, `renderPass` in `tvpaint`: `{product[type]}{Task[name]}_{Renderlayer}_{Renderpass}`;
- `review`, `workfile` in `aftereffects`, `tvpaint`: `{product[type]}{Task[name]}`;
- `render` in `aftereffects`: `{product[type]}{Task[name]}{Composition}{Variant}`;
- `staticMesh` in `maya`: `S_{folder[name]}{variant}`;
- `skeletalMesh` in `maya`: `SK_{folder[name]}{variant}`;
- `hda` in `houdini`: `{folder[name]}_{variant}`;
- `textureSet` in `substancedesigner`: `T_{folder[name]}{variant}`.

</Setting>
<Setting name="Filter creator profiles" default="Empty list">

Limits the creators shown in the Publisher per context. When a profile matches, only the listed creators are shown.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Allowed Creator Labels" default="Empty list">

Creator labels as shown in the Publisher. Regular expressions are supported.

</Setting>
</Settings>

</Setting>
</Settings>

### Workfiles

<SettingLocation uri="ayon+settings://core/tools/Workfiles" scope="Studio, with project overrides" />

Behavior of the [Workfiles tool](../../../pipeline/workfiles.md) and of application launches. The actions of the tool are switched in [Workfile actions](#workfile-actions).

<!-- screenshot: settings editor, Workfiles -->

<Settings prefix="workfiles">
<Setting name="Workfile template profiles" default="2 profiles">

Chooses the work template of the project anatomy. Defaults: `default` for everything, `unreal` for the host `unreal`.

<Settings>
<Setting name="Task types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Workfile template" default="Empty">

Name of a work template in the project anatomy.

</Setting>
</Settings>

</Setting>
<Setting name="Open last workfile on launch" default="1 profile">

Opens the last workfile when an application starts. The default profile has no filters: enabled, without the last published workfile.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Enabled" default="Enabled" />
<Setting name="Use last published workfile" default="Enabled">

When the task has no local workfile yet, copies the last published workfile as the first workfile, with the next version. Needs the Site Sync addon enabled for the project. The shipped profile has it disabled.

</Setting>
</Settings>

</Setting>
<Setting name="Open workfile tool on launch" default="1 profile">

Opens the Workfiles tool when an application starts. The default profile has no filters and is disabled.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Enabled" default="Enabled" />
</Settings>

</Setting>
<Setting name="Extra work folders" default="Empty list">

Folders created in the work directory of a task.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Folders" default="Empty list">

Folder names or relative paths to create.

</Setting>
</Settings>

</Setting>
<Setting name="Workfile lock profiles" default="Empty list">

Workfile locking per host. While enabled, an integration that supports locks writes a lock file next to an opened workfile and warns when another user or machine has it open.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Enabled" default="Enabled" />
</Settings>

</Setting>
</Settings>

### Loader

<SettingLocation uri="ayon+settings://core/tools/loader" scope="Studio, with project overrides" />

The interface of the [Loader](../../../pipeline/loader.md) (also opened from the tray as the Browser), the core loader actions it shows, and the product type filter of its legacy interface.

<!-- screenshot: settings editor, Loader -->

<Settings prefix="loader">
<Setting name="Use legacy loader" default="Disabled">

Uses the legacy Loader interface instead of the Browser.

</Setting>
<Setting name="Actions" default="All enabled">

Shows or hides single core loader actions. A hidden action is not listed for any selection. The actions are described in [Loader actions](index.md#loader-actions).

<Settings>
<Setting name="Copy file path" default="Enabled">

**Copy file path**: copies the path of a published file to the clipboard.

</Setting>
<Setting name="Copy file" default="Enabled">

**Copy file**: copies a published file to the clipboard.

</Setting>
<Setting name="Open file action" default="Enabled">

**Open file**: opens a published file with the application associated with its file type.

</Setting>
<Setting name="Delete old versions" default="Enabled">

**Delete Versions > Old versions**.

</Setting>
<Setting name="Delete selected versions" default="Enabled">

**Delete Versions > Selected versions**.

</Setting>
<Setting name="Calculate versions size" default="Enabled">

**Calculate Versions size**.

</Setting>
<Setting name="Create hero version" default="Enabled">

**Create Hero Version**.

</Setting>
</Settings>

</Setting>
<Setting name="Product type filtering" default="Empty list">

Presets the product type filter of the Loader interface per host and task type. It does not apply to the Browser.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Filter type" default="Allow list">

**Allow list** shows only the listed product types; **Deny list** hides them.

</Setting>
<Setting name="Product types" default="Empty list">

Product types picked from a fixed list.

</Setting>
</Settings>

</Setting>
</Settings>

### Publish tool

<SettingLocation uri="ayon+settings://core/tools/publish" scope="Studio, with project overrides" />

Which anatomy templates publishing uses, staging folders, strict plugin discovery and the comment requirement of the Publisher. The templates and their keys are listed in [Naming conventions](../../../pipeline/naming-conventions.md).

<!-- screenshot: settings editor, Publish -->

<Settings prefix="publish-tool">
<Setting name="Template name profiles" default="7 profiles">

Selects the publish template of the project anatomy.

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Template name" default="Empty">

A publish template of the project anatomy.

</Setting>
</Settings>

Defaults: `default` for everything; `render` for product base types `review`, `render`, `prerender`; `simpleUnrealTexture` for `image` and `textures` in `substancedesigner`; `maya2unreal` for `staticMesh` and `skeletalMesh` in `maya`; `online` for `online` in `traypublisher`; `tycache` for `tycache` in `max`; `unrealuasset` for `uasset` and `umap` in `unreal`.

</Setting>
<Setting name="Hero template name profiles" default="1 profile">

Selects the hero template of the project anatomy, with the same fields as **Template name profiles**. The default profile uses `simpleUnrealTextureHero` for `image` and `textures` in `substancedesigner`; without a match, `default` is used.

</Setting>
<Setting name="Custom Staging Dir Profiles" default="Empty list">

Custom staging folders for the files written while publishing. Without a matching profile, a temporary folder is used.

<Settings>
<Setting name="Is active" default="Enabled" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Custom Staging Folder Persistent" default="Disabled">

Keeps the staging folder after publishing.

</Setting>
<Setting name="Template name" default="Empty">

A staging template of the project anatomy. The template must have a `folder` key.

</Setting>
</Settings>

</Setting>
<Setting name="Validate plugins discovery" default="Disabled">

Strict mode of publish plugin discovery: the artist cannot publish when a publish plugin fails to import. **Ignored paths (regex)** (empty list by default) lists paths that are skipped in this check.

</Setting>
<Setting name="Publish comment minimum required characters" default="0">

Minimum length of the comment before the Publisher continues.

</Setting>
</Settings>

### Delivery

<SettingLocation uri="ayon+settings://core/tools/delivery" scope="Studio, with project overrides" />

The templates and recipes offered in the delivery dialog of the [Loader](../../../pipeline/loader.md#delivery). A recipe delivers with its default template, and with another template for representations that match one of its overrides, for example EXRs into a plates folder. The templates are the `delivery` templates of the [project anatomy](../../../ayon/web-ui/project/anatomy.md#delivery).

<!-- screenshot: settings editor, Delivery -->

<Settings prefix="delivery-tool">
<Setting name="Filter type" default="Deny list">

**Allow list** shows only the templates in **Delivery templates**; **Deny list** hides them. It only limits which templates artists can pick: recipes can still use hidden templates.

</Setting>
<Setting name="Delivery templates" default="Empty list">

Delivery templates of the project anatomy for the filter. An empty deny list shows all templates.

</Setting>
<Setting name="Delivery recipes" default="Empty list">

Recipes offered in the dialog before the delivery templates. Recipe names must be unique.

<Settings>
<Setting name="Name" default="Empty">

Name of the recipe in the dialog.

</Setting>
<Setting name="Default template" default="Empty">

Delivery template for representations that match no override.

</Setting>
<Setting name="Overrides" default="Empty list">

Another delivery template for matching representations. When several overrides match, the one matching the most filters wins. On a tie, a match on representation names goes before extensions, and extensions before product base types; then the earlier override in the list wins.

<Settings>
<Setting name="Representation names" default="Empty list">

Representation names, regular expressions allowed. Empty matches any representation.

</Setting>
<Setting name="Extensions" default="Empty list">

Lowercase extensions without the dot, for example `exr`, regular expressions allowed. Empty matches any extension.

</Setting>
<Setting name="Product base types" default="Empty list">

Empty matches any product base type.

</Setting>
<Setting name="Template" default="Empty">

Delivery template for the matching representations.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Version start

<SettingLocation uri="ayon+settings://core/version_start_category" scope="Studio, with project overrides" />

The number of the first version of products and workfiles, for example to start at `v000` for some tasks. Without a matching profile, versions start at 1.

<!-- screenshot: settings editor, Version start -->

<Settings prefix="version-start">
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Version Start" default="1">

First version number, 0 or higher.

</Setting>
</Settings>

</Setting>
</Settings>

## Default reviewable layers

<SettingLocation uri="ayon+settings://core/reviewable_layers" scope="Studio, with project overrides" />

Which layer of a multi-layer image, such as an EXR, is used for review media.

<!-- screenshot: settings editor, Default reviewable layers -->

<Settings prefix="reviewable-layers">
<Setting name="Review layers" default="Beauty">

Ordered layer names. The first layer in the list that the image has is used. An empty list uses the default sorting of layers.

</Setting>
</Settings>

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://core/imageio" scope="Studio, with project overrides" />

The global color management switch, the OCIO config chosen per context and global file rules. How these are used when an application starts is described in [Color management on launch](../../../pipeline/color-management-on-launch.md), and their use while publishing in [Color management in publishing](../../../pipeline/color-management-in-publishing.md).

Color management is used for a host only when both this global switch and the **Enable Color Management** switch in the host addon's ImageIO settings are on. The host switch can only turn color management off for its host: when the global switch is off, no host can turn it on.

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Disabled">

Global switch of color management. While it is off, no OCIO config is used in any host.

</Setting>
<Setting name="OCIO config profiles" default="1 profile">

Chooses the OCIO config per context. When no profile matches, color management is off for that context. The default profile has no filters and uses the built-in ACES 1.2 config.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Application names" default="Empty list">

Full application names from the Applications addon, `group/variant`, such as `maya/2026`.

</Setting>
<Setting name="Profile type" default="AYON built-in OCIO config">

Where the config comes from. The fields below depend on it.

- **AYON built-in OCIO config:** a config shipped with the OCIO addon (`ayon_ocio` 1.1.1 or newer must be in the bundle).
- **Path to OCIO config:** a path.
- **Published product:** an `ocioconfig` representation published in the folder of the context.
- **Disable OCIO management:** color management is off for matching contexts.

</Setting>
<Setting name="Built-in OCIO config" default="ACES 1.2">

For **AYON built-in OCIO config**: **ACES 2.0 Studio (OCIO v2.4)**, **ACES 1.3 Studio (OCIO v2.1)**, **ACES 1.3 Studio (OCIO v2)**, **ACES 1.2** or **Nuke default**.

</Setting>
<Setting name="OCIO config path" default="Empty">

For **Path to OCIO config**: path to the config. Anatomy keys, such as `{root[work]}`, and environment variables can be used.

</Setting>
<Setting name="Published product">

For **Published product**.

<Settings>
<Setting name="Product name" default="Empty">

Product in the folder of the context whose latest version has an `ocioconfig` representation. A regular expression is allowed; an exact name match is preferred. An empty name is an error, and so is a matching product without versions or without that representation.

</Setting>
<Setting name="Fallback config type" default="AYON built-in OCIO config">

Used when no product matches: **AYON built-in OCIO config** with **Built-in OCIO config** (default ACES 1.2), or **Path to OCIO config** with **OCIO config path**.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="File Rules">

Assigns a colorspace to files by their path, for example `ACEScg` to all `.exr` plates. Used when the colorspace of a published or loaded file is not otherwise known.

<Settings>
<Setting name="Activate global file rules" default="Disabled">

Uses the rules below for all hosts. A host with its own file rules activated in its ImageIO settings uses those instead.

</Setting>
<Setting name="Rules" default="1 example rule">

A rule applies when the file has its extension and matches its pattern; when several rules apply, the last one in the list wins. When no rule applies and the config is an OCIO v2 config, the file rules of the config are used. The example rule assigns `ACES - ACEScg` to `exr` files that match `.*(beauty).*`; it does nothing until the global rules are activated.

<Settings>
<Setting name="Rule name" default="Empty">

Unique name of the rule.

</Setting>
<Setting name="Regex pattern" default="Empty">

Regular expression searched in the file path. When publishing, it is searched in the name of the first file of the representation.

</Setting>
<Setting name="Colorspace name" default="Empty">

Colorspace to assign. It must exist in the active OCIO config.

</Setting>
<Setting name="File extension" default="Empty">

Extension the file must have, such as `exr`. Empty matches any extension.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Publish plugins

<SettingLocation uri="ayon+settings://core/publish" scope="Studio, with project overrides" />

The publish plugins of the core addon run in every host. How publishing works is described in [Publishing](../../../pipeline/publishing.md). The plugins are listed below in groups, in the order of the settings.

Plugins that can be switched have some of these fields:

- **Enabled:** the plugin runs.
- **Optional:** the artist can switch the plugin off in the Publisher.
- **Active:** the plugin is switched on by default when it is optional.

<!-- screenshot: settings editor, Publish plugins -->

### Collectors

<Settings prefix="collectors">
<Setting name="Collect Anatomy Instance Data">

Collects the data (folder, task, version and so on) used to build publish paths from the anatomy templates.

<Settings>
<Setting name="Follow workfile version" default="Disabled">

Publishes with the version number of the workfile, for example `v012` when publishing from `sh010_lighting_v012`, instead of the next free version. Only for hosts listed in **Collect Version from Workfile**.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Audio" default="Disabled">

Collects the last published audio of the folder.

<Settings>
<Setting name="Name of audio variant" default="audioMain">

Product name of the audio to collect.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Version from Workfile">

Reads the version number from the workfile name, for example `v012` from `sh010_lighting_v012.ma`. Needed by **Follow workfile version**.

<Settings>
<Setting name="Host names" default="13 hosts">

Hosts that read the version from the workfile name. Default: `aftereffects`, `blender`, `celaction`, `fusion`, `harmony`, `hiero`, `houdini`, `maya`, `nuke`, `photoshop`, `resolve`, `tvpaint`, `substancepainter`.

</Setting>
<Setting name="Skip for host if headless publish" default="Empty list">

Hosts that skip this when publishing without a UI, for example on the farm.

</Setting>
</Settings>

</Setting>
<Setting name="Collect comment per instance" default="Disabled">

Adds a **Comment** attribute to each instance in the Publisher.

<Settings>
<Setting name="Families" default="Empty list">

Families that get the attribute.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Status" default="Disabled">

Sets the status of published versions.

<Settings>
<Setting name="Status profiles" default="Empty list">

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Artist can change" default="Enabled">

The artist can change the status in the Publisher. It does not change whether the status is set.

</Setting>
<Setting name="Default status">

A version status of the project.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Collect Frames to Fix" default="Enabled">

Adds a **Frames to fix** field to Nuke `render` and `prerender` instances, to re-render and publish only some frames.

<Settings>
<Setting name="Show 'Rewrite latest version' toggle" default="Enabled">

Adds a **Rewrite latest version** toggle next to the field.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Version to List" default="Disabled">

Adds published versions to entity lists, such as review sessions.

<Settings>
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task Types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product base types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="List Name" default="`{folder[name]}`">

Name of the list, an anatomy template.

</Setting>
<Setting name="List type" default="Generic">

**Generic** or **Review Session**.

</Setting>
<Setting name="List folders" default="Empty list">

Folders to place the list in, from top to bottom. When a folder exists, only the list placement is ensured.

<Settings>
<Setting name="Folder label" default="Empty">

Label of the folder, an anatomy template.

</Setting>
<Setting name="Scope" default="Scope folder to all views">

**Scope folder to all views** or **Scope to the list type**.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Collect Explicit Resolution" default="Enabled">

Adds a resolution choice attribute to instances.

<Settings>
<Setting name="Product base types" default="shot">

Product base types that get the attribute.

</Setting>
<Setting name="Resolution choices" default="Empty list">

Resolutions the artist can pick, each unique.

<Settings>
<Setting name="Width" default="1920" />
<Setting name="Height" default="1080" />
<Setting name="Pixel aspect" default="1.0" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Collect Hierarchy">

Creates and updates the folders and tasks of editorial publishes.

<Settings>
<Setting name="Edit shot attributes on update" default="Enabled">

Updates the attributes of shot folders that already exist, for example frame ranges after a changed cut.

</Setting>
<Setting name="Skip shot attributes on update" default="Empty list">

Folder attributes that are not updated.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Version Tags" default="Disabled">

Lets the artist pick version tags in the Publisher.

</Setting>
</Settings>

### USD contributions

Settings of the USD contribution workflow, in which department layers are published into a `usdAsset` or `usdShot` product. The workflow is described in [OpenUSD](../../../pipeline/openusd.md).

<Settings prefix="usd">
<Setting name="Collect USD Layer Contributions" default="Enabled">

Prepares department layer contributions and their instance attributes.

<Settings>
<Setting name="Department Layer Orders" default="10 layers">

The department layers and their strength.

<Settings>
<Setting name="Name" default="Empty">

Layer name: letters, digits, `_` and `-`.

</Setting>
<Setting name="Scope" default="Asset, Shot">

**Asset**, **Shot** or both.

</Setting>
<Setting name="Order" default="0">

A higher order is a stronger layer, stacked on top.

</Setting>
</Settings>

Defaults, asset scope: `model` 100, `assembly` 150, `groom` 175, `look` 200, `rig` 300. Shot scope: `layout` 200, `animation` 300, `simulation` 400, `fx` 500, `lighting` 600.

</Setting>
<Setting name="Profiles" default="6 profiles">

Default contribution attributes of instances per context.

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Task Types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Contribution Enabled (default)" default="Enabled" />
<Setting name="Contribution Department Layer" default="Empty">

The layer to contribute to. It should be in **Department Layer Orders** to get a sensible order.

</Setting>
<Setting name="Target Product" default="usdAsset">

Product the contribution goes into, usually `usdAsset` or `usdShot`.

</Setting>
<Setting name="Apply as variant" default="Enabled">

Usually on for asset contributions and off for shot contributions.

</Setting>
<Setting name="Variant Set name" default="`{layer}`" />
<Setting name="Variant Name" default="`{variant}`" />
<Setting name="Set as default variant selection" default="Set as default if no current default">

**Set as default if no current default**, **Set as default** or **Do not set**.

</Setting>
</Settings>

The default profiles contribute `model`, `look`, `groom` and `rig` products to `usdAsset` as variants of the layer of the same name, `animation` products to `usdShot` in the `animation` layer and `usd` products to `usdShot` in the `assembly` layer, both not as a variant.

</Setting>
</Settings>

</Setting>
<Setting name="Collect Predefined USD Contributions" default="Disabled">

Adds configured contributions to a `usdAsset` or `usdShot`.

<Settings>
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Task Types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Contributions" default="Empty list">

<Settings>
<Setting name="Layer Identifier" default="Empty">

Layer identifier to search for. An existing layer with it is replaced, so later publishes update the same layer.

</Setting>
<Setting name="Order" default="0">

Strength among the contributions; a higher order is stacked on top.

</Setting>
<Setting name="Load" default="sublayer">

**sublayer**, **reference** (on the prim **Target Prim Path**, default `/{default_prim_name}`) or **variant** (a reference inside a variant, with **Target Prim Path**, **Variant set name**, **Variant name** and **Set as default variant selection**).

</Setting>
<Setting name="Add only if version exists" default="Enabled">

Adds the layer only if the file exists.

</Setting>
<Setting name="Layer method" default="Source Path">

- **Source Path (e.g. filepath or AYON Entity URI):** **Source Path** is written as is.
- **Find product in first parent folder of given folder type:** **Parent folder type**, **Product name**, **Version** (a number, `hero` or `latest`, default `latest`), **Representation name** (default `usd`) and **Load as AYON Entity URI** (default enabled; when disabled, the version must exist or no path is added).

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Extract USD Asset Contribution">

Adds the published department layers into the target `usdAsset` or `usdShot`.

<Settings>
<Setting name="Contribution path" default="Filepath">

How layer paths are written: **Filepath**, **AYON Entity URI (explicit version)**, **AYON Entity URI as latest version** or **AYON Entity URI as latest approved**. The entity URI options need the AYON USD Resolver.

</Setting>
</Settings>

</Setting>
<Setting name="Extract USD Layer Contribution">

<Settings>
<Setting name="Contribution path" default="Filepath">

The same options as in **Extract USD Asset Contribution**.

</Setting>
<Setting name="Always set default prim to folder name." default="Disabled">

Overrides the default prim of older published versions of a layer with the AYON standard. When disabled, only the first version sets it.

</Setting>
</Settings>

</Setting>
</Settings>

### Validators

<Settings prefix="validators">
<Setting name="Validate Editorial Asset Name" default="Enabled, not optional, active">

Listed in the settings. The core addon has no plugin with this name.

</Setting>
<Setting name="Validate Version" default="1 profile">

Fails when the version to publish is not newer than the latest version in AYON. Its state is set per host by **Plugin enable state profiles** (**Host names**, **Enabled**, **Optional**, **Active**). The default profile enables it, not optional and active, for `aftereffects`, `blender`, `flame`, `houdini`, `maya`, `nuke`, `photoshop`, `substancepainter` and `silhouette`. The plugin is disabled for hosts without a matching profile.

</Setting>
<Setting name="Validate Outdated Containers" default="2 profiles">

Fails when the scene has loaded containers that are not the latest version; its failure offers **Show Inventory**. The same structure as **Validate Version**. The first default profile has no host names and enables it, optional and active, for all hosts; the plugin skips hosts that cannot load containers. The second profile disables it for `unreal`.

</Setting>
<Setting name="Validate Intent" default="Disabled">

Requires an intent for the publish.

<Settings>
<Setting name="Profiles" default="Empty list">

Switch the validation per context.

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Validate" default="Enabled" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

### Extract Thumbnail and Thumbnail from source

<Settings prefix="thumbnail">
<Setting name="Extract Thumbnail" default="Enabled">

Creates thumbnails of published versions.

<Settings>
<Setting name="Profiles" default="1 profile">

The default profile has no filters, with the values below and FFmpeg input argument `-apply_trc gamma22`.

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Integrate Thumbnail Representation" default="Enabled" />
<Setting name="Target size" default="Image source">

**Image source** keeps the resolution; **Resize** uses **Width** and **Height** (1920 and 1080 by default). Both must be above 0, otherwise the source resolution is used.

</Setting>
<Setting name="Background color" default="[0, 0, 0, 0.0]">

RGBA color.

</Setting>
<Setting name="Duration split" default="0.5">

Position in the frame range of the frame used, from 0 to 1.

</Setting>
<Setting name="OIIOtool defaults" default="Use Colorspace">

**Use Colorspace** with **Colorspace** (the default profile uses `color_picking`), or **Use Display&View** with **Display** (`default`) and **View** (`sRGB`).

</Setting>
<Setting name="Ffmpeg args">

**FFmpeg input arguments** and **FFmpeg output arguments**, both empty lists for a new profile.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Extract Thumbnail from source" default="Enabled">

Creates a thumbnail from an image the artist provided (the instance data `thumbnailSource`), with `oiiotool` or FFmpeg.

<Settings>
<Setting name="Target size" default="Resize to 300 x 170">

**Image source** or **Resize** with **Width** and **Height**. Both must be above 0, otherwise the source resolution is used.

</Setting>
<Setting name="Background color" default="[0, 0, 0, 0.0]">

RGBA color.

</Setting>
</Settings>

</Setting>
</Settings>

### OIIO and OTIO

<Settings prefix="oiio">
<Setting name="Extract OIIO Transcode" default="Enabled">

Converts representations to another colorspace with `oiiotool`, mostly for review media. Only RGBA channels are written.

<Settings>
<Setting name="Profiles" default="Empty list">

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Representation names" default="Empty list">

Representation names; regular expressions are supported.

</Setting>
<Setting name="Delete Original Representation" default="Enabled">

Removes the original representation. A transcoded representation with the `review` tag is used for review instead of the original.

</Setting>
<Setting name="Output Definitions" default="Empty list">

<Settings>
<Setting name="Name" default="Empty">

Unique output name, without spaces.

</Setting>
<Setting name="Extension" default="Empty">

Target extension. Empty keeps the original extension.

</Setting>
<Setting name="Transcoding type" default="Use Colorspace">

**Use Colorspace** with **Target Colorspace** (empty keeps the source colorspace, so nothing is converted), or **Use Display&View** with **Target Display** and **Target View** (empty uses the values of the scene).

</Setting>
<Setting name="OIIOtool arguments" default="Empty list">

Additional `oiiotool` arguments (**Arguments**).

</Setting>
<Setting name="Tags" default="Empty list">

Tags added to the new representation. Add `review` to create the review from it.

</Setting>
<Setting name="Custom Tags" default="Empty list" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Extract OIIO Post Process" default="Enabled">

Runs `oiiotool` with custom arguments on representations, for example to change the format, write scanline images or flatten deep images.

<Settings>
<Setting name="Profiles" default="Empty list">

The same filters as **Extract OIIO Transcode** (without regular expressions for representation names), plus **Representation extensions**, and **Delete Original Representation** (enabled).

<Settings>
<Setting name="Output Definitions" default="Empty list">

<Settings>
<Setting name="Name" default="Empty" />
<Setting name="Extension" default="Empty">

Empty keeps the original extension.

</Setting>
<Setting name="Input arguments" default="Empty list">

Arguments before the input file.

</Setting>
<Setting name="Output arguments" default="Empty list">

Arguments before `-o`.

</Setting>
<Setting name="Tags" default="Empty list" />
<Setting name="Custom Tags" default="Empty list" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Extract OTIO review">

Creates review media from OTIO-based (editorial) input.

<Settings>
<Setting name="Representation name" default="review_png">

Name of the created representation.

</Setting>
<Setting name="Output extension" default="png">

Read-only in this version.

</Setting>
<Setting name="Default width" default="1280" />
<Setting name="Default height" default="720" />
</Settings>

</Setting>
</Settings>

### Extract Review

<SettingLocation uri="ayon+settings://core/publish/ExtractReview" scope="Studio, with project overrides" />

Creates review media, such as an h264 movie, with FFmpeg from representations tagged `review`.

<Settings prefix="extract-review">
<Setting name="Enabled" default="Enabled" />
<Setting name="Profiles" default="2 profiles">

The first profile has no filters; the second is for `substancepainter` and differs only in **Handle missing frames** (`Use only rendered`). Each has the outputs `png` and `h264`, described after the fields.

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task Types" default="Empty list" />
<Setting name="Output Definitions" default="Empty list">

Each output creates a review representation.

<Settings>
<Setting name="Name" default="Empty">

Unique output name, used in the representation name, such as `h264`.

</Setting>
<Setting name="Output extension" default="Empty">

File extension, such as `mp4`.

</Setting>
<Setting name="Tags" default="Empty list">

Tags of the representation, for example `webreview` (upload as reviewable to AYON), `burnin` (add burnins with **Extract Burnin**), `delete` (do not keep the file), `no-handles` (leave out handles), `ftrackreview` and `kitsureview`.

</Setting>
<Setting name="Link to a burnin by name" default="Empty list">

Names of burnins from **Extract Burnin**. Empty uses all matching burnins.

</Setting>
<Setting name="FFmpeg arguments">

**Video filters** (`-vf`), **Audio filters** (`-af`), **Input arguments** (before the input file) and **Output arguments**, all empty lists by default. Arguments such as `-apply_trc gamma22` change colors, but color conversion is better done in **Extract OIIO Transcode** so that the colorspace data of the output stays accurate.

</Setting>
<Setting name="Additional output filtering">

**Families** (empty: any), **Product names** (regular expressions; empty: any), **Custom Tags** (empty: only representations without custom tags) and **Frame count**: **Always**, **Only if input has 1 image frame** or **Only if input is video or sequence of frames**.

</Setting>
<Setting name="Overscan crop" default="Empty">

Crop of the input overscan.

</Setting>
<Setting name="Overscan color" default="[0, 0, 0, 0.0]">

Used when the input and output aspect ratios differ.

</Setting>
<Setting name="Output width" default="0">

**Output width** and **Output height** both above 0 resize the output; otherwise the source resolution is used.

</Setting>
<Setting name="Output height" default="0" />
<Setting name="Scale pixel aspect" default="Enabled">

Rescales inputs whose pixel aspect is not 1, for anamorphic reviews.

</Setting>
<Setting name="Background color" default="[0, 0, 0, 0.0]">

Used for inputs with transparency.

</Setting>
<Setting name="Letter Box" default="Enabled, ratio 0.0">

**Enabled**, **Ratio** (aspect ratio of the visible area, such as `2.39`), **Fill Color**, **Line Thickness** (0) and **Line Color**. The shipped outputs have it disabled, with fill color `[0, 0, 0, 1.0]` and line color `[255, 0, 0, 1.0]`.

</Setting>
<Setting name="Handle missing frames" default="Use closest existing">

How gaps in a frame range are filled: **Use closest existing**, **Generate blank frame**, **Use previous version** or **Use only rendered**.

</Setting>
</Settings>

</Setting>
</Settings>

The shipped outputs:

- **`png`** (extension `png`): tags `ftrackreview`, `kitsureview`, `webreview`; families `render`, `review`, `ftrack`; only if the input has one image frame; 1920 x 1080.
- **`h264`** (extension `mp4`): tags `burnin`, `ftrackreview`, `kitsureview`, `webreview`; the same families; only if the input is a video or sequence; source size; no input arguments; output arguments `-pix_fmt yuv420p`, `-crf 18`, `-c:a aac`, `-b:a 192k`, `-g 1`, `-movflags faststart`, `-color_range tv`, `-colorspace bt709`, `-color_primaries bt709` and `-color_trc bt709`.

</Setting>
</Settings>

### Extract Burnin

<SettingLocation uri="ayon+settings://core/publish/ExtractBurnin" scope="Studio, with project overrides" />

Burns text, such as the version, frame number or artist name, into review outputs tagged `burnin`. Each burnin creates a copy of the review output with the text applied.

<Settings prefix="extract-burnin">
<Setting name="Enabled" default="Enabled" />
<Setting name="Burnin formatting options">

Font and text box styling for all burnins.

<Settings>
<Setting name="Font size" default="42" />
<Setting name="Font color" default="[255, 255, 255, 1.0]" />
<Setting name="Background color" default="[0, 0, 0, 0.5]">

Color of the text box.

</Setting>
<Setting name="X Offset" default="0">

Horizontal distance of the text from the frame edge.

</Setting>
<Setting name="Y Offset" default="0">

Vertical distance of the text from the frame edge.

</Setting>
<Setting name="Padding around text" default="5" />
<Setting name="Font file path" default="Empty">

A font file, such as a `.ttf`, per platform. Empty uses the default font.

</Setting>
</Settings>

</Setting>
<Setting name="Profiles" default="2 profiles">

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Burnins" default="Empty list">

<Settings>
<Setting name="Name" default="Empty">

Unique name; review outputs link to it with **Link to a burnin by name**.

</Setting>
<Setting name="Top Left" default="Empty">

Text at this position. The other positions are **Top Centered**, **Top Right**, **Bottom Left**, **Bottom Centered** and **Bottom Right**. Template keys are supported, such as `{folder[name]}`, `{task[name]}`, `{anatomy[version]}`, `{username}`, `{comment}`, `{yy}-{mm}-{dd}`, `{frame_start}`, `{frame_end}`, `{current_frame}` and `{timecode}`.

</Setting>
<Setting name="Additional filtering">

**Families** and **Tags** of the review output; empty means any.

</Setting>
</Settings>

</Setting>
</Settings>

The default profile has no filters and the burnin `burnin`: top left `{yy}-{mm}-{dd}`, top right `{anatomy[version]}`, bottom left `{username}`, bottom centered `{folder[name]}`, bottom right `{frame_start}-{current_frame}-{frame_end}`. A second profile for `review` products in `maya`, `houdini` and `max` has the burnin `focal_length_burnin`, which adds `{focalLength:.2f} mm` at top centered.

</Setting>
</Settings>

### Integrators and clean up

<Settings prefix="integrate">
<Setting name="Override Integrate Thumbnail Representations" default="Enabled">

Sets per context whether thumbnail representations are integrated. Without a matching profile, the behavior of the host is kept.

<Settings>
<Setting name="Integrate profiles" default="Empty list">

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Product names" default="Empty list" />
<Setting name="Integrate thumbnail" default="Enabled" />
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Integrate Product Group">

Puts published products in a product group.

<Settings>
<Setting name="Product group profiles" default="1 profile">

The default profile has no filters and an empty template, so no group is set. A group set by the host is kept.

<Settings>
<Setting name="Product base types" default="Empty list" />
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Template" default="Empty">

Group name template with the keys `{task}`, `{product[type]}`, `{host}`, `{product[name]}` and `{renderlayer}`.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
<Setting name="Integrate Hero Version" default="Enabled, optional, active">

Keeps an unversioned copy of the latest publish, so other scenes can reference it and always get the latest version. Needs a `hero` template in the project anatomy.

<Settings>
<Setting name="Families" default="9 families">

Families that get a hero version. Default: `model`, `rig`, `look`, `pointcache`, `animation`, `setdress`, `layout`, `mayaScene`, `simpleUnrealTexture`.

</Setting>
<Setting name="Use Hardlinks" default="Disabled">

Tries a hardlink before copying, to save disk space. On Windows, a hardlink in use can block deleting the other links, which can break updating hero versions.

</Setting>
</Settings>

</Setting>
<Setting name="Attach Reviewables" default="Enabled">

Adds an **Attach Reviewables** attribute to review and render instances, so their media can be attached to another instance. An attached reviewable is not published as a product of its own.

</Setting>
<Setting name="Clean up farm rendered files">

<Settings>
<Setting name="Remove rendered files" default="Disabled">

Removes rendered files and the metadata JSON after a farm publish. Files in a persistent staging folder are never removed.

</Setting>
</Settings>

</Setting>
<Setting name="Clean Up">

After a successful publish, deletes the staging folder when it is in the system temp folder.

<Settings>
<Setting name="Patterns (regex)" default="Empty list">

Extra files to delete, matched against the full path in the source and destination folders of the published files. Used only when **Remove Temp renders** is enabled.

</Setting>
<Setting name="Remove Temp renders" default="Disabled">

Deletes the original render files after they were published, and their folders when they become empty.

</Setting>
</Settings>

</Setting>
<Setting name="Clean Up Farm" default="Disabled">

After a successful farm publish, deletes the staging folders the rendered files were published from, unless they are persistent. Applies to jobs submitted from Maya.

</Setting>
</Settings>

## Workfile actions

<SettingLocation uri="ayon+settings://core/workfile_actions" scope="Studio, with project overrides" />

Shows or hides the core actions of the [Workfiles tool](../../../pipeline/workfiles.md#workfile-actions), which appear in the context menu of the file list and as quick action buttons. Each action has one field, **Enabled**. Actions that other addons add are switched in the settings of those addons.

<!-- screenshot: settings editor, Workfile actions -->

<Settings prefix="workfile-actions">
<Setting name="Explore here" default="Enabled">

Opens the file browser of the operating system at the selected workfile, or at the work directory of the task when no workfile is selected.

</Setting>
<Setting name="Duplicate" default="Enabled">

Copies the selected workfile of the work area to another version or comment, without opening it.

</Setting>
<Setting name="Copy file path / Copy file" default="Enabled">

**Copy file path** and **Copy file** copy the path of the selected workfile, or the file itself, to the clipboard.

:::caution
In 1.10.7 this switch has no effect: the two actions are always shown.
:::

</Setting>
<Setting name="Increment and open" default="Enabled">

Copies the selected workfile of the work area to the next available version and opens it.

</Setting>
<Setting name="Set context" default="Disabled">

Changes the current context of the application to the selected task without opening a workfile. Hidden when the task is already the current context.

</Setting>
</Settings>

## Project folder structure and environments

<SettingLocation uri="ayon+settings://core/project_folder_structure" scope="Studio, with project overrides" />

Folders created on disk for a project, and environment variables set when applications are launched in it.

<!-- screenshot: settings editor, Project folder structure -->

<Settings prefix="project">
<Setting name="Project folder structure" default="A JSON tree">

JSON tree of the folders created by the **Create project folders** action. The default has `prod`, `resources` (`footage` with `plates` and `offline`, `audio`, `art_dept`), `editorial`, `assets` (`characters`, `locations`) and `shots` under `__project_root__`.

</Setting>
<Setting name="Project environments" default="Empty JSON object">

JSON object of environment variables set when launching applications in the project, applied by the Applications addon. The value format, including the `farm` and `standard` groups, is described in [Environment values](../applications/settings.md#environment-values).

</Setting>
</Settings>

## Filter farm environment

<SettingLocation uri="ayon+settings://core/filter_env_profiles" scope="Studio, with project overrides" />

Removes or changes environment variables of publish jobs sent to the render farm, for example to replace a local path with one that is valid on the render nodes. It applies to farm publish launches only. How farm jobs get their environment is described in [Farm](../../../pipeline/farm.md).

<!-- screenshot: settings editor, Filter farm environment -->

<Settings prefix="filter-farm-environment">
<Setting name="Profiles" id="filter-farm-environment-profiles" default="Empty list">

<Settings>
<Setting name="Host names" default="Empty list" />
<Setting name="Task types" default="Empty list" />
<Setting name="Task names" default="Empty list" />
<Setting name="Folder paths" default="Empty list" />
<Setting name="Skip environment variables" default="Empty list">

Variables removed from the job environment.

</Setting>
<Setting name="Replace values in environment" default="Empty list">

Changes variable values. An empty result removes the variable.

<Settings>
<Setting name="Environment variable" default="Empty" />
<Setting name="Pattern" default="Empty">

Regular expression to search in the value.

</Setting>
<Setting name="Replacement" default="Empty">

Text that replaces the matches.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

:::caution
In 1.10.7 the replacement does not work as described: the code swaps the arguments, so the variable is set to the **Replacement** text, in which matches of its old value are replaced with **Pattern**. A variable listed in **Skip environment variables** that is missing from the environment raises an error in the launch hook.
:::

## Related

- [Core addon](index.md): the tools, plugins and hooks these settings shape.
- [Settings](../../../ayon/how-ayon-works/settings.md): scopes and overrides.
- [Project anatomy](../../../ayon/web-ui/project/anatomy.md): the templates selected by the profiles.
- [Naming conventions](../../../pipeline/naming-conventions.md): product names, templates and their keys.
- [Color management on launch](../../../pipeline/color-management-on-launch.md) and [Color management in publishing](../../../pipeline/color-management-in-publishing.md).
- [Publishing](../../../pipeline/publishing.md) and [Publisher](../../../pipeline/publisher.md).
- [Applications addon settings](../applications/settings.md): applications, tools and environment values.
