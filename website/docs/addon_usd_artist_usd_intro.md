---
id: addon_usd_artist_usd_intro
title: Why and What is USD?
sidebar_label: USD Intro
description: Introduction to USD and reasons to adopt it
toc_max_heading_level: 5
---

## Why USD
[USD Explainer Guide](https://www.foundry.com/insights/film-tv/usd-explainer-guide) article provides great insights about why USD is very useful.

Let me paraphrase it:

> Traditional pipeline production followed a waterfall model, where each stage involved a "baking" process. To make any alterations, you would need to return to the start and re-bake at each step along the way.
Conversely, USD enables the seamless continuation of decisions throughout the pipeline by allowing live updates to existing USD layers. This is achieved through the creation of higher-order layers that can override an attribute or a value, thereby eliminating the need for baking the existing layers.
Thus, USD significantly enhances team collaboration by enabling multiple individuals to work on different layers of the same assets or shots simultaneously. Team members can override each other's work in a non-destructive manner, preserving the integrity of the overall project.


## What is USD
USD, short for Universal Scene Description, is a robust ecosystem featuring a versatile file format, a composition engine, a rich toolset, and a comprehensive library API.

- **Versatile File Format**: The USD file format, *which represents a USD layer,* supports a wide range of 3D data, including scene hierarchies, geometries, instances, material networks, lights, cameras, volumes, coordinate systems, and shading nodes.

- **USD Composition Engine**: This powerful engine composes *(combines)* USD layers to display the final image. The composition algorithm is sometimes referred to as [LIVRPS (Liver Peas)](https://remedy-entertainment.github.io/USDBook/terminology/LIVRPS.html).

- **Rich Toolset**: A command-line [toolset](https://openusd.org/release/toolset.html) for reading, writing, editing, and rapidly previewing USD layers, such as the `usdview` command.

- **Comprehensive Library API**: The accompanying USD API, *a C++ library with Python bindings,* allows effective interaction with USD content from code, enabling a wide array of applications to adopt and support USD.

This versatility is why USD has earned its name, Universal Scene Description—it uniquely "describes" scenes across any application that implements USD, independent of the operating system on which it runs.

In the screenshot provided, I've opened the [ALab usd scene](https://animallogic.com/alab/) across various applications: Houdini, Omniverse, and Usdview. 

![](assets/usd/usd_intro/usd_scene.png)


## USD Products in AYON Pipeline

In the AYON pipeline, we use USD for exchanging assets and shots.

Both `USD Assets` and `USD Shots` are USD layers structured differently to enable specific characteristics. In later sections, you'll find a quick demonstration for [Understanding a USD Asset](#understanding-a-usd-asset) and [Understanding a USD Shot](#understanding-a-usd-shot).

*This topic is expanded in later pages.*

## Understanding a USD Asset
A USD Asset is content organized to facilitate efficient asset exchange. It boasts several key features:
- The ability to load and unload the asset as needed.
- Multiple layers to store data from various departments, such as modeling, materials, effects, lighting, and animation.
- Flexibility for each layer to contain switchable variants, enhancing adaptability and collaboration.

### Load and Unload

Unloading an asset effectively makes it resemble an empty folder, which can significantly lighten the scene. This feature is particularly beneficial when assembling scenes, as it helps manage resource usage efficiently.
![](assets/usd/usd_intro/asset_load_unload.gif)

### Multiple Layers
This jar asset consists of three layers:
- surfacing 
- modeling
- assembly

![](assets/usd/usd_intro/asset_layers.png)

### Variants
Assets can contain multiple variant sets, yet only a single variant within each set can be active at any given moment.

![](assets/usd/usd_intro/asset_variant.png)

![](assets/usd/usd_intro/asset_variant.gif)


## Understanding a USD Shot
A USD Shot is a USD file structured to enhance shot exchange.
It effectively combines distinct layers from various departments into one streamlined file.

![](assets/usd/usd_intro/usd_shot.png)


## Further Reading

### USD Introduction Guides
- [**Book of USD** - Getting Started with Universal Scene Description (USD)](https://remedy-entertainment.github.io/USDBook/) by Remedy Entertainment
> :point_up: Very good introduction to USD concepts in a slightly simplified and practical way

- [**Usd Survival Guide**](https://lucascheller.github.io/VFX-UsdSurvivalGuide/index.html) by Luca Scheller
> :point_up: More technical guide going over USD with the API as guideway. Also introduces a lot of "workflow optimizations" tips with a focus on Houdini Solaris and Python

### USD Asset Structure Guidelines
:::info
Our USD workflow follows the following structure guidelines.
:::

* **[Principles of Scalable Asset Structure in OpenUSD](https://docs.omniverse.nvidia.com/usd/latest/learn-openusd/independent/asset-structure-principles.html#id5)**
* **[Guidelines for Structuring USD Assets](https://wiki.aswf.io/display/WGUSD/Guidelines+for+Structuring+USD+Assets)**

### Example USD Assets

#### Alab
The ALab data set is the Animal Logic interpretation and implementation of real world production and pipeline concepts in USD.

- **[ALab Download](https://dpel.aswf.io/alab/)**
- **[ALab Documentation](https://usd-alab2.s3.amazonaws.com/README.html)**

#### Activision
Activision provides a USD data set from their Call of Duty franchise with some good instructions in the readme:

- **[Activision's Call of Duty®: Warzone™  Caldera USD dataset](https://github.com/Activision/caldera)**

#### J Cube

3D Assets by J Cube Inc.

The Esper Room by J Cube Inc. is an excellent and user-friendly starting point for experimentation.

- **[3D Assets | JCube](https://j-cube.jp/solutions/multiverse/assets/)**