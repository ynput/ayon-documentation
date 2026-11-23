---
title: Mocha Pro addon settings
sidebar_label: Settings
description: "The settings of the Mocha Pro addon: creator plugin settings for tracking points and shapes, default exporters per Mocha version and product type items."
addon: mocha
addon_repo: ayon-mocha
addon_version: 1.1.0
addon_scope: pipeline
addon_flags: []
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-mocha/tree/1.1.0
---

# Mocha Pro addon settings

<AddonInfo />

The settings of the [Mocha Pro addon](index.md) are in **Studio settings > Mocha**, and can be overridden per project in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting. All of them configure the creators that appear in the Publisher, under **Creator Plugins**.

## Create Tracking Points

<SettingLocation uri="ayon+settings://mocha/create/CreateTrackingPoints" scope="Studio, with project overrides" />

The creator of `trackpoints` products, and the tracking exporters it preselects. Each Mocha version has its own list, because the exporters differ between versions. When the running Mocha version has no list of its own, the creator reads the **Mocha Pro 2024** list.

<!-- screenshot: settings editor, Create Tracking Points -->

<Settings prefix="create-tracking-points">
<Setting name="Enabled" default="Enabled">

Users can create `trackpoints` products.

</Setting>
<Setting name="Mocha Pro 2024">

<Settings>
<Setting name="Default exporters" default="Empty list">

Tracking exporters preselected in the Publisher when Mocha Pro 2024.5 is running. The options are the tracking exporters of that version, as Mocha names them, for example **Nuke 7 Tracker (\*.nk)** or **After Effects CC Power Pin (\*.txt)**.

</Setting>
</Settings>

</Setting>
<Setting name="Mocha Pro 2025">

<Settings>
<Setting name="Default exporters" default="Empty list">

Tracking exporters preselected when Mocha Pro 2025 is running, for example **Nuke Tracker Data - 7.0+** or **After Effects CC Power Pin**.

</Setting>
</Settings>

</Setting>
<Setting name="Product Type Items" default="Empty list">

Optional product types the creator can create.

<Settings>
<Setting name="Product Type">

Product type name.

</Setting>
<Setting name="Label">

Label shown in the UI for the product type.

</Setting>
</Settings>

</Setting>
</Settings>

## Create Shapes

<SettingLocation uri="ayon+settings://mocha/create/CreateShapeData" scope="Studio, with project overrides" />

The creator of `matteshapes` products, and the shape exporters it preselects, with the same per-version lists and fallback as [Create Tracking Points](#create-tracking-points).

<!-- screenshot: settings editor, Create Shapes -->

<Settings prefix="create-shapes">
<Setting name="Enabled" default="Enabled">

Users can create `matteshapes` products.

</Setting>
<Setting name="Mocha Pro 2024">

<Settings>
<Setting name="Default exporters" default="Empty list">

Shape exporters preselected when Mocha Pro 2024.5 is running, for example **Silhouette shapes (\*.fxs)** or **Nuke v6.2+ Roto [Transform & Shape] (\*.nk)**.

</Setting>
</Settings>

</Setting>
<Setting name="Mocha Pro 2025">

<Settings>
<Setting name="Default exporters" default="Empty list">

Shape exporters preselected when Mocha Pro 2025 is running, for example **Silhouette Shape Data** or **Nuke Roto [Basic]**.

</Setting>
</Settings>

</Setting>
<Setting name="Product Type Items" default="Empty list">

Optional product types the creator can create, each with a **Product Type** and a **Label**.

</Setting>
</Settings>

## Related

- [Mocha Pro addon](index.md)
- [Publisher](../../../pipeline/publisher.md)
