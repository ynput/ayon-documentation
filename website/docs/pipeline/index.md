---
title: Pipeline
sidebar_label: Overview
description: "What the Pipeline section covers: how the AYON pipeline works on workstations, from launching applications and publishing to naming, color management, templated workfiles and the desktop tools."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/help/articles/7070980-about-ayon-pipeline
  - https://help.ayon.app/en/help/collections/3002056-pipeline-tools
---

# Pipeline

The AYON pipeline is the part of AYON that runs on artist workstations: the launcher that starts applications for a task, the integrations inside those applications, and the tools that load published work and publish new work to the AYON server. It turns the work of artists into versioned, named and immediately usable products, and records them on the server so that the rest of production can see them. This section explains how that works.

The section describes concepts, rules and tools. It does not contain step-by-step instructions. The integrations themselves, one per application, are addons and are described in the [Addons section](../addons/index.md).

## What it covers

| Topic | Pages | What they describe |
|---|---|---|
| Publishing | [Publishing](publishing.md), [Product types](product-types.md) | How a publish works and the stages it goes through, and the kinds of products it creates. |
| Naming | [Naming conventions](naming-conventions.md) | How product names, versions, work files and publish paths are built from settings and templates. |
| Color management | [Color management on launch](color-management-on-launch.md), [Color management in publishing](color-management-in-publishing.md) | How color settings reach an application when it launches, and how color data is handled while publishing. |
| Workfile templates | [Templated workfile builder](template-builder.md) | Filling a new workfile from a template scene with placeholders. |
| Pipeline tools | [Launcher](launcher.md), [Workfiles](workfiles.md), [Loader](loader.md), [Browser](browser.md), [Publisher](publisher.md), [Scene Inventory](scene-inventory.md), [Look Assigner](look-assigner.md), [Process Monitor](process-monitor.md), [Experimental tools](experimental-tools.md) | The desktop tools of the pipeline: what each one is, where it opens and its controls. |

## How the parts fit together

| Step | What happens | Where it is described |
|---|---|---|
| Start work | The launcher starts an application in the context of a project, folder and task, and sets the environment, including the color configuration. | [Launcher](launcher.md), [color management on launch](color-management-on-launch.md) |
| Open or create a workfile | The Workfiles tool opens and saves workfiles named from the project templates. A template can fill a new workfile. | [Workfiles](workfiles.md), [naming conventions](naming-conventions.md), [templated workfile builder](template-builder.md) |
| Bring in published work | The Loader and the Browser load published products into the scene, and the Scene Inventory manages what is loaded. | [Loader](loader.md), [Browser](browser.md), [Scene Inventory](scene-inventory.md) |
| Publish | The Publisher defines products and runs the publish: collect, validate, extract and integrate. | [Publisher](publisher.md), [publishing](publishing.md), [product types](product-types.md) |
| Record | The publish writes the files to the publish folder and registers the product, version and representations on the AYON server, where they show up in the web app. | [Publishing](publishing.md), [color management in publishing](color-management-in-publishing.md) |

## Related sections

| Topic | Where |
|---|---|
| The pipeline addons (core, applications and the integrations with 3D, 2D and compositing applications) | [Addons](../addons/index.md) |
| The settings that drive the pipeline | [Core addon settings](../addons/essentials/core/settings.md) |
| Server administration: bundles, addons, dependency packages | [Web UI](../ayon/web-ui/bundles-and-addons.md) in the AYON section |
| Tracking the production in the web app | [Production tracking](../production-tracking/index.md) |
| Writing pipeline plugins and addons | [Developer](../developer/index.md) |
