---
id: addon_usd_artist_contribution_workflow
title: AYON USD Contribution Workflow
sidebar_label: Contribution Workflow
description: Automatically contribute products into USD assets or shots
toc_max_heading_level: 5
---

:::info
The **AYON USD Contribution Workflow** was introduced with PR [Implement USD workflow with global asset/shot contributions plug-in](https://github.com/ynput/ayon-core/pull/295) 
:::

## What is it?

The AYON USD Contribution Workflow allows to create small contribution publishes from DCCs with USD export support to directly add your publish into an asset's model or look variants or a shot's department layers. Automatically building up the USD structure for you.

Traditionally each department or artist would generate multiple products that downstream departments would load individually. For example, a lighting department may load each character animation product, each FX product individually.

So there would be some scattered products like:

```
- pointcacheMain
- pointcacheFX_building
- animationChar01
```

However, **USD can reference and layer non-destructively** which means we can safely merge these together at any point. Also making it easy for multiple departments to stack their own opinions and changes onto the departments before you.

This is where the USD Asset Contribution workflow automates this for you.

With the **USD Contribution** enabled on the USD publish instances this means it will automatically add your product into the department layer for the Asset or Shot.

```
- usdShot
    - usdShot_animation
        - animationChar01
        - pointcacheMain
    - usdShot_fx
        - pointcacheFX_building
```

**TL;DR**

With AYON's USD Contribution each product publish adds up into the target USD asset or USD shot. :tada: 

## Configuring the USD Contribution

You can configure the USD contribution for an instance using the publisher UI on the _Publish_ tab selecting the USD instance. The right hand side will show a **USD Contribution** section.

###  Asset contribution to `usdAsset`

![AYON USD Contribution to Asset in Publisher UI](assets/usd/ayon_usd_contribution_to_asset.png)  
_This example publishes an asset contribution to the look department layer_

Asset contributions usually have [Add as variant **enabled**](addon_usd_artist_contribution_workflow#add-as-variant-enabled) so that multiple contributions to that department layer each become a variant. Publishing product `lookMain` and product `lookDamaged` with both set to add as variant will provide a variant set where you can switch between the two.

:::tip
Enable the _Set as default variant selection_ to make that product become the default variant in target variant set.
:::

### Shot contribution to `usdShot`

![AYON USD Contribution to Shot in Publisher UI](assets/usd/ayon_usd_contribution_to_shot.png)  
_This example publishes a shot contribution to the FX department layer_

Shot contributions usually have a different target product, like `usdShot`. 

In the majority of cases when contributing to a shot you want to [**disable** Add As Variant](addon_usd_artist_contribution_workflow#add-as-variant-disabled) because for a shot, if multiple contributions are made to one department layer those should usually live alongside each other and are *not* variants of each other. 

:::warning
Currently it is a manual process to target `usdShot` instead of `usdAsset` for shot contributions.  
It is a **common mistake to forget changing the target product**, so be aware!

Improvements to that workflow using better preset configurations are planned.
:::

:::note Defining the target product name.
Technically the *Target Product* can be any name you like, you could make any number of target product assets in a single folder each with department layers of their own. 

However, it is usually **good practice** to maintain a single `usdAsset` in an asset and a single `usdShot` in shots.
:::

:::note Initialize as asset or shot
The _Initialize as_ setting is **only** relevant if the target product does not exist yet - so it is only used on first time generation of that file. It defines the asset structure, like USD payloads, asset info for the target product's USD file.

For now, set asset targets to initialize as asset, set shot targets to initialize as shots. However, we're looking to streamline this with better preset configurations.
:::

### Disabling USD contribution workflow

If you just disable the **USD Contribution > Enable** checkbox you will write out just the USD file using the host's export methods without any automated layering into another product - as such, disabling that means that all the settings underneath it do nothing at all. (They should appear greyed out, but unfortunately it's a limitation of the publisher UI that it can't currently)

## Add as variant - or not?

In most cases:
- an **asset** contribution is a variant.
- a **shot** contribution is **not** a variant.

### Add as variant ENABLED

When enabling _Add as variant_ it means your single contribution will be added as a variant in a variant set on the asset's root primitive (the default prim). As such, multiple variant contributions to the same department layer (and same variant set) are not active at the same time, but they are switchable variants. So you can for example:

- Publish a model main variant
- Publish a model damaged variant

Now in the USD asset on the root primitive you may have a variant set _model_ that contains your _modelMain_ and _modelDamaged_ variants that downstream departments can switch between in your asset.

### Add as variant DISABLED

With _Add as variant_ **disabled** each contribution to a single department layer is just added as essentially another layer - meaning that the contributions inside a single department layer are all live at the same time.

You can for example:

- Publish a FX shockwave
- Publish a FX building destruction

Both to the FX department layer - one isn't necessarily 'in front of' the other they are both just unordered contributions in that layer, present at the same time.

So loading the shot with the FX layer will show both the shockwave and building destruction - you're not picking between the two.

## Contributions are additive

Over time, contributing to the asset adds more products to the `usdAsset`, across likely a variety of department layers.
Say our current publish structure is:
```
usdAsset              (target product)
  - usdAsset_model    (department layer)
    - usdModelMain    (single contribution product)
```

Now publishing a `usdLookMain` to department layer `look` would make a new `usdAsset` version:
```
usdAsset              (target product)
  - usdAsset_model    (department layer)
    - usdModelMain    (single contribution product)
  - usdAsset_look     (department layer)
    - usdLookMain     (single contribution product)
```

Then publishing another look variant `usdLookDamaged` would make a new `usdAsset` version:

```
usdAsset              (target product)
  - usdAsset_model    (department layer)
    - usdModelMain    (single contribution product)
  - usdAsset_look     (department layer)
    - usdLookMain     (single contribution product)
    - usdLookDamaged  (single contribution product)
```

:::note Contribution workflow is 'additive' to the target product's department layers

Whenever publishing a product with contribution enabled it will add it to an existing target product's department layers (or _update_ if it's the exact same product).

This workflow makes it possible for different departments to simultaneously work on an asset and contribute to it additively.

:::

## Removing contributions

There currently are no ready-to-go AYON tools that make it trivial to remove existing contributions from a product or department layer.

Unfortunately this means if you currently accidentally make a wrong contribution you will have to go and edit the actual USDA files' contents to remove entries.

:::note 
Providing tools for [easy editing of these existing contributions is on our issue tracker](https://github.com/ynput/ayon-usd/issues/23).
:::

### Removing contributions manually

:::warning
This is a technical process and may leave your USD files in a broken state if not handled with care.
:::

#### Removing a department layer from the target product

Your published `usdAsset` may have department layers 'payloaded' in. In the `../publish/usd/usdAsset/v001/payload.usd` file you may see for example:

```usda
#usda 1.0
(
    defaultPrim = "hero"
    metersPerUnit = 1
    subLayers = [
        @C:\projects\ayontest\asset\hero\publish\usd\usdAsset_look\v001\ynts_hero_usdAsset_look_v001.usd:SDF_FORMAT_ARGS:layer_id=look&order=300@,
        @C:\projects\ayontest\asset\hero\publish\usd\usdAsset_model\v002\ynts_hero_usdAsset_model_v002.usd:SDF_FORMAT_ARGS:layer_id=model&order=100@
    ]
    upAxis = "Y"
)
```

You can remove one of the `subLayers` entries to completely remove a department layer from that published file.
For example, removing the look layer makes it.

```usda
#usda 1.0
(
    defaultPrim = "hero"
    metersPerUnit = 1
    subLayers = [
        @C:\projects\ayontest\asset\hero\publish\usd\usdAsset_model\v002\ynts_hero_usdAsset_model_v002.usd:SDF_FORMAT_ARGS:layer_id=model&order=100@
    ]
    upAxis = "Y"
)
```

#### Removing a single contribution in a department layer

Your published `usdAsset_model` will have the individual contributions to that layer. In the `../publish/usd/usdAsset_model/v001/..._v001.usd` file you may see for example:

```usda
#usda 1.0
(
    defaultPrim = "hero"
    metersPerUnit = 1
    upAxis = "Y"
)

def Xform "hero" (
    variants = {
        string model = "ModelMain"
    }
    prepend variantSets = "model"
)
{
    variantSet "model" = {
        "ModelMain" (
            prepend references = [
                @C:\projects\ayontest\asset\hero\publish\usd\usdModelMain\v001\ynts_hero_usdModelMain_v001.usd@ (
                    customData = {
                        int ayon_order = 100
                        string ayon_uri = "ayon://ayontest//asset/hero?product=usdModelMain&version=1&representation=usd"
                    }
                )
            ]
        ) {

        }
        "ModelPhotoreal" (
            prepend references = [
                @C:\projects\ayontest\asset\hero\publish\usd\usdModelPhotoreal\v001\ynts_hero_usdModelPhotoreal_v001.usd@ (
                    customData = {
                        int ayon_order = 100
                        string ayon_uri = "ayon://ayontest//asset/hero?product=usdModelPhotoreal&version=1&representation=usd"
                    }
                )
            ]
        ) {

        }
    }
}
```

To remove a single variant, like `ModelMain` you can remove that block. In this case, make sure to also update the default variant set at the top of the file.
```usda
#usda 1.0
(
    defaultPrim = "hero"
    metersPerUnit = 1
    upAxis = "Y"
)

def Xform "hero" (
    variants = {
        string model = "ModelPhotoreal"
    }
    prepend variantSets = "model"
)
{
    variantSet "model" = {
        "ModelPhotoreal" (
            prepend references = [
                @C:\projects\ayontest\asset\hero\publish\usd\usdModelPhotoreal\v001\ynts_hero_usdModelPhotoreal_v001.usd@ (
                    customData = {
                        int ayon_order = 100
                        string ayon_uri = "ayon://ayontest//asset/hero?product=usdModelPhotoreal&version=1&representation=usd"
                    }
                )
            ]
        ) {

        }
    }
}
```

Or remove the variant set completely:
```usda
#usda 1.0
(
    defaultPrim = "hero"
    metersPerUnit = 1
    upAxis = "Y"
)

def Xform "hero" (
)
{

}
```

Which in this case leaves the empty root prim `hero`.

---

:::info TODO
- How to define or customize the layer strength 
- Explain publisher UI asset contribution attributes to avoid confusion.
- Explain general shot workflow in Maya
- Explain Rig -> Animation workflow to publish animations for shot workflows.
:::
