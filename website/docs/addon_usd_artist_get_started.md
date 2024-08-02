---
id: addon_usd_artist_get_started
title: Getting Started
sidebar_label: Getting Started
---

A quick start into AYON x USD

:::info
This page is still under construction 👷🚧🛠️🔜🏗️.
:::

Within the USD workflow we usually make a big distinction between *Assets** and **Shots**.

Assets usually follow [strict asset guidelines](http://localhost:3000/docs/addon_usd_artist_usd_intro#usd-asset-structure-guidelines) and fall under a **single root primitive** also referred to its default primitive. This is because Assets are usually *referenced* into a USD stage which means they overlay a single primitive (the root) into the scene you're referencing into.
Shots usually contain multiple root prims, from referenced assets, to lights, to render settings and more.

Regarding loading the assets, in almost all cases:

- Assets are **referenced** into your scene (or payloaded in)
- Shots are **sublayered** into your current scene (or opened as root layer)

## Creating an asset

When we are referring to the USD asset, we mean the full asset with the model's geometry, the look's materials and textures, potentially a groom and may even embed a rig (although USD is not a rig format, but it may encapsulate e.g. Maya Scene references) 

The USD structure (simplified) then becomes:

```
asset.usd
  - look.usd
  - groom.usd
  - model.usd
```
Where the groom is applied over the model, and the look is applied over those.
This means that the look's _opinions_ are stronger than the layers below it.

:::note
A layer being stronger than another means it can override in essence all of its opinions depending on USD strength ordering ([LIVRPS](https://remedy-entertainment.github.io/USDBook/terminology/LIVRPS.html)). In simple words, a look can potentially override UVs, point positions and so forth. But usually only adds materials, render geometry settings and material bindings.
:::

#### Creating the model

_From a Maya, Houdini or Blender perspective_

**TODO:** Add visuals - maybe short video recording

We will want to create our geometry's contribution to the asset.
For the asset structure it's critical we work within the asset's hierarchy so that USD referencing works. (_consider that USD mumbo jumbo for now_)
As such, we'll always work within a root group with the current folder (asset)'s name.
Say our character's folder path is `assets/char_hero` then the root group is `char_hero`

We can make a hierarchy like:
```
char_hero/
    geo/
        body
        pants
```
And yes, cool heroes wear no shirts. 👕 Only pants 👖 .
 
When done. We publish that `char_hero` as USD contribution to the `model` layer.
The publishing logic will make the layering of the `model.usd` into the `asset.usd` for you automatically.

So no we have:
```
asset.usd
    model.usd
```
When loading that in, we'll have our hero wearing pants.
But it needs some 🖌️🎨 paint.

#### Creating the look

_From a Houdini perspective_

1. Reference the asset so we have the model.

_Note the word "reference" here. We are usually not "sublayering" the asset USD file_

2. Make sure to add a "layer break". This special Houdini node breaks off the USD scene above it and from that moment on any changes on the existing hierarchy are just opinions that are overlaid on top of it. This means that when writing out a USD file now we're not re-exporting the geometry itself, but only any changes we make after the layer break.

3. Apply your materials to the `char_hero/geo` meshes and make sure your materials are within `char_hero` group as well. So usually you end up with:
```
char_hero/
    geo/
       body   <- material 'char_hero/mtl/body_shader' applied
       pants  <- material 'char_hero/mtl/pants_shader' applied
    mtl/
        body_shader
        pants_shader
```

4. Publish as the look product type (which is a USD look in Houdini).

## Creating a shot

**TODO:** Add visuals - maybe short video recording

_Houdini perspective_

- Quickly, **reference** the asset.
- Throw some lights into the scene.
- Set up the USD Render Settings.
- Publish your USD render submission to Husk Standalone 

You are now the USD champion - until they ask you about asset variants, LODs, purposes and a layered shot structure, and more. Easy, cowboy!


# Additional context

- [Ayon Core USD workflow PR contains some comments and explanations](https://github.com/ynput/ayon-core/pull/295)
- [In the original OpenPype PR description it contained quite some 'test' videos](https://github.com/ynput/OpenPype/pull/5925#issue-1995346181)
- [At FMX 2024 an OpenUSD presentation was given that showed usage of what is basically the functionality of this PR](https://www.youtube.com/watch?v=1KqrIRCi_EQ).