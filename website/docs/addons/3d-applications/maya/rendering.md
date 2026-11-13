---
title: Maya rendering and renderers
sidebar_label: Rendering
description: "How the AYON Maya addon handles rendering: the Render creator, render setup, the supported renderers (Arnold, V-Ray, Redshift, Renderman, Maya Hardware 2.0), render validators, and the proxy, scene source and volume products of the renderers."
addon: maya
addon_repo: ayon-maya
addon_version: 0.6.13
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-maya/tree/0.6.13
  - https://help.ayon.app/en/articles/6811988-working-with-maya-in-ayon
  - https://help.ayon.app/en/articles/2888902-working-with-arnold-in-ayon
  - https://help.ayon.app/en/articles/3842653-working-with-vray-in-ayon
  - https://help.ayon.app/en/articles/0021176-working-with-redshift-in-ayon
---

# Maya rendering and renderers

<AddonInfo />

This page describes how the [Maya addon](index.md) publishes renders and how it supports the renderers that Maya uses. The addon reads the render layers of Maya's Render Setup, works out the images each renderer will write, and publishes them as a `renderlayer` product. The settings for it are in the [render settings](settings.md#render-settings) section of the settings page.

## Supported renderers

The addon calculates the expected render products for these renderers.

| Renderer | Render settings in AYON | Products and loaders |
|---|---|---|
| Arnold | Image prefix, image format, multilayer EXR, tiled output, AOVs, additional options | Arnold scene source (`.ass`), Arnold standin loader, VDB loader |
| V-Ray | Image prefix, production engine, image format, AOVs, additional options | V-Ray proxy, V-Ray scene, VDB loader |
| Redshift | Image prefix, global illumination engines, image format, multipart EXR, force combine, AOVs, additional options | Redshift proxy, VDB loader |
| Renderman | Image prefix and the output directories of image, display filters, sample filters, Cryptomatte and watermark, additional options | |
| Maya Hardware 2.0 | Image prefix | |

The scene's renderer is read when the render settings are applied. A scene with another renderer is not supported and raises an unsupported renderer error.

## Render creator

The **Render** creator (`renderlayer`) makes one instance for each render layer of the scene's Render Setup. Its attributes:

| Attribute | Description |
|---|---|
| Render target | Where the render is made: **Local machine rendering**, **Use existing frames (local)** or **Farm Rendering**. The farm option publishes through the render farm integration, such as the Deadline addon |
| Review | Marks the render as reviewable |
| Extend Frames | Renders and publishes only the frames after those of the previous publish, and publishes them together with the previously rendered frames |
| Override Existing Frame | Renders frames again even when they exist |
| Enable tiled rendering, Tiles X, Tiles Y | Splits the frame in tiles for the render farm |
| Convert to Scanline | Converts the output images to scanline images |
| Use Referenced AOVs | Includes the AOVs from referenced scenes |
| Render Setup Include Lights | Includes all lights in the render layer. The default comes from the render settings |

**Render Setup Preset** (`rendersetup`) publishes the Render Setup of the scene as a JSON template, and the **Load RenderSetup template** loader overwrites the current Render Setup with a published one.

### Applying render settings

When **Apply Render Settings on creation** is on, creating a Render instance applies the render settings of the project to the scene. The same can be applied from the menu with **Set workfile attributes > Render Settings**. It sets the image prefix, the image format and the AOVs of the active renderer, the default render image folder, the AOV separator, and the additional attributes listed in the settings.

### Local render and farm

A local render is done by the **Extract Local Render** plugin, which renders the layer on the local machine unless the instance is marked for the farm. For farm renders, the **Collect Render Layers** plugin gathers the render layers, their AOVs, cameras and frame ranges. The **Sync render version with workfile** setting makes the render version follow the workfile version. A plugin that determines the future version of the product supports attaching a render to a product version. The submission itself belongs to the Deadline addon.

The cache products (`ass`, `animation`, `pointcache`, `oxcache`, `proxyAbc`, `redshiftproxy`, `vrayproxy`, `xgen`, `yeticache`) can be collected as farm instances for a remote publish.

## Render validators

| Validator | Checks |
|---|---|
| Images File Rule (Workspace) | That the Maya workspace `images` file rule matches the project settings |
| No Default Cameras Renderable | That no default (startup) camera is set to render |
| Render Single Camera | That the renderable camera count of the layer fits the `<Camera>` token |
| Render Passes / AOVs Are Registered | That the created AOVs or render elements are registered in the database |
| Validate Render Settings | That the global render settings match the attributes configured per renderer |
| Validate Resolution | That the render resolution matches the AYON context |
| Current Render Layer Has Renderable Camera | That the current render layer has a renderable camera |
| Validate Existing Frames | That all files of the representations exist on disk, for a local render that uses existing frames |
| VRay Distributed Rendering | That V-Ray Distributed Rendering is ignored in batch mode |
| VRay Referenced AOVs | Whether the V-Ray render elements include references |
| VRay Translator Settings | That the V-Ray translator settings allow extracting `.vrscene` files |
| Yeti Render Script Callbacks | Whether the render script callbacks are used during the render |

## Arnold

| Product | Description |
|---|---|
| Arnold Scene Source (`ass`) | An `.ass` file, as a single file or a sequence from the frame range of the instance, with optional gzip compression. The creator has options for the exported node types (cameras, lights, shapes, shaders, overrides, drivers, filters, color managers, operators, imagers), motion blur and the bounding box |
| Arnold Scene Source Proxy (`assProxy`) | The same with a `proxy_SET` of viewport geometry. At render time the proxy is replaced by the content. Nodes of the content and the proxy need the same names and `cbId` |

Validators for the Arnold products: **Validate Arnold Scene Source** (hierarchy of the instance), **Validate Arnold Scene Source Proxy**, **Validate Arnold Scene Source CBID** and **ASS has relative texture paths**. Repair actions fix the last two.

The **Load as Arnold standin** loader loads `ass`, `assProxy`, animation, model, proxy Alembic, pointcache, USD and Ornatrix cache products from `.ass`, `.abc`, `.usd`, `.usda` and `.usdc` files as an Arnold standin node. It lets caches such as animation be placed without a file reference, and the Scene Inventory still tracks them. Looks can be assigned to a loaded scene source or Alembic standin from the Look Assigner; a standin proxy does not take look assignments.

The **VDB to Arnold** loader (`vdbcache`, `.vdb`) loads OpenVDB data into an `aiVolume`.

## V-Ray

| Product | Description |
|---|---|
| VRay Proxy (`vrayproxy`) | Published as a V-Ray mesh (`.vrmesh`) and as Alembic. The creator has switches for **VrMesh** and **Alembic** |
| VRay Scene (`vrayscene`) | A `.vrscene` file, for each render layer |

Validators: **VRay Proxy Settings** and **VRay Proxy Members** (that the proxy has shape members).

The **Import VRay Proxy** loader (`vrayproxy`, model, pointcache, animation and Ornatrix cache; `.vrmesh` and `.abc`) uses the Alembic file published with the same version when there is one, and the `.vrmesh` otherwise. A `.vrmesh` does not keep the IDs that map shaders to geometry, so looks do not work with it. The **Import VRay Scene** loader loads `.vrscene` files, and **VDB to V-Ray** loads `.vdb`.

## Redshift

The Redshift proxy (`redshiftproxy`) is published as `.rs` and can be animated. The **Import Redshift Proxy** loader loads `.rs`, `.usd`, `.usda`, `.usdc` and `.abc` files and creates a mesh with Redshift proxy parameters. **VDB to Redshift** loads `.vdb` into a Redshift volume shape. The Redshift render settings include the primary and secondary global illumination engines; when set to `None` they are not managed by AYON.

The texture conversion of looks can write Redshift texture files (`.rstexbin`) when **Make Redshift texture files** is on for the Look creator.

## Related

- [Maya addon](index.md)
- [Maya settings](settings.md)
