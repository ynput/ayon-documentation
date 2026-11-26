---
title: Color management in publishing
description: "How color data is detected, stored and converted while publishing: colorspaceData on representations, file rules, OIIO transcoding, review and thumbnail extraction, upload of reviewables, loading, and the limits of each step."
verified: 2026-11-18
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/pipeline/colorspace.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/extract_colorspace_data.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/extract_color_transcode.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/extract_oiio_postprocess.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/extract_review.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/extract_thumbnail.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/plugins/publish/integrate_review.py
---

import trace from "@site/src/data/flows/color-data-flow.json";

# Color management in publishing

Publishing carries color information with the images it produces. The colorspace of every image representation is recorded in a `colorspaceData` entry. Optional extraction plugins convert images with OpenImageIO (`oiiotool`) using the OCIO config of the context, and the review plugins turn the result into playable media (image or movie) with FFmpeg. This page describes how the colorspace is detected, which plugins read and write it, in which order the plugins run, and where the limits are. The OCIO config used here is the one resolved at launch, see [Color management on launch](color-management-on-launch.md). The settings of the plugins are listed in [Core addon settings](../addons/essentials/core/settings.md).

## Overview

```mermaid
flowchart TD
  A[Scene colorspace from DCC] --> C[Source representation colorspaceData]
  B[File rules by file name] --> C
  C --> D{Transcode profile matches}
  D -- yes --> E[OIIO transcode]
  D -- no --> F[Source representation unchanged]
  E --> G[New representation, colorspaceData of the target]
  G --> R[Representations to publish]
  F --> R
  R --> H[Extract Review with FFmpeg]
  R --> T[Extract Thumbnail]
  R --> V[Integrate stores colorspaceData of each representation]
  H --> I[Review media tagged webreview]
  I --> U[Upload to AYON server]
```

Plain-text equivalent:

1. The host integration reads the colorspace of the rendered or exported images from the scene (render settings, write nodes, render products, document profile) and sets it on the representation. Where the host cannot tell, file rules assign a colorspace by file name.
2. The result is stored on each image representation as `colorspaceData`: the colorspace name and the OCIO config (path and template).
3. If an OIIO transcode profile matches the instance, **Extract OIIO Transcode** converts the representation to a target colorspace or display and view, and creates one new representation per output definition, whose `colorspaceData` holds the target colorspace, or display and view. With the `review` tag on an output definition, the review moves to the new representation. Otherwise the representation is not changed.
4. **Extract Review** encodes representations that carry the `review` tag into review media with FFmpeg. It does not apply an OCIO transform itself; the transform comes from the transcode step or from the DCC.
5. **Extract Thumbnail** converts one image of the review representation to a JPEG: the transcoded one when the transcode moved the review to it, otherwise the source. With `colorspaceData` it uses `oiiotool` from that colorspace, and otherwise FFmpeg.
6. Representations tagged `webreview` are uploaded to the AYON server so the web player and review sessions can show them.
7. At integration, the `colorspaceData` of each representation (the source with its own colorspace, a transcoded one with the target) is stored in the data of the published representation, and the colorspace name is available as the `{colorspace}` key of publish templates.

## colorspaceData

`colorspaceData` is a dictionary on a representation.

| Key | Meaning |
|---|---|
| `colorspace` | Name of the colorspace of the files, as it exists in the config. |
| `config` | The OCIO config that defines the colorspace: `path` (absolute path on the publishing machine) and `template` (path with anatomy root tokens such as `{root[work]}`, or `{BUILTIN_OCIO_ROOT}` for built-in configs, which another machine can resolve). |
| `display`, `view` | Optional. Present when the images are display-referred, set by the host or by a transcode into a display and view. |

Rules for setting it:

- Only representations whose extension is a known image or video extension get `colorspaceData`.
- Nothing is set when color management is disabled for the context (no OCIO config resolved at the time of publishing; this is the same resolution as at launch, using the host, task and application of the publish context).
- A representation that already has `colorspaceData` is not changed by the generic plugin.
- The colorspace is not validated against the config at this point.
- The stored config path is used by later steps. When the path does not exist on another machine (for example on a farm worker), the template is filled with the project roots to find the local equivalent. If neither resolves, steps that need the config skip the representation.

### Display and view

A representation can be described by a colorspace alone, or by a colorspace plus a display and view when its images are display-referred. Display and view appear in three places.

| Place | Meaning |
|---|---|
| Scene display and view | The display and view that the DCC is set to (for example Maya's view transform, Houdini's default display and view, Blender and 3ds Max render settings). Collected into instance values and used as the default target when a transcode output leaves its display and view empty. |
| `colorspaceData.display` and `.view` | Marks a representation as display-referred. Written by hosts and by transcodes into a display and view. Used as the source of an inverse transform, and as the thumbnail target. |
| Output definitions | **Target Display** and **Target View** of a transcode, **Display&View** defaults of the thumbnail. |

When a host expresses display and view as one colorspace, the colorspace of a display and view pair is looked up in the config (`<USE_DISPLAY_NAME>` in a shared view resolves to the display name).

### Where the colorspace comes from

The colorspace is chosen in this order:

| Order | Source | Example |
|---|---|---|
| 1 | The host's own plugin sets it explicitly when it creates the representation. | Nuke reads it from the write node; Houdini ROP outputs are `scene_linear`; Maya, Blender, 3ds Max and Cinema 4D collect it from the render settings and render products; Photoshop converts the document color profile through the remapping rules; TrayPublisher offers an **Override Colorspace** attribute with the colorspaces of the config. |
| 2 | Farm jobs: the render products of the scene (colorspace per AOV), together with the scene's config path, display and view that were collected before the job was submitted. | Houdini, Maya, Blender, 3ds Max render instances. |
| 3 | The instance value `colorspace`, when the host collected one. | Applied by the plugin **Extract Colorspace data** to every representation that has no `colorspaceData`. |
| 4 | File rules. | Used by the same plugin when no instance colorspace exists. |

The plugin **Extract Colorspace data** works on all instances and fills the gaps left by hosts. It does not touch representations that already have `colorspaceData`.

### File rules

File rules are the fallback for representations that no host plugin tagged with a colorspace. The rule set (host rules or global rules) and the matching are described in [Color management on launch](color-management-on-launch.md#file-rules). When publishing, the pattern is matched against the file name of the first file of the representation, and the extension is compared case-insensitively. When no rule matches, the representation gets no `colorspaceData`. The colorspace of a rule must exist in the OCIO config; it is not validated when the data is written.

### Where `colorspaceData` is read

Later steps take the colorspace from `colorspaceData` instead of detecting it again, so a wrong or missing entry carries through to every step below.

| Consumer | Use |
|---|---|
| Extract OIIO Transcode | Source colorspace, optional source display and view, config path. |
| Extract Thumbnail | Source colorspace and the target display and view. |
| Integration | Stored in the published representation. |
| Loaders | Several loaders (for example for Houdini, 3ds Max, Resolve) read the stored colorspace to set the colorspace of the loaded file; representations without stored data fall back to file rules. Hosts with remapped colorspace names convert the stored OCIO name to the native name. |

## Order of the color steps

The plugins that handle color run in this order during extraction:

1. Host extractors render or export the files and set `colorspaceData`.
2. **Transcode color spaces** (Extract OIIO Transcode) converts colors with `oiiotool`.
3. **OIIO Post Process** runs further `oiiotool` operations, without color logic.
4. **Extract Review** and **Extract burnins** encode the review media with FFmpeg.
5. **Extract Colorspace data** fills `colorspaceData` where it is still missing.
6. **Extract Thumbnail** makes the thumbnail.
7. At integration, **Integrate AYON Review** uploads the review media to the server.

Because the transcode runs before **Extract Colorspace data**, it converts only representations whose `colorspaceData` the host plugin set.

### Follow the color data

Pick a case and select a step to see what happens to the color data there. The plain-text version under the chart lists every step.

<FlowTrace data={trace} />

## OIIO transcode

**Extract OIIO Transcode** (label **Transcode color spaces**) converts image representations to another colorspace, or to a display and view, with `oiiotool`. It is optional (the artist can switch it off in the Publisher) and enabled in the core settings, but without profiles it does nothing (default: no profiles).

### When it runs

The plugin picks the most specific matching profile of **Extract OIIO Transcode** in the [Core addon settings](../addons/essentials/core/settings.md#oiio-and-otio), by product base type, host, task and product name. Within that profile, a representation is converted when:

- its name matches one of the profile's representation names (regular expressions; empty matches all);
- its extension is `exr`, `jpg`, `jpeg`, `png`, `dpx`, `tif` or `tiff`, and it has files;
- it has `colorspaceData`, and the config stored there can be located on the machine;
- `oiiotool` is available (from the `ayon_third_party` addon or a path in `AYON_OIIO_PATHS`); otherwise the plugin logs a warning and skips;
- the instance is not flagged for farm processing; the farm job runs the plugins later.

### Output definitions

A profile has a list of output definitions, and every definition produces one new representation. A definition sets the name and extension of the new representation (the special name `passthrough` keeps the source name, an empty extension keeps the source extension), a target, extra `oiiotool` arguments (for example the bit depth of a DPX), and tags. The target is either a colorspace (**Use Colorspace**) or a display and view (**Use Display&View**). An empty display or view falls back to the display and view of the scene, collected by the host as the instance values `sceneDisplay` and `sceneView` (or the older `colorspaceDisplay` and `colorspaceView`). The `review` tag makes the review be built from the converted file instead of the original; custom tags can be used by review output definitions as filters.

:::caution EXRs with baked-in display colors
The transcode does not restrict its output: an output definition can write any format `oiiotool` writes, in any colorspace or display and view of the config. It can therefore write EXRs with display-referred values, for example converted to sRGB or Rec.709 for review. EXR is by convention a scene-linear format, and other tools and studios usually read EXRs as linear, so such files are easily misread. Keep EXR outputs in a scene-linear colorspace, such as ACEScg or ACES2065-1, and write display-referred outputs to formats like PNG, JPEG or DPX.
:::

How the conversion is built:

| Source | Target | `oiiotool` operation |
|---|---|---|
| Colorspace | Colorspace | Colorspace-to-colorspace conversion. |
| Colorspace | Display and view | Display and view transform. |
| Display and view | Colorspace | The display and view is inverted into `scene_linear`, then converted to the target colorspace. |
| Display and view | Another display and view | Inverted, then re-applied with the target pair. Identical source and target pairs need no conversion. |

After conversion, the new representation's `colorspaceData` is updated with the target colorspace, display and view. Only the RGBA channels (or the reviewable layer chosen by **Default reviewable layers**) are converted and written. Other channels are not carried to the transcoded file.

### Limits

| Limit | Detail |
|---|---|
| Missing RGBA channels | The representation is skipped with an error when the channels to convert cannot be found. |
| Empty targets | The conversion needs either a target colorspace or both a display and a view. When a definition leaves them empty and the scene provides no display and view, the conversion fails. |
| One sequence per representation | A representation that contains more than one frame collection fails. |
| Formats | Only the extensions listed above. |

### OIIO post process

**Extract OIIO Post Process** runs `oiiotool` with arguments typed in the profile: for conversion to scanline EXR, resizing or flattening. It has no color logic; its new representations are tagged like those of the transcode, see [Tags on the new representations](#tags-on-the-new-representations). **Input arguments** and **Output arguments** are inserted before the input file and before the output option. Its profiles also filter by **Representation extensions**.

## Tags on the new representations

**Transcode color spaces** and **OIIO Post Process** handle the representations they create in the same way:

- **Review moves to the new representation.** When an output definition has the `review` tag, or the source representation had it, the new representation gets it and the source loses it, so the review is built once, from the converted files. The transcode also adds the `review` family to an instance that lacks it, so that **Extract Review** processes the new representation.
- **Delete Original Representation.** When it is on in the profile, the source representation gets the `delete` tag and is removed before integration, unless it is the thumbnail representation.
- **Custom tags** of an output definition are copied to the new representation, where review output definitions can use them as filters.

## Review media

Review media is made by **Extract Review** from representations that have the tag `review`.

| Aspect | Behavior |
|---|---|
| Input representations | Tag `review` present; not tagged `thumbnail` or `passing`; extension in `exr`, `jpg`, `jpeg`, `png`, `dpx`, `tga`, `tiff`, `tif`, `psd`, `mov`, `mp4`. |
| Profile | Matched by host name, product base type and task type ([Core addon settings](../addons/essentials/core/settings.md#extract-review)). |
| Outputs | One new representation per output definition that passes its filters (families, product names, custom tags of the representation, single-frame or multi-frame input). |
| Encoding | FFmpeg, driven by the output definition: filters, input and output arguments, size, overscan, letter box, background, missing-frame handling. |
| Color | No OCIO transform. With the default definitions, the movie output uses the FFmpeg input argument `-apply_trc gamma22` and BT.709 flags (`-color_range tv`, `-colorspace bt709`, `-color_primaries bt709`, `-color_trc bt709`); the single-image output (`png`) does no color conversion. |
| EXR pre-conversion | EXR inputs that FFmpeg cannot read as they are (several subimages, DWAA or DWAB compression, unsupported or too long attributes) are first rewritten with `oiiotool` in a temporary folder. This keeps the colors and only selects the reviewable channels. |
| Outputs inherit | The new representations are copies of the input, so `colorspaceData` is the input's, and tags of the output definition are added. The `delete` tag of the source is not copied. |
| Burnins | Output definitions tagged `burnin` are passed on to **Extract burnins**. |
| LUT baking | With the instance value `lutPath` and the representation tag `bake-lut`, a `lut3d` filter is added. Farm submitters pass `lutPath` on for review instances. |

:::caution Color changes in Extract Review are not tracked
Extract Review copies the `colorspaceData` of its input unchanged, so a color change made here, with FFmpeg arguments such as `-apply_trc gamma22` or with LUT baking, is not recorded: the review files claim the colorspace of their source. Convert colors with **Transcode color spaces** before the review instead, so the converted files carry their real colorspace.
:::

### How the review gets its color transform

Review output is intended to be display-referred. There are three ways that the transform is applied before encoding:

| Route | Where the transform happens |
|---|---|
| OIIO transcode with the `review` tag | A transcode output definition converts the scene-referred render to a display and view (or an output colorspace such as Rec.709). The `review` tag moves the review to the converted files. |
| The DCC bakes it | The host writes display-referred images or a movie. Nuke bakes a movie with an `OCIODisplay` or `OCIOColorSpace` node, using **Baking Target Colorspace** of the Nuke ImageIO settings (default colorspace `Output - Rec.709`) or an override of the review plugin. Houdini OpenGL review uses **Review colorspace** of its ImageIO settings. |
| Approximation | The default FFmpeg input argument `-apply_trc gamma22` applies a 2.2 gamma to linear input. It does not use the OCIO config. |

An image encoded without one of these routes shows the scene-referred values as they are.

## Thumbnails

**Extract Thumbnail** creates a JPEG thumbnail from one image of the instance. Its profiles are in the [Core addon settings](../addons/essentials/core/settings.md#extract-thumbnail-and-thumbnail-from-source).

| Aspect | Behavior |
|---|---|
| Hosts | Shell, Fusion, Resolve, TrayPublisher, Substance 3D Painter, Substance 3D Designer, Nuke, After Effects, Photoshop, Unreal, Houdini, batch delivery and workflow. |
| Families | Image sequence, render, render2d, prerender, source, clip, take, online, image, editorial package. |
| Source | Representations tagged `need_thumbnail`, else representations tagged `review`, else other image or video representations. A movie is converted into a frame first. For a sequence the frame at **Duration split** (default 0.5) is used. Crypto passes are skipped. |
| Skipped | Instances with the instance value `review` set to `False`; instances that already have a thumbnail. |
| Color, with `colorspaceData` and `oiiotool` | Converts from the representation colorspace (or display and view) to the target. If the representation has display and view, they are used as target. Otherwise the profile's **OIIOtool defaults** apply: **Use Colorspace** (default `color_picking`) or **Use Display&View** (default display `default`, view `sRGB`). |
| Color, otherwise | FFmpeg is used with the profile's FFmpeg arguments (default input argument `-apply_trc gamma22`); if FFmpeg fails and `oiiotool` exists, `oiiotool` converts without color management. |
| Result | A representation named `thumbnail` (tag `thumbnail`). With **Integrate Thumbnail Representation** off it is tagged `delete` and not integrated as a representation, but is still used for the version thumbnail. |

**Extract Thumbnail from source** creates a thumbnail from the file in the instance value `thumbnailSource` (default size 300 by 170). It does not apply color management.

## Uploading and storing

| Step | Detail |
|---|---|
| Storage | Every representation, including review files, is written to the publish root of the project anatomy. |
| Server upload | **Integrate AYON Review** uploads each representation tagged `webreview` (not thumbnails, not farm-published ones) to the AYON server for the version and the hero version. The output name is the label shown in the player. |
| Default tags | The default review outputs of the core settings carry `webreview` (and `ftrackreview`, `kitsureview`). |
| Not uploaded | A review representation without the `webreview` tag, or whose upload failed, exists on storage but is not playable in the web player. A failed upload stops the publish with an error. |
| Direct uploads | A file uploaded directly to the server as a reviewable does not pass the publish plugins: no transcode, no burnin, no color conversion. |

## Tools and dependencies

| Tool | Used for |
|---|---|
| `oiiotool` (OpenImageIO) | Color conversion, post processing, thumbnails, EXR pre-conversion. Delivered by the `ayon_third_party` addon. Produces images and sequences, not movies. |
| FFmpeg | Movie and image encoding of review output, thumbnails from movies, burnins. |
| OpenColorIO (`PyOpenColorIO`) | Config queries (colorspaces, roles, views). A launcher subprocess answers when the running Python has no compatible package. |
| Other addons | Other addons can add steps. For example, a slate addon identifies a review representation and prepends a slate frame before encoding. |

## Limits

- Color handling needs color management on for the context. Without a resolved OCIO config, representations get no `colorspaceData` and the transcode and colorspace-aware thumbnails are skipped.
- Only image and video extensions carry `colorspaceData`. File rules assign a colorspace from the file name and extension alone and do not inspect pixel data.
- Extract Review does not convert colors. The `colorspaceData` of review files describes the source of the review, not the display transform that was baked into it.
- The transcode needs `colorspaceData` already present when it runs, which is the case when the host plugin sets it.
- OIIO conversions use only the channels chosen for review; additional passes are not carried into the converted file.
- Farm publishing: the transcode is skipped on the submitting machine and runs in the farm job; the farm job depends on the `colorspaceConfig`, display and view collected at submission.
- Nuke baking (see above) and other host-specific plugins have their own settings; those are described in the host addon documentation.

## Related

- [Color management on launch](color-management-on-launch.md)
- [Publishing](publishing.md)
- [Publisher](publisher.md)
- [Loader](loader.md)
- [Core addon settings](../addons/essentials/core/settings.md): groups **Color management (ImageIO)**, **Extract Thumbnail and Thumbnail from source**, **OIIO and OTIO**, **Extract Review** and **Extract Burnin**
- [OCIO configs addon](../addons/essentials/ocio/index.md)
- [TrayPublisher addon](../addons/essentials/traypublisher/index.md)
