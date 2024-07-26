---
id: addon_usd_artist_faq
title: FAQ
sidebar_label: FAQ
---

::: info
This page is still under construction 👷🚧🛠️🔜🏗️.
:::

# FAQ

Frequently Asked Questions or Frequent Issues.

#### I do not see my model on loading the asset 

<details><summary>On Load warning message "Unresolved Reference Path" shows</summary>

![341136311-0b7c2504-8f88-4af9-aeb8-5f8014c5504c|690x438](upload://8sTsEqQCfyyaR36VGRhwZ3VU6xw.png)

Since you're publishing into the asset structure make sure your data is inside the expected default primitive path for that asset, where the default primitive is always `{folder[name]}` so your data should be inside `/{folder[name]}/...` so that the data resides inside the default primitive path.

This is wrong: :warning: 

```
/geo/marble
/materials/material1
```

This is correct: :trophy: 

```
/char_hero
    /geo/marble
    /materials/material1
```


You are lacking the default primitive it expects.
</details>

#### What are all these publisher options, like Target Product?


<details><summary>Some technical details explained by @MustafaJafar </summary>

## USD Publish Settings explained

![image](upload://jabN8kbKHWDkxZFd8DP21jTEl60.png)

I'll just focus on 4 interesting settings.
1. `target-product` which is a user editable text.
2. `target-product_department-name` which is a selection from a drop down list. and users/admins can't change the items in the list.
3. `variant-set-name` which is by default is set to `{layer}` which evaluates to the selected item in the drop down list in Num2
4.  `variant-name` which is by default is set to `{variant}` as the arrow in the screenshot points.

## Asset Structure
The asset structure is based on:
- [ASWF Guidelines for Structuring USD Assets](https://wiki.aswf.io/display/WGUSD/Guidelines+for+Structuring+USD+Assets)
- Nvidia/Omniverse's [Principles of Scalable Asset Structure in OpenUSD](https://docs.omniverse.nvidia.com/usd/latest/learn-openusd/independent/asset-structure-principles.html)

But, let me summarize the results.

#### When enabling Asset Contribution + Add as Variant

> [!NOTE]  
> I love how the asset definition is readable!
> Any data in the asset defintion are static. They are computed on publishing.
> Paths can change when using AYON resolver. 
> List of departments, layer-ids and order are hardcoded and not exposed yet to settings.

 
Product: `target-product`
```
# USD Asset
{target-product}.usda
  └── Xform {folder[name]}
        ├── inherits __class__/{folder[name]}
        └── payload ./payload.usda  # Relative path

payload.usda
  └── mata data
        └── sublayers
              └── {target-product_department-name}.usda:ARGS:{layer-id}, {order}
```

Product: `target-product_department-name`
```
# USD Asset Layer
{target-product}.usda
  └── Xform {folder[name]}
        ├── Variant Sets -> ["{variant-set-name}"]
        └── Variant Set "{variant-set-name}"
              └── Variant {variant-name}
                    ├── reference -> Published AYON usd product variant file path
                    └── custom data
                          ├── ayon_order
                          └── ayon_uri -> AYON URI for the published AYON USD product variant
```

Product: `AYON-product-variant`
```
# USD product
{AYON-product-variant}.usd
# It can be any hierarchy.
```

#### When enabling Asset Contribution without Add as Variant
It still add a variant! I think there might be a bug or I did something wrong...
_Also, I'll update this section once it works on my side._

#### When disabling Asset Contribution

> [!NOTE]  
> It doesn't affect the version in the latest published `target-product` or `target-product_department-name`. 

Product: `AYON-product-variant`
```
{AYON-product-variant}.usd
# It can be any usd hierarchy.
```
</details>

#### We need to manually rename primitive paths the whole time?

> We use reference so we can manually enter the primitive path, but i don't think that should be the way to go, they should all be connected and work without renaming and further input.

<details><summary>You should not need to manually rename all referenced primitive paths for assets</summary>

Using the AYON USD Contribution Workflow manual 're-assigning' all the time for assets should be redundant for the majority of the workflow. (Preferably this should never be needed, but some sections like animation from shot layers may still fall outside of that scope.)

1. Use the AYON USD Contribution workflow where the asset build is built automatically from single product contributions into the root primitive.
2. Load the `usdAsset` - avoid using the indidiviual layers, you should not need to load those individually since they are all in the main asset. 

Now, in a shot based workflow you'd just load the asset and since e.g. Maya animation caches are not already overlaid over a USD asset structure that is one of the moments where you *will* need to define the path you're overlaying to.

That's usually like:

1. Reference the `usdAsset` into your shot's structure, e.g.
```
/asset/char_hero
```
Which may result in e.g. an asset with model and look:
```
/asset/
    char_hero/
        geo/..
        mtl/..
```
(The "char_hero" is the prim where you have the reference to the `usdAsset`)

What you need to make sure to do is that anything you want to layer on top of your asset comes in with the same hierarchy, so an animation cache preferably also has the structure:
```
char_hero/
    geo/..
```
With the animated geometry only. That you can then also reference on top of `/asset/char_her` in the shot structure which makes your referenced asset (that already has materials) move because just the geometries are being overridden.

#### Keep in mind the layer strength - referencing lower in the hierarchy means a stronger opinion!

It's usually important to reference on the same root prim of the asset, because as soon as you e.g. reference over `asset/char_hero/geo` instead your reference is lower in hierarchy than any reference on a higher prim like `asset/char_hero` and hence will ALWAYS be the stronger opinion.
</details>
