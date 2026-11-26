---
title: Substance Designer addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON Substance Designer addon with their default values: color management, project creation templates and the Textures and Sbsar creators."
addon: substancedesigner
addon_repo: ayon-substance-designer
addon_version: 0.2.1
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-substance-designer/tree/0.2.1/server/settings
---

# Substance Designer addon settings

<AddonInfo />

The settings of the [Substance Designer addon](index.md) are in **Studio settings > Substance Designer**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. The Substance Designer versions and their executables are not addon settings: they are variants of the Applications addon. How studio and project values combine is described in [Settings](../../../ayon/how-ayon-works/settings.md).

## Color management (ImageIO)

<SettingLocation uri="ayon+settings://substancedesigner/imageio" scope="Studio, with project overrides" />

Whether Substance Designer follows the global color management, and file rules of this host. The addon has no OCIO config override: the global configuration is used. See [Color management on launch](../../../pipeline/color-management-on-launch.md).

<!-- screenshot: settings editor, Color Management (ImageIO) -->

<Settings prefix="imageio">
<Setting name="Enable Color Management" default="Enabled">

Substance Designer follows the global color management. This is the master switch of the section.

</Setting>
<Setting name="File Rules">

<Settings>
<Setting name="Activate Host Rules" default="Disabled">

Use the file rules of this host instead of the global ones.

</Setting>
<Setting name="Rules" default="Empty list">

Rules that assign a colorspace to files.

<Settings>
<Setting name="Rule name" />
<Setting name="Regex pattern">

Regular expression matched against the file path.

</Setting>
<Setting name="Colorspace name">

Colorspace assigned to matching files.

</Setting>
<Setting name="File extension" />
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Project creation

<SettingLocation uri="ayon+settings://substancedesigner/project_creation" scope="Studio, with project overrides" />

Graphs created in a new Substance package when Substance Designer starts without a workfile to open. Each entry adds one graph, built from a Substance template or from a studio `.sbs` file, to a package that is loaded at startup. With the default empty list, no package is created.

<!-- screenshot: settings editor, Project Creation -->

### Project templates

<Settings prefix="project-templates">
<Setting name="Project Templates" default="Empty list">

<Settings>
<Setting name="Graph Name" default="default">

Name of the created graph.

</Setting>
<Setting name="Document Resolution" default="1024">

Output size of the graph, applied to width and height: a power of two from **2** to **8192**. The stored value is the exponent, for example 10 for 1024.

</Setting>
<Setting name="Template Type" default="Default Substance Template">

Where the graph comes from: **Default Substance Template**, **Custom Template** or **Template By Task Types**. Each type shows its own field below.

</Setting>
<Setting name="Template" default="Empty">

For **Default Substance Template**: the template of Substance Designer to build the graph from. The options are **Empty**, **Metallic Roughness**, **Metallic Roughness - Anisotropy**, **Metallic Roughness - Coated**, **Metallic Roughness - SSS**, **Metallic Roughness - Sheen**, **Adobe Standard Material**, **Specular Glossiness**, **Blinn**, **Scan Processing - Metallic Roughness**, **Scan Processing - Specular Glossiness**, **AxF to Metallic Roughness**, **AxF to Specular Glossiness**, **AxF to AxF**, **Studio Panorama**, **Painter Filter (generic)**, **Painter Filter (specific)**, **Painter Filter (specific w/ mesh maps)**, **Painter Generator (w/ mesh maps)**, **Sample Filter** and **CLO Metallic Roughness**.

</Setting>
<Setting name="Custom Template">

For **Custom Template**: a graph from a studio `.sbs` file. When either field is empty, or the file does not exist, the entry is skipped.

<Settings>
<Setting name="Custom Template Graph Name" default="Empty">

Name of the graph in the template file.

</Setting>
<Setting name="Path to Custom Template" default="Empty">

Path of the `.sbs` file. It can hold template keys such as `{root[work]}` or `{project[name]}`, filled from the current context.

</Setting>
</Settings>

</Setting>
<Setting name="Template By Task Type">

For **Template By Task Types**: a `.sbs` file for some task types. The graph used from it is the one named after the current task.

<Settings>
<Setting name="Task types" default="Empty list">

Task types the template is meant for.

</Setting>
<Setting name="Path to template" default="Empty">

Path of the `.sbs` file. It can hold template keys, like **Path to Custom Template**.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## Creator plugins

<SettingLocation uri="ayon+settings://substancedesigner/create" scope="Studio, with project overrides" />

Defaults of the creators of the Publisher.

<!-- screenshot: settings editor, Creator Plugins -->

### Create Textures

<SettingLocation uri="ayon+settings://substancedesigner/create/CreateTextures" />

<Settings prefix="create-textures">
<Setting name="Review" default="Disabled">

Default of the **Review** option of new texture instances.

</Setting>
<Setting name="Image Output File Type" default="png">

Default **File type** of new texture instances: **bmp**, **dds**, **jpeg**, **png**, **tga**, **tif**, **surface**, **hdr**, **exr**, **jif**, **jpe** or **webp**.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional product types the creator can make.

<Settings>
<Setting name="Product type">

Name of the product type.

</Setting>
<Setting name="Label">

Label of the product type in the UI.

</Setting>
</Settings>

</Setting>
</Settings>

### Create SBSAR

<SettingLocation uri="ayon+settings://substancedesigner/create/CreateSbsar" />

<Settings prefix="create-sbsar">
<Setting name="Product type items" default="Empty list">

Optional product types the creator can make, each with a **Product type** and a **Label**.

</Setting>
</Settings>

## Related

- [Substance Designer addon](index.md)
- [Settings](../../../ayon/how-ayon-works/settings.md)
- [Color management on launch](../../../pipeline/color-management-on-launch.md)
