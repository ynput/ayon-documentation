---
id: addon_usd_artist_get_started
title: Getting Started with USD in AYON
sidebar_label: Getting Started
---

A quick start into AYON x USD

## Assets and Shots

Within the USD workflow we usually make a big distinction between **Assets** and **Shots**.

Assets usually follow [strict asset guidelines](addon_usd_artist_usd_intro.md#usd-asset-structure-guidelines) and fall under a **single root primitive** also referred to as its default primitive. 
This is because Assets are usually *referenced* into a USD stage which means they overlay a single primitive (the root) into the scene you're referencing into.

Shots usually contain multiple root prims, from referenced assets, to lights, to render settings and more.

Regarding loading the assets, in almost all cases:

- Assets are **referenced** into your scene (or payloaded in)
- Shots are **sublayered** into your current scene (or opened as root layer)

Which means that for assets you can position the single root on top of any prim path in your scene (USD referencing) and with shots you load in the full stage hierarchy without moving things around (USD sublayers).

For more details on referencing versus sublayering:

- [SideFX: USD Referencing explained](https://www.sidefx.com/docs/houdini/solaris/usd.html#referencing)
- [SideFX: USD Sublayering explained](https://www.sidefx.com/docs/houdini/nodes/lop/sublayer.html#sublyrdetails)

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

### Creating the model

We will want to create our geometry's contribution to the asset.

For the asset structure it's critical we work within the asset's hierarchy so that the asset referencing (explained above) works.

As such, we'll always work within a root group with the current folder's name.  
Say our character's folder path is `assets/hero` then the root group is `hero`

We can make a hierarchy like:
```
hero/
    geo/
        body
        pants
```
 
When done. We publish that `hero` as USD contribution to the `model` layer.
The publishing logic will make the layering of the `model.usd` into the `asset.usd` for you automatically.

So now we have:
```
asset.usd
    model.usd
```

When loading that in, we'll have our hero wearing pants. But it needs some 🖌️🎨 paint.

### Creating the look

_From a Houdini perspective_

1. Reference the asset so we have the model.


:::note
The **Asset USD file** is usually _referenced_ and not _sublayered_ into your scene.  
Nor do you load the individual department or contribution layers.
:::

2. Make sure to add a _[Layer Break LOP](addon_usd_artist_houdini_workflow.md#layer-break)_. This special Houdini node breaks off the USD scene above it and from that moment on any changes on the existing hierarchy are just opinions that are overlaid on top of it. This means that when writing out a USD file now we're not re-exporting the geometry itself, but only any changes we make after the layer break.

3. Apply your materials to the `hero/geo` meshes and make sure your materials are within `hero` group as well. So usually you end up with:
```
hero/
    geo/
       body   <- material 'hero/mtl/body_shader' applied
       pants  <- material 'hero/mtl/pants_shader' applied
    mtl/
        body_shader
        pants_shader
```

4. Publish as the look product type (which is a USD look in Houdini).

## Creating a shot

:::info
Using AYON's contribution workflow targeting shots currently **requires extra
attention** on the publish attributes for the instance to correctly target the
`usdShot` and **disable variants** (_usually your shot contribution is not a variant_).

For more information see the [AYON Contribution Workflow](addon_usd_artist_contribution_workflow.md#shot-contribution-to-usdshot).
:::

_Houdini perspective_

- **Reference** the assets and perform you scene assembly or layout. This is usually a contribution to the Assembly or Layout department layer.
- Throw some lights into the scene.
- Set up the USD Render Settings.
- Publish your USD render submission to Husk Standalone

## Additional context

- [Ayon Core USD workflow PR contains some comments and explanations](https://github.com/ynput/ayon-core/pull/295)
- [In the original OpenPype PR description it contained quite some 'test' videos](https://github.com/ynput/OpenPype/pull/5925#issue-1995346181)
- [At FMX 2024 an OpenUSD presentation was given that showed usage of what is basically the functionality of this PR](https://www.youtube.com/watch?v=1KqrIRCi_EQ).

---

:::info TODO
- General improvements; with this guide it's still hard to get started
- Add video recordings for the quick asset and shot workflow
- Move software-specifics to their individual workflows (Houdini, Maya, Blender)
- Explain more about variants versus non-variants in asset contributions
:::
