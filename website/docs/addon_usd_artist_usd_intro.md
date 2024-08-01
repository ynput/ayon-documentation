---
id: addon_usd_artist_usd_intro
title: Why and What is USD ?
sidebar_label: USD Intro
---

:::info
This page is still under construction 👷🚧🛠️🔜🏗️.
:::

## Why USD
[USD Explainer Guide](https://www.foundry.com/insights/film-tv/usd-explainer-guide) article provides great insights about why USD is very useful

Let me paraphrase it:

Traditional pipeline production followed a waterfall model, where each stage involved a "baking" process. To make any alterations, you would need to return to the start and re-bake at each step along the way.
Conversely, USD enables the seamless continuation of decisions throughout the pipeline by allowing live updates to existing USD layers. This is achieved through the creation of higher-order layers that can override an attribute or a value, thereby eliminating the need for baking the existing layers.
Thus, USD significantly enhances team collaboration by enabling multiple individuals to work on different layers of the same assets or shots simultaneously. Team members can override each other's work in a non-destructive manner, preserving the integrity of the overall project.


## What is USD
USD, short for Universal Scene Description, is a robust ecosystem featuring a versatile file format and a comprehensive Library API. The USD file format,which represents a USD layer, is capable of representing a wide array of 3D data, including scene hierarchies, geometries, instances, material networks, lights, cameras, volumes, coordinate systems, and shading nodes.

The accompanying USD API offers a suite of tools designed for broad adoption, enabling a wide array of applications to effectively interact with USD content.

This versatility is why USD is aptly named Universal Scene Description—it has the unique ability to "describe" scenes across any application that implements USD, independent of the operating system on which it runs.

In the screenshot provided, I've opened an [ALab usd scene](https://animallogic.com/alab/) across various applications: Houdini, Omniverse, and Usdview. 

![](assets/usd/usd_intro/usd_scene.png)


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
