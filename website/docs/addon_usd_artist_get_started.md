---
id: addon_usd_artist_get_started
title: Getting Started
sidebar_label: Getting Started
---

:::info
This page is still under construction 👷🚧🛠️🔜🏗️.
:::

# Getting started

## Creating an asset

The producer has his 🔫 pointing at you and needs the **asset** _now!_

When we are referring to the USD asset, we mean the asset with both the model's geometry and the look's materials and textures. The USD structure (simplified) then becomes:

```
asset.usd
  - look.usd
  - model.usd
```
Where the look is applied over the model inside the asset.

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